"use client";

import { useState } from "react";
import Link from "next/link";

export default function ComprehensionAuditivePage() {
  const [step, setStep] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [dysMode, setDysMode] = useState(true);

const exercises = [
    {
      sentence: "Paul mange une pomme.",
      question: "Que mange Paul ?",
      answer: "pomme",
    },
    {
      sentence: "Marie marche dans le parc.",
      question: "Où marche Marie ?",
      answer: "parc",
    },
    {
      sentence: "Luc boit un verre d’eau.",
      question: "Que boit Luc ?",
      answer: "eau",
    },
    {
      sentence: "Le chat dort sur le canapé.",
      question: "Qui dort ?",
      answer: "chat",
    },
  ];

const current = exercises[step];

const speakSentence = () => {
    const speech = new SpeechSynthesisUtterance(
      current.sentence
    );

speech.lang = "fr-FR";

window.speechSynthesis.speak(speech);
  };

const verifyAnswer = () => {
    const normalized = answer
      .toLowerCase()
      .trim();

const expected = current.answer
      .toLowerCase()
      .trim();

if (normalized.includes(expected)) {
      setFeedback("✅ Bonne compréhension.");
      setScore(score + 1);
    } else {
      setFeedback(
        `❌ Réponse attendue : ${current.answer}`
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
      module: "Compréhension Auditive",
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
          Compréhension Auditive
        </h1>

<div className="assistant-box">
          <div className="assistant-avatar">🎧</div>

<div className="assistant-message">
            Écoute puis réponds doucement.
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
<button
              className="primary-button success-button"
              onClick={speakSentence}
            >
              🔊 Écouter
            </button>
<div
              className={`exercise-question ${
                dysMode ? "dyslexia-font" : ""
              }`}
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
            onClick={nextExercise}
          >
            Suivant
          </button>

<Link href="/images-langage">
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

