import type { Metadata, Viewport } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
// Pretendard(OFL)를 직접 호스팅한다. 외부 CDN이 막힌 기관 망에서도 글꼴과 첫 화면이 늦어지지 않는다.
import "./fonts/pretendard/pretendardvariable-dynamic-subset.css";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import LogoIdent from "@/components/LogoIdent";
import StructuredData from "@/components/StructuredData";
import { orgCount, totalSessions } from "@/data/courses";
import { BRAND, LEAD_CLIENTS, SITE_URL, SLOGAN } from "@/data/site";
import { Analytics } from "@vercel/analytics/next";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 배달의민족 글꼴. 제목은 한나체 Pro, 숫자와 짧은 이름표는 도현체. 완성형 2,350자로 줄여 직접 호스팅한다.
const hanna = localFont({
  src: "./fonts/baemin/BMHANNAPro.woff2",
  variable: "--font-hanna",
  display: "swap",
});
const dohyeon = localFont({
  src: "./fonts/baemin/BMDOHYEON.woff2",
  variable: "--font-dohyeon",
  display: "swap",
});

const SITE_TITLE = `${BRAND} | 생성형 AI 기업 교육 · AX 컨설팅 · 바이브 코딩`;
const SITE_DESC = `${LEAD_CLIENTS} 등 ${orgCount}곳에서 ${totalSessions}회 강의한 AI 교육·AX 컨설팅 회사. 생성형 AI 실무, 업무 자동화, 바이브 코딩 교육.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: `%s | ${BRAND}` },
  description: SITE_DESC,
  applicationName: BRAND,
  keywords: [
    "SideOnAI",
    "사이드온에이아이",
    "생성형 AI 기업 교육",
    "AI 기업 교육",
    "AI 강사",
    "AI 교육 강사",
    "AX 컨설팅",
    "AI 전환",
    "바이브코딩 교육",
    "바이브 코딩 강의",
    "Claude Code 교육",
    "클로드 코드 교육",
    "AI 업무 자동화",
    "AI 에이전트 교육",
    "공공기관 AI 교육",
  ],
  authors: [{ name: BRAND, url: SITE_URL }],
  creator: BRAND,
  publisher: BRAND,
  category: "education",
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESC,
    type: "website",
    locale: "ko_KR",
    siteName: BRAND,
    url: "/",
    images: [{ url: "/home-preview.png", width: 1200, height: 630, alt: `${BRAND} - ${SLOGAN}` }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/home-preview.png"],
    title: SITE_TITLE,
    description: SITE_DESC,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

// 모바일 브라우저의 주소창 색을 페이지 배경과 맞춘다
export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Google Analytics Measurement ID
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="ko" data-scroll-behavior="smooth">
      <body className={`${geistMono.variable} ${hanna.variable} ${dohyeon.variable} antialiased`}>
        {gaId && <GoogleAnalytics measurementId={gaId} />}
        <StructuredData />
        <LogoIdent />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
