import type { ReactNode } from "react";

// 섹션 머리. 오렌지 이름표 아래 큰 한나체 제목과 짧은 설명.
export default function SectionHead({ label, title, lead }: { label: string; title: ReactNode; lead?: string }) {
  return (
    <div className="reveal mb-14 max-w-3xl sm:mb-20">
      <p className="eyebrow">{label}</p>
      <h2 className="mt-4 font-display text-[clamp(2.3rem,5.4vw,4.2rem)] leading-[1.1] text-balance">{title}</h2>
      {lead && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{lead}</p>}
    </div>
  );
}
