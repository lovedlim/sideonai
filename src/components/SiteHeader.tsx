import CtaLink from "@/components/CtaLink";
import { NAV } from "@/data/site";

export default function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-bg/60 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="text-lg font-bold tracking-[-0.02em]">
          SideOn<span className="text-accent">AI</span>
        </a>
        <nav aria-label="주요 메뉴" className="hidden items-center gap-8 md:flex">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="text-[0.95rem] text-ink/80 transition hover:text-accent">
              {n.label}
            </a>
          ))}
        </nav>
        <CtaLink
          href="#contact"
          location="header"
          className="rounded-full border border-accent/70 px-4 py-2 text-sm font-semibold text-accent transition hover:bg-accent hover:text-bg"
        >
          협업 문의
        </CtaLink>
      </div>
    </header>
  );
}
