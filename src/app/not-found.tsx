import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <SiteHeader />
      <main id="main" className="flex flex-1 items-center px-5 pt-28 pb-16 sm:px-8">
        <div className="mx-auto w-full max-w-6xl">
          <p className="eyebrow mb-4">404</p>
          <h1 className="text-[clamp(1.9rem,4vw,3.25rem)] font-bold leading-[1.12] tracking-[-0.03em]">
            이 주소에는 페이지가 없습니다
          </h1>
          <p className="mt-4 text-lg text-muted">주소가 바뀌었거나 잘못 입력되었을 수 있습니다.</p>
          <Link
            href="/"
            className="mt-8 inline-flex rounded-full bg-accent px-6 py-3 text-[0.95rem] font-semibold text-bg transition hover:shadow-[0_0_32px_rgba(77,243,255,0.55)]"
          >
            홈으로 가기
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
