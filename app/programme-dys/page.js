"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function ProgrammeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [current, setCurrent] = useState(null);

  useEffect(() => {
    const type = searchParams.get("type");

    const data = {
      lecture: {
        title: "Lecture",
        question: "Lis ce mot : MAISON",
      },
      orthographe: {
        title: "Orthographe",
        question: "Écris correctement : éléphant",
      },
      comprehension: {
        title: "Compréhension",
        question: "Que fait un chien ?",
      },
    };

    setCurrent(data[type] || data.lecture);
  }, [searchParams]);

  if (!current) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="page-container">
      <div className="main-card">
        <h1 className="main-title">Programme Dys</h1>

        <div className="analysis-card">
          <div className="analysis-label">
            {current.title}
          </div>

          <div
            style={{
              marginTop: "20px",
              fontSize: "34px",
              lineHeight: "1.6",
            }}
          >
            {current.question}
          </div>

          <div className="button-row">
            <button
              className="primary-button blue-button"
              onClick={() => router.push("/exercices-dys")}
            >
              Retour Dys
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProgrammeDys() {
  return (
    <Suspense fallback={<div>Chargement programme...</div>}>
      <ProgrammeContent />
    </Suspense>
  );
}
