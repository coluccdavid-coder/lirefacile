"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EvaluationPage() {
  const router = useRouter();

  const [memory, setMemory] = useState(false);
  const [attention, setAttention] = useState(false);
  const [dyslexia, setDyslexia] = useState(false);
  const [reading, setReading] = useState(false);

  const finishEvaluation = () => {
    const data = {
      memory,
      attention,
      dyslexia,
      reading,
    };

    localStorage.setItem(
      "evaluation",
      JSON.stringify(data)
    );

    router.push("/profil");
  };

  return (
    <div className="page-container">
      <div className="main-card fade-in">
        <h1 className="main-title">
          Évaluation Cognitive
        </h1>

        <p className="subtitle">
          Sélectionne les difficultés observées.
        </p>

        <div className="exercise-box">

          <div style={{ marginBottom: "25px" }}>
            <label className="section-title">
              <input
                type="checkbox"
                checked={memory}
                onChange={() => setMemory(!memory)}
                style={{ marginRight: "15px" }}
              />
              Difficultés de mémoire
            </label>
          </div>

          <div style={{ marginBottom: "25px" }}>
            <label className="section-title">
              <input
                type="checkbox"
                checked={attention}
                onChange={() => setAttention(!attention)}
                style={{ marginRight: "15px" }}
              />
              Difficultés d’attention
            </label>
          </div>

          <div style={{ marginBottom: "25px" }}>
            <label className="section-title">
              <input
                type="checkbox"
                checked={dyslexia}
                onChange={() => setDyslexia(!dyslexia)}
                style={{ marginRight: "15px" }}
              />
              Dyslexie
            </label>
          </div>

          <div style={{ marginBottom: "25px" }}>
            <label className="section-title">
              <input
                type="checkbox"
                checked={reading}
                onChange={() => setReading(!reading)}
                style={{ marginRight: "15px" }}
              />
              Difficultés de lecture
            </label>
          </div>

        </div>

        <div
          className="button-row"
          style={{ justifyContent: "center" }}
        >
          <button
            className="primary-button success-button"
            onClick={finishEvaluation}
          >
            Terminer l’évaluation
          </button>
        </div>
      </div>
    </div>
  );
}
