# SideOnAI

도메인에 AI를 더하는 SideOnAI의 홈페이지입니다. 3D 뉴럴 코어 히어로로 시작해 서비스, 실적, 도서·강의, 리소스, 협업 문의로 이어지는 다크 톤 원페이지 사이트입니다.

## ✨ 주요 기능

- **뉴럴 코어 히어로**: 마우스와 스크롤에 반응하는 three.js 3D 신경망. 스크롤하면 도메인(공공·금융·소방·방송·교육·유통)이 AI와 연결되는 장면으로 넘어갑니다.
- **대체 화면**: 모바일·저사양 기기는 가벼운 버전으로, "동작 줄이기" 설정이나 WebGL 미지원 환경은 정지 화면으로 보여줍니다.
- **섹션**: 서비스, 실적(강의·강연 횟수와 기관), 도서·강의, 리소스, 협업 문의
- **강의·강연 활동 페이지**: `/activities`
- **간편 문의 폼**: Google Apps Script 연동 (전송 완료 후 확인 카드 표시)

## 🛠 기술 스택

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript
- **3D**: three.js (히어로에서만 지연 로드)
- **Styling**: Tailwind CSS 4, Pretendard (직접 호스팅)
- **테스트**: Vitest (`npm test`)
- **배포**: Vercel

## 🗂 구조

- `src/data/site.ts`: 홈에 나오는 문구와 링크 (도메인, 서비스, 도서, 리소스)
- `src/data/activities.ts`: 강의·강연 목록
- `src/components/hero/`: 히어로. `scene.ts`가 three.js 장면, `NeuralHero.tsx`가 스크롤·포인터 입력과 이름표를 맡습니다.
- `src/components/sections/`: 섹션 컴포넌트
- `docs/superpowers/specs/2026-10-06-v2-home-design.md`: v2 설계 문서

## 📚 포함된 링크

### 소셜 미디어
- 이메일: ceo@sideonai.com
- YouTube: https://www.youtube.com/@ai-study
- Inflearn: https://www.inflearn.com/users/26238/@roadmap (만족도 4.9/5점 만점)
- LinkedIn: https://www.linkedin.com/in/ailab

### 학습 자료
- 캐글 데이터분석 튜토리얼: 빅데이터 분석기사 실기 데이터셋

### 도서
- [바이브 코딩 with cursor](https://product.kyobobook.co.kr/detail/S000219139681) (2026.2 출간 예정, 길벗)
- 2026 시나공 빅데이터분석기사 실기 (길벗)
- 파이썬 딥러닝 텐서플로 (정보문화사)

### 전자 도서 (공개)
- [AI 기반 소방 활용 (기초)](https://wikidocs.net/book/19077) (위키독스)

## 🏃‍♂️ 시작하기

### 로컬 개발 환경 설정

```bash
# 저장소 클론
git clone https://github.com/lovedlim/sideonai.git
cd sideonai

# 의존성 설치
npm install

# 환경변수 설정 (필수)
# .env.local 파일을 생성하고 다음 내용을 추가하세요:
# NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec

# 개발 서버 실행
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 결과를 확인하세요.

### 환경변수 설정

문의 폼과 Google Analytics가 작동하려면 환경변수 설정이 필요합니다:

1. `.env.local` 파일을 프로젝트 루트에 생성
2. 다음 내용 추가:
   ```
   # 구글 Apps Script URL (문의 폼)
   NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   
   # Google Analytics 4 Measurement ID (선택사항)
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```
3. `YOUR_SCRIPT_ID`를 실제 구글 Apps Script 배포 ID로 변경
4. `G-XXXXXXXXXX`를 실제 GA4 Measurement ID로 변경 (없으면 GA 기능 비활성화)

### Google Analytics 4 설정

1. [Google Analytics](https://analytics.google.com/)에 접속
2. 새 속성 생성 → 웹사이트 선택
3. 추적 ID (G-XXXXXXXXXX) 복사
4. `.env.local`의 `NEXT_PUBLIC_GA_MEASUREMENT_ID`에 추가

## 🛡️ 스팸 및 보안 방지

### 현재 적용된 보안 기능

1. **Honeypot 필드**: 봇이 입력하는 숨겨진 필드로 자동화된 스팸 차단
2. **유효성 검사**: 이메일 형식, 필수 항목, 문자 수 제한 (2000자)
3. **환경변수**: 민감한 URL 정보를 환경변수로 분리

### 빌드 및 배포

```bash
# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

## 📞 연락처

- **이메일**: ceo@sideonai.com
- **YouTube**: [https://www.youtube.com/@ai-study](https://www.youtube.com/@ai-study)
- **Inflearn**: [강의 로드맵](https://www.inflearn.com/users/26238/@roadmap) (만족도 4.9/5점 만점)
- **LinkedIn**: [https://www.linkedin.com/in/ailab](https://www.linkedin.com/in/ailab)

## 🏆 주요 성과

- 온라인 강의 수강자 4.8k+ (만족도 4.9/5점 만점)
- 기업/공공기관 교육 50회 이상
- 캐글/AI 학습 모임 230회 이상 운영
- 2024 Inflearn Award "답변왕" 수상

## 🌟 기여하기

프로젝트 개선에 기여하고 싶으시다면 언제든지 이슈를 등록하거나 풀 리퀘스트를 보내주세요.

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 있습니다.

---

Made with ❤️ by SideOnAI
