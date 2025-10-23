import { readingVocabulary as wordTranslations } from "../../components/readingVocabulary";
import { wikipediaEntries } from "../../data/wikipediaEntries";
import { getTTSText } from "../ttsUtils";
import { multiWordPhrases } from "../../components/readingVocabularyPhrases";
import {
  checkExplicitYearMatch,
  checkNumberMatch
} from "./numberRenderingUtils";
import { checkExplicitPhraseMatch } from "./phraseRenderingUtils";
import {
  checkSpeakerMatch,
  checkSubheaderMatch,
  checkHorizontalRuleMatch,
  checkWordMatch,
  checkItalicMatch,
  extractDialogue,
  generateTextKey
} from "./textRegexUtils";
import { getSpeakerColor } from "./speakerColorUtils";


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
  speak
) => {

  // Create a context object to avoid passing the same parameters repeatedly
  const context = {
    paragraphIndex,
    wordRefs,
    setHoveredWord,
    hoveredWord,
    tooltipPosition,
    speak
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
    const otherMatch = remainingText.match(/^(\s+|[.!?,;:])/);
    if (otherMatch) {
      elements.push(
        <span key={`p${paragraphIndex}-c${charPosition}`}>{otherMatch[1]}</span>
      );
      remainingText = remainingText.slice(otherMatch[1].length);
      charPosition += otherMatch[1].length;
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



const checkMultiWordPhrases = (remainingText, charPosition, context) => {
  const { paragraphIndex, wordRefs, setHoveredWord, hoveredWord, tooltipPosition, speak } = context;
  try {
    for (const { phrase, translation } of multiWordPhrases) {
      if (remainingText.toLowerCase().startsWith(phrase.toLowerCase())) {
        const matchedText = remainingText.slice(0, phrase.length);
        const uniqueKey = generateTextKey(paragraphIndex, charPosition);
        const wikiEntry =
          wikipediaEntries[matchedText] ||
          wikipediaEntries[matchedText.toLowerCase()];

        const element = (
          <span
            key={uniqueKey}
            ref={(el) => {
              if (el) wordRefs.current[uniqueKey] = el;
            }}
            className="interactive-word"
            onMouseEnter={() => setHoveredWord(uniqueKey)}
            onMouseLeave={() => setHoveredWord(null)}
            onClick={() => speak(getTTSText(matchedText), "fr-FR")}
            style={{ cursor: "pointer" }}
          >
            {matchedText}
            {hoveredWord === uniqueKey && wikiEntry && (
              <span
                className="word-tooltip wiki-tooltip"
                style={{
                  "--tooltip-shift": `${tooltipPosition.shift}px`,
                  "--arrow-shift": `${tooltipPosition.arrowShift}px`,
                  visibility: tooltipPosition.isVisible ? "visible" : "hidden",
                }}
              >
                <span className="wiki-content">
                  <img
                    src={wikiEntry.image}
                    alt={wikiEntry.name}
                    className="wiki-image"
                  />
                  <span className="wiki-text">
                    <strong>{wikiEntry.name}</strong>
                    <span>{wikiEntry.description}</span>
                    <a
                      href={wikiEntry.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="wiki-link"
                    >
                      📖 Wikipedia
                    </a>
                  </span>
                </span>
              </span>
            )}
            {hoveredWord === uniqueKey && !wikiEntry && (
              <span className="word-tooltip">{translation}</span>
            )}
          </span>
        );

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
 * Process word match with translation and tooltip logic
 * @param {RegExpMatchArray} wordMatch - The word match result
 * @param {string} remainingText - The original remaining text
 * @param {number} charPosition - The character position
 * @param {Object} context - The rendering context
 * @returns {Object} - The result object with element and updated positions
 */
const processWordMatch = (wordMatch, remainingText, charPosition, context) => {
  const { paragraphIndex, wordRefs, setHoveredWord, hoveredWord, tooltipPosition, speak } = context;
  try {
    const word = wordMatch[1];
    const cleanWord = word.toLowerCase();
    const translation = wordTranslations[word] || wordTranslations[cleanWord];
    const uniqueKey = generateTextKey(paragraphIndex, charPosition);

    if (translation) {
      const wikiEntry = wikipediaEntries[word] || wikipediaEntries[cleanWord];

      const element = (
        <span
          key={uniqueKey}
          ref={(el) => {
            if (el) wordRefs.current[uniqueKey] = el;
          }}
          className="interactive-word"
          onMouseEnter={() => setHoveredWord(uniqueKey)}
          onMouseLeave={() => setHoveredWord(null)}
          onClick={() => speak(getTTSText(word), "fr-FR")}
          style={{ cursor: "pointer" }}
        >
          {word}
          {hoveredWord === uniqueKey && wikiEntry && (
            <span
              className="word-tooltip wiki-tooltip"
              style={{
                "--tooltip-shift": `${tooltipPosition.shift}px`,
                "--arrow-shift": `${tooltipPosition.arrowShift}px`,
                visibility: tooltipPosition.isVisible ? "visible" : "hidden",
              }}
            >
              <span className="wiki-content">
                <img
                  src={wikiEntry.image}
                  alt={wikiEntry.name}
                  className="wiki-image"
                />
                <span className="wiki-text">
                  <strong>{wikiEntry.name}</strong>
                  <span>{wikiEntry.description}</span>
                  <a
                    href={wikiEntry.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="wiki-link"
                  >
                    📖 Wikipedia
                  </a>
                </span>
              </span>
            </span>
          )}
          {hoveredWord === uniqueKey && !wikiEntry && (
            <span className="word-tooltip">{translation}</span>
          )}
        </span>
      );

      return {
        element,
        remainingText: remainingText.slice(wordMatch[0].length),
        charPosition: charPosition + wordMatch[0].length
      };
    } else {
      // Log missing words for debugging
      console.warn(`Missing translation for: "${word}"`);

      const element = (
        <span
          key={uniqueKey}
          className="missing-translation"
          title={`Translation missing for: ${word}`}
        >
          {word}
        </span>
      );

      return {
        element,
        remainingText: remainingText.slice(wordMatch[0].length),
        charPosition: charPosition + wordMatch[0].length
      };
    }
  } catch (error) {
    console.error("Error processing word match:", error);
    return {
      element: <span>Error processing word</span>,
      remainingText: remainingText.slice(1),
      charPosition: charPosition + 1
    };
  }
};

/**
 * Process dialogue text with speaker label and interactive content
 * @param {RegExpMatchArray} speakerMatch - The speaker match result
 * @param {string} text - The full dialogue text
 * @param {Object} context - The rendering context
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
