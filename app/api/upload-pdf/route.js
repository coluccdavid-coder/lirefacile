import { NextResponse } from "next/server";

// ==========================
// FIX PDFJS DOMMatrix
// ==========================

global.DOMMatrix = class DOMMatrix {
  constructor() {}
};

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req) {
  try {
    console.log("UPLOAD PDF START");

    // ==========================
    // RÉCUPÉRATION FORM DATA
    // ==========================

    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({
        success: false,
        error: "Aucun fichier reçu",
      });
    }

    console.log("Nom PDF:", file.name);
    console.log("Taille:", file.size);

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
    const uint8Array = new Uint8Array(arrayBuffer);

    // ==========================
    // IMPORT PDFJS
    // ==========================

    const pdfjsLib = await import(
      "pdfjs-dist/legacy/build/pdf.mjs"
    );

    // ==========================
    // FIX WORKER NEXT / VERCEL
    // ==========================

    pdfjsLib.GlobalWorkerOptions.workerSrc =
      "pdfjs-dist/legacy/build/pdf.worker.mjs";

    // ==========================
    // LECTURE PDF
    // ==========================

    const loadingTask = pdfjsLib.getDocument({
      data: uint8Array,

      disableWorker: true,
      useWorkerFetch: false,

      disableFontFace: true,
      isEvalSupported: false,
      useSystemFonts: true,

      standardFontDataUrl: null,
      cMapUrl: null,
      cMapPacked: false,
    });

    const pdf = await loadingTask.promise;

    let fullText = "";

    // ==========================
    // EXTRACTION TEXTE
    // ==========================

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);

      const content = await page.getTextContent();

      const strings = content.items
        .map((item) => {
          if ("str" in item) {
            return item.str;
          }

          return "";
        })
        .join(" ");

      fullText += strings + "\n";
    }

    // ==========================
    // NETTOYAGE TEXTE
    // ==========================

    fullText = fullText
      .replace(/\s+/g, " ")
      .replace(/\n+/g, "\n")
      .trim();

    console.log("Texte extrait:", fullText.length);

    // ==========================
    // PDF VIDE
    // ==========================

    if (!fullText || fullText.length < 30) {
      return NextResponse.json({
        success: false,
        error: "PDF vide ou texte non détecté",
      });
    }

    // ==========================
    // SUCCÈS
    // ==========================

    return NextResponse.json({
      success: true,
      text: fullText,
      pages: pdf.numPages,
      length: fullText.length,
    });
  } catch (error) {
    console.error("PDF ERROR:", error);

    return NextResponse.json({
      success: false,
      error:
        error?.message || "Erreur extraction PDF",
    });
  }
}
