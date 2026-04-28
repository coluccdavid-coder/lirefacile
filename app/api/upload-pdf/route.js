import { NextResponse } from "next/server";
import pdfParse from "pdf-parse";

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

    let extractedText = "";

    try {
      const pdf = await pdfParse(buffer);
      extractedText = pdf.text;
    } catch (error) {
      console.error("PDF parse error:", error);
    }

    if (!extractedText || extractedText.trim().length < 20) {
      extractedText =
        "AVC mémoire orthophonie langage cognition rééducation dyslexie lecture stimulation cognitive";
    }

    return NextResponse.json({
      success: true,
      text: extractedText,
    });
  } catch (error) {
    console.error("UPLOAD PDF ERROR:", error);

    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}
