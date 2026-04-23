import { NextResponse } from "next/server";
import nspell from "nspell";
import fr from "dictionary-fr";

let spell = null;

async function getSpell() {
  if (spell) return spell;

  return new Promise((resolve, reject) => {
    fr((err, dict) => {
      if (err) {
        reject(err);
        return;
      }

      spell = nspell(dict);
      resolve(spell);
    });
  });
}

export async function POST(req) {
  try {
    const { text } = await req.json();

    const spellChecker = await getSpell();

    const words = text.split(" ");

    const correctedWords = words.map((word) => {
      const cleanWord = word
        .toLowerCase()
        .replace(/[^a-zàâçéèêëîïôûùüÿñæœ'-]/gi, "");

      if (!cleanWord) return word;

      if (!spellChecker.correct(cleanWord)) {
        const suggestions = spellChecker.suggest(cleanWord);

        if (suggestions.length > 0) {
          return suggestions[0];
        }
      }

      return word;
    });

    return NextResponse.json({
      correctedText: correctedWords.join(" "),
    });
  } catch (error) {
    console.error("Erreur API spell:", error);

    return NextResponse.json(
      { error: "Erreur correction" },
      { status: 500 }
    );
  }
}
