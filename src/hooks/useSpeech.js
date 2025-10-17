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
   * Prioritizes: Google/natural voices > Safari enhanced voices > female voices > any available voice
   * Uses same high-quality voice selection as SpeakButton component
   * @param {string} lang - Language code (e.g., 'fr-FR', 'en-US', 'ja-JP')
   * @returns {SpeechSynthesisVoice|null}
   */
  const getVoiceForLanguage = useCallback((lang) => {
    if (!synthRef.current) return null;

    const voices = synthRef.current.getVoices();
    const langCode = lang.split("-")[0];
    const matchingVoices = voices.filter((v) => v.lang.startsWith(langCode));

    if (matchingVoices.length === 0) return null;

    // Priority 1: Google voices (Chrome - usually highest quality)
    const googleVoice = matchingVoices.find((v) => v.name.includes("Google"));
    if (googleVoice) return googleVoice;

    // Priority 2: Safari/macOS enhanced voices (look for specific high-quality French voices)
    if (langCode === "fr") {
      // These are higher-quality French voices available on macOS/iOS
      const safariEnhancedVoice = matchingVoices.find((v) => {
        const nameLower = v.name.toLowerCase();
        return (
          nameLower.includes("amélie") ||
          nameLower.includes("amelie") ||
          nameLower.includes("thomas") || // Thomas (French) is actually good quality
          nameLower.includes("audrey") ||
          nameLower.includes("marie") ||
          nameLower.includes("enhanced") ||
          nameLower.includes("premium") ||
          nameLower.includes("neural") ||
          (nameLower.includes("compact") && nameLower.includes("fr"))
        );
      });
      if (safariEnhancedVoice) return safariEnhancedVoice;
    }

    // Priority 3: General enhanced voices
    const enhancedVoice = matchingVoices.find(
      (v) =>
        v.name.toLowerCase().includes("enhanced") ||
        v.name.toLowerCase().includes("premium") ||
        v.name.toLowerCase().includes("neural") ||
        v.name.toLowerCase().includes("compact") // Compact voices are often better quality
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
        !v.name.toLowerCase().includes("junior") // Avoid junior/basic voices
    );
    if (decentVoice) return decentVoice;

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

      // Get voices and handle async loading
      let voices = synthRef.current.getVoices();

      // Handle async voice loading (some browsers load voices asynchronously)
      if (voices.length === 0) {
        synthRef.current.addEventListener("voiceschanged", () => {
          voices = synthRef.current.getVoices();
          const bestVoice = getVoiceForLanguage(lang);
          if (bestVoice) {
            utterance.voice = bestVoice;
            console.log(
              `Individual word TTS: ${bestVoice.name} (${bestVoice.lang})`
            );
          }
          synthRef.current.speak(utterance);
        });
      } else {
        const bestVoice = getVoiceForLanguage(lang);
        if (bestVoice) {
          utterance.voice = bestVoice;
          console.log(
            `Individual word TTS: ${bestVoice.name} (${bestVoice.lang})`
          );
        }
        currentUtteranceRef.current = utterance;
        synthRef.current.speak(utterance);
      }
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
