"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ExercicesAVCPage() {
  const [allExercises, setAllExercises] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const storedExercises =
      JSON.parse(localStorage.getItem("generatedExercises")) || [];

    setAllExercises(storedExercises);
  }, []);

  const startTraining = () => {
    localStorage.setItem(
      "currentExercisePack",
      JSON.stringify(allExercises)
    );

    router.push("/entrainement-avc");
  };

  return (
    <div className="page-container">
      <div className="main-card">

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

          {allExercises.length === 0 ? (
            <p>Aucun exercice généré.</p>
          ) : (
            <>
              <p style={{ marginBottom: "25px" }}>
                {allExercises.length} exercices générés automatiquement.
              </p>

              <button
                className="primary-button success-button"
                onClick={startTraining}
              >
                Lancer Programme AVC IA
              </button>
            </>
          )}
        </div>

        <div className="button-row">
          <button
            className="primary-button blue-button"
            onClick={() => router.push("/")}
          >
            Retour Accueil
          </button>
        </div>
      </div>
    </div>
  );
}
