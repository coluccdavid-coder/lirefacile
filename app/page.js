"use client";

import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [dyslexicMode, setDyslexicMode] = useState(false);
  const [fontSize, setFontSize] = useState(22);

  const simplifyText = () => {
    if (!text.trim()) return;

    let simplified = text
      .replace(/bonjours/gi, "bonjour")
      .replace(/pou/gi, "pour")
      .replace(/mieu/gi, "mieux")
      .replace(/sa/gi, "ça")
      .replace(/jespere/gi, "j'espère")
      .replace(/ke/gi, "que")
      .replace(/tt/gi, "tout")
      .replace(/bcp/gi, "beaucoup");

    setText(simplified);
  };

  const aiCorrection = () => {
    if (!text.trim()) return;

    let corrected = text;

    const corrections = {
      bonjours: "bonjour",
      mieu: "mieux",
      pou: "pour",
      sa: "ça",
      espere: "espère",
      apel: "appel",
      tros: "trop",
      dificile: "difficile",
      fassile: "facile"
    };

    Object.keys(corrections).forEach((word) => {
      const regex = new RegExp(`\\b${word}\\b`, "gi");
      corrected = corrected.replace(regex, corrections[word]);
    });

    setText(corrected);
  };

  const speakText = () => {
    if (!text.trim()) return;

    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "fr-FR";
    speech.rate = 0.9;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
  };

  const stopSpeech = () => {
    window.speechSynthesis.cancel();
  };

  const copyText = () => {
    navigator.clipboard.writeText(text);
    alert("Texte copié !");
  };

  const clearText = () => {
    setText("");
  };

  const buttonStyle = {
}
