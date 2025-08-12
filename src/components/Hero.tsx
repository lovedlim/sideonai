"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Hero() {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const stories = [
    {
      title: "코딩을 모르던 기획자가",
      subtitle: "3일 만에 AI로 웹사이트를 만들었습니다",
      description: "자연어로 소통하는 AI 시대, 누구나 개발자가 될 수 있습니다",
      color: "from-blue-600 to-indigo-600",
      icon: "🚀"
    },
    {
      title: "50회 이상 기업 교육으로",
      subtitle: "4,800명의 변화를 이끌어냈습니다",
      description: "실무에 바로 적용되는 교육, 만족도 4.9/5점의 검증된 커리큘럼",
      color: "from-purple-600 to-pink-600",
      icon: "🎯"
    },
    {
      title: "AI 답변왕이 직접 전하는",
      subtitle: "미래를 위한 새로운 교육 경험",
      description: "2024 인프런 답변왕, 200회 이상의 학습 모임 운영자가 함께합니다",
      color: "from-emerald-600 to-teal-600",
      icon: "🏆"
    }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentStoryIndex((prev) => (prev + 1) % stories.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [stories.length]);

  const currentStory = stories[currentStoryIndex];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 배경 애니메이션 */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMyIvPjwvZz48L2c+PC9zdmc+')] opacity-40"></div>
        
        {/* 플로팅 요소들 */}
        <div className="absolute top-20 left-10 animate-float-slow">
          <div className="w-12 h-12 bg-blue-200/20 rounded-full blur-sm"></div>
        </div>
        <div className="absolute top-40 right-20 animate-float-slower">
          <div className="w-8 h-8 bg-purple-200/20 rounded-full blur-sm"></div>
        </div>
        <div className="absolute bottom-32 left-20 animate-float">
          <div className="w-16 h-16 bg-indigo-200/20 rounded-full blur-sm"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* 스토리 인디케이터 */}
        <div className="flex justify-center mb-8 space-x-2">
          {stories.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentStoryIndex 
                  ? `bg-gradient-to-r ${currentStory.color}` 
                  : 'bg-gray-300/50'
              }`}
            />
          ))}
        </div>

        {/* 메인 스토리 */}
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mb-6">
            <div className="text-6xl mb-4 animate-bounce-gentle">
              {currentStory.icon}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-700 dark:text-gray-300 mb-2">
              {currentStory.title}
            </h1>
            <h2 className={`text-5xl md:text-7xl font-bold bg-gradient-to-r ${currentStory.color} bg-clip-text text-transparent mb-6 animate-gradient`}>
              {currentStory.subtitle}
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              {currentStory.description}
            </p>
          </div>

          {/* CTA 버튼들 */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Link
              href="/contact"
              className={`group bg-gradient-to-r ${currentStory.color} text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-110 hover:shadow-2xl shadow-lg relative overflow-hidden`}
            >
              <span className="relative z-10">🎯 나만의 AI 여정 시작하기</span>
              <div className="absolute inset-0 bg-white/20 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            </Link>
            <Link
              href="/courses"
              className="group border-2 border-gray-300 text-gray-700 dark:text-gray-300 dark:border-gray-600 hover:border-current px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 backdrop-blur-sm bg-white/30 dark:bg-black/30"
            >
              📚 교육과정 둘러보기
              <svg className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* 통계 섹션 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
          {[
            { number: "4.8K+", label: "교육 수강생", icon: "👥" },
            { number: "4.9/5", label: "만족도", icon: "⭐" },
            { number: "200+", label: "학습 모임", icon: "🎯" },
            { number: "50+", label: "기업 교육", icon: "🏢" }
          ].map((stat, index) => (
            <div 
              key={index}
              className="group bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg p-6 rounded-2xl border border-white/20 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300 hover:scale-105"
            >
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              <div className={`text-3xl font-bold bg-gradient-to-r ${currentStory.color} bg-clip-text text-transparent mb-1`}>
                {stat.number}
              </div>
              <div className="text-gray-600 dark:text-gray-300 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* 스크롤 인디케이터 */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="animate-bounce">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
