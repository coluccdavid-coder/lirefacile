"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="page-container">
      <div className="main-card fade-in">
        <h1 className="main-title">LireFacile</h1>

        <p className="subtitle">
          Une plateforme pensée pour accompagner les personnes AVC,
          Dyslexie, Autisme et troubles cognitifs.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "40px",
          }}
        >
          <img
            src="/brain-reading.png"
            alt="LireFacile"
            style={{
              width: "240px",
              maxWidth: "100%",
            }}
          />
        </div>

        <div className="button-row" style={{ justifyContent: "center" }}>
          <Link href="/profil">
            <button className="primary-button">
              Commencer
            </button>
          </Link>

          <Link href="/exercices">
            <button className="primary-button success-button">
              Exercices
            </button>
          </Link>
        </div>

        <div
          style={{
            marginTop: "50px",
            textAlign: "center",
            color: "#6b7280",
            lineHeight: "1.8",
            fontSize: "18px",
          }}
        >
          <p>
            Exercices cognitifs • Mémoire • Lecture • Concentration
          </p>

          <p>
            Une aide numérique inspirée de l’orthophonie moderne.
          </p>
        </div>
      </div>
    </div>
  );
}
