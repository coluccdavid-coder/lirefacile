import { NextResponse } from "next/server";
import pdfParse from "pdf-parse";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req) {
  try {
    console.log("START upload pdf");

    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({
        success: false,
        error: "Aucun fichier",
      });
    }

    console.log("Nom :", file.name);
    console.log("Taille :", file.size);

    // sécurité taille
    if (file.size > 4000000) {
      return NextResponse.json({
        success: false,
        error: "PDF trop lourd (max 4MB)",
      });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    let text = "";

    try {
      const data = await pdfParse(buffer, {
        pagerender: async (pageData) => {
          const textContent = await pageData.getTextContent();

          return textContent.items
            .map((item) => item.str)
            .join(" ");
        },
      });

      text = data.text || "";
    } catch (err) {
      console.error("PDF parse erreur:", err);

      return NextResponse.json({
        success: false,
        error: "Lecture PDF impossible",
      });
    }

    console.log("Texte extrait :", text.length);

    return NextResponse.json({
      success: true,
      text,
    });
  } catch (error) {
    console.error("Erreur globale :", error);

    return NextResponse.json({
      success: false,
      error: "Erreur upload PDF",
    });
  }
}
