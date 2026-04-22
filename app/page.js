"use client";

import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [correctedText, setCorrectedText] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const speakText = () => {
    const speech = new SpeechSynthesisUtterance(correctedText || text);
    speech.lang = "fr-FR";
    window.speechSynthesis.speak(speech);
  };

  const correctText = () => {
    if (!text.trim()) {
      alert("Entre un texte d'abord");
      return;
    }

    let corrected = text;

    corrected = corrected.replace(/\bsa\b/gi, "ça");
    corrected = corrected.replace(/\bcava\b/gi, "ça va");
    corrected = corrected.replace(/\bbonjor\b/gi, "bonjour");
    corrected = corrected.replace(/\bmappel\b/gi, "m'appelle");
    corrected = corrected.replace(/\bje sui\b/gi, "je suis");
    corrected = corrected.replace(/\bjai\b/gi, "j'ai");
    corrected = corrected.replace(/\btes\b/gi, "t'es");
    corrected = corrected.replace(/\bappel\b/gi, "appelle");

    setCorrectedText(corrected);
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: darkMode ? "#111827" : "#e5e7eb",
        padding: "40px",
        transition: "0.3s",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1100px",
          backgroundColor: darkMode ? "#1f2937" : "#f8fafc",
          borderRadius: "30px",
          padding: "50px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          color: darkMode ? "white" : "black",
        }}
      >
        <h1
          style={{
            fontSize: "72px",
            fontWeight: "bold",
            marginBottom: "10px",
          }}
        >
          LireFacile
        </h1>

        <p
          style={{
            fontSize: "28px",
            marginBottom: "30px",
            opacity: 0.8,
          }}
        >
          Simplifie un texte et écoute-le facilement.
        </p>
}
