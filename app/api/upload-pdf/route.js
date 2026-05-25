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

    console.log("Nom PDF:", file.name);
    console.log("Taille:", file.size);

    // ==========================
    // LIMITE TAILLE
    // ==========================

    const maxSize = 4 * 1024 * 1024;

    if (file.size > maxSize) {
      return NextResponse.json({
        success: false,
        error: "PDF trop volumineux (4 MB max)",
      });
    }

    // ==========================
    // BUFFER
    // ==========================

    const arrayBuffer = await file.arrayBuffer();

    const buffer = Buffer.from(arrayBuffer);

    // ==========================
    // EXTRACTION TEXTE PDF
    // ==========================

    const data = await pdfParse(buffer);

    const text = data.text
      ?.replace(/\s+/g, " ")
      ?.trim();

    console.log("Texte extrait:", text?.length);

    // ==========================
    // VERIFICATION TEXTE
    // ==========================

    if (!text || text.length < 20) {
      return NextResponse.json({
        success: false,
        error: "Aucun texte détecté dans le PDF",
      });
    }

    // ==========================
    // SUCCES
    // ==========================

    return NextResponse.json({
      success: true,
      text,
      pages: data.numpages || 0,
      length: text.length,
    });

  } catch (error) {
    console.error("PDF ERROR:", error);

    return NextResponse.json({
      success: false,
      error:
        error?.message ||
        "Erreur extraction PDF",
    });
  }
}
