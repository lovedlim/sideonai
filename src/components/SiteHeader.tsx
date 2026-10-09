"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import CtaLink from "@/components/CtaLink";
import MobileMenu from "@/components/MobileMenu";
import { NAV } from "@/data/site";

// 헤더 바로 아래 섹션의 색을 따라간다. 3D 히어로 위에서는 청록(neon), 문의·하단 위에서는 먹색(night).
function useOverNight() {
  const [night, setNight] = useState<"" | "night" | "neon">("neon");
  useEffect(() => {
    let raf = 0;
    const check = () => {
      raf = 0;
      const el = document.elementFromPoint(window.innerWidth / 2, 66);
      setNight(el?.closest(".neon") ? "neon" : el?.closest(".night") ? "night" : "");
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return night;
}

export default function SiteHeader() {
  const night = useOverNight();
  return (
    <header
      className={`${night} fixed inset-x-0 top-0 z-50 border-b border-line bg-bg/75 backdrop-blur-md transition-colors duration-300`}
    >
      {/* 키보드 사용자가 긴 히어로 구간을 건너뛸 수 있게 한다 */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-10 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-bg"
      >
        본문으로 건너뛰기
      </a>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="logo-bug font-display text-2xl">
          SideOn<span className="text-accent [text-shadow:0_0_14px_rgba(77,243,255,0.45)]">AI</span>
        </Link>
        <nav aria-label="주요 메뉴" className="hidden items-center gap-8 md:flex">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="text-[0.95rem] text-ink/75 transition hover:text-ink">
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <CtaLink
            href="/#contact"
            location="header"
            className={`rounded-full bg-accent px-5 py-2.5 text-sm font-bold transition hover:brightness-110 text-[#03060b]`}
          >
            협업 문의
          </CtaLink>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
