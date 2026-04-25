"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function BibliothequePDFPage() {
  const [files, setFiles] = useState([]);
  const [summary, setSummary] = useState("");
  const [iaKnowledge, setIaKnowledge] = useState([]);
  const [generatedExercises, setGeneratedExercises] = useState([]);

  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem("pdfLibrary")) || [];

    setFiles(saved);

    const knowledge = saved.map((pdf) => ({
      source: pdf.name,
      speciality: detectSpeciality(pdf.name),
    }));

    setIaKnowledge(knowledge);
  }, []);

  const detectSpeciality = (name) => {
    const lower = name.toLowerCase();

    if (
      lower.includes("avc") ||
      lower.includes("aphasie")
    ) {
      return "Rééducation AVC";
    }

    if (
      lower.includes("dys") ||
      lower.includes("lecture")
    ) {
      return "Dyslexie";
    }

    if (
      lower.includes("memoire") ||
      lower.includes("mémoire")
    ) {
      return "Mémoire Cognitive";
    }

    return "Orthophonie Générale";
  };

  const savePDF = async (event) => {
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

    const knowledge = updated.map((pdf) => ({
      source: pdf.name,
      speciality: detectSpeciality(pdf.name),
    }));

    setIaKnowledge(knowledge);

    await generateSummary(file.name);
  };

  const generateSummary = async (fileName) => {
    const fakeText = `
      mémoire langage attention orthophonie AVC dyslexie
    `;

    try {
      const response = await fetch("/api/analyse-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: fakeText,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setGeneratedExercises(data.exercises);

        const speciality = detectSpeciality(fileName);

        const generatedText = data.exercises
          .map(
            (ex) =>
              `• ${ex.type.toUpperCase()} → ${ex.question}`
          )
          .join("\n");

        setSummary(`
L’IA a analysé : ${fileName}

Spécialité détectée : ${speciality}

Exercices générés automatiquement :

${generatedText}
        `);
      }
    } catch (error) {
      setSummary("Erreur IA.");
    }
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

    const knowledge = updated.map((pdf) => ({
      source: pdf.name,
      speciality: detectSpeciality(pdf.name),
    }));

    setIaKnowledge(knowledge);
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

        <div className="analysis-box">
          <div className="analysis-title">
            Exercices générés par IA
          </div>

          {generatedExercises.length === 0 ? (
            <p>Aucun exercice généré.</p>
          ) : (
            generatedExercises.map((exercise, index) => (
              <div
                key={index}
                className="analysis-card"
                style={{ marginBottom: "16px" }}
              >
                <div className="analysis-label">
                  {exercise.type.toUpperCase()}
                </div>

                <div className="analysis-value">
                  {exercise.question}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="analysis-box">
          <div className="analysis-title">
            Connaissances IA Actives
          </div>

          {iaKnowledge.length === 0 ? (
            <p>Aucune connaissance IA chargée.</p>
          ) : (
            iaKnowledge.map((item, index) => (
              <div
                key={index}
                className="analysis-card"
                style={{ marginBottom: "14px" }}
              >
                <div className="analysis-label">
                  Source utilisée
                </div>

                <div className="analysis-value">
                  {item.source}
                </div>

                <div style={{ marginTop: "8px" }}>
                  Domaine : {item.speciality}
                </div>
              </div>
            ))
          )}
        </div>

        <div
          className="button-row"
          style={{ justifyContent: "center" }}
        >
          <Link href="/exercices-avc">
            <button className="primary-button success-button">
              Exercices AVC
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
