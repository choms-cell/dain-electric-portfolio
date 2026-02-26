"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

const NAV = [
  { label: "포트폴리오", href: "/portfolio" },
  { label: "회사소개", href: "/about" },
  { label: "문의하기", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const isHome = pathname === "/";
  const transparent = isHome && !scrolled;

  return (
    <>
      <header
        className={clsx(
          "fixed top-0 inset-x-0 z-50 border-b transition-colors duration-300",
          transparent
            ? "bg-transparent border-transparent"
            : "bg-white/95 shadow-sm border-[#E8E8E8]"
        )}
      >
        <div className="wrapper flex items-center justify-between h-[60px] md:h-[72px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div
              className={clsx(
                "w-7 h-7 flex items-center justify-center transition-colors duration-300",
                transparent ? "text-white" : "text-[#111]"
              )}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13 2L3 14h8l-2 8L21 10h-8L13 2z" />
              </svg>
            </div>
            <div>
              <span
                className={clsx(
                  "block font-extrabold text-[17px] leading-none tracking-tight transition-colors duration-300",
                  transparent ? "text-white" : "text-[#111]"
                )}
              >
                다인전기
              </span>
              <span
                className={clsx(
                  "block text-[9px] font-medium tracking-[0.18em] uppercase leading-none mt-0.5 transition-colors duration-300",
                  transparent ? "text-white/50" : "text-[#AAA]"
                )}
              >
                Electric Co.
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "relative text-[13px] font-medium tracking-wide group transition-colors duration-200",
                  transparent
                    ? pathname.startsWith(item.href)
                      ? "text-white"
                      : "text-white/70 hover:text-white"
                    : pathname.startsWith(item.href)
                    ? "text-[#111]"
                    : "text-[#666] hover:text-[#111]"
                )}
              >
                {item.label}
                <span
                  className={clsx(
                    "absolute -bottom-0.5 left-0 h-px transition-all duration-300",
                    pathname.startsWith(item.href)
                      ? "w-full"
                      : "w-0 group-hover:w-full",
                    transparent ? "bg-white" : "bg-[#111]"
                  )}
                />
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <a
              href="tel:041-000-0000"
              className={clsx(
                "hidden md:inline-flex items-center gap-1.5 text-[12px] font-bold px-4 py-2 rounded-sm transition-all duration-200",
                transparent
                  ? "bg-white text-[#111] hover:bg-white/90"
                  : "bg-[#111] text-white hover:bg-[#333]"
              )}
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              041-000-0000
            </a>

            {/* Hamburger */}
            <button
              onClick={() => setOpen(!open)}
              className={clsx(
                "md:hidden flex flex-col justify-center gap-[5px] p-1",
                transparent && !open ? "text-white" : "text-[#111]"
              )}
              aria-label="메뉴"
            >
              <span
                className={clsx(
                  "block w-6 h-px bg-current transition-all duration-300",
                  open && "rotate-45 translate-y-[6px]"
                )}
              />
              <span
                className={clsx(
                  "block h-px bg-current transition-all duration-200",
                  open ? "opacity-0 w-3" : "w-4"
                )}
              />
              <span
                className={clsx(
                  "block w-6 h-px bg-current transition-all duration-300",
                  open && "-rotate-45 -translate-y-[6px]"
                )}
              />
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
            <div
              className="absolute inset-0 bg-black/30"
              onClick={() => setOpen(false)}
            />
            <motion.nav
              className="absolute right-0 top-0 bottom-0 w-[75vw] max-w-[300px] bg-white flex flex-col"
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
                      className="flex items-center justify-between py-4 border-b border-[#F0F0F0] text-[15px] font-semibold text-[#111]"
                    >
                      {item.label}
                      <svg
                        className="w-4 h-4 text-[#CCC]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </motion.div>
                ))}
              </div>
              <div className="mt-auto px-6 pb-10">
                <a
                  href="tel:041-000-0000"
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#111] text-white font-semibold text-sm rounded-sm"
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
