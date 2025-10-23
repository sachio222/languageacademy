// Debug script to check specifically for basic 'a' words
import { adjectivesCambridge } from "./src/data/dictionary/words/cambridge/adjectives.js";
import { nounsCambridge } from "./src/data/dictionary/words/cambridge/nouns.js";
import { verbsCambridge } from "./src/data/dictionary/words/cambridge/verbs.js";
import { prepositionsCambridge } from "./src/data/dictionary/words/cambridge/prepositions.js";
import { articlesCambridge } from "./src/data/dictionary/words/cambridge/articles.js";

const dictionaries = [
  { name: "adjectives", data: adjectivesCambridge },
  { name: "nouns", data: nounsCambridge },
  { name: "verbs", data: verbsCambridge },
  { name: "prepositions", data: prepositionsCambridge },
  { name: "articles", data: articlesCambridge },
];

const words = [];
dictionaries.forEach(({ name, data }) => {
  if (data instanceof Map) {
    data.forEach((entry, id) => {
      words.push({
        id,
        word: entry.word,
        partOfSpeech: entry.partOfSpeech,
        source: name,
      });
    });
  }
});

// Look for specific words that should be early in the alphabet
const targetWords = ["a", "abeille", "accent", "addition", "adjectif"];
console.log("Looking for specific early alphabet words:");
targetWords.forEach((target) => {
  const found = words.find(
    (w) => w.word.toLowerCase() === target.toLowerCase()
  );
  if (found) {
    console.log(
      `✓ Found: ${found.word} (${found.partOfSpeech}) from ${found.source}`
    );
  } else {
    console.log(`✗ Missing: ${target}`);
  }
});

// Get all 'a' words and sort them
const aWords = words.filter((w) => w.word.toLowerCase().startsWith("a"));
const sortedAWords = aWords.sort((a, b) => {
  return a.word.localeCompare(b.word, "fr-FR", {
    sensitivity: "base",
    numeric: true,
    caseFirst: "lower",
  });
});

console.log('\nAll words starting with "a" (sorted):');
sortedAWords.forEach((word, index) => {
  console.log(`${index + 1}. ${word.word} (${word.partOfSpeech})`);
});

// Check if there's a standalone 'a' word
const aWord = words.find((w) => w.word === "a");
console.log('\nStandalone "a" word:', aWord || "NOT FOUND");
