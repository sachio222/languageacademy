#!/usr/bin/env node

/**
 * Vocabulary Extraction Script
 * Extracts and normalizes 2,610+ vocabulary entries from existing files
 * Generates dictionary files organized by part of speech
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, "..");

// Track extraction statistics
const stats = {
  totalEntries: 0,
  byPartOfSpeech: {},
  bySource: {},
  duplicates: 0,
  errors: [],
};

// Store all extracted words
const extractedWords = new Map();
const extractedPhrases = new Map();

/**
 * Generate unique ID for a word
 */
function generateWordId(word, language = "fr") {
  return `${word.toLowerCase().replace(/[^a-z0-9]/g, "-")}-${language}`;
}

/**
 * Categorize word by part of speech based on existing logic
 */
function categorizeWord(vocab) {
  const french = vocab.french?.toLowerCase().trim() || "";
  const note = vocab.note?.toLowerCase() || "";

  // Special cases first
  if (french === "on") return "pronoun";

  // Check note field
  if (note.includes("verb") || note.includes("conjugat")) return "verb";
  if (note.includes("adjective")) return "adjective";
  if (note.includes("adverb")) return "adverb";
  if (note.includes("preposition")) return "preposition";
  if (note.includes("pronoun")) return "pronoun";
  if (note.includes("article")) return "article";
  if (note.includes("number")) return "noun"; // numbers are treated as nouns
  if (note.includes("conjunction")) return "conjunction";

  // Common expressions
  const commonExpressions = [
    "ça va",
    "ça va?",
    "qu'est-ce que",
    "qu'est-ce que c'est",
    "il y a",
    "merci beaucoup",
    "de rien",
    "s'il vous plaît",
    "s'il te plaît",
    "excusez-moi",
    "pardon",
    "bonne nuit",
    "bonne journée",
    "à bientôt",
    "au revoir",
    "salut",
    "bonjour",
    "bonsoir",
  ];
  if (commonExpressions.includes(french)) return "expression";

  // Articles
  const articles = [
    "un",
    "une",
    "le",
    "la",
    "les",
    "l'",
    "du",
    "de la",
    "des",
    "au",
    "aux",
  ];
  if (articles.includes(french)) return "article";

  // Demonstratives (treated as pronouns)
  const demonstratives = ["ce", "cet", "cette", "ces", "ça", "ceci", "cela"];
  if (demonstratives.includes(french)) return "pronoun";

  // Pronouns
  const pronouns = [
    "je",
    "tu",
    "il",
    "elle",
    "nous",
    "vous",
    "ils",
    "elles",
    "me",
    "te",
    "se",
    "lui",
    "leur",
    "y",
    "en",
  ];
  if (pronouns.includes(french)) return "pronoun";

  // Possessives (treated as adjectives)
  const possessives = [
    "mon",
    "ma",
    "mes",
    "ton",
    "ta",
    "tes",
    "son",
    "sa",
    "ses",
    "notre",
    "nos",
    "votre",
    "vos",
    "leur",
    "leurs",
  ];
  if (possessives.includes(french)) return "adjective";

  // Question words
  const questionWords = [
    "que",
    "qui",
    "où",
    "quand",
    "comment",
    "pourquoi",
    "combien",
    "quel",
    "quelle",
    "quels",
    "quelles",
  ];
  if (questionWords.includes(french)) return "pronoun";

  // Prepositions
  const prepositions = [
    "à",
    "de",
    "dans",
    "sur",
    "sous",
    "avec",
    "sans",
    "pour",
    "par",
    "vers",
    "chez",
    "entre",
    "pendant",
  ];
  if (prepositions.includes(french)) return "preposition";

  // Conjunctions
  const conjunctions = [
    "et",
    "ou",
    "mais",
    "donc",
    "car",
    "ni",
    "or",
    "que",
    "si",
    "comme",
    "quand",
    "lorsque",
  ];
  if (conjunctions.includes(french)) return "conjunction";

  // Check for verb patterns (conjugated forms)
  if (french.match(/^(je|tu|il|elle|on|nous|vous|ils|elles)\s+/)) return "verb";

  // Default to noun for most other cases
  return "noun";
}

/**
 * Normalize vocabulary entry to dictionary format
 */
function normalizeVocabularyEntry(vocab, source) {
  const french = vocab.french?.trim();
  if (!french) return null;

  const id = generateWordId(french);
  const partOfSpeech = categorizeWord(vocab);

  // Check for multi-word phrases
  const isPhrase =
    french.includes(" ") || french.includes("-") || french.includes("'");

  const entry = {
    id,
    language: "fr",
    word: french,
    partOfSpeech,

    // Basic translations
    translations: [
      {
        language: "en",
        text: vocab.english || vocab.englishFull || "",
        definition: vocab.note || "",
        context: "general",
        confidence: 0.95,
      },
    ],

    // Language-specific metadata
    gender: vocab.gender || "none",

    // Variants
    variants: [],

    // Learning metadata
    frequency: {
      rank: 1000, // Default, will be updated later
      score: 0.5,
      corpus: "lesson",
      perMillion: 100,
      percentile: 50,
    },
    difficulty: vocab.difficulty || 2,
    cefr_level: vocab.cefr_level || "A1",

    // Examples
    examples: vocab.example
      ? [
          {
            text: vocab.example,
            translation: "",
            context: "general",
          },
        ]
      : [],

    // Relationships (will be populated later)
    relationships: [],

    // Categorization
    tags: ["lesson"],
    semantic_field: "general",

    // Metadata
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    source,
    verified: true,
  };

  // Handle gender-specific variants
  if (vocab.femForm) {
    entry.variants.push({
      type: "feminine",
      text: vocab.femForm,
      note: "feminine form",
    });
  }

  // Handle conjugation groups for verbs
  if (partOfSpeech === "verb") {
    if (french.endsWith("er")) entry.conjugationGroup = "er";
    else if (french.endsWith("ir")) entry.conjugationGroup = "ir";
    else if (french.endsWith("re")) entry.conjugationGroup = "re";
    else entry.conjugationGroup = "irregular";
  }

  return { entry, isPhrase };
}

/**
 * Extract vocabulary from a JavaScript file
 */
async function extractFromFile(filePath) {
  try {
    console.log(`Processing: ${filePath}`);

    // Read file content
    const content = fs.readFileSync(filePath, "utf8");

    // Extract vocabularyReference arrays using regex
    const vocabularyMatches = content.match(
      /vocabularyReference:\s*\[([\s\S]*?)\]/g
    );

    if (vocabularyMatches) {
      for (const match of vocabularyMatches) {
        // Extract individual vocabulary objects
        const objectMatches = match.match(/\{[\s\S]*?\}/g);

        if (objectMatches) {
          for (const objMatch of objectMatches) {
            try {
              // Parse the object (simplified - assumes clean format)
              const vocab = parseVocabularyObject(objMatch);
              if (vocab && vocab.french) {
                const normalized = normalizeVocabularyEntry(vocab, filePath);
                if (normalized) {
                  const { entry, isPhrase } = normalized;

                  if (isPhrase) {
                    extractedPhrases.set(entry.id, entry);
                  } else {
                    if (extractedWords.has(entry.id)) {
                      stats.duplicates++;
                    } else {
                      extractedWords.set(entry.id, entry);
                      stats.totalEntries++;
                      stats.byPartOfSpeech[entry.partOfSpeech] =
                        (stats.byPartOfSpeech[entry.partOfSpeech] || 0) + 1;
                    }
                  }
                }
              }
            } catch (error) {
              stats.errors.push(
                `Error parsing object in ${filePath}: ${error.message}`
              );
            }
          }
        }
      }
    }

    stats.bySource[filePath] = (stats.bySource[filePath] || 0) + 1;
  } catch (error) {
    stats.errors.push(`Error reading ${filePath}: ${error.message}`);
  }
}

/**
 * Simple vocabulary object parser (handles basic cases)
 */
function parseVocabularyObject(objString) {
  try {
    // Clean up the object string
    let cleaned = objString
      .replace(/french:\s*"([^"]+)"/g, '"french": "$1"')
      .replace(/english:\s*"([^"]+)"/g, '"english": "$1"')
      .replace(/note:\s*"([^"]+)"/g, '"note": "$1"')
      .replace(/gender:\s*"([^"]+)"/g, '"gender": "$1"')
      .replace(/example:\s*"([^"]+)"/g, '"example": "$1"')
      .replace(/femForm:\s*"([^"]+)"/g, '"femForm": "$1"')
      .replace(/([a-zA-Z_][a-zA-Z0-9_]*):/g, '"$1":');

    return JSON.parse(cleaned);
  } catch (error) {
    // Fallback: extract key-value pairs manually
    const vocab = {};

    const frenchMatch = objString.match(/french:\s*"([^"]+)"/);
    if (frenchMatch) vocab.french = frenchMatch[1];

    const englishMatch = objString.match(/english:\s*"([^"]+)"/);
    if (englishMatch) vocab.english = englishMatch[1];

    const noteMatch = objString.match(/note:\s*"([^"]+)"/);
    if (noteMatch) vocab.note = noteMatch[1];

    const genderMatch = objString.match(/gender:\s*"([^"]+)"/);
    if (genderMatch) vocab.gender = genderMatch[1];

    return vocab.french ? vocab : null;
  }
}

/**
 * Find all lesson files to process
 */
function findLessonFiles() {
  const files = [];

  // Vocabulary directory files
  const vocabDir = path.join(projectRoot, "src/lessons/vocabulary");
  if (fs.existsSync(vocabDir)) {
    const vocabFiles = fs
      .readdirSync(vocabDir)
      .filter((file) => file.endsWith(".js") && file !== "index.js")
      .map((file) => path.join(vocabDir, file));
    files.push(...vocabFiles);
  }

  // Module files
  const modulesDir = path.join(projectRoot, "src/lessons/modules");
  if (fs.existsSync(modulesDir)) {
    const units = fs.readdirSync(modulesDir);
    for (const unit of units) {
      const unitDir = path.join(modulesDir, unit);
      if (fs.statSync(unitDir).isDirectory()) {
        const unitFiles = fs
          .readdirSync(unitDir)
          .filter((file) => file.endsWith(".js"))
          .map((file) => path.join(unitDir, file));
        files.push(...unitFiles);
      }
    }
  }

  return files;
}

/**
 * Generate dictionary files organized by part of speech
 */
function generateDictionaryFiles() {
  const dictionaryDir = path.join(projectRoot, "src/data/dictionary/words");

  // Ensure directory exists
  if (!fs.existsSync(dictionaryDir)) {
    fs.mkdirSync(dictionaryDir, { recursive: true });
  }

  // Group words by part of speech
  const wordsByPOS = {};
  for (const [id, word] of extractedWords) {
    const pos = word.partOfSpeech;
    if (!wordsByPOS[pos]) wordsByPOS[pos] = [];
    wordsByPOS[pos].push([id, word]);
  }

  // Generate files for each part of speech
  for (const [pos, words] of Object.entries(wordsByPOS)) {
    const filename = `${pos}s.js`; // nouns.js, verbs.js, etc.
    const filePath = path.join(dictionaryDir, filename);

    const content = generatePartOfSpeechFile(pos, words);
    fs.writeFileSync(filePath, content, "utf8");

    console.log(`Generated ${filename} with ${words.length} entries`);
  }

  // Generate phrases file
  if (extractedPhrases.size > 0) {
    const phrasesPath = path.join(
      projectRoot,
      "src/data/dictionary/phrases.js"
    );
    const phrasesContent = generatePhrasesFile(
      Array.from(extractedPhrases.entries())
    );
    fs.writeFileSync(phrasesPath, phrasesContent, "utf8");
    console.log(`Generated phrases.js with ${extractedPhrases.size} entries`);
  }
}

/**
 * Generate content for a part-of-speech file
 */
function generatePartOfSpeechFile(partOfSpeech, words) {
  const mapEntries = words
    .map(
      ([id, word]) =>
        `  ["${id}", ${JSON.stringify(word, null, 4).replace(/\n/g, "\n  ")}]`
    )
    .join(",\n");

  const frequencyArray = words
    .sort((a, b) => a[1].frequency.rank - b[1].frequency.rank)
    .map(([id]) => `"${id}"`)
    .join(", ");

  let specialIndices = "";

  // Add gender index for nouns and adjectives
  if (partOfSpeech === "noun" || partOfSpeech === "adjective") {
    const masculine = words
      .filter(([, word]) => word.gender === "masculine")
      .map(([id]) => `"${id}"`);
    const feminine = words
      .filter(([, word]) => word.gender === "feminine")
      .map(([id]) => `"${id}"`);

    specialIndices = `
// Gender-based indices
export const ${partOfSpeech}sByGender = {
  masculine: new Set([${masculine.join(", ")}]),
  feminine: new Set([${feminine.join(", ")}])
};`;
  }

  // Add conjugation index for verbs
  if (partOfSpeech === "verb") {
    const byConjugation = {};
    words.forEach(([id, word]) => {
      const group = word.conjugationGroup || "irregular";
      if (!byConjugation[group]) byConjugation[group] = [];
      byConjugation[group].push(`"${id}"`);
    });

    const conjugationEntries = Object.entries(byConjugation)
      .map(([group, ids]) => `  ${group}: new Set([${ids.join(", ")}])`)
      .join(",\n");

    specialIndices = `
// Conjugation-based indices
export const ${partOfSpeech}sByConjugation = {
${conjugationEntries}
};`;
  }

  return `/**
 * ${partOfSpeech.charAt(0).toUpperCase() + partOfSpeech.slice(1)}s Dictionary
 * Auto-generated from vocabulary extraction
 * Total entries: ${words.length}
 */

export const ${partOfSpeech}s = new Map([
${mapEntries}
]);

// Frequency-ordered array for priority loading
export const ${partOfSpeech}sByFrequency = [${frequencyArray}];
${specialIndices}

export default ${partOfSpeech}s;
`;
}

/**
 * Generate phrases file
 */
function generatePhrasesFile(phrases) {
  const mapEntries = phrases
    .map(
      ([id, phrase]) =>
        `  ["${id}", ${JSON.stringify(phrase, null, 4).replace(/\n/g, "\n  ")}]`
    )
    .join(",\n");

  return `/**
 * Phrases Dictionary
 * Auto-generated from vocabulary extraction
 * Total entries: ${phrases.length}
 */

export const phrases = new Map([
${mapEntries}
]);

// Phrases by type
export const phrasesByType = new Map();

// Phrase components (for decomposition)
export const phraseComponents = new Map();

// Initialize type and component indices
for (const [id, phrase] of phrases) {
  // Group by type
  const type = phrase.type || 'general';
  if (!phrasesByType.has(type)) {
    phrasesByType.set(type, []);
  }
  phrasesByType.get(type).push(id);
  
  // Index components
  if (phrase.components) {
    phraseComponents.set(id, phrase.components);
  }
}

export default phrases;
`;
}

/**
 * Main extraction function
 */
async function main() {
  console.log("🚀 Starting vocabulary extraction...");
  console.log("📊 Target: 2,610+ vocabulary entries");

  const files = findLessonFiles();
  console.log(`📁 Found ${files.length} files to process`);

  // Process all files
  for (const file of files) {
    await extractFromFile(file);
  }

  // Generate dictionary files
  generateDictionaryFiles();

  // Print statistics
  console.log("\n📈 Extraction Statistics:");
  console.log(`Total entries extracted: ${stats.totalEntries}`);
  console.log(`Phrases extracted: ${extractedPhrases.size}`);
  console.log(`Duplicates found: ${stats.duplicates}`);
  console.log(`Errors: ${stats.errors.length}`);

  console.log("\n📊 By Part of Speech:");
  for (const [pos, count] of Object.entries(stats.byPartOfSpeech)) {
    console.log(`  ${pos}: ${count}`);
  }

  if (stats.errors.length > 0) {
    console.log("\n❌ Errors:");
    stats.errors.slice(0, 10).forEach((error) => console.log(`  ${error}`));
    if (stats.errors.length > 10) {
      console.log(`  ... and ${stats.errors.length - 10} more`);
    }
  }

  console.log("\n✅ Dictionary generation complete!");
}

// Run the extraction
main().catch(console.error);

