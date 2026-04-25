export function generateExercises(text) {
  const exercises = [];

  const lowerText = text.toLowerCase();

  if (lowerText.includes("mémoire")) {
    exercises.push({
      type: "memoire",
      question: "Retiens : arbre — maison — soleil",
      answer: "arbre maison soleil",
    });
  }

  if (lowerText.includes("langage")) {
    exercises.push({
      type: "langage",
      question: "Complète : Le chat boit du ____",
      answer: "lait",
    });
  }

  if (lowerText.includes("attention")) {
    exercises.push({
      type: "attention",
      question: "Trouve l’intrus : pomme / chaise / banane",
      answer: "chaise",
    });
  }

  return exercises;
}
