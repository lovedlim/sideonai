import Image from "next/image";
import Link from "next/link";
import { orgNames, photos, totalCount } from "@/data/activities";
import { STATS } from "@/data/site";
import CountUp from "./CountUp";
import SectionHead from "./SectionHead";
import SectionShell from "./SectionShell";

export default function TrackRecord() {
  // 큰 사진 1장(2×2 칸) + 작은 사진 8장이면 네 칸 격자가 빈칸 없이 찬다
  const shown = photos.slice(0, 9);
  return (
    <SectionShell id="track">
      <SectionHead
        label="실적"
        title="현장에서 검증했습니다"
        lead="기업, 공공기관, 컨퍼런스에서 진행한 강의와 강연입니다."
      />

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="reveal lg:col-span-3">
          <p className="font-display text-[clamp(4.5rem,9vw,7rem)] leading-none">
            <CountUp value={totalCount} />
            <span className="text-accent">+</span>
          </p>
          <p className="mt-3 text-muted">누적 강의 · 강연 횟수</p>
          <Link href="/activities" className="row-link mt-8 inline-block font-semibold">
            전체 활동 보기 <span className="arrow inline-block" aria-hidden="true">→</span>
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

      <dl className="reveal mt-20 grid grid-cols-2 border-y border-line lg:grid-cols-4">
        {STATS.map((s, i) => (
          <div key={s.label} className={`py-7 pr-4 ${i % 2 ? "pl-6" : ""} ${i > 0 ? "lg:border-l lg:border-line lg:pl-6" : ""} ${i < 2 ? "border-b border-line lg:border-b-0" : ""}`}>
            <dt className="sr-only">{s.label}</dt>
            <dd className="font-display text-[clamp(1.9rem,3vw,2.6rem)] leading-none">{s.value}</dd>
            <dd className="mt-2 text-sm text-muted" aria-hidden="true">{s.label}</dd>
          </div>
        ))}
      </dl>

      {/* 현장 사진. 첫 장을 크게 두고 나머지를 옆에 모은다 */}
      <ul className="mt-16 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4">
        {shown.map((p, i) => (
          <li key={p.image} className={`reveal ${i === 0 ? "col-span-2 row-span-2" : ""}`}>
            <figure className="flex h-full flex-col">
              <div className={`relative overflow-hidden bg-surface ${i === 0 ? "aspect-[4/3] sm:aspect-auto sm:flex-1" : "aspect-[4/3]"}`}>
                <Image
                  src={p.image}
                  alt={`${p.org} 강연 현장`}
                  fill
                  sizes={i === 0 ? "(max-width: 640px) 100vw, 560px" : "(max-width: 640px) 50vw, 280px"}
                  className="object-cover grayscale-[35%] transition duration-700 hover:grayscale-0"
                />
              </div>
              <figcaption className="mt-2.5 text-[0.8rem] text-muted">{p.org.replace(/\s*\(.*\)$/, "")}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
