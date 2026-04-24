"use client";

import Link from "next/link";

export default function ProfilPage() {
  const profils = [
    {
      title: "AVC",
      description: "Mémoire, langage, récupération cognitive",
      color: "#60a5fa",
    },
    {
      title: "Dyslexie",
      description: "Lecture, compréhension, orthographe",
      color: "#34d399",
    },
    {
      title: "Autisme",
      description: "Routine, logique, concentration",
      color: "#fbbf24",
    },
    {
      title: "Mémoire",
      description: "Stimuler les souvenirs et l’attention",
      color: "#a78bfa",
    },
    {
      title: "Concentration",
      description: "Travail du focus et du calme",
      color: "#fb7185",
    },
  ];

return (
    <div className="page-container">
      <div className="main-card">
        <h1 className="main-title">
          Choisissez votre parcours
        </h1>
<div className="profile-grid">
          {profils.map((profil) => (
            <Link
              key={profil.title}
              href={`/exercices?profil=${profil.title}`}
              className="profile-card"
              style={{
                borderTop: `8px solid ${profil.color}`,
              }}
            >
              <h2>{profil.title}</h2>
              <p>{profil.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
