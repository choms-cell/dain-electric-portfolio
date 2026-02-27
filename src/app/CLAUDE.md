# 페이지 개발 에이전트

이 디렉토리(`src/app/`)의 파일을 다룰 때 적용되는 규칙.
루트 `CLAUDE.md`의 공통 규칙도 함께 따른다.

---

## 역할

- 새 페이지 추가
- SEO 메타데이터 관리
- Next.js App Router 라우팅

---

## 페이지 기본 구조 (모든 페이지 공통)

```tsx
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function SomePage() {
  return (
    <>
      <Header />
      <main className="pt-[60px] md:pt-[68px]">
        {/* 페이지 헤더 */}
        <div className="border-b border-slate-200 bg-slate-50">
          <div className="wrapper py-10 md:py-14">
            <p className="label mb-3">Section Label</p>
            <h1
              className="font-bold text-slate-900 leading-tight tracking-tighter"
              style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
            >
              페이지 제목
            </h1>
          </div>
        </div>
        {/* 콘텐츠 섹션들 */}
      </main>
      <Footer />
    </>
  );
}
```

**`pt-[60px] md:pt-[68px]` 는 고정 헤더 높이 보정용 — 절대 빠뜨리지 않는다.**

---

## 서버 vs 클라이언트 컴포넌트

```
서버 컴포넌트 (기본):
  - 데이터 페칭 (getPortfolios 등)
  - SEO 메타데이터 생성
  - 정적 레이아웃

클라이언트 컴포넌트:
  - useState, useEffect 사용 시
  - 이벤트 핸들러 포함 시
  - Framer Motion 사용 시
  → 별도 컴포넌트로 분리 후 import
```

---

## SEO 메타데이터 규칙

### 모든 페이지 metadata export 필수

```tsx
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hansol-elec.co.kr";

export const metadata: Metadata = {
  title: "페이지명",
  description: "설명 (150자 이내)",
  alternates: { canonical: `${SITE_URL}/path` },
  openGraph: {
    title: "페이지명 | 다인전기",
    description: "설명",
    url: `${SITE_URL}/path`,
  },
};
```

### 포트폴리오 상세 페이지 메타 포맷
```
타이틀: {region} {category} 전기공사 시공사례 | 다인전기
설명:   {region} {district} 지역 {category} 전기공사 실제 시공 사례입니다. {summary}
slug:   {region}-{district}-{category}-전기공사
```

---

## 슬러그 처리

한국어 slug는 반드시 디코딩:
```tsx
const slug = decodeURIComponent(params.slug);
const portfolio = await getPortfolioBySlug(slug);
```

---

## 데이터 페칭

```tsx
// 서버 컴포넌트에서 직접 호출
import { getPortfolios, getPortfolioBySlug } from "@/lib/queries";

export default async function Page() {
  const portfolios = await getPortfolios();
  // ...
}
```

Sanity 미설정 시 자동으로 mockData 반환 — 별도 처리 불필요.

---

## 동적 import (SSR 필요 없는 컴포넌트)

```tsx
import dynamic from "next/dynamic";

// Leaflet 지도, 클라이언트 전용 컴포넌트
const ProjectMap = dynamic(() => import("@/components/ProjectMap"), { ssr: false });
```

---

## 현재 라우트 구조

```
/                    — 홈 (서버, revalidate: 0)
/portfolio           — 포트폴리오 목록
/portfolio/[slug]    — 포트폴리오 상세 (SSG + SEO)
/about               — 회사소개 (인증, FAQ, 연혁)
/contact             — 문의 + 견적 계산기
/api/og              — OG 이미지 생성 (edge runtime)
/studio/[[...tool]]  — Sanity Studio (관리자)
/upload              — 이미지 대량 업로드
```

---

## 새 페이지 추가 체크리스트

- [ ] metadata export 포함
- [ ] `pt-[60px] md:pt-[68px]` main에 적용
- [ ] Header + Footer 포함
- [ ] canonical URL 설정
- [ ] sitemap.ts에 새 경로 추가 (필요시)
