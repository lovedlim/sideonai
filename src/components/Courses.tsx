import Link from "next/link";

export default function Courses() {
  const courses = [
    {
      id: 1,
      title: "생성형 AI 활용 교육",
      description: "ChatGPT, Claude, Cursor AI 등 최신 생성형 AI 도구를 활용한 업무 효율화 교육",
      level: "초급-고급",
      duration: "1-3일",
      topics: ["프롬프트 엔지니어링", "업무 자동화", "AI 도구 활용"],
      icon: "🤖"
    },
    {
      id: 2,
      title: "바이브 코딩 워크숍",
      description: "코딩 몰라도 OK! 자연어로 웹/앱을 만드는 새로운 개발 경험",
      level: "초급",
      duration: "1일",
      topics: ["노코드/로우코드", "Cursor AI", "V0", "Bolt"],
      icon: "⚡"
    },
    {
      id: 3,
      title: "데이터 분석 & 머신러닝",
      description: "파이썬을 활용한 데이터 분석과 머신러닝 실무 교육",
      level: "중급-고급",
      duration: "3-5일",
      topics: ["Python", "Pandas", "scikit-learn", "TensorFlow"],
      icon: "📊"
    },
    {
      id: 4,
      title: "빅데이터 분석기사 대비",
      description: "빅데이터 분석기사 실기 완전 정복 과정",
      level: "중급",
      duration: "2-4주",
      topics: ["작업형1,2,3", "통계 분석", "시험 대비"],
      icon: "📈"
    },
    {
      id: 5,
      title: "맞춤형 기업 교육",
      description: "기업의 특성과 요구사항에 맞는 맞춤형 AI/데이터 교육 프로그램",
      level: "맞춤형",
      duration: "협의",
      topics: ["기업 맞춤", "업무 연계", "실무 프로젝트"],
      icon: "🏢"
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            교육과정
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            실무진과 개발자를 위한 체계적이고 실용적인 교육 프로그램을 제공합니다.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-xl transition-all hover:scale-105"
            >
              <div className="text-4xl mb-4">{course.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {course.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {course.description}
              </p>
              
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">난이도:</span>
                  <span className="font-medium text-gray-700 dark:text-gray-300">{course.level}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">기간:</span>
                  <span className="font-medium text-gray-700 dark:text-gray-300">{course.duration}</span>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">주요 내용:</h4>
                <div className="flex flex-wrap gap-2">
                  {course.topics.map((topic, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full text-xs"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              <Link
                href="/contact"
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-4 rounded-lg transition-colors"
              >
                교육의뢰 신청
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/courses"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold"
          >
            모든 교육과정 보기
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
