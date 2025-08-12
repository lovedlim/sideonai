"use client";

import { useState, useEffect, useRef } from "react";

export default function EmpathySection() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const questions = [
    {
      text: "AI로 뭔가 해보고 싶은데, 어디서부터 시작할지 막막해요.",
      icon: "🤔",
      color: "from-blue-500 to-blue-600"
    },
    {
      text: "매일 반복되는 보고서, 문서 작업에서 벗어나고 싶어요.",
      icon: "📊",
      color: "from-green-500 to-green-600"
    },
    {
      text: "복잡한 재무제표, 누가 쉽고 빠르게 분석해 줬으면 좋겠어요.",
      icon: "💰",
      color: "from-purple-500 to-purple-600"
    },
    {
      text: "자격증은 따야겠는데, 비전공자라 코딩부터 겁이 나요.",
      icon: "🎓",
      color: "from-orange-500 to-red-500"
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
        setCurrentQuestionIndex((prev) => (prev + 1) % questions.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isVisible, questions.length]);

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <section 
      ref={sectionRef}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900"
    >
      <div className="max-w-6xl mx-auto">
        {/* 섹션 제목 */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            혹시 이런 <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">생각</span>,<br />
            하고 계신가요?
          </h2>
        </div>

        {/* 메인 질문 카드 */}
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className={`max-w-4xl mx-auto bg-gradient-to-br ${currentQuestion.color} rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden mb-12`}>
            {/* 배경 패턴 */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-6 right-6 text-6xl">{currentQuestion.icon}</div>
              <div className="absolute bottom-6 left-6 text-4xl opacity-50">{currentQuestion.icon}</div>
            </div>
            
            <div className="relative z-10 text-center">
              <div className="text-5xl mb-6 animate-bounce-gentle">{currentQuestion.icon}</div>
              <p className="text-2xl md:text-3xl font-semibold leading-relaxed">
                &ldquo;{currentQuestion.text}&rdquo;
              </p>
            </div>

            {/* 진행 표시기 */}
            <div className="flex justify-center mt-8 space-x-2">
              {questions.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentQuestionIndex ? 'bg-white scale-125' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 모든 고민들 그리드 */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {questions.map((question, index) => (
            <div 
              key={index}
              className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg p-6 rounded-2xl border border-white/20 transition-all duration-500 hover:scale-105 cursor-pointer ${
                index === currentQuestionIndex ? 'ring-2 ring-blue-500 shadow-lg' : 'hover:shadow-lg'
              }`}
              onClick={() => setCurrentQuestionIndex(index)}
            >
              <div className="text-4xl mb-4 text-center">{question.icon}</div>
              <p className="text-gray-700 dark:text-gray-300 text-center font-medium leading-relaxed">
                &ldquo;{question.text}&rdquo;
              </p>
            </div>
          ))}
        </div>

        {/* 해결책 제시 */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20 shadow-xl">
            <div className="text-center mb-8">
              <div className="text-5xl mb-6">✨</div>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                괜찮습니다!
              </h3>
            </div>

            <div className="text-center mb-8">
              <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                <span className="font-semibold">괜찮습니다. 기술은 도구일 뿐, 가장 중요한 것은 &lsquo;아이디어&rsquo;와 &lsquo;필요&rsquo;입니다.</span><br />
                저는 복잡한 기술 용어 대신, 누구나 이해할 수 있는 언어로<br />
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-semibold">
                  여러분의 아이디어가 실제 서비스가 되고, 반복 업무가 자동화되는 과정
                </span>을 안내합니다.
              </p>
            </div>

            {/* 핵심 가치 제안 */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl">
                <div className="text-4xl mb-4">🚀</div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  아이디어 → 서비스
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  복잡한 개발 과정 없이<br />
                  자연어로 대화하며 만드는<br />
                  나만의 웹 서비스
                </p>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl">
                <div className="text-4xl mb-4">⚡</div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  반복업무 → 자동화
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  매일 하는 귀찮은 일들을<br />
                  AI에게 완전히 맡기고<br />
                  진짜 중요한 일에 집중
                </p>
              </div>
            </div>

            <div className="text-center mt-12">
              <a
                href="#roadmap"
                className="inline-flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-2xl"
              >
                🎯 내 문제에 맞는 해결책 찾기
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
