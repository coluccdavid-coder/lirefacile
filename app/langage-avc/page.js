"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LangageAVCPage() {
  const router = useRouter();

  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);

  const verifyAnswer = () => {
    const normalized = answer.toLowerCase().trim();

    if (
      normalized.includes("lait")
    ) {
      setFeedback("✅ Bonne réponse");
      setScore(1);
    } else {
      setFeedback("❌ Réponse attendue : lait");
    }
  };

  return (
    <div className="page-container">
      <div className="main-card fade-in">

        <h1 className="main-title">
          Langage AVC
        </h1>

        <div className="exercise-card">

          <div className="exercise-title">
            Rééducation du langage
          </div>

          <div className="exercise-question">
            Complète : Le chat boit du _____
          </div>

          <input
            className="exercise-input"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Écris ta réponse"
          />

          <div
            className="button-row"
            style={{
              justifyContent: "center",
              marginTop: "30px",
            }}
          >
            <button
              className="primary-button"
              onClick={verifyAnswer}
            >
              Vérifier
            </button>

            <button
              className="primary-button success-button"
              onClick={() => router.push("/exercices-avc")}
            >
              Retour AVC
            </button>
          </div>

          {feedback && (
            <div className="feedback-box">
              {feedback}
            </div>
          )}

          <div className="score-box">
            Score : {score} / 1
          </div>

        </div>

      </div>
    </div>
  );
}
