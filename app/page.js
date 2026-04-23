"use client";

import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [dyslexicMode, setDyslexicMode] = useState(false);
  const [loading, setLoading] = useState(false);

const dictionaryCorrection = async () => {
    if (!text.trim()) return;

setLoading(true);

try {
      const response = await fetch("/api/spell", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

const data = await response.json();

if (data.correctedText) {
        setText(data.correctedText);
      }
    } catch (error) {
      console.error("Erreur correcteur :", error);
    }

setLoading(false);
  };

const speakText = () => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "fr-FR";
    speech.rate = 0.9;
    window.speechSynthesis.speak(speech);
  };

const containerStyle = {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: darkMode ? "#111827" : "#f3f4f6",
    padding: "30px",
  };

const cardStyle = {
    width: "100%",
    maxWidth: "1000px",
    backgroundColor: darkMode ? "#1f2937" : "white",
    borderRadius: "25px",
    padding: "40px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
  };

const titleStyle = {
    fontSize: "54px",
    color: darkMode ? "white" : "black",
    textAlign: "center",
    marginBottom: "20px",
  };

const textareaStyle = {
    width: "100%",
    height: "250px",
    marginTop: "20px",
    padding: "20px",
    borderRadius: "18px",
    border: "none",
    resize: "none",
    outline: "none",
    fontSize: "22px",
    backgroundColor: darkMode ? "#374151" : "#e5e7eb",
    color: darkMode ? "white" : "black",
    fontFamily: dyslexicMode
      ? "OpenDyslexic, Arial, sans-serif"
      : "Arial, sans-serif",
  };

const buttonStyle = {
    padding: "14px 24px",
    borderRadius: "12px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    backgroundColor: darkMode ? "#2563eb" : "#3b82f6",
    color: "white",
  };

return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>LireFacile</h1>

<div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            marginBottom: "20px",
          }}
        >
          <button
            onClick={() => setDarkMode(!darkMode)}
            style={buttonStyle}
          >
            {darkMode ? "Mode Clair" : "Mode Sombre"}
          </button>

<button
            onClick={() => setDyslexicMode(!dyslexicMode)}
            style={buttonStyle}
          >
            Police Dyslexie
          </button>

<button
            onClick={dictionaryCorrection}
            style={buttonStyle}
          >
            {loading ? "Correction..." : "Correction Orthographique"}
          </button>

<button
            onClick={speakText}
            style={buttonStyle}
          >
            Lecture Audio
          </button>
        </div>

<textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Colle ton texte ici..."
          style={textareaStyle}
        />
      </div>
    </div>
  );
}
