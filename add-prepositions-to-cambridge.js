#!/usr/bin/env node

/**
 * Add Prepositions to Cambridge Dictionary
 *
 * This script creates a JSON file with all unmet prepositions
 * in the format required by the Dictionary Generator Guide.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Prepositions from the unmet words list
const prepositions = ["autour", "bas", "delà", "grâce", "loin", "près", "via"];

// Create JSON entries for each preposition
const prepositionEntries = prepositions.map((word) => {
  const entry = {
    word: word,
    partOfSpeech: "preposition",
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
function getEnglishTranslation(word) {
  const translations = {
    autour: "around / about",
    bas: "down / low / below",
    delà: "beyond / on the other side",
    grâce: "thanks to / due to",
    loin: "far / distant",
    près: "near / close to",
    via: "via / through / by way of",
  };
  return translations[word] || "preposition";
}

// Helper function to get usage notes
function getUsageNotes(word) {
  const notes = {
    autour:
      "Indicates location around or about something. Often used with 'de' (autour de)",
    bas: "Indicates downward direction or low position. Can be used alone or with 'en bas'",
    delà: "Indicates something beyond or on the other side. Often used with 'au-delà'",
    grâce:
      "Indicates cause or reason, meaning 'thanks to' or 'due to'. Used with 'à' (grâce à)",
    loin: "Indicates distance or remoteness. Often used with 'de' (loin de)",
    près: "Indicates proximity or closeness. Often used with 'de' (près de)",
    via: "Indicates route or means of passage. Used to show how something is done or achieved",
  };
  return notes[word] || "";
}

// Helper function to get examples
function getExamples(word) {
  const examples = {
    autour: [
      {
        text: "Il marche autour du parc",
        trans: "He walks around the park",
        lang: "en",
      },
      {
        text: "Les enfants jouent autour de la maison",
        trans: "The children play around the house",
        lang: "en",
      },
    ],
    bas: [
      {
        text: "Il regarde en bas",
        trans: "He looks down",
        lang: "en",
      },
      {
        text: "Le prix est bas",
        trans: "The price is low",
        lang: "en",
      },
    ],
    delà: [
      {
        text: "Au-delà de la rivière",
        trans: "Beyond the river",
        lang: "en",
      },
      {
        text: "Il habite delà la montagne",
        trans: "He lives beyond the mountain",
        lang: "en",
      },
    ],
    grâce: [
      {
        text: "Grâce à toi, j'ai réussi",
        trans: "Thanks to you, I succeeded",
        lang: "en",
      },
      {
        text: "Grâce à la pluie, le jardin est vert",
        trans: "Thanks to the rain, the garden is green",
        lang: "en",
      },
    ],
    loin: [
      {
        text: "Il habite loin de la ville",
        trans: "He lives far from the city",
        lang: "en",
      },
      {
        text: "L'école est loin d'ici",
        trans: "The school is far from here",
        lang: "en",
      },
    ],
    près: [
      {
        text: "Il habite près de la gare",
        trans: "He lives near the train station",
        lang: "en",
      },
      {
        text: "L'hôtel est près du centre",
        trans: "The hotel is near the center",
        lang: "en",
      },
    ],
    via: [
      {
        text: "Je voyage via Paris",
        trans: "I'm traveling via Paris",
        lang: "en",
      },
      {
        text: "Il a appris via internet",
        trans: "He learned via the internet",
        lang: "en",
      },
    ],
  };
  return examples[word] || [];
}

// Create the output JSON file
const outputFile = path.join(__dirname, "prepositions-for-cambridge.json");
const outputContent = JSON.stringify(prepositionEntries, null, 2);

fs.writeFileSync(outputFile, outputContent, "utf8");

console.log("✅ SUCCESS!");
console.log(`📄 Created: ${outputFile}`);
console.log(`📊 Prepositions processed: ${prepositions.length}`);

console.log("\n🔤 Prepositions added:");
prepositions.forEach((preposition) => {
  console.log(`  - ${preposition}`);
});

console.log("\n📝 Next steps:");
console.log("1. Review the JSON file");
console.log(
  "2. Use the Dictionary Generator to add these to Cambridge dictionary:"
);
console.log(`   node generate-lesson-words.js --file ${outputFile}`);
console.log("3. Or manually add to the Cambridge prepositions.js file");
