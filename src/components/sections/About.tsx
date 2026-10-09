import { ABOUT_EN } from "@/data/site";

// 영문 회사 소개. 오렌지 띠 위에 큰 글씨로 한 문장.
export default function About() {
  return (
    <section id="about" className="neon relative z-10 -mt-12 overflow-hidden rounded-t-[2.5rem] px-5 py-24 sm:-mt-16 sm:rounded-t-[4rem] sm:px-8 sm:py-32">
      {/* 히어로의 구체에서 새어 나온 듯한 청록 빛 */}
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgba(77,243,255,0.22),transparent_65%)]" />
      <div lang="en" className="reveal relative mx-auto max-w-6xl">
        <p className="label-mono">About SideOnAI</p>
        <p className="mt-5 max-w-4xl font-display text-[clamp(2rem,4.4vw,3.6rem)] leading-[1.12] text-balance">{ABOUT_EN[0]}</p>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{ABOUT_EN[1]}</p>
      </div>
    </section>
  );
}
