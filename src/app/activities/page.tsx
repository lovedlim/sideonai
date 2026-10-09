import type { Metadata } from "next";
import ArchiveList from "@/components/courses/ArchiveList";
import PhotoWall from "@/components/courses/PhotoWall";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { CONTACT_EMAIL } from "@/data/site";
import { courses, orgCount, totalSessions } from "@/data/courses";

export const metadata: Metadata = {
  title: "강의 아카이브",
  description: `EBS, GS리테일, KB국민카드, NC 등 ${orgCount}개 기관에서 진행한 AI 교육 ${totalSessions}회의 기록.`,
};

export default function ActivitiesPage() {
  const withPhotos = courses.filter((c) => c.photos.some((p) => p.kind === "photo"));
  return (
    <>
      <SiteHeader />
      <main id="main">
        {/* 밤의 머리. 뒤로 현장 사진이 흐른다 */}
        <section className="neon relative overflow-hidden pb-20 pt-36 sm:pb-28 sm:pt-44">
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2">
            <PhotoWall courses={withPhotos} rows={2} perRow={9} dim />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(5,11,20,0.55),rgba(5,11,20,0.95)_70%)]" />
          <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
            <p className="label-mono">강의 아카이브</p>
            <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.6rem,6.4vw,5.6rem)] leading-[1.08] text-balance">
              현장에서 쓰이는 AI를 가르쳤습니다
            </h1>
            <dl className="mt-14 grid max-w-3xl grid-cols-3 border-t border-line">
              {[
                [String(totalSessions), "회", "강의 · 강연"],
                [String(orgCount), "곳", "기관"],
                [String(courses.length), "개", "과정"],
              ].map(([v, u, l], i) => (
                <div key={l} className={`flex flex-col-reverse pt-6 ${i ? "border-l border-line pl-5 sm:pl-8" : ""}`}>
                  <dt className="mt-3 text-sm text-muted">{l}</dt>
                  <dd className="font-display text-[clamp(2.4rem,5vw,4rem)] leading-none">
                    {v}
                    <span className="ml-1 text-[0.45em] text-accent">{u}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="relative z-10 bg-bg px-5 pb-24 pt-6 sm:px-8 sm:pb-32">
          <div className="mx-auto max-w-6xl">
            <ArchiveList />
            <p className="mt-16 text-center text-muted">
              강의·컨설팅 문의{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-link">
                {CONTACT_EMAIL}
              </a>
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
