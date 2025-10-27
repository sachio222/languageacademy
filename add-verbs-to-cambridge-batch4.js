#!/usr/bin/env node

/**
 * Add Verbs to Cambridge Dictionary - Batch 4
 *
 * This script creates comprehensive verb entries with extended conjugation coverage
 * for the final batch of remaining verbs.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Batch 4: Remaining verbs (14 verbs)
const batch4Verbs = [
  "renoncer",
  "rentrer",
  "rester",
  "retrouver",
  "revoir",
  "réussir",
  "réveiller",
  "rêver",
  "se souvenir",
  "soutenir",
  "trouver",
  "visiter",
  "vivre",
  "voyager",
];

// Helper function to get English translations
function getEnglishTranslation(verb) {
  const translations = {
    renoncer: "to give up/renounce",
    rentrer: "to return/go back",
    rester: "to stay/remain",
    retrouver: "to find again/meet again",
    revoir: "to see again",
    réussir: "to succeed",
    réveiller: "to wake up",
    rêver: "to dream",
    "se souvenir": "to remember",
    soutenir: "to support",
    trouver: "to find",
    visiter: "to visit",
    vivre: "to live",
    voyager: "to travel",
  };
  return translations[verb] || "to " + verb;
}

// Helper function to get usage notes
function getUsageNotes(verb) {
  const notes = {
    renoncer: "Regular -er verb. Indicates giving up or abandoning something",
    rentrer: "Regular -er verb. Indicates returning to a place or going back",
    rester:
      "Regular -er verb. Indicates staying in a place or remaining in a state",
    retrouver:
      "Regular -er verb. Indicates finding something again or meeting someone again",
    revoir: "Irregular verb. Indicates seeing someone or something again",
    réussir:
      "Regular -ir verb. Indicates achieving success or accomplishing something",
    réveiller:
      "Regular -er verb. Indicates waking someone up or waking up oneself",
    rêver: "Regular -er verb. Indicates dreaming or having dreams",
    "se souvenir":
      "Reflexive verb. Indicates remembering something from the past",
    soutenir: "Irregular verb. Indicates supporting or holding up something",
    trouver: "Regular -er verb. Indicates discovering or locating something",
    visiter: "Regular -er verb. Indicates going to see a place or person",
    vivre: "Irregular verb. Indicates being alive or experiencing life",
    voyager: "Regular -er verb. Indicates traveling or going on a journey",
  };
  return notes[verb] || "";
}

// Helper function to get examples
function getExamples(verb) {
  const examples = {
    renoncer: [
      {
        text: "Je renonce à fumer",
        trans: "I'm giving up smoking",
        lang: "en",
      },
      {
        text: "Il renonce à ses droits",
        trans: "He renounces his rights",
        lang: "en",
      },
    ],
    rentrer: [
      {
        text: "Je rentre à la maison",
        trans: "I'm going back home",
        lang: "en",
      },
      {
        text: "Nous rentrons demain",
        trans: "We're returning tomorrow",
        lang: "en",
      },
    ],
    rester: [
      { text: "Je reste ici", trans: "I'm staying here", lang: "en" },
      { text: "Il reste calme", trans: "He stays calm", lang: "en" },
    ],
    retrouver: [
      {
        text: "Je retrouve mes clés",
        trans: "I found my keys again",
        lang: "en",
      },
      {
        text: "Nous nous retrouvons demain",
        trans: "We'll meet again tomorrow",
        lang: "en",
      },
    ],
    revoir: [
      {
        text: "Je revois mes amis",
        trans: "I see my friends again",
        lang: "en",
      },
      { text: "À bientôt !", trans: "See you soon!", lang: "en" },
    ],
    réussir: [
      { text: "Je réussis l'examen", trans: "I passed the exam", lang: "en" },
      {
        text: "Il réussit dans la vie",
        trans: "He succeeds in life",
        lang: "en",
      },
    ],
    réveiller: [
      { text: "Je me réveille tôt", trans: "I wake up early", lang: "en" },
      { text: "Réveille-moi à 7h", trans: "Wake me up at 7am", lang: "en" },
    ],
    rêver: [
      { text: "Je rêve de voyager", trans: "I dream of traveling", lang: "en" },
      { text: "Elle rêve souvent", trans: "She dreams often", lang: "en" },
    ],
    "se souvenir": [
      { text: "Je me souviens de toi", trans: "I remember you", lang: "en" },
      { text: "Souviens-toi de moi", trans: "Remember me", lang: "en" },
    ],
    soutenir: [
      { text: "Je te soutiens", trans: "I support you", lang: "en" },
      {
        text: "Il soutient sa famille",
        trans: "He supports his family",
        lang: "en",
      },
    ],
    trouver: [
      { text: "Je trouve un travail", trans: "I find a job", lang: "en" },
      {
        text: "Trouve-moi une solution",
        trans: "Find me a solution",
        lang: "en",
      },
    ],
    visiter: [
      { text: "Je visite Paris", trans: "I visit Paris", lang: "en" },
      {
        text: "Nous visitons des musées",
        trans: "We visit museums",
        lang: "en",
      },
    ],
    vivre: [
      { text: "Je vis à Paris", trans: "I live in Paris", lang: "en" },
      { text: "Il vit heureux", trans: "He lives happily", lang: "en" },
    ],
    voyager: [
      { text: "Je voyage beaucoup", trans: "I travel a lot", lang: "en" },
      {
        text: "Nous voyageons en train",
        trans: "We travel by train",
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
  if (verb === "revoir") {
    presentConjugations.je = "revois";
    presentConjugations.tu = "revois";
    presentConjugations.il = "revoit";
    presentConjugations.nous = "revoyons";
    presentConjugations.vous = "revoyez";
    presentConjugations.ils = "revoient";
  } else if (verb === "réussir") {
    presentConjugations.je = "réussis";
    presentConjugations.tu = "réussis";
    presentConjugations.il = "réussit";
    presentConjugations.nous = "réussissons";
    presentConjugations.vous = "réussissez";
    presentConjugations.ils = "réussissent";
  } else if (verb === "soutenir") {
    presentConjugations.je = "soutiens";
    presentConjugations.tu = "soutiens";
    presentConjugations.il = "soutient";
    presentConjugations.nous = "soutenons";
    presentConjugations.vous = "soutenez";
    presentConjugations.ils = "soutiennent";
  } else if (verb === "vivre") {
    presentConjugations.je = "vis";
    presentConjugations.tu = "vis";
    presentConjugations.il = "vit";
    presentConjugations.nous = "vivons";
    presentConjugations.vous = "vivez";
    presentConjugations.ils = "vivent";
  } else if (verb === "se souvenir") {
    presentConjugations.je = "me souviens";
    presentConjugations.tu = "te souviens";
    presentConjugations.il = "se souvient";
    presentConjugations.nous = "nous souvenons";
    presentConjugations.vous = "vous souvenez";
    presentConjugations.ils = "se souviennent";
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
  if (verb === "revoir") {
    imperfectConjugations.je = "revoyais";
    imperfectConjugations.il = "revoyait";
    imperfectConjugations.nous = "revoyions";
    imperfectConjugations.ils = "revoyaient";
  } else if (verb === "réussir") {
    imperfectConjugations.je = "réussissais";
    imperfectConjugations.il = "réussissait";
    imperfectConjugations.nous = "réussissions";
    imperfectConjugations.ils = "réussissaient";
  } else if (verb === "soutenir") {
    imperfectConjugations.je = "soutenais";
    imperfectConjugations.il = "soutenait";
    imperfectConjugations.nous = "soutenions";
    imperfectConjugations.ils = "soutenaient";
  } else if (verb === "vivre") {
    imperfectConjugations.je = "vivais";
    imperfectConjugations.il = "vivait";
    imperfectConjugations.nous = "vivions";
    imperfectConjugations.ils = "vivaient";
  } else if (verb === "se souvenir") {
    imperfectConjugations.je = "me souvenais";
    imperfectConjugations.il = "se souvenait";
    imperfectConjugations.nous = "nous souvenions";
    imperfectConjugations.ils = "se souvenaient";
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
  if (verb === "revoir") {
    futureConjugations.je = "reverrai";
    futureConjugations.il = "reverra";
    futureConjugations.nous = "reverrons";
    futureConjugations.ils = "reverront";
  } else if (verb === "réussir") {
    futureConjugations.je = "réussirai";
    futureConjugations.il = "réussira";
    futureConjugations.nous = "réussirons";
    futureConjugations.ils = "réussiront";
  } else if (verb === "soutenir") {
    futureConjugations.je = "soutiendrai";
    futureConjugations.il = "soutiendra";
    futureConjugations.nous = "soutiendrons";
    futureConjugations.ils = "soutiendront";
  } else if (verb === "vivre") {
    futureConjugations.je = "vivrai";
    futureConjugations.il = "vivra";
    futureConjugations.nous = "vivrons";
    futureConjugations.ils = "vivront";
  } else if (verb === "se souvenir") {
    futureConjugations.je = "me souviendrai";
    futureConjugations.il = "se souviendra";
    futureConjugations.nous = "nous souviendrons";
    futureConjugations.ils = "se souviendront";
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
  let pastParticiple = verb.endsWith("er")
    ? verb.slice(0, -2) + "é"
    : verb.endsWith("ir")
    ? verb.slice(0, -2) + "i"
    : verb.endsWith("re")
    ? verb.slice(0, -2) + "u"
    : verb + "é";

  // Handle special cases for irregular verbs
  if (verb === "revoir") {
    pastParticiple = "revu";
  } else if (verb === "soutenir") {
    pastParticiple = "soutenu";
  } else if (verb === "vivre") {
    pastParticiple = "vécu";
  } else if (verb === "se souvenir") {
    pastParticiple = "souvenu";
  }

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

for (const verb of batch4Verbs) {
  const conjugations = generateVerbConjugations(verb);
  allEntries.push(...conjugations);
}

// Create the output JSON file
const outputFile = path.join(__dirname, "verbs-batch4-for-cambridge.json");
const outputContent = JSON.stringify(allEntries, null, 2);

fs.writeFileSync(outputFile, outputContent, "utf8");

console.log("✅ SUCCESS!");
console.log(`📄 Created: ${outputFile}`);
console.log(`📊 Verbs processed: ${batch4Verbs.length}`);
console.log(`📊 Total entries: ${allEntries.length}`);
console.log(
  `📊 Average conjugations per verb: ${(
    allEntries.length / batch4Verbs.length
  ).toFixed(1)}`
);

console.log("\n🔤 Batch 4 verbs:");
batch4Verbs.forEach((verb) => {
  console.log(`  - ${verb}`);
});

console.log("\n📝 Next steps:");
console.log("1. Review the JSON file");
console.log(
  "2. Use the Dictionary Generator to add these to Cambridge dictionary:"
);
console.log(`   node generate-lesson-words.js --file ${outputFile}`);
console.log("3. The generator will handle Cambridge scraping automatically");
console.log("4. All verb batches will be complete!");
