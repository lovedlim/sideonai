"use client";

import { useState, useEffect, useRef } from "react";

export default function CommunitySection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const communities = [
    {
      id: 1,
      name: "캐글/AI 학습 모임",
      period: "2020.5 ~ 현재",
      sessions: "200회+",
      description: "국내 최장수 AI 스터디 중 하나",
      features: [
        "최신 논문 리뷰 & 토론",
        "실전 프로젝트 진행",
        "캐글 컴피티션 참여",
        "AI 트렌드 공유"
      ],
      testimonials: [
        {
          name: "김개발",
          role: "데이터 사이언티스트",
          comment: "혼자 공부할 때와는 차원이 다른 성장을 경험했어요!"
        },
        {
          name: "박분석",
          role: "AI 엔지니어",
          comment: "실무에서 바로 쓸 수 있는 노하우를 배울 수 있어서 좋았습니다."
        }
      ],
      color: "from-blue-500 to-blue-600",
      icon: "🤖",
      bgColor: "from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20"
    },
    {
      id: 2,
      name: "빅데이터 분석기사 스터디",
      period: "2021 ~ 현재",
      sessions: "오징어 게임",
      description: "수많은 합격자를 배출한 전설의 스터디",
      features: [
        "체계적인 학습 계획",
        "실전 문제 풀이",
        "동료들과 함께하는 동기부여",
        "합격까지 완주 시스템"
      ],
      testimonials: [
        {
          name: "이합격",
          role: "빅데이터분석기사 합격자",
          comment: "혼자였다면 포기했을 텐데, 함께해서 끝까지 완주할 수 있었어요!"
        },
        {
          name: "최수험",
          role: "데이터 분석가",
          comment: "실무와 이론이 잘 연결되어 있어서 시험 후에도 도움이 많이 됐습니다."
        }
      ],
      color: "from-purple-500 to-purple-600",
      icon: "🏆",
      bgColor: "from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20"
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

  const activeCommunity = communities[activeTab];

  return (
    <section 
      ref={sectionRef}
      id="community"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-gray-50 to-purple-50 dark:from-gray-800 dark:via-gray-900 dark:to-purple-900"
    >
      <div className="max-w-7xl mx-auto">
        {/* 섹션 제목 */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6">
            Community
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            지식은 나눌 때 빛납니다:<br />
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              OOO의 학습 커뮤니티
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            혼자 가면 길을 잃기 쉽지만, 함께 가면 길이 됩니다.<br />
            질문하고 토론하며 함께 성장하세요.
          </p>
        </div>

        {/* 커뮤니티 탭 */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* 좌측: 탭 버튼들 */}
          <div className={`lg:w-1/3 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="space-y-4">
              {communities.map((community, index) => (
                <button
                  key={community.id}
                  onClick={() => setActiveTab(index)}
                  className={`w-full text-left p-6 rounded-2xl transition-all duration-300 ${
                    activeTab === index
                      ? `bg-gradient-to-br ${community.bgColor} border-2 border-purple-200 dark:border-purple-700 shadow-lg scale-105`
                      : 'bg-white/60 dark:bg-gray-800/60 border-2 border-transparent hover:bg-white/80 dark:hover:bg-gray-800/80'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`text-4xl p-3 rounded-xl ${
                      activeTab === index 
                        ? `bg-gradient-to-r ${community.color} text-white shadow-lg` 
                        : 'bg-gray-100 dark:bg-gray-700'
                    }`}>
                      {community.icon}
                    </div>
                    <div>
                      <h3 className={`text-lg font-bold mb-1 ${
                        activeTab === index 
                          ? 'text-gray-900 dark:text-white' 
                          : 'text-gray-700 dark:text-gray-300'
                      }`}>
                        {community.name}
                      </h3>
                      <p className={`text-sm ${
                        activeTab === index 
                          ? 'text-gray-600 dark:text-gray-300' 
                          : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        {community.period}
                      </p>
                      <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mt-2 ${
                        activeTab === index
                          ? `bg-gradient-to-r ${community.color} text-white`
                          : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                      }`}>
                        {community.sessions}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 우측: 상세 내용 */}
          <div className={`lg:w-2/3 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className={`bg-gradient-to-br ${activeCommunity.bgColor} rounded-3xl p-8 shadow-xl border border-white/20`}>
              {/* 커뮤니티 헤더 */}
              <div className="flex items-center space-x-4 mb-8">
                <div className={`text-5xl p-4 rounded-2xl bg-gradient-to-r ${activeCommunity.color} text-white shadow-lg`}>
                  {activeCommunity.icon}
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {activeCommunity.name}
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
                    {activeCommunity.description}
                  </p>
                  <div className="flex space-x-4 text-sm text-gray-500 dark:text-gray-400">
                    <span>📅 {activeCommunity.period}</span>
                    <span>🎯 {activeCommunity.sessions}</span>
                  </div>
                </div>
              </div>

              {/* 주요 활동 */}
              <div className="mb-8">
                <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">주요 활동</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {activeCommunity.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3 p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl">
                      <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${activeCommunity.color}`}></div>
                      <span className="text-gray-700 dark:text-gray-300 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 참여자 후기 */}
              <div className="mb-8">
                <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">참여자 후기</h4>
                <div className="space-y-4">
                  {activeCommunity.testimonials.map((testimonial, index) => (
                    <div key={index} className="bg-white/70 dark:bg-gray-800/70 p-6 rounded-2xl border border-white/30">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full flex items-center justify-center text-white font-bold">
                          {testimonial.name[0]}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="font-bold text-gray-900 dark:text-white">{testimonial.name}</span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">•</span>
                            <span className="text-sm text-gray-600 dark:text-gray-300">{testimonial.role}</span>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300 italic">
                            &ldquo;{testimonial.comment}&rdquo;
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="text-center">
                <a
                  href="#contact"
                  className={`inline-flex items-center bg-gradient-to-r ${activeCommunity.color} text-white px-8 py-4 rounded-full text-lg font-semibold hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-2xl`}
                >
                  💬 {activeCommunity.name} 참여하기
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 커뮤니티 통계 */}
        <div className={`mt-16 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/20">
            <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
              함께 성장한 4년의 기록
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { number: "200+", label: "총 모임 횟수", icon: "📅" },
                { number: "1,500+", label: "커뮤니티 멤버", icon: "👥" },
                { number: "80%", label: "자격증 합격률", icon: "🏆" },
                { number: "4.9/5", label: "만족도", icon: "⭐" }
              ].map((stat, index) => (
                <div key={index} className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl">
                  <div className="text-3xl mb-3">{stat.icon}</div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 font-medium text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
