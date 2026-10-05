// 뉴럴 코어 장면의 GLSL. 모든 레이어는 가산 혼합이라 그리는 순서와 무관하다.

// 노드와 연결선이 함께 쓰는 정점 변위.
// 인트로 조립, 충격파(자동 1개 + 반응 3개), 스크롤 에너지 폭발, 커서 자석 효과를 한곳에서 계산한다.
const PLACE = /* glsl */ `
  uniform float uTime, uAssemble, uShockT, uShockAmp, uAspect, uPx, uCamZ, uEnergy, uHotR;
  uniform vec3 uShockDir;
  uniform vec3 uRDir[3];
  uniform float uRT[3];
  uniform float uRAmp[3];
  uniform vec2 uMouse;
  attribute vec3 aFrom;
  attribute float aSeed;
  varying float vHot, vFade, vWave;

  vec4 place() {
    float a = clamp(uAssemble * 1.6 - aSeed * 0.6, 0.0, 1.0);
    a = a * a * (3.0 - 2.0 * a);
    vec3 n = normalize(position);
    float d = acos(clamp(dot(n, uShockDir), -1.0, 1.0));
    vWave = uShockAmp * exp(-pow((d - uShockT * 1.6) * 4.5, 2.0)) * exp(-uShockT * 0.55);
    for (int i = 0; i < 3; i++) {
      float dr = acos(clamp(dot(n, uRDir[i]), -1.0, 1.0));
      vWave += uRAmp[i] * exp(-pow((dr - uRT[i] * 2.6) * 4.5, 2.0)) * exp(-uRT[i] * 1.6);
    }
    float len = length(position);
    vec3 p = mix(aFrom, position, a) + n * (vWave * 0.16 + uEnergy * 0.2 * (0.4 + aSeed)) * len;
    p *= 1.0 + 0.012 * sin(uTime * 1.3 + aSeed * 40.0);
    vec4 clip = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
    vec2 dd = (clip.xy / clip.w - uMouse) * vec2(uAspect, 1.0);
    vHot = 1.0 - smoothstep(0.0, uHotR, length(dd));
    p += n * vHot * 0.13 * len;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vFade = mix(0.14, 1.0, 1.0 - smoothstep(uCamZ - 1.0, uCamZ + 1.2, -mv.z));
    vFade *= mix(0.25, 1.0, a * a); // 조립 중에는 어둡게 시작한다
    vFade *= smoothstep(0.4, 1.6, -mv.z); // 카메라 바로 앞을 지나는 입자는 화면을 덮지 않게 지운다
    return mv;
  }
`;

export const NODE_VERT = /* glsl */ `
  ${PLACE}
  attribute float aSize, aNodePath;
  varying float vNodePath;
  void main() {
    vec4 mv = place();
    vNodePath = aNodePath;
    gl_Position = projectionMatrix * mv;
    gl_PointSize = min(aSize * uPx * (1.0 + vHot * 1.2 + vWave * 1.4 + uEnergy * 0.4 + aNodePath * 2.1) / -mv.z, uPx * 2.6);
  }
`;

export const NODE_FRAG = /* glsl */ `
  uniform float uDim, uBoost, uPathGain;
  varying float vHot, vFade, vWave, vNodePath;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float c = 1.0 - smoothstep(0.06, 0.5, d);
    float w = clamp(vHot * 0.7 + vWave * 1.5, 0.0, 1.0);
    // 파동과 커서 주변은 흰 청록으로 밝아지기만 한다. 금색은 생각의 경로와 도메인에만 쓴다.
    vec3 col = mix(vec3(0.42, 0.9, 1.0), vec3(0.85, 1.0, 1.0), w);
    col = mix(col, vec3(1.0, 0.82, 0.5), vNodePath); // 생각의 경로 위의 노드는 따뜻한 흰빛 구슬로
    // 경로 위 노드는 밝기 보정(uBoost)을 받지 않는다. 블룸이 없는 단계에서 금색이 흰색으로 날아가지 않게 하려는 것
    float bright = (0.5 + c * 0.9 + vWave * 0.6) * mix(uBoost, 1.0, vNodePath) + vNodePath * 0.9 * uPathGain;
    gl_FragColor = vec4(col * bright, c * max(vFade, vNodePath * 0.7) * uDim);
  }
`;

export const EDGE_VERT = /* glsl */ `
  ${PLACE}
  attribute float aT, aPhase, aSpeed, aPath, aDepth;
  varying float vT, vPhase, vSpeed, vPath, vDepth;
  void main() {
    vT = aT; vPhase = aPhase; vSpeed = aSpeed; vPath = aPath; vDepth = aDepth;
    gl_Position = projectionMatrix * place();
  }
`;

// 선의 일부(aSpeed > 0)에는 빛 점이 선을 따라 달린다.
// aPath가 켜진 선은 "생각의 경로"다: 중심에서 커서가 가리키는 노드까지 밝게 이어지고,
// vDepth(중심에서의 거리)를 따라 빛이 바깥쪽으로 흐른다.
export const EDGE_FRAG = /* glsl */ `
  uniform float uTime, uSigT, uDim, uEnergy, uBoost, uPathGain;
  varying float vT, vPhase, vSpeed, vHot, vFade, vWave, vPath, vDepth;
  void main() {
    float s = fract(vT - uSigT * vSpeed + vPhase);
    float pulse = smoothstep(0.8, 1.0, s) * step(0.001, vSpeed);
    float w = clamp(vHot + vWave * 1.5, 0.0, 1.0);
    vec3 col = mix(vec3(0.16, 0.62, 0.85), vec3(0.6, 0.95, 1.0), w);
    float a = (0.2 + vHot * 0.3 + vWave * 0.55 + uEnergy * 0.18) * vFade * uDim;
    float flow = smoothstep(0.65, 1.0, fract(vDepth * 0.4 - uTime * 1.5));
    vec3 path = vec3(1.0, 0.72, 0.32) * vPath * (2.0 + flow * 3.0) * max(vFade, 0.6) * uDim;
    gl_FragColor = vec4((col * a + vec3(0.8, 1.0, 1.0) * pulse * vFade * uDim) * uBoost + path * uPathGain, 1.0);
  }
`;

export const NEBULA_VERT = /* glsl */ `
  uniform float uTime, uPx, uAssemble;
  attribute float aSeed, aSize;
  varying float vA, vWarm;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aSize * uPx * 0.5 / -mv.z;
    vWarm = step(0.93, aSeed);
    vA = (0.55 + 0.45 * sin(uTime * (0.5 + aSeed * 2.0) + aSeed * 50.0)) * uAssemble * smoothstep(0.3, 1.2, -mv.z);
  }
`;

export const NEBULA_FRAG = /* glsl */ `
  uniform float uDim;
  varying float vA, vWarm;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    vec3 col = mix(vec3(0.3, 0.55, 1.0), vec3(1.0, 0.68, 0.32), vWarm);
    gl_FragColor = vec4(col, (1.0 - smoothstep(0.0, 0.5, d)) * vA * 0.55 * uDim);
  }
`;

export const CORE_VERT = /* glsl */ `
  varying vec3 vN, vV, vP;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vN = normalize(normalMatrix * normal);
    vV = normalize(-mv.xyz);
    vP = position;
    gl_Position = projectionMatrix * mv;
  }
`;

// 결이 흐르는 플라스마. 중심이 하얗게 뭉개지지 않도록 밝기를 제한하고 테두리(프레넬)를 살린다.
export const CORE_FRAG = /* glsl */ `
  uniform float uTime;
  varying vec3 vN, vV, vP;
  float hash(vec3 p) {
    p = fract(p * 0.3183099 + 0.1);
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }
  float noise(vec3 x) {
    vec3 i = floor(x), f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(mix(hash(i), hash(i + vec3(1, 0, 0)), f.x), mix(hash(i + vec3(0, 1, 0)), hash(i + vec3(1, 1, 0)), f.x), f.y),
      mix(mix(hash(i + vec3(0, 0, 1)), hash(i + vec3(1, 0, 1)), f.x), mix(hash(i + vec3(0, 1, 1)), hash(i + vec3(1, 1, 1)), f.x), f.y),
      f.z);
  }
  float fbm(vec3 p) {
    float a = 0.5, s = 0.0;
    for (int i = 0; i < 4; i++) { s += a * noise(p); p = p * 2.02 + vec3(1.7, 9.2, 3.1); a *= 0.5; }
    return s;
  }
  void main() {
    float f = pow(1.0 - max(dot(normalize(vN), normalize(vV)), 0.0), 2.2);
    float n = fbm(vP * 16.0 + vec3(0.0, uTime * 0.35, uTime * 0.2));
    float veins = smoothstep(0.4, 0.72, n);
    vec3 base = mix(vec3(0.01, 0.1, 0.16), vec3(0.2, 0.85, 1.0), veins);
    vec3 col = base * (0.3 + veins * 0.75) + vec3(0.5, 0.95, 1.0) * f * 0.9 + vec3(1.0, 0.75, 0.4) * pow(veins, 3.0) * 0.3;
    gl_FragColor = vec4(col * (0.85 + 0.15 * sin(uTime * 2.2)), 1.0);
  }
`;

// stages.ts의 domainReveal과 같은 식. 도메인 번호 순서대로 켜진다.
const REVEAL = /* glsl */ `
  uniform float uDomain, uDomainCount;
  float reveal(float idx) {
    float start = idx / (uDomainCount + 2.0);
    return smoothstep(start, start + 3.0 / (uDomainCount + 2.0), uDomain);
  }
`;

export const BEAM_VERT = /* glsl */ `
  ${REVEAL}
  attribute float aT, aPhase, aIdx;
  varying float vT, vP, vD;
  void main() {
    vT = aT; vP = aPhase; vD = reveal(aIdx);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// 광선은 중심에서 도메인 노드 쪽으로 자라난다. 자라는 동안 끝이 밝게 빛난다.
export const BEAM_FRAG = /* glsl */ `
  uniform float uSigT;
  varying float vT, vP, vD;
  void main() {
    float grow = smoothstep(0.0, 0.7, vD);
    if (vD < 0.001 || vT > grow) discard;
    float tip = smoothstep(grow - 0.14, grow, vT) * (1.0 - smoothstep(0.7, 1.0, vD));
    float s = fract(vT * 1.5 - uSigT * 0.6 + vP);
    gl_FragColor = vec4(vec3(1.0, 0.68, 0.28) * (0.4 + smoothstep(0.75, 1.0, s) * 1.6) + vec3(1.0, 0.9, 0.7) * tip * 2.2, 1.0);
  }
`;

export const MARK_VERT = /* glsl */ `
  ${REVEAL}
  uniform float uTime, uPx;
  attribute float aIdx;
  varying float vArrive;
  void main() {
    float d = reveal(aIdx);
    vArrive = smoothstep(0.62, 0.75, d);                 // 광선이 닿는 순간 켜진다
    float pop = vArrive * (1.0 - smoothstep(0.75, 1.0, d)); // 닿을 때 한 번 커졌다가 돌아온다
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = 4.2 * uPx * (1.0 + 0.12 * sin(uTime * 3.0)) * (1.0 + 0.9 * pop) / -mv.z;
  }
`;

export const MARK_FRAG = /* glsl */ `
  varying float vArrive;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float c = 1.0 - smoothstep(0.0, 0.2, d);
    float r = smoothstep(0.33, 0.4, d) * (1.0 - smoothstep(0.44, 0.5, d));
    gl_FragColor = vec4(vec3(1.0, 0.72, 0.32) * (c * 1.6 + r), (c + r) * vArrive);
  }
`;
