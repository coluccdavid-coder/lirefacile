"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ObjectifsPage() {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState("");
  const [completedCount, setCompletedCount] = useState(0);

useEffect(() => {
    const storedGoals = JSON.parse(
      localStorage.getItem("goals")
    ) || [];

setGoals(storedGoals);

const done = storedGoals.filter(
      (goal) => goal.completed
    ).length;

setCompletedCount(done);
  }, []);

const addGoal = () => {
    if (!newGoal.trim()) return;

const updatedGoals = [
      ...goals,
      {
        text: newGoal,
        completed: false,
        createdAt: new Date().toLocaleDateString(),
      },
    ];

setGoals(updatedGoals);

localStorage.setItem(
      "goals",
      JSON.stringify(updatedGoals)
    );

setNewGoal("");
  };

const toggleGoal = (index) => {
    const updatedGoals = [...goals];

updatedGoals[index].completed =
      !updatedGoals[index].completed;

setGoals(updatedGoals);

localStorage.setItem(
      "goals",
      JSON.stringify(updatedGoals)
    );

const done = updatedGoals.filter(
      (goal) => goal.completed
    ).length;

setCompletedCount(done);
  };

return (
    <div className="page-container">
      <div className="main-card fade-in">
        <h1 className="main-title">
          Objectifs Cognitifs
        </h1>

<div className="assistant-box">
          <div className="assistant-avatar">🎯</div>

<div className="assistant-message">
            L’IA vous aide à progresser chaque jour.
          </div>
        </div>

<div className="analysis-box">
          <div className="analysis-grid">

<div className="analysis-card">
              <div className="analysis-label">
                Objectifs
              </div>

<div className="analysis-value">
                {goals.length}
              </div>
            </div>

<div className="analysis-card">
              <div className="analysis-label">
                Terminés
              </div>

<div className="analysis-value">
                {completedCount}
              </div>
            </div>

</div>
        </div>

<div className="exercise-card">
          <div className="exercise-title">
            Ajouter un objectif
          </div>

<input
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
            placeholder="Ex : Lire 10 minutes par jour"
            className="exercise-input"
          />

<div style={{ marginTop: "20px" }}>
            <button
              className="primary-button success-button"
              onClick={addGoal}
            >
              Ajouter
            </button>
          </div>
        </div>

<div className="analysis-box">
          <div className="analysis-title">
            Agenda Cognitif
          </div>

{goals.length === 0 ? (
            <p>Aucun objectif créé.</p>
          ) : (
            goals.map((goal, index) => (
              <div
                key={index}
                className="analysis-card"
                style={{ marginBottom: "15px" }}
              >
                <div className="analysis-label">
                  {goal.createdAt}
                </div>

<div
                  style={{
                    fontSize: "22px",
                    marginBottom: "12px",
                  }}
                >
                  {goal.text}
                </div>

<button
                  className="primary-button"
                  onClick={() => toggleGoal(index)}
                >
                  {goal.completed
                    ? "Terminé"
                    : "Marquer fait"}
                </button>
              </div>
            ))
          )}
        </div>

<div
          className="button-row"
          style={{ justifyContent: "center" }}
        >
          <Link href="/coach">
            <button className="primary-button success-button">
              Coach IA
            </button>
          </Link>

<Link href="/dashboard">
            <button className="primary-button warning-button">
              Dashboard
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
