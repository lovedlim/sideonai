import { RESOURCES } from "@/data/site";
import SectionHead from "./SectionHead";
import SectionShell from "./SectionShell";

export default function Resources() {
  return (
    <SectionShell id="resources">
      <SectionHead
        label="리소스"
        title="바로 써 보는 학습 도구"
        lead="교육에서 쓰는 연습 도구와 자료를 누구나 쓸 수 있게 열어 두었습니다."
      />
      <ul className="grid border-b border-line lg:ml-[25%] lg:grid-cols-2 lg:gap-x-8">
        {RESOURCES.map((r) => (
          <li key={r.href} className="reveal border-t border-line">
            <a
              href={r.href}
              target="_blank"
              rel="noopener noreferrer"
              className="row-link flex items-baseline justify-between gap-4 py-5"
            >
              <span>
                <span className="block text-lg font-semibold">{r.title}</span>
                <span className="mt-1 block text-sm text-muted">{r.note}</span>
              </span>
              <span className="arrow text-accent" aria-hidden="true">↗</span>
            </a>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
