// Debug script to check what words are actually in the dictionary
import { adjectivesCambridge } from "./src/data/dictionary/words/cambridge/adjectives.js";
import { adverbsCambridge } from "./src/data/dictionary/words/cambridge/adverbs.js";
import { articlesCambridge } from "./src/data/dictionary/words/cambridge/articles.js";
import { conjunctionsCambridge } from "./src/data/dictionary/words/cambridge/conjunctions.js";
import { interjectionsCambridge } from "./src/data/dictionary/words/cambridge/interjections.js";
import { interrogativesCambridge } from "./src/data/dictionary/words/cambridge/interrogatives.js";
import { nounsCambridge } from "./src/data/dictionary/words/cambridge/nouns.js";
import { prepositionsCambridge } from "./src/data/dictionary/words/cambridge/prepositions.js";
import { pronounsCambridge } from "./src/data/dictionary/words/cambridge/pronouns.js";
import { verbsCambridge } from "./src/data/dictionary/words/cambridge/verbs.js";

const dictionaries = [
  { name: "adjectives", data: adjectivesCambridge },
  { name: "adverbs", data: adverbsCambridge },
  { name: "articles", data: articlesCambridge },
  { name: "conjunctions", data: conjunctionsCambridge },
  { name: "interjections", data: interjectionsCambridge },
  { name: "interrogatives", data: interrogativesCambridge },
  { name: "nouns", data: nounsCambridge },
  { name: "prepositions", data: prepositionsCambridge },
  { name: "pronouns", data: pronounsCambridge },
  { name: "verbs", data: verbsCambridge },
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
  } else if (Array.isArray(data)) {
    data.forEach(([id, entry]) => {
      words.push({
        id,
        word: entry.word,
        partOfSpeech: entry.partOfSpeech,
        source: name,
      });
    });
  }
});

console.log(`Total words loaded: ${words.length}`);

// Check for words starting with 'a'
const aWords = words.filter((w) => w.word.toLowerCase().startsWith("a"));
console.log(`Words starting with 'a': ${aWords.length}`);
console.log(
  "First 10 a-words:",
  aWords.slice(0, 10).map((w) => w.word)
);

// Check for words starting with 'à'
const àWords = words.filter((w) => w.word.toLowerCase().startsWith("à"));
console.log(`Words starting with 'à': ${àWords.length}`);
console.log(
  "All à-words:",
  àWords.map((w) => w.word)
);

// Check for words starting with 'â'
const âWords = words.filter((w) => w.word.toLowerCase().startsWith("â"));
console.log(`Words starting with 'â': ${âWords.length}`);
console.log(
  "All â-words:",
  âWords.map((w) => w.word)
);

// Check for words starting with 'é'
const éWords = words.filter((w) => w.word.toLowerCase().startsWith("é"));
console.log(`Words starting with 'é': ${éWords.length}`);
console.log(
  "First 5 é-words:",
  éWords.slice(0, 5).map((w) => w.word)
);
