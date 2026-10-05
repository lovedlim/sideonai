import { describe, expect, it } from 'vitest';
import { domainReveal, stageValues } from '../stages';

describe('stageValues', () => {
  it('시작과 끝 값', () => {
    expect(stageValues(0)).toEqual({ camZ: 3.8, copyOpacity: 1, domain: 0, domainCopy: 0, exit: 0 });
    const end = stageValues(1);
    expect(end.camZ).toBeCloseTo(3.05);
    expect(end.copyOpacity).toBe(0);
    expect(end.domain).toBe(1);
    expect(end.exit).toBe(1);
  });
  it('구간 경계', () => {
    expect(stageValues(0.12).copyOpacity).toBe(1);
    expect(stageValues(0.30).copyOpacity).toBe(0);
    expect(stageValues(0.30).domain).toBe(0);
    expect(stageValues(0.60).domain).toBe(1);
    expect(stageValues(0.90).exit).toBe(0);
  });
  it('스크롤을 시작하자마자 카메라가 움직인다 (ease-out)', () => {
    expect(3.8 - stageValues(0.05).camZ).toBeGreaterThan(0.1);
  });
  it('카메라와 도메인 값은 단조롭다', () => {
    let prev = stageValues(0);
    for (let p = 0.01; p <= 1.0001; p += 0.01) {
      const v = stageValues(p);
      expect(v.camZ).toBeLessThanOrEqual(prev.camZ + 1e-9);
      expect(v.domain).toBeGreaterThanOrEqual(prev.domain - 1e-9);
      prev = v;
    }
  });
  it('범위를 벗어난 입력은 잘라낸다', () => {
    expect(stageValues(-1)).toEqual(stageValues(0));
    expect(stageValues(2)).toEqual(stageValues(1));
    expect(stageValues(NaN)).toEqual(stageValues(0));
  });
});

describe('domainReveal', () => {
  const N = 6;
  it('도메인 장면 전에는 모두 0, 끝나면 모두 1', () => {
    for (let i = 0; i < N; i++) {
      expect(domainReveal(0, i, N)).toBe(0);
      expect(domainReveal(1, i, N)).toBe(1);
    }
  });
  it('순서대로 켜진다: 앞 번호가 항상 먼저 진행된다', () => {
    for (let d = 0; d <= 1.0001; d += 0.05)
      for (let i = 0; i < N - 1; i++)
        expect(domainReveal(d, i, N)).toBeGreaterThanOrEqual(domainReveal(d, i + 1, N));
  });
  it('중간 시점에는 첫 도메인은 다 켜지고 마지막은 아직 꺼져 있다', () => {
    expect(domainReveal(0.5, 0, N)).toBe(1);
    expect(domainReveal(0.5, N - 1, N)).toBe(0);
  });
  it('각 도메인의 진행은 단조롭다', () => {
    for (let i = 0; i < N; i++) {
      let prev = 0;
      for (let d = 0; d <= 1.0001; d += 0.02) {
        const v = domainReveal(d, i, N);
        expect(v).toBeGreaterThanOrEqual(prev - 1e-9);
        prev = v;
      }
    }
  });
});
