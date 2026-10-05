"use client";

import type { ReactNode } from "react";
import { trackCtaClick } from "@/lib/gtag";

// 클릭을 분석 이벤트로 남기는 앵커. 페이지 안 이동(#contact 등)에 쓴다.
export default function CtaLink({
  href,
  location,
  className,
  children,
}: {
  href: string;
  location: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a href={href} className={className} onClick={() => trackCtaClick(location)}>
      {children}
    </a>
  );
}
