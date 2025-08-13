export default function StructuredData() {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "SideOnAI",
    "description": "AI 시대의 교육 혁신을 선도하는 전문 교육 회사",
    "url": "https://sideonai-qv0vbkovi-danmujicafe-gmailcoms-projects.vercel.app",
    "logo": "https://sideonai-qv0vbkovi-danmujicafe-gmailcoms-projects.vercel.app/images/profile-creator.svg",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "",
      "contactType": "customer service",
      "email": "danmujicafe@gmail.com"
    },
    "sameAs": [
      "https://youtube.com/@ai-study",
      "https://github.com/lovedlim/",
      "https://www.inflearn.com/users/26238/@roadmap"
    ],
    "foundingDate": "2019",
    "founder": {
      "@type": "Person",
      "name": "SideOnAI 대표"
    },
    "areaServed": "KR",
    "serviceType": [
      "AI 교육",
      "바이브 코딩 교육",
      "빅데이터 분석기사 교육",
      "생성형 AI 교육",
      "기업 교육"
    ]
  };

  const courseData = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "생성형 AI와 바이브 코딩 교육",
    "description": "생성형 AI와 바이브 코딩으로 누구나 쉽게 프로그래밍을 배우고 업무 효율성을 극대화하는 교육 과정",
    "provider": {
      "@type": "Organization",
      "name": "SideOnAI"
    },
    "courseMode": "online",
    "educationalCredentialAwarded": "수료증",
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "online",
      "instructor": {
        "@type": "Person",
        "name": "SideOnAI 강사진"
      }
    }
  };

  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "SideOnAI",
    "url": "https://sideonai-qv0vbkovi-danmujicafe-gmailcoms-projects.vercel.app",
    "description": "AI 교육 전문 회사 SideOnAI의 공식 웹사이트",
    "inLanguage": "ko-KR",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://sideonai-qv0vbkovi-danmujicafe-gmailcoms-projects.vercel.app/courses?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
      />
    </>
  );
}
