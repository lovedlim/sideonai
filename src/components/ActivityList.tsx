'use client';

import { useState } from "react";

interface Activity {
  title: string;
  org: string;
  href?: string;
  year: number;
}

const activities: Activity[] = [
  // 2026
  { org: "KB국민카드", title: "AI 문서 작성법", year: 2026 },
  { org: "KB국민카드", title: "업무 자동화 설계 및 구현", year: 2026 },
  { org: "생성형AI 활용 과정", title: "신임자 2회", year: 2026 },
  { org: "서울소방학교", title: "AI기반 소방활용(기초) 과정 / 2기", year: 2026 },
  { org: "한빛", title: "바이브 코딩으로 만드는 독서 챌린지 웹앱 만들기", year: 2026 },
  { org: "디지털 오픈랩 x 인프런", title: "AI를 활용한 데이터 수집과 데이터 분석", href: "https://inf.run/A96Ct", year: 2026 },
  { org: "전자신문", title: "'바이브 코딩'으로 웹/앱 제작 워크숍(중급반) with Cursor + n8n", href: "https://conference.etnews.com/conf_info.html?uid=467", year: 2026 },
  { org: "JB금융그룹", title: "사내 경진대회(해커톤) 기술 심사 (40개 팀)", year: 2026 },
  { org: "서울소방학교", title: "AI기반 소방활용(기초) 과정 / 1기", year: 2026 },
  { org: "JB금융그룹", title: "바이브코딩 교육 with 커서 / 강의 및 사내 콘텐츠", year: 2026 },
  // 2025
  { org: "중앙여고", title: "교사를 위한 생성형AI 활용", year: 2025 },
  { org: "전자신문", title: "코딩 몰라도 OK! 바이브 코딩 워크숍 5차", href: "https://conference.etnews.com/conf_info.html?uid=461", year: 2025 },
  { org: "서울소방학교", title: "소방행정실무 과정 2회", year: 2025 },
  { org: "서울소방학교", title: "소방위 역량 향상 과정", year: 2025 },
  { org: "서울소방학교", title: "위험물 실무 과정", year: 2025 },
  { org: "서울소방학교", title: "승진(예정)자 역량강화 과정", year: 2025 },
  { org: "전자신문", title: "코딩 몰라도 OK! 바이브 코딩 워크숍 4차", href: "https://conference.etnews.com/conf_info.html?uid=448", year: 2025 },
  { org: "2025블록체인 진흥주간 X 웹3.0컨퍼런스", title: "바이브 코딩과 ChatGPT: 생성형 AI와 개발 생산성", href: "https://blockchainweek.co.kr/2025/programDay.do?tab=2", year: 2025 },
  { org: "서울소방학교", title: "현장지휘관양성(초급) 과정 (소방위)", year: 2025 },
  { org: "EBS", title: "AI 활용 및 콘텐츠 제작 교육 - 바이브코딩", href: "http://edu.kobeta.com/education/index-list_cate1.php?idx=209&code=all&bgu=view", year: 2025 },
  { org: "서울소방학교", title: "AI와 소방의 미래 (신임자 170명)", year: 2025 },
  { org: "서울시평생교육진흥원", title: "생성형AI 업무활용 기초 과정", year: 2025 },
  { org: "한국조세재정연구원", title: "AI를 활용한 행정업무 자동화 과정", year: 2025 },
  { org: "한국조세재정연구원", title: "AI 기반 연구 생산성 혁신 과정", year: 2025 },
  { org: "바이브컴퍼니(구, 다음소프트)", title: "바이브 코딩 워크샵: AI와 협업하기", year: 2025 },
  { org: "서울소방학교", title: "재난현장 AI 기술 활용 (서장급 대상) / 2회", year: 2025 },
  { org: "국토안전관리원", title: "AI 시대의 필수 역량: 생성형 AI 실무", year: 2025 },
  { org: "국토안전관리원", title: "생성형AI를 활용한 업무 자동화", year: 2025 },
  { org: "국토안전관리원", title: "바이브 코딩: 노코드로 AI 서비스 개발", year: 2025 },
  { org: "전자신문", title: "코딩 몰라도 OK! 바이브 코딩 워크숍 3차", href: "https://conference.etnews.com/conf_info.html?uid=417", year: 2025 },
  { org: "KISA 2025 WTMD", title: "프롬프트로 완성하는 나만의 서비스, 바이브 코딩 / 2회", year: 2025 },
  { org: "성남시청소년재단", title: "Code to Great: 주니어 개발자와 AI 협업", year: 2025 },
  { org: "한국여성정책연구원", title: "생성형 AI 시대, 전 직원을 위한 데이터 이해와 입문", year: 2025 },
  { org: "한국여성정책연구원", title: "업무자동화를 위한 파이썬 실전활용 (행정직 대상)", year: 2025 },
  { org: "멀티캠퍼스(임직원, SSAFY)", title: "새로운 개발 경험, 바이브 코딩 실습", year: 2025 },
  { org: "전자신문", title: "코딩 몰라도 OK! 바이브 코딩 워크숍 2차", href: "https://conference.etnews.com/conf_info.html?uid=406", year: 2025 },
  { org: "메타코드", title: "Vibe Coding 실무형 1 Day 워크숍", href: "https://www.datanet.co.kr/news/articleView.html?idxno=203465", year: 2025 },
  { org: "넥슨코리아 (사내 동아리)", title: "Vibe Coding: 가장 쉬운 프로그래밍 언어는 한국어다", year: 2025 },
  { org: "전자신문", title: "코딩 몰라도 OK! 바이브 코딩 워크숍 1차", href: "https://conference.etnews.com/conf_info.html?uid=385", year: 2025 },
  { org: "강남서초교육지원청 (교사 대상)", title: "생성형 AI 활용", year: 2025 },
  { org: "중앙여고", title: "커서AI와 V0를 활용한 웹사이트 만들기", year: 2025 },
  { org: "모두의연구소", title: "n8n, AI를 나만의 업무 파트너로", href: "https://event-us.kr/modu/event/100282", year: 2025 },
];

const PREVIEW_COUNT = 5;

export default function ActivityList() {
  const [expanded, setExpanded] = useState(false);

  const years = [...new Set(activities.map((a) => a.year))].sort((a, b) => b - a);

  const visibleActivities = expanded ? activities : activities.slice(0, PREVIEW_COUNT);

  const totalCount = activities.length;

  return (
    <div className="mb-8">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-3 px-2">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          🎤 강의 / 강연 활동
        </h2>
        <span className="text-xs font-medium bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 px-2.5 py-1 rounded-full">
          총 {totalCount}회+
        </span>
      </div>

      {/* 카드 */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm overflow-hidden">
        {/* 연도별 그룹 렌더링 */}
        {years.map((year) => {
          const yearItems = visibleActivities.filter((a) => a.year === year);
          if (yearItems.length === 0) return null;
          return (
            <div key={year}>
              {/* 연도 배지 */}
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-700">
                <span className="text-xs font-bold text-indigo-500 dark:text-indigo-400 tracking-widest uppercase">
                  {year}
                </span>
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  {activities.filter((a) => a.year === year).length}회
                </span>
              </div>

              {/* 항목 목록 */}
              <ul className="divide-y divide-gray-100 dark:divide-gray-700/50">
                {yearItems.map((activity, i) => {
                  const inner = (
                    <li
                      key={i}
                      className={`flex items-start gap-3 px-4 py-3 ${
                        activity.href
                          ? "hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors duration-150 cursor-pointer"
                          : ""
                      }`}
                    >
                      <span className="mt-0.5 flex-shrink-0 text-green-500 text-sm">✔</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 truncate">
                          {activity.org}
                        </p>
                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-snug mt-0.5">
                          {activity.title}
                        </p>
                      </div>
                      {activity.href && (
                        <span className="flex-shrink-0 mt-1 text-gray-300 dark:text-gray-600 text-xs">
                          →
                        </span>
                      )}
                    </li>
                  );

                  return activity.href ? (
                    <a
                      key={i}
                      href={activity.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div key={i}>{inner}</div>
                  );
                })}
              </ul>
            </div>
          );
        })}

        {/* 더 보기 / 접기 버튼 */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full py-3 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors duration-150 border-t border-gray-100 dark:border-gray-700 flex items-center justify-center gap-1"
        >
          {expanded ? (
            <>접기 <span className="text-xs">▲</span></>
          ) : (
            <>전체 보기 ({totalCount - PREVIEW_COUNT}개 더) <span className="text-xs">▼</span></>
          )}
        </button>
      </div>
    </div>
  );
}
