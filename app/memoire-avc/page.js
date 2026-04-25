"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function MemoireAVCPage() {
  const router = useRouter();

  const [showWords, setShowWords] = useState(true);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  const words = "chat — livre — soleil";

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWords(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const verify = () => {
    const normalized = answer.toLowerCase();

    if (
      normalized.includes("chat") &&
      normalized.includes("livre") &&
      normalized.includes("soleil")
    ) {
      setFeedback("✅ Très bonne mémoire");
    } else {
      setFeedback("❌ Réponse attendue : chat livre soleil");
    }
  };

  return (
    <div className="page-container">
      <div className="main-card">

        <h1 className="main-title">Mémoire AVC</h1>

        <div className="exercise-card">

          <div className="exercise-question">
            {showWords
              ? words
              : "Quels étaient les mots ?"}
          </div>

          <input
            className="exercise-input"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Écris les mots"
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
