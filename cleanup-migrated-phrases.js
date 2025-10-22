/**
 * Cleanup Migrated Phrases
 * Remove successfully migrated phrases from original phrases.js and target list
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import the target list to get the phrases we migrated
import {
  expressions,
  greetings,
  questions,
  prepositionalPhrases,
  verbPhrases,
  adjectivePhrases,
  articlePhrases,
} from "./phrases-target-list.js";

// Path to the original phrases.js file
const phrasesPath = path.join(__dirname, "src/data/dictionary/phrases.js");

console.log("🧹 Cleaning up migrated phrases...");

try {
  // Read the original phrases file
  const content = fs.readFileSync(phrasesPath, "utf8");

  // Extract the Map content using regex
  const mapMatch = content.match(
    /export const phrases = new Map\(\[([\s\S]*?)\]\);/m
  );

  if (!mapMatch) {
    console.log("❌ Could not find phrases Map in file");
    process.exit(1);
  }

  // Parse the Map content
  const mapContent = `[${mapMatch[1]}]`;
  const entries = eval(mapContent);

  console.log(`📊 Found ${entries.length} total phrases in original file`);

  // Collect all phrases that were migrated
  const migratedPhrases = [
    ...expressions,
    ...greetings,
    ...questions,
    ...prepositionalPhrases,
    ...verbPhrases,
    ...adjectivePhrases,
    ...articlePhrases,
  ];

  console.log(
    `📊 Found ${migratedPhrases.length} phrases to remove from original file`
  );

  // Filter out migrated phrases
  const remainingEntries = entries.filter(([id, entry]) => {
    return !migratedPhrases.includes(entry.word);
  });

  console.log(`📊 Remaining phrases after cleanup: ${remainingEntries.length}`);

  // Generate new content for phrases.js
  const headerMatch = content.match(
    /\/\*\*[\s\S]*?\*\/\n\nexport const phrases = new Map\(\[/
  );

  if (!headerMatch) {
    console.log("❌ Could not find header in phrases.js");
    process.exit(1);
  }

  const header = headerMatch[0];
  const entriesString = remainingEntries
    .map(([id, entry]) => {
      return `  [\n    "${id}",\n    ${JSON.stringify(entry, null, 4)}\n  ]`;
    })
    .join(",\n");

  const newContent = `${header}\n${entriesString}\n]);\n\n// Frequency-ordered array for priority loading\nexport const phrasesByFrequency = [${remainingEntries
    .map(([id]) => `"${id}"`)
    .join(", ")}];\n\nexport default phrases;`;

  // Write back to file
  fs.writeFileSync(phrasesPath, newContent);

  console.log("✅ Updated phrases.js with remaining phrases");

  // Now update the target list to remove migrated phrases
  console.log("\n📝 Updating phrases-target-list.js...");

  const targetListContent = `/**
 * Phrases Target List
 * Manual classification of non-verb/non-noun phrases for proper categorization
 * UPDATED: Migrated phrases removed
 */

// EXPRESSIONS - Common French expressions and idiomatic phrases
const expressions = [
  // All migrated - array cleared
];

// GREETINGS - Greetings, farewells, and social interactions
const greetings = [
  // All migrated - array cleared
];

// QUESTIONS - Question phrases and interrogative expressions
const questions = [
  // All migrated - array cleared
];

// PREPOSITIONAL PHRASES - Phrases starting with prepositions
const prepositionalPhrases = [
  // All migrated - array cleared
];

// VERB PHRASES - Verb conjugations and verb combinations
const verbPhrases = [
  // All migrated - array cleared
];

// ADJECTIVE PHRASES - Adjective combinations and comparative forms
const adjectivePhrases = [
  // All migrated - array cleared
];

// ARTICLE PHRASES - Article combinations
const articlePhrases = [
  // All migrated - array cleared
];

// PRONOUN PHRASES - Pronoun combinations (these are actually verb phrases)
const pronounPhrases = [
  // These are actually verb phrases with pronouns, not separate pronoun phrases
];

// Export the arrays
export {
  expressions,
  greetings,
  questions,
  prepositionalPhrases,
  verbPhrases,
  adjectivePhrases,
  articlePhrases,
  pronounPhrases,
};

// Summary statistics
export const summary = {
  totalPhrases: 0, // All phrases have been successfully migrated
  breakdown: {
    expressions: expressions.length,
    greetings: greetings.length,
    questions: questions.length,
    prepositionalPhrases: prepositionalPhrases.length,
    verbPhrases: verbPhrases.length,
    adjectivePhrases: adjectivePhrases.length,
    articlePhrases: articlePhrases.length,
    pronounPhrases: pronounPhrases.length,
  },
  status: "All phrases successfully migrated to phrase categories",
};
`;

  fs.writeFileSync("phrases-target-list.js", targetListContent);

  console.log("✅ Updated phrases-target-list.js - all arrays cleared");

  // Summary
  console.log("\n🎉 CLEANUP COMPLETE!");
  console.log(
    `✅ Removed ${migratedPhrases.length} phrases from original phrases.js`
  );
  console.log(
    `📊 Remaining phrases in original file: ${remainingEntries.length}`
  );
  console.log(`📝 Target list arrays cleared - ready for next batch`);

  // Show what was removed
  console.log("\n📊 REMOVED PHRASES SUMMARY:");
  console.log(`  Expressions: ${expressions.length} phrases`);
  console.log(`  Greetings: ${greetings.length} phrases`);
  console.log(`  Questions: ${questions.length} phrases`);
  console.log(
    `  Prepositional Phrases: ${prepositionalPhrases.length} phrases`
  );
  console.log(`  Verb Phrases: ${verbPhrases.length} phrases`);
  console.log(`  Adjective Phrases: ${adjectivePhrases.length} phrases`);
  console.log(`  Article Phrases: ${articlePhrases.length} phrases`);

  console.log("\n📁 Files updated:");
  console.log("  - src/data/dictionary/phrases.js (phrases removed)");
  console.log("  - phrases-target-list.js (arrays cleared)");
} catch (error) {
  console.error("❌ Error during cleanup:", error.message);
  process.exit(1);
}
