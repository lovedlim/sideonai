import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 사진은 기기 폭에 맞춰 줄이고 AVIF·WebP로 바꿔 보낸다. 한 번 만든 결과는 30일 동안 캐시한다
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [45, 60, 75],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async redirects() {
    return [
      { source: "/home", destination: "/", permanent: true },
      {
        source: "/typing",
        destination: "https://claude-typing-test.vercel.app/",
        permanent: false,
      },
      {
        source: "/md",
        destination: "https://md-editor-pink-phi.vercel.app/",
        permanent: false,
      },
      {
        source: "/code",
        destination: "https://code.sideonai.com/",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
