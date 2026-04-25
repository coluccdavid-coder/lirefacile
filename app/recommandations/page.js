"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function RecommandationsPage() {
  const [recommendations, setRecommendations] = useState([]);

useEffect(() => {
    const evaluation = JSON.parse(
      localStorage.getItem("evaluation")
    );

const sessions = JSON.parse(
      localStorage.getItem("sessionHistory")
    ) || [];

const emotions = JSON.parse(
      localStorage.getItem("emotionHistory")
    ) || [];

const journal = JSON.parse(
      localStorage.getItem("journalEntries")
    ) || [];

const recs = [];

if (!evaluation) return;

if (evaluation.memory < 50) {
      recs.push(
        "Renforcer les exercices mémoire avec répétition espacée."
      );
    }

if (evaluation.attention < 50) {
      recs.push(
        "Privilégier des séances courtes et ciblées."
      );
    }

if (evaluation.reading < 50) {
      recs.push(
        "Activer lecture vocale et mode Dys."
      );
    }
const recentEmotion = emotions.at(-1);
if (
      recentEmotion?.mood?.includes("😞") ||
      recentEmotion?.mood?.includes("😣")
    ) {
      recs.push(
        "Prévoir une pause émotionnelle ou une séance plus légère."
      );
    }
const alerts = journal.filter(
      (entry) => entry.tag === "Alerte"
    );
if (alerts.length >= 3) {
      recs.push(
        "Plusieurs alertes détectées. Surveillance renforcée recommandée."
      );
    }
if (sessions.length > 0) {
      const average = Math.round(
        sessions.reduce(
          (sum, item) => sum + item.score,
          0
        ) / sessions.length
      );
if (average < 40) {
        recs.push(
          "Réduire difficulté et augmenter encouragements."
        );
      }
    }
if (recs.length === 0) {
      recs.push(
        "Le profil semble stable. Continuer le programme actuel."
      );
    }
setRecommendations(recs);
  }, []);
return (
    <div className="page-container">
      <div className="main-card fade-in">
        <h1 className="main-title">
          IA Thérapeute
        </h1>
<div className="assistant-box">
          <div className="assistant-avatar">🩺</div>
<div className="assistant-message">
            L’IA propose des recommandations personnalisées.
          </div>
        </div>

<div className="analysis-box">
          <div className="analysis-title">
            Recommandations Cliniques
          </div>
{recommendations.length === 0 ? (
            <p>Aucune recommandation.</p>
          ) : (
            recommendations.map((item, index) => (
              <div
                key={index}
                className="analysis-card"
                style={{ marginBottom: "16px" }}
              >
                <div className="analysis-value">
                  💡 {item}
                </div>
              </div>
            ))
          )}
        </div>
<div className="analysis-box">
          <div className="analysis-title">
            Ce que l’IA observe
          </div>

<ul
            style={{
              fontSize: "20px",
              lineHeight: "2.1",
            }}
          >
            <li>Scores cognitifs</li>
            <li>Émotions</li>
            <li>Historique</li>
            <li>Alertes</li>
            <li>Fatigue</li>
          </ul>
        </div>
<div
          className="button-row"
          style={{ justifyContent: "center" }}
        >
          <Link href="/journal">
            <button className="primary-button success-button">
              Journal
            </button>
          </Link>
<Link href="/therapeute">
            <button className="primary-button warning-button">
              Profil Thérapeute
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
