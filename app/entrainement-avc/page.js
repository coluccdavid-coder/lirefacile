"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
export default function EntrainementAVC() {
  const [exercises, setExercises] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [listening, setListening] = useState(false);
  const [spokenText, setSpokenText] = useState("");
const router = useRouter();
useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem("currentExercisePack")) || [];
setExercises(saved);
  }, []);
const currentExercise = exercises[currentIndex];
const nextExercise = () => {
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSpokenText("");
    } else {
      alert("Programme terminé ✅");
      router.push("/");
    }
  };
const startSpeechRecognition = () => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;
if (!SpeechRecognition) {
      alert("Reconnaissance vocale non supportée.");
      return;
    }
const recognition = new SpeechRecognition();
recognition.lang = "fr-FR";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
setListening(true);
recognition.start();
recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
setSpokenText(transcript);
const expected = currentExercise.question
        .toLowerCase()
        .replace("répète :", "")
        .trim();
const spoken = transcript.toLowerCase().trim();
if (
        spoken.includes(expected.slice(0, 10)) ||
        expected.includes(spoken)
      ) {
        alert("Bonne prononciation ✅");
        nextExercise();
      } else {
        alert("Prononciation différente. Réessaie.");
      }
setListening(false);
    };
recognition.onerror = () => {
      setListening(false);
    };
  };
return (
    <div className="page-container">
      <div className="main-card">
        <h1 className="main-title">Programme IA</h1>
{currentExercise ? (
          <div className="analysis-card">
            <div className="analysis-label">
              {currentExercise.type}
            </div>
<div
              style={{
                fontSize: "34px",
                marginTop: "20px",
                lineHeight: "1.6",
              }}
            >
              {currentExercise.question}
            </div>
<div className="button-row">
              <button
                className="primary-button success-button"
                onClick={startSpeechRecognition}
              >
                {listening
                  ? "Écoute en cours..."
                  : "🎤 Répondre à voix haute"}
              </button>
<button
                className="primary-button blue-button"
                onClick={nextExercise}
              >
                Exercice suivant
              </button>
            </div>
{spokenText && (
              <div className="feedback-box">
                Tu as dit : {spokenText}
              </div>
            )}
          </div>
        ) : (
          <div className="analysis-card">
            Aucun exercice disponible.
          </div>
        )}
      </div>
    </div>
  );
}
