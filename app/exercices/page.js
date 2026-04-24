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
  const [dyslexiaFont, setDyslexiaFont] = useState(false);
  const [showQuestion, setShowQuestion] = useState(true);
  const [timer, setTimer] = useState(10);
  const [difficulty, setDifficulty] = useState(1);
  const [goodStreak, setGoodStreak] = useState(0);
  const [badStreak, setBadStreak] = useState(0);
  const [lastQuestions, setLastQuestions] = useState([]);
  const [badge, setBadge] = useState(null);
  const [energy, setEnergy] = useState(100);
  const [darkMode, setDarkMode] = useState(false);
  const [history, setHistory] = useState([]);
  const [currentExercise, setCurrentExercise] = useState(null);

  const currentLevel = Math.floor(exerciseIndex / 10) + 1;

  const words = [
    "maison",
    "voiture",
    "chat",
    "chien",
    "soleil",
    "banane",
    "pomme",
    "ordinateur",
    "montagne",
    "école",
    "livre",
    "table",
    "chaise",
    "jardin",
    "musique",
    "papillon",
    "bateau",
    "vélo",
    "forêt",
  ];

  const imageLibrary = {
    maison: "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
    voiture: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8",
    chat: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba",
    chien: "https://images.unsplash.com/photo-1517849845537-4d257902454a",
    soleil: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    banane: "https://images.unsplash.com/photo-1574226516831-e1dff420e37f",
    pomme: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce",
    ordinateur: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
    montagne: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
    école: "https://images.unsplash.com/photo-1580582932707-520aed937b7b",
  };

  const randomItem = (array) =>
    array[Math.floor(Math.random() * array.length)];

  function generateExercise(level, profil) {
    const randomWord = randomItem(words);
    const image = imageLibrary[randomWord] || null;
    const adjustedLevel = level + difficulty;

    if (profil === "AVC") {
      return {
        type: "mot",
        instruction: "Complète le mot :",
        question: `${randomWord.slice(0, 2)}____`,
        answer: randomWord,
        image,
      };
    }

    if (profil === "Dyslexie") {
      return {
        type: "lecture",
        instruction: "Lis puis écris le mot :",
        question: randomWord,
        answer: randomWord,
        image,
      };
    }

    if (profil === "Mémoire") {
      const memoryWords = [...words]
        .sort(() => Math.random() - 0.5)
        .slice(0, Math.min(adjustedLevel + 2, 6));

      return {
        type: "memoire",
        instruction: "Mémorise les mots :",
        question: memoryWords.join(" "),
        answer: memoryWords.join(" "),
        image: null,
      };
    }

    if (profil === "Math") {
      const max = adjustedLevel * 10;

      const a = Math.floor(Math.random() * max);
      const b = Math.floor(Math.random() * max);

      const operations = ["+", "-", "*"];
      const op = randomItem(operations);

      let result = 0;

      if (op === "+") result = a + b;
      if (op === "-") result = a - b;
      if (op === "*") result = a * b;

      return {
        type: "math",
        instruction: "Résous le calcul :",
        question: `${a} ${op} ${b}`,
        answer: result.toString(),
        image: null,
      };
    }

    return {
      type: "mot",
      instruction: "Écris le mot :",
      question: randomWord,
      answer: randomWord,
      image,
    };
  }

  useEffect(() => {
    const saved = localStorage.getItem("lirefacile-progress");

    if (saved) {
      const data = JSON.parse(saved);

      setScore(data.score || 0);
      setExerciseIndex(data.exerciseIndex || 0);
      setDifficulty(data.difficulty || 1);
      setEnergy(data.energy || 100);
    }
  }, []);

  useEffect(() => {
    let newExercise;
    let attempts = 0;

    do {
      newExercise = generateExercise(currentLevel, profil);
      attempts++;
    } while (
      lastQuestions.includes(newExercise.question) &&
      attempts < 20
    );

    setCurrentExercise(newExercise);

    setLastQuestions((prev) => {
      const updated = [...prev, newExercise.question];

      if (updated.length > 10) {
        updated.shift();
      }

      return updated;
    });
  }, [exerciseIndex, profil]);

  useEffect(() => {
    localStorage.setItem(
      "lirefacile-progress",
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
  }, [currentExercise]);

  useEffect(() => {
    if (energy <= 20) {
      setFeedback("Pause recommandée 🧘");
    }
  }, [energy]);

  const normalizeText = (text) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim()
      .replace(/\s+/g, " ");
  };

  const checkAnswer = () => {
    if (!currentExercise) return;

    const userAnswer = normalizeText(answer);
    const correctAnswer = normalizeText(currentExercise.answer);

    const isCorrect =
      currentExercise.type === "memoire"
        ? userAnswer.split(" ").length ===
            correctAnswer.split(" ").length &&
          userAnswer
            .split(" ")
            .every((word) =>
              correctAnswer.split(" ").includes(word)
            )
        : userAnswer === correctAnswer;

    setEnergy((prev) => Math.max(0, prev - 2));

    setHistory((prev) => [
      ...prev,
      {
        correct: isCorrect,
        date: Date.now(),
      },
    ]);

    if (isCorrect) {
      setScore((prev) => prev + 1);

      const newGood = goodStreak + 1;

      setGoodStreak(newGood);
      setBadStreak(0);

      if (newGood >= 5) {
        setDifficulty((prev) => prev + 1);
        setGoodStreak(0);
      }

      if (score + 1 === 10) setBadge("🌟 Débutant");
      if (score + 1 === 25) setBadge("🏆 Expert");

      setFeedback("Bonne réponse 👍");
    } else {
      const newBad = badStreak + 1;

      setBadStreak(newBad);
      setGoodStreak(0);

      if (newBad >= 3) {
        setDifficulty((prev) => Math.max(1, prev - 1));
        setBadStreak(0);
      }

      setFeedback(`Bonne réponse : ${currentExercise.answer}`);
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
    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setAnswer(transcript);
    };
  };

  const progress = ((exerciseIndex % 10) / 10) * 100;

  if (!currentExercise) return null;

  return (
    <div className={`page-container ${darkMode ? "dark" : ""}`}>
      <div className="main-card fade-in">
        <h1 className="main-title">Exercices {profil}</h1>

        <div className="button-row">
          <button onClick={() => setDarkMode(!darkMode)}>
            🌙 Mode sombre
          </button>

          <button onClick={() => setDyslexiaFont(!dyslexiaFont)}>
            Police Dyslexie
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

        <div className={`exercise-box ${dyslexiaFont ? "dyslexia-font" : ""}`}>
          <p>{currentExercise.instruction}</p>

          {currentExercise.image && (
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <img
                src={currentExercise.image}
                alt="illustration"
                style={{
                  width: "220px",
                  height: "220px",
                  objectFit: "cover",
                  borderRadius: "20px",
                }}
              />
            </div>
          )}

          <h2>
            {showQuestion
              ? currentExercise.question
              : "Quels étaient les mots affichés ?"}
          </h2>

          {currentExercise.type === "memoire" && showQuestion && (
            <div>Disparition dans : {timer}s</div>
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
            className="exercise-input"
          />
        </div>

        <div className="button-row">
          <button onClick={checkAnswer}>Vérifier</button>
          <button onClick={nextExercise}>Exercice suivant</button>
        </div>

        <div className={`feedback-box ${feedback ? "feedback-success" : ""}`}>
          <h2>{feedback}</h2>
        </div>

        {badge && <div className="badge-box">Badge : {badge}</div>}

        <div className="score-box">
          Score : {score} | Difficulté : {difficulty}
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
