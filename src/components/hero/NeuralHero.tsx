"use client";

import { useEffect, useRef, useState } from "react";
import CtaLink from "@/components/CtaLink";
import { DOMAIN_LINE, DOMAINS, SLOGAN, TAGLINE } from "@/data/site";
import { pickQuality, type Quality } from "./quality";
import type { FrameInfo, HeroScene } from "./scene";
import { stageValues } from "./stages";

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

function hasWebGL2(): boolean {
  try {
    return !!document.createElement("canvas").getContext("webgl2");
  } catch {
    return false;
  }
}

function HeroCopy({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <p className="label-mono mb-5">SideOnAI</p>
      <h1 className="hero-title text-[clamp(2.5rem,6.2vw,5.5rem)] font-bold leading-[1.05] tracking-[-0.035em] text-balance">
        {SLOGAN}
      </h1>
      <p className="mt-5 text-[clamp(1rem,1.4vw,1.25rem)] text-ink/75">{TAGLINE}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <CtaLink
          href="#contact"
          location="hero"
          className="rounded-full bg-accent px-6 py-3 text-[0.95rem] font-semibold text-bg transition hover:shadow-[0_0_32px_rgba(77,243,255,0.55)]"
        >
          협업 문의하기
        </CtaLink>
        <a
          href="#track"
          className="rounded-full border border-line bg-bg/40 px-6 py-3 text-[0.95rem] font-semibold text-ink backdrop-blur transition hover:border-accent/70"
        >
          강연 실적 보기
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
    const env = () => ({
      reducedMotion: reduce.matches,
      webgl: hasWebGL2(),
      coarsePointer: window.matchMedia("(pointer: coarse)").matches,
      width: window.innerWidth,
      cores: navigator.hardwareConcurrency ?? 0,
    });

    let current: Quality = pickQuality(env());
    setQuality(current);
    if (current === "static") return;

    let scene: HeroScene | null = null;
    let cancelled = false, inView = true, downgraded = false;
    let labelOpacity = 0, slowSince = 0, bootedAt = 0;

    const goStatic = () => {
      scene?.dispose();
      scene = null;
      current = "static";
      setQuality("static");
    };

    const onFrame = (f: FrameInfo) => {
      labelRefs.current.forEach((el, i) => {
        if (!el) return;
        el.style.transform = `translate3d(${f.domains[i].x}px, ${f.domains[i].y}px, 0)`;
        el.style.opacity = String(labelOpacity);
      });
      if (aiRef.current) {
        aiRef.current.style.transform = `translate3d(${f.core.x}px, ${f.core.y}px, 0)`;
        aiRef.current.style.opacity = String(labelOpacity);
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
      const show = 1 - st.exit;
      labelOpacity = st.domain * show;
      if (stageRef.current) stageRef.current.style.opacity = String(show);
      if (copyRef.current) {
        copyRef.current.style.opacity = String(st.copyOpacity);
        copyRef.current.style.transform = `translate3d(0, ${(1 - st.copyOpacity) * -24}px, 0)`;
        copyRef.current.style.pointerEvents = st.copyOpacity < 0.2 ? "none" : "";
        copyRef.current.style.visibility = st.copyOpacity === 0 ? "hidden" : "";
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
        scene?.dispose();
        current = q;
        setQuality(q);
        bootedAt = performance.now();
        slowSince = 0;
        scene = createHeroScene(canvas!, { quality: q, domainCount: DOMAINS.length, onFrame, onContextLost: goStatic });
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

    applyStage(progress());
    boot(current);

    return () => {
      cancelled = true;
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
  }, []);

  // 동작 줄이기 또는 WebGL 불가: 정지 화면. 내용은 모두 텍스트로 남는다.
  if (quality === "static") {
    return (
      <section id="top" className="relative flex min-h-svh items-center overflow-hidden">
        <div className="hero-poster" aria-hidden="true" />
        <div className="hero-vignette" aria-hidden="true" />
        <div className="relative mx-auto w-full max-w-6xl px-5 py-28 sm:px-8">
          <HeroCopy className="max-w-2xl" />
          <p className="mt-14 text-lg font-semibold text-ink">{DOMAIN_LINE}</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {DOMAINS.map((d) => (
              <li key={d} className="rounded-full border border-warm/70 bg-bg/70 px-4 py-1.5 text-[0.95rem] font-semibold">
                {d}
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  return (
    <section id="top" ref={trackRef} className="relative h-[280vh]">
      <div ref={stickyRef} className="sticky top-0 h-svh overflow-hidden">
        <div ref={stageRef} className="absolute inset-0">
          <div className="hero-poster" aria-hidden="true" />
          <canvas ref={canvasRef} aria-hidden="true" className="hero-canvas" />
          <div className="hero-vignette" aria-hidden="true" />
          <div ref={cursorRef} className="hero-cursor" aria-hidden="true" />

          {/* 3D 노드를 따라다니는 이름표. 같은 내용을 아래 sr-only 목록으로도 제공한다 */}
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
          </div>

          <div
            ref={lineRef}
            className="pointer-events-none absolute inset-x-0 bottom-[9svh] px-5 text-center opacity-0"
          >
            <p className="label-mono mb-3 !text-warm">Domain + AI</p>
            <p className="hero-title text-[clamp(1.5rem,3.4vw,2.75rem)] font-bold tracking-[-0.03em]">{DOMAIN_LINE}</p>
          </div>
        </div>

        <div
          ref={copyRef}
          className="absolute inset-x-5 bottom-[10svh] sm:inset-x-8 lg:inset-x-auto lg:bottom-auto lg:left-[6vw] lg:top-1/2 lg:w-[min(44vw,42rem)] lg:-translate-y-[46%]"
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
