import Link from "next/link";
import CourseGallery from "@/components/courses/CourseGallery";
import PhotoWall from "@/components/courses/PhotoWall";
import { courses, FEATURED, orgNames, totalSessions } from "@/data/courses";
import { STATS } from "@/data/site";
import CountUp from "./CountUp";
import SectionHead from "./SectionHead";
import SectionShell from "./SectionShell";

export default function TrackRecord() {
  const featured = FEATURED.map((id) => courses.find((c) => c.id === id)).filter((c) => c && c.photos.length > 1).slice(0, 3);
  const wall = courses.filter((c) => c.photos.some((p) => p.kind === "photo"));
  return (
    <SectionShell id="track">
      <SectionHead
        label="실적"
        title="현장에서 검증했습니다"
        lead="소방학교 강의실부터 방송사 편집실, 기업 연수원까지. 직무에 맞춰 설계한 과정을 직접 진행했습니다."
      />

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="reveal lg:col-span-3">
          <p className="font-display text-[clamp(4.5rem,9vw,7rem)] leading-none">
            <CountUp value={totalSessions} />
            <span className="text-accent">+</span>
          </p>
          <p className="mt-3 text-muted">누적 강의 · 강연 횟수</p>
          <Link href="/activities" className="row-link mt-8 inline-block font-semibold">
            강의 아카이브 보기 <span className="arrow inline-block" aria-hidden="true">→</span>
          </Link>
        </div>

        {/* 기관명은 칩 대신 문장처럼 이어 쓴다 */}
        <p className="reveal font-display text-[clamp(1.25rem,2vw,1.6rem)] leading-[1.7] text-ink/90 lg:col-span-9">
          {orgNames.map((org, i) => (
            <span key={org}>
              <span className="sm:whitespace-nowrap">{org}</span>
              {/* 구분선은 앞 이름에 붙이고 뒤에만 공백을 둬서, 줄이 구분선 뒤에서 바뀌게 한다 */}
              {i < orgNames.length - 1 && <><span className="ml-2 mr-1 text-line" aria-hidden="true">/</span> </>}
            </span>
          ))}
        </p>
      </div>

      {/* 화면 끝까지 닿는 현장 사진 띠 */}
      <div className="relative left-1/2 my-20 w-screen -translate-x-1/2 sm:my-28">
        <PhotoWall courses={wall} />
      </div>

      {/* 대표 과정 셋. 사진 모음과 설명을 번갈아 놓는다 */}
      <ol className="space-y-20 sm:space-y-28">
        {featured.map((c, i) =>
          c ? (
            <li key={c.id} className="reveal grid grid-cols-1 items-end gap-6 lg:grid-cols-12 lg:gap-10">
              <div className={`lg:col-span-8 ${i % 2 ? "lg:order-2" : ""}`}>
                <CourseGallery course={c} />
              </div>
              <div className={`lg:col-span-4 ${i % 2 ? "lg:order-1" : ""}`}>
                <p className="eyebrow">{c.org}</p>
                <h3 className="mt-4 font-display text-[clamp(1.6rem,2.6vw,2.3rem)] leading-[1.25] text-balance">{c.title}</h3>
                <p className="mt-4 text-sm text-muted">
                  <span className="font-display text-xl text-ink">{c.sessions}</span>회 진행 · {c.years}
                </p>
              </div>
            </li>
          ) : null,
        )}
      </ol>

      <dl className="reveal mt-24 grid grid-cols-2 border-y border-line lg:grid-cols-4">
        {STATS.map((s, i) => (
          <div key={s.label} className={`py-7 pr-4 ${i % 2 ? "pl-6" : ""} ${i > 0 ? "lg:border-l lg:border-line lg:pl-6" : ""} ${i < 2 ? "border-b border-line lg:border-b-0" : ""}`}>
            <dt className="sr-only">{s.label}</dt>
            <dd className="font-display text-[clamp(1.9rem,3vw,2.6rem)] leading-none">{s.value}</dd>
            <dd className="mt-2 text-sm text-muted" aria-hidden="true">{s.label}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-12 text-center">
        <Link href="/activities" className="row-link inline-block font-display text-2xl">
          과정 {courses.length}개 전체 보기 <span className="arrow inline-block text-accent" aria-hidden="true">→</span>
        </Link>
      </p>
    </SectionShell>
  );
}
