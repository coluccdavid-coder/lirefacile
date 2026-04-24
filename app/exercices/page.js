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
  const [errorCount, setErrorCount] = useState(0);

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
    "fenêtre",
    "table",
    "chaise",
    "jardin",
    "musique",
    "papillon",
    "bateau",
    "vélo",
    "forêt",
  ];

  function randomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  function generateMath(level) {
    const max = level * 10;
    const a = Math.floor(Math.random() * max);
    const b = Math.floor(Math.random() * max);

    return {
      type: "math",
      instruction: "Résous le calcul :",
      question: `${a} + ${b} = ?`,
      answer: String(a + b),
      image: null,
    };
  }

  function generateExercise(level, profil) {
    const randomWord = randomItem(words);

    const image = `https://loremflickr.com/400/400/${encodeURIComponent(
      randomWord
    )}`;

    const adjustedLevel = level + difficulty;

    if (profil === "AVC") {
      const types = ["mot", "phrase", "memoire"];
      const selected = randomItem(types);

      if (selected === "mot") {
        return {
          type: "mot",
          instruction: "Complète le mot :",
          question: `${randomWord.slice(0, 2)}____`,
          answer: randomWord,
          image,
        };
      }

      if (selected === "phrase") {
        return {
          type: "phrase",
          instruction: "Complète la phrase :",
          question: "Je vois une _____",
          answer: randomWord,
          image,
        };
      }

      const memoryWords = [...words]
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.min(adjustedLevel + 2, 6));

      return {
        type: "memoire",
        instruction: "Mémorise les mots :",
        question: memoryWords.join(", "),
        answer: memoryWords.join(" "),
        image: null,
      };
    }

    if (profil === "Dyslexie") {
      return {
        type: "lecture",
        instruction: "Écris correctement le mot :",
        question: randomWord,
        answer: randomWord,
        image,
      };
    }

    if (profil === "Autisme") {
      const routines = [
        {
          q: "Que fais-tu après le réveil ?",
          a: "petit déjeuner",
        },
        {
          q: "Quelle couleur a le ciel ?",
          a: "bleu",
        },
        {
          q: "Que fais-tu avant de dormir ?",
          a: "se brosser les dents",
        },
      ];

      const routine = randomItem(routines);

      return {
        type: "routine",
        instruction: "Réponds simplement :",
        question: routine.q,
        answer: routine.a,
        image,
      };
    }

    if (profil === "Mémoire") {
      const memoryWords = [...words]
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.min(adjustedLevel + 3, 8));

      return {
        type: "memoire",
        instruction: "Observe et mémorise :",
        question: memoryWords.join(", "),
        answer: memoryWords.join(" "),
        image: null,
      };
    }

    if (profil === "Concentration") {
      return {
        type: "attention",
        instruction: "Trouve le nombre suivant :",
        question: "2, 4, 6, 8, ___",
        answer: "10",
        image,
      };
    }

    if (profil === "Math") {
      return generateMath(adjustedLevel);
    }

    return {
      type: "mot",
      instruction: "Écris le mot :",
      question: randomWord,
      answer: randomWord,
      image,
    };
  }

  const [currentExercise, setCurrentExercise] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("lirefacile-progress");

    if (saved) {
      const data = JSON.parse(saved);

      setScore(data.score || 0);
      setExerciseIndex(data.exerciseIndex || 0);
    }
  }, []);

  useEffect(() => {
    setCurrentExercise(generateExercise(currentLevel, profil));
  }, [exerciseIndex, profil]);

  useEffect(() => {
    localStorage.setItem(
      "lirefacile-progress",
      JSON.stringify({
        score,
        exerciseIndex,
        profil,
      })
    );
  }, [score, exerciseIndex, profil]);

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
    if (errorCount >= 3) {
      setFeedback(
        "On ralentit un peu pour rendre l'exercice plus simple 🧠"
      );

      setDifficulty((prev) => Math.max(1, prev - 1));
      setErrorCount(0);
    }
  }, [errorCount]);

  const normalizeText = (text) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim()
      .replace(/\s+/g, " ");
  };

  const checkAnswer = () => {
    const userAnswer = normalizeText(answer);
    const correctAnswer = normalizeText(currentExercise.answer);

    if (userAnswer === correctAnswer) {
      setScore((prev) => prev + 1);
      setFeedback("Bonne réponse 👍");

      if ((score + 1) % 5 === 0) {
        setDifficulty((prev) => prev + 1);
      }
    } else {
      setFeedback(`Bonne réponse : ${currentExercise.answer}`);
      setErrorCount((prev) => prev + 1);
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
    <div className="page-container">
      <div className="main-card fade-in">
        <h1 className="main-title">Exercices {profil}</h1>

        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <div className="level-box">Niveau {currentLevel}</div>
        </div>

        <div className="button-row" style={{ justifyContent: "center" }}>
          <button
            className="primary-button"
            onClick={() => setDyslexiaFont(!dyslexiaFont)}
          >
            Police Dyslexie
          </button>

          <button
            className="primary-button"
            onClick={() =>
              speakText(
                `${currentExercise.instruction} ${currentExercise.question}`
              )
            }
          >
            Lire 🔊
          </button>

          <button
            className="primary-button"
            onClick={startVoiceRecognition}
          >
            Répondre 🎤
          </button>
        </div>

        <div className="progress-container">
          <div
            className="progress-bar"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div
          className={`exercise-box ${
            dyslexiaFont ? "dyslexia-font" : ""
          }`}
        >
          <p className="exercise-label">
            {currentExercise.instruction}
          </p>

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

          <h2 className="exercise-question easy-reading">
            {showQuestion
              ? currentExercise.question
              : "Quels étaient les mots affichés ?"}
          </h2>

          {currentExercise.type === "memoire" && showQuestion && (
            <div className="timer-box">
              Disparition dans : {timer}s
            </div>
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
          <button className="primary-button" onClick={checkAnswer}>
            Vérifier
          </button>

          <button
            className="primary-button success-button"
            onClick={nextExercise}
          >
            Exercice suivant
          </button>
        </div>

        <div className="feedback-box">
          <h2>{feedback}</h2>
        </div>

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

