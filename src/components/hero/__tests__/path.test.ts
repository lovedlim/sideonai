import { describe, expect, it } from 'vitest';
import { buildGraph, buildPathTree, nearestOuterNode, pathEdges, SHELLS_HIGH, SHELLS_LOW } from '../graph';

for (const [name, shells] of [['high', SHELLS_HIGH], ['low', SHELLS_LOW]] as const) {
  describe(`생각의 경로 (${name})`, () => {
    const g = buildGraph({ seed: 20261006, shells, domainCount: 6 });
    const tree = buildPathTree(g);

    it('가장 안쪽 껍질의 노드가 출발점(깊이 0)이다', () => {
      expect(g.coreStart).toBeGreaterThan(g.outerCount);
      for (let i = g.coreStart; i < g.count; i++) {
        expect(tree.depth[i]).toBe(0);
        expect(tree.parentEdge[i]).toBe(-1);
      }
    });

    it('모든 바깥 노드에서 중심까지 경로가 이어진다', () => {
      for (let i = 0; i < g.outerCount; i++) {
        const edges = pathEdges(tree, i);
        expect(edges.length).toBe(tree.depth[i]);
        expect(edges.length).toBeGreaterThan(0);
        // 경로를 따라가면 깊이가 1씩 줄고, 각 연결선은 현재 노드와 부모를 잇는다
        let node = i;
        for (const e of edges) {
          const a = g.edges[e * 2], b = g.edges[e * 2 + 1];
          expect(a === node || b === node).toBe(true);
          const next = a === node ? b : a;
          expect(tree.depth[next]).toBe(tree.depth[node] - 1);
          node = next;
        }
        expect(node).toBeGreaterThanOrEqual(g.coreStart);
      }
    });

    it('경로는 최단이다: 이웃의 깊이는 1 넘게 차이 나지 않는다', () => {
      for (let e = 0; e < g.edges.length / 2; e++) {
        const a = g.edges[e * 2], b = g.edges[e * 2 + 1];
        expect(Math.abs(tree.depth[a] - tree.depth[b])).toBeLessThanOrEqual(1);
      }
    });

    it('방향에서 가장 가까운 바깥 노드를 찾는다', () => {
      for (const i of [0, 7, Math.floor(g.outerCount / 2), g.outerCount - 1]) {
        const dir: [number, number, number] = [g.positions[i * 3], g.positions[i * 3 + 1], g.positions[i * 3 + 2]];
        expect(nearestOuterNode(g, dir)).toBe(i);
      }
      expect(nearestOuterNode(g, [0, 0, 1])).toBeLessThan(g.outerCount);
    });
  });
}
