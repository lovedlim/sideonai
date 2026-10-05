// 뉴럴 코어 three.js 장면. React와 분리된 명령형 모듈이며, 이 파일만 three.js를 불러온다.
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { buildGraph, mulberry32, randomDirection, SHELLS_HIGH, SHELLS_LOW } from './graph';
import { stageValues } from './stages';
import * as GLSL from './shaders';

export interface FrameInfo {
  domains: { x: number; y: number; side: 'left' | 'right' }[];
  core: { x: number; y: number };
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
    uCamZ: { value: 3.8 }, uDim: { value: 1 }, uEnergy: { value: 0 }, uDomain: { value: 0 }, uHotR: { value: 0.42 },
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

  // 노드
  {
    const g = new THREE.BufferGeometry();
    f32(g, 'position', graph.positions, 3);
    f32(g, 'aFrom', graph.from, 3);
    f32(g, 'aSeed', graph.seeds, 1);
    f32(g, 'aSize', graph.sizes, 1);
    add(new THREE.Points(g, additive(GLSL.NODE_VERT, GLSL.NODE_FRAG)));
  }

  // 연결선과 신호
  {
    const n = graph.edges.length;
    const pos = new Float32Array(n * 3), from = new Float32Array(n * 3);
    const seed = new Float32Array(n), aT = new Float32Array(n), phase = new Float32Array(n), speed = new Float32Array(n);
    for (let e = 0; e < n; e += 2) {
      const ph = rnd(), sp = rnd() < 0.45 ? 0.15 + rnd() * 0.45 : 0;
      for (let k = 0; k < 2; k++) {
        const node = graph.edges[e + k], v = e + k;
        pos.set(graph.positions.subarray(node * 3, node * 3 + 3), v * 3);
        from.set(graph.from.subarray(node * 3, node * 3 + 3), v * 3);
        seed[v] = graph.seeds[node]; aT[v] = k; phase[v] = ph; speed[v] = sp;
      }
    }
    const g = new THREE.BufferGeometry();
    f32(g, 'position', pos, 3); f32(g, 'aFrom', from, 3); f32(g, 'aSeed', seed, 1);
    f32(g, 'aT', aT, 1); f32(g, 'aPhase', phase, 1); f32(g, 'aSpeed', speed, 1);
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
    const pos: number[] = [], aT: number[] = [], phase: number[] = [];
    for (const v of domainLocal) {
      const ph = rnd();
      pos.push(0, 0, 0, v.x, v.y, v.z); aT.push(0, 1); phase.push(ph, ph);
    }
    const g = new THREE.BufferGeometry();
    f32(g, 'position', pos, 3); f32(g, 'aT', aT, 1); f32(g, 'aPhase', phase, 1);
    add(new THREE.LineSegments(g, additive(GLSL.BEAM_VERT, GLSL.BEAM_FRAG)));
    const g2 = new THREE.BufferGeometry();
    f32(g2, 'position', domainLocal.flatMap(v => [v.x, v.y, v.z]), 3);
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

  const ray = new THREE.Raycaster();
  const hit = new THREE.Vector3(), tmp = new THREE.Vector3(), ndc = new THREE.Vector2();
  const sphere = new THREE.Sphere();
  const frameInfo: FrameInfo = {
    domains: domainLocal.map((_, i) => ({ x: 0, y: 0, side: i < domainLocal.length / 2 ? 'right' as const : 'left' as const })),
    core: { x: 0, y: 0 },
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

  function applyCamera(dom: number, camZ: number) {
    // 좁은 화면의 도메인 장면에서는 이름표가 화면 안에 들어오도록 카메라를 더 물린다
    const f = fit * (narrow ? 1 + 0.85 * dom : 1);
    camera.position.set(-mx * 0.3 * f, -my * 0.18 * f, camZ * f);
    U.uHotR.value = 0.42 / f; // 커서 반응 반경은 화면이 아니라 구체 크기에 비례한다
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
    core.scale.setScalar(a * (1 - 0.4 * dom) * (1 + 0.06 * Math.sin(time * 2.2)));
    (glow.material as THREE.SpriteMaterial).opacity = 0.26 + 0.08 * Math.sin(time * 2.2);
    for (const r of rings) r.ring.rotation.set(r.bx + time * r.s, r.by + time * r.s * 0.7, 0);
    if (bloom) bloom.strength = 0.8 + energy * 0.3;

    // 이름표 좌표
    group.updateMatrixWorld();
    camera.updateMatrixWorld();
    domainLocal.forEach((v, i) => {
      tmp.copy(v).applyMatrix4(group.matrixWorld).project(camera);
      frameInfo.domains[i].x = (tmp.x * 0.5 + 0.5) * W;
      frameInfo.domains[i].y = (-tmp.y * 0.5 + 0.5) * H;
    });
    tmp.set(0, 0, 0).project(camera);
    frameInfo.core.x = (tmp.x * 0.5 + 0.5) * W;
    frameInfo.core.y = (-tmp.y * 0.5 + 0.5) * H;
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
        ripple(hitDirection(nx, ny), 0.6);
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
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, dprCap));
      renderer.setSize(W, H, false);
      // 컴포저는 생성 시점의 픽셀 비율을 기억하므로 매번 맞춰 준다. 빼면 HiDPI에서 1배로 렌더되어 흐려진다.
      composer?.setPixelRatio(renderer.getPixelRatio());
      composer?.setSize(W, H);
      camera.aspect = aspect;
      U.uAspect.value = aspect;
      U.uPx.value = H * renderer.getPixelRatio() * 0.0175 * (high ? 1 : 1.25);
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
