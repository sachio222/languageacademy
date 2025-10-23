import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { CambridgeScraper } from "./cambridge-scraper.js";
import { WordSchema, validateWord } from "../schemas/word-schema.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Dictionary Definition Generator
 * Generates dictionary entries from simple word inputs with auto-scraping
 */

export class DefinitionGenerator {
  constructor() {
    this.scraper = new CambridgeScraper();
    this.wordsDir = path.join(__dirname, "..", "words");
    this.cambridgeDir = path.join(this.wordsDir, "cambridge");
  }

  /**
   * Generate dictionary entries from word inputs
   * @param {Array|Object} input - Single word object or array of word objects
   * @param {Object} options - Generation options
   * @returns {Array} - Array of generated dictionary entries
   */
  async generateDefinitions(input, options = {}) {
    const words = Array.isArray(input) ? input : [input];
    const results = [];

    console.log(`🚀 Generating definitions for ${words.length} words...`);

    // Phase 1: Create basic entries and add to files
    console.log(`\n📝 Phase 1: Creating basic entries and adding to files...`);
    for (let i = 0; i < words.length; i++) {
      const wordInput = words[i];
      console.log(
        `\n📝 Processing ${i + 1}/${words.length}: ${wordInput.word}`
      );

      try {
        // Create basic entry without Cambridge scraping
        const entry = await this.generateSingleDefinition(wordInput, {
          ...options,
          autoScrape: false,
        });
        results.push(entry);
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
    console.log(`\n📁 Adding basic entries to dictionary files...`);
    const addResults = await this.addToFiles(results, options);

    // Phase 2: Enhance with Cambridge data if enabled
    if (options.autoScrape !== false) {
      console.log(`\n🔍 Phase 2: Enhancing entries with Cambridge data...`);

      for (let i = 0; i < results.length; i++) {
        const result = results[i];
        if (!result.success) continue;

        const wordInput = words[i];
        console.log(
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
    console.log(
      `🔍 Auto-scraping Cambridge data for: ${entry.word} (${
        partOfSpeech || "any"
      })`
    );

    const cambridgeData = await this.scraper.scrapeWordWithPartOfSpeech(
      entry.word,
      partOfSpeech
    );

    if (cambridgeData.found) {
      // Merge Cambridge data with existing entry
      const enhancedEntry = this.mergeCambridgeData(entry, cambridgeData);

      // Update the entry in the appropriate file
      await this.updateEntryInFile(enhancedEntry);

      console.log(`✅ Cambridge data merged and updated for: ${entry.word}`);
    } else {
      console.log(`⚠️  No Cambridge data found for: ${entry.word}`);
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

      console.log(`📝 Updated "${entry.word}" in ${targetFile}`);
    } else {
      console.log(
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
      ...rest
    } = wordInput;

    if (!word) {
      throw new Error("Word is required");
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
      console.log(
        `🔍 Auto-scraping Cambridge data for: ${word} (${
          partOfSpeech || "any"
        })`
      );
      const cambridgeData = await this.scraper.scrapeWordWithPartOfSpeech(
        word,
        partOfSpeech
      );

      if (cambridgeData.found) {
        // Merge Cambridge data with user data (user data takes precedence)
        entryData = this.mergeCambridgeData(entryData, cambridgeData);
        console.log(`✅ Cambridge data merged for: ${word}`);
      } else {
        console.log(`⚠️  No Cambridge data found for: ${word}`);
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

    // Validate the entry
    const validation = validateWord(entryData);
    if (!validation.success) {
      console.warn(`⚠️  Validation warnings for ${word}:`, validation.errors);
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
      console.log(
        `🔍 Skipping Cambridge translations for ${merged.word} (${merged.partOfSpeech}) - user provided specific translation`
      );
      cambridgeTranslations = [];
    }

    merged.translations = [...userTranslations, ...cambridgeTranslations];

    // Add Cambridge examples if none provided
    if (
      merged.examples.length === 0 &&
      cambridgeData.examples &&
      cambridgeData.examples.length > 0
    ) {
      merged.examples = cambridgeData.examples;
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

    // Merge register information
    if (cambridgeData.register && cambridgeData.register.length > 0) {
      merged.register = [...(merged.register || []), ...cambridgeData.register];
    }

    // Merge regional variants
    if (
      cambridgeData.regional_variants &&
      cambridgeData.regional_variants.length > 0
    ) {
      merged.regional_variants = [
        ...(merged.regional_variants || []),
        ...cambridgeData.regional_variants,
      ];
    }

    // Merge relationships
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

    console.log(`\n📁 Adding ${entries.length} entries to dictionary files...`);

    for (const entryResult of entries) {
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
      console.log(
        `⚠️  Word "${entry.word}" (${entry.partOfSpeech}) already exists in ${targetFile}`
      );
      return false;
    }

    // Add entry
    const newEntry = [entry.id, entry];
    fileData.entries.push(newEntry);

    // Write updated file
    await this.writeDictionaryFile(targetPath, fileData, entry.partOfSpeech);

    console.log(`✅ Added "${entry.word}" to ${targetFile}`);
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
        console.warn(
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
    console.log(`📝 Created new dictionary file: ${fileName}.js`);
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
          console.warn(
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
    if (verb_phrases && Array.isArray(verb_phrases)) {
      entryData.verb_phrases = verb_phrases;
      console.log(`  ✅ Added ${verb_phrases.length} verb phrases`);
    }
  }

  /**
   * Apply noun-specific fields
   * @param {Object} entryData - The entry data object to modify
   * @param {Object} fields - Noun-specific fields
   */
  applyNounFields(entryData, { plural_form, noun_articles, noun_phrases }) {
    if (plural_form) {
      entryData.plural_form = plural_form;
      console.log(`  ✅ Added plural form: ${plural_form}`);
    }

    if (noun_articles && typeof noun_articles === "object") {
      entryData.noun_articles = noun_articles;
      const articleCount = Object.keys(noun_articles).length;
      console.log(`  ✅ Added ${articleCount} noun articles`);
    }

    if (noun_phrases && Array.isArray(noun_phrases)) {
      entryData.noun_phrases = noun_phrases;
      console.log(`  ✅ Added ${noun_phrases.length} noun phrases`);
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
      console.log(`  ✅ Added ${formCount} adjective forms`);
    }

    if (adjective_phrases && Array.isArray(adjective_phrases)) {
      entryData.adjective_phrases = adjective_phrases;
      console.log(`  ✅ Added ${adjective_phrases.length} adjective phrases`);
    }
  }
}

// Export default instance
export default new DefinitionGenerator();
