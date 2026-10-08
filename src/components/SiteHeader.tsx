"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import CtaLink from "@/components/CtaLink";
import MobileMenu from "@/components/MobileMenu";
import { NAV } from "@/data/site";

// 헤더 바로 아래에 밤 섹션(히어로·문의·하단)이 있으면 헤더도 밤 색으로 바꾼다.
function useOverNight() {
  const [night, setNight] = useState(true);
  useEffect(() => {
    let raf = 0;
    const check = () => {
      raf = 0;
      const el = document.elementFromPoint(window.innerWidth / 2, 66);
      setNight(!!el?.closest(".night"));
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
      className={`${night ? "night" : ""} fixed inset-x-0 top-0 z-50 border-b border-line bg-bg/75 backdrop-blur-md transition-colors duration-300`}
    >
      {/* 키보드 사용자가 긴 히어로 구간을 건너뛸 수 있게 한다 */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-10 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-bg"
      >
        본문으로 건너뛰기
      </a>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="font-display text-xl">
          SideOn<span className="text-accent">AI</span>
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
            className="bg-ink px-4 py-2 text-sm font-semibold text-bg transition hover:bg-accent"
          >
            협업 문의
          </CtaLink>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
