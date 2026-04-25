"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
export default function JournalPage() {
  const [entries, setEntries] = useState([]);
  const [text, setText] = useState("");
  const [tag, setTag] = useState("Observation");
useEffect(() => {
    const stored = JSON.parse(
      localStorage.getItem("journalEntries")
    ) || [];
setEntries(stored);
  }, []);
const saveEntry = () => {
    if (!text.trim()) return;
const newEntry = {
      date: new Date().toLocaleDateString(),
      text,
      tag,
    };
const updated = [newEntry, ...entries];
setEntries(updated);
localStorage.setItem(
      "journalEntries",
      JSON.stringify(updated)
    );
setText("");
    setTag("Observation");
  };
const tagColor = (type) => {
    if (type === "Observation") return "#3b82f6";
    if (type === "Fatigue") return "#f59e0b";
    if (type === "Progrès") return "#22c55e";
    if (type === "Alerte") return "#ef4444";
return "#64748b";
  };
return (
    <div className="page-container">
      <div className="main-card fade-in">
        <h1 className="main-title">
          Journal Cognitif
        </h1>
<div className="assistant-box">
          <div className="assistant-avatar">📖</div>
<div className="assistant-message">
            Gardez une mémoire thérapeutique du patient.
          </div>
        </div>
<div className="exercise-card">
          <div className="exercise-title">
            Nouvelle note
          </div>
<select
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            className="exercise-input"
            style={{ marginBottom: "20px" }}
          >
            <option>Observation</option>
            <option>Fatigue</option>
            <option>Progrès</option>
            <option>Alerte</option>
          </select>
<textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Écrire une note..."
            className="exercise-input"
            style={{ minHeight: "140px" }}
          />
<div style={{ marginTop: "20px" }}>
            <button
              className="primary-button success-button"
              onClick={saveEntry}
            >
              Sauvegarder
            </button>
          </div>
        </div>
<div className="analysis-box">
          <div className="analysis-title">
            Historique des notes
          </div>
{entries.length === 0 ? (
            <p>Aucune note enregistrée.</p>
          ) : (
            entries.map((entry, index) => (
              <div
                key={index}
                className="analysis-card"
                style={{
                  marginBottom: "18px",
                  borderLeft: `8px solid ${tagColor(
                    entry.tag
                  )}`,
                }}
              >
                <div className="analysis-label">
                  {entry.date}
                </div>
<div className="analysis-value">
                  {entry.tag}
                </div>
<div style={{ marginTop: "12px" }}>
                  {entry.text}
                </div>
              </div>
            ))
          )}
        </div>
<div className="analysis-box">
          <div className="analysis-title">
            Utilité Thérapeutique
          </div>
<ul
            style={{
              fontSize: "20px",
              lineHeight: "2.1",
            }}
          >
            <li>Suivi quotidien</li>
            <li>Observation clinique</li>
            <li>Historique des comportements</li>
            <li>Évolution cognitive</li>
            <li>Communication thérapeute</li>
          </ul>
        </div>
<div
          className="button-row"
          style={{ justifyContent: "center" }}
        >
          <Link href="/timeline">
            <button className="primary-button success-button">
              Timeline
            </button>
          </Link>
<Link href="/centre">
            <button className="primary-button warning-button">
              Centre Thérapeute
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
