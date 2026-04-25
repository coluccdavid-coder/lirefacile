"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function PrononciationAVCPage() {
  const router = useRouter();
const exercises = [
    "Bonjour, je vais bien.",
    "Je mange une pomme.",
    "Le soleil est jaune.",
    "Je marche dans le jardin.",
  ];
const [step, setStep] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
const current = exercises[step];
const verifyAnswer = () => {
    const normalized = answer.toLowerCase().trim();
    const expected = current.toLowerCase().trim();
if (normalized === expected) {
      setFeedback("✅ Prononciation correcte");
      setScore((prev) => prev + 1);
    } else {
      setFeedback(`❌ Phrase attendue : ${current}`);
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
          Prononciation AVC
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
            Répète : {current}
          </div>
<input
            className="exercise-input"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Écris ce que tu as prononcé"
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
