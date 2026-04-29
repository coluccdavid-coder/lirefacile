import { NextResponse } from "next/server";
export async function POST(req) {
  try {
    const body = await req.json();
const speciality = body.speciality || "orthophonie";
const internetKnowledge = {
      avc: [
        "Exercice de répétition de mots",
        "Lecture à voix haute",
        "Reconnaissance d’images",
        "Travail mémoire verbale",
        "Association mot-image",
      ],
      dyslexie: [
        "Lecture syllabique",
        "Reconnaissance de lettres",
        "Fusion phonologique",
        "Découpage syllabes",
        "Orthographe guidée",
      ],
      memoire: [
        "Rappel de liste de mots",
        "Association image-objet",
        "Mémoire immédiate",
        "Séquence logique",
      ],
    };

let exercises = [];
if (speciality.toLowerCase().includes("avc")) {
      exercises = internetKnowledge.avc;
    } else if (
      speciality.toLowerCase().includes("dys")
    ) {
      exercises = internetKnowledge.dyslexie;
    } else {
      exercises = internetKnowledge.memoire;
    }

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
