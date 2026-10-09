import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/site";

// 검색엔진과 AI 검색·답변 서비스 모두에 공개한다. AI가 회사 소개를 인용할 수 있게 하려는 것.
// 목록에 이름을 적은 봇은 * 규칙 대신 자기 규칙을 읽으므로 같은 허용을 따로 적어 둔다.
const AI_BOTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Bingbot",
  "Yeti", // 네이버
  "Daum",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: AI_BOTS, allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
