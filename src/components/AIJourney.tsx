"use client";

import { useState, useEffect, useRef } from "react";

export default function AIJourney() {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const journeySteps = [
    {
      id: 1,
      title: "AI 무지개의 시작",
      subtitle: "호기심에서 시작된 여정",
      description: "코딩을 몰라도 괜찮습니다. 자연어로 소통하는 AI 시대가 왔어요. 누구나 개발자가 될 수 있는 마법 같은 시간이 시작됩니다.",
      icon: "🌈",
      color: "from-pink-500 to-rose-500",
      duration: "1일차",
      features: ["AI 기초 개념 이해", "ChatGPT 활용법", "첫 번째 프롬프트 작성"]
    },
    {
      id: 2,
      title: "바이브 코딩의 마법",
      subtitle: "상상이 현실이 되는 순간",
      description: "한국어로 말하면 코드가 됩니다. Cursor AI와 함께 생각만으로도 웹사이트를 만들어보세요. 마치 마법사가 된 것처럼!",
      icon: "✨",
      color: "from-purple-500 to-indigo-500",
      duration: "2-3일차",
      features: ["Cursor AI 마스터", "V0로 UI 디자인", "자연어 프로그래밍"]
    },
    {
      id: 3,
      title: "실무의 날개를 달다",
      subtitle: "현장에서 바로 써먹는 스킬",
      description: "배운 것을 실제 업무에 적용해보세요. 업무 자동화부터 팀 협업까지, AI가 당신의 최고의 파트너가 됩니다.",
      icon: "🚀",
      color: "from-blue-500 to-cyan-500",
      duration: "4-5일차",
      features: ["업무 자동화", "팀 협업 도구", "실전 프로젝트"]
    },
    {
      id: 4,
      title: "AI 전문가로 거듭나기",
      subtitle: "당신만의 AI 생태계 구축",
      description: "이제 당신이 AI 전문가입니다. 다른 사람들에게 지식을 나누고, 함께 성장하는 커뮤니티의 리더가 되어보세요.",
      icon: "👑",
      color: "from-emerald-500 to-teal-500",
      duration: "평생",
      features: ["전문가 네트워킹", "지식 공유", "지속적 성장"]
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
        setActiveStep((prev) => (prev + 1) % journeySteps.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isVisible, journeySteps.length]);

  return (
    <section 
      ref={sectionRef}
      className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* 배경 효과 */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-indigo-900 dark:to-purple-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(120,119,198,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(236,72,153,0.1),transparent_50%)]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* 섹션 헤더 */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gray-700 dark:text-gray-300">당신의 </span>
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              AI 여정 스토리
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            수천 명이 경험한 변화의 여정을 따라가보세요. 
            당신도 이 놀라운 이야기의 주인공이 될 수 있습니다.
          </p>
        </div>

        {/* 여정 단계들 */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 좌측: 단계 네비게이션 */}
          <div className="space-y-6">
            {journeySteps.map((step, index) => (
              <div
                key={step.id}
                className={`relative cursor-pointer transition-all duration-500 ${
                  index === activeStep 
                    ? 'transform scale-105' 
                    : 'opacity-70 hover:opacity-90'
                }`}
                onClick={() => setActiveStep(index)}
              >
                {/* 연결선 */}
                {index < journeySteps.length - 1 && (
                  <div className="absolute left-6 top-16 w-0.5 h-12 bg-gradient-to-b from-purple-300 to-pink-300 dark:from-purple-600 dark:to-pink-600"></div>
                )}
                
                <div className={`flex items-start space-x-4 p-6 rounded-2xl backdrop-blur-sm border transition-all duration-300 ${
                  index === activeStep
                    ? `bg-gradient-to-r ${step.color} text-white border-white/30 shadow-2xl`
                    : 'bg-white/60 dark:bg-gray-800/60 border-gray-200/50 dark:border-gray-700/50 hover:bg-white/80 dark:hover:bg-gray-800/80'
                }`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                    index === activeStep 
                      ? 'bg-white/20 backdrop-blur-sm' 
                      : 'bg-gray-100 dark:bg-gray-700'
                  }`}>
                    {step.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`text-lg font-bold ${
                        index === activeStep ? 'text-white' : 'text-gray-900 dark:text-white'
                      }`}>
                        {step.title}
                      </h3>
                      <span className={`text-sm px-3 py-1 rounded-full ${
                        index === activeStep 
                          ? 'bg-white/20 text-white' 
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                      }`}>
                        {step.duration}
                      </span>
                    </div>
                    <p className={`text-sm font-medium mb-2 ${
                      index === activeStep ? 'text-white/90' : 'text-gray-600 dark:text-gray-400'
                    }`}>
                      {step.subtitle}
                    </p>
                    <p className={`text-sm leading-relaxed ${
                      index === activeStep ? 'text-white/80' : 'text-gray-500 dark:text-gray-500'
                    }`}>
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 우측: 활성 단계 상세 정보 */}
          <div className={`transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="relative">
              {/* 메인 카드 */}
              <div className={`bg-gradient-to-br ${journeySteps[activeStep].color} p-8 rounded-3xl text-white shadow-2xl`}>
                <div className="text-6xl mb-6 text-center animate-bounce-gentle">
                  {journeySteps[activeStep].icon}
                </div>
                <h3 className="text-3xl font-bold text-center mb-4">
                  {journeySteps[activeStep].title}
                </h3>
                <p className="text-xl text-center mb-8 text-white/90">
                  {journeySteps[activeStep].subtitle}
                </p>
                
                {/* 특징 리스트 */}
                <div className="space-y-3">
                  <h4 className="text-lg font-semibold mb-4 text-center">핵심 학습 내용</h4>
                  {journeySteps[activeStep].features.map((feature, index) => (
                    <div 
                      key={index}
                      className={`flex items-center space-x-3 animate-slide-in-up`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span className="text-white/90">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* 진행 표시기 */}
                <div className="mt-8 flex justify-center space-x-2">
                  {journeySteps.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === activeStep ? 'bg-white' : 'bg-white/30'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* 플로팅 요소들 */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-white/20 rounded-full animate-float"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-white/20 rounded-full animate-float-slower"></div>
            </div>
          </div>
        </div>

        {/* CTA 섹션 */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            지금 바로 당신의 AI 여정을 시작해보세요!
          </p>
          <a
            href="/contact"
            className="inline-flex items-center bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-2xl"
          >
            🎯 여정 시작하기
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
