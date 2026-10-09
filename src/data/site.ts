// 홈에 나오는 문구와 링크의 단일 출처. 메타데이터·구조화 데이터·FAQ도 여기서 가져간다.
import { courses, orgCount, totalSessions } from "./courses";

export const SITE_URL = "https://sideonai.com";
export const BRAND = "SideOnAI";
export const BRAND_KO = "사이드온에이아이";
export const LEAD_CLIENTS = "EBS, GS리테일, KB국민카드, NC";

export const SLOGAN = "도메인에 AI를 더하다";
export const TAGLINE = "AX 컨설팅 · AI 교육 · 업무 자동화 · 바이브 코딩";
export const DOMAIN_LINE = "어떤 도메인에도 AI를 더합니다";

// 히어로 도메인 장면의 이름표. 순서는 graph.ts의 DOMAIN_DIRS와 같다 (오른쪽 3개, 왼쪽 3개).
export const DOMAINS = ["공공", "금융", "소방", "방송", "교육", "유통"] as const;

export const NAV = [
  { href: "/#services", label: "서비스" },
  { href: "/#track", label: "실적" },
  { href: "/#books", label: "도서·강의" },
  { href: "/#resources", label: "리소스" },
] as const;

export const SERVICES = [
  {
    key: "ax",
    title: "AX 컨설팅",
    body: "업무 진단부터 AI 전환 로드맵, 실행까지.",
    tags: ["업무 진단", "AX 로드맵", "데이터 기반 의사결정"],
  },
  {
    key: "education",
    title: "AI 교육",
    body: "직무와 도메인에 맞춘 생성형 AI 실무 교육.",
    tags: ["생성형 AI 실무", "직무별 맞춤", "신임자·관리자 과정"],
  },
  {
    key: "automation",
    title: "업무 자동화",
    body: "반복 업무는 AI 에이전트에게 맡깁니다.",
    tags: ["AI 에이전트", "컴퓨터 유즈", "Aside", "Claude API", "문서·행정 자동화"],
  },
  {
    key: "vibe",
    title: "바이브 코딩",
    body: "코딩 몰라도 내 업무 도구를 직접 만듭니다.",
    tags: ["Claude Code", "Codex", "Gemini", "Cursor"],
  },
] as const;

// 실적 섹션의 보조 지표. README의 "주요 성과"에서 가져왔다. 숫자가 바뀌면 여기만 고치면 된다.
export const STATS = [
  { value: "4.8k+", label: "온라인 강의 수강생" },
  { value: "4.9/5", label: "인프런 수강 만족도" },
  { value: "230+", label: "캐글·AI 학습 모임 운영" },
  { value: "2024", label: "인프런 어워드 답변왕" },
] as const;

export interface Book {
  title: string;
  publisher: string;
  note?: string;
  links: string[]; // 2개 이상이면 무작위로 하나를 연다
  cover?: string;
}

export const BOOKS: Book[] = [
  {
    title: "바이브 코딩 with cursor",
    publisher: "길벗",
    note: "2026.2",
    links: [
      "https://product.kyobobook.co.kr/detail/S000219139681",
      "https://www.yes24.com/product/goods/176548558",
    ],
    cover: "/images/vibe-coding-book.png",
  },
  {
    title: "2026 시나공 빅데이터분석기사 실기",
    publisher: "길벗",
    links: [
      "https://www.yes24.com/product/goods/185160480",
      "https://product.kyobobook.co.kr/detail/S000219615760",
    ],
  },
  {
    title: "파이썬 딥러닝 텐서플로",
    publisher: "정보문화사",
    links: ["https://www.yes24.com/product/goods/102603640"],
  },
  {
    title: "AI 기반 소방 활용 (기초)",
    publisher: "위키독스",
    note: "무료 공개 전자책",
    links: ["https://wikidocs.net/book/19077"],
  },
];

export const COURSES = [
  {
    title: "인프런 VOD 과정",
    note: "만족도 4.9 / 5",
    href: "https://www.inflearn.com/users/26238/@roadmap",
  },
  {
    title: "유튜브",
    note: "youtube.com/@ai-study",
    href: "https://www.youtube.com/@ai-study",
  },
] as const;

export const RESOURCES = [
  {
    title: "클로드 코드 타이핑 테스트",
    note: "교육 입장 전 연습",
    href: "/typing",
  },
  {
    title: "마크다운 에디터 연습",
    note: "문법과 미리보기",
    href: "/md",
  },
  {
    title: "코딩팡",
    note: "파이썬·판다스·머신러닝·통계 실습",
    href: "https://code.sideonai.com",
  },
  {
    title: "AI 역량 간단 진단",
    note: "나의 AI 활용 수준 체크",
    href: "https://check.sideonai.com",
  },
  {
    title: "캐글 데이터분석 튜토리얼",
    note: "빅데이터분석기사 실기 데이터셋",
    href: "https://www.kaggle.com/datasets/agileteam/bigdatacertificationkr",
  },
] as const;

export const CONTACT_EMAIL = "ceo@sideonai.com";

// 하단 회사 정보. 사업자등록증 기준 상호·대표·등록번호.
export const COMPANY = {
  tagline: "SideOnAI · AI Transformation Partner",
  legalName: "사이드온에이아이(SideOnAI)",
  ceo: "김태헌",
  bizNo: "591-64-00871",
  address: "경기도 수원시 영통구 법조로 25, 광교SK뷰레이크타워 A동 2815호",
};

// 해외 방문자와 파트너를 위한 영문 소개.
export const ABOUT_EN = [
  "SideOnAI is an AI transformation startup founded in 2025 in Korea.",
  "We help companies and public institutions adopt AI through hands-on training, consulting, and workflow automation built with Claude.",
] as const;

// 검색엔진과 AI가 그대로 인용할 수 있는 한 줄 사실들. 숫자는 courses.ts에서 자동으로 온다.
export const ABOUT_HEAD = "현장에서 바로 쓰는 AI를 가르칩니다";
export const ABOUT_KO = [
  `${BRAND}(${BRAND_KO})는 기업·기관의 AI 전환을 돕는 AX 컨설팅·AI 교육 회사입니다.`,
  `${LEAD_CLIENTS} 등 ${orgCount}곳에서 ${totalSessions}회 강의했습니다.`,
  `생성형 AI 실무, 업무 자동화, 바이브 코딩까지 ${courses.length}개 과정을 직접 설계했습니다.`,
] as const;

// 자주 묻는 질문. 화면(About 섹션)과 FAQPage 구조화 데이터가 같은 문장을 쓴다.
export const FAQ = [
  {
    q: "SideOnAI는 어떤 회사인가요?",
    a: "기업·기관에 AX 컨설팅, 생성형 AI 실무 교육, 업무 자동화, 바이브 코딩 교육을 제공합니다.",
  },
  {
    q: "어디에서 강의했나요?",
    a: `${LEAD_CLIENTS}, 넥슨코리아, JB금융지주, KISA 등 ${orgCount}곳에서 ${totalSessions}회 강의했습니다.`,
  },
  {
    q: "바이브 코딩 교육에서는 무엇을 배우나요?",
    a: "Claude Code, Codex, Gemini, Cursor로 내 업무 도구를 직접 만듭니다.",
  },
  {
    q: "업무 자동화는 어떤 도구로 하나요?",
    a: "AI 에이전트, 컴퓨터 유즈, Aside, Claude API로 반복 업무를 자동화합니다.",
  },
  {
    q: "우리 조직에 맞춘 교육도 되나요?",
    a: `네. 직무와 도메인에 맞춰 과정을 설계합니다. 지금까지 ${courses.length}개 과정을 만들었습니다.`,
  },
  {
    q: "교육 문의는 어떻게 하나요?",
    a: `${CONTACT_EMAIL} 또는 문의 폼에 대상과 목표를 남겨 주세요.`,
  },
] as const;

export const CONTACT_LINKS = [
  { label: "이메일", text: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
  { label: "LinkedIn", text: "linkedin.com/in/ailab", href: "https://www.linkedin.com/in/ailab" },
] as const;
