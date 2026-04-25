"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
export default function NeuroPage() {
  const [patients, setPatients] = useState([]);
  const [averageRisk, setAverageRisk] = useState(0);
useEffect(() => {
    const database = JSON.parse(
      localStorage.getItem("patientsDatabase")
    ) || [];
setPatients(database);
if (database.length > 0) {
      const avg = Math.round(
        database.reduce(
          (sum, patient) =>
            sum + (100 - patient.cognitiveScore),
          0
        ) / database.length
      );
setAverageRisk(avg);
    }
  }, []);
const getRiskColor = (score) => {
    if (score < 40) return "#22c55e";
    if (score < 70) return "#f59e0b";
    return "#ef4444";
  };
const getRiskLabel = (score) => {
    if (score < 40) return "Faible";
    if (score < 70) return "Modéré";
    return "Élevé";
  };
return (
    <div className="page-container">
      <div className="main-card fade-in">
        <h1 className="main-title">
          Tableau Neurologique
        </h1>
<div className="assistant-box">
          <div className="assistant-avatar">🧬</div>
<div className="assistant-message">
            Analyse neuro-clinique globale.
          </div>
        </div>
<div className="analysis-box">
          <div className="analysis-grid">
<div className="analysis-card">
              <div className="analysis-label">
                Patients
              </div>
<div className="analysis-value">
                {patients.length}
              </div>
            </div>
<div className="analysis-card">
              <div className="analysis-label">
                Risque moyen
              </div>
<div className="analysis-value">
                {averageRisk}%
              </div>
            </div>
</div>
        </div>
<div className="analysis-box">
          <div className="analysis-title">
            Heatmap Clinique
          </div>
{patients.length === 0 ? (
            <p>Aucune donnée disponible.</p>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "18px",
              }}
            >
              {patients.map((patient, index) => {
                const risk = 100 - patient.cognitiveScore;
return (
                  <div
                    key={index}
                    className="analysis-card"
                    style={{
                      background: getRiskColor(risk),
                      color: "white",
                    }}
                  >
                    <div style={{ fontSize: "18px" }}>
                      {patient.name}
                    </div>
<div
                      style={{
                        fontSize: "34px",
                        fontWeight: "700",
                        marginTop: "12px",
                      }}
                    >
                      {risk}%
                    </div>
<div style={{ marginTop: "10px" }}>
                      Risque {getRiskLabel(risk)}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
<div className="analysis-box">
          <div className="analysis-title">
            Lecture Expert
          </div>
<ul
            style={{
              fontSize: "20px",
              lineHeight: "2.1",
            }}
          >
            <li>Heatmap neurologique</li>
            <li>Comparaison patient</li>
            <li>Priorité clinique</li>
            <li>Vision globale</li>
            <li>Lecture instantanée</li>
          </ul>
        </div>
<div
          className="button-row"
          style={{ justifyContent: "center" }}
        >
          <Link href="/monitoring">
            <button className="primary-button success-button">
              Monitoring
            </button>
          </Link>
<Link href="/supervision">
            <button className="primary-button warning-button">
              Supervision
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
