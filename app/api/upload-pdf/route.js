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

    console.log("PDF reçu :", file.name);
    console.log("Taille :", file.size);

    const pdf = await pdfParse(buffer);

    console.log("Texte extrait OK");

    return NextResponse.json({
      success: true,
      text: pdf.text || "",
    });
  } catch (error) {
    console.error("ERREUR PDF :", error);

    return NextResponse.json({
      success: false,
      error: error.message || "Erreur lecture PDF",
    });
  }
}
