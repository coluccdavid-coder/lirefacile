import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(req) {
  try {
    const body = await req.json();

    const profile = body.profile;
    const history = body.history || [];

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
Tu es une IA thérapeutique.

Tu dois créer des exercices cognitifs uniques.

IMPORTANT :
- Ne jamais répéter les mêmes questions
- Adapter à la difficulté
- Compatible AVC
- Compatible Dys
- Réponse courte
- Retourner uniquement JSON

Format :
{
  "question": "La femme lit un ____",
  "answer": "livre",
  "image": "https://images.unsplash.com/photo-example"
}
          `
        },
        {
          role: "user",
          content: `
Profil : ${JSON.stringify(profile)}
Historique : ${JSON.stringify(history)}
          `
        }
      ],
      response_format: { type: "json_object" }
    });

    const content = completion.choices[0].message.content;

    return NextResponse.json(JSON.parse(content));
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Erreur génération exercice" },
      { status: 500 }
    );
  }
}
