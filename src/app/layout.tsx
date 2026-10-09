import type { Metadata, Viewport } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
// Pretendard(OFL)를 직접 호스팅한다. 외부 CDN이 막힌 기관 망에서도 글꼴과 첫 화면이 늦어지지 않는다.
import "./fonts/pretendard/pretendardvariable-dynamic-subset.css";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import StructuredData from "@/components/StructuredData";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://sideonai.com"),
  title: "SideOnAI - 도메인에 AI를 더하다",
  description: "기업·기관을 위한 AI 교육, 업무 자동화, 바이브 코딩. 도메인에 AI를 더하는 SideOnAI.",
  keywords: "SideOnAI, AX 컨설팅, AI 전환, AI 교육, 기업 교육, 업무 자동화, 바이브 코딩, 생성형 AI, 데이터 분석, 빅데이터 분석기사",
  authors: [{ name: "SideOnAI" }],
  creator: "SideOnAI",
  publisher: "SideOnAI",
  openGraph: {
    title: "SideOnAI - 도메인에 AI를 더하다",
    description: "기업·기관을 위한 AI 교육, 업무 자동화, 바이브 코딩",
    type: "website",
    locale: "ko_KR",
    siteName: "SideOnAI",
    images: [{ url: "/home-preview.png", width: 1200, height: 630, alt: "SideOnAI - 도메인에 AI를 더하다" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/home-preview.png"],
    title: "SideOnAI - 도메인에 AI를 더하다",
    description: "기업·기관을 위한 AI 교육, 업무 자동화, 바이브 코딩",
  },
  robots: {
    index: true,
    follow: true,
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
        {children}
        <Analytics />
      </body>
    </html>
  );
}
