import { Suspense } from "react";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PortfolioList from "@/components/PortfolioList";
import { getPortfolios } from "@/lib/queries";

export const metadata: Metadata = {
  title: "시공 포트폴리오",
  description:
    "전국 전기공사 시공 실적 포트폴리오. 수변전 설비, 동력설비, 태양광, 소방전기 등 분야별 시공 사례를 확인하세요.",
};

export default async function PortfolioPage() {
  const portfolios = await getPortfolios();

  return (
    <>
      <Header />
      <main className="pt-[60px] md:pt-[68px]">
        {/* Page header */}
        <div className="border-b border-slate-200 bg-slate-50">
          <div className="wrapper py-10 md:py-14">
            <p className="label mb-3">Portfolio</p>
            <h1
              className="font-bold text-slate-900 leading-tight tracking-tighter"
              style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
            >
              시공 포트폴리오
            </h1>
            <p className="text-[14px] text-slate-500 mt-2">
              전국 다양한 현장의 전기공사 시공 사례
            </p>
          </div>
        </div>

        {/* List + filter */}
        <div className="wrapper section">
          <Suspense fallback={<PortfolioListSkeleton />}>
            <PortfolioList portfolios={portfolios} />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}

function PortfolioListSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-12">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-[4/3] bg-slate-100 border border-slate-200 mb-4" />
          <div className="h-3 bg-slate-100 w-1/4 mb-2" />
          <div className="h-4 bg-slate-100 w-3/4 mb-2" />
          <div className="h-3 bg-slate-100 w-1/2" />
        </div>
      ))}
    </div>
  );
}
