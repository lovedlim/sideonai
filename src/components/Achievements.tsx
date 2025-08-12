export default function Achievements() {
  const achievements = [
    {
      year: "2025",
      title: "최신 교육 활동",
      items: [
        "전자신문 - 바이브 코딩 워크숍 3차 진행",
        "국토안전관리원 - AI 시대의 필수 역량 교육",
        "KISA 2025 블록체인 밋업데이 발표",
        "한국여성정책연구원 - 생성형 AI 교육",
        "멀티캠퍼스(SSAFY) - 바이브 코딩 실습",
        "넥슨코리아 - Vibe Coding 사내 교육"
      ]
    },
    {
      year: "2024",
      title: "주요 성과",
      items: [
        "Inflearn Award '답변왕' 수상",
        "온라인 강의 수강자 4.8k 돌파",
        "캐글/AI 학습 모임 230회 달성",
        "모두의연구소 AI 커리큘럼 연구원 활동"
      ]
    },
    {
      year: "경력",
      title: "주요 경력",
      items: [
        "SideOnAI 대표 (현재)",
        "모두의연구소 AI 에반젤리스트",
        "코드스테이츠 Developer Relations Manager",
        "Riiid Developer Relations Manager",
        "DB Inc. 인재개발원 과장"
      ]
    }
  ];

  const stats = [
    { number: "4.8K+", label: "온라인 강의 수강자", icon: "👥" },
    { number: "4.9/5", label: "강의 만족도", icon: "⭐" },
    { number: "230+", label: "학습 모임 운영", icon: "🎯" },
    { number: "50+", label: "기업/공공기관 교육", icon: "🏢" }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-gray-800/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            주요 성과
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            다양한 분야에서 쌓은 교육 경험과 성과를 소개합니다.
          </p>
        </div>

        {/* 통계 */}
        <div className="grid md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 p-6 rounded-xl"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                {stat.number}
              </div>
              <div className="text-gray-600 dark:text-gray-300 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* 연도별 성과 */}
        <div className="grid lg:grid-cols-3 gap-8">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl p-6"
            >
              <div className="flex items-center mb-4">
                <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold mr-3">
                  {achievement.year}
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {achievement.title}
                </h3>
              </div>
              <ul className="space-y-2">
                {achievement.items.map((item, itemIndex) => (
                  <li
                    key={itemIndex}
                    className="flex items-start text-gray-600 dark:text-gray-300"
                  >
                    <span className="text-blue-600 mr-2 mt-1 text-xs">•</span>
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 인증 및 자격 */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            인증 및 자격
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900 dark:to-red-900 text-orange-800 dark:text-orange-200 px-4 py-2 rounded-full font-medium">
              Kaggle Notebook Expert
            </span>
            <span className="bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-full font-medium">
              TensorFlow Developers Certificate
            </span>
            <span className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 text-green-800 dark:text-green-200 px-4 py-2 rounded-full font-medium">
              빅데이터 분석기사
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
