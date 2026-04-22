"use client";

import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const simplifyText = () => {
    if (!text.trim()) {
      alert("Entre un texte d'abord");
      return;
    }

    const simplified = text
      .replace(/cependant/gi, "mais")
      .replace(/néanmoins/gi, "mais")
      .replace(/par conséquent/gi, "donc")
      .replace(/afin de/gi, "pour")
      .replace(/toutefois/gi, "mais")
      .replace(/ainsi/gi, "donc");

    setText(simplified);
  };

  const speakText = () => {
    if (!text.trim()) return;

    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "fr-FR";
    speech.rate = 0.9;
    window.speechSynthesis.speak(speech);
  };

  const correctText = () => {
    if (!text.trim()) {
      alert("Entre un texte d'abord");
      return;
    }

    let corrected = text;

    corrected = corrected
      .replace(/ sa /gi, " ça ")
      .replace(/ sest /gi, " c'est ")
      .replace(/ j ai /gi, " j'ai ")
      .replace(/ paske/gi, " parce que")
      .replace(/ stp/gi, " s'il te plaît")
      .replace(/ bjr/gi, " bonjour")
      .replace(/ svp/gi, " s'il vous plaît");

    setText(corrected);
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: darkMode
          ? "linear-gradient(to bottom, #111, #222)"
          : "linear-gradient(to bottom, #f1f5f9, #dbe2ea)",
        padding: "40px",
        fontFamily: "Arial, sans-serif",
};
