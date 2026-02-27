import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hansol-elec.co.kr";

export const metadata: Metadata = {
  title: "문의하기",
  description:
    "전기공사 무료 견적 및 시공 문의. 수변전 설비, 태양광, 소방전기 등 영업일 기준 1일 이내 답변 드립니다.",
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
