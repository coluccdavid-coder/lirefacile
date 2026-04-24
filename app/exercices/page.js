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
  const [goodStreak, setGoodStreak] = useState(0);
  const [badStreak, setBadStreak] = useState(0);
  const [currentExercise, setCurrentExercise] = useState(null);
  const [energy, setEnergy] = useState(100);
  const [darkMode, setDarkMode] = useState(false);
  const [showQuestion, setShowQuestion] = useState(true);
  const [timer, setTimer] = useState(10);
  const [badge, setBadge] = useState(null);
  const [xp, setXp] = useState(0);
  const [emotion, setEmotion] = useState(null);
  const [aiMode, setAiMode] = useState(true);
  const [reactionTime, setReactionTime] = useState(Date.now());
  const [stats, setStats] = useState({
    totalCorrect: 0,
    totalWrong: 0,
    averageSpeed: 0,
  });

  const currentLevel = Math.floor(exerciseIndex / 10) + 1;

  const randomItem = (array) =>
    array[Math.floor(Math.random() * array.length)];

  const exercises = {
    AVC: {
      1: [
        {
          q: "Je vois un _____",
          a: "chat",
          img: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba",
        },
      ],
      2: [
        {
          q: "Je mange une pomme _____",
          a: "rouge",
          img: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce",
        },
      ],
      3: [
        {
          q: "Le garçon joue avec un _____ dans le jardin",
          a: "ballon",
          img: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68",
        },
      ],
      4: [
        {
          q: "Chaque matin je prends un café avant d'aller au _____",
          a: "travail",
          img: "https://images.unsplash.com/photo-1521791136064-7986c2920216",
        },
      ],
      5: [
        {
          q: "Après le repas je range les assiettes dans le _____",
          a: "placard",
          img: "https://images.unsplash.com/photo-1556911220-bff31c812dba",
        },
      ],
    },

    Dyslexie: {
      1: [{ q: "chat", a: "chat" }],
      2: [{ q: "voiture", a: "voiture" }],
      3: [{ q: "ordinateur", a: "ordinateur" }],
      4: [{ q: "Le chat dort", a: "chat" }],
      5: [{ q: "Le garçon joue dans le jardin", a: "garçon" }],
    },

    Memoire: {
      1: [{ q: "chat maison", a: "chat maison" }],
      2: [{ q: "chat maison livre", a: "chat maison livre" }],
      3: [{ q: "chat maison livre soleil", a: "chat maison livre soleil" }],
      4: [{ q: "chat maison livre soleil voiture", a: "chat maison livre soleil voiture" }],
      5: [{ q: "chat maison livre soleil voiture jardin", a: "chat maison livre soleil voiture jardin" }],
    },

    Concentration: {
      1: [{ q: "2, 4, 6, ___", a: "8" }],
      2: [{ q: "5, 10, 15, ___", a: "20" }],
      3: [{ q: "1, 3, 5, 7, ___", a: "9" }],
      4: [{ q: "10, 20, 30, 40, ___", a: "50" }],
      5: [{ q: "3, 6, 12, 24, ___", a: "48" }],
    },

    Math: {
      1: [{ q: "2 + 3", a: "5" }],
      2: [{ q: "8 + 7", a: "15" }],
      3: [{ q: "12 - 5", a: "7" }],
      4: [{ q: "6 × 7", a: "42" }],
      5: [{ q: "45 ÷ 5", a: "9" }],
    },
  };

  function generateExercise(level, profil) {
    const safeLevel = Math.min(level + difficulty - 1, 5);

    const profileExercises = exercises[profil] || exercises.AVC;

    const levelExercises = profileExercises[safeLevel];

    const selected = randomItem(levelExercises);

    return {
      type: profil,
      instruction:
        profil === "AVC"
          ? "Complète la phrase avec l'image"
          : profil === "Dyslexie"
          ? "Lis puis écris"
          : profil === "Memoire"
          ? "Mémorise"
          : profil === "Math"
          ? "Résous le calcul"
          : "Trouve la réponse",
      question: selected.q,
      answer: selected.a,
      image: selected.img || null,
    };
  }

  useEffect(() => {
    const saved = localStorage.getItem("advanced-progress");

    if (saved) {
      const data = JSON.parse(saved);

      setScore(data.score || 0);
      setDifficulty(data.difficulty || 1);
      setXp(data.xp || 0);
      setEnergy(data.energy || 100);
      setExerciseIndex(data.exerciseIndex || 0);
    }
  }, []);

  useEffect(() => {
    const newExercise = generateExercise(currentLevel, profil);
    setCurrentExercise(newExercise);
    setReactionTime(Date.now());
  }, [exerciseIndex, profil, difficulty]);

  useEffect(() => {
    localStorage.setItem(
      "advanced-progress",
      JSON.stringify({
        score,
        difficulty,
        xp,
        energy,
        exerciseIndex,
      })
    );
  }, [score, difficulty, xp, energy, exerciseIndex]);

  useEffect(() => {
    if (energy <= 20) {
      setFeedback("Pause recommandée 🧘");
    }
  }, [energy]);

  const normalizeText = (text) =>
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();

  const checkAnswer = () => {
    if (!currentExercise) return;

    const responseTime = Math.floor((Date.now() - reactionTime) / 1000);

    const userAnswer = normalizeText(answer);
    const correctAnswer = normalizeText(currentExercise.answer);

    const isCorrect = userAnswer === correctAnswer;

    setEnergy((prev) => Math.max(0, prev - 2));

    if (isCorrect) {
      setScore((prev) => prev + 1);
      setXp((prev) => prev + 10);

      const streak = goodStreak + 1;

      setGoodStreak(streak);
      setBadStreak(0);

      setStats((prev) => ({
        ...prev,
        totalCorrect: prev.totalCorrect + 1,
      }));

      if (streak >= 5) {
        setDifficulty((prev) => Math.min(prev + 1, 5));
        setGoodStreak(0);
      }

      if (score + 1 === 10) setBadge("🌟 Débutant");
      if (score + 1 === 25) setBadge("🏆 Expert");
      if (score + 1 === 50) setBadge("👑 Maître Cognitif");

      setFeedback(`Bonne réponse 👍 (${responseTime}s)`);
    } else {
      const streak = badStreak + 1;

      setBadStreak(streak);
      setGoodStreak(0);

      setStats((prev) => ({
        ...prev,
        totalWrong: prev.totalWrong + 1,
      }));

      if (streak >= 3) {
        setDifficulty((prev) => Math.max(1, prev - 1));
        setBadStreak(0);
      }

      setFeedback(
        `Incorrect ❌ Bonne réponse : ${currentExercise.answer}`
      );
    }
  };

  const nextExercise = () => {
    setExerciseIndex((prev) => prev + 1);
    setAnswer("");
    setFeedback("");
  };

  const speakText = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "fr-FR";
    speech.rate = 0.9;
    window.speechSynthesis.speak(speech);
  };

  const startVoiceRecognition = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();

    recognition.lang = "fr-FR";

    recognition.onresult = (event) => {
      setAnswer(event.results[0][0].transcript);
    };

    recognition.start();
  };

  const progress = ((exerciseIndex % 10) / 10) * 100;

  if (!currentExercise) return null;

  return (
    <div className={`page-container ${darkMode ? "dark" : ""}`}>
      <div className="main-card">
        <h1 className="main-title">Exercices {profil}</h1>

        <div className="button-row">
          <button onClick={() => setDarkMode(!darkMode)}>
            🌙 Mode sombre
          </button>

          <button
            onClick={() =>
              speakText(
                `${currentExercise.instruction} ${currentExercise.question}`
              )
            }
          >
            Lire 🔊
          </button>

          <button onClick={startVoiceRecognition}>
            Répondre 🎤
          </button>
        </div>

        <div className="emotion-row">
          <button onClick={() => setEmotion("🙂")}>🙂</button>
          <button onClick={() => setEmotion("😐")}>😐</button>
          <button onClick={() => setEmotion("😴")}>😴</button>
        </div>

        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${progress}%` }} />
        </div>

        <div className="energy-bar-container">
          <div className="energy-bar" style={{ width: `${energy}%` }} />
        </div>

        <div className="exercise-box">
          <div className="instruction-box">
            <span>Consigne</span>
            <h3>{currentExercise.instruction}</h3>
          </div>

          {currentExercise.image && (
            <div style={{ textAlign: "center", marginBottom: "25px" }}>
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

          <h2>{currentExercise.question}</h2>

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
          <button onClick={checkAnswer}>Vérifier</button>
          <button onClick={nextExercise}>Exercice suivant</button>
        </div>

        <div className="feedback-box">
          <h2>{feedback}</h2>
        </div>

        {badge && <div className="badge-box">{badge}</div>}

        <div className="score-box">
          Score : {score} | XP : {xp} | Niveau : {currentLevel} | Difficulté : {difficulty}
        </div>

        <div className="stats-box">
          <p>Bonnes réponses : {stats.totalCorrect}</p>
          <p>Erreurs : {stats.totalWrong}</p>
          <p>Émotion : {emotion || "Non définie"}</p>
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
