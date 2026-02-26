"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import PortfolioCard from "./PortfolioCard";
import SearchFilter from "./SearchFilter";
import type { Portfolio } from "@/lib/types";
import { motion } from "framer-motion";

interface Props {
  portfolios: Portfolio[];
}

export default function PortfolioList({ portfolios }: Props) {
  const searchParams = useSearchParams();
  const q = (searchParams.get("q") ?? "").toLowerCase().trim();
  const category = searchParams.get("category") ?? "";
  const region = searchParams.get("region") ?? "";

  // ── Client-side filter (300ms debounce is in SearchFilter) ──────────────
  const filtered = useMemo(() => {
    return portfolios.filter((p) => {
      const matchQ =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.district.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q);
      const matchCat = !category || p.category === category;
      const matchReg = !region || p.region === region;
      return matchQ && matchCat && matchReg;
    });
  }, [portfolios, q, category, region]);

  return (
    <div>
      <SearchFilter total={portfolios.length} filtered={filtered.length} />

      {filtered.length === 0 ? (
        <motion.div
          className="text-center py-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <svg
            className="w-10 h-10 text-[#DDD] mx-auto mb-4"
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
          <p className="text-[15px] font-semibold text-[#666] mb-1.5">
            검색 결과가 없습니다
          </p>
          <p className="text-[13px] text-[#AAA]">
            다른 키워드나 조건으로 다시 검색해보세요.
          </p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10">
          {filtered.map((p, i) => (
            <PortfolioCard key={p._id} portfolio={p} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
