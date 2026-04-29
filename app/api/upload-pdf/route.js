import { NextResponse } from "next/server";
import { createWorker } from "tesseract.js";
import { fromBuffer } from "pdf2pic";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req) {
  try {
    console.log("OCR PDF START");

    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({
        success: false,
        error: "Aucun fichier reçu",
      });
    }

    console.log("PDF:", file.name);

    // ==========================
    // LIMITATION TAILLE
    // ==========================

    const maxSize = 4 * 1024 * 1024;

    if (file.size > maxSize) {
      return NextResponse.json({
        success: false,
        error: "PDF trop volumineux (4MB max)",
      });
    }

    // ==========================
    // BUFFER PDF
    // ==========================

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let extractedText = "";

    // ==========================
    // PDF → IMAGE
    // ==========================

    const convert = fromBuffer(buffer, {
      density: 120,
      format: "png",
      width: 900,
      height: 1200,
      savePath: "/tmp",
    });

    // ==========================
    // OCR WORKER
    // ==========================

    const worker = await createWorker("fra");

    // IMPORTANT :
    // on limite à 3 pages max
    const maxPages = 3;

    for (let pageNumber = 1; pageNumber <= maxPages; pageNumber++) {
      try {
        console.log("OCR page:", pageNumber);

        const page = await convert(pageNumber);

        if (!page?.path) continue;

        const result = await worker.recognize(page.path);

        extractedText += result.data.text + "\n";

        // sécurité anti-timeout
        if (extractedText.length > 25000) {
          break;
        }
      } catch (pageError) {
        console.log("Page ignorée:", pageNumber);
      }
    }

    await worker.terminate();

    // ==========================
    // CLEAN
    // ==========================

    extractedText = extractedText
      .replace(/\s+/g, " ")
      .trim();

    console.log("Texte OCR:", extractedText.length);

    // ==========================
    // CHECK
    // ==========================

    if (!extractedText || extractedText.length < 20) {
      return NextResponse.json({
        success: false,
        error: "OCR impossible",
      });
    }

    // ==========================
    // SUCCESS
    // ==========================

    return NextResponse.json({
      success: true,
      text: extractedText,
      length: extractedText.length,
      pagesProcessed: maxPages,
    });
  } catch (error) {
    console.error("OCR ERROR:", error);

    return NextResponse.json({
      success: false,
      error: error?.message || "Erreur OCR",
    });
  }
}
