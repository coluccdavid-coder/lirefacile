"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function TherapeutePage() {
  const [profile, setProfile] = useState(null);
  const [history, setHistory] = useState([]);
  const [emotionHistory, setEmotionHistory] = useState([]);
  const [summary, setSummary] = useState("");

useEffect(() => {
    const patient = JSON.parse(
      localStorage.getItem("patientProfile")
    );

const sessions = JSON.parse(
      localStorage.getItem("sessionHistory")
    ) || [];
const emotions = JSON.parse(
      localStorage.getItem("emotionHistory")
    ) || [];
setProfile(patient);
    setHistory(sessions);
    setEmotionHistory(emotions);
if (!patient) return;
let text = "";
text += `Profil : ${patient.pathology}. `;
    text += `Âge : ${patient.age}. `;
    text += `Fatigue : ${patient.fatigue}. `;
if (sessions.length > 5) {
      text +=
        "Progression régulière observée. ";
    } else {
      text +=
        "Peu de données disponibles actuellement. ";
    }

setSummary(text);
  }, []);

const exportPDF = () => {
    window.print();
  };

return (
    <div className="page-container">
      <div className="main-card fade-in">
        <h1 className="main-title">
          Profil Thérapeute
        </h1>

<div className="assistant-box">
          <div className="assistant-avatar">🩺</div>

<div className="assistant-message">
            Vue clinique du patient.
          </div>
        </div>

<div className="analysis-box">
          <div className="analysis-title">
            Informations Patient
          </div>

<div className="analysis-grid">
            <div className="analysis-card">
              <div className="analysis-label">Âge</div>
              <div className="analysis-value">
                {profile?.age || "—"}
              </div>
            </div>

<div className="analysis-card">
              <div className="analysis-label">
                Pathologie
              </div>
              <div className="analysis-value">
                {profile?.pathology || "—"}
              </div>
            </div>

<div className="analysis-card">
              <div className="analysis-label">
                Fatigue
              </div>
              <div className="analysis-value">
                {profile?.fatigue || "—"}
              </div>
            </div>

<div className="analysis-card">
              <div className="analysis-label">
                Style
              </div>
              <div className="analysis-value">
                {profile?.learningStyle || "—"}
              </div>
            </div>
          </div>
        </div>

<div className="analysis-box">
          <div className="analysis-title">
            Résumé IA
          </div>
<p
            style={{
              fontSize: "22px",
              lineHeight: "1.8",
            }}
          >
            {summary}
          </p>
        </div>
<div className="analysis-box">
          <div className="analysis-title">
            Historique Rapide
          </div>

{history.slice(-5).map((item, index) => (
            <div
              key={index}
              className="analysis-card"
              style={{ marginBottom: "12px" }}
            >
              <div className="analysis-label">
                {item.date}
              </div>

<div className="analysis-value">
                {item.score}%
              </div>
            </div>
          ))}
        </div>

<div className="button-row">
          <button
            className="primary-button success-button"
            onClick={exportPDF}
          >
            Export PDF
          </button>
        </div>

<div
          className="button-row"
          style={{ justifyContent: "center" }}
        >
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
