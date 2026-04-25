"use client";

import { useEffect, useState } from "react";

export default function ExercicesAVCPage() {
  const [exercises, setExercises] = useState([]);
  const [step, setStep] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);

  useEffect(() => {
    const saved =
      JSON.parse(
        localStorage.getItem("aiGeneratedExercises")
      ) || [];

    setExercises(saved);
  }, []);

  const current = exercises[step];

  const verifyAnswer = () => {
    if (!current) return;

    const normalized = answer.toLowerCase().trim();
    const expected = current.answer
      .toLowerCase()
      .trim();

    if (normalized.includes(expected)) {
      setScore((prev) => prev + 1);
      setFeedback("✅ Bonne réponse");
    } else {
      setFeedback(
        `❌ Réponse attendue : ${current.answer}`
      );
    }
  };

  const nextExercise = () => {
    setAnswer("");
    setFeedback("");

    if (step < exercises.length - 1) {
      setStep((prev) => prev + 1);
    }
  };

  if (exercises.length === 0) {
    return (
      <div className="page-container">
        <div className="main-card">
          <h1 className="main-title">
            Exercices AVC
          </h1>

          <p>
            Aucun exercice IA généré.
          </p>

          <p>
            Ajoute un PDF dans Bibliothèque PDF.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="main-card fade-in">

        <h1 className="main-title">
          Exercices AVC IA
        </h1>

        <div className="progress-container">
          <div
            className="progress-bar"
            style={{
              width: `${
                ((step + 1) / exercises.length) * 100
              }%`,
            }}
          />
        </div>

        <div className="exercise-card">

          <div className="exercise-title">
            Exercice {step + 1} / {exercises.length}
          </div>

          <div className="exercise-question">
            {current.question}
          </div>

          <input
            className="exercise-input"
            value={answer}
            onChange={(e) =>
              setAnswer(e.target.value)
            }
            placeholder="Réponse"
          />

          <div className="button-row">
            <button
              className="primary-button"
              onClick={verifyAnswer}
            >
              Vérifier
            </button>

            <button
              className="primary-button success-button"
              onClick={nextExercise}
            >
              Suivant
            </button>
          </div>

          {feedback && (
            <div className="feedback-box">
              {feedback}
            </div>
          )}

          <div className="score-box">
            Score : {score} / {exercises.length}
          </div>

        </div>

      </div>
    </div>
  );
}
