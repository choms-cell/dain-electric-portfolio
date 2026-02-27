export interface Portfolio {
  _id: string;
  title: string;
  summary: string;
  region: string;
  district: string;
  category: string;
  coverImageUrl: string;
  imageUrls?: string[];
  beforeImageUrl?: string;
  slug: { current: string };
  publishedAt: string;
}

export const CATEGORIES = [
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

export const REGIONS = [
  "서울",
  "경기",
  "인천",
  "부산",
  "대구",
  "광주",
  "대전",
  "울산",
  "세종",
  "강원",
  "충북",
  "충남",
  "전북",
  "전남",
  "경북",
  "경남",
  "제주",
] as const;

export type Category = (typeof CATEGORIES)[number];
export type Region = (typeof REGIONS)[number];
