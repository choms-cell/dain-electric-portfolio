"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV = [
  { label: "포트폴리오", href: "/portfolio" },
  { label: "회사소개", href: "/about" },
  { label: "문의하기", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="wrapper flex items-center justify-between h-[60px] md:h-[68px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-slate-900">
              <path d="M13 2L3 14h8l-2 8L21 10h-8L13 2z" />
            </svg>
            <span className="font-bold text-[16px] text-slate-900 tracking-tight">다인전기</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-[13px] font-medium transition-colors duration-200 ${
                  pathname.startsWith(item.href)
                    ? "text-slate-900"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <a
              href="tel:041-000-0000"
              className="hidden md:inline-flex items-center gap-1.5 text-[12px] font-bold px-4 py-2 border border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white transition-all duration-200"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              041-000-0000
            </a>

            {/* Hamburger */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden flex flex-col justify-center gap-[5px] p-1 text-slate-900"
              aria-label="메뉴"
            >
              <span className={`block w-6 h-px bg-current transition-all duration-300 ${open ? "rotate-45 translate-y-[6px]" : ""}`} />
              <span className={`block h-px bg-current transition-all duration-200 ${open ? "opacity-0 w-3" : "w-4"}`} />
              <span className={`block w-6 h-px bg-current transition-all duration-300 ${open ? "-rotate-45 -translate-y-[6px]" : ""}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute inset-0 bg-slate-900/30" onClick={() => setOpen(false)} />
            <motion.nav
              className="absolute right-0 top-0 bottom-0 w-[75vw] max-w-[300px] bg-white flex flex-col border-l border-slate-200"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            >
              <div className="flex flex-col gap-0 px-6 pt-20">
                {NAV.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className="flex items-center justify-between py-4 border-b border-slate-100 text-[15px] font-semibold text-slate-900"
                    >
                      {item.label}
                      <svg className="w-4 h-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </motion.div>
                ))}
              </div>
              <div className="mt-auto px-6 pb-10">
                <a
                  href="tel:041-000-0000"
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-slate-900 text-white font-semibold text-sm"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  041-000-0000
                </a>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
