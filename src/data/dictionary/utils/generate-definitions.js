import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { CambridgeScraper } from "./cambridge-scraper.js";
import { WordSchema, validateWord } from "../schemas/word-schema.js";
import { logger } from "../../../utils/logger";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Dictionary Definition Generator
 *
 * Generates dictionary entries from simple word inputs with auto-scraping capabilities.
 * Supports all parts of speech with part-of-speech-specific fields and automatic
 * Cambridge Dictionary enhancement.
 *
 * Features:
 * - Redirect system for word variants (plurals, gender forms, conjugations)
 * - Automatic Cambridge Dictionary integration
 * - Duplicate detection and handling
 * - Schema validation
 * - File organization by part of speech
 *
 * @see {@link ../words/cambridge/DICTIONARY_GENERATOR_GUIDE.md} for comprehensive usage guide
 *
 * ## Basic Usage
 * ```javascript
 * import generator from './generate-definitions.js';
 *
 * // Single word
 * await generator.generateDefinitions({
 *   word: "bonjour",
 *   translation: "hello",
 *   partOfSpeech: "interjection"
 * });
 *
 * // Word with redirect variants
 * await generator.generateDefinitions([
 *   // Main entry
 *   {
 *     word: "beau",
 *     translation: "beautiful",
 *     partOfSpeech: "adjective",
 *     gender: "masculine",
 *     number: "singular"
 *   },
 *   // Redirect variant
 *   {
 *     word: "belle",
 *     partOfSpeech: "adjective",
 *     redirect_to: "beau-fr",
 *     redirect_type: "feminine_form",
 *     base_word: "beau",
 *     gender: "feminine",
 *     number: "singular"
 *   }
 * ]);
 *
 * // Multiple words
 * await generator.generateDefinitions([
 *   { word: "chat", translation: "cat", partOfSpeech: "noun", gender: "masculine" },
 *   { word: "manger", translation: "to eat", partOfSpeech: "verb" }
 * ]);
 * ```
 *
 * ## Part-of-Speech Specific Examples
 *
 * ### Verbs
 * ```javascript
 * {
 *   word: "manger",
 *   translation: "to eat",
 *   partOfSpeech: "verb",
 *   infinitive: "manger",
 *   verb_phrases: [
 *     { phrase: "je mange", type: "pronoun_verb", context: "I eat", frequency: "common" },
 *     { phrase: "ne dire pas", type: "negation", context: "don't say", frequency: "common" }
 *   ],
 *   unit: "unit1",
 *   tags: ["unit1", "food"]
 * }
 * ```
 *
 * ### Nouns
 * ```javascript
 * {
 *   word: "chat",
 *   translation: "cat",
 *   partOfSpeech: "noun",
 *   gender: "masculine",
 *   plural_form: "chats",
 *   noun_articles: {
 *     definite: "le",
 *     indefinite: "un",
 *     plural: "les"
 *   },
 *   noun_phrases: [
 *     { phrase: "le chat", type: "definite_article", context: "the cat", frequency: "common" }
 *   ]
 * }
 * ```
 *
 * ### Adjectives
 * ```javascript
 * {
 *   word: "grand",
 *   translation: "big/tall",
 *   partOfSpeech: "adjective",
 *   adjective_forms: {
 *     masculine_singular: "grand",
 *     feminine_singular: "grande",
 *     masculine_plural: "grands",
 *     feminine_plural: "grandes"
 *   },
 *   adjective_phrases: [
 *     { phrase: "très grand", type: "intensifier", context: "very big", frequency: "common" }
 *   ]
 * }
 * ```
 *
 * ### Verb Conjugations
 * ```javascript
 * {
 *   word: "suis",
 *   translation: "am",
 *   partOfSpeech: "verb",
 *   infinitive: "être",
 *   tense: "present",
 *   mood: "indicative",
 *   person: "je",
 *   number: "singular",
 *   verb_phrases: [
 *     { phrase: "je suis", type: "pronoun_verb", context: "I am", frequency: "common" }
 *   ]
 * }
 * ```
 *
 * ## Important Notes
 * - **Manual verb phrases**: Supply common phrases manually in `verb_phrases` array, including negative forms
 * - **Duplicate checking**: Based on both `word` AND `partOfSpeech`
 * - **Two-phase process**: Basic entries created first, then Cambridge enhancement
 * - **Schema compliance**: All entries validated against word-schema.js
 * - **Unit/Module support**: Use `unit`, `module`, `tags` for curriculum organization
 *
 * @author Language Academy Team
 * @version 2.0.0
 */

export class DefinitionGenerator {
  constructor() {
    this.scraper = new CambridgeScraper();
    this.wordsDir = path.join(__dirname, "..", "words");
    this.cambridgeDir = path.join(this.wordsDir, "cambridge");
  }

  /**
   * Generate dictionary entries from word inputs
   *
   * Creates dictionary entries with proper schema compliance and optional Cambridge enhancement.
   * Supports all parts of speech with part-of-speech-specific fields.
   *
   * @param {Array|Object} input - Single word object or array of word objects
   * @param {Object} options - Generation options
   * @param {boolean} [options.autoScrape=true] - Whether to enhance with Cambridge data
   * @param {boolean} [options.verbose=false] - Whether to show detailed logging
   * @returns {Object} - Object with results array and addResults summary
   *
   * @example
   * // Basic verb
   * await generator.generateDefinitions({
   *   word: "manger",
   *   translation: "to eat",
   *   partOfSpeech: "verb"
   * });
   *
   * @example
   * // Noun with gender and articles
   * await generator.generateDefinitions({
   *   word: "chat",
   *   translation: "cat",
   *   partOfSpeech: "noun",
   *   gender: "masculine",
   *   plural_form: "chats",
   *   noun_articles: { definite: "le", indefinite: "un" }
   * });
   *
   * @example
   * // Verb conjugation with details
   * await generator.generateDefinitions({
   *   word: "suis",
   *   translation: "am",
   *   partOfSpeech: "verb",
   *   infinitive: "être",
   *   tense: "present",
   *   person: "je"
   * });
   *
   * @see {@link ../words/cambridge/DICTIONARY_GENERATOR_GUIDE.md} for complete examples
   */
  async generateDefinitions(input, options = {}) {
    const words = Array.isArray(input) ? input : [input];
    const results = [];

    logger.log(`🚀 Generating definitions for ${words.length} words...`);

    // Phase 1: Create basic entries and add to files
    logger.log(`\n📝 Phase 1: Creating basic entries and adding to files...`);
    for (let i = 0; i < words.length; i++) {
      const wordInput = words[i];
      logger.log(
        `\n📝 Processing ${i + 1}/${words.length}: ${wordInput.word}`
      );

      try {
        // Create basic entry without Cambridge scraping
        const entry = await this.generateSingleDefinition(wordInput, {
          ...options,
          autoScrape: false,
        });

        // Handle redirect entries (they return the entry directly)
        if (entry.redirect_to) {
          results.push(entry);
        } else {
          // Regular entries are wrapped in {entry, success}
          results.push(entry);
        }
      } catch (error) {
        console.error(
          `❌ Error generating definition for ${wordInput.word}:`,
          error.message
        );
        results.push({
          word: wordInput.word,
          error: error.message,
          success: false,
        });
      }
    }

    // Add all basic entries to files first
    logger.log(`\n📁 Adding basic entries to dictionary files...`);
    const addResults = await this.addToFiles(results, options);

    // Phase 2: Enhance with Cambridge data if enabled
    if (options.autoScrape !== false) {
      logger.log(`\n🔍 Phase 2: Enhancing entries with Cambridge data...`);

      for (let i = 0; i < results.length; i++) {
        const result = results[i];

        // Skip redirect entries for Cambridge scraping (they don't need it)
        if (result.redirect_to) {
          logger.log(
            `\n🔍 Skipping Cambridge enhancement for redirect entry: ${result.word}`
          );
          continue;
        }

        if (!result.success) continue;

        const wordInput = words[i];
        logger.log(
          `\n🔍 Enhancing ${i + 1}/${words.length}: ${wordInput.word}`
        );

        try {
          // Now scrape Cambridge and update the file entry
          await this.enhanceWithCambridgeData(
            result.entry,
            wordInput.partOfSpeech
          );
        } catch (error) {
          console.error(`❌ Error enhancing ${wordInput.word}:`, error.message);
        }
      }
    }

    return { results, addResults };
  }

  /**
   * Enhance an existing dictionary entry with Cambridge data
   * @param {Object} entry - The basic dictionary entry
   * @param {string} partOfSpeech - The part of speech to target
   */
  async enhanceWithCambridgeData(entry, partOfSpeech) {
    logger.log(
      `🔍 Auto-scraping Cambridge data for: ${entry.word} (${
        partOfSpeech || "any"
      })`
    );

    const cambridgeData = await this.scraper.scrapeWord(entry.word);

    if (cambridgeData.found) {
      // Merge Cambridge data with existing entry
      const enhancedEntry = this.mergeCambridgeData(entry, cambridgeData);

      // Update the entry in the appropriate file
      await this.updateEntryInFile(enhancedEntry);

      logger.log(`✅ Cambridge data merged and updated for: ${entry.word}`);
    } else {
      logger.log(`⚠️  No Cambridge data found for: ${entry.word}`);
    }
  }

  /**
   * Update an existing entry in the dictionary file
   * @param {Object} entry - The enhanced dictionary entry
   */
  async updateEntryInFile(entry) {
    const targetFile = this.getTargetFileName(entry.partOfSpeech);
    const targetPath = path.join(this.cambridgeDir, targetFile);

    // Parse existing file
    const fileData = this.parseDictionaryFile(targetPath);
    if (!fileData) {
      throw new Error(`Failed to parse dictionary file: ${targetFile}`);
    }

    // Find and update the existing entry
    const entryIndex = fileData.entries.findIndex(
      ([id, data]) => id === entry.id
    );
    if (entryIndex !== -1) {
      // Update the entry with enhanced data
      fileData.entries[entryIndex] = [entry.id, entry];

      // Write updated file
      await this.writeDictionaryFile(targetPath, fileData, entry.partOfSpeech);

      logger.log(`📝 Updated "${entry.word}" in ${targetFile}`);
    } else {
      logger.log(
        `⚠️  Entry "${entry.word}" not found in ${targetFile} for updating`
      );
    }
  }

  /**
   * Generate a single dictionary entry
   * @param {Object} wordInput - Word input object
   * @param {Object} options - Generation options
   * @returns {Object} - Generated dictionary entry
   */
  async generateSingleDefinition(wordInput, options = {}) {
    const {
      word,
      translation,
      partOfSpeech,
      gender,
      infinitive,
      verb_phrases,
      plural_form,
      noun_articles,
      noun_phrases,
      adjective_forms,
      adjective_phrases,
      unit,
      module,
      tags,
      // Redirect fields
      redirect_to,
      redirect_type,
      base_word,
      number,
      ...rest
    } = wordInput;

    if (!word) {
      throw new Error("Word is required");
    }

    // Handle redirect entries (lightweight definitions)
    if (redirect_to) {
      return this.generateRedirectEntry(wordInput);
    }

    // Start with core required fields and schema defaults
    let entryData = {
      // Core required fields
      id: `${word}-fr`,
      lang: "fr",
      word,

      // Enhanced translations (with defaults)
      translations: translation
        ? [
            {
              lang: "en",
              text: translation,
              source: "language_academy",
              confidence: 0.95,
            },
          ]
        : [],

      // Enhanced relationships (with defaults)
      relationships: [],

      // Metadata fields with defaults
      etymology: "",
      register: [],
      usage_notes: "",
      regional_variants: [],

      // Enhanced examples (with defaults)
      examples: [],

      // Phonetics
      phonetic: "",

      // Learning metadata
      cefr_level: "A1", // Default CEFR level

      // Categorization (with defaults)
      tags: ["lesson"],

      // Metadata (with defaults)
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      sources: ["language_academy"],
      verified: false,

      // Override with any user-provided fields
      ...rest,
    };

    // Add optional fields only if they have values
    if (partOfSpeech) {
      entryData.partOfSpeech = partOfSpeech;
    }

    // Add gender for nouns
    if (partOfSpeech === "noun") {
      entryData.gender = gender || "none";
    }

    // Auto-scrape Cambridge if enabled (default)
    if (options.autoScrape !== false) {
      logger.log(
        `🔍 Auto-scraping Cambridge data for: ${word} (${
          partOfSpeech || "any"
        })`
      );
      const cambridgeData = await this.scraper.scrapeWord(word);

      if (cambridgeData.found) {
        // Merge Cambridge data with user data (user data takes precedence)
        entryData = this.mergeCambridgeData(entryData, cambridgeData);
        logger.log(`✅ Cambridge data merged for: ${word}`);
      } else {
        logger.log(`⚠️  No Cambridge data found for: ${word}`);
      }
    }

    // Handle verb relationships if infinitive is provided
    if (infinitive && partOfSpeech === "verb") {
      entryData.infinitive = infinitive;
      entryData.relationships.push({
        type: "conjugation_pair",
        targetId: `${infinitive}-fr`,
        targetWord: infinitive,
        note: "infinitive form",
      });

      // Add conjugation details for conjugated forms
      const conjugationDetails = this.getConjugationDetails(word, infinitive);
      if (conjugationDetails) {
        entryData.tense = conjugationDetails.tense;
        entryData.mood = conjugationDetails.mood;
        entryData.person = conjugationDetails.person;
        entryData.number = conjugationDetails.number;
      }
    }

    // Apply part-of-speech-specific fields
    this.applyPartOfSpeechFields(entryData, partOfSpeech, {
      verb_phrases,
      plural_form,
      noun_articles,
      noun_phrases,
      adjective_forms,
      adjective_phrases,
    });

    // Handle unit, module, and tags
    if (unit) {
      entryData.unit = unit;
      logger.log(`  ✅ Added unit: ${unit}`);
    }

    if (module) {
      entryData.module = module;
      logger.log(`  ✅ Added module: ${module}`);
    }

    if (tags && Array.isArray(tags)) {
      // Merge with existing tags, avoiding duplicates
      const existingTags = entryData.tags || [];
      const newTags = [...new Set([...existingTags, ...tags])];
      entryData.tags = newTags;
      logger.log(`  ✅ Added tags: ${tags.join(", ")}`);
    }

    // Validate the entry
    const validation = validateWord(entryData);
    if (!validation.success) {
      logger.warn(`⚠️  Validation warnings for ${word}:`, validation.errors);
      // Continue anyway - validation errors are often just missing optional fields
    }

    return {
      word,
      entry: entryData,
      success: true,
    };
  }

  /**
   * Merge Cambridge scraped data with user-provided data
   * @param {Object} userData - User-provided word data
   * @param {Object} cambridgeData - Cambridge scraped data
   * @returns {Object} - Merged word data
   */
  mergeCambridgeData(userData, cambridgeData) {
    const merged = { ...userData };

    // IMPORTANT: User-provided part of speech takes precedence
    // Only use Cambridge part of speech if not provided by user
    if (!merged.partOfSpeech && cambridgeData.partOfSpeech) {
      merged.partOfSpeech = cambridgeData.partOfSpeech;
    }

    // Only merge Cambridge translations if they match the target part of speech
    // or if no specific part of speech filtering is possible
    const userTranslations = merged.translations || [];
    let cambridgeTranslations = cambridgeData.translations || [];

    // Filter Cambridge translations based on context if we have a specific part of speech
    if (merged.partOfSpeech && userTranslations.length > 0) {
      // If user provided both part of speech AND translation, don't add Cambridge translations
      // This prevents mixing conflicting translations (e.g., "est" as verb "is" vs noun "east")
      logger.log(
        `🔍 Skipping Cambridge translations for ${merged.word} (${merged.partOfSpeech}) - user provided specific translation`
      );
      cambridgeTranslations = [];
    }

    merged.translations = [...userTranslations, ...cambridgeTranslations];

    // Add Cambridge examples if none provided by user
    if (
      (!userData.examples || userData.examples.length === 0) &&
      cambridgeData.examples &&
      cambridgeData.examples.length > 0
    ) {
      // Transform examples to proper format if they're strings
      merged.examples = cambridgeData.examples.map((example) => {
        if (typeof example === "string") {
          return {
            lang: "en",
            text: example,
            trans: "",
            source: "cambridge",
          };
        }
        return example; // Already in proper format
      });
    }

    // Add phonetic if not provided
    if (!merged.phonetic && cambridgeData.phonetic) {
      merged.phonetic = cambridgeData.phonetic;
    }

    // Add etymology if available
    if (!merged.etymology && cambridgeData.etymology) {
      merged.etymology = cambridgeData.etymology;
    }

    // Add usage notes if available
    if (!merged.usage_notes && cambridgeData.usage_notes) {
      merged.usage_notes = cambridgeData.usage_notes;
    }

    // Merge register information - always append Cambridge data to existing data
    if (cambridgeData.register && cambridgeData.register.length > 0) {
      merged.register = [...(merged.register || []), ...cambridgeData.register];
    }

    // Merge regional variants - always append Cambridge data to existing data
    if (
      cambridgeData.regional_variants &&
      cambridgeData.regional_variants.length > 0
    ) {
      merged.regional_variants = [
        ...(merged.regional_variants || []),
        ...cambridgeData.regional_variants,
      ];
    }

    // Merge relationships - always append Cambridge data to existing data
    if (cambridgeData.relationships && cambridgeData.relationships.length > 0) {
      merged.relationships = [
        ...(merged.relationships || []),
        ...cambridgeData.relationships,
      ];
    }

    // Add Cambridge data
    if (cambridgeData.cambridge_data) {
      merged.cambridge_data = cambridgeData.cambridge_data;
    }

    // Merge sources
    if (!merged.sources.includes("cambridge")) {
      merged.sources.push("cambridge");
    }

    // Update updated_at timestamp
    merged.updated_at = new Date().toISOString();

    return merged;
  }

  /**
   * Add generated entries to dictionary files
   * @param {Array} entries - Array of generated entries
   * @param {Object} options - File options
   * @returns {Object} - Results summary
   */
  async addToFiles(entries, options = {}) {
    const results = {
      added: 0,
      skipped: 0,
      errors: 0,
      details: [],
    };

    logger.log(`\n📁 Adding ${entries.length} entries to dictionary files...`);

    for (const entryResult of entries) {
      // Handle redirect entries (they don't have success/entry wrapper)
      if (entryResult.redirect_to) {
        try {
          const added = await this.addEntryToFile(entryResult, options);
          if (added) {
            results.added++;
            results.details.push({
              word: entryResult.word,
              status: "added",
              file: this.getTargetFileName(entryResult.partOfSpeech),
            });
          } else {
            results.skipped++;
            results.details.push({
              word: entryResult.word,
              status: "skipped",
              message: "Already exists",
            });
          }
        } catch (error) {
          results.errors++;
          results.details.push({
            word: entryResult.word,
            status: "error",
            message: error.message,
          });
        }
        continue;
      }

      if (!entryResult.success) {
        results.errors++;
        results.details.push({
          word: entryResult.word,
          status: "error",
          message: entryResult.error,
        });
        continue;
      }

      try {
        const added = await this.addEntryToFile(entryResult.entry, options);
        if (added) {
          results.added++;
          results.details.push({
            word: entryResult.word,
            status: "added",
            file: this.getTargetFileName(entryResult.entry.partOfSpeech),
          });
        } else {
          results.skipped++;
          results.details.push({
            word: entryResult.word,
            status: "skipped",
            message: "Already exists",
          });
        }
      } catch (error) {
        results.errors++;
        results.details.push({
          word: entryResult.word,
          status: "error",
          message: error.message,
        });
      }
    }

    return results;
  }

  /**
   * Add a single entry to the appropriate dictionary file
   * @param {Object} entry - Dictionary entry
   * @param {Object} options - File options
   * @returns {boolean} - True if added, false if skipped
   */
  async addEntryToFile(entry, options = {}) {
    const targetFile = this.getTargetFileName(entry.partOfSpeech);
    const targetPath = path.join(this.cambridgeDir, targetFile);

    // Ensure directory exists
    if (!fs.existsSync(this.cambridgeDir)) {
      fs.mkdirSync(this.cambridgeDir, { recursive: true });
    }

    // Create file if it doesn't exist
    if (!fs.existsSync(targetPath)) {
      await this.createNewDictionaryFile(targetPath, entry.partOfSpeech);
    }

    // Parse existing file
    const fileData = this.parseDictionaryFile(targetPath);
    if (!fileData) {
      throw new Error(`Failed to parse dictionary file: ${targetFile}`);
    }

    // Check for duplicates (same word AND same part of speech)
    const existingEntry = fileData.entries.find(
      ([id, data]) =>
        data.word === entry.word && data.partOfSpeech === entry.partOfSpeech
    );
    if (existingEntry) {
      logger.log(
        `⚠️  Word "${entry.word}" (${entry.partOfSpeech}) already exists in ${targetFile}`
      );
      return false;
    }

    // Add entry
    const newEntry = [entry.id, entry];
    fileData.entries.push(newEntry);

    // Write updated file
    await this.writeDictionaryFile(targetPath, fileData, entry.partOfSpeech);

    logger.log(`✅ Added "${entry.word}" to ${targetFile}`);
    return true;
  }

  /**
   * Get target file name based on part of speech
   * @param {string} partOfSpeech - Part of speech
   * @returns {string} - Target file name
   */
  getTargetFileName(partOfSpeech) {
    const fileMap = {
      noun: "nouns.js",
      verb: "verbs.js",
      adjective: "adjectives.js",
      adverb: "adverbs.js",
      pronoun: "pronouns.js",
      article: "articles.js",
      preposition: "prepositions.js",
      conjunction: "conjunctions.js",
      interjection: "interjections.js",
      expression: "expressions.js",
    };

    return fileMap[partOfSpeech] || "expressions.js";
  }

  /**
   * Parse dictionary file to extract entries
   * @param {string} filePath - Path to dictionary file
   * @returns {Object} - Parsed file data
   */
  parseDictionaryFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, "utf8");

      // Extract the Map content
      const mapMatch = content.match(
        /export const \w+ = new Map\(\[([\s\S]*?)\]\);/
      );
      if (!mapMatch) {
        return null;
      }

      // Parse entries safely
      const mapContent = `[${mapMatch[1]}]`;
      let entries = [];

      try {
        entries = eval(mapContent);
      } catch (evalError) {
        logger.warn(
          `Warning: Could not parse entries in ${filePath}, starting with empty array`
        );
        entries = [];
      }

      return {
        entries,
        originalContent: content,
        mapMatch,
      };
    } catch (error) {
      console.error(`Error parsing ${filePath}:`, error.message);
      return null;
    }
  }

  /**
   * Create a new dictionary file
   * @param {string} filePath - Path for new file
   * @param {string} partOfSpeech - Part of speech for the file
   */
  async createNewDictionaryFile(filePath, partOfSpeech) {
    const fileName = path.basename(filePath, ".js");
    const varName = fileName.replace(/-/g, "");
    const timestamp = new Date().toISOString();

    const content = `/**
 * Cambridge Dictionary Scraped ${
   partOfSpeech.charAt(0).toUpperCase() + partOfSpeech.slice(1)
 }s
 * Generated: ${timestamp}
 * Successfully scraped: 0/0
 */

export const ${varName}Cambridge = new Map([
]);

export default ${varName}Cambridge;
`;

    fs.writeFileSync(filePath, content);
    logger.log(`📝 Created new dictionary file: ${fileName}.js`);
  }

  /**
   * Write dictionary file with updated entries
   * @param {string} filePath - Path to dictionary file
   * @param {Object} fileData - Parsed file data
   * @param {string} partOfSpeech - Part of speech
   */
  async writeDictionaryFile(filePath, fileData, partOfSpeech) {
    const fileName = path.basename(filePath, ".js");
    const varName = fileName.replace(/-/g, "");
    const timestamp = new Date().toISOString();

    // Generate entries string
    const entriesString = fileData.entries
      .map(([id, data]) => {
        return `  [\n    "${id}",\n    ${JSON.stringify(data, null, 4).replace(
          /^/gm,
          "    "
        )}\n  ]`;
      })
      .join(",\n");

    const content = `/**
 * Cambridge Dictionary Scraped ${
   partOfSpeech.charAt(0).toUpperCase() + partOfSpeech.slice(1)
 }s
 * Generated: ${timestamp}
 * Successfully scraped: ${fileData.entries.length}/${fileData.entries.length}
 */

export const ${varName}Cambridge = new Map([
${entriesString}
]);

export default ${varName}Cambridge;
`;

    fs.writeFileSync(filePath, content);
  }

  /**
   * Handle verb conjugation relationships
   * @param {Array} entries - Generated entries
   * @returns {Array} - Entries with updated relationships
   */
  async handleVerbRelationships(entries) {
    const verbEntries = entries.filter(
      (e) => e.success && e.entry.partOfSpeech === "verb"
    );
    const infinitiveMap = new Map();

    // Build map of infinitives
    for (const entry of verbEntries) {
      if (entry.entry.infinitive) {
        const infinitive = entry.entry.infinitive;
        if (!infinitiveMap.has(infinitive)) {
          infinitiveMap.set(infinitive, []);
        }
        infinitiveMap.get(infinitive).push(entry.entry);
      }
    }

    // Update relationships
    for (const [infinitive, conjugatedForms] of infinitiveMap) {
      // Find or create infinitive entry
      const infinitiveEntry = verbEntries.find(
        (e) => e.entry.word === infinitive
      );

      if (infinitiveEntry) {
        // Add relationships from infinitive to conjugated forms
        for (const form of conjugatedForms) {
          if (form.word !== infinitive) {
            infinitiveEntry.entry.relationships.push({
              type: "conjugation_pair",
              targetId: form.id,
              targetWord: form.word,
              note: "conjugated form",
            });
          }
        }
      }
    }

    return entries;
  }

  /**
   * Generate common verb phrases for disambiguation and word detection
   * @param {string} verbForm - The conjugated verb form (e.g., "est", "suis")
   * @param {string} infinitive - The infinitive form (e.g., "être")
   * @returns {Array} - Array of verb phrase objects
   */
  generateVerbPhrases(verbForm, infinitive) {
    const phrases = [];

    // Common pronouns for être conjugations
    const pronounMap = {
      suis: ["je"],
      es: ["tu"],
      est: ["il", "elle", "on", "c'", "ce"],
      sommes: ["nous"],
      êtes: ["vous"],
      sont: ["ils", "elles"],
      étais: ["je", "tu"],
      était: ["il", "elle", "on", "c'", "ce"],
      étions: ["nous"],
      étiez: ["vous"],
      étaient: ["ils", "elles"],
      serai: ["je"],
      seras: ["tu"],
      sera: ["il", "elle", "on", "c'", "ce"],
      serons: ["nous"],
      serez: ["vous"],
      seront: ["ils", "elles"],
      serais: ["je", "tu"],
      serait: ["il", "elle", "on", "c'", "ce"],
      serions: ["nous"],
      seriez: ["vous"],
      seraient: ["ils", "elles"],
      sois: ["que je", "que tu"],
      soit: ["qu'il", "qu'elle", "qu'on"],
      soyons: ["que nous"],
      soyez: ["que vous"],
      soient: ["qu'ils", "qu'elles"],
    };

    // Get pronouns for this verb form
    const pronouns = pronounMap[verbForm] || [];

    // Generate pronoun + verb phrases
    pronouns.forEach((pronoun) => {
      phrases.push({
        phrase: `${pronoun} ${verbForm}`,
        type: "pronoun_verb",
        context: `${pronoun} + ${verbForm} (${infinitive})`,
        frequency: "common",
      });
    });

    // Generate negations
    pronouns.forEach((pronoun) => {
      // Handle contractions like "n'est" vs "ne suis"
      const negativeForm = verbForm.startsWith("e")
        ? `n'${verbForm}`
        : `ne ${verbForm}`;

      phrases.push({
        phrase: `${pronoun} ${negativeForm} pas`,
        type: "negation",
        context: `Negative form: ${pronoun} + ${verbForm} + pas`,
        frequency: "common",
      });

      phrases.push({
        phrase: `${pronoun} ${negativeForm} plus`,
        type: "negation",
        context: `Negative form: ${pronoun} + ${verbForm} + plus (no longer)`,
        frequency: "common",
      });

      phrases.push({
        phrase: `${pronoun} ${negativeForm} jamais`,
        type: "negation",
        context: `Negative form: ${pronoun} + ${verbForm} + jamais (never)`,
        frequency: "common",
      });
    });

    // Generate questions
    phrases.push({
      phrase: `${verbForm}-tu`,
      type: "question",
      context: `Question form with tu inversion`,
      frequency: "common",
    });

    phrases.push({
      phrase: `${verbForm}-il`,
      type: "question",
      context: `Question form with il inversion`,
      frequency: "common",
    });

    phrases.push({
      phrase: `${verbForm}-elle`,
      type: "question",
      context: `Question form with elle inversion`,
      frequency: "common",
    });

    // Add compound forms for être (auxiliary usage)
    if (infinitive === "être") {
      phrases.push({
        phrase: `${verbForm} en train de`,
        type: "compound",
        context: `Progressive form: in the process of`,
        frequency: "common",
      });

      // Past participle constructions
      phrases.push({
        phrase: `${verbForm} allé`,
        type: "compound",
        context: `Past participle: went (with être)`,
        frequency: "common",
      });

      phrases.push({
        phrase: `${verbForm} venu`,
        type: "compound",
        context: `Past participle: came (with être)`,
        frequency: "common",
      });

      phrases.push({
        phrase: `${verbForm} parti`,
        type: "compound",
        context: `Past participle: left (with être)`,
        frequency: "common",
      });
    }

    return phrases;
  }

  /**
   * Apply part-of-speech-specific fields to entry data
   * @param {Object} entryData - The entry data object to modify
   * @param {string} partOfSpeech - The part of speech
   * @param {Object} fields - Object containing all POS-specific fields
   */
  applyPartOfSpeechFields(entryData, partOfSpeech, fields) {
    const {
      verb_phrases,
      plural_form,
      noun_articles,
      noun_phrases,
      adjective_forms,
      adjective_phrases,
    } = fields;

    switch (partOfSpeech) {
      case "verb":
        this.applyVerbFields(entryData, { verb_phrases });
        break;
      case "noun":
        this.applyNounFields(entryData, {
          plural_form,
          noun_articles,
          noun_phrases,
        });
        break;
      case "adjective":
        this.applyAdjectiveFields(entryData, {
          adjective_forms,
          adjective_phrases,
        });
        break;
      default:
        // For other parts of speech, apply any relevant fields that were provided
        if (verb_phrases && Array.isArray(verb_phrases)) {
          logger.warn(
            `⚠️  verb_phrases provided for ${partOfSpeech}, but this field is typically for verbs`
          );
          entryData.verb_phrases = verb_phrases;
        }
        break;
    }
  }

  /**
   * Apply verb-specific fields
   * @param {Object} entryData - The entry data object to modify
   * @param {Object} fields - Verb-specific fields
   */
  applyVerbFields(entryData, { verb_phrases }) {
    // Initialize verb_phrases array
    entryData.verb_phrases = [];

    // Add user-provided verb phrases
    if (verb_phrases && Array.isArray(verb_phrases)) {
      entryData.verb_phrases.push(...verb_phrases);
      logger.log(
        `  ✅ Added ${verb_phrases.length} user-provided verb phrases`
      );
    }

    // DISABLED: Automatically add negative form if not already present
    // Manual verb phrases should be supplied in the input data
    // const negativePhrase = `ne...${entryData.word}...pas`;
    // const hasNegative = entryData.verb_phrases.some(
    //   (phrase) => phrase.phrase.includes("ne") && phrase.phrase.includes("pas")
    // );

    // if (!hasNegative) {
    //   entryData.verb_phrases.push({
    //     phrase: negativePhrase,
    //     type: "negation",
    //     context: `not ${entryData.word}`,
    //     frequency: "common",
    //   });
    //   logger.log(`  ✅ Auto-added negative form: ${negativePhrase}`);
    // }
  }

  /**
   * Apply noun-specific fields
   * @param {Object} entryData - The entry data object to modify
   * @param {Object} fields - Noun-specific fields
   */
  applyNounFields(entryData, { plural_form, noun_articles, noun_phrases }) {
    if (plural_form) {
      entryData.plural_form = plural_form;
      logger.log(`  ✅ Added plural form: ${plural_form}`);
    }

    if (noun_articles && typeof noun_articles === "object") {
      entryData.noun_articles = noun_articles;
      const articleCount = Object.keys(noun_articles).length;
      logger.log(`  ✅ Added ${articleCount} noun articles`);
    }

    if (noun_phrases && Array.isArray(noun_phrases)) {
      entryData.noun_phrases = noun_phrases;
      logger.log(`  ✅ Added ${noun_phrases.length} noun phrases`);
    }
  }

  /**
   * Apply adjective-specific fields
   * @param {Object} entryData - The entry data object to modify
   * @param {Object} fields - Adjective-specific fields
   */
  applyAdjectiveFields(entryData, { adjective_forms, adjective_phrases }) {
    if (adjective_forms && typeof adjective_forms === "object") {
      entryData.adjective_forms = adjective_forms;
      const formCount = Object.keys(adjective_forms).length;
      logger.log(`  ✅ Added ${formCount} adjective forms`);
    }

    if (adjective_phrases && Array.isArray(adjective_phrases)) {
      entryData.adjective_phrases = adjective_phrases;
      logger.log(`  ✅ Added ${adjective_phrases.length} adjective phrases`);
    }
  }

  /**
   * Generate a lightweight redirect entry
   *
   * Used for word variants like plurals, gender forms, and conjugations.
   * Redirect entries inherit translations from the main entry while preserving
   * their own grammatical information (gender, number, etc.).
   *
   * @param {Object} wordInput - Word input object with redirect fields
   * @param {string} wordInput.word - The variant word (e.g., "belle")
   * @param {string} wordInput.redirect_to - ID of main entry (e.g., "beau-fr")
   * @param {string} wordInput.redirect_type - Type of redirect (e.g., "feminine_form")
   * @param {string} wordInput.base_word - Base word (e.g., "beau")
   * @param {string} wordInput.gender - Grammatical gender
   * @param {string} wordInput.number - Grammatical number
   * @returns {Object} - Generated redirect entry
   */
  generateRedirectEntry(wordInput) {
    const {
      word,
      partOfSpeech,
      gender,
      redirect_to,
      redirect_type,
      base_word,
      number,
      examples = [],
      ...rest
    } = wordInput;

    // Validate required redirect fields
    if (!redirect_to) {
      throw new Error("redirect_to is required for redirect entries");
    }
    if (!redirect_type) {
      throw new Error("redirect_type is required for redirect entries");
    }

    // Create lightweight redirect entry
    const entryData = {
      // Core required fields
      id: `${word}-fr`,
      lang: "fr",
      word,
      partOfSpeech: partOfSpeech || "unknown", // Use provided partOfSpeech or default to unknown

      // Redirect fields
      redirect_to,
      redirect_type,
      base_word: base_word || word,
      gender: gender || "none",
      number: number || "singular",

      // Standard fields with minimal data
      translations: [], // No translations for redirects
      relationships: [],
      etymology: "",
      register: [],
      usage_notes: "",
      regional_variants: [],
      examples: Array.isArray(examples) ? examples : [],
      phonetic: "",
      tags: ["redirect"],
      sources: ["language_academy"],
      verified: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),

      // Override with any additional fields
      ...rest,
    };

    logger.log(
      `  ✅ Generated redirect entry: ${word} → ${redirect_to} (${redirect_type})`
    );

    // Note: The main entry's variants array should be updated separately
    // This ensures bidirectional relationship: redirect → main entry, main entry → variants
    logger.log(
      `  📝 Note: Add "${word}" to variants array of "${redirect_to}" entry`
    );

    return entryData;
  }

  /**
   * Add a variant to an existing main entry
   * @param {string} mainEntryId - ID of the main entry to update
   * @param {string} variantWord - The variant word to add
   * @param {string} variantType - Type of variant (plural_form, feminine_form, etc.)
   * @param {Object} dictionaryMap - The dictionary Map to update
   */
  addVariantToMainEntry(mainEntryId, variantWord, variantType, dictionaryMap) {
    const mainEntry = dictionaryMap.get(mainEntryId);
    if (!mainEntry) {
      logger.warn(
        `⚠️  Main entry "${mainEntryId}" not found for variant "${variantWord}"`
      );
      return;
    }

    // Initialize variants array if it doesn't exist
    if (!mainEntry.variants) {
      mainEntry.variants = [];
    }

    // Check if variant already exists
    const existingVariant = mainEntry.variants.find(
      (v) => v.text === variantWord
    );
    if (existingVariant) {
      logger.log(
        `  ℹ️  Variant "${variantWord}" already exists in "${mainEntryId}"`
      );
      return;
    }

    // Add the variant
    mainEntry.variants.push({
      type: variantType,
      text: variantWord,
      note: `${variantType} form`,
    });

    logger.log(`  ✅ Added variant "${variantWord}" to "${mainEntryId}"`);
  }

  /**
   * Get conjugation details for a conjugated verb form
   * @param {string} verbForm - The conjugated verb form (e.g., "veux", "voulait")
   * @param {string} infinitive - The infinitive form (e.g., "vouloir")
   * @returns {Object|null} - Conjugation details or null if not found
   */
  getConjugationDetails(verbForm, infinitive) {
    // Common conjugation patterns for vouloir
    if (infinitive === "vouloir") {
      const vouloirConjugations = {
        // Present tense
        veux: {
          tense: "present",
          mood: "indicative",
          person: "je",
          number: "singular",
        },
        veut: {
          tense: "present",
          mood: "indicative",
          person: "il",
          number: "singular",
        },
        voulons: {
          tense: "present",
          mood: "indicative",
          person: "nous",
          number: "plural",
        },
        voulez: {
          tense: "present",
          mood: "indicative",
          person: "vous",
          number: "plural",
        },
        veulent: {
          tense: "present",
          mood: "indicative",
          person: "ils",
          number: "plural",
        },

        // Imperfect tense
        voulais: {
          tense: "past",
          mood: "indicative",
          person: "je",
          number: "singular",
        },
        voulait: {
          tense: "past",
          mood: "indicative",
          person: "il",
          number: "singular",
        },
        voulions: {
          tense: "past",
          mood: "indicative",
          person: "nous",
          number: "plural",
        },
        vouliez: {
          tense: "past",
          mood: "indicative",
          person: "vous",
          number: "plural",
        },
        voulaient: {
          tense: "past",
          mood: "indicative",
          person: "ils",
          number: "plural",
        },

        // Future tense
        voudrai: {
          tense: "future",
          mood: "indicative",
          person: "je",
          number: "singular",
        },
        voudras: {
          tense: "future",
          mood: "indicative",
          person: "tu",
          number: "singular",
        },
        voudra: {
          tense: "future",
          mood: "indicative",
          person: "il",
          number: "singular",
        },
        voudrons: {
          tense: "future",
          mood: "indicative",
          person: "nous",
          number: "plural",
        },
        voudrez: {
          tense: "future",
          mood: "indicative",
          person: "vous",
          number: "plural",
        },
        voudront: {
          tense: "future",
          mood: "indicative",
          person: "ils",
          number: "plural",
        },

        // Conditional tense
        voudrais: {
          tense: "conditional",
          mood: "indicative",
          person: "je",
          number: "singular",
        },
        voudrait: {
          tense: "conditional",
          mood: "indicative",
          person: "il",
          number: "singular",
        },
        voudrions: {
          tense: "conditional",
          mood: "indicative",
          person: "nous",
          number: "plural",
        },
        voudriez: {
          tense: "conditional",
          mood: "indicative",
          person: "vous",
          number: "plural",
        },
        voudraient: {
          tense: "conditional",
          mood: "indicative",
          person: "ils",
          number: "plural",
        },

        // Subjunctive
        veuille: {
          tense: "subjunctive",
          mood: "subjunctive",
          person: "je",
          number: "singular",
        },
        veuillent: {
          tense: "subjunctive",
          mood: "subjunctive",
          person: "ils",
          number: "plural",
        },

        // Past participle
        voulu: {
          tense: "participle",
          mood: "participle",
          person: null,
          number: null,
        },
      };

      return vouloirConjugations[verbForm] || null;
    }

    // Common conjugation patterns for être
    if (infinitive === "être") {
      const etreConjugations = {
        // Present tense
        suis: {
          tense: "present",
          mood: "indicative",
          person: "je",
          number: "singular",
        },
        es: {
          tense: "present",
          mood: "indicative",
          person: "tu",
          number: "singular",
        },
        est: {
          tense: "present",
          mood: "indicative",
          person: "il",
          number: "singular",
        },
        sommes: {
          tense: "present",
          mood: "indicative",
          person: "nous",
          number: "plural",
        },
        êtes: {
          tense: "present",
          mood: "indicative",
          person: "vous",
          number: "plural",
        },
        sont: {
          tense: "present",
          mood: "indicative",
          person: "ils",
          number: "plural",
        },

        // Imperfect tense
        étais: {
          tense: "past",
          mood: "indicative",
          person: "je",
          number: "singular",
        },
        était: {
          tense: "past",
          mood: "indicative",
          person: "il",
          number: "singular",
        },
        étions: {
          tense: "past",
          mood: "indicative",
          person: "nous",
          number: "plural",
        },
        étiez: {
          tense: "past",
          mood: "indicative",
          person: "vous",
          number: "plural",
        },
        étaient: {
          tense: "past",
          mood: "indicative",
          person: "ils",
          number: "plural",
        },

        // Future tense
        serai: {
          tense: "future",
          mood: "indicative",
          person: "je",
          number: "singular",
        },
        seras: {
          tense: "future",
          mood: "indicative",
          person: "tu",
          number: "singular",
        },
        sera: {
          tense: "future",
          mood: "indicative",
          person: "il",
          number: "singular",
        },
        serons: {
          tense: "future",
          mood: "indicative",
          person: "nous",
          number: "plural",
        },
        serez: {
          tense: "future",
          mood: "indicative",
          person: "vous",
          number: "plural",
        },
        seront: {
          tense: "future",
          mood: "indicative",
          person: "ils",
          number: "plural",
        },

        // Conditional tense
        serais: {
          tense: "conditional",
          mood: "indicative",
          person: "je",
          number: "singular",
        },
        serait: {
          tense: "conditional",
          mood: "indicative",
          person: "il",
          number: "singular",
        },
        serions: {
          tense: "conditional",
          mood: "indicative",
          person: "nous",
          number: "plural",
        },
        seriez: {
          tense: "conditional",
          mood: "indicative",
          person: "vous",
          number: "plural",
        },
        seraient: {
          tense: "conditional",
          mood: "indicative",
          person: "ils",
          number: "plural",
        },

        // Subjunctive
        sois: {
          tense: "subjunctive",
          mood: "subjunctive",
          person: "je",
          number: "singular",
        },
        soit: {
          tense: "subjunctive",
          mood: "subjunctive",
          person: "il",
          number: "singular",
        },
        soyons: {
          tense: "subjunctive",
          mood: "subjunctive",
          person: "nous",
          number: "plural",
        },
        soyez: {
          tense: "subjunctive",
          mood: "subjunctive",
          person: "vous",
          number: "plural",
        },
        soient: {
          tense: "subjunctive",
          mood: "subjunctive",
          person: "ils",
          number: "plural",
        },

        // Past participle
        été: {
          tense: "participle",
          mood: "participle",
          person: null,
          number: null,
        },
      };

      return etreConjugations[verbForm] || null;
    }

    // Common conjugation patterns for pouvoir
    if (infinitive === "pouvoir") {
      const pouvoirConjugations = {
        // Present tense
        peux: {
          tense: "present",
          mood: "indicative",
          person: "je",
          number: "singular",
        },
        peut: {
          tense: "present",
          mood: "indicative",
          person: "il",
          number: "singular",
        },
        pouvons: {
          tense: "present",
          mood: "indicative",
          person: "nous",
          number: "plural",
        },
        pouvez: {
          tense: "present",
          mood: "indicative",
          person: "vous",
          number: "plural",
        },
        peuvent: {
          tense: "present",
          mood: "indicative",
          person: "ils",
          number: "plural",
        },

        // Imperfect tense
        pouvais: {
          tense: "past",
          mood: "indicative",
          person: "je",
          number: "singular",
        },
        pouvait: {
          tense: "past",
          mood: "indicative",
          person: "il",
          number: "singular",
        },
        pouvions: {
          tense: "past",
          mood: "indicative",
          person: "nous",
          number: "plural",
        },
        pouviez: {
          tense: "past",
          mood: "indicative",
          person: "vous",
          number: "plural",
        },
        pouvaient: {
          tense: "past",
          mood: "indicative",
          person: "ils",
          number: "plural",
        },

        // Future tense
        pourrai: {
          tense: "future",
          mood: "indicative",
          person: "je",
          number: "singular",
        },
        pourras: {
          tense: "future",
          mood: "indicative",
          person: "tu",
          number: "singular",
        },
        pourra: {
          tense: "future",
          mood: "indicative",
          person: "il",
          number: "singular",
        },
        pourrons: {
          tense: "future",
          mood: "indicative",
          person: "nous",
          number: "plural",
        },
        pourrez: {
          tense: "future",
          mood: "indicative",
          person: "vous",
          number: "plural",
        },
        pourront: {
          tense: "future",
          mood: "indicative",
          person: "ils",
          number: "plural",
        },

        // Conditional tense
        pourrais: {
          tense: "conditional",
          mood: "indicative",
          person: "je",
          number: "singular",
        },
        pourrait: {
          tense: "conditional",
          mood: "indicative",
          person: "il",
          number: "singular",
        },
        pourrions: {
          tense: "conditional",
          mood: "indicative",
          person: "nous",
          number: "plural",
        },
        pourriez: {
          tense: "conditional",
          mood: "indicative",
          person: "vous",
          number: "plural",
        },
        pourraient: {
          tense: "conditional",
          mood: "indicative",
          person: "ils",
          number: "plural",
        },

        // Subjunctive
        puisse: {
          tense: "subjunctive",
          mood: "subjunctive",
          person: "je",
          number: "singular",
        },
        puissions: {
          tense: "subjunctive",
          mood: "subjunctive",
          person: "nous",
          number: "plural",
        },
        puissiez: {
          tense: "subjunctive",
          mood: "subjunctive",
          person: "vous",
          number: "plural",
        },
        puissent: {
          tense: "subjunctive",
          mood: "subjunctive",
          person: "ils",
          number: "plural",
        },

        // Past participle
        pu: {
          tense: "participle",
          mood: "participle",
          person: null,
          number: null,
        },
      };

      return pouvoirConjugations[verbForm] || null;
    }

    // Common conjugation patterns for avoir
    if (infinitive === "avoir") {
      const avoirConjugations = {
        // Present tense
        ai: {
          tense: "present",
          mood: "indicative",
          person: "je",
          number: "singular",
        },
        as: {
          tense: "present",
          mood: "indicative",
          person: "tu",
          number: "singular",
        },
        a: {
          tense: "present",
          mood: "indicative",
          person: "il",
          number: "singular",
        },
        avons: {
          tense: "present",
          mood: "indicative",
          person: "nous",
          number: "plural",
        },
        avez: {
          tense: "present",
          mood: "indicative",
          person: "vous",
          number: "plural",
        },
        ont: {
          tense: "present",
          mood: "indicative",
          person: "ils",
          number: "plural",
        },

        // Imperfect tense
        avais: {
          tense: "past",
          mood: "indicative",
          person: "je",
          number: "singular",
        },
        avait: {
          tense: "past",
          mood: "indicative",
          person: "il",
          number: "singular",
        },
        avions: {
          tense: "past",
          mood: "indicative",
          person: "nous",
          number: "plural",
        },
        aviez: {
          tense: "past",
          mood: "indicative",
          person: "vous",
          number: "plural",
        },
        avaient: {
          tense: "past",
          mood: "indicative",
          person: "ils",
          number: "plural",
        },

        // Future tense
        aurai: {
          tense: "future",
          mood: "indicative",
          person: "je",
          number: "singular",
        },
        auras: {
          tense: "future",
          mood: "indicative",
          person: "tu",
          number: "singular",
        },
        aura: {
          tense: "future",
          mood: "indicative",
          person: "il",
          number: "singular",
        },
        aurons: {
          tense: "future",
          mood: "indicative",
          person: "nous",
          number: "plural",
        },
        aurez: {
          tense: "future",
          mood: "indicative",
          person: "vous",
          number: "plural",
        },
        auront: {
          tense: "future",
          mood: "indicative",
          person: "ils",
          number: "plural",
        },

        // Conditional tense
        aurais: {
          tense: "conditional",
          mood: "conditional",
          person: "je",
          number: "singular",
        },
        aurait: {
          tense: "conditional",
          mood: "conditional",
          person: "il",
          number: "singular",
        },
        aurions: {
          tense: "conditional",
          mood: "conditional",
          person: "nous",
          number: "plural",
        },
        auriez: {
          tense: "conditional",
          mood: "conditional",
          person: "vous",
          number: "plural",
        },
        auraient: {
          tense: "conditional",
          mood: "conditional",
          person: "ils",
          number: "plural",
        },

        // Subjunctive tense
        aie: {
          tense: "present",
          mood: "subjunctive",
          person: "je",
          number: "singular",
        },
        aies: {
          tense: "present",
          mood: "subjunctive",
          person: "tu",
          number: "singular",
        },
        ait: {
          tense: "present",
          mood: "subjunctive",
          person: "il",
          number: "singular",
        },
        ayons: {
          tense: "present",
          mood: "subjunctive",
          person: "nous",
          number: "plural",
        },
        ayez: {
          tense: "present",
          mood: "subjunctive",
          person: "vous",
          number: "plural",
        },
        aient: {
          tense: "present",
          mood: "subjunctive",
          person: "ils",
          number: "plural",
        },

        // Imperative
        aie: {
          tense: "present",
          mood: "imperative",
          person: "tu",
          number: "singular",
        },
        ayons: {
          tense: "present",
          mood: "imperative",
          person: "nous",
          number: "plural",
        },
        ayez: {
          tense: "present",
          mood: "imperative",
          person: "vous",
          number: "plural",
        },

        // Past participle
        eu: { tense: "past", mood: "participle", person: null, number: null },
      };

      return avoirConjugations[verbForm] || null;
    }

    // Add patterns for other common verbs as needed
    return null;
  }
}

// Export default instance
export default new DefinitionGenerator();
