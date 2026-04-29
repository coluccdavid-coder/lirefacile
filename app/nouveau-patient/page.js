"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function NouveauPatientPage() {
  const [symptoms, setSymptoms] = useState("");
  const router = useRouter();
const generateProgram = () => {
    const iaMemory = JSON.parse(localStorage.getItem("iaMemory")) || [];
const symptomList = symptoms
      .toLowerCase()
      .split(",")
      .map((s) => s.trim());
const matchedPDFs = iaMemory.filter((pdf) => {
      return symptomList.some(
        (symptom) =>
          pdf.extractedText?.toLowerCase().includes(symptom) ||
          pdf.speciality?.toLowerCase().includes(symptom)
      );
    });
const exercises = [];
matchedPDFs.forEach((pdf) => {
      exercises.push({
        type: "mémoire",
        question: `Travail de mémoire basé sur ${pdf.name}`,
      });
exercises.push({
        type: "langage",
        question: `Exercice langage inspiré de ${pdf.name}`,
      });
    });
localStorage.setItem(
      "currentExercisePack",
      JSON.stringify(exercises)
    );
router.push("/entrainement-avc");
  };
return (
    <div className="page-container">
      <div className="main-card">
        <h1 className="main-title">Nouveau Patient</h1>
<div className="assistant-box">
          <div className="assistant-avatar">🧠</div>
<div className="assistant-message">
            Décris les symptômes séparés par virgule.
          </div>
        </div>
<textarea
          className="exercise-input"
          rows={6}
          placeholder="Exemple : aphasie, mémoire, lecture lente, AVC gauche"
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
        />
<div className="button-row">
          <button
            className="primary-button success-button"
            onClick={generateProgram}
          >
            Créer Programme IA
          </button>
        </div>
      </div>
    </div>
  );
}
