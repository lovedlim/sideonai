# SideOnAI - 개인 브랜딩 페이지

도메인에 AI를 더하는, SideOnAI의 개인 브랜딩 페이지입니다. Linktree 스타일의 깔끔하고 모바일 최적화된 디자인으로 제작되었습니다.

## ✨ 주요 기능

- **Linktree 스타일 디자인**: 깔끔하고 모바일 최적화된 개인 브랜딩 페이지
- **프로필 아바타**: "+AI" 텍스트 기반 커스텀 아바타
- **링크 버튼**: 이메일, GitHub, YouTube, Inflearn, LinkedIn 등 주요 링크 제공
- **학습 자료 섹션**: 캐글 데이터분석 튜토리얼 등 학습 자료 링크
- **도서 섹션**: 출간/예정 도서 정보 제공
- **간편 문의 폼**: Google Apps Script 연동 문의 폼 (전송 완료 후 확인 카드 표시)
- **다크 모드 지원**: 사용자 환경에 맞는 테마 자동 적용

## 🛠 기술 스택

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **배포**: Vercel
- **개발 도구**: ESLint, PostCSS

## 📚 포함된 링크

### 소셜 미디어
- 이메일: danmujicafe@gmail.com
- GitHub: https://github.com/lovedlim/
- YouTube: https://www.youtube.com/@ai-study
- Inflearn: https://www.inflearn.com/users/26238/@roadmap (만족도 4.9/5점 만점)
- LinkedIn: https://www.linkedin.com/in/ailab

### 학습 자료
- 캐글 데이터분석 튜토리얼: 빅데이터 분석기사 실기 데이터셋

### 도서
- 바이브 코딩 with cursor (2026.2 출간 예정)
- 2026 시나공 빅데이터분석기사 실기 (길벗)
- 파이썬 딥러닝 텐서플로 (정보문화사)

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

- **이메일**: danmujicafe@gmail.com
- **GitHub**: [https://github.com/lovedlim/](https://github.com/lovedlim/)
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
