import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import StructuredData from "@/components/StructuredData";
import { Analytics } from "@vercel/analytics/next";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sideonai.com"),
  title: "SideOnAI - 도메인에 AI를 더하다",
  description: "기업·기관을 위한 AI 교육, 업무 자동화, 바이브 코딩. 도메인에 AI를 더하는 SideOnAI.",
  keywords: "SideOnAI, AI 교육, 기업 교육, 업무 자동화, 바이브 코딩, 생성형 AI, 데이터 분석, 빅데이터 분석기사",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Google Analytics Measurement ID
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="ko" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className={`${geistMono.variable} antialiased`}>
        {gaId && <GoogleAnalytics measurementId={gaId} />}
        <StructuredData />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
