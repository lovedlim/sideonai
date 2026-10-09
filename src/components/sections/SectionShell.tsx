import type { ReactNode } from "react";

// 모든 섹션의 공통 틀. tone으로 바탕을 고른다: 흰 바탕, 옅은 하늘 면, 밤(히어로와 같은 색).
// sheet를 주면 위 모서리를 둥글게 깎고 앞 섹션 위로 살짝 겹쳐 올린다. 종이 판을 한 장씩 쌓는 리듬.
export default function SectionShell({
  id,
  className = "",
  tone = "plain",
  sheet = false,
  children,
}: {
  id: string;
  className?: string;
  tone?: "plain" | "surface" | "night";
  sheet?: boolean;
  children: ReactNode;
}) {
  const bg = tone === "night" ? "night" : tone === "surface" ? "bg-surface" : "bg-bg";
  const sheetCls = sheet ? "-mt-12 rounded-t-[2.5rem] sm:-mt-16 sm:rounded-t-[4rem]" : "";
  return (
    <section id={id} className={`${bg} ${sheetCls} relative z-10 px-5 py-24 sm:px-8 sm:py-32`}>
      <div className={`relative mx-auto max-w-6xl ${className}`}>{children}</div>
    </section>
  );
}
