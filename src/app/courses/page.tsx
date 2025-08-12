import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function CoursesPage() {
  const courses = [
    {
      id: "ai-fundamentals",
      title: "생성형 AI 활용 교육",
      description: "ChatGPT, Claude, Cursor AI 등 최신 생성형 AI 도구를 활용한 업무 효율화 교육",
      level: "초급-고급",
      duration: "1-3일",
      price: "협의",
      objectives: [
        "생성형 AI의 기본 개념과 활용 방법 이해",
        "프롬프트 엔지니어링 기법 습득",
        "업무 자동화 도구 활용법 학습",
        "AI 도구를 활용한 생산성 향상"
      ],
      curriculum: [
        "생성형 AI 개론 및 트렌드",
        "ChatGPT/Claude 실무 활용법",
        "Cursor AI를 활용한 코딩",
        "프롬프트 엔지니어링 실습",
        "업무 자동화 프로젝트"
      ],
      target: "모든 직군의 실무진, 개발자, 기획자",
      icon: "🤖"
    },
    {
      id: "vibe-coding",
      title: "바이브 코딩 워크숍",
      description: "코딩 몰라도 OK! 자연어로 웹/앱을 만드는 새로운 개발 경험",
      level: "초급",
      duration: "1일",
      price: "협의",
      objectives: [
        "노코드/로우코드 개발 방법론 이해",
        "Cursor AI, V0, Bolt 등 도구 활용법 습득",
        "자연어로 웹사이트/앱 제작 경험",
        "AI 시대의 새로운 개발 패러다임 체험"
      ],
      curriculum: [
        "바이브 코딩 개념과 철학",
        "Cursor AI 실습",
        "V0를 활용한 UI 제작",
        "Bolt로 풀스택 앱 개발",
        "실전 프로젝트 구현"
      ],
      target: "비개발자, 초급 개발자, 기획자, 디자이너",
      icon: "⚡"
    },
    {
      id: "data-analysis",
      title: "데이터 분석 & 머신러닝",
      description: "파이썬을 활용한 데이터 분석과 머신러닝 실무 교육",
      level: "중급-고급",
      duration: "3-5일",
      price: "협의",
      objectives: [
        "Python 데이터 분석 라이브러리 활용",
        "머신러닝 알고리즘 이해와 적용",
        "실제 데이터를 활용한 프로젝트 수행",
        "데이터 시각화 및 인사이트 도출"
      ],
      curriculum: [
        "Python 기초 및 데이터 구조",
        "Pandas를 활용한 데이터 전처리",
        "Matplotlib/Seaborn 시각화",
        "scikit-learn 머신러닝",
        "TensorFlow/Keras 딥러닝",
        "실전 프로젝트"
      ],
      target: "데이터 분석가, 개발자, 연구원",
      icon: "📊"
    },
    {
      id: "bigdata-cert",
      title: "빅데이터 분석기사 대비",
      description: "빅데이터 분석기사 실기 완전 정복 과정",
      level: "중급",
      duration: "2-4주",
      price: "협의",
      objectives: [
        "빅데이터 분석기사 실기 시험 대비",
        "작업형1,2,3 문제 해결 능력 향상",
        "통계 분석 실무 능력 배양",
        "합격을 위한 실전 문제 풀이"
      ],
      curriculum: [
        "시험 개요 및 출제 경향",
        "작업형1: 데이터 전처리",
        "작업형2: 머신러닝 모델링",
        "작업형3: 통계 분석",
        "실전 모의고사",
        "오답 노트 작성법"
      ],
      target: "빅데이터 분석기사 취득 희망자",
      icon: "📈"
    },
    {
      id: "enterprise-custom",
      title: "맞춤형 기업 교육",
      description: "기업의 특성과 요구사항에 맞는 맞춤형 AI/데이터 교육 프로그램",
      level: "맞춤형",
      duration: "협의",
      price: "협의",
      objectives: [
        "기업 특성에 맞는 맞춤형 커리큘럼",
        "실무진의 업무 효율성 향상",
        "AI/데이터 리터러시 제고",
        "조직의 디지털 전환 지원"
      ],
      curriculum: [
        "기업 요구사항 분석",
        "맞춤형 커리큘럼 설계",
        "실무 연계 프로젝트",
        "팀별 멘토링",
        "성과 측정 및 피드백"
      ],
      target: "기업 임직원, 공공기관 직원",
      icon: "🏢"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Header />
      
      <main className="pt-8 pb-16">
        {/* 헤더 섹션 */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              교육과정
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              실무진과 개발자를 위한 체계적이고 실용적인 교육 프로그램을 제공합니다.
              각 과정은 실제 업무에 바로 적용할 수 있도록 설계되었습니다.
            </p>
          </div>
        </section>

        {/* 교육과정 상세 */}
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-12">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-2xl p-8 shadow-lg"
              >
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* 좌측: 기본 정보 */}
                  <div className="lg:col-span-1">
                    <div className="flex items-center mb-4">
                      <span className="text-4xl mr-4">{course.icon}</span>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                          {course.title}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">
                          {course.description}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">난이도:</span>
                        <span className="font-medium text-gray-700 dark:text-gray-300">{course.level}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">기간:</span>
                        <span className="font-medium text-gray-700 dark:text-gray-300">{course.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">비용:</span>
                        <span className="font-medium text-gray-700 dark:text-gray-300">{course.price}</span>
                      </div>
                      <div className="pt-2">
                        <span className="text-gray-500 dark:text-gray-400">대상:</span>
                        <p className="font-medium text-gray-700 dark:text-gray-300 mt-1">{course.target}</p>
                      </div>
                    </div>

                    <a
                      href="/contact"
                      className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-3 px-6 rounded-lg transition-colors font-semibold"
                    >
                      교육의뢰 신청
                    </a>
                  </div>

                  {/* 우측: 교육 목표 및 커리큘럼 */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* 교육 목표 */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        교육 목표
                      </h3>
                      <ul className="space-y-2">
                        {course.objectives.map((objective, index) => (
                          <li
                            key={index}
                            className="flex items-start text-gray-600 dark:text-gray-300"
                          >
                            <span className="text-blue-600 mr-2 mt-1">✓</span>
                            {objective}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* 커리큘럼 */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        주요 커리큘럼
                      </h3>
                      <div className="grid md:grid-cols-2 gap-3">
                        {course.curriculum.map((item, index) => (
                          <div
                            key={index}
                            className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg"
                          >
                            <span className="text-blue-600 dark:text-blue-400 font-medium text-sm">
                              {index + 1}. {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA 섹션 */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">
              맞춤형 교육 프로그램
            </h2>
            <p className="text-xl mb-6 opacity-90">
              기업의 특성과 요구사항에 맞는 맞춤형 교육을 제공합니다.
              언제든지 문의해 주세요!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                교육의뢰 신청
              </a>
              <a
                href="tel:010-2829-0451"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                📱 010-2829-0451
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
