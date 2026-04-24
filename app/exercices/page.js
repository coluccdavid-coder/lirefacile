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
  const [xp, setXp] = useState(0);
  const [badge, setBadge] = useState(null);
  const [lastQuestions, setLastQuestions] = useState([]);
  const [startTime, setStartTime] = useState(Date.now());

  const [cognitiveProfile, setCognitiveProfile] = useState({
    memory: 50,
    attention: 50,
    language: 50,
    fatigue: 0,
    confidence: 50,
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
        {
          q: "Je mange une _____",
          a: "pomme",
          img: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce",
        },
      ],
      2: [
        {
          q: "Le chat dort sur le _____",
          a: "canapé",
          img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
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
      2: [{ q: "maison", a: "maison" }],
      3: [{ q: "ordinateur", a: "ordinateur" }],
      4: [{ q: "Le chat dort", a: "chat" }],
      5: [{ q: "Le garçon joue dans le jardin", a: "garçon" }],
    },

    Mémoire: {
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
      instruction:
        profil === "AVC"
          ? "Complète la phrase"
          : profil === "Dyslexie"
          ? "Lis puis écris"
          : profil === "Mémoire"
          ? "Mémorise"
          : profil === "Math"
          ? "Résous le calcul"
          : "Réponds",
      question: selected.q,
      answer: selected.a,
      image: selected.img || null,
    };
  }

  function adaptDifficulty(history) {
    const recent = history.slice(-10);

    if (recent.length === 0) return "keep";

    const successRate =
      recent.filter((x) => x.correct).length / recent.length;

    if (successRate > 0.8) return "increase";
    if (successRate < 0.5) return "decrease";

    return "keep";
  }

  function calculateFatigue(history) {
    const recent = history.slice(-5);

    return recent.filter(
      (x) => !x.correct || x.responseTime > 12
    ).length;
  }

  useEffect(() => {
    let newExercise;
    let attempts = 0;

    do {
      newExercise = generateExercise(currentLevel, profil);
      attempts++;
    } while (
      lastQuestions.includes(newExercise.question) &&
      attempts < 30
    );

    setCurrentExercise(newExercise);
    setStartTime(Date.now());

    setLastQuestions((prev) => {
      const updated = [...prev, newExercise.question];

      if (updated.length > 20) {
        updated.shift();
      }

      return updated;
    });
  }, [exerciseIndex, profil, difficulty]);

  const normalizeText = (text) =>
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();

  const checkAnswer = () => {
    if (!currentExercise) return;

    const responseTime = Math.floor((Date.now() - startTime) / 1000);

    const userAnswer = normalizeText(answer);
    const correctAnswer = normalizeText(currentExercise.answer);

    const isCorrect = userAnswer === correctAnswer;

    const sessionData = {
      correct: isCorrect,
      difficulty,
      responseTime,
      profile: profil,
      timestamp: Date.now(),
    };

    const savedAnalytics =
      JSON.parse(localStorage.getItem("analytics")) || [];

    savedAnalytics.push(sessionData);

    localStorage.setItem(
      "analytics",
      JSON.stringify(savedAnalytics)
    );

    const aiDecision = adaptDifficulty(savedAnalytics);

    if (aiDecision === "increase") {
      setDifficulty((prev) => Math.min(prev + 1, 5));
    }

    if (aiDecision === "decrease") {
      setDifficulty((prev) => Math.max(prev - 1, 1));
    }

    const fatigueScore = calculateFatigue(savedAnalytics);

    setCognitiveProfile((prev) => ({
      ...prev,
      fatigue: fatigueScore * 10,
    }));

    if (fatigueScore >= 4) {
      setFeedback("Pause recommandée 🧘");
      return;
    }

    if (isCorrect) {
      setScore((prev) => prev + 1);
      setXp((prev) => prev + 10);

      const streak = goodStreak + 1;

      setGoodStreak(streak);
      setBadStreak(0);

      if (score + 1 === 10) setBadge("🌟 Débutant");
      if (score + 1 === 25) setBadge("🏆 Expert");
      if (score + 1 === 50) setBadge("👑 Maître Cognitif");

      setEnergy((prev) => Math.max(0, prev - 1));

      setFeedback(`Bonne réponse 👍 (${responseTime}s)`);
    } else {
      const streak = badStreak + 1;

      setBadStreak(streak);
      setGoodStreak(0);

      setEnergy((prev) => Math.max(0, prev - 3));

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

  const progress = ((exerciseIndex % 10) / 10) * 100;

  if (!currentExercise) return null;

  return (
    <div className="page-container">
      <div className="main-card">
        <h1 className="main-title">Exercices {profil}</h1>

        <div className="progress-container">
          <div
            className="progress-bar"
            style={{ width: `${progress}%` }}
          />
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
          <button onClick={nextExercise}>Suivant</button>
        </div>

        <div className="feedback-box">
          <h2>{feedback}</h2>
        </div>

        <div className="score-box">
          Score : {score} | XP : {xp} | Niveau : {currentLevel}
        </div>

        <div className="score-box">
          Fatigue : {cognitiveProfile.fatigue}%
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
