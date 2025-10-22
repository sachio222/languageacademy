/**
 * Reading Passage Component
 * Displays a reading passage with translation toggle and interactive word tooltips
 */
import React from 'react';
import { useState, useRef, useEffect } from 'react';
import SpeakButton from './SpeakButton';
import { useSpeech } from '../hooks/useSpeech';
import { isImageMarker, extractImageInfo } from '../utils/readings/imgUtils';
import { stripMarkdown } from '../utils/markdownUtils';
import { calculateTooltipPosition } from '../utils/readings/toottipUtils';
import { renderInteractiveText } from '../utils/readings/textRenderingUtils.jsx';

// Word translations now imported from readingVocabulary.js (deduplicated, 1752 unique entries)
// Multi-word phrases now imported from readingVocabularyPhrases.js
// Wikipedia entries now imported from separate data file

function ReadingPassage({ passage }) {
  const [showTranslation, setShowTranslation] = useState(false);
  const [hoveredWord, setHoveredWord] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ shift: 0, arrowShift: 0, isVisible: false });
  const wordRefs = useRef({});
  const { speak } = useSpeech();

  useEffect(() => {
    calculateTooltipPosition(hoveredWord, wordRefs, setTooltipPosition);
  }, [hoveredWord]);

  if (!passage) return null;

  const frenchParagraphs = passage.text.split('\n\n');
  const englishParagraphs = passage.translation.split('\n\n');

  return (
    <div className="reading-passage">
      <div className="passage-header">
        <div className="passage-meta">Reading Comprehension</div>
        <h1>{passage.title}</h1>
        <div className="passage-controls">
          <button
            className="btn-translation"
            onClick={() => setShowTranslation(!showTranslation)}
          >
            {showTranslation ? 'Hide' : 'Show'} English Translation
          </button>
        </div>
      </div>

      <div className="passage-content">
        {/* Read entire passage button - above first paragraph */}
        <div className="passage-audio-header">
          <SpeakButton
            text={stripMarkdown(passage.text)}
            language="fr-FR"
            size="medium"
            ariaLabel="Read entire passage aloud"
          />
          <span className="audio-label">Listen to entire passage</span>
        </div>

        <div className="passage-french">
          {frenchParagraphs.map((paragraph, pIdx) => {
            // Check if this paragraph is an image marker
            if (isImageMarker(paragraph)) {
              const imageInfo = extractImageInfo(paragraph);
              if (!imageInfo) return null;

              return (
                <div key={pIdx} className="paragraph-block paragraph-image">
                  <img
                    src={`/${imageInfo.path}`}
                    alt={`Reading illustration ${pIdx + 1}`}
                    className="reading-image"
                    style={imageInfo.style}
                  />
                </div>
              );
            }

            // Regular paragraph
            return (
              <div key={pIdx} className="paragraph-block paragraph-with-audio">
                <p className="french-text">
                  {renderInteractiveText(paragraph, pIdx, wordRefs, setHoveredWord, hoveredWord, tooltipPosition, speak)}
                </p>
                {/* Per-paragraph speaker button - appears on hover */}
                <div className="paragraph-audio-btn">
                  <SpeakButton
                    text={stripMarkdown(paragraph)}
                    language="fr-FR"
                    size="small"
                    ariaLabel={`Read paragraph ${pIdx + 1}`}
                  />
                </div>
                {showTranslation && (
                  <p className="english-translation">{stripMarkdown(englishParagraphs[pIdx])}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="passage-instructions">
        <strong>💡 Tip:</strong> Hover over any French word to see its English translation! Click on any word to hear it spoken.
        Hover over paragraphs to read them individually.
      </div>
    </div>
  );
}

export default ReadingPassage;

