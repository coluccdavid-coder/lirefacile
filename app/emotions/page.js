"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function EmotionsPage() {
  const [mood, setMood] = useState("");
  const [energy, setEnergy] = useState(5);
  const [notes, setNotes] = useState("");
  const [history, setHistory] = useState([]);

useEffect(() => {
    const stored = JSON.parse(
      localStorage.getItem("emotionHistory")
    ) || [];

setHistory(stored);
  }, []);

const saveEmotion = () => {
    const newEntry = {
      date: new Date().toLocaleDateString(),
      mood,
      energy,
      notes,
    };

const updatedHistory = [...history, newEntry];

setHistory(updatedHistory);

localStorage.setItem(
      "emotionHistory",
      JSON.stringify(updatedHistory)
    );

setMood("");
    setNotes("");
    setEnergy(5);
  };

return (
    <div className="page-container">
      <div className="main-card fade-in">
        <h1 className="main-title">
          Humeur Cognitive
        </h1>

<div className="assistant-box">
          <div className="assistant-avatar">💙</div>

<div className="assistant-message">
            L’IA prend aussi soin de votre état émotionnel.
          </div>
        </div>

<div className="exercise-card">
          <div className="exercise-title">
            Comment vous sentez-vous aujourd’hui ?
          </div>

<div className="button-row">
            {[
              "😊 Bien",
              "😐 Moyen",
              "😞 Fatigué",
              "😣 Frustré",
              "😴 Épuisé",
            ].map((item) => (
              <button
                key={item}
                className={`primary-button ${
                  mood === item ? "success-button" : ""
                }`}
                onClick={() => setMood(item)}
              >
                {item}
              </button>
            ))}
          </div>

<div style={{ marginTop: "30px" }}>
            <div className="exercise-title">
              Niveau d’énergie
            </div>

<input
              type="range"
              min="1"
              max="10"
              value={energy}
              onChange={(e) =>
                setEnergy(Number(e.target.value))
              }
              style={{ width: "100%" }}
            />
          </div>

<div style={{ marginTop: "30px" }}>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Comment vous sentez-vous ?"
              className="exercise-input"
              style={{ minHeight: "120px" }}
            />
          </div>

<div style={{ marginTop: "25px" }}>
            <button
              className="primary-button success-button"
              onClick={saveEmotion}
            >
              Sauvegarder
            </button>
          </div>
        </div>

<div className="analysis-box">
          <div className="analysis-title">
            Historique émotionnel
          </div>

{history.length === 0 ? (
            <p>Aucune donnée enregistrée.</p>
          ) : (
            history
              .slice()
              .reverse()
              .slice(0, 5)
              .map((item, index) => (
                <div
                  key={index}
                  className="analysis-card"
                  style={{ marginBottom: "15px" }}
                >
                  <div className="analysis-label">
                    {item.date}
                  </div>

<div className="analysis-value">
                    {item.mood}
                  </div>

<div style={{ marginTop: "10px" }}>
                    Énergie : {item.energy}/10
                  </div>
                </div>
              ))
          )}
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
