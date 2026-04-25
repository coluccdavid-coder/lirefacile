"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ExercicesPage() {
  const router = useRouter();

  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [dysMode, setDysMode] = useState(false);

  const assistantMessage = "Je vais t'aider aujourd'hui.";

  const exercises = [
    {
      question: "La femme lit un ____ sur le canapé.",
      image:
        "https://images.unsplash.com/photo-1516979187457-637abb4f9353",
      answer: "livre",
    },
    {
      question: "Le chat dort sur le ____.",
      image:
        "https://images.unsplash.com/photo-1511044568932-338cba0ad803",
      answer: "lit",
    },
    {
      question: "Le chien boit de l'____.",
      image:
        "https://images.unsplash.com/photo-1518717758536-85ae29035b6d",
      answer: "eau",
    },
  ];

  const exercise = exercises[exerciseIndex];

  const verifyAnswer = () => {
    if (
      answer.toLowerCase().trim() ===
      exercise.answer.toLowerCase()
    ) {
      setFeedback("✅ Bonne réponse !");
      setScore((prev) => prev + 1);
    } else {
      setFeedback("❌ Essaie encore.");
    }
  };

  const nextExercise = () => {
    const next = exerciseIndex + 1;

    if (next >= exercises.length) {
      const existingHistory =
        JSON.parse(localStorage.getItem("sessionHistory")) || [];

      const newSession = {
        date: new Date().toLocaleDateString(),
        score,
        fatigue: feedback.includes("❌") ? "Modérée" : "Faible",
      };

      existingHistory.push(newSession);

      localStorage.setItem(
        "sessionHistory",
        JSON.stringify(existingHistory)
      );

      router.push("/historique");
      return;
    }

    setExerciseIndex(next);
    setAnswer("");
    setFeedback("");
  };

  return (
    <div
      className={`page-container ${
        dysMode ? "dyslexia-font" : ""
      }`}
    >
      <div className="main-card">
        <h1 className="main-title">Exercices AVC</h1>

        <div style={{ marginBottom: "20px" }}>
          <button
            className="warning-button"
            onClick={() => setDysMode(!dysMode)}
          >
            {dysMode ? "Mode Normal" : "Mode Dys"}
          </button>
        </div>

        <div className="assistant-box">
          <div className="assistant-avatar">🧠</div>

          <div className="assistant-message">
            {assistantMessage}
          </div>
        </div>

        <div className="exercise-card">
          <div className="exercise-title">
            Exercice {exerciseIndex + 1}
          </div>

          <div className="exercise-content">
            <img
              src={exercise.image}
              alt="illustration"
              className="exercise-image"
            />

            <div className="exercise-question">
              {exercise.question}
            </div>

            <input
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Écris ta réponse"
              className="exercise-input"
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
            className="warning-button"
            onClick={() => router.push("/")}
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
