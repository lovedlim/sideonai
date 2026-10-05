"use client";

import { useEffect, useRef } from "react";

// 화면에 처음 들어올 때 0에서 value까지 올라가는 숫자.
// 서버 렌더와 "동작 줄이기" 설정에서는 최종값을 그대로 보여준다.
// 숫자는 React 상태가 아니라 텍스트 노드를 직접 바꾼다: 화면 아래에 있을 때 미리 0으로 돌려 두어야
// 최종값이 잠깐 보였다가 0으로 떨어지는 깜빡임이 없다.
export default function CountUp({ value, duration = 1400 }: { value: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // 이미 화면 안에 있으면(새로고침 후 스크롤 복원 등) 건드리지 않는다
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    el.textContent = "0";
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          el.textContent = String(Math.round(value * (1 - Math.pow(1 - t, 3))));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      el.textContent = String(value);
    };
  }, [value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}
    </span>
  );
}
