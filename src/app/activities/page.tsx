'use client';

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { sections, totalCount } from "@/data/activities";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

export default function ActivitiesPage() {
  const [activeYear, setActiveYear] = useState<number | "all">("all");

  const visibleSections =
    activeYear === "all" ? sections : sections.filter((s) => s.year === activeYear);

  return (
    <div className="min-h-screen bg-bg">
      <SiteHeader />
      <main id="main" className="max-w-2xl mx-auto px-4 pb-16 pt-28">

        {/* 뒤로가기 */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-accent transition-colors mb-6"
        >
          ← 돌아가기
        </Link>

        {/* 헤더 */}
        <div className="mb-6">
          <h1 className="font-display text-[2.5rem] leading-tight text-ink mb-3">
            강의 · 강연 활동
          </h1>
          <p className="text-sm text-muted">
            컨퍼런스, 기업교육, 워크숍 등{" "}
            <span className="font-semibold text-accent">{totalCount}회+</span>
          </p>
        </div>

        {/* 연도 필터 탭 */}
        <div className="flex gap-2 mb-6">
          {(["all", 2026, 2025] as const).map((y) => {
            const label = y === "all" ? "전체" : `${y}년`;
            return (
              <button
                key={y}
                onClick={() => setActiveYear(y)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-150 ${
                  activeYear === y
                    ? "bg-accent text-bg"
                    : "bg-surface text-muted border border-line hover:border-accent/60"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* 연도별 섹션 */}
        <div className="space-y-8">
          {visibleSections.map((section) => (
            <div key={section.year}>
              {/* 연도 구분선 */}
              <div className="flex items-center gap-3 mb-4">
                <span className="font-display text-3xl text-ink">
                  {section.year}
                </span>
                <div className="flex-1 h-px bg-line" />
                <span className="text-xs text-muted">
                  {section.groups.reduce((sum, g) => sum + g.activities.length, 0)}회
                </span>
              </div>

              {/* 기관별 카드 */}
              <div className="space-y-3">
                {section.groups.map((group) => (
                  <div
                    key={group.org}
                    className="card overflow-hidden"
                  >
                    {/* 기관 헤더 */}
                    <div className="flex items-center justify-between px-4 py-2.5 border-b border-line">
                      <span className="font-semibold text-ink text-sm">
                        {group.org}
                      </span>
                      {group.activities.length > 1 && (
                        <span className="text-xs text-muted">
                          {group.activities.length}회
                        </span>
                      )}
                    </div>

                    {/* 기관 이미지 */}
                    {group.image && (
                      <div className="mx-auto mt-3 relative aspect-square w-[calc(100%-5rem)] max-w-sm overflow-hidden">
                        <Image
                          src={group.image}
                          alt={group.org}
                          fill
                          className="object-cover"
                          sizes="(max-width: 480px) calc(100vw - 112px), 384px"
                        />
                      </div>
                    )}

                    {/* 활동 목록 */}
                    <ul className="divide-y divide-line">
                      {group.activities.map((activity, i) => {
                        const inner = (
                          <li className={`flex items-start gap-3 px-4 py-3 ${
                            activity.href
                              ? "hover:bg-accent/10 transition-colors cursor-pointer"
                              : ""
                          }`}>
                            <span className="node-dot mt-1.5 flex-shrink-0" aria-hidden="true" />
                            <p className="flex-1 text-sm text-ink/90 leading-snug">
                              {activity.title}
                            </p>
                            {activity.href && (
                              <span className="flex-shrink-0 mt-0.5 text-[10px] font-medium px-1.5 py-0.5 rounded-full leading-none border border-accent/40 text-accent">
                                링크
                              </span>
                            )}
                          </li>
                        );

                        return activity.href ? (
                          <a key={i} href={activity.href} target="_blank" rel="noopener noreferrer" className="block">
                            {inner}
                          </a>
                        ) : (
                          <div key={i}>{inner}</div>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-muted mt-10 mb-4">
          문의: ceo@sideonai.com
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
