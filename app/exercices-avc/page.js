"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ExercicesAVCPage() {
  const [pdfs, setPdfs] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem("pdfLibrary")) || [];

    setPdfs(saved);
  }, []);

  return (
    <div className="page-container">
      <div className="main-card">
        <h1 className="main-title">Exercices AVC</h1>

        <h2 style={{ marginBottom: "30px" }}>
          Exercices générés depuis PDF
        </h2>

        {pdfs.length === 0 ? (
          <p>Aucun PDF trouvé.</p>
        ) : (
          pdfs.map((pdf, index) => (
            <div
              key={index}
              className="analysis-card"
              style={{ marginBottom: "30px" }}
            >
              <h3>{pdf.name}</h3>

              <p>Exercice IA basé sur ce document.</p>

              <button
                className="primary-button success-button"
                onClick={() =>
                  router.push(
                    `/exercice/${encodeURIComponent(pdf.name)}`
                  )
                }
              >
                Lancer exercice
              </button>
            </div>
          ))
        )}

        <div style={{ marginTop: "40px" }}>
          <button
            className="primary-button blue-button"
            onClick={() => router.push("/")}
          >
            Retour Accueil
          </button>
        </div>
      </div>
    </div>
  );
}
