"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
export default function RecommandationsIAPage() {
  const [recommendations, setRecommendations] = useState([]);
  const [patientProfile, setPatientProfile] = useState(null);
useEffect(() => {
    const evaluation = JSON.parse(
      localStorage.getItem("evaluation")
    );
const knowledge = JSON.parse(
      localStorage.getItem("knowledgeBase")
    ) || [];
const generated = [];
if (evaluation) {
      if (evaluation.dyslexia) {
        generated.push(
          "Activer police Dyslexie"
        );
generated.push(
          "Réduire taille des paragraphes"
        );
generated.push(
          "Utiliser lecture syllabique"
        );
      }
if (evaluation.memory) {
        generated.push(
          "Ajouter exercices mémoire"
        );
generated.push(
          "Lecture thérapeutique courte"
        );
      }
if (evaluation.attention) {
        generated.push(
          "Séances plus courtes"
        );
generated.push(
          "Pause toutes les 5 minutes"
        );
      }
    }
knowledge.forEach((item) => {
      if (
        item.toLowerCase().includes("avc")
      ) {
        generated.push(
          "Ajouter stimulation langage AVC"
        );
      }
if (
        item.toLowerCase().includes("dys")
      ) {
        generated.push(
          "Ajouter lecture progressive"
        );
      }
    });
const unique = [...new Set(generated)];
setRecommendations(unique);
    setPatientProfile(evaluation);
  }, []);
return (
    <div className="page-container">
      <div className="main-card fade-in">
<h1 className="main-title">
          Recommandations IA
        </h1>
<div className="assistant-box">
          <div className="assistant-avatar">🤖</div>
<div className="assistant-message">
            Conseils thérapeutiques générés automatiquement.
          </div>
        </div>
<div className="analysis-box">
          <div className="analysis-title">
            Profil détecté
          </div>
{patientProfile ? (
            <div
              style={{
                fontSize: "18px",
                lineHeight: "2",
              }}
            >
              <div>
                Mémoire : {patientProfile.memory ? "Oui" : "Non"}
              </div>
<div>
                Attention : {patientProfile.attention ? "Oui" : "Non"}
              </div>
<div>
                Dyslexie : {patientProfile.dyslexia ? "Oui" : "Non"}
              </div>
<div>
                Lecture : {patientProfile.reading ? "Oui" : "Non"}
              </div>
            </div>
          ) : (
            <p>Aucun profil disponible.</p>
          )}
        </div>
<div className="analysis-box">
          <div className="analysis-title">
            Suggestions IA
          </div>
{recommendations.length === 0 ? (
            <p>Aucune recommandation disponible.</p>
          ) : (
            recommendations.map((item, index) => (
              <div
                key={index}
                className="analysis-card"
                style={{ marginBottom: "15px" }}
              >
                <div className="analysis-value">
                  {item}
                </div>
              </div>
            ))
          )}
        </div>
<div className="analysis-box">
          <div className="analysis-title">
            Objectif
          </div>
<div
            style={{
              fontSize: "18px",
              lineHeight: "2",
            }}
          >
            L’IA adapte progressivement les exercices selon le patient.
          </div>
        </div>

<div
          className="button-row"
          style={{ justifyContent: "center" }}
        >
          <Link href="/memoire-ia">
            <button className="primary-button success-button">
              Mémoire IA
            </button>
          </Link>
<Link href="/profil">
            <button className="primary-button warning-button">
              Profil
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

