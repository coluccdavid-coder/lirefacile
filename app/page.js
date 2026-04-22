"use client";
            resize: "none",
            backgroundColor: darkMode ? "#374151" : "#e5e7eb",
            color: darkMode ? "white" : "black",
            outline: "none",
            fontFamily: dyslexicMode
              ? "OpenDyslexic, Arial, sans-serif"
              : "Arial, sans-serif"
          }}
        />

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "15px",
            marginTop: "30px"
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

          <button
            onClick={() => setFontSize(fontSize + 2)}
            style={buttonStyle}
          >
            A+
          </button>

          <button
            onClick={() => setFontSize(fontSize - 2)}
            style={buttonStyle}
          >
            A-
          </button>
        </div>
      </div>
    </div>
  );
}
