#!/usr/bin/env node

/**
 * Generate Lesson Words CLI
 * Easy-to-use tool for adding vocabulary to the dictionary when creating lessons
 *
 * Basic Usage:
 *   node generate-lesson-words.js --file lesson-words.json
 *   node generate-lesson-words.js --word "chat" --translation "cat" --pos "noun" --gender "masculine"
 *   node generate-lesson-words.js --json '[{"word":"chat","translation":"cat"}]'
 *   node generate-lesson-words.js --interactive
 *
 * Part-of-Speech Specific Examples:
 *
 * VERBS with phrases:
 *   {
 *     "word": "est",
 *     "translation": "is",
 *     "partOfSpeech": "verb",
 *     "infinitive": "être",
 *     "verb_phrases": [
 *       {"phrase": "il est", "type": "pronoun_verb", "frequency": "common"},
 *       {"phrase": "n'est pas", "type": "negation", "frequency": "common"}
 *     ]
 *   }
 *
 * NOUNS with articles and plural:
 *   {
 *     "word": "chat",
 *     "translation": "cat",
 *     "partOfSpeech": "noun",
 *     "gender": "masculine",
 *     "plural_form": "chats",
 *     "noun_articles": {"definite": "le", "indefinite": "un", "plural": "les"},
 *     "noun_phrases": [
 *       {"phrase": "le chat", "type": "definite_article", "frequency": "common"},
 *       {"phrase": "un chat", "type": "indefinite_article", "frequency": "common"}
 *     ]
 *   }
 *
 * ADJECTIVES with forms:
 *   {
 *     "word": "grand",
 *     "translation": "big/tall",
 *     "partOfSpeech": "adjective",
 *     "adjective_forms": {
 *       "masculine_singular": "grand",
 *       "feminine_singular": "grande",
 *       "masculine_plural": "grands",
 *       "feminine_plural": "grandes"
 *     },
 *     "adjective_phrases": [
 *       {"phrase": "très grand", "type": "intensifier", "frequency": "common"},
 *       {"phrase": "plus grand que", "type": "comparative", "frequency": "common"}
 *     ]
 *   }
 */

import fs from "fs";
import path from "path";
import readline from "readline";
import { DefinitionGenerator } from "./src/data/dictionary/utils/generate-definitions.js";

// Valid parts of speech
const VALID_PARTS_OF_SPEECH = [
  "noun",
  "verb",
  "adjective",
  "adverb",
  "pronoun",
  "article",
  "preposition",
  "conjunction",
  "interjection",
  "expression",
];

// Valid genders
const VALID_GENDERS = ["masculine", "feminine", "none"];

/**
 * Parse command line arguments
 */
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    file: null,
    word: null,
    translation: null,
    pos: null,
    gender: null,
    infinitive: null,
    json: null,
    interactive: false,
    autoScrape: true,
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
      case "--word":
        options.word = nextArg;
        i++;
        break;
      case "--translation":
        options.translation = nextArg;
        i++;
        break;
      case "--pos":
      case "--partOfSpeech":
        options.pos = nextArg;
        i++;
        break;
      case "--gender":
        options.gender = nextArg;
        i++;
        break;
      case "--infinitive":
        options.infinitive = nextArg;
        i++;
        break;
      case "--json":
        options.json = nextArg;
        i++;
        break;
      case "--interactive":
        options.interactive = true;
        break;
      case "--no-scrape":
        options.autoScrape = false;
        break;
      case "--help":
        options.help = true;
        break;
    }
  }

  return options;
}

/**
 * Show help message
 */
function showHelp() {
  console.log(`
📚 Generate Lesson Words - Dictionary Definition Generator

USAGE:
  node generate-lesson-words.js [options]

OPTIONS:
  --file <path>           Path to JSON file with words
  --word <word>           Single French word to add
  --translation <text>    English translation
  --pos <pos>             Part of speech: ${VALID_PARTS_OF_SPEECH.join(", ")}
  --gender <gender>       Gender (for nouns): ${VALID_GENDERS.join(", ")}
  --infinitive <word>     Infinitive form (for conjugated verbs)
  --json <json>           JSON string with word array
  --interactive           Interactive mode with prompts
  --no-scrape             Skip Cambridge Dictionary auto-scraping
  --help                  Show this help message

INPUT FORMATS:

JSON File (--file) - Basic Format:
[
  {
    "word": "chat",
    "translation": "cat",
    "partOfSpeech": "noun",
    "gender": "masculine"
  },
  {
    "word": "vais",
    "translation": "go",
    "partOfSpeech": "verb",
    "infinitive": "aller"
  }
]

Enhanced Format with Part-of-Speech Specific Fields:

VERBS with phrases:
{
  "word": "est",
  "translation": "is",
  "partOfSpeech": "verb",
  "infinitive": "être",
  "verb_phrases": [
    {"phrase": "il est", "type": "pronoun_verb", "frequency": "common"},
    {"phrase": "n'est pas", "type": "negation", "frequency": "common"}
  ]
}

NOUNS with articles and plural:
{
  "word": "chat",
  "translation": "cat",
  "partOfSpeech": "noun",
  "gender": "masculine",
  "plural_form": "chats",
  "noun_articles": {"definite": "le", "indefinite": "un", "plural": "les"},
  "noun_phrases": [
    {"phrase": "le chat", "type": "definite_article", "frequency": "common"}
  ]
}

ADJECTIVES with forms:
{
  "word": "grand",
  "translation": "big/tall",
  "partOfSpeech": "adjective",
  "adjective_forms": {
    "masculine_singular": "grand",
    "feminine_singular": "grande",
    "masculine_plural": "grands",
    "feminine_plural": "grandes"
  },
  "adjective_phrases": [
    {"phrase": "très grand", "type": "intensifier", "frequency": "common"}
  ]
}

JSON String (--json):
'[{"word":"chat","translation":"cat","partOfSpeech":"noun"}]'

EXAMPLES:
  # Add from JSON file
  node generate-lesson-words.js --file lesson-5-words.json

  # Add single word
  node generate-lesson-words.js --word "chat" --translation "cat" --pos "noun" --gender "masculine"

  # Add conjugated verb
  node generate-lesson-words.js --word "vais" --translation "go" --pos "verb" --infinitive "aller"

  # Interactive mode
  node generate-lesson-words.js --interactive

  # Quick JSON input
  node generate-lesson-words.js --json '[{"word":"bonjour","translation":"hello"}]'
`);
}

/**
 * Validate command line options
 */
function validateOptions(options) {
  const errors = [];

  if (options.word) {
    if (!options.translation) {
      errors.push("Translation is required when using --word");
    }
    if (options.pos && !VALID_PARTS_OF_SPEECH.includes(options.pos)) {
      errors.push(
        `Invalid part of speech. Must be one of: ${VALID_PARTS_OF_SPEECH.join(
          ", "
        )}`
      );
    }
    if (options.gender && !VALID_GENDERS.includes(options.gender)) {
      errors.push(
        `Invalid gender. Must be one of: ${VALID_GENDERS.join(", ")}`
      );
    }
  }

  return errors;
}

/**
 * Create readline interface
 */
function createPrompt() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
}

/**
 * Ask a question
 */
function askQuestion(rl, question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

/**
 * Interactive mode
 */
async function interactiveMode() {
  console.log("🎯 Interactive Word Addition Mode");
  console.log("Add words to the dictionary for your lesson!\n");

  const rl = createPrompt();
  const words = [];

  try {
    while (true) {
      console.log(`\n--- Word ${words.length + 1} ---`);

      const word = await askQuestion(rl, "French word (or 'done' to finish): ");
      if (word.toLowerCase() === "done" || !word) {
        break;
      }

      const translation = await askQuestion(rl, "English translation: ");
      if (!translation) {
        console.log("❌ Translation is required");
        continue;
      }

      console.log(
        `\nPart of speech options: ${VALID_PARTS_OF_SPEECH.join(", ")}`
      );
      const pos = await askQuestion(rl, "Part of speech (optional): ");

      let gender = null;
      if (pos === "noun") {
        console.log(`\nGender options: ${VALID_GENDERS.join(", ")}`);
        gender = (await askQuestion(rl, "Gender (default: none): ")) || "none";
      }

      let infinitive = null;
      if (pos === "verb") {
        infinitive = await askQuestion(
          rl,
          "Infinitive form (if this is conjugated, optional): "
        );
      }

      const wordObj = {
        word,
        translation,
        ...(pos && { partOfSpeech: pos }),
        ...(gender && { gender }),
        ...(infinitive && { infinitive }),
      };

      words.push(wordObj);
      console.log(`✅ Added: ${word} -> ${translation}`);
    }

    rl.close();

    if (words.length === 0) {
      console.log("No words to add. Goodbye!");
      return;
    }

    console.log(`\n📝 Processing ${words.length} words...`);
    await processWords(words);
  } catch (error) {
    console.error("❌ Error in interactive mode:", error.message);
    rl.close();
  }
}

/**
 * Parse JSON file
 */
function parseJSONFile(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }

    const content = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(content);

    if (!Array.isArray(data)) {
      throw new Error("JSON file must contain an array of word objects");
    }

    return data;
  } catch (error) {
    throw new Error(`Error parsing JSON file: ${error.message}`);
  }
}

/**
 * Parse JSON string
 */
function parseJSONString(jsonStr) {
  try {
    const data = JSON.parse(jsonStr);

    if (!Array.isArray(data)) {
      throw new Error("JSON string must contain an array of word objects");
    }

    return data;
  } catch (error) {
    throw new Error(`Error parsing JSON string: ${error.message}`);
  }
}

/**
 * Process words and add to dictionary
 */
async function processWords(words, options = {}) {
  const generator = new DefinitionGenerator();

  try {
    console.log(`\n🚀 Generating definitions for ${words.length} words...`);

    // Generate definitions (now includes adding to files and Cambridge enhancement)
    const { results, addResults } = await generator.generateDefinitions(
      words,
      options
    );

    // Handle verb relationships
    const entriesWithRelationships = await generator.handleVerbRelationships(
      results
    );

    // Show results
    console.log(`\n📊 RESULTS`);
    console.log("=".repeat(30));
    console.log(`✅ Successfully added: ${addResults.added}`);
    console.log(`⚠️  Skipped (already exist): ${addResults.skipped}`);
    console.log(`❌ Errors: ${addResults.errors}`);

    if (addResults.details.length > 0) {
      console.log(`\n📋 DETAILS`);
      console.log("-".repeat(30));
      addResults.details.forEach((detail) => {
        const icon =
          detail.status === "added"
            ? "✅"
            : detail.status === "skipped"
            ? "⚠️"
            : "❌";
        const message = detail.file
          ? `-> ${detail.file}`
          : detail.message
          ? `(${detail.message})`
          : "";
        console.log(`${icon} ${detail.word} ${message}`);
      });
    }

    if (addResults.added > 0) {
      console.log(
        `\n🎉 Successfully added ${addResults.added} words to the dictionary!`
      );
      console.log(`📁 Files updated in: src/data/dictionary/words/cambridge/`);
    }
  } catch (error) {
    console.error("❌ Error processing words:", error.message);
    process.exit(1);
  }
}

/**
 * Main function
 */
async function main() {
  const options = parseArgs();

  if (options.help) {
    showHelp();
    return;
  }

  // Validate options
  const errors = validateOptions(options);
  if (errors.length > 0) {
    console.log("❌ Validation errors:");
    errors.forEach((error) => console.log(`  - ${error}`));
    console.log("\nUse --help for usage information");
    return;
  }

  try {
    let words = [];

    if (options.interactive) {
      await interactiveMode();
      return;
    }

    if (options.file) {
      words = parseJSONFile(options.file);
      console.log(`📁 Loaded ${words.length} words from ${options.file}`);
    } else if (options.json) {
      words = parseJSONString(options.json);
      console.log(`📝 Parsed ${words.length} words from JSON string`);
    } else if (options.word) {
      words = [
        {
          word: options.word,
          translation: options.translation,
          ...(options.pos && { partOfSpeech: options.pos }),
          ...(options.gender && { gender: options.gender }),
          ...(options.infinitive && { infinitive: options.infinitive }),
        },
      ];
      console.log(`📝 Processing single word: ${options.word}`);
    } else {
      console.log(
        "❌ No input provided. Use --file, --word, --json, or --interactive"
      );
      console.log("Use --help for usage information");
      return;
    }

    if (words.length === 0) {
      console.log("❌ No words to process");
      return;
    }

    await processWords(words, { autoScrape: options.autoScrape });
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

// Run the script
main().catch((error) => {
  console.error("❌ Unexpected error:", error.message);
  process.exit(1);
});
