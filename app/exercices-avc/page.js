"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ExercicesAVCPage() {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem("aiGeneratedExercises")) || [];

    setExercises(stored);
  }, []);

  return (
    <div className="page-container">
      <div className="main-card fade-in">
        <h1 className="main-title">Exercices AVC</h1>

        {exercises.length === 0 ? (
          <div className="analysis-box">
            <p style={{ fontSize: "22px" }}>
              Aucun exercice IA généré.
            </p>

            <Link href="/bibliotheque-pdf">
              <button className="primary-button" style={{ marginTop: "20px" }}>
                Aller vers Bibliothèque PDF IA
              </button>
            </Link>
          </div>
        ) : (
          <div className="dashboard-grid">
            {exercises.map((exercise, index) => (
              <div key={index} className="dashboard-card">
                <div className="dashboard-icon">🧠</div>

                <h2>{exercise.type?.toUpperCase()}</h2>

                <p>{exercise.question}</p>
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: "40px", textAlign: "center" }}>
          <Link href="/">
            <button className="primary-button">
              Retour Accueil
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
