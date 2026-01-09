import ProfileAvatar from "@/components/ProfileAvatar";
import LinkButton from "@/components/LinkButton";
import SimpleContactForm from "@/components/SimpleContactForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <main className="max-w-md mx-auto px-4 py-8 sm:py-12">
        {/* 프로필 섹션 */}
        <div className="text-center mb-8">
          <ProfileAvatar />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            SideOnAI
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base mb-1">
            도메인에 AI를 더하는, SideOnAI (퇴근후딴짓)
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            AI 교육 | 업무 자동화 | 바이브 코딩 | 데이터 분석
          </p>
        </div>

        {/* 링크 버튼들 */}
        <div className="space-y-3 mb-8">
          <LinkButton
            href="mailto:danmujicafe@gmail.com"
            icon="✉️"
            title="이메일"
            subtitle="danmujicafe@gmail.com"
          />
          
          <LinkButton
            href="https://github.com/lovedlim/"
            icon="🐙"
            title="GitHub"
            subtitle="github.com/lovedlim"
          />
          
          <LinkButton
            href="https://www.youtube.com/@ai-study"
            icon="📺"
            title="YouTube"
            subtitle="youtube.com/@ai-study"
          />
          
          <LinkButton
            href="https://www.inflearn.com/users/26238/@roadmap"
            icon="🎓"
            title="Inflearn"
            subtitle="강의 로드맵 보기"
          />
          
          <LinkButton
            href="https://www.linkedin.com/in/ailab"
            icon="💼"
            title="LinkedIn"
            subtitle="linkedin.com/in/ailab"
          />
        </div>

        {/* 학습 자료 섹션 */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 px-2">
            📚 학습 자료
          </h2>
          <div className="space-y-3">
            <LinkButton
              href="https://www.kaggle.com/datasets/agileteam/bigdatacertificationkr"
              icon="📊"
              title="캐글 데이터분석 튜토리얼"
              subtitle="빅데이터 분석기사 실기 데이터셋"
            />
          </div>
        </div>

        {/* 도서 섹션 */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 px-2">
            📚 도서
          </h2>
          <div className="space-y-3">
            <LinkButton
              disabled={true}
              icon="📖"
              title="바이브 코딩 with cursor"
              subtitle="2026.2 출간 예정"
            />
            
            <LinkButton
              href="https://product.kyobobook.co.kr/detail/S000216355151"
              icon="📕"
              title="2026 시나공 빅데이터분석기사 실기"
              subtitle="길벗"
            />
            
            <LinkButton
              href="https://www.yes24.com/product/goods/102603640"
              icon="📗"
              title="파이썬 딥러닝 텐서플로"
              subtitle="정보문화사"
            />
          </div>
        </div>

        {/* 간편 문의 폼 */}
        <SimpleContactForm />
      </main>
    </div>
  );
}
