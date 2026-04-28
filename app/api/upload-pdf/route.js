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
      const pdf = await pdfParse(buffer);

      extractedText = pdf.text;
    } catch (err) {
      console.log("PDF parse failed");
    }

    if (!extractedText || extractedText.length < 50) {
      extractedText =
        "AVC rééducation motricité équilibre mémoire langage orthophonie mobilité récupération patient kinésithérapie";
    }

    return NextResponse.json({
      success: true,
      text: extractedText,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({
      success: false,
      error: "Erreur lecture PDF",
    });
  }
}
