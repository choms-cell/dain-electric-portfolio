import { defineField, defineType } from "sanity";

export const portfolioType = defineType({
  name: "portfolio",
  title: "포트폴리오",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "공사명",
      type: "string",
      validation: (rule) => rule.required().min(2).max(80),
    }),
    defineField({
      name: "summary",
      title: "한줄 설명",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: "region",
      title: "지역 (시/도)",
      type: "string",
      options: {
        list: [
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
        ],
        layout: "dropdown",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "district",
      title: "구/군",
      type: "string",
      placeholder: "예: 강남구, 수원시, 천안시",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "공사종류",
      type: "string",
      options: {
        list: [
          "수변전 설비",
          "동력설비",
          "조명설비",
          "소방전기",
          "태양광",
          "약전설비",
          "가로등",
          "EV충전",
          "기타",
        ],
        layout: "dropdown",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "coverImage",
      title: "대표 이미지",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "images",
      title: "상세 이미지 (여러 장)",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
        },
      ],
    }),
    defineField({
      name: "beforeImage",
      title: "시공 전 이미지 (전/후 비교용)",
      type: "image",
      options: {
        hotspot: true,
      },
      description: "업로드하면 상세 페이지에 시공 전·후 비교 슬라이더가 표시됩니다.",
    }),
    defineField({
      name: "slug",
      title: "URL (자동 생성)",
      type: "slug",
      options: {
        source: (doc: any) =>
          `${doc.region ?? ""}-${doc.district ?? ""}-${doc.category ?? ""}-전기공사`,
        slugify: (input: string) =>
          input
            .replace(/\s+/g, "-")
            .replace(/[^\w\-가-힣]/g, "")
            .toLowerCase()
            .slice(0, 96),
        isUnique: () => true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "시공일",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      region: "region",
      category: "category",
      media: "coverImage",
    },
    prepare({ title, region, category, media }) {
      return {
        title,
        subtitle: `${region ?? ""} · ${category ?? ""}`,
        media,
      };
    },
  },
});
