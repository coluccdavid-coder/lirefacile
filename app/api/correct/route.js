const aiCorrection = () => {
  if (!text.trim()) return;

  let corrected = text;

  corrected = corrected
    .replace(/bonjours/gi, "bonjour")
    .replace(/salut a tous/gi, "salut à tous")
    .replace(/sa va/gi, "ça va")
    .replace(/j espere/gi, "j’espère")
    .replace(/pou/gi, "pour")
    .replace(/ca/gi, "ça")
    .replace(/etre/gi, "être")
    .replace(/tres/gi, "très")
    .replace(/je sui/gi, "je suis")
    .replace(/cest/gi, "c'est")
    .replace(/jai/gi, "j'ai")
    .replace(/tes/gi, "t'es");

  setText(corrected);
};export async function POST(req) {
  const body = await req.json();

  let corrected = body.text;

  corrected = corrected.replace(/bonjours/gi, "Bonjour");
  corrected = corrected.replace(/mappel/gi, "m'appelle");
  corrected = corrected.replace(/pou/gi, "pour");
  corrected = corrected.replace(/je sui/gi, "je suis");

  return Response.json({ corrected });
}
