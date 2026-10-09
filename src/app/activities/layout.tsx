import { JsonLd, ORG_ID } from "@/components/StructuredData";
import { courses } from "@/data/courses";
import { SITE_URL } from "@/data/site";

// 강의 아카이브 페이지의 구조화 데이터. 이동 경로와 화면에 나오는 과정 목록을 그대로 옮긴다.
export default function ActivitiesLayout({ children }: { children: React.ReactNode }) {
  const url = `${SITE_URL}/activities`;
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "홈", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "강의 아카이브", item: url },
          ],
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "SideOnAI 강의 아카이브",
          url,
          numberOfItems: courses.length,
          itemListElement: courses.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "Course",
              name: c.title,
              description: c.note ? `${c.org} · ${c.title}. ${c.note}` : `${c.org} · ${c.title}`,
              provider: { "@type": "Organization", "@id": ORG_ID, name: "SideOnAI", url: SITE_URL },
              inLanguage: "ko",
            },
          })),
        }}
      />
      {children}
    </>
  );
}
