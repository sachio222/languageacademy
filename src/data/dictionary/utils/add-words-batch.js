#!/usr/bin/env node

/**
 * Batch Add Words to Dictionary Utility
 * Add multiple words from a JSON file or CSV
 *
 * Usage: node add-words-batch.js [options]
 *
 * Options:
 *   --file <path>          Path to JSON or CSV file with words
 *   --format <format>      File format: json, csv (default: json)
 *   --dry-run              Show what would be added without actually adding
 *   --help                 Show this help message
 *
 * JSON Format:
 * [
 *   {
 *     "word": "chat",
 *     "partOfSpeech": "noun",
 *     "translation": "cat",
 *     "definition": "domestic feline",
 *     "cefr": "A1",
 *     "difficulty": 2,
 *     "gender": "masculine",
 *     "source": "lesson-1"
 *   }
 * ]
 *
 * CSV Format:
 * word,partOfSpeech,translation,definition,cefr,difficulty,gender,source
 * chat,noun,cat,domestic feline,A1,2,masculine,lesson-1
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Note: This is a simplified version for demonstration
// In a real implementation, you would import the actual function

// Function to parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    file: null,
    format: "json",
    dryRun: false,
    help: false,
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    const nextArg = args[i + 1];

    switch (arg) {
      case "--file":
        options.file = nextArg;
        i++;
        break;
      case "--format":
        options.format = nextArg;
        i++;
        break;
      case "--dry-run":
        options.dryRun = true;
        break;
      case "--help":
        options.help = true;
        break;
    }
  }

  return options;
}

// Function to show help
function showHelp() {
  console.log(`
📚 Batch Add Words to Dictionary Utility

USAGE:
  node add-words-batch.js [options]

OPTIONS:
  --file <path>          Path to JSON or CSV file with words
  --format <format>      File format: json, csv (default: json)
  --dry-run              Show what would be added without actually adding
  --help                 Show this help message

FILE FORMATS:

JSON Format:
[
  {
    "word": "chat",
    "partOfSpeech": "noun", 
    "translation": "cat",
    "definition": "domestic feline",
    "cefr": "A1",
    "difficulty": 2,
    "gender": "masculine",
    "source": "lesson-1"
  }
]

CSV Format:
word,partOfSpeech,translation,definition,cefr,difficulty,gender,source
chat,noun,cat,domestic feline,A1,2,masculine,lesson-1

EXAMPLES:
  # Add words from JSON file
  node add-words-batch.js --file words.json
  
  # Add words from CSV file
  node add-words-batch.js --file words.csv --format csv
  
  # Dry run to see what would be added
  node add-words-batch.js --file words.json --dry-run
`);
}

// Function to parse JSON file
function parseJSONFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf8");
    return JSON.parse(content);
  } catch (error) {
    console.error(`❌ Error parsing JSON file: ${error.message}`);
    return null;
  }
}

// Function to parse CSV file
function parseCSVFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf8");
    const lines = content.trim().split("\n");
    const headers = lines[0].split(",").map((h) => h.trim());

    const words = [];
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(",").map((v) => v.trim());
      const word = {};

      headers.forEach((header, index) => {
        word[header] = values[index] || "";
      });

      words.push(word);
    }

    return words;
  } catch (error) {
    console.error(`❌ Error parsing CSV file: ${error.message}`);
    return null;
  }
}

// Function to validate word data
function validateWordData(wordData) {
  const errors = [];

  if (!wordData.word) {
    errors.push("Word is required");
  }

  if (!wordData.partOfSpeech) {
    errors.push("Part of speech is required");
  }

  if (!wordData.translation) {
    errors.push("Translation is required");
  }

  return errors;
}

// Function to add word (imported from main utility)
async function addWordToDictionary(options) {
  // This would be the same function from add-word-to-dictionary.js
  // For now, we'll simulate the addition
  console.log(`  ✅ Would add "${options.word}" (${options.partOfSpeech})`);
  return true;
}

// Main function
async function main() {
  const options = parseArgs();

  if (options.help) {
    showHelp();
    return;
  }

  if (!options.file) {
    console.log("❌ File path is required (--file)");
    console.log("Use --help for usage information");
    return;
  }

  if (!fs.existsSync(options.file)) {
    console.log(`❌ File not found: ${options.file}`);
    return;
  }

  console.log(`📚 Batch Adding Words from ${options.file}`);
  console.log(`Format: ${options.format}`);
  console.log(`Dry run: ${options.dryRun}\n`);

  // Parse file
  let words = null;
  if (options.format === "json") {
    words = parseJSONFile(options.file);
  } else if (options.format === "csv") {
    words = parseCSVFile(options.file);
  } else {
    console.log("❌ Invalid format. Use 'json' or 'csv'");
    return;
  }

  if (!words || !Array.isArray(words)) {
    console.log("❌ Invalid file format or empty file");
    return;
  }

  console.log(`Found ${words.length} words to process\n`);

  let successCount = 0;
  let errorCount = 0;
  const errors = [];

  for (let i = 0; i < words.length; i++) {
    const wordData = words[i];
    console.log(
      `Processing ${i + 1}/${words.length}: ${wordData.word || "unknown"}`
    );

    // Validate word data
    const validationErrors = validateWordData(wordData);
    if (validationErrors.length > 0) {
      console.log(`  ❌ Validation errors: ${validationErrors.join(", ")}`);
      errorCount++;
      errors.push(`${wordData.word}: ${validationErrors.join(", ")}`);
      continue;
    }

    if (options.dryRun) {
      console.log(
        `  🔍 Would add: ${wordData.word} (${wordData.partOfSpeech}) - ${wordData.translation}`
      );
      successCount++;
    } else {
      try {
        // Set defaults
        const wordOptions = {
          word: wordData.word,
          partOfSpeech: wordData.partOfSpeech,
          translation: wordData.translation,
          definition: wordData.definition || null,
          cefr: wordData.cefr || "A1",
          difficulty: wordData.difficulty || 2,
          gender: wordData.gender || "none",
          source: wordData.source || "batch-import",
        };

        await addWordToDictionary(wordOptions);
        successCount++;
      } catch (error) {
        console.log(`  ❌ Error adding word: ${error.message}`);
        errorCount++;
        errors.push(`${wordData.word}: ${error.message}`);
      }
    }
  }

  console.log(`\n=== BATCH PROCESSING COMPLETE ===`);
  console.log(`Total words processed: ${words.length}`);
  console.log(`Successfully added: ${successCount}`);
  console.log(`Errors: ${errorCount}`);

  if (errors.length > 0) {
    console.log(`\nErrors encountered:`);
    errors.forEach((error) => console.log(`  - ${error}`));
  }

  if (options.dryRun) {
    console.log(`\n🔍 This was a dry run. No words were actually added.`);
    console.log(`Remove --dry-run to actually add the words.`);
  } else {
    console.log(`\n🎉 Batch word addition complete!`);
  }
}

// Run the script
main().catch((error) => {
  console.error("❌ Error:", error.message);
  process.exit(1);
});
