import { ABOUT_EN, ABOUT_HEAD, ABOUT_KO } from "@/data/site";
import Faq from "./Faq";

// 회사 소개. 누가·무엇을·어떤 근거로를 한 줄씩 한국어로 적고, 아래에 영문 소개와 자주 묻는 질문을 둔다.
export default function About() {
  return (
    <section id="about" className="neon relative z-10 -mt-12 overflow-hidden rounded-t-[2.5rem] px-5 py-24 sm:-mt-16 sm:rounded-t-[4rem] sm:px-8 sm:py-32">
      {/* 히어로의 구체에서 새어 나온 듯한 청록 빛 */}
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgba(77,243,255,0.22),transparent_65%)]" />
      <div className="reveal relative mx-auto max-w-6xl">
        <p className="label-mono">About SideOnAI</p>
        <h2 className="mt-5 max-w-4xl font-display text-[clamp(2rem,4.4vw,3.6rem)] leading-[1.12] text-balance">{ABOUT_HEAD}</h2>
        <ul className="mt-6 max-w-3xl space-y-2 text-lg leading-relaxed text-ink/80">
          {ABOUT_KO.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
        <div lang="en" className="mt-10 max-w-2xl space-y-1 text-muted">
          {ABOUT_EN.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>
      <Faq />
    </section>
  );
}
