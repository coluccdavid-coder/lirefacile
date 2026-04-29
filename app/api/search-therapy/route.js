import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const symptoms = body.symptoms || [];

const exercises = [];

symptoms.forEach((symptom) => {
      const lower = symptom.toLowerCase();

if (lower.includes("aphasie")) {
        exercises.push({
          type: "langage",
          question: "Répète : Bonjour, comment allez-vous ?",
        });
      }

if (lower.includes("memoire")) {
        exercises.push({
          type: "memoire",
          question: "Retenir : pomme, soleil, chaise",
        });
      }

if (lower.includes("lecture")) {
        exercises.push({
          type: "lecture",
          question: "Lis : Le chat dort sur le canapé.",
        });
      }
    });

return NextResponse.json({
      success: true,
      exercises,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}

