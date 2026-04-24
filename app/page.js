"use client";

import { useState, useEffect } from "react";

export default function ExercisesPage() {
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [showQuestion, setShowQuestion] = useState(true);
  const [dyslexiaFont, setDyslexiaFont] = useState(false);

  const exercises = [
    {
      type: "mot",
      question: "Complète le mot : ma__on",
      answer: "maison",
    },
    {
      type: "mot",
      question: "Complète le mot : vo__ure",
      answer: "voiture",
    },
    {
      type: "phrase",
      question: "Complète : Je vais à la ____",
      answer: "maison",
    },
    {
      type: "memoire",
      question: "Mémorise : chat, soleil, voiture",
      answer: "chat soleil voiture",
    },
    {
      type: "ordre",
      question: "Remets dans l'ordre : mange / chat / le",
      answer: "le chat mange",
    },
    {
      type: "logique",
      question: "Quel mot ne va pas avec les autres ? pomme, banane, chaise",
      answer: "chaise",
    },
  ];

  const currentExercise = exercises[exerciseIndex];

  useEffect(() => {
    if (currentExercise.type === "memoire") {
      setShowQuestion(true);

      const timer = setTimeout(() => {
        setShowQuestion(false);
      }, 10000);

      return () => clearTimeout(timer);
    }

    setShowQuestion(true);
  }, [exerciseIndex]);

  const checkAnswer = () => {
    if (
      answer.trim().toLowerCase() ===
      currentExercise.answer.toLowerCase()
    ) {
      setScore((prev) => prev + 1);
      setFeedback("Bonne réponse 👍");
    } else {
      setFeedback(`Réponse attendue : ${currentExercise.answer}`);
    }
  };

  const nextExercise = () => {
    setAnswer("");
    setFeedback("");

    if (exerciseIndex < exercises.length - 1) {
      setExerciseIndex((prev) => prev + 1);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px",
        backgroundColor: "#e5e5e5",
      }}
    >
      <div
        className="card"
        style={{
          width: "100%",
          maxWidth: "1100px",
          padding: "50px",
        }}
      >
        <h1
          className="title-large"
          style={{
            textAlign: "center",
            marginBottom: "40px",
          }}
        >
          Exercices AVC & Dyslexie
        </h1>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "30px",
          }}
        >
          <button
            onClick={() => setDyslexiaFont(!dyslexiaFont)}
            style={{
              padding: "14px 24px",
              borderRadius: "15px",
              border: "none",
              backgroundColor: "#3b82f6",
              color: "white",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Police Dyslexie
          </button>
        </div>

        <div
          className="card"
          style={{
            padding: "40px",
            marginBottom: "25px",
            backgroundColor: "#d1d5db",
            fontFamily: dyslexiaFont
              ? "OpenDyslexic"
              : "Arial",
          }}
        >
          <h2
            className="easy-reading"
            style={{
              marginBottom: "25px",
              fontSize: "36px",
            }}
          >
            {showQuestion
              ? currentExercise.question
              : "Quels étaient les mots affichés ?"}
          </h2>

          <input
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Écris ta réponse"
            className="large-input"
            style={{
              width: "100%",
              fontFamily: dyslexiaFont
                ? "OpenDyslexic"
                : "Arial",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          <button
            onClick={checkAnswer}
            style={{
              padding: "15px 30px",
              borderRadius: "15px",
              border: "none",
              backgroundColor: "#2563eb",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Vérifier
          </button>

          <button
            onClick={nextExercise}
            style={{
              padding: "15px 30px",
              borderRadius: "15px",
              border: "none",
              backgroundColor: "#16a34a",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Exercice suivant
          </button>
        </div>

        <div
          className="card"
          style={{
            padding: "30px",
            marginBottom: "25px",
          }}
        >
          <h2>{feedback}</h2>
        </div>

        <div
          style={{
            fontSize: "28px",
            fontWeight: "bold",
          }}
        >
          Score : {score} / {exercises.length}
        </div>
      </div>
    </div>
  );
}
