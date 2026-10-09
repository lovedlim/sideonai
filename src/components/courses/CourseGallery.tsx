"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { Course } from "@/data/courses";

// 과정 하나의 사진 모음. 장수에 따라 배치가 달라진다.
// 1장: 넓게 한 장 / 2장: 큰 것과 작은 것 / 3장: 왼쪽 큰 것 + 오른쪽 둘 / 4장: 위 큰 것 + 아래 셋 / 5장: 큰 것 + 넷
const LAYOUT: Record<number, { grid: string; cells: string[] }> = {
  1: { grid: "grid-cols-1", cells: ["aspect-[16/9]"] },
  2: { grid: "grid-cols-5", cells: ["col-span-3 aspect-[4/3.3]", "col-span-2 h-full"] },
  3: { grid: "grid-cols-3 grid-rows-2", cells: ["col-span-2 row-span-2 aspect-[4/3]", "", ""] },
  4: { grid: "grid-cols-3", cells: ["col-span-3 aspect-[16/8]", "aspect-[4/3]", "aspect-[4/3]", "aspect-[4/3]"] },
  5: { grid: "grid-cols-4 grid-rows-2", cells: ["col-span-2 row-span-2 aspect-square sm:aspect-auto", "aspect-square", "aspect-square", "aspect-square", "aspect-square"] },
};

const KIND_LABEL = { photo: "현장", slide: "교안", illustration: "일러스트" } as const;

export default function CourseGallery({ course, priority = false }: { course: Course; priority?: boolean }) {
  const [open, setOpen] = useState<number | null>(null);
  const photos = course.photos;
  const n = Math.min(photos.length, 5);

  if (n === 0) {
    // 사진이 없는 과정(온라인·예정 등)은 수료증 같은 표지를 만든다. 황동 테두리 안에 과정명과 기관명
    return (
      <div className="relative aspect-[16/8] overflow-hidden bg-[#141517] p-3 sm:p-4">
        <div className="relative flex h-full flex-col justify-between border border-[#c9a063]/35 p-5 sm:p-8">
          <span aria-hidden="true" className="pointer-events-none absolute -bottom-8 right-2 font-display text-[7rem] leading-none text-[#c9a063]/10 sm:text-[11rem]">
            {course.org.slice(0, 2)}
          </span>
          <p className="text-[0.7rem] tracking-[0.25em] text-[#c9a063]">
            {course.upcoming > 0 && course.sessions === 0 ? "UPCOMING" : "SIDEONAI COURSE"}
          </p>
          <div className="relative">
            <p className="max-w-xl font-display text-xl leading-snug text-[#ecebe6] sm:text-3xl">{course.title}</p>
            <p className="mt-3 text-sm text-[#9a9890]">{course.org}</p>
          </div>
        </div>
      </div>
    );
  }

  const layout = LAYOUT[n];
  return (
    <>
      <ul className={`grid gap-1.5 sm:gap-2 ${layout.grid}`}>
        {photos.slice(0, n).map((p, i) => (
          <li key={p.src} className={`relative min-h-0 overflow-hidden bg-surface ${layout.cells[i] || "aspect-[4/3]"}`}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="group absolute inset-0 block h-full w-full cursor-zoom-in"
              aria-label={`${course.org} 사진 ${i + 1} 크게 보기`}
            >
              <Image
                src={p.src}
                alt={`${course.org} — ${course.title} ${KIND_LABEL[p.kind]} ${i + 1}`}
                fill
                priority={priority && i === 0}
                sizes={i === 0 ? "(max-width: 1024px) 100vw, 720px" : "(max-width: 1024px) 50vw, 300px"}
                className="object-cover transition duration-[1.2s] ease-out group-hover:scale-[1.04]"
              />
              <span className="absolute inset-0 bg-[#0d0e10]/0 transition duration-500 group-hover:bg-[#0d0e10]/10" />
              {p.kind !== "photo" && (
                <span className="absolute bottom-2 left-2 bg-[#0d0e10]/70 px-1.5 py-0.5 text-[0.65rem] tracking-wider text-[#ecebe6]/80">
                  {KIND_LABEL[p.kind]}
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>
      {open !== null && <Lightbox course={course} index={open} onIndex={setOpen} />}
    </>
  );
}

function Lightbox({ course, index, onIndex }: { course: Course; index: number; onIndex: (i: number | null) => void }) {
  const photos = course.photos;
  const go = useCallback((d: number) => onIndex((index + d + photos.length) % photos.length), [index, photos.length, onIndex]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onIndex(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [go, onIndex]);

  const p = photos[index];
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${course.org} 사진`}
      className="night fixed inset-0 z-[100] flex flex-col bg-[#0d0e10]/95 backdrop-blur-sm"
      onClick={() => onIndex(null)}
    >
      <div className="flex items-center justify-between px-5 py-4 text-sm sm:px-8">
        <p className="min-w-0 truncate text-muted">
          <span className="text-ink">{course.org}</span> — {course.title}
        </p>
        <button type="button" autoFocus onClick={() => onIndex(null)} className="ml-4 shrink-0 text-ink/80 hover:text-accent">
          닫기 ✕
        </button>
      </div>
      <div className="relative min-h-0 flex-1" onClick={(e) => e.stopPropagation()}>
        <Image src={p.src} alt={`${course.org} 사진 ${index + 1}`} fill sizes="100vw" className="object-contain" />
      </div>
      {photos.length > 1 && (
        <div className="flex items-center justify-center gap-8 py-5 text-ink" onClick={(e) => e.stopPropagation()}>
          <button type="button" onClick={() => go(-1)} className="px-3 py-1 hover:text-accent" aria-label="이전 사진">←</button>
          <span className="font-mono text-sm text-muted">{index + 1} / {photos.length}</span>
          <button type="button" onClick={() => go(1)} className="px-3 py-1 hover:text-accent" aria-label="다음 사진">→</button>
        </div>
      )}
    </div>
  );
}
