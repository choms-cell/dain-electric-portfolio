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
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={`/portfolio/${portfolio.slug.current}`} className="group block">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-[#F0F0F0] rounded-sm">
          <Image
            src={portfolio.coverImageUrl}
            alt={portfolio.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* Desktop hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/55 transition-all duration-400 hidden md:flex flex-col justify-end p-5">
            <div className="translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-75">
              <p className="text-white/70 text-[11px] font-semibold tracking-[0.12em] uppercase mb-1.5">
                {portfolio.category} · {portfolio.region} {portfolio.district}
              </p>
              <h3 className="text-white font-bold text-[15px] leading-snug">
                {portfolio.title}
              </h3>
            </div>
          </div>

          {/* Category badge */}
          <div className="absolute top-3 left-3 md:opacity-100 md:group-hover:opacity-0 transition-opacity duration-200">
            <span className="inline-block px-2.5 py-1 bg-black/60 text-white text-[10px] font-semibold backdrop-blur-sm rounded-full">
              {portfolio.category}
            </span>
          </div>
        </div>

        {/* Mobile / always-visible info */}
        <div className="pt-3 md:pt-3.5">
          <h3 className="font-semibold text-[14px] text-[#111] leading-snug group-hover:text-[#555] transition-colors duration-200 line-clamp-1">
            {portfolio.title}
          </h3>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-[11px] text-[#AAA]">
              {portfolio.region} {portfolio.district}
            </span>
            <span className="w-0.5 h-0.5 rounded-full bg-[#DDD]" />
            <span className="text-[11px] text-[#AAA]">
              {new Date(portfolio.publishedAt).getFullYear()}
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
