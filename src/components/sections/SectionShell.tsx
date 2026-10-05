import type { ReactNode } from "react";

// 모든 섹션의 공통 틀. 위쪽에 히어로의 빛이 번져 내려오는 듯한 선과 옅은 점 격자를 깐다.
export default function SectionShell({
  id,
  className = "",
  children,
}: {
  id: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="section-glow relative z-10 bg-bg px-5 py-24 sm:px-8 sm:py-32">
      <div className="dot-field" aria-hidden="true" />
      <div className={`relative mx-auto max-w-6xl ${className}`}>{children}</div>
    </section>
  );
}
