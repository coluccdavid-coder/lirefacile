"use client";
          <button onClick={aiCorrection}>IA</button>
          <button onClick={speakText}>Lire</button>
          <button onClick={stopSpeech}>Stop</button>
          <button onClick={copyText}>Copier</button>
          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "Mode Clair" : "Mode Sombre"}
          </button>
          <button onClick={() => setDyslexicMode(!dyslexicMode)}>
            Mode Dyslexie
          </button>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label>Vitesse lecture : </label>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={readingSpeed}
            onChange={(e) => setReadingSpeed(Number(e.target.value))}
          />
        </div>

        <div style={{ marginBottom: "30px" }}>
          <input type="file" accept=".txt" onChange={handleFile} />
        </div>

        {correctedText && (
          <div
            style={{
              marginTop: "30px",
              padding: "25px",
              borderRadius: "20px",
              backgroundColor: darkMode ? "#374151" : "#eef2f7",
            }}
          >
            <h2 style={{ marginBottom: "15px" }}>Texte corrigé :</h2>
            <p style={{ fontSize: "24px", lineHeight: "1.8" }}>
              {correctedText}
            </p>
          </div>
        )}

        {history.length > 0 && (
          <div style={{ marginTop: "40px" }}>
            <h2>Historique</h2>

            {history.map((item, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: darkMode ? "#374151" : "#eef2f7",
                  padding: "15px",
                  borderRadius: "12px",
                  marginTop: "10px",
                }}
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
