"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilSetupPage() {
  const router = useRouter();

const [formData, setFormData] = useState({
    age: "",
    pathology: "",
    schoolLevel: "",
    fatigue: "",
    learningStyle: "",
  });

const handleChange = (e) => {
    const { name, value } = e.target;

setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

const saveProfile = () => {
    localStorage.setItem(
      "patientProfile",
      JSON.stringify(formData)
    );

router.push("/evaluation");
  };

return (
    <div className="page-container">
      <div className="main-card fade-in">
        <h1 className="main-title">
          Profil Patient
        </h1>

<p className="subtitle">
          L’IA va personnaliser le parcours selon votre profil.
        </p>

<div className="exercise-card">
          <div className="exercise-content">

<div style={{ width: "100%" }}>
              <label className="section-title">
                Âge
              </label>

<input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Ex : 67"
                className="exercise-input"
              />
            </div>

<div style={{ width: "100%" }}>
              <label className="section-title">
                Pathologie principale
              </label>

<select
                name="pathology"
                value={formData.pathology}
                onChange={handleChange}
                className="exercise-input"
              >
                <option value="">Choisir</option>
                <option value="AVC">AVC</option>
                <option value="Dyslexie">Dyslexie</option>
                <option value="Autisme">Autisme</option>
                <option value="TDAH">TDAH</option>
                <option value="Mémoire">Trouble mémoire</option>
                <option value="Attention">Trouble attention</option>
              </select>
            </div>

<div style={{ width: "100%" }}>
              <label className="section-title">
                Niveau scolaire
              </label>

<select
                name="schoolLevel"
                value={formData.schoolLevel}
                onChange={handleChange}
                className="exercise-input"
              >
                <option value="">Choisir</option>
                <option value="Primaire">Primaire</option>
                <option value="Collège">Collège</option>
                <option value="Lycée">Lycée</option>
                <option value="Supérieur">Supérieur</option>
              </select>
            </div>

<div style={{ width: "100%" }}>
              <label className="section-title">
                Niveau de fatigue actuel
              </label>

<select
                name="fatigue"
                value={formData.fatigue}
                onChange={handleChange}
                className="exercise-input"
              >
                <option value="">Choisir</option>
                <option value="Faible">Faible</option>
                <option value="Modérée">Modérée</option>
                <option value="Élevée">Élevée</option>
              </select>
            </div>

<div style={{ width: "100%" }}>
              <label className="section-title">
                Style d’apprentissage
              </label>

<select
                name="learningStyle"
                value={formData.learningStyle}
                onChange={handleChange}
                className="exercise-input"
              >
                <option value="">Choisir</option>
                <option value="Visuel">Visuel</option>
                <option value="Audio">Audio</option>
                <option value="Texte">Texte</option>
                <option value="Répétition">Répétition</option>
              </select>
            </div>

</div>
        </div>

<div
          className="button-row"
          style={{ justifyContent: "center" }}
        >
          <button
            className="primary-button success-button"
            onClick={saveProfile}
          >
            Continuer vers l’évaluation
          </button>
        </div>
      </div>
    </div>
  );
}
