#!/usr/bin/env node

/**
 * Regenerate Dictionary Files from Module Vocabulary
 * Extracts vocabulary from all module files and creates clean dictionary files
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

// Dictionary schema template
const createWordEntry = (
  word,
  translation,
  partOfSpeech,
  moduleData,
  additionalData = {}
) => {
  const id = `${word.toLowerCase()}-fr`;

  return {
    id,
    language: "fr",
    word,
    partOfSpeech,
    translations: [
      {
        language: "en",
        text: translation,
        definition: additionalData.note || "",
        context: "general",
        confidence: 0.95,
      },
    ],
    gender:
      additionalData.gender || (partOfSpeech === "noun" ? "unknown" : "none"),
    variants: [],
    relationships: [],
    frequency: {
      rank: 1000,
      score: 0.5,
      corpus: "module",
      perMillion: 100,
      percentile: 50,
    },
    difficulty: 2,
    cefr_level: "A2",
    examples: [],
    tags: ["module", `unit-${moduleData.unitNumber}`, moduleData.moduleKey],
    semantic_field: "general",
    moduleKey: moduleData.moduleKey,
    unitNumber: moduleData.unitNumber,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    source: "module_vocabulary_extraction",
    verified: true,
    ...(additionalData.pronoun && { pronoun: additionalData.pronoun }),
  };
};

// Part of speech classification
const classifyPartOfSpeech = (frenchWord, englishTranslation, note = "") => {
  const word = frenchWord.toLowerCase().trim();
  const english = englishTranslation.toLowerCase();
  const noteText = note.toLowerCase();

  // Remove articles to get base word for classification
  const baseWord = word.replace(/^(un|une|le|la|les|l')\s+/, "");

  // Articles (exact matches only)
  if (["le", "la", "les", "un", "une", "des", "l'"].includes(word)) {
    return "article";
  }

  // Pronouns (exact matches only)
  if (
    [
      "je",
      "tu",
      "il",
      "elle",
      "nous",
      "vous",
      "ils",
      "elles",
      "on",
      "me",
      "te",
      "se",
      "leur",
      "lui",
      "y",
      "en",
    ].includes(baseWord)
  ) {
    return "pronoun";
  }

  // Conjunctions (exact matches only)
  if (["et", "mais", "ou", "donc", "car", "ni", "or"].includes(baseWord)) {
    return "conjunction";
  }

  // Prepositions (exact matches only)
  if (
    [
      "à",
      "de",
      "dans",
      "sur",
      "avec",
      "pour",
      "par",
      "sans",
      "sous",
      "vers",
      "chez",
      "entre",
      "contre",
      "depuis",
    ].includes(baseWord)
  ) {
    return "preposition";
  }

  // Adverbs (exact matches only)
  if (
    [
      "très",
      "aussi",
      "bien",
      "mal",
      "plus",
      "moins",
      "beaucoup",
      "peu",
      "trop",
      "assez",
      "toujours",
      "jamais",
      "souvent",
      "parfois",
    ].includes(baseWord)
  ) {
    return "adverb";
  }

  // Check for verb patterns - conjugated verbs or infinitives
  if (
    noteText.includes("conjugat") ||
    noteText.includes("infinitive") ||
    english.includes(" am") ||
    english.includes(" are") ||
    english.includes(" is") ||
    english.includes(" have") ||
    english.includes(" has") ||
    english.includes(" go") ||
    english.includes(" can") ||
    english.includes(" want") ||
    english.includes(" come") ||
    english.includes(" see") ||
    english.includes(" do") ||
    english.includes(" make") ||
    // Check for conjugated forms with pronouns
    (word.includes(" ") &&
      ["je", "tu", "il", "elle", "nous", "vous", "ils", "elles"].some((p) =>
        word.startsWith(p + " ")
      ))
  ) {
    return "verb";
  }

  // Check for adjective patterns (gender agreement indicators)
  if (
    frenchWord.includes(" / ") ||
    (noteText.includes("masculine") && noteText.includes("feminine")) ||
    noteText.includes("agreement") ||
    english.includes("good") ||
    english.includes("big") ||
    english.includes("small") ||
    english.includes("new") ||
    english.includes("old") ||
    english.includes("young") ||
    english.includes("beautiful") ||
    english.includes("other")
  ) {
    return "adjective";
  }

  // Default to noun if it has gender indicators or articles
  if (
    noteText.includes("masculine") ||
    noteText.includes("feminine") ||
    frenchWord.startsWith("un ") ||
    frenchWord.startsWith("une ") ||
    frenchWord.startsWith("le ") ||
    frenchWord.startsWith("la ") ||
    english.includes("book") ||
    english.includes("house") ||
    english.includes("cat") ||
    english.includes("dog") ||
    english.includes("man") ||
    english.includes("woman") ||
    english.includes("child") ||
    english.includes("friend") ||
    english.includes("thing")
  ) {
    return "noun";
  }

  // Default fallback based on context
  if (english.includes(" a ") || english.includes(" the ")) {
    return "noun";
  }

  return "noun";
};

// Extract gender from note or french word
const extractGender = (frenchWord, note = "") => {
  const noteText = note.toLowerCase();

  if (noteText.includes("masculine")) return "masculine";
  if (noteText.includes("feminine")) return "feminine";

  // Check article in french word
  if (frenchWord.startsWith("un ") || frenchWord.startsWith("le "))
    return "masculine";
  if (frenchWord.startsWith("une ") || frenchWord.startsWith("la "))
    return "feminine";

  return "unknown";
};

// Extract pronoun from conjugated verb
const extractPronoun = (frenchWord) => {
  const pronouns = [
    "je",
    "tu",
    "il",
    "elle",
    "nous",
    "vous",
    "ils",
    "elles",
    "on",
  ];
  const words = frenchWord.split(" ");

  for (const pronoun of pronouns) {
    if (words.includes(pronoun)) {
      return pronoun;
    }
  }
  return null;
};

// Clean word (remove articles, extract base word)
const cleanWord = (frenchWord, partOfSpeech) => {
  let word = frenchWord.trim();

  // For nouns, remove articles
  if (partOfSpeech === "noun") {
    word = word.replace(/^(un|une|le|la|les|l')\s+/, "");
  }

  // For verbs, extract just the verb part (remove pronouns)
  if (partOfSpeech === "verb") {
    const pronouns = [
      "je",
      "tu",
      "il",
      "elle",
      "nous",
      "vous",
      "ils",
      "elles",
      "on",
    ];
    const words = word.split(" ");

    // Remove pronouns, keep the verb
    const verbParts = words.filter((w) => !pronouns.includes(w));
    if (verbParts.length > 0) {
      word = verbParts.join(" ");
    }
  }

  return word;
};

// Check if word should be skipped (phrases, multi-word expressions)
const shouldSkipWord = (frenchWord) => {
  const word = frenchWord.trim();

  // Skip phrases with multiple words (but allow gender variants like "bon / bonne")
  if (
    word.includes(" ") &&
    !word.includes(" / ") &&
    !word.startsWith("un ") &&
    !word.startsWith("une ") &&
    !word.startsWith("le ") &&
    !word.startsWith("la ") &&
    !word.startsWith("les ") &&
    !word.startsWith("l'")
  ) {
    // Allow verb conjugations (pronoun + verb)
    const words = word.split(" ");
    const pronouns = [
      "je",
      "tu",
      "il",
      "elle",
      "nous",
      "vous",
      "ils",
      "elles",
      "on",
    ];
    if (words.length === 2 && pronouns.includes(words[0])) {
      return false; // Don't skip verb conjugations
    }

    return true; // Skip other multi-word phrases
  }

  return false;
};

// Process gender variants (bon / bonne -> [bon, bonne])
const processGenderVariants = (
  frenchWord,
  englishTranslation,
  note,
  moduleData
) => {
  if (!frenchWord.includes(" / ")) {
    return null; // Not a gender variant
  }

  const variants = frenchWord.split(" / ").map((v) => v.trim());
  const words = [];

  variants.forEach((variant, index) => {
    const gender = index === 0 ? "masculine" : "feminine";
    const word = createWordEntry(
      variant,
      englishTranslation,
      "adjective",
      moduleData,
      {
        gender,
        note,
      }
    );
    words.push(word);
  });

  return words;
};

// Scan module files and extract vocabulary
async function extractVocabularyFromModules() {
  const modulesDir = path.join(projectRoot, "src", "lessons", "modules");
  const vocabulary = {
    nouns: new Map(),
    verbs: new Map(),
    pronouns: new Map(),
    articles: new Map(),
    adjectives: new Map(),
    prepositions: new Map(),
    conjunctions: new Map(),
    adverbs: new Map(),
  };

  console.log("Scanning modules directory:", modulesDir);

  // Get all unit directories
  const unitDirs = fs
    .readdirSync(modulesDir)
    .filter(
      (dir) =>
        dir.startsWith("unit") &&
        fs.statSync(path.join(modulesDir, dir)).isDirectory()
    )
    .sort();

  console.log("Found units:", unitDirs);

  for (const unitDir of unitDirs) {
    const unitNumber = parseInt(unitDir.replace("unit", ""));
    const unitPath = path.join(modulesDir, unitDir);

    console.log(`\nProcessing ${unitDir} (Unit ${unitNumber})...`);

    // Get all JS files in the unit directory (except unit-config.js and index.js)
    const moduleFiles = fs
      .readdirSync(unitPath)
      .filter(
        (file) =>
          file.endsWith(".js") &&
          file !== "unit-config.js" &&
          file !== "index.js"
      );

    for (const moduleFile of moduleFiles) {
      const modulePath = path.join(unitPath, moduleFile);

      try {
        // Read and parse the module file
        const moduleContent = fs.readFileSync(modulePath, "utf8");

        // Extract moduleKey using regex
        const moduleKeyMatch = moduleContent.match(
          /moduleKey:\s*["']([^"']+)["']/
        );
        const moduleKey = moduleKeyMatch
          ? moduleKeyMatch[1]
          : `unknown-${moduleFile}`;

        // Extract vocabularyReference using regex
        const vocabMatch = moduleContent.match(
          /vocabularyReference:\s*\[([\s\S]*?)\]/
        );
        if (!vocabMatch) {
          console.log(`  No vocabularyReference found in ${moduleFile}`);
          continue;
        }

        const moduleData = {
          unitNumber,
          moduleKey,
          moduleFile,
        };

        console.log(`  Processing ${moduleFile} (${moduleKey})...`);

        // Parse vocabulary entries using regex
        const vocabContent = vocabMatch[1];
        const entryMatches = vocabContent.match(/\{[^}]+\}/g);

        if (!entryMatches) {
          console.log(`    No vocabulary entries found`);
          continue;
        }

        let processedCount = 0;
        let skippedCount = 0;

        for (const entryMatch of entryMatches) {
          try {
            // Extract french, english, and note using regex
            const frenchMatch = entryMatch.match(/french:\s*["']([^"']+)["']/);
            const englishMatch = entryMatch.match(
              /english:\s*["']([^"']+)["']/
            );
            const noteMatch = entryMatch.match(/note:\s*["']([^"']*)["']/);

            if (!frenchMatch || !englishMatch) continue;

            const french = frenchMatch[1];
            const english = englishMatch[1];
            const note = noteMatch ? noteMatch[1] : "";

            // Skip phrases and multi-word expressions
            if (shouldSkipWord(french)) {
              skippedCount++;
              continue;
            }

            // Handle gender variants first
            const genderVariants = processGenderVariants(
              french,
              english,
              note,
              moduleData
            );
            if (genderVariants) {
              genderVariants.forEach((word) => {
                const key = word.id;
                if (!vocabulary.adjectives.has(key)) {
                  vocabulary.adjectives.set(key, word);
                  processedCount++;
                }
              });
              continue;
            }

            // Classify part of speech
            const partOfSpeech = classifyPartOfSpeech(french, english, note);

            // Clean the word
            const cleanedWord = cleanWord(french, partOfSpeech);

            // Extract additional data
            const gender = extractGender(french, note);
            const pronoun = extractPronoun(french);

            // Create word entry
            const wordEntry = createWordEntry(
              cleanedWord,
              english,
              partOfSpeech,
              moduleData,
              {
                gender,
                note,
                pronoun,
              }
            );

            // Add to appropriate collection (avoid duplicates)
            const key = wordEntry.id;
            if (!vocabulary[partOfSpeech + "s"].has(key)) {
              vocabulary[partOfSpeech + "s"].set(key, wordEntry);
              processedCount++;
            }
          } catch (error) {
            console.error(
              `    Error processing entry: ${entryMatch}`,
              error.message
            );
          }
        }

        console.log(
          `    Processed: ${processedCount}, Skipped: ${skippedCount}`
        );
      } catch (error) {
        console.error(`  Error processing ${moduleFile}:`, error.message);
      }
    }
  }

  return vocabulary;
}

// Generate dictionary file
function generateDictionaryFile(words, partOfSpeech) {
  const entries = Array.from(words.values());
  const totalEntries = entries.length;

  let content = `/**\n * ${
    partOfSpeech.charAt(0).toUpperCase() + partOfSpeech.slice(1)
  } Dictionary\n * Auto-generated from module vocabulary extraction\n * Total entries: ${totalEntries}\n */\n\n`;

  content += `export const ${partOfSpeech} = new Map([\n`;

  entries.forEach((entry) => {
    content += `  [\n    "${entry.id}",\n    {\n`;
    content += `      id: "${entry.id}",\n`;
    content += `      language: "${entry.language}",\n`;
    content += `      word: "${entry.word}",\n`;
    content += `      partOfSpeech: "${entry.partOfSpeech}",\n`;
    content += `      translations: [\n`;
    entry.translations.forEach((translation) => {
      content += `        {\n`;
      content += `          language: "${translation.language}",\n`;
      content += `          text: "${translation.text}",\n`;
      content += `          definition: "${translation.definition}",\n`;
      content += `          context: "${translation.context}",\n`;
      content += `          confidence: ${translation.confidence},\n`;
      content += `        },\n`;
    });
    content += `      ],\n`;
    content += `      gender: "${entry.gender}",\n`;
    content += `      variants: [],\n`;
    content += `      relationships: [],\n`;
    content += `      frequency: {\n`;
    content += `        rank: ${entry.frequency.rank},\n`;
    content += `        score: ${entry.frequency.score},\n`;
    content += `        corpus: "${entry.frequency.corpus}",\n`;
    content += `        perMillion: ${entry.frequency.perMillion},\n`;
    content += `        percentile: ${entry.frequency.percentile},\n`;
    content += `      },\n`;
    content += `      difficulty: ${entry.difficulty},\n`;
    content += `      cefr_level: "${entry.cefr_level}",\n`;
    content += `      examples: [],\n`;
    content += `      tags: ${JSON.stringify(entry.tags)},\n`;
    content += `      semantic_field: "${entry.semantic_field}",\n`;
    content += `      moduleKey: "${entry.moduleKey}",\n`;
    content += `      unitNumber: ${entry.unitNumber},\n`;
    if (entry.pronoun) {
      content += `      pronoun: "${entry.pronoun}",\n`;
    }
    content += `      created_at: "${entry.created_at}",\n`;
    content += `      updated_at: "${entry.updated_at}",\n`;
    content += `      source: "${entry.source}",\n`;
    content += `      verified: ${entry.verified},\n`;
    content += `    },\n`;
    content += `  ],\n`;
  });

  content += `]);\n`;

  return content;
}

// Main execution
async function main() {
  console.log(
    "🚀 Starting dictionary regeneration from module vocabulary...\n"
  );

  try {
    // Extract vocabulary from all modules
    const vocabulary = await extractVocabularyFromModules();

    // Generate summary
    console.log("\n📊 Extraction Summary:");
    Object.entries(vocabulary).forEach(([partOfSpeech, words]) => {
      console.log(`  ${partOfSpeech}: ${words.size} entries`);
    });

    // Generate dictionary files
    console.log("\n📝 Generating dictionary files...");
    const dictionaryDir = path.join(
      projectRoot,
      "src",
      "data",
      "dictionary",
      "words"
    );

    // Ensure directory exists
    if (!fs.existsSync(dictionaryDir)) {
      fs.mkdirSync(dictionaryDir, { recursive: true });
    }

    for (const [partOfSpeech, words] of Object.entries(vocabulary)) {
      const filename = `${partOfSpeech}.js`;
      const filepath = path.join(dictionaryDir, filename);
      const content = generateDictionaryFile(words, partOfSpeech);

      fs.writeFileSync(filepath, content, "utf8");
      console.log(`  ✅ Generated ${filename} (${words.size} entries)`);
    }

    console.log("\n🎉 Dictionary regeneration completed successfully!");
  } catch (error) {
    console.error("❌ Error during dictionary regeneration:", error);
    process.exit(1);
  }
}

// Run the script
main();
