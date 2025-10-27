#!/usr/bin/env node

/**
 * Add Miscellaneous Words to Cambridge Dictionary
 *
 * This script creates a JSON file with interjections, pronouns, and conjunctions
 * in the format required by the Dictionary Generator Guide.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Words to add with their parts of speech
const words = [
  { word: "excusez", pos: "interjection" },
  { word: "qu", pos: "pronoun" },
  { word: "rien", pos: "pronoun" },
  { word: "si", pos: "conjunction" },
  { word: "parce", pos: "conjunction" },
  { word: "end", pos: "conjunction" },
];

// Create JSON entries for each word
const wordEntries = words.map(({ word, pos }) => {
  const entry = {
    word: word,
    partOfSpeech: pos,
    translations: [
      {
        language: "en",
        text: getEnglishTranslation(word, pos),
        confidence: 0.9,
        source: "manual",
      },
    ],
    relationships: [],
    etymology: "",
    register: ["neutral"],
    usage_notes: getUsageNotes(word, pos),
    regional_variants: [],
    examples: getExamples(word, pos),
    phonetic: "",
    tags: ["reading_vocabulary"],
    sources: ["manual"],
    verified: false,
    cambridge_data: {
      scraped_at: new Date().toISOString(),
      url: `https://dictionary.cambridge.org/dictionary/french-english/${encodeURIComponent(
        word
      )}`,
      confidence_score: 0.9,
      last_updated: new Date().toISOString(),
    },
  };

  return entry;
});

// Helper function to get English translations
function getEnglishTranslation(word, pos) {
  const translations = {
    excusez: "excuse me / pardon me",
    qu: "that / which / who / what",
    rien: "nothing / anything",
    si: "if / whether / yes (contradiction)",
    parce: "because (contraction of parce que)",
    end: "end / finish",
  };
  return translations[word] || `${pos}`;
}

// Helper function to get usage notes
function getUsageNotes(word, pos) {
  const notes = {
    excusez:
      "Polite interjection used to get attention or apologize. Often followed by 'moi' (excusez-moi)",
    qu: "Relative pronoun used to introduce subordinate clauses. Can be subject or object",
    rien: "Indefinite pronoun meaning 'nothing'. Used with 'ne' in negative constructions (ne...rien)",
    si: "Conjunction meaning 'if' for conditions, or 'yes' when contradicting a negative statement",
    parce:
      "Contraction of 'parce que' meaning 'because'. Used in informal speech",
    end: "Conjunction meaning 'end' or 'finish'. Used to conclude or terminate",
  };
  return notes[word] || "";
}

// Helper function to get examples
function getExamples(word, pos) {
  const examples = {
    excusez: [
      {
        text: "Excusez-moi, où est la gare ?",
        trans: "Excuse me, where is the train station?",
        lang: "en",
      },
      {
        text: "Excusez, je ne comprends pas",
        trans: "Excuse me, I don't understand",
        lang: "en",
      },
    ],
    qu: [
      {
        text: "Le livre qu'il lit",
        trans: "The book that he is reading",
        lang: "en",
      },
      {
        text: "La personne qu'il connaît",
        trans: "The person whom he knows",
        lang: "en",
      },
    ],
    rien: [
      {
        text: "Il ne dit rien",
        trans: "He says nothing",
        lang: "en",
      },
      {
        text: "Je ne vois rien",
        trans: "I see nothing",
        lang: "en",
      },
    ],
    si: [
      {
        text: "Si tu viens, je serai content",
        trans: "If you come, I will be happy",
        lang: "en",
      },
      {
        text: "Tu n'aimes pas le café ? - Si, j'aime !",
        trans: "You don't like coffee? - Yes, I do!",
        lang: "en",
      },
    ],
    parce: [
      {
        text: "Je reste parce j'ai faim",
        trans: "I'm staying because I'm hungry",
        lang: "en",
      },
      {
        text: "Il part parce il est fatigué",
        trans: "He's leaving because he's tired",
        lang: "en",
      },
    ],
    end: [
      {
        text: "C'est la fin, end",
        trans: "It's the end, finish",
        lang: "en",
      },
      {
        text: "Nous devons end cette discussion",
        trans: "We need to end this discussion",
        lang: "en",
      },
    ],
  };
  return examples[word] || [];
}

// Create the output JSON file
const outputFile = path.join(__dirname, "misc-words-for-cambridge.json");
const outputContent = JSON.stringify(wordEntries, null, 2);

fs.writeFileSync(outputFile, outputContent, "utf8");

console.log("✅ SUCCESS!");
console.log(`📄 Created: ${outputFile}`);
console.log(`📊 Words processed: ${words.length}`);

console.log("\n🔤 Words by category:");
console.log("INTERJECTIONS:");
words
  .filter((w) => w.pos === "interjection")
  .forEach((word) => {
    console.log(`  - ${word.word}`);
  });

console.log("PRONOUNS:");
words
  .filter((w) => w.pos === "pronoun")
  .forEach((word) => {
    console.log(`  - ${word.word}`);
  });

console.log("CONJUNCTIONS:");
words
  .filter((w) => w.pos === "conjunction")
  .forEach((word) => {
    console.log(`  - ${word.word}`);
  });

console.log("\n📝 Next steps:");
console.log("1. Review the JSON file");
console.log(
  "2. Use the Dictionary Generator to add these to Cambridge dictionary:"
);
console.log(`   node generate-lesson-words.js --file ${outputFile}`);
console.log("3. Or manually add to the respective Cambridge files");
