"use client";

import { useState, useEffect, useRef } from "react";

export default function IntroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-gray-50 to-blue-50 dark:from-gray-800 dark:via-gray-900 dark:to-blue-900"
    >
      <div className="max-w-7xl mx-auto">
        {/* 섹션 제목 */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            지식을 나누는 개발자, <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              OOO입니다.
            </span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 좌측: 스토리텔링 */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/20">
              <div className="text-center mb-8">
                <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-6xl text-white shadow-lg">
                  👨‍💻
                </div>
                <div className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                  Founder of SideOnAI | Data Scientist & Developer | HRDer | DevRel
                </div>
              </div>

              <div className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                <p className="text-lg">
                  저는 <span className="font-semibold text-blue-600 dark:text-blue-400">&lsquo;함께 성장하는 것&rsquo;</span>의 가치를 믿습니다.
                </p>
                
                <p>
                  2020년부터 4년간 <span className="font-semibold">200회가 넘는 AI 학습 커뮤니티</span>를 꾸준히 이끌고, 
                  인프런에서 <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent font-bold">
                    &lsquo;올해 가장 많은 답변을 남긴 지식공유자&rsquo;
                  </span> 로 선정된 것은 저의 가장 큰 자랑입니다.
                </p>

                <p>
                  DB Inc., Riid, CodeStates 등 다양한 현장에서 쌓은 실무 경험을 저 혼자만 간직하는 것이 아니라, 
                  이제 막 AI의 세계에 발을 들이는 분들과 아낌없이 나누고 싶습니다.
                </p>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-2xl border-l-4 border-blue-500">
                  <p className="font-semibold text-blue-800 dark:text-blue-300">
                    저의 모든 강의와 저서는 이러한 &lsquo;나눔의 철학&rsquo;에서 시작됩니다.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 우측: 경력 및 성과 */}
          <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="space-y-8">
              {/* 주요 이력 */}
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/20">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <span className="text-3xl mr-3">🏢</span>
                  주요 이력
                </h3>
                <div className="space-y-4">
                  {[
                    { company: "DB Inc.", role: "Data Scientist", period: "2023-현재" },
                    { company: "Riid", role: "ML Engineer", period: "2022-2023" },
                    { company: "CodeStates", role: "HRDer & Instructor", period: "2021-2022" },
                    { company: "Modulabs", role: "DevRel", period: "2020-2021" }
                  ].map((exp, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">{exp.company}</div>
                        <div className="text-gray-600 dark:text-gray-300 text-sm">{exp.role}</div>
                      </div>
                      <div className="text-gray-500 dark:text-gray-400 text-sm">{exp.period}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 자격증 & 인증 */}
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/20">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <span className="text-3xl mr-3">🏆</span>
                  자격증 & 인증
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { name: "TensorFlow Developers", icon: "🤖" },
                    { name: "Kaggle Notebook Expert", icon: "📊" },
                    { name: "AWS Cloud Practitioner", icon: "☁️" },
                    { name: "Google Analytics Certified", icon: "📈" }
                  ].map((cert, index) => (
                    <div key={index} className="flex items-center p-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg">
                      <span className="text-2xl mr-3">{cert.icon}</span>
                      <span className="font-medium text-gray-700 dark:text-gray-300">{cert.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 저서 */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-purple-200/50">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <span className="text-3xl mr-3">📚</span>
                  저서
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4 p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl">
                    <div className="w-16 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">
                      BOOK
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                        2026 시나공 빅데이터분석기사 실기(Python)
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">개정판 | 2025년 출간 예정</p>
                      <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 px-2 py-1 rounded-full text-xs font-medium">
                        베스트셀러
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl">
                    <div className="w-16 h-20 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">
                      BOOK
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                        파이썬 딥러닝 텐서플로
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">정보문화사 | 2021년</p>
                      <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 px-2 py-1 rounded-full text-xs font-medium">
                        실무 가이드
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
