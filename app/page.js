"use client";

import { useRouter } from "next/navigation";
import { useRef, useState, useEffect } from "react";

export default function HomePage() {
  const router = useRouter();
  const fileInputRef = useRef(null);

const [pdfCount, setPdfCount] = useState(0);
  const [knowledgeCount, setKnowledgeCount] = useState(0);

useEffect(() => {
    const pdfs = JSON.parse(localStorage.getItem("pdfLibrary")) || [];
    const memory = JSON.parse(localStorage.getItem("iaMemory")) || [];

setPdfCount(pdfs.length);
    setKnowledgeCount(memory.length);
  }, []);

const handleUpload = async (e) => {
    const file = e.target.files[0];

if (!file) return;

const formData = new FormData();
    formData.append("file", file);

try {
      const res = await fetch("/api/upload-pdf", {
        method: "POST",
        body: formData,
      });

const data = await res.json();

if (!data.success) {
        alert("Erreur lecture PDF");
        return;
      }

const savedPDFs =
        JSON.parse(localStorage.getItem("pdfLibrary")) || [];

const newPDF = {
        name: file.name,
        size: Math.round(file.size / 1024),
        date: new Date().toLocaleDateString(),
      };

const updatedPDFs = [...savedPDFs, newPDF];

localStorage.setItem(
        "pdfLibrary",
        JSON.stringify(updatedPDFs)
      );

const memory =
        JSON.parse(localStorage.getItem("iaMemory")) || [];

const updatedMemory = [
        ...memory,
        {
          name: file.name,
          extractedText: data.text,
          addedAt: new Date().toISOString(),
        },
      ];

localStorage.setItem(
        "iaMemory",
        JSON.stringify(updatedMemory)
      );

setPdfCount(updatedPDFs.length);
      setKnowledgeCount(updatedMemory.length);

alert("PDF ajouté à la mémoire IA ✅");
    } catch (err) {
      console.error(err);
      alert("Erreur upload PDF");
    }
  };

return (
    <div className="page-container">
      <div className="main-card fade-in">
        <h1 className="main-title">LireFacile</h1>

<p className="subtitle">
          Plateforme IA pour AVC, Dyslexie, Rééducation Cognitive et Orthophonie.
        </p>

<div className="assistant-box">
          <div className="assistant-avatar">🧠</div>

<div className="assistant-message">
            Bienvenue. L’IA analyse les symptômes, apprend depuis les PDF
            et génère des exercices adaptés.
          </div>
        </div>

<div className="analysis-box" style={{ marginBottom: "30px" }}>
          <div className="analysis-title">État de la mémoire IA</div>

<div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "15px",
              flexWrap: "wrap",
              gap: "20px",
            }}
          >
            <div className="analysis-card">
              <div className="analysis-label">PDF enregistrés</div>
              <div className="analysis-value">{pdfCount}</div>
            </div>

<div className="analysis-card">
              <div className="analysis-label">Connaissances IA</div>
              <div className="analysis-value">{knowledgeCount}</div>
            </div>
          </div>
        </div>

<div className="cards-grid">
          <div
            className="feature-card"
            onClick={() => router.push("/evaluation-complete")}
          >
            <div className="card-icon">🧠</div>
            <h3>Évaluation IA</h3>
            <p>Lance une vraie évaluation cognitive complète.</p>
          </div>

<div
            className="feature-card"
            onClick={() => router.push("/profil")}
          >
            <div className="card-icon">📊</div>
            <h3>Profil Cognitif</h3>
            <p>Consulte le profil généré par l'IA.</p>
          </div>

<div
            className="feature-card"
            onClick={() => router.push("/exercices-avc")}
          >
            <div className="card-icon">🎯</div>
            <h3>Exercices AVC</h3>
            <p>Programme intelligent construit depuis les PDF.</p>
          </div>

<div
            className="feature-card"
            onClick={() => router.push("/exercices-dys")}
          >
            <div className="card-icon">📖</div>
            <h3>Exercices Dys</h3>
            <p>Lecture, orthographe et compréhension.</p>
          </div>

<div
            className="feature-card"
            onClick={() => router.push("/bibliotheque-pdf")}
          >
            <div className="card-icon">📚</div>
            <h3>Bibliothèque PDF IA</h3>
            <p>Ajoute des PDF thérapeutiques pour enrichir l’IA.</p>
          </div>

<div
            className="feature-card"
            onClick={() => router.push("/nouveau-patient")}
          >
            <div className="card-icon">👤</div>
            <h3>Nouveau Patient</h3>
            <p>Créer un programme personnalisé par symptômes.</p>
          </div>
        </div>

<div className="button-row">
          <button
            className="primary-button avc-button"
            onClick={() => router.push("/exercices-avc")}
          >
            Exercices AVC
          </button>

<button
            className="primary-button dys-button"
            onClick={() => router.push("/exercices-dys")}
          >
            Exercices Dys
          </button>

<button
            className="primary-button blue-button"
            onClick={() => router.push("/nouveau-patient")}
          >
            Nouveau Patient
          </button>

<button
            className="primary-button warning-button"
            onClick={() => fileInputRef.current.click()}
          >
            Ajouter PDF IA
          </button>
        </div>

<input
          type="file"
          accept=".pdf"
          ref={fileInputRef}
          onChange={handleUpload}
          style={{ display: "none" }}
        />
      </div>
    </div>
  );
}
