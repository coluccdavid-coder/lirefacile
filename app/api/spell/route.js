import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  const { text } = await req.json();

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `
Tu es un professeur de français spécialisé dyslexie et AVC.
Tu corriges les fautes sans changer le sens.
Tu expliques simplement les corrections.
`,
      },
      {
        role: "user",
        content: text,
      },
    ],
  });

  const corrected = response.choices[0].message.content;

  return Response.json({
    correctedText: corrected,
  });
}
