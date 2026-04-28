"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function HomePage() {
  const router = useRouter();
  const fileInputRef = useRef(null);

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

      alert("PDF ajouté à la mémoire IA ✅");
      console.log(data);
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
            Bienvenue. L’IA analyse le profil et adapte les exercices.
          </div>
        </div>

        <div className="cards-grid">

          <div
            className="feature-card"
            onClick={() => router.push("/evaluation-complete")}
          >
            <h3>Évaluation IA</h3>
            <p>Lance la vraie évaluation cognitive.</p>
          </div>

          <div
            className="feature-card"
            onClick={() => router.push("/profil")}
          >
            <h3>Profil Cognitif</h3>
            <p>Consulte le profil généré.</p>
          </div>

          <div
            className="feature-card"
            onClick={() => router.push("/exercices")}
          >
            <h3>Exercices</h3>
            <p>Lance les exercices adaptés.</p>
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

