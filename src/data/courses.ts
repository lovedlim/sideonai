// 자동 생성 파일 — list/2026-10/build_courses.py 로 다시 만든다. 직접 고치지 말 것.

export type Sector = "corp" | "public" | "media" | "edu";
// kind: photo 현장 사진, slide 실제 교안 화면, illustration 사진이 없는 과정에 넣은 생성 이미지
export interface CoursePhoto { src: string; w: number; h: number; kind: "photo" | "slide" | "illustration" }
export interface Course {
  id: string; org: string; title: string; sector: Sector;
  sessions: number; upcoming: number; years: string; last: string;
  note?: string; links: { label: string; href: string }[]; photos: CoursePhoto[];
}

export const SECTORS: Record<Sector, string> = {"corp": "기업", "public": "공공 · 소방", "media": "방송 · 미디어", "edu": "대학 · 교육 · 컨퍼런스"};
export const courses: Course[] = [
 {
  "id": "gsretail",
  "org": "GS리테일",
  "title": "팀장리더십스쿨 – AI 전환을 설계하고 실행하는 팀 만들기 (1~4차)",
  "sector": "corp",
  "sessions": 4,
  "upcoming": 0,
  "years": "2026",
  "last": "2026-05-20",
  "note": undefined,
  "links": [],
  "photos": [
   {
    "src": "/images/courses/gsretail-1.webp",
    "w": 400,
    "h": 400,
    "kind": "photo"
   }
  ]
 },
 {
  "id": "kbcard",
  "org": "KB국민카드",
  "title": "AI 문서 작성법 · 업무 자동화 설계 및 구현",
  "sector": "corp",
  "sessions": 6,
  "upcoming": 0,
  "years": "2026",
  "last": "2026-04-30",
  "note": undefined,
  "links": [],
  "photos": [
   {
    "src": "/images/courses/kbcard-1.webp",
    "w": 400,
    "h": 400,
    "kind": "photo"
   }
  ]
 },
 {
  "id": "nexon",
  "org": "넥슨코리아",
  "title": "Vibe Coding: 가장 쉬운 프로그래밍 언어는 한국어다",
  "sector": "corp",
  "sessions": 1,
  "upcoming": 0,
  "years": "2025",
  "last": "2025-06-18",
  "note": undefined,
  "links": [],
  "photos": [
   {
    "src": "/images/courses/nexon-1.webp",
    "w": 1600,
    "h": 1200,
    "kind": "photo"
   },
   {
    "src": "/images/courses/nexon-2.webp",
    "w": 1600,
    "h": 1200,
    "kind": "photo"
   }
  ]
 },
 {
  "id": "ncsoft",
  "org": "NC소프트",
  "title": "HR 담당자를 위한 클로드 코워크 과정",
  "sector": "corp",
  "sessions": 1,
  "upcoming": 0,
  "years": "2026",
  "last": "2026-09-02",
  "note": undefined,
  "links": [],
  "photos": [
   {
    "src": "/images/courses/ncsoft-1.webp",
    "w": 1600,
    "h": 1200,
    "kind": "photo"
   },
   {
    "src": "/images/courses/ncsoft-2.webp",
    "w": 1600,
    "h": 1600,
    "kind": "photo"
   },
   {
    "src": "/images/courses/ncsoft-3.webp",
    "w": 1600,
    "h": 1600,
    "kind": "photo"
   }
  ]
 },
 {
  "id": "jb",
  "org": "JB금융지주",
  "title": "바이브 코딩 · New Tech + 비즈니스 경진대회",
  "sector": "corp",
  "sessions": 3,
  "upcoming": 0,
  "years": "2026",
  "last": "2026-02-11",
  "note": "사내 경진대회(해커톤) 기술 심사 40개 팀",
  "links": [],
  "photos": [
   {
    "src": "/images/courses/jb-1.webp",
    "w": 1600,
    "h": 1200,
    "kind": "photo"
   },
   {
    "src": "/images/courses/jb-2.webp",
    "w": 1600,
    "h": 1200,
    "kind": "photo"
   },
   {
    "src": "/images/courses/jb-3.webp",
    "w": 1200,
    "h": 1600,
    "kind": "photo"
   },
   {
    "src": "/images/courses/jb-4.webp",
    "w": 1600,
    "h": 1200,
    "kind": "photo"
   },
   {
    "src": "/images/courses/jb-5.webp",
    "w": 400,
    "h": 400,
    "kind": "photo"
   }
  ]
 },
 {
  "id": "multicampus",
  "org": "멀티캠퍼스",
  "title": "새로운 개발 경험, 바이브 코딩 실습",
  "sector": "corp",
  "sessions": 1,
  "upcoming": 0,
  "years": "2025",
  "last": "2025-07-28",
  "note": undefined,
  "links": [],
  "photos": []
 },
 {
  "id": "vaiv",
  "org": "바이브컴퍼니",
  "title": "바이브 코딩 워크샵: AI와 협업하기",
  "sector": "corp",
  "sessions": 2,
  "upcoming": 0,
  "years": "2025",
  "last": "2025-09-30",
  "note": undefined,
  "links": [],
  "photos": []
 },
 {
  "id": "datasolution",
  "org": "데이터솔루션",
  "title": "Claude Code 실전 완성: 업무 자동화부터 대시보드 구축까지",
  "sector": "corp",
  "sessions": 2,
  "upcoming": 0,
  "years": "2026",
  "last": "2026-08-19",
  "note": undefined,
  "links": [],
  "photos": [
   {
    "src": "/images/courses/datasolution-1.webp",
    "w": 1600,
    "h": 1600,
    "kind": "photo"
   }
  ]
 },
 {
  "id": "medengine",
  "org": "메드엔진",
  "title": "클로드 코드 기초 (온라인)",
  "sector": "corp",
  "sessions": 1,
  "upcoming": 0,
  "years": "2026",
  "last": "2026-04-10",
  "note": "위메이드 계열 게임사",
  "links": [],
  "photos": [
   {
    "src": "/images/courses/medengine-1.webp",
    "w": 400,
    "h": 300,
    "kind": "photo"
   }
  ]
 },
 {
  "id": "kcg",
  "org": "해양경찰청",
  "title": "해양경찰을 위한 생성형 AI 활용 과정 · 고위급 과정",
  "sector": "public",
  "sessions": 3,
  "upcoming": 0,
  "years": "2026",
  "last": "2026-08-04",
  "note": undefined,
  "links": [],
  "photos": [
   {
    "src": "/images/courses/kcg-1.webp",
    "w": 1600,
    "h": 1200,
    "kind": "photo"
   },
   {
    "src": "/images/courses/kcg-2.webp",
    "w": 1200,
    "h": 1600,
    "kind": "photo"
   },
   {
    "src": "/images/courses/kcg-3.webp",
    "w": 1200,
    "h": 1600,
    "kind": "photo"
   },
   {
    "src": "/images/courses/kcg-4.webp",
    "w": 1600,
    "h": 1600,
    "kind": "photo"
   },
   {
    "src": "/images/courses/kcg-5.webp",
    "w": 1600,
    "h": 1200,
    "kind": "photo"
   }
  ]
 },
 {
  "id": "fire-advanced",
  "org": "서울소방학교",
  "title": "AI기반 소방 활용(심화) 과정 1~3기",
  "sector": "public",
  "sessions": 4,
  "upcoming": 2,
  "years": "2026",
  "last": "2026-10-20",
  "note": undefined,
  "links": [],
  "photos": [
   {
    "src": "/images/courses/fire-advanced-1.webp",
    "w": 400,
    "h": 534,
    "kind": "photo"
   },
   {
    "src": "/images/courses/fire-advanced-2.webp",
    "w": 1200,
    "h": 1600,
    "kind": "photo"
   },
   {
    "src": "/images/courses/fire-advanced-3.webp",
    "w": 1600,
    "h": 1200,
    "kind": "photo"
   },
   {
    "src": "/images/courses/fire-advanced-4.webp",
    "w": 1200,
    "h": 1600,
    "kind": "photo"
   },
   {
    "src": "/images/courses/fire-advanced-5.webp",
    "w": 1600,
    "h": 1200,
    "kind": "photo"
   }
  ]
 },
 {
  "id": "fire-basic",
  "org": "서울소방학교",
  "title": "AI기반 소방 활용(기초) 과정 1~6기",
  "sector": "public",
  "sessions": 5,
  "upcoming": 1,
  "years": "2026",
  "last": "2026-10-12",
  "note": undefined,
  "links": [],
  "photos": []
 },
 {
  "id": "fire-commander",
  "org": "서울소방학교",
  "title": "현장 지휘관 양성 과정 AI 활용",
  "sector": "public",
  "sessions": 1,
  "upcoming": 0,
  "years": "2026",
  "last": "2026-09-18",
  "note": undefined,
  "links": [],
  "photos": [
   {
    "src": "/images/courses/fire-commander-1.webp",
    "w": 1467,
    "h": 825,
    "kind": "slide"
   },
   {
    "src": "/images/courses/fire-commander-2.webp",
    "w": 1467,
    "h": 825,
    "kind": "slide"
   },
   {
    "src": "/images/courses/fire-commander-3.webp",
    "w": 1467,
    "h": 825,
    "kind": "slide"
   }
  ]
 },
 {
  "id": "fire-chiefs",
  "org": "서울소방학교",
  "title": "재난현장 AI 기술 활용 (서울 소방서장 대상)",
  "sector": "public",
  "sessions": 2,
  "upcoming": 0,
  "years": "2025",
  "last": "2025-09-16",
  "note": undefined,
  "links": [],
  "photos": [
   {
    "src": "/images/courses/fire-chiefs-1.webp",
    "w": 1600,
    "h": 1200,
    "kind": "photo"
   },
   {
    "src": "/images/courses/fire-chiefs-2.webp",
    "w": 1600,
    "h": 1200,
    "kind": "photo"
   },
   {
    "src": "/images/courses/fire-chiefs-3.webp",
    "w": 1600,
    "h": 1200,
    "kind": "photo"
   }
  ]
 },
 {
  "id": "fire-newcomer",
  "org": "서울소방학교",
  "title": "신임 소방관을 위한 생성형 AI 활용 과정 (122기 169명 외)",
  "sector": "public",
  "sessions": 5,
  "upcoming": 0,
  "years": "2025–26",
  "last": "2026-09-03",
  "note": "신임자 122기 169명",
  "links": [],
  "photos": [
   {
    "src": "/images/courses/fire-newcomer-1.webp",
    "w": 400,
    "h": 400,
    "kind": "photo"
   },
   {
    "src": "/images/courses/fire-newcomer-2.webp",
    "w": 1200,
    "h": 1600,
    "kind": "photo"
   },
   {
    "src": "/images/courses/fire-newcomer-3.webp",
    "w": 1200,
    "h": 1600,
    "kind": "photo"
   },
   {
    "src": "/images/courses/fire-newcomer-4.webp",
    "w": 1600,
    "h": 1200,
    "kind": "photo"
   }
  ]
 },
 {
  "id": "fire-promotion",
  "org": "서울소방학교",
  "title": "승진(예정)자 역량강화 과정",
  "sector": "public",
  "sessions": 2,
  "upcoming": 0,
  "years": "2025",
  "last": "2025-12-11",
  "note": undefined,
  "links": [],
  "photos": [
   {
    "src": "/images/courses/fire-promotion-1.webp",
    "w": 1200,
    "h": 1600,
    "kind": "photo"
   }
  ]
 },
 {
  "id": "fire-officer",
  "org": "서울소방학교",
  "title": "소방위 역량 향상 과정",
  "sector": "public",
  "sessions": 2,
  "upcoming": 0,
  "years": "2025",
  "last": "2025-11-13",
  "note": undefined,
  "links": [],
  "photos": [
   {
    "src": "/images/courses/fire-officer-1.webp",
    "w": 1200,
    "h": 1600,
    "kind": "photo"
   },
   {
    "src": "/images/courses/fire-officer-2.webp",
    "w": 1136,
    "h": 1600,
    "kind": "photo"
   }
  ]
 },
 {
  "id": "fire-admin",
  "org": "서울소방학교",
  "title": "소방행정실무 · 행정실무적응 과정",
  "sector": "public",
  "sessions": 5,
  "upcoming": 0,
  "years": "2025–26",
  "last": "2026-04-06",
  "note": undefined,
  "links": [],
  "photos": []
 },
 {
  "id": "fire-hazmat",
  "org": "서울소방학교",
  "title": "위험물실무 과정 (AI 위험물 종류 및 성상)",
  "sector": "public",
  "sessions": 1,
  "upcoming": 0,
  "years": "2025",
  "last": "2025-11-14",
  "note": undefined,
  "links": [],
  "photos": []
 },
 {
  "id": "fire-safety-edu",
  "org": "서울소방학교",
  "title": "소방안전 교육실무 – 교육자료 교안 작성",
  "sector": "public",
  "sessions": 1,
  "upcoming": 0,
  "years": "2025",
  "last": "2025-11-26",
  "note": undefined,
  "links": [],
  "photos": [
   {
    "src": "/images/courses/fire-safety-edu-1.webp",
    "w": 1200,
    "h": 1600,
    "kind": "photo"
   }
  ]
 },
 {
  "id": "fire-tlss",
  "org": "서울소방학교",
  "title": "생성형 AI 활용 교육자료 제작 (현장외상소생술 강사양성과정)",
  "sector": "public",
  "sessions": 1,
  "upcoming": 0,
  "years": "2026",
  "last": "2026-06-22",
  "note": undefined,
  "links": [],
  "photos": [
   {
    "src": "/images/courses/fire-tlss-1.webp",
    "w": 1200,
    "h": 1600,
    "kind": "photo"
   },
   {
    "src": "/images/courses/fire-tlss-2.webp",
    "w": 1200,
    "h": 1600,
    "kind": "photo"
   }
  ]
 },
 {
  "id": "kca",
  "org": "한국소비자원",
  "title": "Claude Code로 시작하는 바이브코딩 · 업무자동화 실전 · 나만의 업무도구 (3회)",
  "sector": "public",
  "sessions": 0,
  "upcoming": 3,
  "years": "2026",
  "last": "2026-10-28",
  "note": undefined,
  "links": [],
  "photos": []
 },
 {
  "id": "kalis",
  "org": "국토안전관리원",
  "title": "생성형 AI 실무 · 업무 자동화 · 바이브 코딩 (3일)",
  "sector": "public",
  "sessions": 3,
  "upcoming": 0,
  "years": "2025",
  "last": "2025-09-05",
  "note": undefined,
  "links": [],
  "photos": [
   {
    "src": "/images/courses/kalis-1.webp",
    "w": 1600,
    "h": 1200,
    "kind": "photo"
   }
  ]
 },
 {
  "id": "kipf",
  "org": "한국조세재정연구원",
  "title": "AI 행정업무 자동화(행정직) / AI 연구 생산성 혁신(연구직)",
  "sector": "public",
  "sessions": 2,
  "upcoming": 0,
  "years": "2025",
  "last": "2025-09-25",
  "note": undefined,
  "links": [],
  "photos": [
   {
    "src": "/images/courses/kipf-1.webp",
    "w": 1600,
    "h": 1200,
    "kind": "photo"
   },
   {
    "src": "/images/courses/kipf-2.webp",
    "w": 1600,
    "h": 1200,
    "kind": "photo"
   },
   {
    "src": "/images/courses/kipf-3.webp",
    "w": 1600,
    "h": 1200,
    "kind": "photo"
   }
  ]
 },
 {
  "id": "kwdi",
  "org": "한국여성정책연구원",
  "title": "전 직원을 위한 데이터 이해와 입문 / 업무자동화를 위한 파이썬",
  "sector": "public",
  "sessions": 2,
  "upcoming": 0,
  "years": "2025",
  "last": "2025-08-07",
  "note": undefined,
  "links": [],
  "photos": [
   {
    "src": "/images/courses/kwdi-1.webp",
    "w": 1600,
    "h": 1200,
    "kind": "photo"
   },
   {
    "src": "/images/courses/kwdi-2.webp",
    "w": 1600,
    "h": 1200,
    "kind": "photo"
   },
   {
    "src": "/images/courses/kwdi-3.webp",
    "w": 1600,
    "h": 1200,
    "kind": "photo"
   },
   {
    "src": "/images/courses/kwdi-4.webp",
    "w": 1600,
    "h": 1200,
    "kind": "photo"
   },
   {
    "src": "/images/courses/kwdi-5.webp",
    "w": 1600,
    "h": 1200,
    "kind": "photo"
   }
  ]
 },
 {
  "id": "gbsa",
  "org": "경기도경제과학진흥원",
  "title": "AI를 활용한 데이터 수집과 데이터분석",
  "sector": "public",
  "sessions": 1,
  "upcoming": 0,
  "years": "2026",
  "last": "2026-03-12",
  "note": "디지털 오픈랩 × 인프런",
  "links": [
   {
    "label": "과정 안내",
    "href": "https://inf.run/A96Ct"
   }
  ],
  "photos": [
   {
    "src": "/images/courses/gbsa-1.webp",
    "w": 400,
    "h": 400,
    "kind": "photo"
   }
  ]
 },
 {
  "id": "seoul-lifelong",
  "org": "서울시평생교육진흥원",
  "title": "생성형 AI 업무활용 기초",
  "sector": "public",
  "sessions": 1,
  "upcoming": 0,
  "years": "2025",
  "last": "2025-09-26",
  "note": undefined,
  "links": [],
  "photos": []
 },
 {
  "id": "seongnam-youth",
  "org": "성남시청소년재단",
  "title": "Code to Great: 주니어 개발자와 AI 협업",
  "sector": "public",
  "sessions": 1,
  "upcoming": 0,
  "years": "2025",
  "last": "2025-08-09",
  "note": undefined,
  "links": [],
  "photos": [
   {
    "src": "/images/courses/seongnam-youth-1.webp",
    "w": 1600,
    "h": 1200,
    "kind": "photo"
   }
  ]
 },
 {
  "id": "gangnam-teachers",
  "org": "강남서초교육지원청",
  "title": "생성형 AI 활용 (교사 대상)",
  "sector": "public",
  "sessions": 1,
  "upcoming": 0,
  "years": "2025",
  "last": "2025-05-29",
  "note": undefined,
  "links": [],
  "photos": [
   {
    "src": "/images/courses/gangnam-teachers-1.webp",
    "w": 1600,
    "h": 1200,
    "kind": "photo"
   }
  ]
 },
 {
  "id": "ebs-digital-school",
  "org": "EBS",
  "title": "디지털학교 교육본부 바이브코딩 연수",
  "sector": "media",
  "sessions": 4,
  "upcoming": 0,
  "years": "2026",
  "last": "2026-07-01",
  "note": "교육 외 현업 적용 프로젝트까지 진행",
  "links": [],
  "photos": [
   {
    "src": "/images/courses/ebs-digital-school-1.webp",
    "w": 400,
    "h": 400,
    "kind": "photo"
   },
   {
    "src": "/images/courses/ebs-digital-school-2.webp",
    "w": 1600,
    "h": 1200,
    "kind": "photo"
   }
  ]
 },
 {
  "id": "ebs-newhire",
  "org": "EBS",
  "title": "바이브코딩으로 완성하는 생성형 AI 서비스 (2026 신규직원 연수)",
  "sector": "media",
  "sessions": 2,
  "upcoming": 0,
  "years": "2026",
  "last": "2026-09-15",
  "note": undefined,
  "links": [],
  "photos": [
   {
    "src": "/images/courses/ebs-newhire-1.webp",
    "w": 1600,
    "h": 1200,
    "kind": "photo"
   },
   {
    "src": "/images/courses/ebs-newhire-2.webp",
    "w": 1600,
    "h": 1200,
    "kind": "photo"
   },
   {
    "src": "/images/courses/ebs-newhire-3.webp",
    "w": 1600,
    "h": 1200,
    "kind": "photo"
   }
  ]
 },
 {
  "id": "ebs-business",
  "org": "EBS",
  "title": "사업센터 바이브 코딩 연수",
  "sector": "media",
  "sessions": 3,
  "upcoming": 0,
  "years": "2026",
  "last": "2026-06-19",
  "note": undefined,
  "links": [],
  "photos": [
   {
    "src": "/images/courses/ebs-business-1.webp",
    "w": 1600,
    "h": 1200,
    "kind": "photo"
   },
   {
    "src": "/images/courses/ebs-business-2.webp",
    "w": 1600,
    "h": 1600,
    "kind": "photo"
   },
   {
    "src": "/images/courses/ebs-business-3.webp",
    "w": 1200,
    "h": 1600,
    "kind": "photo"
   },
   {
    "src": "/images/courses/ebs-business-4.webp",
    "w": 1600,
    "h": 1200,
    "kind": "photo"
   }
  ]
 },
 {
  "id": "ebs-hr",
  "org": "EBS",
  "title": "HR팀을 위한 AI 업무 자동화",
  "sector": "media",
  "sessions": 1,
  "upcoming": 0,
  "years": "2026",
  "last": "2026-10-07",
  "note": undefined,
  "links": [],
  "photos": [
   {
    "src": "/images/courses/ebs-hr-1.webp",
    "w": 1600,
    "h": 1200,
    "kind": "photo"
   },
   {
    "src": "/images/courses/ebs-hr-2.webp",
    "w": 1600,
    "h": 1200,
    "kind": "photo"
   },
   {
    "src": "/images/courses/ebs-hr-3.webp",
    "w": 1200,
    "h": 1600,
    "kind": "photo"
   },
   {
    "src": "/images/courses/ebs-hr-4.webp",
    "w": 1600,
    "h": 1200,
    "kind": "photo"
   }
  ]
 },
 {
  "id": "ebs-youth",
  "org": "EBS",
  "title": "학교 밖 청소년",
  "sector": "media",
  "sessions": 1,
  "upcoming": 0,
  "years": "2026",
  "last": "2026-08-30",
  "note": undefined,
  "links": [],
  "photos": [
   {
    "src": "/images/courses/ebs-youth-1.webp",
    "w": 1600,
    "h": 1200,
    "kind": "photo"
   },
   {
    "src": "/images/courses/ebs-youth-2.webp",
    "w": 1200,
    "h": 1600,
    "kind": "photo"
   }
  ]
 },
 {
  "id": "ebs-2025",
  "org": "EBS",
  "title": "AI 활용 및 콘텐츠 제작 교육 – 바이브코딩",
  "sector": "media",
  "sessions": 2,
  "upcoming": 0,
  "years": "2025",
  "last": "2025-10-22",
  "note": undefined,
  "links": [
   {
    "label": "과정 안내",
    "href": "http://edu.kobeta.com/education/index-list_cate1.php?idx=209&code=all&bgu=view"
   }
  ],
  "photos": [
   {
    "src": "/images/courses/ebs-2025-1.webp",
    "w": 1600,
    "h": 1200,
    "kind": "photo"
   },
   {
    "src": "/images/courses/ebs-2025-2.webp",
    "w": 1600,
    "h": 1200,
    "kind": "photo"
   },
   {
    "src": "/images/courses/ebs-2025-3.webp",
    "w": 1600,
    "h": 738,
    "kind": "photo"
   }
  ]
 },
 {
  "id": "mbccb",
  "org": "MBC충북",
  "title": "Claude Code 바이브 코딩 기반 콘텐츠 제작 실습",
  "sector": "media",
  "sessions": 2,
  "upcoming": 0,
  "years": "2026",
  "last": "2026-09-09",
  "note": undefined,
  "links": [],
  "photos": [
   {
    "src": "/images/courses/mbccb-1.webp",
    "w": 1600,
    "h": 1200,
    "kind": "photo"
   },
   {
    "src": "/images/courses/mbccb-2.webp",
    "w": 1200,
    "h": 1600,
    "kind": "photo"
   },
   {
    "src": "/images/courses/mbccb-3.webp",
    "w": 1600,
    "h": 1200,
    "kind": "photo"
   },
   {
    "src": "/images/courses/mbccb-4.webp",
    "w": 1600,
    "h": 1200,
    "kind": "photo"
   },
   {
    "src": "/images/courses/mbccb-5.webp",
    "w": 1200,
    "h": 1600,
    "kind": "photo"
   }
  ]
 },
 {
  "id": "tbc",
  "org": "TBC",
  "title": "바이브 코딩 기반 방송 콘텐츠 제작 자동화 실무",
  "sector": "media",
  "sessions": 2,
  "upcoming": 0,
  "years": "2026",
  "last": "2026-06-24",
  "note": undefined,
  "links": [],
  "photos": [
   {
    "src": "/images/courses/tbc-1.webp",
    "w": 1600,
    "h": 1200,
    "kind": "photo"
   },
   {
    "src": "/images/courses/tbc-2.webp",
    "w": 1600,
    "h": 1200,
    "kind": "photo"
   },
   {
    "src": "/images/courses/tbc-3.webp",
    "w": 1200,
    "h": 1600,
    "kind": "photo"
   },
   {
    "src": "/images/courses/tbc-4.webp",
    "w": 1200,
    "h": 1600,
    "kind": "photo"
   },
   {
    "src": "/images/courses/tbc-5.webp",
    "w": 1200,
    "h": 1600,
    "kind": "photo"
   }
  ]
 },
 {
  "id": "etnews-claudecode",
  "org": "전자신문",
  "title": "모든 담당자(비개발자)를 위한 Claude Code 바이브 코딩 2-day 부트캠프",
  "sector": "media",
  "sessions": 4,
  "upcoming": 0,
  "years": "2026",
  "last": "2026-09-17",
  "note": undefined,
  "links": [],
  "photos": [
   {
    "src": "/images/courses/etnews-claudecode-1.webp",
    "w": 1600,
    "h": 1200,
    "kind": "photo"
   },
   {
    "src": "/images/courses/etnews-claudecode-2.webp",
    "w": 1600,
    "h": 1200,
    "kind": "photo"
   },
   {
    "src": "/images/courses/etnews-claudecode-3.webp",
    "w": 1600,
    "h": 1200,
    "kind": "photo"
   },
   {
    "src": "/images/courses/etnews-claudecode-4.webp",
    "w": 1600,
    "h": 1600,
    "kind": "photo"
   },
   {
    "src": "/images/courses/etnews-claudecode-5.webp",
    "w": 1600,
    "h": 1200,
    "kind": "photo"
   }
  ]
 },
 {
  "id": "etnews-vibe-1day",
  "org": "전자신문",
  "title": "코딩 몰라도 OK! '바이브 코딩'으로 웹/앱 제작 워크숍 (1~7차)",
  "sector": "media",
  "sessions": 9,
  "upcoming": 0,
  "years": "2025–26",
  "last": "2026-04-03",
  "note": undefined,
  "links": [
   {
    "label": "1차",
    "href": "https://conference.etnews.com/conf_info.html?uid=385"
   },
   {
    "label": "2차",
    "href": "https://conference.etnews.com/conf_info.html?uid=406"
   },
   {
    "label": "3차",
    "href": "https://conference.etnews.com/conf_info.html?uid=417"
   },
   {
    "label": "4차",
    "href": "https://conference.etnews.com/conf_info.html?uid=448"
   },
   {
    "label": "5차",
    "href": "https://conference.etnews.com/conf_info.html?uid=461"
   },
   {
    "label": "중급반",
    "href": "https://conference.etnews.com/conf_info.html?uid=467"
   }
  ],
  "photos": [
   {
    "src": "/images/courses/etnews-vibe-1day-1.webp",
    "w": 400,
    "h": 400,
    "kind": "photo"
   }
  ]
 },
 {
  "id": "kpf",
  "org": "한국언론진흥재단",
  "title": "AI 시대의 데이터 수집하기 바이브 코딩 (기자 대상)",
  "sector": "media",
  "sessions": 1,
  "upcoming": 0,
  "years": "2026",
  "last": "2026-06-04",
  "note": undefined,
  "links": [],
  "photos": [
   {
    "src": "/images/courses/kpf-1.webp",
    "w": 400,
    "h": 400,
    "kind": "photo"
   }
  ]
 },
 {
  "id": "kobeta-beginner",
  "org": "방송기술교육원",
  "title": "바이브코딩으로 완성하는 생성형 AI 서비스(초급)",
  "sector": "media",
  "sessions": 3,
  "upcoming": 0,
  "years": "2026",
  "last": "2026-04-09",
  "note": undefined,
  "links": [
   {
    "label": "과정 안내",
    "href": "http://edu.kobeta.com/education/index-list_cate2.php?idx=228&code=all&bgu=view"
   }
  ],
  "photos": [
   {
    "src": "/images/courses/kobeta-beginner-1.webp",
    "w": 400,
    "h": 300,
    "kind": "photo"
   }
  ]
 },
 {
  "id": "kobeta-python",
  "org": "방송기술교육원",
  "title": "파이썬 기반 방송 데이터 분석 및 AI 자동화 실무(중급)",
  "sector": "media",
  "sessions": 3,
  "upcoming": 0,
  "years": "2026",
  "last": "2026-06-11",
  "note": undefined,
  "links": [],
  "photos": [
   {
    "src": "/images/courses/kobeta-python-1.webp",
    "w": 1600,
    "h": 1200,
    "kind": "photo"
   },
   {
    "src": "/images/courses/kobeta-python-2.webp",
    "w": 1600,
    "h": 1200,
    "kind": "photo"
   },
   {
    "src": "/images/courses/kobeta-python-3.webp",
    "w": 1600,
    "h": 1200,
    "kind": "photo"
   },
   {
    "src": "/images/courses/kobeta-python-4.webp",
    "w": 1200,
    "h": 1600,
    "kind": "photo"
   },
   {
    "src": "/images/courses/kobeta-python-5.webp",
    "w": 1600,
    "h": 1200,
    "kind": "photo"
   }
  ]
 },
 {
  "id": "koba",
  "org": "코바(KOBA)",
  "title": "지상파 엔지니어를 위한 바이브 코딩: Claude Code 기반 방송 업무 자동화",
  "sector": "media",
  "sessions": 1,
  "upcoming": 0,
  "years": "2026",
  "last": "2026-05-14",
  "note": undefined,
  "links": [],
  "photos": [
   {
    "src": "/images/courses/koba-1.webp",
    "w": 400,
    "h": 400,
    "kind": "photo"
   }
  ]
 },
 {
  "id": "kisa-vibe",
  "org": "KISA",
  "title": "프롬프트로 완성하는 나만의 서비스, 바이브 코딩",
  "sector": "edu",
  "sessions": 4,
  "upcoming": 1,
  "years": "2025–26",
  "last": "2026-10-17",
  "note": "오프라인 워크숍과 VOD",
  "links": [
   {
    "label": "메타코드 워크숍 기사",
    "href": "https://www.datanet.co.kr/news/articleView.html?idxno=203465"
   }
  ],
  "photos": [
   {
    "src": "/images/courses/kisa-vibe-1.webp",
    "w": 1600,
    "h": 1200,
    "kind": "photo"
   },
   {
    "src": "/images/courses/kisa-vibe-2.webp",
    "w": 1600,
    "h": 1200,
    "kind": "photo"
   },
   {
    "src": "/images/courses/kisa-vibe-3.webp",
    "w": 1600,
    "h": 1200,
    "kind": "photo"
   },
   {
    "src": "/images/courses/kisa-vibe-4.webp",
    "w": 1600,
    "h": 1200,
    "kind": "photo"
   }
  ]
 },
 {
  "id": "kisa-web3",
  "org": "KISA",
  "title": "2025 블록체인 진흥주간 x 웹 3.0 컨퍼런스",
  "sector": "edu",
  "sessions": 1,
  "upcoming": 0,
  "years": "2025",
  "last": "2025-11-04",
  "note": undefined,
  "links": [
   {
    "label": "프로그램",
    "href": "https://blockchainweek.co.kr/2025/programDay.do?tab=2"
   }
  ],
  "photos": [
   {
    "src": "/images/courses/kisa-web3-1.webp",
    "w": 1600,
    "h": 1200,
    "kind": "photo"
   },
   {
    "src": "/images/courses/kisa-web3-2.webp",
    "w": 1600,
    "h": 1200,
    "kind": "photo"
   },
   {
    "src": "/images/courses/kisa-web3-3.webp",
    "w": 1600,
    "h": 1200,
    "kind": "photo"
   },
   {
    "src": "/images/courses/kisa-web3-4.webp",
    "w": 1600,
    "h": 1600,
    "kind": "photo"
   }
  ]
 },
 {
  "id": "uos",
  "org": "서울시립대학교",
  "title": "바이브 코딩 기반 MVP 제작 교육",
  "sector": "edu",
  "sessions": 2,
  "upcoming": 0,
  "years": "2026",
  "last": "2026-07-23",
  "note": undefined,
  "links": [],
  "photos": [
   {
    "src": "/images/courses/uos-1.webp",
    "w": 1600,
    "h": 1200,
    "kind": "photo"
   },
   {
    "src": "/images/courses/uos-2.webp",
    "w": 1600,
    "h": 1200,
    "kind": "photo"
   },
   {
    "src": "/images/courses/uos-3.webp",
    "w": 1600,
    "h": 1200,
    "kind": "photo"
   },
   {
    "src": "/images/courses/uos-4.webp",
    "w": 1200,
    "h": 1600,
    "kind": "photo"
   },
   {
    "src": "/images/courses/uos-5.webp",
    "w": 1600,
    "h": 1200,
    "kind": "photo"
   }
  ]
 },
 {
  "id": "busan-catholic",
  "org": "부산가톨릭대학교",
  "title": "바이브코딩, 수업 설계 및 업무 자동화 (온라인)",
  "sector": "edu",
  "sessions": 2,
  "upcoming": 0,
  "years": "2026",
  "last": "2026-07-10",
  "note": undefined,
  "links": [],
  "photos": []
 },
 {
  "id": "inflearn-sme",
  "org": "인프런 (중소기업 환급과정)",
  "title": "바이브 코딩으로 만드는 AI 서비스 (온라인)",
  "sector": "edu",
  "sessions": 3,
  "upcoming": 0,
  "years": "2026",
  "last": "2026-07-21",
  "note": undefined,
  "links": [],
  "photos": [
   {
    "src": "/images/courses/inflearn-sme-1.webp",
    "w": 400,
    "h": 400,
    "kind": "photo"
   }
  ]
 },
 {
  "id": "hanbit",
  "org": "한빛미디어",
  "title": "바이브 코딩으로 만드는 독서 챌린지 웹앱 (온라인)",
  "sector": "edu",
  "sessions": 1,
  "upcoming": 0,
  "years": "2026",
  "last": "2026-03-19",
  "note": undefined,
  "links": [],
  "photos": [
   {
    "src": "/images/courses/hanbit-1.webp",
    "w": 400,
    "h": 400,
    "kind": "photo"
   }
  ]
 },
 {
  "id": "kvrda",
  "org": "한국가상융합디지털산업협회",
  "title": "바이브 코딩(노코드)을 활용한 AI 업무 서비스 개발",
  "sector": "edu",
  "sessions": 3,
  "upcoming": 0,
  "years": "2026",
  "last": "2026-04-17",
  "note": "메타버스 캠퍼스",
  "links": [
   {
    "label": "과정 안내",
    "href": "https://www.metaverse-campus.kr/lecture/viewAll.do?pageIndex=1&menu_idx=50&lecIdx=17&proIdx=262&selYear=&selApplyStatus="
   }
  ],
  "photos": [
   {
    "src": "/images/courses/kvrda-1.webp",
    "w": 400,
    "h": 300,
    "kind": "photo"
   }
  ]
 },
 {
  "id": "music-assoc",
  "org": "한국음악협회",
  "title": "음악예술인을 위한 바이브코딩",
  "sector": "edu",
  "sessions": 1,
  "upcoming": 0,
  "years": "2026",
  "last": "2026-04-23",
  "note": undefined,
  "links": [],
  "photos": [
   {
    "src": "/images/courses/music-assoc-1.webp",
    "w": 400,
    "h": 400,
    "kind": "photo"
   }
  ]
 },
 {
  "id": "joongang-girls",
  "org": "중앙여고",
  "title": "교사 대상 AI 연수",
  "sector": "edu",
  "sessions": 1,
  "upcoming": 0,
  "years": "2025",
  "last": "2025-12-29",
  "note": "커서 AI와 v0로 웹사이트 만들기",
  "links": [],
  "photos": [
   {
    "src": "/images/courses/joongang-girls-1.webp",
    "w": 1600,
    "h": 1200,
    "kind": "photo"
   },
   {
    "src": "/images/courses/joongang-girls-2.webp",
    "w": 1600,
    "h": 1200,
    "kind": "photo"
   }
  ]
 },
 {
  "id": "modulabs",
  "org": "모두의연구소",
  "title": "n8n, AI를 나만의 업무 파트너로",
  "sector": "edu",
  "sessions": 1,
  "upcoming": 0,
  "years": "2025",
  "last": "2025",
  "note": undefined,
  "links": [
   {
    "label": "행사 안내",
    "href": "https://event-us.kr/modu/event/100282"
   }
  ],
  "photos": []
 }
];
export const FEATURED: string[] = ["fire-advanced", "ebs-digital-school", "mbccb", "etnews-claudecode", "uos", "kcg", "gsretail", "koba"];
export const totalSessions = 123;
export const orgCount = 35;
export const orgNames: string[] = ["GS리테일", "KB국민카드", "넥슨코리아", "NC소프트", "JB금융지주", "멀티캠퍼스", "바이브컴퍼니", "데이터솔루션", "메드엔진", "해양경찰청", "서울소방학교", "한국소비자원", "국토안전관리원", "한국조세재정연구원", "한국여성정책연구원", "경기도경제과학진흥원", "서울시평생교육진흥원", "성남시청소년재단", "강남서초교육지원청", "EBS", "MBC충북", "TBC", "전자신문", "한국언론진흥재단", "방송기술교육원", "코바(KOBA)", "KISA", "서울시립대학교", "부산가톨릭대학교", "인프런", "한빛미디어", "한국가상융합디지털산업협회", "한국음악협회", "중앙여고", "모두의연구소"];
