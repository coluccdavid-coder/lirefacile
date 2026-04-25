"use client";
import { useState } from "react";
import Link from "next/link";
export default function EcritureGuideePage() {
  const [step, setStep] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [dysMode, setDysMode] = useState(true);
const exercises = [
    {
      word: "maison",
      helper: "Copie doucement le mot.",
    },
    {
      word: "chat",
      helper: "Écris chaque lettre lentement.",
    },
    {
      word: "pomme",
      helper: "Observe bien les lettres.",
    },
    {
      word: "bonjour",
      helper: "Prends ton temps.",
    },
    {
      word: "merci",
      helper: "Écris sans te presser.",
    },
  ];
const current = exercises[step];
const verifyAnswer = () => {
    const normalized = answer
      .toLowerCase()
      .trim();
const expected = current.word
      .toLowerCase()
      .trim();
if (normalized === expected) {
      setFeedback("✅ Très bien écrit.");
      setScore(score + 1);
    } else {
      setFeedback(
        `❌ Mot attendu : ${current.word}`
      );
    }
  };
const saveSession = (finalScore) => {
    const history = JSON.parse(
      localStorage.getItem("sessionHistory")
    ) || [];
const newSession = {
      date: new Date().toLocaleDateString(),
      score: finalScore,
      module: "Écriture Guidée",
    };
const updated = [...history, newSession];
localStorage.setItem(
      "sessionHistory",
      JSON.stringify(updated)
    );
  };
const nextExercise = () => {
    setAnswer("");
    setFeedback("");
if (step < exercises.length - 1) {
      setStep(step + 1);
    } else {
      const finalScore = Math.round(
        (score / exercises.length) * 100
      );
saveSession(finalScore);
alert(
        `Séance terminée. Score : ${finalScore}%`
      );
window.location.href = "/historique";
    }
  };
return (
    <div className="page-container">
      <div className="main-card fade-in">
<h1 className="main-title">
          Écriture Guidée
        </h1>
<div className="assistant-box">
          <div className="assistant-avatar">✍️</div>
<div className="assistant-message">
            Rééducation écriture douce.
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
                ((step + 1) / exercises.length) * 100
              }%`,
            }}
          />
        </div>
<div className="exercise-card">
<div className="exercise-title">
            Étape {step + 1} / {exercises.length}
          </div>
<div className="exercise-content">
<div
              className={`exercise-question ${
                dysMode ? "dyslexia-font" : ""
              }`}
            >
              Copie ce mot :
            </div>
<div
              style={{
                fontSize: "52px",
                fontWeight: "700",
                marginBottom: "20px",
              }}
            >
              {current.word}
            </div>
<div
              style={{
                color: "#64748b",
                marginBottom: "20px",
                fontSize: "18px",
              }}
            >
              {current.helper}
            </div>
<input
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Écris ici"
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
<Link href="/parole-guidee">
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
