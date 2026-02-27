# UI 디자이너 에이전트

이 디렉토리(`src/components/`)의 파일을 다룰 때 적용되는 규칙.
루트 `CLAUDE.md`의 공통 규칙도 함께 따른다.

---

## 역할

- 새 컴포넌트 생성
- 기존 컴포넌트 디자인 수정
- 디자인 시스템 일관성 유지

---

## 디자인 시스템 (엄격 적용)

### 색상 — slate 계열만 사용
```
배경:   bg-slate-50  /  bg-white  /  bg-slate-900 (다크)
텍스트: text-slate-900  /  text-slate-700  /  text-slate-500  /  text-slate-400  /  text-slate-300
테두리: border-slate-200
```
포인트 컬러(파랑, 초록, 빨강 등) **절대 사용 금지**

### 모서리 — sharp corners
```
rounded, rounded-md, rounded-full 등 일절 사용 금지
```

### 이미지 호버 효과
```tsx
className="grayscale group-hover:grayscale-0 transition-all duration-700"
// 부모에 반드시 group 클래스 필요
```

### 타이포그래피
```
제목: font-bold tracking-tighter  (font-extrabold 금지)
소제목/레이블: text-[11px] font-semibold tracking-[0.15em] uppercase text-slate-400
본문: text-[13px] md:text-[14px] text-slate-500 leading-relaxed
```

### 버튼 패턴
```tsx
// Primary (dark)
"px-6 py-3.5 bg-slate-900 text-white font-bold text-[13px] hover:bg-slate-700 transition-colors"

// Secondary (outline)
"px-6 py-3.5 border border-slate-300 text-slate-700 font-semibold text-[13px] hover:border-slate-900 hover:text-slate-900 transition-all"
```

### Label (섹션 소제목)
```tsx
<p className="label mb-3">Section Name</p>
// globals.css에 .label 클래스 정의되어 있음
```

---

## 컴포넌트 작성 규칙

### 클라이언트/서버 구분
```
"use client" 필요한 경우:  useState, useEffect, Framer Motion, 이벤트 핸들러
"use client" 불필요한 경우: 정적 UI, props만 받는 표시용 컴포넌트
```

### Framer Motion
```tsx
// 입장 애니메이션 기본 패턴
initial={{ opacity: 0, y: 16 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6, delay: 0.1 }}

// 과도한 애니메이션 금지 (진입 효과만, 지속 루프 금지)
```

### 아이콘
외부 라이브러리 설치 금지. SVG 인라인 직접 사용:
```tsx
<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="..." />
</svg>
```

### 섹션 구조 패턴
```tsx
<section className="section bg-white">        // section 클래스: py-16 md:py-24
  <div className="wrapper">                   // wrapper 클래스: max-w + px
    <p className="label mb-3">Label</p>
    <h2 className="font-bold text-slate-900 tracking-tighter mb-10"
        style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>
      제목
    </h2>
    {/* 내용 */}
  </div>
</section>
```

---

## 현재 컴포넌트 목록

| 파일 | 역할 | Client? |
|------|------|---------|
| Header.tsx | 고정 헤더, 모바일 드로어 | ✅ |
| Footer.tsx | 법적 정보 포함 푸터 | ❌ |
| HeroSection.tsx | 50/50 split 히어로 | ✅ |
| FloatingCTA.tsx | 모바일 고정 전화버튼 | ✅ |
| PortfolioCard.tsx | grayscale 호버 카드 | ✅ |
| PortfolioList.tsx | 필터링 목록 | ✅ |
| SearchFilter.tsx | 검색/필터 UI | ✅ |
| ProjectMap.tsx | Leaflet 지도 | ✅ |
| BeforeAfterSlider.tsx | 전/후 비교 슬라이더 | ✅ |
| EstimateCalculator.tsx | 3단계 견적 계산기 | ✅ |
| FAQ.tsx | 아코디언 FAQ | ✅ |
