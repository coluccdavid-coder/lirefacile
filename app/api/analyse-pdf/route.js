import { NextResponse } from "next/server";
import { generateExercises } from "../../../lib/ai-engine";

export async function POST(req) {
  try {
    const body = await req.json();

    const text = body.text || "";

    const exercises = generateExercises(text);

    return NextResponse.json({
      success: true,
      exercises,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Erreur analyse IA",
    });
  }
}
