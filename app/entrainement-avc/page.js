"use client";
import { useEffect, useState } from "react";
export default function EntrainementAVC() {
  const [exercises, setExercises] = useState([]);
useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem("currentExercisePack")) || [];
setExercises(saved);
  }, []);
return (
    <div className="page-container">
      <div className="main-card">
        <h1 className="main-title">Programme IA</h1>
{exercises.map((exercise, index) => (
          <div
            key={index}
            className="analysis-card"
            style={{ marginBottom: "20px" }}
          >
            <div className="analysis-label">
              {exercise.type}
            </div>
<div className="analysis-value">
              {exercise.question}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

