"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AssistantPage() {
  const [text, setText] = useState(
    "Bonjour. Je suis votre assistant vocal cognitif."
  );

const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [speed, setSpeed] = useState(1);

const speak = () => {
    if (typeof window === "undefined") return;

const speech = new SpeechSynthesisUtterance(text);

speech.lang = "fr-FR";
    speech.rate = speed;
    speech.pitch = 1;

window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
  };

useEffect(() => {
    const profile = JSON.parse(
      localStorage.getItem("patientProfile")
    );

if (!profile) return;

if (
      profile.pathology === "Dyslexie" ||
      profile.pathology === "AVC"
    ) {
      setVoiceEnabled(true);

setText(
        "Je vais vous lire les consignes lentement pour vous aider."
      );
    }
  }, []);

return (
    <div className="page-container">
      <div className="main-card fade-in">
        <h1 className="main-title">
          Assistant Vocal IA
        </h1>

<div className="assistant-box">
          <div className="assistant-avatar">🎤</div>

<div className="assistant-message">
            L’IA peut lire les consignes à voix haute.
          </div>
        </div>

<div className="analysis-box">
          <div className="analysis-title">
            Texte Vocalisé
          </div>

<textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="exercise-input"
            style={{ minHeight: "140px" }}
          />
        </div>

<div className="analysis-box">
          <div className="analysis-title">
            Paramètres Vocaux
          </div>

<div className="analysis-grid">
            <div className="analysis-card">
              <div className="analysis-label">
                Assistance
              </div>

<div className="analysis-value">
                {voiceEnabled ? "Active" : "Inactive"}
              </div>
            </div>

<div className="analysis-card">
              <div className="analysis-label">
                Vitesse
              </div>

<div className="analysis-value">
                {speed}x
              </div>
            </div>
          </div>

<div style={{ marginTop: "20px" }}>
            <input
              type="range"
              min="0.6"
              max="1.5"
              step="0.1"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              style={{ width: "100%" }}
            />
          </div>
        </div>

<div className="button-row">
          <button
            className="primary-button success-button"
            onClick={speak}
          >
            Lire à voix haute
          </button>
        </div>

<div className="analysis-box">
          <div className="analysis-title">
            Pourquoi c’est utile
          </div>

<ul
            style={{
              fontSize: "20px",
              lineHeight: "2.1",
            }}
          >
            <li>Réduit la fatigue cognitive</li>
            <li>Aide la dyslexie</li>
            <li>Aide AVC et aphasie</li>
            <li>Favorise la compréhension</li>
            <li>Améliore l’autonomie</li>
          </ul>
        </div>

<div
          className="button-row"
          style={{ justifyContent: "center" }}
        >
          <Link href="/coach">
            <button className="primary-button success-button">
              Coach IA
            </button>
          </Link>

<Link href="/dashboard">
            <button className="primary-button warning-button">
              Dashboard
            </button>
          </Link>

<Link href="/">
            <button className="primary-button">
              Accueil
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
