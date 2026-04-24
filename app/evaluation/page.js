"use client";
                Terminer l’évaluation
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="analysis-box">
              <div className="analysis-title">
                Analyse Terminée
              </div>

              <p
                style={{
                  marginBottom: "25px",
                  lineHeight: "2",
                }}
              >
                L’IA pourra maintenant adapter les exercices selon :
              </p>

              <ul
                style={{
                  lineHeight: "2.2",
                  marginLeft: "25px",
                  fontSize: "20px",
                }}
              >
                <li>Mémoire</li>
                <li>Lecture</li>
                <li>Écriture</li>
                <li>Fatigue</li>
                <li>Parole</li>
              </ul>
            </div>

            <div
              className="button-row"
              style={{
                marginTop: "35px",
                justifyContent: "center",
              }}
            >
              <Link href="/profil">
                <button className="primary-button success-button">
                  Voir mon Profil IA
                </button>
              </Link>

              <Link href="/exercices">
                <button className="primary-button warning-button">
                  Commencer les Exercices
                </button>
              </Link>

              <Link href="/">
                <button className="primary-button">
                  Retour Accueil
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
