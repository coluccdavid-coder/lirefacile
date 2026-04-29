"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
export default function BibliothequePDFPage() {
  const [files, setFiles] = useState([]);
  const [summary, setSummary] = useState("");
  const [iaKnowledge, setIaKnowledge] = useState([]);
  const [generatedExercises, setGeneratedExercises] = useState([]);
useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("pdfLibrary")) || [];
    const memory = JSON.parse(localStorage.getItem("iaMemory")) || [];
    const exercises =
      JSON.parse(localStorage.getItem("generatedExercises")) || [];
setFiles(saved);
    setIaKnowledge(memory);
    setGeneratedExercises(exercises);
  }, []);
const detectSpeciality = (name) => {
    const lower = name.toLowerCase();
if (lower.includes("avc") || lower.includes("aphasie")) {
      return "Rééducation AVC";
    }
if (lower.includes("dys") || lower.includes("lecture")) {
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
const buildExercisesFromText = (text, speciality) => {
    const exercises = [];
const cleanText = text
      .replace(/\n/g, " ")
      .split(".")
      .filter((line) => line.length > 20)
      .slice(0, 8);
cleanText.forEach((sentence, index) => {
      if (speciality.includes("AVC")) {
        exercises.push({
          type: "langage",
          question: `Répète : ${sentence.substring(0, 80)}`,
        });
exercises.push({
          type: "mémoire",
          question: `Retiens cette phrase : ${sentence.substring(
            0,
            50
          )}`,
        });
      }
if (speciality.includes("Dys")) {
        exercises.push({
          type: "lecture",
          question: `Lis ce texte : ${sentence.substring(0, 70)}`,
        });
exercises.push({
          type: "orthographe",
          question: `Écris ce mot : ${sentence
            .split(" ")
            .slice(0, 4)
            .join(" ")}`,
        });
      }
if (speciality.includes("Mémoire")) {
        exercises.push({
          type: "mémoire",
          question: `Mémorise cette phrase : ${sentence.substring(
            0,
            60
          )}`,
        });
      }
    });
return exercises;
  };
const fetchInternetKnowledge = async (speciality) => {
    try {
      const response = await fetch("/api/web-knowledge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ speciality }),
      });
const data = await response.json();
if (data.success) {
        return data.exercises.map((item) => ({
          type: "internet",
          question: item,
        }));
      }
return [];
    } catch (error) {
      console.error(error);
      return [];
    }
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
      localStorage.setItem(
        "pdfLibrary",
        JSON.stringify(updatedFiles)
      );
const existingMemory =
        JSON.parse(localStorage.getItem("iaMemory")) || [];
const memoryEntry = {
        name: file.name,
        speciality,
        extractedText: data.text,
        addedAt: new Date().toISOString(),
      };
const updatedMemory = [...existingMemory, memoryEntry];
localStorage.setItem(
        "iaMemory",
        JSON.stringify(updatedMemory)
      );
setIaKnowledge(updatedMemory);
const aiExercises = buildExercisesFromText(
        data.text,
        speciality
      );
const internetExercises =
        await fetchInternetKnowledge(speciality);
const mergedExercises = [
        ...generatedExercises,
        ...aiExercises,
        ...internetExercises,
      ];
setGeneratedExercises(mergedExercises);
localStorage.setItem(
        "generatedExercises",
        JSON.stringify(mergedExercises)
      );
localStorage.setItem(
        "currentExercisePack",
        JSON.stringify(mergedExercises)
      );
setSummary(`
PDF ajouté avec succès.
Nom : ${file.name}
Spécialité : ${speciality}
Mémoire IA enrichie.
${aiExercises.length} exercices IA générés.
${internetExercises.length} exercices Internet ajoutés.
Programme thérapeutique fusionné prêt.
      `);
    } catch (error) {
      console.error(error);
      setSummary("Erreur IA.");
    }
  };
const deletePDF = (index) => {
    const updated = files.filter((_, i) => i !== index);
setFiles(updated);
localStorage.setItem(
      "pdfLibrary",
      JSON.stringify(updated)
    );
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
          <div className="analysis-title">
            Ajouter un PDF
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
            <p>Aucun PDF enregistré.</p>
          ) : (
            files.map((file, index) => (
              <div
                key={index}
                className="analysis-card"
                style={{ marginBottom: "16px" }}
              >
                <div>{file.name}</div>
                <div>{file.speciality}</div>
                <div>{file.size} KB</div>
                <div>{file.date}</div>

<button
                  className="primary-button warning-button"
                  onClick={() => deletePDF(index)}
                  style={{ marginTop: "10px" }}
                >
                  Supprimer
                </button>
              </div>
            ))
          )}
        </div>

<div className="analysis-box">
          <div className="analysis-title">Mémoire IA</div>

{iaKnowledge.length === 0 ? (
            <p>Aucune mémoire IA.</p>
          ) : (
            iaKnowledge.map((item, index) => (
              <div
                key={index}
                className="analysis-card"
                style={{ marginBottom: "14px" }}
              >
                <div>{item.name}</div>
                <div>{item.speciality}</div>
              </div>
            ))
          )}
        </div>

<div className="analysis-box">
          <div className="analysis-title">
            Exercices générés
          </div>

{generatedExercises.length === 0 ? (
            <p>Aucun exercice généré.</p>
          ) : (
            generatedExercises.slice(-10).map((exercise, index) => (
              <div
                key={index}
                className="analysis-card"
                style={{ marginBottom: "14px" }}
              >
                <div>{exercise.type}</div>
                <div>{exercise.question}</div>
              </div>
            ))
          )}
        </div>

<div className="analysis-box">
          <div className="analysis-title">Résumé IA</div>

<div style={{ whiteSpace: "pre-line" }}>
            {summary}
          </div>
        </div>

<div className="button-row">
          <Link href="/nouveau-patient">
            <button className="primary-button success-button">
              Nouveau Patient
            </button>
          </Link>

<Link href="/exercices-avc">
            <button className="primary-button blue-button">
              Exercices AVC
            </button>
          </Link>

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
