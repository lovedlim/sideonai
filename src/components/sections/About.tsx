import { ABOUT_EN } from "@/data/site";

// 영문 회사 소개. 밤의 히어로가 끝나고 처음 만나는 낮의 문단이라 섹션 틀 없이 크게 둔다.
export default function About() {
  return (
    <section id="about" className="relative z-10 bg-bg px-5 pb-8 pt-24 sm:px-8 sm:pt-36">
      <div lang="en" className="reveal mx-auto grid max-w-6xl gap-4 lg:grid-cols-12 lg:gap-8">
        <p className="eyebrow lg:col-span-3 lg:pt-3">About SideOnAI</p>
        <div className="lg:col-span-9">
          <p className="font-display text-[clamp(1.75rem,3.6vw,3rem)] leading-[1.2] text-balance">{ABOUT_EN[0]}</p>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{ABOUT_EN[1]}</p>
        </div>
      </div>
    </section>
  );
}
