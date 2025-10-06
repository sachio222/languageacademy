import { useCallback, useEffect, useRef } from "react";

/**
 * Custom hook for text-to-speech functionality
 * Uses Web Speech API (free, built into browsers)
 * Supports: French, English, Japanese, Spanish, Dutch, German, Chinese
 */
export function useSpeech() {
  const synthRef = useRef(null);
  const currentUtteranceRef = useRef(null);

  useEffect(() => {
    if ("speechSynthesis" in window) {
      synthRef.current = window.speechSynthesis;
    }

    // Cleanup on unmount
    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  /**
   * Get the best voice for a specific language
   * Prioritizes: Google/natural voices > female voices > any available voice
   * @param {string} lang - Language code (e.g., 'fr-FR', 'en-US', 'ja-JP')
   * @returns {SpeechSynthesisVoice|null}
   */
  const getVoiceForLanguage = useCallback((lang) => {
    if (!synthRef.current) return null;

    const voices = synthRef.current.getVoices();
    const langCode = lang.split("-")[0];
    const matchingVoices = voices.filter((v) => v.lang.startsWith(langCode));

    if (matchingVoices.length === 0) return null;

    // Priority 1: Google voices (usually highest quality)
    const googleVoice = matchingVoices.find((v) => v.name.includes("Google"));
    if (googleVoice) return googleVoice;

    // Priority 2: Voices with "enhanced" or "premium" in the name
    const enhancedVoice = matchingVoices.find(
      (v) =>
        v.name.toLowerCase().includes("enhanced") ||
        v.name.toLowerCase().includes("premium") ||
        v.name.toLowerCase().includes("neural")
    );
    if (enhancedVoice) return enhancedVoice;

    // Priority 3: Female voices (often sound more natural)
    const femaleVoice = matchingVoices.find(
      (v) =>
        v.name.toLowerCase().includes("female") ||
        v.name.toLowerCase().includes("samantha") ||
        v.name.toLowerCase().includes("karen") ||
        v.name.toLowerCase().includes("fiona") ||
        v.name.toLowerCase().includes("amelie") ||
        v.name.toLowerCase().includes("paulina") ||
        v.name.toLowerCase().includes("marie") ||
        v.name.toLowerCase().includes("celine") ||
        v.name.toLowerCase().includes("audrey") ||
        v.name.toLowerCase().includes("aurelie")
    );
    if (femaleVoice) return femaleVoice;

    // Priority 4: Avoid male and robotic-sounding voices
    const nonMaleVoice = matchingVoices.find(
      (v) =>
        !v.name.toLowerCase().includes("alex") &&
        !v.name.toLowerCase().includes("fred") &&
        !v.name.toLowerCase().includes("ralph") &&
        !v.name.toLowerCase().includes("thomas") &&
        !v.name.toLowerCase().includes("male") &&
        !v.name.toLowerCase().includes("daniel")
    );
    if (nonMaleVoice) return nonMaleVoice;

    // Fallback: Prefer any voice with specific characteristics over generic first match
    // Look for voices that don't have "male" in the name
    const nonMaleGeneric = matchingVoices.find(
      (v) => !v.name.toLowerCase().includes("male")
    );
    if (nonMaleGeneric) return nonMaleGeneric;

    // Last resort: Return first matching voice
    return matchingVoices[0];
  }, []);

  /**
   * Speak text in a specific language
   * @param {string} text - Text to speak
   * @param {string} lang - Language code
   * @param {object} options - Additional options (rate, pitch, volume)
   */
  const speak = useCallback(
    (text, lang = "fr-FR", options = {}) => {
      if (!synthRef.current || !text) return;

      // Cancel any ongoing speech
      synthRef.current.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;

      // Set options
      utterance.rate = options.rate || 0.9; // Slightly slower for language learning
      utterance.pitch = options.pitch || 1;
      utterance.volume = options.volume || 1;

      // Try to find a matching voice
      const voice = getVoiceForLanguage(lang);
      if (voice) {
        utterance.voice = voice;
        console.log(`Using voice: ${voice.name} (${voice.lang})`);
      } else {
        console.warn(`No voice found for language: ${lang}`);
      }

      currentUtteranceRef.current = utterance;
      synthRef.current.speak(utterance);
    },
    [getVoiceForLanguage]
  );

  /**
   * Stop any ongoing speech
   */
  const stop = useCallback(() => {
    if (synthRef.current) {
      synthRef.current.cancel();
    }
  }, []);

  /**
   * Check if speech synthesis is supported
   */
  const isSupported = "speechSynthesis" in window;

  return {
    speak,
    stop,
    isSupported,
  };
}

/**
 * Language code mapping for common languages
 */
export const LANGUAGE_CODES = {
  french: "fr-FR",
  english: "en-US",
  japanese: "ja-JP",
  spanish: "es-ES",
  dutch: "nl-NL",
  german: "de-DE",
  chinese: "zh-CN",
};

/**
 * Detect language from text content (simple heuristic)
 * @param {string} text
 * @returns {string} Language code
 */
export function detectLanguage(text) {
  // Simple detection - can be enhanced
  const lowerText = text.toLowerCase();

  // French patterns - check accented characters OR common French words
  if (
    /[àâäæçéèêëïîôùûüœ]/.test(lowerText) ||
    /\b(le|la|les|un|une|des|je|tu|il|elle|nous|vous|ils|elles|bonjour|merci|oui|non|salut|voilà|café|avec|dans|sur|pour|mais|très|aussi|être|avoir|aller|faire|dire|venir|voir|savoir|vouloir|pouvoir|petit|grand|bon|bonne|nouveau|vieux|jeune|autre)\b/.test(
      lowerText
    )
  ) {
    return LANGUAGE_CODES.french;
  }

  // Japanese (has hiragana/katakana/kanji)
  if (/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/.test(text)) {
    return LANGUAGE_CODES.japanese;
  }

  // Chinese (has CJK characters but not Japanese kana)
  if (
    /[\u4E00-\u9FAF]/.test(text) &&
    !/[\u3040-\u309F\u30A0-\u30FF]/.test(text)
  ) {
    return LANGUAGE_CODES.chinese;
  }

  // Spanish patterns
  if (
    /[áéíóúñ¿¡]/.test(lowerText) ||
    /\b(el|la|los|las|un|una|yo|tú|él|ella)\b/.test(lowerText)
  ) {
    return LANGUAGE_CODES.spanish;
  }

  // German patterns
  if (
    /[äöüß]/.test(lowerText) ||
    /\b(der|die|das|ein|eine|ich|du|er|sie|wir)\b/.test(lowerText)
  ) {
    return LANGUAGE_CODES.german;
  }

  // Dutch patterns
  if (/\b(de|het|een|ik|jij|hij|zij|wij)\b/.test(lowerText)) {
    return LANGUAGE_CODES.dutch;
  }

  // Default to English
  return LANGUAGE_CODES.english;
}
