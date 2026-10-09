"use client";

import { useEffect, useState } from "react";

// 방송국 아이덴트처럼 첫 방문에 한 번 도는 로고 오프닝(약 2.6초).
// 청록 빛줄기 → SideOn 글자가 아래에서 올라옴 → AI가 빛나며 궤도가 그려짐 → 빛이 스치고 → 화면이 걷힌다.
// 한 세션에 한 번만, 움직임 줄이기 설정이면 보이지 않는다. 클릭·키·스크롤로 바로 건너뛴다.
const KEY = "sideonai-ident-seen";
const LETTERS = ["S", "i", "d", "e", "O", "n"];

export default function LogoIdent() {
  const [phase, setPhase] = useState<"off" | "play" | "leave">("off");

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === "1";
    } catch {}
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // 첫 그리기 직후에 켠다(이펙트 안에서 바로 상태를 바꾸지 않도록)
    const raf = requestAnimationFrame(() => {
      try {
        sessionStorage.setItem(KEY, "1");
      } catch {}
      setPhase("play");
    });
    const leave = () => setPhase((p) => (p === "play" ? "leave" : p));
    const t1 = window.setTimeout(leave, 2300);
    const t2 = window.setTimeout(() => setPhase("off"), 2900);
    const skip = () => {
      leave();
      window.setTimeout(() => setPhase("off"), 500);
    };
    window.addEventListener("keydown", skip, { once: true });
    window.addEventListener("wheel", skip, { once: true, passive: true });
    window.addEventListener("touchstart", skip, { once: true, passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("wheel", skip);
      window.removeEventListener("touchstart", skip);
    };
  }, []);

  if (phase === "off") return null;
  return (
    <div
      aria-hidden="true"
      onClick={() => setPhase("leave")}
      onAnimationEnd={(e) => e.animationName === "ident-out" && setPhase("off")}
      className={`neon ident fixed inset-0 z-[100] flex items-center justify-center ${phase === "leave" ? "ident-leave" : ""}`}
    >
      <div className="relative px-6">
        <span className="ident-line" />
        <p className="relative flex items-baseline font-display text-[clamp(3.6rem,13vw,9.5rem)] leading-none">
          {LETTERS.map((ch, i) => (
            <span key={i} className="ident-letter" style={{ animationDelay: `${0.35 + i * 0.06}s` }}>
              {ch}
            </span>
          ))}
          <span className="ident-ai relative ml-[0.04em] text-accent">
            AI
            {/* AI를 감싸는 궤도. 히어로의 구체 둘레와 같은 모양 */}
            <svg className="ident-orbit" viewBox="0 0 200 120" fill="none">
              <ellipse cx="100" cy="60" rx="92" ry="44" stroke="#ffb454" strokeWidth="2" pathLength="1" transform="rotate(-12 100 60)" />
            </svg>
          </span>
        </p>
        <p className="ident-tag mt-5 text-center font-num text-[clamp(0.8rem,1.6vw,1.05rem)] tracking-[0.35em] text-ink/70">
          AI TRANSFORMATION PARTNER
        </p>
        <span className="ident-shine" />
      </div>
    </div>
  );
}
