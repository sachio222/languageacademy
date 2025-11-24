/**
 * TTS Utilities - Centralized text-to-speech helpers
 * Handles pronunciation overrides for accented characters and special cases
 */

/**
 * Select the best available voice for a given language
 * Prioritizes high-quality voices over basic system voices
 * @param {Array} voices - Array of SpeechSynthesisVoice objects
 * @param {string} language - Language code (e.g., 'fr-FR', 'en-US')
 * @returns {SpeechSynthesisVoice|null} - The best matching voice or null
 */
export function selectBestVoice(voices, language) {
  const langCode = language.split("-")[0];
  const matchingVoices = voices.filter((v) => v.lang.startsWith(langCode));

  if (matchingVoices.length === 0) return null;

  // Priority 1: Google voices (Chrome - usually highest quality)
  const googleVoice = matchingVoices.find((v) => v.name.includes("Google"));
  if (googleVoice) return googleVoice;

  // Priority 2: Safari/macOS enhanced voices (look for specific high-quality French voices)
  if (langCode === 'fr') {
    const safariEnhancedVoice = matchingVoices.find((v) => {
      const nameLower = v.name.toLowerCase();
      return nameLower.includes("amélie") ||
        nameLower.includes("amelie") ||
        nameLower.includes("thomas") ||
        nameLower.includes("audrey") ||
        nameLower.includes("marie") ||
        nameLower.includes("enhanced") ||
        nameLower.includes("premium") ||
        nameLower.includes("neural") ||
        (nameLower.includes("compact") && nameLower.includes("fr"));
    });
    if (safariEnhancedVoice) return safariEnhancedVoice;
  }

  // Priority 3: General enhanced voices
  const enhancedVoice = matchingVoices.find(
    (v) =>
      v.name.toLowerCase().includes("enhanced") ||
      v.name.toLowerCase().includes("premium") ||
      v.name.toLowerCase().includes("neural") ||
      v.name.toLowerCase().includes("compact")
  );
  if (enhancedVoice) return enhancedVoice;

  // Priority 4: Female voices (often sound more natural)
  const femaleVoice = matchingVoices.find(
    (v) =>
      v.name.toLowerCase().includes("female") ||
      v.name.toLowerCase().includes("samantha") ||
      v.name.toLowerCase().includes("karen") ||
      v.name.toLowerCase().includes("fiona") ||
      v.name.toLowerCase().includes("amelie") ||
      v.name.toLowerCase().includes("amélie") ||
      v.name.toLowerCase().includes("paulina") ||
      v.name.toLowerCase().includes("marie") ||
      v.name.toLowerCase().includes("celine") ||
      v.name.toLowerCase().includes("céline") ||
      v.name.toLowerCase().includes("audrey") ||
      v.name.toLowerCase().includes("aurelie") ||
      v.name.toLowerCase().includes("aurélie")
  );
  if (femaleVoice) return femaleVoice;

  // Priority 5: Avoid low-quality voices
  const decentVoice = matchingVoices.find(
    (v) =>
      !v.name.toLowerCase().includes("alex") &&
      !v.name.toLowerCase().includes("fred") &&
      !v.name.toLowerCase().includes("ralph") &&
      !v.name.toLowerCase().includes("male") &&
      !v.name.toLowerCase().includes("daniel") &&
      !v.name.toLowerCase().includes("junior")
  );
  if (decentVoice) return decentVoice;

  // Last resort: Return first matching voice
  return matchingVoices[0];
}

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
