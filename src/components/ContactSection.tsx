"use client";

import { useState } from "react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    inquiry: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // 여기에 실제 폼 제출 로직을 구현하세요
      await new Promise(resolve => setTimeout(resolve, 1000)); // 시뮬레이션
      setSubmitMessage("문의가 성공적으로 전송되었습니다. 빠른 시일 내에 연락드리겠습니다!");
      setFormData({ name: "", email: "", company: "", inquiry: "" });
    } catch {
      setSubmitMessage("문의 전송 중 오류가 발생했습니다. 직접 이메일로 연락 주시기 바랍니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section 
      id="contact"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900"
    >
      <div className="max-w-7xl mx-auto">
        {/* 섹션 제목 */}
        <div className="text-center mb-16">
          <div className="inline-block bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6">
            Contact & Inquiry
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            성장을 위한 파트너가<br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              필요하신가요?
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            기업 맞춤형 교육, 프로젝트 자문, 방송/기고 등<br />
            협업 제안을 환영합니다.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* 좌측: 연락처 정보 */}
          <div className="space-y-8">
            {/* 과거 출강 이력 */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/20">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <span className="text-3xl mr-3">🏢</span>
                주요 협업 기업
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  "넥슨코리아", "멀티캠퍼스(SSAFY)", "성남시청소년재단",
                  "한국여성정책연구원", "전자신문", "강남서초교육지원청",
                  "삼성SDS", "네이버", "카카오"
                ].map((company, index) => (
                  <div key={index} className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl">
                    <div className="font-medium text-gray-700 dark:text-gray-300 text-sm">
                      {company}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 연락처 정보 */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/20">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <span className="text-3xl mr-3">📞</span>
                연락처
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center text-white">
                    ✉️
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Email</div>
                    <div className="text-gray-600 dark:text-gray-300">contact@sideonai.kr</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white">
                    💼
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">LinkedIn</div>
                    <div className="text-gray-600 dark:text-gray-300">linkedin.com/in/sideonai</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center text-white">
                    🐙
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">GitHub</div>
                    <div className="text-gray-600 dark:text-gray-300">github.com/sideonai</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center text-white">
                    🎓
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">인프런</div>
                    <div className="text-gray-600 dark:text-gray-300">inflearn.com/users/@sideonai</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 응답 시간 안내 */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 border border-green-200/50">
              <div className="flex items-center space-x-3 mb-4">
                <div className="text-2xl">⏰</div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white">응답 시간</h4>
              </div>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>일반 문의: 24시간 이내</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>기업 교육 문의: 즉시 응답</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>프로젝트 자문: 48시간 이내</span>
                </li>
              </ul>
            </div>
          </div>

          {/* 우측: 문의 폼 */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/20">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <span className="text-3xl mr-3">📝</span>
              간편 문의
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  이름 *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-300"
                  placeholder="홍길동"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  이메일 *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-300"
                  placeholder="hong@company.com"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  회사/소속
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-300"
                  placeholder="(주)테크컴퍼니"
                />
              </div>

              <div>
                <label htmlFor="inquiry" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  문의 내용 *
                </label>
                <textarea
                  id="inquiry"
                  name="inquiry"
                  rows={5}
                  required
                  value={formData.inquiry}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-300 resize-none"
                  placeholder="문의하실 내용을 자세히 적어주세요.&#10;• 기업 교육 문의&#10;• 프로젝트 자문&#10;• 방송/기고 협업&#10;• 기타 문의사항"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>전송 중...</span>
                  </div>
                ) : (
                  "🚀 문의 전송하기"
                )}
              </button>

              {submitMessage && (
                <div className={`p-4 rounded-xl ${
                  submitMessage.includes("성공") 
                    ? "bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-700"
                    : "bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-700"
                }`}>
                  {submitMessage}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
