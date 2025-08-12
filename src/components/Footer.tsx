import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* 회사 정보 */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">S</span>
              </div>
              <span className="text-xl font-bold">SideOnAI</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              AI 시대의 교육 전문가로서 생성형 AI와 바이브 코딩을 통해 
              새로운 개발 경험과 업무 효율화를 제공합니다.
            </p>
            <div className="space-y-2 text-gray-300">
              <p>📧 danmujicafe@gmail.com</p>
            </div>
          </div>

          {/* 빠른 링크 */}
          <div>
            <h3 className="font-semibold mb-4">빠른 링크</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  홈
                </Link>
              </li>
              <li>
                <Link href="/courses" className="text-gray-300 hover:text-white transition-colors">
                  교육과정
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  회사소개
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  교육의뢰
                </Link>
              </li>
            </ul>
          </div>

          {/* 소셜 링크 */}
          <div>
            <h3 className="font-semibold mb-4">소셜 미디어</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://bit.ly/sideonai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors flex items-center"
                >
                  💼 LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/lovedlim/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors flex items-center"
                >
                  💻 GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@ai-study"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors flex items-center"
                >
                  📺 YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 SideOnAI. All rights reserved. | Made with ❤️ by SideOnAI
          </p>
        </div>
      </div>
    </footer>
  );
}
