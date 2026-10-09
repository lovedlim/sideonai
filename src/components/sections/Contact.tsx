import SimpleContactForm from "@/components/SimpleContactForm";
import { CONTACT_LINKS } from "@/data/site";
import SectionShell from "./SectionShell";

export default function Contact() {
  return (
    <SectionShell id="contact" tone="night" sheet className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
      <div>
        <p className="eyebrow">문의</p>
        <h2 className="reveal mt-4 font-display text-[clamp(2.6rem,5.6vw,4.6rem)] leading-[1.05]">
          우리 조직에도
          <br />
          <span className="text-accent">AI</span>, 같이 붙여 볼까요?
        </h2>
        <p className="reveal mb-12 mt-6 text-lg leading-relaxed text-muted">교육 대상과 목표를 알려 주시면 도메인에 맞는 과정을 제안해 드립니다.</p>
        <ul className="reveal space-y-4">
          {CONTACT_LINKS.map((l) => (
            <li key={l.label} className="flex items-baseline gap-4">
              <span className="font-num w-20 shrink-0 text-accent">{l.label}</span>
              <a
                href={l.href}
                {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="text-link break-all text-lg"
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
