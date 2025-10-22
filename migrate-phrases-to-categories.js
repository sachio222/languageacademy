/**
 * Migrate Phrases to Categories
 * Move phrases from target list to their proper phrase category files
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import the target list
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

console.log("🚀 Starting phrase migration to categories...");

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

  // Function to add phrase to category file
  function addPhraseToCategory(phrase, categoryFile, newPartOfSpeech) {
    const targetPath = path.join(
      __dirname,
      "src/data/dictionary/phrases",
      categoryFile
    );

    try {
      // Check if file exists, if not create it
      if (!fs.existsSync(targetPath)) {
        console.log(`📝 Creating new file: ${categoryFile}`);
        const varName = categoryFile.replace(".js", "");
        const header = `/**
 * ${varName.charAt(0).toUpperCase() + varName.slice(1)} Dictionary
 * Auto-generated from phrase migration
 * Total entries: 0
 */

export const ${varName} = new Map([
  // Phrases will be added here
]);

// Frequency-ordered array for priority loading
export const ${varName}ByFrequency = [];

export default ${varName};
`;
        fs.writeFileSync(targetPath, header);
      }

      // Read current file content
      const fileContent = fs.readFileSync(targetPath, "utf8");

      // Find the Map content
      const mapMatch = fileContent.match(
        /export const \w+ = new Map\(\[([\s\S]*?)\]\);/m
      );

      if (!mapMatch) {
        console.log(`❌ Failed to parse ${categoryFile}`);
        return false;
      }

      const currentEntries =
        mapMatch[1].trim() === "" ? [] : eval(`[${mapMatch[1]}]`);

      // Check if phrase already exists
      const existingEntry = currentEntries.find((e) => e[1].word === phrase);
      if (existingEntry) {
        console.log(`⚠️  Phrase "${phrase}" already exists in ${categoryFile}`);
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
          partOfSpeech: newPartOfSpeech,
        },
      ];

      // Add to entries
      const updatedEntries = [...currentEntries, newEntry];

      // Generate new content
      const headerMatch = fileContent.match(
        /\/\*\*[\s\S]*?\*\/\n\nexport const \w+ = new Map\(\[/
      );

      if (!headerMatch) {
        console.log(`❌ Could not find header in ${categoryFile}`);
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

      const newContent = `${header}\n${entriesString}\n]);\n\n// Frequency-ordered array for priority loading\nexport const ${categoryFile.replace(
        ".js",
        ""
      )}ByFrequency = [${updatedEntries
        .map(([id]) => `"${id}"`)
        .join(", ")}];\n\nexport default ${categoryFile.replace(".js", "")};`;

      // Write back to file
      fs.writeFileSync(targetPath, newContent);
      return true;
    } catch (error) {
      console.error(`❌ Error adding to ${categoryFile}:`, error.message);
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

  // Migrate expressions
  console.log("\n📝 Migrating expressions...");
  for (const phrase of expressions) {
    if (addPhraseToCategory(phrase, "expressions.js", "expression")) {
      console.log(`✅ Added "${phrase}" to expressions.js`);
      totalMigrated++;
    } else {
      totalErrors++;
    }
  }

  // Migrate greetings
  console.log("\n📝 Migrating greetings...");
  for (const phrase of greetings) {
    if (addPhraseToCategory(phrase, "greetings.js", "greeting")) {
      console.log(`✅ Added "${phrase}" to greetings.js`);
      totalMigrated++;
    } else {
      totalErrors++;
    }
  }

  // Migrate questions
  console.log("\n📝 Migrating questions...");
  for (const phrase of questions) {
    if (addPhraseToCategory(phrase, "questions.js", "question")) {
      console.log(`✅ Added "${phrase}" to questions.js`);
      totalMigrated++;
    } else {
      totalErrors++;
    }
  }

  // Migrate prepositional phrases
  console.log("\n📝 Migrating prepositional phrases...");
  for (const phrase of prepositionalPhrases) {
    if (
      addPhraseToCategory(phrase, "prepositional-phrases.js", "prepositional")
    ) {
      console.log(`✅ Added "${phrase}" to prepositional-phrases.js`);
      totalMigrated++;
    } else {
      totalErrors++;
    }
  }

  // Migrate verb phrases
  console.log("\n📝 Migrating verb phrases...");
  for (const phrase of verbPhrases) {
    if (addPhraseToCategory(phrase, "verb-phrases.js", "verb")) {
      console.log(`✅ Added "${phrase}" to verb-phrases.js`);
      totalMigrated++;
    } else {
      totalErrors++;
    }
  }

  // Migrate adjective phrases
  console.log("\n📝 Migrating adjective phrases...");
  for (const phrase of adjectivePhrases) {
    if (addPhraseToCategory(phrase, "adjective-phrases.js", "adjective")) {
      console.log(`✅ Added "${phrase}" to adjective-phrases.js`);
      totalMigrated++;
    } else {
      totalErrors++;
    }
  }

  // Migrate article phrases
  console.log("\n📝 Migrating article phrases...");
  for (const phrase of articlePhrases) {
    if (addPhraseToCategory(phrase, "article-phrases.js", "article")) {
      console.log(`✅ Added "${phrase}" to article-phrases.js`);
      totalMigrated++;
    } else {
      totalErrors++;
    }
  }

  // Summary
  console.log("\n🎉 MIGRATION COMPLETE!");
  console.log(`✅ Successfully migrated: ${totalMigrated} phrases`);
  console.log(`❌ Errors encountered: ${totalErrors} phrases`);

  // Show what was migrated where
  console.log("\n📊 MIGRATION SUMMARY:");
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
  console.log("  - src/data/dictionary/phrases/expressions.js");
  console.log("  - src/data/dictionary/phrases/greetings.js");
  console.log("  - src/data/dictionary/phrases/questions.js");
  console.log("  - src/data/dictionary/phrases/prepositional-phrases.js");
  console.log("  - src/data/dictionary/phrases/verb-phrases.js");
  console.log("  - src/data/dictionary/phrases/adjective-phrases.js");
  console.log("  - src/data/dictionary/phrases/article-phrases.js");
} catch (error) {
  console.error("❌ Error during migration:", error.message);
  process.exit(1);
}
