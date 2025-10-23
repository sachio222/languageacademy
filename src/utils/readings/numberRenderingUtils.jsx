// Number and year rendering utilities for React components
// Handles the creation of interactive number and year elements

import React from 'react';
import { convertYearToFrench, convertNumberToFrench } from './numberTTSUtilsFr';
import { detectExplicitYear, detectNumber, generateNumberKey } from './numberRegexUtils';

// ============================================================================
// RENDERING FUNCTIONS
// ============================================================================

/**
 * Create an interactive year element with tooltip and TTS
 * @param {Object} yearResult - The year detection result
 * @param {Object} context - The rendering context
 * @param {string} remainingText - The original remaining text
 * @param {number} charPosition - The character position
 * @returns {Object} - The rendered element and updated positions
 */
export const renderYearElement = (yearResult, context, remainingText, charPosition) => {
  const { paragraphIndex, wordRefs, setHoveredWord, hoveredWord, tooltipPosition, speak } = context;

  const uniqueKey = generateNumberKey(paragraphIndex, charPosition, 'year');
  const yearInFrench = convertYearToFrench(yearResult.year);

  const element = (
    <span
      key={uniqueKey}
      ref={(el) => {
        if (el) wordRefs.current[uniqueKey] = el;
      }}
      className="interactive-word year-number"
      onMouseEnter={() => setHoveredWord(uniqueKey)}
      onMouseLeave={() => setHoveredWord(null)}
      onClick={() => speak(yearInFrench, "fr-FR")}
      style={{ cursor: "pointer" }}
      title={`Year: ${yearResult.year} (${yearInFrench})`}
    >
      {yearResult.year}
      {hoveredWord === uniqueKey && (
        <span
          className="word-tooltip year-tooltip"
          style={{
            "--tooltip-shift": `${tooltipPosition.shift}px`,
            "--arrow-shift": `${tooltipPosition.arrowShift}px`,
            visibility: tooltipPosition.isVisible ? "visible" : "hidden",
          }}
        >
          <strong>Year:</strong> {yearInFrench}
        </span>
      )}
    </span>
  );

  return {
    element,
    remainingText: remainingText.slice(yearResult.fullMatch.length),
    charPosition: charPosition + yearResult.fullMatch.length
  };
};

/**
 * Create an interactive number element with tooltip and TTS
 * @param {Object} numberResult - The number detection result
 * @param {Object} context - The rendering context
 * @param {string} remainingText - The original remaining text
 * @param {number} charPosition - The character position
 * @returns {Object} - The rendered element and updated positions
 */
export const renderNumberElement = (numberResult, context, remainingText, charPosition) => {
  const { paragraphIndex, wordRefs, setHoveredWord, hoveredWord, tooltipPosition, speak } = context;

  const uniqueKey = generateNumberKey(paragraphIndex, charPosition, 'number');
  const frenchText = convertNumberToFrench(numberResult.number);

  const element = (
    <span
      key={uniqueKey}
      ref={(el) => {
        if (el) wordRefs.current[uniqueKey] = el;
      }}
      className="interactive-word"
      onMouseEnter={() => setHoveredWord(uniqueKey)}
      onMouseLeave={() => setHoveredWord(null)}
      onClick={() => speak(frenchText, "fr-FR")}
      style={{ cursor: "pointer" }}
    >
      {numberResult.number}
      {hoveredWord === uniqueKey && (
        <span
          className="word-tooltip"
          style={{
            "--tooltip-shift": `${tooltipPosition.shift}px`,
            "--arrow-shift": `${tooltipPosition.arrowShift}px`,
            visibility: tooltipPosition.isVisible ? "visible" : "hidden",
          }}
        >
          {frenchText}
        </span>
      )}
    </span>
  );

  return {
    element,
    remainingText: remainingText.slice(numberResult.fullMatch.length),
    charPosition: charPosition + numberResult.fullMatch.length
  };
};

// ============================================================================
// MATCH CHECKING FUNCTIONS
// ============================================================================

/**
 * Check for explicitly marked years using {year} syntax
 * @param {string} remainingText - The remaining text to check
 * @param {number} charPosition - The character position
 * @param {Object} context - The context object
 * @returns {Object|null} - The result object with element and updated positions, or null if no match
 */
export const checkExplicitYearMatch = (remainingText, charPosition, context) => {
  try {
    const yearResult = detectExplicitYear(remainingText);

    if (yearResult && yearResult.isValid) {
      return renderYearElement(yearResult, context, remainingText, charPosition);
    }

    return null;
  } catch (error) {
    console.error("Error checking explicit year match:", error);
    return null;
  }
};

/**
 * Check for number matches - simplified to treat all numbers as regular numbers
 * @param {string} remainingText - The remaining text to check
 * @param {number} charPosition - The character position
 * @param {Object} context - The context object
 * @returns {Object|null} - The result object with element and updated positions, or null if no match
 */
export const checkNumberMatch = (remainingText, charPosition, context) => {
  try {
    const numberResult = detectNumber(remainingText);

    if (numberResult && numberResult.isValid) {
      return renderNumberElement(numberResult, context, remainingText, charPosition);
    }

    return null;
  } catch (error) {
    console.error("Error checking number match:", error);
    return null;
  }
};
