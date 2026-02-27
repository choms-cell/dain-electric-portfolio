"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "견적은 어떻게 받을 수 있나요?",
    a: "온라인 문의 또는 대표 전화로 연락 주시면 담당자가 현장을 방문하여 무료로 견적을 제공해드립니다. 영업일 기준 1일 이내에 연락 드립니다.",
  },
  {
    q: "공사 기간은 얼마나 걸리나요?",
    a: "공사 규모와 현장 상황에 따라 다르지만, 소규모 조명·동력 공사는 1~3일, 수변전 설비나 대형 현장은 1~4주 내외로 진행됩니다. 착공 전 상세 일정을 안내해드립니다.",
  },
  {
    q: "전국 어디든 시공이 가능한가요?",
    a: "네, 전국 전 지역 출장 시공이 가능합니다. 출장비는 현장 위치와 규모에 따라 달라지며, 견적 시 함께 안내해드립니다.",
  },
  {
    q: "시공 후 AS(사후관리)는 어떻게 되나요?",
    a: "시공 완료 후 1년간 무상 AS를 제공합니다. 전기 설비 특성상 긴급 출동이 필요한 경우 24시간 대응합니다.",
  },
  {
    q: "어떤 자격과 면허를 보유하고 있나요?",
    a: "전기공사업 1종 면허를 보유하고 있으며, 국가공인 전기기사·전기공사산업기사 다수를 포함한 전문 기술진이 직접 시공합니다. ISO 9001 인증도 획득하였습니다.",
  },
  {
    q: "태양광 시공 후 유지보수도 해주나요?",
    a: "네, 설계·시공·O&M(운영·유지관리)까지 원스톱으로 제공합니다. 정기 점검 계약 및 모니터링 서비스도 별도로 가능합니다.",
  },
  {
    q: "세금계산서 발행이 가능한가요?",
    a: "물론입니다. 법인사업자 및 개인사업자 모두 세금계산서 발행이 가능합니다. 현금영수증도 발행 가능합니다.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="section bg-slate-50">
      <div className="wrapper">
        <p className="label mb-4">FAQ</p>
        <h2
          className="font-bold text-slate-900 tracking-tighter mb-10"
          style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
        >
          자주 묻는 질문
        </h2>

        <div className="max-w-3xl divide-y divide-slate-200 border-t border-slate-200">
          {FAQS.map((faq, i) => (
            <div key={i}>
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 py-5 text-left group"
              >
                <span className="text-[14px] font-semibold text-slate-800 group-hover:text-slate-900 transition-colors">
                  {faq.q}
                </span>
                <span
                  className={`flex-shrink-0 w-5 h-5 text-slate-400 transition-transform duration-200 ${
                    open === i ? "rotate-45" : "rotate-0"
                  }`}
                >
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </span>
              </button>

              {open === i && (
                <div className="pb-5 -mt-1">
                  <p className="text-[13px] text-slate-500 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
