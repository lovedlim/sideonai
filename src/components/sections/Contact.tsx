import SimpleContactForm from "@/components/SimpleContactForm";
import { CONTACT_LINKS } from "@/data/site";
import SectionShell from "./SectionShell";

export default function Contact() {
  return (
    <SectionShell id="contact" night className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
      <div>
        <p className="eyebrow mb-4">문의</p>
        <h2 className="reveal font-display text-[clamp(2rem,4.4vw,3.6rem)] leading-[1.15] text-balance">협업을 제안해 주세요</h2>
        <p className="reveal mb-12 mt-5 text-lg leading-relaxed text-muted">교육 대상과 목표를 알려 주시면 도메인에 맞는 과정을 제안해 드립니다.</p>
        <ul className="reveal space-y-4">
          {CONTACT_LINKS.map((l) => (
            <li key={l.label} className="flex items-baseline gap-4">
              <span className="eyebrow w-20 shrink-0">{l.label}</span>
              <a
                href={l.href}
                {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="break-all text-ink underline decoration-line underline-offset-4 transition hover:text-accent hover:decoration-accent"
              >
                {l.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="reveal">
        <SimpleContactForm />
      </div>
    </SectionShell>
  );
}
