import type { Portfolio } from "./types";

export const mockPortfolios: Portfolio[] = [
  {
    _id: "mock-1",
    title: "강남구 오피스타워 수변전 설비 공사",
    summary:
      "지하 3층·지상 22층 규모 오피스타워 전체 전기설비 턴키 시공. 22kV 수변전설비 및 분산 배전반 시스템 구축.",
    region: "서울",
    district: "강남구",
    category: "수변전 설비",
    coverImageUrl:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
    imageUrls: [
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=85",
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1200&q=85",
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1200&q=85",
    ],
    slug: { current: "서울-강남구-수변전설비-전기공사" },
    publishedAt: "2024-10-15T00:00:00Z",
  },
  {
    _id: "mock-2",
    title: "평택 반도체 공장 동력설비 공사",
    summary:
      "연면적 32,000㎡ 반도체 생산 공장 동력설비 전 공정. 클린룸 전용 배선 및 자동화 제어반 설치 포함.",
    region: "경기",
    district: "평택시",
    category: "동력설비",
    coverImageUrl:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80",
    imageUrls: [
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&q=85",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=85",
    ],
    slug: { current: "경기-평택시-동력설비-전기공사" },
    publishedAt: "2024-09-01T00:00:00Z",
  },
  {
    _id: "mock-3",
    title: "음성 지상형 태양광 발전소 (3MW)",
    summary:
      "농지 15,000㎡ 규모 3MW급 지상형 태양광 발전 시스템. ESS 연계 및 한전 계통 연결 공사 포함.",
    region: "충북",
    district: "음성군",
    category: "태양광",
    coverImageUrl:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80",
    imageUrls: [
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&q=85",
      "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=1200&q=85",
    ],
    slug: { current: "충북-음성군-태양광-전기공사" },
    publishedAt: "2024-08-20T00:00:00Z",
  },
  {
    _id: "mock-4",
    title: "인천 항만청 신청사 소방전기 공사",
    summary:
      "연면적 8,500㎡ 공공청사 소방전기 전 공정. 자동화재탐지설비, 비상조명, 비상전원 시스템 시공.",
    region: "인천",
    district: "중구",
    category: "소방전기",
    coverImageUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    imageUrls: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85",
    ],
    slug: { current: "인천-중구-소방전기-전기공사" },
    publishedAt: "2024-07-10T00:00:00Z",
  },
  {
    _id: "mock-5",
    title: "마포구 복합상가 조명설비 공사",
    summary:
      "5층 규모 복합상가 전체 LED 조명 설비 교체 및 스마트 조명 제어 시스템 구축. 에너지 절감 30% 달성.",
    region: "서울",
    district: "마포구",
    category: "조명설비",
    coverImageUrl:
      "https://images.unsplash.com/photo-1555952494-efd681c7e3f9?w=800&q=80",
    imageUrls: [
      "https://images.unsplash.com/photo-1555952494-efd681c7e3f9?w=1200&q=85",
    ],
    slug: { current: "서울-마포구-조명설비-전기공사" },
    publishedAt: "2024-06-05T00:00:00Z",
  },
  {
    _id: "mock-6",
    title: "수원시 물류센터 EV충전 인프라 구축",
    summary:
      "대형 물류센터 주차장 EV 충전소 50기 설치. 급속충전 20기, 완속충전 30기 및 전용 배전반 공사.",
    region: "경기",
    district: "수원시",
    category: "EV충전",
    coverImageUrl:
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80",
    imageUrls: [
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1200&q=85",
    ],
    slug: { current: "경기-수원시-EV충전-전기공사" },
    publishedAt: "2024-05-18T00:00:00Z",
  },
  {
    _id: "mock-7",
    title: "세종시 스마트시티 가로등 공사",
    summary:
      "세종시 2-4생활권 스마트 가로등 280기 설치. IoT 원격제어 시스템 및 태양광 연계 가로등 포함.",
    region: "세종",
    district: "세종시",
    category: "가로등",
    coverImageUrl:
      "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=800&q=80",
    imageUrls: [
      "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=1200&q=85",
    ],
    slug: { current: "세종-세종시-가로등-전기공사" },
    publishedAt: "2024-04-01T00:00:00Z",
  },
  {
    _id: "mock-8",
    title: "대전 대학병원 약전설비 공사",
    summary:
      "500병상 규모 대학병원 의료 약전설비 전 공정. UPS, 의료용 절연변압기, 너싱스테이션 설비 시공.",
    region: "대전",
    district: "유성구",
    category: "약전설비",
    coverImageUrl:
      "https://images.unsplash.com/photo-1504439468489-c8920d796a29?w=800&q=80",
    imageUrls: [
      "https://images.unsplash.com/photo-1504439468489-c8920d796a29?w=1200&q=85",
    ],
    slug: { current: "대전-유성구-약전설비-전기공사" },
    publishedAt: "2024-03-12T00:00:00Z",
  },
];
