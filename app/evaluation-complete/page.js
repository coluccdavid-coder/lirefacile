"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EvaluationCompletePage() {
  const router = useRouter();

const [step, setStep] = useState(0);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [showMemoryWords, setShowMemoryWords] = useState(true);

const tests = [
    {
      type: "image",
      image:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800",
      question: "Que vois-tu sur cette image ?",
      helper: "Décris ce que tu observes.",
      answer: "femme",
    },
    {
      type: "memoire",
      question: "chat — soleil — pomme",
      hiddenQuestion: "Quels étaient les 3 mots ?",
      helper: "Retiens les mots avant qu’ils disparaissent.",
      answer: "chat soleil pomme",
      memory: true,
    },
    {
      type: "lecture",
      question: "Complète : Le chien mange un ____",
      helper: "Trouve le mot manquant.",
      answer: "os",
    },
    {
      type: "image",
      image:
        "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=800",
      question: "Quel animal vois-tu ?",
      helper: "Observe bien l’image.",
      answer: "chien",
    },
    {
      type: "attention",
      question: "Trouve l’intrus : avion / voiture / chaise / train",
      helper: "Quel mot n’est pas un moyen de transport ?",
      answer: "chaise",
    },
    {
      type: "dys",
      question: "Quel mot est correctement écrit ?",
      choices: ["ecole", "école", "éccole"],
      answer: "école",
    },
    {
      type: "memoire",
      question: "rouge — livre — vélo",
      hiddenQuestion: "Quels mots as-tu retenu ?",
      helper: "Observe quelques secondes.",
      answer: "rouge livre vélo",
      memory: true,
    },
    {
      type: "lecture",
      question: "Complète : Le bébé dort dans un ____",
      helper: "Trouve le mot.",
      answer: "lit",
    },
    {
      type: "image",
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800",
      question: "Quel fruit vois-tu ?",
      helper: "Regarde attentivement.",
      answer: "pomme",
    },
    {
      type: "attention",
      question: "Trouve l’intrus : banane / fraise / table / orange",
      helper: "Quel mot n’est pas un fruit ?",
      answer: "table",
    },
    {
      type: "langage",
      question: "Donne un objet que l’on trouve dans une cuisine",
      helper: "Exemple : verre, assiette.",
      answer: "verre",
    },
    {
      type: "memoire",
      question: "clé — jardin — ballon",
      hiddenQuestion: "Quels étaient les mots ?",
      helper: "Observe avant disparition.",
      answer: "clé jardin ballon",
      memory: true,
    },
  ];

const current = tests[step];

useEffect(() => {
    if (current.memory) {
      setShowMemoryWords(true);

const timer = setTimeout(() => {
        setShowMemoryWords(false);
      }, 4000);

return () => clearTimeout(timer);
    }
  }, [step]);

const verifyAnswer = () => {
    const normalized = answer
      .toLowerCase()
      .trim();

const expected = current.answer
      .toLowerCase()
      .trim();

if (normalized.includes(expected)) {
      setScore((prev) => prev + 1);
      setFeedback("✅ Bonne réponse");
    } else {
      setFeedback(`❌ Réponse attendue : ${current.answer}`);
    }
  };

const nextStep = () => {
    setAnswer("");
    setFeedback("");

if (step < tests.length - 1) {
      setStep((prev) => prev + 1);
      return;
    }

const finalScore = Math.round(
      (score / tests.length) * 100
    );

localStorage.setItem(
      "evaluation",
      JSON.stringify({
        score: finalScore,
        memory: score < 8,
        dyslexia: score < 7,
        attention: score < 9,
      })
    );

router.push("/profil");
  };

return (
    <div className="page-container">
      <div className="main-card fade-in">

<h1 className="main-title">
          Évaluation Orthophonique
        </h1>

<div className="assistant-box">
          <div className="assistant-avatar">🧠</div>

<div className="assistant-message">
            Test cognitif avancé AVC et Dys.
          </div>
        </div>

<div className="progress-container">
          <div
            className="progress-bar"
            style={{
              width: `${((step + 1) / tests.length) * 100}%`,
            }}
          />
        </div>

<div className="exercise-card">
          <div className="exercise-title">
            Test {step + 1} / {tests.length}
          </div>

<div className="exercise-content">

{current.image && (
              <img
                src={current.image}
                alt="exercice"
                style={{
                  width: "260px",
                  borderRadius: "20px",
                  marginBottom: "25px",
                  objectFit: "cover",
                }}
              />
            )}

{current.memory ? (
              <div className="exercise-question">
                {showMemoryWords
                  ? current.question
                  : current.hiddenQuestion}
              </div>
            ) : (
              <div className="exercise-question">
                {current.question}
              </div>
            )}

<div
              style={{
                marginTop: "20px",
                color: "#64748b",
              }}
            >
              {current.helper}
            </div>

{current.choices ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "15px",
                  marginTop: "25px",
                  flexWrap: "wrap",
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
                style={{ marginTop: "25px" }}
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
              ? "Fin du test"
              : "Suivant"}
          </button>
        </div>

{feedback && (
          <div className="feedback-box">
            {feedback}
          </div>
        )}

<div className="score-box">
          Score : {score} / {tests.length}
        </div>

</div>
    </div>
  );
}
