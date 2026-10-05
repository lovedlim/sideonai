import { SERVICES } from "@/data/site";
import SectionHead from "./SectionHead";

export default function Services() {
  return (
    <section id="services" className="relative z-10 bg-bg px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHead
          no="01"
          en="Services"
          title="일하는 방식에 AI를 더합니다"
          lead="교육으로 끝내지 않습니다. 현장의 업무에 바로 쓰이도록 설계하고, 직접 만들어 보게 합니다."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => (
            <article key={s.key} className="card is-interactive reveal flex flex-col p-6 sm:p-7">
              <div className="mb-10 flex items-center justify-between">
                <span className="font-mono text-sm text-accent">0{i + 1}</span>
                <span className="node-dot" aria-hidden="true" />
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
      </div>
    </section>
  );
}
