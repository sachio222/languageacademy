import generator from "./src/data/dictionary/utils/generate-definitions.js";

console.log("🏷️  Adding French contractions to dictionary...\n");

// Common French contractions with their details
const contractions = [
  {
    word: "J'ai",
    translation: "I have",
    partOfSpeech: "verb",
    infinitive: "avoir",
    tense: "present",
    mood: "indicative",
    person: "je",
    number: "singular",
    verb_phrases: [
      {
        phrase: "J'ai",
        type: "pronoun_verb",
        context: "I have",
        frequency: "common",
      },
    ],
    unit: "unit1",
    tags: ["unit1", "contraction"],
  },
  {
    word: "J'aime",
    translation: "I like/love",
    partOfSpeech: "verb",
    infinitive: "aimer",
    tense: "present",
    mood: "indicative",
    person: "je",
    number: "singular",
    verb_phrases: [
      {
        phrase: "J'aime",
        type: "pronoun_verb",
        context: "I like/love",
        frequency: "common",
      },
    ],
    unit: "unit1",
    tags: ["unit1", "contraction"],
  },
  {
    word: "J'habite",
    translation: "I live",
    partOfSpeech: "verb",
    infinitive: "habiter",
    tense: "present",
    mood: "indicative",
    person: "je",
    number: "singular",
    verb_phrases: [
      {
        phrase: "J'habite",
        type: "pronoun_verb",
        context: "I live",
        frequency: "common",
      },
    ],
    unit: "unit1",
    tags: ["unit1", "contraction"],
  },
  {
    word: "J'étudie",
    translation: "I study",
    partOfSpeech: "verb",
    infinitive: "étudier",
    tense: "present",
    mood: "indicative",
    person: "je",
    number: "singular",
    verb_phrases: [
      {
        phrase: "J'étudie",
        type: "pronoun_verb",
        context: "I study",
        frequency: "common",
      },
    ],
    unit: "unit1",
    tags: ["unit1", "contraction"],
  },
  {
    word: "J'écoute",
    translation: "I listen",
    partOfSpeech: "verb",
    infinitive: "écouter",
    tense: "present",
    mood: "indicative",
    person: "je",
    number: "singular",
    verb_phrases: [
      {
        phrase: "J'écoute",
        type: "pronoun_verb",
        context: "I listen",
        frequency: "common",
      },
    ],
    unit: "unit1",
    tags: ["unit1", "contraction"],
  },
  {
    word: "J'écris",
    translation: "I write",
    partOfSpeech: "verb",
    infinitive: "écrire",
    tense: "present",
    mood: "indicative",
    person: "je",
    number: "singular",
    verb_phrases: [
      {
        phrase: "J'écris",
        type: "pronoun_verb",
        context: "I write",
        frequency: "common",
      },
    ],
    unit: "unit1",
    tags: ["unit1", "contraction"],
  },
  {
    word: "J'arrive",
    translation: "I arrive",
    partOfSpeech: "verb",
    infinitive: "arriver",
    tense: "present",
    mood: "indicative",
    person: "je",
    number: "singular",
    verb_phrases: [
      {
        phrase: "J'arrive",
        type: "pronoun_verb",
        context: "I arrive",
        frequency: "common",
      },
    ],
    unit: "unit1",
    tags: ["unit1", "contraction"],
  },
  {
    word: "J'achète",
    translation: "I buy",
    partOfSpeech: "verb",
    infinitive: "acheter",
    tense: "present",
    mood: "indicative",
    person: "je",
    number: "singular",
    verb_phrases: [
      {
        phrase: "J'achète",
        type: "pronoun_verb",
        context: "I buy",
        frequency: "common",
      },
    ],
    unit: "unit1",
    tags: ["unit1", "contraction"],
  },
];

console.log(`📝 Processing ${contractions.length} French contractions...\n`);

try {
  const result = await generator.generateDefinitions(contractions, {
    autoScrape: false, // Don't scrape Cambridge for contractions
    verbose: true,
  });

  console.log("\n🎉 French contractions added successfully!");
  console.log(`✅ Added ${result.results.length} contractions to dictionary`);

  if (result.addResults) {
    console.log(
      `📁 Files updated: ${Object.keys(result.addResults).join(", ")}`
    );
  }
} catch (error) {
  console.error("❌ Error adding contractions:", error.message);
}
