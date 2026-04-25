"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function DecisionPage() {
  const [clinicalLevel, setClinicalLevel] = useState("Stable");
  const [alerts, setAlerts] = useState([]);
  const [priority, setPriority] = useState("Normale");

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

const findings = [];

if (!evaluation) return;

if (evaluation.memory < 40) {
      findings.push(
        "Mémoire fragile observée."
      );
    }

if (evaluation.attention < 40) {
      findings.push(
        "Attention réduite détectée."
      );
    }
const lastEmotion = emotions.at(-1);
if (
      lastEmotion?.mood?.includes("😞") ||
      lastEmotion?.mood?.includes("😴")
    ) {
      findings.push(
        "Fatigue émotionnelle importante."
      );
    }
const alertCount = journal.filter(
      (entry) => entry.tag === "Alerte"
    ).length;
if (alertCount >= 3) {
      findings.push(
        "Multiples alertes thérapeutiques enregistrées."
      );
    }
const averageScore = sessions.length
      ? Math.round(
          sessions.reduce(
            (sum, item) => sum + item.score,
            0
          ) / sessions.length
        )
      : 0;
if (averageScore < 40) {
      setClinicalLevel("Fragile");
      setPriority("Élevée");
    } else if (averageScore < 70) {
      setClinicalLevel("Surveillance");
      setPriority("Modérée");
    } else {
      setClinicalLevel("Stable");
      setPriority("Normale");
    }
setAlerts(findings);
  }, []);
const getPriorityColor = () => {
    if (priority === "Élevée") return "#ef4444";
    if (priority === "Modérée") return "#f59e0b";
    return "#22c55e";
  };
return (
    <div className="page-container">
      <div className="main-card fade-in">
        <h1 className="main-title">
          Décision Clinique IA
        </h1>
<div className="assistant-box">
          <div className="assistant-avatar">🧬</div>
<div className="assistant-message">
            Synthèse neurologique et aide à la décision.
          </div>
        </div>
<div className="analysis-box">
          <div className="analysis-grid">
<div className="analysis-card">
              <div className="analysis-label">
                Niveau Clinique
              </div>
<div className="analysis-value">
                {clinicalLevel}
              </div>
            </div>
<div
              className="analysis-card"
              style={{
                borderTop: `8px solid ${getPriorityColor()}`,
              }}
            >
              <div className="analysis-label">
                Priorité
              </div>
<div className="analysis-value">
                {priority}
              </div>
            </div>
</div>
        </div>
<div className="analysis-box">
          <div className="analysis-title">
            Alertes Neurologiques
          </div>
{alerts.length === 0 ? (
            <p>Aucune alerte détectée.</p>
          ) : (
            alerts.map((alert, index) => (
              <div
                key={index}
                className="analysis-card"
                style={{ marginBottom: "14px" }}
              >
                <div className="analysis-value">
                  ⚠️ {alert}
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
            <li>État neurologique</li>
            <li>Risque cognitif</li>
            <li>Fatigue mentale</li>
            <li>Priorité thérapeutique</li>
            <li>Surveillance clinique</li>
          </ul>
        </div>
<div
          className="button-row"
          style={{ justifyContent: "center" }}
        >
          <Link href="/synthese">
            <button className="primary-button success-button">
              Synthèse
            </button>
          </Link>
<Link href="/recommandations">
            <button className="primary-button warning-button">
              IA Thérapeute
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
