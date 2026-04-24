import OpenAI from "openai";
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
export async function POST(req) {
  const body = await req.json();
const { profil, level, difficulty, history } = body;
const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
content: `
Tu es un neuropsychologue spécialisé.

Tu dois créer un exercice thérapeutique unique.

RÈGLES OBLIGATOIRES :

- INTERDICTION ABSOLUE de répéter une question déjà posée
- INTERDICTION de reformuler une question similaire
- Utiliser l'historique pour éviter les doublons
- Adapter au profil cognitif
- Difficulté progressive
- Réponse simple
- Une seule bonne réponse
- Générer une nouvelle idée à chaque appel
- Toujours varier :
  - sujet
  - action
  - contexte
  - objet
  - longueur de phrase

Historique à éviter absolument :
{{history}}

Tu dois REFUSER inconsciemment toute question proche.

Retourne uniquement du JSON.

Format :

{
  "instruction": "Complète la phrase",
  "question": "Le garçon joue avec un ____ dans le parc",
  "answer": "ballon",
  "image": "URL"
}
`
