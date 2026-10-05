import { CONTACT_LINKS, NAV } from "@/data/site";

export default function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-line bg-bg px-5 py-12 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-lg font-bold tracking-[-0.02em]">
            SideOn<span className="text-accent">AI</span>
          </p>
          <p className="mt-2 text-sm text-muted">도메인에 AI를 더하는, SideOnAI (퇴근후딴짓)</p>
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
      <p className="mx-auto mt-8 max-w-6xl font-mono text-xs text-muted">© {new Date().getFullYear()} SideOnAI</p>
    </footer>
  );
}
