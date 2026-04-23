import { NextResponse } from "next/server";
import nspell from "nspell";
import dictionary from "dictionary-fr";

let spell;

async function loadDictionary() {
  if (!spell) {
    const dict = await dictionary();
    spell = nspell(dict);
  }
  return spell;
}

export async function POST(req) {
  const { text } = await req.json();

  const spellChecker = await loadDictionary();

  const words = text.split(" ");
  const corrected = words.map((word) => {
    if (spellChecker.correct(word)) {
      return word;
    }

    const suggestions = spellChecker.suggest(word);
    return suggestions[0] || word;
  });

  return NextResponse.json({
    correctedText: corrected.join(" "),
  });
}
