/**
 * Example Definition - Testing Regex Extraction
 * This is a sample entry from nouns.js to test our regex patterns
 */

// Sample entry from nouns.js
const sampleEntry = `  [
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

// Test the word detection regex (without quotes around word)
const wordRegex = /word:\s*"avoir"/g;
const wordMatch = sampleEntry.match(wordRegex);
console.log("Word detection regex result:", wordMatch);

// Test the full entry extraction regex (updated for actual format)
const entryRegex = /\[\s*"([^"]*avoir[^"]*)"\s*,\s*\{[\s\S]*?\}\s*\]/g;
const entryMatch = sampleEntry.match(entryRegex);
console.log(
  "Entry extraction regex result:",
  entryMatch ? "FOUND" : "NOT FOUND"
);

// Try a simpler approach - match from the opening bracket to the closing bracket
const simpleEntryRegex = /\[\s*"avoir-fr"[\s\S]*?\]/g;
const simpleEntryMatch = sampleEntry.match(simpleEntryRegex);
console.log(
  "Simple entry extraction result:",
  simpleEntryMatch ? "FOUND" : "NOT FOUND"
);

if (simpleEntryMatch) {
  console.log("Simple extracted entry length:", simpleEntryMatch[0].length);
  console.log("First 200 chars:", simpleEntryMatch[0].substring(0, 200));
  console.log("\n=== FULL EXTRACTED ENTRY ===");
  console.log(simpleEntryMatch[0]);
  console.log("=== END EXTRACTED ENTRY ===\n");
}

if (entryMatch) {
  console.log("Extracted entry length:", entryMatch[0].length);
  console.log("First 100 chars:", entryMatch[0].substring(0, 100));
}

// Test the partOfSpeech update regex (without quotes)
const updatedEntry = sampleEntry.replace(
  /partOfSpeech:\s*"[^"]*"/,
  'partOfSpeech: "verb"'
);
console.log(
  "Updated partOfSpeech:",
  updatedEntry.includes('partOfSpeech: "verb"')
);

// Let's also test the exact format from the file
console.log("\n=== TESTING EXACT FORMAT ===");
const exactWordRegex = /word:\s*"avoir"/g;
const exactWordMatch = sampleEntry.match(exactWordRegex);
console.log("Exact word format match:", exactWordMatch);

const exactPartOfSpeechRegex = /partOfSpeech:\s*"[^"]*"/g;
const exactPartOfSpeechMatch = sampleEntry.match(exactPartOfSpeechRegex);
console.log("Exact partOfSpeech format match:", exactPartOfSpeechMatch);

export { sampleEntry, wordRegex, entryRegex };
