#!/usr/bin/env node

/**
 * Add Word to Dictionary Utility
 * Official tool for adding new words to the language academy dictionary
 *
 * Usage: node add-word-to-dictionary.js [options]
 *
 * Options:
 *   --word <word>           The French word to add
 *   --partOfSpeech <pos>    Part of speech (noun, verb, adjective, etc.)
 *   --translation <text>     English translation
 *   --definition <text>     Definition/context
 *   --cefr <level>          CEFR level (A1, A2, B1, B2, C1, C2)
 *   --difficulty <number>   Difficulty level (1-5)
 *   --gender <gender>       Gender for nouns (masculine, feminine, none)
 *   --source <path>         Source file path
 *   --interactive           Interactive mode for guided input
 *   --help                  Show this help message
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import readline from "readline";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
  "interrogative",
  "alphabet",
  "expression",
];

// Valid CEFR levels
const VALID_CEFR_LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"];

// Valid genders
const VALID_GENDERS = ["masculine", "feminine", "none"];

// Function to parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    word: null,
    partOfSpeech: null,
    translation: null,
    definition: null,
    cefr: "A1",
    difficulty: 2,
    gender: "none",
    source: "manual-entry",
    interactive: false,
    help: false,
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    const nextArg = args[i + 1];

    switch (arg) {
      case "--word":
        options.word = nextArg;
        i++;
        break;
      case "--partOfSpeech":
        options.partOfSpeech = nextArg;
        i++;
        break;
      case "--translation":
        options.translation = nextArg;
        i++;
        break;
      case "--definition":
        options.definition = nextArg;
        i++;
        break;
      case "--cefr":
        options.cefr = nextArg;
        i++;
        break;
      case "--difficulty":
        options.difficulty = parseInt(nextArg);
        i++;
        break;
      case "--gender":
        options.gender = nextArg;
        i++;
        break;
      case "--source":
        options.source = nextArg;
        i++;
        break;
      case "--interactive":
        options.interactive = true;
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
📚 Add Word to Dictionary Utility

USAGE:
  node add-word-to-dictionary.js [options]

OPTIONS:
  --word <word>           The French word to add
  --partOfSpeech <pos>    Part of speech: ${VALID_PARTS_OF_SPEECH.join(", ")}
  --translation <text>     English translation
  --definition <text>     Definition/context
  --cefr <level>          CEFR level: ${VALID_CEFR_LEVELS.join(
    ", "
  )} (default: A1)
  --difficulty <number>   Difficulty level 1-5 (default: 2)
  --gender <gender>       Gender: ${VALID_GENDERS.join(", ")} (default: none)
  --source <path>         Source file path (default: manual-entry)
  --interactive           Interactive mode for guided input
  --help                  Show this help message

EXAMPLES:
  # Add a noun
  node add-word-to-dictionary.js --word "chat" --partOfSpeech "noun" --translation "cat" --gender "masculine"
  
  # Add a verb with full details
  node add-word-to-dictionary.js --word "manger" --partOfSpeech "verb" --translation "to eat" --definition "consume food" --cefr "A1"
  
  # Interactive mode
  node add-word-to-dictionary.js --interactive
`);
}

// Function to validate options
function validateOptions(options) {
  const errors = [];

  if (!options.word) {
    errors.push("Word is required (--word)");
  }

  if (!options.partOfSpeech) {
    errors.push("Part of speech is required (--partOfSpeech)");
  } else if (!VALID_PARTS_OF_SPEECH.includes(options.partOfSpeech)) {
    errors.push(
      `Invalid part of speech. Must be one of: ${VALID_PARTS_OF_SPEECH.join(
        ", "
      )}`
    );
  }

  if (!options.translation) {
    errors.push("Translation is required (--translation)");
  }

  if (!VALID_CEFR_LEVELS.includes(options.cefr)) {
    errors.push(
      `Invalid CEFR level. Must be one of: ${VALID_CEFR_LEVELS.join(", ")}`
    );
  }

  if (options.difficulty < 1 || options.difficulty > 5) {
    errors.push("Difficulty must be between 1 and 5");
  }

  if (!VALID_GENDERS.includes(options.gender)) {
    errors.push(`Invalid gender. Must be one of: ${VALID_GENDERS.join(", ")}`);
  }

  return errors;
}

// Function to create interactive prompt
function createPrompt() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
}

// Function to ask question
function askQuestion(rl, question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

// Interactive mode
async function interactiveMode() {
  console.log("🎯 Interactive Word Addition Mode");
  console.log("Let's add a new word to the dictionary!\n");

  const rl = createPrompt();

  try {
    const word = await askQuestion(rl, "French word: ");
    if (!word) {
      console.log("❌ Word is required");
      return;
    }

    console.log(
      `\nPart of speech options: ${VALID_PARTS_OF_SPEECH.join(", ")}`
    );
    const partOfSpeech = await askQuestion(rl, "Part of speech: ");
    if (!VALID_PARTS_OF_SPEECH.includes(partOfSpeech)) {
      console.log("❌ Invalid part of speech");
      return;
    }

    const translation = await askQuestion(rl, "English translation: ");
    if (!translation) {
      console.log("❌ Translation is required");
      return;
    }

    const definition = await askQuestion(rl, "Definition/context (optional): ");

    console.log(`\nCEFR levels: ${VALID_CEFR_LEVELS.join(", ")}`);
    const cefr = (await askQuestion(rl, `CEFR level (default: A1): `)) || "A1";

    const difficulty = await askQuestion(rl, "Difficulty 1-5 (default: 2): ");
    const difficultyNum = difficulty ? parseInt(difficulty) : 2;

    let gender = "none";
    if (partOfSpeech === "noun") {
      console.log(`\nGender options: ${VALID_GENDERS.join(", ")}`);
      gender = (await askQuestion(rl, "Gender: ")) || "none";
    }

    const source =
      (await askQuestion(rl, "Source file path (default: manual-entry): ")) ||
      "manual-entry";

    rl.close();

    const options = {
      word,
      partOfSpeech,
      translation,
      definition: definition || null,
      cefr,
      difficulty: difficultyNum,
      gender,
      source,
    };

    await addWordToDictionary(options);
  } catch (error) {
    console.error("❌ Error in interactive mode:", error.message);
    rl.close();
  }
}

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

// Function to create dictionary entry
function createDictionaryEntry(options) {
  const id = `${options.word}-fr`;
  const timestamp = new Date().toISOString();

  return [
    id,
    {
      id,
      language: "fr",
      word: options.word,
      partOfSpeech: options.partOfSpeech,
      translations: [
        {
          language: "en",
          text: options.translation,
          definition: options.definition || "",
          context: "general",
          confidence: 0.95,
        },
      ],
      gender: options.gender,
      variants: [],
      frequency: {
        rank: 1000,
        score: 0.5,
        corpus: "lesson",
        perMillion: 100,
        percentile: 50,
      },
      difficulty: options.difficulty,
      cefr_level: options.cefr,
      examples: [],
      relationships: [],
      tags: ["lesson"],
      semantic_field: "general",
      created_at: timestamp,
      updated_at: timestamp,
      source: options.source,
      verified: false,
    },
  ];
}

// Function to add entry to dictionary file
function addEntryToFile(entry, targetFile) {
  const targetPath = path.join(__dirname, "..", "words", targetFile);

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

    // Check if word already exists
    const existingEntry = entries.find((e) => e[1].word === entry[1].word);
    if (existingEntry) {
      console.log(
        `⚠️  Word "${entry[1].word}" already exists in ${targetFile}`
      );
      return false;
    }

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

// Function to update frequency array
function updateFrequencyArray(targetFile, newEntry) {
  const targetPath = path.join(__dirname, "..", "words", targetFile);

  try {
    const content = fs.readFileSync(targetPath, "utf8");
    const varName = targetFile.replace(".js", "");

    // Find the frequency array pattern
    const frequencyRegex = new RegExp(
      `export const ${varName}ByFrequency = \\[[\\s\\S]*?\\];`
    );

    // Get current frequency array
    const frequencyMatch = content.match(frequencyRegex);
    if (!frequencyMatch) {
      console.log(`⚠️  No frequency array found in ${targetFile}`);
      return false;
    }

    // Parse current frequency array
    const currentFrequencyString = `[${frequencyMatch[1]}]`;
    const currentFrequencyArray = eval(currentFrequencyString);

    // Add new entry to frequency array (at the end for new entries)
    const updatedFrequencyArray = [...currentFrequencyArray, newEntry[0]];

    // Generate new frequency array string
    const newFrequencyString = `export const ${varName}ByFrequency = [${updatedFrequencyArray
      .map((id) => `"${id}"`)
      .join(", ")}];`;

    // Replace the frequency array
    const updatedContent = content.replace(frequencyRegex, newFrequencyString);

    // Write back to file
    fs.writeFileSync(targetPath, updatedContent);
    return true;
  } catch (error) {
    console.error(
      `Error updating frequency array in ${targetFile}:`,
      error.message
    );
    return false;
  }
}

// Main function to add word to dictionary
async function addWordToDictionary(options) {
  console.log(`\n=== ADDING WORD TO DICTIONARY ===`);
  console.log(`Word: ${options.word}`);
  console.log(`Part of speech: ${options.partOfSpeech}`);
  console.log(`Translation: ${options.translation}`);
  console.log(`CEFR level: ${options.cefr}`);
  console.log(`Difficulty: ${options.difficulty}`);
  console.log(`Gender: ${options.gender}`);
  console.log(`Source: ${options.source}\n`);

  // Create dictionary entry
  const entry = createDictionaryEntry(options);

  // Determine target file
  const targetFile = `${options.partOfSpeech}s.js`;

  // Add to dictionary file
  if (addEntryToFile(entry, targetFile)) {
    console.log(`✅ Added "${options.word}" to ${targetFile}`);

    // Update frequency array
    if (updateFrequencyArray(targetFile, entry)) {
      console.log(`✅ Updated frequency array in ${targetFile}`);
    } else {
      console.log(`⚠️  Failed to update frequency array in ${targetFile}`);
    }

    console.log(`\n🎉 Successfully added "${options.word}" to the dictionary!`);
    console.log(`📁 File: src/data/dictionary/words/${targetFile}`);
    console.log(`🆔 ID: ${entry[0]}`);
  } else {
    console.log(`❌ Failed to add "${options.word}" to dictionary`);
  }
}

// Main execution
async function main() {
  const options = parseArgs();

  if (options.help) {
    showHelp();
    return;
  }

  if (options.interactive) {
    await interactiveMode();
    return;
  }

  const errors = validateOptions(options);
  if (errors.length > 0) {
    console.log("❌ Validation errors:");
    errors.forEach((error) => console.log(`  - ${error}`));
    console.log("\nUse --help for usage information");
    return;
  }

  await addWordToDictionary(options);
}

// Run the script
main().catch((error) => {
  console.error("❌ Error:", error.message);
  process.exit(1);
});
