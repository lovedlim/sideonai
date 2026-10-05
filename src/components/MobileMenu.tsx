"use client";

import { useEffect, useState } from "react";
import { NAV } from "@/data/site";

// 좁은 화면용 메뉴. 데스크톱에서는 헤더의 가로 메뉴가 대신한다.
export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition hover:border-accent/70"
      >
        <span aria-hidden="true" className="relative block h-3 w-4">
          <span className={`absolute inset-x-0 top-0 h-px bg-current transition ${open ? "translate-y-[6px] rotate-45" : ""}`} />
          <span className={`absolute inset-x-0 bottom-0 h-px bg-current transition ${open ? "-translate-y-[5px] -rotate-45" : ""}`} />
        </span>
      </button>
      <nav
        id="mobile-menu"
        aria-label="주요 메뉴"
        hidden={!open}
        className="absolute inset-x-0 top-16 border-b border-line bg-bg/95 px-5 py-2 backdrop-blur-md"
      >
        <ul>
          {NAV.map((n) => (
            <li key={n.href} className="border-b border-line last:border-b-0">
              <a href={n.href} onClick={() => setOpen(false)} className="block py-3.5 text-lg font-semibold text-ink">
                {n.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
