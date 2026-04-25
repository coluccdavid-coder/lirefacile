"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PrononciationAVCPage() {
  const router = useRouter();

  const [spoken, setSpoken] = useState("");

  const startSpeech = () => {
    const recognition =
      new window.webkitSpeechRecognition();

    recognition.lang = "fr-FR";

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      setSpoken(text);
    };

    recognition.start();
  };

  return (
    <div className="page-container">
      <div className="main-card">

        <h1 className="main-title">
          Prononciation AVC
        </h1>

        <div className="exercise-card">

          <div className="exercise-question">
            Prononce le mot : "Bonjour"
          </div>

          <div className="button-row">
            <button
              className="primary-button"
              onClick={startSpeech}
            >
              🎤 Commencer
            </button>

            <button
              className="primary-button success-button"
              onClick={() => router.push("/exercices-avc")}
            >
              Retour
            </button>
          </div>

          <div className="feedback-box">
            Reconnu : {spoken || "Aucun mot"}
          </div>

        </div>

      </div>
    </div>
  );
}
