"use client";

import { useState } from "react";

const CATEGORIES = [
  "수변전 설비",
  "동력설비",
  "조명설비",
  "소방전기",
  "태양광",
  "약전설비",
  "가로등",
  "EV충전",
  "기타",
] as const;

const SCALES = [
  {
    id: "small",
    label: "소규모",
    desc: "단독주택 · 소형 사무실 · 소형 상가",
  },
  {
    id: "medium",
    label: "중규모",
    desc: "아파트 단지 · 중형 상가 · 소형 공장",
  },
  {
    id: "large",
    label: "대규모",
    desc: "대형 공장 · 물류센터 · 대형 빌딩",
  },
] as const;

type Scale = "small" | "medium" | "large";

// [최소, 최대] (단위: 만원)
const PRICE_TABLE: Record<string, Record<Scale, [number, number]>> = {
  "수변전 설비": { small: [500, 1500], medium: [1500, 5000], large: [5000, 15000] },
  "동력설비":   { small: [300, 800],  medium: [800, 2500],  large: [2500, 8000] },
  "조명설비":   { small: [100, 300],  medium: [300, 800],   large: [800, 3000] },
  "소방전기":   { small: [200, 600],  medium: [600, 2000],  large: [2000, 6000] },
  "태양광":     { small: [1000, 3000], medium: [3000, 8000], large: [8000, 20000] },
  "약전설비":   { small: [100, 400],  medium: [400, 1500],  large: [1500, 5000] },
  "가로등":     { small: [200, 600],  medium: [600, 2000],  large: [2000, 7000] },
  "EV충전":     { small: [500, 1500], medium: [1500, 4000], large: [4000, 12000] },
  "기타":       { small: [100, 500],  medium: [500, 1500],  large: [1500, 5000] },
};

function formatPrice(val: number): string {
  if (val >= 10000) {
    const eok = val / 10000;
    return eok % 1 === 0 ? `${eok}억` : `${eok.toFixed(1)}억`;
  }
  return `${val.toLocaleString()}만`;
}

export default function EstimateCalculator() {
  const [category, setCategory] = useState<string | null>(null);
  const [scale, setScale] = useState<Scale | null>(null);

  const result =
    category && scale ? PRICE_TABLE[category]?.[scale] : null;

  const step = !category ? 1 : !scale ? 2 : 3;

  return (
    <div className="border border-slate-200 bg-white">
      {/* Header */}
      <div className="px-6 py-5 border-b border-slate-200">
        <p className="label mb-1">Estimate</p>
        <h2 className="font-bold text-slate-900 text-[18px]">간단 견적 계산기</h2>
        <p className="text-[12px] text-slate-400 mt-1">
          공사 종류와 규모를 선택하면 예상 견적 범위를 확인하실 수 있습니다.
        </p>
      </div>

      <div className="p-6 md:p-8 flex flex-col gap-8">
        {/* Step 1: Category */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span
              className={`w-5 h-5 flex items-center justify-center text-[10px] font-bold ${
                step >= 1 ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-400"
              }`}
            >
              1
            </span>
            <span className="text-[12px] font-bold text-slate-700 tracking-wide uppercase">
              공사 종류 선택
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => { setCategory(c); setScale(null); }}
                className={`px-3.5 py-1.5 text-[12px] font-semibold border transition-all duration-150 ${
                  category === c
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-500"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Scale */}
        <div className={category ? "" : "opacity-40 pointer-events-none"}>
          <div className="flex items-center gap-2 mb-4">
            <span
              className={`w-5 h-5 flex items-center justify-center text-[10px] font-bold ${
                step >= 2 ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-400"
              }`}
            >
              2
            </span>
            <span className="text-[12px] font-bold text-slate-700 tracking-wide uppercase">
              시공 규모 선택
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {SCALES.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setScale(s.id)}
                className={`p-4 text-left border transition-all duration-150 ${
                  scale === s.id
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-white border-slate-200 hover:border-slate-500"
                }`}
              >
                <span
                  className={`block font-bold text-[14px] mb-1 ${
                    scale === s.id ? "text-white" : "text-slate-900"
                  }`}
                >
                  {s.label}
                </span>
                <span
                  className={`block text-[11px] leading-relaxed ${
                    scale === s.id ? "text-white/70" : "text-slate-500"
                  }`}
                >
                  {s.desc}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Step 3: Result */}
        {result ? (
          <div className="bg-slate-50 border border-slate-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-5 h-5 flex items-center justify-center text-[10px] font-bold bg-slate-900 text-white">
                3
              </span>
              <span className="text-[12px] font-bold text-slate-700 tracking-wide uppercase">
                예상 견적 범위
              </span>
            </div>

            <div className="mb-1 text-[11px] text-slate-500">
              {category} · {SCALES.find((s) => s.id === scale)?.label}
            </div>
            <div className="font-bold text-slate-900" style={{ fontSize: "clamp(1.5rem, 4vw, 2.25rem)" }}>
              {formatPrice(result[0])}원 ~ {formatPrice(result[1])}원
            </div>

            <p className="text-[11px] text-slate-400 mt-4 leading-relaxed">
              * 위 금액은 참고용 예상 범위이며, 현장 상황·자재 사양·시공 난이도에 따라
              크게 달라질 수 있습니다. 정확한 견적은 현장 방문 후 제공됩니다.
            </p>

            <div className="mt-5 pt-5 border-t border-slate-200 flex flex-col sm:flex-row gap-3">
              <a
                href="tel:041-000-0000"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-slate-900 text-white font-bold text-[13px] hover:bg-slate-700 transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                전화 상담
              </a>
              <button
                type="button"
                onClick={() => { setCategory(null); setScale(null); }}
                className="px-5 py-3 border border-slate-200 text-slate-600 font-semibold text-[13px] hover:border-slate-400 transition-colors"
              >
                다시 계산하기
              </button>
            </div>
          </div>
        ) : (
          <div
            className={`border border-dashed border-slate-200 p-6 text-center ${
              !category ? "opacity-30" : ""
            }`}
          >
            <p className="text-[13px] text-slate-400">
              {!category
                ? "공사 종류를 먼저 선택해주세요"
                : "시공 규모를 선택하면 예상 견적이 표시됩니다"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
