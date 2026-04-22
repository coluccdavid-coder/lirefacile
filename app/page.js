"use client";

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
}
