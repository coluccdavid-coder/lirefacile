"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function EvaluationCompletePage() {
  const router = useRouter();
const [step, setStep] = useState(0);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
const tests = [
    {
      type: "memoire",
      question: "Retiens ces mots : chat — soleil — pomme",
      helper: "Écris les 3 mots dans le bon ordre.",
      answer: "chat soleil pomme",
    },
    {
      type: "lecture",
      question: "Complète : Le chat boit du ____",
      helper: "Trouve le mot manquant.",
      answer: "lait",
    },
    {
      type: "attention",
      question: "Trouve l’intrus : pomme / banane / voiture / orange",
      helper: "Quel mot n’est pas un fruit ?",
      answer: "voiture",
    },
    {
      type: "langage",
      question: "Écris un objet que l’on trouve dans une cuisine",
      helper: "Exemple : table, chaise, verre…",
      answer: "table",
    },
    {
      type: "dys",
      question: "Quel mot est correctement écrit ?",
      helper: "Choisis le bon mot.",
      choices: ["maison", "miason", "maosin"],
      answer: "maison",
    },
  ];

const current = tests[step];
const verifyAnswer = () => {
    const normalized = answer
      .toLowerCase()
      .trim();
const expected = current.answer
      .toLowerCase()
      .trim();
if (normalized.includes(expected)) {
      setFeedback("✅ Bonne réponse");
      setScore((prev) => prev + 1);
    } else {
      setFeedback(
        `❌ Réponse attendue : ${current.answer}`
      );
    }
  };
const nextStep = () => {
    setAnswer("");
    setFeedback("");
if (step < tests.length - 1) {
      setStep((prev) => prev + 1);
      return;
    }
const finalPercent = Math.round(
      (score / tests.length) * 100
    );
const evaluation = {
      memory: score >= 1,
      attention: score >= 2,
      dyslexia: score <= 3,
      reading: score >= 2,
      score: finalPercent,
    };
localStorage.setItem(
      "evaluation",
      JSON.stringify(evaluation)
    );
const history = JSON.parse(
      localStorage.getItem("sessionHistory")
    ) || [];
const updatedHistory = [
      ...history,
      {
        date: new Date().toLocaleDateString(),
        score: finalPercent,
        module: "Évaluation Cognitive",
      },
    ];

localStorage.setItem(
      "sessionHistory",
      JSON.stringify(updatedHistory)
    );

router.push("/profil");
  };

return (
    <div className="page-container">
      <div className="main-card fade-in">

<h1 className="main-title">
          Évaluation Cognitive Interactive
        </h1>

<div className="assistant-box">
          <div className="assistant-avatar">🧠</div>

<div className="assistant-message">
            L’IA analyse progressivement le patient.
          </div>
        </div>

<div className="progress-container">
          <div
            className="progress-bar"
            style={{
              width: `${
                ((step + 1) / tests.length) * 100
              }%`,
            }}
          />
        </div>

<div className="exercise-card">

<div className="exercise-title">
            Test {step + 1} / {tests.length}
          </div>

<div className="exercise-content">

<div className="exercise-question">
              {current.question}
            </div>

<div
              style={{
                color: "#64748b",
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
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Écris ta réponse"
                className="exercise-input"
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
            onClick={nextStep}
          >
            {step === tests.length - 1
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
          Score : {score}
        </div>

</div>
    </div>
  );
}
