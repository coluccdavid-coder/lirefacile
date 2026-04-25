"use client";
import { useState } from "react";
import Link from "next/link";
export default function ParoleGuideePage() {
  const [step, setStep] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [dysMode, setDysMode] = useState(true);
const exercises = [
    {
      text: "MA",
      helper: "Prononce lentement : MMMMM + AAAA",
    },
    {
      text: "PA",
      helper: "Souffle doucement puis prononce.",
    },
    {
      text: "MAMAN",
      helper: "Découpe : MA - MAN",
    },
    {
      text: "BONJOUR",
      helper: "Lis lentement.",
    },
    {
      text: "JE VEUX DE L’EAU",
      helper: "Essaie phrase complète.",
    },
  ];

const current = exercises[step];
const validateSpeech = () => {
    setFeedback(
      "✅ Très bien. Continue doucement."
    );
setScore(score + 1);
  };
const saveProgress = (finalScore) => {
    const history = JSON.parse(
      localStorage.getItem("sessionHistory")
    ) || [];
const newSession = {
      date: new Date().toLocaleDateString(),
      score: finalScore,
      module: "Parole Guidée",
    };
const updated = [...history, newSession];
localStorage.setItem(
      "sessionHistory",
      JSON.stringify(updated)
    );
  };
const nextExercise = () => {
    setFeedback("");
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
          Parole Guidée
        </h1>
<div className="assistant-box">
          <div className="assistant-avatar">🗣️</div>
<div className="assistant-message">
            Répète doucement pour stimuler la parole.
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
              style={{
                fontSize: "72px",
                letterSpacing: "6px",
              }}
            >
              {current.text}
            </div>
<div
              style={{
                color: "#64748b",
                fontSize: "22px",
                lineHeight: "1.8",
              }}
            >
              {current.helper}
            </div>
</div>
        </div>
<div className="button-row">
<button
            className="primary-button"
            onClick={validateSpeech}
          >
            J’ai prononcé
          </button>

<button
            className="primary-button success-button"
            onClick={nextExercise}
          >
            Suivant
          </button>
<Link href="/lecture-therapeutique">
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
          Progression : {score}
        </div>
</div>
    </div>
  );
}
