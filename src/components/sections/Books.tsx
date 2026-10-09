import Image from "next/image";
import RandomBookLink from "@/components/RandomBookLink";
import { BOOKS, COURSES } from "@/data/site";
import SectionHead from "./SectionHead";
import SectionShell from "./SectionShell";

const cardClass = "group flex items-center justify-between gap-4 rounded-[1.5rem] px-6 py-5 transition";

export default function Books() {
  const [featured, ...rest] = BOOKS;
  return (
    <SectionShell id="books" sheet>
      <SectionHead label="도서 · 강의" title="책과 강의로도 만나요" lead="현장에서 다듬은 내용을 책과 강의로." />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        <RandomBookLink links={featured.links} className="reveal group flex flex-col items-center justify-end rounded-[2rem] bg-butter px-8 pb-8 pt-12 lg:col-span-5">
          {featured.cover && (
            <Image
              src={featured.cover}
              alt={`${featured.title} 표지`}
              width={640}
              height={820}
              sizes="(max-width: 1024px) 70vw, 300px"
              className="h-auto w-[62%] rotate-[-3deg] rounded-md shadow-[0_30px_50px_-24px_rgba(27,27,27,0.55)] transition duration-500 group-hover:rotate-0"
            />
          )}
          <p className="mt-8 text-center font-display text-2xl">{featured.title}</p>
          <p className="mt-1 text-sm text-ink/70">
            {featured.publisher}
            {featured.note ? ` · ${featured.note}` : ""}
          </p>
        </RandomBookLink>

        <div className="flex flex-col gap-3 lg:col-span-7">
          {rest.map((b) => (
            <RandomBookLink key={b.title} links={b.links} className={`reveal ${cardClass} bg-surface hover:bg-tint`}>
              <span>
                <span className="block font-display text-xl">{b.title}</span>
                <span className="mt-1 block text-sm text-muted">
                  {b.publisher}
                  {b.note ? ` · ${b.note}` : ""}
                </span>
              </span>
              <span className="font-num text-2xl text-accent-ink transition group-hover:translate-x-1" aria-hidden="true">↗</span>
            </RandomBookLink>
          ))}
          {COURSES.map((c) => (
            <a key={c.title} href={c.href} target="_blank" rel="noopener noreferrer" className={`reveal ${cardClass} bg-ink text-white hover:bg-accent hover:text-ink`}>
              <span>
                <span className="block font-display text-xl">{c.title}</span>
                <span className="mt-1 block text-sm opacity-70">{c.note}</span>
              </span>
              <span className="font-num text-2xl" aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
