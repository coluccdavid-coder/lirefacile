import { NextResponse } from "next/server";
import pdfParse from "pdf-parse";
import Tesseract from "tesseract.js";

export async function POST(req) {
  try {
    const data = await req.formData();
    const file = data.get("file");

    if (!file) {
      return NextResponse.json({
        success: false,
        error: "Aucun fichier"
      });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    let text = "";

    // ========= PDF PARSE =========
    try {
      const parsed = await pdfParse(buffer);

      if (parsed.text && parsed.text.trim().length > 50) {
        text = parsed.text;
      }
    } catch (e) {
      console.log("pdf-parse error", e);
    }

    // ========= OCR =========
    if (!text || text.trim().length < 50) {

      console.log("OCR activé");

      const result = await Tesseract.recognize(
        buffer,
        "fra"
      );

      text = result.data.text || "";
    }

    // ========= RESULT =========
    return NextResponse.json({
      success: true,
      filename: file.name,
      text: text.substring(0, 5000),
      length: text.length
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json({
      success: false,
      error: error.message
    });
  }
}
