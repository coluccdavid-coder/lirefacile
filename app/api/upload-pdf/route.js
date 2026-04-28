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

    // limite sécurité
    if (file.size > 4000000) {
      return NextResponse.json({
        success: false,
        error: "PDF trop lourd (max 4MB)",
      });
    }

    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    // import dynamique
    const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf.mjs");

    const pdf = await pdfjsLib.getDocument({
      data: uint8Array,
      useWorkerFetch: false,
      isEvalSupported: false,
      useSystemFonts: true,
    }).promise;

    let fullText = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);

      const content = await page.getTextContent();

      const strings = content.items.map((item) => item.str);

      fullText += strings.join(" ") + "\n";
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
      error: error.message,
    });
  }
}
