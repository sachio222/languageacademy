/**
 * Extract Article Phrases
 * Find phrases starting with articles (l', la, le, les, un, une) that are lowercase
 * Categorize by gender and number for review
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to phrases.js
const phrasesPath = path.join(__dirname, "src/data/dictionary/phrases.js");

console.log("🔍 Extracting article phrases (l', la, le, les, un, une)...");

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

  // Filter phrases that start with articles and are lowercase
  const articlePhrases = entries.filter(([id, entry]) => {
    const word = entry.word;

    // Check if it starts with articles
    const startsWithArticle =
      word.startsWith("l'") ||
      word.startsWith("la ") ||
      word.startsWith("le ") ||
      word.startsWith("les ") ||
      word.startsWith("un ") ||
      word.startsWith("une ");

    // Check if it's lowercase (not a proper noun)
    const isLowercase = word === word.toLowerCase();

    return startsWithArticle && isLowercase;
  });

  console.log(`📊 Found ${articlePhrases.length} article phrases`);

  // Extract word information
  const phrasesList = articlePhrases.map(([id, entry]) => ({
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

  // Categorize by article type
  const masculineNouns = phrasesList.filter(
    (phrase) => phrase.word.startsWith("le ") || phrase.word.startsWith("un ")
  );

  const feminineNouns = phrasesList.filter(
    (phrase) => phrase.word.startsWith("la ") || phrase.word.startsWith("une ")
  );

  const pluralNouns = phrasesList.filter((phrase) =>
    phrase.word.startsWith("les ")
  );

  const contractedNouns = phrasesList.filter((phrase) =>
    phrase.word.startsWith("l'")
  );

  // Create target list content
  const targetListContent = `/**
 * Phrases Target List
 * Manual classification of phrases for proper categorization
 * UPDATED: Article phrases extracted for review
 */

// MASCULINE NOUNS - Phrases starting with "le " or "un "
const masculineNouns = [
${masculineNouns
  .map(
    (phrase) =>
      `  "${phrase.word}", // ${phrase.translation} (${phrase.partOfSpeech})`
  )
  .join("\n")}
];

// FEMININE NOUNS - Phrases starting with "la " or "une "
const feminineNouns = [
${feminineNouns
  .map(
    (phrase) =>
      `  "${phrase.word}", // ${phrase.translation} (${phrase.partOfSpeech})`
  )
  .join("\n")}
];

// PLURAL NOUNS - Phrases starting with "les "
const pluralNouns = [
${pluralNouns
  .map(
    (phrase) =>
      `  "${phrase.word}", // ${phrase.translation} (${phrase.partOfSpeech})`
  )
  .join("\n")}
];

// CONTRACTED NOUNS - Phrases starting with "l'" (need manual gender determination)
const contractedNouns = [
${contractedNouns
  .map(
    (phrase) =>
      `  "${phrase.word}", // ${phrase.translation} (${phrase.partOfSpeech})`
  )
  .join("\n")}
];

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
  masculineNouns,
  feminineNouns,
  pluralNouns,
  contractedNouns,
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
  totalPhrases: ${phrasesList.length}, // Article phrases extracted for review
  breakdown: {
    masculineNouns: masculineNouns.length,
    feminineNouns: feminineNouns.length,
    pluralNouns: pluralNouns.length,
    contractedNouns: contractedNouns.length,
    questions: questions.length,
    expressions: expressions.length,
    greetings: greetings.length,
    prepositionalPhrases: prepositionalPhrases.length,
    verbPhrases: verbPhrases.length,
    adjectivePhrases: adjectivePhrases.length,
    articlePhrases: articlePhrases.length,
    pronounPhrases: pronounPhrases.length,
  },
  status: "Article phrases extracted for manual review and classification",
};
`;

  // Write the updated target list
  fs.writeFileSync("phrases-target-list.js", targetListContent);

  console.log("✅ Updated phrases-target-list.js with article phrases");
  console.log(`📊 Total article phrases: ${phrasesList.length}`);
  console.log(`📁 Output file: phrases-target-list.js`);

  // Show some statistics
  console.log("\n📈 ARTICLE PHRASES BREAKDOWN:");
  console.log(`  Masculine (le/un): ${masculineNouns.length}`);
  console.log(`  Feminine (la/une): ${feminineNouns.length}`);
  console.log(`  Plural (les): ${pluralNouns.length}`);
  console.log(`  Contracted (l'): ${contractedNouns.length}`);

  // Show some examples from each category
  console.log("\n🔍 SAMPLE MASCULINE NOUNS:");
  masculineNouns.slice(0, 5).forEach((phrase, index) => {
    console.log(
      `  ${index + 1}. "${phrase.word}" - "${phrase.translation}" (${
        phrase.partOfSpeech
      })`
    );
  });
  if (masculineNouns.length > 5) {
    console.log(`  ... and ${masculineNouns.length - 5} more`);
  }

  console.log("\n🔍 SAMPLE FEMININE NOUNS:");
  feminineNouns.slice(0, 5).forEach((phrase, index) => {
    console.log(
      `  ${index + 1}. "${phrase.word}" - "${phrase.translation}" (${
        phrase.partOfSpeech
      })`
    );
  });
  if (feminineNouns.length > 5) {
    console.log(`  ... and ${feminineNouns.length - 5} more`);
  }

  console.log("\n🔍 SAMPLE PLURAL NOUNS:");
  pluralNouns.slice(0, 5).forEach((phrase, index) => {
    console.log(
      `  ${index + 1}. "${phrase.word}" - "${phrase.translation}" (${
        phrase.partOfSpeech
      })`
    );
  });
  if (pluralNouns.length > 5) {
    console.log(`  ... and ${pluralNouns.length - 5} more`);
  }

  console.log("\n🔍 SAMPLE CONTRACTED NOUNS:");
  contractedNouns.slice(0, 5).forEach((phrase, index) => {
    console.log(
      `  ${index + 1}. "${phrase.word}" - "${phrase.translation}" (${
        phrase.partOfSpeech
      })`
    );
  });
  if (contractedNouns.length > 5) {
    console.log(`  ... and ${contractedNouns.length - 5} more`);
  }
} catch (error) {
  console.error("❌ Error extracting article phrases:", error.message);
  process.exit(1);
}
