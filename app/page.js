"use client";
          style={{
            fontSize: "60px",
            marginBottom: "10px",
            color: darkMode ? "white" : "black",
          }}
        >
          LireFacile
        </h1>

        <p
          style={{
            color: darkMode ? "#d1d5db" : "#4b5563",
            marginBottom: "20px",
            fontSize: "22px",
          }}
        >
          Simplifie un texte et écoute-le facilement.
        </p>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Colle ton texte ici..."
          style={textareaStyle}
        />

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            marginTop: "20px",
          }}
        >
          <button onClick={simplifyText} style={buttonStyle}>
            Simplifier
          </button>

          <button onClick={aiCorrection} style={buttonStyle}>
            IA Correction
          </button>

          <button onClick={speakText} style={buttonStyle}>
            Lire
          </button>

          <button onClick={stopSpeech} style={buttonStyle}>
            Stop
          </button>

          <button onClick={copyText} style={buttonStyle}>
            Copier
          </button>

          <button
            onClick={() => setDarkMode(!darkMode)}
            style={buttonStyle}
          >
            {darkMode ? "Mode Clair" : "Mode Sombre"}
          </button>

          <button
            onClick={() => setDyslexicMode(!dyslexicMode)}
            style={buttonStyle}
          >
            Dyslexie
          </button>
        </div>
      </div>
    </div>
  );
}
