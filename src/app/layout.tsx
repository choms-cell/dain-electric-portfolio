import type { Metadata } from "next";
import "./globals.css";
import FloatingCTA from "@/components/FloatingCTA";

const COMPANY = "다인전기";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hansol-elec.co.kr";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${COMPANY} | 전기공사 전문기업 시공 포트폴리오`,
    template: `%s | ${COMPANY}`,
  },
  description:
    "전국 전기공사 시공 포트폴리오. 수변전 설비, 동력설비, 태양광, 소방전기 등 다양한 전기공사 실적을 확인하세요.",
  keywords: ["전기공사", "전기공사업체", "수변전설비", "태양광공사", "전기시공"],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: COMPANY,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://hansol-elec.co.kr"}/#business`,
  name: "다인전기",
  description: "전국 전기공사 전문기업. 수변전 설비, 동력설비, 태양광, 소방전기 시공.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://hansol-elec.co.kr",
  telephone: "041-000-0000",
  email: "info@dain-elec.co.kr",
  address: {
    "@type": "PostalAddress",
    streetAddress: "성환읍 산단로 123번길 45",
    addressLocality: "천안시 서북구",
    addressRegion: "충청남도",
    addressCountry: "KR",
  },
  areaServed: "KR",
  priceRange: "$$",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
        <FloatingCTA />
      </body>
    </html>
  );
}
