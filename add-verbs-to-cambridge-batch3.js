#!/usr/bin/env node

/**
 * Add Verbs to Cambridge Dictionary - Batch 3
 *
 * This script creates comprehensive verb entries with extended conjugation coverage
 * for the third batch of mental/emotional verbs.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Batch 3: Mental/emotional verbs (14 verbs)
const batch3Verbs = [
  "adorer",
  "aider",
  "amuser",
  "appeler",
  "asseoir",
  "participer",
  "perdre",
  "permettre",
  "plaire",
  "poser",
  "préférer",
  "préparer",
  "préserver",
  "regretter",
];

// Helper function to get English translations
function getEnglishTranslation(verb) {
  const translations = {
    adorer: "to adore/love",
    aider: "to help",
    amuser: "to amuse/entertain",
    appeler: "to call",
    asseoir: "to sit",
    participer: "to participate",
    perdre: "to lose",
    permettre: "to allow/permit",
    plaire: "to please",
    poser: "to put/place",
    préférer: "to prefer",
    préparer: "to prepare",
    préserver: "to preserve",
    regretter: "to regret",
  };
  return translations[verb] || "to " + verb;
}

// Helper function to get usage notes
function getUsageNotes(verb) {
  const notes = {
    adorer:
      "Regular -er verb. Expresses strong affection or love for someone/something",
    aider:
      "Regular -er verb. Indicates providing assistance or support to someone",
    amuser: "Regular -er verb. Indicates entertaining or amusing someone",
    appeler:
      "Regular -er verb with spelling change (l→ll). Indicates calling someone or something",
    asseoir:
      "Irregular verb. Indicates sitting down or placing someone in a seated position",
    participer:
      "Regular -er verb. Indicates taking part in an activity or event",
    perdre: "Regular -re verb. Indicates losing something or someone",
    permettre:
      "Regular -re verb. Indicates giving permission or making something possible",
    plaire: "Irregular verb. Indicates pleasing or being pleasing to someone",
    poser: "Regular -er verb. Indicates placing or putting something down",
    préférer:
      "Regular -er verb with spelling change (é→è). Indicates liking one thing more than another",
    préparer:
      "Regular -er verb. Indicates getting ready or making something ready",
    préserver:
      "Regular -er verb. Indicates protecting or maintaining something",
    regretter:
      "Regular -er verb. Indicates feeling sorry about something or missing someone",
  };
  return notes[verb] || "";
}

// Helper function to get examples
function getExamples(verb) {
  const examples = {
    adorer: [
      { text: "J'adore cette chanson", trans: "I love this song", lang: "en" },
      {
        text: "Elle adore son travail",
        trans: "She loves her job",
        lang: "en",
      },
    ],
    aider: [
      { text: "Je t'aide", trans: "I'm helping you", lang: "en" },
      {
        text: "Aidez-moi, s'il vous plaît",
        trans: "Help me, please",
        lang: "en",
      },
    ],
    amuser: [
      { text: "Cela m'amuse", trans: "That amuses me", lang: "en" },
      {
        text: "Il amuse les enfants",
        trans: "He entertains the children",
        lang: "en",
      },
    ],
    appeler: [
      {
        text: "Je t'appelle demain",
        trans: "I'll call you tomorrow",
        lang: "en",
      },
      {
        text: "Comment vous appelez-vous ?",
        trans: "What's your name?",
        lang: "en",
      },
    ],
    asseoir: [
      { text: "Je m'assieds", trans: "I sit down", lang: "en" },
      { text: "Asseyez-vous", trans: "Sit down", lang: "en" },
    ],
    participer: [
      {
        text: "Je participe à la réunion",
        trans: "I participate in the meeting",
        lang: "en",
      },
      {
        text: "Nous participons ensemble",
        trans: "We participate together",
        lang: "en",
      },
    ],
    perdre: [
      { text: "Je perds mes clés", trans: "I lose my keys", lang: "en" },
      { text: "Il perd du temps", trans: "He wastes time", lang: "en" },
    ],
    permettre: [
      {
        text: "Cela me permet de travailler",
        trans: "That allows me to work",
        lang: "en",
      },
      {
        text: "Permettez-moi de vous aider",
        trans: "Allow me to help you",
        lang: "en",
      },
    ],
    plaire: [
      { text: "Cela me plaît", trans: "I like that", lang: "en" },
      {
        text: "Il plaît à tout le monde",
        trans: "Everyone likes him",
        lang: "en",
      },
    ],
    poser: [
      { text: "Je pose la question", trans: "I ask the question", lang: "en" },
      {
        text: "Posez le livre sur la table",
        trans: "Put the book on the table",
        lang: "en",
      },
    ],
    préférer: [
      { text: "Je préfère le café", trans: "I prefer coffee", lang: "en" },
      {
        text: "Elle préfère rester ici",
        trans: "She prefers to stay here",
        lang: "en",
      },
    ],
    préparer: [
      { text: "Je prépare le dîner", trans: "I prepare dinner", lang: "en" },
      { text: "Préparez-vous", trans: "Get ready", lang: "en" },
    ],
    préserver: [
      {
        text: "Nous préservons la nature",
        trans: "We preserve nature",
        lang: "en",
      },
      {
        text: "Cela préserve la santé",
        trans: "That preserves health",
        lang: "en",
      },
    ],
    regretter: [
      {
        text: "Je regrette cette décision",
        trans: "I regret this decision",
        lang: "en",
      },
      {
        text: "Il regrette de partir",
        trans: "He regrets leaving",
        lang: "en",
      },
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

  // Handle special cases for irregular verbs
  if (verb === "appeler") {
    presentConjugations.je = "appelle";
    presentConjugations.tu = "appelles";
    presentConjugations.il = "appelle";
    presentConjugations.nous = "appelons";
    presentConjugations.vous = "appelez";
    presentConjugations.ils = "appellent";
  } else if (verb === "préférer") {
    presentConjugations.je = "préfère";
    presentConjugations.tu = "préfères";
    presentConjugations.il = "préfère";
    presentConjugations.nous = "préférons";
    presentConjugations.vous = "préférez";
    presentConjugations.ils = "préfèrent";
  } else if (verb === "asseoir") {
    presentConjugations.je = "assieds";
    presentConjugations.tu = "assieds";
    presentConjugations.il = "assoit";
    presentConjugations.nous = "asseyons";
    presentConjugations.vous = "asseyez";
    presentConjugations.ils = "asseyent";
  } else if (verb === "plaire") {
    presentConjugations.je = "plais";
    presentConjugations.tu = "plais";
    presentConjugations.il = "plaît";
    presentConjugations.nous = "plaisons";
    presentConjugations.vous = "plaisez";
    presentConjugations.ils = "plaisent";
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

  // Handle special cases for irregular verbs
  if (verb === "appeler") {
    imperfectConjugations.je = "appelais";
    imperfectConjugations.il = "appelait";
    imperfectConjugations.nous = "appelions";
    imperfectConjugations.ils = "appelaient";
  } else if (verb === "préférer") {
    imperfectConjugations.je = "préférais";
    imperfectConjugations.il = "préférait";
    imperfectConjugations.nous = "préférions";
    imperfectConjugations.ils = "préféraient";
  } else if (verb === "asseoir") {
    imperfectConjugations.je = "asseyais";
    imperfectConjugations.il = "asseyait";
    imperfectConjugations.nous = "asseyions";
    imperfectConjugations.ils = "asseyaient";
  } else if (verb === "plaire") {
    imperfectConjugations.je = "plaisais";
    imperfectConjugations.il = "plaisait";
    imperfectConjugations.nous = "plaisions";
    imperfectConjugations.ils = "plaisaient";
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

  // Handle special cases for irregular verbs
  if (verb === "appeler") {
    futureConjugations.je = "appellerai";
    futureConjugations.il = "appellera";
    futureConjugations.nous = "appellerons";
    futureConjugations.ils = "appelleront";
  } else if (verb === "préférer") {
    futureConjugations.je = "préférerai";
    futureConjugations.il = "préférera";
    futureConjugations.nous = "préférerons";
    futureConjugations.ils = "préféreront";
  } else if (verb === "asseoir") {
    futureConjugations.je = "assoirai";
    futureConjugations.il = "assoiura";
    futureConjugations.nous = "assoirons";
    futureConjugations.ils = "assoiront";
  } else if (verb === "plaire") {
    futureConjugations.je = "plairai";
    futureConjugations.il = "plaira";
    futureConjugations.nous = "plairons";
    futureConjugations.ils = "plairont";
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
    : verb.endsWith("re")
    ? verb.slice(0, -2) + "u"
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

for (const verb of batch3Verbs) {
  const conjugations = generateVerbConjugations(verb);
  allEntries.push(...conjugations);
}

// Create the output JSON file
const outputFile = path.join(__dirname, "verbs-batch3-for-cambridge.json");
const outputContent = JSON.stringify(allEntries, null, 2);

fs.writeFileSync(outputFile, outputContent, "utf8");

console.log("✅ SUCCESS!");
console.log(`📄 Created: ${outputFile}`);
console.log(`📊 Verbs processed: ${batch3Verbs.length}`);
console.log(`📊 Total entries: ${allEntries.length}`);
console.log(
  `📊 Average conjugations per verb: ${(
    allEntries.length / batch3Verbs.length
  ).toFixed(1)}`
);

console.log("\n🔤 Batch 3 verbs:");
batch3Verbs.forEach((verb) => {
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
