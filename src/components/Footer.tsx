import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#E8E8E8] bg-white">
      <div className="wrapper py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#111">
                <path d="M13 2L3 14h8l-2 8L21 10h-8L13 2z" />
              </svg>
              <span className="font-extrabold text-[16px] text-[#111]">다인전기</span>
            </div>
            <p className="text-[13px] text-[#888] leading-relaxed">
              신뢰와 기술로 완성하는
              <br />
              전기공사 전문기업
            </p>
            <a
              href="tel:041-000-0000"
              className="inline-flex items-center gap-1.5 mt-4 text-[13px] font-semibold text-[#111] hover:text-[#555] transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              041-000-0000
            </a>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#AAA] mb-4">
              Pages
            </h4>
            <ul className="flex flex-col gap-2.5">
              {[
                { label: "포트폴리오", href: "/portfolio" },
                { label: "회사소개", href: "/about" },
                { label: "문의하기", href: "/contact" },
                { label: "관리자", href: "/studio" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[13px] text-[#666] hover:text-[#111] transition-colors duration-150"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company info */}
          <div>
            <h4 className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#AAA] mb-4">
              Info
            </h4>
            <address className="not-italic flex flex-col gap-1.5">
              {[
                "충남 천안시 서북구 성환읍 산단로 123번길 45",
                "사업자등록번호: 000-00-00000",
                "대표: 홍길동",
                "E-mail: info@dain-elec.co.kr",
              ].map((line) => (
                <p key={line} className="text-[12px] text-[#888] leading-relaxed">
                  {line}
                </p>
              ))}
            </address>
          </div>
        </div>

        <div className="border-t border-[#F0F0F0] mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-[#BBB]">
            © {new Date().getFullYear()} 다인전기. All rights reserved.
          </p>
          <p className="text-[11px] text-[#DDD]">
            전기공사업 면허 보유 · ISO 9001 인증
          </p>
        </div>
      </div>
    </footer>
  );
}
