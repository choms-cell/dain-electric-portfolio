현재 프로젝트의 SEO 완성도를 검토해주세요. 대상: $ARGUMENTS (미입력 시 전체 검토)

## SEO 체크리스트

### ✅ 메타데이터 (각 페이지)
- [ ] `export const metadata: Metadata` 선언 있는가?
- [ ] `title` 설정 있는가?
- [ ] `description` 150자 이내로 설정되어 있는가?
- [ ] `alternates.canonical` URL 설정 있는가?
- [ ] `openGraph.title`, `openGraph.description` 있는가?
- [ ] `openGraph.images` 설정 있는가?

### ✅ 포트폴리오 페이지 메타 포맷
- [ ] 타이틀 형식: `{region} {category} 전기공사 시공사례 | 다인전기`
- [ ] 설명 형식: `{region} {district} 지역 {category} 전기공사 실제 시공 사례입니다.`
- [ ] slug 형식: `{region}-{district}-{category}-전기공사`

### ✅ OG 이미지
- [ ] 포트폴리오 커버 이미지가 OG 이미지로 설정되어 있는가?
- [ ] 커버 없을 시 `/api/og?title=&category=&region=` 폴백 있는가?

### ✅ 구조화 데이터 (JSON-LD)
- [ ] `layout.tsx`에 LocalBusiness schema 있는가?
- [ ] `telephone`, `address`, `url` 값이 실제 정보인가? (현재 TODO 상태)

### ✅ sitemap.xml
- [ ] `src/app/sitemap.ts` 존재하는가?
- [ ] 포트폴리오 페이지가 동적으로 포함되는가?
- [ ] 새 페이지 추가 시 sitemap에도 추가했는가?

### ✅ robots.txt
- [ ] `src/app/robots.ts` 존재하는가?
- [ ] `/studio` 경로가 크롤 차단되어 있는가?

### ✅ 실제 정보 (TODO 상태 확인)
- [ ] `layout.tsx` JSON-LD의 `telephone` — 실제 번호인가?
- [ ] `Footer.tsx` 사업자번호, 대표자 — 실제 정보인가?
- [ ] `NEXT_PUBLIC_SITE_URL` 환경변수 — 실제 도메인인가?

---

검토 결과와 수정이 필요한 항목을 우선순위별로 정리해주세요.
