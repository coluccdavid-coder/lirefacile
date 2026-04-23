import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { text } = await req.json();

    const response = await fetch("https://api.languagetool.org/v2/check", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        text,
        language: "fr",
      }),
    });

    const data = await response.json();

    let correctedText = text;

    if (data.matches && data.matches.length > 0) {
      let offsetCorrection = 0;

      data.matches.forEach((match) => {
        if (match.replacements.length > 0) {
          const replacement = match.replacements[0].value;

          const start = match.offset + offsetCorrection;
          const end = start + match.length;

          correctedText =
            correctedText.slice(0, start) +
            replacement +
            correctedText.slice(end);

          offsetCorrection += replacement.length - match.length;
        }
      });
    }

    return NextResponse.json({ correctedText });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Erreur correction" },
      { status: 500 }
    );
  }
}
