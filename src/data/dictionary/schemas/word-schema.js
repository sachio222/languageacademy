import { z } from "zod";

/**
 * Enhanced Dictionary Schema with Zod Validation
 * Provides runtime validation, type safety, and data transformation
 *
 * Note: Contractions (like "J'ai", "c'est", "qu'est-ce que") are treated as single words
 * and should be tagged with "contraction" for proper identification.
 */

// Base schemas for reusable components
const TranslationSchema = z.object({
  lang: z.string().min(2).max(5), // ISO language codes
  text: z.string().min(1),
  definition: z.string().optional(),
  context: z
    .enum(["formal", "informal", "technical", "academic", "general"])
    .optional(),
  confidence: z.number().min(0).max(1).optional(),
  register: z
    .array(z.enum(["formal", "informal", "neutral", "colloquial", "archaic"]))
    .optional(),
  source: z
    .enum(["cambridge", "manual", "lesson", "language_academy"])
    .optional(),
});

const RelationshipSchema = z.object({
  type: z.enum([
    "synonym",
    "antonym",
    "collocation",
    "etymology",
    "related_word",
    "conjugation_pair",
    "gender_pair",
    "plural_form",
    "plural", // Added plural type
    "cognate",
    "false_friend",
    "redirect", // Added redirect type
  ]),
  targetId: z.string().optional(),
  targetWord: z.string().optional(),
  language: z.string().min(2).max(5).optional(),
  note: z.string().optional(),
  strength: z.number().min(0).max(1).optional(),
});

const RegionalVariantSchema = z.object({
  region: z.enum(["Quebec", "Belgium", "France", "Switzerland", "Africa"]),
  text: z.string().min(1),
  note: z.string().optional(),
});

const ExampleSchema = z.object({
  lang: z.string().min(2).max(5), // Target language code (e.g., "en")
  text: z.string().min(1), // The example text in the source language
  trans: z.string().optional(), // Translation of the example
  source: z.enum(["cambridge", "manual", "language_academy"]).optional(),
});

const FrequencySchema = z.object({
  rank: z.number().min(1).max(10000).optional(),
  score: z.number().min(0).max(1).optional(),
  corpus: z
    .enum(["google_books", "wikipedia", "news", "spoken", "academic", "lesson"])
    .optional(),
  perMillion: z.number().min(0).optional(),
  percentile: z.number().min(0).max(100).optional(),
});

const CambridgeDataSchema = z.object({
  scraped_at: z.string().datetime().optional(),
  url: z.string().url().optional(),
  confidence_score: z.number().min(0).max(1).optional(),
  last_updated: z.string().datetime().optional(),
});

// Main Word Schema
export const WordSchema = z.object({
  // Core fields
  id: z.string().min(1),
  lang: z.string().min(2).max(5), // ISO language codes
  word: z.string().min(1),
  definition: z.string().optional(), // French definition
  gender: z.enum(["masculine", "feminine", "neutral", "none"]).optional(),
  partOfSpeech: z.enum([
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
    "expression",
    "other",
    "unknown",
  ]),
  conjugationGroup: z.enum(["er", "ir", "re", "irregular", "none"]).optional(),

  // Redirect fields for variant entries
  redirect_to: z.string().optional(), // ID of the main entry this redirects to
  redirect_type: z
    .enum([
      "plural_form",
      "feminine_form",
      "masculine_form",
      "feminine_plural",
      "masculine_plural",
      "conjugated_form",
      "conjugation",
      "variant",
      "unknown",
    ])
    .optional(), // Type of redirect relationship
  base_word: z.string().optional(), // The base word this is a variant of
  number: z.enum(["singular", "plural"]).nullable().optional(), // Grammatical number

  // Verb-specific fields
  infinitive: z.string().optional(), // For conjugated forms, what's the infinitive?
  tense: z
    .enum([
      "present",
      "past",
      "future",
      "conditional",
      "subjunctive",
      "imperative",
      "infinitive",
      "participle",
    ])
    .optional(), // Tense of the conjugated form
  mood: z
    .enum([
      "indicative",
      "subjunctive",
      "conditional",
      "imperative",
      "infinitive",
      "participle",
    ])
    .optional(), // Mood of the conjugated form
  person: z
    .enum(["je", "tu", "il", "elle", "nous", "vous", "ils", "elles", "on"])
    .nullable()
    .optional(), // Person of the conjugated form
  number: z.enum(["singular", "plural"]).nullable().optional(), // Number of the conjugated form
  conjugation: z
    .object({
      present: z
        .object({
          je: z.string().optional(),
          tu: z.string().optional(),
          il: z.string().optional(),
          nous: z.string().optional(),
          vous: z.string().optional(),
          ils: z.string().optional(),
        })
        .optional(),
      past: z
        .object({
          je: z.string().optional(),
          tu: z.string().optional(),
          il: z.string().optional(),
          nous: z.string().optional(),
          vous: z.string().optional(),
          ils: z.string().optional(),
        })
        .optional(),
      future: z
        .object({
          je: z.string().optional(),
          tu: z.string().optional(),
          il: z.string().optional(),
          nous: z.string().optional(),
          vous: z.string().optional(),
          ils: z.string().optional(),
        })
        .optional(),
    })
    .optional(),

  // Advanced verb features
  auxiliary_verb: z.boolean().optional(), // Is this verb used as an auxiliary?
  impersonal_usage: z.array(z.string()).optional(), // Impersonal expressions like "il y a"
  idiomatic_expressions: z
    .array(
      z.object({
        expression: z.string(),
        meaning: z.string(),
        example: z.string().optional(),
      })
    )
    .optional(), // Idiomatic uses like "il n'y a qu'à"

  // Verb phrases for word detection and disambiguation
  verb_phrases: z
    .array(
      z.object({
        phrase: z.string(), // The complete phrase (e.g., "n'est pas", "il est")
        type: z.enum([
          "negation",
          "pronoun_verb",
          "question",
          "compound",
          "subjunctive",
          "compound_past",
          "imperative",
          "demonstrative_verb",
          "existential_verb",
        ]), // Type of phrase
        context: z.string().optional(), // Usage context or meaning
        frequency: z.enum(["common", "uncommon", "rare"]).optional(), // How common this phrase is
      })
    )
    .optional()
    .default([]), // Common phrases using this verb form

  // Noun-specific fields
  plural_form: z.string().optional(), // Plural form of the noun
  noun_articles: z
    .object({
      definite: z.string().optional(), // "le", "la", "l'"
      indefinite: z.string().optional(), // "un", "une"
      plural: z.string().optional(), // "les", "des"
    })
    .optional(), // Articles that go with this noun
  noun_phrases: z
    .array(
      z.object({
        phrase: z.string(), // The complete phrase (e.g., "le chat", "des chats")
        type: z.enum([
          "definite_article",
          "indefinite_article",
          "plural_article",
          "possessive",
          "demonstrative",
        ]),
        context: z.string().optional(), // Usage context
        frequency: z.enum(["common", "uncommon", "rare"]).optional(),
      })
    )
    .optional()
    .default([]), // Common noun phrases with articles

  noun_form: z.string().optional(), // Noun form if verb can be used as noun
  transitive: z.boolean().optional(), // Does it take a direct object?
  intransitive: z.boolean().optional(), // Does it not take a direct object?
  reflexive: z.boolean().optional(), // Can it be used reflexively?

  // Adjective-specific fields
  adjective_forms: z
    .object({
      masculine_singular: z.string().optional(),
      feminine_singular: z.string().optional(),
      masculine_plural: z.string().optional(),
      feminine_plural: z.string().optional(),
    })
    .optional(), // Gender and number agreement forms
  adjective_phrases: z
    .array(
      z.object({
        phrase: z.string(), // The complete phrase (e.g., "très grand", "plus belle que")
        type: z.enum([
          "intensifier",
          "comparative",
          "superlative",
          "agreement",
          "position",
        ]),
        context: z.string().optional(), // Usage context
        frequency: z.enum(["common", "uncommon", "rare"]).optional(),
      })
    )
    .optional()
    .default([]), // Common adjective phrases and constructions
  position: z.enum(["before_noun", "after_noun", "either"]).optional(), // Where it typically goes
  comparative: z.string().optional(), // Comparative form (e.g., "plus belle")
  superlative: z.string().optional(), // Superlative form (e.g., "la plus belle")
  irregular: z.boolean().optional(), // Does it have irregular forms?
  invariable: z.boolean().optional(), // Does it not change form? (like "orange")

  // Enhanced translations
  translations: z.array(TranslationSchema).optional().default([]),

  // Enhanced relationships
  relationships: z.array(RelationshipSchema).optional().default([]),

  // New fields
  etymology: z.string().optional(),
  register: z
    .array(z.enum(["formal", "informal", "neutral", "colloquial", "archaic"]))
    .optional(),
  usage_notes: z.string().optional(),
  regional_variants: z.array(RegionalVariantSchema).optional().default([]),

  // Enhanced examples
  examples: z.array(ExampleSchema).optional().default([]),

  // Phonetics
  phonetic: z.string().optional(),
  syllables: z.array(z.string()).optional(),

  // Learning metadata
  frequency: FrequencySchema.optional(),
  difficulty: z.number().min(1).max(5).optional(),
  cefr_level: z.enum(["A1", "A2", "B1", "B2", "C1", "C2"]).optional(),

  // Curriculum tracking
  unit: z.string().optional(), // e.g., "unit1", "unit2", "unit-3"
  module: z.string().optional(), // e.g., "reading", "grammar", "vocabulary", "listening"
  lesson: z.string().optional(), // e.g., "lesson1", "reading-1", "grammar-basics"

  // Learning progression
  introduced_in: z.string().optional(), // First appearance in curriculum
  mastered_in: z.string().optional(), // When student should master it
  prerequisite_words: z.array(z.string()).optional(), // Words that should be learned first
  follow_up_words: z.array(z.string()).optional(), // Words that build on this one

  // Categorization
  tags: z.array(z.string()).optional().default([]),
  semantic_field: z.string().optional(),

  // Metadata
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
  sources: z
    .array(z.enum(["cambridge", "lesson", "manual", "language_academy"]))
    .optional()
    .default([]),
  verified: z.boolean().optional().default(false),

  // Cambridge-specific data
  cambridge_data: CambridgeDataSchema.optional(),
});

// Export schemas for use in JavaScript
export {
  TranslationSchema,
  RelationshipSchema,
  RegionalVariantSchema,
  ExampleSchema,
};

// Validation helper functions
export const validateWord = (data) => {
  try {
    return {
      success: true,
      data: WordSchema.parse(data),
      errors: null,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      errors: error.errors || [error.message],
    };
  }
};

export const validateWordArray = (data) => {
  try {
    return {
      success: true,
      data: z.array(WordSchema).parse(data),
      errors: null,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      errors: error.errors || [error.message],
    };
  }
};

// Data transformation helpers
export const transformCambridgeData = (cambridgeResult) => {
  return {
    // Core required fields
    id: cambridgeResult.id,
    lang: "fr",
    word: cambridgeResult.word,
    partOfSpeech:
      cambridgeResult.partOfSpeech === "determiner"
        ? "article"
        : cambridgeResult.partOfSpeech,
    definition: cambridgeResult.definition,

    translations:
      cambridgeResult.translations?.map((trans) => ({
        lang: "en",
        text: trans,
        source: "cambridge",
        confidence: 0.9,
      })) || [],

    examples: cambridgeResult.examples || [],

    phonetic: cambridgeResult.phonetic,

    relationships: [
      ...(cambridgeResult.synonyms?.map((syn) => ({
        type: "synonym",
        targetWord: syn,
        strength: 0.8,
      })) || []),
      ...(cambridgeResult.antonyms?.map((ant) => ({
        type: "antonym",
        targetWord: ant,
        strength: 0.8,
      })) || []),
      ...(cambridgeResult.relationships || []),
    ],

    etymology: cambridgeResult.etymology || "",
    register: cambridgeResult.register || [],
    usage_notes: cambridgeResult.usage_notes || "",
    regional_variants: cambridgeResult.regional_variants || [],
    difficulty: cambridgeResult.difficulty,
    cefr_level: cambridgeResult.cefr_level,
    unit: cambridgeResult.unit,
    module: cambridgeResult.module,
    lesson: cambridgeResult.lesson,
    tags: cambridgeResult.tags || [],
    sources: ["cambridge"],
    verified: false,

    cambridge_data: {
      scraped_at: new Date().toISOString(),
      url: `https://dictionary.cambridge.org/dictionary/french-english/${cambridgeResult.word}`,
      confidence_score: 0.9,
      last_updated: new Date().toISOString(),
    },
  };
};

export default WordSchema;
