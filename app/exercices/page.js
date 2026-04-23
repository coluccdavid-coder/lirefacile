"use client";

import { useState } from "react";

export default function ExercisesModule() {
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [feedback, setFeedback] = useState("");

  const exercises = [
    {
      type: "mot",
      question: "Complète le mot : ma__on",
      answer: "ison",
      solution: "maison",
    },
    {
      type: "phrase",
      question: "Remets la phrase dans l'ordre : mange / je / pomme / une",
      answer: "je mange une pomme",
    },
    {
      type: "memoire",
      question: "Mémorise ces mots : chat, soleil, voiture",
      answer: "chat soleil voiture",
    },
    {
      type: "comprehension",
      question: "Paul mange une pomme. Que mange Paul ?",
      answer: "une pomme",
    },
  ];

  const currentExercise = exercises[exerciseIndex];

  const checkAnswer = () => {
    const userAnswer = answer.trim().toLowerCase();
    const correctAnswer = currentExercise.answer.toLowerCase();

    if (userAnswer === correctAnswer) {
      setScore(score + 1);
      setFeedback("Bonne réponse 👍");
    } else {
      setFeedback(`Réponse attendue : ${currentExercise.answer}`);
    }

    setShowResult(true);
  };

  const nextExercise = () => {
    setAnswer("");
    setShowResult(false);
    setFeedback("");

    if (exerciseIndex < exercises.length - 1) {
      setExerciseIndex(exerciseIndex + 1);
    } else {
      setExerciseIndex(0);
    }
  };
}
