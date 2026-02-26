import { getSanityClient, isSanityConfigured } from "./sanity";
import { mockPortfolios } from "./mockData";
import type { Portfolio } from "./types";

// ─── GROQ Queries ────────────────────────────────────────────────────────────

export const portfoliosQuery = `
  *[_type == "portfolio"] | order(publishedAt desc) {
    _id,
    title,
    summary,
    region,
    district,
    category,
    "coverImageUrl": coverImage.asset->url,
    slug,
    publishedAt
  }
`;

export const portfolioBySlugQuery = `
  *[_type == "portfolio" && slug.current == $slug][0] {
    _id,
    title,
    summary,
    region,
    district,
    category,
    "coverImageUrl": coverImage.asset->url,
    "imageUrls": images[].asset->url,
    slug,
    publishedAt
  }
`;

export const portfolioSlugsQuery = `
  *[_type == "portfolio"] { "slug": slug.current }
`;

// ─── Data Fetchers (Sanity → fallback to mock) ───────────────────────────────

export async function getPortfolios(): Promise<Portfolio[]> {
  if (!isSanityConfigured()) return mockPortfolios;
  try {
    return await getSanityClient().fetch(portfoliosQuery);
  } catch {
    return mockPortfolios;
  }
}

export async function getPortfolioBySlug(
  slug: string
): Promise<Portfolio | null> {
  if (!isSanityConfigured()) {
    return mockPortfolios.find((p) => p.slug.current === slug) ?? null;
  }
  try {
    return await getSanityClient().fetch(portfolioBySlugQuery, { slug });
  } catch {
    return mockPortfolios.find((p) => p.slug.current === slug) ?? null;
  }
}

export async function getPortfolioSlugs(): Promise<string[]> {
  if (!isSanityConfigured()) {
    return mockPortfolios.map((p) => p.slug.current);
  }
  try {
    const data = await getSanityClient().fetch(portfolioSlugsQuery);
    return data.map((d: { slug: string }) => d.slug);
  } catch {
    return mockPortfolios.map((p) => p.slug.current);
  }
}
