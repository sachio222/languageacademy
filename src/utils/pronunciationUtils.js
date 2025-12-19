/**
 * Pronunciation Utilities
 * Syllable detection, phoneme tips, and pronunciation helpers
 */

/**
 * French syllable patterns for common words
 * Maps words to their syllable breakdowns
 */
const SYLLABLE_MAP = {
  // Greetings
  bonjour: ["bon", "jour"],
  bonsoir: ["bon", "soir"],
  merci: ["mer", "ci"],
  salut: ["sa", "lut"],

  // Common words
  "au revoir": ["au", "re", "voir"],
  "s'il vous plaît": ["s'il", "vous", "plaît"],
  pardon: ["par", "don"],

  // Verbs
  "je suis": ["je", "suis"],
  "tu es": ["tu", "es"],
  "il est": ["il", "est"],

  // Words with French sounds
  rouge: ["rouge"],
  trois: ["trois"],
  rue: ["rue"],
  bon: ["bon"],
  vin: ["vin"],
  un: ["un"],
  pain: ["pain"],
  tu: ["tu"],
  lune: ["lune"],
  plus: ["plus"],
  comment: ["com", "ment"],
  "très bien": ["très", "bien"],
  "peut-être": ["peut", "être"],
  beaucoup: ["beau", "coup"],
  temps: ["temps"],
  nuit: ["nuit"],
};

/**
 * Detect syllables for a French word/phrase
 * Uses known patterns, falls back to simple heuristics
 */
export const detectSyllables = (text) => {
  const normalized = text.toLowerCase().trim();

  // Check if we have a known pattern
  if (SYLLABLE_MAP[normalized]) {
    return SYLLABLE_MAP[normalized];
  }

  // Simple fallback: split on spaces for phrases
  if (normalized.includes(" ")) {
    return normalized.split(" ");
  }

  // Single word fallback: return as one syllable
  return [normalized];
};

/**
 * Map phoneme errors to actionable tips
 */
const PHONEME_TIPS = {
  // French R
  ʁ: {
    name: "French R",
    tip: "Softer than English R - make it in the back of your throat, like gargling gently",
    example: "rouge, Paris, merci",
  },

  // Nasal vowels
  ɔ̃: {
    name: "Nasal ON",
    tip: "Don't pronounce the 'n' - let the air flow through your nose",
    example: "bon, bonjour",
  },
  ɛ̃: {
    name: "Nasal IN",
    tip: "Nasal sound - don't close with 'n'",
    example: "vin, pain",
  },
  œ̃: {
    name: "Nasal UN",
    tip: "Round your lips and let air through nose",
    example: "un, parfum",
  },
  ɑ̃: {
    name: "Nasal AN",
    tip: "Open mouth, nasal - don't say the 'n'",
    example: "comment, temps",
  },

  // French U
  y: {
    name: "French U",
    tip: "Pucker your lips like saying 'oo' but say 'ee' - unique to French!",
    example: "tu, lune, plus",
  },

  // EU sound
  ø: {
    name: "EU (closed)",
    tip: 'Round lips, say "ay" - between "uh" and "oh"',
    example: "peu, bleu",
  },
  œ: {
    name: "EU (open)",
    tip: 'Like saying "uh" with rounded lips',
    example: "peur, sœur",
  },
};

/**
 * Get tip for a specific phoneme
 */
export const getPhonemeTip = (phoneme) => {
  return (
    PHONEME_TIPS[phoneme] || {
      name: phoneme,
      tip: "Practice this sound",
      example: "",
    }
  );
};

/**
 * Map Azure phoneme symbols to simplified display
 * Azure might return complex IPA, we want clean display
 */
export const simplifyPhoneme = (phoneme) => {
  // Remove stress markers and diacritics for display
  return phoneme.replace(/[ˈˌ]/g, "");
};

/**
 * Determine if a score needs improvement
 * Passing threshold is 80
 */
export const needsImprovement = (score) => {
  return score < 80;
};

/**
 * Get encouraging message based on score AND syllable breakdown
 * Don't claim "perfect" if any syllable is struggling
 */
export const getEncouragingMessage = (score, syllableResults, attempt = 1) => {
  // Check if ANY syllable is below 80 (passing threshold)
  const hasWeakSyllable = syllableResults.some(
    (s) => s.score !== null && s.score < 80
  );

  // Messages for each tier with variations
  const messages = {
    excellent: [
      "Perfect! Native-like pronunciation! 🎉",
      "Incredible! You sound like a native speaker!",
      "Outstanding! Flawless pronunciation!",
    ],
    great: [
      "Excellent! Just tiny details to polish.",
      "Great work! Almost perfect.",
      "Superb! You're really nailing this.",
    ],
    good: [
      "Nice! Keep practicing to perfect it.",
      "Good job! You're getting there.",
      "Well done! A bit more practice and you'll have it.",
    ],
    okay: [
      "Getting closer! Focus on the highlighted sounds.",
      "You're improving! Work on the weak syllables.",
      "Making progress! Pay attention to the colored areas.",
    ],
    needsWork: [
      "Keep at it! Focus on one syllable at a time.",
      "Don't give up! Listen closely and try again.",
      "Practice makes perfect! Try focusing on each sound.",
    ],
  };

  // Select message based on score
  let tier;
  if (score >= 90 && !hasWeakSyllable) {
    tier = "excellent";
  } else if (score >= 80) {
    tier = hasWeakSyllable ? "good" : "great";
  } else if (score >= 70) {
    tier = "good";
  } else if (score >= 50) {
    tier = "okay";
  } else {
    tier = "needsWork";
  }

  // Pick a message based on attempt number for variety
  const tierMessages = messages[tier];
  return tierMessages[attempt % tierMessages.length];
};

/**
 * Match phonemes to syllables (approximate)
 * This helps us know which phonemes belong to which syllable
 */
export const mapPhonemesToSyllables = (phonemes, syllables, word) => {
  // For now, simple distribution based on length
  const phonemesPerSyllable = Math.ceil(phonemes.length / syllables.length);

  return syllables.map((syllable, idx) => {
    const start = idx * phonemesPerSyllable;
    const end = start + phonemesPerSyllable;
    const syllablePhonemes = phonemes.slice(start, end);

    // Calculate average score for this syllable
    const avgScore =
      syllablePhonemes.length > 0
        ? syllablePhonemes.reduce((sum, p) => sum + p.accuracy, 0) /
          syllablePhonemes.length
        : 100;

    return {
      text: syllable,
      score: avgScore,
      phonemes: syllablePhonemes,
    };
  });
};
