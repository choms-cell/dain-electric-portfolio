export const revalidate = 0;

import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hansol-elec.co.kr";

export const metadata: Metadata = {
  title: "다인전기 | 전기공사 전문기업 시공 포트폴리오",
  description:
    "20년 이상의 전기공사 전문기업 다인전기. 수변전 설비, 동력설비, 태양광, 소방전기 등 전국 시공 실적을 확인하세요.",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "다인전기 | 전기공사 전문기업",
    description: "20년 이상의 전기공사 전문기업. 수변전 설비, 태양광, 소방전기 등 전국 시공.",
    url: SITE_URL,
  },
};
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import PortfolioCard from "@/components/PortfolioCard";
import { getPortfolios } from "@/lib/queries";

const ProjectMap = dynamic(() => import("@/components/ProjectMap"), { ssr: false });

const SERVICES = [
  {
    number: "01",
    title: "수변전 설비",
    desc: "변전소·수배전반 설계·시공부터 유지보수까지. 안정적인 전력 공급을 책임집니다.",
  },
  {
    number: "02",
    title: "동력·조명설비",
    desc: "산업용 동력 설비와 고효율 LED 조명 시스템 전문 시공.",
  },
  {
    number: "03",
    title: "태양광·신재생",
    desc: "주택·산업용 태양광 발전 설계·시공·O&M 원스톱 서비스.",
  },
];

export default async function HomePage() {
  const portfolios = await getPortfolios();
  const recent = portfolios.slice(0, 4);

  return (
    <>
      <Header />
      <main className="pt-[60px] md:pt-[68px]">
        <HeroSection />

        {/* Services */}
        <section className="border-b border-slate-200">
          <div className="wrapper">
            <div className="py-14 md:py-16 border-b border-slate-200">
              <p className="label mb-3">Services</p>
              <h2 className="font-bold text-slate-900 tracking-tighter" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>
                주요 사업 분야
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200">
              {SERVICES.map((s) => (
                <div key={s.number} className="py-10 md:py-12 md:px-8 first:md:pl-0 last:md:pr-0">
                  <span className="block text-[11px] font-bold tracking-[0.15em] text-slate-300 mb-5">
                    {s.number}
                  </span>
                  <h3 className="font-bold text-slate-900 text-[18px] mb-3">{s.title}</h3>
                  <p className="text-[13px] text-slate-500 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Portfolio */}
        <section className="section bg-white">
          <div className="wrapper">
            <div className="flex items-end justify-between mb-10 md:mb-14">
              <div>
                <p className="label mb-3">Recent Works</p>
                <h2 className="font-bold text-slate-900 tracking-tighter" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>
                  최신 시공 실적
                </h2>
              </div>
              <Link
                href="/portfolio"
                className="hidden md:inline-flex items-center gap-1.5 text-[13px] font-semibold text-slate-500 hover:text-slate-900 transition-colors duration-200 group"
              >
                전체보기
                <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-150" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-12">
              {recent.map((p, i) => (
                <PortfolioCard key={p._id} portfolio={p} index={i} />
              ))}
            </div>

            <div className="mt-10 text-center md:hidden">
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 px-6 py-3 border border-slate-200 text-[13px] font-semibold text-slate-700 hover:border-slate-900 hover:text-slate-900 transition-all duration-200"
              >
                전체 포트폴리오 보기
              </Link>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="border-b border-slate-200">
          <div className="wrapper">
            <div className="py-14 md:py-16 border-b border-slate-200">
              <p className="label mb-3">Service Area</p>
              <h2
                className="font-bold text-slate-900 tracking-tighter"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
              >
                전국 시공 현장
              </h2>
              <p className="text-[13px] text-slate-500 mt-2">
                전국 어디든 방문합니다. 지도에서 시공 지역을 확인하세요.
              </p>
            </div>
            <div className="py-10">
              <ProjectMap portfolios={portfolios} />
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="bg-slate-900 py-16 md:py-20">
          <div className="wrapper">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-slate-500 mb-3">
                  Contact
                </p>
                <h2 className="font-bold text-white tracking-tighter mb-3" style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}>
                  시공 문의 및 무료 견적
                </h2>
                <p className="text-slate-400 text-[14px]">
                  전문 담당자가 현장 방문하여 정확한 견적을 제공합니다.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                <a
                  href="tel:041-000-0000"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-slate-900 font-bold text-[13px] hover:bg-slate-100 transition-colors duration-200"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  041-000-0000
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-slate-600 text-white font-semibold text-[13px] hover:border-slate-400 transition-colors duration-200"
                >
                  온라인 문의하기
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
