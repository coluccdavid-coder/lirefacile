"use client";

import { useState } from "react";

export default function EvaluationPage() {

  const questions = [
    {
      question: "As-tu du mal à retenir les informations ?",
      key: "memory"
    },
    {
      question: "As-tu des difficultés à lire ?",
      key: "reading"
    },
    {
      question: "As-tu des difficultés à écrire ?",
      key: "writing"
    },
    {
      question: "Te fatigues-tu rapidement ?",
      key: "fatigue"
    },
    {
      question: "As-tu des difficultés à parler ?",
      key: "speech"
    }
  ];

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [finished, setFinished] = useState(false);

  const currentQuestion = questions[current];

  const answerQuestion = (value) => {
    const updated = {
      ...answers,
      [currentQuestion.key]: value
    };

    setAnswers(updated);

    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      setFinished(true);
    }
  };

  return (
    <div className="page-container">
      <div className="main-card">

        <h1 className="main-title">
          Évaluation Cognitive
        </h1>

        {!finished ? (
          <div className="exercise-box fade-in">

            <div className="exercise-question">
              {currentQuestion.question}
            </div>

            <div className="button-row">

              <button
                className="primary-button success-button"
                onClick={() => answerQuestion("oui")}
              >
                Oui
              </button>

              <button
                className="primary-button"
                onClick={() => answerQuestion("non")}
              >
                Non
              </button>

            </div>

            <div className="progress-container">
              <div
                className="progress-bar"
                style={{
                  width: `${((current + 1) / questions.length) * 100}%`
                }}
              />
            </div>

          </div>
        ) : (

          <div className="feedback-box fade-in">

            <h2 className="section-title">
              Analyse Terminée
            </h2>

            <p style={{ marginTop: "20px" }}>
              L’IA pourra maintenant adapter les exercices selon :
            </p>

            <ul style={{ marginTop: "20px", lineHeight: "2" }}>
              <li>Mémoire</li>
              <li>Lecture</li>
              <li>Écriture</li>
              <li>Fatigue</li>
              <li>Parole</li>
            </ul>

          </div>
        )}

      </div>
    </div>
  );
}
