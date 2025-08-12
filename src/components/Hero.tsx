"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [typedText, setTypedText] = useState("");
  const fullText = "코딩, 이제 한국말로 하세요.";

  useEffect(() => {
    setIsVisible(true);
    
    // 타이핑 애니메이션
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>
        
        {/* Floating code elements */}
        <div className="absolute top-20 left-10 animate-float-slow opacity-20">
          <div className="text-blue-600 font-mono text-2xl">{"</>"}</div>
        </div>
        <div className="absolute top-40 right-20 animate-float opacity-20">
          <div className="text-indigo-600 font-mono text-xl">AI</div>
        </div>
        <div className="absolute bottom-32 left-20 animate-float-slower opacity-20">
          <div className="text-purple-600 font-mono text-xl">한국어</div>
        </div>
        <div className="absolute bottom-20 right-32 animate-float opacity-20">
          <div className="text-blue-500 font-mono text-2xl">{"{ }"}</div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Main headline with typing effect */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              {typedText}
              <span className="animate-pulse text-blue-600">|</span>
            </h1>
            
            <div className="text-2xl md:text-3xl lg:text-4xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              AI와 대화하며 아이디어를 현실로 만드는<br />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-semibold">
                &lsquo;바이브 코딩&rsquo; 전문가
              </span>, OOO입니다.
            </div>
          </div>

          {/* 핵심 성과 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            {[
              { 
                number: "4.8K+", 
                label: "인프런 수강생", 
                icon: "👥",
                color: "from-blue-500 to-blue-600"
              },
              { 
                number: "4.9/5.0", 
                label: "압도적 강의 만족도", 
                icon: "⭐",
                color: "from-yellow-500 to-orange-500"
              },
              { 
                number: "2024", 
                label: 'Inflearn Award "답변왕"', 
                icon: "🏆",
                color: "from-purple-500 to-purple-600"
              }
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg p-6 rounded-2xl border border-white/20 hover:scale-105 transition-all duration-300 shadow-lg"
              >
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-300 font-medium text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA 버튼 */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href="#roadmap"
              className="group bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-110 hover:shadow-2xl shadow-lg relative overflow-hidden"
            >
              <span className="relative z-10">🎯 나에게 맞는 AI 활용법 찾기</span>
              <div className="absolute inset-0 bg-white/20 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            </Link>
            <Link
              href="#community"
              className="group border-2 border-gray-300 text-gray-700 dark:text-gray-300 dark:border-gray-600 hover:border-blue-500 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 backdrop-blur-sm bg-white/30 dark:bg-black/30"
            >
              💬 학습 커뮤니티 참여하기
              <svg className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
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