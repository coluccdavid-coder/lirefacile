"use client";
            backgroundColor: darkMode ? "#374151" : "#e5e7eb",
            color: darkMode ? "white" : "black",
            fontFamily: dyslexicMode
              ? "OpenDyslexic, Arial, sans-serif"
              : "Arial, sans-serif",
          }}
        />

        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            marginTop: "20px",
          }}
        >
          <button onClick={dictionaryCorrection} style={buttonStyle}>
            Dictionnaire FR
          </button>

          <button onClick={simplifyText} style={buttonStyle}>
            Simplifier
          </button>

          <button onClick={speakText} style={buttonStyle}>
            Lire
          </button>

          <button onClick={stopSpeech} style={buttonStyle}>
            Stop
          </button>

          <button onClick={copyText} style={buttonStyle}>
            Copier
          </button>

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
            Dyslexie
          </button>
        </div>

        {suggestions.length > 0 && (
          <div style={{ marginTop: "25px" }}>
            <h3 style={{ color: darkMode ? "white" : "black" }}>
              Suggestions
            </h3>

            {suggestions.map((item, index) => (
              <p
                key={index}
                style={{ color: darkMode ? "#ddd" : "#333" }}
              >
                {item.original} → {item.suggestion}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}"use client";
import { useState } from "react";
export default function Home() {
  const [text, setText] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [dyslexicMode, setDyslexicMode] = useState(false);
const simplifyText = () => {
    if (!text.trim()) return;
let simplified = text
      .replace(/bonjours/gi, "bonjour")
      .replace(/pou/gi, "pour")
      .replace(/mieu/gi, "mieux")
      .replace(/sa va/gi, "ça va")
      .replace(/j espere/gi, "j’espère")
      .replace(/tt/gi, "tout")
      .replace(/svp/gi, "s’il vous plaît");

setText(simplified);
  };
const speakText = () => {
    if (!text.trim()) return;
const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "fr-FR";
    speech.rate = 0.9;
    speech.pitch = 1;
window.speechSynthesis.speak(speech);
  };
const stopSpeech = () => {
    window.speechSynthesis.cancel();
  };
const copyText = async () => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Texte copié ✅");
    } catch {
      alert("Impossible de copier");
    }
  };
const aiCorrection = () => {
    if (!text.trim()) return;
let corrected = text;
const corrections = {
      bonjours: "bonjour",
      pou: "pour",
      mieu: "mieux",
      sa: "ça",
      jsuis: "je suis",
      c: "c’est",
      jespere: "j’espère",
      tt: "tout",
      bokou: "beaucoup",
      tro: "trop",
      stp: "s’il te plaît",
      svp: "s’il vous plaît",
      pk: "pourquoi",
      koi: "quoi",
      koman: "comment",
      bjr: "bonjour",
    };

Object.keys(corrections).forEach((word) => {
      const regex = new RegExp(`\\b${word}\\b`, "gi");
      corrected = corrected.replace(regex, corrections[word]);
    });
setText(corrected);
  };
const containerStyle = {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: darkMode ? "#111827" : "#e5e7eb",
    padding: "30px",
  };
const cardStyle = {
    width: "100%",
    maxWidth: "1000px",
    backgroundColor: darkMode ? "#1f2937" : "white",
    borderRadius: "25px",
    padding: "40px",
    boxShadow: "0 0 20px rgba(0,0,0,0.1)",
  };
const textareaStyle = {
    width: "100%",
    height: "260px",
    padding: "20px",
    borderRadius: "20px",
    border: "none",
    resize: "none",
    outline: "none",
    fontSize: "22px",
    backgroundColor: darkMode ? "#374151" : "#e5e7eb",
    color: darkMode ? "white" : "black",
    marginTop: "20px",
    fontFamily: dyslexicMode
      ? "OpenDyslexic, Arial, sans-serif"
      : "Arial, sans-serif",
  };
const buttonStyle = {
    padding: "14px 20px",
    borderRadius: "12px",
    border: "none",
    backgroundColor: "#2563eb",
    color: "white",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
  };

return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1
          style={{
            fontSize: "60px",
            marginBottom: "10px",
            color: darkMode ? "white" : "black",
          }}
        >
          LireFacile
        </h1>
<p
          style={{
            color: darkMode ? "#d1d5db" : "#4b5563",
            marginBottom: "20px",
            fontSize: "22px",
          }}
        >
          Simplifie un texte et écoute-le facilement.
        </p>
<textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Colle ton texte ici..."
          style={textareaStyle}
        />
<div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            marginTop: "20px",
          }}
        >
          <button onClick={simplifyText} style={buttonStyle}>
            Simplifier
          </button>
<button onClick={aiCorrection} style={buttonStyle}>
            IA Correction
          </button>
<button onClick={speakText} style={buttonStyle}>
            Lire
          </button>
<button onClick={stopSpeech} style={buttonStyle}>
            Stop
          </button>
<button onClick={copyText} style={buttonStyle}>
            Copier
          </button>
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
            Dyslexie
          </button>
        </div>
      </div>
    </div>
  );
}

