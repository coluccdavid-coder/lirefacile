import { NextResponse } from "next/server";
export async function POST(req) {
  try {
    const body = await req.json();
const {
      symptoms,
      memory,
      speciality,
    } = body;
const allText = memory
      .map((m) => m.extractedText || "")
      .join(" ");
const exercises = [];
const lowerSymptoms = symptoms.toLowerCase();
    const lowerText = allText.toLowerCase();
// AVC
    if (
      speciality === "AVC" ||
      lowerSymptoms.includes("langage") ||
      lowerText.includes("aphasie")
    ) {
      exercises.push(
        {
          type: "langage",
          question: "Répète : Bonjour comment allez-vous ?",
        },
        {
          type: "mémoire",
          question: "Retiens ces mots : chaise, pomme, voiture",
        },
        {
          type: "compréhension",
          question: "Montre ce qui sert à boire.",
        },
        {
          type: "attention",
          question: "Compte de 1 à 20 lentement.",
        }
      );
    }
// Dys
    if (
      speciality === "DYS" ||
      lowerSymptoms.includes("lecture") ||
      lowerText.includes("dys")
    ) {
      exercises.push(
        {
          type: "lecture",
          question: "Lis ce mot : MAISON",
        },
        {
          type: "orthographe",
          question: "Écris : éléphant",
        },
        {
          type: "compréhension",
          question: "Que fait un chien ?",
        },
        {
          type: "syllabes",
          question: "Lis : PA — TA — MA",
        }
      );
    }

// enrichissement internet simulé
    const webExercises = [
      {
        type: "coordination",
        question: "Touche ton nez puis ton oreille.",
      },
      {
        type: "orientation",
        question: "Quel jour sommes-nous ?",
      },
      {
        type: "mémoire visuelle",
        question: "Observe 3 objets puis ferme les yeux.",
      },
    ];
const finalExercises = [...exercises, ...webExercises];
return NextResponse.json({
      success: true,
      exercises: finalExercises,
    });
  } catch (error) {
    console.error(error);
return NextResponse.json({
      success: false,
    });
  }
}
