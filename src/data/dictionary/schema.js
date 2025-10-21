/**
 * Dictionary Schema Definitions
 * Multi-language vocabulary database schema for future migration to MongoDB/Neo4j
 */

/**
 * Word Entry Schema - Individual words with comprehensive metadata
 */
export const WordSchema = {
  id: "string", // unique-word-id (e.g., "livre-fr")
  language: "string", // ISO 639-1 language codes (fr, en, es, etc.)
  word: "string", // actual word/phrase text
  
  // Language-specific metadata
  gender: "string", // masculine|feminine|neutral|none
  partOfSpeech: "string", // noun|verb|adjective|adverb|pronoun|article|preposition|conjunction|expression|etc
  conjugationGroup: "string", // er|ir|re|irregular|none (for verbs)
  
  // Variants and forms
  variants: [{
    type: "string", // formal|informal|slang|regional|archaic|plural|feminine|contracted
    text: "string", // variant text
    region: "string", // optional: Quebec|Belgium|etc
    note: "string" // optional explanation
  }],
  
  // Cross-language translations
  translations: [{
    language: "string", // target language code
    text: "string", // translation text
    definition: "string", // detailed explanation
    context: "string", // formal|informal|technical|etc
    confidence: "number" // 0-1 translation accuracy
  }],
  
  // Relationships within same language and across languages
  relationships: [{
    type: "string", // conjugation_pair|related_verb|gender_pair|plural_form|synonym|antonym|cognate|false_friend|etc
    targetId: "string", // target word ID
    language: "string", // optional: relationship language
    note: "string", // explanation
    strength: "number" // optional: 0-1 relationship strength
  }],
  
  // Learning metadata
  frequency: {
    rank: "number", // 1-10000 global frequency ranking
    score: "number", // 0-1 normalized frequency score
    corpus: "string", // google_books|wikipedia|news|spoken|academic
    perMillion: "number", // occurrences per million words
    percentile: "number" // vocabulary percentile
  },
  difficulty: "number", // 1-5 for lesson progression
  cefr_level: "string", // A1|A2|B1|B2|C1|C2
  
  // Usage examples in original language
  examples: [{
    text: "string", // usage example
    translation: "string", // english translation
    context: "string" // formal|informal|written|spoken
  }],
  
  // Phonetics and pronunciation
  phonetic: "string", // IPA notation
  audio: "string", // filename.mp3
  syllables: ["string"], // syllable breakdown
  
  // Tonal language support (Chinese, Vietnamese, Thai, etc.)
  tones: [{
    syllable: "string", // syllable text
    tone: "number", // tone number
    toneMarker: "string" // marked syllable
  }],
  
  // Character-based writing systems
  characters: {
    simplified: "string", // Simplified Chinese
    traditional: "string", // Traditional Chinese
    hiragana: "string", // Japanese
    katakana: "string", // Japanese
    kanji: "string", // Japanese/Chinese characters
    hangul: "string", // Korean
    radicals: ["string"], // character components/radicals
    strokeCount: "number",
    strokeOrder: ["string"] // SVG files for stroke animation
  },
  
  // Categorization
  tags: ["string"], // beginner|formal|colloquial|business|academic|etc
  semantic_field: "string", // family|food|travel|business|etc
  
  // Metadata
  created_at: "string", // timestamp
  updated_at: "string", // timestamp
  source: "string", // lesson|import|manual
  verified: "boolean"
};

/**
 * Phrase Entry Schema - Multi-word expressions with component decomposition
 */
export const PhraseSchema = {
  id: "string", // unique-phrase-id
  language: "string", // ISO 639-1 language codes
  phrase: "string", // complete phrase text
  
  // Phrase decomposition
  components: [{
    wordId: "string", // reference to word in dictionary
    position: "number", // position in phrase
    text: "string", // actual word in phrase
    role: "string" // subject|verb|object|article|preposition|etc
  }],
  
  // Cross-language translations
  translations: [{
    language: "string", // target language
    text: "string", // phrase translation
    definition: "string", // detailed explanation of meaning
    context: "string", // formal|informal|technical|etc
    confidence: "number" // 0-1 translation accuracy
  }],
  
  // Phrase classification
  type: "string", // expression|idiom|compound|collocation|fixed_phrase|greeting|question|etc
  semantic_field: "string", // greeting|politeness|travel|business|academic|etc
  
  // Variants and forms (like "je ne sais pas" → "j'sais pas" → "chais pas")
  variants: [{
    type: "string", // formal|informal|colloquial|regional|archaic
    text: "string", // variant phrase text
    components: ["string"], // component words
    register: "string", // formality level
    region: "string", // optional regional info
    note: "string" // explanation of variant
  }],
  
  // Learning metadata
  frequency: "number", // 1-100 phrase commonality
  difficulty: "number", // 1-5 complexity for learners
  cefr_level: "string", // A1|A2|B1|B2|C1|C2
  
  // Usage examples and context
  examples: [{
    text: "string", // usage example with phrase
    translation: "string", // english translation
    context: "string" // formal|informal|written|spoken
  }],
  
  // Relationships to other phrases and words
  relationships: [{
    type: "string", // synonym_phrase|antonym_phrase|related_phrase|cognate_phrase
    targetId: "string", // target phrase/word ID
    language: "string", // relationship language
    note: "string" // explanation
  }],
  
  // Phonetics and pronunciation
  phonetic: "string", // IPA notation for entire phrase
  audio: "string", // filename.mp3
  stress_pattern: ["number"], // syllable stress levels
  
  // Categorization
  tags: ["string"], // beginner|essential|polite|greeting|question|etc
  
  // Metadata
  created_at: "string", // timestamp
  updated_at: "string", // timestamp
  source: "string", // lesson|import|manual
  verified: "boolean"
};

/**
 * Language Metadata Schema
 */
export const LanguageSchema = {
  code: "string", // ISO 639-1 (fr, en, es, etc.)
  name: "string", // French, English, Spanish
  nativeName: "string", // Français, English, Español
  family: "string", // Romance, Germanic, Slavic, etc.
  script: "string", // Latin, Cyrillic, Arabic, etc.
  rtl: "boolean", // right-to-left writing
  hasGender: "boolean",
  hasConjugation: "boolean",
  wordOrder: "string", // SVO|SOV|VSO|etc
  difficulty: "number" // 1-5 relative difficulty for English speakers
};

/**
 * Learning Progress Schema (for future user progress tracking)
 */
export const ProgressSchema = {
  userId: "string",
  wordId: "string",
  languagePair: "string", // source-target (e.g., "fr-en")
  mastery: "number", // 0-100 confidence score
  encounters: "number", // times seen
  correct: "number", // correct answers
  lastSeen: "string", // timestamp
  nextReview: "string", // timestamp for spaced repetition
  context: ["string"], // lesson IDs where encountered
  mistakes: [{
    answer: "string", // wrong answer given
    timestamp: "string", // when mistake occurred
    context: "string" // lesson ID
  }]
};

/**
 * Audio and Media Schema
 */
export const MediaSchema = {
  id: "string", // media-id
  type: "string", // audio|image|video
  url: "string", // path/to/file
  language: "string", // language code
  speaker: {
    gender: "string", // male|female
    age: "string", // young|adult|elderly
    accent: "string", // Parisian|Quebec|Belgian|etc
    speed: "string" // slow|normal|fast
  },
  quality: "string", // studio|native|synthetic
  duration: "number" // seconds for audio
};

/**
 * Cultural Context Schema
 */
export const CulturalContextSchema = {
  id: "string", // context-id
  type: "string", // cultural|historical|regional
  description: "string", // explanation of cultural significance
  region: "string", // France|Quebec|Belgium|etc
  timeframe: "string", // modern|historical|archaic
  formality: "string", // very_formal|formal|neutral|informal|very_informal
  usage_notes: "string" // when and how to use appropriately
};

/**
 * Enhanced Relationship Types
 */
export const RelationshipTypes = {
  // Word-to-word relationships
  CONJUGATION_PAIR: "conjugation_pair", // tu form of être
  RELATED_VERB: "related_verb", // derived from être
  GENDER_PAIR: "gender_pair", // feminine form
  PLURAL_FORM: "plural_form", // plural of word
  SYNONYM: "synonym", // similar meaning
  ANTONYM: "antonym", // opposite meaning
  COGNATE: "cognate", // similar etymology across languages
  FALSE_FRIEND: "false_friend", // looks similar but different meaning
  ETYMOLOGY: "etymology", // word origin
  PHONETIC_SIMILAR: "phonetic_similar", // sounds like but different meaning
  ORTHOGRAPHIC_SIMILAR: "orthographic_similar", // spelled similarly
  SEMANTIC_FIELD: "semantic_field", // same topic/domain
  COLLOCATES_WITH: "collocates_with", // commonly used together
  REGISTER_VARIANT: "register_variant", // formal/informal equivalent
  TEMPORAL_VARIANT: "temporal_variant", // modern/archaic equivalent
  
  // Phrase-to-phrase relationships
  SYNONYM_PHRASE: "synonym_phrase", // similar meaning phrase
  ANTONYM_PHRASE: "antonym_phrase", // opposite meaning phrase
  RELATED_PHRASE: "related_phrase", // thematically related
  COGNATE_PHRASE: "cognate_phrase" // similar structure/etymology
};

export default {
  WordSchema,
  PhraseSchema,
  LanguageSchema,
  ProgressSchema,
  MediaSchema,
  CulturalContextSchema,
  RelationshipTypes
};

