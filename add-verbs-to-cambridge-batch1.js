#!/usr/bin/env node

/**
 * Add Verbs to Cambridge Dictionary - Batch 1
 *
 * This script creates comprehensive verb entries with extended conjugation coverage
 * for the first batch of essential verbs.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Batch 1: Essential verbs (14 verbs)
const batch1Verbs = [
  "acheter",
  "admirer",
  "arriver",
  "changer",
  "commencer",
  "créer",
  "décider",
  "découvrir",
  "essayer",
  "fonctionner",
  "habiter",
  "marcher",
  "monter",
  "regarder",
];

// Helper function to get English translations
function getEnglishTranslation(verb) {
  const translations = {
    acheter: "to buy",
    admirer: "to admire",
    arriver: "to arrive",
    changer: "to change",
    commencer: "to begin/start",
    créer: "to create",
    décider: "to decide",
    découvrir: "to discover",
    essayer: "to try",
    fonctionner: "to function/work",
    habiter: "to live/reside",
    marcher: "to walk",
    monter: "to go up/climb",
    regarder: "to look/watch",
  };
  return translations[verb] || "to " + verb;
}

// Helper function to get usage notes
function getUsageNotes(verb) {
  const notes = {
    acheter: "Regular -er verb. Used for purchasing items or acquiring things",
    admirer:
      "Regular -er verb. Expresses appreciation or respect for someone/something",
    arriver:
      "Regular -er verb. Indicates reaching a destination or occurrence of events",
    changer: "Regular -er verb. Indicates transformation or modification",
    commencer:
      "Regular -er verb with spelling change (c→ç). Indicates beginning of action",
    créer: "Regular -er verb. Indicates bringing something new into existence",
    décider: "Regular -er verb. Indicates making a choice or determination",
    découvrir: "Regular -er verb. Indicates finding or learning something new",
    essayer: "Regular -er verb. Indicates attempting or testing something",
    fonctionner: "Regular -er verb. Indicates operation or working properly",
    habiter: "Regular -er verb. Indicates living in a place or residing",
    marcher: "Regular -er verb. Indicates walking or functioning properly",
    monter: "Regular -er verb. Indicates upward movement or climbing",
    regarder: "Regular -er verb. Indicates looking at or watching something",
  };
  return notes[verb] || "";
}

// Helper function to get examples
function getExamples(verb) {
  const examples = {
    acheter: [
      { text: "J'achète du pain", trans: "I buy bread", lang: "en" },
      { text: "Elle achète une voiture", trans: "She buys a car", lang: "en" },
    ],
    admirer: [
      {
        text: "J'admire ce tableau",
        trans: "I admire this painting",
        lang: "en",
      },
      {
        text: "Nous admirons son courage",
        trans: "We admire his courage",
        lang: "en",
      },
    ],
    arriver: [
      {
        text: "Je vais arriver bientôt",
        trans: "I will arrive soon",
        lang: "en",
      },
      {
        text: "Qu'est-ce qui arrive ?",
        trans: "What's happening?",
        lang: "en",
      },
    ],
    changer: [
      { text: "Je change d'avis", trans: "I change my mind", lang: "en" },
      {
        text: "Il change de chemise",
        trans: "He changes his shirt",
        lang: "en",
      },
    ],
    commencer: [
      {
        text: "Le film commence à 8h",
        trans: "The movie starts at 8pm",
        lang: "en",
      },
      {
        text: "Nous commençons demain",
        trans: "We start tomorrow",
        lang: "en",
      },
    ],
    créer: [
      {
        text: "Il crée une entreprise",
        trans: "He creates a company",
        lang: "en",
      },
      { text: "Elle crée de l'art", trans: "She creates art", lang: "en" },
    ],
    décider: [
      { text: "Je décide de partir", trans: "I decide to leave", lang: "en" },
      {
        text: "Nous décidons ensemble",
        trans: "We decide together",
        lang: "en",
      },
    ],
    découvrir: [
      {
        text: "Je découvre un secret",
        trans: "I discover a secret",
        lang: "en",
      },
      {
        text: "Elle découvre la vérité",
        trans: "She discovers the truth",
        lang: "en",
      },
    ],
    essayer: [
      {
        text: "J'essaie de comprendre",
        trans: "I try to understand",
        lang: "en",
      },
      { text: "Essaie cette robe", trans: "Try this dress", lang: "en" },
    ],
    fonctionner: [
      {
        text: "L'ordinateur fonctionne bien",
        trans: "The computer works well",
        lang: "en",
      },
      { text: "Ça ne fonctionne pas", trans: "It doesn't work", lang: "en" },
    ],
    habiter: [
      { text: "J'habite à Paris", trans: "I live in Paris", lang: "en" },
      { text: "Ils habitent ici", trans: "They live here", lang: "en" },
    ],
    marcher: [
      {
        text: "Je marche tous les jours",
        trans: "I walk every day",
        lang: "en",
      },
      { text: "Ça marche !", trans: "It works!", lang: "en" },
    ],
    monter: [
      { text: "Je monte l'escalier", trans: "I go up the stairs", lang: "en" },
      {
        text: "Il monte sur la montagne",
        trans: "He climbs the mountain",
        lang: "en",
      },
    ],
    regarder: [
      {
        text: "Je regarde la télévision",
        trans: "I watch television",
        lang: "en",
      },
      { text: "Regarde-moi", trans: "Look at me", lang: "en" },
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

  // Handle special cases for common verbs
  if (verb === "acheter") {
    presentConjugations.je = "achète";
    presentConjugations.tu = "achètes";
    presentConjugations.il = "achète";
    presentConjugations.nous = "achetons";
    presentConjugations.vous = "achetez";
    presentConjugations.ils = "achètent";
  } else if (verb === "commencer") {
    presentConjugations.je = "commence";
    presentConjugations.tu = "commences";
    presentConjugations.il = "commence";
    presentConjugations.nous = "commençons";
    presentConjugations.vous = "commencez";
    presentConjugations.ils = "commencent";
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

for (const verb of batch1Verbs) {
  const conjugations = generateVerbConjugations(verb);
  allEntries.push(...conjugations);
}

// Create the output JSON file
const outputFile = path.join(__dirname, "verbs-batch1-for-cambridge.json");
const outputContent = JSON.stringify(allEntries, null, 2);

fs.writeFileSync(outputFile, outputContent, "utf8");

console.log("✅ SUCCESS!");
console.log(`📄 Created: ${outputFile}`);
console.log(`📊 Verbs processed: ${batch1Verbs.length}`);
console.log(`📊 Total entries: ${allEntries.length}`);
console.log(
  `📊 Average conjugations per verb: ${(
    allEntries.length / batch1Verbs.length
  ).toFixed(1)}`
);

console.log("\n🔤 Batch 1 verbs:");
batch1Verbs.forEach((verb) => {
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
