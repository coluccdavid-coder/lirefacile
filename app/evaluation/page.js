"use client";
    },
    {
      question: "As-tu du mal à retenir les informations ?",
      key: "memory"
    },
    {
      question: "Te concentres-tu difficilement ?",
      key: "attention"
    },
    {
      question: "Confonds-tu parfois les lettres ?",
      key: "dyslexia"
    }
  ];

  const [answers, setAnswers] = useState({});

  const handleAnswer = (key, value) => {
    setAnswers((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const finishEvaluation = async () => {
    localStorage.setItem("evaluation", JSON.stringify(answers));

    router.push("/profil");
  };

  return (
    <div className="page-container">
      <div className="main-card">
        <h1 className="main-title">Évaluation Cognitive</h1>

        {questions.map((q, index) => (
          <div key={index} className="exercise-box">
            <h2 className="section-title">{q.question}</h2>

            <div className="button-row">
              <button
                className="primary-button"
                onClick={() => handleAnswer(q.key, 1)}
              >
                Oui
              </button>

              <button
                className="primary-button warning-button"
                onClick={() => handleAnswer(q.key, 0)}
              >
                Non
              </button>
            </div>
          </div>
        ))}

        <button className="primary-button" onClick={finishEvaluation}>
          Générer mon profil
        </button>
      </div>
    </div>
  );
}
