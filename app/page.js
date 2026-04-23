"use client";

import { useState, useRef } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [correctedText, setCorrectedText] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [dyslexiaFont, setDyslexiaFont] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechRate, setSpeechRate] = useState(1);

  const utteranceRef = useRef(null);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleDyslexiaFont = () => {
    setDyslexiaFont(!dyslexiaFont);
  };

  const correctTextAI = async () => {
    try {
      const res = await fetch("/api/spell", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
        }),
      });

      const data = await res.json();

      if (data.correctedText) {
        setCorrectedText(data.correctedText);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const speakText = () => {
    if (!text) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "fr-FR";
    utterance.rate = speechRate;

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const pauseSpeech = () => {
    window.speechSynthesis.pause();
  };

  const resumeSpeech = () => {
    window.speechSynthesis.resume();
  };

  const stopSpeech = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const containerStyle = {
    minHeight: "100vh",
    backgroundColor: darkMode ? "#111" : "#e5e5e5",
    color: darkMode ? "white" : "black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px",
  };

  const cardStyle = {
    width: "100%",
    maxWidth: "1200px",
    backgroundColor: darkMode ? "#1e1e1e" : "#f0f0f0",
    borderRadius: "30px",
    padding: "40px",
  };

  const buttonStyle = {
    backgroundColor: "#3b82f6",
    border: "none",
    color: "white",
    padding: "12px 20px",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
  };

  const textAreaStyle = {
    width: "100%",
    minHeight: "220px",
    borderRadius: "20px",
    border: "none",
    padding: "25px",
    fontSize: "36px",
    backgroundColor: darkMode ? "#2a2a2a" : "#d1d5db",
    color: darkMode ? "white" : "black",
    resize: "none",
    outline: "none",
    fontFamily: dyslexiaFont ? "OpenDyslexic, Arial" : "Arial",
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1
          style={{
            textAlign: "center",
            fontSize: "64px",
            marginBottom: "40px",
          }}
        >
          LireFacile
        </h1>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            marginBottom: "25px",
          }}
        >
          <button style={buttonStyle} onClick={toggleDarkMode}>
            Mode Sombre
          </button>

          <button style={buttonStyle} onClick={toggleDyslexiaFont}>
            Police Dyslexie
          </button>

          <button style={buttonStyle} onClick={correctTextAI}>
            Correction IA
          </button>

          <button style={buttonStyle} onClick={speakText}>
            Lecture
          </button>

          <button style={buttonStyle} onClick={pauseSpeech}>
            Pause
          </button>

          <button style={buttonStyle} onClick={resumeSpeech}>
            Reprendre
          </button>

          <button style={buttonStyle} onClick={stopSpeech}>
            Stop
          </button>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Écris ton texte ici"
          style={textAreaStyle}
        />

        <div
          style={{
            marginTop: "20px",
            marginBottom: "40px",
          }}
        >
          <label
            style={{
              fontSize: "22px",
              fontWeight: "bold",
            }}
          >
            Vitesse lecture : {speechRate.toFixed(1)}x
          </label>

          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={speechRate}
            onChange={(e) => setSpeechRate(Number(e.target.value))}
            style={{
              width: "220px",
              marginLeft: "20px",
            }}
          />
        </div>

        {correctedText && (
          <div
            style={{
              marginTop: "30px",
              backgroundColor: darkMode ? "#2a2a2a" : "#d1d5db",
              padding: "30px",
              borderRadius: "20px",
            }}
          >
            <h2 style={{ marginBottom: "20px" }}>Texte corrigé</h2>

            <p
              style={{
                fontSize: "28px",
                lineHeight: "1.8",
                fontFamily: dyslexiaFont ? "OpenDyslexic, Arial" : "Arial",
              }}
            >
              {correctedText}
            </p>
          </div>
    )}
      </div>
    </div>
  );
}

