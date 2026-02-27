import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="wrapper py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-slate-900">
              <path d="M13 2L3 14h8l-2 8L21 10h-8L13 2z" />
            </svg>
            <span className="font-bold text-[14px] text-slate-900">다인전기</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
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

          {/* Copyright */}
          <p className="text-[11px] text-slate-400">
            © {new Date().getFullYear()} 다인전기. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
