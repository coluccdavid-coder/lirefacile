"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AvatarPage() {
  const [name, setName] = useState("Nova");
  const [personality, setPersonality] = useState("Douce");
  const [message, setMessage] = useState("");
  const [emotion, setEmotion] = useState("🙂");

useEffect(() => {
    const profile = JSON.parse(
      localStorage.getItem("patientProfile")
    );

const emotions = JSON.parse(
      localStorage.getItem("emotionHistory")
    ) || [];

if (!profile) return;

const lastEmotion = emotions.at(-1);

if (lastEmotion?.mood?.includes("Fatigué")) {
      setEmotion("💙");

setMessage(
        "Aujourd’hui, nous allons avancer doucement ensemble."
      );
    } else {
      setEmotion("😊");

setMessage(
        "Je suis là pour vous aider à progresser chaque jour."
      );
    }

if (profile.pathology === "Dyslexie") {
      setPersonality("Patiente");
    }

if (profile.pathology === "AVC") {
      setPersonality("Encourageante");
    }
  }, []);

return (
    <div className="page-container">
      <div className="main-card fade-in">
        <h1 className="main-title">
          Avatar IA
        </h1>

<div className="analysis-box">
          <div
            style={{
              textAlign: "center",
              fontSize: "80px",
              marginBottom: "20px",
            }}
          >
            {emotion}
          </div>

<div className="analysis-title">
            {name}
          </div>

<p
            style={{
              textAlign: "center",
              fontSize: "22px",
              lineHeight: "1.8",
            }}
          >
            {message}
          </p>
        </div>

<div className="analysis-box">
          <div className="analysis-grid">

<div className="analysis-card">
              <div className="analysis-label">
                Personnalité
              </div>

<div className="analysis-value">
                {personality}
              </div>
            </div>

<div className="analysis-card">
              <div className="analysis-label">
                Compagnon
              </div>

<div className="analysis-value">
                IA Active
              </div>
            </div>

</div>
        </div>

<div className="analysis-box">
          <div className="analysis-title">
            Rôle de l’Avatar
          </div>

<ul
            style={{
              fontSize: "20px",
              lineHeight: "2.2",
            }}
          >
            <li>Encourager</li>
            <li>Réduire stress</li>
            <li>Créer lien humain</li>
            <li>Motiver progression</li>
            <li>Accompagner rééducation</li>
          </ul>
        </div>

<div
          className="button-row"
          style={{ justifyContent: "center" }}
        >
          <Link href="/assistant">
            <button className="primary-button success-button">
              Assistant Vocal
            </button>
          </Link>

<Link href="/coach">
            <button className="primary-button warning-button">
              Coach IA
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

