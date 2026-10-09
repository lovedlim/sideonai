// 자동 생성 파일 — list/2026-10/build_courses.py 로 다시 만든다. 직접 고치지 말 것.

export type Sector = "corp" | "media" | "public" | "edu";
// kind: photo 현장 사진, slide 실제 교안 화면, illustration 사진이 없는 과정에 넣은 생성 이미지
export interface CoursePhoto { src: string; w: number; h: number; kind: "photo" | "slide" | "illustration" }
export interface Course {
  id: string; org: string; title: string; sector: Sector;
  sessions: number; upcoming: number; years: string; last: string;
  note?: string; links: { label: string; href: string }[]; photos: CoursePhoto[];
}

export const SECTORS: Record<Sector, string> = {"corp": "기업", "media": "방송 · 미디어", "public": "공공 · 소방", "edu": "대학 · 교육 · 컨퍼런스"};
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
    "src": "/images/courses/gsretail-1-8a1b652a.webp",
    "w": 1400,
    "h": 1400,
    "kind": "photo"
   },
   {
    "src": "/images/courses/gsretail-2-84c5b906.webp",
    "w": 1400,
    "h": 1400,
    "kind": "photo"
   },
   {
    "src": "/images/courses/gsretail-3-811a39ba.webp",
    "w": 1050,
    "h": 1400,
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
    "src": "/images/courses/kbcard-1-7ae20d27.webp",
    "w": 1400,
    "h": 1050,
    "kind": "photo"
   },
   {
    "src": "/images/courses/kbcard-2-62798104.webp",
    "w": 1400,
    "h": 1050,
    "kind": "photo"
   },
   {
    "src": "/images/courses/kbcard-3-dce36323.webp",
    "w": 1400,
    "h": 1400,
    "kind": "photo"
   },
   {
    "src": "/images/courses/kbcard-4-723594ef.webp",
    "w": 1050,
    "h": 1400,
    "kind": "photo"
   },
   {
    "src": "/images/courses/kbcard-5-8c0e616b.webp",
    "w": 1400,
    "h": 1400,
    "kind": "photo"
   }
  ]
 },
 {
  "id": "ncsoft",
  "org": "NC",
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
    "src": "/images/courses/ncsoft-1-bc29438f.webp",
    "w": 1400,
    "h": 1050,
    "kind": "photo"
   },
   {
    "src": "/images/courses/ncsoft-2-aa8694ae.webp",
    "w": 1400,
    "h": 1400,
    "kind": "photo"
   },
   {
    "src": "/images/courses/ncsoft-3-f637ce54.webp",
    "w": 1400,
    "h": 1400,
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
    "src": "/images/courses/nexon-1-fcd05fd7.webp",
    "w": 1400,
    "h": 1050,
    "kind": "photo"
   },
   {
    "src": "/images/courses/nexon-2-05c141fb.webp",
    "w": 1400,
    "h": 1050,
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
    "src": "/images/courses/jb-1-a31a701c.webp",
    "w": 1400,
    "h": 1050,
    "kind": "photo"
   },
   {
    "src": "/images/courses/jb-2-e1d86ab7.webp",
    "w": 1400,
    "h": 1050,
    "kind": "photo"
   },
   {
    "src": "/images/courses/jb-3-6dbe4d86.webp",
    "w": 1050,
    "h": 1400,
    "kind": "photo"
   },
   {
    "src": "/images/courses/jb-4-3be46d97.webp",
    "w": 1400,
    "h": 1050,
    "kind": "photo"
   },
   {
    "src": "/images/courses/jb-5-a8ccdcfd.webp",
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
    "src": "/images/courses/datasolution-1-f81a646e.webp",
    "w": 1400,
    "h": 1400,
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
    "src": "/images/courses/medengine-1-e14dca9a.webp",
    "w": 1400,
    "h": 1050,
    "kind": "photo"
   },
   {
    "src": "/images/courses/medengine-2-83fbe358.webp",
    "w": 400,
    "h": 300,
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
    "src": "/images/courses/ebs-digital-school-1-1831ae5d.webp",
    "w": 1400,
    "h": 1050,
    "kind": "photo"
   },
   {
    "src": "/images/courses/ebs-digital-school-2-7dc1649b.webp",
    "w": 1050,
    "h": 1400,
    "kind": "photo"
   },
   {
    "src": "/images/courses/ebs-digital-school-3-f5af521f.webp",
    "w": 1050,
    "h": 1400,
    "kind": "photo"
   },
   {
    "src": "/images/courses/ebs-digital-school-4-b493a1e7.webp",
    "w": 1400,
    "h": 1050,
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
    "src": "/images/courses/ebs-newhire-1-1921c5a3.webp",
    "w": 1400,
    "h": 1050,
    "kind": "photo"
   },
   {
    "src": "/images/courses/ebs-newhire-2-e52d775b.webp",
    "w": 1400,
    "h": 1050,
    "kind": "photo"
   },
   {
    "src": "/images/courses/ebs-newhire-3-a8dda97f.webp",
    "w": 1400,
    "h": 1050,
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
    "src": "/images/courses/ebs-business-1-d3157f24.webp",
    "w": 1400,
    "h": 1050,
    "kind": "photo"
   },
   {
    "src": "/images/courses/ebs-business-2-f321ecd3.webp",
    "w": 1400,
    "h": 1400,
    "kind": "photo"
   },
   {
    "src": "/images/courses/ebs-business-3-084fbd8c.webp",
    "w": 1050,
    "h": 1400,
    "kind": "photo"
   },
   {
    "src": "/images/courses/ebs-business-4-c86f790a.webp",
    "w": 1400,
    "h": 1050,
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
    "src": "/images/courses/ebs-hr-1-a6b13584.webp",
    "w": 1400,
    "h": 1050,
    "kind": "photo"
   },
   {
    "src": "/images/courses/ebs-hr-2-f2b9c7e6.webp",
    "w": 1400,
    "h": 1050,
    "kind": "photo"
   },
   {
    "src": "/images/courses/ebs-hr-3-ae678d6c.webp",
    "w": 1050,
    "h": 1400,
    "kind": "photo"
   },
   {
    "src": "/images/courses/ebs-hr-4-0263c0f2.webp",
    "w": 1400,
    "h": 1050,
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
    "src": "/images/courses/ebs-youth-1-4de46c01.webp",
    "w": 1400,
    "h": 1050,
    "kind": "photo"
   },
   {
    "src": "/images/courses/ebs-youth-2-f40943de.webp",
    "w": 1050,
    "h": 1400,
    "kind": "photo"
   }
  ]
 },
 {
  "id": "ebs-2025",
  "org": "방송기술교육원",
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
    "src": "/images/courses/ebs-2025-1-eab7f6c5.webp",
    "w": 1400,
    "h": 1050,
    "kind": "photo"
   },
   {
    "src": "/images/courses/ebs-2025-2-6d907f22.webp",
    "w": 1400,
    "h": 1050,
    "kind": "photo"
   },
   {
    "src": "/images/courses/ebs-2025-3-ecaab223.webp",
    "w": 1400,
    "h": 646,
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
    "src": "/images/courses/mbccb-1-2e7a8d75.webp",
    "w": 1400,
    "h": 1050,
    "kind": "photo"
   },
   {
    "src": "/images/courses/mbccb-2-4e4721ed.webp",
    "w": 1050,
    "h": 1400,
    "kind": "photo"
   },
   {
    "src": "/images/courses/mbccb-3-23da21e3.webp",
    "w": 1400,
    "h": 1050,
    "kind": "photo"
   },
   {
    "src": "/images/courses/mbccb-4-f5e550c7.webp",
    "w": 1400,
    "h": 1050,
    "kind": "photo"
   },
   {
    "src": "/images/courses/mbccb-5-0628be69.webp",
    "w": 1050,
    "h": 1400,
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
    "src": "/images/courses/tbc-1-cd0c30d0.webp",
    "w": 1400,
    "h": 1050,
    "kind": "photo"
   },
   {
    "src": "/images/courses/tbc-2-d88a0a5e.webp",
    "w": 1400,
    "h": 1050,
    "kind": "photo"
   },
   {
    "src": "/images/courses/tbc-3-6e30dcc3.webp",
    "w": 1050,
    "h": 1400,
    "kind": "photo"
   },
   {
    "src": "/images/courses/tbc-4-38703eda.webp",
    "w": 1050,
    "h": 1400,
    "kind": "photo"
   },
   {
    "src": "/images/courses/tbc-5-b8642180.webp",
    "w": 1050,
    "h": 1400,
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
    "src": "/images/courses/etnews-claudecode-1-24e202af.webp",
    "w": 1400,
    "h": 1050,
    "kind": "photo"
   },
   {
    "src": "/images/courses/etnews-claudecode-2-dfdd6504.webp",
    "w": 1400,
    "h": 1050,
    "kind": "photo"
   },
   {
    "src": "/images/courses/etnews-claudecode-3-87012cac.webp",
    "w": 1400,
    "h": 1050,
    "kind": "photo"
   },
   {
    "src": "/images/courses/etnews-claudecode-4-103d64ca.webp",
    "w": 1400,
    "h": 1400,
    "kind": "photo"
   },
   {
    "src": "/images/courses/etnews-claudecode-5-4cb96b8e.webp",
    "w": 1400,
    "h": 1050,
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
    "src": "/images/courses/etnews-vibe-1day-1-0bf5083c.webp",
    "w": 1400,
    "h": 1050,
    "kind": "photo"
   },
   {
    "src": "/images/courses/etnews-vibe-1day-2-2f5a8d7c.webp",
    "w": 1400,
    "h": 1050,
    "kind": "photo"
   },
   {
    "src": "/images/courses/etnews-vibe-1day-3-1f014a95.webp",
    "w": 1400,
    "h": 1050,
    "kind": "photo"
   },
   {
    "src": "/images/courses/etnews-vibe-1day-4-48d0504e.webp",
    "w": 1400,
    "h": 1050,
    "kind": "photo"
   },
   {
    "src": "/images/courses/etnews-vibe-1day-5-b93bdef3.webp",
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
    "src": "/images/courses/kpf-1-f44c2285.webp",
    "w": 1400,
    "h": 1050,
    "kind": "photo"
   },
   {
    "src": "/images/courses/kpf-2-6df92a84.webp",
    "w": 1400,
    "h": 1050,
    "kind": "photo"
   },
   {
    "src": "/images/courses/kpf-3-c698775d.webp",
    "w": 1050,
    "h": 1400,
    "kind": "photo"
   },
   {
    "src": "/images/courses/kpf-4-f084c585.webp",
    "w": 1050,
    "h": 1400,
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
    "src": "/images/courses/kobeta-beginner-1-d2155b02.webp",
    "w": 1400,
    "h": 1050,
    "kind": "photo"
   },
   {
    "src": "/images/courses/kobeta-beginner-2-2301734e.webp",
    "w": 1400,
    "h": 1050,
    "kind": "photo"
   },
   {
    "src": "/images/courses/kobeta-beginner-3-6e4d6744.webp",
    "w": 1400,
    "h": 1050,
    "kind": "photo"
   },
   {
    "src": "/images/courses/kobeta-beginner-4-16b6c4fa.webp",
    "w": 1400,
    "h": 1050,
    "kind": "photo"
   },
   {
    "src": "/images/courses/kobeta-beginner-5-8fc5c50a.webp",
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
    "src": "/images/courses/kobeta-python-1-5d241061.webp",
    "w": 1400,
    "h": 1050,
    "kind": "photo"
   },
   {
    "src": "/images/courses/kobeta-python-2-705fcc10.webp",
    "w": 1400,
    "h": 1050,
    "kind": "photo"
   },
   {
    "src": "/images/courses/kobeta-python-3-31ed6dcf.webp",
    "w": 1400,
    "h": 1050,
    "kind": "photo"
   },
   {
    "src": "/images/courses/kobeta-python-4-e798e4e1.webp",
    "w": 1050,
    "h": 1400,
    "kind": "photo"
   },
   {
    "src": "/images/courses/kobeta-python-5-750934bc.webp",
    "w": 1400,
    "h": 1050,
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
    "src": "/images/courses/koba-1-5ec29bd3.webp",
    "w": 1400,
    "h": 788,
    "kind": "photo"
   },
   {
    "src": "/images/courses/koba-2-ee14a318.webp",
    "w": 1400,
    "h": 788,
    "kind": "photo"
   },
   {
    "src": "/images/courses/koba-3-f12a7c63.webp",
    "w": 1400,
    "h": 1050,
    "kind": "photo"
   },
   {
    "src": "/images/courses/koba-4-9bb5d2c7.webp",
    "w": 788,
    "h": 1400,
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
    "src": "/images/courses/kcg-1-df73b9ac.webp",
    "w": 1400,
    "h": 1050,
    "kind": "photo"
   },
   {
    "src": "/images/courses/kcg-2-09c83b92.webp",
    "w": 1050,
    "h": 1400,
    "kind": "photo"
   },
   {
    "src": "/images/courses/kcg-3-a98221b0.webp",
    "w": 1050,
    "h": 1400,
    "kind": "photo"
   },
   {
    "src": "/images/courses/kcg-4-0c98a097.webp",
    "w": 1400,
    "h": 1400,
    "kind": "photo"
   },
   {
    "src": "/images/courses/kcg-5-672d95a9.webp",
    "w": 1400,
    "h": 1050,
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
    "src": "/images/courses/fire-advanced-1-854d6b76.webp",
    "w": 1400,
    "h": 1050,
    "kind": "photo"
   },
   {
    "src": "/images/courses/fire-advanced-2-8ac84e15.webp",
    "w": 1400,
    "h": 1050,
    "kind": "photo"
   },
   {
    "src": "/images/courses/fire-advanced-3-fee59280.webp",
    "w": 1400,
    "h": 1050,
    "kind": "photo"
   },
   {
    "src": "/images/courses/fire-advanced-4-6cae17b9.webp",
    "w": 1050,
    "h": 1400,
    "kind": "photo"
   },
   {
    "src": "/images/courses/fire-advanced-5-fa91ad2e.webp",
    "w": 400,
    "h": 534,
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
  "photos": [
   {
    "src": "/images/courses/fire-basic-1-16986c96.webp",
    "w": 1400,
    "h": 1050,
    "kind": "photo"
   },
   {
    "src": "/images/courses/fire-basic-2-a1036a82.webp",
    "w": 1400,
    "h": 1400,
    "kind": "photo"
   },
   {
    "src": "/images/courses/fire-basic-3-975d0c0c.webp",
    "w": 1400,
    "h": 1050,
    "kind": "photo"
   },
   {
    "src": "/images/courses/fire-basic-4-92e59cb9.webp",
    "w": 1050,
    "h": 1400,
    "kind": "photo"
   },
   {
    "src": "/images/courses/fire-basic-5-d9e8bc83.webp",
    "w": 1400,
    "h": 1050,
    "kind": "photo"
   }
  ]
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
    "src": "/images/courses/fire-commander-1-0203badc.webp",
    "w": 1400,
    "h": 787,
    "kind": "slide"
   },
   {
    "src": "/images/courses/fire-commander-2-6135bbc1.webp",
    "w": 1400,
    "h": 787,
    "kind": "slide"
   },
   {
    "src": "/images/courses/fire-commander-3-571d50d0.webp",
    "w": 1400,
    "h": 787,
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
    "src": "/images/courses/fire-chiefs-1-36d3f67c.webp",
    "w": 1400,
    "h": 1050,
    "kind": "photo"
   },
   {
    "src": "/images/courses/fire-chiefs-2-4a12edc1.webp",
    "w": 1400,
    "h": 1050,
    "kind": "photo"
   },
   {
    "src": "/images/courses/fire-chiefs-3-ec35345c.webp",
    "w": 1400,
    "h": 1050,
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
    "src": "/images/courses/fire-newcomer-1-e13367c8.webp",
    "w": 1400,
    "h": 1050,
    "kind": "photo"
   },
   {
    "src": "/images/courses/fire-newcomer-2-4dfe20ca.webp",
    "w": 1400,
    "h": 1050,
    "kind": "photo"
   },
   {
    "src": "/images/courses/fire-newcomer-3-b61484ea.webp",
    "w": 1400,
    "h": 1050,
    "kind": "photo"
   },
   {
    "src": "/images/courses/fire-newcomer-4-e7c2dbfb.webp",
    "w": 1400,
    "h": 1050,
    "kind": "photo"
   },
   {
    "src": "/images/courses/fire-newcomer-5-f8ffb5f6.webp",
    "w": 400,
    "h": 400,
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
    "src": "/images/courses/fire-promotion-1-31a4ecc4.webp",
    "w": 1050,
    "h": 1400,
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
    "src": "/images/courses/fire-officer-1-d5f37f85.webp",
    "w": 1050,
    "h": 1400,
    "kind": "photo"
   },
   {
    "src": "/images/courses/fire-officer-2-34e61d6b.webp",
    "w": 994,
    "h": 1400,
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
  "photos": [
   {
    "src": "/images/courses/fire-admin-1-ab34c2fc.webp",
    "w": 1050,
    "h": 1400,
    "kind": "photo"
   },
   {
    "src": "/images/courses/fire-admin-2-2b3a1e81.webp",
    "w": 1400,
    "h": 1050,
    "kind": "photo"
   }
  ]
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
    "src": "/images/courses/fire-safety-edu-1-221305dd.webp",
    "w": 1050,
    "h": 1400,
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
    "src": "/images/courses/fire-tlss-1-ee027270.webp",
    "w": 1050,
    "h": 1400,
    "kind": "photo"
   },
   {
    "src": "/images/courses/fire-tlss-2-650176b5.webp",
    "w": 1050,
    "h": 1400,
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
    "src": "/images/courses/kalis-1-79627dab.webp",
    "w": 1400,
    "h": 1050,
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
    "src": "/images/courses/kipf-1-ded32e4d.webp",
    "w": 1400,
    "h": 1050,
    "kind": "photo"
   },
   {
    "src": "/images/courses/kipf-2-e5c673a3.webp",
    "w": 1400,
    "h": 1050,
    "kind": "photo"
   },
   {
    "src": "/images/courses/kipf-3-f23918fc.webp",
    "w": 1400,
    "h": 1050,
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
    "src": "/images/courses/kwdi-1-af7a5cdf.webp",
    "w": 1400,
    "h": 1050,
    "kind": "photo"
   },
   {
    "src": "/images/courses/kwdi-2-4642c19a.webp",
    "w": 1400,
    "h": 1050,
    "kind": "photo"
   },
   {
    "src": "/images/courses/kwdi-3-9e43cf82.webp",
    "w": 1400,
    "h": 1050,
    "kind": "photo"
   },
   {
    "src": "/images/courses/kwdi-4-04f0107a.webp",
    "w": 1400,
    "h": 1050,
    "kind": "photo"
   },
   {
    "src": "/images/courses/kwdi-5-81c46659.webp",
    "w": 1400,
    "h": 1050,
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
    "src": "/images/courses/gbsa-1-c733dbe7.webp",
    "w": 1400,
    "h": 1050,
    "kind": "photo"
   },
   {
    "src": "/images/courses/gbsa-2-f693463a.webp",
    "w": 1400,
    "h": 1050,
    "kind": "photo"
   },
   {
    "src": "/images/courses/gbsa-3-a6d99125.webp",
    "w": 1400,
    "h": 1050,
    "kind": "photo"
   },
   {
    "src": "/images/courses/gbsa-4-ec678530.webp",
    "w": 1050,
    "h": 1400,
    "kind": "photo"
   },
   {
    "src": "/images/courses/gbsa-5-7ef101a3.webp",
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
    "src": "/images/courses/seongnam-youth-1-8b649b12.webp",
    "w": 1400,
    "h": 1050,
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
    "src": "/images/courses/gangnam-teachers-1-6361b1ae.webp",
    "w": 1400,
    "h": 1050,
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
    "src": "/images/courses/kisa-vibe-1-ce535e3d.webp",
    "w": 1400,
    "h": 1050,
    "kind": "photo"
   },
   {
    "src": "/images/courses/kisa-vibe-2-641a80e6.webp",
    "w": 1400,
    "h": 1050,
    "kind": "photo"
   },
   {
    "src": "/images/courses/kisa-vibe-3-ac976256.webp",
    "w": 1400,
    "h": 1050,
    "kind": "photo"
   },
   {
    "src": "/images/courses/kisa-vibe-4-c98fdfe4.webp",
    "w": 1400,
    "h": 1050,
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
    "src": "/images/courses/kisa-web3-1-63edbf13.webp",
    "w": 1400,
    "h": 1050,
    "kind": "photo"
   },
   {
    "src": "/images/courses/kisa-web3-2-f49f74a0.webp",
    "w": 1400,
    "h": 1050,
    "kind": "photo"
   },
   {
    "src": "/images/courses/kisa-web3-3-b5a6c117.webp",
    "w": 1400,
    "h": 1050,
    "kind": "photo"
   },
   {
    "src": "/images/courses/kisa-web3-4-1fb1c4f8.webp",
    "w": 1400,
    "h": 1400,
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
    "src": "/images/courses/uos-1-c57717e4.webp",
    "w": 1400,
    "h": 1050,
    "kind": "photo"
   },
   {
    "src": "/images/courses/uos-2-39f55233.webp",
    "w": 1400,
    "h": 1050,
    "kind": "photo"
   },
   {
    "src": "/images/courses/uos-3-b50f075e.webp",
    "w": 1400,
    "h": 1050,
    "kind": "photo"
   },
   {
    "src": "/images/courses/uos-4-b7f67d41.webp",
    "w": 1050,
    "h": 1400,
    "kind": "photo"
   },
   {
    "src": "/images/courses/uos-5-80736ffd.webp",
    "w": 1400,
    "h": 1050,
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
    "src": "/images/courses/inflearn-sme-1-7be98363.webp",
    "w": 1400,
    "h": 1400,
    "kind": "photo"
   },
   {
    "src": "/images/courses/inflearn-sme-2-78a07a1d.webp",
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
    "src": "/images/courses/hanbit-1-f6b2a7e7.webp",
    "w": 1400,
    "h": 1400,
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
    "src": "/images/courses/kvrda-1-4f29fb41.webp",
    "w": 1400,
    "h": 1050,
    "kind": "photo"
   },
   {
    "src": "/images/courses/kvrda-2-d03badd2.webp",
    "w": 1400,
    "h": 1050,
    "kind": "photo"
   },
   {
    "src": "/images/courses/kvrda-3-a9b5dfda.webp",
    "w": 1400,
    "h": 1050,
    "kind": "photo"
   },
   {
    "src": "/images/courses/kvrda-4-dd4baba9.webp",
    "w": 1050,
    "h": 1400,
    "kind": "photo"
   },
   {
    "src": "/images/courses/kvrda-5-02ab578b.webp",
    "w": 1400,
    "h": 1050,
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
    "src": "/images/courses/music-assoc-1-2e4de268.webp",
    "w": 1400,
    "h": 1400,
    "kind": "photo"
   },
   {
    "src": "/images/courses/music-assoc-2-3012de56.webp",
    "w": 1050,
    "h": 1400,
    "kind": "photo"
   },
   {
    "src": "/images/courses/music-assoc-3-19964a55.webp",
    "w": 1400,
    "h": 1400,
    "kind": "photo"
   },
   {
    "src": "/images/courses/music-assoc-4-cf2da177.webp",
    "w": 1400,
    "h": 1400,
    "kind": "photo"
   },
   {
    "src": "/images/courses/music-assoc-5-97e1e774.webp",
    "w": 1050,
    "h": 1400,
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
    "src": "/images/courses/joongang-girls-1-d1f92f96.webp",
    "w": 1400,
    "h": 1050,
    "kind": "photo"
   },
   {
    "src": "/images/courses/joongang-girls-2-cb256222.webp",
    "w": 1400,
    "h": 1050,
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
export const FEATURED: string[] = ["kbcard", "ebs-digital-school", "gsretail", "ncsoft", "koba"];
export const totalSessions = 121;
export const orgCount = 35;
export const orgNames: string[] = ["EBS", "GS리테일", "KB국민카드", "NC", "넥슨코리아", "JB금융지주", "KISA", "MBC충북", "서울시립대학교", "멀티캠퍼스", "전자신문", "바이브컴퍼니", "데이터솔루션", "메드엔진", "방송기술교육원", "TBC", "한국언론진흥재단", "코바(KOBA)", "해양경찰청", "서울소방학교", "한국소비자원", "국토안전관리원", "한국조세재정연구원", "한국여성정책연구원", "경기도경제과학진흥원", "서울시평생교육진흥원", "성남시청소년재단", "강남서초교육지원청", "부산가톨릭대학교", "인프런", "한빛미디어", "한국가상융합디지털산업협회", "한국음악협회", "중앙여고", "모두의연구소"];
