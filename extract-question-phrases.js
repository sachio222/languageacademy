/**
 * Extract Question Phrases
 * Find all phrases ending with question marks and add them to target list
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to phrases.js
const phrasesPath = path.join(__dirname, "src/data/dictionary/phrases.js");

console.log("🔍 Extracting question phrases (ending with ?)...");

try {
  // Read the phrases file
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

  // Filter phrases that end with question mark
  const questionPhrases = entries.filter(([id, entry]) => {
    return entry.word.endsWith("?");
  });

  console.log(`📊 Found ${questionPhrases.length} question phrases`);

  // Extract word information
  const phrasesList = questionPhrases.map(([id, entry]) => ({
    id: entry.id,
    word: entry.word,
    translation: entry.translations[0]?.text || "No translation",
    definition: entry.translations[0]?.definition || "",
    partOfSpeech: entry.partOfSpeech,
    gender: entry.gender,
    cefr_level: entry.cefr_level,
    difficulty: entry.difficulty,
    source: entry.source,
    tags: entry.tags || [],
  }));

  // Sort by word for easier review
  phrasesList.sort((a, b) => a.word.localeCompare(b.word));

  // Create target list content
  const targetListContent = `/**
 * Phrases Target List
 * Manual classification of phrases for proper categorization
 * UPDATED: Question phrases extracted for review
 */

// QUESTIONS - Question phrases and interrogative expressions
const questions = [
${phrasesList
  .map(
    (phrase) =>
      `  "${phrase.word}", // ${phrase.translation} (${phrase.partOfSpeech})`
  )
  .join("\n")}
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
  totalPhrases: ${phrasesList.length}, // Question phrases extracted for review
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
  status: "Question phrases extracted for manual review and classification",
};
`;

  // Write the updated target list
  fs.writeFileSync("phrases-target-list.js", targetListContent);

  console.log("✅ Updated phrases-target-list.js with question phrases");
  console.log(`📊 Total question phrases: ${phrasesList.length}`);
  console.log(`📁 Output file: phrases-target-list.js`);

  // Show some statistics
  console.log("\n📈 QUESTION PHRASES BREAKDOWN:");

  // Group by current part of speech
  const byCurrentPartOfSpeech = {};
  phrasesList.forEach((phrase) => {
    if (!byCurrentPartOfSpeech[phrase.partOfSpeech]) {
      byCurrentPartOfSpeech[phrase.partOfSpeech] = [];
    }
    byCurrentPartOfSpeech[phrase.partOfSpeech].push(phrase.word);
  });

  Object.keys(byCurrentPartOfSpeech).forEach((pos) => {
    console.log(`  ${pos}: ${byCurrentPartOfSpeech[pos].length}`);
  });

  // Show some examples
  console.log("\n🔍 SAMPLE QUESTION PHRASES:");
  phrasesList.slice(0, 10).forEach((phrase, index) => {
    console.log(
      `  ${index + 1}. "${phrase.word}" - "${phrase.translation}" (${
        phrase.partOfSpeech
      })`
    );
  });

  if (phrasesList.length > 10) {
    console.log(`  ... and ${phrasesList.length - 10} more`);
  }

  // Show all question phrases for review
  console.log("\n📋 ALL QUESTION PHRASES FOR REVIEW:");
  phrasesList.forEach((phrase, index) => {
    console.log(
      `${index + 1}. "${phrase.word}" - "${phrase.translation}" (${
        phrase.partOfSpeech
      })`
    );
  });
} catch (error) {
  console.error("❌ Error extracting question phrases:", error.message);
  process.exit(1);
}
