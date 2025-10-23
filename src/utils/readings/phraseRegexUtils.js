// Phrase detection and validation utilities
// Handles regex patterns and validation logic for explicit phrases

// ============================================================================
// REGEX PATTERNS
// ============================================================================

/**
 * Pattern for explicitly marked phrases using [phrase] syntax
 * Matches: [bonjour tout le monde], [comment allez-vous], etc.
 */
export const EXPLICIT_PHRASE_PATTERN = /^\[([^\]]+)\]/;

// ============================================================================
// VALIDATION FUNCTIONS
// ============================================================================

/**
 * Validate if a phrase is reasonable for explicit phrase marking
 * @param {string} phrase - The phrase string to validate
 * @returns {boolean} - Whether the phrase is valid
 */
export const isValidExplicitPhrase = (phrase) => {
  // Basic validation - phrase should not be empty and should contain letters
  return phrase && phrase.trim().length > 0 && /[a-zA-Z]/.test(phrase);
};

// ============================================================================
// MATCH DETECTION FUNCTIONS
// ============================================================================

/**
 * Check if text matches explicit phrase pattern and extract phrase
 * @param {string} text - The text to check
 * @returns {Object|null} - Match result with phrase and full match, or null
 */
export const detectExplicitPhrase = (text) => {
  const match = text.match(EXPLICIT_PHRASE_PATTERN);
  if (!match) return null;

  const phrase = match[1].trim();

  if (isValidExplicitPhrase(phrase)) {
    return {
      phrase,
      fullMatch: match[0],
      isValid: true,
    };
  }

  return null;
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Generate unique key for phrase elements
 * @param {number} paragraphIndex - The paragraph index
 * @param {number} charPosition - The character position
 * @returns {string} - Unique key
 */
export const generatePhraseKey = (paragraphIndex, charPosition) => {
  return `p${paragraphIndex}-c${charPosition}-phrase`;
};
