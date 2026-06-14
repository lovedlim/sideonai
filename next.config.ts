import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
