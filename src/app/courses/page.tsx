import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function CoursesPage() {
  const vodCourses = [
    {
      title: "정부 AI 정책 시대! 바이브코딩으로 만드는 공공데이터 AI 서비스",
      emoji: "👯",
      description: "공공데이터 API를 활용해 시민들이 쉽게 활용할 수 있는 안전정보 서비스를 제작합니다.",
      link: "https://inf.run/r5YLp",
      level: "초급",
      skills: ["#공공데이터API", "#GoogleAIStudio", "#PRD기획", "#지도연동"]
    },
    {
      title: "만약 \"영업사원\"이 바이브 코딩을 배운다면 (Bolt)",
      emoji: "🌱",
      description: "고객 미팅 내용을 AI가 자동으로 요약하고, 개인 맞춤형 CRM 시스템을 직접 만들어봅니다.",
      link: "https://inf.run/vsGXs",
      level: "중급",
      skills: ["#업무자동화", "#CRM", "#Firebase", "#프롬프트엔지니어링"]
    },
    {
      title: "바이브 코딩으로 만드는 재미있는 재무제표 (커서 ai)",
      emoji: "👯",
      description: "복잡한 재무제표를 AI가 쉽게 분석하고 시각화해주는 서비스를 만들어봅니다.",
      link: "https://inf.run/dhPNo",
      level: "중급",
      skills: ["#재무데이터", "#DART_API", "#데이터시각화", "#커서AI"]
    },
    {
      title: "[퇴근후딴짓] 빅데이터 분석기사 실기 (작업형1,2,3)",
      emoji: "🤔",
      description: "시나공 저자가 직접 알려주는 가장 확실한 합격 전략과 실전 노하우를 전수합니다.",
      link: "https://inf.run/HYmN",
      level: "고급",
      skills: ["#빅데이터분석기사", "#자격증", "#머신러닝", "#판다스", "#통계"],
      note: "파이썬, 머신러닝, 통계"
    }
  ];

  const communities = [
    {
      title: "캐글/AI 학습 모임",
      status: "마감됨 (2021~2024.12)",
      description: "머신러닝과 AI 기술을 함께 학습하며 실무 역량을 키워온 커뮤니티입니다.",
      link: "https://github.com/lovedlim/ml-study",
      members: "230+ 회 운영"
    },
    {
      title: "빅데이터 분석기사 스터디 - 오징어 게임",
      status: "운영 중 (2021~현재)",
      description: "빅데이터 분석기사 자격증 취득을 위한 체계적인 스터디 그룹입니다.",
      link: "https://discord.gg/V8acvTnHhH",
      members: "지속적 운영"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50 dark:from-gray-900 dark:via-slate-900 dark:to-blue-900">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              📹 온라인 강의
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
              언제 어디서나 학습할 수 있는 온라인 강의로 AI 시대에 필요한 실무 스킬을 익혀보세요.
            </p>
          </div>
        </section>

        {/* VOD Courses Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
              🎓 온라인 강의 목록
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {vodCourses.map((course, index) => (
                <div 
                  key={index}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/20 hover:scale-105 transition-all duration-300"
                >
                  <div className="flex items-center mb-6">
                    <span className="text-4xl mr-4">{course.emoji}</span>
                    <div>
                      <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium mb-2">
                        {course.level}
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                    {course.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {course.description}
                  </p>

                  {course.note && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 italic">
                      {course.note}
                    </p>
                  )}
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {course.skills.map((skill, skillIndex) => (
                      <span 
                        key={skillIndex}
                        className="px-3 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  <Link
                    href={course.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-semibold hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    🎬 강의 수강하기
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Learning Communities Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-gray-800/50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-4">
              💬 학습 커뮤니티
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
              함께 학습하며 성장하는 커뮤니티에 참여해보세요.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              {communities.map((community, index) => (
                <div 
                  key={index}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/20"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {community.title}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      community.status.includes('마감') 
                        ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300'
                        : 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300'
                    }`}>
                      {community.status}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {community.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {community.members}
                    </span>
                    
                    {community.status.includes('마감') ? (
                      <span className="inline-flex items-center px-4 py-2 rounded-full font-medium bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed">
                        마감된 모임
                      </span>
                    ) : (
                      <Link
                        href={community.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 rounded-full font-medium transition-all duration-300 bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:scale-105 shadow-lg hover:shadow-xl"
                      >
                        참여하기
                        <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-3xl p-8">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                궁금한 점이 있으신가요?
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                강의나 커뮤니티에 대해 더 자세히 알고 싶으시다면 언제든 문의해주세요.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-2xl"
              >
                📞 문의하기
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}