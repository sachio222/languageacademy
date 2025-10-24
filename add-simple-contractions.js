import generator from "./src/data/dictionary/utils/generate-definitions.js";

console.log("🏷️  Adding simple French contractions...\n");

// Simple verb contractions
const verbContractions = [
  {
    word: "c'est",
    translation: "it is / this is",
    partOfSpeech: "verb",
    infinitive: "être",
    tense: "present",
    mood: "indicative",
    person: "il",
    number: "singular",
    verb_phrases: [
      {
        phrase: "c'est",
        type: "demonstrative_verb",
        context: "it is / this is",
        frequency: "common",
      },
    ],
    unit: "unit1",
    tags: ["unit1", "contraction"],
  },
  {
    word: "ce sont",
    translation: "these are / those are",
    partOfSpeech: "verb",
    infinitive: "être",
    tense: "present",
    mood: "indicative",
    person: "ils",
    number: "plural",
    verb_phrases: [
      {
        phrase: "ce sont",
        type: "demonstrative_verb",
        context: "these are / those are",
        frequency: "common",
      },
    ],
    unit: "unit1",
    tags: ["unit1", "contraction"],
  },
  {
    word: "c'était",
    translation: "it was / this was",
    partOfSpeech: "verb",
    infinitive: "être",
    tense: "past",
    mood: "indicative",
    person: "il",
    number: "singular",
    verb_phrases: [
      {
        phrase: "c'était",
        type: "demonstrative_verb",
        context: "it was / this was",
        frequency: "common",
      },
    ],
    unit: "unit1",
    tags: ["unit1", "contraction"],
  },
  {
    word: "il y a",
    translation: "there is / there are",
    partOfSpeech: "verb",
    infinitive: "avoir",
    tense: "present",
    mood: "indicative",
    person: "il",
    number: "singular",
    verb_phrases: [
      {
        phrase: "il y a",
        type: "existential_verb",
        context: "there is / there are",
        frequency: "common",
      },
    ],
    unit: "unit1",
    tags: ["unit1", "contraction"],
  },
];

// Interrogative contractions
const interrogativeContractions = [
  {
    word: "qu'est-ce que",
    translation: "what (for objects)",
    partOfSpeech: "interrogative",
    verb_phrases: [
      {
        phrase: "qu'est-ce que",
        type: "question",
        context: "what (for objects)",
        frequency: "common",
      },
    ],
    unit: "unit1",
    tags: ["unit1", "contraction", "question"],
  },
  {
    word: "qu'est-ce qui",
    translation: "what (for subjects)",
    partOfSpeech: "interrogative",
    verb_phrases: [
      {
        phrase: "qu'est-ce qui",
        type: "question",
        context: "what (for subjects)",
        frequency: "common",
      },
    ],
    unit: "unit1",
    tags: ["unit1", "contraction", "question"],
  },
];

console.log("📝 Adding verb contractions...");
try {
  const verbResult = await generator.generateDefinitions(verbContractions, {
    autoScrape: false,
    verbose: true,
  });
  console.log(`✅ Added ${verbResult.results.length} verb contractions`);
} catch (error) {
  console.error("❌ Error adding verb contractions:", error.message);
}

console.log("\n📝 Adding interrogative contractions...");
try {
  const interrogativeResult = await generator.generateDefinitions(
    interrogativeContractions,
    {
      autoScrape: false,
      verbose: true,
    }
  );
  console.log(
    `✅ Added ${interrogativeResult.results.length} interrogative contractions`
  );
} catch (error) {
  console.error("❌ Error adding interrogative contractions:", error.message);
}

console.log("\n🎉 Simple French contractions added successfully!");
