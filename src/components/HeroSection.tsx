"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const CATEGORIES_QUICK = [
  "수변전 설비",
  "동력설비",
  "태양광",
  "소방전기",
  "조명설비",
];

const STATS = [
  { value: "1,200+", label: "시공 완료" },
  { value: "20년+", label: "업계 경력" },
  { value: "전국", label: "서비스 지역" },
];

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const router = useRouter();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/portfolio?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push("/portfolio");
    }
  };

  const handleQuickFilter = (cat: string) => {
    router.push(`/portfolio?category=${encodeURIComponent(cat)}`);
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-stretch overflow-hidden bg-[#0D0D0D]"
    >
      {/* ── Right: Image panel (full-bleed on mobile, right half on desktop) ── */}
      <motion.div
        className="absolute inset-0 md:left-[48%] overflow-hidden"
        style={{ y: imgY }}
      >
        <Image
          src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1400&q=85"
          alt="전기공사 현장"
          fill
          priority
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, 52vw"
        />
        {/* Mobile overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0D]/60 via-[#0D0D0D]/40 to-[#0D0D0D] md:hidden" />
        {/* Desktop left bleed */}
        <div className="hidden md:block absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0D0D0D] to-transparent" />
      </motion.div>

      {/* ── Left: Content ── */}
      <motion.div
        className="relative z-10 flex flex-col justify-end md:justify-center w-full md:w-[52%] min-h-screen pb-12 md:pb-0"
        style={{ y: contentY, opacity }}
      >
        <div className="wrapper md:pl-12 lg:pl-16 xl:pl-20">
          {/* Label */}
          <motion.div
            className="flex items-center gap-3 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <span className="w-6 h-px bg-white/40" />
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white/50">
              Portfolio
            </span>
          </motion.div>

          {/* Headline */}
          <div className="overflow-hidden mb-3">
            <motion.h1
              className="font-extrabold text-white leading-[1.0] tracking-tight"
              style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)" }}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              전기공사
              <br />
              시공 포트폴리오
            </motion.h1>
          </div>

          <motion.p
            className="text-white/50 text-[14px] md:text-[15px] leading-relaxed mb-10 max-w-sm"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            수변전 설비부터 태양광까지.
            <br />
            전국 시공 실적을 직접 확인하세요.
          </motion.p>

          {/* Search */}
          <motion.form
            onSubmit={handleSearch}
            className="relative mb-5"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <div className="flex items-center bg-white rounded-sm overflow-hidden shadow-xl shadow-black/20">
              <svg
                className="w-4 h-4 text-[#AAA] ml-4 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="공사명 또는 공사종류 검색..."
                className="flex-1 px-3 py-4 text-[14px] text-[#111] placeholder:text-[#AAA] bg-transparent focus:outline-none"
              />
              <button
                type="submit"
                className="px-5 py-4 bg-[#111] text-white text-[13px] font-bold hover:bg-[#333] transition-colors duration-200 flex-shrink-0"
              >
                검색
              </button>
            </div>
          </motion.form>

          {/* Quick category filters */}
          <motion.div
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75 }}
          >
            {CATEGORIES_QUICK.map((cat) => (
              <button
                key={cat}
                onClick={() => handleQuickFilter(cat)}
                className="px-3.5 py-1.5 bg-white/10 text-white/70 text-[12px] font-medium rounded-full border border-white/15 hover:bg-white/20 hover:text-white hover:border-white/30 transition-all duration-200"
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            className="flex items-center gap-6 md:gap-8 mt-12 pt-8 border-t border-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 1.0 }}
          >
            {STATS.map((stat) => (
              <div key={stat.label}>
                <div className="text-white font-extrabold text-[22px] md:text-[26px] leading-none tracking-tight">
                  {stat.value}
                </div>
                <div className="text-white/40 text-[11px] font-medium mt-1 tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{ opacity }}
      >
        <motion.div
          className="w-px h-10 bg-white/20"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "top" }}
        />
        <span className="text-[10px] text-white/30 tracking-[0.15em] uppercase">
          Scroll
        </span>
      </motion.div>
    </section>
  );
}
