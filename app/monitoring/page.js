"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function MonitoringPage() {
  const [patients, setPatients] = useState([]);
  const [priorityList, setPriorityList] = useState([]);

useEffect(() => {
    const database = JSON.parse(
      localStorage.getItem("patientsDatabase")
    ) || [];

const monitored = database.map((patient) => {
      let priority = "Normale";
      let score = patient.cognitiveScore || 0;
      let color = "#22c55e";

if (score < 40) {
        priority = "Critique";
        color = "#ef4444";
      } else if (score < 70) {
        priority = "Surveillance";
        color = "#f59e0b";
      }

return {
        ...patient,
        priority,
        color,
      };
    });
monitored.sort((a, b) => {
      const order = {
        Critique: 0,
        Surveillance: 1,
        Normale: 2,
      };
return order[a.priority] - order[b.priority];
    });
setPatients(monitored);
    setPriorityList(monitored.slice(0, 5));
  }, []);

const countCritical = () => {
    return patients.filter(
      (patient) => patient.priority === "Critique"
    ).length;
  };

return (
    <div className="page-container">
      <div className="main-card fade-in">
        <h1 className="main-title">
          Monitoring Multi‑Patients
        </h1>

<div className="assistant-box">
          <div className="assistant-avatar">🏥</div>

<div className="assistant-message">
            Vue temps réel des patients prioritaires.
          </div>
        </div>

<div className="analysis-box">
          <div className="analysis-grid">

<div className="analysis-card">
              <div className="analysis-label">
                Patients suivis
              </div>

<div className="analysis-value">
                {patients.length}
              </div>
            </div>

<div className="analysis-card">
              <div className="analysis-label">
                Cas critiques
              </div>
<div className="analysis-value">
                {countCritical()}
              </div>
            </div>
</div>
        </div>
<div className="analysis-box">
          <div className="analysis-title">
            Priorité Clinique
          </div>
{priorityList.length === 0 ? (
            <p>Aucun patient enregistré.</p>
          ) : (
            priorityList.map((patient, index) => (
              <div
                key={index}
                className="analysis-card"
                style={{
                  marginBottom: "18px",
                  borderLeft: `8px solid ${patient.color}`,
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
                  Priorité : {patient.priority}
                </div>
              </div>
            ))
          )}
        </div>
<div className="analysis-box">
          <div className="analysis-title">
            Ce que surveille l’IA
          </div>

<ul
            style={{
              fontSize: "20px",
              lineHeight: "2.2",
            }}
          >
            <li>Patients fragiles</li>
            <li>Score cognitif</li>
            <li>Cas prioritaires</li>
            <li>Suivi global</li>
            <li>Risque neurologique</li>
          </ul>
        </div>
<div
          className="button-row"
          style={{ justifyContent: "center" }}
        >
          <Link href="/supervision">
            <button className="primary-button success-button">
              Supervision IA
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

