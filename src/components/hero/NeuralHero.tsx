"use client";

import { useEffect, useRef, useState } from "react";
import CtaLink from "@/components/CtaLink";
import { DOMAIN_LINE, DOMAINS, SLOGAN, TAGLINE } from "@/data/site";
import { pickQuality, type Quality } from "./quality";
import type { FrameInfo, HeroScene, SceneState } from "./scene";
import { stageValues } from "./stages";

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

// WebGL2 지원 여부. 확인용 컨텍스트는 바로 놓아준다(브라우저의 컨텍스트 개수 상한을 아끼기 위해).
function hasWebGL2(): boolean {
  try {
    const gl = document.createElement("canvas").getContext("webgl2");
    gl?.getExtension("WEBGL_lose_context")?.loseContext();
    return !!gl;
  } catch {
    return false;
  }
}

function HeroCopy({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <h1
        className="hero-title hero-rise font-display text-[clamp(2.75rem,6.6vw,6rem)] leading-[1.08] text-balance"
        style={{ animationDelay: "0.15s" }}
      >
        {/* "AI"만 강조색으로. 슬로건 문자열에 AI가 없으면 그대로 출력된다 */}
        {SLOGAN.split("AI").map((part, i, all) => (
          <span key={i}>
            {part}
            {i < all.length - 1 && <span className="text-accent">AI</span>}
          </span>
        ))}
      </h1>
      <p className="hero-rise mt-6 text-[clamp(1rem,1.3vw,1.15rem)] text-muted" style={{ animationDelay: "0.45s" }}>
        {TAGLINE}
      </p>
      <div data-hero-cta className="hero-rise mt-10 flex flex-wrap items-center gap-x-8 gap-y-4" style={{ animationDelay: "0.7s" }}>
        <CtaLink
          href="#contact"
          location="hero"
          className="bg-ink px-6 py-3.5 text-[0.95rem] font-semibold text-bg transition hover:bg-accent"
        >
          협업 문의하기
        </CtaLink>
        <a href="#track" className="row-link text-[0.95rem] font-semibold text-ink">
          강연 실적 보기 <span className="arrow inline-block" aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  );
}

export default function NeuralHero() {
  // null: 아직 판정 전(서버 렌더 포함). 판정 전에는 3D용 구조를 그대로 그린다.
  const [quality, setQuality] = useState<Quality | null>(null);
  const trackRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const aiRef = useRef<HTMLDivElement>(null);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const track = trackRef.current, sticky = stickyRef.current, canvas = canvasRef.current;
    if (!track || !sticky || !canvas) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const webgl = hasWebGL2(); // 마운트 때 한 번만 확인한다
    const env = () => ({
      reducedMotion: reduce.matches,
      webgl,
      coarsePointer: window.matchMedia("(pointer: coarse)").matches,
      width: window.innerWidth,
      cores: navigator.hardwareConcurrency ?? 0,
    });

    let current: Quality = pickQuality(env());
    setQuality(current);
    if (current === "static") return;

    let scene: HeroScene | null = null;
    let cancelled = false, inView = true, downgraded = false;
    let stageShow = 1, slowSince = 0, bootedAt = 0;

    const onFrame = (f: FrameInfo) => {
      labelRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = f.domains[i].reveal;
        // 광선이 닿는 순간 노드 자리에서 커지며 나타난다
        el.style.transform = `translate3d(${f.domains[i].x}px, ${f.domains[i].y}px, 0) scale(${0.8 + 0.2 * r})`;
        el.style.opacity = String(r * stageShow);
      });
      if (aiRef.current) {
        aiRef.current.style.transform = `translate3d(${f.core.x}px, ${f.core.y}px, 0)`;
        aiRef.current.style.opacity = String(f.core.reveal * stageShow);
      }
      // high에서 40fps 미만이 2초 이어지면 low로 한 번만 내린다 (시작 직후 4초는 제외)
      if (current === "high" && !downgraded) {
        const now = performance.now();
        if (f.fps >= 40 || now - bootedAt < 4000) slowSince = 0;
        else if (!slowSince) slowSince = now;
        else if (now - slowSince > 2000) {
          downgraded = true;
          queueMicrotask(() => boot("low"));
        }
      }
    };

    const progress = () => {
      const r = track.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      return total > 0 ? clamp(-r.top / total, 0, 1) : 0;
    };

    const applyStage = (p: number) => {
      const st = stageValues(p);
      // 퇴장할 때 장면을 완전히 끄지 않고 옅게 남긴다. 빈 밤 화면 대신 별빛이 새벽 띠로 이어지며 올라간다
      const show = 1 - st.exit * 0.55;
      stageShow = show;
      if (stageRef.current) stageRef.current.style.opacity = String(show);
      const copy = copyRef.current;
      if (copy) {
        copy.style.opacity = String(st.copyOpacity);
        copy.style.transform = `translate3d(0, ${(1 - st.copyOpacity) * -24}px, 0)`;
        copy.style.pointerEvents = st.copyOpacity < 0.2 ? "none" : "";
        // 보이지 않는 버튼에 포커스가 가지 않게 한다. 제목은 스크린 리더가 계속 읽을 수 있도록 남긴다.
        const cta = copy.querySelector<HTMLElement>("[data-hero-cta]");
        if (cta) cta.inert = st.copyOpacity < 0.2;
      }
      if (hintRef.current) hintRef.current.style.opacity = String(st.copyOpacity);
      if (lineRef.current) {
        lineRef.current.style.opacity = String(st.domainCopy * show);
        lineRef.current.style.transform = `translate3d(0, ${(1 - st.domainCopy) * 20}px, 0)`;
      }
    };

    async function boot(q: "high" | "low") {
      try {
        const { createHeroScene } = await import("./scene");
        if (cancelled || current === "static") return;
        // 품질을 바꿔 다시 만들 때는 인트로를 다시 틀지 않고 하던 자리에서 이어 간다
        const resume: SceneState | undefined = scene?.getState();
        scene?.dispose();
        current = q;
        setQuality(q);
        bootedAt = performance.now();
        slowSince = 0;
        scene = createHeroScene(canvas!, {
          quality: q,
          domainCount: DOMAINS.length,
          resume,
          onFrame,
          onContextLost: goStatic,
        });
        scene.resize(sticky!.clientWidth, sticky!.clientHeight);
        scene.setProgress(progress());
        if (inView && !document.hidden) scene.start();
        canvas!.dataset.ready = "true";
      } catch (err) {
        console.error("히어로 3D 장면을 만들지 못했습니다", err);
        goStatic();
      }
    }

    let lastY = window.scrollY;
    const onScroll = () => {
      const p = progress();
      applyStage(p);
      scene?.setProgress(p);
      const dy = window.scrollY - lastY;
      lastY = window.scrollY;
      if (inView && dy !== 0) scene?.impulse(Math.min(1.5, Math.abs(dy) / 100) * 0.5, dy * 0.012);
    };

    const point = (clientX: number, clientY: number) => {
      const r = sticky.getBoundingClientRect();
      return [((clientX - r.left) / r.width) * 2 - 1, -(((clientY - r.top) / r.height) * 2 - 1)] as const;
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!inView) return;
      const [nx, ny] = point(e.clientX, e.clientY);
      scene?.setPointer(nx, ny);
      if (cursorRef.current) cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!inView || !e.touches[0]) return;
      const [nx, ny] = point(e.touches[0].clientX, e.touches[0].clientY);
      scene?.setPointer(nx, ny);
    };
    const onPointerDown = (e: PointerEvent) => {
      const [nx, ny] = point(e.clientX, e.clientY);
      scene?.shockAt(nx, ny);
    };
    const onVisibility = () => {
      if (document.hidden) scene?.stop();
      else if (inView) scene?.start();
    };
    const onReduceChange = () => {
      if (reduce.matches) goStatic();
    };

    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView && !document.hidden) scene?.start();
      else scene?.stop();
    });
    io.observe(track);

    const ro = new ResizeObserver(() => {
      scene?.resize(sticky.clientWidth, sticky.clientHeight);
      onScroll();
      // 창이 좁아져 high 조건을 벗어나면 low로 다시 만든다
      if (current === "high" && pickQuality(env()) === "low") {
        downgraded = true;
        boot("low");
      }
    });
    ro.observe(sticky);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    sticky.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("visibilitychange", onVisibility);
    reduce.addEventListener("change", onReduceChange);

    let detached = false;
    const teardown = () => {
      if (detached) return;
      detached = true;
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("touchmove", onTouchMove);
      sticky.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("visibilitychange", onVisibility);
      reduce.removeEventListener("change", onReduceChange);
      scene?.dispose();
      scene = null;
    };

    // 실행 중 정지 화면으로 바꾼다(컨텍스트 손실, 동작 줄이기 켬, 장면 생성 실패).
    // 히어로 높이가 280vh에서 한 화면으로 줄어들므로, 방문자가 이미 아래 섹션을 보고 있었다면
    // 줄어든 만큼 스크롤을 당겨 보던 내용이 제자리에 있게 한다.
    function goStatic() {
      if (current === "static") return;
      const before = track!.offsetHeight;
      const wasBelow = track!.getBoundingClientRect().bottom < window.innerHeight * 0.5;
      teardown();
      current = "static";
      setQuality("static");
      if (!wasBelow) return;
      requestAnimationFrame(() => {
        const after = document.getElementById("top")?.offsetHeight ?? before;
        if (after < before) window.scrollBy({ top: after - before, behavior: "instant" });
      });
    }

    applyStage(progress());
    boot(current);

    return () => {
      cancelled = true;
      teardown();
    };
  }, []);

  // 동작 줄이기 또는 WebGL 불가: 정지 화면. 내용은 모두 텍스트로 남는다.
  if (quality === "static") {
    return (
      <section id="top" className="night relative flex min-h-svh items-center overflow-hidden">
        <div className="hero-poster" aria-hidden="true" />
        <div className="hero-vignette" aria-hidden="true" />
        <div className="relative mx-auto w-full max-w-6xl px-5 py-28 sm:px-8">
          <HeroCopy className="max-w-2xl" />
          <p className="mt-14 font-display text-xl text-ink">{DOMAIN_LINE}</p>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
            {DOMAINS.map((d) => (
              <li key={d} className="border-b border-accent/70 pb-1 font-display text-lg">
                {d}
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  return (
    <section id="top" ref={trackRef} className="night hero-track relative h-[280vh]">
      <div ref={stickyRef} className="sticky top-0 h-screen overflow-hidden supports-[height:100svh]:h-svh">
        <div ref={stageRef} className="absolute inset-0">
          <div className="hero-poster" aria-hidden="true" />
          <canvas ref={canvasRef} aria-hidden="true" className="hero-canvas" />
          <div className="hero-vignette" aria-hidden="true" />
          <div ref={cursorRef} className="hero-cursor" aria-hidden="true" />

          {/* 3D 노드를 따라다니는 이름표와 도메인 문구. 같은 내용은 아래 sr-only 목록으로 한 번만 읽힌다 */}
          <div aria-hidden="true">
            {DOMAINS.map((d, i) => (
              <div
                key={d}
                ref={(el) => { labelRefs.current[i] = el; }}
                className={`domain-label ${i < DOMAINS.length / 2 ? "is-right" : "is-left"}`}
              >
                <span>{d}</span>
              </div>
            ))}
            <div ref={aiRef} className="domain-label is-core">
              <span>AI</span>
            </div>
            <div
              ref={lineRef}
              className="pointer-events-none absolute inset-x-0 bottom-[9svh] px-5 text-center opacity-0"
            >
              <p className="eyebrow mb-3 !text-accent">도메인 + AI</p>
              <p className="hero-title font-display text-[clamp(1.6rem,3.6vw,3rem)]">{DOMAIN_LINE}</p>
            </div>
          </div>
        </div>

        <div
          ref={copyRef}
          className="absolute inset-x-5 bottom-[10svh] sm:inset-x-8 lg:inset-x-auto lg:bottom-auto lg:left-[clamp(6vw,calc((100vw_-_72rem)/2_+_2rem),14vw)] lg:top-1/2 lg:w-[min(44vw,42rem)] lg:-translate-y-[46%]"
        >
          <HeroCopy />
        </div>

        <div ref={hintRef} className="hero-hint" aria-hidden="true">
          <span>Scroll</span>
        </div>

        <div className="sr-only">
          <p>{DOMAIN_LINE}</p>
          <ul>
            {DOMAINS.map((d) => (
              <li key={d}>{d} + AI</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
