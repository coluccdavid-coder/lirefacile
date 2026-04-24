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
        {
          q: "Je lis un _____",
          a: "livre",
          img: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
        },
      ],

      2: [
        {
          q: "Le chat dort sur le _____",
          a: "canapé",
          img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
        },
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
      1: [
        {
          q: "chat",
          a: "chat",
          img: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba",
        },
        {
          q: "soleil",
          a: "soleil",
          img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
        },
      ],

      2: [
        {
          q: "maison",
          a: "maison",
          img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
        },
        {
          q: "voiture",
          a: "voiture",
          img: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8",
        },
      ],

      3: [
        {
          q: "ordinateur",
          a: "ordinateur",
          img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
        },
      ],

      4: [
        {
          q: "Le chat dort",
          a: "chat",
          img: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba",
        },
      ],

      5: [
        {
          q: "Le garçon joue dans le jardin",
          a: "garçon",
          img: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9",
        },
      ],
    },

    Mémoire: {
      1: [{ q: "chat maison", a: "chat maison" }],
      2: [{ q: "chat maison livre", a: "chat maison livre" }],
      3: [{ q: "chat maison livre soleil", a: "chat maison livre soleil" }],
      4: [
        {
          q: "chat maison livre soleil voiture",
          a: "chat maison livre soleil voiture",
        },
      ],
      5: [
        {
          q: "chat maison livre soleil voiture jardin",
          a: "chat maison livre soleil voiture jardin",
        },
      ],
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

    const profileExercises = exercises[profil];

    if (!profileExercises) return null;

    const levelExercises = profileExercises[safeLevel];

    const selected = randomItem(levelExercises);

    return {
      type: profil,
      instruction:
        profil === "AVC"
          ? "Complète la phrase avec l'image"
          : profil === "Dyslexie"
          ? "Lis puis écris"
          : profil === "Mémoire"
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
    const newExercise = generateExercise(currentLevel, profil);
    setCurrentExercise(newExercise);
  }, [exerciseIndex, profil]);

  const normalizeText = (text) =>
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();

  const checkAnswer = () => {
    if (!currentExercise) return;

    const userAnswer = normalizeText(answer);
    const correctAnswer = normalizeText(currentExercise.answer);

    const isCorrect = userAnswer === correctAnswer;

    if (isCorrect) {
      setScore((prev) => prev + 1);

      const streak = goodStreak + 1;

      setGoodStreak(streak);
      setBadStreak(0);

      if (streak >= 5) {
        setDifficulty((prev) => Math.min(prev + 1, 5));
        setGoodStreak(0);
      }

      setFeedback("Bonne réponse 👍");
    } else {
      const streak = badStreak + 1;

      setBadStreak(streak);
      setGoodStreak(0);

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

  const progress = ((exerciseIndex % 10) / 10) * 100;

  if (!currentExercise) return null;

  return (
    <div className={`page-container ${darkMode ? "dark" : ""}`}>
      <div className="main-card">
        <h1 className="main-title">Exercices {profil}</h1>

        <div className="progress-container">
          <div
            className="progress-bar"
            style={{ width: `${progress}%` }}
          />
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
            placeholder="Écris ta réponse"
            className="exercise-input"
          />
        </div>

        <div className="button-row">
          <button onClick={checkAnswer}>Vérifier</button>
          <button onClick={nextExercise}>
            Exercice suivant
          </button>
        </div>

        <div className="feedback-box">
          <h2>{feedback}</h2>
        </div>

        <div className="score-box">
          Score : {score} | Niveau : {currentLevel} |
          Difficulté : {difficulty}
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
