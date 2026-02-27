"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// TODO: 실제 전화번호로 교체
const PHONE = "041-000-0000";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div
      className={`fixed bottom-5 right-4 z-50 flex flex-col gap-2 md:hidden transition-all duration-300 ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-3 pointer-events-none"
      }`}
    >
      {/* 문의하기 버튼 */}
      <Link
        href="/contact"
        className="flex items-center justify-center w-12 h-12 bg-slate-100 border border-slate-300 text-slate-700 shadow-md hover:bg-slate-200 transition-colors"
        aria-label="온라인 문의"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
      </Link>

      {/* 전화 버튼 */}
      <a
        href={`tel:${PHONE}`}
        className="flex items-center justify-center w-12 h-12 bg-slate-900 text-white shadow-lg hover:bg-slate-700 transition-colors"
        aria-label="전화 문의"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
        </svg>
      </a>
    </div>
  );
}
