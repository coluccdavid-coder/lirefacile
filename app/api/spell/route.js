import { NextResponse } from "next/server";
import nspell from "nspell";
import dictionary from "dictionary-fr";

let spell = null;

async function loadDictionary() {
  if (spell) return spell;

  const dict = await dictionary;
  spell = nspell(dict);

  return spell;
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
