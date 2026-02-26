import type { Metadata } from "next";
import "./globals.css";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
