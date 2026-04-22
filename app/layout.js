export const metadata = {
  title: "LireFacile",
  description: "Application de simplification de texte",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
