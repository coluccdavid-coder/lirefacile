"use client";

import { useState } from "react";
import Link from "next/link";

export default function LectureTherapeutiquePage() {
  const [step, setStep] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [dysMode, setDysMode] = useState(true);

const stories = [
    {
      text: "Paul marche dans le jardin. Il voit un chat noir près d’un arbre.",
      question: "Quel animal Paul voit-il ?",
      answer: "chat",
    },
    {
      text: "Marie prépare un gâteau dans la cuisine avec du chocolat.",
      question: "Que prépare Marie ?",
      answer: "gâteau",
    },
    {
      text: "Luc boit un verre d’eau après une promenade.",
      question: "Que boit Luc ?",
      answer: "eau",
    },
  ];

const current = stories[step];

const saveSession = (finalScore) => {
    const history = JSON.parse(
      localStorage.getItem("sessionHistory")
    ) || [];

const newSession = {
      date: new Date().toLocaleDateString(),
      score: finalScore,
      module: "Lecture Thérapeutique",
    };

const updated = [...history, newSession];

localStorage.setItem(
      "sessionHistory",
      JSON.stringify(updated)
    );
  };

const verifyAnswer = () => {
    const userAnswer = answer
      .toLowerCase()
      .trim();

const expected = current.answer
      .toLowerCase()
      .trim();

if (userAnswer === expected) {
      setFeedback("✅ Bonne compréhension.");
      setScore(score + 1);
    } else {
      setFeedback(
        `❌ Réponse attendue : ${current.answer}`
      );
    }
  };

const nextStep = () => {
    setAnswer("");
    setFeedback("");

if (step < stories.length - 1) {
      setStep(step + 1);
    } else {
      const finalScore = Math.round(
        (score / stories.length) * 100
      );

saveSession(finalScore);

alert(
        `Lecture terminée. Score : ${finalScore}%`
      );

window.location.href = "/historique";
    }
  };

return (
    <div className="page-container">
      <div className="main-card fade-in">

<h1 className="main-title">
          Lecture Thérapeutique
        </h1>

<div className="assistant-box">
          <div className="assistant-avatar">📚</div>

<div className="assistant-message">
            Lecture douce pour mémoire et langage.
          </div>
        </div>

<div className="button-row">
          <button
            className="primary-button"
            onClick={() => setDysMode(!dysMode)}
          >
            {dysMode ? "Mode Dys ON" : "Mode Dys OFF"}
          </button>
        </div>

<div className="progress-container">
          <div
            className="progress-bar"
            style={{
              width: `${
                ((step + 1) / stories.length) * 100
              }%`,
            }}
          />
        </div>

<div className="exercise-card">
          <div className="exercise-title">
            Lecture {step + 1} / {stories.length}
          </div>

<div className="exercise-content">

<div
              className={`exercise-question ${
                dysMode ? "dyslexia-font" : ""
              }`}
              style={{ lineHeight: "2.2" }}
            >
              {current.text}
            </div>

<div
              style={{
                fontSize: "24px",
                fontWeight: "600",
              }}
            >
              {current.question}
            </div>

<input
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
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
            onClick={nextStep}
          >
            Suivant
          </button>

<Link href="/orthophonie">
            <button className="primary-button warning-button">
              Retour
            </button>
          </Link>
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
