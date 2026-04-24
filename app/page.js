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
          </div>
        </div>

        <div className="button-row" style={{ justifyContent: "center" }}>
          <Link href="/exercices">
            <button className="primary-button">
              Commencer les exercices
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
```

---

# À ajouter dans globals.css

Ajoute ce bloc tout en bas de ton fichier `globals.css`.

```css
/* ========================= */
/* ANALYSE COGNITIVE IA */
/* ========================= */

.analysis-box {
  margin-top: 35px;
  background: linear-gradient(135deg, #ffffff, #f8fbff);
  border-radius: 30px;
  padding: 35px;
  box-shadow: 0 12px 30px rgba(0,0,0,0.08);
  border: 1px solid #dbeafe;
}

.analysis-title {
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 25px;
  color: #1e3a8a;
  text-align: center;
}

.analysis-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.analysis-card {
  background: #f8fafc;
  border-radius: 22px;
  padding: 25px;
  text-align: center;
  transition: 0.25s ease;
  box-shadow: 0 6px 16px rgba(0,0,0,0.04);
}

.analysis-card:hover {
  transform: translateY(-4px);
}

.analysis-label {
  font-size: 15px;
  color: #64748b;
  margin-bottom: 10px;
}

.analysis-value {
  font-size: 34px;
  font-weight: 800;
  color: #0f172a;
}

@media (max-width: 768px) {
  .analysis-grid {
    grid-template-columns: 1fr;
  }
}
