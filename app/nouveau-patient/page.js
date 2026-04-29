"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NouveauPatient() {
  const router = useRouter();

const [name, setName] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [speciality, setSpeciality] = useState("AVC");
  const [loading, setLoading] = useState(false);

const generateProgram = async () => {
    if (!name || !symptoms) {
      alert("Complète le nom et les symptômes.");
      return;
    }

setLoading(true);

try {
      const patient = {
        name,
        symptoms,
        speciality,
        createdAt: new Date().toISOString(),
      };

localStorage.setItem(
        "patientProfile",
        JSON.stringify(patient)
      );

const memory =
        JSON.parse(localStorage.getItem("iaMemory")) || [];

const response = await fetch("/api/build-ai-program", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          symptoms,
          speciality,
          memory,
        }),
      });

const data = await response.json();

if (!data.success) {
        alert("Erreur génération programme IA");
        setLoading(false);
        return;
      }

localStorage.setItem(
        "currentExercisePack",
        JSON.stringify(data.exercises)
      );

localStorage.setItem(
        "lastGeneratedProgram",
        JSON.stringify({
          patient,
          exercises: data.exercises,
        })
      );

alert("Programme IA généré ✅");

if (speciality === "DYS") {
        router.push("/programme-dys");
      } else {
        router.push("/programme-avc");
      }
    } catch (error) {
      console.error(error);
      alert("Erreur IA.");
    }

setLoading(false);
  };

return (
    <div className="page-container">
      <div className="main-card">
        <h1 className="main-title">Nouveau Patient</h1>

<div className="assistant-box">
          <div className="assistant-avatar">🧠</div>

<div className="assistant-message">
            Décris les symptômes pour que l’IA construise un programme.
          </div>
        </div>

<div className="analysis-box">
          <div className="analysis-title">Nom du patient</div>

<input
            className="exercise-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex : Jean Dupont"
          />
        </div>

<div className="analysis-box">
          <div className="analysis-title">Type de programme</div>

<select
            className="exercise-input"
            value={speciality}
            onChange={(e) => setSpeciality(e.target.value)}
          >
            <option value="AVC">AVC / Aphasie</option>
            <option value="DYS">Dyslexie / Lecture</option>
          </select>
        </div>

<div className="analysis-box">
          <div className="analysis-title">Symptômes</div>

<textarea
            className="exercise-input"
            rows={6}
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="Ex : difficultés à parler, mémoire faible, lecture lente..."
          />
        </div>

<div className="analysis-box">
          <div className="analysis-title">Ce que l’IA va utiliser</div>

<div style={{ lineHeight: "1.9" }}>
            • Symptômes du patient<br />
            • Tous les PDF enregistrés<br />
            • Mémoire IA cumulée<br />
            • Exercices déjà connus<br />
            • Construction automatique du programme
          </div>
        </div>

<div className="button-row">
          <button
            className="primary-button success-button"
            onClick={generateProgram}
            disabled={loading}
          >
            {loading
              ? "Construction IA..."
              : "Générer Programme IA"}
          </button>
        </div>
      </div>
    </div>
  );
}
