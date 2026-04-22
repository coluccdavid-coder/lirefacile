"use client";

import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const simplifyText = () => {
    setText(text.toLowerCase());
  };

  const speakText = () => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "fr-FR";
    window.speechSynthesis.speak(speech);
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: darkMode ? "#111" : "#f5f5f5",
        color: darkMode ? "#fff" : "#000",
        padding: "40px",
        fontFamily: "Arial",
      }}
    >
      <h1 style={{ fontSize: "48px" }}>LireFacile</h1>

      <p>Outil pour simplifier et lire un texte à voix haute.</p>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Colle ton texte ici..."
        style={{
          width: "100%",
          height: "200px",
          padding: "15px",
          fontSize: "18px",
          marginTop: "20px",
          borderRadius: "10px",
        }}
      />

      <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
        <button onClick={simplifyText}>Simplifier</button>
        <button onClick={speakText}>Lire à voix haute</button>
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "Mode Clair" : "Mode Sombre"}
        </button>
      </div>
    </main>
  );
}
