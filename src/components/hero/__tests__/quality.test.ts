import { describe, expect, it } from 'vitest';
import { pickQuality } from '../quality';

const base = { reducedMotion: false, webgl: true, coarsePointer: false, width: 1440, cores: 8 };

describe('pickQuality', () => {
  it('데스크톱 기본은 high', () => expect(pickQuality(base)).toBe('high'));
  it('동작 줄이기면 static', () => expect(pickQuality({ ...base, reducedMotion: true })).toBe('static'));
  it('WebGL이 없으면 static', () => expect(pickQuality({ ...base, webgl: false })).toBe('static'));
  it('터치 기기는 low', () => expect(pickQuality({ ...base, coarsePointer: true })).toBe('low'));
  it('폭 768 미만은 low, 768은 high', () => {
    expect(pickQuality({ ...base, width: 767 })).toBe('low');
    expect(pickQuality({ ...base, width: 768 })).toBe('high');
  });
  it('코어 4개 이하는 low', () => {
    expect(pickQuality({ ...base, cores: 4 })).toBe('low');
    expect(pickQuality({ ...base, cores: 5 })).toBe('high');
  });
  it('코어 수를 모르면(0, NaN) 낮추지 않는다', () => {
    expect(pickQuality({ ...base, cores: 0 })).toBe('high');
    expect(pickQuality({ ...base, cores: NaN })).toBe('high');
  });
});
