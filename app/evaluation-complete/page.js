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
      type: "attention",
      question: "Trouve l’intrus : avion / voiture / chaise / train",
      helper: "Quel objet n’est pas un transport ?",
      answer: "chaise",
    },
    {
      type: "dys",
      question: "Quel mot est correctement écrit ?",
      choices: ["ecole", "école", "éccole"],
      answer: "école",
    },
    {
      type: "langage",
      question: "Cite un objet dans une salle de bain",
      helper: "Écris un objet.",
      answer: "miroir",
    },
    {
      type: "memoire",
      question: "rouge — livre — vélo",
      hiddenQuestion: "Quels mots as-tu retenu ?",
      helper: "Observe bien.",
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
      type: "attention",
      question: "Trouve l’intrus : banane / fraise / table / orange",
      helper: "Quel mot n’est pas un fruit ?",
      answer: "table",
    },
    {
      type: "dys",
      question: "Quel mot est correct ?",
      choices: ["papillon", "papilion", "papillion"],
      answer: "papillon",
    },
    {
      type: "langage",
      question: "Donne un objet que l’on trouve dans une cuisine",
      helper: "Exemple : verre, assiette…",
      answer: "verre",
    },
    {
      type: "comprehension",
      question: "Que fait-on avec une brosse à dents ?",
      helper: "Réponds avec une action.",
      answer: "brosser",
    },
    {
      type: "memoire",
      question: "clé — jardin — ballon",
      hiddenQuestion: "Quels étaient les mots ?",
      helper: "Observe quelques secondes.",
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
      setFeedback("✅ Bonne réponse");
      setScore((prev) => prev + 1);
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
const finalPercent = Math.round(
      (score / tests.length) * 100
    );
const evaluation = {
      memory: score < 8,
      attention: score < 9,
      dyslexia: score < 7,
      reading: score < 9,
      score: finalPercent,
    };
localStorage.setItem(
      "evaluation",
      JSON.stringify(evaluation)
    );
const history = JSON.parse(
      localStorage.getItem("sessionHistory")
    ) || [];
history.push({
      date: new Date().toLocaleDateString(),
      score: finalPercent,
      module: "Évaluation Orthophonique",
    });
localStorage.setItem(
      "sessionHistory",
      JSON.stringify(history)
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
{current.memory ? (
              <>
                <div className="exercise-question">
                  {showMemoryWords
                    ? current.question
                    : current.hiddenQuestion}
                </div>
              </>
            ) : (
              <div className="exercise-question">
                {current.question}
              </div>
            )}
<div
              style={{
                marginTop: "15px",
                color: "#64748b",
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
                  marginTop: "30px",
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
                style={{ marginTop: "30px" }}
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
