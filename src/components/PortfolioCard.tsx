"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Portfolio } from "@/lib/types";

interface Props {
  portfolio: Portfolio;
  index?: number;
}

export default function PortfolioCard({ portfolio, index = 0 }: Props) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={`/portfolio/${portfolio.slug.current}`} className="group block">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 border border-slate-200">
          <Image
            src={portfolio.coverImageUrl}
            alt={portfolio.title}
            fill
            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>

        {/* Info */}
        <div className="pt-4 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-slate-400 mb-1.5">
              {portfolio.category}
            </p>
            <h3 className="font-bold text-[14px] text-slate-900 leading-snug line-clamp-2 group-hover:text-slate-600 transition-colors duration-200">
              {portfolio.title}
            </h3>
            <p className="text-[12px] text-slate-400 mt-1.5">
              {portfolio.region} {portfolio.district} · {new Date(portfolio.publishedAt).getFullYear()}
            </p>
          </div>
          {/* Arrow up-right */}
          <svg
            className="w-4 h-4 text-slate-300 group-hover:text-slate-700 flex-shrink-0 mt-1 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </div>
      </Link>
    </motion.article>
  );
}
