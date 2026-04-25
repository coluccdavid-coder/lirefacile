"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function BibliothequePDFPage() {
  const [files, setFiles] = useState([]);
  const [summary, setSummary] = useState("");

useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem("pdfLibrary")
    ) || [];

setFiles(saved);
  }, []);

const savePDF = (event) => {
    const file = event.target.files?.[0];

if (!file) return;

const newPDF = {
      name: file.name,
      size: Math.round(file.size / 1024),
      date: new Date().toLocaleDateString(),
      type: "PDF thérapeutique",
    };

const updated = [...files, newPDF];

setFiles(updated);

localStorage.setItem(
      "pdfLibrary",
      JSON.stringify(updated)
    );

generateSummary(file.name);
  };

const generateSummary = (fileName) => {
    const text = `
L’IA a analysé : ${fileName}

Points potentiels :
- exercices mémoire
- rééducation langage
- lecture thérapeutique
- stimulation cognitive
- orthophonie
- récupération AVC
- dyslexie
    `;

setSummary(text);
  };

const deletePDF = (index) => {
    const updated = files.filter(
      (_, i) => i !== index
    );

setFiles(updated);

localStorage.setItem(
      "pdfLibrary",
      JSON.stringify(updated)
    );
  };

return (
    <div className="page-container">
      <div className="main-card fade-in">

<h1 className="main-title">
          Bibliothèque PDF IA
        </h1>

<div className="assistant-box">
          <div className="assistant-avatar">📚</div>

<div className="assistant-message">
            Ajoute des PDF thérapeutiques pour enrichir l’IA.
          </div>
        </div>

<div className="analysis-box">
          <div className="analysis-title">
            Ajouter un document
          </div>

<input
            type="file"
            accept="application/pdf"
            onChange={savePDF}
            className="exercise-input"
          />
        </div>

<div className="analysis-box">
          <div className="analysis-title">
            Documents enregistrés
          </div>

{files.length === 0 ? (
            <p>Aucun PDF ajouté.</p>
          ) : (
            files.map((file, index) => (
              <div
                key={index}
                className="analysis-card"
                style={{ marginBottom: "16px" }}
              >
                <div className="analysis-label">
                  {file.type}
                </div>

<div className="analysis-value">
                  {file.name}
                </div>

<div style={{ marginTop: "10px" }}>
                  {file.size} KB
                </div>

<div>
                  Ajouté : {file.date}
                </div>

<button
                  className="primary-button warning-button"
                  style={{ marginTop: "15px" }}
                  onClick={() => deletePDF(index)}
                >
                  Supprimer
                </button>
              </div>
            ))
          )}
        </div>

<div className="analysis-box">
          <div className="analysis-title">
            Analyse IA
          </div>

<div
            style={{
              whiteSpace: "pre-line",
              fontSize: "18px",
              lineHeight: "1.8",
            }}
          >
            {summary ||
              "Ajoute un PDF pour lancer une analyse."}
          </div>
        </div>

<div
          className="button-row"
          style={{ justifyContent: "center" }}
        >
          <Link href="/comprehension-auditive">
            <button className="primary-button success-button">
              Exercices
            </button>
          </Link>

<Link href="/historique">
            <button className="primary-button warning-button">
              Historique
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

