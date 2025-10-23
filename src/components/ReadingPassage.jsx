/**
 * Interactive Reading Passage Component
 * 
 * Renders French text with hover tooltips, TTS pronunciation, and translation toggle.
 * Supports rich markup for years, speakers, italics, phrases, images, and formatting.
 * 
 * @component
 * @param {Object} passage - Reading passage data with French text and English translation
 * @example {
 *   title: "La nouvelle époque de Marie (Marie's new life)",
 *   text: "**Paul[9]:** Marie ! Tu veux aller au Jardin du Luxembourg avec moi ?",
 *   translation: "**Paul:** Marie! Do you want to go to Jardin du Luxembourg with me?"
 * 
 * }
 * 
 * ## Markup Syntax
 * - **Years**: `{1871}` - Explicit year marking for French pronunciation
 * - **Subheaders**: `## Section Title` - Styled section headers
 * - **Horizontal Rules**: `---` - Clean visual separators
 * - **Images**: `![path/to/image.jpg]` - Embedded images
 * - **Italics**: `_text_` - Emphasized text
 * - **Phrases**: `[multi-word phrase]` - Explicit phrase highlighting
 * - **Speakers**: `**Speaker:**` - Dialogue labels
 *   - Default: No color styling
 *   - Optional: `**Speaker[0]:**` for color assignment (14 colors available)
 *   - Colors: [0]=Blue, [1]=Red, [2]=Green, [3]=Orange, [4]=Purple, [5]=Cyan, etc.
 *   - Color palette: `src/utils/readings/speakerColorUtils.js`
 * 
 * ## Features
 * - Interactive word tooltips with translations and Wikipedia entries
 * - Text-to-speech pronunciation for French text
 * - Dynamic speaker color assignment
 * - Responsive design for web and mobile
 * - Markdown stripping for clean English translations
 * @returns {JSX.Element} The rendered reading passage component
 */
import React from 'react';
import { useState, useRef, useEffect } from 'react';
import SpeakButton from './SpeakButton';
import { useSpeech } from '../hooks/useSpeech';
import { isImageMarker, extractImageInfo } from '../utils/readings/imgUtils';
import { stripMarkdown } from '../utils/markdownUtils';
import {
  calculateTooltipPosition,
  renderInteractiveText,
  resetDiscoveredSpeakers
} from '../utils/readings';

// Word translations now imported from readingVocabulary.js (deduplicated, 1752 unique entries)
// Multi-word phrases now imported from readingVocabularyPhrases.js
// Wikipedia entries now imported from separate data file

function ReadingPassage({ passage }) {
  const [showTranslation, setShowTranslation] = useState(false);
  const [hoveredWord, setHoveredWord] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ shift: 0, arrowShift: 0, isVisible: false });
  const wordRefs = useRef({});
  const { speak } = useSpeech();

  // Reset speaker colors when component mounts (new reading session)
  useEffect(() => {
    resetDiscoveredSpeakers();
  }, []);

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

            // Check if this paragraph is a subheader (starts with ##)
            const subheaderMatch = paragraph.match(/^##\s*(.+)$/);
            if (subheaderMatch) {
              return (
                <div key={pIdx} className="paragraph-block paragraph-subheader">
                  {renderInteractiveText(paragraph, pIdx, wordRefs, setHoveredWord, hoveredWord, tooltipPosition, speak)}
                </div>
              );
            }

            // Check if this paragraph is a horizontal rule (starts with ---)
            const horizontalRuleMatch = paragraph.match(/^---$/);
            if (horizontalRuleMatch) {
              return (
                <div key={pIdx} className="paragraph-block paragraph-horizontal-rule">
                  {renderInteractiveText(paragraph, pIdx, wordRefs, setHoveredWord, hoveredWord, tooltipPosition, speak)}
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

