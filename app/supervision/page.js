"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
export default function SupervisionPage() {
  const [status, setStatus] = useState("Stable");
  const [monitoringScore, setMonitoringScore] = useState(0);
  const [fatigueLevel, setFatigueLevel] = useState("Normale");
  const [alerts, setAlerts] = useState([]);
useEffect(() => {
    const sessions = JSON.parse(
      localStorage.getItem("sessionHistory")
    ) || [];
const emotions = JSON.parse(
      localStorage.getItem("emotionHistory")
    ) || [];
const findings = [];
if (sessions.length === 0) return;
const latestSession = sessions.at(-1);
const averageScore = Math.round(
      sessions.reduce(
        (sum, session) => sum + session.score,
        0
      ) / sessions.length
    );
setMonitoringScore(averageScore);
if (latestSession.score < averageScore - 20) {
      findings.push(
        "Baisse brutale de performance détectée."
      );
setStatus("Instable");
    }
const lastEmotion = emotions.at(-1);
if (
      lastEmotion?.energy <= 3 ||
      lastEmotion?.mood?.includes("😴")
    ) {
      findings.push(
        "Fatigue cognitive élevée."
      );
setFatigueLevel("Élevée");
    }
if (averageScore >= 70) {
      setStatus("Très Stable");
    }
if (averageScore < 40) {
      setStatus("Fragile");
    }
setAlerts(findings);
  }, []);
const getStatusColor = () => {
    if (status === "Fragile") return "#ef4444";
    if (status === "Instable") return "#f59e0b";
    return "#22c55e";
  };
return (
    <div className="page-container">
      <div className="main-card fade-in">
        <h1 className="main-title">
          Supervision IA
        </h1>
<div className="assistant-box">
          <div className="assistant-avatar">📡</div>
<div className="assistant-message">
            Surveillance neuro‑clinique en temps réel.
          </div>
        </div>
<div className="analysis-box">
          <div className="analysis-grid">
<div
              className="analysis-card"
              style={{
                borderTop: `8px solid ${getStatusColor()}`,
              }}
            >
              <div className="analysis-label">
                État Global
              </div>
<div className="analysis-value">
                {status}
              </div>
            </div>
<div className="analysis-card">
              <div className="analysis-label">
                Score Moyen
              </div>
<div className="analysis-value">
                {monitoringScore}%
              </div>
            </div>
<div className="analysis-card">
              <div className="analysis-label">
                Fatigue
              </div>
<div className="analysis-value">
                {fatigueLevel}
              </div>
            </div>
</div>
        </div>
<div className="analysis-box">
          <div className="analysis-title">
            Alertes Temps Réel
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
                  🚨 {alert}
                </div>
              </div>
            ))
          )}
        </div>
<div className="analysis-box">
          <div className="analysis-title">
            Ce que la supervision analyse
          </div>
<ul
            style={{
              fontSize: "20px",
              lineHeight: "2.2",
            }}
          >
            <li>Fatigue cognitive</li>
            <li>Performance moyenne</li>
            <li>Baisse soudaine</li>
            <li>Émotions</li>
            <li>Stabilité neurologique</li>
          </ul>
        </div>
<div
          className="button-row"
          style={{ justifyContent: "center" }}
        >
          <Link href="/decision">
            <button className="primary-button success-button">
              Décision Clinique
            </button>
          </Link>
<Link href="/synthese">
            <button className="primary-button warning-button">
              Synthèse
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
