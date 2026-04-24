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
  const [lastQuestion, setLastQuestion] = useState("");

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

  // Images plus stables et moins confuses
  const imageLibrary = {
    maison:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
    voiture:
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8",
    chat:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba",
    chien:
      "https://images.unsplash.com/photo-1517849845537-4d257902454a",
    soleil:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    banane:
      "https://images.unsplash.com/photo-1574226516831-e1dff420e37f",
    pomme:
      "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce",
    ordinateur:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
    montagne:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
    école:
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b",
    livre:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794",
    table:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
    chaise:
      "https://images.unsplash.com/photo-1519947486511-46149fa0a254",
    jardin:
      "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735",
    musique:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f",
    papillon:
      "https://images.unsplash.com/photo-1444927714506-8492d94b4e3d",
    bateau:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
    vélo:
      "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8",
    forêt:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
  };

  const image = imageLibrary[randomWord] || null;

  const adjustedLevel = level + difficulty;

  // ======================
  // AVC
  // ======================
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
        instruction: "Complète la phrase grâce à l'image :",
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
      instruction: "Mémorise les mots affichés :",
      question: memoryWords.join(" "),
      answer: memoryWords.join(" "),
      image: null,
    };
  }

  // ======================
  // DYSLEXIE
  // ======================
  if (profil === "Dyslexie") {
    const types = ["lecture", "mot", "phrase"];
    const selected = randomItem(types);

    if (selected === "lecture") {
      return {
        type: "lecture",
        instruction: "Lis puis écris correctement le mot :",
        question: randomWord,
        answer: randomWord,
        image,
      };
    }

    if (selected === "mot") {
      return {
        type: "mot",
        instruction: "Complète le mot :",
        question: `${randomWord.slice(0, 3)}___`,
        answer: randomWord,
        image,
      };
    }

    return {
      type: "phrase",
      instruction: "Observe l'image puis écris le mot :",
      question: "Quel est cet objet ?",
      answer: randomWord,
      image,
    };
  }

  // ======================
  // AUTISME
  // ======================
if (profil === "Autisme") {
  const routines = [
    {
      q: "Que fais-tu après le réveil ?",
      a: "petit déjeuner",
      img: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0",
    },
    {
      q: "Quelle couleur a le ciel ?",
      a: "bleu",
      img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    },
    {
      q: "Que fais-tu avant de dormir ?",
      a: "se brosser les dents",
      img: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2",
    },
    {
      q: "Que fais-tu pour te laver ?",
      a: "prendre une douche",
      img: "https://images.unsplash.com/photo-1584622781564-1d987f7333c1",
    },
    {
      q: "Que mets-tu pour dormir ?",
      a: "pyjama",
      img: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
    },
  ];

  const routine = randomItem(routines);

  return {
    type: "routine",
    instruction: "Observe l'image puis réponds :",
    question: routine.q,
    answer: routine.a,
    image: routine.img,
  };
}
  // ======================
  // MÉMOIRE
  // ======================
  if (profil === "Mémoire") {
    const memoryWords = [...words]
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.min(adjustedLevel + 3, 8));

    return {
      type: "memoire",
      instruction: "Observe et mémorise les mots :",
      question: memoryWords.join(" "),
      answer: memoryWords.join(" "),
      image: null,
    };
  }

  // ======================
  // CONCENTRATION
  // ======================
  if (profil === "Concentration") {
    const suites = [
      { q: "2, 4, 6, 8, ___", a: "10" },
      { q: "5, 10, 15, ___", a: "20" },
      { q: "1, 3, 5, 7, ___", a: "9" },
      { q: "10, 20, 30, ___", a: "40" },
    ];

    const suite = randomItem(suites);

    return {
      type: "attention",
      instruction: "Trouve le nombre suivant :",
      question: suite.q,
      answer: suite.a,
      image: null,
    };
  }

  // ======================
  // MATH
  // ======================
  if (profil === "Math") {
    const max = adjustedLevel * 10;

    const a = Math.floor(Math.random() * max);
    const b = Math.floor(Math.random() * max);

    const operations = ["+", "-", "*"];
    const operation = randomItem(operations);

    let result = 0;

    if (operation === "+") result = a + b;
    if (operation === "-") result = a - b;
    if (operation === "*") result = a * b;

    return {
      type: "math",
      instruction: "Résous le calcul :",
      question: `${a} ${operation} ${b}`,
      answer: result.toString(),
      image: null,
    };
  }

  // ======================
  // FALLBACK
  // ======================
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
  let newExercise;
  let attempts = 0;

  do {
    newExercise = generateExercise(currentLevel, profil);
    attempts++;
  } while (
    newExercise.question === lastQuestion &&
    attempts < 10
  );

  setCurrentExercise(newExercise);
  setLastQuestion(newExercise.question);
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

    if (!userAnswer) {
      setFeedback("Écris une réponse");
      return;
    }

  const isCorrect =
  currentExercise.type === "memoire"
    ? userAnswer.split(" ").length ===
        correctAnswer.split(" ").length &&
      userAnswer
        .split(" ")
        .every((word) => correctAnswer.split(" ").includes(word))
    : userAnswer === correctAnswer;

    if (isCorrect) {
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

