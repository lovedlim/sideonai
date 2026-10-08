import Image from "next/image";
import RandomBookLink from "@/components/RandomBookLink";
import { BOOKS, COURSES } from "@/data/site";
import SectionHead from "./SectionHead";
import SectionShell from "./SectionShell";

const rowClass = "row-link flex items-baseline justify-between gap-4 border-t border-line py-5";

export default function Books() {
  const [featured, ...rest] = BOOKS;
  return (
    <SectionShell id="books">
      <SectionHead
        label="도서 · 강의"
        title="책과 강의로도 만납니다"
        lead="현장에서 다듬은 내용을 책과 온라인 강의로 정리했습니다."
      />

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
        <RandomBookLink links={featured.links} className="reveal group block self-start lg:col-span-4 lg:col-start-4">
          {featured.cover && (
            <Image
              src={featured.cover}
              alt={`${featured.title} 표지`}
              width={640}
              height={820}
              sizes="(max-width: 1024px) 100vw, 360px"
              className="h-auto w-full shadow-[0_30px_60px_-30px_rgba(23,24,27,0.45)] transition duration-500 group-hover:-translate-y-1"
            />
          )}
          <p className="mt-5 font-display text-xl">{featured.title}</p>
          <p className="mt-1 text-sm text-muted">
            {featured.publisher}
            {featured.note ? ` · ${featured.note}` : ""}
          </p>
        </RandomBookLink>

        <div className="space-y-12 lg:col-span-5">
          <div>
            <p className="eyebrow mb-3">도서</p>
            <ul className="border-b border-line">
              {rest.map((b) => (
                <li key={b.title} className="reveal">
                  <RandomBookLink links={b.links} className={rowClass}>
                    <span>
                      <span className="block font-semibold">{b.title}</span>
                      <span className="mt-0.5 block text-sm text-muted">
                        {b.publisher}
                        {b.note ? ` · ${b.note}` : ""}
                      </span>
                    </span>
                    <span className="arrow text-accent" aria-hidden="true">↗</span>
                  </RandomBookLink>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-3">온라인 강의</p>
            <ul className="border-b border-line">
              {COURSES.map((c) => (
                <li key={c.title} className="reveal">
                  <a href={c.href} target="_blank" rel="noopener noreferrer" className={rowClass}>
                    <span>
                      <span className="block font-semibold">{c.title}</span>
                      <span className="mt-0.5 block text-sm text-muted">{c.note}</span>
                    </span>
                    <span className="arrow text-accent" aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
