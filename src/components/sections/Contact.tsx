import SimpleContactForm from "@/components/SimpleContactForm";
import { CONTACT_LINKS } from "@/data/site";
import SectionHead from "./SectionHead";
import SectionShell from "./SectionShell";

export default function Contact() {
  return (
    <SectionShell id="contact" className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
      <div>
        <SectionHead
          no="05"
          en="Contact"
          title="협업을 제안해 주세요"
          lead="교육 대상과 목표를 알려 주시면 도메인에 맞는 과정을 제안해 드립니다."
        />
        <ul className="reveal space-y-4">
          {CONTACT_LINKS.map((l) => (
            <li key={l.label} className="flex items-baseline gap-4">
              <span className="label-mono w-20 shrink-0 !text-muted">{l.label}</span>
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
