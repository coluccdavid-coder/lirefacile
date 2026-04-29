"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function ExercicesAVC() {
  const [exercises, setExercises] = useState([]);
const router = useRouter();
useEffect(() => {
    const generated =
      JSON.parse(localStorage.getItem("generatedExercises")) || [];
setExercises(generated);
  }, []);
const startProgram = () => {
    if (exercises.length === 0) {
      alert("Aucun exercice généré.");
      return;
    }
localStorage.setItem(
      "currentExercisePack",
      JSON.stringify(exercises)
    );
router.push("/entrainement-avc");
  };
return (
    <div className="page-container">
      <div className="main-card fade-in">
        <h1 className="main-title">Exercices AVC</h1>
<div className="assistant-box">
          <div className="assistant-avatar">🧠</div>
          <div className="assistant-message">
            Programme IA construit depuis tous les PDF thérapeutiques.
          </div>
        </div>
<div className="analysis-box">
          <div className="analysis-title">
            Exercices fusionnés
          </div>
{exercises.length === 0 ? (
            <p>Aucun exercice généré.</p>
          ) : (
            <>
              <div style={{ marginBottom: "20px" }}>
                {exercises.length} exercices disponibles.
              </div>
{exercises.map((exercise, index) => (
                <div
                  key={index}
                  className="analysis-card"
                  style={{ marginBottom: "18px" }}
                >
                  <div className="analysis-label">
                    {exercise.type}
                  </div>
<div className="analysis-value">
                    {exercise.question}
                  </div>
                </div>
              ))}
<div className="button-row">
                <button
                  className="primary-button success-button"
                  onClick={startProgram}
                >
                  Lancer Programme IA
                </button>
              </div>
            </>
          )}
        </div>
<div className="button-row">
          <Link href="/">
            <button className="primary-button blue-button">
              Retour Accueil
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
