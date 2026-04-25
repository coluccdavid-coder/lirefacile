"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function FatigueIAPage() {
  const [fatigueLevel, setFatigueLevel] = useState("Normale");
  const [recommendations, setRecommendations] = useState([]);
  const [history, setHistory] = useState([]);

useEffect(() => {
    const sessions = JSON.parse(
      localStorage.getItem("sessionHistory")
    ) || [];

setHistory(sessions);

const generated = [];

if (sessions.length === 0) return;

const averageScore = Math.round(
      sessions.reduce(
        (sum, session) => sum + session.score,
        0
      ) / sessions.length
    );

if (averageScore < 40) {
      setFatigueLevel("Élevée");

generated.push(
        "Réduire durée séances"
      );

generated.push(
        "Ajouter pauses fréquentes"
      );

generated.push(
        "Simplifier exercices"
      );
    }

if (averageScore >= 40 && averageScore < 70) {
      setFatigueLevel("Modérée");

generated.push(
        "Maintenir rythme doux"
      );

generated.push(
        "Limiter surcharge cognitive"
      );
    }

if (averageScore >= 70) {
      setFatigueLevel("Faible");

generated.push(
        "Augmenter difficulté progressivement"
      );

generated.push(
        "Ajouter nouveaux défis"
      );
    }

setRecommendations(generated);
  }, []);

const getFatigueColor = () => {
    if (fatigueLevel === "Élevée") {
      return "#ef4444";
    }

if (fatigueLevel === "Modérée") {
      return "#f59e0b";
    }

return "#22c55e";
  };

return (
    <div className="page-container">
      <div className="main-card fade-in">

<h1 className="main-title">
          Fatigue Cognitive
        </h1>

<div className="assistant-box">
          <div className="assistant-avatar">🧠</div>

<div className="assistant-message">
            L’IA adapte la rééducation selon la fatigue.
          </div>
        </div>

<div className="analysis-box">
          <div className="analysis-title">
            Niveau détecté
          </div>

<div
            className="analysis-card"
            style={{
              borderTop: `8px solid ${getFatigueColor()}`,
            }}
          >
            <div className="analysis-label">
              Fatigue cognitive
            </div>

<div className="analysis-value">
              {fatigueLevel}
            </div>
          </div>
        </div>

<div className="analysis-box">
          <div className="analysis-title">
            Adaptation IA
          </div>

{recommendations.length === 0 ? (
            <p>Aucune donnée disponible.</p>
          ) : (
            recommendations.map((item, index) => (
              <div
                key={index}
                className="analysis-card"
                style={{ marginBottom: "15px" }}
              >
                <div className="analysis-value">
                  {item}
                </div>
              </div>
            ))
          )}
        </div>

<div className="analysis-box">
          <div className="analysis-title">
            Historique
          </div>

{history.length === 0 ? (
            <p>Aucune séance trouvée.</p>
          ) : (
            history.map((session, index) => (
              <div
                key={index}
                className="analysis-card"
                style={{ marginBottom: "15px" }}
              >
                <div className="analysis-label">
                  {session.module}
                </div>

<div className="analysis-value">
                  {session.score}%
                </div>
              </div>
            ))
          )}
        </div>

<div
          className="button-row"
          style={{ justifyContent: "center" }}
        >
          <Link href="/generation-exercices">
            <button className="primary-button success-button">
              Exercices IA
            </button>
          </Link>

<Link href="/historique">
            <button className="primary-button warning-button">
              Historique
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
