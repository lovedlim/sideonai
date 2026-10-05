// 강의·강연 활동 데이터. /activities 페이지와 홈 실적 섹션이 함께 쓴다.

export interface Activity {
  title: string;
  href?: string;
}

export interface OrgGroup {
  org: string;
  image?: string;
  activities: Activity[];
}

export interface YearSection {
  year: number;
  groups: OrgGroup[];
}

export const sections: YearSection[] = [
  {
    year: 2026,
    groups: [
      {
        org: "한국언론진흥재단",
        image: "/images/activities/2026press1.webp",
        activities: [
          { title: "AI 시대의 데이터 수집하기 바이브 코딩 (기자 대상)" },
        ],
      },
      {
        org: "EBS",
        image: "/images/activities/2026ebs2.webp",
        activities: [
          { title: "디지털학교를 위한 바이브코딩 (클로드 코드) + 교육외 현업 적용 프로젝트 진행" },
        ],
      },
      {
        org: "KOBA 미디어 컨퍼런스",
        image: "/images/activities/2026koba1.webp",
        activities: [
          { title: "지상파 엔지니어를 위한 바이브 코딩: Claude Code 기반 방송 업무 자동화" },
        ],
      },
      {
        org: "인프런",
        image: "/images/activities/2026infvibe1.webp",
        activities: [
          { title: "바이브 코딩으로 만드는 AI 서비스" },
        ],
      },
      {
        org: "GS리테일",
        image: "/images/activities/2026gs1.webp",
        activities: [
          { title: "팀장리더십스쿨: AI 전환을 설계하고 실행하는 팀 만들기 1차" },
          { title: "팀장리더십스쿨: AI 전환을 설계하고 실행하는 팀 만들기 2차" },
          { title: "팀장리더십스쿨: AI 전환을 설계하고 실행하는 팀 만들기 3차" },
          { title: "팀장리더십스쿨: AI 전환을 설계하고 실행하는 팀 만들기 4차" },
        ],
      },
      {
        org: "KB국민카드",
        image: "/images/activities/2026kb1.webp",
        activities: [
          { title: "AI 문서 작성법 1차" },
          { title: "AI 문서 작성법 2차" },
          { title: "AI 문서 작성법 3차" },
          { title: "AI 문서 작성법 4차" },
          { title: "업무 자동화 설계 및 구현 1차" },
          { title: "업무 자동화 설계 및 구현 2차" },
        ],
      },
      {
        org: "JB금융그룹",
        image: "/images/activities/2026jb1.webp",
        activities: [
          { title: "바이브코딩 교육 with 커서 / 강의 및 VOD" },
          { title: "사내 경진대회(해커톤) 기술 심사 (40개 팀)" },
        ],
      },
      {
        org: "전자신문",
        image: "/images/activities/2026enews1.webp",
        activities: [
          { title: "'바이브 코딩'으로 웹/앱 제작 워크숍(중급반) with Claude Code + n8n" },
          { title: "'바이브 코딩'으로 웹/앱 제작 워크숍(중급반) with Cursor + n8n", href: "https://conference.etnews.com/conf_info.html?uid=467" },
        ],
      },
      {
        org: "메드엔진 (위메이드 계열 게임사)",
        image: "/images/activities/2026medengine1.webp",
        activities: [
          { title: "클로드 코드 활용법" },
        ],
      },
      {
        org: "방송기술교육원",
        image: "/images/activities/2026broadcast1.webp",
        activities: [
          { title: "AI 활용 및 콘텐츠 제작 교육 - 바이브코딩", href: "http://edu.kobeta.com/education/index-list_cate2.php?idx=228&code=all&bgu=view" },
        ],
      },
      {
        org: "한빛",
        image: "/images/activities/2026han1.webp",
        activities: [
          { title: "바이브 코딩으로 만드는 독서 챌린지 웹앱 만들기" },
        ],
      },
      {
        org: "한국음악협회",
        image: "/images/activities/2026music1.webp",
        activities: [
          { title: "음악예술가를 위한 바이브 코딩" },
        ],
      },
      {
        org: "메타버스 캠퍼스",
        image: "/images/activities/2026meta1.webp",
        activities: [
          { title: "바이브 코딩(노코드)을 활용한 AI 업무 서비스 개발 과정", href: "https://www.metaverse-campus.kr/lecture/viewAll.do?pageIndex=1&menu_idx=50&lecIdx=17&proIdx=262&selYear=&selApplyStatus=" },
        ],
      },
      {
        org: "디지털 오픈랩 x 인프런",
        image: "/images/activities/2026inf1.webp",
        activities: [
          { title: "AI를 활용한 데이터 수집과 데이터 분석", href: "https://inf.run/A96Ct" },
        ],
      },
      {
        org: "서울소방학교 (바이브코딩/문서 과정)",
        image: "/images/activities/2026fireadv1.webp",
        activities: [
          { title: "AI기반 소방활용(심화) 과정 (클로드코드 활용) / 1기" },
          { title: "AI기반 소방활용(기초) 과정 / 1기" },
          { title: "AI기반 소방활용(기초) 과정 / 2기" },
          { title: "AI기반 소방활용(기초) 과정 / 3기" },
        ],
      },
      {
        org: "서울소방학교 (신임자)",
        image: "/images/activities/2026firenew1.webp",
        activities: [
          { title: "생성형AI 활용 과정 - 신임자 122기 / 1차" },
          { title: "생성형AI 활용 과정 - 신임자 122기 / 2차" },
        ],
      },
    ],
  },
  {
    year: 2025,
    groups: [
      {
        org: "2025 블록체인 진흥주간 X 웹3.0컨퍼런스",
        activities: [
          { title: "바이브 코딩과 ChatGPT: 생성형 AI와 개발 생산성", href: "https://blockchainweek.co.kr/2025/programDay.do?tab=2" },
        ],
      },
      {
        org: "EBS",
        activities: [
          { title: "AI 활용 및 콘텐츠 제작 교육 - 바이브코딩", href: "http://edu.kobeta.com/education/index-list_cate1.php?idx=209&code=all&bgu=view" },
        ],
      },
      {
        org: "바이브컴퍼니 (구, 다음소프트)",
        activities: [
          { title: "바이브 코딩 워크샵: AI와 협업하기" },
        ],
      },
      {
        org: "멀티캠퍼스 (임직원)",
        activities: [
          { title: "새로운 개발 경험, 바이브 코딩 실습" },
        ],
      },
      {
        org: "넥슨코리아 (사내 동아리)",
        activities: [
          { title: "Vibe Coding: 가장 쉬운 프로그래밍 언어는 한국어다" },
        ],
      },
      {
        org: "전자신문",
        activities: [
          { title: "코딩 몰라도 OK! 바이브 코딩 워크숍 5차", href: "https://conference.etnews.com/conf_info.html?uid=461" },
          { title: "코딩 몰라도 OK! 바이브 코딩 워크숍 4차", href: "https://conference.etnews.com/conf_info.html?uid=448" },
          { title: "코딩 몰라도 OK! 바이브 코딩 워크숍 3차", href: "https://conference.etnews.com/conf_info.html?uid=417" },
          { title: "코딩 몰라도 OK! 바이브 코딩 워크숍 2차", href: "https://conference.etnews.com/conf_info.html?uid=406" },
          { title: "코딩 몰라도 OK! 바이브 코딩 워크숍 1차", href: "https://conference.etnews.com/conf_info.html?uid=385" },
        ],
      },
      {
        org: "모두의연구소",
        activities: [
          { title: "n8n, AI를 나만의 업무 파트너로", href: "https://event-us.kr/modu/event/100282" },
        ],
      },
      {
        org: "메타코드",
        activities: [
          { title: "Vibe Coding 실무형 1 Day 워크숍", href: "https://www.datanet.co.kr/news/articleView.html?idxno=203465" },
        ],
      },
      {
        org: "KISA 2025 WTMD",
        activities: [
          { title: "프롬프트로 완성하는 나만의 서비스, 바이브 코딩 / 오프라인" },
          { title: "프롬프트로 완성하는 나만의 서비스, 바이브 코딩 / VOD" },
        ],
      },
      {
        org: "서울시평생교육진흥원",
        activities: [
          { title: "생성형AI 업무활용 기초 과정" },
        ],
      },
      {
        org: "한국조세재정연구원",
        activities: [
          { title: "AI를 활용한 행정업무 자동화 과정" },
          { title: "AI 기반 연구 생산성 혁신 과정" },
        ],
      },
      {
        org: "국토안전관리원",
        activities: [
          { title: "AI 시대의 필수 역량: 생성형 AI 실무" },
          { title: "생성형AI를 활용한 업무 자동화" },
          { title: "바이브 코딩: 노코드로 AI 서비스 개발" },
        ],
      },
      {
        org: "한국여성정책연구원",
        activities: [
          { title: "생성형 AI 시대, 전 직원을 위한 데이터 이해와 입문 (연구직, 행정직 대상)" },
          { title: "업무자동화를 위한 파이썬 실전활용 (행정직 대상)" },
        ],
      },
      {
        org: "성남시청소년재단",
        activities: [
          { title: "Code to Great: 주니어 개발자와 AI 협업" },
        ],
      },
      {
        org: "강남서초교육지원청 (교사 대상)",
        activities: [
          { title: "생성형 AI 활용" },
        ],
      },
      {
        org: "중앙여고",
        activities: [
          { title: "교사를 위한 생성형AI 활용" },
          { title: "커서AI와 V0를 활용한 웹사이트 만들기" },
        ],
      },
      {
        org: "서울소방학교",
        activities: [
          { title: "재난현장 AI 기술 활용 (서장급 대상) 1차" },
          { title: "재난현장 AI 기술 활용 (서장급 대상) 2차" },
          { title: "AI와 소방의 미래 (신임자 170명)" },
          { title: "소방행정실무 과정 1차" },
          { title: "소방행정실무 과정 2차" },
          { title: "소방위 역량 향상 과정" },
          { title: "위험물 실무 과정" },
          { title: "행정실무적응과정 1차" },
          { title: "행정실무적응과정 2차" },
          { title: "승진(예정)자 역량강화 과정" },
          { title: "소방안전 교육실무 과정" },
          { title: "승진(예정)자 역량강화 과정 1차" },
          { title: "승진(예정)자 역량강화 과정 2차" },
        ],
      },
    ],
  },
];

export const totalCount = sections.reduce(
  (sum, s) => sum + s.groups.reduce((s2, g) => s2 + g.activities.length, 0),
  0
);

// 홈 실적 섹션용: 중복을 뺀 기관명 (최근 순)
export const orgNames: string[] = Array.from(
  new Set(sections.flatMap((s) => s.groups.map((g) => g.org.replace(/\s*\(.*\)$/, ""))))
);

// 홈 실적 섹션용: 사진이 있는 강연 (최근 순)
export const photos: { org: string; image: string }[] = sections.flatMap((s) =>
  s.groups.filter((g) => g.image).map((g) => ({ org: g.org, image: g.image as string }))
);
