import Link from "next/link";
import CourseGallery from "@/components/courses/CourseGallery";
import PhotoWall from "@/components/courses/PhotoWall";
import { courses, FEATURED, orgCount, totalSessions } from "@/data/courses";
import { STATS } from "@/data/site";
import CountUp from "./CountUp";
import SectionHead from "./SectionHead";
import SectionShell from "./SectionShell";

export default function TrackRecord() {
  const featured = FEATURED.map((id) => courses.find((c) => c.id === id))
    .filter((c) => c !== undefined && c.photos.length > 1)
    .slice(0, 5);
  const wall = courses.filter((c) => c.photos.some((p) => p.kind === "photo"));
  const big = [
    { v: totalSessions, u: "회", l: "누적 강의 · 강연" },
    { v: orgCount, u: "곳", l: "함께한 기관" },
    { v: courses.length, u: "개", l: "설계한 과정" },
  ];

  return (
    <SectionShell id="track" tone="surface" sheet>
      <SectionHead
        label="실적"
        title={
          <>
            말보다 <span className="marker">현장</span>으로
            <br />
            보여 드릴게요
          </>
        }
        lead="EBS, GS리테일, KB국민카드, NC부터 공공기관과 대학까지. 조직마다 직무에 맞춰 과정을 새로 설계하고 직접 진행했습니다."
      />

      {/* 큰 숫자 셋 */}
      <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {big.map((b, i) => (
          <div key={b.l} className={`reveal relative flex flex-col-reverse overflow-hidden rounded-[2rem] p-8 ${i === 0 ? "bg-[#050b14] bg-[radial-gradient(circle_at_85%_10%,rgba(77,243,255,0.28),transparent_55%)] text-white" : "bg-bg"}`}>
            <dt className={`mt-2 ${i === 0 ? "text-white/70" : "text-muted"}`}>{b.l}</dt>
            <dd className="font-num text-[clamp(3.6rem,7vw,5.4rem)] leading-none">
              <CountUp value={b.v} />
              <span className={`ml-1 text-[0.4em] ${i === 0 ? "text-accent" : "text-accent-ink"}`}>{b.u}</span>
            </dd>
          </div>
        ))}
      </dl>
      <dl className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className="reveal flex flex-col-reverse rounded-[1.5rem] bg-bg px-6 py-5">
            <dt className="mt-1 text-sm text-muted">{s.label}</dt>
            <dd className="font-num text-[clamp(1.6rem,2.6vw,2.1rem)] leading-none">{s.value}</dd>
          </div>
        ))}
      </dl>

      {/* 화면 끝까지 닿는 현장 사진 띠 */}
      <div className="relative left-1/2 my-20 w-screen -translate-x-1/2 sm:my-24">
        <PhotoWall courses={wall} />
      </div>

      {/* 대표 과정. 둥근 흰 카드에 사진 모음 */}
      <ul className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {featured.map((c, i) =>
          c ? (
            <li
              key={c.id}
              className={`reveal overflow-hidden rounded-[2rem] bg-bg p-3 sm:p-4 ${i === 0 ? "lg:col-span-2 lg:grid lg:grid-cols-[1.5fr_1fr] lg:items-end lg:gap-4" : ""}`}
            >
              <div className="overflow-hidden rounded-[1.4rem]">
                <CourseGallery course={c} />
              </div>
              <div className={`px-3 pb-3 pt-6 sm:px-4 ${i === 0 ? "lg:px-6 lg:pb-6" : ""}`}>
                <p className="font-num text-accent-ink">{c.org}</p>
                <h3 className={`mt-3 font-display leading-[1.2] text-balance ${i === 0 ? "text-[clamp(1.8rem,3vw,2.6rem)]" : "text-[clamp(1.5rem,2.4vw,2rem)]"}`}>{c.title}</h3>
                <p className="mt-2 text-sm text-muted">
                  {c.sessions > 0 ? <><span className="font-num text-lg text-ink">{c.sessions}</span>회 진행 · </> : null}{c.years}{c.upcoming > 0 && <span className="ml-2 text-accent-ink">{c.upcoming}회 예정</span>}
                </p>
              </div>
            </li>
          ) : null,
        )}
      </ul>

      <p className="mt-14 text-center">
        <Link href="/activities" className="inline-flex items-center gap-3 rounded-full bg-ink px-8 py-4 font-display text-xl text-white transition hover:bg-accent hover:text-ink">
          과정 {courses.length}개 전부 보기 <span aria-hidden="true">→</span>
        </Link>
      </p>
    </SectionShell>
  );
}
