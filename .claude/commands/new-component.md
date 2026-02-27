새 컴포넌트를 생성해주세요.

컴포넌트 이름: $ARGUMENTS

다음 체크리스트를 따라 `src/components/{컴포넌트명}.tsx`를 생성하세요:

## 생성 규칙

1. **파일 위치:** `src/components/{ComponentName}.tsx`

2. **클라이언트 여부 판단:**
   - `useState`, `useEffect`, Framer Motion, 이벤트 핸들러 → 상단에 `"use client";`
   - 정적 표시 컴포넌트 → 서버 컴포넌트 (선언 없음)

3. **디자인 시스템 적용:**
   - 색상: slate 계열만 (bg-slate-50, text-slate-900, border-slate-200 등)
   - 모서리: rounded 없음 (sharp corners)
   - 이미지: `grayscale group-hover:grayscale-0 transition-all duration-700`
   - 아이콘: SVG 인라인 직접 사용 (외부 라이브러리 금지)

4. **섹션 구조 패턴:**
```tsx
<section className="section bg-white">
  <div className="wrapper">
    <p className="label mb-3">Label</p>
    <h2 className="font-bold text-slate-900 tracking-tighter mb-10"
        style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>
      제목
    </h2>
    {/* 내용 */}
  </div>
</section>
```

5. **버튼 패턴:**
```tsx
// Dark primary
"px-6 py-3.5 bg-slate-900 text-white font-bold text-[13px] hover:bg-slate-700 transition-colors"
// Outline secondary
"px-6 py-3.5 border border-slate-300 text-slate-700 font-semibold text-[13px] hover:border-slate-900 hover:text-slate-900 transition-all"
```

6. 생성 후 `src/components/CLAUDE.md`의 컴포넌트 목록에 추가하세요.
