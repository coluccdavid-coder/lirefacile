"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProfilPage() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("evaluation"));

    if (!data) {
      setProfile({
        memory: 50,
        attention: 50,
        dyslexiaRisk: 50,
        reading: 50,
      });
      return;
    }

    const cognitiveProfile = {
      memory: data.memory ? 70 : 40,
      attention: data.attention ? 60 : 80,
      dyslexiaRisk: data.dyslexia ? 80 : 20,
      reading: data.reading ? 55 : 85,
    };

    setProfile(cognitiveProfile);
  }, []);

  if (!profile) {
    return (
      <div className="page-container">
        <div className="main-card">
          <p>Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="main-card fade-in">
        <h1 className="main-title">Profil Cognitif IA</h1>

        <div className="analysis-box">
          <div className="analysis-title">
            Analyse Cognitive IA
          </div>

          <div className="analysis-grid">
            <div className="analysis-card">
              <div className="analysis-label">Mémoire</div>
              <div className="analysis-value">{profile.memory}%</div>
            </div>

            <div className="analysis-card">
              <div className="analysis-label">Attention</div>
              <div className="analysis-value">{profile.attention}%</div>
            </div>

            <div className="analysis-card">
              <div className="analysis-label">Risque Dys</div>
              <div className="analysis-value">{profile.dyslexiaRisk}%</div>
            </div>

            <div className="analysis-card">
              <div className="analysis-label">Lecture</div>
              <div className="analysis-value">{profile.reading}%</div>
            </div>
          </div>
        </div>

        <div className="assistant-box">
          <div className="assistant-avatar">🧠</div>
          <div className="assistant-message">
            L'IA analyse ton profil et adapte automatiquement les exercices.
}
