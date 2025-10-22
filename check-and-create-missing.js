#!/usr/bin/env node

/**
 * Check and Create Missing Words Script
 * Checks if remaining words in target-list exist in dictionary files
 * If not found, creates them in the appropriate dictionary files
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import remaining arrays from target-list.js
import {
  adverbs,
  pronouns,
  interrogativeWords,
  alphabet,
} from "./target-list.js";

// All dictionary files to check
const dictionaryFiles = [
  "nouns.js",
  "adjectives.js",
  "articles.js",
  "adverbs.js",
  "conjunctions.js",
  "prepositions.js",
  "pronouns.js",
  "interjections.js",
  "interrogatives.js",
  "alphabet.js",
];

// Function to parse dictionary file
function parseDictionaryFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf8");
    const mapMatch = content.match(
      /export const \w+ = new Map\(\[([\s\S]*?)\]\);/
    );

    if (!mapMatch) {
      return null;
    }

    const mapContent = `[${mapMatch[1]}]`;
    const entries = eval(mapContent);
    return { entries, originalContent: content, mapMatch };
  } catch (error) {
    console.error(`Error parsing ${filePath}:`, error.message);
    return null;
  }
}

// Function to find a word in entries
function findWordInEntries(entries, targetWord) {
  for (const entry of entries) {
    if (entry[1] && entry[1].word === targetWord) {
      return entry;
    }
  }
  return null;
}

// Function to create a new dictionary entry
function createDictionaryEntry(word, partOfSpeech, translations = []) {
  const id = `${word}-fr`;
  const timestamp = new Date().toISOString();

  // Default translations based on part of speech
  let defaultTranslations = [];
  if (translations.length === 0) {
    switch (partOfSpeech) {
      case "adverb":
        defaultTranslations = [
          {
            language: "en",
            text: `[${word}]`,
            definition: "adverb",
            context: "general",
            confidence: 0.8,
          },
        ];
        break;
      case "pronoun":
        defaultTranslations = [
          {
            language: "en",
            text: `[${word}]`,
            definition: "pronoun",
            context: "general",
            confidence: 0.8,
          },
        ];
        break;
      case "interrogative":
        defaultTranslations = [
          {
            language: "en",
            text: `[${word}]`,
            definition: "interrogative word",
            context: "general",
            confidence: 0.8,
          },
        ];
        break;
      case "alphabet":
        defaultTranslations = [
          {
            language: "en",
            text: `[${word}]`,
            definition: "letter",
            context: "general",
            confidence: 0.8,
          },
        ];
        break;
      default:
        defaultTranslations = [
          {
            language: "en",
            text: `[${word}]`,
            definition: "word",
            context: "general",
            confidence: 0.8,
          },
        ];
    }
  } else {
    defaultTranslations = translations;
  }

  return [
    id,
    {
      id,
      language: "fr",
      word,
      partOfSpeech,
      translations: defaultTranslations,
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
      created_at: timestamp,
      updated_at: timestamp,
      source: "auto-generated",
      verified: false,
    },
  ];
}

// Function to add entry to target file
function addEntryToFile(entry, targetFile) {
  const targetPath = path.join(
    __dirname,
    "src/data/dictionary/words",
    targetFile
  );

  try {
    // Check if file exists, if not create it
    if (!fs.existsSync(targetPath)) {
      console.log(`📝 Creating new file: ${targetFile}`);
      const varName = targetFile.replace(".js", "");
      const header = `/**
 * ${varName.charAt(0).toUpperCase() + varName.slice(1)} Dictionary
 * Auto-generated from vocabulary extraction
 * Total entries: 0
 */

export const ${varName} = new Map([`;

      const footer = `]);

// Frequency-ordered array for priority loading
export const ${varName}ByFrequency = [];

export default ${varName};`;

      const content = `${header}\n${footer}`;
      fs.writeFileSync(targetPath, content);
    }

    const parseResult = parseDictionaryFile(targetPath);
    if (!parseResult) {
      console.log(`❌ Failed to parse ${targetFile}`);
      return false;
    }

    const { entries, originalContent, mapMatch } = parseResult;

    // Add to entries
    const updatedEntries = [...entries, entry];

    // Generate new content
    const headerMatch = originalContent.match(
      /^([\s\S]*?)export const \w+ = new Map\(/
    );
    const header = headerMatch ? headerMatch[1] : "";

    const footerMatch = originalContent.match(
      /export const \w+ = new Map\(\[[\s\S]*?\]\);\s*([\s\S]*)$/
    );
    const footer = footerMatch ? footerMatch[1] : "";

    const varMatch = originalContent.match(/export const (\w+) = new Map/);
    const varName = varMatch ? varMatch[1] : targetFile.replace(".js", "");

    const entriesString = updatedEntries
      .map((entry) => {
        const [id, data] = entry;
        return `  [\n    "${id}",\n    ${JSON.stringify(data, null, 4).replace(
          /^/gm,
          "    "
        )}\n  ]`;
      })
      .join(",\n");

    const updatedHeader = header.replace(
      /Total entries: \d+/,
      `Total entries: ${updatedEntries.length}`
    );
    const newContent = `${updatedHeader}export const ${varName} = new Map([\n${entriesString}\n]);\n${footer}`;

    // Write to file
    fs.writeFileSync(targetPath, newContent);
    return true;
  } catch (error) {
    console.error(`Error adding to ${targetFile}:`, error.message);
    return false;
  }
}

// Function to check if word exists in any dictionary file
function checkWordExists(word) {
  for (const fileName of dictionaryFiles) {
    const filePath = path.join(
      __dirname,
      "src/data/dictionary/words",
      fileName
    );

    if (fs.existsSync(filePath)) {
      const parseResult = parseDictionaryFile(filePath);

      if (parseResult) {
        const { entries } = parseResult;
        const entry = findWordInEntries(entries, word);

        if (entry) {
          return { found: true, file: fileName, entry };
        }
      }
    }
  }
  return { found: false, file: null, entry: null };
}

console.log("=== CHECK AND CREATE MISSING WORDS SCRIPT ===");
console.log("Checking remaining words in target-list.js...\n");

// Check adverbs
console.log("=== CHECKING ADVERBS ===");
const missingAdverbs = [];
for (const word of adverbs) {
  const result = checkWordExists(word);
  if (result.found) {
    console.log(`✅ Found "${word}" in ${result.file}`);
  } else {
    console.log(`❌ Missing "${word}" - will create in adverbs.js`);
    missingAdverbs.push(word);
  }
}

// Check pronouns
console.log("\n=== CHECKING PRONOUNS ===");
const missingPronouns = [];
for (const word of pronouns) {
  const result = checkWordExists(word);
  if (result.found) {
    console.log(`✅ Found "${word}" in ${result.file}`);
  } else {
    console.log(`❌ Missing "${word}" - will create in pronouns.js`);
    missingPronouns.push(word);
  }
}

// Check interrogative words
console.log("\n=== CHECKING INTERROGATIVE WORDS ===");
const missingInterrogatives = [];
for (const word of interrogativeWords) {
  const result = checkWordExists(word);
  if (result.found) {
    console.log(`✅ Found "${word}" in ${result.file}`);
  } else {
    console.log(`❌ Missing "${word}" - will create in interrogatives.js`);
    missingInterrogatives.push(word);
  }
}

// Check alphabet
console.log("\n=== CHECKING ALPHABET ===");
const missingAlphabet = [];
for (const letter of alphabet) {
  const result = checkWordExists(letter);
  if (result.found) {
    console.log(`✅ Found "${letter}" in ${result.file}`);
  } else {
    console.log(`❌ Missing "${letter}" - will create in alphabet.js`);
    missingAlphabet.push(letter);
  }
}

// Create missing words
console.log("\n=== CREATING MISSING WORDS ===");

// Create missing adverbs
if (missingAdverbs.length > 0) {
  console.log(`\nCreating ${missingAdverbs.length} missing adverbs...`);
  for (const word of missingAdverbs) {
    const entry = createDictionaryEntry(word, "adverb");
    if (addEntryToFile(entry, "adverbs.js")) {
      console.log(`✅ Created "${word}" in adverbs.js`);
    } else {
      console.log(`❌ Failed to create "${word}" in adverbs.js`);
    }
  }
}

// Create missing pronouns
if (missingPronouns.length > 0) {
  console.log(`\nCreating ${missingPronouns.length} missing pronouns...`);
  for (const word of missingPronouns) {
    const entry = createDictionaryEntry(word, "pronoun");
    if (addEntryToFile(entry, "pronouns.js")) {
      console.log(`✅ Created "${word}" in pronouns.js`);
    } else {
      console.log(`❌ Failed to create "${word}" in pronouns.js`);
    }
  }
}

// Create missing interrogatives
if (missingInterrogatives.length > 0) {
  console.log(
    `\nCreating ${missingInterrogatives.length} missing interrogatives...`
  );
  for (const word of missingInterrogatives) {
    const entry = createDictionaryEntry(word, "interrogative");
    if (addEntryToFile(entry, "interrogatives.js")) {
      console.log(`✅ Created "${word}" in interrogatives.js`);
    } else {
      console.log(`❌ Failed to create "${word}" in interrogatives.js`);
    }
  }
}

// Create missing alphabet
if (missingAlphabet.length > 0) {
  console.log(
    `\nCreating ${missingAlphabet.length} missing alphabet letters...`
  );
  for (const letter of missingAlphabet) {
    const entry = createDictionaryEntry(letter, "alphabet");
    if (addEntryToFile(entry, "alphabet.js")) {
      console.log(`✅ Created "${letter}" in alphabet.js`);
    } else {
      console.log(`❌ Failed to create "${letter}" in alphabet.js`);
    }
  }
}

console.log("\n=== SUMMARY ===");
console.log(`Missing adverbs: ${missingAdverbs.length}`);
console.log(`Missing pronouns: ${missingPronouns.length}`);
console.log(`Missing interrogatives: ${missingInterrogatives.length}`);
console.log(`Missing alphabet: ${missingAlphabet.length}`);

console.log("\n=== CHECK AND CREATE COMPLETE ===");
