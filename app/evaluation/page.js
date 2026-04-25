"use client";
    );
  }

  return (
    <div
      className={`page-container ${
        patient.pathology === "Dyslexie"
          ? "dyslexia-font"
          : ""
      }`}
    >
      <div className="main-card fade-in">
        <h1 className="main-title">
          Évaluation IA
        </h1>

        <div className="assistant-box">
          <div className="assistant-avatar">🧠</div>

          <div className="assistant-message">
            L’IA adapte le test selon votre profil.
          </div>
        </div>

        <div className="exercise-card">
          <div className="exercise-title">
            Question {questionIndex + 1}
          </div>

          <div className="exercise-question">
            {currentQuestion.question}
          </div>

          {currentQuestion.choices?.length > 0 ? (
            <div className="button-row">
              {currentQuestion.choices.map((choice) => (
                <button
                  key={choice}
                  className="primary-button"
                  onClick={() => setAnswer(choice)}
                >
                  {choice}
                </button>
              ))}
            </div>
          ) : (
            <input
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="exercise-input"
              placeholder="Votre réponse"
            />
          )}
        </div>

        <div className="button-row">
          <button
            className="primary-button success-button"
            onClick={nextQuestion}
          >
            Continuer
          </button>
        </div>
      </div>
    </div>
  );
}
