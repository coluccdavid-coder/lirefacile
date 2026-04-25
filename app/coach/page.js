"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CoachPage() {
  const [history, setHistory] = useState([]);
  const [fatigueLevel, setFatigueLevel] = useState("Faible");
  const [coachMessage, setCoachMessage] = useState("");
  const [riskLevel, setRiskLevel] = useState("Faible");

useEffect(() => {
    const sessions = JSON.parse(
      localStorage.getItem("sessionHistory")
    ) || [];

setHistory(sessions);

if (sessions.length === 0) {
      setCoachMessage(
        "Commencez quelques exercices pour générer un suivi IA."
      );
      return;
    }

const lastSessions = sessions.slice(-5);

const averageScore = Math.round(
      lastSessions.reduce(
        (sum, item) => sum + item.score,
        0
      ) / lastSessions.length
    );

const fatigueCount = lastSessions.filter(
      (item) => item.fatigue === "Élevée"
    ).length;

if (fatigueCount >= 3) {
      setFatigueLevel("Élevée");
      setRiskLevel("Surcharge cognitive");

setCoachMessage(
        "L’IA détecte une fatigue importante. Réduisez les exercices aujourd’hui."
      );
    } else if (averageScore < 45) {
      setFatigueLevel("Modérée");
      setRiskLevel("Fragilité cognitive");

setCoachMessage(
        "Le niveau cognitif semble fragile. Priorité à des exercices simples."
      );
    } else {
      setFatigueLevel("Faible");
      setRiskLevel("Stable");

setCoachMessage(
        "Bonne progression. Vous pouvez continuer progressivement."
      );
    }
  }, []);

return (
    <div className="page-container">
      <div className="main-card fade-in">
        <h1 className="main-title">
          Coach IA Cognitif
        </h1>

<div className="assistant-box">
          <div className="assistant-avatar">🧠</div>

<div className="assistant-message">
            Votre assistant IA analyse votre fatigue.
          </div>
        </div>

<div className="analysis-box">
          <div className="analysis-grid">

<div className="analysis-card">
              <div className="analysis-label">
                Fatigue
              </div>

<div className="analysis-value">
                {fatigueLevel}
              </div>
            </div>

<div className="analysis-card">
              <div className="analysis-label">
                Risque
              </div>

<div className="analysis-value">
                {riskLevel}
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
            Conseils IA
          </div>

<p
            style={{
              fontSize: "22px",
              lineHeight: "1.8",
              textAlign: "center",
            }}
          >
            {coachMessage}
          </p>
        </div>

<div className="analysis-box">
          <div className="analysis-title">
            Recommandation du Jour
          </div>

<ul
            style={{
              fontSize: "20px",
              lineHeight: "2.2",
            }}
          >
            <li>Hydratation</li>
            <li>Pause cognitive</li>
            <li>Exercices doux</li>
            <li>Lecture lente</li>
            <li>Repos si fatigue</li>
          </ul>
        </div>

<div
          className="button-row"
          style={{ justifyContent: "center" }}
        >
          <Link href="/dashboard">
            <button className="primary-button success-button">
              Tableau Cognitif
            </button>
          </Link>

<Link href="/exercices">
            <button className="primary-button warning-button">
              Continuer
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
