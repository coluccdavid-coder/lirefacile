"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="page-container">
      <div className="main-card fade-in">
        <h1 className="main-title">LireFacile</h1>

        <p className="subtitle">
          Plateforme IA pour AVC, Dyslexie, Autisme et Rééducation Cognitive
        </p>

        <div className="assistant-box">
          <div className="assistant-avatar">🧠</div>
          <div className="assistant-message">
            Bienvenue. L’IA va analyser le profil et adapter les exercices.
          </div>
        </div>

        <div className="profile-grid">
          <Link href="/evaluation" className="profile-card">
            <h2>Évaluation IA</h2>
            <p>
              Analyse cognitive, mémoire, attention, lecture et dyslexie.
            </p>
          </Link>

          <Link href="/profil" className="profile-card">
            <h2>Profil Cognitif</h2>
            <p>
              Consulte les résultats et le profil généré par l’intelligence artificielle.
            </p>
          </Link>

          <Link href="/exercices" className="profile-card">
            <h2>Exercices</h2>
            <p>
              Lance les exercices adaptés automatiquement au profil.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
