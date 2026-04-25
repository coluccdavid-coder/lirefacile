"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ExercicesDysPage() {
  const router = useRouter();

  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [dysMode, setDysMode] = useState(true);

  const exercises = [
    {
      question: "Le chat dort sur le ____.",
      answer: "canapé",
    },
    {
      question: "Le soleil brille dans le ____.",
      answer: "ciel",
    },
    {
      question: "La fille lit un ____.",
      answer: "livre",
    },
    {
      question: "Le chien mange une ____.",
      answer: "croquette",
    },
  ];

  const verifyAnswer = () => {
    const correct =
      answer.toLowerCase().trim() ===
      exercises[currentExercise].answer.toLowerCase();

    if (correct) {
      setFeedback("✅ Bonne réponse");
      setScore(score + 1);
    } else {
      setFeedback(
        "❌ Réponse attendue : " +
          exercises[currentExercise].answer
      );
    }
  };

  const nextExercise = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
      setAnswer("");
      setFeedback("");
    } else {
      localStorage.setItem(
        "dys-score",
        JSON.stringify(score)
      );

      router.push("/historique");
    }
  };

  return (
    <div className="page-container">
      <div className="main-card fade-in">

        <h1 className="main-title">
          Exercices Dyslexie
        </h1>

        <div className="assistant-box">
          <div className="assistant-avatar">🧠</div>

          <div className="assistant-message">
            Lecture adaptée Dyslexie activée
          </div>
        </div>

        <div className="button-row">
          <button
            className="primary-button"
            onClick={() => setDysMode(!dysMode)}
          >
            {dysMode
              ? "Mode Dys ON"
              : "Mode Dys OFF"}
          </button>
        </div>

        <div className="progress-container">
          <div
            className="progress-bar"
            style={{
              width: `${
                ((currentExercise + 1) /
                  exercises.length) *
                100
              }%`,
            }}
          />
        </div>

        <div className="exercise-card">

          <div className="exercise-title">
            Exercice {currentExercise + 1} /{" "}
            {exercises.length}
          </div>

          <div className="exercise-content">

            <div
              className={`exercise-question ${
                dysMode ? "dyslexia-font" : ""
              }`}
            >
              {exercises[currentExercise].question}
            </div>

            <input
              value={answer}
              onChange={(e) =>
                setAnswer(e.target.value)
              }
              placeholder="Écris ta réponse"
              className={`exercise-input ${
                dysMode ? "dyslexia-font" : ""
              }`}
            />

          </div>
        </div>

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

          <button
            className="primary-button warning-button"
            onClick={() => router.push("/profil")}
          >
            Abandonner
          </button>

        </div>

        {feedback && (
          <div className="feedback-box">
            {feedback}
          </div>
        )}

        <div className="score-box">
          Score : {score}
        </div>

      </div>
    </div>
  );
}
