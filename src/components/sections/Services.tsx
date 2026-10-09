import { SERVICES } from "@/data/site";
import SectionHead from "./SectionHead";
import SectionShell from "./SectionShell";

// 서비스 넷을 크기가 다른 판(벤토)으로. AX 컨설팅과 바이브 코딩은 넓게, 나머지 둘은 좁게 엇갈려 놓는다.
// 밤하늘 위의 유리판처럼: 어두운 면에 가는 선, 모서리에서 청록·호박 빛이 번진다.
const SPAN = ["lg:col-span-2", "lg:col-span-1", "lg:col-span-1", "lg:col-span-2"];
const GLOW = [
  "bg-[radial-gradient(circle_at_88%_12%,rgba(77,243,255,0.30),transparent_50%)]",
  "bg-[radial-gradient(circle_at_90%_10%,rgba(255,180,84,0.22),transparent_55%)]",
  "bg-[radial-gradient(circle_at_10%_90%,rgba(77,243,255,0.18),transparent_55%)]",
  "bg-[radial-gradient(circle_at_12%_15%,rgba(255,180,84,0.20),transparent_50%)]",
];
const KICKER = ["진단부터 실행까지", "직무에 맞춘 커리큘럼", "반복은 AI에게", "코딩 몰라도 OK"];

export default function Services() {
  return (
    <SectionShell id="services" tone="night">
      <SectionHead
        label="서비스"
        title={
          <>
            일하는 방식에
            <br />
            <span className="text-accent [text-shadow:0_0_30px_rgba(77,243,255,0.45)]">AI</span>를 더합니다
          </>
        }
        lead="교육으로 끝내지 않습니다. 현장의 업무에 바로 쓰이도록 설계하고, 직접 만들어 보게 합니다."
      />
      <ul className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-3">
        {SERVICES.map((s, i) => (
          <li
            key={s.key}
            className={`reveal group relative flex min-h-[20rem] flex-col justify-between overflow-hidden rounded-[2rem] border border-line bg-surface p-8 transition duration-500 hover:border-accent/50 sm:p-10 ${SPAN[i]}`}
          >
            <div aria-hidden="true" className={`pointer-events-none absolute inset-0 opacity-80 transition duration-500 group-hover:opacity-100 ${GLOW[i]}`} />
            <div className="relative">
              <p className="font-num text-[0.95rem] text-warm">{KICKER[i]}</p>
              <h3 className="mt-3 font-display text-[clamp(2.2rem,3.6vw,3.2rem)] leading-[1.05]">{s.title}</h3>
              <p className={`mt-5 text-[1.05rem] leading-relaxed text-ink/75 ${i === 0 || i === 3 ? "max-w-lg" : ""}`}>{s.body}</p>
            </div>
            <ul className="relative mt-8 flex flex-wrap gap-2">
              {s.tags.map((t) => (
                <li key={t} className="rounded-full border border-line px-3 py-1 text-[0.8rem] text-ink/70">
                  {t}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
