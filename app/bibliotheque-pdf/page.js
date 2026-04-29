"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
export default function BibliothequePDFPage() {
  const [files, setFiles] = useState([]);
  const [summary, setSummary] = useState("");
  const [iaKnowledge, setIaKnowledge] = useState([]);
useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("pdfLibrary")) || [];
    setFiles(saved);
const memory = JSON.parse(localStorage.getItem("iaMemory")) || [];
    setIaKnowledge(memory);
  }, []);
const detectSpeciality = (name) => {
    const lower = name.toLowerCase();
if (lower.includes("avc") || lower.includes("aphasie")) {
      return "Rééducation AVC";
    }
if (lower.includes("dys") || lower.includes("lecture")) {
      return "Dyslexie";
    }
if (lower.includes("memoire") || lower.includes("mémoire")) {
      return "Mémoire Cognitive";
    }
return "Orthophonie Générale";
  };
const savePDF = async (event) => {
    const file = event.target.files?.[0];
if (!file) return;
const maxSize = 4 * 1024 * 1024;
if (file.size > maxSize) {
      alert("PDF trop volumineux (max 4 MB)");
      return;
    }
const formData = new FormData();
    formData.append("file", file);
try {
      setSummary("Analyse IA en cours...");
const response = await fetch("/api/upload-pdf", {
        method: "POST",
        body: formData,
      });
const data = await response.json();
if (!data.success) {
        setSummary("Erreur lecture PDF");
        return;
      }
const speciality = detectSpeciality(file.name);
const newPDF = {
        name: file.name,
        size: Math.round(file.size / 1024),
        date: new Date().toLocaleDateString(),
        speciality,
      };
const updatedFiles = [...files, newPDF];
setFiles(updatedFiles);
      localStorage.setItem("pdfLibrary", JSON.stringify(updatedFiles));
const existingMemory =
        JSON.parse(localStorage.getItem("iaMemory")) || [];
const memoryEntry = {
        name: file.name,
        speciality,
        extractedText: data.text,
        addedAt: new Date().toISOString(),
      };
const updatedMemory = [...existingMemory, memoryEntry];
localStorage.setItem("iaMemory", JSON.stringify(updatedMemory));
setIaKnowledge(updatedMemory);
setSummary(`
PDF ajouté avec succès.
Nom : ${file.name}
Spécialité : ${speciality}
Le document est maintenant enregistré dans la mémoire IA.
      `);
    } catch (error) {
      console.error(error);
      setSummary("Erreur IA.");
    }
  };
const deletePDF = (index) => {
    const updated = files.filter((_, i) => i !== index);
setFiles(updated);
    localStorage.setItem("pdfLibrary", JSON.stringify(updated));
  };
return (
    <div className="page-container">
      <div className="main-card">
        <h1 className="main-title">Bibliothèque PDF IA</h1>
<div className="assistant-box">
          <div className="assistant-avatar">📚</div>
          <div className="assistant-message">
            Ajoute des PDF pour enrichir la mémoire thérapeutique.
          </div>
        </div>
<div className="analysis-box">
          <div className="analysis-title">Ajouter un PDF</div>
<input
            type="file"
            accept="application/pdf"
            onChange={savePDF}
            className="exercise-input"
          />
        </div>
<div className="analysis-box">
          <div className="analysis-title">Documents enregistrés</div>
{files.map((file, index) => (
            <div key={index} className="analysis-card">
              <div>{file.name}</div>
              <div>{file.speciality}</div>
<button
                className="primary-button warning-button"
                onClick={() => deletePDF(index)}
                style={{ marginTop: "10px" }}
              >
                Supprimer
              </button>
            </div>
          ))}
        </div>
<div className="analysis-box">
          <div className="analysis-title">Mémoire IA</div>
{iaKnowledge.map((item, index) => (
            <div key={index} className="analysis-card">
              <div>{item.name}</div>
              <div>{item.speciality}</div>
            </div>
          ))}
        </div>
<div className="analysis-box">
          <div className="analysis-title">Résumé IA</div>
<div style={{ whiteSpace: "pre-line" }}>{summary}</div>
        </div>
<div className="button-row">
          <Link href="/nouveau-patient">
            <button className="primary-button success-button">
              Nouveau Patient
            </button>
          </Link>
<Link href="/">
            <button className="primary-button blue-button">
              Retour Accueil
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

