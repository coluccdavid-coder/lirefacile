import { NextResponse } from "next/server";
import pdfParse from "pdf-parse/lib/pdf-parse.js";

export async function POST(req) {
  try {
    const formData = await req.formData();

    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({
        success: false,
        error: "Aucun fichier",
      });
    }

    const bytes = await file.arrayBuffer();

    const buffer = Buffer.from(bytes);

    const pdf = await pdfParse(buffer);

    return NextResponse.json({
      success: true,
      text: pdf.text || "",
    });
  } catch (error) {
    console.error("Erreur PDF:", error);

    return NextResponse.json({
      success: false,
      error: "Erreur lecture PDF",
    });
  }
}
