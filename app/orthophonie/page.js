"use client";

import { useState } from "react";
import Link from "next/link";

export default function OrthophoniePage() {
  const [step, setStep] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [dysMode, setDysMode] = useState(true);

const exercises = [
    {
      type: "son",
      question: "Lis à voix haute : MA",
      answer: "ma",
      helper: "Prononce lentement : mmmmm + aaaa",
    },
    {
      type: "mot",
      question: "Complète : Je bois de l'____",
      answer: "eau",
      helper: "Pense à quelque chose qu'on boit.",
    },
    {
      type: "dys",
      question: "Quel mot est correct ?",
      choices: ["livre", "livve", "lrvie"],
      answer: "livre",
      helper: "Observe bien les lettres.",
    },
    {
      type: "ecriture",
      question: "Écris : maison",
      answer: "maison",
      helper: "Prends ton temps.",
    },
    {
      type: "memoire",
      question: "Retiens ces mots : chat - pomme - soleil",
      answer: "chat pomme soleil",
      helper: "Lis les mots puis écris-les.",
    },
  ];

const current = exercises[step];
const saveProgress = (finalScore) => {
    const history = JSON.parse(
      localStorage.getItem("sessionHistory")
    ) || [];
const newSession = {
      date: new Date().toLocaleDateString(),
      score: finalScore,
      module: "Orthophonie AVC + Dys",
    };
const updated = [...history, newSession];
localStorage.setItem(
      "sessionHistory",
      JSON.stringify(updated)
    );
  };
const verifyAnswer = () => {
    const normalizedAnswer = answer
      .toLowerCase()
      .trim();
const expected = current.answer
      .toLowerCase()
      .trim();
if (normalizedAnswer === expected) {
      setFeedback("✅ Très bien, continue.");
      setScore(score + 1);
    } else {
      setFeedback(
        `❌ Réponse attendue : ${current.answer}`
      );
    }
  };
const nextExercise = () => {
    setFeedback("");
    setAnswer("");
if (step < exercises.length - 1) {
      setStep(step + 1);
    } else {
      const finalScore = Math.round(
        (score / exercises.length) * 100
      );
saveProgress(finalScore);
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
          Orthophonie AVC & Dys
        </h1>
<div className="assistant-box">
          <div className="assistant-avatar">🧠</div>
<div className="assistant-message">
            L’IA vous accompagne étape par étape.
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
              {current.question}
            </div>
<div
              style={{
                color: "#64748b",
                fontSize: "18px",
                marginBottom: "20px",
              }}
            >
              {current.helper}
            </div>
{current.choices ? (
              <div
                style={{
                  display: "flex",
                  gap: "15px",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                {current.choices.map((choice) => (
                  <button
                    key={choice}
                    className="primary-button"
                    onClick={() => setAnswer(choice)}
                  >
                    {choice}
                  </button>
                ))}
              </div>
            ) : (
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
            )}
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
<Link href="/profil">
            <button className="primary-button warning-button">
              Arrêter
            </button>
          </Link>
        </div>
{feedback && (
          <div className="feedback-box">
            {feedback}
          </div>
        )}
<div className="score-box">
          Score actuel : {score}
        </div>
</div>
    </div>
  );
}
