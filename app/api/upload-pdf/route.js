import { NextResponse } from "next/server";
import pdf from "pdf-parse/lib/pdf-parse.js";

export const runtime = "nodejs";

export async function POST(req) {
  try {

    console.log("========== START PDF ==========");

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

    console.log("Nom :", file.name);
    console.log("Taille :", file.size);

    // =========================
    // BUFFER
    // =========================
    const bytes = await file.arrayBuffer();

    const buffer = Buffer.from(bytes);

    console.log("Buffer OK");

    // =========================
    // LECTURE PDF
    // =========================
    const data = await pdf(buffer);

    console.log("PDF lu !");
    console.log("Pages :", data.numpages);

    // =========================
    // TEXTE
    // =========================
    const texte = data.text || "";

    console.log("Longueur texte :", texte.length);

    // =========================
    // REPONSE
    // =========================
    return NextResponse.json({
      success: true,
      nom: file.name,
      taille: file.size,
      pages: data.numpages,
      texte: texte,
    });

  } catch (error) {

    console.error("========== ERREUR PDF ==========");
    console.error(error);

    return NextResponse.json({
      success: false,
      error: "Erreur lecture PDF",
      message: error.message,
      stack: error.stack,
    });
  }
}
