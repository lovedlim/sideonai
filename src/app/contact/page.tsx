"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  });
  
  const [honeypot, setHoneypot] = useState(""); // 봇 감지용

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");



  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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
      if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
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
      if (formData.message.length > 2000) {
        setSubmitMessage("문의 내용은 2000자 이하로 입력해주세요.");
        setIsSubmitting(false);
        return;
      }
      // 구글 시트로 데이터 전송을 위한 FormData 생성
      const googleFormData = new FormData();
      googleFormData.append("이름", formData.name);
      googleFormData.append("이메일", formData.email);
      googleFormData.append("회사/소속", formData.company);
      googleFormData.append("문의 내용", formData.message);

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
        setFormData({
          name: "",
          email: "",
          company: "",
          message: ""
        });
      } else {
        setSubmitMessage(`전송 중 오류가 발생했습니다: ${data.message || '알 수 없는 오류'}`);
        console.error("서버 오류:", data);
      }
    } catch (error) {
      setSubmitMessage("전송 중 오류가 발생했습니다. 직접 연락 주시기 바랍니다.");
      console.error("전송 오류:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Header />
      
      <main className="pt-8 pb-16">
        {/* 헤더 섹션 */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              📝 간편 문의
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              AI 교육, 프로젝트 자문, 방송/기고 협업 등 다양한 문의사항을 보내주세요.
              48시간 이내에 답변드리겠습니다.
            </p>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* 연락처 정보 */}
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                연락처 정보
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">📧</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">이메일</h3>
                    <p className="text-gray-600 dark:text-gray-300">danmujicafe@gmail.com</p>
                  </div>
                </div>



                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">💼</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">LinkedIn</h3>
                    <a
                      href="https://bit.ly/sideonai"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      https://bit.ly/sideonai
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                  교육 실적
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                  <li>• 온라인 강의 수강자 4.8k+ (만족도 4.9/5)</li>
                  <li>• 기업/공공기관 교육 50회 이상</li>
                  <li>• 캐글/AI 학습 모임 230회 이상 운영</li>
                  <li>• 2024 Inflearn Award 답변왕 수상</li>
                </ul>
              </div>
            </div>

            {/* 교육의뢰 폼 */}
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                📝 간편 문의
              </h2>

              {submitMessage && (
                <div className={`mb-6 p-4 rounded-lg ${
                  submitMessage.includes("접수 확인") 
                    ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200"
                    : "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200"
                }`}>
                  <div className="whitespace-pre-line">{submitMessage}</div>
                </div>
              )}

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
                
                {/* 이름 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    이름 *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="홍길동"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50 dark:bg-gray-700/50"
                  />
                </div>

                {/* 이메일 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    이메일 *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="hong@company.com"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50 dark:bg-gray-700/50"
                  />
                </div>

                {/* 회사/소속 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    회사/소속
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="(주)테크컴퍼니"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50 dark:bg-gray-700/50"
                  />
                </div>

                {/* 문의 내용 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    문의 내용 *
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    maxLength={2000}
                    placeholder="문의하실 내용을 자세히 적어주세요. • 기업 교육 문의 • 프로젝트 자문 • 방송/기고 협업 • 기타 문의사항 (최대 2000자)"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50 dark:bg-gray-700/50"
                  />
                  <div className="text-right text-sm text-gray-500 mt-1">
                    {formData.message.length}/2000
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:bg-gray-400 text-white py-4 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>📝</span>
                  <span>{isSubmitting ? "전송 중..." : "문의 전송하기"}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
