"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
export default function CentrePage() {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
useEffect(() => {
    const stored = JSON.parse(
      localStorage.getItem("patientsDatabase")
    ) || [];
setPatients(stored);
  }, []);
const filteredPatients = patients.filter((patient) =>
    patient.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );
const getRiskColor = (score) => {
    if (score < 40) return "#dc2626";
    if (score < 70) return "#f59e0b";
    return "#16a34a";
  };
return (
    <div className="page-container">
      <div className="main-card fade-in">
        <h1 className="main-title">
          Centre Thérapeute
        </h1>
<div className="assistant-box">
          <div className="assistant-avatar">🏥</div>
<div className="assistant-message">
            Vue globale des patients suivis.
          </div>
        </div>
<div className="exercise-card">
          <div className="exercise-title">
            Recherche patient
          </div>
<input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un patient"
            className="exercise-input"
          />
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
                À surveiller
              </div>
<div className="analysis-value">
                {
                  patients.filter(
                    (p) => p.cognitiveScore < 40
                  ).length
                }
              </div>
            </div>
</div>
        </div>
<div className="analysis-box">
          <div className="analysis-title">
            Liste des patients
          </div>
{filteredPatients.length === 0 ? (
            <p>Aucun patient trouvé.</p>
          ) : (
            filteredPatients.map((patient, index) => (
              <div
                key={index}
                className="analysis-card"
                style={{
                  marginBottom: "18px",
                  borderLeft: `8px solid ${getRiskColor(
                    patient.cognitiveScore
                  )}`,
                }}
              >
                <div className="analysis-label">
                  {patient.pathology}
                </div>
<div className="analysis-value">
                  {patient.name}
                </div>
<div style={{ marginTop: "10px" }}>
                  Score : {patient.cognitiveScore}%
                </div>
<div>
                  Âge : {patient.age}
                </div>
              </div>
            ))
          )}
        </div>
<div className="analysis-box">
          <div className="analysis-title">
            Priorité Clinique
          </div>
<ul
            style={{
              fontSize: "20px",
              lineHeight: "2.1",
            }}
          >
            <li>Patients avec baisse cognitive</li>
            <li>Fatigue élevée</li>
            <li>Stagnation prolongée</li>
            <li>Émotions négatives répétées</li>
          </ul>
        </div>
<div
          className="button-row"
          style={{ justifyContent: "center" }}
        >
          <Link href="/prediction">
            <button className="primary-button success-button">
              Prédiction IA
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
