export default function AVCMemoirePage() {
  return (
    <div className="page-container">
      <div className="main-card">
        <h1 className="main-title">Mémoire AVC</h1>

        <div className="exercise-card">
          <div className="exercise-question">
            Retiens : arbre — maison — soleil
          </div>

          <input
            className="exercise-input"
            placeholder="Écris les mots retenus"
          />
        </div>
      </div>
    </div>
  );
}
