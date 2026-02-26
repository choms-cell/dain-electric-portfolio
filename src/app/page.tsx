import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import PortfolioCard from "@/components/PortfolioCard";
import { getPortfolios } from "@/lib/queries";

export default async function HomePage() {
  const portfolios = await getPortfolios();
  const recent = portfolios.slice(0, 6);

  return (
    <>
      <Header />
      <main>
        <HeroSection />

        {/* Recent Portfolio */}
        <section className="section bg-white">
          <div className="wrapper">
            {/* Section header */}
            <div className="flex items-end justify-between mb-10 md:mb-14">
              <div>
                <p className="label mb-3">Recent Works</p>
                <h2
                  className="font-extrabold text-[#111] leading-tight"
                  style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)" }}
                >
                  최신 시공 실적
                </h2>
              </div>
              <Link
                href="/portfolio"
                className="hidden md:inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#666] hover:text-[#111] transition-colors duration-200 group"
              >
                전체보기
                <svg
                  className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-150"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10">
              {recent.map((p, i) => (
                <PortfolioCard key={p._id} portfolio={p} index={i} />
              ))}
            </div>

            {/* Mobile CTA */}
            <div className="mt-10 text-center md:hidden">
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 px-6 py-3 border border-[#E8E8E8] text-[13px] font-semibold text-[#111] rounded-sm hover:bg-[#F7F7F7] transition-colors duration-200"
              >
                전체 포트폴리오 보기
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="bg-[#111] py-16 md:py-20">
          <div className="wrapper text-center">
            <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-white/40 mb-4">
              Contact
            </p>
            <h2
              className="font-extrabold text-white leading-tight mb-4"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
            >
              시공 문의 및 무료 견적
            </h2>
            <p className="text-white/50 text-[14px] mb-8 max-w-md mx-auto">
              어떤 현장이든 전문 담당자가 직접 현장 방문하여 정확한 견적을 제공합니다.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="tel:041-000-0000"
                className="flex items-center gap-2 px-6 py-3.5 bg-white text-[#111] font-bold text-[13px] rounded-sm hover:bg-white/90 transition-colors duration-200"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                041-000-0000
              </a>
              <Link
                href="/contact"
                className="flex items-center gap-2 px-6 py-3.5 border border-white/20 text-white font-semibold text-[13px] rounded-sm hover:bg-white/5 transition-colors duration-200"
              >
                온라인 문의하기
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
