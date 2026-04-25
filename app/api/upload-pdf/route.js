import { NextResponse } from "next/server";

export async function POST(req) {
  const data = await req.formData();
  const file = data.get("file");

  if (!file) {
    return NextResponse.json(
      { error: "Aucun PDF reçu" },
      { status: 400 }
    );
  }

  return NextResponse.json({
    success: true,
    fileName: file.name,
  });
}
