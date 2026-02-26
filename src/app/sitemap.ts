import type { MetadataRoute } from "next";
import { getPortfolios } from "@/lib/queries";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://hansol-elec.co.kr";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const portfolios = await getPortfolios();

  const portfolioUrls: MetadataRoute.Sitemap = portfolios.map((p) => ({
    url: `${SITE_URL}/portfolio/${p.slug.current}`,
    lastModified: p.publishedAt,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/portfolio`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    ...portfolioUrls,
  ];
}
