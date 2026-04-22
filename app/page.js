'use client'

        <div
          style={{
            display: 'flex',
            gap: '10px',
            marginBottom: '30px',
            flexWrap: 'wrap',
          }}
        >
          <button
            onClick={simplifyText}
            style={{
              padding: '12px 25px',
              borderRadius: '10px',
              border: 'none',
              backgroundColor: '#2563eb',
              color: 'white',
              cursor: 'pointer',
              fontSize: '18px',
            }}
          >
            Simplifier le texte
          </button>

          <button
            onClick={speakText}
            style={{
              padding: '12px 25px',
              borderRadius: '10px',
              border: 'none',
              backgroundColor: '#16a34a',
              color: 'white',
              cursor: 'pointer',
              fontSize: '18px',
            }}
          >
            Lire à voix haute
          </button>
        </div>

        {easyText && (
          <div
            style={{
              backgroundColor: darkMode ? '#1f1f1f' : 'white',
              padding: '30px',
              borderRadius: '20px',
              boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
            }}
          >
            <h2
              style={{
                marginBottom: '20px',
                fontSize: '28px',
              }}
            >
              Texte simplifié
            </h2>

            <p
              style={{
                whiteSpace: 'pre-line',
                fontSize: '24px',
                lineHeight: '2.2',
                letterSpacing: '1px',
              }}
            >
              {easyText}
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
