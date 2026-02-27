포트폴리오 항목 추가 워크플로우를 안내해주세요.

## Sanity Studio에서 포트폴리오 추가하기

### 1단계: Sanity Studio 열기
```bash
npm run dev
# 브라우저에서 http://localhost:3000/studio 접속
```

### 2단계: 새 Portfolio 문서 생성
- 좌측 메뉴 → "Portfolio" → "+ New"

### 3단계: 필수 필드 입력

| 필드 | 설명 | 예시 |
|------|------|------|
| Title | 프로젝트 제목 | "○○빌딩 수변전설비 시공" |
| Summary | 1-2문장 요약 | "2,500평 규모 상업시설 수배전반 설계 시공" |
| Region | 시도 선택 | 경기 |
| District | 구/군/시 | 수원시 영통구 |
| Category | 공사 종류 | 수변전설비 |
| Cover Image | 대표 이미지 1장 | (업로드) |
| Images | 갤러리 이미지 | (여러 장 업로드) |
| Before Image | 시공 전 사진 | (있으면 업로드) |
| Published At | 시공 완료일 | 2024-03-15 |

### 4단계: Slug 확인
slug는 자동 생성됩니다: `{region}-{district}-{category}-전기공사`

예시: `경기-수원시영통구-수변전설비-전기공사`

**slug가 한글이면 URL 인코딩됩니다 — 정상입니다.**

### 5단계: Publish
우상단 "Publish" 버튼 클릭 → 사이트에 자동 반영

---

## 코드로 직접 추가하는 경우 (mockData)

`src/lib/mockData.ts`에 Portfolio 타입을 따라 추가:

```typescript
{
  _id: "unique-id",
  title: "프로젝트 제목",
  summary: "요약",
  region: "경기",
  district: "수원시 영통구",
  category: "수변전설비",
  coverImageUrl: "https://...",
  imageUrls: ["https://...", "https://..."],
  beforeImageUrl: undefined,
  slug: { current: "경기-수원시영통구-수변전설비-전기공사" },
  publishedAt: "2024-03-15",
}
```
