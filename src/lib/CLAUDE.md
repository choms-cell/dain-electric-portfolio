# 데이터/CMS 에이전트

이 디렉토리(`src/lib/`)의 파일을 다룰 때 적용되는 규칙.
루트 `CLAUDE.md`의 공통 규칙도 함께 따른다.

---

## 역할

- Sanity GROQ 쿼리 작성/수정
- 타입 정의 관리
- API 라우트 개발 (`src/app/api/`)

---

## 파일 역할

| 파일 | 역할 | 수정 시 주의 |
|------|------|-------------|
| `sanity.ts` | Sanity 클라이언트 lazy-init | createClient 직접 호출 금지 |
| `queries.ts` | 모든 GROQ 쿼리 + fallback | 쿼리 추가 시 mockData도 맞춰야 함 |
| `mockData.ts` | 샘플 8개 포트폴리오 | 타입 변경 시 같이 수정 |
| `types.ts` | Portfolio 타입, CATEGORIES, REGIONS | 변경 시 전체 영향 범위 확인 |

---

## Sanity 핵심 패턴

### 클라이언트 lazy-init (항상 이 패턴 사용)

```typescript
// sanity.ts
import { createClient } from "@sanity/client";

let _client: ReturnType<typeof createClient> | null = null;

export function isSanityConfigured() {
  return !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
}

export function getSanityClient() {
  if (!isSanityConfigured()) return null;
  if (!_client) {
    _client = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
      dataset: "production",
      useCdn: false,
      apiVersion: "2024-01-01",
    });
  }
  return _client;
}
```

**`createClient({})`를 빈 projectId로 호출하면 런타임 오류 — 반드시 isSanityConfigured() 체크 먼저.**

### GROQ 쿼리 + fallback 패턴

```typescript
// queries.ts
export async function getPortfolios(): Promise<Portfolio[]> {
  const client = getSanityClient();
  if (!client) return mockPortfolios; // fallback

  try {
    return await client.fetch(PORTFOLIOS_QUERY);
  } catch (error) {
    console.error("Sanity fetch error:", error);
    return mockPortfolios; // 오류 시에도 fallback
  }
}
```

---

## 타입 규칙

```typescript
// types.ts 현재 Portfolio 타입
interface Portfolio {
  _id: string;
  title: string;
  summary: string;
  region: string;       // 17개 시도 중 하나
  district: string;     // 구/군/시
  category: string;     // CATEGORIES 중 하나
  coverImageUrl: string;
  imageUrls: string[];
  beforeImageUrl?: string;
  slug: { current: string };
  publishedAt: string;
}
```

### CATEGORIES (9개)
```
수변전설비 | 동력설비 | 조명설비 | 소방전기 | 태양광 | 약전설비 | 가로등 | EV충전 | 기타
```

### REGIONS (17개 시도)
서울 | 부산 | 대구 | 인천 | 광주 | 대전 | 울산 | 세종 | 경기 | 강원 | 충북 | 충남 | 전북 | 전남 | 경북 | 경남 | 제주

---

## GROQ 쿼리 작성법

```groq
// 전체 목록
*[_type == "portfolio"] | order(publishedAt desc) {
  _id, title, summary, region, district, category,
  "coverImageUrl": coverImage.asset->url,
  "imageUrls": images[].asset->url,
  "beforeImageUrl": beforeImage.asset->url,
  slug, publishedAt
}

// slug로 단건 조회
*[_type == "portfolio" && slug.current == $slug][0] { ... }
```

**모든 쿼리는 `queries.ts`에만 작성. 페이지나 컴포넌트에 GROQ 직접 작성 금지.**

---

## 서버 → 클라이언트 데이터 전달

```typescript
// ✅ 올바른 방법: 직렬화 가능한 타입만 전달
<PortfolioList portfolios={portfolios} />

// ❌ 금지: 함수, class 인스턴스, Symbol 전달
<PortfolioList client={sanityClient} />
```

---

## API 라우트 (src/app/api/)

| 라우트 | 설명 |
|--------|------|
| `/api/og` | OG 이미지 생성, edge runtime, `?title=&category=&region=` |
| `/api/upload` | Sanity 이미지 업로드 |

새 API 라우트 추가 시:
- edge runtime이면 `export const runtime = "edge";`
- 환경변수는 서버 측에서만 접근 (NEXT_PUBLIC_ 아닌 변수는 클라이언트 노출 금지)

---

## 환경변수

```
NEXT_PUBLIC_SANITY_PROJECT_ID  — Sanity 프로젝트 ID (없으면 mockData 사용)
NEXT_PUBLIC_SITE_URL           — 배포 URL (SEO canonical, OG)
SANITY_API_TOKEN               — 쓰기 권한 필요 시 (서버 전용)
```
