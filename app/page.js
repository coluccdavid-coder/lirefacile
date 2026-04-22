"use client";

import { useState } from "react";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [dyslexicMode, setDyslexicMode] = useState(false);
  const [text, setText] = useState("");

  const speakText = () => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "fr-FR";
    window.speechSynthesis.speak(speech);
  };

  const stopSpeech = () => {
    window.speechSynthesis.cancel();
  };

  const copyText = () => {
    navigator.clipboard.writeText(text);
    alert("Texte copié !");
  };

  const aiCorrection = () => {
    let corrected = text
      .replace(/bonjours/gi, "bonjour")
      .replace(/sa va/gi, "ça va")
      .replace(/pou/gi, "pour")
      .replace(/j espere/gi, "j’espère");

    setText(corrected);
  };

  return (
    <main
      style={{
        background: darkMode ? "#111827" : "#e5e7eb",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px",
      }}
    >
      <div
        style={{
          background: darkMode ? "#1f2937" : "#f3f4f6",
          padding: "50px",
          borderRadius: "30px",
          width: "100%",
          maxWidth: "1000px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        }}
      >
        <h1
          style={{
            fontSize: "64px",
            fontWeight: "bold",
            marginBottom: "10px",
            color: darkMode ? "white" : "black",
          }}
        >
          LireFacile
        </h1>

        <p
          style={{
            fontSize: "28px",
            marginBottom: "30px",
            color: darkMode ? "#d1d5db" : "#374151",
          }}
        >
          Simplifie un texte et écoute-le facilement.
        </p>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Colle ton texte ici..."
          spellCheck={true}
          style={{
            width: "100%",
            height: "300px",
            padding: "25px",
            borderRadius: "20px",
            border: "none",
            background: darkMode ? "#374151" : "#e5e7eb",
            fontSize: dyslexicMode ? "28px" : "24px",
            fontFamily: dyslexicMode ? "OpenDyslexic" : "Arial",
            color: darkMode ? "white" : "black",
            resize: "none",
            outline: "none",
          }}
        />

        <div
          style={{
            display: "flex",
            gap: "15px",
            flexWrap: "wrap",
            marginTop: "25px",
          }}
        >
          <button onClick={aiCorrection}>IA</button>
          <button onClick={speakText}>Lire</button>
          <button onClick={stopSpeech}>Stop</button>
          <button onClick={copyText}>Copier</button>

          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "Mode Clair" : "Mode Sombre"}
          </button>

          <button onClick={() => setDyslexicMode(!dyslexicMode)}>
            Mode Dyslexie
          </button>
        </div>
      </div>
    </main>
  );
}
