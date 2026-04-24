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
Tu dois générer un exercice thérapeutique.
Règles :
- Jamais répéter
- Adapter au profil
- Faire une difficulté progressive
- Utiliser une phrase naturelle
- Réponse courte
- Compatible AVC, Dyslexie, Mémoire, Concentration, Math
- Retourner JSON uniquement
Format attendu :
{
  "instruction": "Complète la phrase",
  "question": "Le garçon joue avec un ____",
  "answer": "ballon",
  "image": "URL image"
}
`,
      },
      {
        role: "user",
        content: `
Profil: ${profil}
Niveau: ${level}
Difficulté: ${difficulty}
Historique: ${history.join(", ")}
`,
      },
    ],
  });
const content = completion.choices[0].message.content;
return Response.json(JSON.parse(content));
}
