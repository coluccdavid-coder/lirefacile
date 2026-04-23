"use client";

import { useState, useEffect } from "react";
import jsPDF from "jspdf";

export default function Home() {
  const [text, setText] = useState("");
  const [originalText, setOriginalText] = useState("");
  const [correctedText, setCorrectedText] = useState("");
  const [explanations, setExplanations] = useState([]);
  const [teacherAdvice, setTeacherAdvice] = useState("");
  const [simplifiedText, setSimplifiedText] = useState("");
  const [profMode, setProfMode] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [dyslexicMode, setDyslexicMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [speechRate, setSpeechRate] = useState(1);
  const [readability, setReadability] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("lirefacile_text");
    if (saved) setText(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("lirefacile_text", text);
  }, [text]);

  const calculateReadability = (content) => {
    const words = content.split(" ").filter(Boolean);
    const sentences = content.split(/[.!?]/).filter(Boolean);
    const avg = sentences.length ? words.length / sentences.length : 0;

    if (avg < 10) return "Très facile";
    if (avg < 15) return "Facile";
    if (avg < 20) return "Moyen";
    return "Difficile";
  };

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

      setOriginalText(text);
      setCorrectedText(data.correctedText || "");
      setText(data.correctedText || text);
      setExplanations(data.explanations || []);
      setTeacherAdvice(data.teacherAdvice || "");
      setSimplifiedText(data.simplifiedText || "");
      setReadability(calculateReadability(data.correctedText || text));
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  const speakText = () => {
    const speech = new SpeechSynthesisUtterance(correctedText || text);
    speech.lang = "fr-FR";
    speech.rate = speechRate;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("LireFacile", 10, 10);
    doc.text(correctedText || text, 10, 30);
    doc.save("LireFacile.pdf");
  };

  const commonTextStyle = {
    fontFamily: dyslexicMode
      ? "OpenDyslexic, Arial, sans-serif"
      : "Arial, sans-serif",
    lineHeight: dyslexicMode ? "2" : "1.6",
    letterSpacing: dyslexicMode ? "1px" : "normal",
    color: darkMode ? "white" : "black",
  };

  const buttonStyle = {
    border: "none",
    borderRadius: "12px",
    padding: "12px 18px",
    cursor: "pointer",
    backgroundColor: darkMode ? "#2563eb" : "#3b82f6",
    color: "white",
    fontWeight: "bold",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: darkMode ? "#111827" : "#f3f4f6",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1100px",
          padding: "40px",
          borderRadius: "24px",
          backgroundColor: darkMode ? "#1f2937" : "white",
          boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
        }}
      >
        <h1
          style={{
            ...commonTextStyle,
            textAlign: "center",
            fontSize: "52px",
            marginBottom: "25px",
          }}
        >
          LireFacile
        </h1>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            marginBottom: "20px",
          }}
        >
          <button style={buttonStyle} onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "Mode Clair" : "Mode Sombre"}
          </button>

          <button style={buttonStyle} onClick={() => setDyslexicMode(!dyslexicMode)}>
            Police Dyslexie
          </button>

          <button style={buttonStyle} onClick={() => setProfMode(!profMode)}>
            {profMode ? "Mode Normal" : "Prof de Français"}
          </button>

          <button style={buttonStyle} onClick={dictionaryCorrection}>
            {loading ? "Correction..." : "Corriger"}
          </button>

          <button style={buttonStyle} onClick={speakText}>
            Lecture
          </button>

          <button style={buttonStyle} onClick={exportPDF}>
            PDF
          </button>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Colle ton texte ici..."
          style={{
            width: "100%",
            height: "240px",
            borderRadius: "18px",
            padding: "20px",
            border: "none",
            resize: "none",
            outline: "none",
            fontSize: "22px",
            backgroundColor: darkMode ? "#374151" : "#e5e7eb",
            ...commonTextStyle,
          }}
        />

        <div style={{ marginTop: "20px" }}>
          <label style={commonTextStyle}>
            Vitesse lecture : {speechRate}x
          </label>

          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={speechRate}
            onChange={(e) => setSpeechRate(Number(e.target.value))}
          />
        </div>

        {correctedText && (
          <div
            style={{
              marginTop: "30px",
              padding: "25px",
              borderRadius: "20px",
              backgroundColor: darkMode ? "#374151" : "#e5e7eb",
              ...commonTextStyle,
            }}
          >
            <h2>Avant correction</h2>
            <p>{originalText}</p>

            <h2>Après correction</h2>
            <p>{correctedText}</p>

            <h2>Lisibilité</h2>
            <p>{readability}</p>

            {explanations.length > 0 && (
              <>
                <h2>Explications</h2>
                <ul>
                  {explanations.map((item, index) => (
                    <li key={index}>
                      <strong>{item.original}</strong> → {item.corrected}
                      <br />
                      {item.explanation || item.reason}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}

        {profMode && correctedText && (
          <div
            style={{
              marginTop: "30px",
              padding: "25px",
              borderRadius: "20px",
              backgroundColor: darkMode ? "#1e3a8a" : "#dbeafe",
              ...commonTextStyle,
            }}
          >
            <h2>Prof de Français</h2>
            <h3>Conseil pédagogique</h3>
            <p>{teacherAdvice}</p>
            <h3>Version simplifiée</h3>
            <p>{simplifiedText}</p>
          </div>
        )}
      </div>
    </div>
  );
}

