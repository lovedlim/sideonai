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

// 도메인 장면 진행도(0~1) 안에서 index번째 도메인이 켜진 정도.
// 여섯 개가 한꺼번에 켜지지 않고, 앞 번호부터 차례로 광선이 뻗어 나가게 한다.
// 셰이더(shaders.ts의 reveal)와 같은 식이어야 이름표와 광선이 맞는다.
export function domainReveal(domain: number, index: number, count: number): number {
  const start = index / (count + 2);
  return smoothstep(start, start + 3 / (count + 2), domain);
}
