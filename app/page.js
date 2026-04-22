"use client";
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

          <button onClick={clearText} style={buttonStyle}>
            Effacer
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

          <button onClick={() => setFontSize(fontSize + 2)} style={buttonStyle}>
            A+
          </button>

          <button onClick={() => setFontSize(fontSize - 2)} style={buttonStyle}>
            A-
          </button>
        </div>
      </div>
    </div>
  );
}

const buttonStyle = {
  backgroundColor: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "14px",
  padding: "14px 22px",
  fontSize: "18px",
  cursor: "pointer",
  fontWeight: "bold"
};
