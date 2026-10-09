import Image from "next/image";
import type { Course } from "@/data/courses";

// 과정 하나의 사진 모음. 장수에 따라 배치가 달라진다.
// 1장: 넓게 한 장 / 2장: 큰 것과 작은 것 / 3장: 왼쪽 큰 것 + 오른쪽 둘 / 4장: 위 큰 것 + 아래 셋 / 5장: 큰 것 + 넷
const LAYOUT: Record<number, { grid: string; cells: string[] }> = {
  1: { grid: "grid-cols-1", cells: ["aspect-[16/9]"] },
  2: {
    grid: "grid-cols-5",
    cells: ["col-span-3 aspect-[4/3.3]", "col-span-2 h-full"],
  },
  3: {
    grid: "grid-cols-3 grid-rows-2",
    cells: ["col-span-2 row-span-2 aspect-[4/3]", "", ""],
  },
  4: {
    grid: "grid-cols-3",
    cells: [
      "col-span-3 aspect-[16/8]",
      "aspect-[4/3]",
      "aspect-[4/3]",
      "aspect-[4/3]",
    ],
  },
  5: {
    grid: "grid-cols-4 grid-rows-2",
    cells: [
      "col-span-2 row-span-2 aspect-square sm:aspect-auto",
      "aspect-square",
      "aspect-square",
      "aspect-square",
      "aspect-square",
    ],
  },
};

const KIND_LABEL = {
  photo: "현장",
  slide: "교안",
  illustration: "일러스트",
} as const;

// card: 메인의 작은 대표 과정 카드용. 사진 장수와 상관없이 같은 비율(16:10) 안에 최대 3장을 넣어
// 나란히 놓인 카드끼리 높이가 맞는다.
const CARD: Record<number, { grid: string; cells: string[] }> = {
  1: { grid: "grid-cols-1", cells: [""] },
  2: { grid: "grid-cols-3", cells: ["col-span-2", ""] },
  3: { grid: "grid-cols-3 grid-rows-2", cells: ["col-span-2 row-span-2", "", ""] },
};

export default function CourseGallery({
  course,
  priority = false,
  variant = "full",
}: {
  course: Course;
  priority?: boolean;
  variant?: "full" | "card";
}) {
  const photos = course.photos;
  const n = Math.min(photos.length, variant === "card" ? 3 : 5);

  if (n === 0) {
    // 사진이 없는 과정(온라인·예정 등)은 수료증 같은 표지를 만든다. 황동 테두리 안에 과정명과 기관명
    return (
      <div className="relative aspect-[16/8] overflow-hidden bg-[#050b14] p-3 sm:p-4">
        <div className="relative flex h-full flex-col justify-between border border-[#4df3ff]/30 p-5 sm:p-8">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-8 right-2 font-display text-[7rem] leading-none text-[#4df3ff]/10 sm:text-[11rem]"
          >
            {course.org.slice(0, 2)}
          </span>
          <p className="text-[0.7rem] tracking-[0.25em] text-[#ffb454]">
            {course.upcoming > 0 && course.sessions === 0
              ? "UPCOMING"
              : "SIDEONAI COURSE"}
          </p>
          <div className="relative">
            <p className="max-w-xl font-display text-xl leading-snug text-[#eaf6ff] sm:text-3xl">
              {course.title}
            </p>
            <p className="mt-3 text-sm text-[#8aa0b4]">{course.org}</p>
          </div>
        </div>
      </div>
    );
  }

  const card = variant === "card";
  const layout = card ? CARD[n] : LAYOUT[n];
  return (
    <ul className={`grid gap-1.5 sm:gap-2 ${layout.grid} ${card ? "aspect-[16/10]" : ""}`}>
      {photos.slice(0, n).map((p, i) => (
        <li
          key={p.src}
          className={`relative min-h-0 overflow-hidden bg-surface ${card ? layout.cells[i] : layout.cells[i] || "aspect-[4/3]"}`}
        >
          <div className="group absolute inset-0">
            <Image
              src={p.src}
              alt={`${course.org} — ${course.title} ${KIND_LABEL[p.kind]} ${i + 1}`}
              fill
              priority={priority && i === 0}
              sizes={
                card
                  ? i === 0
                    ? "(max-width: 1024px) 66vw, 400px"
                    : "(max-width: 1024px) 33vw, 200px"
                  : i === 0
                  ? "(max-width: 1024px) 100vw, 720px"
                  : "(max-width: 1024px) 50vw, 300px"
              }
              className="object-cover transition duration-[1.2s] ease-out group-hover:scale-[1.04]"
            />
            <span className="absolute inset-0 bg-[#050b14]/0 transition duration-500 group-hover:bg-[#050b14]/10" />
            {p.kind !== "photo" && (
              <span className="absolute bottom-2 left-2 bg-[#050b14]/70 px-1.5 py-0.5 text-[0.65rem] tracking-wider text-[#eaf6ff]/80">
                {KIND_LABEL[p.kind]}
              </span>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
