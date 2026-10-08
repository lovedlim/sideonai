export default function StructuredData() {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "SideOnAI",
    "description": "기업·기관을 위한 AI 교육, 업무 자동화, 바이브 코딩. 도메인에 AI를 더하는 SideOnAI.",
    "url": "https://sideonai.com",
    "logo": "https://sideonai.com/images/profile-creator.svg",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "",
      "contactType": "customer service",
      "email": "ceo@sideonai.com"
    },
    "sameAs": [
      "https://youtube.com/@ai-study",
      "https://www.linkedin.com/in/ailab",
      "https://www.inflearn.com/users/26238/@roadmap"
    ],
    "foundingDate": "2025-07",
    "founder": {
      "@type": "Person",
      "name": "김태헌"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "법조로 25, 광교SK뷰레이크타워 A동 2815호",
      "addressLocality": "수원시 영통구",
      "addressRegion": "경기도",
      "addressCountry": "KR"
    },
    "areaServed": "KR",
    "serviceType": [
      "AX 컨설팅",
      "AI 교육",
      "업무 자동화",
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
    "url": "https://sideonai.com",
    "description": "도메인에 AI를 더하는 SideOnAI의 공식 웹사이트",
    "inLanguage": "ko-KR"
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
