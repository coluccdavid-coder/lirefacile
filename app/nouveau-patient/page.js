"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function NouveauPatient() {
  const [name, setName] = useState("");
  const [symptoms, setSymptoms] = useState("");
const router = useRouter();
const savePatient = () => {
    const patient = {
      name,
      symptoms,
    };
localStorage.setItem(
      "patientProfile",
      JSON.stringify(patient)
    );
alert("Patient enregistré ✅");
router.push("/exercices-avc");
  };
return (
    <div className="page-container">
      <div className="main-card">
        <h1 className="main-title">Nouveau Patient</h1>
<div className="analysis-box">
          <div className="analysis-title">Nom</div>
<input
            className="exercise-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
<div className="analysis-box">
          <div className="analysis-title">
            Symptômes
          </div>
<textarea
            className="exercise-input"
            rows={5}
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
          />
        </div>
<div className="button-row">
          <button
            className="primary-button success-button"
            onClick={savePatient}
          >
            Générer Programme IA
          </button>
        </div>
      </div>
    </div>
  );
}
