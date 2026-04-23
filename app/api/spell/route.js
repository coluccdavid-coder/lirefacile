import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const text = body.text;

    const corrections = {
      bonjou: "bonjour",
      bonjouu: "bonjour",
      bonjouur: "bonjour",
      bonjouuur: "bonjour",
      bonjourr: "bonjour",
      bonjou: "bonjour",
      commen: "comment",
      comen: "comment",
      coment: "comment",
      aujoudi: "aujourd'hui",
      aujourdui: "aujourd'hui",
      ajourdhui: "aujourd'hui",
      mercie: "merci",
      ordiateur: "ordinateur",
      ecolee: "école",
      maisonn: "maison",
      dificulté: "difficulté",
      coriger: "corriger",
      problemme: "problème",
      aplication: "application",
      developpement: "développement"
    };

    const correctedText = text
      .split(" ")
      .map((word) => {
        const lower = word.toLowerCase();
        return corrections[lower] || word;
      })
      .join(" ");

    return NextResponse.json({ correctedText });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur correction" },
      { status: 500 }
    );
  }
}
