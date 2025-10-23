// ============================================================================
// TOOLTIP CARD UTILITIES
// ============================================================================

import React from 'react';
import { getTTSText } from '../ttsUtils';
import { wikipediaEntries } from '../../data/wikipediaEntries';

/**
 * Create an interactive word element with tooltips and TTS
 * @param {string} text - The text to display
 * @param {string} translation - The translation text
 * @param {string} uniqueKey - The unique key for the element
 * @param {Object} context - The rendering context
 * @param {string} partOfSpeech - The part of speech (optional)
 * @returns {JSX.Element} - The interactive word element
 */
export const createInteractiveWordElement = (text, translation, uniqueKey, context, partOfSpeech = null) => {
  const { wordRefs, setHoveredWord, hoveredWord, tooltipPosition, speak } = context;
  const wikiEntry = wikipediaEntries[text] || wikipediaEntries[text.toLowerCase()];

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
      {hoveredWord === uniqueKey && wikiEntry && (
        <span
          className="word-tooltip wiki-tooltip"
          style={{
            "--tooltip-shift": `${tooltipPosition.shift}px`,
            "--arrow-shift": `${tooltipPosition.arrowShift}px`,
            visibility: tooltipPosition.isVisible ? "visible" : "hidden",
          }}
        >
          {createWikiCard(wikiEntry)}
        </span>
      )}
      {hoveredWord === uniqueKey && !wikiEntry && (
        <span className="word-tooltip">
          {translation}
          {partOfSpeech && (
            <span style={{ fontStyle: 'italic', fontSize: '0.8em', opacity: 0.7 }}>
              {' '}({partOfSpeech})
            </span>
          )}
        </span>
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
