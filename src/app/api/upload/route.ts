import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    // 비밀번호 확인
    const password = formData.get("password") as string;
    if (!process.env.UPLOAD_PASSWORD || password !== process.env.UPLOAD_PASSWORD) {
      return NextResponse.json({ error: "비밀번호가 틀렸습니다." }, { status: 401 });
    }

    // Sanity 클라이언트 (쓰기 토큰 사용)
    const client = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
      apiVersion: "2024-01-01",
      token: process.env.SANITY_WRITE_TOKEN,
      useCdn: false,
    });

    const files = formData.getAll("files") as File[];
    if (files.length === 0) {
      return NextResponse.json({ error: "파일이 없습니다." }, { status: 400 });
    }

    // 각 이미지를 Sanity 미디어 라이브러리에 업로드
    const uploaded: { name: string; url: string }[] = [];

    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const asset = await client.assets.upload("image", buffer, {
        filename: file.name,
        contentType: file.type,
      });
      uploaded.push({ name: file.name, url: asset.url });
    }

    return NextResponse.json({ count: uploaded.length, files: uploaded });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}
