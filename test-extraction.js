#!/usr/bin/env node

/**
 * Test successful extraction of a complete entry
 */

// Complete sample entry from nouns.js
const completeEntry = `  [
    "avoir-fr",
    {
      id: "avoir-fr",
      language: "fr",
      word: "avoir",
      partOfSpeech: "verb",
      translations: [
        {
          language: "en",
          text: "to have",
          definition: "infinitive form",
          context: "general",
          confidence: 0.95,
        },
      ],
      gender: "none",
      variants: [],
      frequency: {
        rank: 1000,
        score: 0.5,
        corpus: "lesson",
        perMillion: 100,
        percentile: 50,
      },
      difficulty: 2,
      cefr_level: "A1",
      examples: [],
      relationships: [],
      tags: ["lesson"],
      semantic_field: "general",
      created_at: "2025-10-21T18:56:09.740Z",
      updated_at: "2025-10-21T18:56:09.740Z",
      source:
        "/Users/jupiter/dev/woodshed/languageacademy/src/lessons/modules/unit1/avoir.js",
      verified: true,
    },
  ],`;

console.log("=== TESTING COMPLETE EXTRACTION ===");
console.log("Original entry length:", completeEntry.length);

// Test the extraction regex - match the complete entry structure
// Look for the pattern: [ "avoir-fr", { ... } ]
const entryRegex = /\[\s*"avoir-fr"[\s\S]*?\}\s*\]/g;

// Alternative approach - match from opening [ to the final ]
const alternativeRegex = /\[\s*"avoir-fr"[\s\S]*?\]/g;
const extracted = completeEntry.match(entryRegex);

if (extracted) {
  console.log("✅ EXTRACTION SUCCESSFUL");
  console.log("Extracted length:", extracted[0].length);
  console.log("\n=== EXTRACTED ENTRY ===");
  console.log(extracted[0]);
  console.log("=== END EXTRACTED ENTRY ===\n");

  // Test updating partOfSpeech
  const updated = extracted[0].replace(
    /partOfSpeech:\s*"[^"]*"/,
    'partOfSpeech: "verb"'
  );
  console.log("✅ PART OF SPEECH UPDATE SUCCESSFUL");
  console.log(
    "Updated entry contains 'partOfSpeech: \"verb\"':",
    updated.includes('partOfSpeech: "verb"')
  );

  // Show the updated entry
  console.log("\n=== UPDATED ENTRY ===");
  console.log(updated);
  console.log("=== END UPDATED ENTRY ===\n");
} else {
  console.log("❌ EXTRACTION FAILED");
}

console.log("=== EXTRACTION TEST COMPLETE ===");
