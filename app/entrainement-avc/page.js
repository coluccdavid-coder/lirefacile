"use client";
import { useEffect, useState } from "react";
export default function EntrainementAVCPage() {
  const [exercises, setExercises] = useState([]);
useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem("currentExercisePack")) || [];
setExercises(saved);
  }, []);
return (
    <div className="page-container">
      <div className="main-card">
        <h1 className="main-title">Programme Thérapeutique IA</h1>
{exercises.length === 0 ? (
          <p>Aucun exercice généré.</p>
        ) : (
          exercises.map((exercise, index) => (
            <div
              key={index}
              className="analysis-card"
              style={{ marginBottom: "20px" }}
            >
              <h3>{exercise.type}</h3>
              <p>{exercise.question}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
