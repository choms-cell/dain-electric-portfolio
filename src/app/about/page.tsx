import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";

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
                <Image
                  src="https://images.unsplash.com/photo-1590650516494-0c8e4a4dd67e?w=900&q=85"
                  alt="다인전기 현장"
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
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

        {/* Certifications */}
        <section className="section bg-slate-50">
          <div className="wrapper">
            <p className="label mb-4">Certifications</p>
            <h2
              className="font-bold text-slate-900 tracking-tighter mb-10"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
            >
              인증 및 면허
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {
                  icon: (
                    <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2}
                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  ),
                  title: "전기공사업 1종",
                  sub: "면허 등록",
                },
                {
                  icon: (
                    <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2}
                        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  ),
                  title: "ISO 9001",
                  sub: "품질경영시스템",
                },
                {
                  icon: (
                    <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  ),
                  title: "전기기사 14명",
                  sub: "국가공인 자격보유",
                },
                {
                  icon: (
                    <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2}
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  ),
                  title: "장관 표창",
                  sub: "산업통상자원부 2020",
                },
              ].map((cert) => (
                <div
                  key={cert.title}
                  className="flex flex-col items-center text-center p-6 bg-white border border-slate-200 gap-3"
                >
                  <div className="w-16 h-16 border border-slate-200 flex items-center justify-center">
                    {cert.icon}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-[14px]">{cert.title}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{cert.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
