export function generateExercises(text) {
  const lower = text.toLowerCase();

  const exercises = [];

  if (
    lower.includes("mémoire") ||
    lower.includes("memoire")
  ) {
    exercises.push({
      type: "memoire",
      question: "Retiens : arbre — chaise — soleil",
    });
  }

  if (
    lower.includes("langage") ||
    lower.includes("lecture")
  ) {
    exercises.push({
      type: "langage",
      question: "Complète : Le chien mange une ____",
    });
  }

  if (
    lower.includes("parole") ||
    lower.includes("orthophonie")
  ) {
    exercises.push({
      type: "prononciation",
      question: "Prononce : Bonjour, je vais bien",
    });
  }

  if (exercises.length === 0) {
    exercises.push({
      type: "cognitif",
      question: "Trouve un mot lié au bien-être.",
    });
  }

  return exercises;
}
