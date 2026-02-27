import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hansol-elec.co.kr";

export const metadata: Metadata = {
  title: "회사소개",
  description:
    "다인전기는 20년 이상의 전기공사 전문기업입니다. 수변전 설비부터 태양광까지, 신뢰와 기술로 최고의 시공을 제공합니다.",
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
};

const MILESTONES = [
  { year: "1998", event: "다인전기 창립" },
  { year: "2005", event: "전기공사업 1종 면허 취득" },
  { year: "2010", event: "ISO 9001 인증 획득" },
  { year: "2015", event: "연간 시공 100건 달성" },
  { year: "2018", event: "태양광 발전 사업 진출" },
  { year: "2020", event: "산업통상자원부 장관표창 수상" },
  { year: "2024", event: "누적 시공 1,200건 돌파" },
];

const VALUES = [
  {
    number: "01",
    title: "안전",
    desc: "모든 현장에서 안전이 최우선입니다. 철저한 안전 교육과 시공 프로세스로 무재해 현장을 실현합니다.",
  },
  {
    number: "02",
    title: "기술",
    desc: "최신 전기 기술과 검증된 시공 방법. 국가공인 자격 보유 전문 기술진이 직접 현장을 책임집니다.",
  },
  {
    number: "03",
    title: "신뢰",
    desc: "약속한 공정과 납기를 반드시 지킵니다. 투명한 견적과 명확한 소통으로 20년간 신뢰를 쌓아왔습니다.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="pt-[60px] md:pt-[68px]">
        {/* Page header */}
        <div className="border-b border-slate-200 bg-slate-50">
          <div className="wrapper py-10 md:py-14">
            <p className="label mb-3">About</p>
            <h1
              className="font-bold text-slate-900 leading-tight tracking-tighter"
              style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
            >
              회사소개
            </h1>
          </div>
        </div>

        {/* Intro */}
        <section className="section bg-white">
          <div className="wrapper">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <p className="label mb-4">Our Story</p>
                <h2
                  className="font-bold text-slate-900 leading-tight tracking-tighter mb-6"
                  style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
                >
                  전기가 흐르는 곳마다
                  <br />
                  다인이 있습니다
                </h2>
                <div className="flex flex-col gap-4 text-[14px] md:text-[15px] text-slate-500 leading-relaxed">
                  <p>
                    1998년 창립 이래, 다인전기는 대한민국 전기공사의 역사와 함께
                    성장해왔습니다. 산업시설부터 대형 빌딩, 공공기관, 태양광 발전까지—
                    어떤 현장이든 최고의 완성도로 마무리합니다.
                  </p>
                  <p>
                    국가공인 전기기사 14명, 전기공사산업기사 28명을 비롯한
                    전문 기술진이 설계부터 시공, 유지보수까지 원스톱으로 책임집니다.
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-6 mt-10 pt-10 border-t border-slate-200">
                  {[
                    { v: "1,200+", l: "시공 완료" },
                    { v: "20년+", l: "업력" },
                    { v: "99.8%", l: "안전 시공률" },
                  ].map((s) => (
                    <div key={s.l}>
                      <div className="font-bold text-slate-900 text-[24px] md:text-[28px] leading-none tracking-tight">
                        {s.v}
                      </div>
                      <div className="text-[11px] text-slate-400 font-medium mt-1.5 tracking-wide">
                        {s.l}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Image */}
              <div className="relative aspect-[4/3] lg:aspect-[3/4] overflow-hidden bg-slate-100 border border-slate-200 group">
                <img
                  src="https://images.unsplash.com/photo-1590650516494-0c8e4a4dd67e?w=900&q=85"
                  alt="다인전기 현장"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="section bg-slate-50">
          <div className="wrapper">
            <p className="label mb-4">Core Values</p>
            <h2
              className="font-bold text-slate-900 tracking-tighter mb-12"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
            >
              핵심 가치
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-slate-200 divide-y md:divide-y-0 md:divide-x divide-slate-200">
              {VALUES.map((v) => (
                <div key={v.number} className="p-8">
                  <span className="block text-[11px] font-bold tracking-[0.15em] text-slate-300 mb-5">
                    {v.number}
                  </span>
                  <h3 className="font-bold text-slate-900 text-[20px] mb-3">
                    {v.title}
                  </h3>
                  <p className="text-[13px] text-slate-500 leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* History */}
        <section className="section bg-white">
          <div className="wrapper max-w-3xl">
            <p className="label mb-4">History</p>
            <h2
              className="font-bold text-slate-900 tracking-tighter mb-12"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
            >
              연혁
            </h2>
            <div className="relative flex flex-col gap-0">
              <div className="absolute left-[3.25rem] top-3 bottom-3 w-px bg-slate-200" />
              {MILESTONES.map((m) => (
                <div key={m.year} className="flex items-center gap-6 py-4">
                  <span className="font-bold text-[13px] text-slate-400 w-10 text-right flex-shrink-0">
                    {m.year}
                  </span>
                  <div className="relative z-10 w-2.5 h-2.5 rounded-full bg-slate-900 border-2 border-white shadow-sm flex-shrink-0" />
                  <span className="text-[14px] font-semibold text-slate-700">{m.event}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
