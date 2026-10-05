import Image from "next/image";
import Link from "next/link";
import { orgNames, photos, totalCount } from "@/data/activities";
import CountUp from "./CountUp";
import SectionHead from "./SectionHead";

export default function TrackRecord() {
  return (
    <section id="track" className="relative z-10 border-t border-line bg-bg px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHead
          no="02"
          en="Track record"
          title="현장에서 검증했습니다"
          lead="기업, 공공기관, 컨퍼런스에서 진행한 강의와 강연입니다."
        />

        <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div className="reveal">
            <p className="font-mono text-[clamp(5rem,14vw,10rem)] font-bold leading-none tracking-[-0.06em] text-accent [text-shadow:0_0_60px_rgba(77,243,255,0.35)]">
              <CountUp value={totalCount} />
              <span className="text-warm">+</span>
            </p>
            <p className="mt-3 text-lg text-ink/85">회의 강의 · 강연</p>
            <Link
              href="/activities"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-[0.95rem] font-semibold transition hover:border-accent/70 hover:text-accent"
            >
              전체 활동 보기 <span aria-hidden="true">→</span>
            </Link>
          </div>

          <ul className="reveal flex flex-wrap content-start gap-x-2 gap-y-2.5">
            {orgNames.map((org) => (
              <li key={org} className="rounded-full border border-line bg-surface/60 px-3.5 py-1.5 text-[0.9rem] text-ink/85">
                {org}
              </li>
            ))}
          </ul>
        </div>

        <ul className="mt-16 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {photos.slice(0, 8).map((p) => (
            <li key={p.image} className="reveal group relative aspect-square overflow-hidden rounded-xl border border-line">
              <Image
                src={p.image}
                alt={`${p.org} 강연 현장`}
                fill
                sizes="(max-width: 640px) 50vw, 280px"
                className="object-cover opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg via-bg/70 to-transparent px-3 pb-2.5 pt-8 text-[0.8rem] font-medium text-ink">
                {p.org.replace(/\s*\(.*\)$/, "")}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
