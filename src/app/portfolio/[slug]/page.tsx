import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getPortfolioBySlug, getPortfolioSlugs } from "@/lib/queries";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://hansol-elec.co.kr";

// ── SEO: 동적 메타데이터 ──────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const slug = decodeURIComponent(params.slug);
  const p = await getPortfolioBySlug(slug);
  if (!p) return {};

  const title = `${p.region} ${p.category} 전기공사 시공사례`;
  const description = `${p.region} ${p.district} 지역 ${p.category} 전기공사 실제 시공 사례입니다. ${p.summary}`;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | 한솔전기`,
      description,
      images: [
        {
          url: p.coverImageUrl,
          width: 1200,
          height: 630,
          alt: p.title,
        },
      ],
      type: "article",
    },
    alternates: {
      canonical: `${SITE_URL}/portfolio/${p.slug.current}`,
    },
    keywords: [
      `${p.region} 전기공사`,
      `${p.district} 전기공사`,
      `${p.category}`,
      `전기공사업체`,
    ],
  };
}

// ── Static params for build ───────────────────────────────────────────────────
export async function generateStaticParams() {
  const slugs = await getPortfolioSlugs();
  return slugs.map((slug) => ({ slug }));
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default async function PortfolioDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = decodeURIComponent(params.slug);
  const p = await getPortfolioBySlug(slug);
  if (!p) notFound();

  const allImages =
    p.imageUrls && p.imageUrls.length > 0
      ? [p.coverImageUrl, ...p.imageUrls.filter((u) => u !== p.coverImageUrl)]
      : [p.coverImageUrl];

  const dateStr = new Date(p.publishedAt).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
  });

  return (
    <>
      <Header />
      <main className="pt-[60px] md:pt-[72px]">
        {/* Hero image */}
        <div className="relative w-full aspect-[16/9] md:aspect-[21/8] bg-[#111] overflow-hidden">
          <Image
            src={p.coverImageUrl}
            alt={p.title}
            fill
            priority
            className="object-cover opacity-90"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          {/* Breadcrumb */}
          <nav className="absolute top-5 left-0 right-0">
            <div className="wrapper">
              <ol className="flex items-center gap-2 text-[11px] text-white/50">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    홈
                  </Link>
                </li>
                <li>/</li>
                <li>
                  <Link
                    href="/portfolio"
                    className="hover:text-white transition-colors"
                  >
                    포트폴리오
                  </Link>
                </li>
                <li>/</li>
                <li className="text-white/80 truncate max-w-[200px]">
                  {p.title}
                </li>
              </ol>
            </div>
          </nav>
        </div>

        {/* Content */}
        <div className="wrapper py-12 md:py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
            {/* Main: title + gallery + description */}
            <div className="lg:col-span-2">
              {/* Meta tags */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="px-2.5 py-1 bg-[#F0F0F0] text-[#444] text-[11px] font-semibold rounded-full">
                  {p.category}
                </span>
                <span className="px-2.5 py-1 bg-[#F0F0F0] text-[#444] text-[11px] font-semibold rounded-full">
                  {p.region} {p.district}
                </span>
              </div>

              {/* Title */}
              <h1
                className="font-extrabold text-[#111] leading-tight mb-4"
                style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)" }}
              >
                {p.title}
              </h1>

              {/* Summary */}
              <p className="text-[15px] text-[#555] leading-relaxed border-l-2 border-[#E8E8E8] pl-4 mb-10">
                {p.summary}
              </p>

              {/* Image gallery */}
              {allImages.length > 1 && (
                <div>
                  <h2 className="font-bold text-[#111] text-[14px] mb-4 tracking-wide">
                    시공 사진
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {allImages.map((url, i) => (
                      <div
                        key={i}
                        className={`relative overflow-hidden bg-[#F0F0F0] rounded-sm ${
                          i === 0 ? "sm:col-span-2 aspect-[16/9]" : "aspect-[4/3]"
                        }`}
                      >
                        <Image
                          src={url}
                          alt={`${p.title} 시공 사진 ${i + 1}`}
                          fill
                          className="object-cover hover:scale-[1.02] transition-transform duration-500"
                          sizes="(max-width: 640px) 100vw, 50vw"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar: info + CTA */}
            <aside className="lg:col-span-1">
              <div className="sticky top-[88px]">
                {/* Info card */}
                <div className="border border-[#E8E8E8] rounded-sm p-5 mb-5">
                  <h3 className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#AAA] mb-4">
                    시공 정보
                  </h3>
                  <dl className="flex flex-col gap-3">
                    {[
                      { label: "공사명", value: p.title },
                      { label: "공사종류", value: p.category },
                      { label: "지역", value: `${p.region} ${p.district}` },
                      { label: "시공일", value: dateStr },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex flex-col gap-0.5">
                        <dt className="text-[11px] text-[#AAA] font-medium">{label}</dt>
                        <dd className="text-[13px] font-semibold text-[#111]">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                {/* CTA */}
                <div className="bg-[#111] rounded-sm p-5 text-center">
                  <p className="text-white/60 text-[12px] mb-1">이런 공사가 필요하신가요?</p>
                  <p className="text-white font-bold text-[15px] mb-4">
                    무료 견적 문의
                  </p>
                  <a
                    href="tel:041-000-0000"
                    className="flex items-center justify-center gap-1.5 w-full py-3 bg-white text-[#111] font-bold text-[13px] rounded-sm hover:bg-white/90 transition-colors duration-200 mb-2"
                  >
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    041-000-0000
                  </a>
                  <Link
                    href="/contact"
                    className="flex items-center justify-center w-full py-2.5 border border-white/20 text-white/70 font-medium text-[12px] rounded-sm hover:bg-white/5 transition-colors duration-200"
                  >
                    온라인 문의
                  </Link>
                </div>

                {/* Back link */}
                <Link
                  href="/portfolio"
                  className="flex items-center gap-1.5 mt-5 text-[12px] text-[#AAA] hover:text-[#111] transition-colors duration-200"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                  </svg>
                  포트폴리오 목록으로
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
