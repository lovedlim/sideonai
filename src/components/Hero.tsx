import Link from "next/link";

export default function Hero() {
  return (
    <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              AI 시대의
            </span>{" "}
            교육 혁신
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            생성형 AI와 바이브 코딩으로 미래를 준비하세요.<br />
            노코드/로우코드 시대의 새로운 개발 경험을 제공합니다.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Link
            href="/contact"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all hover:scale-105 shadow-lg"
          >
            교육의뢰 신청하기
          </Link>
          <Link
            href="/courses"
            className="border-2 border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all hover:scale-105"
          >
            교육과정 둘러보기
          </Link>
        </div>

        {/* 주요 특징 */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white/70 dark:bg-gray-800/70 p-6 rounded-xl backdrop-blur-sm border border-gray-200 dark:border-gray-700">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🚀</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              실무형 교육
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              실제 프로젝트 기반의 실습 중심 교육으로 즉시 활용 가능한 스킬 습득
            </p>
          </div>

          <div className="bg-white/70 dark:bg-gray-800/70 p-6 rounded-xl backdrop-blur-sm border border-gray-200 dark:border-gray-700">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🤖</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              생성형 AI 활용
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              최신 AI 도구들을 활용한 효율적인 개발 방법론과 업무 자동화 기법
            </p>
          </div>

          <div className="bg-white/70 dark:bg-gray-800/70 p-6 rounded-xl backdrop-blur-sm border border-gray-200 dark:border-gray-700">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💡</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              맞춤형 커리큘럼
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              기업과 개인의 수준과 목표에 맞는 맞춤형 교육 프로그램 제공
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
