"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";
import { CATEGORIES, REGIONS } from "@/lib/types";
import clsx from "clsx";

interface SearchFilterProps {
  total: number;
  filtered: number;
}

export default function SearchFilter({ total, filtered }: SearchFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [inputValue, setInputValue] = useState(searchParams.get("q") ?? "");
  const [category, setCategory] = useState(searchParams.get("category") ?? "");
  const [region, setRegion] = useState(searchParams.get("region") ?? "");

  const [debouncedQuery] = useDebounce(inputValue, 300);

  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedQuery) params.set("q", debouncedQuery);
    if (category) params.set("category", category);
    if (region) params.set("region", region);
    const qs = params.toString();
    router.replace(qs ? `/portfolio?${qs}` : "/portfolio", { scroll: false });
  }, [debouncedQuery, category, region, router]);

  const clearAll = () => {
    setInputValue("");
    setCategory("");
    setRegion("");
  };

  const hasFilters = inputValue || category || region;

  return (
    <div className="mb-8 md:mb-12">
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search input */}
        <div className="relative flex-1">
          <svg
            className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="공사명 또는 공사종류 검색..."
            className="w-full pl-10 pr-10 py-3 text-[13px] border border-slate-200 bg-white text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-slate-900 transition-colors duration-200"
          />
          {inputValue && (
            <button
              onClick={() => setInputValue("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-700 transition-colors"
              aria-label="검색어 지우기"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Category dropdown */}
        <div className="relative">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={clsx(
              "appearance-none w-full sm:w-[160px] pl-3.5 pr-8 py-3 text-[13px] border bg-white cursor-pointer focus:outline-none transition-all duration-200",
              category
                ? "border-slate-900 text-slate-900 font-semibold"
                : "border-slate-200 text-slate-400 focus:border-slate-900"
            )}
          >
            <option value="">공사종류 전체</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-300 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {/* Region dropdown */}
        <div className="relative">
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className={clsx(
              "appearance-none w-full sm:w-[140px] pl-3.5 pr-8 py-3 text-[13px] border bg-white cursor-pointer focus:outline-none transition-all duration-200",
              region
                ? "border-slate-900 text-slate-900 font-semibold"
                : "border-slate-200 text-slate-400 focus:border-slate-900"
            )}
          >
            <option value="">지역 전체</option>
            {REGIONS.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
          <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-300 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Result count + clear */}
      <div className="flex items-center justify-between mt-4">
        <p className="text-[12px] text-slate-400">
          {hasFilters ? (
            <>
              <span className="text-slate-900 font-semibold">{filtered}</span>
              <span>/{total}건</span>
            </>
          ) : (
            <span>전체 {total}건</span>
          )}
        </p>
        {hasFilters && (
          <button
            onClick={clearAll}
            className="text-[11px] text-slate-400 hover:text-slate-900 underline underline-offset-2 transition-colors duration-150"
          >
            필터 초기화
          </button>
        )}
      </div>
    </div>
  );
}
