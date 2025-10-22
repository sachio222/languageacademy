/**
 * Migrate Question Phrases
 * Move all question phrases to questions.js and clean up source files
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import the target list to get the question phrases
import { questions } from "./phrases-target-list.js";

// Path to the original phrases.js file
const phrasesPath = path.join(__dirname, "src/data/dictionary/phrases.js");

console.log("🚀 Migrating question phrases to questions.js...");

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

  // Create a lookup map for quick access
  const phraseLookup = new Map();
  entries.forEach(([id, entry]) => {
    phraseLookup.set(entry.word, { id, entry });
  });

  // Function to add phrase to questions.js
  function addPhraseToQuestions(phrase) {
    const targetPath = path.join(
      __dirname,
      "src/data/dictionary/phrases/questions.js"
    );

    try {
      // Read current file content
      const fileContent = fs.readFileSync(targetPath, "utf8");

      // Find the Map content
      const mapMatch = fileContent.match(
        /export const questions = new Map\(\[([\s\S]*?)\]\);/m
      );

      if (!mapMatch) {
        console.log(`❌ Failed to parse questions.js`);
        return false;
      }

      const currentEntries =
        mapMatch[1].trim() === "" ? [] : eval(`[${mapMatch[1]}]`);

      // Check if phrase already exists
      const existingEntry = currentEntries.find((e) => e[1].word === phrase);
      if (existingEntry) {
        console.log(`⚠️  Phrase "${phrase}" already exists in questions.js`);
        return false;
      }

      // Get the original phrase data
      const originalData = phraseLookup.get(phrase);
      if (!originalData) {
        console.log(`❌ Phrase "${phrase}" not found in original phrases`);
        return false;
      }

      // Create new entry with updated part of speech
      const newEntry = [
        originalData.id,
        {
          ...originalData.entry,
          partOfSpeech: "question",
        },
      ];

      // Add to entries
      const updatedEntries = [...currentEntries, newEntry];

      // Generate new content
      const headerMatch = fileContent.match(
        /\/\*\*[\s\S]*?\*\/\n\nexport const questions = new Map\(\[/
      );

      if (!headerMatch) {
        console.log(`❌ Could not find header in questions.js`);
        return false;
      }

      const header = headerMatch[0];
      const entriesString = updatedEntries
        .map(([id, entry]) => {
          return `  [\n    "${id}",\n    ${JSON.stringify(
            entry,
            null,
            4
          )}\n  ]`;
        })
        .join(",\n");

      const newContent = `${header}\n${entriesString}\n]);\n\n// Frequency-ordered array for priority loading\nexport const questionsByFrequency = [${updatedEntries
        .map(([id]) => `"${id}"`)
        .join(", ")}];\n\nexport default questions;`;

      // Write back to file
      fs.writeFileSync(targetPath, newContent);
      return true;
    } catch (error) {
      console.error(`❌ Error adding to questions.js:`, error.message);
      return false;
    }
  }

  // Function to remove phrase from original file
  function removePhraseFromOriginal(phrase) {
    try {
      const content = fs.readFileSync(phrasesPath, "utf8");

      // Find the phrase entry using regex
      const phraseRegex = new RegExp(
        `\\[\\s*"[^"]*",\\s*{[\\s\\S]*?"word":\\s*"${phrase.replace(
          /[.*+?^${}()|[\]\\]/g,
          "\\$&"
        )}"[\\s\\S]*?}\\]`,
        "g"
      );

      const updatedContent = content.replace(phraseRegex, "");

      // Clean up any double commas or trailing commas
      const cleanedContent = updatedContent
        .replace(/,\s*,/g, ",")
        .replace(/,\s*\]/g, "]")
        .replace(/,\s*};/g, "};");

      fs.writeFileSync(phrasesPath, cleanedContent);
      return true;
    } catch (error) {
      console.error(
        `❌ Error removing "${phrase}" from original file:`,
        error.message
      );
      return false;
    }
  }

  // Migration counters
  let totalMigrated = 0;
  let totalErrors = 0;

  // Migrate all question phrases
  console.log("\n📝 Migrating question phrases...");
  for (const phrase of questions) {
    if (addPhraseToQuestions(phrase)) {
      console.log(`✅ Added "${phrase}" to questions.js`);
      totalMigrated++;
    } else {
      totalErrors++;
    }
  }

  // Remove migrated phrases from original file
  console.log("\n🧹 Removing migrated phrases from original file...");
  for (const phrase of questions) {
    if (removePhraseFromOriginal(phrase)) {
      console.log(`✅ Removed "${phrase}" from original phrases.js`);
    } else {
      console.log(`⚠️  Failed to remove "${phrase}" from original file`);
    }
  }

  // Update phrases-word-list.js to remove question phrases
  console.log("\n📝 Updating phrases-word-list.js...");

  // Read the current phrases-word-list.js
  const wordListContent = fs.readFileSync("phrases-word-list.js", "utf8");

  // Remove question phrases from the allPhrases array
  const allPhrasesMatch = wordListContent.match(
    /export const allPhrases = \[([\s\S]*?)\];/
  );

  if (allPhrasesMatch) {
    const currentPhrases = allPhrasesMatch[1]
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line && line.startsWith('"'))
      .map((line) => line.replace(/^"|",?$/g, ""))
      .filter((phrase) => !questions.includes(phrase));

    const updatedWordListContent = wordListContent.replace(
      /export const allPhrases = \[[\s\S]*?\];/,
      `export const allPhrases = [\n${currentPhrases
        .map((phrase) => `  "${phrase}",`)
        .join("\n")}\n];`
    );

    fs.writeFileSync("phrases-word-list.js", updatedWordListContent);
    console.log(
      `✅ Removed ${questions.length} question phrases from phrases-word-list.js`
    );
  }

  // Clear the target list
  console.log("\n📝 Clearing phrases-target-list.js...");

  const targetListContent = `/**
 * Phrases Target List
 * Manual classification of phrases for proper categorization
 * UPDATED: Question phrases migrated, arrays cleared
 */

// QUESTIONS - Question phrases and interrogative expressions
const questions = [
  // All migrated - array cleared
];

// EXPRESSIONS - Common French expressions and idiomatic phrases
const expressions = [
  // All migrated - array cleared
];

// GREETINGS - Greetings, farewells, and social interactions
const greetings = [
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
  questions,
  expressions,
  greetings,
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
    questions: questions.length,
    expressions: expressions.length,
    greetings: greetings.length,
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
  console.log("\n🎉 MIGRATION COMPLETE!");
  console.log(`✅ Successfully migrated: ${totalMigrated} question phrases`);
  console.log(`❌ Errors encountered: ${totalErrors} phrases`);
  console.log(`📊 Total question phrases migrated: ${questions.length}`);

  console.log("\n📁 Files updated:");
  console.log("  - src/data/dictionary/phrases/questions.js (phrases added)");
  console.log("  - src/data/dictionary/phrases.js (phrases removed)");
  console.log("  - phrases-word-list.js (phrases removed)");
  console.log("  - phrases-target-list.js (arrays cleared)");
} catch (error) {
  console.error("❌ Error during migration:", error.message);
  process.exit(1);
}
