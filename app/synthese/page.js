"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
export default function SynthesePage() {
  const [summary, setSummary] = useState("");
  const [patient, setPatient] = useState(null);
useEffect(() => {
    const profile = JSON.parse(
      localStorage.getItem("patientProfile")
    );
const evaluation = JSON.parse(
      localStorage.getItem("evaluation")
    );
const sessions = JSON.parse(
      localStorage.getItem("sessionHistory")
    ) || [];
const emotions = JSON.parse(
      localStorage.getItem("emotionHistory")
    ) || [];
if (!profile || !evaluation) return;
setPatient(profile);
let report = "";
report += `Patient : ${profile.name || "Anonyme"}. `;
    report += `Âge : ${profile.age}. `;
    report += `Pathologie : ${profile.pathology}. `;
const averageScore = sessions.length
      ? Math.round(
          sessions.reduce(
            (sum, s) => sum + s.score,
            0
          ) / sessions.length
        )
      : 0;
report += `Score moyen : ${averageScore}%. `;
if (evaluation.memory < 50) {
      report +=
        "Fragilité mémoire détectée. ";
    }
if (evaluation.attention < 50) {
      report +=
        "Attention fluctuante observée. ";
    }
const lastEmotion = emotions.at(-1);
if (lastEmotion) {
      report += `Dernière humeur : ${lastEmotion.mood}. `;
    }
report +=
      "Recommandation : poursuite du suivi cognitif personnalisé.";
setSummary(report);
  }, []);
const exportReport = () => {
    window.print();
  };
return (
    <div className="page-container">
      <div className="main-card fade-in">
        <h1 className="main-title">
          Synthèse Médicale
        </h1>
<div className="assistant-box">
          <div className="assistant-avatar">📄</div>
<div className="assistant-message">
            Rapport automatique généré par l’IA.
          </div>
        </div>

<div className="analysis-box">
          <div className="analysis-title">
            Informations Patient
          </div>
<div className="analysis-grid">
            <div className="analysis-card">
              <div className="analysis-label">Nom</div>
              <div className="analysis-value">
                {patient?.name || "—"}
              </div>
            </div>

<div className="analysis-card">
              <div className="analysis-label">Âge</div>
              <div className="analysis-value">
                {patient?.age || "—"}
              </div>
            </div>

<div className="analysis-card">
              <div className="analysis-label">Pathologie</div>
              <div className="analysis-value">
                {patient?.pathology || "—"}
              </div>
            </div>
          </div>
        </div>

<div className="analysis-box">
          <div className="analysis-title">
            Rapport IA
          </div>
<p
            style={{
              fontSize: "22px",
              lineHeight: "2",
            }}
          >
            {summary}
          </p>
        </div>
<div className="button-row">
          <button
            className="primary-button success-button"
            onClick={exportReport}
          >
            Export Rapport
          </button>
        </div>
<div
          className="button-row"
          style={{ justifyContent: "center" }}
        >
          <Link href="/recommandations">
            <button className="primary-button success-button">
              IA Thérapeute
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
