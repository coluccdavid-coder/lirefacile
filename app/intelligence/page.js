"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function IntelligencePage() {
  const [cognitiveScore, setCognitiveScore] = useState(0);
  const [trend, setTrend] = useState("Stable");
  const [adaptation, setAdaptation] = useState("");
  const [difficulty, setDifficulty] = useState("Moyenne");

useEffect(() => {
    const history = JSON.parse(
      localStorage.getItem("sessionHistory")
    ) || [];

const emotions = JSON.parse(
      localStorage.getItem("emotionHistory")
    ) || [];

const evaluation = JSON.parse(
      localStorage.getItem("evaluation")
    );

if (!evaluation) return;

const baseScore = Math.round(
      Object.values(evaluation).reduce(
        (sum, value) => sum + value,
        0
      ) / Object.values(evaluation).length
    );

let finalScore = baseScore;

if (history.length > 0) {
      const averageHistory = Math.round(
        history.reduce((sum, item) => sum + item.score, 0) /
          history.length
      );

finalScore = Math.round(
        (baseScore + averageHistory) / 2
      );
    }
const lastMood = emotions.at(-1);
if (lastMood?.mood?.includes("😞") ||
        lastMood?.mood?.includes("😴")) {
      finalScore -= 5;
    }
setCognitiveScore(finalScore);
if (finalScore < 40) {
      setTrend("Fragile");
      setDifficulty("Facile");
setAdaptation(
        "L’IA réduit automatiquement la difficulté et augmente les pauses."
      );
    } else if (finalScore < 70) {
      setTrend("Progression");
      setDifficulty("Moyenne");

setAdaptation(
        "L’IA adapte progressivement les exercices pour renforcer les capacités."
      );
    } else {
      setTrend("Performant");
      setDifficulty("Avancée");

setAdaptation(
        "L’IA augmente légèrement le niveau pour maintenir la progression."
      );
    }
  }, []);

return (
    <div className="page-container">
      <div className="main-card fade-in">
        <h1 className="main-title">
          Intelligence Cognitive IA
        </h1>

<div className="assistant-box">
          <div className="assistant-avatar">🧠</div>

<div className="assistant-message">
            L’IA apprend et adapte votre parcours.
          </div>
        </div>

<div className="analysis-box">
          <div className="analysis-title">
            Score Cognitif Vivant
          </div>

<div
            style={{
              textAlign: "center",
              fontSize: "80px",
              fontWeight: "800",
              marginTop: "20px",
            }}
          >
            {cognitiveScore}%
          </div>
        </div>

<div className="analysis-box">
          <div className="analysis-grid">

<div className="analysis-card">
              <div className="analysis-label">
                État
              </div>

<div className="analysis-value">
                {trend}
              </div>
            </div>

<div className="analysis-card">
              <div className="analysis-label">
                Difficulté
              </div>

<div className="analysis-value">
                {difficulty}
              </div>
            </div>

</div>
        </div>

<div className="analysis-box">
          <div className="analysis-title">
            Adaptation IA
          </div>

<p
            style={{
              fontSize: "22px",
              lineHeight: "1.8",
              textAlign: "center",
            }}
          >
            {adaptation}
          </p>
        </div>

<div className="analysis-box">
          <div className="analysis-title">
            Ce que l’IA apprend
          </div>

<ul
            style={{
              fontSize: "20px",
              lineHeight: "2.2",
            }}
          >
            <li>Temps de réponse</li>
            <li>Fatigue</li>
            <li>Humeur</li>
            <li>Progression</li>
            <li>Difficulté optimale</li>
          </ul>
        </div>

<div
          className="button-row"
          style={{ justifyContent: "center" }}
        >
          <Link href="/dashboard">
            <button className="primary-button success-button">
              Dashboard
            </button>
          </Link>

<Link href="/avatar">
            <button className="primary-button warning-button">
              Avatar IA
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
