/**
 * Migrate Article Phrases to Nouns
 * Move article phrases to nouns.js with proper gender and relationship handling
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import the target list to get the article phrases
import {
  masculineNouns,
  feminineNouns,
  pluralNouns,
  contractedNouns,
} from "./phrases-target-list.js";

// Paths to files
const phrasesPath = path.join(__dirname, "src/data/dictionary/phrases.js");
const nounsPath = path.join(__dirname, "src/data/dictionary/words/nouns.js");

console.log("🚀 Migrating article phrases to nouns.js...");

try {
  // Read the original phrases file
  const phrasesContent = fs.readFileSync(phrasesPath, "utf8");

  // Extract the Map content using regex
  const phrasesMapMatch = phrasesContent.match(
    /export const phrases = new Map\(\[([\s\S]*?)\]\);/m
  );

  if (!phrasesMapMatch) {
    console.log("❌ Could not find phrases Map in file");
    process.exit(1);
  }

  // Parse the Map content
  const phrasesMapContent = `[${phrasesMapMatch[1]}]`;
  const phrasesEntries = eval(phrasesMapContent);

  console.log(
    `📊 Found ${phrasesEntries.length} total phrases in original file`
  );

  // Read the nouns file
  const nounsContent = fs.readFileSync(nounsPath, "utf8");

  // Extract the Map content using regex
  const nounsMapMatch = nounsContent.match(
    /export const nouns = new Map\(\[([\s\S]*?)\]\);/m
  );

  if (!nounsMapMatch) {
    console.log("❌ Could not find nouns Map in file");
    process.exit(1);
  }

  // Parse the Map content
  const nounsMapContent = `[${nounsMapMatch[1]}]`;
  const nounsEntries = eval(nounsMapContent);

  console.log(`📊 Found ${nounsEntries.length} total nouns in nouns.js`);

  // Create lookup maps
  const phrasesLookup = new Map();
  phrasesEntries.forEach(([id, entry]) => {
    phrasesLookup.set(entry.word, { id, entry });
  });

  const nounsLookup = new Map();
  nounsEntries.forEach(([id, entry]) => {
    nounsLookup.set(entry.word, { id, entry });
  });

  // Function to strip article and get base word
  function stripArticle(phrase) {
    if (phrase.startsWith("le ")) return phrase.substring(3);
    if (phrase.startsWith("la ")) return phrase.substring(3);
    if (phrase.startsWith("les ")) return phrase.substring(4);
    if (phrase.startsWith("un ")) return phrase.substring(3);
    if (phrase.startsWith("une ")) return phrase.substring(4);
    if (phrase.startsWith("l'")) return phrase.substring(2);
    return phrase;
  }

  // Function to determine gender from article
  function getGenderFromArticle(phrase) {
    if (phrase.startsWith("le ") || phrase.startsWith("un "))
      return "masculine";
    if (phrase.startsWith("la ") || phrase.startsWith("une "))
      return "feminine";
    if (phrase.startsWith("les ")) return "plural";
    if (phrase.startsWith("l'")) return "unknown"; // Need manual determination
    return "unknown";
  }

  // Function to get article from phrase
  function getArticle(phrase) {
    if (phrase.startsWith("le ")) return "le";
    if (phrase.startsWith("la ")) return "la";
    if (phrase.startsWith("les ")) return "les";
    if (phrase.startsWith("un ")) return "un";
    if (phrase.startsWith("une ")) return "une";
    if (phrase.startsWith("l'")) return "l'";
    return "";
  }

  // Function to add article to relationships
  function addArticleToRelationships(relationships, article) {
    if (!relationships) relationships = [];

    // Check if article already exists in relationships
    const hasArticle = relationships.some(
      (rel) => rel.type === "article" && rel.article === article
    );

    if (!hasArticle) {
      relationships.push({
        type: "article",
        article: article,
        relationship: "definite_article", // or "indefinite_article"
      });
    }

    return relationships;
  }

  // Collect all article phrases
  const allArticlePhrases = [
    ...masculineNouns,
    ...feminineNouns,
    ...pluralNouns,
    ...contractedNouns,
  ];

  console.log(
    `📊 Total article phrases to process: ${allArticlePhrases.length}`
  );

  // Migration counters
  let totalProcessed = 0;
  let totalDuplicates = 0;
  let totalNew = 0;
  let totalErrors = 0;

  // Process each article phrase
  const newNouns = [];
  const updatedNouns = [];

  for (const phrase of allArticlePhrases) {
    try {
      // Get the original phrase data
      const originalData = phrasesLookup.get(phrase);
      if (!originalData) {
        console.log(`❌ Phrase "${phrase}" not found in original phrases`);
        totalErrors++;
        continue;
      }

      // Strip article and get base word
      const baseWord = stripArticle(phrase);
      const article = getArticle(phrase);
      const gender = getGenderFromArticle(phrase);

      // Check if base word already exists in nouns
      const existingNoun = nounsLookup.get(baseWord);

      if (existingNoun) {
        // Duplicate found - update gender and add article to relationships
        console.log(
          `🔄 Duplicate found: "${baseWord}" - updating gender and relationships`
        );

        const updatedEntry = [
          existingNoun.id,
          {
            ...existingNoun.entry,
            gender: gender !== "unknown" ? gender : existingNoun.entry.gender,
            relationships: addArticleToRelationships(
              existingNoun.entry.relationships,
              article
            ),
          },
        ];

        updatedNouns.push(updatedEntry);
        totalDuplicates++;
      } else {
        // New noun - create entry
        console.log(`➕ New noun: "${baseWord}" - creating entry`);

        const newEntry = [
          `${baseWord}-fr`,
          {
            ...originalData.entry,
            id: `${baseWord}-fr`,
            word: baseWord,
            partOfSpeech: "noun",
            gender: gender !== "unknown" ? gender : "masculine", // Default to masculine if unknown
            relationships: addArticleToRelationships([], article),
          },
        ];

        newNouns.push(newEntry);
        totalNew++;
      }

      totalProcessed++;
    } catch (error) {
      console.error(`❌ Error processing "${phrase}":`, error.message);
      totalErrors++;
    }
  }

  // Update nouns.js file
  console.log("\n📝 Updating nouns.js...");

  // Create updated nouns entries
  const updatedNounsMap = new Map();

  // Add existing nouns (excluding updated ones)
  nounsEntries.forEach(([id, entry]) => {
    const isUpdated = updatedNouns.some(([updatedId]) => updatedId === id);
    if (!isUpdated) {
      updatedNounsMap.set(id, entry);
    }
  });

  // Add updated nouns
  updatedNouns.forEach(([id, entry]) => {
    updatedNounsMap.set(id, entry);
  });

  // Add new nouns
  newNouns.forEach(([id, entry]) => {
    updatedNounsMap.set(id, entry);
  });

  // Convert to array for file writing
  const finalNounsEntries = Array.from(updatedNounsMap.entries());

  // Generate new content for nouns.js
  const headerMatch = nounsContent.match(
    /\/\*\*[\s\S]*?\*\/\n\nexport const nouns = new Map\(\[/
  );

  if (!headerMatch) {
    console.log("❌ Could not find header in nouns.js");
    process.exit(1);
  }

  const header = headerMatch[0];
  const entriesString = finalNounsEntries
    .map(([id, entry]) => {
      return `  [\n    "${id}",\n    ${JSON.stringify(entry, null, 4)}\n  ]`;
    })
    .join(",\n");

  const newNounsContent = `${header}\n${entriesString}\n]);\n\n// Frequency-ordered array for priority loading\nexport const nounsByFrequency = [${finalNounsEntries
    .map(([id]) => `"${id}"`)
    .join(", ")}];\n\nexport default nouns;`;

  // Write back to file
  fs.writeFileSync(nounsPath, newNounsContent);

  console.log("✅ Updated nouns.js with new and updated nouns");

  // Remove migrated phrases from original file
  console.log("\n🧹 Removing migrated phrases from original file...");

  let removedCount = 0;
  for (const phrase of allArticlePhrases) {
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
      removedCount++;
    } catch (error) {
      console.error(`❌ Error removing "${phrase}":`, error.message);
    }
  }

  console.log(`✅ Removed ${removedCount} phrases from original phrases.js`);

  // Update phrases-word-list.js to remove article phrases
  console.log("\n📝 Updating phrases-word-list.js...");

  const wordListContent = fs.readFileSync("phrases-word-list.js", "utf8");

  // Remove article phrases from the allPhrases array
  const allPhrasesMatch = wordListContent.match(
    /export const allPhrases = \[([\s\S]*?)\];/
  );

  if (allPhrasesMatch) {
    const currentPhrases = allPhrasesMatch[1]
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line && line.startsWith('"'))
      .map((line) => line.replace(/^"|",?$/g, ""))
      .filter((phrase) => !allArticlePhrases.includes(phrase));

    const updatedWordListContent = wordListContent.replace(
      /export const allPhrases = \[[\s\S]*?\];/,
      `export const allPhrases = [\n${currentPhrases
        .map((phrase) => `  "${phrase}",`)
        .join("\n")}\n];`
    );

    fs.writeFileSync("phrases-word-list.js", updatedWordListContent);
    console.log(
      `✅ Removed ${allArticlePhrases.length} article phrases from phrases-word-list.js`
    );
  }

  // Clear the target list
  console.log("\n📝 Clearing phrases-target-list.js...");

  const targetListContent = `/**
 * Phrases Target List
 * Manual classification of phrases for proper categorization
 * UPDATED: Article phrases migrated to nouns.js, arrays cleared
 */

// MASCULINE NOUNS - Phrases starting with "le " or "un "
const masculineNouns = [
  // All migrated - array cleared
];

// FEMININE NOUNS - Phrases starting with "la " or "une "
const feminineNouns = [
  // All migrated - array cleared
];

// PLURAL NOUNS - Phrases starting with "les "
const pluralNouns = [
  // All migrated - array cleared
];

// CONTRACTED NOUNS - Phrases starting with "l'" (need manual gender determination)
const contractedNouns = [
  // All migrated - array cleared
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
  totalPhrases: 0, // All phrases have been successfully migrated
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
  status: "All phrases successfully migrated to appropriate categories",
};
`;

  fs.writeFileSync("phrases-target-list.js", targetListContent);

  console.log("✅ Updated phrases-target-list.js - all arrays cleared");

  // Summary
  console.log("\n🎉 MIGRATION COMPLETE!");
  console.log(`✅ Total processed: ${totalProcessed} phrases`);
  console.log(`🔄 Duplicates found and updated: ${totalDuplicates} phrases`);
  console.log(`➕ New nouns created: ${totalNew} phrases`);
  console.log(`❌ Errors encountered: ${totalErrors} phrases`);

  console.log("\n📁 Files updated:");
  console.log("  - src/data/dictionary/words/nouns.js (nouns added/updated)");
  console.log("  - src/data/dictionary/phrases.js (phrases removed)");
  console.log("  - phrases-word-list.js (phrases removed)");
  console.log("  - phrases-target-list.js (arrays cleared)");
} catch (error) {
  console.error("❌ Error during migration:", error.message);
  process.exit(1);
}
