import { validateWord } from "./src/data/dictionary/schemas/word-schema.js";

/**
 * Convert existing words to enhanced schema format
 */

console.log("🔄 Converting existing words to enhanced schema...");
console.log("=".repeat(60));

// Example 1: "francophone" - a good adjective example
const francophoneEnhanced = {
  id: "francophone-fr",
  language: "fr",
  word: "francophone",
  partOfSpeech: "adjective",

  // Enhanced adjective forms
  adjective_forms: {
    masculine_singular: "francophone",
    feminine_singular: "francophone",
    masculine_plural: "francophones",
    feminine_plural: "francophones",
  },
  position: "after_noun", // Typically goes after noun
  comparative: "plus francophone",
  superlative: "le plus francophone",
  irregular: false,
  invariable: true, // Same form for masculine/feminine

  // Enhanced translations
  translations: [
    {
      language: "en",
      text: "French-speaking",
      definition: "relating to or using French language",
      context: "general",
      confidence: 0.95,
      source: "lesson",
    },
  ],

  // Curriculum tracking
  unit: "unit11",
  module: "vocabulary",
  lesson: "reading-11",
  introduced_in: "unit11-vocabulary-reading-11",

  // Learning metadata
  difficulty: 2,
  cefr_level: "A1",
  tags: ["lesson", "language", "culture"],
  semantic_field: "language",

  // Frequency data
  frequency: {
    rank: 1000,
    score: 0.5,
    corpus: "lesson",
    perMillion: 100,
    percentile: 50,
  },

  // Metadata
  created_at: "2025-10-21T18:56:09.739Z",
  updated_at: "2025-10-21T18:56:09.739Z",
  sources: ["lesson"],
  verified: false,
};

// Example 2: "entier" - another adjective with different characteristics
const entierEnhanced = {
  id: "entier-fr",
  language: "fr",
  word: "entier",
  partOfSpeech: "adjective",

  // Enhanced adjective forms
  adjective_forms: {
    masculine_singular: "entier",
    feminine_singular: "entière",
    masculine_plural: "entiers",
    feminine_plural: "entières",
  },
  position: "before_noun", // Can go before or after
  comparative: "plus entier",
  superlative: "le plus entier",
  irregular: false,
  invariable: false, // Changes for gender/number

  // Enhanced translations
  translations: [
    {
      language: "en",
      text: "entire",
      definition: "complete, whole",
      context: "general",
      confidence: 0.95,
      source: "lesson",
    },
    {
      language: "en",
      text: "whole",
      definition: "complete, not divided",
      context: "general",
      confidence: 0.9,
      source: "lesson",
    },
  ],

  // Curriculum tracking
  unit: "unit11",
  module: "vocabulary",
  lesson: "reading-11",
  introduced_in: "unit11-vocabulary-reading-11",

  // Learning metadata
  difficulty: 2,
  cefr_level: "A1",
  tags: ["lesson", "quantity", "descriptive"],
  semantic_field: "general",

  // Frequency data
  frequency: {
    rank: 1000,
    score: 0.5,
    corpus: "lesson",
    perMillion: 100,
    percentile: 50,
  },

  // Metadata
  created_at: "2025-10-21T18:56:09.746Z",
  updated_at: "2025-10-21T18:56:09.746Z",
  sources: ["lesson"],
  verified: false,
};

console.log('📝 Testing "francophone" conversion...');
const francophoneValidation = validateWord(francophoneEnhanced);

if (francophoneValidation.success) {
  console.log('✅ "francophone" validation passed!');
  console.log(
    "📊 Enhanced data:",
    JSON.stringify(francophoneValidation.data, null, 2)
  );
} else {
  console.log('❌ "francophone" validation failed:');
  console.log("🚨 Errors:", francophoneValidation.errors);
}

console.log('\n📝 Testing "entier" conversion...');
const entierValidation = validateWord(entierEnhanced);

if (entierValidation.success) {
  console.log('✅ "entier" validation passed!');
  console.log(
    "📊 Enhanced data:",
    JSON.stringify(entierValidation.data, null, 2)
  );
} else {
  console.log('❌ "entier" validation failed:');
  console.log("🚨 Errors:", entierValidation.errors);
}

console.log("\n🎉 Word conversion testing complete!");
console.log("\n📋 Summary of enhancements:");
console.log("• Added adjective_forms with gender/number agreement");
console.log("• Added position, comparative, superlative fields");
console.log("• Added curriculum tracking (unit, module, lesson)");
console.log("• Enhanced translations with multiple meanings");
console.log("• Added learning progression fields");
console.log("• Maintained backward compatibility with existing fields");
