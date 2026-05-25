import { NextResponse } from "next/server";
import pdf from "pdf-parse/lib/pdf-parse.js";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    console.log("UPLOAD PDF START");

    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({
        success: false,
        error: "Aucun fichier reçu",
      });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // =========================
    // EXTRACTION TEXTE PDF
    // =========================

    const data = await pdf(buffer);

    const text = data.text?.trim();

    if (!text || text.length < 20) {
      return NextResponse.json({
        success: false,
        error: "Impossible de lire le PDF",
      });
    }

    // =========================
    // SAUVEGARDE MÉMOIRE IA
    // =========================

    return NextResponse.json({
      success: true,
      text,
      pages: data.numpages,
      length: text.length,
      info: data.info || {},
    });

  } catch (error) {
    console.error("ERREUR PDF :", error);

    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}
