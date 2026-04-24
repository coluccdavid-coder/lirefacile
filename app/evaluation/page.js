"use client";

import Link from "next/link";

export default function EvaluationPage() {
  return (
    <div className="page-container">
      <div className="main-card fade-in">

        <h1 className="main-title">
          Évaluation Cognitive
        </h1>

        <div className="analysis-box">
          <div className="analysis-title">
            Analyse Terminée
          </div>

          <p
            style={{
              fontSize: "22px",
              lineHeight: "1.8",
              marginBottom: "25px",
            }}
          >
            L’IA pourra maintenant adapter les exercices selon :
          </p>

          <ul
            style={{
              fontSize: "22px",
              lineHeight: "2.2",
              paddingLeft: "25px",
            }}
          >
            <li>Mémoire</li>
            <li>Lecture</li>
            <li>Écriture</li>
            <li>Fatigue</li>
            <li>Parole</li>
          </ul>
        </div>

        <div
          className="button-row"
          style={{
            justifyContent: "center",
            marginTop: "35px",
          }}
        >
          <Link href="/profil">
            <button className="primary-button success-button">
              Voir mon profil IA
            </button>
          </Link>

          <Link href="/">
            <button className="primary-button">
              Retour accueil
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}
