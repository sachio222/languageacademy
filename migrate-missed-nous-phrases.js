/**
 * Migrate Missed Nous Verb Phrases
 * Move the 5 remaining "nous" verb phrases to verb-phrases.js
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// The 5 missed nous phrases
const missedNousPhrases = [
  "nous comprenons",
  "nous croyons",
  "nous parlons",
  "nous prenons",
  "nous savons",
];

// Paths to files
const phrasesPath = path.join(__dirname, "src/data/dictionary/phrases.js");
const verbPhrasesPath = path.join(
  __dirname,
  "src/data/dictionary/phrases/verb-phrases.js"
);

console.log("🚀 Migrating 5 missed nous verb phrases...");

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

  // Read existing verb-phrases.js
  const verbPhrasesContent = fs.readFileSync(verbPhrasesPath, "utf8");

  // Extract existing entries
  const verbPhrasesMapMatch = verbPhrasesContent.match(
    /export const \w+ = new Map\(\[([\s\S]*?)\]\);/m
  );

  if (!verbPhrasesMapMatch) {
    console.log("❌ Could not find verbPhrases Map in file");
    process.exit(1);
  }

  // Parse existing entries
  const verbPhrasesMapContent = `[${verbPhrasesMapMatch[1]}]`;
  const existingVerbPhrases = eval(verbPhrasesMapContent);

  console.log(`📊 Found ${existingVerbPhrases.length} existing verb phrases`);

  // Create lookup maps
  const phrasesLookup = new Map();
  phrasesEntries.forEach(([id, entry]) => {
    phrasesLookup.set(entry.word, { id, entry });
  });

  const existingVerbPhrasesLookup = new Map();
  existingVerbPhrases.forEach(([id, entry]) => {
    existingVerbPhrasesLookup.set(entry.word, { id, entry });
  });

  // Function to add pronoun to relationships
  function addPronounToRelationships(relationships, pronoun) {
    if (!relationships) relationships = [];

    // Check if pronoun already exists in relationships
    const hasPronoun = relationships.some(
      (rel) => rel.type === "subject" && rel.pronoun === pronoun
    );

    if (!hasPronoun) {
      relationships.push({
        type: "subject",
        pronoun: pronoun,
        relationship: "subject_pronoun",
      });
    }

    return relationships;
  }

  // Function to determine verb tense/mood from phrase
  function getVerbTense(phrase, translation) {
    const lowerPhrase = phrase.toLowerCase();

    // Past tense indicators
    if (
      lowerPhrase.includes("ai ") ||
      lowerPhrase.includes("as ") ||
      lowerPhrase.includes("a ") ||
      lowerPhrase.includes("avons ") ||
      lowerPhrase.includes("avez ") ||
      lowerPhrase.includes("ont ")
    ) {
      return "passé composé";
    }

    // Future tense indicators
    if (
      lowerPhrase.includes("aurai") ||
      lowerPhrase.includes("auras") ||
      lowerPhrase.includes("aura") ||
      lowerPhrase.includes("aurons") ||
      lowerPhrase.includes("aurez") ||
      lowerPhrase.includes("auront")
    ) {
      return "futur";
    }

    // Conditional indicators
    if (
      lowerPhrase.includes("aurais") ||
      lowerPhrase.includes("aurais") ||
      lowerPhrase.includes("aurait") ||
      lowerPhrase.includes("aurions") ||
      lowerPhrase.includes("auriez") ||
      lowerPhrase.includes("auraient")
    ) {
      return "conditionnel";
    }

    // Subjunctive indicators
    if (
      lowerPhrase.includes("aie") ||
      lowerPhrase.includes("aies") ||
      lowerPhrase.includes("ait") ||
      lowerPhrase.includes("ayons") ||
      lowerPhrase.includes("ayez") ||
      lowerPhrase.includes("aient")
    ) {
      return "subjonctif";
    }

    // Imperfect indicators
    if (
      lowerPhrase.includes("ais") ||
      lowerPhrase.includes("ais") ||
      lowerPhrase.includes("ait") ||
      lowerPhrase.includes("ions") ||
      lowerPhrase.includes("iez") ||
      lowerPhrase.includes("aient")
    ) {
      return "imparfait";
    }

    // Default to present
    return "présent";
  }

  // Migration counters
  let totalProcessed = 0;
  let totalDuplicates = 0;
  let totalNew = 0;
  let totalErrors = 0;

  // Process each missed nous phrase
  const newVerbPhrases = [];
  const updatedVerbPhrases = [];

  for (const phrase of missedNousPhrases) {
    try {
      // Get the original phrase data
      const originalData = phrasesLookup.get(phrase);
      if (!originalData) {
        console.log(`❌ Phrase "${phrase}" not found in original phrases`);
        totalErrors++;
        continue;
      }

      // Get pronoun and tense
      const pronoun = "nous";
      const tense = getVerbTense(
        phrase,
        originalData.entry.translations[0]?.text || ""
      );

      // Check if phrase already exists in verb-phrases
      const existingVerbPhrase = existingVerbPhrasesLookup.get(phrase);

      if (existingVerbPhrase) {
        // Duplicate found - update relationships and tags
        console.log(
          `🔄 Duplicate found: "${phrase}" - updating relationships and tags`
        );

        const updatedEntry = [
          existingVerbPhrase.id,
          {
            ...existingVerbPhrase.entry,
            partOfSpeech: "verb",
            relationships: addPronounToRelationships(
              existingVerbPhrase.entry.relationships,
              pronoun
            ),
            tags: [
              ...(existingVerbPhrase.entry.tags || []),
              "verb-phrase",
              tense,
            ],
          },
        ];

        updatedVerbPhrases.push(updatedEntry);
        totalDuplicates++;
      } else {
        // New verb phrase - create entry
        console.log(`➕ New verb phrase: "${phrase}" - creating entry`);

        const newEntry = [
          `${phrase.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9-]/g, "")}-fr`,
          {
            ...originalData.entry,
            id: `${phrase
              .replace(/\s+/g, "-")
              .replace(/[^a-zA-Z0-9-]/g, "")}-fr`,
            word: phrase,
            partOfSpeech: "verb",
            relationships: addPronounToRelationships([], pronoun),
            tags: [...(originalData.entry.tags || []), "verb-phrase", tense],
          },
        ];

        newVerbPhrases.push(newEntry);
        totalNew++;
      }

      totalProcessed++;
    } catch (error) {
      console.error(`❌ Error processing "${phrase}":`, error.message);
      totalErrors++;
    }
  }

  // Update verb-phrases.js file
  console.log("\n📝 Updating verb-phrases.js...");

  // Create updated verb phrases entries
  const updatedVerbPhrasesMap = new Map();

  // Add existing verb phrases (excluding updated ones)
  existingVerbPhrases.forEach(([id, entry]) => {
    const isUpdated = updatedVerbPhrases.some(
      ([updatedId]) => updatedId === id
    );
    if (!isUpdated) {
      updatedVerbPhrasesMap.set(id, entry);
    }
  });

  // Add updated verb phrases
  updatedVerbPhrases.forEach(([id, entry]) => {
    updatedVerbPhrasesMap.set(id, entry);
  });

  // Add new verb phrases
  newVerbPhrases.forEach(([id, entry]) => {
    updatedVerbPhrasesMap.set(id, entry);
  });

  // Convert to array for file writing
  const finalVerbPhrasesEntries = Array.from(updatedVerbPhrasesMap.entries());

  // Generate new content for verb-phrases.js
  const headerMatch = verbPhrasesContent.match(
    /\/\*\*[\s\S]*?\*\/\n\nexport const \w+ = new Map\(\[/
  );

  if (!headerMatch) {
    console.log("❌ Could not find header in verb-phrases.js");
    process.exit(1);
  }

  const header = headerMatch[0];
  const entriesString = finalVerbPhrasesEntries
    .map(([id, entry]) => {
      return `  [\n    "${id}",\n    ${JSON.stringify(entry, null, 4)}\n  ]`;
    })
    .join(",\n");

  const newVerbPhrasesContent = `${header}\n${entriesString}\n]);\n\n// Frequency-ordered array for priority loading\nexport const verbphrasesByFrequency = [${finalVerbPhrasesEntries
    .map(([id]) => `"${id}"`)
    .join(", ")}];\n\nexport default verbphrases;`;

  // Write back to file
  fs.writeFileSync(verbPhrasesPath, newVerbPhrasesContent);

  console.log("✅ Updated verb-phrases.js with missed nous phrases");

  // Remove migrated phrases from original file
  console.log("\n🧹 Removing migrated phrases from original file...");

  let removedCount = 0;
  for (const phrase of missedNousPhrases) {
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

  // Update phrases-word-list.js to remove verb phrases
  console.log("\n📝 Updating phrases-word-list.js...");

  const wordListContent = fs.readFileSync("phrases-word-list.js", "utf8");

  // Remove verb phrases from the allPhrases array
  const allPhrasesMatch = wordListContent.match(
    /export const allPhrases = \[([\s\S]*?)\];/
  );

  if (allPhrasesMatch) {
    const currentPhrases = allPhrasesMatch[1]
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line && line.startsWith('"'))
      .map((line) => line.replace(/^"|",?$/g, ""))
      .filter((phrase) => !missedNousPhrases.includes(phrase));

    const updatedWordListContent = wordListContent.replace(
      /export const allPhrases = \[[\s\S]*?\];/,
      `export const allPhrases = [\n${currentPhrases
        .map((phrase) => `  "${phrase}",`)
        .join("\n")}\n];`
    );

    fs.writeFileSync("phrases-word-list.js", updatedWordListContent);
    console.log(
      `✅ Removed ${missedNousPhrases.length} missed nous phrases from phrases-word-list.js`
    );
  }

  // Summary
  console.log("\n🎉 MIGRATION COMPLETE!");
  console.log(`✅ Total processed: ${totalProcessed} missed nous phrases`);
  console.log(`🔄 Duplicates updated: ${totalDuplicates} phrases`);
  console.log(`➕ New verb phrases created: ${totalNew} phrases`);
  console.log(`❌ Errors encountered: ${totalErrors} phrases`);

  console.log("\n📁 Files updated:");
  console.log(
    "  - src/data/dictionary/phrases/verb-phrases.js (missed nous phrases added/updated)"
  );
  console.log("  - src/data/dictionary/phrases.js (phrases removed)");
  console.log("  - phrases-word-list.js (phrases removed)");
} catch (error) {
  console.error("❌ Error during migration:", error.message);
  process.exit(1);
}
