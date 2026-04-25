"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function EvaluationPage() {
  const [patient, setPatient] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answer, setAnswer] = useState("");

  const [results, setResults] = useState({
    memory: 0,
    attention: 0,
    reading: 0,
    dyslexia: 0,
  });

  useEffect(() => {
    const stored = JSON.parse(
      localStorage.getItem("patientProfile")
    );

    setPatient(stored);
  }, []);

  if (!patient) {
    return <p style={{ padding: 40 }}>Chargement...</p>;
  }

  const questions = [
    {
      question:
        patient.pathology === "Dyslexie"
          ? "Quel mot est correctement écrit ?"
          : "Répète cette suite : Chat - Soleil - Maison",

      choices:
        patient.pathology === "Dyslexie"
          ? ["Aureau", "Oiseau", "Oiso", "Oisseau"]
          : [],

      type:
        patient.pathology === "Dyslexie"
          ? "dys"
          : "memory",
    },

    {
      question:
        patient.age > 65
          ? "Quel jour sommes-nous ?"
          : "Combien font 8 + 5 ?",

      type:
        patient.age > 65
          ? "orientation"
          : "logic",
    },

    {
      question:
        patient.learningStyle === "Visuel"
          ? "Que vois-tu sur cette image ?"
          : "Complète : Le chat boit du ____",

      type: "reading",
    },
  ];

  const currentQuestion = questions[questionIndex];

  const nextQuestion = () => {
    const updatedResults = { ...results };

}
