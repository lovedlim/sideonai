import type { ReactNode } from "react";

// 모든 섹션의 공통 틀. 종이 바탕에 위쪽 가는 선 하나로 섹션을 나눈다.
// night를 주면 히어로와 같은 밤 바탕이 된다(문의 섹션).
export default function SectionShell({
  id,
  className = "",
  night = false,
  children,
}: {
  id: string;
  className?: string;
  night?: boolean;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`${night ? "night" : ""} relative z-10 bg-bg px-5 py-24 sm:px-8 sm:py-32`}>
      <div className={`relative mx-auto max-w-6xl border-t border-line pt-10 sm:pt-12 ${className}`}>{children}</div>
    </section>
  );
}
