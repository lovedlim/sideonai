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
      title: "생성형 AI 기초부터 실무까지",
      subtitle: "업무 자동화 & 바이브 코딩",
      courses: [
        {
          title: "생성형AI를 활용한 업무 자동화",
          target: "모든 업종 실무자를 위해",
          result: "AI 도구를 활용한 업무 효율화 및 자동화 시스템 구축",
          skills: ["#프롬프트엔지니어링", "#업무자동화", "#ChatGPT", "#Gemini"],
          description: "생성형 AI 트렌드부터 실무 적용까지, 업무 효율을 극대화하는 AI 활용법을 배웁니다.",
          curriculum: [
            "생성형 AI 트렌드 및 AI agent 최신 이슈",
            "3단계 활용 전략 (효율화·창의성·인사이트)",
            "Perplexity/Gemini/ChatGPT/Claude 도구 마스터",
            "프롬프트 엔지니어링 (상황설명·통합요청·예시제시)",
            "실전 프로젝트: 메일/공문 회신 자동화",
            "실전 프로젝트: 엑셀 데이터 분석 자동화",
            "실전 프로젝트: AI 협업 시스템 구축"
          ],
          color: "from-purple-500 to-purple-600",
          icon: "🤖"
        },
        {
          title: "정부 AI 정책 시대! 바이브코딩으로 만드는 공공데이터 AI 서비스",
          target: "공공 데이터 활용 전문가를 위해",
          result: "공공시설 안전정보 검색 및 AI 분석 리포트 웹 서비스 제작",
          skills: ["#공공데이터API", "#GoogleAIStudio", "#PRD기획", "#지도연동"],
          description: "공공데이터 API를 활용해 시민들이 쉽게 활용할 수 있는 안전정보 서비스를 제작합니다.",
          curriculum: [
            "공공데이터 API 이해 및 연동",
            "Google AI Studio를 활용한 데이터 분석",
            "지도 API 연동으로 위치 기반 서비스 구현",
            "PRD 작성부터 서비스 배포까지 전 과정"
          ],
          color: "from-green-500 to-green-600",
          icon: "🏛️"
        }
      ]
    },
    {
      id: 2,
      step: "STEP 2",
      title: "나만의 AI 비서 & 서비스 만들기",
      subtitle: "바이브 코딩 개발",
      courses: [
        {
          title: "만약 \"영업사원\"이 바이브 코딩을 배운다면",
          target: "영업/고객 관리 전문가를 위해",
          result: "AI 미팅 요약 및 나만의 CRM 어시스턴트 제작",
          skills: ["#업무자동화", "#CRM", "#Firebase", "#프롬프트엔지니어링"],
          description: "고객 미팅 내용을 AI가 자동으로 요약하고, 개인 맞춤형 CRM 시스템을 직접 만들어봅니다.",
          curriculum: [
            "AI 음성인식 및 텍스트 요약 시스템 구축",
            "Firebase를 활용한 고객 데이터베이스 설계",
            "프롬프트 엔지니어링으로 맞춤형 고객 분석 리포트 생성",
            "웹 인터페이스 제작 및 배포"
          ],
          color: "from-blue-500 to-blue-600",
          icon: "💼"
        },
        {
          title: "바이브 코딩으로 만드는 재미있는 재무제표",
          target: "재무/투자/비즈니스 분석가를 위해",
          result: "전자공시(DART) 데이터 실시간 분석 및 시각화 웹 서비스 제작",
          skills: ["#재무데이터", "#DART_API", "#데이터시각화", "#커서AI"],
          description: "복잡한 재무제표를 AI가 쉽게 분석하고 시각화해주는 서비스를 만들어봅니다.",
          curriculum: [
            "DART API를 활용한 기업 재무데이터 수집",
            "AI를 활용한 재무비율 자동 계산 및 분석",
            "Chart.js를 활용한 데이터 시각화",
            "Cursor AI로 코드 생성 및 최적화"
          ],
          color: "from-purple-500 to-purple-600",
          icon: "📊"
        }
      ]
    },
    {
      id: 3,
      step: "STEP 3",
      title: "전문가로 인정받기",
      subtitle: "국가 공인 자격증",
      courses: [
        {
          title: "[저자직강] 퇴근후딴짓의 빅데이터 분석기사 실기",
          target: "데이터 분야 취업/이직 준비생을 위해",
          result: "빅데이터 분석기사 자격증 합격 (다수 90점대 합격 후기)",
          skills: ["#빅데이터분석기사", "#자격증", "#머신러닝", "#판다스", "#통계"],
          description: "시나공 저자가 직접 알려주는 가장 확실한 합격 전략과 실전 노하우를 전수합니다.",
          curriculum: [
            "파이썬 기초부터 판다스 완전 정복",
            "머신러닝 알고리즘 이해 및 실습",
            "실제 기출문제 유형 분석 및 풀이",
            "최신 출제경향 반영 모의고사"
          ],
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
            당신의 목표에 맞는 최적의<br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              AI 학습 경로를 선택하세요
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            단순 활용부터 서비스 개발, 자격증 취득까지 맞춤형 솔루션을 제공합니다.
          </p>
        </div>

        {/* 로드맵 스텝들 */}
        <div className="space-y-16">
          {roadmapSteps.map((step, stepIndex) => (
            <div 
              key={step.id}
              className={`transition-all duration-1000 delay-${stepIndex * 200} ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              {/* 스텝 헤더 */}
              <div className="text-center mb-8">
                <div className="inline-block px-4 py-2 rounded-full text-sm font-bold mb-4 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                  {step.step}
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  {step.subtitle}
                </p>
              </div>

              {/* 코스 표시 */}
              <div className={`${step.courses.length === 1 ? 'max-w-4xl mx-auto' : 'grid md:grid-cols-2 gap-8'}`}>
                {step.courses.map((course, courseIndex) => (
                  <CourseCard 
                    key={courseIndex} 
                    course={course} 
                    stepIndex={stepIndex}
                    courseIndex={courseIndex}
                    expandedCard={expandedCard}
                    setExpandedCard={setExpandedCard}
                  />
                ))}
              </div>

              {/* 스텝 구분선 (마지막 스텝 제외) */}
              {stepIndex < roadmapSteps.length - 1 && (
                <div className="flex justify-center mt-16">
                  <div className="w-px h-16 bg-gradient-to-b from-blue-200 to-transparent dark:from-blue-800"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 맞춤 상담 CTA */}
        <div className="text-center mt-20">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-3xl p-8 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              어떤 과정이 나에게 맞을까요?
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              목표와 현재 수준에 맞는 최적의 학습 경로를 추천해드립니다
            </p>
            <Link
              href="/courses"
              className="inline-flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-2xl"
            >
              📹 강의 수강하기
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

// 코스 카드 컴포넌트
interface Course {
  title: string;
  target: string;
  result: string;
  skills: string[];
  description: string;
  curriculum: string[];
  color: string;
  icon: string;
}

interface CourseCardProps {
  course: Course;
  stepIndex: number;
  courseIndex: number;
  expandedCard: number | null;
  setExpandedCard: (id: number | null) => void;
}

function CourseCard({ course, stepIndex, courseIndex, expandedCard, setExpandedCard }: CourseCardProps) {
  const cardId = stepIndex * 10 + courseIndex;
  const isExpanded = expandedCard === cardId;

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/20 hover:scale-105 transition-all duration-300 relative overflow-hidden group">
      {/* 배경 그라데이션 */}
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${course.color} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity duration-300`}></div>
      
      <div className="relative z-10">
        {/* 코스 헤더 */}
        <div className="flex items-start justify-between mb-6">
          <div className={`text-4xl p-3 rounded-2xl bg-gradient-to-br ${course.color} text-white shadow-lg`}>
            {course.icon}
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              {course.target}
            </div>
          </div>
        </div>

        {/* 코스 정보 */}
        <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">
          {course.title}
        </h4>
        
        <div className="mb-4">
          <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">결과물:</div>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {course.result}
          </p>
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
          {course.description}
        </p>

        {/* 핵심 기술 태그 */}
        <div className="flex flex-wrap gap-2 mb-6">
          {course.skills.map((skill: string, index: number) => (
            <span 
              key={index}
              className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${course.color} text-white`}
            >
              {skill}
            </span>
          ))}
        </div>

        {/* CTA 버튼 */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setExpandedCard(isExpanded ? null : cardId)}
            className={`flex-1 bg-gradient-to-r ${course.color} text-white px-4 py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-300 shadow-lg`}
          >
            {isExpanded ? '접기' : '강의 자세히 보기'}
          </button>
          <Link
            href="#contact"
            className="px-6 py-3 border-2 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:border-blue-500 hover:text-blue-500 transition-all duration-300"
          >
            문의하기
          </Link>
        </div>

        {/* 확장된 커리큘럼 */}
        {isExpanded && (
          <div className="mt-6 p-6 bg-gray-50 dark:bg-gray-700/50 rounded-2xl border border-gray-200 dark:border-gray-600">
            <h5 className="font-bold text-gray-900 dark:text-white mb-4">상세 커리큘럼</h5>
            <div className="space-y-3">
              {course.curriculum.map((item: string, index: number) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
                  <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${course.color} text-white text-xs flex items-center justify-center font-bold flex-shrink-0 mt-0.5`}>
                    {index + 1}
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}