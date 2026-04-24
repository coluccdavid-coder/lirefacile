"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function ExercisesContent() {
  const searchParams = useSearchParams();
  const profil = searchParams.get("profil") || "AVC";

  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [showQuestion, setShowQuestion] = useState(true);
  const [dyslexiaFont, setDyslexiaFont] = useState(false);
  const [timer, setTimer] = useState(10);

  const exercisesByProfile = {
    AVC: [
      {
        type: "mot",
        question: "Complète le mot : ma__on",
        answer: "maison",
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
    ],

    Dyslexie: [
      {
        type: "lecture",
        question: "Trouve le bon mot : voitur / voiture",
        answer: "voiture",
      },
      {
        type: "mot",
        question: "Complète : pa__lon",
        answer: "papillon",
      },
      {
        type: "lecture",
        question: "Choisis le mot correct : maison / maizon",
        answer: "maison",
      },
      {
        type: "phrase",
        question: "Complète : Le chat est sur la ____",
        answer: "table",
      },
    ],

    Autisme: [
      {
        type: "logique",
        question: "Quel objet sert à manger ? fourchette, voiture, chaise",
        answer: "fourchette",
      },
      {
        type: "routine",
        question: "Que fais-tu après le réveil ?",
        answer: "petit déjeuner",
      },
      {
        type: "couleur",
        question: "Quelle couleur est le ciel ?",
        answer: "bleu",
      },
      {
        type: "logique",
        question: "Quel mot ne va pas avec les autres ? pomme, banane, chaise",
        answer: "chaise",
      },
    ],

    Mémoire: [
      {
        type: "memoire",
        question: "Mémorise : chat, arbre, soleil",
        answer: "chat arbre soleil",
      },
      {
        type: "memoire",
        question: "Mémorise : rouge, bleu, vert",
        answer: "rouge bleu vert",
      },
      {
        type: "memoire",
        question: "Mémorise : maison, voiture, école",
        answer: "maison voiture école",
      },
    ],

    Concentration: [
      {
        type: "attention",
        question: "Trouve l'intrus : rouge, bleu, voiture",
        answer: "voiture",
      },
      {
        type: "attention",
        question: "Quel nombre manque ? 2, 4, 6, __",
        answer: "8",
      },
      {
        type: "attention",
        question: "Complète : lundi, mardi, ____",
        answer: "mercredi",
      },
    ],
  };

  const exercises =
    exercisesByProfile[profil] || exercisesByProfile.AVC;

  const currentExercise = exercises[exerciseIndex];

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
    } else {
      setExerciseIndex(0);
    }
  };

  return (
    <div className="page-container">
      <div className="main-card fade-in">
        <h1 className="main-title">Exercices {profil}</h1>

        <div className="button-row" style={{ justifyContent: "center" }}>
          <button
            className="primary-button"
            onClick={() => setDyslexiaFont(!dyslexiaFont)}
          >
            Police Dyslexie
          </button>
        </div>

        <div
          className={`exercise-box ${
            dyslexiaFont ? "dyslexia-font" : ""
          }`}
        >
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
          Score : {score} / {exercises.length}
        </div>
      </div>
    </div>
  );
}
