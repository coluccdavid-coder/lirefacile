export async function POST(req) {
  const body = await req.json();

  let corrected = body.text;

  corrected = corrected.replace(/bonjours/gi, "Bonjour");
  corrected = corrected.replace(/mappel/gi, "m'appelle");
  corrected = corrected.replace(/pou/gi, "pour");
  corrected = corrected.replace(/je sui/gi, "je suis");

  return Response.json({ corrected });
}
