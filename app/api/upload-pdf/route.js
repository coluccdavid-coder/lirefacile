import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req) {
  try {
    console.log("UPLOAD START");

    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({
        success: false,
        error: "Aucun fichier",
      });
    }

    console.log("Nom:", file.name);
    console.log("Taille:", file.size);

    // sécurité taille
    if (file.size > 4 * 1024 * 1024) {
      return NextResponse.json({
        success: false,
        error: "PDF trop lourd (max 4MB)",
      });
    }

    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    // IMPORTANT → version Node safe
    const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf.mjs");

    // désactive worker (important Vercel)
    pdfjsLib.GlobalWorkerOptions.workerSrc = undefined;

    const loadingTask = pdfjsLib.getDocument({
      data: uint8Array,
      disableFontFace: true,
      useSystemFonts: false,
      isEvalSupported: false,
      useWorkerFetch: false,
    });

    const pdf = await loadingTask.promise;

    let fullText = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);

      const textContent = await page.getTextContent();

      const pageText = textContent.items
        .map((item) => ("str" in item ? item.str : ""))
        .join(" ");

      fullText += pageText + "\n";
    }

    console.log("Texte extrait:", fullText.length);

    return NextResponse.json({
      success: true,
      text: fullText,
    });
  } catch (error) {
    console.error("ERREUR PDF:", error);

    return NextResponse.json({
      success: false,
      error: error.message || "Erreur lecture PDF",
    });
  }
}
