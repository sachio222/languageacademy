/**
 * TTS Utilities - Centralized text-to-speech helpers
 * Handles pronunciation overrides for accented characters and special cases
 */

/**
 * Get the correct TTS text for pronunciation
 * Handles cases where display text differs from how it should be pronounced
 * @param {string} text - The display text
 * @returns {string} - The text that should be spoken
 */
export function getTTSText(text) {
  if (!text) return text;

  // Handle specific French pronunciation overrides
  const overrides = {
    à: "a", // Pronounce as "a" not "a accent grave"
    À: "a", // Handle uppercase too
  };

  // For single characters, use direct override
  if (text.length === 1 && overrides[text]) {
    return overrides[text];
  }

  // For longer text, replace individual characters
  let result = text;
  for (const [original, replacement] of Object.entries(overrides)) {
    // Only replace when the accented character appears as a standalone word
    // Use word boundaries to avoid replacing within larger words
    const regex = new RegExp(`\\b${original}\\b`, "g");
    result = result.replace(regex, replacement);
  }

  return result;
}

/**
 * Create a standardized TTS utterance with proper pronunciation handling
 * @param {string} text - The text to speak
 * @param {string} language - Language code (default: fr-FR)
 * @param {object} options - Additional options (rate, pitch, volume)
 * @returns {SpeechSynthesisUtterance}
 */
export function createTTSUtterance(text, language = "fr-FR", options = {}) {
  const speechText = getTTSText(text);
  const utterance = new SpeechSynthesisUtterance(speechText);

  utterance.lang = language;
  utterance.rate = options.rate || 0.9; // Slightly slower for learning
  utterance.pitch = options.pitch || 1.0;
  utterance.volume = options.volume || 1.0;

  return utterance;
}
