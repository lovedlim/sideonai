import { RESOURCES } from "@/data/site";
import SectionHead from "./SectionHead";
import SectionShell from "./SectionShell";

export default function Resources() {
  return (
    <SectionShell id="resources" tone="surface" sheet>
      <SectionHead label="리소스" title="바로 써 보는 학습 도구" lead="교육에서 쓰는 도구, 누구나 무료로." />
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {RESOURCES.map((r, i) => (
          <li key={r.href} className="reveal">
            <a
              href={r.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full min-h-[11rem] flex-col justify-between rounded-[1.75rem] bg-bg p-7 transition hover:-translate-y-1 hover:shadow-[0_24px_40px_-24px_rgba(27,27,27,0.35)]"
            >
              <span className="font-num text-sm text-accent-ink">TOOL {String(i + 1).padStart(2, "0")}</span>
              <span>
                <span className="block font-display text-2xl">{r.title}</span>
                <span className="mt-1 block text-sm text-muted">{r.note}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
