import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export function isSanityConfigured(): boolean {
  const id = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  return Boolean(id && id !== "" && id !== "your_project_id");
}

// Lazy initialization — avoids projectId validation error when not configured
let _client: ReturnType<typeof createClient> | null = null;

export function getSanityClient() {
  if (_client) return _client;
  _client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    apiVersion: "2024-01-01",
    useCdn: true,
  });
  return _client;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  return imageUrlBuilder(getSanityClient()).image(source);
}
