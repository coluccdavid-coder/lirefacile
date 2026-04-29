import { NextResponse } from "next/server";
import { createWorker } from "tesseract.js";
import { fromBuffer } from "pdf2pic";

global.DOMMatrix = class DOMMatrix {
  constructor() {}
};

export const runtime = "nodejs";
export const maxDuration = 60;

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

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let extractedText = "";

    // ==========================
    // OCR PDF IMAGE
    // ==========================

    const convert = fromBuffer(buffer, {
      density: 150,
      format: "png",
      width: 1200,
      height: 1600,
    });

    const worker = await createWorker("fra");

    const pages = await convert.bulk(-1);

    for (const page of pages) {
      const result = await worker.recognize(page.path);

      extractedText += result.data.text + "\n";
    }

    await worker.terminate();

    extractedText = extractedText.trim();

    if (!extractedText || extractedText.length < 30) {
      return NextResponse.json({
        success: false,
        error: "OCR impossible",
      });
    }

    return NextResponse.json({
      success: true,
      text: extractedText,
      length: extractedText.length,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}
