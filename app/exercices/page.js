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
        { q: "Je bois de l'_____", a: "eau" },
        { q: "Je lis un _____", a: "livre" },
        { q: "Je vois un _____", a: "chat" },
      ],
      2: [
        { q: "Le chat dort sur le _____", a: "canapé" },
        { q: "Je mange une pomme _____", a: "rouge" },
      ],
      3: [
        {
          q: "Le petit garçon joue avec un _____ dans le jardin",
          a: "ballon",
        },
      ],
      4: [
        {
          q: "Chaque matin je prends mon café avant d'aller au _____",
          a: "travail",
        },
      ],
      5: [
        {
          q: "Après avoir mangé je range les assiettes dans le _____",
          a: "placard",
        },
      ],
    },

    Dyslexie: {
      1: [
        { q: "chat", a: "chat" },
        { q: "soleil", a: "soleil" },
      ],
      2: [
        { q: "maison", a: "maison" },
        { q: "voiture", a: "voiture" },
      ],
      3: [
        { q: "ordinateur", a: "ordinateur" },
        { q: "papillon", a: "papillon" },
      ],
      4: [
        { q: "Le chat dort", a: "chat" },
      ],
      5: [
        { q: "Le garçon joue dans le jardin", a: "garçon" },
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
          ? "Complète la phrase :"
          : profil === "Dyslexie"
          ? "Lis puis écris :"
          : profil === "Mémoire"
          ? "Mémorise :"
          : profil === "Math"
          ? "Résous le calcul :"
          : "Trouve la réponse :",
      question: selected.q,
      answer: selected.a,
    };
  }

  useEffect(() => {
    const saved = localStorage.getItem("progress");

    if (saved) {
      const data = JSON.parse(saved);

      setScore(data.score || 0);
      setExerciseIndex(data.exerciseIndex || 0);
      setDifficulty(data.difficulty || 1);
      setEnergy(data.energy || 100);
    }
  }, []);

  useEffect(() => {
    const newExercise = generateExercise(currentLevel, profil);
    setCurrentExercise(newExercise);
  }, [exerciseIndex, profil]);

  useEffect(() => {
    localStorage.setItem(
      "progress",
      JSON.stringify({
        score,
        exerciseIndex,
        difficulty,
        energy,
      })
    );
  }, [score, exerciseIndex, difficulty, energy]);

  useEffect(() => {
    if (!currentExercise) return;

    if (profil === "Mémoire") {
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
  }, [currentExercise]);

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

    const isCorrect =
      profil === "Mémoire"
        ? userAnswer === correctAnswer
        : userAnswer === correctAnswer;

    setEnergy((prev) => Math.max(0, prev - 2));

    if (isCorrect) {
      setScore((prev) => prev + 1);

      const streak = goodStreak + 1;

      setGoodStreak(streak);
      setBadStreak(0);

      if (streak >= 5) {
        setDifficulty((prev) => Math.min(prev + 1, 5));
        setGoodStreak(0);
      }

      if (score + 1 === 10) setBadge("🌟 Débutant");
      if (score + 1 === 25) setBadge("🏆 Expert");

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

  const speakText = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "fr-FR";
    speech.rate = 0.85;
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

        <div className="progress-container">
          <div
            className="progress-bar"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="energy-bar-container">
          <div
            className="energy-bar"
            style={{ width: `${energy}%` }}
          />
        </div>

        <div className="exercise-box">
          <div className="instruction-box">
            <span className="instruction-label">Consigne</span>
            <h3 className="instruction-text">
              {currentExercise.instruction}
            </h3>
          </div>

          <h2 className="exercise-question">
            {showQuestion
              ? currentExercise.question
              : "Quels étaient les mots ?"}
          </h2>

          {profil === "Mémoire" && showQuestion && (
            <div>Temps restant : {timer}s</div>
          )}

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
          <button onClick={nextExercise}>
            Exercice suivant
          </button>
        </div>

        <div className="feedback-box">
          <h2>{feedback}</h2>
        </div>

        {badge && <div className="badge-box">{badge}</div>}

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
