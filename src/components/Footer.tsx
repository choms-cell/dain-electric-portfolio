import Link from "next/link";

// TODO: 아래 정보를 실제 사업자 정보로 교체하세요
const COMPANY_INFO = {
  ceo: "홍길동",                         // TODO: 실제 대표자명
  bizNo: "000-00-00000",                 // TODO: 사업자등록번호
  elecLicenseNo: "제00000호",            // TODO: 전기공사업 등록번호
  address: "충남 천안시 서북구 성환읍 산단로 123번길 45", // TODO: 실제 주소
  phone: "041-000-0000",                 // TODO: 실제 전화번호
  email: "info@dain-elec.co.kr",         // TODO: 실제 이메일
};

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="wrapper py-6 md:py-8">
        {/* 상단: 브랜드 + 링크 */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-5 mb-5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-slate-900">
              <path d="M13 2L3 14h8l-2 8L21 10h-8L13 2z" />
            </svg>
            <span className="font-bold text-[14px] text-slate-900">다인전기</span>
          </div>

          <div className="flex items-center gap-5">
            {[
              { label: "포트폴리오", href: "/portfolio" },
              { label: "회사소개", href: "/about" },
              { label: "문의하기", href: "/contact" },
              { label: "관리자", href: "/studio" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[12px] text-slate-500 hover:text-slate-900 transition-colors duration-150"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* 하단: 법적 정보 + 저작권 */}
        <div className="flex flex-col md:flex-row justify-between gap-3">
          <div className="text-[11px] text-slate-400 leading-relaxed space-y-0.5">
            <p>
              대표: {COMPANY_INFO.ceo}&nbsp;&nbsp;|&nbsp;&nbsp;
              사업자등록번호: {COMPANY_INFO.bizNo}&nbsp;&nbsp;|&nbsp;&nbsp;
              전기공사업 등록: {COMPANY_INFO.elecLicenseNo}
            </p>
            <p>
              주소: {COMPANY_INFO.address}
            </p>
            <p>
              대표전화: {COMPANY_INFO.phone}&nbsp;&nbsp;|&nbsp;&nbsp;
              이메일: {COMPANY_INFO.email}
            </p>
          </div>
          <p className="text-[11px] text-slate-400 whitespace-nowrap self-end md:self-auto">
            © {new Date().getFullYear()} 다인전기. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
