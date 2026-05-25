import { NextResponse } from "next/server";

const pdfParse = require("pdf-parse");

export const runtime = "nodejs";

export async function POST(req) {
  try {
    console.log("UPLOAD PDF START");

    // =========================
    // FORM DATA
    // =========================
    const formData = await req.formData();

    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({
        success: false,
        error: "Aucun fichier reçu",
      });
    }

    console.log("Fichier reçu :", file.name);

    // =========================
    // CONVERSION BUFFER
    // =========================
    const bytes = await file.arrayBuffer();

    const buffer = Buffer.from(bytes);

    console.log("Buffer créé");

    // =========================
    // LECTURE PDF
    // =========================
    const data = await pdfParse(buffer);

    console.log("PDF lu avec succès");

    // =========================
    // RÉPONSE
    // =========================
    return NextResponse.json({
      success: true,
      fileName: file.name,
      size: file.size,
      pages: data.numpages,
      text: data.text,
      info: data.info || {},
    });

  } catch (error) {
    console.error("ERREUR PDF :", error);

    return NextResponse.json({
      success: false,
      error: "Erreur lecture PDF",
      message: error.message,
    });
  }
}
