import Image from "next/image";
import RandomBookLink from "@/components/RandomBookLink";
import { BOOKS, COURSES } from "@/data/site";
import SectionHead from "./SectionHead";

const rowClass =
  "card flex items-center justify-between gap-4 px-5 py-4 sm:px-6";

export default function Books() {
  const [featured, ...rest] = BOOKS;
  return (
    <section id="books" className="relative z-10 border-t border-line bg-bg px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHead
          no="03"
          en="Books & courses"
          title="책과 강의로도 만납니다"
          lead="현장에서 다듬은 내용을 책과 온라인 강의로 정리했습니다."
        />

        <div className="grid gap-6 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-10">
          <RandomBookLink links={featured.links} className="card reveal group block self-start overflow-hidden">
            {featured.cover && (
              <Image
                src={featured.cover}
                alt={`${featured.title} 표지`}
                width={640}
                height={820}
                sizes="(max-width: 1024px) 100vw, 380px"
                className="h-auto w-full transition duration-500 group-hover:scale-[1.02]"
              />
            )}
            <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6">
              <div>
                <p className="text-lg font-bold">{featured.title}</p>
                <p className="mt-0.5 text-sm text-muted">
                  {featured.publisher}
                  {featured.note ? ` · ${featured.note}` : ""}
                </p>
              </div>
              <span className="text-accent" aria-hidden="true">↗</span>
            </div>
          </RandomBookLink>

          <div className="space-y-8">
            <div>
              <p className="label-mono mb-4 !text-muted">Books</p>
              <ul className="space-y-3">
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
                      <span className="text-accent" aria-hidden="true">↗</span>
                    </RandomBookLink>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="label-mono mb-4 !text-muted">Courses</p>
              <ul className="space-y-3">
                {COURSES.map((c) => (
                  <li key={c.title} className="reveal">
                    <a href={c.href} target="_blank" rel="noopener noreferrer" className={rowClass}>
                      <span>
                        <span className="block font-semibold">{c.title}</span>
                        <span className="mt-0.5 block text-sm text-muted">{c.note}</span>
                      </span>
                      <span className="text-accent" aria-hidden="true">↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
