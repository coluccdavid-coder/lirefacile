import { NextResponse } from "next/server";

const pdfParse = require("pdf-parse");

export const runtime = "nodejs";

export async function POST(req) {
  try {
    console.log("=================================");
    console.log("UPLOAD PDF START");
    console.log("=================================");

    // =========================
    // RÉCUPÉRATION FORM DATA
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
    console.log("Taille :", file.size);

    // =========================
    // CONVERSION BUFFER
    // =========================
    const bytes = await file.arrayBuffer();

    const buffer = Buffer.from(bytes);

    console.log("Buffer créé");

    // =========================
    // DEBUG PDF-PARSE
    // =========================
    console.log("TYPE PDFPARSE :", typeof pdfParse);
    console.log("PDFPARSE :", pdfParse);

    // =========================
    // LECTURE PDF
    // =========================
    const data = await pdfParse(buffer);

    console.log("PDF lu avec succès");
    console.log("Pages :", data.numpages);

    // =========================
    // RÉPONSE OK
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
    console.error("=================================");
    console.error("ERREUR PDF");
    console.error("=================================");
    console.error(error);

    return NextResponse.json({
      success: false,
      error: error?.message || "Erreur inconnue",
      stack: error?.stack || "",
    });
  }
}
