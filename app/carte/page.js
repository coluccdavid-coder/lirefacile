"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CartePage() {
  const [evaluation, setEvaluation] = useState(null);
  const [emotionHistory, setEmotionHistory] = useState([]);

useEffect(() => {
    const evalData = JSON.parse(
      localStorage.getItem("evaluation")
    );

const emotions = JSON.parse(
      localStorage.getItem("emotionHistory")
    ) || [];

setEvaluation(evalData);
    setEmotionHistory(emotions);
  }, []);

const getLevel = (score) => {
    if (score < 40) return "Fragile";
    if (score < 70) return "Moyen";
    return "Bon";
  };

const getColor = (score) => {
    if (score < 40) return "#ef4444";
    if (score < 70) return "#f59e0b";
    return "#22c55e";
  };

const latestEmotion = emotionHistory.at(-1);

return (
    <div className="page-container">
      <div className="main-card fade-in">
        <h1 className="main-title">
          Carte Cognitive
        </h1>

<div className="assistant-box">
          <div className="assistant-avatar">🧠</div>

<div className="assistant-message">
            Visualisation complète des zones cognitives.
          </div>
        </div>

{evaluation && (
          <div className="analysis-box">
            <div className="analysis-title">
              Zones Cognitives
            </div>

<div className="analysis-grid">
              {Object.entries(evaluation).map(
                ([key, value]) => (
                  <div
                    key={key}
                    className="analysis-card"
                    style={{
                      borderTop: `8px solid ${getColor(
                        value
                      )}`,
                    }}
                  >
                    <div className="analysis-label">
                      {key}
                    </div>

<div className="analysis-value">
                      {value}%
                    </div>

<div style={{ marginTop: "10px" }}>
                      {getLevel(value)}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        )}

<div className="analysis-box">
          <div className="analysis-title">
            Heatmap Émotionnelle
          </div>

{latestEmotion ? (
            <div className="analysis-card">
              <div className="analysis-label">
                Dernier état
              </div>

<div className="analysis-value">
                {latestEmotion.mood}
              </div>

<div style={{ marginTop: "12px" }}>
                Énergie : {latestEmotion.energy}/10
              </div>
            </div>
          ) : (
            <p>Aucune donnée émotionnelle.</p>
          )}
        </div>

<div className="analysis-box">
          <div className="analysis-title">
            Lecture Clinique IA
          </div>

<ul
            style={{
              fontSize: "20px",
              lineHeight: "2.2",
            }}
          >
            <li>Zones fragiles visibles</li>
            <li>Lecture immédiate</li>
            <li>Analyse thérapeutique rapide</li>
            <li>Repérage émotionnel</li>
            <li>Visualisation intuitive</li>
          </ul>
        </div>

<div
          className="button-row"
          style={{ justifyContent: "center" }}
        >
          <Link href="/statistiques">
            <button className="primary-button success-button">
              Statistiques
            </button>
          </Link>

<Link href="/centre">
            <button className="primary-button warning-button">
              Centre Thérapeute
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
