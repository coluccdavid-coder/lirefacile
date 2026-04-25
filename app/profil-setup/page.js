"use client";
                name="schoolLevel"
                value={formData.schoolLevel}
                onChange={handleChange}
                className="exercise-input"
              >
                <option value="">Choisir</option>
                <option value="Primaire">Primaire</option>
                <option value="Collège">Collège</option>
                <option value="Lycée">Lycée</option>
                <option value="Supérieur">Supérieur</option>
              </select>
            </div>

            <div style={{ width: "100%" }}>
              <label className="section-title">
                Niveau de fatigue actuel
              </label>

              <select
                name="fatigue"
                value={formData.fatigue}
                onChange={handleChange}
                className="exercise-input"
              >
                <option value="">Choisir</option>
                <option value="Faible">Faible</option>
                <option value="Modérée">Modérée</option>
                <option value="Élevée">Élevée</option>
              </select>
            </div>

            <div style={{ width: "100%" }}>
              <label className="section-title">
                Style d’apprentissage
              </label>

              <select
                name="learningStyle"
                value={formData.learningStyle}
                onChange={handleChange}
                className="exercise-input"
              >
                <option value="">Choisir</option>
                <option value="Visuel">Visuel</option>
                <option value="Audio">Audio</option>
                <option value="Texte">Texte</option>
                <option value="Répétition">Répétition</option>
              </select>
            </div>

          </div>
        </div>

        <div
          className="button-row"
          style={{ justifyContent: "center" }}
        >
          <button
            className="primary-button success-button"
            onClick={saveProfile}
          >
            Continuer vers l’évaluation
          </button>
        </div>
      </div>
    </div>
  );
}
