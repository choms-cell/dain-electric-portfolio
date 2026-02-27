# 다인전기 포트폴리오 사이트 — 프로젝트 총괄

> 모든 서브 에이전트(components, app, lib)는 이 파일을 공통 기준으로 따른다.

---

## 프로젝트 개요

전기공사 전문기업 **다인전기**의 기업 포트폴리오 사이트.
목적: 시공 실적 전시, 견적 문의 유도, 지역 SEO.

**MVP 원칙:** 불필요한 복잡성 없음. 가볍고 유지보수 가능하게.

---

## 기술 스택

| 항목 | 선택 |
|------|------|
| 프레임워크 | Next.js 14 (App Router) |
| 언어 | TypeScript |
| 스타일 | TailwindCSS |
| 애니메이션 | Framer Motion (최소 사용) |
| CMS | Sanity (lazy-init 패턴) |
| 배포 | Vercel |

**도입 금지:** Redux, 복잡한 백엔드 프레임워크, 과한 추상화

---

## 핵심 파일 경로 맵

```
src/
├── lib/
│   ├── sanity.ts        — Sanity 클라이언트 (lazy-init)
│   ├── queries.ts       — 모든 GROQ 쿼리 + mockData fallback
│   ├── mockData.ts      — 8개 샘플 포트폴리오
│   └── types.ts         — Portfolio 타입, CATEGORIES, REGIONS
├── app/
│   ├── page.tsx         — 홈 (서버 컴포넌트)
│   ├── layout.tsx       — 루트 레이아웃 + FloatingCTA
│   ├── portfolio/
│   │   ├── page.tsx     — 목록 + 검색/필터
│   │   └── [slug]/      — 상세 (SEO 메타 포함)
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   ├── api/og/          — OG 이미지 자동생성 (edge runtime)
│   └── studio/          — Sanity Studio
└── components/
    ├── Header.tsx        — 고정 헤더 (bg-white/80 backdrop-blur-md)
    ├── Footer.tsx        — 법적 정보 포함
    ├── HeroSection.tsx   — 50/50 split 레이아웃
    ├── FloatingCTA.tsx   — 모바일 고정 전화 버튼
    ├── PortfolioCard.tsx — grayscale hover 카드
    ├── PortfolioList.tsx — 클라이언트, 필터링
    ├── SearchFilter.tsx  — debounce 300ms, URL sync
    ├── ProjectMap.tsx    — Leaflet 지도 (dynamic import)
    ├── BeforeAfterSlider.tsx
    ├── EstimateCalculator.tsx
    └── FAQ.tsx           — 아코디언 FAQ
```

---

## 공통 패턴 & 주의사항

- **Sanity client는 반드시 lazy-init** (`isSanityConfigured()` 체크 후 사용)
- **한국어 slug** → `decodeURIComponent(params.slug)` 필수
- **서버 → 클라이언트** 직렬화 가능 타입만 전달 (함수, class 인스턴스 금지)
- **motion 컴포넌트** → 반드시 `"use client"` 선언

---

## 디자인 시스템 요약

- 배경: `bg-slate-50` / `bg-white` / `bg-slate-900` (dark CTA)
- 텍스트: `text-slate-900` / `text-slate-500` / `text-slate-400`
- 테두리: `border-slate-200`
- 타이포: `font-bold tracking-tighter` (extrabold 아님)
- 이미지: `grayscale group-hover:grayscale-0 transition-all duration-700`
- 모서리: **rounded 없음** (sharp corners 유지)
- 헤더: `bg-white/80 backdrop-blur-md border-b border-slate-200` 고정
- main에 `pt-[60px] md:pt-[68px]` 필수

---

## 포트폴리오 데이터 구조

```typescript
Portfolio {
  _id, title, summary, region, district, category
  coverImageUrl, imageUrls[], beforeImageUrl
  slug: { current }   // 형식: {region}-{district}-{category}-전기공사
  publishedAt
}

CATEGORIES: 수변전설비 | 동력설비 | 조명설비 | 소방전기 | 태양광 | 약전설비 | 가로등 | EV충전 | 기타
REGIONS: 17개 시도
```

---

## SEO 규칙

- slug 형식: `{region}-{district}-{category}-전기공사`
- 메타 타이틀: `{region} {category} 전기공사 시공사례 | 다인전기`
- 메타 설명: `{region} {district} 지역 {category} 전기공사 실제 시공 사례입니다.`
- sitemap.xml / robots.txt 자동 생성
- OG 이미지: 커버 없을 시 `/api/og?title=&category=&region=` 자동 사용

---

## TODO (실제 정보 입력 필요)

- `Footer.tsx` — 대표자명, 사업자번호, 전기공사업 등록번호, 실제 주소
- `FloatingCTA.tsx`, `page.tsx` CTA — 실제 전화번호
- `.env.local` — `NEXT_PUBLIC_SANITY_PROJECT_ID` (Sanity 연동 시)
