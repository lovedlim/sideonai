import Image from "next/image";
import type { Course, CoursePhoto } from "@/data/courses";

// 현장 사진이 두 줄로 천천히 반대 방향으로 흐르는 띠. 같은 목록을 두 번 이어 붙여 끊김 없이 돈다.
// 움직임을 줄인 환경에서는 멈춘 채로 보인다(globals.css의 reduced-motion 규칙).
// 트래픽을 아끼려고 줄마다 사진 수를 제한하고, 작은 크기·낮은 화질로 받는다(흐릿하게 지나가는 배경이라 충분하다).
// 같은 목록을 두 번 이어 붙이지만 주소가 같아 브라우저는 한 번만 받는다.
// photos를 주면 그 사진만 그 순서대로(메인용으로 고른 선명한 사진), 없으면 과정들의 현장 사진을 차례로 쓴다.
export default function PhotoWall({ courses = [], photos, rows = 2, perRow = 10, dim = false }: { courses?: Course[]; photos?: (CoursePhoto & { org: string })[]; rows?: number; perRow?: number; dim?: boolean }) {
  const all = photos ?? courses.flatMap((c) => c.photos.filter((p) => p.kind === "photo").map((p) => ({ ...p, org: c.org })));
  const lines = Array.from({ length: rows }, (_, r) => all.filter((_, i) => i % rows === r).slice(0, perRow));
  return (
    <div className={`flex flex-col gap-3 overflow-hidden ${dim ? "opacity-40" : ""}`} aria-hidden="true">
      {lines.map((line, r) => (
        <div key={r} className={`photo-wall-track flex w-max gap-3 ${r % 2 ? "photo-wall-reverse" : ""}`}>
          {[...line, ...line].map((p, i) => (
            <figure key={`${p.src}-${i}`} className="group relative h-40 shrink-0 overflow-hidden rounded-2xl sm:h-56" style={{ aspectRatio: Math.min(Math.max(p.w / p.h, 0.8), 1.6) }}>
              <Image src={p.src} alt="" fill sizes="(max-width: 640px) 200px, 300px" quality={dim ? 45 : 75} className="object-cover" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 pb-2 pt-6 text-xs text-white/90 opacity-0 transition group-hover:opacity-100">
                {p.org}
              </figcaption>
            </figure>
          ))}
        </div>
      ))}
    </div>
  );
}
