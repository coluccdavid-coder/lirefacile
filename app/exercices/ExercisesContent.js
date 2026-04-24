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
  const [timer, setTimer] = useState(10);
  const [dyslexiaFont, setDyslexiaFont] = useState(false);

const buildExercises = () => {
    const avc = [];
    const dys = [];
    const autisme = [];
    const memoire = [];
    const concentration = [];

for (let i = 1; i <= 100; i++) {
      avc.push({
        type: i % 5 === 0 ? "memoire" : "phrase",
        question:
          i % 5 === 0
            ? `Mémorise : mot${i}, soleil${i}, maison${i}`
            : `Complète la phrase ${i} : Je vais à la ____`,
        answer:
          i % 5 === 0
            ? `mot${i} soleil${i} maison${i}`
            : "maison",
      });

dys.push({
        type: "lecture",
        question:
          i % 2 === 0
            ? `Trouve le bon mot : voitur / voiture`
            : `Complète : ma__on ${i}`,
        answer: i % 2 === 0 ? "voiture" : "maison",
      });

autisme.push({
        type: "logique",
        question:
          i % 2 === 0
            ? `Quel objet sert à écrire ? stylo, pomme, voiture`
            : `Quelle couleur est le ciel ?`,
        answer: i % 2 === 0 ? "stylo" : "bleu",
      });

memoire.push({
        type: "memoire",
        question: `Mémorise : chat${i}, arbre${i}, lune${i}`,
        answer: `chat${i} arbre${i} lune${i}`,
      });

concentration.push({
        type: "attention",
        question:
          i % 2 === 0
            ? `Trouve l'intrus : rouge, bleu, chaise`
            : `Complète : 2, 4, 6, __`,
        answer: i % 2 === 0 ? "chaise" : "8",
      });
    }

return {
      AVC: avc,
      Dyslexie: dys,
      Autisme: autisme,
      Mémoire: memoire,
      Concentration: concentration,
    };
  };

const exercisesByProfile = buildExercises();

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
      setFeedback("Bonne réponse 👍 Continue !");
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

const progress = ((exerciseIndex + 1) / exercises.length) * 100;

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
