"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProgrammeDys() {
  const router = useRouter();

const [exercises, setExercises] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

useEffect(() => {
    const savedExercises =
      JSON.parse(localStorage.getItem("currentExercisePack")) || [];

// garde seulement les exercices DYS
    const dysExercises = savedExercises.filter((ex) => {
      const type = (ex.type || "").toLowerCase();

return (
        type.includes("lecture") ||
        type.includes("orthographe") ||
        type.includes("compréhension") ||
        type.includes("comprehension") ||
        type.includes("syllabe") ||
        type.includes("dys")
      );
    });

if (dysExercises.length > 0) {
      setExercises(dysExercises);
    }

setLoading(false);
  }, []);

const nextExercise = () => {
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      alert("Programme Dys terminé ✅");
      router.push("/exercices-dys");
    }
  };

if (loading) {
    return (
      <div className="page-container">
        <div className="main-card">
          <h1 className="main-title">Chargement...</h1>
        </div>
      </div>
    );
  }

if (exercises.length === 0) {
    return (
      <div className="page-container">
        <div className="main-card">
          <h1 className="main-title">Programme Dys</h1>

<div className="analysis-card">
            Aucun exercice généré.

<div className="button-row" style={{ marginTop: "30px" }}>
              <button
                className="primary-button blue-button"
                onClick={() => router.push("/nouveau-patient")}
              >
                Générer un programme
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

const currentExercise = exercises[currentIndex];

return (
    <div className="page-container">
      <div className="main-card">
        <h1 className="main-title">Programme Dys</h1>

<div className="assistant-box">
          <div className="assistant-avatar">📖</div>

<div className="assistant-message">
            Programme IA personnalisé basé sur symptômes + mémoire PDF.
          </div>
        </div>

<div className="progress-container">
          <div
            className="progress-bar"
            style={{
              width: `${
                ((currentIndex + 1) / exercises.length) * 100
              }%`,
            }}
          />
        </div>

<div className="analysis-card">
          <div className="analysis-label">
            {currentExercise.type}
          </div>

<div
            style={{
              marginTop: "20px",
              fontSize: "34px",
              lineHeight: "1.7",
            }}
          >
            {currentExercise.question}
          </div>

<div
            style={{
              marginTop: "20px",
              fontSize: "18px",
              color: "#64748b",
            }}
          >
            Exercice {currentIndex + 1} / {exercises.length}
          </div>

<div className="button-row">
            <button
              className="primary-button success-button"
              onClick={nextExercise}
            >
              Exercice suivant
            </button>

<button
              className="primary-button blue-button"
              onClick={() => router.push("/exercices-dys")}
            >
              Retour Dys
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
