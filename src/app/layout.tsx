import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import StructuredData from "@/components/StructuredData";

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
  description: "AI 교육 전문가 SideOnAI의 개인 브랜딩 페이지. GitHub, YouTube, Inflearn 강의 및 도서 정보를 확인하세요.",
  keywords: "SideOnAI, AI 교육, 프로그래밍 교육, 빅데이터 분석기사, 딥러닝, 텐서플로, 바이브 코딩",
  authors: [{ name: "SideOnAI" }],
  creator: "SideOnAI",
  publisher: "SideOnAI",
  openGraph: {
    title: "SideOnAI - AI 교육 전문가",
    description: "AI 교육 전문가 SideOnAI의 개인 브랜딩 페이지",
    type: "website",
    locale: "ko_KR",
    siteName: "SideOnAI",
  },
  twitter: {
    card: "summary",
    title: "SideOnAI - AI 교육 전문가",
    description: "AI 교육 전문가 SideOnAI의 개인 브랜딩 페이지",
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
        <StructuredData />
        {children}
      </body>
    </html>
  );
}
