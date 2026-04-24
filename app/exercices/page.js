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
  const [difficulty, setDifficulty] = useState(1);
  const [currentExercise, setCurrentExercise] = useState(null);
  const [xp, setXp] = useState(0);
  const [badge, setBadge] = useState(null);
  const [assistantMessage, setAssistantMessage] = useState(
    "Bonjour 👋 Je vais t'aider aujourd'hui."
  );
  const [assistantMood, setAssistantMood] = useState("🧠");
  const [lastQuestions, setLastQuestions] = useState([]);

  const currentLevel = Math.floor(exerciseIndex / 10) + 1;

  const normalizeText = (text) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();
  };

  const speakText = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "fr-FR";
    speech.rate = 0.92;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
  };

  const fallbackExercise = {
    instruction: "Complète la phrase",
    question: "Je vois un ____ dans le jardin",
    answer: "chat",
    image: null,
  };

  const fetchExercise = async (retry = 0) => {
    try {
      const response = await fetch("/api/exercise", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          profil,
          level: currentLevel,
          difficulty,
          history: lastQuestions,
        }),
      });

      const data = await response.json();

      console.log("API RESPONSE", data);

      if (!response.ok) {
        console.error("API ERROR", data);
        setCurrentExercise(fallbackExercise);
        return;
      }

      if (!data.question) {
        setCurrentExercise(fallbackExercise);
        return;
      }

      const normalizedQuestion = normalizeText(data.question);

      const duplicate = lastQuestions.some(
        (q) => normalizeText(q) === normalizedQuestion
      );

      if (duplicate && retry < 5) {
        return fetchExercise(retry + 1);
      }

      setCurrentExercise({
        instruction: data.instruction,
        question: data.question,
        answer: data.answer,
        image: data.image || null,
      });

      setLastQuestions((prev) => {
        const updated = [...prev, data.question];

        if (updated.length > 100) {
          updated.shift();
        }

        return updated;
      });
    } catch (error) {
      console.error("Erreur fetchExercise", error);
      setCurrentExercise(fallbackExercise);
    }
  };

  useEffect(() => {
    fetchExercise();
  }, [exerciseIndex, profil, difficulty]);

  const checkAnswer = () => {
    if (!currentExercise) return;

    const userAnswer = normalizeText(answer);
    const correctAnswer = normalizeText(currentExercise.answer);

    if (!userAnswer) {
      setFeedback("Écris une réponse");
      return;
    }

    const isCorrect = userAnswer === correctAnswer;

    if (isCorrect) {
      const newScore = score + 1;

      setScore(newScore);
      setXp((prev) => prev + 10);
      setAssistantMood("🎉");

      let message = "Bravo 🎉 Continue comme ça.";

      if (newScore % 5 === 0) {
        message = "Excellent travail. Difficulté augmentée.";
        setDifficulty((prev) => Math.min(prev + 1, 5));
      }

      if (newScore === 10) setBadge("🌟 Débutant");
      if (newScore === 25) setBadge("🏆 Expert");
      if (newScore === 50) setBadge("👑 Maître Cognitif");

      setFeedback("Bonne réponse 👍");
      setAssistantMessage(message);
      speakText(message);
    } else {
      setAssistantMood("🤗");

      setFeedback(
        `Incorrect ❌ Bonne réponse : ${currentExercise.answer}`
      );

      setAssistantMessage(
        "Prends ton temps. Observe mieux l'image et la phrase."
      );

      speakText("Prends ton temps. Tu peux réussir.");

      if (difficulty > 1) {
        setDifficulty((prev) => Math.max(prev - 1, 1));
      }
    }
  };

  const nextExercise = () => {
    setExerciseIndex((prev) => prev + 1);
    setAnswer("");
    setFeedback("");
  };

  const progress = ((exerciseIndex % 10) / 10) * 100;

  if (!currentExercise) {
    return (
      <div className="page-container">
        <div className="main-card">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="main-card fade-in">
        <h1 className="main-title">Exercices {profil}</h1>

        <div className="progress-container">
          <div
            className="progress-bar"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="assistant-box">
          <div className="assistant-avatar">
            {assistantMood}
          </div>

          <div className="assistant-message">
            {assistantMessage}
          </div>
        </div>

        <div className="exercise-box">
          <h3 style={{ marginBottom: "15px" }}>
            {currentExercise.instruction}
          </h3>

          {currentExercise.image && (
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <img
                src={currentExercise.image}
                alt="illustration"
                style={{
                  width: "240px",
                  height: "240px",
                  objectFit: "cover",
                  borderRadius: "20px",
                }}
              />
            </div>
          )}

          <h2 className="exercise-question">
            {currentExercise.question}
          </h2>

          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Écris ta réponse"
            className="exercise-input"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                checkAnswer();
              }
            }}
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
            Suivant
          </button>
        </div>

        <div className="feedback-box">
          <h2>{feedback}</h2>
        </div>

        <div className="score-box">
          Score : {score} | XP : {xp} | Niveau : {currentLevel}
        </div>

        {badge && <div className="badge-box">{badge}</div>}
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
