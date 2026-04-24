"use client";

import { useState } from "react";

export default function ExercisesModule() {
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [feedback, setFeedback] = useState("");

const exercises = [
    {
      type: "mot",
      question: "Complète le mot : ma__on",
      answer: "ison",
      solution: "maison",
    },
    {
      type: "phrase",
      question: "Remets la phrase dans l'ordre : mange / je / pomme / une",
      answer: "je mange une pomme",
    },
    {
      type: "memoire",
      question: "Mémorise ces mots : chat, soleil, voiture",
      answer: "chat soleil voiture",
    },
    {
      type: "comprehension",
      question: "Paul mange une pomme. Que mange Paul ?",
      answer: "une pomme",
    },
  ];

const currentExercise = exercises[exerciseIndex];

const checkAnswer = () => {
    const userAnswer = answer.trim().toLowerCase();
    const correctAnswer = currentExercise.answer.toLowerCase();

if (userAnswer === correctAnswer) {
      setScore(score + 1);
      setFeedback("Bonne réponse 👍");
    } else {
      setFeedback(`Réponse attendue : ${currentExercise.answer}`);
    }

setShowResult(true);
  };
const nextExercise = () => {
    setAnswer("");
    setShowResult(false);
    setFeedback("");
if (exerciseIndex < exercises.length - 1) {
      setExerciseIndex(exerciseIndex + 1);
    } else {
      setExerciseIndex(0);
    }
  };
return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f3f4f6",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "900px",
          backgroundColor: "white",
          borderRadius: "30px",
          padding: "40px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            fontSize: "42px",
            marginBottom: "30px",
          }}
        >
          Exercices AVC & Dyslexie
        </h1>
<div
          style={{
            backgroundColor: "#e5e7eb",
            padding: "30px",
            borderRadius: "20px",
            marginBottom: "20px",
          }}
        >
          <h2
            style={{
              fontSize: "30px",
              marginBottom: "20px",
            }}
          >
            {currentExercise.question}
          </h2>
<input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Écris ta réponse"
            style={{
              width: "100%",
              padding: "20px",
              fontSize: "24px",
              borderRadius: "15px",
              border: "none",
              backgroundColor: "#d1d5db",
            }}
          />
        </div>
<div
          style={{
            display: "flex",
            gap: "15px",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={checkAnswer}
            style={{
              backgroundColor: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "12px",
              padding: "14px 24px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Vérifier
          </button>
<button
            onClick={nextExercise}
            style={{
              backgroundColor: "#16a34a",
              color: "white",
              border: "none",
              borderRadius: "12px",
              padding: "14px 24px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Exercice suivant
          </button>
        </div>
{showResult && (
          <div
            style={{
              marginTop: "25px",
              backgroundColor: "#f9fafb",
              padding: "20px",
              borderRadius: "15px",
            }}
          >
            <p
              style={{
                fontSize: "24px",
                fontWeight: "bold",
              }}
            >
              {feedback}
            </p>
          </div>
        )}
<div
          style={{
            marginTop: "30px",
            fontSize: "22px",
            fontWeight: "bold",
          }}
        >
          Score : {score} / {exercises.length}
        </div>
      </div>
    </div>
  );
}
