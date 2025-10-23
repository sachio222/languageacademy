// Text regex detection utilities
// Handles regex patterns and detection logic for text formatting

// ============================================================================
// REGEX PATTERNS
// ============================================================================

/**
 * Pattern for speaker labels using **Speaker:** syntax
 * Matches: **Marc:**, **Sophie:**, etc.
 */
export const SPEAKER_PATTERN = /^\*\*([^:]+):\*\*/;

/**
 * Pattern for subheaders using ## syntax
 * Matches: ## Ce soir au café:, ## Scene 1:, etc.
 */
export const SUBHEADER_PATTERN = /^##\s+(.+)$/;

/**
 * Pattern for horizontal rules using --- syntax
 * Matches: ---
 */
export const HORIZONTAL_RULE_PATTERN = /^---$/;

/**
 * Pattern for French words (including accented characters)
 * Matches: bonjour, français, café, etc.
 */
export const WORD_PATTERN = /^([a-zàâäæçéèêëïîôùûüœ']+)/i;

/**
 * Pattern for italic text using *text* syntax
 * Matches: *Vingt mille lieues sous les mers*, *Le Comte de Monte-Cristo*, etc.
 */
export const ITALIC_PATTERN = /^\*([^*]+)\*/;

// ============================================================================
// DETECTION FUNCTIONS
// ============================================================================

/**
 * Check if text starts with a speaker label
 * @param {string} text - The text to check
 * @returns {RegExpMatchArray|null} - The match result or null
 */
export const checkSpeakerMatch = (text) => {
  try {
    return text.match(SPEAKER_PATTERN);
  } catch (error) {
    console.error("Error checking speaker match:", error);
    return null;
  }
};

/**
 * Check if text starts with a subheader
 * @param {string} text - The text to check
 * @returns {RegExpMatchArray|null} - The match result or null
 */
export const checkSubheaderMatch = (text) => {
  try {
    return text.match(SUBHEADER_PATTERN);
  } catch (error) {
    console.error("Error checking subheader match:", error);
    return null;
  }
};

/**
 * Check if text is a horizontal rule
 * @param {string} text - The text to check
 * @returns {RegExpMatchArray|null} - The match result or null
 */
export const checkHorizontalRuleMatch = (text) => {
  try {
    return text.match(HORIZONTAL_RULE_PATTERN);
  } catch (error) {
    console.error("Error checking horizontal rule match:", error);
    return null;
  }
};

/**
 * Check if text starts with a French word
 * @param {string} text - The text to check
 * @returns {RegExpMatchArray|null} - The match result or null
 */
export const checkWordMatch = (text) => {
  try {
    return text.match(WORD_PATTERN);
  } catch (error) {
    console.error("Error checking word match:", error);
    return null;
  }
};

/**
 * Check if text starts with italic formatting
 * @param {string} text - The text to check
 * @returns {RegExpMatchArray|null} - The match result or null
 */
export const checkItalicMatch = (text) => {
  try {
    return text.match(ITALIC_PATTERN);
  } catch (error) {
    console.error("Error checking italic match:", error);
    return null;
  }
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Extract dialogue text by removing speaker label
 * @param {string} text - The full text with speaker
 * @returns {string} - The dialogue text without speaker label
 */
export const extractDialogue = (text) => {
  return text.replace(/^\*\*[^:]+:\*\*\s*/, "");
};

/**
 * Generate unique key for text elements
 * @param {number} paragraphIndex - The paragraph index
 * @param {number} charPosition - The character position
 * @param {string} type - The type of element (optional)
 * @returns {string} - Unique key
 */
export const generateTextKey = (paragraphIndex, charPosition, type = "") => {
  return `p${paragraphIndex}-c${charPosition}${type ? `-${type}` : ""}`;
};
