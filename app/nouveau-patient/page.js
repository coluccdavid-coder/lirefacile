"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function NouveauPatient() {
  const [symptoms, setSymptoms] = useState("");
  const router = useRouter();
const createProgram = async () => {
    const symptomList = symptoms
      .split(",")
      .map((s) => s.trim().toLowerCase());
const memory = JSON.parse(localStorage.getItem("iaMemory")) || [];
const localExercises = [];
memory.forEach((pdf) => {
      symptomList.forEach((symptom) => {
        if (
          pdf.extractedText?.toLowerCase().includes(symptom)
        ) {
          localExercises.push({
            type: "pdf",
            question: `Exercice issu de ${pdf.name}`,
          });
        }
      });
    });
const response = await fetch("/api/search-therapy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        symptoms: symptomList,
      }),
    });
const data = await response.json();
const merged = [
      ...localExercises,
      ...(data.exercises || []),
    ];
localStorage.setItem(
      "currentExercisePack",
      JSON.stringify(merged)
    );
router.push("/entrainement-avc");
  };
return (
    <div className="page-container">
      <div className="main-card">
        <h1 className="main-title">Nouveau Patient</h1>
<textarea
          className="exercise-input"
          rows={6}
          placeholder="aphasie, mémoire, lecture"
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
        />
<div className="button-row">
          <button
            className="primary-button success-button"
            onClick={createProgram}
          >
            Créer Programme IA
          </button>
        </div>
      </div>
    </div>
  );
}
