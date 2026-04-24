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
  const [startTime, setStartTime] = useState(Date.now());
const [assistantMessage, setAssistantMessage] = useState(
    "Bonjour 👋 Je vais t'aider aujourd'hui."
  );
const [assistantMood, setAssistantMood] = useState("🧠");
  const [confidence, setConfidence] = useState(50);
  const [brainProgress, setBrainProgress] = useState(0);
const [lastQuestions, setLastQuestions] = useState([]);
const [cognitiveProfile, setCognitiveProfile] = useState({
    fatigue: 0,
  });
const currentLevel = Math.floor(exerciseIndex / 10) + 1;
const normalizeText = (text) =>
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();
const speakAssistant = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "fr-FR";
    speech.rate = 0.92;
window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
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
const normalizedQuestion = normalizeText(data.question);
const isDuplicate = lastQuestions.some(
        (q) => normalizeText(q) === normalizedQuestion
      );
if (isDuplicate && retry < 5) {
        return fetchExercise(retry + 1);
      }
setCurrentExercise({
        instruction: data.instruction,
        question: data.question,
        answer: data.answer,
        image: data.image || null,
      });
setStartTime(Date.now());
setLastQuestions((prev) => {
        const updated = [...prev, data.question];
if (updated.length > 100) {
          updated.shift();
        }
return updated;
      });
    } catch (error) {
      console.error("Erreur exercice IA", error);
    }
  };
useEffect(() => {
    fetchExercise();
  }, [exerciseIndex, profil, difficulty]);
const checkAnswer = () => {
    if (!currentExercise) return;
const responseTime = Math.floor((Date.now() - startTime) / 1000);
const userAnswer = normalizeText(answer);
    const correctAnswer = normalizeText(currentExercise.answer);
const isCorrect = userAnswer === correctAnswer;
const savedAnalytics =
      JSON.parse(localStorage.getItem("analytics")) || [];
savedAnalytics.push({
      correct: isCorrect,
      responseTime,
      profil,
      timestamp: Date.now(),
    });
localStorage.setItem(
      "analytics",
      JSON.stringify(savedAnalytics)
    );
const fatigue = savedAnalytics
      .slice(-5)
      .filter((x) => !x.correct || x.responseTime > 12).length;
setCognitiveProfile({
      fatigue: fatigue * 10,
    });
if (isCorrect) {
      const newScore = score + 1;
setScore(newScore);
      setXp((prev) => prev + 10);
      setConfidence((prev) => Math.min(prev + 3, 100));
      setBrainProgress(Math.min(newScore * 2, 100));
let msg = "Bravo 🎉 Continue comme ça.";
setAssistantMood("🎉");
if (newScore % 5 === 0) {
        msg = "Excellent travail. Tu progresses bien.";
        setDifficulty((prev) => Math.min(prev + 1, 5));
      }
if (newScore === 10) setBadge("🌟 Débutant");
      if (newScore === 25) setBadge("🏆 Expert");
      if (newScore === 50) setBadge("👑 Maître Cognitif");
setFeedback(`Bonne réponse 👍 (${responseTime}s)`);
      setAssistantMessage(msg);
      speakAssistant(msg);
    } else {
      setConfidence((prev) => Math.max(prev - 2, 0));
      setAssistantMood("🤗");
let msg = "Observe bien l'image et réessaie.";
if (responseTime > 10) {
        msg = "Prends ton temps. Tu peux réussir.";
      }
setFeedback(
        `Incorrect ❌ Bonne réponse : ${currentExercise.answer}`
      );
setAssistantMessage(msg);
      speakAssistant(msg);
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
    return <div className="page-container">Chargement...</div>;
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
          <h3>{currentExercise.instruction}</h3>
{currentExercise.image && (
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <img
                src={currentExercise.image}
                alt="indice"
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
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                checkAnswer();
              }
            }}
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
            Suivant
          </button>
        </div>
<div className="feedback-box">
          <h2>{feedback}</h2>
        </div>
<div className="score-box">
          Score : {score} | XP : {xp} | Niveau : {currentLevel}
        </div>
<div className="fatigue-box">
          🧠 Progression cognitive : {brainProgress}%
        </div>
<div className="fatigue-box">
          💪 Confiance : {confidence}%
        </div>
<div className="fatigue-box">
          😴 Fatigue : {cognitiveProfile.fatigue}%
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

