"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
export default function StatistiquesPage() {
  const [patients, setPatients] = useState([]);
  const [averageScore, setAverageScore] = useState(0);
  const [highRisk, setHighRisk] = useState(0);
  const [stablePatients, setStablePatients] = useState(0);
useEffect(() => {
    const storedPatients = JSON.parse(
      localStorage.getItem("patientsDatabase")
    ) || [];
setPatients(storedPatients);
if (storedPatients.length === 0) return;
const avg = Math.round(
      storedPatients.reduce(
        (sum, patient) => sum + patient.cognitiveScore,
        0
      ) / storedPatients.length
    );
setAverageScore(avg);
const risk = storedPatients.filter(
      (patient) => patient.cognitiveScore < 40
    ).length;
setHighRisk(risk);
const stable = storedPatients.filter(
      (patient) => patient.cognitiveScore >= 70
    ).length;
setStablePatients(stable);
  }, []);
const getBarWidth = (score) => {
    return `${score}%`;
  };
return (
    <div className="page-container">
      <div className="main-card fade-in">
        <h1 className="main-title">
          Statistiques Cognitives
        </h1>
<div className="assistant-box">
          <div className="assistant-avatar">📊</div>
<div className="assistant-message">
            Vue globale des performances cognitives.
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
                Patients à risque
              </div>
<div className="analysis-value">
                {highRisk}
              </div>
            </div>
<div className="analysis-card">
              <div className="analysis-label">
                Patients stables
              </div>
<div className="analysis-value">
                {stablePatients}
              </div>
            </div>
</div>
        </div>
<div className="analysis-box">
          <div className="analysis-title">
            Répartition des scores
          </div>
{patients.length === 0 ? (
            <p>Aucune donnée disponible.</p>
          ) : (
            patients.map((patient, index) => (
              <div
                key={index}
                style={{ marginBottom: "20px" }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "6px",
                  }}
                >
                  <span>{patient.name}</span>
                  <span>{patient.cognitiveScore}%</span>
                </div>
<div className="progress-container">
                  <div
                    className="progress-bar"
                    style={{
                      width: getBarWidth(
                        patient.cognitiveScore
                      ),
                    }}
                  />
                </div>
              </div>
            ))
          )}
        </div>
<div className="analysis-box">
          <div className="analysis-title">
            Analyse IA
          </div>
<ul
            style={{
              fontSize: "20px",
              lineHeight: "2.2",
            }}
          >
            <li>Détection des tendances</li>
            <li>Analyse collective</li>
            <li>Vision thérapeutique rapide</li>
            <li>Suivi des profils fragiles</li>
            <li>Mesure globale de progression</li>
          </ul>
        </div>
<div
          className="button-row"
          style={{ justifyContent: "center" }}
        >
          <Link href="/centre">
            <button className="primary-button success-button">
              Centre Thérapeute
            </button>
          </Link>
<Link href="/prediction">
            <button className="primary-button warning-button">
              Prédiction IA
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

