import { NextResponse } from "next/server";
import pdfParse from "pdf-parse";
import Tesseract from "tesseract.js";

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

    let extractedText = "";

    try {
      const pdfData = await pdfParse(buffer);

      extractedText = pdfData.text;
    } catch (e) {
      console.log("pdf-parse erreur");
    }

    // OCR si texte vide
    if (!extractedText || extractedText.length < 50) {
      const result = await Tesseract.recognize(
        buffer,
        "fra"
      );

      extractedText = result.data.text;
    }

    return NextResponse.json({
      success: true,
      text: extractedText,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({
      success: false,
      error: "Erreur upload PDF",
    });
  }
}
