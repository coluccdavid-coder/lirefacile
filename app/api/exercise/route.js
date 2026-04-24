import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  const body = await req.json();

  const { profil, level, history } = body;

  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `
Tu es un neuropsychologue spécialisé.

Crée un exercice thérapeutique.

Règles :
- jamais répéter
- adapté au profil
- difficulté progressive
- phrase réaliste
- réponse courte
- thérapeutique
`,
      },
      {
        role: "user",
        content: `
Profil: ${profil}
Niveau: ${level}
Historique: ${history.join(", ")}
`,
      },
    ],
    response_format: { type: "json_object" },
  });

  return Response.json(
    JSON.parse(completion.choices[0].message.content)
  );
}
