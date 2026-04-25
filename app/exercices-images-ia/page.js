"use client";
import { useState } from "react";
import Link from "next/link";
export default function ExercicesImagesIAPage() {
  const [currentImage, setCurrentImage] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
const imageExercises = [
    {
      image:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9",
      question: "Que vois-tu sur cette image ?",
      answer: "femme",
    },
    {
      image:
        "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d",
      question: "Quel animal vois-tu ?",
      answer: "chien",
    },
    {
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
      question: "Quel fruit vois-tu ?",
      answer: "pomme",
    },
    {
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      question: "Décris la personne.",
      answer: "visage",
    },
  ];
const generateExercise = () => {
    const random =
      imageExercises[
        Math.floor(Math.random() * imageExercises.length)
      ];
setCurrentImage(random);
    setQuestion(random.question);
    setAnswer("");
    setFeedback("");
  };
const verifyAnswer = () => {
    if (!currentImage) return;
const userAnswer = answer
      .toLowerCase()
      .trim();
const expected = currentImage.answer
      .toLowerCase()
      .trim();
if (userAnswer.includes(expected)) {
      setFeedback("✅ Bonne réponse");
      setScore((prev) => prev + 1);
    } else {
      setFeedback(
        `❌ Réponse attendue : ${currentImage.answer}`
      );
    }
  };
return (
    <div className="page-container">
      <div className="main-card fade-in">
<h1 className="main-title">
          Images IA Thérapeutiques
        </h1>
<div className="assistant-box">
          <div className="assistant-avatar">🖼️</div>
<div className="assistant-message">
            L’IA génère des exercices visuels adaptés.
          </div>
        </div>

<div className="analysis-box">
          <div className="analysis-title">
            Exercice image
          </div>
{!currentImage ? (
            <div style={{ textAlign: "center" }}>
              <button
                className="primary-button success-button"
                onClick={generateExercise}
              >
                Générer une image IA
              </button>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <img
                src={currentImage.image}
                alt="exercice"
                style={{
                  width: "280px",
                  borderRadius: "20px",
                  objectFit: "cover",
                }}
              />
<div className="exercise-question">
                {question}
              </div>
<input
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Écris ta réponse"
                className="exercise-input"
              />
<div className="button-row">
                <button
                  className="primary-button"
                  onClick={verifyAnswer}
                >
                  Vérifier
                </button>
<button
                  className="primary-button success-button"
                  onClick={generateExercise}
                >
                  Nouvelle image
                </button>
              </div>
            </div>
          )}
        </div>
{feedback && (
          <div className="feedback-box">
            {feedback}
          </div>
        )}
<div className="score-box">
          Score : {score}
        </div>
<div
          className="button-row"
          style={{ justifyContent: "center" }}
        >
          <Link href="/generation-exercices">
            <button className="primary-button success-button">
              Exercices IA
            </button>
          </Link>
<Link href="/fatigue-ia">
            <button className="primary-button warning-button">
              Fatigue
            </button>
          </Link>
<Link href="/">
            <button className="primary-button">
              Accueil
            </button>
          </Link>
        </div>
</div>
    </div>
  );
}
