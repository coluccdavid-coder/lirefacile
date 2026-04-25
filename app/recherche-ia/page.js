"use client";
import { useState } from "react";
import Link from "next/link";
export default function RechercheIAPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
const fakeDatabase = {
    avc: [
      "Rééducation parole après AVC",
      "Exercices langage aphasie",
      "Mémoire et récupération cognitive",
      "Orthophonie AVC à domicile",
    ],
    dys: [
      "Lecture syllabique",
      "Confusion lettres b/d",
      "Rééducation dyslexie adulte",
      "Méthodes orthophoniques",
    ],
    memoire: [
      "Exercices mémoire douce",
      "Lecture thérapeutique",
      "Réactivation mémoire",
      "Attention cognitive",
    ],
  };
const searchIA = () => {
    if (!query) return;
setLoading(true);
setTimeout(() => {
      const lower = query.toLowerCase();
let data = [];
if (lower.includes("avc")) {
        data = fakeDatabase.avc;
      } else if (lower.includes("dys")) {
        data = fakeDatabase.dys;
      } else {
        data = fakeDatabase.memoire;
      }
setResults(data);
      setLoading(false);
    }, 1200);
  };
const saveKnowledge = (item) => {
    const saved = JSON.parse(
      localStorage.getItem("knowledgeBase")
    ) || [];
const updated = [...saved, item];
localStorage.setItem(
      "knowledgeBase",
      JSON.stringify(updated)
    );
alert("Ajouté à la mémoire IA");
  };
return (
    <div className="page-container">
      <div className="main-card fade-in">
<h1 className="main-title">
          Recherche IA Thérapeutique
        </h1>
<div className="assistant-box">
          <div className="assistant-avatar">🌐</div>
<div className="assistant-message">
            Recherche spécialisée pour enrichir LireFacile.
          </div>
        </div>
<div className="analysis-box">
          <div className="analysis-title">
            Rechercher
          </div>
<input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ex : AVC, dyslexie, mémoire"
            className="exercise-input"
          />
<button
            className="primary-button success-button"
            style={{ marginTop: "20px" }}
            onClick={searchIA}
          >
            Lancer recherche
          </button>
        </div>
<div className="analysis-box">
          <div className="analysis-title">
            Résultats
          </div>
{loading ? (
            <p>Recherche en cours...</p>
          ) : results.length === 0 ? (
            <p>Aucune recherche lancée.</p>
          ) : (
            results.map((result, index) => (
              <div
                key={index}
                className="analysis-card"
                style={{ marginBottom: "15px" }}
              >
                <div className="analysis-value">
                  {result}
                </div>
<button
                  className="primary-button"
                  style={{ marginTop: "15px" }}
                  onClick={() => saveKnowledge(result)}
                >
                  Ajouter à l’IA
                </button>
              </div>
            ))
          )}
        </div>

<div className="analysis-box">
          <div className="analysis-title">
            Ce que recherche l’IA
          </div>

<ul
            style={{
              fontSize: "18px",
              lineHeight: "2",
            }}
          >
            <li>Rééducation AVC</li>
            <li>Orthophonie</li>
            <li>Dyslexie</li>
            <li>Mémoire</li>
            <li>Lecture thérapeutique</li>
          </ul>
        </div>
<div
          className="button-row"
          style={{ justifyContent: "center" }}
        >
          <Link href="/bibliotheque-pdf">
            <button className="primary-button success-button">
              PDF IA
            </button>
          </Link>
<Link href="/historique">
            <button className="primary-button warning-button">
              Historique
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
