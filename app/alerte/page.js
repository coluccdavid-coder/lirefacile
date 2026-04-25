"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AlertePage() {
  const [history, setHistory] = useState([]);
  const [alertLevel, setAlertLevel] = useState("Stable");
  const [alertMessage, setAlertMessage] = useState("");
  const [trend, setTrend] = useState(0);

useEffect(() => {
    const sessions = JSON.parse(
      localStorage.getItem("sessionHistory")
    ) || [];

setHistory(sessions);

if (sessions.length < 3) {
      setAlertMessage(
        "Pas assez de données pour analyser une évolution cognitive."
      );
      return;
    }

const recent = sessions.slice(-3);

const scores = recent.map((s) => s.score);

const trendValue =
      scores[scores.length - 1] - scores[0];

setTrend(trendValue);

if (trendValue <= -20) {
      setAlertLevel("Alerte Forte");

setAlertMessage(
        "L’IA détecte une baisse importante des performances cognitives."
      );
    } else if (trendValue <= -10) {
      setAlertLevel("Surveillance");

setAlertMessage(
        "Une légère baisse est observée. Réduire la charge cognitive peut aider."
      );
    } else {
      setAlertLevel("Stable");

setAlertMessage(
        "La progression semble stable. Continuez les exercices."
      );
    }
  }, []);

return (
    <div className="page-container">
      <div className="main-card fade-in">
        <h1 className="main-title">
          Alerte Cognitive IA
        </h1>

<div className="assistant-box">
          <div className="assistant-avatar">⚠️</div>

<div className="assistant-message">
            L’IA surveille votre stabilité cognitive.
          </div>
        </div>

<div className="analysis-box">
          <div className="analysis-grid">

<div className="analysis-card">
              <div className="analysis-label">
                Niveau
              </div>

<div className="analysis-value">
                {alertLevel}
              </div>
            </div>

<div className="analysis-card">
              <div className="analysis-label">
                Tendance
              </div>

<div className="analysis-value">
                {trend >= 0 ? "+" : ""}
                {trend}%
              </div>
            </div>

<div className="analysis-card">
              <div className="analysis-label">
                Séances
              </div>

<div className="analysis-value">
                {history.length}
              </div>
            </div>

</div>
        </div>

<div className="analysis-box">
          <div className="analysis-title">
            Diagnostic IA
          </div>

<p
            style={{
              fontSize: "22px",
              lineHeight: "1.8",
              textAlign: "center",
            }}
          >
            {alertMessage}
          </p>
        </div>

<div className="analysis-box">
          <div className="analysis-title">
            Recommandation
          </div>

<ul
            style={{
              fontSize: "20px",
              lineHeight: "2.2",
            }}
          >
            <li>Faire plus de pauses</li>
            <li>Réduire la difficulté</li>
            <li>Hydratation</li>
            <li>Éviter surcharge mentale</li>
            <li>Observer fatigue</li>
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
