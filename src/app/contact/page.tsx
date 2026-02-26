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
      <main className="pt-[60px] md:pt-[72px]">
        {/* Header */}
        <div className="border-b border-[#E8E8E8]">
          <div className="wrapper py-10 md:py-14">
            <p className="label mb-3">Contact</p>
            <h1
              className="font-extrabold text-[#111] leading-tight"
              style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
            >
              문의하기
            </h1>
            <p className="text-[14px] text-[#888] mt-2">
              영업일 기준 1일 이내 답변 드립니다.
            </p>
          </div>
        </div>

        <div className="wrapper section">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
            {/* Left: Contact info */}
            <aside className="lg:col-span-2">
              <div className="flex flex-col gap-5">
                {[
                  {
                    icon: "📞",
                    label: "대표 전화",
                    value: "041-000-0000",
                    sub: "평일 09:00 – 18:00",
                  },
                  {
                    icon: "📱",
                    label: "긴급 출동",
                    value: "010-0000-0000",
                    sub: "24시간 365일",
                  },
                  {
                    icon: "✉️",
                    label: "이메일",
                    value: "info@hansol-elec.co.kr",
                    sub: "24시간 접수",
                  },
                  {
                    icon: "📍",
                    label: "본사",
                    value: "충남 천안시 서북구",
                    sub: "성환읍 산단로 123번길 45",
                  },
                ].map((info) => (
                  <div
                    key={info.label}
                    className="flex items-start gap-4 p-4 border border-[#E8E8E8] rounded-sm"
                  >
                    <span className="text-xl flex-shrink-0 w-8 text-center">
                      {info.icon}
                    </span>
                    <div>
                      <div className="text-[11px] text-[#AAA] font-medium mb-0.5">
                        {info.label}
                      </div>
                      <div className="text-[14px] font-bold text-[#111]">
                        {info.value}
                      </div>
                      <div className="text-[12px] text-[#888]">{info.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </aside>

            {/* Right: Form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <div className="text-center py-16 border border-[#E8E8E8] rounded-sm">
                  <div className="text-4xl mb-4">✅</div>
                  <h3 className="font-extrabold text-[#111] text-[20px] mb-2">
                    문의 접수 완료
                  </h3>
                  <p className="text-[13px] text-[#888] mb-6">
                    담당자가 빠른 시간 내에 연락드리겠습니다.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 bg-[#111] text-white font-semibold text-[13px] rounded-sm hover:bg-[#333] transition-colors"
                  >
                    다시 문의하기
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="border border-[#E8E8E8] rounded-sm p-6 md:p-8"
                >
                  <h2 className="font-bold text-[#111] text-[16px] mb-6">
                    견적 및 문의 신청
                  </h2>

                  {/* Work type */}
                  <div className="mb-6">
                    <label className="block text-[12px] font-semibold text-[#444] mb-2.5">
                      문의 분야
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {WORK_TYPES.map((t) => (
                        <button
                          type="button"
                          key={t}
                          onClick={() => setWorkType(t)}
                          className={`px-3.5 py-1.5 text-[12px] font-semibold rounded-full border transition-all duration-150 ${
                            workType === t
                              ? "bg-[#111] text-white border-[#111]"
                              : "bg-white text-[#666] border-[#E8E8E8] hover:border-[#AAA]"
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
                      <label className="block text-[12px] font-semibold text-[#444] mb-1.5">
                        성함 <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="홍길동"
                        className="w-full px-3.5 py-2.5 text-[13px] border border-[#E8E8E8] rounded-sm text-[#111] placeholder:text-[#CCC] focus:outline-none focus:border-[#111] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[12px] font-semibold text-[#444] mb-1.5">
                        연락처 <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="010-0000-0000"
                        className="w-full px-3.5 py-2.5 text-[13px] border border-[#E8E8E8] rounded-sm text-[#111] placeholder:text-[#CCC] focus:outline-none focus:border-[#111] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[12px] font-semibold text-[#444] mb-1.5">
                        회사명
                      </label>
                      <input
                        type="text"
                        placeholder="(주)예시건설"
                        className="w-full px-3.5 py-2.5 text-[13px] border border-[#E8E8E8] rounded-sm text-[#111] placeholder:text-[#CCC] focus:outline-none focus:border-[#111] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[12px] font-semibold text-[#444] mb-1.5">
                        이메일
                      </label>
                      <input
                        type="email"
                        placeholder="email@example.com"
                        className="w-full px-3.5 py-2.5 text-[13px] border border-[#E8E8E8] rounded-sm text-[#111] placeholder:text-[#CCC] focus:outline-none focus:border-[#111] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="mb-5">
                    <label className="block text-[12px] font-semibold text-[#444] mb-1.5">
                      문의 내용 <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="시공 규모, 위치, 일정 등 자세히 작성해주시면 정확한 견적이 가능합니다."
                      className="w-full px-3.5 py-2.5 text-[13px] border border-[#E8E8E8] rounded-sm text-[#111] placeholder:text-[#CCC] focus:outline-none focus:border-[#111] transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#111] text-white font-bold text-[13px] rounded-sm hover:bg-[#333] transition-colors duration-200"
                  >
                    문의 접수하기 →
                  </button>
                  <p className="text-[11px] text-[#CCC] text-center mt-3">
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
