"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function RecompensesPage() {
  const [history, setHistory] = useState([]);
  const [badges, setBadges] = useState([]);
  const [points, setPoints] = useState(0);

useEffect(() => {
    const sessions = JSON.parse(
      localStorage.getItem("sessionHistory")
    ) || [];

setHistory(sessions);

const totalPoints = sessions.reduce(
      (sum, item) => sum + item.score,
      0
    );

setPoints(totalPoints);

const earnedBadges = [];

if (sessions.length >= 1) {
      earnedBadges.push("Premier Pas");
    }
if (sessions.length >= 5) {
      earnedBadges.push("Persévérant");
    }
if (sessions.length >= 10) {
      earnedBadges.push("Champion Cognitif");
    }
if (totalPoints >= 300) {
      earnedBadges.push("Mémoire Active");
    }
if (totalPoints >= 600) {
      earnedBadges.push("Esprit Agile");
    }

setBadges(earnedBadges);
  }, []);

return (
    <div className="page-container">
      <div className="main-card fade-in">
        <h1 className="main-title">
          Récompenses Cognitives
        </h1>

<div className="assistant-box">
          <div className="assistant-avatar">🏆</div>

<div className="assistant-message">
            L’IA valorise vos efforts et votre progression.
          </div>
        </div>

<div className="analysis-box">
          <div className="analysis-grid">

<div className="analysis-card">
              <div className="analysis-label">
                Points Totaux
              </div>

<div className="analysis-value">
                {points}
              </div>
            </div>

<div className="analysis-card">
              <div className="analysis-label">
                Badges
              </div>

<div className="analysis-value">
                {badges.length}
              </div>
            </div>

</div>
        </div>

<div className="analysis-box">
          <div className="analysis-title">
            Vos Badges
          </div>
{badges.length === 0 ? (
            <p>Aucun badge débloqué.</p>
          ) : (
            badges.map((badge, index) => (
              <div
                key={index}
                className="analysis-card"
                style={{ marginBottom: "15px" }}
              >
                <div
                  style={{
                    fontSize: "28px",
                    marginBottom: "8px",
                  }}
                >
                  🏅
                </div>
<div className="analysis-value">
                  {badge}
                </div>
              </div>
            ))
          )}
        </div>
<div className="analysis-box">
          <div className="analysis-title">
            Motivation IA
          </div>
<p
            style={{
              fontSize: "22px",
              lineHeight: "1.8",
              textAlign: "center",
            }}
          >
            Chaque séance compte. Même une petite progression améliore votre cerveau.
          </p>
        </div>
<div
          className="button-row"
          style={{ justifyContent: "center" }}
        >
          <Link href="/objectifs">
            <button className="primary-button success-button">
              Objectifs
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
