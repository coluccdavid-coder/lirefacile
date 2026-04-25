"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
export default function GenerationExercicesPage() {
  const [generatedExercises, setGeneratedExercises] = useState([]);
  const [profile, setProfile] = useState(null);
useEffect(() => {
    const evaluation = JSON.parse(
      localStorage.getItem("evaluation")
    );
const knowledge = JSON.parse(
      localStorage.getItem("knowledgeBase")
    ) || [];
const generated = [];
if (evaluation) {
      if (evaluation.memory) {
        generated.push({
          type: "Mémoire",
          title: "Retenir 3 mots",
          level: "Facile",
        });
generated.push({
          type: "Mémoire",
          title: "Lecture souvenir",
          level: "Moyen",
        });
      }
if (evaluation.dyslexia) {
        generated.push({
          type: "Dys",
          title: "Lecture syllabique",
          level: "Facile",
        });
generated.push({
          type: "Dys",
          title: "Reconnaître mot correct",
          level: "Moyen",
        });
      }
if (evaluation.attention) {
        generated.push({
          type: "Attention",
          title: "Trouver mot caché",
          level: "Facile",
        });
      }
    }
knowledge.forEach((item) => {
      if (
        item.toLowerCase().includes("avc")
      ) {
        generated.push({
          type: "AVC",
          title: "Nommer image",
          level: "Progressif",
        });
      }
if (
        item.toLowerCase().includes("lecture")
      ) {
        generated.push({
          type: "Lecture",
          title: "Lecture guidée",
          level: "Douce",
        });
      }
    });
setGeneratedExercises(generated);
    setProfile(evaluation);
  }, []);
return (
    <div className="page-container">
      <div className="main-card fade-in">
<h1 className="main-title">
          Exercices Générés IA
        </h1>
<div className="assistant-box">
          <div className="assistant-avatar">⚙️</div>
<div className="assistant-message">
            L’IA crée des exercices selon le patient.
          </div>
        </div>

<div className="analysis-box">
          <div className="analysis-title">
            Profil utilisé
          </div>
{profile ? (
            <div
              style={{
                fontSize: "18px",
                lineHeight: "2",
              }}
            >
              <div>
                Mémoire : {profile.memory ? "Oui" : "Non"}
              </div>
<div>
                Attention : {profile.attention ? "Oui" : "Non"}
              </div>
<div>
                Dyslexie : {profile.dyslexia ? "Oui" : "Non"}
              </div>
            </div>
          ) : (
            <p>Aucun profil trouvé.</p>
          )}
        </div>
<div className="analysis-box">
          <div className="analysis-title">
            Exercices proposés
          </div>
{generatedExercises.length === 0 ? (
            <p>Aucun exercice généré.</p>
          ) : (
            generatedExercises.map((exercise, index) => (
              <div
                key={index}
                className="analysis-card"
                style={{ marginBottom: "15px" }}
              >
                <div className="analysis-label">
                  {exercise.type}
                </div>
<div className="analysis-value">
                  {exercise.title}
                </div>
<div style={{ marginTop: "10px" }}>
                  Niveau : {exercise.level}
                </div>
              </div>
            ))
          )}
        </div>
<div className="analysis-box">
          <div className="analysis-title">
            Objectif IA
          </div>
<div
            style={{
              fontSize: "18px",
              lineHeight: "2",
            }}
          >
            Générer automatiquement un parcours thérapeutique.
          </div>
        </div>
<div
          className="button-row"
          style={{ justifyContent: "center" }}
        >
          <Link href="/recommandations-ia">
            <button className="primary-button success-button">
              Recommandations
            </button>
          </Link>
<Link href="/orthophonie">
            <button className="primary-button warning-button">
              Exercices
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
