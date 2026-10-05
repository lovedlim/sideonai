// 히어로 스크롤 진행도 p(0~1)를 장면 값으로 바꾼다.
// 0.00–0.30 히어로 / 0.30–0.60 도메인 진입 / 0.60–0.90 도메인 유지 / 0.90–1.00 퇴장

export interface StageValues {
  camZ: number;
  copyOpacity: number;
  domain: number;
  domainCopy: number;
  exit: number;
}

const clamp01 = (x: number) => (x > 0 ? (x < 1 ? x : 1) : 0); // NaN → 0

export function smoothstep(a: number, b: number, x: number): number {
  const t = clamp01((x - a) / (b - a));
  return t * t * (3 - 2 * t);
}

export function stageValues(p: number): StageValues {
  const q = clamp01(p);
  const approach = clamp01(q / 0.6);
  return {
    camZ: 3.8 - 0.75 * (1 - (1 - approach) * (1 - approach)),
    copyOpacity: 1 - smoothstep(0.12, 0.3, q),
    domain: smoothstep(0.3, 0.6, q),
    domainCopy: smoothstep(0.55, 0.68, q),
    exit: smoothstep(0.9, 1, q),
  };
}
