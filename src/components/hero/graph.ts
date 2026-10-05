export type Shell = [count: number, radius: number, jitter: number];

export const SHELLS_HIGH: Shell[] = [[520, 1, 0.14], [240, 0.66, 0.2], [110, 0.36, 0.3]];
export const SHELLS_LOW: Shell[] = [[260, 1, 0.14], [110, 0.66, 0.2], [50, 0.36, 0.3]];

// 정면(+z)에서 58° 기운 방향. 화면 각도 기준 오른쪽 3개, 왼쪽 3개.
const TILT = (58 * Math.PI) / 180;
export const DOMAIN_DIRS: [number, number, number][] = [-38, 0, 38, 142, 180, 218].map(deg => {
  const a = (deg * Math.PI) / 180;
  return [Math.sin(TILT) * Math.cos(a), Math.sin(TILT) * Math.sin(a), Math.cos(TILT)];
});

export interface Graph {
  count: number;
  outerCount: number;
  /** 가장 안쪽 껍질이 시작하는 노드 인덱스. 이 뒤의 노드가 중심(AI)에 가장 가깝다 */
  coreStart: number;
  positions: Float32Array;
  from: Float32Array;
  seeds: Float32Array;
  sizes: Float32Array;
  edges: Uint16Array;
  domainNodes: number[];
}

export function mulberry32(seed: number): () => number {
  let s = seed | 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function randomDirection(rnd: () => number): [number, number, number] {
  const th = Math.acos(2 * rnd() - 1), ph = rnd() * Math.PI * 2;
  return [Math.sin(th) * Math.cos(ph), Math.cos(th), Math.sin(th) * Math.sin(ph)];
}

function fibonacciSphere(n: number): [number, number, number][] {
  const out: [number, number, number][] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (2 * (i + 0.5)) / n, r = Math.sqrt(1 - y * y), a = golden * i;
    out.push([Math.cos(a) * r, y, Math.sin(a) * r]);
  }
  return out;
}

export function buildGraph(opts: { seed: number; shells: Shell[]; domainCount: number }): Graph {
  const rnd = mulberry32(opts.seed);
  const pts: number[] = [];
  const starts: number[] = []; // 껍질별 시작 인덱스
  for (const [n, radius, jitter] of opts.shells) {
    starts.push(pts.length / 3);
    for (const v of fibonacciSphere(n)) {
      const s = radius * (1 + (rnd() - 0.5) * jitter);
      pts.push(v[0] * s, v[1] * s, v[2] * s);
    }
  }
  const count = pts.length / 3;
  starts.push(count);
  const outerCount = starts[1];
  const positions = new Float32Array(pts);

  const dist2 = (i: number, x: number, y: number, z: number) =>
    (positions[i * 3] - x) ** 2 + (positions[i * 3 + 1] - y) ** 2 + (positions[i * 3 + 2] - z) ** 2;

  // [lo, hi) 범위에서 노드 i와 가장 가까운 k개
  const nearest = (i: number, lo: number, hi: number, k: number): number[] => {
    const x = positions[i * 3], y = positions[i * 3 + 1], z = positions[i * 3 + 2];
    const best: [number, number][] = [];
    for (let j = lo; j < hi; j++) {
      if (j === i) continue;
      const d = dist2(j, x, y, z);
      if (best.length < k || d < best[best.length - 1][0]) {
        best.push([d, j]);
        best.sort((a, b) => a[0] - b[0]);
        if (best.length > k) best.pop();
      }
    }
    return best.map(b => b[1]);
  };

  const pairs: number[] = [];
  const seen = new Set<number>();
  const link = (a: number, b: number) => {
    const key = a < b ? a * count + b : b * count + a;
    if (seen.has(key)) return;
    seen.add(key);
    pairs.push(a, b);
  };
  for (let i = 0; i < count; i++) for (const j of nearest(i, 0, count, 3)) link(i, j);
  // 껍질 사이 연결: 안쪽 껍질의 각 노드를 바로 바깥 껍질의 가장 가까운 노드와 잇는다
  for (let s = 1; s < opts.shells.length; s++)
    for (let i = starts[s]; i < starts[s + 1]; i++) link(i, nearest(i, starts[s - 1], starts[s], 1)[0]);

  const seeds = new Float32Array(count);
  const sizes = new Float32Array(count);
  const from = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    seeds[i] = rnd();
    sizes[i] = (rnd() < 0.06 ? 2.4 : 0.7 + rnd() * 0.9) * (i < outerCount ? 1 : 0.8);
    // 인트로 시작 위치: 제자리에서 바깥으로 멀리 밀어낸 곳. 방향을 유지해야 조립 중에 연결선이
    // 중심을 가로지르며 하얗게 뭉치지 않는다.
    const d = randomDirection(rnd), r = 3 + rnd() * 5;
    const len = Math.hypot(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]) || 1;
    for (let k = 0; k < 3; k++) from[i * 3 + k] = (positions[i * 3 + k] / len) * r + d[k] * 0.8;
  }

  const domainNodes: number[] = [];
  for (const dir of DOMAIN_DIRS.slice(0, opts.domainCount)) {
    let best = -1, bd = Infinity;
    for (let i = 0; i < outerCount; i++) {
      if (domainNodes.includes(i)) continue;
      const d = dist2(i, dir[0], dir[1], dir[2]);
      if (d < bd) { bd = d; best = i; }
    }
    domainNodes.push(best);
  }

  const coreStart = starts[opts.shells.length - 1];
  return { count, outerCount, coreStart, positions, from, seeds, sizes, edges: new Uint16Array(pairs), domainNodes };
}

// ---------- 생각의 경로 ----------
// 커서가 가리키는 노드에서 중심(AI)까지 신경망을 따라 가는 최단 경로.

export interface PathTree {
  /** 중심 쪽으로 한 칸 간 노드. 출발점이거나 닿지 않으면 -1 */
  parent: Int32Array;
  /** 그 한 칸에 해당하는 연결선 번호(쌍 단위). 없으면 -1 */
  parentEdge: Int32Array;
  /** 중심까지의 연결선 수. 가장 안쪽 껍질은 0, 닿지 않으면 -1 */
  depth: Int32Array;
}

export function buildPathTree(graph: Graph): PathTree {
  const { count, edges, coreStart } = graph;
  const adjacency: [neighbor: number, edge: number][][] = Array.from({ length: count }, () => []);
  for (let e = 0; e < edges.length / 2; e++) {
    const a = edges[e * 2], b = edges[e * 2 + 1];
    adjacency[a].push([b, e]);
    adjacency[b].push([a, e]);
  }
  const parent = new Int32Array(count).fill(-1);
  const parentEdge = new Int32Array(count).fill(-1);
  const depth = new Int32Array(count).fill(-1);
  const queue: number[] = [];
  for (let i = coreStart; i < count; i++) { depth[i] = 0; queue.push(i); }
  for (let head = 0; head < queue.length; head++) {
    const node = queue[head];
    for (const [next, edge] of adjacency[node]) {
      if (depth[next] !== -1) continue;
      depth[next] = depth[node] + 1;
      parent[next] = node;
      parentEdge[next] = edge;
      queue.push(next);
    }
  }
  return { parent, parentEdge, depth };
}

/** node에서 중심까지 가는 연결선 번호들. 바깥에서 안쪽 순서. */
export function pathEdges(tree: PathTree, node: number): number[] {
  const out: number[] = [];
  for (let current = node; tree.parentEdge[current] !== -1; current = tree.parent[current]) {
    out.push(tree.parentEdge[current]);
  }
  return out;
}

/** 주어진 방향(구체 로컬 좌표)에 가장 가까운 바깥 껍질 노드 */
export function nearestOuterNode(graph: Graph, dir: readonly [number, number, number]): number {
  const { positions, outerCount } = graph;
  let best = 0, bestDot = -Infinity;
  for (let i = 0; i < outerCount; i++) {
    const x = positions[i * 3], y = positions[i * 3 + 1], z = positions[i * 3 + 2];
    const dot = (x * dir[0] + y * dir[1] + z * dir[2]) / Math.hypot(x, y, z);
    if (dot > bestDot) { bestDot = dot; best = i; }
  }
  return best;
}
