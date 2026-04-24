import "./globals.css";

export const metadata = {
  title: "LireFacile",
  description: "Plateforme AVC, Dyslexie et Autisme",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
