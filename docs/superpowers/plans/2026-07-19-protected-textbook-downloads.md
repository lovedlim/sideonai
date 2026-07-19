# 비번 잠금 교재 다운로드 페이지 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `go.sideonai.com`에서 교재 목록을 보여주고, 자료마다 다른 6자리 비번을 입력해야 구글 드라이브 링크가 공개되며, 본인은 `/admin`에서 폼으로 교재를 관리한다.

**Architecture:** 기존 Next.js 16 앱에 라우트를 추가한다. 데이터/실패카운터는 Upstash Redis에 저장하고, 비번·링크는 서버 라우트에서만 읽어 검증이 성공할 때만 링크를 반환한다. 관리자 페이지는 단일 비번 + 서명 쿠키 세션으로 잠근다. `go.sideonai.com` 호스트는 미들웨어에서 `/go/*`로 리라이트한다.

**Tech Stack:** Next.js 16 (App Router), TypeScript, Tailwind v4, `@upstash/redis`, Node `crypto`, Vitest(단위 테스트).

## Global Constraints

- 대상 프로젝트 루트: `/Users/sideonai/Documents/Dev/sideonai/sideonai` (모든 경로는 이 디렉터리 기준). git 저장소는 여기.
- `url`(드라이브 링크)와 `password`는 **일반 사용자 클라이언트로 절대 직렬화하지 않는다.** 공개 페이지·응답에는 `id/course/period/company`만 포함.
- 저장소는 **Upstash Redis 하나만** 사용한다. Edge Config 사용 금지.
- 비번 비교는 **timing-safe** 비교를 쓴다.
- import alias는 `@/` (= `src/`). 기존 코드 컨벤션(함수형 컴포넌트, Tailwind, 다크모드 클래스) 따른다.
- 계단식 차단 규칙(누적 실패 기준): **5회↑=60초, 10회↑=180초, 15회↑=600초, 20회↑=3600초.**
- 실패 카운터 TTL = 3600초(실패 기록 시마다 갱신).
- 필요한 환경변수: `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`(또는 `KV_REST_API_URL`/`KV_REST_API_TOKEN`), `ADMIN_PASSWORD`, `SESSION_SECRET`.
- 스펙 문서: `docs/superpowers/specs/2026-07-19-protected-textbook-downloads-design.md`.

## File Structure

```
src/lib/redis.ts              # Upstash Redis 클라이언트 (싱글턴)
src/lib/ratelimit.ts          # 계단식 차단 로직 (순수 tier 함수 + Redis 카운터)
src/lib/session.ts            # 관리자 세션 토큰 HMAC 서명/검증
src/lib/textbooks.ts          # Textbook 타입 + Redis CRUD + id/비번 생성
src/app/api/unlock/route.ts             # POST 비번 검증 → url 반환
src/app/api/admin/login/route.ts        # POST 관리자 로그인 → 세션 쿠키
src/app/api/admin/logout/route.ts       # POST 로그아웃 → 쿠키 삭제
src/app/api/admin/textbooks/route.ts    # GET 목록 / POST 생성 (세션 필요)
src/app/api/admin/textbooks/[id]/route.ts # PUT 수정 / DELETE 삭제 (세션 필요)
src/app/go/page.tsx           # 공개 목록 페이지 (서버 컴포넌트)
src/app/go/TextbookList.tsx   # 카드 목록 + 비번 모달 (클라이언트)
src/app/go/admin/page.tsx     # 관리자 페이지 (서버: 세션 확인 → 로그인/대시보드)
src/app/go/admin/AdminLogin.tsx     # 로그인 폼 (클라이언트)
src/app/go/admin/AdminDashboard.tsx # 교재 CRUD 대시보드 (클라이언트)
src/middleware.ts             # go.sideonai.com → /go 리라이트
vitest.config.ts              # 테스트 설정
src/lib/*.test.ts             # 단위 테스트
```

각 lib 모듈은 단일 책임을 갖는다. 라우트/페이지는 lib 함수만 호출한다.

---

## Task 1: 프로젝트 셋업 (의존성 · 테스트 · Redis 클라이언트 · 환경변수)

**Files:**
- Modify: `package.json` (deps + scripts)
- Create: `vitest.config.ts`
- Create: `src/lib/redis.ts`
- Create: `.env.local.example`
- Modify: `.gitignore` (`.env.local` 무시 확인)

**Interfaces:**
- Produces: `import { redis } from '@/lib/redis'` — `@upstash/redis`의 `Redis` 인스턴스. 사용 메서드: `hgetall`, `hget`, `hset`, `hdel`, `incr`, `expire`, `set`, `ttl`, `del`.

- [ ] **Step 1: 의존성 설치**

Run:
```bash
npm install @upstash/redis
npm install -D vitest
```
Expected: 에러 없이 설치 완료, `package.json`의 dependencies/devDependencies에 추가됨.

- [ ] **Step 2: package.json에 test 스크립트 추가**

`package.json`의 `"scripts"`에 추가:
```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 3: vitest.config.ts 생성**

Create `vitest.config.ts`:
```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
```

- [ ] **Step 4: Redis 클라이언트 생성**

Create `src/lib/redis.ts`:
```ts
import { Redis } from "@upstash/redis";

// Upstash(Vercel Marketplace) 통합이 주입하는 두 가지 네이밍을 모두 지원한다.
export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL ?? "",
  token: process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN ?? "",
});
```

- [ ] **Step 5: .env.local.example 생성**

Create `.env.local.example`:
```bash
# Upstash Redis (Vercel Marketplace 설치 시 자동 주입되거나 아래를 직접 채운다)
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
# 관리자 로그인 비밀번호 (길게 설정 권장)
ADMIN_PASSWORD=
# 관리자 세션 쿠키 서명 키 (무작위 긴 문자열: openssl rand -hex 32)
SESSION_SECRET=
```

- [ ] **Step 6: .gitignore 확인**

`.gitignore`에 `.env*.local` 또는 `.env.local`이 포함돼 있는지 확인. 없으면 `.env*.local` 한 줄 추가.

- [ ] **Step 7: 테스트 러너·빌드 정상 확인**

Run:
```bash
npm test
```
Expected: "No test files found" 또는 0 tests, exit 0 (아직 테스트 없음 — 정상).

Run:
```bash
npx tsc --noEmit
```
Expected: 타입 에러 없음.

- [ ] **Step 8: Commit**

```bash
git add package.json package-lock.json vitest.config.ts src/lib/redis.ts .env.local.example .gitignore
git commit -m "chore: Upstash Redis + Vitest 셋업 및 Redis 클라이언트 추가"
```

---

## Task 2: 계단식 차단 로직 (`ratelimit.ts`)

**Files:**
- Create: `src/lib/ratelimit.ts`
- Test: `src/lib/ratelimit.test.ts`

**Interfaces:**
- Consumes: `redis` from `@/lib/redis` (테스트에서는 `vi.mock`으로 인메모리 페이크 주입).
- Produces:
  - `blockDurationFor(count: number): number` — 누적 실패수 → 차단 초. (순수 함수)
  - `checkBlock(scope: string): Promise<{ blocked: boolean; retryAfter: number }>`
  - `recordFailure(scope: string): Promise<{ blocked: boolean; retryAfter: number }>`
  - `clearFailures(scope: string): Promise<void>`
  - `scope` 예: `"1.2.3.4:kb2026"`, `"1.2.3.4:admin"`.

- [ ] **Step 1: 실패 테스트 작성**

Create `src/lib/ratelimit.test.ts`:
```ts
import { describe, it, expect, vi, beforeEach } from "vitest";

// 인메모리 페이크 Redis (사용하는 메서드만 구현)
const store = new Map<string, unknown>();
const ttls = new Map<string, number>();
vi.mock("@/lib/redis", () => ({
  redis: {
    async incr(k: string) {
      const n = ((store.get(k) as number) ?? 0) + 1;
      store.set(k, n);
      return n;
    },
    async expire(k: string, s: number) { ttls.set(k, s); },
    async set(k: string, v: unknown, opts?: { ex?: number }) {
      store.set(k, v);
      if (opts?.ex) ttls.set(k, opts.ex);
    },
    async ttl(k: string) { return store.has(k) ? (ttls.get(k) ?? -1) : -2; },
    async del(...keys: string[]) { keys.forEach((k) => { store.delete(k); ttls.delete(k); }); },
  },
}));

import { blockDurationFor, checkBlock, recordFailure, clearFailures } from "@/lib/ratelimit";

beforeEach(() => { store.clear(); ttls.clear(); });

describe("blockDurationFor", () => {
  it("returns escalating durations by cumulative count", () => {
    expect(blockDurationFor(4)).toBe(0);
    expect(blockDurationFor(5)).toBe(60);
    expect(blockDurationFor(9)).toBe(60);
    expect(blockDurationFor(10)).toBe(180);
    expect(blockDurationFor(14)).toBe(180);
    expect(blockDurationFor(15)).toBe(600);
    expect(blockDurationFor(19)).toBe(600);
    expect(blockDurationFor(20)).toBe(3600);
    expect(blockDurationFor(100)).toBe(3600);
  });
});

describe("checkBlock / recordFailure / clearFailures", () => {
  it("is not blocked before 5 failures", async () => {
    for (let i = 0; i < 4; i++) await recordFailure("ip:item");
    expect(await checkBlock("ip:item")).toEqual({ blocked: false, retryAfter: 0 });
  });

  it("blocks 60s at 5 failures", async () => {
    let last = { blocked: false, retryAfter: 0 };
    for (let i = 0; i < 5; i++) last = await recordFailure("ip:item");
    expect(last).toEqual({ blocked: true, retryAfter: 60 });
    expect(await checkBlock("ip:item")).toEqual({ blocked: true, retryAfter: 60 });
  });

  it("escalates to 180s at 10 failures", async () => {
    let last = { blocked: false, retryAfter: 0 };
    for (let i = 0; i < 10; i++) last = await recordFailure("ip:item");
    expect(last.retryAfter).toBe(180);
  });

  it("clearFailures resets everything", async () => {
    for (let i = 0; i < 6; i++) await recordFailure("ip:item");
    await clearFailures("ip:item");
    expect(await checkBlock("ip:item")).toEqual({ blocked: false, retryAfter: 0 });
    const next = await recordFailure("ip:item");
    expect(next.blocked).toBe(false); // 카운트가 1로 초기화됨
  });
});
```

- [ ] **Step 2: 테스트 실패 확인**

Run: `npx vitest run src/lib/ratelimit.test.ts`
Expected: FAIL — `ratelimit.ts`의 함수들이 아직 없음.

- [ ] **Step 3: 구현 작성**

Create `src/lib/ratelimit.ts`:
```ts
import { redis } from "@/lib/redis";

const FAIL_TTL = 3600; // 실패 카운터 유지 시간(초)

export function blockDurationFor(count: number): number {
  if (count >= 20) return 3600;
  if (count >= 15) return 600;
  if (count >= 10) return 180;
  if (count >= 5) return 60;
  return 0;
}

function failKey(scope: string) { return `fail:${scope}`; }
function blockKey(scope: string) { return `block:${scope}`; }

export async function checkBlock(scope: string): Promise<{ blocked: boolean; retryAfter: number }> {
  const ttl = await redis.ttl(blockKey(scope));
  if (ttl > 0) return { blocked: true, retryAfter: ttl };
  return { blocked: false, retryAfter: 0 };
}

export async function recordFailure(scope: string): Promise<{ blocked: boolean; retryAfter: number }> {
  const count = await redis.incr(failKey(scope));
  await redis.expire(failKey(scope), FAIL_TTL);
  const duration = blockDurationFor(count);
  if (duration > 0) {
    await redis.set(blockKey(scope), "1", { ex: duration });
    return { blocked: true, retryAfter: duration };
  }
  return { blocked: false, retryAfter: 0 };
}

export async function clearFailures(scope: string): Promise<void> {
  await redis.del(failKey(scope), blockKey(scope));
}
```

- [ ] **Step 4: 테스트 통과 확인**

Run: `npx vitest run src/lib/ratelimit.test.ts`
Expected: PASS (모든 케이스).

- [ ] **Step 5: Commit**

```bash
git add src/lib/ratelimit.ts src/lib/ratelimit.test.ts
git commit -m "feat: 계단식 무차별 대입 차단 로직 추가"
```

---

## Task 3: 관리자 세션 서명/검증 (`session.ts`)

**Files:**
- Create: `src/lib/session.ts`
- Test: `src/lib/session.test.ts`

**Interfaces:**
- Produces:
  - `signSession(ttlSeconds: number): string` — `"{exp}.{hmacHex}"` 토큰 반환.
  - `verifySession(token: string | undefined): boolean` — 서명·만료 검증.
  - `SESSION_COOKIE = "admin_session"` (상수).
  - `SESSION_TTL_SECONDS = 604800` (7일).

- [ ] **Step 1: 실패 테스트 작성**

Create `src/lib/session.test.ts`:
```ts
import { describe, it, expect, beforeAll } from "vitest";

beforeAll(() => { process.env.SESSION_SECRET = "test-secret-value"; });

import { signSession, verifySession } from "@/lib/session";

describe("session", () => {
  it("verifies a freshly signed token", () => {
    const token = signSession(60);
    expect(verifySession(token)).toBe(true);
  });

  it("rejects undefined / empty", () => {
    expect(verifySession(undefined)).toBe(false);
    expect(verifySession("")).toBe(false);
  });

  it("rejects a tampered signature", () => {
    const token = signSession(60);
    const [exp] = token.split(".");
    expect(verifySession(`${exp}.deadbeef`)).toBe(false);
  });

  it("rejects an expired token", () => {
    const token = signSession(-1); // 이미 만료
    expect(verifySession(token)).toBe(false);
  });
});
```

- [ ] **Step 2: 테스트 실패 확인**

Run: `npx vitest run src/lib/session.test.ts`
Expected: FAIL — 모듈 없음.

- [ ] **Step 3: 구현 작성**

Create `src/lib/session.ts`:
```ts
import { createHmac, timingSafeEqual } from "crypto";

export const SESSION_COOKIE = "admin_session";
export const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // 7일

function sign(exp: number): string {
  const secret = process.env.SESSION_SECRET ?? "";
  return createHmac("sha256", secret).update(String(exp)).digest("hex");
}

export function signSession(ttlSeconds: number): string {
  const exp = Math.floor(Date.now() / 1000) + ttlSeconds;
  return `${exp}.${sign(exp)}`;
}

export function verifySession(token: string | undefined): boolean {
  if (!token) return false;
  const dot = token.indexOf(".");
  if (dot < 0) return false;
  const expStr = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const exp = Number(expStr);
  if (!Number.isFinite(exp)) return false;
  const expected = sign(exp);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  if (!timingSafeEqual(a, b)) return false;
  return exp > Math.floor(Date.now() / 1000);
}
```

- [ ] **Step 4: 테스트 통과 확인**

Run: `npx vitest run src/lib/session.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/session.ts src/lib/session.test.ts
git commit -m "feat: 관리자 세션 HMAC 서명/검증 유틸 추가"
```

---

## Task 4: 교재 데이터 모델 · CRUD · 생성기 (`textbooks.ts`)

**Files:**
- Create: `src/lib/textbooks.ts`
- Test: `src/lib/textbooks.test.ts`

**Interfaces:**
- Consumes: `redis` from `@/lib/redis` (테스트는 인메모리 페이크).
- Produces:
  - `type Textbook = { id: string; course: string; period: string; company: string; url: string; password: string }`
  - `type PublicTextbook = { id: string; course: string; period: string; company: string }`
  - `type TextbookInput = { course: string; period: string; company: string; url: string; password?: string }`
  - `listTextbooks(): Promise<Textbook[]>`
  - `getTextbook(id: string): Promise<Textbook | null>`
  - `createTextbook(input: TextbookInput): Promise<Textbook>` — id 자동 생성, password 없으면 자동 생성.
  - `updateTextbook(id: string, input: TextbookInput): Promise<Textbook | null>`
  - `deleteTextbook(id: string): Promise<void>`
  - `toPublic(t: Textbook): PublicTextbook`
  - `generatePassword(): string` — 6자리(혼동 문자 제외 알파벳).

- [ ] **Step 1: 실패 테스트 작성**

Create `src/lib/textbooks.test.ts`:
```ts
import { describe, it, expect, vi, beforeEach } from "vitest";

const hash = new Map<string, unknown>();
vi.mock("@/lib/redis", () => ({
  redis: {
    async hset(_key: string, obj: Record<string, unknown>) {
      for (const [f, v] of Object.entries(obj)) hash.set(f, v);
    },
    async hget(_key: string, field: string) { return hash.get(field) ?? null; },
    async hgetall(_key: string) {
      if (hash.size === 0) return null;
      return Object.fromEntries(hash.entries());
    },
    async hdel(_key: string, field: string) { hash.delete(field); },
  },
}));

import {
  createTextbook, listTextbooks, getTextbook, updateTextbook,
  deleteTextbook, toPublic, generatePassword,
} from "@/lib/textbooks";

beforeEach(() => { hash.clear(); });

describe("generatePassword", () => {
  it("is 6 chars from the safe alphabet", () => {
    const pw = generatePassword();
    expect(pw).toMatch(/^[23456789abcdefghjkmnpqrstuvwxyz]{6}$/);
  });
});

describe("CRUD", () => {
  it("creates with auto id and auto password", async () => {
    const t = await createTextbook({ course: "C", period: "P", company: "Co", url: "https://x" });
    expect(t.id).toBeTruthy();
    expect(t.password).toMatch(/^[23456789abcdefghjkmnpqrstuvwxyz]{6}$/);
    expect(await getTextbook(t.id)).toEqual(t);
  });

  it("keeps a provided password", async () => {
    const t = await createTextbook({ course: "C", period: "P", company: "Co", url: "https://x", password: "abc234" });
    expect(t.password).toBe("abc234");
  });

  it("lists all and updates and deletes", async () => {
    const a = await createTextbook({ course: "A", period: "P", company: "Co", url: "https://a" });
    await createTextbook({ course: "B", period: "P", company: "Co", url: "https://b" });
    expect((await listTextbooks()).length).toBe(2);

    const upd = await updateTextbook(a.id, { course: "A2", period: "P2", company: "Co2", url: "https://a2", password: "zzz234" });
    expect(upd?.course).toBe("A2");
    expect((await getTextbook(a.id))?.url).toBe("https://a2");

    await deleteTextbook(a.id);
    expect(await getTextbook(a.id)).toBeNull();
    expect((await listTextbooks()).length).toBe(1);
  });

  it("toPublic strips url and password", () => {
    const pub = toPublic({ id: "1", course: "C", period: "P", company: "Co", url: "secret", password: "secret" });
    expect(pub).toEqual({ id: "1", course: "C", period: "P", company: "Co" });
    expect(JSON.stringify(pub)).not.toContain("secret");
  });
});
```

- [ ] **Step 2: 테스트 실패 확인**

Run: `npx vitest run src/lib/textbooks.test.ts`
Expected: FAIL — 모듈 없음.

- [ ] **Step 3: 구현 작성**

Create `src/lib/textbooks.ts`:
```ts
import { randomUUID, randomInt } from "crypto";
import { redis } from "@/lib/redis";

const KEY = "textbooks";
// 혼동되는 문자(0,1,i,l,o)를 제외해 소리 내어 불러주기 쉽게 한다.
const ALPHABET = "23456789abcdefghjkmnpqrstuvwxyz";

export type Textbook = {
  id: string; course: string; period: string; company: string; url: string; password: string;
};
export type PublicTextbook = Pick<Textbook, "id" | "course" | "period" | "company">;
export type TextbookInput = {
  course: string; period: string; company: string; url: string; password?: string;
};

export function generatePassword(): string {
  let out = "";
  for (let i = 0; i < 6; i++) out += ALPHABET[randomInt(ALPHABET.length)];
  return out;
}

export function toPublic(t: Textbook): PublicTextbook {
  return { id: t.id, course: t.course, period: t.period, company: t.company };
}

export async function listTextbooks(): Promise<Textbook[]> {
  const all = await redis.hgetall<Record<string, Textbook>>(KEY);
  if (!all) return [];
  return Object.values(all);
}

export async function getTextbook(id: string): Promise<Textbook | null> {
  return (await redis.hget<Textbook>(KEY, id)) ?? null;
}

export async function createTextbook(input: TextbookInput): Promise<Textbook> {
  const item: Textbook = {
    id: randomUUID(),
    course: input.course,
    period: input.period,
    company: input.company,
    url: input.url,
    password: input.password?.trim() || generatePassword(),
  };
  await redis.hset(KEY, { [item.id]: item });
  return item;
}

export async function updateTextbook(id: string, input: TextbookInput): Promise<Textbook | null> {
  const existing = await getTextbook(id);
  if (!existing) return null;
  const item: Textbook = {
    id,
    course: input.course,
    period: input.period,
    company: input.company,
    url: input.url,
    password: input.password?.trim() || existing.password,
  };
  await redis.hset(KEY, { [id]: item });
  return item;
}

export async function deleteTextbook(id: string): Promise<void> {
  await redis.hdel(KEY, id);
}
```

- [ ] **Step 4: 테스트 통과 확인**

Run: `npx vitest run src/lib/textbooks.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/textbooks.ts src/lib/textbooks.test.ts
git commit -m "feat: 교재 Redis CRUD 및 id/비번 생성기 추가"
```

---

## Task 5: 비번 검증 API (`/api/unlock`)

**Files:**
- Create: `src/app/api/unlock/route.ts`
- Test: 수동 검증 (curl) — 이 라우트는 실제 Redis/네트워크에 의존하므로 자동 테스트 대신 dev 서버에서 확인.

**Interfaces:**
- Consumes: `getTextbook` (textbooks.ts), `checkBlock`/`recordFailure`/`clearFailures` (ratelimit.ts).
- Produces: `POST /api/unlock`
  - 요청 body: `{ id: string, password: string }`
  - 성공 `200 { url: string }`
  - 실패 `401 { error: "wrong", blockedFor?: number }`
  - 차단 `429 { error: "blocked", blockedFor: number }`
  - 잘못된 입력 `400 { error: "bad_request" }`

- [ ] **Step 1: 구현 작성**

Create `src/app/api/unlock/route.ts`:
```ts
import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";
import { getTextbook } from "@/lib/textbooks";
import { checkBlock, recordFailure, clearFailures } from "@/lib/ratelimit";

export const runtime = "nodejs";

function clientIp(req: NextRequest): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

function safeEqual(a: string, b: string): boolean {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ba.length !== bb.length) return false;
  return timingSafeEqual(ba, bb);
}

export async function POST(req: NextRequest) {
  let body: { id?: unknown; password?: unknown };
  try { body = await req.json(); } catch { return NextResponse.json({ error: "bad_request" }, { status: 400 }); }
  const id = typeof body.id === "string" ? body.id : "";
  const password = typeof body.password === "string" ? body.password : "";
  if (!id || !password) return NextResponse.json({ error: "bad_request" }, { status: 400 });

  const scope = `${clientIp(req)}:${id}`;

  const blocked = await checkBlock(scope);
  if (blocked.blocked) {
    return NextResponse.json({ error: "blocked", blockedFor: blocked.retryAfter }, { status: 429 });
  }

  const item = await getTextbook(id);
  if (item && safeEqual(item.password, password)) {
    await clearFailures(scope);
    return NextResponse.json({ url: item.url }, { status: 200 });
  }

  const fail = await recordFailure(scope);
  return NextResponse.json(
    { error: "wrong", ...(fail.blocked ? { blockedFor: fail.retryAfter } : {}) },
    { status: 401 },
  );
}
```

- [ ] **Step 2: 로컬 환경변수 준비**

`.env.local`을 만들어 실제 Upstash 값과 `ADMIN_PASSWORD`, `SESSION_SECRET`을 채운다 (없으면 Upstash Marketplace에서 무료 Redis 생성 후 REST URL/TOKEN 복사). Redis에 임시 교재 하나를 넣기 위해 dev 서버 실행 후 Task 8의 관리자 API로 넣거나, 아래처럼 임시 스크립트로 넣어도 된다.

- [ ] **Step 3: dev 서버 실행 후 검증**

Run: `npm run dev` (별도 터미널)

먼저 관리자 API가 아직 없으므로, Redis에 테스트 데이터가 있다고 가정하고(또는 Task 8 완료 후 재검증) 잘못된 비번으로 401을 확인한다:
```bash
curl -s -X POST http://localhost:3000/api/unlock \
  -H 'content-type: application/json' \
  -d '{"id":"nonexistent","password":"wrong1"}' -w '\n%{http_code}\n'
```
Expected: `{"error":"wrong"}` 와 `401`.

빈 입력 검증:
```bash
curl -s -X POST http://localhost:3000/api/unlock \
  -H 'content-type: application/json' -d '{}' -w '\n%{http_code}\n'
```
Expected: `{"error":"bad_request"}` 와 `400`.

> 정상 200 및 429(5회 실패 후) 검증은 Task 8에서 실제 교재를 생성한 뒤 재수행한다 (Task 8 Step 마지막에 포함).

- [ ] **Step 4: Commit**

```bash
git add src/app/api/unlock/route.ts
git commit -m "feat: 비번 검증 unlock API 추가 (차단 연동)"
```

---

## Task 6: 관리자 로그인/로그아웃 API

**Files:**
- Create: `src/app/api/admin/login/route.ts`
- Create: `src/app/api/admin/logout/route.ts`

**Interfaces:**
- Consumes: `signSession`, `SESSION_COOKIE`, `SESSION_TTL_SECONDS` (session.ts); `checkBlock`/`recordFailure`/`clearFailures` (ratelimit.ts).
- Produces:
  - `POST /api/admin/login` body `{ password: string }` → 성공 `200 { ok: true }` + `admin_session` 쿠키; 실패 `401 { error: "wrong", blockedFor? }`; 차단 `429 { error: "blocked", blockedFor }`.
  - `POST /api/admin/logout` → `200 { ok: true }` + 쿠키 삭제.

- [ ] **Step 1: 로그인 라우트 작성**

Create `src/app/api/admin/login/route.ts`:
```ts
import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";
import { signSession, SESSION_COOKIE, SESSION_TTL_SECONDS } from "@/lib/session";
import { checkBlock, recordFailure, clearFailures } from "@/lib/ratelimit";

export const runtime = "nodejs";

function clientIp(req: NextRequest): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}
function safeEqual(a: string, b: string): boolean {
  const ba = Buffer.from(a), bb = Buffer.from(b);
  if (ba.length !== bb.length) return false;
  return timingSafeEqual(ba, bb);
}

export async function POST(req: NextRequest) {
  let body: { password?: unknown };
  try { body = await req.json(); } catch { return NextResponse.json({ error: "bad_request" }, { status: 400 }); }
  const password = typeof body.password === "string" ? body.password : "";
  const scope = `${clientIp(req)}:admin`;

  const blocked = await checkBlock(scope);
  if (blocked.blocked) return NextResponse.json({ error: "blocked", blockedFor: blocked.retryAfter }, { status: 429 });

  const admin = process.env.ADMIN_PASSWORD ?? "";
  if (password && admin && safeEqual(admin, password)) {
    await clearFailures(scope);
    const res = NextResponse.json({ ok: true }, { status: 200 });
    res.cookies.set(SESSION_COOKIE, signSession(SESSION_TTL_SECONDS), {
      httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: SESSION_TTL_SECONDS,
    });
    return res;
  }

  const fail = await recordFailure(scope);
  return NextResponse.json(
    { error: "wrong", ...(fail.blocked ? { blockedFor: fail.retryAfter } : {}) },
    { status: 401 },
  );
}
```

- [ ] **Step 2: 로그아웃 라우트 작성**

Create `src/app/api/admin/logout/route.ts`:
```ts
import { NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/session";

export const runtime = "nodejs";

export async function POST() {
  const res = NextResponse.json({ ok: true }, { status: 200 });
  res.cookies.set(SESSION_COOKIE, "", { httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: 0 });
  return res;
}
```

- [ ] **Step 3: dev 서버로 검증**

Run (dev 서버 실행 중):
```bash
curl -s -X POST http://localhost:3000/api/admin/login \
  -H 'content-type: application/json' \
  -d '{"password":"WRONG"}' -w '\n%{http_code}\n'
```
Expected: `{"error":"wrong"}` 와 `401`.

```bash
curl -s -i -X POST http://localhost:3000/api/admin/login \
  -H 'content-type: application/json' \
  -d "{\"password\":\"$(grep ADMIN_PASSWORD .env.local | cut -d= -f2)\"}" | grep -i 'set-cookie\|HTTP/'
```
Expected: `200` 응답과 `set-cookie: admin_session=...` 헤더.

- [ ] **Step 4: Commit**

```bash
git add src/app/api/admin/login/route.ts src/app/api/admin/logout/route.ts
git commit -m "feat: 관리자 로그인/로그아웃 API 추가 (세션 쿠키 + 차단)"
```

---

## Task 7: 관리자 교재 CRUD API (세션 보호)

**Files:**
- Create: `src/app/api/admin/textbooks/route.ts`
- Create: `src/app/api/admin/textbooks/[id]/route.ts`

**Interfaces:**
- Consumes: `verifySession`, `SESSION_COOKIE` (session.ts); `listTextbooks`, `createTextbook`, `updateTextbook`, `deleteTextbook` (textbooks.ts).
- Produces:
  - `GET /api/admin/textbooks` → `200 Textbook[]` (전체 필드) / 미인증 `401`.
  - `POST /api/admin/textbooks` body `{ course, period, company, url, password? }` → `201 Textbook`.
  - `PUT /api/admin/textbooks/{id}` body 동일 → `200 Textbook` / 없으면 `404`.
  - `DELETE /api/admin/textbooks/{id}` → `200 { ok: true }`.
  - 공통 헬퍼 `requireAdmin()`은 각 파일에 인라인으로 둔다 (작은 함수 중복 허용).

- [ ] **Step 1: 목록/생성 라우트 작성**

Create `src/app/api/admin/textbooks/route.ts`:
```ts
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySession, SESSION_COOKIE } from "@/lib/session";
import { listTextbooks, createTextbook, TextbookInput } from "@/lib/textbooks";

export const runtime = "nodejs";

async function isAdmin(): Promise<boolean> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  return verifySession(token);
}

function parseInput(body: Record<string, unknown>): TextbookInput | null {
  const course = typeof body.course === "string" ? body.course.trim() : "";
  const period = typeof body.period === "string" ? body.period.trim() : "";
  const company = typeof body.company === "string" ? body.company.trim() : "";
  const url = typeof body.url === "string" ? body.url.trim() : "";
  const password = typeof body.password === "string" ? body.password : undefined;
  if (!course || !period || !company || !url) return null;
  return { course, period, company, url, password };
}

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  return NextResponse.json(await listTextbooks(), { status: 200 });
}

export async function POST(req: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const input = parseInput(await req.json().catch(() => ({})));
  if (!input) return NextResponse.json({ error: "bad_request" }, { status: 400 });
  return NextResponse.json(await createTextbook(input), { status: 201 });
}
```

- [ ] **Step 2: 수정/삭제 라우트 작성**

Create `src/app/api/admin/textbooks/[id]/route.ts`:
```ts
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySession, SESSION_COOKIE } from "@/lib/session";
import { updateTextbook, deleteTextbook, TextbookInput } from "@/lib/textbooks";

export const runtime = "nodejs";

async function isAdmin(): Promise<boolean> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  return verifySession(token);
}
function parseInput(body: Record<string, unknown>): TextbookInput | null {
  const course = typeof body.course === "string" ? body.course.trim() : "";
  const period = typeof body.period === "string" ? body.period.trim() : "";
  const company = typeof body.company === "string" ? body.company.trim() : "";
  const url = typeof body.url === "string" ? body.url.trim() : "";
  const password = typeof body.password === "string" ? body.password : undefined;
  if (!course || !period || !company || !url) return null;
  return { course, period, company, url, password };
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { id } = await params;
  const input = parseInput(await req.json().catch(() => ({})));
  if (!input) return NextResponse.json({ error: "bad_request" }, { status: 400 });
  const updated = await updateTextbook(id, input);
  if (!updated) return NextResponse.json({ error: "not_found" }, { status: 404 });
  return NextResponse.json(updated, { status: 200 });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { id } = await params;
  await deleteTextbook(id);
  return NextResponse.json({ ok: true }, { status: 200 });
}
```

- [ ] **Step 3: dev 서버로 검증 (인증 흐름 전체)**

미인증 401:
```bash
curl -s http://localhost:3000/api/admin/textbooks -w '\n%{http_code}\n'
```
Expected: `{"error":"unauthorized"}` 와 `401`.

로그인 → 쿠키 저장 → 생성 → 목록:
```bash
curl -s -c cookies.txt -X POST http://localhost:3000/api/admin/login \
  -H 'content-type: application/json' \
  -d "{\"password\":\"$(grep ADMIN_PASSWORD .env.local | cut -d= -f2)\"}" >/dev/null

curl -s -b cookies.txt -X POST http://localhost:3000/api/admin/textbooks \
  -H 'content-type: application/json' \
  -d '{"course":"바이브코딩","period":"2026-03-01 ~ 03-05","company":"KB","url":"https://drive.google.com/test"}' \
  -w '\n%{http_code}\n'
```
Expected: 생성된 Textbook JSON(자동 `id`, 6자리 `password`)과 `201`.

```bash
curl -s -b cookies.txt http://localhost:3000/api/admin/textbooks -w '\n%{http_code}\n'
```
Expected: 방금 만든 교재가 담긴 배열과 `200`.

- [ ] **Step 4: Task 5(unlock) 정상/차단 재검증**

위에서 만든 교재의 `id`와 `password`로:
```bash
curl -s -X POST http://localhost:3000/api/unlock -H 'content-type: application/json' \
  -d '{"id":"<생성된 id>","password":"<생성된 6자리>"}' -w '\n%{http_code}\n'
```
Expected: `{"url":"https://drive.google.com/test"}` 와 `200`.

틀린 비번 6번 반복 → 5번째부터 `blockedFor` 등장, 그 후 `429` 확인:
```bash
for i in 1 2 3 4 5 6; do
  curl -s -X POST http://localhost:3000/api/unlock -H 'content-type: application/json' \
    -d '{"id":"<생성된 id>","password":"nope00"}' -w ' -> %{http_code}\n'
done
```
Expected: 처음 4번 `401`(blockedFor 없음), 5번째 `401`(`blockedFor:60` 포함 가능), 이후 `429`.
(검증 후 정상 비번으로 한 번 unlock 하면 카운터가 초기화된다.)

- [ ] **Step 5: Commit**

```bash
git add src/app/api/admin/textbooks/route.ts "src/app/api/admin/textbooks/[id]/route.ts"
git commit -m "feat: 세션 보호 관리자 교재 CRUD API 추가"
```

---

## Task 8: 공개 목록 페이지 + 비번 모달 (`/go`)

**Files:**
- Create: `src/app/go/page.tsx` (서버 컴포넌트)
- Create: `src/app/go/TextbookList.tsx` (클라이언트)

**Interfaces:**
- Consumes: `listTextbooks`, `toPublic`, `PublicTextbook` (textbooks.ts); `POST /api/unlock`.
- Produces: `go.sideonai.com/`(=`/go`) 렌더. 서버는 `PublicTextbook[]`만 클라이언트로 전달.

- [ ] **Step 1: 서버 페이지 작성**

Create `src/app/go/page.tsx`:
```tsx
import { listTextbooks, toPublic } from "@/lib/textbooks";
import TextbookList from "./TextbookList";

export const dynamic = "force-dynamic"; // Redis에서 매 요청 최신 목록

export const metadata = {
  title: "교재 다운로드 · SideOnAI",
  description: "과정을 선택하고 비밀번호를 입력해 교재를 다운로드하세요.",
};

export default async function GoPage() {
  const items = (await listTextbooks()).map(toPublic);
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <main className="max-w-md mx-auto px-4 py-8 sm:py-12">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">📚 교재 다운로드</h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm">과정을 선택하고 안내받은 비밀번호를 입력하세요.</p>
        </div>
        <TextbookList items={items} />
      </main>
    </div>
  );
}
```

- [ ] **Step 2: 클라이언트 목록/모달 작성**

Create `src/app/go/TextbookList.tsx`:
```tsx
"use client";

import { useState } from "react";
import type { PublicTextbook } from "@/lib/textbooks";

export default function TextbookList({ items }: { items: PublicTextbook[] }) {
  const [active, setActive] = useState<PublicTextbook | null>(null);

  if (items.length === 0) {
    return <p className="text-center text-gray-500 dark:text-gray-400">아직 등록된 교재가 없습니다.</p>;
  }

  return (
    <>
      <div className="space-y-3">
        {items.map((it) => (
          <button
            key={it.id}
            onClick={() => setActive(it)}
            className="w-full text-left px-6 py-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all hover:scale-[1.01] active:scale-[0.99]"
          >
            <div className="font-semibold text-gray-900 dark:text-white">{it.course}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{it.company} · {it.period}</div>
          </button>
        ))}
      </div>
      {active && <UnlockModal item={active} onClose={() => setActive(null)} />}
    </>
  );
}

function UnlockModal({ item, onClose }: { item: PublicTextbook; onClose: () => void }) {
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading">("idle");
  const [error, setError] = useState("");
  const [url, setUrl] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading"); setError("");
    const res = await fetch("/api/unlock", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ id: item.id, password }),
    });
    setStatus("idle");
    if (res.ok) { const d = await res.json(); setUrl(d.url); return; }
    const d = await res.json().catch(() => ({}));
    if (res.status === 429 || d.blockedFor) {
      const min = Math.ceil((d.blockedFor ?? 60) / 60);
      setError(`시도가 너무 많습니다. 약 ${min}분 후 다시 시도하세요.`);
    } else {
      setError("비밀번호가 틀렸습니다.");
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={onClose}>
      <div className="w-full max-w-sm rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="font-semibold text-gray-900 dark:text-white">{item.course}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">{item.company} · {item.period}</div>
        {url ? (
          <a href={url} target="_blank" rel="noopener noreferrer"
            className="block w-full text-center px-4 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700">
            ⬇️ 다운로드 열기
          </a>
        ) : (
          <form onSubmit={submit} className="space-y-3">
            <input
              autoFocus value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호 6자리" inputMode="text"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-transparent text-gray-900 dark:text-white"
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button type="submit" disabled={status === "loading"}
              className="w-full px-4 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 disabled:opacity-50">
              {status === "loading" ? "확인 중…" : "확인"}
            </button>
          </form>
        )}
        <button onClick={onClose} className="mt-3 w-full text-sm text-gray-400 hover:text-gray-600">닫기</button>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: 브라우저 검증**

Run: `npm run dev` (실행 중이면 생략). 브라우저에서 `http://localhost:3000/go` 접속.
Expected:
- Task 7에서 만든 교재가 카드로 보임 (과정명 / 회사 · 기간). `url`·`password`는 페이지 소스(우클릭 → 페이지 소스 보기)에 **없어야 함** — Ctrl+F로 `drive.google.com` 검색 시 안 나와야 정상.
- 카드 클릭 → 모달 → 틀린 비번 → "비밀번호가 틀렸습니다".
- 올바른 6자리 → "⬇️ 다운로드 열기" 버튼 등장, 클릭 시 드라이브 링크 새 탭.

- [ ] **Step 4: Commit**

```bash
git add src/app/go/page.tsx src/app/go/TextbookList.tsx
git commit -m "feat: 공개 교재 목록 페이지와 비번 잠금 해제 모달 추가"
```

---

## Task 9: 관리자 페이지 (`/go/admin`)

**Files:**
- Create: `src/app/go/admin/page.tsx` (서버: 세션 확인)
- Create: `src/app/go/admin/AdminLogin.tsx` (클라이언트)
- Create: `src/app/go/admin/AdminDashboard.tsx` (클라이언트)

**Interfaces:**
- Consumes: `verifySession`, `SESSION_COOKIE` (session.ts); `listTextbooks`, `Textbook` (textbooks.ts); `POST /api/admin/login`, `POST /api/admin/logout`, `POST/PUT/DELETE /api/admin/textbooks`.
- Produces: `go.sideonai.com/admin`(=`/go/admin`). 미인증 시 로그인 폼, 인증 시 대시보드.

- [ ] **Step 1: 서버 페이지 작성**

Create `src/app/go/admin/page.tsx`:
```tsx
import { cookies } from "next/headers";
import { verifySession, SESSION_COOKIE } from "@/lib/session";
import { listTextbooks } from "@/lib/textbooks";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";

export const dynamic = "force-dynamic";
export const metadata = { title: "관리자 · 교재", robots: { index: false, follow: false } };

export default async function AdminPage() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  const authed = verifySession(token);
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <main className="max-w-2xl mx-auto px-4 py-8">
        {authed ? <AdminDashboard initialItems={await listTextbooks()} /> : <AdminLogin />}
      </main>
    </div>
  );
}
```

- [ ] **Step 2: 로그인 폼 작성**

Create `src/app/go/admin/AdminLogin.tsx`:
```tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST", headers: { "content-type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) { router.refresh(); return; }
    const d = await res.json().catch(() => ({}));
    if (res.status === 429 || d.blockedFor) {
      setError(`시도가 너무 많습니다. 약 ${Math.ceil((d.blockedFor ?? 60) / 60)}분 후 다시 시도하세요.`);
    } else setError("비밀번호가 틀렸습니다.");
  }

  return (
    <form onSubmit={submit} className="max-w-sm mx-auto mt-20 space-y-3">
      <h1 className="text-xl font-bold text-gray-900 dark:text-white text-center">관리자 로그인</h1>
      <input type="password" autoFocus value={password} onChange={(e) => setPassword(e.target.value)}
        placeholder="관리자 비밀번호"
        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-transparent text-gray-900 dark:text-white" />
      {error && <p className="text-sm text-red-500">{error}</p>}
      <button className="w-full px-4 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700">로그인</button>
    </form>
  );
}
```

- [ ] **Step 3: 대시보드 작성**

Create `src/app/go/admin/AdminDashboard.tsx`:
```tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Textbook } from "@/lib/textbooks";

const EMPTY = { course: "", period: "", company: "", url: "", password: "" };
const ALPHABET = "23456789abcdefghjkmnpqrstuvwxyz";
function randomPw() {
  let s = ""; const a = new Uint32Array(6); crypto.getRandomValues(a);
  for (let i = 0; i < 6; i++) s += ALPHABET[a[i] % ALPHABET.length];
  return s;
}

export default function AdminDashboard({ initialItems }: { initialItems: Textbook[] }) {
  const router = useRouter();
  const [items] = useState(initialItems);
  const [form, setForm] = useState({ ...EMPTY });
  const [editId, setEditId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  function set<K extends keyof typeof form>(k: K, v: string) { setForm((f) => ({ ...f, [k]: v })); }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const url = editId ? `/api/admin/textbooks/${editId}` : "/api/admin/textbooks";
    const method = editId ? "PUT" : "POST";
    const res = await fetch(url, { method, headers: { "content-type": "application/json" }, body: JSON.stringify(form) });
    setBusy(false);
    if (res.ok) { setForm({ ...EMPTY }); setEditId(null); router.refresh(); }
    else alert("저장 실패: 입력값을 확인하세요.");
  }

  function edit(t: Textbook) { setEditId(t.id); setForm({ course: t.course, period: t.period, company: t.company, url: t.url, password: t.password }); }

  async function remove(id: string) {
    if (!confirm("삭제할까요?")) return;
    const res = await fetch(`/api/admin/textbooks/${id}`, { method: "DELETE" });
    if (res.ok) router.refresh();
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.refresh();
  }

  const label = "block text-sm text-gray-600 dark:text-gray-300 mb-1";
  const input = "w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent text-gray-900 dark:text-white";

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">교재 관리</h1>
        <button onClick={logout} className="text-sm text-gray-500 hover:text-gray-700">로그아웃</button>
      </div>

      <form onSubmit={save} className="space-y-3 p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
        <div className="font-semibold text-gray-900 dark:text-white">{editId ? "교재 수정" : "교재 추가"}</div>
        <div><label className={label}>과정명</label><input className={input} value={form.course} onChange={(e) => set("course", e.target.value)} /></div>
        <div><label className={label}>교육 기간</label><input className={input} value={form.period} onChange={(e) => set("period", e.target.value)} placeholder="2026-03-01 ~ 03-05" /></div>
        <div><label className={label}>회사명</label><input className={input} value={form.company} onChange={(e) => set("company", e.target.value)} /></div>
        <div><label className={label}>구글 드라이브 링크</label><input className={input} value={form.url} onChange={(e) => set("url", e.target.value)} placeholder="https://drive.google.com/..." /></div>
        <div>
          <label className={label}>비밀번호 (비우면 자동 생성)</label>
          <div className="flex gap-2">
            <input className={input} value={form.password} onChange={(e) => set("password", e.target.value)} placeholder="자동 생성" />
            <button type="button" onClick={() => set("password", randomPw())} className="px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-sm whitespace-nowrap">자동 생성</button>
          </div>
        </div>
        <div className="flex gap-2">
          <button disabled={busy} className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 disabled:opacity-50">{editId ? "수정 저장" : "추가"}</button>
          {editId && <button type="button" onClick={() => { setEditId(null); setForm({ ...EMPTY }); }} className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700">취소</button>}
        </div>
      </form>

      <div className="space-y-2">
        {items.length === 0 && <p className="text-gray-500">등록된 교재가 없습니다.</p>}
        {items.map((t) => (
          <div key={t.id} className="flex items-center justify-between p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
            <div className="min-w-0">
              <div className="font-medium text-gray-900 dark:text-white truncate">{t.course}</div>
              <div className="text-sm text-gray-500 truncate">{t.company} · {t.period} · 🔑 {t.password}</div>
            </div>
            <div className="flex gap-2 shrink-0 ml-3">
              <button onClick={() => edit(t)} className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-sm">수정</button>
              <button onClick={() => remove(t.id)} className="px-3 py-1.5 rounded-lg bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-300 text-sm">삭제</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: 브라우저 검증**

브라우저에서 `http://localhost:3000/go/admin`:
Expected:
- 처음엔 로그인 폼. 틀린 비번 → "비밀번호가 틀렸습니다".
- 올바른 `ADMIN_PASSWORD` → 대시보드 표시(기존 교재 목록 + 비번 노출은 관리자에게만).
- 추가 폼에서 "자동 생성" 클릭 → 6자리 채워짐 → 추가 → 목록에 즉시 반영.
- 수정 → 값 로드 → 저장 반영. 삭제 → 목록에서 사라짐.
- 로그아웃 → 다시 로그인 폼.
- 로그아웃 상태에서 `curl -s http://localhost:3000/api/admin/textbooks` → `401` (직접 API 접근 차단 확인).

- [ ] **Step 5: Commit**

```bash
git add src/app/go/admin/page.tsx src/app/go/admin/AdminLogin.tsx src/app/go/admin/AdminDashboard.tsx
git commit -m "feat: 관리자 페이지(로그인 + 교재 CRUD 대시보드) 추가"
```

---

## Task 10: 서브도메인 라우팅 (`go.sideonai.com` → `/go`)

**Files:**
- Create: `src/middleware.ts`

**Interfaces:**
- Produces: 호스트가 `go.sideonai.com`(또는 로컬 `go.localhost`)인 요청의 페이지 경로를 `/go` 접두어로 리라이트. `/api`, `/_next`, 정적 파일은 그대로 통과. 다른 호스트(`sideonai.com` 등)는 전혀 건드리지 않는다.

- [ ] **Step 1: 미들웨어 작성**

Create `src/middleware.ts`:
```ts
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const host = (req.headers.get("host") || "").split(":")[0];
  const isGo = host === "go.sideonai.com" || host === "go.localhost";
  if (!isGo) return NextResponse.next();

  const { pathname } = req.nextUrl;
  if (pathname.startsWith("/go") || pathname.startsWith("/api") || pathname.startsWith("/_next")) {
    return NextResponse.next();
  }
  const url = req.nextUrl.clone();
  url.pathname = `/go${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // 정적 자산 제외한 모든 경로에서 실행
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
```

- [ ] **Step 2: 로컬 검증 (호스트 헤더로 서브도메인 흉내)**

dev 서버 실행 중, `go.sideonai.com` 호스트로 루트 요청 시 `/go` 내용이 나오는지 확인:
```bash
curl -s -H 'host: go.sideonai.com' http://localhost:3000/ | grep -o '교재 다운로드' | head -1
```
Expected: `교재 다운로드` 출력 (루트가 목록 페이지로 리라이트됨).

```bash
curl -s -H 'host: go.sideonai.com' http://localhost:3000/admin | grep -o '관리자 로그인' | head -1
```
Expected: `관리자 로그인` 출력.

메인 사이트 무영향 확인:
```bash
curl -s -H 'host: sideonai.com' http://localhost:3000/ | grep -o 'SideOnAI' | head -1
```
Expected: `SideOnAI` (기존 프로필 페이지 그대로).

- [ ] **Step 3: Commit**

```bash
git add src/middleware.ts
git commit -m "feat: go.sideonai.com 호스트를 /go로 리라이트하는 미들웨어 추가"
```

---

## Task 11: 마무리 — 빌드 검증 · 문서 · 배포 노트

**Files:**
- Modify: `README.md` (설정/운영 섹션 추가)
- Create: `docs/superpowers/plans/DEPLOY-NOTES-go.md` (배포 체크리스트)

**Interfaces:**
- 없음 (문서/검증만).

- [ ] **Step 1: 전체 테스트 + 타입 + 빌드**

Run:
```bash
npm test && npx tsc --noEmit && npm run build
```
Expected: 단위 테스트 PASS, 타입 에러 없음, 프로덕션 빌드 성공.

- [ ] **Step 2: 배포 노트 작성**

Create `docs/superpowers/plans/DEPLOY-NOTES-go.md`:
```markdown
# go.sideonai.com 배포 체크리스트

1. Vercel 프로젝트에 도메인 `go.sideonai.com` 추가 (Settings → Domains).
2. Vercel Marketplace에서 Upstash Redis(무료) 설치 → 이 프로젝트에 연결.
   - 주입되는 env: UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN
     (또는 KV_REST_API_URL / KV_REST_API_TOKEN — redis.ts가 둘 다 지원).
3. 환경변수 추가 (Production + Preview):
   - ADMIN_PASSWORD : 관리자 로그인 비번 (길게).
   - SESSION_SECRET : `openssl rand -hex 32` 결과.
4. 배포 후:
   - https://go.sideonai.com → 교재 목록.
   - https://go.sideonai.com/admin → 로그인 후 교재 추가.
5. 교재 추가는 항상 /admin 폼에서. 코드/재배포 불필요.
```

- [ ] **Step 3: README 갱신**

`README.md`에 아래 섹션을 추가(맨 끝):
```markdown
## go.sideonai.com — 비번 잠금 교재 다운로드

- 공개 목록: `/go` (도메인 `go.sideonai.com` 루트). 과정 선택 → 6자리 비번 → 구글 드라이브 링크 공개.
- 관리자: `/go/admin`. `ADMIN_PASSWORD`로 로그인, 폼으로 교재 추가/수정/삭제.
- 데이터/차단 카운터: Upstash Redis. 비번·링크는 서버에서만 처리(클라이언트 미노출).
- 필요한 env: `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`, `ADMIN_PASSWORD`, `SESSION_SECRET`.
- 설계/배포: `docs/superpowers/specs/2026-07-19-*`, `docs/superpowers/plans/DEPLOY-NOTES-go.md`.
```

- [ ] **Step 4: Commit**

```bash
git add README.md docs/superpowers/plans/DEPLOY-NOTES-go.md
git commit -m "docs: go.sideonai.com 운영/배포 문서 추가"
```

---

## Self-Review (작성자 체크 결과)

**Spec coverage:**
- 목록(과정명/기간/회사명) → Task 8 ✅
- 모달 비번 입력 → Task 8 ✅
- Edge Config 제거·Redis 통합 → Task 1,4 ✅
- 서버 검증, 링크/비번 미노출 → Task 5, Task 8 Step 3(소스 확인) ✅
- 계단식 차단(5/10/15/20 → 60/180/600/3600) → Task 2 ✅ (unlock·admin 양쪽 적용: Task 5,6)
- 관리자 페이지 + 단일 비번 로그인 + 세션 쿠키 → Task 3,6,9 ✅
- 비번 자동 생성 → Task 4(서버), Task 9(클라이언트 버튼) ✅
- 서브도메인 라우팅 → Task 10 ✅
- 배포/환경변수 → Task 11 ✅

**Placeholder scan:** 모든 코드 스텝에 실제 코드 포함, TBD/TODO 없음 ✅

**Type consistency:** `Textbook`/`PublicTextbook`/`TextbookInput` 시그니처가 Task 4 정의와 Task 5~9 사용처에서 일치. `blockDurationFor`/`checkBlock`/`recordFailure`/`clearFailures` 이름 일관. `SESSION_COOKIE`/`verifySession`/`signSession` 일관. `/api/unlock` 응답 `{url}`·`{error, blockedFor?}` 형태를 클라이언트가 동일하게 소비 ✅

**Known follow-ups (범위 밖):** 컴포넌트 단위 자동 테스트는 없음(테스트 인프라 최소화). 라우트/페이지는 dev 서버 수동 검증으로 대체 — 스펙 8절 YAGNI에 부합.
```
