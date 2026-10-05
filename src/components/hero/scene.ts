// 뉴럴 코어 three.js 장면. React와 분리된 명령형 모듈이며, 이 파일만 three.js를 불러온다.
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import {
  buildGraph, buildPathTree, mulberry32, nearestOuterNode, pathEdges, randomDirection, SHELLS_HIGH, SHELLS_LOW,
} from './graph';
import { domainReveal, smoothstep, stageValues } from './stages';
import * as GLSL from './shaders';

export interface FrameInfo {
  /** reveal: 이 도메인의 이름표가 켜진 정도(0~1). 광선이 노드에 닿을 때 올라간다 */
  domains: { x: number; y: number; side: 'left' | 'right'; reveal: number }[];
  core: { x: number; y: number; reveal: number };
  fps: number;
}

export interface HeroScene {
  setPointer(nx: number, ny: number): void;
  setProgress(p: number): void;
  impulse(energy: number, spin: number): void;
  shockAt(nx: number, ny: number): void;
  resize(w: number, h: number): void;
  /** 품질 단계를 바꿔 장면을 다시 만들 때 이어받을 상태 */
  getState(): SceneState;
  start(): void;
  stop(): void;
  dispose(): void;
}

export interface SceneState {
  progress: number;
  autoY: number;
}

export interface HeroSceneOptions {
  quality: 'high' | 'low';
  domainCount: number;
  /** 넘기면 인트로를 건너뛰고 이 상태에서 시작한다 */
  resume?: SceneState;
  onFrame(f: FrameInfo): void;
  onContextLost(): void;
}

const SEED = 20261006;
const BG = 0x03060b;
const FOV = 42;
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const wrapAngle = (a: number) => Math.atan2(Math.sin(a), Math.cos(a));

export function createHeroScene(canvas: HTMLCanvasElement, opts: HeroSceneOptions): HeroScene {
  const high = opts.quality === 'high';
  const rnd = mulberry32(SEED + 1);
  const graph = buildGraph({ seed: SEED, shells: high ? SHELLS_HIGH : SHELLS_LOW, domainCount: opts.domainCount });

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
  renderer.setClearColor(BG);
  // 셰이더 출력을 그대로 화면에 쓴다(색 변환 없음). 가산 혼합 값이 설계한 그대로 보인다.
  renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
  const dprCap = high ? 2 : 1.5;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(FOV, 1, 0.05, 80);
  const group = new THREE.Group();
  scene.add(group);

  const U = {
    uTime: { value: 0 }, uSigT: { value: 0 }, uAssemble: { value: 0 },
    uShockDir: { value: new THREE.Vector3(0, 1, 0) }, uShockT: { value: 99 }, uShockAmp: { value: 0 },
    uRDir: { value: [new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 1, 0)] },
    uRT: { value: [99, 99, 99] }, uRAmp: { value: [0, 0, 0] },
    uMouse: { value: new THREE.Vector2(0.2, 0.1) }, uAspect: { value: 1 }, uPx: { value: 28 },
    uCamZ: { value: 3.8 }, uDim: { value: 1 }, uEnergy: { value: 0 }, uDomain: { value: 0 }, uDomainCount: { value: opts.domainCount }, uHotR: { value: 0.24 },
    uFlash: { value: 0 },
    uBoost: { value: high ? 1 : 1.7 }, // low 단계는 블룸이 없어 어둡게 보이므로 밝기를 올린다
    uPathGain: { value: high ? 1 : 0.5 }, // 블룸이 없으면 금색이 바로 흰색으로 날아가므로 낮춘다
  };
  const additive = (vertexShader: string, fragmentShader: string) =>
    new THREE.ShaderMaterial({
      uniforms: U, vertexShader, fragmentShader,
      transparent: true, depthWrite: false, depthTest: false, blending: THREE.AdditiveBlending,
    });
  const f32 = (g: THREE.BufferGeometry, name: string, data: ArrayLike<number>, size: number) =>
    g.setAttribute(name, new THREE.BufferAttribute(Float32Array.from(data), size));
  const add = <T extends THREE.Object3D>(obj: T, parent: THREE.Object3D = group) => {
    obj.frustumCulled = false; // 정점이 셰이더에서 움직이므로 경계 구로 걸러내면 안 된다
    parent.add(obj);
    return obj;
  };

  // 노드. aNodePath는 생각의 경로 위에 있는 노드의 밝기로, 매 프레임 갱신한다.
  const nodePathAttr = new THREE.BufferAttribute(new Float32Array(graph.count), 1);
  nodePathAttr.setUsage(THREE.DynamicDrawUsage);
  {
    const g = new THREE.BufferGeometry();
    g.setAttribute('aNodePath', nodePathAttr);
    f32(g, 'position', graph.positions, 3);
    f32(g, 'aFrom', graph.from, 3);
    f32(g, 'aSeed', graph.seeds, 1);
    f32(g, 'aSize', graph.sizes, 1);
    add(new THREE.Points(g, additive(GLSL.NODE_VERT, GLSL.NODE_FRAG)));
  }

  // 연결선과 신호. aPath는 "생각의 경로"에 속한 선의 밝기로, 매 프레임 갱신한다.
  // 선 세그먼트는 그래프 연결선 뒤에 "뿌리"(중심 구체 표면 → 가장 안쪽 노드)를 덧붙인 것이다.
  // 뿌리는 평소에는 보이지 않고(aBase 0), 경로가 지날 때만 켜져서 경로가 중심의 AI에서 시작하게 한다.
  const tree = buildPathTree(graph);
  const edgeCount = graph.edges.length / 2;
  const rootCount = graph.count - graph.coreStart;
  const segCount = edgeCount + rootCount;
  const pathAttr = new THREE.BufferAttribute(new Float32Array(segCount * 2), 1);
  pathAttr.setUsage(THREE.DynamicDrawUsage);
  {
    const n = segCount * 2;
    const pos = new Float32Array(n * 3), from = new Float32Array(n * 3);
    const seed = new Float32Array(n), aT = new Float32Array(n), phase = new Float32Array(n), speed = new Float32Array(n);
    const depth = new Float32Array(n), base = new Float32Array(n);
    for (let e = 0; e < edgeCount * 2; e += 2) {
      const ph = rnd(), sp = rnd() < 0.45 ? 0.15 + rnd() * 0.45 : 0;
      for (let k = 0; k < 2; k++) {
        const node = graph.edges[e + k], v = e + k;
        pos.set(graph.positions.subarray(node * 3, node * 3 + 3), v * 3);
        from.set(graph.from.subarray(node * 3, node * 3 + 3), v * 3);
        seed[v] = graph.seeds[node]; aT[v] = k; phase[v] = ph; speed[v] = sp; depth[v] = tree.depth[node]; base[v] = 1;
      }
    }
    for (let k = 0; k < rootCount; k++) {
      const node = graph.coreStart + k, v = (edgeCount + k) * 2;
      const p = graph.positions.subarray(node * 3, node * 3 + 3);
      const onCore = 0.11 / Math.hypot(p[0], p[1], p[2]); // 중심 구체(반지름 0.12) 표면 바로 안쪽
      const start = [p[0] * onCore, p[1] * onCore, p[2] * onCore];
      pos.set(start, v * 3); from.set(start, v * 3);
      pos.set(p, (v + 1) * 3); from.set(graph.from.subarray(node * 3, node * 3 + 3), (v + 1) * 3);
      seed[v] = seed[v + 1] = graph.seeds[node];
      aT[v + 1] = 1; depth[v] = -1; // 안쪽 노드의 깊이가 0이므로 뿌리의 시작은 -1: 빛의 흐름이 끊기지 않는다
    }
    const g = new THREE.BufferGeometry();
    f32(g, 'position', pos, 3); f32(g, 'aFrom', from, 3); f32(g, 'aSeed', seed, 1);
    f32(g, 'aT', aT, 1); f32(g, 'aPhase', phase, 1); f32(g, 'aSpeed', speed, 1); f32(g, 'aDepth', depth, 1);
    f32(g, 'aBase', base, 1);
    g.setAttribute('aPath', pathAttr);
    add(new THREE.LineSegments(g, additive(GLSL.EDGE_VERT, GLSL.EDGE_FRAG)));
  }

  // 성운: 구형 헤일로 + 기울어진 원반
  const nebula = new THREE.Group();
  nebula.rotation.set(1.15, 0, 0.3);
  scene.add(nebula);
  {
    const count = high ? 16000 : 5000;
    const pos = new Float32Array(count * 3), seed = new Float32Array(count), size = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      if (rnd() < 0.55) {
        const d = randomDirection(rnd), r = 1.3 + Math.pow(rnd(), 2) * 3.4;
        pos.set([d[0] * r, d[1] * r, d[2] * r], i * 3);
      } else {
        const a = rnd() * Math.PI * 2, r = 1.45 + Math.pow(rnd(), 1.6) * 2.8;
        pos.set([Math.cos(a) * r, (rnd() + rnd() + rnd() - 1.5) * 0.07 * r, Math.sin(a) * r], i * 3);
      }
      seed[i] = rnd(); size[i] = 0.5 + rnd() * 1.1;
    }
    const g = new THREE.BufferGeometry();
    f32(g, 'position', pos, 3); f32(g, 'aSeed', seed, 1); f32(g, 'aSize', size, 1);
    add(new THREE.Points(g, additive(GLSL.NEBULA_VERT, GLSL.NEBULA_FRAG)), nebula);
  }

  // 에너지 코어: 플라스마 구체 + 발광 + 자이로 링
  const core = new THREE.Group();
  group.add(core);
  const rings: { ring: THREE.LineLoop; bx: number; by: number; s: number }[] = [];
  let glow: THREE.Sprite;
  {
    core.add(new THREE.Mesh(
      new THREE.SphereGeometry(0.12, 48, 32),
      new THREE.ShaderMaterial({
        uniforms: U, vertexShader: GLSL.CORE_VERT, fragmentShader: GLSL.CORE_FRAG,
        transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      }),
    ));
    const cv = document.createElement('canvas');
    cv.width = cv.height = 128;
    const c2 = cv.getContext('2d')!;
    const gr = c2.createRadialGradient(64, 64, 0, 64, 64, 64);
    gr.addColorStop(0, 'rgba(190,250,255,0.9)');
    gr.addColorStop(0.25, 'rgba(90,225,255,0.4)');
    gr.addColorStop(1, 'rgba(60,200,255,0)');
    c2.fillStyle = gr;
    c2.fillRect(0, 0, 128, 128);
    glow = new THREE.Sprite(new THREE.SpriteMaterial({
      map: new THREE.CanvasTexture(cv), blending: THREE.AdditiveBlending,
      depthWrite: false, depthTest: false, transparent: true, opacity: 0.3,
    }));
    glow.scale.setScalar(0.7);
    core.add(glow);
    [0.2, 0.26, 0.33].forEach((r, i) => {
      const pts: THREE.Vector3[] = [];
      for (let k = 0; k < 128; k++) {
        const a = (k / 128) * Math.PI * 2;
        pts.push(new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r, 0));
      }
      const ring = new THREE.LineLoop(
        new THREE.BufferGeometry().setFromPoints(pts),
        new THREE.LineBasicMaterial({
          color: i === 1 ? 0xffb454 : 0x4df3ff, transparent: true, opacity: 0.8,
          blending: THREE.AdditiveBlending, depthWrite: false, depthTest: false,
        }),
      );
      rings.push({ ring, bx: rnd() * 3, by: rnd() * 3, s: 0.5 + i * 0.25 });
      core.add(ring);
    });
  }

  // 도메인 장면: 중심에서 도메인 노드로 가는 광선과 표식
  const domainLocal = graph.domainNodes.map(i => new THREE.Vector3().fromArray(graph.positions, i * 3));
  {
    const pos: number[] = [], aT: number[] = [], phase: number[] = [], idx: number[] = [];
    domainLocal.forEach((v, i) => {
      const ph = rnd();
      pos.push(0, 0, 0, v.x, v.y, v.z); aT.push(0, 1); phase.push(ph, ph); idx.push(i, i);
    });
    const g = new THREE.BufferGeometry();
    f32(g, 'position', pos, 3); f32(g, 'aT', aT, 1); f32(g, 'aPhase', phase, 1); f32(g, 'aIdx', idx, 1);
    add(new THREE.LineSegments(g, additive(GLSL.BEAM_VERT, GLSL.BEAM_FRAG)));
    const g2 = new THREE.BufferGeometry();
    f32(g2, 'position', domainLocal.flatMap(v => [v.x, v.y, v.z]), 3);
    f32(g2, 'aIdx', domainLocal.map((_, i) => i), 1);
    add(new THREE.Points(g2, additive(GLSL.MARK_VERT, GLSL.MARK_FRAG)));
  }

  // 후처리: high에서만 블룸
  let composer: EffectComposer | null = null;
  let bloom: UnrealBloomPass | null = null;
  if (high) {
    composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.8, 0.6, 0.1);
    composer.addPass(bloom);
  }

  // ---------- 상태 ----------
  let W = 1, H = 1, fit = 1, narrow = false;
  let tmx = 0.2, tmy = 0.1, mx = tmx, my = tmy, hx = tmx, hy = tmy;
  let pT = opts.resume?.progress ?? 0, p = pT;
  let energy = 0, spinVel = 0, autoY = opts.resume?.autoY ?? 0, asm = opts.resume ? 1 : 0, travel = 0;
  let slot = 0, lastRipple = 0, shockAmp = 1, nextShock = 3.2;
  let time = 0, last = 0, raf = 0, running = false, disposed = false, fps = 60;

  // 생각의 경로 상태. pathFlag: 지금 경로에 속하는가, pathReadyAt: 언제부터 켜질 수 있는가(중심에서 가까운 선부터 차례로)
  const pathFlag = new Uint8Array(segCount), pathStrength = new Float32Array(segCount), pathReadyAt = new Float32Array(segCount);
  const pathScratch = new Uint8Array(segCount), pathDir: [number, number, number] = [0, 0, 1];
  let pathNode = -1;
  let flash = 0, flashArmed = true; // 도메인이 모두 연결되는 순간의 번쩍임

  const ray = new THREE.Raycaster();
  const hit = new THREE.Vector3(), tmp = new THREE.Vector3(), ndc = new THREE.Vector2();
  const sphere = new THREE.Sphere();
  const frameInfo: FrameInfo = {
    domains: domainLocal.map((_, i) => ({ x: 0, y: 0, reveal: 0, side: i < domainLocal.length / 2 ? 'right' as const : 'left' as const })),
    core: { x: 0, y: 0, reveal: 0 },
    fps: 60,
  };

  // 화면 좌표(NDC)가 구체에 닿는 지점의 로컬 방향. 빗나가면 null.
  const hitDirection = (nx: number, ny: number): THREE.Vector3 | null => {
    ray.setFromCamera(ndc.set(nx, ny), camera);
    sphere.set(group.position, group.scale.x);
    return ray.ray.intersectSphere(sphere, hit) ? group.worldToLocal(hit.clone()).normalize() : null;
  };
  const ripple = (dir: THREE.Vector3 | null, amp: number) => {
    const now = performance.now();
    if (!dir || now - lastRipple < 200) return;
    lastRipple = now;
    U.uRDir.value[slot].copy(dir);
    U.uRT.value[slot] = 0;
    U.uRAmp.value[slot] = amp;
    slot = (slot + 1) % 3;
  };

  // 커서가 가리키는 노드가 바뀌면 경로를 다시 잡는다. 새로 들어온 선만 중심 쪽부터 순서대로 켠다.
  function setPathNode(node: number) {
    if (node === pathNode) return;
    pathNode = node;
    pathScratch.fill(0);
    // order: 중심에서 몇 번째 선인가. 뿌리가 0, 그다음 연결선이 1, 2, ...
    const mark = (seg: number, order: number) => {
      pathScratch[seg] = 1;
      if (!pathFlag[seg]) pathReadyAt[seg] = time + order * 0.03;
    };
    if (node >= 0) {
      for (const e of pathEdges(tree, node)) {
        mark(e, Math.max(tree.depth[graph.edges[e * 2]], tree.depth[graph.edges[e * 2 + 1]]));
      }
      let source = node;
      while (tree.parent[source] !== -1) source = tree.parent[source];
      if (source >= graph.coreStart) mark(edgeCount + source - graph.coreStart, 0);
    }
    pathFlag.set(pathScratch);
  }

  function updatePath(dt: number, dom: number) {
    const dir = asm >= 1 && dom < 0.25 ? hitDirection(tmx, tmy) : null;
    if (dir) {
      pathDir[0] = dir.x; pathDir[1] = dir.y; pathDir[2] = dir.z;
      setPathNode(nearestOuterNode(graph, pathDir));
    } else setPathNode(-1);
    const arr = pathAttr.array as Float32Array;
    const rise = 1 - Math.exp(-dt * 16), fall = 1 - Math.exp(-dt * 3);
    let dirty = false;
    for (let e = 0; e < segCount; e++) {
      const target = pathFlag[e] && time >= pathReadyAt[e] ? 1 : 0;
      const s = pathStrength[e];
      if (s === target) continue;
      let next = s + (target - s) * (target > s ? rise : fall);
      if (Math.abs(target - next) < 0.004) next = target;
      pathStrength[e] = next;
      arr[e * 2] = arr[e * 2 + 1] = next;
      dirty = true;
    }
    if (!dirty) return;
    pathAttr.needsUpdate = true;
    // 경로 위의 노드도 함께 밝힌다
    const nodes = nodePathAttr.array as Float32Array;
    nodes.fill(0);
    for (let e = 0; e < segCount; e++) {
      const s = pathStrength[e];
      if (s === 0) continue;
      // 뿌리는 안쪽 노드 하나에만 닿는다
      const a = e < edgeCount ? graph.edges[e * 2] : graph.coreStart + e - edgeCount;
      const b = e < edgeCount ? graph.edges[e * 2 + 1] : a;
      if (s > nodes[a]) nodes[a] = s;
      if (s > nodes[b]) nodes[b] = s;
    }
    nodePathAttr.needsUpdate = true;
  }

  function applyCamera(dom: number, camZ: number) {
    // 좁은 화면의 도메인 장면에서는 이름표가 화면 안에 들어오도록 카메라를 더 물린다
    const f = fit * (narrow ? 1 + 0.85 * dom : 1);
    camera.position.set(-mx * 0.3 * f, -my * 0.18 * f, camZ * f);
    U.uHotR.value = 0.24 / f; // 커서 반응 반경은 화면이 아니라 구체 크기에 비례한다
    camera.lookAt(0, 0, 0);
    // 구체 중심을 화면 가로 62%(좁은 화면은 위쪽 36%)에 두고, 도메인 장면에서는 가운데로 옮긴다
    const offX = narrow ? 0 : -0.12 * W * (1 - dom);
    const offY = narrow ? H * (0.14 * (1 - dom) + 0.04 * dom) : 0;
    camera.setViewOffset(W, H, offX, offY, W, H);
  }

  function frame(now: number) {
    if (!running) return;
    raf = requestAnimationFrame(frame);
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    time += dt;
    fps += (1 / Math.max(dt, 0.001) - fps) * 0.05;

    p += (pT - p) * 0.18;
    mx += (tmx - mx) * 0.14; my += (tmy - my) * 0.14;
    hx += (tmx - hx) * 0.45; hy += (tmy - hy) * 0.45;
    const st = stageValues(p), dom = st.domain;

    energy *= Math.exp(-dt * 2.6);
    spinVel *= Math.exp(-dt * 2.2);
    U.uSigT.value += dt * (1 + energy * 7);
    U.uTime.value = time;
    // 도메인 장면에서는 이름표가 노드에서 떨어져 보이지 않게 폭발 변위를 줄인다
    U.uEnergy.value = energy * (1 - 0.85 * dom);
    U.uMouse.value.set(hx, hy);
    for (let i = 0; i < 3; i++) U.uRT.value[i] += dt;

    if (asm < 1) asm = Math.min(1, asm + dt / 3);
    U.uAssemble.value = 1 - Math.pow(1 - asm, 3);

    // 회전: 평소에는 자동 회전 + 스크롤 관성, 도메인 장면에서는 정면 자세로 끌려간다
    autoY += dt * (0.09 + spinVel) * (1 - dom);
    autoY -= wrapAngle(autoY) * dom * Math.min(1, dt * 5);
    group.rotation.set(-my * 0.5 * (1 - 0.7 * dom), autoY + mx * 0.95 * (1 - 0.7 * dom), 0);
    group.scale.setScalar(1 + 0.04 * dom);
    nebula.rotation.y += dt * (0.02 + spinVel * 0.25);

    applyCamera(dom, st.camZ);
    U.uCamZ.value = camera.position.z;
    U.uDim.value = 1 - 0.55 * dom;
    U.uDomain.value = dom;

    // 여섯 도메인이 모두 켜지는 순간 한 번 번쩍인다. 되돌아갔다가 다시 오면 또 번쩍인다.
    if (dom > 0.985 && flashArmed) { flash = 1; flashArmed = false; }
    else if (dom < 0.9) flashArmed = true;
    flash *= Math.exp(-dt * 3.2);
    U.uFlash.value = flash;

    updatePath(dt, dom);

    // 충격파: 방치하면 3.4초마다 자동 발생
    U.uShockT.value += dt;
    if (dom < 0.3 && asm >= 1 && time > nextShock) {
      U.uShockDir.value.set(...randomDirection(Math.random));
      U.uShockT.value = 0;
      shockAmp = 1;
      nextShock = time + 3.4;
    }
    U.uShockAmp.value = shockAmp;

    const a = U.uAssemble.value;
    core.scale.setScalar(a * (1 - 0.4 * dom) * (1 + 0.06 * Math.sin(time * 2.2)) * (1 + 0.5 * flash));
    (glow.material as THREE.SpriteMaterial).opacity = 0.26 + 0.08 * Math.sin(time * 2.2);
    for (const r of rings) r.ring.rotation.set(r.bx + time * r.s, r.by + time * r.s * 0.7, 0);
    if (bloom) bloom.strength = 0.8 + energy * 0.3 + flash * 0.6;

    // 이름표 좌표
    group.updateMatrixWorld();
    camera.updateMatrixWorld();
    domainLocal.forEach((v, i) => {
      tmp.copy(v).applyMatrix4(group.matrixWorld).project(camera);
      frameInfo.domains[i].x = (tmp.x * 0.5 + 0.5) * W;
      frameInfo.domains[i].y = (-tmp.y * 0.5 + 0.5) * H;
      frameInfo.domains[i].reveal = smoothstep(0.7, 0.95, domainReveal(dom, i, domainLocal.length));
    });
    tmp.set(0, 0, 0).project(camera);
    frameInfo.core.x = (tmp.x * 0.5 + 0.5) * W;
    frameInfo.core.y = (-tmp.y * 0.5 + 0.5) * H;
    frameInfo.core.reveal = smoothstep(0, 0.15, dom);
    frameInfo.fps = fps;

    if (composer) composer.render();
    else renderer.render(scene, camera);
    opts.onFrame(frameInfo);
  }

  const onContextLost = (e: Event) => {
    e.preventDefault();
    api.stop();
    opts.onContextLost();
  };
  canvas.addEventListener('webglcontextlost', onContextLost);

  const api: HeroScene = {
    setPointer(nx, ny) {
      const d = Math.hypot(nx - tmx, ny - tmy);
      tmx = nx; tmy = ny;
      energy = Math.min(1.2, energy + d * 0.45);
      travel += d;
      if (travel > 0.22) {
        travel = 0;
        ripple(hitDirection(nx, ny), 0.3);
      }
    },
    setProgress(value) {
      pT = clamp(Number.isFinite(value) ? value : 0, 0, 1);
    },
    impulse(e, spin) {
      energy = Math.min(1.3, energy + Math.max(0, e));
      spinVel = clamp(spinVel + spin, -5, 5);
      ripple(group.worldToLocal(camera.position.clone()).normalize(), 0.7);
    },
    shockAt(nx, ny) {
      const dir = hitDirection(nx, ny);
      if (!dir) return;
      U.uShockDir.value.copy(dir);
      U.uShockT.value = 0;
      shockAmp = 1.5;
      nextShock = time + 3.4;
    },
    resize(w, h) {
      W = Math.max(1, w); H = Math.max(1, h);
      narrow = W < 1024; // globals.css와 NeuralHero의 lg 기준과 같아야 한다
      const aspect = W / H;
      fit = Math.max(1, 0.78 / aspect); // 세로로 긴 화면에서는 카메라를 물려 구체가 폭 안에 들어오게 한다
      // 큰 화면에서 픽셀 수가 과하게 늘지 않도록 전체 픽셀 수(약 450만)로도 제한한다
      const pixelBudget = Math.sqrt(4_500_000 / (W * H));
      renderer.setPixelRatio(Math.max(1, Math.min(window.devicePixelRatio || 1, dprCap, pixelBudget)));
      renderer.setSize(W, H, false);
      // 컴포저는 생성 시점의 픽셀 비율을 기억하므로 매번 맞춰 준다. 빼면 HiDPI에서 1배로 렌더되어 흐려진다.
      composer?.setPixelRatio(renderer.getPixelRatio());
      composer?.setSize(W, H);
      camera.aspect = aspect;
      U.uAspect.value = aspect;
      U.uPx.value = H * renderer.getPixelRatio() * 0.0175 * (high ? 1 : 1.5);
      applyCamera(stageValues(p).domain, stageValues(p).camZ);
    },
    getState() {
      return { progress: pT, autoY };
    },
    start() {
      if (running || disposed) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    },
    stop() {
      running = false;
      cancelAnimationFrame(raf);
    },
    dispose() {
      if (disposed) return;
      api.stop();
      disposed = true;
      canvas.removeEventListener('webglcontextlost', onContextLost);
      scene.traverse(obj => {
        const o = obj as THREE.Mesh;
        o.geometry?.dispose();
        const m = o.material as THREE.Material | THREE.Material[] | undefined;
        for (const mat of Array.isArray(m) ? m : m ? [m] : []) {
          (mat as THREE.SpriteMaterial).map?.dispose();
          mat.dispose();
        }
      });
      bloom?.dispose();
      composer?.dispose();
      renderer.dispose();
    },
  };

  return api;
}
