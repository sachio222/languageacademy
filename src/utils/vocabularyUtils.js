/**
 * Vocabulary utility functions
 * Shared utilities for handling vocabulary display and interactions
 */

/**
 * Detect if a vocabulary item is the start of a new section (verb group, concept, etc.)
 * Checks the note field for explicit section markers
 * 
 * @param {Object} item - The vocabulary item
 * @param {number} index - The index in the array
 * @returns {boolean} - True if this item should have a section divider before it
 */
export const isNewVocabSection = (item, index) => {
  if (index === 0) return false; // First item never needs divider

  const note = (item.note || '').toLowerCase();

  // ONLY check note field for explicit markers - don't guess from french word!
  return note.includes('regular -er verb') ||
    note.includes('regular -ir verb') ||
    note.includes('irregular -ir verb') ||
    note.includes('irregular verb') ||
    note.includes('impersonal') ||
    note.includes('causative') ||
    note.includes('section divider');
};

/**
 * Create a handler for speaking vocabulary row text
 * Uses high-quality voice selection
 * 
 * @param {string} french - The French text to speak
 * @param {string} ttsText - Optional TTS override text
 * @param {Function} getTTSText - Function to get TTS text
 * @param {Function} selectBestVoice - Function to select best voice
 * @param {Function} logger - Logger instance
 * @returns {Function} - Click handler function
 */
export const createVocabRowClickHandler = (french, ttsText, getTTSText, selectBestVoice, logger) => {
  return (e) => {
    if (!french) return;

    // Use ttsText if available, otherwise apply global TTS corrections
    const speechText = ttsText || getTTSText(french);

    // Use same high-quality voice selection as SpeakButton
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(speechText);
      utterance.lang = 'fr-FR';
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      let voices = window.speechSynthesis.getVoices();

      // Handle async voice loading (some browsers load voices asynchronously)
      if (voices.length === 0) {
        window.speechSynthesis.addEventListener("voiceschanged", () => {
          voices = window.speechSynthesis.getVoices();
          const bestVoice = selectBestVoice(voices, utterance.lang);
          if (bestVoice) {
            utterance.voice = bestVoice;
            logger.log(`Vocab TTS: ${bestVoice.name} (${bestVoice.lang})`);
          }
          window.speechSynthesis.speak(utterance);
        });
      } else {
        const bestVoice = selectBestVoice(voices, utterance.lang);
        if (bestVoice) {
          utterance.voice = bestVoice;
          logger.log(`Vocab TTS: ${bestVoice.name} (${bestVoice.lang})`);
        }
        window.speechSynthesis.speak(utterance);
      }
    }
  };
};

/**
 * Update a Set by adding or removing an item
 * Returns a new Set (immutable)
 * 
 * @param {Set} set - The original set
 * @param {*} item - The item to add or remove
 * @param {boolean} shouldAdd - True to add, false to remove
 * @returns {Set} - New set with the item added or removed
 */
export const toggleSetItem = (set, item, shouldAdd) => {
  const newSet = new Set(set);
  if (shouldAdd) {
    newSet.add(item);
  } else {
    newSet.delete(item);
  }
  return newSet;
};

