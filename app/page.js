"use client";
import { useState, useEffect } from "react";
import nspell from "nspell";
import dictionary from "dictionary-fr";
export default function Home() {
  const [text, setText] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [dyslexicMode, setDyslexicMode] = useState(false);
  const [spell, setSpell] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
useEffect(() => {
    dictionary((err, dict) => {
      if (!err) {
        setSpell(nspell(dict));
      }
    });
  }, []);
const dictionaryCorrection = () => {
    if (!spell || !text.trim()) return;
const words = text.split(" ");
    const correctedWords = [];
    const detectedSuggestions = [];
words.forEach((word) => {
      const cleanWord = word
        .toLowerCase()
        .replace(/[^a-zàâçéèêëîïôûùüÿñæœ'-]/gi, "");

if (cleanWord && !spell.correct(cleanWord)) {
        const result = spell.suggest(cleanWord);
if (result.length > 0) {
          correctedWords.push(result[0]);
detectedSuggestions.push({
            original: word,
            suggestion: result[0],
          });
        } else {
          correctedWords.push(word);
        }
      } else {
        correctedWords.push(word);
      }
    });
setText(correctedWords.join(" "));
    setSuggestions(detectedSuggestions);
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

const copyText = async () => {
    await navigator.clipboard.writeText(text);
    alert("Texte copié");
  };

const simplifyText = () => {
    let simplified = text
      .replace(/cependant/gi, "mais")
      .replace(/néanmoins/gi, "mais")
      .replace(/par conséquent/gi, "donc")
      .replace(/toutefois/gi, "mais");
setText(simplified);
  };
const buttonStyle = {
    padding: "12px 18px",
    borderRadius: "12px",
    border: "none",
    backgroundColor: "#2563eb",
    color: "white",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
  };
return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: darkMode ? "#111827" : "#e5e7eb",
        padding: "30px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1000px",
          backgroundColor: darkMode ? "#1f2937" : "white",
          borderRadius: "25px",
          padding: "40px",
          boxShadow: "0 0 20px rgba(0,0,0,0.15)",
        }}
      >
        <h1
          style={{
            fontSize: "54px",
            color: darkMode ? "white" : "black",
          }}
        >
          LireFacile
        </h1>
<textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Colle ton texte ici..."
          style={{
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
}
