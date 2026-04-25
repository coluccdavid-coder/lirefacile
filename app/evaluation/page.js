"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function EvaluationPage() {
  const [patient, setPatient] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answer, setAnswer] = useState("");

const [results, setResults] = useState({
    memory: 0,
    attention: 0,
    reading: 0,
    dyslexia: 0,
  });

useEffect(() => {
    const stored = JSON.parse(
      localStorage.getItem("patientProfile")
    );

setPatient(stored);
  }, []);

if (!patient) {
    return <p style={{ padding: 40 }}>Chargement...</p>;
  }

const questions = [
    {
      question:
        patient.pathology === "Dyslexie"
          ? "Quel mot est correctement écrit ?"
          : "Répète cette suite : Chat - Soleil - Maison",

choices:
        patient.pathology === "Dyslexie"
          ? ["Aureau", "Oiseau", "Oiso", "Oisseau"]
          : [],

type:
        patient.pathology === "Dyslexie"
          ? "dys"
          : "memory",
    },

{
      question:
        patient.age > 65
          ? "Quel jour sommes-nous ?"
          : "Combien font 8 + 5 ?",

type:
        patient.age > 65
          ? "orientation"
          : "logic",
    },

{
      question:
        patient.learningStyle === "Visuel"
          ? "Que vois-tu sur cette image ?"
          : "Complète : Le chat boit du ____",

type: "reading",
    },
  ];

const currentQuestion = questions[questionIndex];

const nextQuestion = () => {
    const updatedResults = { ...results };

if (currentQuestion.type === "memory") {
      updatedResults.memory += 25;
    }

if (currentQuestion.type === "reading") {
      updatedResults.reading += 25;
    }

if (currentQuestion.type === "dys") {
      updatedResults.dyslexia += 25;
    }

if (currentQuestion.type === "logic") {
      updatedResults.attention += 25;
    }

setResults(updatedResults);

if (questionIndex + 1 >= questions.length) {
      localStorage.setItem(
        "evaluation",
        JSON.stringify(updatedResults)
      );

setFinished(true);
      return;
    }

setQuestionIndex(questionIndex + 1);
    setAnswer("");
  };

if (finished) {
    return (
      <div className="page-container">
        <div className="main-card fade-in">
          <h1 className="main-title">
            Analyse Terminée
          </h1>

<div className="analysis-box">
            <div className="analysis-title">
              Résultats IA
            </div>

<div className="analysis-grid">
              <div className="analysis-card">
                <div className="analysis-label">Mémoire</div>
                <div className="analysis-value">
                  {results.memory}%
                </div>
              </div>

<div className="analysis-card">
                <div className="analysis-label">Lecture</div>
                <div className="analysis-value">
                  {results.reading}%
                </div>
              </div>

<div className="analysis-card">
                <div className="analysis-label">Attention</div>
                <div className="analysis-value">
                  {results.attention}%
                </div>
              </div>

<div className="analysis-card">
                <div className="analysis-label">Dyslexie</div>
                <div className="analysis-value">
                  {results.dyslexia}%
                </div>
              </div>
            </div>
          </div>

<div className="button-row">
            <Link href="/profil">
              <button className="primary-button success-button">
                Voir mon profil IA
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

return (
    <div
      className={`page-container ${
        patient.pathology === "Dyslexie"
          ? "dyslexia-font"
          : ""
      }`}
    >
      <div className="main-card fade-in">
        <h1 className="main-title">
          Évaluation IA
        </h1>

<div className="assistant-box">
          <div className="assistant-avatar">🧠</div>

<div className="assistant-message">
            L’IA adapte le test selon votre profil.
          </div>
        </div>

<div className="exercise-card">
          <div className="exercise-title">
            Question {questionIndex + 1}
          </div>

<div className="exercise-question">
            {currentQuestion.question}
          </div>

{currentQuestion.choices?.length > 0 ? (
            <div className="button-row">
              {currentQuestion.choices.map((choice) => (
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
              className="exercise-input"
              placeholder="Votre réponse"
            />
          )}
        </div>

<div className="button-row">
          <button
            className="primary-button success-button"
            onClick={nextQuestion}
          >
            Continuer
          </button>
        </div>
      </div>
    </div>
  );
}
