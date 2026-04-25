"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LangageAVCPage() {
  const router = useRouter();

  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  const verify = () => {
    if (answer.toLowerCase().includes("bonjour")) {
      setFeedback("✅ Bonne réponse");
    } else {
      setFeedback("❌ Essaie encore");
    }
  };

  return (
    <div className="page-container">
      <div className="main-card">

        <h1 className="main-title">Langage AVC</h1>

        <div className="exercise-card">
          <div className="exercise-title">
            Rééducation du langage
          </div>

          <div className="exercise-question">
            Écris un mot de salutation
          </div>

          <input
            className="exercise-input"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Écris ici"
          />

          <div className="button-row">
            <button
              className="primary-button"
              onClick={verify}
            >
              Vérifier
            </button>

            <button
              className="primary-button success-button"
              onClick={() => router.push("/exercices-avc")}
            >
              Retour
            </button>
          </div>

          {feedback && (
            <div className="feedback-box">
              {feedback}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
