"use client";

import { useEffect } from "react";

// 카드 위에서 커서를 따라다니는 빛. 커서 위치를 CSS 변수(--mx, --my)로 카드에 넘기고, 그리기는 globals.css의 .card::before가 한다.
export default function CardGlow() {
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const card = (e.target as Element | null)?.closest?.<HTMLElement>(".card");
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => document.removeEventListener("pointermove", onMove);
  }, []);
  return null;
}
