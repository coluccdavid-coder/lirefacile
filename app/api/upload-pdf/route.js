import { NextResponse } from "next/server";
import pdfParse from "pdf-parse";
import Tesseract from "tesseract.js";

export async function POST(req) {
  try {
    console.log("=== START PDF UPLOAD ===");

    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      console.log("ERREUR : aucun fichier");
      return NextResponse.json({
        success: false,
        error: "Aucun fichier",
      });
    }

    console.log("Nom fichier :", file.name);
    console.log("Taille :", file.size);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    console.log("Buffer créé");

    let extractedText = "";

    try {
      console.log("Tentative pdf-parse");

      const pdfData = await pdfParse(buffer);

      extractedText = pdfData.text;

      console.log(
        "Texte extrait longueur :",
        extractedText.length
      );
    } catch (err) {
      console.log("Erreur pdf-parse :", err);
    }

    if (!extractedText || extractedText.length < 50) {
      console.log("OCR lancé");

      try {
        const result = await Tesseract.recognize(
          buffer,
          "fra"
        );

        extractedText = result.data.text;

        console.log(
          "OCR terminé longueur :",
          extractedText.length
        );
      } catch (ocrError) {
        console.log("Erreur OCR :", ocrError);

        return NextResponse.json({
          success: false,
          error: "Erreur OCR",
        });
      }
    }

    console.log("=== SUCCESS ===");

    return NextResponse.json({
      success: true,
      text: extractedText,
    });
  } catch (error) {
    console.log("ERREUR GLOBALE :", error);

    return NextResponse.json({
      success: false,
      error: "Erreur upload PDF",
    });
  }
}
