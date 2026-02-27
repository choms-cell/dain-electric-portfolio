import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") ?? "다인전기";
  const category = searchParams.get("category") ?? "전기공사";
  const region = searchParams.get("region") ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#0f172a",
          padding: "60px 72px",
          fontFamily: "sans-serif",
        }}
      >
        {/* 상단: 브랜드 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "auto",
          }}
        >
          {/* 번개 아이콘 */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="#94a3b8"
          >
            <path d="M13 2L3 14h8l-2 8L21 10h-8L13 2z" />
          </svg>
          <span style={{ color: "#94a3b8", fontSize: "16px", fontWeight: 600, letterSpacing: "0.1em" }}>
            다인전기
          </span>
        </div>

        {/* 중앙: 제목 */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* 카테고리 태그 */}
          <div style={{ display: "flex", gap: "8px" }}>
            <span
              style={{
                border: "1px solid #334155",
                color: "#64748b",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.12em",
                padding: "4px 12px",
              }}
            >
              {category.toUpperCase()}
            </span>
            {region && (
              <span
                style={{
                  border: "1px solid #334155",
                  color: "#64748b",
                  fontSize: "12px",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  padding: "4px 12px",
                }}
              >
                {region}
              </span>
            )}
          </div>

          {/* 제목 */}
          <div
            style={{
              color: "#f8fafc",
              fontSize: title.length > 20 ? "38px" : "52px",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              maxWidth: "760px",
            }}
          >
            {title}
          </div>
        </div>

        {/* 하단: 구분선 + 도메인 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "48px",
            paddingTop: "24px",
            borderTop: "1px solid #1e293b",
          }}
        >
          <span style={{ color: "#475569", fontSize: "13px" }}>
            전기공사 전문기업 · 전국 시공
          </span>
          <span style={{ color: "#334155", fontSize: "13px" }}>
            dain-elec.co.kr
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
