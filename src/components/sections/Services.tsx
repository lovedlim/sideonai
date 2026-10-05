import type { ReactNode } from "react";
import { SERVICES } from "@/data/site";
import SectionHead from "./SectionHead";
import SectionShell from "./SectionShell";

// 서비스별 선 아이콘. 청록은 신경망, 금색 점은 AI — 히어로와 같은 색 규칙이다.
const ICONS: Record<(typeof SERVICES)[number]["key"], ReactNode> = {
  // 교육: 하나의 AI에서 여러 사람에게 퍼진다
  education: (
    <>
      <path d="M28 14 L10 42 M28 14 L28 42 M28 14 L46 42" />
      <circle cx="10" cy="44" r="3.5" />
      <circle cx="28" cy="44" r="3.5" />
      <circle cx="46" cy="44" r="3.5" />
      <circle cx="28" cy="12" r="4.5" className="fill-warm stroke-warm" />
    </>
  ),
  // 자동화: 계속 도는 고리
  automation: (
    <>
      <path d="M44 22 A18 18 0 0 0 12 20" />
      <path d="M12 12 L12 21 L21 21" />
      <path d="M12 34 A18 18 0 0 0 44 36" />
      <path d="M44 44 L44 35 L35 35" />
      <circle cx="28" cy="28" r="4.5" className="fill-warm stroke-warm" />
    </>
  ),
  // 바이브 코딩: 코드 괄호 사이의 불꽃
  vibe: (
    <>
      <path d="M18 16 L6 28 L18 40" />
      <path d="M38 16 L50 28 L38 40" />
      <path d="M28 18 L31 25 L38 28 L31 31 L28 38 L25 31 L18 28 L25 25 Z" className="fill-warm stroke-warm" />
    </>
  ),
  // 데이터 분석: 흩어진 점과 올라가는 추세선
  data: (
    <>
      <path d="M8 46 L48 46 M8 46 L8 10" />
      <path d="M12 40 L22 32 L32 34 L46 16" />
      <circle cx="16" cy="24" r="2" />
      <circle cx="26" cy="20" r="2" />
      <circle cx="38" cy="36" r="2" />
      <circle cx="46" cy="16" r="4.5" className="fill-warm stroke-warm" />
    </>
  ),
};

export default function Services() {
  return (
    <SectionShell id="services">
      <SectionHead
        no="01"
        en="Services"
        title="일하는 방식에 AI를 더합니다"
        lead="교육으로 끝내지 않습니다. 현장의 업무에 바로 쓰이도록 설계하고, 직접 만들어 보게 합니다."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {SERVICES.map((s, i) => (
          <article key={s.key} className="card is-interactive reveal flex flex-col p-6 sm:p-7">
            <div className="mb-8 flex items-start justify-between">
              <svg
                viewBox="0 0 56 56"
                className="h-14 w-14 fill-none stroke-accent"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {ICONS[s.key]}
              </svg>
              <span className="font-mono text-sm text-accent">0{i + 1}</span>
            </div>
            <h3 className="text-2xl font-bold tracking-[-0.02em]">{s.title}</h3>
            <p className="mt-3 flex-1 leading-relaxed text-muted">{s.body}</p>
            <ul className="mt-6 flex flex-wrap gap-1.5">
              {s.tags.map((t) => (
                <li key={t} className="rounded-full border border-line px-2.5 py-1 font-mono text-[0.7rem] text-ink/80">
                  {t}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
