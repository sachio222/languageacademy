#!/usr/bin/env node

/**
 * Add Verbs to Cambridge Dictionary - Batch 2
 *
 * This script creates comprehensive verb entries with extended conjugation coverage
 * for the second batch of action verbs.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Batch 2: Action verbs (14 verbs)
const batch2Verbs = [
  "attendre",
  "attirer",
  "communiquer",
  "connecter",
  "déplacer",
  "dépêcher",
  "embrasser",
  "encourager",
  "enrichir",
  "exporter",
  "habiller",
  "laver",
  "lever",
  "montrer",
];

// Helper function to get English translations
function getEnglishTranslation(verb) {
  const translations = {
    attendre: "to wait",
    attirer: "to attract",
    communiquer: "to communicate",
    connecter: "to connect",
    déplacer: "to move",
    dépêcher: "to hurry",
    embrasser: "to kiss/embrace",
    encourager: "to encourage",
    enrichir: "to enrich",
    exporter: "to export",
    habiller: "to dress",
    laver: "to wash",
    lever: "to lift/raise",
    montrer: "to show",
  };
  return translations[verb] || "to " + verb;
}

// Helper function to get usage notes
function getUsageNotes(verb) {
  const notes = {
    attendre: "Regular -re verb. Indicates waiting for someone or something",
    attirer: "Regular -er verb. Indicates drawing attention or attraction",
    communiquer: "Regular -er verb. Indicates sharing information or ideas",
    connecter: "Regular -er verb. Indicates linking or joining things together",
    déplacer: "Regular -er verb. Indicates moving from one place to another",
    dépêcher: "Regular -er verb. Indicates hurrying or rushing",
    embrasser: "Regular -er verb. Indicates kissing or embracing someone",
    encourager: "Regular -er verb. Indicates giving support or motivation",
    enrichir: "Regular -ir verb. Indicates making something richer or better",
    exporter: "Regular -er verb. Indicates sending goods to another country",
    habiller: "Regular -er verb. Indicates putting clothes on someone",
    laver: "Regular -er verb. Indicates cleaning with water and soap",
    lever: "Regular -er verb. Indicates raising or lifting something up",
    montrer:
      "Regular -er verb. Indicates displaying or demonstrating something",
  };
  return notes[verb] || "";
}

// Helper function to get examples
function getExamples(verb) {
  const examples = {
    attendre: [
      {
        text: "J'attends le bus",
        trans: "I'm waiting for the bus",
        lang: "en",
      },
      { text: "Nous attendons ici", trans: "We're waiting here", lang: "en" },
    ],
    attirer: [
      {
        text: "Cela attire l'attention",
        trans: "That attracts attention",
        lang: "en",
      },
      { text: "Il attire les regards", trans: "He attracts looks", lang: "en" },
    ],
    communiquer: [
      {
        text: "Nous communiquons par email",
        trans: "We communicate by email",
        lang: "en",
      },
      { text: "Il communique bien", trans: "He communicates well", lang: "en" },
    ],
    connecter: [
      {
        text: "Je connecte l'ordinateur",
        trans: "I connect the computer",
        lang: "en",
      },
      {
        text: "Connectez-vous à internet",
        trans: "Connect to the internet",
        lang: "en",
      },
    ],
    déplacer: [
      { text: "Je déplace la table", trans: "I move the table", lang: "en" },
      {
        text: "Il se déplace rapidement",
        trans: "He moves quickly",
        lang: "en",
      },
    ],
    dépêcher: [
      { text: "Je me dépêche", trans: "I'm hurrying", lang: "en" },
      { text: "Dépêchez-vous !", trans: "Hurry up!", lang: "en" },
    ],
    embrasser: [
      { text: "Il embrasse sa femme", trans: "He kisses his wife", lang: "en" },
      { text: "Je t'embrasse", trans: "I kiss you", lang: "en" },
    ],
    encourager: [
      { text: "Je l'encourage", trans: "I encourage him", lang: "en" },
      {
        text: "Cela encourage les étudiants",
        trans: "That encourages the students",
        lang: "en",
      },
    ],
    enrichir: [
      {
        text: "Cela enrichit la culture",
        trans: "That enriches the culture",
        lang: "en",
      },
      { text: "Il s'enrichit", trans: "He gets richer", lang: "en" },
    ],
    exporter: [
      {
        text: "La France exporte du vin",
        trans: "France exports wine",
        lang: "en",
      },
      {
        text: "Nous exportons nos produits",
        trans: "We export our products",
        lang: "en",
      },
    ],
    habiller: [
      { text: "Je m'habille", trans: "I get dressed", lang: "en" },
      {
        text: "Elle habille ses enfants",
        trans: "She dresses her children",
        lang: "en",
      },
    ],
    laver: [
      { text: "Je lave la voiture", trans: "I wash the car", lang: "en" },
      {
        text: "Elle se lave les mains",
        trans: "She washes her hands",
        lang: "en",
      },
    ],
    lever: [
      { text: "Je lève la main", trans: "I raise my hand", lang: "en" },
      { text: "Le soleil se lève", trans: "The sun rises", lang: "en" },
    ],
    montrer: [
      { text: "Je montre la photo", trans: "I show the photo", lang: "en" },
      { text: "Montrez-moi le chemin", trans: "Show me the way", lang: "en" },
    ],
  };
  return examples[verb] || [];
}

// Helper function to generate comprehensive conjugations
function generateVerbConjugations(verb) {
  const conjugations = [];

  // 1. Main infinitive entry
  conjugations.push({
    word: verb,
    partOfSpeech: "verb",
    translations: [
      {
        language: "en",
        text: getEnglishTranslation(verb),
        confidence: 0.9,
        source: "manual",
      },
    ],
    infinitive: verb,
    tense: "infinitive",
    mood: "infinitive",
    verb_phrases: [
      {
        phrase: `ne ${verb} pas`,
        type: "negation",
        context: `not ${getEnglishTranslation(verb)}`,
        frequency: "common",
      },
    ],
    relationships: [],
    etymology: "",
    register: ["neutral"],
    usage_notes: getUsageNotes(verb),
    regional_variants: [],
    examples: getExamples(verb),
    phonetic: "",
    tags: ["reading_vocabulary"],
    sources: ["manual"],
    verified: false,
    cambridge_data: {
      scraped_at: new Date().toISOString(),
      url: `https://dictionary.cambridge.org/dictionary/french-english/${encodeURIComponent(
        verb
      )}`,
      confidence_score: 0.9,
      last_updated: new Date().toISOString(),
    },
  });

  // 2. Present tense conjugations
  const presentConjugations = {
    je: verb.endsWith("er") ? verb.slice(0, -2) + "e" : verb + "s",
    tu: verb.endsWith("er") ? verb.slice(0, -2) + "es" : verb + "s",
    il: verb.endsWith("er") ? verb.slice(0, -2) + "e" : verb,
    nous: verb.endsWith("er") ? verb.slice(0, -2) + "ons" : verb + "ons",
    vous: verb.endsWith("er") ? verb.slice(0, -2) + "ez" : verb + "ez",
    ils: verb.endsWith("er") ? verb.slice(0, -2) + "ent" : verb + "ent",
  };

  // Handle special cases for -ir verbs
  if (verb === "enrichir") {
    presentConjugations.je = "enrichis";
    presentConjugations.tu = "enrichis";
    presentConjugations.il = "enrichit";
    presentConjugations.nous = "enrichissons";
    presentConjugations.vous = "enrichissez";
    presentConjugations.ils = "enrichissent";
  }

  for (const [person, conjugated] of Object.entries(presentConjugations)) {
    if (conjugated !== verb) {
      conjugations.push({
        word: conjugated,
        partOfSpeech: "verb",
        infinitive: verb,
        tense: "present",
        mood: "indicative",
        person: person,
        number:
          person === "nous" || person === "vous" || person === "ils"
            ? "plural"
            : "singular",
        redirect_to: `${verb}-fr`,
        redirect_type: "conjugated_form",
        base_word: verb,
        verb_phrases: [
          {
            phrase: `${person} ${conjugated}`,
            type: "pronoun_verb",
            context: `${person} ${getEnglishTranslation(verb)}`,
            frequency: "common",
          },
          {
            phrase: `ne ${conjugated} pas`,
            type: "negation",
            context: `${person} does not ${getEnglishTranslation(verb)}`,
            frequency: "common",
          },
        ],
      });
    }
  }

  // 3. Past tense (imperfect) - most common forms
  const imperfectConjugations = {
    je: verb.endsWith("er") ? verb.slice(0, -2) + "ais" : verb + "ais",
    il: verb.endsWith("er") ? verb.slice(0, -2) + "ait" : verb + "ait",
    nous: verb.endsWith("er") ? verb.slice(0, -2) + "ions" : verb + "ions",
    ils: verb.endsWith("er") ? verb.slice(0, -2) + "aient" : verb + "aient",
  };

  // Handle special cases for -ir verbs
  if (verb === "enrichir") {
    imperfectConjugations.je = "enrichissais";
    imperfectConjugations.il = "enrichissait";
    imperfectConjugations.nous = "enrichissions";
    imperfectConjugations.ils = "enrichissaient";
  }

  for (const [person, conjugated] of Object.entries(imperfectConjugations)) {
    conjugations.push({
      word: conjugated,
      partOfSpeech: "verb",
      infinitive: verb,
      tense: "past",
      mood: "indicative",
      person: person,
      number: person === "nous" || person === "ils" ? "plural" : "singular",
      redirect_to: `${verb}-fr`,
      redirect_type: "conjugated_form",
      base_word: verb,
      verb_phrases: [
        {
          phrase: `${person} ${conjugated}`,
          type: "pronoun_verb",
          context: `${person} was ${getEnglishTranslation(verb).replace(
            "to ",
            ""
          )}ing`,
          frequency: "common",
        },
      ],
    });
  }

  // 4. Future tense - most common forms
  const futureConjugations = {
    je: verb.endsWith("er") ? verb.slice(0, -2) + "erai" : verb + "ai",
    il: verb.endsWith("er") ? verb.slice(0, -2) + "era" : verb + "a",
    nous: verb.endsWith("er") ? verb.slice(0, -2) + "erons" : verb + "ons",
    ils: verb.endsWith("er") ? verb.slice(0, -2) + "eront" : verb + "ont",
  };

  // Handle special cases for -ir verbs
  if (verb === "enrichir") {
    futureConjugations.je = "enrichirai";
    futureConjugations.il = "enrichira";
    futureConjugations.nous = "enrichirons";
    futureConjugations.ils = "enrichiront";
  }

  for (const [person, conjugated] of Object.entries(futureConjugations)) {
    conjugations.push({
      word: conjugated,
      partOfSpeech: "verb",
      infinitive: verb,
      tense: "future",
      mood: "indicative",
      person: person,
      number: person === "nous" || person === "ils" ? "plural" : "singular",
      redirect_to: `${verb}-fr`,
      redirect_type: "conjugated_form",
      base_word: verb,
      verb_phrases: [
        {
          phrase: `${person} ${conjugated}`,
          type: "pronoun_verb",
          context: `${person} will ${getEnglishTranslation(verb).replace(
            "to ",
            ""
          )}`,
          frequency: "common",
        },
      ],
    });
  }

  // 5. Past participle
  const pastParticiple = verb.endsWith("er")
    ? verb.slice(0, -2) + "é"
    : verb.endsWith("ir")
    ? verb.slice(0, -2) + "i"
    : verb + "é";
  conjugations.push({
    word: pastParticiple,
    partOfSpeech: "verb",
    infinitive: verb,
    tense: "past",
    mood: "participle",
    person: null,
    number: null,
    redirect_to: `${verb}-fr`,
    redirect_type: "conjugated_form",
    base_word: verb,
    verb_phrases: [
      {
        phrase: `avoir ${pastParticiple}`,
        type: "compound",
        context: `to have ${getEnglishTranslation(verb).replace("to ", "")}ed`,
        frequency: "common",
      },
    ],
  });

  return conjugations;
}

// Generate all verb entries
const allEntries = [];

for (const verb of batch2Verbs) {
  const conjugations = generateVerbConjugations(verb);
  allEntries.push(...conjugations);
}

// Create the output JSON file
const outputFile = path.join(__dirname, "verbs-batch2-for-cambridge.json");
const outputContent = JSON.stringify(allEntries, null, 2);

fs.writeFileSync(outputFile, outputContent, "utf8");

console.log("✅ SUCCESS!");
console.log(`📄 Created: ${outputFile}`);
console.log(`📊 Verbs processed: ${batch2Verbs.length}`);
console.log(`📊 Total entries: ${allEntries.length}`);
console.log(
  `📊 Average conjugations per verb: ${(
    allEntries.length / batch2Verbs.length
  ).toFixed(1)}`
);

console.log("\n🔤 Batch 2 verbs:");
batch2Verbs.forEach((verb) => {
  console.log(`  - ${verb}`);
});

console.log("\n📝 Next steps:");
console.log("1. Review the JSON file");
console.log(
  "2. Use the Dictionary Generator to add these to Cambridge dictionary:"
);
console.log(`   node generate-lesson-words.js --file ${outputFile}`);
console.log("3. The generator will handle Cambridge scraping automatically");
console.log("4. Process remaining batches after this one completes");
