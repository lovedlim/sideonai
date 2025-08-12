"use client";

import { useState, useEffect, useRef } from "react";

export default function WhyNowStory() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentPain, setCurrentPain] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const painPoints = [
    "AI가 중요하다는 건 아는데, 어디서부터 시작할지 막막하다면?",
    "ChatGPT 써서 일하라는데, 막상 광고처럼 안 되던데요?",
    "뭐가 새로 나왔다고? 변화가 빨라서 실무 적용은 힘들어요",
    "혼자 배우기엔 막막하고, 회사에서는 보안이 걱정되고...",
    "프롬프트 어떻게 해야 잘 쓸 수 있을까요?",
    "노코드 개발하고 싶은데, 실제로 쓰기엔 오류가 많아요",
    "팀에서 다같이 어떻게 써야 하는지 막막해요"
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
        setCurrentPain((prev) => (prev + 1) % painPoints.length);
      }, 2500);
      return () => clearInterval(interval);
    }
  }, [isVisible, painPoints.length]);

  return (
    <section 
      ref={sectionRef}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-red-900 dark:to-orange-900 relative overflow-hidden"
    >
      {/* 배경 패턴 */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-6xl animate-float-slow">😰</div>
        <div className="absolute top-32 right-20 text-4xl animate-float">😅</div>
        <div className="absolute bottom-20 left-32 text-5xl animate-float-slower">🤔</div>
        <div className="absolute bottom-40 right-10 text-3xl animate-float">😵‍💫</div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* 섹션 헤더 */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-gray-700 dark:text-gray-300">혹시 이런 </span>
            <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              고민
            </span>
            <span className="text-gray-700 dark:text-gray-300"> 있으신가요?</span>
          </h2>
        </div>

        {/* 메인 Pain Point */}
        <div className={`max-w-5xl mx-auto text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20 relative">
            <div className="text-6xl mb-6 animate-bounce-gentle">😣</div>
            <p className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200 leading-relaxed">
              {painPoints[currentPain]}
            </p>
            
            {/* 진행 표시기 */}
            <div className="flex justify-center mt-8 space-x-2">
              {painPoints.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentPain ? 'bg-red-500 scale-125' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Pain Points 그리드 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {[
            { emoji: "😰", text: "막상 광고처럼 안되던데요?", color: "from-red-400 to-red-600" },
            { emoji: "🤔", text: "어디서부터 시작할지 막막해요", color: "from-orange-400 to-orange-600" },
            { emoji: "😅", text: "혼자 배우기엔 너무 어려워요", color: "from-yellow-400 to-yellow-600" },
            { emoji: "😵‍💫", text: "변화가 너무 빨라서 따라가기 힘들어요", color: "from-pink-400 to-pink-600" },
            { emoji: "😟", text: "회사에서 보안이 걱정돼요", color: "from-purple-400 to-purple-600" },
            { emoji: "😤", text: "팀에서 어떻게 써야 할지 모르겠어요", color: "from-indigo-400 to-indigo-600" }
          ].map((pain, index) => (
            <div 
              key={index}
              className={`bg-gradient-to-br ${pain.color} text-white p-6 rounded-2xl shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer animate-fade-in-scale`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-4xl mb-4 text-center">{pain.emoji}</div>
              <p className="text-lg font-semibold text-center">{pain.text}</p>
            </div>
          ))}
        </div>

        {/* 전환점 */}
        <div className="text-center mb-16">
          <div className="inline-block bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-full text-xl font-bold shadow-lg animate-bounce-gentle">
            하지만 걱정 마세요! 🙌
          </div>
        </div>

        {/* 솔루션 제시 */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-3xl p-8 md:p-12 border border-emerald-200 dark:border-emerald-700">
            <div className="text-center mb-8">
              <h3 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  SideOnAI가 모든 걸 해결해드릴게요!
                </span>
              </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h4 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  🎯 실무에 바로 쓰이는 교육
                </h4>
                <ul className="space-y-3">
                  {[
                    "이론은 덜고, 실전은 더 깊게",
                    "배우는 순간 바로 써먹을 수 있는 노하우",
                    "실무 시나리오 그대로 반영한 커리큘럼",
                    "4,800명이 검증한 교육 프로그램"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mt-3 flex-shrink-0"></div>
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-6">
                <h4 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  🚀 개인부터 팀까지 맞춤 솔루션
                </h4>
                <ul className="space-y-3">
                  {[
                    "개인 수준에 맞는 단계별 학습",
                    "기업 맞춤형 교육 프로그램",
                    "안전한 AI 도입 가이드라인 제공",
                    "지속적인 커뮤니티 지원"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-teal-500 rounded-full mt-3 flex-shrink-0"></div>
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="text-center mt-12">
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
                더 이상 혼자 고민하지 마세요!
              </p>
              <a
                href="/contact"
                className="inline-flex items-center bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-2xl"
              >
                🎯 지금 바로 시작하기
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
