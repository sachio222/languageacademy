// Phrase rendering utilities for React components
// Handles the creation of interactive phrase elements

import React from 'react';
import { detectExplicitPhrase, generatePhraseKey } from './phraseRegexUtils';

// ============================================================================
// RENDERING FUNCTIONS
// ============================================================================

/**
 * Create an interactive phrase element with tooltip and TTS
 * @param {Object} phraseResult - The phrase detection result
 * @param {Object} context - The rendering context
 * @param {string} remainingText - The original remaining text
 * @param {number} charPosition - The character position
 * @returns {Object} - The rendered element and updated positions
 */
export const renderPhraseElement = (phraseResult, context, remainingText, charPosition) => {
  const { paragraphIndex, wordRefs, setHoveredWord, hoveredWord, tooltipPosition, speak } = context;

  const uniqueKey = generatePhraseKey(paragraphIndex, charPosition);
  const phraseText = phraseResult.phrase;

  const element = (
    <span
      key={uniqueKey}
      ref={(el) => {
        if (el) wordRefs.current[uniqueKey] = el;
      }}
      className="interactive-word phrase"
      onMouseEnter={() => setHoveredWord(uniqueKey)}
      onMouseLeave={() => setHoveredWord(null)}
      onClick={() => speak(phraseText, "fr-FR")}
      style={{ cursor: "pointer" }}
      title={`Phrase: ${phraseText}`}
    >
      {phraseText}
      {hoveredWord === uniqueKey && (
        <span
          className="word-tooltip phrase-tooltip"
          style={{
            "--tooltip-shift": `${tooltipPosition.shift}px`,
            "--arrow-shift": `${tooltipPosition.arrowShift}px`,
            visibility: tooltipPosition.isVisible ? "visible" : "hidden",
          }}
        >
          <strong>Phrase:</strong> {phraseText}
        </span>
      )}
    </span>
  );

  return {
    element,
    remainingText: remainingText.slice(phraseResult.fullMatch.length),
    charPosition: charPosition + phraseResult.fullMatch.length
  };
};

// ============================================================================
// MATCH CHECKING FUNCTIONS
// ============================================================================

/**
 * Check for explicitly marked phrases using [phrase] syntax
 * @param {string} remainingText - The remaining text to check
 * @param {number} charPosition - The character position
 * @param {Object} context - The context object
 * @returns {Object|null} - The result object with element and updated positions, or null if no match
 */
export const checkExplicitPhraseMatch = (remainingText, charPosition, context) => {
  try {
    const phraseResult = detectExplicitPhrase(remainingText);

    if (phraseResult && phraseResult.isValid) {
      return renderPhraseElement(phraseResult, context, remainingText, charPosition);
    }

    return null;
  } catch (error) {
    console.error("Error checking explicit phrase match:", error);
    return null;
  }
};
