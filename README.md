# SideOnAI 공식 웹사이트

SideOnAI는 AI 시대의 교육 혁신을 선도하는 전문 교육 회사입니다. 생성형 AI와 바이브 코딩을 통해 새로운 개발 경험과 업무 효율화를 제공합니다.

## 🚀 주요 기능

- **현대적인 반응형 디자인**: Tailwind CSS를 사용한 모바일 친화적 UI
- **교육과정 소개**: 다양한 AI/데이터 교육 프로그램 정보 제공
- **교육의뢰 신청**: 맞춤형 교육 상담 및 신청 시스템
- **회사 소개**: 대표 프로필 및 주요 성과 소개
- **다크 모드 지원**: 사용자 환경에 맞는 테마 자동 적용

## 🛠 기술 스택

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **배포**: Vercel
- **개발 도구**: ESLint, PostCSS

## 📚 교육과정

1. **생성형 AI 활용 교육** - ChatGPT, Claude, Cursor AI 활용법
2. **바이브 코딩 워크숍** - 노코드/로우코드 개발 경험
3. **데이터 분석 & 머신러닝** - Python 실무 활용
4. **빅데이터 분석기사 대비** - 자격증 취득 과정
5. **맞춤형 기업 교육** - 기업별 특화 프로그램

## 🏃‍♂️ 시작하기

### 로컬 개발 환경 설정

```bash
# 저장소 클론
git clone https://github.com/[your-username]/sideonai.git
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

### 추가 보안 강화 방법

**서버 사이드 (구글 Apps Script):**
```javascript
function doPost(e) {
  // IP 기반 rate limiting
  // 시간당 요청 제한
  // 키워드 필터링
  // 이메일 도메인 검증
}
```

**클라이언트 사이드:**
- reCAPTCHA 추가 가능
- 제출 간격 제한 (1분에 1회)
- 브라우저 fingerprinting 방지

### 빌드 및 배포

```bash
# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

## 📞 연락처

- **이메일**: danmujicafe@gmail.com
- **GitHub**: [https://github.com/lovedlim/](https://github.com/lovedlim/)
- **YouTube**: [https://www.youtube.com/@ai-study](https://www.youtube.com/@ai-study)
- **Inflearn**: [강의 로드맵](https://www.inflearn.com/users/26238/@roadmap)

## 🏆 주요 성과

- 온라인 강의 수강자 4.8k+ (만족도 4.9/5)
- 기업/공공기관 교육 50회 이상
- 캐글/AI 학습 모임 230회 이상 운영
- 2024 Inflearn Award "답변왕" 수상

## 🌟 기여하기

프로젝트 개선에 기여하고 싶으시다면 언제든지 이슈를 등록하거나 풀 리퀘스트를 보내주세요.

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 있습니다.

---

Made with ❤️ by SideOnAI
