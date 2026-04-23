'use client';

import ProfileAvatar from "@/components/ProfileAvatar";
import LinkButton from "@/components/LinkButton";
import SimpleContactForm from "@/components/SimpleContactForm";
import RandomBookLink from "@/components/RandomBookLink";

export default function Home() {
  const vibeBookLinks = [
    "https://product.kyobobook.co.kr/detail/S000219139681",
    "https://www.yes24.com/product/goods/176548558"
  ];
  const bigdataExamBookLinks = [
    "https://www.yes24.com/product/goods/185160480",
    "https://product.kyobobook.co.kr/detail/S000219615760"
  ];
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <main className="max-w-md mx-auto px-4 py-8 sm:py-12">
        {/* 프로필 섹션 */}
        <div className="text-center mb-8">
          <ProfileAvatar />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            SideOnAI
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base mb-1">
            도메인에 AI를 더하는, SideOnAI (퇴근후딴짓)
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            AI 교육 | 업무 자동화 | 바이브 코딩 | 데이터 분석
          </p>
        </div>

        {/* 신간 출시 배너 */}
        <div className="mb-8 animate-fade-in-up max-w-sm mx-auto">
          <RandomBookLink links={vibeBookLinks}>
            <div className="block relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 animate-pulse"></div>
              <img 
                src="/images/vibe-coding-book.png" 
                alt="바이브 코딩 with 커서 - 2026.2 출간 예정"
                className="w-full h-auto relative z-10"
              />
              <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-bounce z-20">
                NEW
              </div>
            </div>
          </RandomBookLink>
        </div>

        {/* 콘텐츠 */}
        <div className="space-y-3 mb-8">
          <LinkButton
            href="https://www.youtube.com/@ai-study"
            icon="📺"
            title="유튜브 (Youtube)"
            subtitle="youtube.com/@ai-study"
          />
          
          <LinkButton
            href="https://www.inflearn.com/users/26238/@roadmap"
            icon="🎓"
            title="VOD 과정 (인프런)"
            subtitle="만족도 4.9/5점 만점"
          />

          <a href="/activities" className="block">
            <div className="w-full px-6 py-4 rounded-2xl bg-gradient-to-br from-white to-indigo-50 dark:from-gray-800 dark:to-indigo-950/50 border border-indigo-100 dark:border-indigo-900 shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-between group hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 text-2xl">🎤</div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white text-base">강의 / 강연 활동</div>
                  <div className="text-sm text-indigo-400 mt-0.5">컨퍼런스, 기업교육, 워크숍 등 62회+</div>
                </div>
              </div>
              <div className="text-indigo-300 group-hover:text-indigo-500 transition-colors">→</div>
            </div>
          </a>
        </div>

        {/* 학습 자료 섹션 */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 px-2">
            📚 학습 자료
          </h2>
          <div className="space-y-3">
            <LinkButton
              href="https://www.kaggle.com/datasets/agileteam/bigdatacertificationkr"
              icon="📊"
              title="캐글 데이터분석 튜토리얼"
              subtitle="빅데이터 분석기사 실기 데이터셋"
            />
          </div>
        </div>

        {/* 도서 섹션 */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 px-2">
            📚 도서
          </h2>
          <div className="space-y-3">
            <LinkButton
              randomLinks={vibeBookLinks}
              icon="📖"
              title="바이브 코딩 with cursor"
              subtitle="길벗 (2026.2)"
            />
            
            <LinkButton
              randomLinks={bigdataExamBookLinks}
              icon="📕"
              title="2026 시나공 빅데이터분석기사 실기"
              subtitle="길벗"
            />
            
            <LinkButton
              href="https://www.yes24.com/product/goods/102603640"
              icon="📗"
              title="파이썬 딥러닝 텐서플로"
              subtitle="정보문화사"
            />
          </div>
        </div>

        {/* 전자 도서 (공개) 섹션 */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 px-2">
            📱 전자 도서 (공개)
          </h2>
          <div className="space-y-3">
            <LinkButton
              href="https://wikidocs.net/book/19077"
              icon="📘"
              title="AI 기반 소방 활용 (기초)"
              subtitle="위키독스"
            />
          </div>
        </div>

        {/* 간편 문의 폼 */}
        <SimpleContactForm />

        {/* 연락처 및 링크 */}
        <div className="mb-8 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 px-2">
            🔗 연락처 및 링크
          </h2>
          <div className="space-y-3">
            <LinkButton
              href="mailto:danmujicafe@gmail.com"
              icon="✉️"
              title="이메일"
              subtitle="danmujicafe@gmail.com"
            />
            
            <LinkButton
              href="https://github.com/lovedlim/"
              icon="🐙"
              title="깃허브 (Github)"
              subtitle="github.com/lovedlim"
            />
            
            <LinkButton
              href="https://www.linkedin.com/in/ailab"
              icon="💼"
              title="링크드인 (LinkedIn)"
              subtitle="linkedin.com/in/ailab"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
