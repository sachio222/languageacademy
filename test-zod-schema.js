import {
  WordSchema,
  validateWord,
  transformCambridgeData,
} from "./src/data/dictionary/schemas/word-schema.js";

/**
 * Test the Zod schema validation
 */

console.log("🧪 Testing Zod Schema Validation");
console.log("=".repeat(50));

// Test with a sample word from your existing data
const sampleWord = {
  id: "bonjour-fr",
  language: "fr",
  word: "bonjour",
  partOfSpeech: "interjection",
  translations: [
    {
      language: "en",
      text: "hello",
      definition: "greeting",
      context: "general",
      confidence: 0.95,
      source: "lesson",
    },
  ],
  relationships: [],
  examples: [
    {
      text: "Bonjour, comment allez-vous ?",
      translation: "Hello, how are you?",
      context: "formal",
      source: "manual",
    },
  ],
  tags: ["greeting", "essential"],
  semantic_field: "communication",
  unit: "unit1",
  module: "vocabulary",
  lesson: "lesson1",
  introduced_in: "unit1-vocabulary-lesson1",
  mastered_in: "unit1-vocabulary-lesson3",
  prerequisite_words: [],
  follow_up_words: ["bonsoir", "salut"],
  created_at: "2025-01-21T10:00:00Z",
  updated_at: "2025-01-21T10:00:00Z",
  sources: ["lesson"],
  verified: false,
};

console.log("📝 Testing sample word validation...");
const validation = validateWord(sampleWord);

if (validation.success) {
  console.log("✅ Sample word validation passed!");
  console.log("📊 Validated data:", JSON.stringify(validation.data, null, 2));
} else {
  console.log("❌ Sample word validation failed:");
  console.log("🚨 Errors:", validation.errors);
}

// Test with Cambridge data transformation
console.log("\n🔄 Testing Cambridge data transformation...");

const cambridgeResult = {
  word: "maintenant",
  translations: ["now", "currently", "at present"],
  examples: [
    "Je ne peux pas venir maintenant.",
    "Maintenant, on se déplace plus souvent en avion.",
  ],
  pronunciations: ["/mɛ̃tənɑ̃/"],
  synonyms: ["actuellement", "en ce moment"],
  antonyms: ["autrefois", "jadis"],
  etymology: "From Latin 'mane' (morning) + 'tenere' (to hold)",
  register: ["formal", "informal"],
  usage_notes: "Can be used in both formal and informal contexts",
};

const transformedData = transformCambridgeData(cambridgeResult);
console.log("✅ Cambridge data transformed successfully!");
console.log("📊 Transformed data:", JSON.stringify(transformedData, null, 2));

// Test validation of transformed data
console.log("\n🔍 Validating transformed Cambridge data...");
const cambridgeValidation = validateWord({
  id: "maintenant-fr",
  language: "fr",
  word: "maintenant",
  partOfSpeech: "adverb",
  ...transformedData,
});

if (cambridgeValidation.success) {
  console.log("✅ Cambridge data validation passed!");
} else {
  console.log("❌ Cambridge data validation failed:");
  console.log("🚨 Errors:", cambridgeValidation.errors);
}

// Test with a verb example
console.log("\n🔍 Testing verb with conjugation data...");

const verbExample = {
  id: "avoir-fr",
  language: "fr",
  word: "avoir",
  partOfSpeech: "verb",
  conjugationGroup: "irregular",
  infinitive: "avoir",
  conjugation: {
    present: {
      je: "ai",
      tu: "as",
      il: "a",
      nous: "avons",
      vous: "avez",
      ils: "ont",
    },
    past: {
      je: "ai eu",
      tu: "as eu",
      il: "a eu",
      nous: "avons eu",
      vous: "avez eu",
      ils: "ont eu",
    },
  },
  auxiliary_verb: true,
  impersonal_usage: ["il y a", "il n'y a pas"],
  idiomatic_expressions: [
    {
      expression: "il n'y a qu'à",
      meaning: "all we need to do is",
      example: "Il n'y a qu'à attendre.",
    },
    {
      expression: "avoir lieu",
      meaning: "to take place",
      example: "La réunion aura lieu demain.",
    },
  ],
  noun_form: "avoir",
  transitive: true,
  intransitive: false,
  reflexive: false,
  translations: [
    {
      language: "en",
      text: "to have",
      definition: "to possess or own",
      source: "lesson",
    },
  ],
  unit: "unit1",
  module: "grammar",
  lesson: "lesson2",
  introduced_in: "unit1-grammar-lesson2",
  cefr_level: "A1",
  difficulty: 2,
  tags: ["essential", "auxiliary", "irregular"],
  sources: ["lesson"],
  verified: false,
};

const verbValidation = validateWord(verbExample);
if (verbValidation.success) {
  console.log("✅ Verb validation passed!");
  console.log("📊 Verb data:", JSON.stringify(verbValidation.data, null, 2));
} else {
  console.log("❌ Verb validation failed:");
  console.log("🚨 Errors:", verbValidation.errors);
}

// Test with an adjective example
console.log("\n🔍 Testing adjective with agreement forms...");

const adjectiveExample = {
  id: "belle-fr",
  language: "fr",
  word: "belle",
  partOfSpeech: "adjective",
  adjective_forms: {
    masculine_singular: "beau",
    feminine_singular: "belle",
    masculine_plural: "beaux",
    feminine_plural: "belles",
  },
  position: "before_noun",
  comparative: "plus belle",
  superlative: "la plus belle",
  irregular: true,
  invariable: false,
  translations: [
    {
      language: "en",
      text: "beautiful",
      definition: "pleasing to the eye or mind",
      source: "lesson",
    },
  ],
  unit: "unit1",
  module: "vocabulary",
  lesson: "lesson3",
  introduced_in: "unit1-vocabulary-lesson3",
  cefr_level: "A1",
  difficulty: 1,
  tags: ["appearance", "essential"],
  sources: ["lesson"],
  verified: false,
};

const adjectiveValidation = validateWord(adjectiveExample);
if (adjectiveValidation.success) {
  console.log("✅ Adjective validation passed!");
  console.log(
    "📊 Adjective data:",
    JSON.stringify(adjectiveValidation.data, null, 2)
  );
} else {
  console.log("❌ Adjective validation failed:");
  console.log("🚨 Errors:", adjectiveValidation.errors);
}

console.log("\n🎉 Zod schema testing complete!");
