import { readingVocabulary as wordTranslations } from "../../components/readingVocabulary";
import { multiWordPhrases } from "../../components/readingVocabularyPhrases";
import { useDictionary } from "../../hooks/useDictionary";
import { wikipediaEntries } from "../../data/wikipediaEntries";
import {
  checkExplicitYearMatch,
  checkNumberMatch,
  checkExplicitPhraseMatch,
  checkSpeakerMatch,
  checkSubheaderMatch,
  checkHorizontalRuleMatch,
  checkWordMatch,
  checkOtherMatch,
  checkItalicMatch,
  extractDialogue,
  generateTextKey,
  getSpeakerColor,
  createInteractiveWordElement,
  createMissingTranslationElement
} from "./index";


/**
 * Make words interactive - use paragraph index for truly unique keys
 * @param {string} text - The text to render
 * @param {number} paragraphIndex - The index of the paragraph
 * @param {Object} wordRefs - The references to the words
 * @param {Function} setHoveredWord - The function to set the hovered word
 * @param {string} hoveredWord - The hovered word
 * @param {Object} tooltipPosition - The position of the tooltip
 * @param {Function} speak - The function to speak
 * @returns {JSX.Element} The rendered text
 * @returns {JSX.Element} Returns the rendered text, and the speaker
  */

export const renderInteractiveText = (
  text,
  paragraphIndex,
  wordRefs,
  setHoveredWord,
  hoveredWord,
  tooltipPosition,
  speak,
  allWords = []
) => {

  // Create a context object to avoid passing the same parameters repeatedly
  const context = {
    paragraphIndex,
    wordRefs,
    setHoveredWord,
    hoveredWord,
    tooltipPosition,
    speak,
    allWords,
    fullText: text  // Add full text for context analysis
  };

  // Check if line has subheader
  const subheaderMatch = checkSubheaderMatch(text);
  if (subheaderMatch) {
    return processSubheader(subheaderMatch, context);
  }

  // Check if line is a horizontal rule
  const horizontalRuleMatch = checkHorizontalRuleMatch(text);
  if (horizontalRuleMatch) {
    return processHorizontalRule(context);
  }

  // Check if line has speaker label
  const speakerMatch = checkSpeakerMatch(text);
  if (speakerMatch) {
    return processDialogue(speakerMatch, text, context);
  }

  return renderWords(text, context);
};


/**
 * Check for French contractions (single letter + apostrophe)
 * @param {string} text - The text to check
 * @returns {RegExpMatchArray|null} - The match result or null
 */
const checkContractionMatch = (text) => {
  // Match single letter + apostrophe + word (e.g., d'argent, l'eau, j'ai)
  const contractionPattern = /^([a-z]'[a-zàâäæçéèêëïîôùûüœ]+)/i;
  return text.match(contractionPattern);
};

/**
 * Process contraction match by splitting into contraction + word
 * @param {RegExpMatchArray} contractionMatch - The contraction match result
 * @param {string} remainingText - The original remaining text
 * @param {number} charPosition - The character position
 * @param {Object} context - The rendering context
 * @returns {Object} - The result object with element and updated positions
 */
const processContractionMatch = (contractionMatch, remainingText, charPosition, context) => {
  const { paragraphIndex, allWords } = context;
  try {
    const fullMatch = contractionMatch[0];
    const fullLength = fullMatch.length;
    const uniqueKey = generateTextKey(paragraphIndex, charPosition);

    // Split the contraction: "d'argent" -> "d'" + "argent"
    const apostropheIndex = fullMatch.indexOf("'");
    const contraction = fullMatch.substring(0, apostropheIndex + 1); // "d'"
    const word = fullMatch.substring(apostropheIndex + 1); // "argent"

    // Process the contraction part
    const contractionContext = getContextString(context, charPosition, contraction.length, remainingText);
    const contractionData = getWordTranslation(contraction, allWords, contractionContext);

    // Process the word part
    const wordContext = getContextString(context, charPosition + contraction.length, word.length, remainingText);
    const wordData = getWordTranslation(word, allWords, wordContext);

    // Create combined tooltip for the full contraction
    const combinedTranslation = createCombinedContractionTranslation(
      fullMatch,
      contraction,
      word,
      contractionData,
      wordData
    );

    // Create a single interactive element for the full contraction
    const combinedElement = createInteractiveWordElement(
      fullMatch,
      combinedTranslation,
      uniqueKey,
      context,
      'contraction',
      {
        contraction: contractionData,
        word: wordData,
        isCombined: true
      }
    );

    return {
      element: combinedElement,
      remainingText: remainingText.slice(fullLength),
      charPosition: charPosition + fullLength
    };
  } catch (error) {
    console.error("Error processing contraction match:", error);
    return {
      element: <span key={uniqueKey}>{fullMatch}</span>,
      remainingText: remainingText.slice(1),
      charPosition: charPosition + 1
    };
  }
};

const renderWords = (text, context) => {
  const { paragraphIndex, wordRefs, setHoveredWord, hoveredWord, tooltipPosition, speak } = context;
  let remainingText = text;
  const elements = [];
  // Use context's charPosition as base offset to avoid key conflicts
  let charPosition = context.charPosition || 0;

  while (remainingText.length > 0) {
    let matched = false;

    // Check for italic formatting first
    const italicMatch = processItalics(remainingText, charPosition, context);

    if (italicMatch) {
      elements.push(italicMatch.element);
      remainingText = italicMatch.remainingText;
      charPosition = italicMatch.charPosition;
      continue;
    }

    // Check for multi-word phrases
    const phraseMatch = checkMultiWordPhrases(remainingText, charPosition, context);

    if (phraseMatch) {
      elements.push(phraseMatch.element);
      remainingText = phraseMatch.remainingText;
      charPosition = phraseMatch.charPosition;
      matched = true;
    }

    if (matched) continue;

    // Check for explicitly marked phrases using [phrase] syntax - highest priority
    const explicitPhraseMatch = checkExplicitPhraseMatch(remainingText, charPosition, context);
    if (explicitPhraseMatch) {
      elements.push(explicitPhraseMatch.element);
      remainingText = explicitPhraseMatch.remainingText;
      charPosition = explicitPhraseMatch.charPosition;
      continue;
    }

    // Check for explicitly marked years using {year} syntax - high priority
    const yearMatch = checkExplicitYearMatch(remainingText, charPosition, context);
    if (yearMatch) {
      elements.push(yearMatch.element);
      remainingText = yearMatch.remainingText;
      charPosition = yearMatch.charPosition;
      continue;
    }

    // Check for numbers (including years) - make them clickable for French pronunciation
    const numberMatch = checkNumberMatch(remainingText, charPosition, context);
    if (numberMatch) {
      elements.push(numberMatch.element);
      remainingText = numberMatch.remainingText;
      charPosition = numberMatch.charPosition;
      continue;
    }

    // Check for contractions first (single letter + apostrophe)
    const contractionMatch = checkContractionMatch(remainingText);
    if (contractionMatch) {
      const result = processContractionMatch(contractionMatch, remainingText, charPosition, context);
      elements.push(result.element);
      remainingText = result.remainingText;
      charPosition = result.charPosition;
      continue;
    }

    // Check for single words (including accented characters)
    const wordMatch = checkWordMatch(remainingText);
    if (wordMatch) {
      const result = processWordMatch(wordMatch, remainingText, charPosition, context);
      elements.push(result.element);
      remainingText = result.remainingText;
      charPosition = result.charPosition;
      continue;
    }

    // Match spaces and punctuation
    const otherMatch = checkOtherMatch(remainingText);
    if (otherMatch) {
      const result = processOtherMatch(otherMatch, remainingText, charPosition, context);
      elements.push(result.element);
      remainingText = result.remainingText;
      charPosition = result.charPosition;
      continue;
    }

    // Fallback
    const char = remainingText[0];
    elements.push(
      <span key={`p${paragraphIndex}-c${charPosition}`}>{char}</span>
    );
    remainingText = remainingText.slice(1);
    charPosition++;
  }

  return elements;
};



/**
 * Check for multi-word phrases and render them as interactive elements
 * @param {string} remainingText - The remaining text to check
 * @param {number} charPosition - The character position
 * @param {Object} context - The rendering context
 * @example "Bonjour Marie!"
 * @returns {Object|null} - The result object with element and updated positions, or null if no match
 */
const checkMultiWordPhrases = (remainingText, charPosition, context) => {
  const { paragraphIndex, allWords } = context;
  try {
    // PRIORITY 1: Check reading vocabulary first (manual override for multi-word phrases)
    for (const [vocabKey, vocabEntry] of Object.entries(wordTranslations)) {
      if (vocabKey.includes(' ') && remainingText.toLowerCase().startsWith(vocabKey.toLowerCase())) {
        const matchedText = remainingText.slice(0, vocabKey.length);
        const uniqueKey = generateTextKey(paragraphIndex, charPosition);

        // Handle both old string format and new object format
        const translation = typeof vocabEntry === 'string' ? vocabEntry : vocabEntry.translation;
        const partOfSpeech = typeof vocabEntry === 'string' ? null : vocabEntry.partOfSpeech;

        const element = createInteractiveWordElement(matchedText, translation, uniqueKey, context, partOfSpeech);

        return {
          element,
          remainingText: remainingText.slice(vocabKey.length),
          charPosition: charPosition + vocabKey.length
        };
      }
    }

    // PRIORITY 2: Check Wikipedia entries for multi-word phrases
    for (const [wikiKey, wikiEntry] of Object.entries(wikipediaEntries)) {
      if (remainingText.toLowerCase().startsWith(wikiKey.toLowerCase())) {
        const matchedText = remainingText.slice(0, wikiKey.length);
        const uniqueKey = generateTextKey(paragraphIndex, charPosition);

        const element = createInteractiveWordElement(matchedText, null, uniqueKey, context, null);

        return {
          element,
          remainingText: remainingText.slice(wikiKey.length),
          charPosition: charPosition + wikiKey.length
        };
      }
    }

    // PRIORITY 3: Check dictionary expressions (multi-word entries)
    for (const wordEntry of allWords) {
      if (wordEntry.partOfSpeech === 'expression' && wordEntry.word.includes(' ')) {
        if (remainingText.toLowerCase().startsWith(wordEntry.word.toLowerCase())) {
          const matchedText = remainingText.slice(0, wordEntry.word.length);
          const uniqueKey = generateTextKey(paragraphIndex, charPosition);

          const element = createInteractiveWordElement(
            matchedText,
            wordEntry.translations?.[0]?.text || null,
            uniqueKey,
            context,
            wordEntry.partOfSpeech
          );

          return {
            element,
            remainingText: remainingText.slice(wordEntry.word.length),
            charPosition: charPosition + wordEntry.word.length
          };
        }
      }
    }

    // PRIORITY 4: Check regular multi-word phrases
    for (const { phrase, translation } of multiWordPhrases) {
      if (remainingText.toLowerCase().startsWith(phrase.toLowerCase())) {
        const matchedText = remainingText.slice(0, phrase.length);
        const uniqueKey = generateTextKey(paragraphIndex, charPosition);

        const element = createInteractiveWordElement(matchedText, translation, uniqueKey, context, null);

        return {
          element,
          remainingText: remainingText.slice(phrase.length),
          charPosition: charPosition + phrase.length
        };
      }
    }
    return null;
  } catch (error) {
    console.error("Error checking multi-word phrases:", error);
    return null;
  }
};


/**
 * Process italic text formatting with isolated context to prevent key conflicts
 * @param {string} remainingText - The remaining text to check
 * @param {number} charPosition - The character position
 * @param {Object} context - The rendering context
 * @example _Bonjour_
 * @returns {Object|null} - The result object with element and updated positions, or null if no match
 */
const processItalics = (remainingText, charPosition, context) => {
  const { paragraphIndex, wordRefs, setHoveredWord, hoveredWord, tooltipPosition, speak } = context;
  try {
    const italicMatch = checkItalicMatch(remainingText);
    if (italicMatch) {
      const italicText = italicMatch[1];
      const uniqueKey = `p${paragraphIndex}-c${charPosition}-italic`;

      // Create a new context for the italic text with updated position
      const italicContext = {
        ...context,
        paragraphIndex: paragraphIndex,
        // Use a large offset to ensure unique keys for italic content
        charPosition: charPosition + 100000,
      };

      const element = (
        <em key={uniqueKey}>
          {renderWords(italicText, italicContext)}
        </em>
      );

      return {
        element,
        remainingText: remainingText.slice(italicMatch[0].length),
        charPosition: charPosition + italicMatch[0].length
      };
    }
    return null;
  } catch (error) {
    console.error("Error processing italic match:", error);
    return null;
  }
};


/**
 * Process subheader text with styling
 * @param {RegExpMatchArray} subheaderMatch - The subheader match result
 * @param {Object} context - The rendering context
 * @example ## Ce soir au café:
 * @returns {JSX.Element} - Rendered subheader
 */
const processSubheader = (subheaderMatch, context) => {
  try {
    const subheaderText = subheaderMatch[1];

    return (
      <h3 className="subheader">
        {subheaderText}
      </h3>
    );
  } catch (error) {
    console.error("Error processing subheader:", error);
    return <span>Error processing subheader</span>;
  }
};

/**
 * Process horizontal rule with clean styling
 * @param {Object} context - The rendering context
 * @example ---
 * @returns {JSX.Element} - Rendered horizontal rule
 */
const processHorizontalRule = (context) => {
  try {
    return (
      <hr className="horizontal-rule" />
    );
  } catch (error) {
    console.error("Error processing horizontal rule:", error);
    return <span>Error processing horizontal rule</span>;
  }
};

/**
 * Process other match (spaces and punctuation) with simple rendering
 * @param {RegExpMatchArray} otherMatch - The other match result
 * @param {string} remainingText - The original remaining text
 * @param {number} charPosition - The character position
 * @param {Object} context - The rendering context
 * @example " "
 * @example "!"
 * @returns {Object} - The result object with element and updated positions
 */
const processOtherMatch = (otherMatch, remainingText, charPosition, context) => {
  const { paragraphIndex } = context;
  try {
    const element = (
      <span key={`p${paragraphIndex}-c${charPosition}`}>{otherMatch[1]}</span>
    );

    return {
      element,
      remainingText: remainingText.slice(otherMatch[1].length),
      charPosition: charPosition + otherMatch[1].length
    };
  } catch (error) {
    console.error("Error processing other match:", error);
    return {
      element: <span>Error processing other</span>,
      remainingText: remainingText.slice(1),
      charPosition: charPosition + 1
    };
  }
};


/**
 * Process word match with translation and tooltip logic
 * @param {RegExpMatchArray} wordMatch - The word match result
 * @param {string} remainingText - The original remaining text
 * @param {number} charPosition - The character position
 * @param {Object} context - The rendering context
 * @example "Bonjour"
 * @returns {Object} - The result object with element and updated positions
 */
const processWordMatch = (wordMatch, remainingText, charPosition, context) => {
  const { paragraphIndex, allWords } = context;
  try {
    const word = wordMatch[1];
    const wordLength = wordMatch[0].length;
    const uniqueKey = generateTextKey(paragraphIndex, charPosition);

    // Check Wikipedia entries FIRST (highest priority for cultural references)
    const wikiEntry = wikipediaEntries[word] || wikipediaEntries[word.toLowerCase()];
    if (wikiEntry) {
      const element = createInteractiveWordElement(word, null, uniqueKey, context, null);
      return {
        element,
        remainingText: remainingText.slice(wordLength),
        charPosition: charPosition + wordLength
      };
    }

    // If no Wikipedia entry, check dictionary
    const contextString = getContextString(context, charPosition, wordLength, remainingText);
    const wordData = getWordTranslation(word, allWords, contextString);

    if (wordData?.translation) {
      const element = createInteractiveWordElement(word, wordData.translation, uniqueKey, context, wordData.partOfSpeech, wordData);
      return {
        element,
        remainingText: remainingText.slice(wordLength),
        charPosition: charPosition + wordLength
      };
    } else {
      console.warn(`Missing translation for: "${word}"`);
      const element = createMissingTranslationElement(word, uniqueKey);
      return {
        element,
        remainingText: remainingText.slice(wordLength),
        charPosition: charPosition + wordLength
      };
    }
  } catch (error) {
    console.error("Error processing word match:", error);
    return {
      element: <span key={uniqueKey}>{word}</span>,
      remainingText: remainingText.slice(1),
      charPosition: charPosition + 1
    };
  }
};

/**
 * Get context string around a word for disambiguation
 * @param {Object} context - The rendering context
 * @param {number} charPosition - Current character position
 * @param {number} wordLength - Length of the word
 * @param {string} remainingText - Remaining text to process
 * @returns {string} - Context string around the word
 */
const getContextString = (context, charPosition, wordLength, remainingText) => {
  if (!context.fullText) return '';

  const CONTEXT_RADIUS = 20;
  const startPos = Math.max(0, charPosition - CONTEXT_RADIUS);
  const endPos = charPosition + wordLength + CONTEXT_RADIUS;

  return context.fullText.slice(startPos, endPos);
};


/**
 * Process dialogue text with speaker label and interactive content
 * @param {RegExpMatchArray} speakerMatch - The speaker match result
 * @param {string} text - The full dialogue text
 * @param {Object} context - The rendering context
 * @example **Paul:** Bonjour Marie! Comment ça va?
 * @returns {JSX.Element} - Rendered dialogue with speaker label and interactive content
 */
const processDialogue = (speakerMatch, text, context) => {
  const { paragraphIndex, wordRefs, setHoveredWord, hoveredWord, tooltipPosition, speak } = context;
  try {
    const speaker = speakerMatch[1];
    const dialogue = extractDialogue(text);
    const { speakerName, color } = getSpeakerColor(speaker);

    return (
      <>
        <strong
          className="speaker-label"
          style={{ color }}
        >
          {speakerName}:
        </strong>{" "}
        {renderWords(dialogue, context)}
      </>
    );
  } catch (error) {
    console.error("Error processing dialogue:", error);
    return <span>Error processing dialogue</span>;
  }
};


/**
 * Look up a word in the dictionary and return its translation and part of speech
 * @param {string} word - The word to look up
 * @param {Array} allWords - The dictionary words array
 * @param {string} context - Optional context string around the word
 * @returns {Object|null} - Object with translation and partOfSpeech, or null if not found
 */
const getWordTranslation = (word, allWords, context = '') => {
  const cleanWord = word.toLowerCase();

  // PRIORITY 1: Check reading vocabulary first (manual override)
  const readingVocabEntry = wordTranslations[word] || wordTranslations[word.toLowerCase()];
  if (readingVocabEntry) {
    // Handle both old string format and new object format for backward compatibility
    if (typeof readingVocabEntry === 'string') {
      return {
        translation: readingVocabEntry,
        partOfSpeech: null
      };
    } else {
      return {
        translation: readingVocabEntry.translation,
        partOfSpeech: readingVocabEntry.partOfSpeech || null,
        gender: readingVocabEntry.gender || null,
        number: readingVocabEntry.number || null
      };
    }
  }

  // PRIORITY 2: Look up in comprehensive dictionary
  const dictionaryEntry = allWords.find(entry =>
    entry.word.toLowerCase() === cleanWord
  );

  if (dictionaryEntry) {
    // Handle redirect entries - get translation from the main entry
    if (dictionaryEntry.redirect_to) {
      const mainEntry = allWords.find(entry => entry.id === dictionaryEntry.redirect_to);
      if (mainEntry) {
        return {
          translation: mainEntry.translations?.[0]?.text || null,
          partOfSpeech: dictionaryEntry.partOfSpeech || null,
          gender: dictionaryEntry.gender,
          number: dictionaryEntry.number,
          redirectInfo: {
            baseWord: dictionaryEntry.base_word,
            redirectType: dictionaryEntry.redirect_type
          }
        };
      }
    }

    // If word has multiple parts of speech, use context to disambiguate
    if (dictionaryEntry.allPartsOfSpeech && dictionaryEntry.allPartsOfSpeech.length > 1) {
      const contextAwarePartOfSpeech = getContextAwarePartOfSpeech(
        word,
        dictionaryEntry.allPartsOfSpeech,
        context,
        dictionaryEntry
      );

      return {
        translation: getTranslationForPartOfSpeech(dictionaryEntry, contextAwarePartOfSpeech),
        partOfSpeech: contextAwarePartOfSpeech
      };
    }

    // For verbs, check context for negative forms and other verb phrases
    if (dictionaryEntry.partOfSpeech === 'verb' && context) {
      const contextAwareTranslation = getVerbContextAwareTranslation(word, dictionaryEntry, context);
      if (contextAwareTranslation) {
        return contextAwareTranslation;
      }
    }

    // Single part of speech - use primary
    return {
      translation: dictionaryEntry.translations?.[0]?.text || null,
      partOfSpeech: dictionaryEntry.partOfSpeech || null
    };
  }

  return null;
};

/**
 * Use context to determine the most likely part of speech for ambiguous words
 * @param {string} word - The word being analyzed
 * @param {Array} possiblePartsOfSpeech - Available parts of speech for this word
 * @param {string} context - Context string around the word
 * @param {Object} dictionaryEntry - The full dictionary entry for the word
 * @returns {string} - The most likely part of speech based on context
 */
const getContextAwarePartOfSpeech = (word, possiblePartsOfSpeech, context, dictionaryEntry) => {
  const contextLower = context.toLowerCase();

  // Check if any part of speech has verb_phrases that match the context
  for (const partOfSpeech of possiblePartsOfSpeech) {
    if (dictionaryEntry.allTranslations?.[partOfSpeech]) {
      const partOfSpeechEntry = dictionaryEntry.allTranslations[partOfSpeech];

      // Look for verb_phrases in the entry
      if (partOfSpeechEntry.verb_phrases) {
        const matchingPhrase = partOfSpeechEntry.verb_phrases.find(phrase =>
          contextLower.includes(phrase.phrase.toLowerCase())
        );

        if (matchingPhrase) {
          return partOfSpeech;
        }
      }
    }
  }

  // Fallback: prioritize verb for common French words like "est"
  if (word.toLowerCase() === 'est' && possiblePartsOfSpeech.includes('verb')) {
    return 'verb';
  }

  return possiblePartsOfSpeech[0];
};

/**
 * Get translation for a specific part of speech
 * @param {Object} dictionaryEntry - The dictionary entry
 * @param {string} partOfSpeech - The desired part of speech
 * @returns {string|null} - The translation for that part of speech
 */
const getTranslationForPartOfSpeech = (dictionaryEntry, partOfSpeech) => {
  if (dictionaryEntry.allTranslations && dictionaryEntry.allTranslations[partOfSpeech]) {
    return dictionaryEntry.allTranslations[partOfSpeech][0]?.text || null;
  }

  // Fallback to primary translation
  return dictionaryEntry.translations?.[0]?.text || null;
};

/**
 * Get context-aware translation for verbs by checking verb phrases
 * @param {string} word - The word being analyzed
 * @param {Object} dictionaryEntry - The dictionary entry for the verb
 * @param {string} context - Context string around the word
 * @returns {Object|null} - Object with translation and partOfSpeech, or null if no context match
 */
const getVerbContextAwareTranslation = (word, dictionaryEntry, context) => {
  const contextLower = context.toLowerCase();
  const cleanWord = word.toLowerCase();

  // Check if the verb has verb_phrases that match the context
  if (dictionaryEntry.verb_phrases && Array.isArray(dictionaryEntry.verb_phrases)) {
    for (const phrase of dictionaryEntry.verb_phrases) {
      const phraseText = phrase.phrase.toLowerCase();

      // Check for exact phrase matches in context
      if (contextLower.includes(phraseText)) {
        console.log(`🎯 Verb context match: "${cleanWord}" in "${phraseText}" → ${phrase.type}`);

        // Return enhanced translation with context info
        const baseTranslation = dictionaryEntry.translations?.[0]?.text || '';
        const contextTranslation = phrase.context ? `${baseTranslation} (${phrase.context})` : baseTranslation;

        return {
          translation: contextTranslation,
          partOfSpeech: 'verb'
        };
      }
    }
  }

  // Check for common negative patterns even if not explicitly in verb_phrases
  const negativePatterns = [
    `ne ${cleanWord} pas`,
    `n'${cleanWord} pas`,
    `ne ${cleanWord} plus`,
    `n'${cleanWord} plus`,
    `ne ${cleanWord} jamais`,
    `n'${cleanWord} jamais`
  ];

  for (const pattern of negativePatterns) {
    if (contextLower.includes(pattern)) {
      console.log(`🎯 Verb negative context match: "${cleanWord}" in "${pattern}"`);

      const baseTranslation = dictionaryEntry.translations?.[0]?.text || '';
      return {
        translation: `${baseTranslation} (not)`,
        partOfSpeech: 'verb'
      };
    }
  }

  return null;
};

/**
 * Create a combined translation for contractions
 * @param {string} fullMatch - The full contraction (e.g., "d'argent")
 * @param {string} contraction - The contraction part (e.g., "d'")
 * @param {string} word - The word part (e.g., "argent")
 * @param {Object} contractionData - Translation data for the contraction
 * @param {Object} wordData - Translation data for the word
 * @returns {string} - Combined translation text
 */
const createCombinedContractionTranslation = (fullMatch, contraction, word, contractionData, wordData) => {
  const contractionTranslation = contractionData?.translation || contraction;
  const wordTranslation = wordData?.translation || word;

  // Create a meaningful combined translation
  if (contraction === "d'" && wordData?.partOfSpeech === "noun") {
    // d'argent = "money" (not "of money")
    return wordTranslation;
  } else if (contraction === "l'" && wordData?.partOfSpeech === "noun") {
    // l'eau = "water" (not "the water")
    return wordTranslation;
  } else if (contraction === "j'" && wordData?.partOfSpeech === "verb") {
    // j'ai = "I have"
    return `${contractionTranslation} ${wordTranslation}`;
  } else if (contraction === "n'" && wordData?.partOfSpeech === "verb") {
    // n'est pas = "is not"
    return `${wordTranslation} not`;
  } else if (contraction === "s'" && wordData?.partOfSpeech === "verb") {
    // s'appelle = "is called"
    return `${wordTranslation} (reflexive)`;
  } else if (contraction === "c'" && wordData?.partOfSpeech === "verb") {
    // c'est = "it is"
    return `${contractionTranslation} ${wordTranslation}`;
  } else if (contraction === "qu'" && wordData?.partOfSpeech === "verb") {
    // qu'est-ce que = "what"
    return `${contractionTranslation} ${wordTranslation}`;
  } else if (contraction === "m'" && wordData?.partOfSpeech === "verb") {
    // m'appelle = "my name is"
    return `${contractionTranslation} ${wordTranslation}`;
  } else if (contraction === "t'" && wordData?.partOfSpeech === "verb") {
    // t'appelles = "your name is"
    return `${contractionTranslation} ${wordTranslation}`;
  } else if (contraction === "y'" && wordData?.partOfSpeech === "verb") {
    // y'a = "there is"
    return `${contractionTranslation} ${wordTranslation}`;
  } else {
    // Fallback: combine both translations
    return `${contractionTranslation} ${wordTranslation}`;
  }
};
