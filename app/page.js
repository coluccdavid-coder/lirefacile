Voici les **2 scripts complets** :

### 1. Installer le dictionnaire français

Dans le terminal (Codespaces ou PC) :

```bash
npm install nspell dictionary-fr
```

---

### 2. Script complet `app/page.js`

Remplace entièrement ton fichier `app/page.js` par ceci :

```jsx
"use client";

import { useState, useEffect } from "react";
import nspell from "nspell";
import dictionary from "dictionary-fr";

export default function Home() {
  const [text, setText] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [dyslexicMode, setDyslexicMode] = useState(false);
  const [spell, setSpell] = useState(null);

  useEffect(() => {
    dictionary((err, dict) => {
      if (!err) {
        setSpell(nspell(dict));
      }
    });
  }, []);

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
    alert("Texte copié");
  };

  const aiCorrection = () => {
    if (!spell || !text.trim()) return;

    const words = text.split(" ");

    const corrected = words.map((word) => {
      const cleanWord = word.replace(/[.,!?]/g, "");

      if (spell.correct(cleanWord)) {
        return word;
      }

      const suggestions = spell.suggest(cleanWord);

      if (suggestions.length > 0) {
        return suggestions[0];
      }

      return word;
    });

    setText(corrected.join(" "));
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
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
        }}
      >
        <h1
          style={{
            fontSize: "64px",
            marginBottom: "10px",
            color: darkMode ? "white" : "black",
          }}
        >
          LireFacile
        </h1>

        <p
          style={{
            fontSize: "24px",
            marginBottom: "25px",
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
            fontFamily: dyslexicMode ? "OpenDyslexic, Arial" : "Arial",
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
          <button onClick={aiCorrection}>IA Correction</button>

          <button onClick={speakText}>Lire</button>

          <button onClick={stopSpeech}>Stop</button>

          <button onClick={copyText}>Copier</button>

          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "Mode Clair" : "Mode Sombre"}
          </button>

          <button onClick={() => setDyslexicMode(!dyslexicMode)}>
            Dyslexie
          </button>
        </div>
      </div>
    </main>
  );
}
```
