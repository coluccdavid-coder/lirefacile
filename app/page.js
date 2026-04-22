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
        background: darkMode
          ? "linear-gradient(to bottom, #111, #222)"
          : "linear-gradient(to bottom, #f5f7fa, #e4e8f0)",
        color: darkMode ? "white" : "#111",
        padding: "50px",
        fontFamily: "Arial",
        transition: "0.3s",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "auto",
          background: darkMode ? "#1e1e1e" : "white",
          borderRadius: "20px",
          padding: "40px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        }}
      >
        <h1
          style={{
            fontSize: "48px",
            marginBottom: "10px",
          }}
        >
          LireFacile
        </h1>

        <p style={{ marginBottom: "30px", opacity: 0.8 }}>
          Simplifie un texte et écoute-le facilement.
        </p>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Colle ton texte ici..."
          style={{
            width: "100%",
            height: "220px",
            padding: "20px",
            borderRadius: "15px",
            border: "none",
            fontSize: "18px",
            resize: "none",
            outline: "none",
            background: darkMode ? "#2c2c2c" : "#f3f4f6",
            color: darkMode ? "white" : "black",
          }}
        />

        <p style={{ marginTop: "10px", opacity: 0.7 }}>
          Nombre de caractères : {text.length}
        </p>

        <div
          style={{
            display: "flex",
            gap: "15px",
            marginTop: "25px",
};
