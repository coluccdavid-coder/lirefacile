"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("lirefacile-progress");

    if (saved) {
      setData(JSON.parse(saved));
    }
  }, []);

  return (
    <div className="page-container">
      <div className="main-card">
        <h1 className="main-title">Dashboard Thérapeute</h1>

        {data && (
          <>
            <p>Score : {data.score}</p>
            <p>Exercices réalisés : {data.exerciseIndex}</p>
            <p>Profil : {data.profil}</p>
          </>
        )}
      </div>
    </div>
  );
}
