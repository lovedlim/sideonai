export default function About() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-gray-800/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            SideOnAI 소개
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            AI 시대의 교육 전문가로서 실무진과 개발자들에게 최신 기술 교육을 제공합니다.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              대표 프로필
            </h3>
            <div className="space-y-4 text-gray-600 dark:text-gray-300">
              <p className="flex items-center">
                <span className="text-blue-600 mr-2">📌</span>
                Data Scientist & Developer | HRDer | DevRel
              </p>
              <p className="flex items-center">
                <span className="text-blue-600 mr-2">📌</span>
                Ex- DB Inc., Riid, CodeStates, Modulabs
              </p>
              <p className="flex items-center">
                <span className="text-blue-600 mr-2">📌</span>
                Kaggle Notebook Expert | TensorFlow Developers Certificate
              </p>
              <p className="flex items-center">
                <span className="text-blue-600 mr-2">🏆</span>
                2024 Inflearn Award "답변왕" 수상 - 올해 가장 많은 답변을 남긴 지식공유자
              </p>
            </div>

            <div className="mt-8">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">연락처</h4>
              <div className="space-y-2 text-gray-600 dark:text-gray-300">
                <p>📧 danmujicafe@gmail.com</p>
                <p>📱 010-2829-0451</p>
                <p>💼 <a href="https://bit.ly/sideonai" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
                <p>💻 <a href="https://github.com/lovedlim/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">GitHub</a></p>
                <p>📺 <a href="https://www.youtube.com/@ai-study" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">YouTube</a></p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              교육 실적
            </h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">온라인 강의</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  ⭐ 인프런 강의 수강자 4.8k (만족도 4.9/5점 만점)
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">출판</h4>
                <ul className="text-gray-600 dark:text-gray-300 space-y-1">
                  <li>• 2026 시나공 빅데이터분석기사 실기(Python) 개정판</li>
                  <li>• 파이썬 딥러닝 텐서플로(2021, 정보문화사)</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">커뮤니티</h4>
                <ul className="text-gray-600 dark:text-gray-300 space-y-1">
                  <li>• 캐글/AI 학습 모임 (200회 이상)</li>
                  <li>• 빅데이터 분석기사 스터디 운영</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
