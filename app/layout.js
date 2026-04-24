import "./globals.css";

export const metadata = {
  title: "LireFacile",
  description: "Plateforme AVC & Dyslexie",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: "#e5e5e5",
        }}
      >
        {children}
      </body>
    </html>
  );
}
