import { NextResponse } from "next/server";
import pdfParse from "pdf-parse";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(req) {
  try {
    console.log("UPLOAD PDF START");

    // ==========================
    // FORM DATA
    // ==========================

    const formData = await req.formData();

    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({
        success: false,
        error: "Aucun fichier reçu",
      });
    }

    console.log("PDF :", file.name);

    // ==========================
    // LIMITATION TAILLE
    // ==========================

    const maxSize = 4 * 1024 * 1024;

    if (file.size > maxSize) {
      return NextResponse.json({
        success: false,
        error: "PDF trop volumineux (4MB max)",
      });
    }

    // ==========================
    // BUFFER PDF
    // ==========================

    const arrayBuffer = await file.arrayBuffer();

    const buffer = Buffer.from(arrayBuffer);

    // ==========================
    // EXTRACTION TEXTE
    // ==========================

    const data = await pdfParse(buffer);

    let extractedText = data.text || "";

    // ==========================
    // CLEAN TEXTE
    // ==========================

    extractedText = extractedText
      .replace(/\s+/g, " ")
      .trim();

    console.log(
      "Texte extrait :",
      extractedText.length
    );

    // ==========================
    // PDF VIDE
    // ==========================

    if (
      !extractedText ||
      extractedText.length < 20
    ) {
      return NextResponse.json({
        success: false,
        error: "Aucun texte détecté",
      });
    }

    // ==========================
    // LIMITATION TEXTE
    // ==========================

    extractedText = extractedText.slice(0, 30000);

    // ==========================
    // SUCCESS
    // ==========================

    return NextResponse.json({
      success: true,
      text: extractedText,
      pages: data.numpages || 0,
      length: extractedText.length,
    });
  } catch (error) {
    console.error("PDF ERROR:", error);

    return NextResponse.json({
      success: false,
      error:
        error?.message ||
        "Erreur lecture PDF",
    });
  }
}
