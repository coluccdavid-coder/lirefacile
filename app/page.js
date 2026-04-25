"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="page-container">
      <div className="main-card fade-in">

<h1 className="main-title">
          LireFacile
        </h1>

<div
          style={{
            textAlign: "center",
            marginBottom: "30px",
            color: "#64748b",
            fontSize: "22px",
          }}
        >
          Plateforme IA pour AVC, Dyslexie,
          Rééducation Cognitive et Orthophonie.
        </div>

<div className="assistant-box">
          <div className="assistant-avatar">🧠</div>

<div className="assistant-message">
            Bienvenue. L’IA analyse le profil et adapte les exercices.
          </div>
        </div>

<div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "25px",
            marginTop: "40px",
          }}
        >

<Link href="/evaluation-complete">
            <div className="analysis-card clickable-card">
              <div className="analysis-title">
                Évaluation IA
              </div>

<div
                style={{
                  marginTop: "15px",
                  color: "#64748b",
                  lineHeight: "1.8",
                }}
              >
                Lance la vraie évaluation cognitive.
              </div>
            </div>
          </Link>

<Link href="/profil">
            <div className="analysis-card clickable-card">
              <div className="analysis-title">
                Profil Cognitif
              </div>

<div
                style={{
                  marginTop: "15px",
                  color: "#64748b",
                  lineHeight: "1.8",
                }}
              >
                Consulte le profil généré.
              </div>
            </div>
          </Link>

<Link href="/generation-exercices">
            <div className="analysis-card clickable-card">
              <div className="analysis-title">
                Exercices
              </div>

<div
                style={{
                  marginTop: "15px",
                  color: "#64748b",
                  lineHeight: "1.8",
                }}
              >
                Lance les exercices adaptés.
              </div>
            </div>
          </Link>

</div>

<div
          className="button-row"
          style={{
            justifyContent: "center",
            marginTop: "50px",
            flexWrap: "wrap",
          }}
        >

<Link href="/memoire-ia">
            <button className="primary-button success-button">
              Mémoire IA
            </button>
          </Link>

<Link href="/bibliotheque-pdf">
            <button className="primary-button warning-button">
              PDF Thérapeutiques
            </button>
          </Link>

<Link href="/fatigue-ia">
            <button className="primary-button">
              Fatigue Cognitive
            </button>
          </Link>

</div>

</div>
    </div>
  );
}

