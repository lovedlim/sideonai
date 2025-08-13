import { Metadata } from "next";

export const metadata: Metadata = {
  title: "교육의뢰 문의 - SideOnAI | AI 교육 상담",
  description: "SideOnAI의 맞춤형 AI 교육 프로그램에 대해 문의하세요. 생성형 AI, 바이브 코딩, 기업 교육 등 다양한 교육 과정을 제공합니다.",
  keywords: "AI 교육 문의, 교육의뢰, 기업 교육, 바이브 코딩 교육, 생성형 AI 교육 상담",
  openGraph: {
    title: "교육의뢰 문의 - SideOnAI",
    description: "SideOnAI의 맞춤형 AI 교육 프로그램에 대해 문의하세요.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
