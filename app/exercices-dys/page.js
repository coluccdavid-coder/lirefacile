"use client";
export default function ExercicesDysPage() {
  return (
    <div className="page-container">
      <div className="main-card fade-in">
        <h1 className="main-title">Exercices Dys</h1>
<div className="assistant-box">
          <div className="assistant-avatar">🧠</div>
          <div className="assistant-message">
            Exercices adaptés à la dyslexie et à la lecture.
          </div>
        </div>
<div className="cards-grid">
          <div className="feature-card">
            <h3>Lecture</h3>
            <p>Reconnaissance des mots.</p>
          </div>
<div className="feature-card">
            <h3>Orthographe</h3>
            <p>Correction et écriture.</p>
          </div>
<div className="feature-card">
            <h3>Compréhension</h3>
            <p>Exercices de logique et texte.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
