import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Header />
      
      <main className="pt-8 pb-16">
        {/* 헤더 섹션 */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              회사소개
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              SideOnAI는 AI 시대의 교육 혁신을 선도하는 전문 교육 회사입니다.
            </p>
          </div>
        </section>

        {/* 미션 & 비전 */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-2xl p-8">
                <div className="text-4xl mb-4">🎯</div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  우리의 미션
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                  생성형 AI와 바이브 코딩을 통해 누구나 쉽게 프로그래밍을 배우고, 
                  업무 효율성을 극대화할 수 있도록 돕는 것이 우리의 미션입니다.
                </p>
              </div>

              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-2xl p-8">
                <div className="text-4xl mb-4">🚀</div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  우리의 비전
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                  AI 시대의 교육 패러다임을 변화시켜, 모든 사람이 기술의 혜택을 
                  누릴 수 있는 포용적 디지털 사회를 만들어 나가겠습니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 대표 소개 */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-gray-800/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                대표 소개
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 p-8 rounded-2xl">
                <div className="w-32 h-32 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white font-bold text-4xl">SideOnAI</span>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    SideOnAI 대표
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Data Scientist & Developer | HRDer | DevRel
                  </p>
                  <div className="flex justify-center space-x-4">
                    <a
                      href="https://bit.ly/sideonai"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      LinkedIn
                    </a>
                    <a
                      href="https://github.com/lovedlim/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      GitHub
                    </a>
                    <a
                      href="https://www.youtube.com/@ai-study"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      YouTube
                    </a>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    주요 경력
                  </h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    <li className="flex items-center">
                      <span className="text-blue-600 mr-2">•</span>
                      현) SideOnAI 대표 / 개발자
                    </li>
                    <li className="flex items-center">
                      <span className="text-blue-600 mr-2">•</span>
                      전) 모두의연구소 AI 커리큘럼 연구원 / AI 에반젤리스트
                    </li>
                    <li className="flex items-center">
                      <span className="text-blue-600 mr-2">•</span>
                      전) 코드스테이츠 Developer Relations Manager
                    </li>
                    <li className="flex items-center">
                      <span className="text-blue-600 mr-2">•</span>
                      전) Riiid Developer Relations Manager
                    </li>
                    <li className="flex items-center">
                      <span className="text-blue-600 mr-2">•</span>
                      전) DB Inc. 인재개발원 과장
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    자격 및 인증
                  </h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    <li className="flex items-center">
                      <span className="text-blue-600 mr-2">•</span>
                      Kaggle Notebook Expert
                    </li>
                    <li className="flex items-center">
                      <span className="text-blue-600 mr-2">•</span>
                      TensorFlow Developers Certificate
                    </li>
                    <li className="flex items-center">
                      <span className="text-blue-600 mr-2">•</span>
                      2024 Inflearn Award "답변왕" 수상
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 주요 활동 */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                주요 활동
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl p-6">
                <div className="text-3xl mb-4">📚</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  온라인 강의
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                  <li>• 인프런 강의 수강자 4.8k+</li>
                  <li>• 강의 만족도 4.9/5점</li>
                  <li>• 바이브 코딩 시리즈</li>
                  <li>• 빅데이터 분석기사 실기</li>
                </ul>
              </div>

              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl p-6">
                <div className="text-3xl mb-4">📖</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  저서
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                  <li>• 2026 시나공 빅데이터분석기사 실기(Python) 개정판</li>
                  <li>• 파이썬 딥러닝 텐서플로 (2021, 정보문화사)</li>
                </ul>
              </div>

              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl p-6">
                <div className="text-3xl mb-4">👥</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  커뮤니티
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                  <li>• 캐글/AI 학습 모임 200회+</li>
                  <li>• 빅데이터 분석기사 스터디</li>
                  <li>• AI 기술 세미나</li>
                  <li>• 멘토링 프로그램</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 연락처 */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-indigo-600">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-6">
              함께 성장할 파트너를 찾고 있습니다
            </h2>
            <p className="text-xl mb-8 opacity-90">
              AI 시대의 교육 혁신에 함께하고 싶으시다면 언제든지 연락해 주세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                교육의뢰 문의
              </a>
              <a
                href="mailto:danmujicafe@gmail.com"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                이메일 문의
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
