현재 작업 중인 파일 또는 $ARGUMENTS 파일의 디자인 시스템 준수 여부를 검토해주세요.

## 디자인 체크리스트

다음 항목을 파일에서 검토하고 문제점을 지적해주세요:

### ✅ 색상
- [ ] slate 계열 색상만 사용하는가?
- [ ] 파란색(blue), 초록(green), 빨간색(red) 등 포인트 컬러가 없는가?
- [ ] 다크 섹션은 `bg-slate-900` 사용하는가?

### ✅ 모서리
- [ ] `rounded`, `rounded-md`, `rounded-lg`, `rounded-full` 등이 없는가?
- [ ] 모든 요소가 sharp corners인가?

### ✅ 타이포그래피
- [ ] 제목에 `font-bold tracking-tighter` 사용하는가? (`font-extrabold` 아님)
- [ ] 반응형 폰트에 `clamp()` 사용하는가?
- [ ] 레이블에 `label` 클래스 사용하는가?

### ✅ 이미지
- [ ] `<Image>` (next/image) 사용하는가? (`<img>` 태그 금지)
- [ ] 호버 이미지에 `grayscale group-hover:grayscale-0 transition-all duration-700` 적용하는가?
- [ ] 부모에 `group` 클래스가 있는가?

### ✅ 버튼
- [ ] Primary 버튼: `bg-slate-900 text-white` 패턴인가?
- [ ] Secondary 버튼: `border border-slate-300` outline 패턴인가?
- [ ] hover 트랜지션이 적용되어 있는가?

### ✅ 구조
- [ ] 섹션에 `section` + `wrapper` 클래스 사용하는가?
- [ ] 페이지 컴포넌트에 `pt-[60px] md:pt-[68px]` 적용되어 있는가?
- [ ] Header + Footer가 포함되어 있는가?

### ✅ 클라이언트 컴포넌트
- [ ] `"use client"` 가 꼭 필요한 경우에만 있는가?
- [ ] Framer Motion 사용 컴포넌트에 `"use client"` 있는가?

---

문제 발견 시 구체적인 수정 코드를 함께 제시해주세요.
