import { NextResponse } from "next/server";
import nspell from "nspell";
import dictionary from "dictionary-fr";

let spellInstance = null;

async function loadSpell() {
  if (spellInstance) return spellInstance;

  return new Promise((resolve, reject) => {
    dictionary((err, dict) => {
      if (err) {
        reject(err);
        return;
      }

      spellInstance = nspell(dict);
      resolve(spellInstance);
    });
  });
}

export async function POST(req) {
  try {
    const { text } = await req.json();

    const spell = await loadSpell();

    const correctedText = text
      .split(" ")
      .map((word) => {
        const cleaned = word
          .toLowerCase()
          .replace(/[^a-zàâçéèêëîïôûùüÿñæœ'-]/gi, "");

        if (!cleaned) return word;

        if (!spell.correct(cleaned)) {
          const suggestions = spell.suggest(cleaned);

          if (suggestions.length > 0) {
            return suggestions[0];
          }
        }

        return word;
      })
      .join(" ");

    return NextResponse.json({ correctedText });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Erreur correction" },
      { status: 500 }
    );
  }
}
