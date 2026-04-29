"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProgrammeDys() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [mounted, setMounted] = useState(false);
  const [current, setCurrent] = useState(null);

  useEffect(() => {
    setMounted(true);

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

  if (!mounted || !current) {
    return null;
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
