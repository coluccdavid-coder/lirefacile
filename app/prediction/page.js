"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
export default function PredictionPage() {
  const [futureScore, setFutureScore] = useState(0);
  const [riskLevel, setRiskLevel] = useState("Faible");
  const [projection, setProjection] = useState("");
  const [stability, setStability] = useState("Stable");
useEffect(() => {
    const history = JSON.parse(
      localStorage.getItem("sessionHistory")
    ) || [];
const emotions = JSON.parse(
      localStorage.getItem("emotionHistory")
    ) || [];
if (history.length === 0) return;
const average = Math.round(
      history.reduce((sum, item) => sum + item.score, 0) /
        history.length
    );
const recent = history.slice(-5);
const progression =
      recent[recent.length - 1]?.score - recent[0]?.score;
let predicted = average;
if (progression > 0) {
      predicted += 10;
      setStability("Progression");
    }
if (progression < 0) {
      predicted -= 10;
      setStability("Fragile");
    }
const lastEmotion = emotions.at(-1);
if (
      lastEmotion?.mood?.includes("😞") ||
      lastEmotion?.mood?.includes("😴")
    ) {
      predicted -= 5;
    }
predicted = Math.max(0, Math.min(predicted, 100));
setFutureScore(predicted);
if (predicted < 40) {
      setRiskLevel("Élevé");
setProjection(
        "Une fatigue ou stagnation peut apparaître. L’IA recommande un rythme plus doux."
      );
    } else if (predicted < 70) {
      setRiskLevel("Modéré");

setProjection(
        "Le patient progresse mais nécessite un accompagnement constant."
      );
    } else {
      setRiskLevel("Faible");
setProjection(
        "Très bonne trajectoire cognitive. Maintenir la régularité."
      );
    }
  }, []);
return (
    <div className="page-container">
      <div className="main-card fade-in">
        <h1 className="main-title">
          Jumeau Cognitif IA
        </h1>
<div className="assistant-box">
          <div className="assistant-avatar">🔮</div>
<div className="assistant-message">
            L’IA anticipe votre trajectoire cognitive.
          </div>
        </div>

<div className="analysis-box">
          <div className="analysis-title">
            Projection Future
          </div>
<div
            style={{
              textAlign: "center",
              fontSize: "76px",
              fontWeight: "800",
            }}
          >
            {futureScore}%
          </div>
        </div>
<div className="analysis-box">
          <div className="analysis-grid">
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
                Stabilité
              </div>
<div className="analysis-value">
                {stability}
              </div>
            </div>
</div>
        </div>
<div className="analysis-box">
          <div className="analysis-title">
            Projection IA
          </div>
<p
            style={{
              fontSize: "22px",
              lineHeight: "1.8",
            }}
          >
            {projection}
          </p>
        </div>
<div className="analysis-box">
          <div className="analysis-title">
            Ce que le jumeau cognitif analyse
          </div>
<ul
            style={{
              fontSize: "20px",
              lineHeight: "2.2",
            }}
          >
            <li>Historique patient</li>
            <li>Fatigue</li>
            <li>Humeur</li>
            <li>Progression</li>
            <li>Risque de rechute</li>
          </ul>
        </div>
<div
          className="button-row"
          style={{ justifyContent: "center" }}
        >
          <Link href="/therapeute">
            <button className="primary-button success-button">
              Profil Thérapeute
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
