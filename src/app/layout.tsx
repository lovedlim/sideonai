import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SideOnAI - AI 교육 전문가",
  description: "생성형 AI와 바이브 코딩으로 누구나 쉽게 프로그래밍을 배우고 업무 효율성을 극대화하세요. 4,829+ 선택받은 강의, 4.9/5.0 압도적 강의 평점",
  keywords: "AI 교육, 바이브 코딩, 생성형 AI, 프로그래밍 교육, 업무 자동화, 빅데이터 분석기사, 캐글, 머신러닝",
  authors: [{ name: "SideOnAI" }],
  creator: "SideOnAI",
  publisher: "SideOnAI",
  openGraph: {
    title: "SideOnAI - AI 교육 전문가",
    description: "생성형 AI와 바이브 코딩으로 누구나 쉽게 프로그래밍을 배우고 업무 효율성을 극대화하세요",
    type: "website",
    locale: "ko_KR",
    siteName: "SideOnAI",
  },
  twitter: {
    card: "summary_large_image",
    title: "SideOnAI - AI 교육 전문가",
    description: "생성형 AI와 바이브 코딩으로 누구나 쉽게 프로그래밍을 배우고 업무 효율성을 극대화하세요",
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
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {gaId && <GoogleAnalytics measurementId={gaId} />}
        {children}
      </body>
    </html>
  );
}
