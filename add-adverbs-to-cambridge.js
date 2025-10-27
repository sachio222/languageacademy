#!/usr/bin/env node

/**
 * Add Adverbs to Cambridge Dictionary
 *
 * This script creates a JSON file with all unmet adverbs in the format
 * required by the Dictionary Generator Guide for Cambridge dictionary addition.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Adverbs from the unmet words list
const adverbs = [
  "activement",
  "différemment",
  "également",
  "généralement",
  "internationalement",
  "peu",
  "seulement",
  "souvent",
  "tard",
  "tôt",
];

// Create JSON entries for each adverb
const adverbEntries = adverbs.map((word) => {
  // Basic structure for adverbs
  const entry = {
    word: word,
    partOfSpeech: "adverb",
    translations: [
      {
        language: "en",
        text: getEnglishTranslation(word),
        confidence: 0.9,
        source: "manual",
      },
    ],
    relationships: [],
    etymology: "",
    register: ["neutral"],
    usage_notes: getUsageNotes(word),
    regional_variants: [],
    examples: getExamples(word),
    phonetic: "",
    tags: ["reading_vocabulary"],
    sources: ["manual"],
    verified: false,
    cambridge_data: {
      scraped_at: new Date().toISOString(),
      url: `https://dictionary.cambridge.org/dictionary/french-english/${word}`,
      confidence_score: 0.9,
      last_updated: new Date().toISOString(),
    },
  };

  return entry;
});

// Helper function to get English translations
function getEnglishTranslation(word) {
  const translations = {
    activement: "actively",
    différemment: "differently",
    également: "also, equally",
    généralement: "generally, usually",
    internationalement: "internationally",
    peu: "little, not much",
    seulement: "only, just",
    souvent: "often",
    tard: "late",
    tôt: "early",
  };
  return translations[word] || "adverb";
}

// Helper function to get usage notes
function getUsageNotes(word) {
  const notes = {
    activement:
      "Used to describe how an action is performed with energy or enthusiasm",
    différemment:
      "Used to indicate a different manner or way of doing something",
    également: "Can mean 'also' or 'equally' - often used to add information",
    généralement: "Indicates what usually happens or is generally true",
    internationalement: "Relates to international scope or perspective",
    peu: "Indicates small quantity or degree - often used with 'de'",
    seulement:
      "Indicates limitation or restriction - can be used alone or with 'ne...que'",
    souvent: "Indicates frequency - used with present, past, and future tenses",
    tard: "Indicates lateness in time - opposite of 'tôt'",
    tôt: "Indicates earliness in time - opposite of 'tard'",
  };
  return notes[word] || "";
}

// Helper function to get examples
function getExamples(word) {
  const examples = {
    activement: [
      {
        text: "Il participe activement aux discussions",
        trans: "He actively participates in discussions",
        lang: "en",
      },
      {
        text: "Elle travaille activement sur ce projet",
        trans: "She is actively working on this project",
        lang: "en",
      },
    ],
    différemment: [
      {
        text: "Je vois les choses différemment",
        trans: "I see things differently",
        lang: "en",
      },
      {
        text: "Il réagit différemment chaque fois",
        trans: "He reacts differently each time",
        lang: "en",
      },
    ],
    également: [
      {
        text: "Il est également professeur",
        trans: "He is also a teacher",
        lang: "en",
      },
      {
        text: "Nous sommes également d'accord",
        trans: "We also agree",
        lang: "en",
      },
    ],
    généralement: [
      {
        text: "Il arrive généralement à l'heure",
        trans: "He generally arrives on time",
        lang: "en",
      },
      {
        text: "Généralement, c'est plus facile",
        trans: "Generally, it's easier",
        lang: "en",
      },
    ],
    internationalement: [
      {
        text: "Cette entreprise est internationalement reconnue",
        trans: "This company is internationally recognized",
        lang: "en",
      },
      {
        text: "Il voyage internationalement",
        trans: "He travels internationally",
        lang: "en",
      },
    ],
    peu: [
      {
        text: "Il mange peu",
        trans: "He eats little",
        lang: "en",
      },
      {
        text: "J'ai peu de temps",
        trans: "I have little time",
        lang: "en",
      },
    ],
    seulement: [
      {
        text: "Il y a seulement trois personnes",
        trans: "There are only three people",
        lang: "en",
      },
      {
        text: "Je veux seulement te parler",
        trans: "I just want to talk to you",
        lang: "en",
      },
    ],
    souvent: [
      {
        text: "Nous nous voyons souvent",
        trans: "We see each other often",
        lang: "en",
      },
      {
        text: "Il arrive souvent en retard",
        trans: "He often arrives late",
        lang: "en",
      },
    ],
    tard: [
      {
        text: "Il est arrivé tard",
        trans: "He arrived late",
        lang: "en",
      },
      {
        text: "Nous travaillons tard",
        trans: "We work late",
        lang: "en",
      },
    ],
    tôt: [
      {
        text: "Il se lève tôt",
        trans: "He gets up early",
        lang: "en",
      },
      {
        text: "Nous partons tôt demain",
        trans: "We're leaving early tomorrow",
        lang: "en",
      },
    ],
  };
  return examples[word] || [];
}

// Create the output JSON file
const outputFile = path.join(__dirname, "adverbs-for-cambridge.json");
const outputContent = JSON.stringify(adverbEntries, null, 2);

fs.writeFileSync(outputFile, outputContent, "utf8");

console.log("✅ SUCCESS!");
console.log(`📄 Created: ${outputFile}`);
console.log(`📊 Adverbs processed: ${adverbs.length}`);

console.log("\n🔤 Adverbs added:");
adverbs.forEach((adverb) => {
  console.log(`  - ${adverb}`);
});

console.log("\n📝 Next steps:");
console.log("1. Review the JSON file");
console.log(
  "2. Use the Dictionary Generator to add these to Cambridge dictionary:"
);
console.log(`   node generate-lesson-words.js --file ${outputFile}`);
console.log("3. Or manually add to the Cambridge adverbs.js file");
