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

      if (!formData.name.trim() || !formData.email.trim() || !formData.company.trim() || !formData.inquiry.trim()) {
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
      } catch {
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
    <div className="w-full">
      {/* 간편 문의 폼 */}
      <div>
        <div className="card p-6 sm:p-8">
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
              <label htmlFor="name" className="block text-sm font-medium text-ink/85 mb-1.5">
                이름 *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-line rounded-xl bg-bg/60 text-ink placeholder:text-muted/60 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all text-[0.95rem]"
                placeholder="홍길동"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-ink/85 mb-1.5">
                이메일 *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-line rounded-xl bg-bg/60 text-ink placeholder:text-muted/60 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all text-[0.95rem]"
                placeholder="hong@company.com"
              />
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-ink/85 mb-1.5">
                회사/소속 *
              </label>
              <input
                type="text"
                id="company"
                name="company"
                required
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-line rounded-xl bg-bg/60 text-ink placeholder:text-muted/60 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all text-[0.95rem]"
                placeholder="(주)테크컴퍼니"
              />
            </div>

            <div>
              <label htmlFor="inquiry" className="block text-sm font-medium text-ink/85 mb-1.5">
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
                className="w-full px-4 py-3 border border-line rounded-xl bg-bg/60 text-ink placeholder:text-muted/60 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all resize-none text-[0.95rem]"
                placeholder="문의하실 내용을 자세히 적어주세요."
              />
              <div className="text-right font-mono text-xs text-muted mt-1">
                {formData.inquiry.length}/2000
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-accent text-bg py-3.5 rounded-xl font-semibold hover:shadow-[0_0_32px_rgba(77,243,255,0.5)] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
                  ? "bg-accent/10 text-accent border border-accent/40"
                  : "bg-red-500/10 text-red-300 border border-red-400/40"
              }`}>
                <div className="whitespace-pre-line">{submitMessage}</div>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* 전송 완료된 문의 내용 카드 */}
      {submittedData && (
        <div className="card mt-6 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-ink flex items-center gap-3">
              <span className="node-dot" aria-hidden="true" />
              전송 완료된 문의
            </h3>
            <button
              onClick={() => setSubmittedData(null)}
              aria-label="전송 완료 카드 닫기"
              className="text-muted hover:text-ink transition-colors text-sm"
            >
              ✕
            </button>
          </div>
          
          <div className="space-y-3 text-sm">
            <div>
              <span className="font-medium text-muted">이름:</span>
              <span className="ml-2 text-ink">{submittedData.name}</span>
            </div>
            
            <div>
              <span className="font-medium text-muted">이메일:</span>
              <span className="ml-2 text-ink">{submittedData.email}</span>
            </div>
            
            <div>
              <span className="font-medium text-muted">회사/소속:</span>
              <span className="ml-2 text-ink">{submittedData.company}</span>
            </div>
            
            <div>
              <span className="font-medium text-muted">문의 내용:</span>
              <div className="mt-1 p-3 bg-bg/60 border border-line rounded-lg text-ink whitespace-pre-wrap">
                {submittedData.inquiry}
              </div>
            </div>
            
            <div className="pt-2 border-t border-line">
              <span className="text-xs text-muted">
                전송 시간: {formatDate(submittedData.submittedAt)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
