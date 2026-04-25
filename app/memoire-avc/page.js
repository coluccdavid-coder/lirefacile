"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function MemoireAVCPage() {
  const router = useRouter();

const exercises = [
    {
      words: "arbre — maison — soleil",
      answer: ["arbre", "maison", "soleil"],
    },
    {
      words: "chat — vélo — livre",
      answer: ["chat", "vélo", "livre"],
    },
    {
      words: "clé — fenêtre — pomme",
      answer: ["clé", "fenêtre", "pomme"],
    },
  ];

const [step, setStep] = useState(0);
  const [showWords, setShowWords] = useState(true);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);

const current = exercises[step];

useEffect(() => {
    setShowWords(true);

const timer = setTimeout(() => {
      setShowWords(false);
    }, 4000);

return () => clearTimeout(timer);
  }, [step]);

const verifyAnswer = () => {
    const normalized = answer.toLowerCase();

const correct = current.answer.every((word) =>
      normalized.includes(word)
    );

if (correct) {
      setFeedback("✅ Bonne mémoire");
      setScore((prev) => prev + 1);
    } else {
      setFeedback(
        `❌ Réponse attendue : ${current.answer.join(", ")}`
      );
    }
  };

const nextExercise = () => {
    setAnswer("");
    setFeedback("");

if (step < exercises.length - 1) {
      setStep((prev) => prev + 1);
    } else {
      router.push("/exercices-avc");
    }
  };

return (
    <div className="page-container">
      <div className="main-card fade-in">

<h1 className="main-title">
          Mémoire AVC
        </h1>

<div className="progress-container">
          <div
            className="progress-bar"
            style={{
              width: `${((step + 1) / exercises.length) * 100}%`,
            }}
          />
        </div>

<div className="exercise-card">

<div className="exercise-title">
            Exercice {step + 1} / {exercises.length}
          </div>

<div className="exercise-question">
            {showWords
              ? `Retiens : ${current.words}`
              : "Quels étaient les mots ?"}
          </div>

<input
            className="exercise-input"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Écris les mots retenus"
          />

<div
            className="button-row"
            style={{ justifyContent: "center", marginTop: "30px" }}
          >
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
              {step === exercises.length - 1
                ? "Terminer"
                : "Suivant"}
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


