import { NextResponse } from "next/server";
import pdfParse from "pdf-parse";

export async function POST(req) {
  try {

    const data = await req.formData();
    const file = data.get("file");

    if (!file) {
      return NextResponse.json({
        success: false,
        error: "Aucun fichier reçu"
      });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // =========================
    // LECTURE PDF
    // =========================
    const pdfData = await pdfParse(buffer);

    const text =
      typeof pdfData.text === "string"
        ? pdfData.text
        : "";

    return NextResponse.json({
      success: true,
      text,
      pages: pdfData.numpages || 0
    });

  } catch (error) {

    console.error("PDF ERROR:", error);

    return NextResponse.json({
      success: false,
      error: error.message || "Erreur PDF"
    });
  }
}
