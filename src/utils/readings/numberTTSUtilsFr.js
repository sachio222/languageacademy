// French number conversion utilities
// Separates year pronunciation from regular number pronunciation

// ============================================================================
// SHARED DATA CONSTANTS
// ============================================================================

const ONES = [
  "",
  "un",
  "deux",
  "trois",
  "quatre",
  "cinq",
  "six",
  "sept",
  "huit",
  "neuf",
];

const TEENS = [
  "",
  "onze",
  "douze",
  "treize",
  "quatorze",
  "quinze",
  "seize",
  "dix-sept",
  "dix-huit",
  "dix-neuf",
];

const TENS = [
  "",
  "",
  "vingt",
  "trente",
  "quarante",
  "cinquante",
  "soixante",
  "soixante",
  "quatre-vingt",
  "quatre-vingt",
];

// ============================================================================
// CORE CONVERSION FUNCTIONS
// ============================================================================

/**
 * Convert a single digit (0-9) to French
 */
const convertOnes = (num) => ONES[num] || "";

/**
 * Convert teens (11-19) to French
 */
const convertTeens = (num) => TEENS[num - 10] || "";

/**
 * Convert tens (20, 30, 40, etc.) to French
 */
const convertTens = (num) => TENS[num] || "";

/**
 * Convert numbers 0-99 to French
 */
const convertTensAndOnes = (num) => {
  if (num === 0) return "";
  if (num < 10) return convertOnes(num);
  if (num < 20) return convertTeens(num);

  const tens = Math.floor(num / 10);
  const ones = num % 10;

  const tensText = convertTens(tens);
  const onesText = ones === 0 ? "" : `-${convertOnes(ones)}`;

  return tensText + onesText;
};

/**
 * Convert hundreds (100-999) to French
 */
const convertHundreds = (num) => {
  if (num === 0) return "";
  if (num < 100) return convertTensAndOnes(num);

  const hundreds = Math.floor(num / 100);
  const remainder = num % 100;

  const hundredsText =
    hundreds === 1 ? "cent" : `${convertOnes(hundreds)} cent`;
  const remainderText =
    remainder === 0 ? "" : ` ${convertTensAndOnes(remainder)}`;

  return hundredsText + remainderText;
};

/**
 * Convert thousands (1000-9999) to French
 */
const convertThousands = (num) => {
  if (num === 0) return "";
  if (num < 1000) return convertHundreds(num);

  const thousands = Math.floor(num / 1000);
  const remainder = num % 1000;

  const thousandsText =
    thousands === 1 ? "mille" : `${convertOnes(thousands)} mille`;
  const remainderText = remainder === 0 ? "" : ` ${convertHundreds(remainder)}`;

  return thousandsText + remainderText;
};

// ============================================================================
// YEAR-SPECIFIC CONVERSION LOGIC
// ============================================================================

/**
 * Convert years 1000-1999 using year pronunciation rules
 */
const convertYear1000s = (num) => {
  const hundreds = Math.floor(num / 100);
  const remainder = num % 100;

  const yearHundreds = {
    10: "mille",
    11: "onze cent",
    12: "douze cent",
    13: "treize cent",
    14: "quatorze cent",
    15: "quinze cent",
    16: "seize cent",
    17: "dix-sept cent",
    18: "dix-huit cent",
    19: "dix-neuf cent",
  };

  const baseText = yearHundreds[hundreds];
  if (!baseText) return num.toString();

  if (remainder === 0) {
    return hundreds === 10 ? "mille" : `${baseText}s`;
  }

  return `${baseText} ${convertTensAndOnes(remainder)}`;
};

/**
 * Convert years 2000+ using year pronunciation rules
 */
const convertYear2000s = (num) => {
  const thousands = Math.floor(num / 1000);
  const remainder = num % 1000;

  if (thousands === 2) {
    return remainder === 0
      ? "deux mille"
      : `deux mille ${convertHundreds(remainder)}`;
  }

  return num.toString(); // Fallback for years not yet implemented
};

// ============================================================================
// PUBLIC API FUNCTIONS
// ============================================================================

/**
 * Convert year to French using year pronunciation rules
 * Years have special pronunciation (e.g., 1871 = "dix-huit cent soixante-et-onze")
 */
export const convertYearToFrench = (year) => {
  const num = parseInt(year);

  if (num < 1000) return year; // Don't convert years before 1000
  if (num === 1000) return "mille";
  if (num < 2000) return convertYear1000s(num);
  if (num >= 2000) return convertYear2000s(num);

  return year; // Fallback
};

/**
 * Convert regular number to French using standard number pronunciation
 * Regular numbers use standard pronunciation (e.g., 1871 = "mille huit cent soixante-et-onze")
 */
export const convertNumberToFrench = (number) => {
  const num = parseInt(number);

  // Handle special cases first
  if (num === 0) return "zéro";
  if (num === 21) return "vingt-et-un";
  if (num === 22) return "vingt-deux";
  if (num === 70) return "soixante-dix";
  if (num === 80) return "quatre-vingts";
  if (num === 90) return "quatre-vingt-dix";

  // Use standard conversion for all other numbers
  if (num < 100) return convertTensAndOnes(num);
  if (num < 1000) return convertHundreds(num);
  if (num < 10000) return convertThousands(num);

  return number; // Fallback for very large numbers
};
