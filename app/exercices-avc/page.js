"use client";

import { useRouter } from "next/navigation";

export default function ExercicesAVCPage() {
  const router = useRouter();

  return (
    <div className="page-container">
      <div className="main-card fade-in">

        <h1 className="main-title">
          Exercices AVC
        </h1>

        <div className="assistant-box">
          <div className="assistant-avatar">🧠</div>

          <div className="assistant-message">
            Rééducation langage, mémoire et orthophonie post-AVC.
          </div>
        </div>

        <div className="cards-grid">

          <div className="feature-card">
            <h3>Langage</h3>
            <p>Reconstruction de phrases.</p>

            <button
              className="primary-button"
              onClick={() => router.push("/langage-avc")}
            >
              Commencer
            </button>
          </div>

          <div className="feature-card">
            <h3>Mémoire</h3>
            <p>Réactivation cognitive progressive.</p>

            <button
              className="primary-button success-button"
              onClick={() => router.push("/memoire-avc")}
            >
              Commencer
            </button>
          </div>

          <div className="feature-card">
            <h3>Prononciation</h3>
            <p>Travail vocal et répétition.</p>

            <button
              className="primary-button warning-button"
              onClick={() => router.push("/prononciation-avc")}
            >
              Commencer
            </button>
          </div>

        </div>

        <div
          className="button-row"
          style={{ justifyContent: "center", marginTop: "40px" }}
        >
          <button
            className="primary-button"
            onClick={() => router.push("/")}
          >
            Retour Accueil
          </button>
        </div>

      </div>
    </div>
  );
}
