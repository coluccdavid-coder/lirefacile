"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
export default function MemoireIAPage() {
  const [knowledge, setKnowledge] = useState([]);
  const [filter, setFilter] = useState("all");
useEffect(() => {
    const stored = JSON.parse(
      localStorage.getItem("knowledgeBase")
    ) || [];
setKnowledge(stored);
  }, []);
const removeItem = (index) => {
    const updated = knowledge.filter(
      (_, i) => i !== index
    );
setKnowledge(updated);
localStorage.setItem(
      "knowledgeBase",
      JSON.stringify(updated)
    );
  };
const clearAll = () => {
    setKnowledge([]);
localStorage.removeItem("knowledgeBase");
  };
const getFilteredKnowledge = () => {
    if (filter === "all") {
      return knowledge;
    }
return knowledge.filter((item) =>
      item.toLowerCase().includes(filter)
    );
  };
const filtered = getFilteredKnowledge();
return (
    <div className="page-container">
      <div className="main-card fade-in">
<h1 className="main-title">
          Mémoire IA
        </h1>
<div className="assistant-box">
          <div className="assistant-avatar">🧠</div>
<div className="assistant-message">
            La mémoire thérapeutique de LireFacile.
          </div>
        </div>
<div className="analysis-box">
          <div className="analysis-title">
            Filtrer
          </div>
<div className="button-row">
            <button
              className="primary-button"
              onClick={() => setFilter("all")}
            >
              Tout
            </button>
<button
              className="primary-button success-button"
              onClick={() => setFilter("avc")}
            >
              AVC
            </button>
<button
              className="primary-button warning-button"
              onClick={() => setFilter("dys")}
            >
              Dys
            </button>
<button
              className="primary-button"
              onClick={() => setFilter("memoire")}
            >
              Mémoire
            </button>
          </div>
        </div>
<div className="analysis-box">
          <div className="analysis-title">
            Connaissances enregistrées
          </div>
{filtered.length === 0 ? (
            <p>Aucune connaissance enregistrée.</p>
          ) : (
            filtered.map((item, index) => (
              <div
                key={index}
                className="analysis-card"
                style={{ marginBottom: "15px" }}
              >
                <div className="analysis-value">
                  {item}
                </div>
<button
                  className="primary-button warning-button"
                  style={{ marginTop: "15px" }}
                  onClick={() => removeItem(index)}
                >
                  Supprimer
                </button>
              </div>
            ))
          )}
        </div>
<div className="analysis-box">
          <div className="analysis-title">
            Résumé IA
          </div>
<div
            style={{
              fontSize: "18px",
              lineHeight: "2",
            }}
          >
            {knowledge.length === 0
              ? "La mémoire IA est vide."
              : `L’IA possède ${knowledge.length} connaissances thérapeutiques.`}
          </div>
        </div>

<div className="button-row">
          <button
            className="primary-button warning-button"
            onClick={clearAll}
          >
            Vider la mémoire
          </button>
        </div>
<div
          className="button-row"
          style={{ justifyContent: "center" }}
        >
          <Link href="/recherche-ia">
            <button className="primary-button success-button">
              Recherche IA
            </button>
          </Link>
<Link href="/bibliotheque-pdf">
            <button className="primary-button warning-button">
              PDF
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
