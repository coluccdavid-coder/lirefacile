"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function TimelinePage() {
  const [events, setEvents] = useState([]);

useEffect(() => {
    const sessions = JSON.parse(
      localStorage.getItem("sessionHistory")
    ) || [];

const emotions = JSON.parse(
      localStorage.getItem("emotionHistory")
    ) || [];

const merged = [];

sessions.forEach((session) => {
      merged.push({
        type: "Séance",
        date: session.date,
        description: `Score ${session.score}%`,
      });
    });

emotions.forEach((emotion) => {
      merged.push({
        type: "Émotion",
        date: emotion.date,
        description: `${emotion.mood} — énergie ${emotion.energy}/10`,
      });
    });

merged.sort((a, b) =>
      new Date(a.date) - new Date(b.date)
    );

setEvents(merged.reverse());
  }, []);

const getIcon = (type) => {
    if (type === "Séance") return "🧠";
    if (type === "Émotion") return "💙";
    return "📍";
  };

return (
    <div className="page-container">
      <div className="main-card fade-in">
        <h1 className="main-title">
          Timeline Patient
        </h1>

<div className="assistant-box">
          <div className="assistant-avatar">📅</div>

<div className="assistant-message">
            Visualisez toute l’évolution du patient.
          </div>
        </div>

<div className="analysis-box">
          <div className="analysis-title">
            Chronologie Thérapeutique
          </div>

{events.length === 0 ? (
            <p>Aucune donnée disponible.</p>
          ) : (
            events.map((event, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  gap: "20px",
                  marginBottom: "25px",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    fontSize: "30px",
                    minWidth: "50px",
                  }}
                >
                  {getIcon(event.type)}
                </div>

<div className="analysis-card" style={{ flex: 1 }}>
                  <div className="analysis-label">
                    {event.date}
                  </div>

<div className="analysis-value">
                    {event.type}
                  </div>

<div style={{ marginTop: "10px" }}>
                    {event.description}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

<div className="analysis-box">
          <div className="analysis-title">
            Lecture Clinique
          </div>

<ul
            style={{
              fontSize: "20px",
              lineHeight: "2.1",
            }}
          >
            <li>Progression visible</li>
            <li>Historique émotionnel</li>
            <li>Chronologie thérapeutique</li>
            <li>Détection rechutes</li>
            <li>Suivi longitudinal</li>
          </ul>
        </div>

<div
          className="button-row"
          style={{ justifyContent: "center" }}
        >
          <Link href="/carte">
            <button className="primary-button success-button">
              Carte Cognitive
            </button>
          </Link>

<Link href="/statistiques">
            <button className="primary-button warning-button">
              Statistiques
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
