"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function DashboardPage() {
  const [profile, setProfile] = useState(null);
  const [history, setHistory] = useState([]);
  const [globalScore, setGlobalScore] = useState(0);
  const [recommendation, setRecommendation] = useState("");

useEffect(() => {
    const patient = JSON.parse(
      localStorage.getItem("patientProfile")
    );

const sessions = JSON.parse(
      localStorage.getItem("sessionHistory")
    ) || [];

const evaluation = JSON.parse(
      localStorage.getItem("evaluation")
    );

setProfile(patient);
    setHistory(sessions);

if (evaluation) {
      const values = Object.values(evaluation);

const average = Math.round(
        values.reduce((a, b) => a + b, 0) /
          values.length
      );

setGlobalScore(average);

if (average < 40) {
        setRecommendation(
          "Privilégier des exercices courts et beaucoup de repos."
        );
      } else if (average < 70) {
        setRecommendation(
          "Continuer les exercices réguliers avec progression douce."
        );
      } else {
        setRecommendation(
          "Très bon niveau cognitif, augmenter progressivement la difficulté."
        );
      }
    }
  }, []);

return (
    <div className="page-container">
      <div className="main-card fade-in">
        <h1 className="main-title">
          Tableau Cognitif IA
        </h1>

<div className="assistant-box">
          <div className="assistant-avatar">🧠</div>

<div className="assistant-message">
            L’IA résume votre évolution cognitive.
          </div>
        </div>

<div className="analysis-box">
          <div className="analysis-title">
            Score Cognitif Global
          </div>

<div
            style={{
              fontSize: "72px",
              fontWeight: "800",
              textAlign: "center",
              marginTop: "20px",
            }}
          >
            {globalScore}%
          </div>
        </div>

<div className="analysis-box">
          <div className="analysis-title">
            Résumé Patient
          </div>

<div className="analysis-grid">
            <div className="analysis-card">
              <div className="analysis-label">Âge</div>
              <div className="analysis-value">
                {profile?.age || "—"}
              </div>
            </div>

<div className="analysis-card">
              <div className="analysis-label">Pathologie</div>
              <div className="analysis-value">
                {profile?.pathology || "—"}
              </div>
            </div>

<div className="analysis-card">
              <div className="analysis-label">Fatigue</div>
              <div className="analysis-value">
                {profile?.fatigue || "—"}
              </div>
            </div>

<div className="analysis-card">
              <div className="analysis-label">Style</div>
              <div className="analysis-value">
                {profile?.learningStyle || "—"}
              </div>
            </div>
          </div>
        </div>

<div className="analysis-box">
          <div className="analysis-title">
            Recommandation IA
          </div>

<p
            style={{
              fontSize: "22px",
              lineHeight: "1.8",
              textAlign: "center",
            }}
          >
            {recommendation}
          </p>
        </div>

<div className="analysis-box">
          <div className="analysis-title">
            Historique Rapide
          </div>

{history.length === 0 ? (
            <p>Aucune séance enregistrée.</p>
          ) : (
            history.slice(-3).map((item, index) => (
              <div
                key={index}
                className="analysis-card"
                style={{ marginBottom: "12px" }}
              >
                <div className="analysis-label">
                  {item.date}
                </div>

<div className="analysis-value">
                  {item.score}%
                </div>
              </div>
            ))
          )}
        </div>

<div
          className="button-row"
          style={{ justifyContent: "center" }}
        >
          <Link href="/historique">
            <button className="primary-button success-button">
              Voir Historique
            </button>
          </Link>

<Link href="/exercices">
            <button className="primary-button warning-button">
              Continuer Exercices
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
