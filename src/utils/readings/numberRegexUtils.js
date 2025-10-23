// Number detection and validation utilities
// Handles regex patterns and validation logic for numbers and years

// ============================================================================
// REGEX PATTERNS
// ============================================================================

/**
 * Pattern for explicitly marked years using {year} syntax
 * Matches: {2024}, {1995}, {95}, {1776}, etc.
 */
export const EXPLICIT_YEAR_PATTERN = /^\{(\d{1,4})\}/;

/**
 * Pattern for regular numbers (any sequence of digits)
 * Matches: 2024, 1995, 95, 1776, etc.
 */
export const NUMBER_PATTERN = /^(\d+)/;

/**
 * Pattern for explicitly marked phrases using [phrase] syntax
 * Matches: [bonjour tout le monde], [comment allez-vous], etc.
 */
export const EXPLICIT_PHRASE_PATTERN = /^\[([^\]]+)\]/;

// ============================================================================
// VALIDATION FUNCTIONS
// ============================================================================

/**
 * Validate if a year number is reasonable for explicit year marking
 * If it's wrapped in braces, it's explicitly marked as a year regardless of length
 * @param {string} yearStr - The year string to validate
 * @param {number} yearNum - The numeric value of the year
 * @returns {boolean} - Whether the year is valid
 */
export const isValidYearNumber = (yearStr, yearNum) => {
  // If it's wrapped in braces, it's explicitly marked as a year
  // Just do basic validation that it's a positive number
  return yearStr && yearStr.length > 0 && yearNum > 0;
};

/**
 * Validate if a number string is reasonable for text processing
 * @param {string} numberStr - The number string to validate
 * @param {number} numberNum - The numeric value of the number
 * @returns {boolean} - Whether the number is valid
 */
export const isValidNumber = (numberStr, numberNum) => {
  // Basic length and numeric validation
  if (!numberStr || numberStr.length < 1 || numberStr.length > 4) {
    return false;
  }

  // Range validation based on length
  switch (numberStr.length) {
    case 1:
      // 1-digit numbers: 1-9
      return numberNum >= 1 && numberNum <= 9;
    case 2:
      // 2-digit numbers: 10-99
      return numberNum >= 10 && numberNum <= 99;
    case 3:
      // 3-digit numbers: 100-999
      return numberNum >= 100 && numberNum <= 999;
    case 4:
      // 4-digit numbers: 1000-9999
      return numberNum >= 1000 && numberNum <= 9999;
    default:
      return false;
  }
};

// ============================================================================
// MATCH DETECTION FUNCTIONS
// ============================================================================

/**
 * Check if text matches explicit year pattern and extract year
 * @param {string} text - The text to check
 * @returns {Object|null} - Match result with year and full match, or null
 */
export const detectExplicitYear = (text) => {
  const match = text.match(EXPLICIT_YEAR_PATTERN);
  if (!match) return null;

  const year = match[1];
  const yearNum = parseInt(year, 10);

  if (isValidYearNumber(year, yearNum)) {
    return {
      year,
      yearNum,
      fullMatch: match[0],
      isValid: true,
    };
  }

  return null;
};

/**
 * Check if text matches number pattern and extract number
 * @param {string} text - The text to check
 * @returns {Object|null} - Match result with number and full match, or null
 */
export const detectNumber = (text) => {
  const match = text.match(NUMBER_PATTERN);
  if (!match) return null;

  const number = match[1];
  const numberNum = parseInt(number, 10);

  if (isValidNumber(number, numberNum)) {
    return {
      number,
      numberNum,
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
 * Generate unique key for number elements
 * @param {number} paragraphIndex - The paragraph index
 * @param {number} charPosition - The character position
 * @param {string} type - The type of number ('year' or 'number')
 * @returns {string} - Unique key
 */
export const generateNumberKey = (
  paragraphIndex,
  charPosition,
  type = "number"
) => {
  return `p${paragraphIndex}-c${charPosition}-${type}`;
};

/**
 * Check if a number is likely a year based on context
 * This function is very conservative for non-marked numbers to avoid false positives
 * Only treat as year if there are strong context clues
 * @param {string} number - The number string
 * @param {string} remainingText - The remaining text for context
 * @param {number} charPosition - The character position
 * @returns {boolean} - Whether the number is likely a year
 */
export const isLikelyYear = (number, remainingText, charPosition) => {
  const num = parseInt(number, 10);

  // For non-marked numbers, be VERY conservative and rely heavily on context
  // Only treat as year if there are strong context clues

  // Look for context clues that suggest this is a year
  const contextBefore = remainingText.slice(0, charPosition);
  const contextAfter = remainingText.slice(
    charPosition + number.length,
    charPosition + number.length + 10
  );

  // Check for year-related context patterns
  const yearContext =
    /(en|année|an|de|du|depuis|jusqu'à|vers|autour de)\s*$/i.test(
      contextBefore
    ) ||
    /^(av\.|apr\.|avant|après|depuis|jusqu'à|vers)/i.test(contextAfter) ||
    /(siècle|millénaire)/i.test(contextBefore) ||
    /(naissance|mort|décès|création|fondation|construction)/i.test(
      contextBefore
    );

  // Only treat as year if there are strong context clues
  return yearContext;
};
