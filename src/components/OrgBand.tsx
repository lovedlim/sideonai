import { orgNames } from "@/data/courses";

// 3D 히어로 바로 아래, 함께한 기관 이름이 밤하늘 위로 천천히 흐른다.
export default function OrgBand() {
  return (
    <div className="neon relative z-10 overflow-hidden border-y border-line py-7" aria-label="함께한 기관">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#03060b] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#03060b] to-transparent" />
      <ul className="name-track flex w-max gap-12 whitespace-nowrap font-num text-2xl text-ink/55 sm:text-[2rem]">
        {[...orgNames, ...orgNames].map((o, i) => (
          <li key={`${o}-${i}`} aria-hidden={i >= orgNames.length} className="flex items-center gap-12">
            <span className={i % orgNames.length < 4 ? "text-ink" : ""}>{o}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_12px_rgba(77,243,255,0.9)]" aria-hidden="true" />
          </li>
        ))}
      </ul>
    </div>
  );
}
