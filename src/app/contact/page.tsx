"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const WORK_TYPES = [
  "수변전 설비",
  "동력설비",
  "조명설비",
  "소방전기",
  "태양광",
  "약전설비",
  "가로등",
  "EV충전",
  "기타",
];

export default function ContactPage() {
  const [workType, setWorkType] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Header />
      <main className="pt-[60px] md:pt-[68px]">
        {/* Page header */}
        <div className="border-b border-slate-200 bg-slate-50">
          <div className="wrapper py-10 md:py-14">
            <p className="label mb-3">Contact</p>
            <h1
              className="font-bold text-slate-900 leading-tight tracking-tighter"
              style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
            >
              문의하기
            </h1>
            <p className="text-[14px] text-slate-500 mt-2">
              영업일 기준 1일 이내 답변 드립니다.
            </p>
          </div>
        </div>

        <div className="wrapper section">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
            {/* Left: Contact info */}
            <aside className="lg:col-span-2">
              <div className="flex flex-col gap-4">
                {[
                  {
                    label: "대표 전화",
                    value: "041-000-0000",
                    sub: "평일 09:00 – 18:00",
                    icon: (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    ),
                  },
                  {
                    label: "긴급 출동",
                    value: "010-0000-0000",
                    sub: "24시간 365일",
                    icon: (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    ),
                  },
                  {
                    label: "이메일",
                    value: "info@dain-elec.co.kr",
                    sub: "24시간 접수",
                    icon: (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    ),
                  },
                  {
                    label: "본사",
                    value: "충남 천안시 서북구",
                    sub: "성환읍 산단로 123번길 45",
                    icon: (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    ),
                  },
                ].map((info) => (
                  <div
                    key={info.label}
                    className="flex items-start gap-4 p-5 border border-slate-200"
                  >
                    <span className="text-slate-400 flex-shrink-0 mt-0.5">{info.icon}</span>
                    <div>
                      <div className="text-[11px] text-slate-400 font-medium mb-0.5">
                        {info.label}
                      </div>
                      <div className="text-[14px] font-bold text-slate-900">
                        {info.value}
                      </div>
                      <div className="text-[12px] text-slate-500">{info.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </aside>

            {/* Right: Form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <div className="text-center py-16 border border-slate-200">
                  <div className="w-12 h-12 bg-slate-900 flex items-center justify-center mx-auto mb-5">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-slate-900 text-[20px] mb-2">
                    문의 접수 완료
                  </h3>
                  <p className="text-[13px] text-slate-500 mb-6">
                    담당자가 빠른 시간 내에 연락드리겠습니다.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 bg-slate-900 text-white font-semibold text-[13px] hover:bg-slate-700 transition-colors"
                  >
                    다시 문의하기
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="border border-slate-200 p-6 md:p-8"
                >
                  <h2 className="font-bold text-slate-900 text-[16px] mb-6">
                    견적 및 문의 신청
                  </h2>

                  {/* Work type */}
                  <div className="mb-6">
                    <label className="block text-[12px] font-semibold text-slate-600 mb-2.5">
                      문의 분야
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {WORK_TYPES.map((t) => (
                        <button
                          type="button"
                          key={t}
                          onClick={() => setWorkType(t)}
                          className={`px-3.5 py-1.5 text-[12px] font-semibold border transition-all duration-150 ${
                            workType === t
                              ? "bg-slate-900 text-white border-slate-900"
                              : "bg-white text-slate-600 border-slate-200 hover:border-slate-500"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-[12px] font-semibold text-slate-600 mb-1.5">
                        성함 <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="홍길동"
                        className="w-full px-3.5 py-2.5 text-[13px] border border-slate-200 text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-slate-900 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[12px] font-semibold text-slate-600 mb-1.5">
                        연락처 <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="010-0000-0000"
                        className="w-full px-3.5 py-2.5 text-[13px] border border-slate-200 text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-slate-900 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[12px] font-semibold text-slate-600 mb-1.5">
                        회사명
                      </label>
                      <input
                        type="text"
                        placeholder="(주)예시건설"
                        className="w-full px-3.5 py-2.5 text-[13px] border border-slate-200 text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-slate-900 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[12px] font-semibold text-slate-600 mb-1.5">
                        이메일
                      </label>
                      <input
                        type="email"
                        placeholder="email@example.com"
                        className="w-full px-3.5 py-2.5 text-[13px] border border-slate-200 text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-slate-900 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="mb-5">
                    <label className="block text-[12px] font-semibold text-slate-600 mb-1.5">
                      문의 내용 <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="시공 규모, 위치, 일정 등 자세히 작성해주시면 정확한 견적이 가능합니다."
                      className="w-full px-3.5 py-2.5 text-[13px] border border-slate-200 text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-slate-900 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-slate-900 text-white font-bold text-[13px] hover:bg-slate-700 transition-colors duration-200"
                  >
                    문의 접수하기 →
                  </button>
                  <p className="text-[11px] text-slate-400 text-center mt-3">
                    영업일 기준 1일 이내 답변 드립니다.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
