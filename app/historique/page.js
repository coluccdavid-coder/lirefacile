"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
export default function HistoriquePage() {
  const [history, setHistory] = useState([]);
  const [averageScore, setAverageScore] = useState(0);
  const [progression, setProgression] = useState(0);
useEffect(() => {
    const stored = JSON.parse(
      localStorage.getItem("sessionHistory")
    );
if (!stored || stored.length === 0) {
      return;
    }
setHistory(stored);
const total = stored.reduce(
      (sum, item) => sum + item.score,
      0
    );
const average = Math.round(total / stored.length);
setAverageScore(average);
if (stored.length >= 2) {
      const first = stored[0].score;
      const last = stored[stored.length - 1].score;
const evolution = last - first;
setProgression(evolution);
    }
  }, []);
return (
    <div className="page-container">
      <div className="main-card fade-in">
        <h1 className="main-title">
          Historique Patient
        </h1>
<div className="assistant-box">
          <div className="assistant-avatar">🧠</div>
<div className="assistant-message">
            L’IA suit votre progression cognitive.
          </div>
        </div>

<div className="analysis-box">
          <div className="analysis-grid">
<div className="analysis-card">
              <div className="analysis-label">
                Score Moyen
              </div>

<div className="analysis-value">
                {averageScore}%
              </div>
            </div>

<div className="analysis-card">
              <div className="analysis-label">
                Progression
              </div>

<div className="analysis-value">
                {progression >= 0 ? "+" : ""}
                {progression}%
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
<div className="exercise-card">
          <div className="exercise-title">
            Historique des séances
          </div>
{history.length === 0 ? (
            <p>Aucune séance enregistrée.</p>
          ) : (
            history.map((session, index) => (
              <div
                key={index}
                className="analysis-card"
                style={{ marginBottom: "15px" }}
              >
                <div className="analysis-label">
                  {session.date}
                </div>
<div className="analysis-value">
                  Score : {session.score}%
                </div>
<div style={{ marginTop: "10px" }}>
                  Fatigue : {session.fatigue}
                </div>
              </div>
            ))
          )}
        </div>
<div className="button-row">
          <Link href="/profil">
            <button className="primary-button success-button">
              Retour Profil
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
