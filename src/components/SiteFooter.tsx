import { COMPANY, CONTACT_EMAIL, CONTACT_LINKS, NAV } from "@/data/site";

export default function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-line bg-bg px-5 py-12 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-lg font-bold tracking-[-0.02em]">
            SideOn<span className="text-accent">AI</span>
          </p>
          <p className="mt-2 text-sm text-muted">{COMPANY.tagline}</p>
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink/80">
          {NAV.map((n) => (
            <li key={n.href}>
              <a href={n.href} className="transition hover:text-accent">{n.label}</a>
            </li>
          ))}
          {CONTACT_LINKS.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="transition hover:text-accent"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="mx-auto mt-8 max-w-6xl space-y-1 font-mono text-xs text-muted">
        {/* 좁은 화면에서도 항목 중간이 아니라 항목 사이에서 줄이 바뀌게 한다 */}
        <p>
          <span className="whitespace-nowrap">상호 {COMPANY.legalName}</span> ·{" "}
          <span className="whitespace-nowrap">대표 {COMPANY.ceo}</span> ·{" "}
          <span className="whitespace-nowrap">사업자등록번호 {COMPANY.bizNo}</span>
        </p>
        <p>
          {COMPANY.address} ·{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="whitespace-nowrap transition hover:text-accent">
            {CONTACT_EMAIL}
          </a>
        </p>
        <p>© {new Date().getFullYear()} SideOnAI. All rights reserved.</p>
      </div>
    </footer>
  );
}
