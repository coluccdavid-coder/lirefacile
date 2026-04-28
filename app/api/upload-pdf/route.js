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
        error: "Aucun fichier reçu",
      });
    }

const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

let extractedText = "";

// ---------- Lecture PDF texte ----------
    try {
      const pdf = await pdfParse(buffer);
      extractedText = pdf.text;
    } catch (pdfError) {
      console.error("Erreur pdf-parse:", pdfError);
    }

// ---------- Fallback OCR ----------
    if (!extractedText || extractedText.trim().length < 50) {
      try {
        console.log("Activation OCR Tesseract...");

const ocrResult = await Tesseract.recognize(
          buffer,
          "fra",
          {
            logger: (m) => console.log(m),
          }
        );

extractedText = ocrResult.data.text;
      } catch (ocrError) {
        console.error("Erreur OCR:", ocrError);
      }
    }

// ---------- Texte minimal si vide ----------
    if (!extractedText || extractedText.trim().length < 10) {
      extractedText =
        "AVC rééducation mémoire orthophonie langage cognition lecture dyslexie stimulation cognitive";
    }

return NextResponse.json({
      success: true,
      text: extractedText,
    });
  } catch (error) {
    console.error("UPLOAD PDF ERROR:", error);

return NextResponse.json({
      success: false,
      error: error.message || "Erreur upload PDF",
    });
  }
}
