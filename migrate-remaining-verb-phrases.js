/**
 * Migrate Remaining Verb Phrases to verb-phrases.js
 * Move all remaining verb phrases from phrases-target-list.js to verb-phrases.js
 * Handle duplicates by updating relationships, partOfSpeech, and tags
 * Remove from phrases.js, phrases-target-list.js, and phrases-word-list.js
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import the target list to get the remaining verb phrases
import {
  jePhrases,
  tuPhrases,
  ilEllePhrases,
  ilsEllesPhrases,
  nousPhrases,
  vousPhrases,
  onPhrases,
  ilElleCombinedPhrases,
  ilsEllesCombinedPhrases,
} from "./phrases-target-list.js";

// Paths to files
const phrasesPath = path.join(__dirname, "src/data/dictionary/phrases.js");
const verbPhrasesPath = path.join(
  __dirname,
  "src/data/dictionary/phrases/verb-phrases.js"
);

console.log("🚀 Migrating remaining verb phrases to verb-phrases.js...");

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

  // Function to get pronoun from phrase
  function getPronoun(phrase) {
    if (phrase.startsWith("je ")) return "je";
    if (phrase.startsWith("j'")) return "j'";
    if (phrase.startsWith("tu ")) return "tu";
    if (phrase.startsWith("il ")) return "il";
    if (phrase.startsWith("elle ")) return "elle";
    if (phrase.startsWith("ils ")) return "ils";
    if (phrase.startsWith("elles ")) return "elles";
    if (phrase.startsWith("nous ")) return "nous";
    if (phrase.startsWith("vous ")) return "vous";
    if (phrase.startsWith("on ")) return "on";
    if (phrase.startsWith("il/elle ")) return "il/elle";
    if (phrase.startsWith("ils/elles ")) return "ils/elles";
    return "";
  }

  // Function to get verb from phrase
  function getVerb(phrase) {
    const pronoun = getPronoun(phrase);
    if (pronoun) {
      return phrase.substring(pronoun.length).trim();
    }
    return phrase;
  }

  // Function to determine verb tense/mood from phrase
  function getVerbTense(phrase, translation) {
    const lowerPhrase = phrase.toLowerCase();
    const lowerTranslation = translation.toLowerCase();

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

  // Collect all remaining verb phrases
  const allRemainingVerbPhrases = [
    ...jePhrases,
    ...tuPhrases,
    ...ilEllePhrases,
    ...ilsEllesPhrases,
    ...nousPhrases,
    ...vousPhrases,
    ...onPhrases,
    ...ilElleCombinedPhrases,
    ...ilsEllesCombinedPhrases,
  ];

  console.log(
    `📊 Total remaining verb phrases to process: ${allRemainingVerbPhrases.length}`
  );

  // Migration counters
  let totalProcessed = 0;
  let totalDuplicates = 0;
  let totalNew = 0;
  let totalErrors = 0;

  // Process each remaining verb phrase
  const newVerbPhrases = [];
  const updatedVerbPhrases = [];

  for (const phrase of allRemainingVerbPhrases) {
    try {
      // Get the original phrase data
      const originalData = phrasesLookup.get(phrase);
      if (!originalData) {
        console.log(`❌ Phrase "${phrase}" not found in original phrases`);
        totalErrors++;
        continue;
      }

      // Get pronoun and verb
      const pronoun = getPronoun(phrase);
      const verb = getVerb(phrase);
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

  console.log("✅ Updated verb-phrases.js with new and updated verb phrases");

  // Remove migrated phrases from original file
  console.log("\n🧹 Removing migrated phrases from original file...");

  let removedCount = 0;
  for (const phrase of allRemainingVerbPhrases) {
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
      .filter((phrase) => !allRemainingVerbPhrases.includes(phrase));

    const updatedWordListContent = wordListContent.replace(
      /export const allPhrases = \[[\s\S]*?\];/,
      `export const allPhrases = [\n${currentPhrases
        .map((phrase) => `  "${phrase}",`)
        .join("\n")}\n];`
    );

    fs.writeFileSync("phrases-word-list.js", updatedWordListContent);
    console.log(
      `✅ Removed ${allRemainingVerbPhrases.length} verb phrases from phrases-word-list.js`
    );
  }

  // Clear the target list
  console.log("\n📝 Clearing phrases-target-list.js...");

  const targetListContent = `/**
 * Phrases Target List
 * Manual classification of phrases for proper categorization
 * UPDATED: All remaining verb phrases migrated to verb-phrases.js, arrays cleared
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
  console.log(`✅ Total processed: ${totalProcessed} verb phrases`);
  console.log(`🔄 Duplicates updated: ${totalDuplicates} phrases`);
  console.log(`➕ New verb phrases created: ${totalNew} phrases`);
  console.log(`❌ Errors encountered: ${totalErrors} phrases`);

  console.log("\n📁 Files updated:");
  console.log(
    "  - src/data/dictionary/phrases/verb-phrases.js (verb phrases added/updated)"
  );
  console.log("  - src/data/dictionary/phrases.js (phrases removed)");
  console.log("  - phrases-word-list.js (phrases removed)");
  console.log("  - phrases-target-list.js (arrays cleared)");
} catch (error) {
  console.error("❌ Error during migration:", error.message);
  process.exit(1);
}
