"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
function ExercisesContent() {
  const searchParams = useSearchParams();
  const profil = searchParams.get("profil") || "AVC";
const [exerciseIndex, setExerciseIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [dyslexiaFont, setDyslexiaFont] = useState(false);
  const [showQuestion, setShowQuestion] = useState(true);
  const [timer, setTimer] = useState(10);
  const [level, setLevel] = useState(1);
const currentLevel = Math.floor(exerciseIndex / 10) + 1;
const words = [
    "maison",
    "voiture",
    "chat",
    "chien",
    "soleil",
    "banane",
    "pomme",
    "ordinateur",
    "montagne",
    "école",
    "livre",
    "fenêtre",
    "table",
    "chaise",
    "jardin",
    "musique",
    "papillon",
    "bateau",
    "vélo",
    "forêt",
  ];
function randomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
  }
function generateMath(level) {
    const max = level * 10;
    const a = Math.floor(Math.random() * max);
    const b = Math.floor(Math.random() * max);
return {
      type: "math",
      instruction: "Résous le calcul :",
      question: `${a} + ${b} = ?`,
      answer: String(a + b),
    };
  }
function generateExercise(level, profil) {
    const randomWord = randomItem(words);
if (profil === "AVC") {
      const types = ["mot", "phrase", "memoire"];
      const selected = randomItem(types);
if (selected === "mot") {
        return {
          type: "mot",
          instruction: "Complète le mot :",
          question: `${randomWord.slice(0, 2)}____`,
          answer: randomWord,
        };
      }
if (selected === "phrase") {
        return {
          type: "phrase",
          instruction: "Complète la phrase :",
          question: `Je vois une _____`,
          answer: randomWord,
        };
      }
const memoryWords = words.sort(() => 0.5 - Math.random()).slice(0, Math.min(level + 2, 6));
return {
        type: "memoire",
        instruction: "Mémorise les mots :",
        question: memoryWords.join(", "),
        answer: memoryWords.join(" "),
      };
    }
if (profil === "Dyslexie") {
      return {
        type: "lecture",
        instruction: "Écris correctement le mot :",
        question: randomWord,
        answer: randomWord,
      };
    }
if (profil === "Autisme") {
      const routines = [
        {
          q: "Que fais-tu après le réveil ?",
          a: "petit déjeuner",
        },
        {
          q: "Quelle couleur a le ciel ?",
          a: "bleu",
        },
        {
          q: "Que fais-tu avant de dormir ?",
          a: "se brosser les dents",
        },
      ];

const routine = randomItem(routines);

return {
        type: "routine",
        instruction: "Réponds simplement :",
        question: routine.q,
        answer: routine.a,
      };
    }

if (profil === "Mémoire") {
      const memoryWords = words.sort(() => 0.5 - Math.random()).slice(0, Math.min(level + 3, 8));

return {
        type: "memoire",
        instruction: "Observe et mémorise :",
        question: memoryWords.join(", "),
        answer: memoryWords.join(" "),
      };
    }

if (profil === "Concentration") {
      const numbers = [2, 4, 6, 8, 10];

return {
        type: "attention",
        instruction: "Trouve le nombre suivant :",
        question: `${numbers.join(", ")}, ___`,
        answer: "12",
      };
    }

if (profil === "Math") {
      return generateMath(level);
    }

return {
      type: "mot",
      instruction: "Écris le mot :",
      question: randomWord,
      answer: randomWord,
    };
  }

const [currentExercise, setCurrentExercise] = useState(
    generateExercise(1, profil)
  );

useEffect(() => {
    setCurrentExercise(generateExercise(level, profil));
  }, [profil]);

useEffect(() => {
    if (currentExercise.type === "memoire") {
      setShowQuestion(true);
      setTimer(10);

const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setShowQuestion(false);
            return 0;
          }

return prev - 1;
        });
      }, 1000);

return () => clearInterval(interval);
    }

setShowQuestion(true);
  }, [currentExercise]);

const checkAnswer = () => {
    if (
      answer.trim().toLowerCase() ===
      currentExercise.answer.toLowerCase()
    ) {
      setScore((prev) => prev + 1);
      setFeedback("Bonne réponse 👍");
    } else {
      setFeedback(`Bonne réponse : ${currentExercise.answer}`);
    }
  };

const nextExercise = () => {
    const nextIndex = exerciseIndex + 1;
    const nextLevel = Math.floor(nextIndex / 10) + 1;

setExerciseIndex(nextIndex);
    setLevel(nextLevel);
    setAnswer("");
    setFeedback("");

setCurrentExercise(generateExercise(nextLevel, profil));
  };

const progress = ((exerciseIndex % 10) / 10) * 100;

return (
    <div className="page-container">
      <div className="main-card fade-in">
        <h1 className="main-title">Exercices {profil}</h1>

<div style={{ textAlign: "center", marginBottom: "20px" }}>
          <div className="level-box">Niveau {currentLevel}</div>
        </div>

<div className="button-row" style={{ justifyContent: "center" }}>
          <button
            className="primary-button"
            onClick={() => setDyslexiaFont(!dyslexiaFont)}
          >
            Police Dyslexie
          </button>
        </div>

<div className="progress-container">
          <div
            className="progress-bar"
            style={{ width: `${progress}%` }}
          />
        </div>

<div
          className={`exercise-box ${
            dyslexiaFont ? "dyslexia-font" : ""
          }`}
        >
          <p className="exercise-label">
            {currentExercise.instruction}
          </p>

<h2 className="exercise-question easy-reading">
            {showQuestion
              ? currentExercise.question
              : "Quels étaient les mots affichés ?"}
          </h2>

{currentExercise.type === "memoire" && showQuestion && (
            <div className="timer-box">
              Disparition dans : {timer}s
            </div>
          )}

<input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Écris ta réponse"
            className="exercise-input"
          />
        </div>

<div className="button-row">
          <button className="primary-button" onClick={checkAnswer}>
            Vérifier
          </button>

<button
            className="primary-button success-button"
            onClick={nextExercise}
          >
            Exercice suivant
          </button>
        </div>

<div className="feedback-box">
          <h2>{feedback}</h2>
        </div>

<div className="score-box">
          Score : {score} / ∞
        </div>
      </div>
    </div>
  );
}

export default function ExercisesPage() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <ExercisesContent />
    </Suspense>
  );
}
