import { NextResponse } from "next/server";
import nspell from "nspell";
import dictionary from "dictionary-fr";

let spellChecker = null;

async function initSpellChecker() {
  if (spellChecker) return spellChecker;

  return new Promise((resolve, reject) => {
    dictionary((err, dict) => {
      if (err) {
        reject(err);
        return;
      }

      spellChecker = nspell(dict);
      resolve(spellChecker);
    });
  });
}

export async function POST(req) {
  try {
    const { text } = await req.json();

    const spell = await initSpellChecker();

    const correctedText = text
      .split(" ")
      .map((word) => {
        const cleanWord = word
          .toLowerCase()
          .replace(/[^a-zàâçéèêëîïôûùüÿñæœ'-]/gi, "");

        if (!cleanWord) return word;

        if (!spell.correct(cleanWord)) {
          const suggestions = spell.suggest(cleanWord);

          if (suggestions.length > 0) {
            return suggestions[0];
          }
        }

        return word;
      })
      .join(" ");

    return NextResponse.json({ correctedText });
  } catch (error) {
    console.error("Erreur API:", error);

    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
