// ============================================================================
// TOOLTIP CARD UTILITIES
// ============================================================================

import React from 'react';
import { getTTSText } from '../ttsUtils';
import { wikipediaEntries } from '../../data/wikipediaEntries';

// Tooltip configuration constants
const TOOLTIP_STYLES = {
  METADATA: { fontSize: '0.8em', opacity: 0.7 },
  REDIRECT: { fontSize: '0.7em', opacity: 0.6, marginTop: '2px' },
  PART_OF_SPEECH: { fontStyle: 'italic', fontSize: '0.8em', opacity: 0.7 }
};

/**
 * Create tooltip content for regular words
 */
const createRegularTooltipContent = (translation, partOfSpeech, wordData) => {
  return (
    <>
      {translation}
      {partOfSpeech && (
        <span style={TOOLTIP_STYLES.PART_OF_SPEECH}>
          {' '}({partOfSpeech})
        </span>
      )}
      {wordData?.gender && (
        <span style={TOOLTIP_STYLES.METADATA}>
          {' '}({wordData.gender})
        </span>
      )}
      {wordData?.number && (
        <span style={TOOLTIP_STYLES.METADATA}>
          {' '}({wordData.number})
        </span>
      )}
      {wordData?.redirectInfo && (
        <div style={TOOLTIP_STYLES.REDIRECT}>
          {wordData.redirectInfo.redirectType.replace('_', ' ')} of {wordData.redirectInfo.baseWord}
        </div>
      )}
    </>
  );
};

/**
 * Create tooltip element with consistent styling
 */
const createTooltipElement = (content, tooltipPosition, className = "word-tooltip") => {
  return (
    <span
      className={className}
      style={{
        "--tooltip-shift": `${tooltipPosition.shift}px`,
        "--arrow-shift": `${tooltipPosition.arrowShift}px`,
        visibility: tooltipPosition.isVisible ? "visible" : "hidden",
      }}
    >
      {content}
    </span>
  );
};

/**
 * Create interactive word element with tooltips and TTS
 * @param {string} text - The text to display
 * @param {string} translation - The translation text
 * @param {string} uniqueKey - The unique key for the element
 * @param {Object} context - The rendering context
 * @param {string} partOfSpeech - The part of speech (optional)
 * @param {Object} wordData - Additional word data including redirect info (optional)
 * @returns {JSX.Element} - The interactive word element
 */
export const createInteractiveWordElement = (text, translation, uniqueKey, context, partOfSpeech = null, wordData = null) => {
  const { wordRefs, setHoveredWord, hoveredWord, tooltipPosition, speak } = context;
  const wikiEntry = wikipediaEntries[text] || wikipediaEntries[text.toLowerCase()];
  const isHovered = hoveredWord === uniqueKey;

  return (
    <span
      key={uniqueKey}
      ref={(el) => {
        if (el) wordRefs.current[uniqueKey] = el;
      }}
      className="interactive-word"
      onMouseEnter={() => setHoveredWord(uniqueKey)}
      onMouseLeave={() => setHoveredWord(null)}
      onClick={() => speak(getTTSText(text), "fr-FR")}
      style={{ cursor: "pointer" }}
    >
      {text}
      {isHovered && wikiEntry && createTooltipElement(
        createWikiCard(wikiEntry),
        tooltipPosition,
        "word-tooltip wiki-tooltip"
      )}
      {isHovered && !wikiEntry && createTooltipElement(
        createRegularTooltipContent(translation, partOfSpeech, wordData),
        tooltipPosition
      )}
    </span>
  );
};

/**
 * Create a missing translation element
 * @param {string} text - The text that's missing translation
 * @param {string} uniqueKey - The unique key for the element
 * @example "Bonjour"
 * @returns {JSX.Element} - The missing translation element
 */
export const createMissingTranslationElement = (text, uniqueKey) => {
  return (
    <span
      key={uniqueKey}
      className="missing-translation"
      title={`Translation missing for: ${text}`}
    >
      {text}
    </span>
  );
};

/**
 * Create a Wikipedia card with image, title, description, and link
 * @param {Object} wikiEntry - The Wikipedia entry data
 * @example {
 *   name: "Bonjour",
 *   description: "Hello",
 *   image: "https://example.com/image.jpg",
 *   url: "https://example.com/wiki/Bonjour"
 * }
 * @returns {JSX.Element} - The Wikipedia card element
 */
export const createWikiCard = (wikiEntry) => {
  return (
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
  );
};
