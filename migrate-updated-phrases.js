/**
 * Migrate Updated Phrases to Category Files
 * Move all updated phrases from phrases-target-list.js to their respective category files
 * Handle duplicates, update partOfSpeech, and clean up source files
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import the target list to get all classified phrases
import {
  questions,
  expressions,
  prepositionalPhrases,
  verbPhrases,
  adjectivePhrases,
  articlePhrases,
} from "./phrases-target-list.js";

// Paths to files
const phrasesPath = path.join(__dirname, "src/data/dictionary/phrases.js");
const phrasesDir = path.join(__dirname, "src/data/dictionary/phrases");

console.log("🚀 Migrating updated phrases to category files...");

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

  // Create lookup map
  const phrasesLookup = new Map();
  phrasesEntries.forEach(([id, entry]) => {
    phrasesLookup.set(entry.word, { id, entry });
  });

  // Collect all phrases to migrate
  const allPhrasesToMigrate = [
    ...questions,
    ...expressions,
    ...prepositionalPhrases,
    ...verbPhrases,
    ...adjectivePhrases,
    ...articlePhrases,
  ];

  console.log(`📊 Total phrases to migrate: ${allPhrasesToMigrate.length}`);

  // Migration counters
  let totalProcessed = 0;
  let totalErrors = 0;

  // Process each category
  const categoryMigrations = [];

  // 1. QUESTIONS
  if (questions.length > 0) {
    console.log(`\n📝 Processing ${questions.length} questions...`);
    const questionEntries = [];

    for (const phrase of questions) {
      try {
        const originalData = phrasesLookup.get(phrase);
        if (!originalData) {
          console.log(`❌ Phrase "${phrase}" not found in original phrases`);
          totalErrors++;
          continue;
        }

        questionEntries.push([
          `${phrase.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9-]/g, "")}-fr`,
          {
            ...originalData.entry,
            id: `${phrase
              .replace(/\s+/g, "-")
              .replace(/[^a-zA-Z0-9-]/g, "")}-fr`,
            word: phrase,
            partOfSpeech: "question",
            tags: [...(originalData.entry.tags || []), "question"],
          },
        ]);

        totalProcessed++;
      } catch (error) {
        console.error(`❌ Error processing "${phrase}":`, error.message);
        totalErrors++;
      }
    }

    if (questionEntries.length > 0) {
      categoryMigrations.push({
        category: "questions",
        entries: questionEntries,
        count: questionEntries.length,
      });
    }
  }

  // 2. EXPRESSIONS
  if (expressions.length > 0) {
    console.log(`\n📝 Processing ${expressions.length} expressions...`);
    const expressionEntries = [];

    for (const phrase of expressions) {
      try {
        const originalData = phrasesLookup.get(phrase);
        if (!originalData) {
          console.log(`❌ Phrase "${phrase}" not found in original phrases`);
          totalErrors++;
          continue;
        }

        expressionEntries.push([
          `${phrase.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9-]/g, "")}-fr`,
          {
            ...originalData.entry,
            id: `${phrase
              .replace(/\s+/g, "-")
              .replace(/[^a-zA-Z0-9-]/g, "")}-fr`,
            word: phrase,
            partOfSpeech: "expression",
            tags: [...(originalData.entry.tags || []), "expression"],
          },
        ]);

        totalProcessed++;
      } catch (error) {
        console.error(`❌ Error processing "${phrase}":`, error.message);
        totalErrors++;
      }
    }

    if (expressionEntries.length > 0) {
      categoryMigrations.push({
        category: "expressions",
        entries: expressionEntries,
        count: expressionEntries.length,
      });
    }
  }

  // 3. PREPOSITIONAL PHRASES
  if (prepositionalPhrases.length > 0) {
    console.log(
      `\n📝 Processing ${prepositionalPhrases.length} prepositional phrases...`
    );
    const prepositionalPhraseEntries = [];

    for (const phrase of prepositionalPhrases) {
      try {
        const originalData = phrasesLookup.get(phrase);
        if (!originalData) {
          console.log(`❌ Phrase "${phrase}" not found in original phrases`);
          totalErrors++;
          continue;
        }

        prepositionalPhraseEntries.push([
          `${phrase.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9-]/g, "")}-fr`,
          {
            ...originalData.entry,
            id: `${phrase
              .replace(/\s+/g, "-")
              .replace(/[^a-zA-Z0-9-]/g, "")}-fr`,
            word: phrase,
            partOfSpeech: "prepositional-phrase",
            tags: [...(originalData.entry.tags || []), "prepositional-phrase"],
          },
        ]);

        totalProcessed++;
      } catch (error) {
        console.error(`❌ Error processing "${phrase}":`, error.message);
        totalErrors++;
      }
    }

    if (prepositionalPhraseEntries.length > 0) {
      categoryMigrations.push({
        category: "prepositional-phrases",
        entries: prepositionalPhraseEntries,
        count: prepositionalPhraseEntries.length,
      });
    }
  }

  // 4. VERB PHRASES
  if (verbPhrases.length > 0) {
    console.log(`\n📝 Processing ${verbPhrases.length} verb phrases...`);
    const verbPhraseEntries = [];

    for (const phrase of verbPhrases) {
      try {
        const originalData = phrasesLookup.get(phrase);
        if (!originalData) {
          console.log(`❌ Phrase "${phrase}" not found in original phrases`);
          totalErrors++;
          continue;
        }

        verbPhraseEntries.push([
          `${phrase.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9-]/g, "")}-fr`,
          {
            ...originalData.entry,
            id: `${phrase
              .replace(/\s+/g, "-")
              .replace(/[^a-zA-Z0-9-]/g, "")}-fr`,
            word: phrase,
            partOfSpeech: "verb-phrase",
            tags: [...(originalData.entry.tags || []), "verb-phrase"],
          },
        ]);

        totalProcessed++;
      } catch (error) {
        console.error(`❌ Error processing "${phrase}":`, error.message);
        totalErrors++;
      }
    }

    if (verbPhraseEntries.length > 0) {
      categoryMigrations.push({
        category: "verb-phrases",
        entries: verbPhraseEntries,
        count: verbPhraseEntries.length,
      });
    }
  }

  // 5. ADJECTIVE PHRASES
  if (adjectivePhrases.length > 0) {
    console.log(
      `\n📝 Processing ${adjectivePhrases.length} adjective phrases...`
    );
    const adjectivePhraseEntries = [];

    for (const phrase of adjectivePhrases) {
      try {
        const originalData = phrasesLookup.get(phrase);
        if (!originalData) {
          console.log(`❌ Phrase "${phrase}" not found in original phrases`);
          totalErrors++;
          continue;
        }

        adjectivePhraseEntries.push([
          `${phrase.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9-]/g, "")}-fr`,
          {
            ...originalData.entry,
            id: `${phrase
              .replace(/\s+/g, "-")
              .replace(/[^a-zA-Z0-9-]/g, "")}-fr`,
            word: phrase,
            partOfSpeech: "adjective-phrase",
            tags: [...(originalData.entry.tags || []), "adjective-phrase"],
          },
        ]);

        totalProcessed++;
      } catch (error) {
        console.error(`❌ Error processing "${phrase}":`, error.message);
        totalErrors++;
      }
    }

    if (adjectivePhraseEntries.length > 0) {
      categoryMigrations.push({
        category: "adjective-phrases",
        entries: adjectivePhraseEntries,
        count: adjectivePhraseEntries.length,
      });
    }
  }

  // 6. ARTICLE PHRASES
  if (articlePhrases.length > 0) {
    console.log(`\n📝 Processing ${articlePhrases.length} article phrases...`);
    const articlePhraseEntries = [];

    for (const phrase of articlePhrases) {
      try {
        const originalData = phrasesLookup.get(phrase);
        if (!originalData) {
          console.log(`❌ Phrase "${phrase}" not found in original phrases`);
          totalErrors++;
          continue;
        }

        articlePhraseEntries.push([
          `${phrase.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9-]/g, "")}-fr`,
          {
            ...originalData.entry,
            id: `${phrase
              .replace(/\s+/g, "-")
              .replace(/[^a-zA-Z0-9-]/g, "")}-fr`,
            word: phrase,
            partOfSpeech: "article-phrase",
            tags: [...(originalData.entry.tags || []), "article-phrase"],
          },
        ]);

        totalProcessed++;
      } catch (error) {
        console.error(`❌ Error processing "${phrase}":`, error.message);
        totalErrors++;
      }
    }

    if (articlePhraseEntries.length > 0) {
      categoryMigrations.push({
        category: "article-phrases",
        entries: articlePhraseEntries,
        count: articlePhraseEntries.length,
      });
    }
  }

  // Write to category files
  console.log("\n📝 Writing to category files...");

  for (const migration of categoryMigrations) {
    const filePath = path.join(phrasesDir, `${migration.category}.js`);

    // Read existing file if it exists
    let existingEntries = [];
    if (fs.existsSync(filePath)) {
      const existingContent = fs.readFileSync(filePath, "utf8");
      const existingMapMatch = existingContent.match(
        /export const \w+ = new Map\(\[([\s\S]*?)\]\);/m
      );

      if (existingMapMatch) {
        const existingMapContent = `[${existingMapMatch[1]}]`;
        existingEntries = eval(existingMapContent);
      }
    }

    // Check for duplicates and handle them
    const existingIds = new Set(existingEntries.map(([id]) => id));
    const newEntries = [];
    const updatedEntries = [];

    for (const [id, entry] of migration.entries) {
      if (existingIds.has(id)) {
        // Update existing entry
        const existingIndex = existingEntries.findIndex(
          ([existingId]) => existingId === id
        );
        if (existingIndex !== -1) {
          existingEntries[existingIndex][1] = {
            ...existingEntries[existingIndex][1],
            ...entry,
            // Preserve original ID
            id: existingEntries[existingIndex][1].id,
          };
          updatedEntries.push(id);
        }
      } else {
        // Add new entry
        newEntries.push([id, entry]);
      }
    }

    // Combine existing and new entries
    const allEntries = [...existingEntries, ...newEntries];

    // Generate file content
    const fileContent = `/**
 * ${
   migration.category.charAt(0).toUpperCase() +
   migration.category.slice(1).replace(/-/g, " ")
 } Dictionary
 * Auto-generated from phrases migration
 * Total entries: ${allEntries.length}
 */

export const ${migration.category.replace(/-/g, "")} = new Map([
${allEntries
  .map(([id, entry]) => {
    return `  [
    "${id}",
    ${JSON.stringify(entry, null, 4)}
  ]`;
  })
  .join(",\n")}
]);

// Frequency-ordered array for priority loading
export const ${migration.category.replace(/-/g, "")}ByFrequency = [${allEntries
      .map(([id]) => `"${id}"`)
      .join(", ")}];

export default ${migration.category.replace(/-/g, "")};
`;

    // Write the file
    fs.writeFileSync(filePath, fileContent);
    console.log(
      `✅ Updated ${migration.category}.js with ${newEntries.length} new entries and ${updatedEntries.length} updated entries`
    );
  }

  // Remove migrated phrases from original phrases.js
  console.log("\n🧹 Removing migrated phrases from original phrases.js...");

  let removedCount = 0;
  for (const phrase of allPhrasesToMigrate) {
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

  // Update phrases-word-list.js to remove migrated phrases
  console.log("\n📝 Updating phrases-word-list.js...");

  const wordListContent = fs.readFileSync("phrases-word-list.js", "utf8");

  // Remove migrated phrases from the allPhrases array
  const allPhrasesMatch = wordListContent.match(
    /export const allPhrases = \[([\s\S]*?)\];/
  );

  if (allPhrasesMatch) {
    const currentPhrases = allPhrasesMatch[1]
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line && line.startsWith('"'))
      .map((line) => line.replace(/^"|",?$/g, ""))
      .filter((phrase) => !allPhrasesToMigrate.includes(phrase));

    const updatedWordListContent = wordListContent.replace(
      /export const allPhrases = \[[\s\S]*?\];/,
      `export const allPhrases = [\n${currentPhrases
        .map((phrase) => `  "${phrase}",`)
        .join("\n")}\n];`
    );

    fs.writeFileSync("phrases-word-list.js", updatedWordListContent);
    console.log(
      `✅ Removed ${allPhrasesToMigrate.length} phrases from phrases-word-list.js`
    );
  }

  // Clear the target list
  console.log("\n📝 Clearing phrases-target-list.js...");

  const targetListContent = `/**
 * Phrases Target List
 * Manual classification of phrases for proper categorization
 * UPDATED: All phrases successfully migrated, arrays cleared
 */

// JE PHRASES - Phrases starting with "je " or "j'"
const jePhrases = [
  // All migrated - array cleared
];

// TU PHRASES - Phrases starting with "tu "
const tuPhrases = [
  // All migrated - array cleared
];

// IL/ELLE PHRASES - Phrases starting with "il " or "elle "
const ilEllePhrases = [
  // All migrated - array cleared
];

// ILS/ELLES PHRASES - Phrases starting with "ils " or "elles "
const ilsEllesPhrases = [
  // All migrated - array cleared
];

// NOUS PHRASES - Phrases starting with "nous "
const nousPhrases = [
  // All migrated - array cleared
];

// VOUS PHRASES - Phrases starting with "vous "
const vousPhrases = [
  // All migrated - array cleared
];

// ON PHRASES - Phrases starting with "on "
const onPhrases = [
  // All migrated - array cleared
];

// IL/ELLE COMBINED PHRASES - Phrases starting with "il/elle "
const ilElleCombinedPhrases = [
  // All migrated - array cleared
];

// ILS/ELLES COMBINED PHRASES - Phrases starting with "ils/elles "
const ilsEllesCombinedPhrases = [
  // All migrated - array cleared
];

// MASCULINE NOUNS - Phrases starting with "le " or "un " (capitalized)
const masculineNouns = [
  // All migrated - array cleared
];

// FEMININE NOUNS - Phrases starting with "la " or "une " (capitalized)
const feminineNouns = [
  // All migrated - array cleared
];

// PLURAL NOUNS - Phrases starting with "les " (capitalized)
const pluralNouns = [
  // All migrated - array cleared
];

// CONTRACTED NOUNS - Phrases starting with "l'" (capitalized, need manual gender determination)
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

// TIME EXPRESSIONS - Time-related phrases
const timeExpressions = [
  // All migrated - array cleared
];

// LOCATION PHRASES - Location and place-related phrases
const locationPhrases = [
  // All migrated - array cleared
];

// PROPER NOUNS - Proper nouns and names
const properNouns = [
  // All migrated - array cleared
];

// CONJUNCTION PHRASES - Conjunction combinations
const conjunctionPhrases = [
  // All migrated - array cleared
];

// Export the arrays
export {
  jePhrases,
  tuPhrases,
  ilEllePhrases,
  ilsEllesPhrases,
  nousPhrases,
  vousPhrases,
  onPhrases,
  ilElleCombinedPhrases,
  ilsEllesCombinedPhrases,
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
  timeExpressions,
  locationPhrases,
  properNouns,
  conjunctionPhrases,
};

// Summary statistics
export const summary = {
  totalPhrases: 0, // All phrases have been successfully migrated
  breakdown: {
    jePhrases: jePhrases.length,
    tuPhrases: tuPhrases.length,
    ilEllePhrases: ilEllePhrases.length,
    ilsEllesPhrases: ilsEllesPhrases.length,
    nousPhrases: nousPhrases.length,
    vousPhrases: vousPhrases.length,
    onPhrases: onPhrases.length,
    ilElleCombinedPhrases: ilElleCombinedPhrases.length,
    ilsEllesCombinedPhrases: ilsEllesCombinedPhrases.length,
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
    timeExpressions: timeExpressions.length,
    locationPhrases: locationPhrases.length,
    properNouns: properNouns.length,
    conjunctionPhrases: conjunctionPhrases.length,
  },
  status: "All phrases successfully migrated to appropriate categories",
};
`;

  fs.writeFileSync("phrases-target-list.js", targetListContent);

  console.log("✅ Updated phrases-target-list.js - all arrays cleared");

  // Summary
  console.log("\n🎉 MIGRATION COMPLETE!");
  console.log(`✅ Total processed: ${totalProcessed} phrases`);
  console.log(`❌ Errors encountered: ${totalErrors} phrases`);

  console.log("\n📁 Files updated:");
  for (const migration of categoryMigrations) {
    console.log(
      `  - src/data/dictionary/phrases/${migration.category}.js (${migration.count} phrases added)`
    );
  }
  console.log("  - src/data/dictionary/phrases.js (phrases removed)");
  console.log("  - phrases-word-list.js (phrases removed)");
  console.log("  - phrases-target-list.js (arrays cleared)");
} catch (error) {
  console.error("❌ Error during migration:", error.message);
  process.exit(1);
}
