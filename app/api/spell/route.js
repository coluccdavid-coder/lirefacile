export async function POST(req) {
  const { text } = await req.json();

  const response = await fetch(
    "https://api.languagetool.org/v2/check",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        text,
        language: "fr",
      }),
    }
  );

  const data = await response.json();

  let correctedText = text;
  const explanations = [];

  if (data.matches) {
    let offsetCorrection = 0;

    data.matches.forEach((match) => {
      if (match.replacements.length > 0) {
        const replacement = match.replacements[0].value;

        const start = match.offset + offsetCorrection;
        const end = start + match.length;

        const original = correctedText.slice(start, end);

        correctedText =
          correctedText.slice(0, start) +
          replacement +
          correctedText.slice(end);

        explanations.push({
          original,
          corrected: replacement,
          explanation: match.message,
        });

        offsetCorrection += replacement.length - match.length;
      }
    });
  }

  let teacherAdvice = "";
  let simplifiedText = correctedText;

  if (explanations.length > 0) {
    teacherAdvice =
      "Cette phrase contient des erreurs grammaticales ou orthographiques. Lis lentement chaque mot et vérifie les accords et la conjugaison.";
  }

  simplifiedText = correctedText
    .replace(/néanmoins/gi, "mais")
    .replace(/cependant/gi, "mais")
    .replace(/effectivement/gi, "oui")
    .replace(/conformément/gi, "selon")
    .replace(/procédure administrative/gi, "règle")
    .replace(/dans le cadre de/gi, "pour");

  return Response.json({
    correctedText,
    explanations,
    teacherAdvice,
    simplifiedText,
  });
}
