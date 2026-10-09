import {
  ABOUT_KO,
  BRAND,
  BRAND_KO,
  COMPANY,
  CONTACT_EMAIL,
  FAQ,
  SERVICES,
  SITE_URL,
  SLOGAN,
} from "@/data/site";

// 모든 페이지에 들어가는 구조화 데이터(JSON-LD). 화면에 보이는 문구와 같은 출처(site.ts)를 쓴다.
// 주소는 사무실 주소만 쓴다. 사업자등록증의 다른 주소나 생년월일은 절대 넣지 않는다.
// 페이지별 데이터(강의 목록, 이동 경로)는 각 페이지가 따로 넣는다(activities/layout.tsx).

export const ORG_ID = `${SITE_URL}/#organization`;
export const PERSON_ID = `${SITE_URL}/#founder`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

// 서비스 이름. 화면의 짧은 제목 대신 검색되는 이름으로 적는다.
const SERVICE_NAMES: Record<(typeof SERVICES)[number]["key"], string> = {
  ax: "AX 컨설팅",
  education: "생성형 AI 실무 교육",
  automation: "AI 업무 자동화",
  vibe: "바이브 코딩 교육",
};

export function JsonLd({ data }: { data: object }) {
  // </script>가 문자열에 섞여도 태그가 닫히지 않게 한다
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export default function StructuredData() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": ORG_ID,
        name: BRAND,
        alternateName: BRAND_KO,
        legalName: BRAND_KO,
        slogan: SLOGAN,
        description: ABOUT_KO.join(" "),
        url: SITE_URL,
        logo: `${SITE_URL}/icon.png`,
        image: `${SITE_URL}/home-preview.png`,
        email: CONTACT_EMAIL,
        foundingDate: "2025-07",
        founder: { "@id": PERSON_ID },
        address: {
          "@type": "PostalAddress",
          streetAddress: "법조로 25, 광교SK뷰레이크타워 A동 2815호",
          addressLocality: "수원시 영통구",
          addressRegion: "경기도",
          addressCountry: "KR",
        },
        areaServed: { "@type": "Country", name: "대한민국" },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          email: CONTACT_EMAIL,
          availableLanguage: ["ko", "en"],
        },
        knowsAbout: [
          "AX 컨설팅",
          "AI 전환",
          "생성형 AI 기업 교육",
          "AI 업무 자동화",
          "AI 에이전트",
          "바이브 코딩",
          "Claude Code",
          "Claude API",
          "Cursor",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "SideOnAI 서비스",
          itemListElement: SERVICES.map((s) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: SERVICE_NAMES[s.key],
              description: s.body,
              keywords: s.tags.join(", "),
              provider: { "@id": ORG_ID },
            },
          })),
        },
        sameAs: ["https://www.youtube.com/@ai-study"],
      },
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: COMPANY.ceo,
        jobTitle: "대표 · AI 교육 강사",
        worksFor: { "@id": ORG_ID },
        knowsAbout: ["생성형 AI", "바이브 코딩", "AI 업무 자동화", "데이터 분석"],
        sameAs: [
          "https://www.linkedin.com/in/ailab",
          "https://www.inflearn.com/users/26238/@roadmap",
          "https://www.youtube.com/@ai-study",
        ],
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        name: BRAND,
        alternateName: BRAND_KO,
        url: SITE_URL,
        inLanguage: "ko-KR",
        publisher: { "@id": ORG_ID },
      },
    ],
  };

  return <JsonLd data={graph} />;
}

// 홈 화면의 자주 묻는 질문(About 섹션)과 같은 문장.
export function FaqStructuredData() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQ.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }}
    />
  );
}
