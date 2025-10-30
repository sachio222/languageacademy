/**
 * Configurable word normalization rules
 * Extracted from hardcoded logic for better maintainability
 */

// Constants for normalization rules
const NORMALIZATION_WORDS = {
  LEUR: "leur",
  ADJECTIVES: ["meilleur", "même", "orange"],
  SAVOIR: "savoir"
};

const SOURCE_TYPES = {
  PRONOUNS: "pronouns",
  ADJECTIVES: "adjectives", 
  VERBS: "verbs"
};

const PART_OF_SPEECH_TYPES = {
  NOUN: "noun",
  PRONOUN: "pronoun",
  ADJECTIVE: "adjective",
  VERB: "verb"
};

/**
 * Create a part of speech mapper function
 */
const createPartOfSpeechMapper = (sourceType, fromPos, toPos) => (pos, index, allSources) => {
  const source = allSources[index];
  if (source === sourceType && pos === fromPos) {
    return toPos;
  }
  return pos;
};

/**
 * Word normalization rules configuration
 */
export const WORD_NORMALIZATION_RULES = [
  {
    condition: (word) => word.word === NORMALIZATION_WORDS.LEUR,
    action: (word) => {
      const mapper = createPartOfSpeechMapper(SOURCE_TYPES.PRONOUNS, PART_OF_SPEECH_TYPES.NOUN, PART_OF_SPEECH_TYPES.PRONOUN);
      word.allPartsOfSpeech = word.allPartsOfSpeech.map((pos, index) => mapper(pos, index, word.allSources));
    }
  },
  {
    condition: (word) => NORMALIZATION_WORDS.ADJECTIVES.includes(word.word),
    action: (word) => {
      const mapper = createPartOfSpeechMapper(SOURCE_TYPES.ADJECTIVES, PART_OF_SPEECH_TYPES.NOUN, PART_OF_SPEECH_TYPES.ADJECTIVE);
      word.allPartsOfSpeech = word.allPartsOfSpeech.map((pos, index) => mapper(pos, index, word.allSources));
    }
  },
  {
    condition: (word) => word.word === NORMALIZATION_WORDS.SAVOIR,
    action: (word) => {
      const mapper = createPartOfSpeechMapper(SOURCE_TYPES.VERBS, PART_OF_SPEECH_TYPES.NOUN, PART_OF_SPEECH_TYPES.VERB);
      word.allPartsOfSpeech = word.allPartsOfSpeech.map((pos, index) => mapper(pos, index, word.allSources));
    }
  }
];

/**
 * Apply all normalization rules to a word
 */
export const applyWordNormalizationRules = (word) => {
  if (!word.allPartsOfSpeech) {
    return word;
  }

  // Apply each rule that matches the condition
  WORD_NORMALIZATION_RULES.forEach(rule => {
    if (rule.condition(word)) {
      rule.action(word);
    }
  });

  // Set the primary part of speech to the first one
  word.partOfSpeech = word.allPartsOfSpeech[0];
  
  return word;
};
