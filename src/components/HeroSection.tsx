"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const STATS = [
  { value: "1,200+", label: "시공 완료" },
  { value: "20년+", label: "업계 경력" },
  { value: "전국", label: "서비스 지역" },
];

export default function HeroSection() {
  return (
    <section className="flex flex-col md:flex-row md:min-h-screen border-b border-slate-200">
      {/* Left: Content */}
      <div className="flex-1 bg-slate-50 flex flex-col justify-center px-5 sm:px-8 lg:px-12 xl:pl-20 xl:pr-16 pt-24 pb-16 md:pt-36 md:pb-24">
        <div className="max-w-xl">
          {/* Label */}
          <motion.div
            className="flex items-center gap-3 mb-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="w-6 h-px bg-slate-300" />
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-slate-400">
              전기공사 전문기업
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="font-bold text-slate-900 leading-[1.05] tracking-tighter mb-6"
            style={{ fontSize: "clamp(2.4rem, 6vw, 4.5rem)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            전기공사
            <br />
            시공 포트폴리오
          </motion.h1>

          <motion.p
            className="text-slate-500 text-[15px] leading-relaxed mb-10 max-w-sm"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            수변전 설비부터 태양광까지.
            <br />
            전국 시공 실적을 직접 확인하세요.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 mb-14"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-900 text-white font-semibold text-[13px] hover:bg-slate-700 transition-colors duration-200"
            >
              포트폴리오 보기
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-slate-300 text-slate-700 font-semibold text-[13px] hover:border-slate-900 hover:text-slate-900 transition-all duration-200"
            >
              무료 견적 문의
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="flex items-center gap-8 pt-8 border-t border-slate-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {STATS.map((stat) => (
              <div key={stat.label}>
                <div className="font-bold text-slate-900 text-[22px] leading-none tracking-tight">
                  {stat.value}
                </div>
                <div className="text-slate-400 text-[11px] font-medium mt-1 tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Right: Image */}
      <motion.div
        className="relative h-[60vw] md:h-auto md:w-[50%] lg:w-[52%] md:min-h-screen border-t md:border-t-0 md:border-l border-slate-200 group overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.3 }}
      >
        <Image
          src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1400&q=85"
          alt="전기공사 현장"
          fill
          priority
          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
          sizes="(max-width: 768px) 100vw, 52vw"
        />
      </motion.div>
    </section>
  );
}
