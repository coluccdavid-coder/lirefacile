"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ExercicesAVC() {
  const [pdfs, setPdfs] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("pdf-library");

    if (stored) {
      setPdfs(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="page-container">
      <div className="main-card">

        <h1 className="main-title">Exercices AVC</h1>

        {pdfs.length === 0 ? (
          <>
            <p>Aucun exercice IA généré.</p>

            <Link href="/bibliotheque-pdf">
              <button className="primary-button blue-button">
                Aller vers Bibliothèque PDF IA
              </button>
            </Link>
          </>
        ) : (
          <div className="exercise-list">

            <h2>Exercices générés depuis PDF</h2>

            {pdfs.map((pdf, index) => (
              <div key={index} className="exercise-card">
                <h3>{pdf.name}</h3>

                <p>Exercice IA basé sur ce document.</p>

                <button className="primary-button avc-button">
                  Lancer exercice
                </button>
              </div>
            ))}

          </div>
        )}

        <div style={{ marginTop: "40px" }}>
          <Link href="/">
            <button className="primary-button warning-button">
              Retour Accueil
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}
