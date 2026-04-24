import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
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

Tu dois créer un exercice thérapeutique.

Règles :

- Jamais répéter une question déjà posée
- Adapter au profil
- Difficulté progressive
- Réponse courte
- Toujours créer une nouvelle phrase
- Utiliser un contexte réaliste
- Ne jamais reprendre une question de l'historique

Historique interdit :
${history.join(", ")}

Retourne uniquement du JSON.

Format :

{
  "instruction": "Complète la phrase",
  "question": "Le garçon joue avec un ____ dans le parc",
  "answer": "ballon",
  "image": "https://..."
}
`,
        },
        {
          role: "user",
          content: `
Profil: ${profil}
Niveau: ${level}
Difficulté: ${difficulty}
`,
        },
      ],
    });

    const content = completion.choices[0].message.content;

    return Response.json(JSON.parse(content));
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Erreur génération IA" },
      { status: 500 }
    );
  }
}
