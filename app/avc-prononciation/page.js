export default function AVCPrononciationPage() {
  return (
    <div className="page-container">
      <div className="main-card">
        <h1 className="main-title">Prononciation AVC</h1>

        <div className="exercise-card">
          <div className="exercise-question">
            Répète lentement : Bonjour, je vais bien.
          </div>

          <input
            className="exercise-input"
            placeholder="Écris ce que tu as prononcé"
          />
        </div>
      </div>
    </div>
  );
}
