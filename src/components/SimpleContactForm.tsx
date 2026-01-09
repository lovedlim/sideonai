"use client";

import { useState } from "react";
import { trackFormSubmit } from "@/lib/gtag";

interface SubmittedData {
  name: string;
  email: string;
  company: string;
  inquiry: string;
  submittedAt: Date;
}

export default function SimpleContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    inquiry: ""
  });
  const [honeypot, setHoneypot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [submittedData, setSubmittedData] = useState<SubmittedData | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (honeypot) {
        setSubmitMessage("스팸으로 감지되었습니다.");
        setIsSubmitting(false);
        return;
      }

      if (!formData.name.trim() || !formData.email.trim() || !formData.inquiry.trim()) {
        setSubmitMessage("필수 항목을 모두 입력해주세요.");
        setIsSubmitting(false);
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setSubmitMessage("올바른 이메일 형식을 입력해주세요.");
        setIsSubmitting(false);
        return;
      }

      if (formData.inquiry.length > 2000) {
        setSubmitMessage("문의 내용은 2000자 이하로 입력해주세요.");
        setIsSubmitting(false);
        return;
      }

      const googleFormData = new FormData();
      googleFormData.append("이름", formData.name);
      googleFormData.append("이메일", formData.email);
      googleFormData.append("회사소속", formData.company);
      googleFormData.append("문의내용", formData.inquiry);

      const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
      
      if (!scriptUrl) {
        throw new Error("구글 스크립트 URL이 설정되지 않았습니다.");
      }
      
      const response = await fetch(scriptUrl, {
        method: "POST",
        body: googleFormData
      });
      
      const responseText = await response.text();
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        throw new Error("서버 응답을 파싱할 수 없습니다.");
      }
      
      if (data.result === 'success') {
        trackFormSubmit("메인 페이지 문의 폼");
        setSubmitMessage("잠시 후, 작성하신 이메일로 접수 확인 메일이 발송됩니다.\n만약 확인 메일을 받지 못하셨다면 스팸함을 확인하시거나, 홈페이지의 이메일로 다시 문의 부탁드립니다.");
        
        // 전송된 데이터를 저장
        setSubmittedData({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          inquiry: formData.inquiry,
          submittedAt: new Date()
        });
        
        setFormData({ name: "", email: "", company: "", inquiry: "" });
      } else {
        setSubmitMessage(`전송 중 오류가 발생했습니다: ${data.message || '알 수 없는 오류'}`);
      }
    } catch (error) {
      setSubmitMessage("문의 전송 중 오류가 발생했습니다. 직접 이메일로 연락 주시기 바랍니다.");
      console.error("전송 오류:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      {/* 간편 문의 폼 */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 px-2 flex items-center">
          <span className="text-2xl mr-2">📝</span>
          간편 문의
        </h2>
        
        <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
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
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                이름 *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all text-sm"
                placeholder="홍길동"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                이메일 *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all text-sm"
                placeholder="hong@company.com"
              />
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                회사/소속
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all text-sm"
                placeholder="(주)테크컴퍼니"
              />
            </div>

            <div>
              <label htmlFor="inquiry" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                문의 내용 *
              </label>
              <textarea
                id="inquiry"
                name="inquiry"
                rows={4}
                required
                maxLength={2000}
                value={formData.inquiry}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all resize-none text-sm"
                placeholder="문의하실 내용을 자세히 적어주세요."
              />
              <div className="text-right text-xs text-gray-500 mt-1">
                {formData.inquiry.length}/2000
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-3 rounded-xl font-semibold hover:opacity-90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                  <span>전송 중...</span>
                </div>
              ) : (
                "문의 전송하기"
              )}
            </button>

            {submitMessage && (
              <div className={`p-3 rounded-xl text-sm ${
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

      {/* 전송 완료된 문의 내용 카드 */}
      {submittedData && (
        <div className="mt-6 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl border border-blue-200 dark:border-blue-700 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <span className="text-xl mr-2">✅</span>
              전송 완료된 문의
            </h3>
            <button
              onClick={() => setSubmittedData(null)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors text-sm"
            >
              ✕
            </button>
          </div>
          
          <div className="space-y-3 text-sm">
            <div>
              <span className="font-medium text-gray-700 dark:text-gray-300">이름:</span>
              <span className="ml-2 text-gray-900 dark:text-white">{submittedData.name}</span>
            </div>
            
            <div>
              <span className="font-medium text-gray-700 dark:text-gray-300">이메일:</span>
              <span className="ml-2 text-gray-900 dark:text-white">{submittedData.email}</span>
            </div>
            
            {submittedData.company && (
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">회사/소속:</span>
                <span className="ml-2 text-gray-900 dark:text-white">{submittedData.company}</span>
              </div>
            )}
            
            <div>
              <span className="font-medium text-gray-700 dark:text-gray-300">문의 내용:</span>
              <div className="mt-1 p-3 bg-white dark:bg-gray-800 rounded-lg text-gray-900 dark:text-white whitespace-pre-wrap">
                {submittedData.inquiry}
              </div>
            </div>
            
            <div className="pt-2 border-t border-blue-200 dark:border-blue-700">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                전송 시간: {formatDate(submittedData.submittedAt)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
