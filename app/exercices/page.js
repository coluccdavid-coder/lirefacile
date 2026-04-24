"use client";

import { useState } from "react";

export default function ExercicesPage() {

  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);

  const assistantMessage = "Je vais t'aider aujourd'hui.";

  const exercise = {
    question: "La femme lit un ____ sur le canapé.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
    answer: "livre"
  };

  const verifyAnswer = () => {
    if (answer.toLowerCase().trim() === exercise.answer) {
      setFeedback("✅ Bonne réponse !");
      setScore(score + 1);
    } else {
      setFeedback("❌ Essaie encore.");
    }
  };

  const nextExercise = () => {
    setAnswer("");
    setFeedback("");
  };

  return (
    <div className="page-container">
      <div className="main-card">
        <h1 className="main-title">Exercices AVC</h1>

        <div className="assistant-box">
          <div className="assistant-avatar">🧠</div>
          <div className="assistant-message">
            {assistantMessage}
          </div>
        </div>

        <div className="exercise-card">
          <div className="exercise-title">
            Exercice Cognitif
          </div>

          <div className="exercise-content">
            <img
              src={exercise.image}
              alt="illustration"
              style={{
                width: "180px",
                borderRadius: "20px"
              }}
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
