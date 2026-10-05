import { RESOURCES } from "@/data/site";
import SectionHead from "./SectionHead";

export default function Resources() {
  return (
    <section id="resources" className="relative z-10 border-t border-line bg-bg px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHead
          no="04"
          en="Resources"
          title="바로 써 보는 학습 도구"
          lead="교육에서 쓰는 연습 도구와 자료를 누구나 쓸 수 있게 열어 두었습니다."
        />
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 sm:gap-4">
          {RESOURCES.map((r) => (
            <li key={r.href} className="reveal">
              <a
                href={r.href}
                target="_blank"
                rel="noopener noreferrer"
                className="card flex h-full items-start justify-between gap-4 p-5 sm:p-6"
              >
                <span>
                  <span className="block text-lg font-semibold">{r.title}</span>
                  <span className="mt-1 block text-sm text-muted">{r.note}</span>
                </span>
                <span className="text-accent" aria-hidden="true">↗</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
