"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function LearningRoadmap() {
  const [isVisible, setIsVisible] = useState(false);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const roadmapSteps = [
    {
      id: 1,
      step: "STEP 1",
      title: "AI와 친해지기",
      subtitle: "내 업무 효율 200% 올리기",
      courses: [
        {
          title: "(초급) AI 시대의 필수 역량: 생성형 AI 실무",
          duration: "1day",
          summary: "AI의 'A'도 모르는 분들을 위한 가장 친절한 입문서",
          features: ["기본 개념부터 차근차근", "실무 활용 사례 중심", "ChatGPT/Claude/Gemini 완전정복"],
          color: "from-blue-500 to-blue-600",
          icon: "🎯"
        }
      ]
    },
    {
      id: 2,
      step: "STEP 2",
      title: "AI를 내 비서로 만들기",
      subtitle: "반복 업무 완전 자동화",
      courses: [
        {
          title: "(중급) 생성형 AI를 활용한 업무 자동화",
          duration: "1day",
          summary: "나만의 AI 업무봇을 만들어 귀찮은 일은 AI에게 맡기세요",
          features: ["GPTs & Gems 제작", "데이터 분석 자동화", "문서 작업 완전 자동화"],
          color: "from-green-500 to-green-600",
          icon: "🤖"
        },
        {
          title: "(고급) n8n을 활용한 업무 자동화",
          duration: "1day",
          summary: "이메일 요약, 민원 처리, 데이터 통합까지 가능한 전문 자동화 툴",
          features: ["워크플로우 설계", "API 연동 마스터", "복잡한 비즈니스 프로세스 자동화"],
          color: "from-emerald-500 to-emerald-600",
          icon: "⚡"
        }
      ]
    },
    {
      id: 3,
      step: "STEP 3",
      title: "AI로 서비스 만들기",
      subtitle: "아이디어를 현실로 구현하기",
      courses: [
        {
          title: "(고급) 바이브 코딩: 노코드로 AI 서비스 개발",
          duration: "1day",
          summary: "말로 설명하면 AI가 웹 서비스를 개발합니다",
          features: ["Cursor AI 완전정복", "Firebase 연동", "실제 서비스 배포"],
          color: "from-purple-500 to-purple-600",
          icon: "🚀"
        },
        {
          title: "비개발자를 위한 바이브 코딩",
          duration: "3day",
          summary: "기획부터 배포까지, 3일 만에 나만의 웹 서비스를 완성하는 전 과정",
          features: ["API 서비스 제작", "데이터베이스 연동", "GitHub & Vercel 배포"],
          color: "from-indigo-500 to-indigo-600",
          icon: "🛠️"
        }
      ]
    },
    {
      id: 4,
      step: "SPECIAL",
      title: "전문가로 인정받기",
      subtitle: "자격증으로 실력 인증",
      courses: [
        {
          title: "빅데이터 분석기사 실기 자격증 과정",
          duration: "5day",
          summary: "시나공 저자 직강! 가장 확실한 합격 로드맵",
          features: ["파이썬 & 판다스 완전정복", "머신러닝 실전 문제", "최신 기출 완벽 분석"],
          color: "from-yellow-500 to-orange-500",
          icon: "🏆"
        }
      ]
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

  return (
    <section 
      ref={sectionRef}
      id="roadmap"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50 dark:from-gray-900 dark:via-slate-900 dark:to-blue-900"
    >
      <div className="max-w-7xl mx-auto">
        {/* 섹션 제목 */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6">
            Learning Roadmap
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            AI, 당신의 레벨에 맞춰 <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              시작하세요
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            왕초보부터 예비 창업가까지, 당신의 목표에 맞는 최적의 학습 경로를 안내합니다.
          </p>
        </div>

        {/* 로드맵 스텝들 */}
        <div className="space-y-12">
          {roadmapSteps.map((step, stepIndex) => (
            <div 
              key={step.id}
              className={`transition-all duration-1000 delay-${stepIndex * 200} ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              {/* 스텝 헤더 */}
              <div className="text-center mb-8">
                <div className={`inline-block px-4 py-2 rounded-full text-sm font-bold mb-4 ${
                  step.id === 4 
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
                }`}>
                  {step.step}
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  {step.subtitle}
                </p>
              </div>

              {/* 코스 카드들 */}
              <div className={`grid ${step.courses.length > 1 ? 'md:grid-cols-2' : 'md:grid-cols-1 max-w-4xl mx-auto'} gap-6`}>
                {step.courses.map((course, courseIndex) => (
                  <div 
                    key={courseIndex}
                    className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/20 hover:scale-105 transition-all duration-300 relative overflow-hidden group"
                  >
                    {/* 배경 그라데이션 */}
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${course.color} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity duration-300`}></div>
                    
                    <div className="relative z-10">
                      {/* 코스 헤더 */}
                      <div className="flex items-start justify-between mb-6">
                        <div className={`text-4xl p-3 rounded-2xl bg-gradient-to-br ${course.color} text-white shadow-lg`}>
                          {course.icon}
                        </div>
                        <div className={`px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r ${course.color} text-white`}>
                          {course.duration}
                        </div>
                      </div>

                      {/* 코스 정보 */}
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">
                        {course.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                        {course.summary}
                      </p>

                      {/* 주요 특징 */}
                      <div className="space-y-2 mb-6">
                        {course.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${course.color} mr-3`}></div>
                            {feature}
                          </div>
                        ))}
                      </div>

                      {/* CTA 버튼 */}
                      <div className="flex gap-3">
                        <button
                          onClick={() => setExpandedCard(expandedCard === (stepIndex * 10 + courseIndex) ? null : (stepIndex * 10 + courseIndex))}
                          className={`flex-1 bg-gradient-to-r ${course.color} text-white px-4 py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-300 shadow-lg`}
                        >
                          상세 커리큘럼 보기
                        </button>
                        <Link
                          href="/contact"
                          className="px-6 py-3 border-2 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:border-blue-500 hover:text-blue-500 transition-all duration-300"
                        >
                          문의하기
                        </Link>
                      </div>

                      {/* 확장된 상세 정보 */}
                      {expandedCard === (stepIndex * 10 + courseIndex) && (
                        <div className="mt-6 p-6 bg-gray-50 dark:bg-gray-700/50 rounded-2xl border border-gray-200 dark:border-gray-600">
                          <h5 className="font-bold text-gray-900 dark:text-white mb-4">상세 커리큘럼</h5>
                          <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                            <div className="flex justify-between items-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                              <span>1교시: AI 기초 개념 및 트렌드</span>
                              <span className="text-xs text-gray-500">50분</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                              <span>2교시: 프롬프트 엔지니어링 실습</span>
                              <span className="text-xs text-gray-500">60분</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                              <span>3교시: 실전 프로젝트 진행</span>
                              <span className="text-xs text-gray-500">90분</span>
                            </div>
                            <div className="text-center mt-4">
                              <Link
                                href="/courses"
                                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                              >
                                전체 커리큘럼 자세히 보기 →
                              </Link>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* 스텝 구분선 (마지막 스텝 제외) */}
              {stepIndex < roadmapSteps.length - 1 && (
                <div className="flex justify-center mt-12">
                  <div className="w-px h-16 bg-gradient-to-b from-blue-200 to-transparent dark:from-blue-800"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 맞춤 상담 CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-3xl p-8 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              어떤 과정이 나에게 맞을까요?
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              목표와 현재 수준에 맞는 최적의 학습 경로를 추천해드립니다
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-2xl"
            >
              🎯 맞춤 학습 경로 상담받기
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
