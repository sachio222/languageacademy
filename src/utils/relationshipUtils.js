/**
 * Relationship generation utilities for dictionary words
 */

import { 
  generateRelationshipsFromField, 
  generateRelationshipsToField 
} from './relationshipPatterns';

/**
 * Generate relationships from infinitive field (conjugation → infinitive)
 */
export const generateInfinitiveRelationships = (word, allWords) => {
  return generateRelationshipsFromField(
    word, 
    allWords, 
    'infinitive', 
    'conjugation_pair', 
    () => 'infinitive form'
  );
};

/**
 * Generate relationships from infinitive to conjugations (infinitive → conjugations)
 */
export const generateConjugationRelationships = (word, allWords) => {
  if (word.partOfSpeech !== "verb") {
    return [];
  }

  // For infinitive entries, find all conjugations that point to this word
  const conjugations = allWords.filter((w) => {
    return (
      w.infinitive && w.infinitive.toLowerCase() === word.word.toLowerCase()
    );
  });

  return conjugations.map((conj) => {
    // Use existing person/tense data if available
    let person = conj.person;
    let tense = conj.tense;

    // If not available, try to detect from word patterns
    if (!person || !tense) {
      const detected = detectPersonAndTense(conj, word);
      person = person || detected.person;
      tense = tense || detected.tense;
    }

    // Format the note preserving the detailed person info
    const note = `${tense} - ${person}`;

    return {
      type: "conjugation_pair",
      targetId: conj.id,
      targetWord: conj.word,
      note: note,
    };
  });
};

/**
 * Detect person and tense from word patterns
 */
const detectPersonAndTense = (word, infinitive) => {
  const wordText = word.word.toLowerCase();
  const infinitiveText = infinitive.word.toLowerCase();

  // Present tense patterns for -er verbs
  if (infinitiveText.endsWith("er")) {
    if (wordText === infinitiveText)
      return { tense: "present", person: "je/il/elle" };
    if (wordText === infinitiveText.slice(0, -2) + "es")
      return { tense: "present", person: "tu" };
    if (wordText === infinitiveText.slice(0, -2) + "ons")
      return { tense: "present", person: "nous" };
    if (wordText === infinitiveText.slice(0, -2) + "ez")
      return { tense: "present", person: "vous" };
    if (wordText === infinitiveText.slice(0, -2) + "ent")
      return { tense: "present", person: "ils/elles" };
  }

  // Past tense patterns (avoir + past participle)
  if (
    wordText.includes("parlé") ||
    wordText.includes("eu") ||
    wordText.includes("vu")
  ) {
    if (wordText.startsWith("ai ")) return { tense: "past", person: "je" };
    if (wordText.startsWith("as ")) return { tense: "past", person: "tu" };
    if (wordText.startsWith("a ")) return { tense: "past", person: "il/elle" };
    if (wordText.startsWith("avons ")) return { tense: "past", person: "nous" };
    if (wordText.startsWith("avez ")) return { tense: "past", person: "vous" };
    if (wordText.startsWith("ont "))
      return { tense: "past", person: "ils/elles" };
  }

  // Future tense patterns
  if (wordText.endsWith("ai") && infinitiveText.endsWith("er")) {
    return { tense: "future", person: "je" };
  }
  if (wordText.endsWith("as") && infinitiveText.endsWith("er")) {
    return { tense: "future", person: "tu" };
  }
  if (wordText.endsWith("a") && infinitiveText.endsWith("er")) {
    return { tense: "future", person: "il/elle" };
  }
  if (wordText.endsWith("ons") && infinitiveText.endsWith("er")) {
    return { tense: "future", person: "nous" };
  }
  if (wordText.endsWith("ez") && infinitiveText.endsWith("er")) {
    return { tense: "future", person: "vous" };
  }
  if (wordText.endsWith("ont") && infinitiveText.endsWith("er")) {
    return { tense: "future", person: "ils/elles" };
  }

  return { tense: "present", person: "all" };
};

/**
 * Generate relationships from base_word field (adjective forms → base form)
 */
export const generateBaseWordRelationships = (word, allWords) => {
  return generateRelationshipsFromField(
    word, 
    allWords, 
    'base_word', 
    'adjective_form', 
    () => 'base form'
  );
};

/**
 * Generate relationships from base word to all forms (base → adjective forms)
 */
export const generateAdjectiveFormRelationships = (word, allWords) => {
  if (word.partOfSpeech !== "adjective") {
    return [];
  }

  // Find all adjective forms that point to this word as base_word
  const forms = allWords.filter((w) => {
    return w.base_word && w.base_word.toLowerCase() === word.word.toLowerCase();
  });

  return forms.map((form) => {
    // Use existing gender/number data if available
    let gender = form.gender;
    let number = form.number;

    // Format the note with gender and number info
    const note = `${gender} ${number}`;

    return {
      type: "adjective_form",
      targetId: form.id,
      targetWord: form.word,
      note: note,
    };
  });
};

/**
 * Generate relationships from base_word field (noun forms → base form)
 */
export const generateNounBaseWordRelationships = (word, allWords) => {
  if (!word.base_word) {
    return [];
  }

  // Find the base word
  const baseWord = allWords.find(
    (w) => w.word.toLowerCase() === word.base_word.toLowerCase()
  );

  if (baseWord) {
    return [
      {
        type: "noun_form",
        targetId: baseWord.id,
        targetWord: baseWord.word,
        note: "singular form",
      },
    ];
  }
  return [];
};

/**
 * Generate relationships from base word to all forms (base → noun forms)
 */
export const generateNounFormRelationships = (word, allWords) => {
  if (word.partOfSpeech !== "noun") {
    return [];
  }

  // Find all noun forms that point to this word as base_word
  const forms = allWords.filter((w) => {
    return w.base_word && w.base_word.toLowerCase() === word.word.toLowerCase();
  });

  return forms.map((form) => {
    // Use existing gender/number data if available
    let gender = form.gender;
    let number = form.number;

    // Format the note with gender and number info
    const note = `${gender} ${number}`;

    return {
      type: "noun_form",
      targetId: form.id,
      targetWord: form.word,
      note: note,
    };
  });
};

/**
 * Generate all relationships for a word using optimized lookups
 */
export const generateAllRelationships = (word, wordMaps) => {
  const { byId, byInfinitive, byBaseWord, byWordText } = wordMaps;

  // Generate infinitive relationships (conjugation → infinitive)
  const infinitiveRelationships = generateInfinitiveRelationshipsOptimized(word, byInfinitive);

  // Generate conjugation relationships (infinitive → conjugations)
  const conjugationRelationships = generateConjugationRelationshipsOptimized(word, byInfinitive);

  // Generate base word relationships (adjective forms → base form)
  const baseWordRelationships = generateBaseWordRelationshipsOptimized(word, byBaseWord);

  // Generate adjective form relationships (base → adjective forms)
  const adjectiveFormRelationships = generateAdjectiveFormRelationshipsOptimized(word, byBaseWord);

  // Generate base word relationships (noun forms → base form)
  const nounBaseWordRelationships = generateNounBaseWordRelationshipsOptimized(word, byBaseWord);

  // Generate noun form relationships (base → noun forms)
  const nounFormRelationships = generateNounFormRelationshipsOptimized(word, byBaseWord);

  // Combine with existing relationships
  const existingRelationships = word.relationships || [];
  const allRelationships = [
    ...existingRelationships,
    ...infinitiveRelationships,
    ...conjugationRelationships,
    ...baseWordRelationships,
    ...adjectiveFormRelationships,
    ...nounBaseWordRelationships,
    ...nounFormRelationships,
  ];

  // Remove duplicates based on targetId
  const uniqueRelationships = allRelationships.filter(
    (rel, index, arr) =>
      arr.findIndex((r) => r.targetId === rel.targetId) === index
  );

  return uniqueRelationships;
};

/**
 * Create optimized lookup maps for O(1) relationship generation
 */
export const createWordMaps = (allWords) => {
  const byId = new Map();
  const byInfinitive = new Map();
  const byBaseWord = new Map();
  const byWordText = new Map();

  allWords.forEach(word => {
    byId.set(word.id, word);
    byWordText.set(word.word.toLowerCase(), word);

    if (word.infinitive) {
      const key = word.infinitive.toLowerCase();
      if (!byInfinitive.has(key)) {
        byInfinitive.set(key, []);
      }
      byInfinitive.get(key).push(word);
    }

    if (word.base_word) {
      const key = word.base_word.toLowerCase();
      if (!byBaseWord.has(key)) {
        byBaseWord.set(key, []);
      }
      byBaseWord.get(key).push(word);
    }
  });

  return { byId, byInfinitive, byBaseWord, byWordText };
};

/**
 * Optimized infinitive relationship generation
 */
const generateInfinitiveRelationshipsOptimized = (word, byInfinitive) => {
  if (!word.infinitive) return [];

  const infinitiveWords = byInfinitive.get(word.infinitive.toLowerCase());
  if (!infinitiveWords || infinitiveWords.length === 0) return [];

  return infinitiveWords.map(infinitiveWord => ({
    type: "conjugation_pair",
    targetId: infinitiveWord.id,
    targetWord: infinitiveWord.word,
    note: "infinitive form",
  }));
};

/**
 * Optimized conjugation relationship generation
 */
const generateConjugationRelationshipsOptimized = (word, byInfinitive) => {
  if (word.partOfSpeech !== "verb") return [];

  const conjugations = byInfinitive.get(word.word.toLowerCase());
  if (!conjugations || conjugations.length === 0) return [];

  return conjugations.map(conj => {
    let person = conj.person;
    let tense = conj.tense;

    if (!person || !tense) {
      const detected = detectPersonAndTense(conj, word);
      person = person || detected.person;
      tense = tense || detected.tense;
    }

    return {
      type: "conjugation_pair",
      targetId: conj.id,
      targetWord: conj.word,
      note: `${tense} - ${person}`,
    };
  });
};

/**
 * Optimized base word relationship generation
 */
const generateBaseWordRelationshipsOptimized = (word, byBaseWord) => {
  if (!word.base_word) return [];

  const baseWords = byBaseWord.get(word.base_word.toLowerCase());
  if (!baseWords || baseWords.length === 0) return [];

  return baseWords.map(baseWord => ({
    type: "adjective_form",
    targetId: baseWord.id,
    targetWord: baseWord.word,
    note: "base form",
  }));
};

/**
 * Optimized adjective form relationship generation
 */
const generateAdjectiveFormRelationshipsOptimized = (word, byBaseWord) => {
  if (word.partOfSpeech !== "adjective") return [];

  const forms = byBaseWord.get(word.word.toLowerCase());
  if (!forms || forms.length === 0) return [];

  return forms.map(form => ({
    type: "adjective_form",
    targetId: form.id,
    targetWord: form.word,
    note: `${form.gender} ${form.number}`,
  }));
};

/**
 * Optimized noun base word relationship generation
 */
const generateNounBaseWordRelationshipsOptimized = (word, byBaseWord) => {
  if (!word.base_word) return [];

  const baseWords = byBaseWord.get(word.base_word.toLowerCase());
  if (!baseWords || baseWords.length === 0) return [];

  return baseWords.map(baseWord => ({
    type: "noun_form",
    targetId: baseWord.id,
    targetWord: baseWord.word,
    note: "singular form",
  }));
};

/**
 * Optimized noun form relationship generation
 */
const generateNounFormRelationshipsOptimized = (word, byBaseWord) => {
  if (word.partOfSpeech !== "noun") return [];

  const forms = byBaseWord.get(word.word.toLowerCase());
  if (!forms || forms.length === 0) return [];

  return forms.map(form => ({
    type: "noun_form",
    targetId: form.id,
    targetWord: form.word,
    note: `${form.gender} ${form.number}`,
  }));
};
