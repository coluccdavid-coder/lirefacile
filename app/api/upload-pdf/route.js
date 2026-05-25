import { NextResponse } from "next/server";
import pdfParse from "pdf-parse";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({
        success: false,
        error: "Aucun fichier reçu",
      });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // IMPORTANT
    const data = await pdfParse(buffer);

    return NextResponse.json({
      success: true,
      text: data.text,
      pages: data.numpages,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}
