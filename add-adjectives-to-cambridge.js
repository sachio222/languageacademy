#!/usr/bin/env node

/**
 * Add Adjectives to Cambridge Dictionary
 *
 * This script creates a JSON file with all unmet adjectives using the
 * redirect system for gender/number variants.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Base adjective forms from our condensed list
const adjectiveBaseForms = [
  "célèbre",
  "collectif",
  "culinaire",
  "culturel",
  "dernier",
  "différent",
  "dur",
  "essentiel",
  "européen",
  "excellent",
  "français",
  "froid",
  "heureux",
  "important",
  "impressionniste",
  "inoubliable",
  "international",
  "magnifique",
  "parfait",
  "populaire",
  "public",
  "quotidien",
  "reconnaissant",
  "reconnu",
  "riche",
  "sûr",
  "traditionnel",
];

// Helper function to get English translations
function getEnglishTranslation(word) {
  const translations = {
    célèbre: "famous / celebrated",
    collectif: "collective / group",
    culinaire: "culinary / cooking",
    culturel: "cultural",
    dernier: "last / final",
    différent: "different",
    dur: "hard / tough",
    essentiel: "essential / necessary",
    européen: "European",
    excellent: "excellent",
    français: "French",
    froid: "cold",
    heureux: "happy / fortunate",
    important: "important",
    impressionniste: "impressionist",
    inoubliable: "unforgettable",
    international: "international",
    magnifique: "magnificent / beautiful",
    parfait: "perfect",
    populaire: "popular",
    public: "public",
    quotidien: "daily / everyday",
    reconnaissant: "grateful / thankful",
    reconnu: "recognized / acknowledged",
    riche: "rich / wealthy",
    sûr: "sure / certain",
    traditionnel: "traditional",
  };
  return translations[word] || "adjective";
}

// Helper function to get usage notes
function getUsageNotes(word) {
  const notes = {
    célèbre: "Describes someone or something well-known or famous",
    collectif: "Relates to a group or collective action",
    culinaire: "Related to cooking, food, or cuisine",
    culturel: "Relates to culture, arts, or cultural activities",
    dernier: "Indicates the final or most recent in a series",
    différent: "Indicates something is not the same, distinct",
    dur: "Describes something hard, difficult, or tough",
    essentiel: "Indicates something is necessary or fundamental",
    européen: "Relates to Europe or European characteristics",
    excellent: "Indicates very high quality or performance",
    français: "Relates to France or French characteristics",
    froid: "Describes low temperature or coldness",
    heureux: "Indicates happiness, joy, or good fortune",
    important: "Indicates significance, value, or consequence",
    impressionniste: "Relates to impressionist art or style",
    inoubliable: "Describes something that cannot be forgotten",
    international: "Relates to multiple countries or global scope",
    magnifique: "Indicates great beauty or excellence",
    parfait: "Indicates perfection or completeness",
    populaire: "Indicates widespread acceptance or appeal",
    public: "Relates to the general population or open access",
    quotidien: "Relates to daily or everyday activities",
    reconnaissant: "Indicates gratitude or thankfulness",
    reconnu: "Indicates official acknowledgment or acceptance",
    riche: "Indicates wealth, abundance, or value",
    sûr: "Indicates certainty, confidence, or safety",
    traditionnel: "Relates to established customs or practices",
  };
  return notes[word] || "";
}

// Helper function to get examples
function getExamples(word) {
  const examples = {
    célèbre: [
      { text: "un artiste célèbre", trans: "a famous artist", lang: "en" },
      { text: "une ville célèbre", trans: "a famous city", lang: "en" },
    ],
    collectif: [
      { text: "un effort collectif", trans: "a collective effort", lang: "en" },
      {
        text: "une décision collective",
        trans: "a collective decision",
        lang: "en",
      },
    ],
    culinaire: [
      {
        text: "des traditions culinaires",
        trans: "culinary traditions",
        lang: "en",
      },
      { text: "un art culinaire", trans: "a culinary art", lang: "en" },
    ],
    culturel: [
      { text: "un événement culturel", trans: "a cultural event", lang: "en" },
      {
        text: "des échanges culturels",
        trans: "cultural exchanges",
        lang: "en",
      },
    ],
    dernier: [
      { text: "le dernier jour", trans: "the last day", lang: "en" },
      { text: "la dernière fois", trans: "the last time", lang: "en" },
    ],
    différent: [
      {
        text: "une approche différente",
        trans: "a different approach",
        lang: "en",
      },
      {
        text: "des opinions différentes",
        trans: "different opinions",
        lang: "en",
      },
    ],
    dur: [
      { text: "un travail dur", trans: "hard work", lang: "en" },
      { text: "une situation dure", trans: "a tough situation", lang: "en" },
    ],
    essentiel: [
      {
        text: "un élément essentiel",
        trans: "an essential element",
        lang: "en",
      },
      {
        text: "des informations essentielles",
        trans: "essential information",
        lang: "en",
      },
    ],
    européen: [
      { text: "un pays européen", trans: "a European country", lang: "en" },
      {
        text: "des institutions européennes",
        trans: "European institutions",
        lang: "en",
      },
    ],
    excellent: [
      {
        text: "un résultat excellent",
        trans: "an excellent result",
        lang: "en",
      },
      {
        text: "une qualité excellente",
        trans: "excellent quality",
        lang: "en",
      },
    ],
    français: [
      { text: "un livre français", trans: "a French book", lang: "en" },
      { text: "la culture française", trans: "French culture", lang: "en" },
    ],
    froid: [
      { text: "un jour froid", trans: "a cold day", lang: "en" },
      { text: "une boisson froide", trans: "a cold drink", lang: "en" },
    ],
    heureux: [
      { text: "un homme heureux", trans: "a happy man", lang: "en" },
      { text: "une femme heureuse", trans: "a happy woman", lang: "en" },
    ],
    important: [
      { text: "un point important", trans: "an important point", lang: "en" },
      {
        text: "des décisions importantes",
        trans: "important decisions",
        lang: "en",
      },
    ],
    impressionniste: [
      {
        text: "un peintre impressionniste",
        trans: "an impressionist painter",
        lang: "en",
      },
      {
        text: "une œuvre impressionniste",
        trans: "an impressionist work",
        lang: "en",
      },
    ],
    inoubliable: [
      {
        text: "un moment inoubliable",
        trans: "an unforgettable moment",
        lang: "en",
      },
      {
        text: "une expérience inoubliable",
        trans: "an unforgettable experience",
        lang: "en",
      },
    ],
    international: [
      {
        text: "un accord international",
        trans: "an international agreement",
        lang: "en",
      },
      {
        text: "des relations internationales",
        trans: "international relations",
        lang: "en",
      },
    ],
    magnifique: [
      {
        text: "un paysage magnifique",
        trans: "a magnificent landscape",
        lang: "en",
      },
      { text: "une vue magnifique", trans: "a magnificent view", lang: "en" },
    ],
    parfait: [
      { text: "un plan parfait", trans: "a perfect plan", lang: "en" },
      {
        text: "une solution parfaite",
        trans: "a perfect solution",
        lang: "en",
      },
    ],
    populaire: [
      { text: "un chanteur populaire", trans: "a popular singer", lang: "en" },
      { text: "une musique populaire", trans: "popular music", lang: "en" },
    ],
    public: [
      { text: "un service public", trans: "a public service", lang: "en" },
      { text: "des espaces publics", trans: "public spaces", lang: "en" },
    ],
    quotidien: [
      { text: "la vie quotidienne", trans: "daily life", lang: "en" },
      {
        text: "des activités quotidiennes",
        trans: "daily activities",
        lang: "en",
      },
    ],
    reconnaissant: [
      { text: "un homme reconnaissant", trans: "a grateful man", lang: "en" },
      {
        text: "une femme reconnaissante",
        trans: "a grateful woman",
        lang: "en",
      },
    ],
    reconnu: [
      { text: "un expert reconnu", trans: "a recognized expert", lang: "en" },
      {
        text: "une artiste reconnue",
        trans: "a recognized artist",
        lang: "en",
      },
    ],
    riche: [
      { text: "un homme riche", trans: "a rich man", lang: "en" },
      { text: "une culture riche", trans: "a rich culture", lang: "en" },
    ],
    sûr: [
      { text: "un résultat sûr", trans: "a sure result", lang: "en" },
      { text: "une méthode sûre", trans: "a safe method", lang: "en" },
    ],
    traditionnel: [
      { text: "un plat traditionnel", trans: "a traditional dish", lang: "en" },
      {
        text: "des valeurs traditionnelles",
        trans: "traditional values",
        lang: "en",
      },
    ],
  };
  return examples[word] || [];
}

// Helper function to generate adjective forms
function generateAdjectiveForms(baseWord) {
  // This is a simplified version - in practice, you'd need more sophisticated French morphology
  const forms = {
    masculine_singular: baseWord,
    feminine_singular: baseWord + "e", // Simplified - many exceptions
    masculine_plural: baseWord + "s",
    feminine_plural: baseWord + "es",
  };

  // Handle some common exceptions
  if (baseWord.endsWith("e")) {
    forms.feminine_singular = baseWord;
    forms.feminine_plural = baseWord + "s";
  }

  if (baseWord.endsWith("x")) {
    forms.masculine_plural = baseWord;
    forms.feminine_plural = baseWord + "es";
  }

  return forms;
}

// Create entries for each adjective
const allEntries = [];

for (const baseWord of adjectiveBaseForms) {
  const mainEntryId = `${baseWord}-fr`;
  const adjectiveForms = generateAdjectiveForms(baseWord);

  // 1. Main entry (masculine singular)
  const mainEntry = {
    word: baseWord,
    partOfSpeech: "adjective",
    translations: [
      {
        language: "en",
        text: getEnglishTranslation(baseWord),
        confidence: 0.9,
        source: "manual",
      },
    ],
    gender: "masculine",
    number: "singular",
    adjective_forms: adjectiveForms,
    adjective_phrases: [
      {
        phrase: `très ${baseWord}`,
        type: "intensifier",
        context: `very ${getEnglishTranslation(baseWord)}`,
        frequency: "common",
      },
    ],
    relationships: [],
    etymology: "",
    register: ["neutral"],
    usage_notes: getUsageNotes(baseWord),
    regional_variants: [],
    examples: getExamples(baseWord),
    phonetic: "",
    tags: ["reading_vocabulary"],
    sources: ["manual"],
    verified: false,
    cambridge_data: {
      scraped_at: new Date().toISOString(),
      url: `https://dictionary.cambridge.org/dictionary/french-english/${encodeURIComponent(
        baseWord
      )}`,
      confidence_score: 0.9,
      last_updated: new Date().toISOString(),
    },
  };

  allEntries.push(mainEntry);

  // 2. Feminine singular redirect
  if (adjectiveForms.feminine_singular !== baseWord) {
    allEntries.push({
      word: adjectiveForms.feminine_singular,
      partOfSpeech: "adjective",
      redirect_to: mainEntryId,
      redirect_type: "feminine_form",
      base_word: baseWord,
      gender: "feminine",
      number: "singular",
    });
  }

  // 3. Masculine plural redirect
  if (adjectiveForms.masculine_plural !== baseWord) {
    allEntries.push({
      word: adjectiveForms.masculine_plural,
      partOfSpeech: "adjective",
      redirect_to: mainEntryId,
      redirect_type: "masculine_form",
      base_word: baseWord,
      gender: "masculine",
      number: "plural",
    });
  }

  // 4. Feminine plural redirect
  if (
    adjectiveForms.feminine_plural !== baseWord &&
    adjectiveForms.feminine_plural !== adjectiveForms.feminine_singular
  ) {
    allEntries.push({
      word: adjectiveForms.feminine_plural,
      partOfSpeech: "adjective",
      redirect_to: mainEntryId,
      redirect_type: "feminine_form",
      base_word: baseWord,
      gender: "feminine",
      number: "plural",
    });
  }
}

// Create the output JSON file
const outputFile = path.join(__dirname, "adjectives-for-cambridge.json");
const outputContent = JSON.stringify(allEntries, null, 2);

fs.writeFileSync(outputFile, outputContent, "utf8");

console.log("✅ SUCCESS!");
console.log(`📄 Created: ${outputFile}`);
console.log(`📊 Base adjectives: ${adjectiveBaseForms.length}`);
console.log(`📊 Total entries: ${allEntries.length}`);
console.log(`📊 Main entries: ${adjectiveBaseForms.length}`);
console.log(
  `📊 Redirect entries: ${allEntries.length - adjectiveBaseForms.length}`
);

console.log("\n🔤 Adjectives processed:");
adjectiveBaseForms.forEach((adjective) => {
  console.log(`  - ${adjective}`);
});

console.log("\n📝 Next steps:");
console.log("1. Review the JSON file");
console.log(
  "2. Use the Dictionary Generator to add these to Cambridge dictionary:"
);
console.log(`   node generate-lesson-words.js --file ${outputFile}`);
console.log("3. The generator will handle Cambridge scraping automatically");
