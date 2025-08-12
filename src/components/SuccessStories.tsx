"use client";

import { useState, useEffect, useRef } from "react";

export default function SuccessStories() {
  const [currentStory, setCurrentStory] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const stories = [
    {
      id: 1,
      name: "김영수",
      role: "마케팅 팀장",
      company: "스타트업 A",
      image: "🧑‍💼",
      story: "코딩을 전혀 몰랐던 제가 3일 만에 회사 랜딩페이지를 만들었어요. 개발팀에 의존하지 않고도 빠르게 아이디어를 구현할 수 있게 되었습니다.",
      achievement: "개발 의존도 80% 감소",
      course: "바이브 코딩 워크숍",
      rating: 5,
      beforeAfter: {
        before: "개발팀 대기 시간 2주+",
        after: "즉시 프로토타입 제작 가능"
      }
    },
    {
      id: 2,
      name: "박지민",
      role: "HR 담당자",
      company: "대기업 B",
      image: "👩‍💼",
      story: "AI 도구로 채용 프로세스를 자동화했더니 업무 효율이 300% 향상되었습니다. 이제 더 의미 있는 업무에 집중할 수 있어요.",
      achievement: "업무 효율 300% 향상",
      course: "생성형 AI 활용 교육",
      rating: 5,
      beforeAfter: {
        before: "수작업 데이터 처리 8시간/일",
        after: "AI 자동화로 2시간/일"
      }
    },
    {
      id: 3,
      name: "이창호",
      role: "데이터 분석가",
      company: "금융회사 C",
      image: "🧑‍💻",
      story: "빅데이터 분석기사 자격증을 취득하고 연봉이 40% 올랐습니다. 실무에 바로 적용할 수 있는 실습 위주 교육이 정말 도움되었어요.",
      achievement: "연봉 40% 상승",
      course: "빅데이터 분석기사 대비",
      rating: 5,
      beforeAfter: {
        before: "기초적인 Excel 분석",
        after: "고급 머신러닝 모델 구축"
      }
    },
    {
      id: 4,
      name: "정민경",
      role: "프로덕트 오너",
      company: "테크 스타트업",
      image: "👩‍🚀",
      story: "팀 전체가 AI 도구를 활용하게 되면서 프로덕트 출시 속도가 2배 빨라졌습니다. 모든 팀원이 개발자가 된 기분이에요!",
      achievement: "출시 속도 2배 향상",
      course: "맞춤형 기업 교육",
      rating: 5,
      beforeAfter: {
        before: "아이디어→출시 3개월",
        after: "아이디어→출시 6주"
      }
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setCurrentStory((prev) => (prev + 1) % stories.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isVisible, stories.length]);

  const currentStoryData = stories[currentStory];

  return (
    <section 
      ref={sectionRef}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-emerald-900 dark:to-teal-900 relative overflow-hidden"
    >
      {/* 배경 패턴 */}
      <div className="absolute inset-0 opacity-30">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" className="text-emerald-200 dark:text-emerald-800"/>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* 섹션 헤더 */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gray-700 dark:text-gray-300">변화의 </span>
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              성공 스토리
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            실제 수강생들의 놀라운 변화 이야기를 들어보세요. 
            당신의 다음 성공 스토리를 기대합니다.
          </p>
        </div>

        {/* 메인 스토리 카드 */}
        <div className={`max-w-4xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20">
            {/* 사용자 정보 */}
            <div className="flex items-center justify-center mb-8">
              <div className="text-6xl mr-6 animate-bounce-gentle">
                {currentStoryData.image}
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {currentStoryData.name}
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-1">
                  {currentStoryData.role}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  {currentStoryData.company}
                </p>
                <div className="flex justify-center mt-2">
                  {[...Array(currentStoryData.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">⭐</span>
                  ))}
                </div>
              </div>
            </div>

            {/* 스토리 내용 */}
            <div className="text-center mb-8">
              <div className="text-4xl mb-4">&ldquo;</div>
              <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed italic mb-6">
                {currentStoryData.story}
              </p>
              <div className="text-4xl">&rdquo;</div>
            </div>

            {/* 성과 하이라이트 */}
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white p-6 rounded-2xl text-center mb-8">
              <h4 className="text-lg font-semibold mb-2">핵심 성과</h4>
              <p className="text-2xl font-bold">{currentStoryData.achievement}</p>
            </div>

            {/* Before & After */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-2xl border-l-4 border-red-400">
                <h5 className="font-semibold text-red-700 dark:text-red-400 mb-2">교육 전</h5>
                <p className="text-gray-700 dark:text-gray-300">{currentStoryData.beforeAfter.before}</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-2xl border-l-4 border-green-400">
                <h5 className="font-semibold text-green-700 dark:text-green-400 mb-2">교육 후</h5>
                <p className="text-gray-700 dark:text-gray-300">{currentStoryData.beforeAfter.after}</p>
              </div>
            </div>

            {/* 수강 과정 */}
            <div className="text-center">
              <span className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-full text-sm font-medium">
                수강 과정: {currentStoryData.course}
              </span>
            </div>
          </div>
        </div>

        {/* 스토리 네비게이션 */}
        <div className="flex justify-center mt-8 space-x-4">
          {stories.map((story, index) => (
            <button
              key={story.id}
              onClick={() => setCurrentStory(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                index === currentStory 
                  ? 'bg-emerald-500 scale-125' 
                  : 'bg-gray-300 dark:bg-gray-600 hover:bg-emerald-300'
              }`}
              aria-label={`${story.name}의 스토리`}
            />
          ))}
        </div>

        {/* 미니 스토리 카드들 */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          {stories.filter((_, index) => index !== currentStory).slice(0, 3).map((story) => (
            <div 
              key={story.id}
              className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm p-6 rounded-2xl border border-white/20 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => setCurrentStory(stories.findIndex(s => s.id === story.id))}
            >
              <div className="text-3xl mb-3 text-center">{story.image}</div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-2 text-center">
                {story.name}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-3">
                {story.role} | {story.company}
              </p>
              <div className="bg-gradient-to-r from-emerald-400 to-teal-400 text-white px-3 py-1 rounded-full text-xs font-medium text-center">
                {story.achievement}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            당신도 다음 성공 스토리의 주인공이 되어보세요!
          </p>
          <a
            href="/contact"
            className="inline-flex items-center bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-2xl"
          >
            🌟 나의 성공 스토리 시작하기
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
