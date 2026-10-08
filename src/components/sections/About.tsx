import { ABOUT_EN } from "@/data/site";
import SectionShell from "./SectionShell";

// 영문 회사 소개. 번호 섹션(01~05) 앞에 두는 짧은 문단이라 번호를 붙이지 않는다.
export default function About() {
  return (
    <SectionShell id="about">
      <div lang="en" className="reveal max-w-3xl">
        <p className="label-mono mb-4">About SideOnAI</p>
        {ABOUT_EN.map((line, i) => (
          <p
            key={line}
            className={
              i === 0
                ? "text-[clamp(1.4rem,2.6vw,2rem)] font-semibold leading-snug tracking-[-0.02em] text-balance"
                : "mt-4 text-lg leading-relaxed text-muted"
            }
          >
            {line}
          </p>
        ))}
      </div>
    </SectionShell>
  );
}
