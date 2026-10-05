import { describe, expect, it } from 'vitest';
import { buildGraph, SHELLS_HIGH, SHELLS_LOW } from '../graph';

const opts = { seed: 20261006, shells: SHELLS_HIGH, domainCount: 6 };

describe('buildGraph', () => {
  it('같은 시드면 같은 그래프를 만든다', () => {
    const a = buildGraph(opts), b = buildGraph(opts);
    expect(Array.from(a.positions)).toEqual(Array.from(b.positions));
    expect(Array.from(a.edges)).toEqual(Array.from(b.edges));
  });
  it('껍질 합계만큼 노드를 만든다', () => {
    const g = buildGraph(opts);
    expect(g.count).toBe(870);
    expect(g.outerCount).toBe(520);
    expect(g.positions.length).toBe(870 * 3);
    expect(g.from.length).toBe(870 * 3);
    expect(g.seeds.length).toBe(870);
  });
  it('연결은 유효한 서로 다른 노드 쌍이고 중복이 없다', () => {
    const g = buildGraph(opts);
    expect(g.edges.length % 2).toBe(0);
    const seen = new Set<string>();
    for (let i = 0; i < g.edges.length; i += 2) {
      const a = g.edges[i], b = g.edges[i + 1];
      expect(a).toBeLessThan(g.count);
      expect(b).toBeLessThan(g.count);
      expect(a).not.toBe(b);
      const key = a < b ? `${a}_${b}` : `${b}_${a}`;
      expect(seen.has(key)).toBe(false);
      seen.add(key);
    }
  });
  it('모든 노드는 최소 1개 연결을 가진다', () => {
    const g = buildGraph(opts);
    const deg = new Uint16Array(g.count);
    g.edges.forEach(i => deg[i]++);
    expect(Math.min(...deg)).toBeGreaterThan(0);
  });
  it('도메인 노드는 바깥 껍질의 서로 다른 노드이고 정면(z>0)을 향한다', () => {
    const g = buildGraph(opts);
    expect(g.domainNodes.length).toBe(6);
    expect(new Set(g.domainNodes).size).toBe(6);
    for (const i of g.domainNodes) {
      expect(i).toBeLessThan(g.outerCount);
      expect(g.positions[i * 3 + 2]).toBeGreaterThan(0.3);
    }
  });
  it('도메인 노드는 좌우 3개씩이고 화면상 서로 충분히 떨어져 있다', () => {
    const g = buildGraph(opts);
    const xy = g.domainNodes.map(i => [g.positions[i * 3], g.positions[i * 3 + 1]]);
    expect(xy.filter(p => p[0] > 0).length).toBe(3);
    for (let a = 0; a < 6; a++) for (let b = a + 1; b < 6; b++)
      expect(Math.hypot(xy[a][0] - xy[b][0], xy[a][1] - xy[b][1])).toBeGreaterThan(0.35);
  });
  it('저사양 껍질 구성도 유효하다', () => {
    const g = buildGraph({ ...opts, shells: SHELLS_LOW });
    expect(g.count).toBe(420);
    expect(g.domainNodes.length).toBe(6);
  });
});
