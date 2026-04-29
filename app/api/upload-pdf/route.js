import { NextResponse } from "next/server";
export const runtime = "nodejs";
export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
if (!file) {
      return NextResponse.json({
        success: false,
      });
    }
const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf.mjs");
pdfjsLib.GlobalWorkerOptions.workerSrc = undefined;
const pdf = await pdfjsLib
      .getDocument({
        data: uint8Array,
        disableFontFace: true,
        useWorkerFetch: false,
      })
      .promise;
let fullText = "";
for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
const content = await page.getTextContent();
const strings = content.items
        .map((item) => item.str || "")
        .join(" ");
fullText += strings + "\n";
    }
return NextResponse.json({
      success: true,
      text: fullText,
    });
  } catch (error) {
    console.error(error);
return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}
