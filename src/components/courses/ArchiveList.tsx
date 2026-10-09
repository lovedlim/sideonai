"use client";

import { useState } from "react";
import { courses, SECTORS, type Sector } from "@/data/courses";
import CourseGallery from "./CourseGallery";

const TABS: ("all" | Sector)[] = ["all", "corp", "media", "public", "edu"];

// 과정 목록. 분야 탭으로 거르고, 과정마다 왼쪽에 이름, 오른쪽에 사진 모음을 둔다.
export default function ArchiveList() {
  const [tab, setTab] = useState<"all" | Sector>("all");
  const shown =
    tab === "all" ? courses : courses.filter((c) => c.sector === tab);

  return (
    <>
      <div
        role="tablist"
        aria-label="분야"
        className="sticky top-16 z-20 -mx-5 mb-4 flex gap-6 overflow-x-auto overflow-y-hidden [scrollbar-width:none] border-b border-line bg-bg/90 px-5 backdrop-blur-md sm:-mx-8 sm:gap-9 sm:px-8"
      >
        {TABS.map((t) => {
          const n =
            t === "all"
              ? courses.length
              : courses.filter((c) => c.sector === t).length;
          const on = tab === t;
          return (
            <button
              key={t}
              role="tab"
              aria-selected={on}
              onClick={() => setTab(t)}
              className={`-mb-px shrink-0 border-b-2 py-4 text-[0.95rem] transition ${on ? "border-accent text-ink" : "border-transparent text-muted hover:text-ink"}`}
            >
              {t === "all" ? "전체" : SECTORS[t]}
              <span className="ml-1.5 font-mono text-xs text-muted">{n}</span>
            </button>
          );
        })}
      </div>

      {(tab === "all" ? (Object.keys(SECTORS) as Sector[]) : [tab]).map(
        (sector) => (
          <section key={sector} aria-label={SECTORS[sector]}>
            {tab === "all" && (
              <h2 className="mt-20 flex items-baseline gap-4 border-b-2 border-ink pb-4 font-display text-[clamp(1.8rem,3.4vw,2.8rem)] first:mt-10">
                {SECTORS[sector]}
                <span className="font-mono text-sm text-muted">
                  {courses.filter((c) => c.sector === sector).length}개 과정
                </span>
              </h2>
            )}
            <ol>
              {shown
                .filter((c) => c.sector === sector)
                .map((c, i) => (
                  <li
                    key={c.id}
                    className="reveal grid grid-cols-1 gap-6 border-b border-line py-12 sm:py-16 lg:grid-cols-12 lg:gap-10"
                  >
                    <div className="lg:col-span-4">
                      <p className="eyebrow">{c.org}</p>
                      <h3 className="mt-4 font-display text-[clamp(1.6rem,2.6vw,2.2rem)] leading-[1.25] text-balance">
                        {c.title}
                      </h3>
                      <p className="mt-5 text-sm text-muted">
                        {c.sessions > 0 && (
                          <>
                            <span className="font-display text-xl text-ink">
                              {c.sessions}
                            </span>
                            회 진행
                          </>
                        )}
                        {c.sessions > 0 && (
                          <span className="mx-2 text-line">|</span>
                        )}
                        {c.years}
                        {c.upcoming > 0 && (
                          <span className="ml-3 text-accent-ink">
                            {c.upcoming}회 예정
                          </span>
                        )}
                      </p>
                      {c.note && (
                        <p className="mt-3 text-[0.95rem] leading-relaxed text-ink/80">
                          {c.note}
                        </p>
                      )}
                      {c.links.length > 0 && (
                        <p className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                          {c.links.map((l) => (
                            <a
                              key={l.href}
                              href={l.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-link"
                            >
                              {l.label} ↗
                            </a>
                          ))}
                        </p>
                      )}
                    </div>
                    <div className="lg:col-span-8">
                      <CourseGallery course={c} priority={i < 2} />
                    </div>
                  </li>
                ))}
            </ol>
          </section>
        ),
      )}
    </>
  );
}
