// ============================================================================
// READING UTILITIES INDEX
// ============================================================================
// Centralized exports for all reading-related utilities
// This provides a clean, single import point for reading components

// ============================================================================
// TEXT RENDERING
// ============================================================================
export { renderInteractiveText } from "./textRenderingUtils";

// ============================================================================
// TOOLTIP & CARDS
// ============================================================================
export {
  createInteractiveWordElement,
  createMissingTranslationElement,
  createWikiCard,
} from "./tooltipCardUtils";

export { calculateTooltipPosition } from "./toottipUtils";

// ============================================================================
// TEXT PATTERN MATCHING
// ============================================================================
export {
  checkSpeakerMatch,
  checkSubheaderMatch,
  checkHorizontalRuleMatch,
  checkWordMatch,
  checkOtherMatch,
  checkItalicMatch,
  extractDialogue,
  generateTextKey,
} from "./textRegexUtils";

// ============================================================================
// NUMBER & YEAR HANDLING
// ============================================================================
export {
  checkExplicitYearMatch,
  checkNumberMatch,
} from "./numberRenderingUtils";

export {
  detectExplicitYear,
  detectNumber,
  generateNumberKey,
  isValidYearNumber,
  isValidNumber,
  isLikelyYear,
} from "./numberRegexUtils";

export { convertYearToFrench, convertNumberToFrench } from "./numberTTSUtilsFr";

// ============================================================================
// PHRASE HANDLING
// ============================================================================
export { checkExplicitPhraseMatch } from "./phraseRenderingUtils";

export { detectExplicitPhrase, generatePhraseKey } from "./phraseRegexUtils";

// ============================================================================
// SPEAKER COLOR MANAGEMENT
// ============================================================================
export {
  getSpeakerColor,
  getSpeakerColorByIndex,
  getDiscoveredSpeakers,
  resetDiscoveredSpeakers,
  getCurrentDiscoveredSpeakers,
  DEFAULT_SPEAKER_COLORS,
} from "./speakerColorUtils";
