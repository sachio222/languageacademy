import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import SpeakButton from './SpeakButton';
import { getTTSText, selectBestVoice } from '../utils/ttsUtils';
import '../styles/PhonicsReference.css';
import { logger } from "../utils/logger";

/**
 * PhonicsReference Component
 * Shows French sound-to-spelling correspondences for speech-to-print learning
 */
function PhonicsReference({ phonicsData }) {
  // Track which categories are expanded
  const [expandedCategories, setExpandedCategories] = useState(
    new Set(phonicsData.map((_, idx) => idx)) // Start with all expanded
  );

  const toggleCategory = (index) => {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const handleSpeak = (text) => {
    if (!text || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();

    const speechText = getTTSText(text);
    const utterance = new SpeechSynthesisUtterance(speechText);
    utterance.lang = 'fr-FR';
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    let voices = window.speechSynthesis.getVoices();

    // Handle async voice loading
    if (voices.length === 0) {
      window.speechSynthesis.addEventListener("voiceschanged", () => {
        voices = window.speechSynthesis.getVoices();
        const bestVoice = selectBestVoice(voices, utterance.lang);
        if (bestVoice) {
          utterance.voice = bestVoice;
          logger.log(`Phonics TTS: ${bestVoice.name} (${bestVoice.lang})`);
        }
        window.speechSynthesis.speak(utterance);
      });
    } else {
      const bestVoice = selectBestVoice(voices, utterance.lang);
      if (bestVoice) {
        utterance.voice = bestVoice;
        logger.log(`Phonics TTS: ${bestVoice.name} (${bestVoice.lang})`);
      }
      window.speechSynthesis.speak(utterance);
    }
  };

  // Show empty state if no data
  if (!phonicsData || phonicsData.length === 0) {
    return (
      <div className="phonics-reference">
        <div className="phonics-intro">
          <h3>French Spelling Patterns</h3>
          <p>Learn how French sounds map to different spellings. Click any word to hear it pronounced.</p>
        </div>
        <div className="nav-empty" style={{ padding: '2rem 1rem', textAlign: 'center', color: '#665665' }}>
          No phonics patterns found
        </div>
      </div>
    );
  }

  return (
    <div className="phonics-reference">
      <div className="phonics-intro">
        <h3>French Spelling Patterns</h3>
        <p>Learn how French sounds map to different spellings. Click any word to hear it pronounced.</p>
      </div>

      {phonicsData.map((category, categoryIdx) => {
        const isExpanded = expandedCategories.has(categoryIdx);

        return (
          <div key={categoryIdx} className="phonics-category">
            <div
              className="phonics-category-header"
              onClick={() => toggleCategory(categoryIdx)}
            >
              <span className="phonics-category-icon">{category.icon}</span>
              <h4 className="phonics-category-title">{category.category}</h4>
              <button className="phonics-toggle-btn">
                {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
              </button>
            </div>

            {isExpanded && (
              <div className="phonics-patterns">
                {category.patterns.map((pattern, patternIdx) => (
                  <div key={patternIdx} className="phonics-pattern">
                    <div className="phonics-sound-header">
                      <div className="phonics-sound-info">
                        <span className="phonics-sound">{pattern.sound}</span>
                        <span className="phonics-description">{pattern.description}</span>
                      </div>
                    </div>

                    <div className="phonics-spellings">
                      {pattern.spellings.map((spelling, spellingIdx) => (
                        <div key={spellingIdx} className="phonics-spelling">
                          <div className="phonics-spelling-header">
                            <span className="phonics-spelling-text">{spelling.spelling}</span>
                            {spelling.notes && (
                              <span className="phonics-spelling-notes">{spelling.notes}</span>
                            )}
                          </div>
                          <div className="phonics-examples">
                            {spelling.examples.map((example, exampleIdx) => (
                              <button
                                key={exampleIdx}
                                className="phonics-example"
                                onClick={() => handleSpeak(example)}
                                title={`Click to hear "${example}"`}
                              >
                                <span className="phonics-example-text">{example}</span>
                                <SpeakButton
                                  text={example}
                                  language="fr-FR"
                                  size="small"
                                  className="phonics-example-speaker"
                                />
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default PhonicsReference;

