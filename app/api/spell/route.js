import { NextResponse } from "next/server";
import nspell from "nspell";
import dictionary from "dictionary-fr";

let spell = null;

function loadDictionary() {
  return new Promise((resolve, reject) => {
    if (spell) return resolve(spell);

    dictionary((err, dict) => {
      if (err) return reject(err);

      spell = nspell(dict);
      resolve(spell);
    });
  });
}

export async function POST(req) {
  try {
    const { text } = await req.json();

    const spellChecker = await loadDictionary();

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
    console.error(error);

    return NextResponse.json(
      { error: "Erreur correcteur" },
      { status: 500 }
    );
  }
}
