"use client";

import { useState } from "react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    inquiry: ""
  });
  const [honeypot, setHoneypot] = useState(""); // 봇 감지용
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // 봇 감지 (honeypot 필드가 채워져 있으면 봇으로 판단)
      if (honeypot) {
        setSubmitMessage("스팸으로 감지되었습니다.");
        setIsSubmitting(false);
        return;
      }

      // 기본 유효성 검사
      if (!formData.name.trim() || !formData.email.trim() || !formData.inquiry.trim()) {
        setSubmitMessage("필수 항목을 모두 입력해주세요.");
        setIsSubmitting(false);
        return;
      }

      // 이메일 형식 검사
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setSubmitMessage("올바른 이메일 형식을 입력해주세요.");
        setIsSubmitting(false);
        return;
      }

      // 메시지 길이 제한 (스팸 방지)
      if (formData.inquiry.length > 2000) {
        setSubmitMessage("문의 내용은 2000자 이하로 입력해주세요.");
        setIsSubmitting(false);
        return;
      }
      // 구글 시트로 데이터 전송을 위한 FormData 생성
      const googleFormData = new FormData();
      googleFormData.append("이름", formData.name);
      googleFormData.append("이메일", formData.email);
      googleFormData.append("회사/소속", formData.company);
      googleFormData.append("문의 내용", formData.inquiry);

      // 구글 Apps Script 웹 앱으로 데이터 전송
      const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
      
      if (!scriptUrl) {
        throw new Error("구글 스크립트 URL이 설정되지 않았습니다. .env.local 파일에 NEXT_PUBLIC_GOOGLE_SCRIPT_URL을 설정해주세요.");
      }
      
      const response = await fetch(scriptUrl, {
        method: "POST",
        body: googleFormData
      });

      console.log("응답 상태:", response.status);
      console.log("응답 헤더:", response.headers);
      
      const responseText = await response.text();
      console.log("응답 내용:", responseText);
      
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error("JSON 파싱 오류:", parseError);
        console.error("원본 응답:", responseText);
        throw new Error("서버 응답을 파싱할 수 없습니다: " + responseText);
      }
      
      if (data.result === 'success') {
        setSubmitMessage("잠시 후, 작성하신 이메일로 접수 확인 메일이 발송됩니다.\n만약 확인 메일을 받지 못하셨다면 스팸함을 확인하시거나, 홈페이지의 이메일로 다시 문의 부탁드립니다.");
        setFormData({ name: "", email: "", company: "", inquiry: "" });
      } else {
        setSubmitMessage(`전송 중 오류가 발생했습니다: ${data.message || '알 수 없는 오류'}`);
        console.error("서버 오류:", data);
      }
    } catch (error) {
      setSubmitMessage("문의 전송 중 오류가 발생했습니다. 직접 이메일로 연락 주시기 바랍니다.");
      console.error("전송 오류:", error);
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
                    <div className="text-gray-600 dark:text-gray-300">danmujicafe@gmail.com</div>
                  </div>
                </div>
                
                <a 
                  href="https://youtube.com/@ai-study" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer"
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center text-white">
                    📺
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">YouTube</div>
                    <div className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">youtube.com/@ai-study</div>
                  </div>
                </a>

                <a 
                  href="https://github.com/lovedlim/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer"
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center text-white">
                    🐙
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">GitHub</div>
                    <div className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">github.com/lovedlim</div>
                  </div>
                </a>

                <a 
                  href="https://www.inflearn.com/users/26238/@roadmap" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer"
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center text-white">
                    🎓
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Inflearn</div>
                    <div className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">강의 로드맵 보기</div>
                  </div>
                </a>
              </div>
            </div>

            {/* 응답 시간 안내 */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 border border-green-200/50">
              <div className="flex items-center space-x-3 mb-4">
                <div className="text-2xl">⏰</div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white">응답 시간</h4>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                문의주신 내용은 <strong>48시간 이내</strong>에 답변드립니다.
              </p>
            </div>
          </div>

          {/* 우측: 문의 폼 */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/20">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <span className="text-3xl mr-3">📝</span>
              간편 문의
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Honeypot 필드 (봇 감지용 - 숨겨진 필드) */}
              <input
                type="text"
                name="website"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
              />
              
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
                  maxLength={2000}
                  value={formData.inquiry}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-300 resize-none"
                  placeholder="문의하실 내용을 자세히 적어주세요.&#10;• 기업 교육 문의&#10;• 프로젝트 자문&#10;• 방송/기고 협업&#10;• 기타 문의사항 (최대 2000자)"
                />
                <div className="text-right text-sm text-gray-500 mt-1">
                  {formData.inquiry.length}/2000
                </div>
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
                  submitMessage.includes("접수 확인") 
                    ? "bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-700"
                    : "bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-700"
                }`}>
                  <div className="whitespace-pre-line">{submitMessage}</div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
