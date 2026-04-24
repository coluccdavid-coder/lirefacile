"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProfilPage() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("evaluation");

    if (!stored) {
      setProfile({
        memory: 50,
        attention: 50,
        dyslexiaRisk: 50,
        reading: 50,
      });
      return;
    }

    const data = JSON.parse(stored);

    const cognitiveProfile = {
      memory: data.memory ? 70 : 40,
      attention: data.attention ? 60 : 80,
      dyslexiaRisk: data.dyslexia ? 80 : 20,
      reading: data.reading ? 55 : 85,
    };

    setProfile(cognitiveProfile);
  }, []);

  if (!profile) {
    return <p>Chargement...</p>;
  }

  return (
    <div className="page-container">
      <div className="main-card">
        <h1 className="main-title">Profil Cognitif IA</h1>

        <div className="exercise-box">
          <p>Mémoire : {profile.memory}%</p>
          <p>Attention : {profile.attention}%</p>
          <p>Risque Dys : {profile.dyslexiaRisk}%</p>
          <p>Lecture : {profile.reading}%</p>
        </div>

        <Link href="/exercices">
          <button className="primary-button">
            Commencer les exercices
          </button>
        </Link>
      </div>
    </div>
  );
}
