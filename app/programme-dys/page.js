"use client";
import { useSearchParams, useRouter } from "next/navigation";
export default function ProgrammeDys() {
  const params = useSearchParams();
  const router = useRouter();
const type = params.get("type");
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
const current = data[type] || data.lecture;
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
