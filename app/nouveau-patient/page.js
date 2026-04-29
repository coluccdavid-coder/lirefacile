"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NouveauPatient() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [speciality, setSpeciality] = useState("AVC");
  const [loading, setLoading] = useState(false);

  const buildLocalProgram = (
    symptoms,
    speciality,
    memory
  ) => {
    const exercises = [];

    const lowerSymptoms = symptoms.toLowerCase();

    memory.forEach((entry) => {
      const text = entry.extractedText || "";

      const chunks = text
        .replace(/\n/g, " ")
        .split(".")
        .filter((line) => line.trim().length > 30)
        .slice(0, 10);

      chunks.forEach((chunk) => {
        const clean = chunk.trim();

        if (speciality === "AVC") {
          if (
            lowerSymptoms.includes("parler") ||
            lowerSymptoms.includes("aphasie")
          ) {
            exercises.push({
              type: "langage",
              question: `Répète : ${clean.substring(0, 80)}`,
            });
          }

          if (
            lowerSymptoms.includes("mémoire")
          ) {
            exercises.push({
              type: "mémoire",
              question: `Retiens : ${clean.substring(0, 70)}`,
            });
          }

          exercises.push({
            type: "compréhension",
            question: `Explique : ${clean.substring(0, 90)}`,
          });
        }

        if (speciality === "DYS") {
          exercises.push({
            type: "lecture",
            question: `Lis : ${clean.substring(0, 70)}`,
          });

          exercises.push({
            type: "orthographe",
            question: `Recopie : ${clean
              .split(" ")
              .slice(0, 6)
              .join(" ")}`,
          });
        }
      });
    });

    const uniqueExercises = exercises.filter(
      (exercise, index, self) =>
        index ===
        self.findIndex(
          (e) => e.question === exercise.question
        )
    );

    return uniqueExercises;
  };

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

      let exercises = [];

      // ==========================
      // Tentative API IA
      // ==========================

      try {
        const response = await fetch(
          "/api/build-ai-program",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              symptoms,
              speciality,
              memory,
            }),
          }
        );

        const data = await response.json();

        if (data.success && data.exercises) {
          exercises = data.exercises;
        }
      } catch (apiError) {
        console.log("Fallback IA locale");
      }

      // ==========================
      // FALLBACK LOCAL
      // ==========================

      if (exercises.length === 0) {
        exercises = buildLocalProgram(
          symptoms,
          speciality,
          memory
        );
      }

      if (exercises.length === 0) {
        alert(
          "Aucun exercice trouvé. Ajoute plus de PDF."
        );
        setLoading(false);
        return;
      }

      localStorage.setItem(
        "currentExercisePack",
        JSON.stringify(exercises)
      );

      localStorage.setItem(
        "lastGeneratedProgram",
        JSON.stringify({
          patient,
          exercises,
        })
      );

      alert(
        `${exercises.length} exercices générés ✅`
      );

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
        <h1 className="main-title">
          Nouveau Patient
        </h1>

        <div className="assistant-box">
          <div className="assistant-avatar">🧠</div>

          <div className="assistant-message">
            Décris les symptômes pour que l’IA construise un programme personnalisé.
          </div>
        </div>

        <div className="analysis-box">
          <div className="analysis-title">
            Nom du patient
          </div>

          <input
            className="exercise-input"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            placeholder="Ex : Jean Dupont"
          />
        </div>

        <div className="analysis-box">
          <div className="analysis-title">
            Type de programme
          </div>

          <select
            className="exercise-input"
            value={speciality}
            onChange={(e) =>
              setSpeciality(e.target.value)
            }
          >
            <option value="AVC">
              AVC / Aphasie
            </option>

            <option value="DYS">
              Dyslexie / Lecture
            </option>
          </select>
        </div>

        <div className="analysis-box">
          <div className="analysis-title">
            Symptômes
          </div>

          <textarea
            className="exercise-input"
            rows={6}
            value={symptoms}
            onChange={(e) =>
              setSymptoms(e.target.value)
            }
            placeholder="Ex : difficultés à parler, mémoire faible, lecture lente..."
          />
        </div>

        <div className="analysis-box">
          <div className="analysis-title">
            Ce que l’IA utilise
          </div>

          <div style={{ lineHeight: "1.9" }}>
            • Symptômes du patient
            <br />
            • PDF thérapeutiques
            <br />
            • Mémoire IA cumulée
            <br />
            • Exercices existants
            <br />
            • Fusion intelligente
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
