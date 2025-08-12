"use client";

import { useState, useEffect, useRef } from "react";

export default function RealSkillsShowcase() {
  const [activeSkill, setActiveSkill] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const skills = [
    {
      id: 1,
      category: "바이브 코딩",
      title: "3일 만에 웹사이트 뚝딱!",
      subtitle: "코딩 몰라도 OK! 자연어로 만드는 마법",
      description: "ChatGPT에게 한국어로 말하면 완성되는 웹사이트. 더 이상 개발팀 눈치 보지 마세요.",
      icon: "🪄",
      color: "from-purple-500 to-pink-500",
      beforeAfter: {
        before: "개발팀 대기 2주 →",
        after: "3일 만에 직접 제작 완료!"
      },
      tools: ["Cursor AI", "v0.dev", "Claude", "ChatGPT"],
      demo: "랜딩페이지부터 쇼핑몰까지"
    },
    {
      id: 2,
      category: "업무 자동화",
      title: "루틴 업무 8시간 → 2시간",
      subtitle: "AI가 내 비서가 되는 순간",
      description: "반복적인 보고서 작성, 데이터 정리, 이메일 관리까지. AI가 알아서 척척!",
      icon: "⚡",
      color: "from-blue-500 to-cyan-500",
      beforeAfter: {
        before: "수작업 8시간 →",
        after: "AI 자동화 2시간 완성!"
      },
      tools: ["ChatGPT", "Claude", "Zapier", "Notion AI"],
      demo: "보고서 자동 생성부터 회의록 요약까지"
    },
    {
      id: 3,
      category: "데이터 분석",
      title: "Excel 벗어나 진짜 인사이트",
      subtitle: "데이터가 스토리를 말하기 시작합니다",
      description: "복잡한 데이터도 AI와 함께라면 쉽게! 차트와 그래프까지 자동 생성.",
      icon: "📊",
      color: "from-emerald-500 to-teal-500",
      beforeAfter: {
        before: "Excel 수식 고민 →",
        after: "AI 분석으로 즉시 인사이트!"
      },
      tools: ["Python", "ChatGPT", "Claude", "Jupyter"],
      demo: "고객 분석부터 매출 예측까지"
    },
    {
      id: 4,
      category: "콘텐츠 제작",
      title: "1인 크리에이터의 비밀 무기",
      subtitle: "아이디어만 있으면 뭐든 만들어요",
      description: "블로그 글부터 유튜브 영상, SNS 콘텐츠까지. 퀄리티는 UP, 시간은 DOWN!",
      icon: "🎨",
      color: "from-orange-500 to-red-500",
      beforeAfter: {
        before: "콘텐츠 제작 하루 종일 →",
        after: "1시간 만에 완성품!"
      },
      tools: ["ChatGPT", "DALL-E", "Midjourney", "Claude"],
      demo: "기획부터 발행까지 원스톱"
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
        setActiveSkill((prev) => (prev + 1) % skills.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isVisible, skills.length]);

  const currentSkill = skills[activeSkill];

  return (
    <section 
      ref={sectionRef}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 dark:from-gray-900 dark:via-slate-900 dark:to-zinc-900 relative overflow-hidden"
    >
      {/* 배경 그리드 */}
      <div className="absolute inset-0 opacity-20">
        <div className="h-full w-full bg-[linear-gradient(rgba(0,0,0,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.03)_1px,transparent_1px)] bg-[size:20px_20px] dark:bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* 섹션 헤더 */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6">
            이론은 덜고, 실전은 더 깊게
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-gray-700 dark:text-gray-300">배우는 순간 </span>
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              바로 써먹는
            </span>
            <br />
            <span className="text-gray-700 dark:text-gray-300">실전 노하우</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            단순한 기능 소개가 아닌, 실제 업무에서 바로 활용할 수 있는 <br />
            구체적인 방법과 노하우를 손으로 직접 익혀보세요.
          </p>
        </div>

        {/* 메인 스킬 쇼케이스 */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* 좌측: 스킬 리스트 */}
          <div className="space-y-4">
            {skills.map((skill, index) => (
              <div
                key={skill.id}
                className={`cursor-pointer transition-all duration-500 p-6 rounded-2xl ${
                  index === activeSkill
                    ? `bg-gradient-to-r ${skill.color} text-white shadow-2xl scale-105`
                    : 'bg-white/60 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 hover:bg-white/80 dark:hover:bg-gray-800/80 border border-gray-200/50 dark:border-gray-700/50'
                }`}
                onClick={() => setActiveSkill(index)}
              >
                <div className="flex items-center space-x-4">
                  <div className={`text-4xl p-3 rounded-xl ${
                    index === activeSkill 
                      ? 'bg-white/20 backdrop-blur-sm' 
                      : 'bg-gray-100 dark:bg-gray-700'
                  }`}>
                    {skill.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-sm px-3 py-1 rounded-full font-medium ${
                        index === activeSkill 
                          ? 'bg-white/20 text-white' 
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                      }`}>
                        {skill.category}
                      </span>
                    </div>
                    <h3 className={`text-xl font-bold mb-2 ${
                      index === activeSkill ? 'text-white' : 'text-gray-900 dark:text-white'
                    }`}>
                      {skill.title}
                    </h3>
                    <p className={`text-sm ${
                      index === activeSkill ? 'text-white/90' : 'text-gray-600 dark:text-gray-400'
                    }`}>
                      {skill.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 우측: 상세 정보 */}
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className={`bg-gradient-to-br ${currentSkill.color} rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden`}>
              {/* 배경 패턴 */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 right-4 text-6xl">{currentSkill.icon}</div>
                <div className="absolute bottom-4 left-4 text-4xl opacity-50">{currentSkill.icon}</div>
              </div>
              
              <div className="relative z-10">
                <div className="text-5xl mb-4 text-center">{currentSkill.icon}</div>
                <h3 className="text-3xl font-bold text-center mb-4">
                  {currentSkill.title}
                </h3>
                <p className="text-xl text-center mb-6 text-white/90">
                  {currentSkill.subtitle}
                </p>
                <p className="text-lg leading-relaxed mb-8 text-white/80">
                  {currentSkill.description}
                </p>

                {/* Before & After */}
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-6">
                  <h4 className="font-semibold mb-3 text-center">놀라운 변화</h4>
                  <div className="text-center">
                    <span className="text-white/70">{currentSkill.beforeAfter.before}</span>
                    <br />
                    <span className="text-2xl font-bold">{currentSkill.beforeAfter.after}</span>
                  </div>
                </div>

                {/* 사용 도구 */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">주요 활용 도구</h4>
                  <div className="flex flex-wrap gap-2">
                    {currentSkill.tools.map((tool, index) => (
                      <span
                        key={index}
                        className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 데모 내용 */}
                <div className="text-center">
                  <p className="text-white/80 mb-4">실습 내용: {currentSkill.demo}</p>
                  <a
                    href="/contact"
                    className="inline-flex items-center bg-white text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                  >
                    🎯 실습해보기
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 실제 프로젝트 갤러리 */}
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">
            실제 수강생들이 만든 프로젝트
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            이론이 아닌, 진짜 결과물로 증명합니다
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            {
              title: "스타트업 랜딩페이지",
              description: "3일 만에 완성한 반응형 웹사이트",
              tech: "Cursor AI + v0.dev",
              result: "개발비 90% 절약",
              emoji: "🚀"
            },
            {
              title: "마케팅 자동화 시스템",
              description: "고객 데이터 분석부터 보고서까지",
              tech: "ChatGPT + Zapier",
              result: "업무시간 70% 단축",
              emoji: "📈"
            },
            {
              title: "AI 챗봇 고객센터",
              description: "24시간 고객 응대 자동화",
              tech: "Claude + API 연동",
              result: "고객 만족도 95%",
              emoji: "🤖"
            }
          ].map((project, index) => (
            <div
              key={index}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:scale-105 transition-all duration-300"
            >
              <div className="text-4xl mb-4 text-center">{project.emoji}</div>
              <h4 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                {project.title}
              </h4>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {project.description}
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">사용 기술:</span>
                  <span className="font-medium text-gray-700 dark:text-gray-300">{project.tech}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">성과:</span>
                  <span className="font-bold text-emerald-600">{project.result}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 text-white">
            <h3 className="text-3xl font-bold mb-4">
              당신도 이런 결과를 만들 수 있습니다!
            </h3>
            <p className="text-xl mb-6 text-white/90">
              실전 노하우를 직접 체험하고 바로 내 것으로 만들어보세요
            </p>
            <a
              href="/contact"
              className="inline-flex items-center bg-white text-indigo-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
            >
              🎯 지금 바로 시작하기
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
