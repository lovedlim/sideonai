// 홈에 나오는 문구와 링크의 단일 출처.

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
    body: "조직의 업무를 진단하고 AI 전환 로드맵을 설계합니다. 교육과 자동화까지 실행으로 연결합니다.",
    tags: ["업무 진단", "AX 로드맵", "데이터 기반 의사결정"],
  },
  {
    key: "education",
    title: "AI 교육",
    body: "임직원·공공기관 대상 생성형 AI 실무 교육. 직무와 도메인에 맞춰 커리큘럼을 설계합니다.",
    tags: ["생성형 AI 실무", "직무별 맞춤", "신임자·관리자 과정"],
  },
  {
    key: "automation",
    title: "업무 자동화",
    body: "반복 업무를 n8n·파이썬·AI 에이전트로 자동화합니다. 설계부터 구현까지 함께합니다.",
    tags: ["n8n", "AI 에이전트", "문서·행정 자동화"],
  },
  {
    key: "vibe",
    title: "바이브 코딩",
    body: "코딩 경험이 없어도 Cursor·Claude Code로 웹 서비스를 직접 만드는 워크숍.",
    tags: ["Cursor", "Claude Code", "1-Day 워크숍"],
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

export const CONTACT_EMAIL = "danmujicafe@gmail.com";

export const CONTACT_LINKS = [
  { label: "이메일", text: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
  { label: "GitHub", text: "github.com/lovedlim", href: "https://github.com/lovedlim/" },
  { label: "LinkedIn", text: "linkedin.com/in/ailab", href: "https://www.linkedin.com/in/ailab" },
] as const;
