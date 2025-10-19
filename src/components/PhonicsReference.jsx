import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import SpeakButton from './SpeakButton';
import { getTTSText } from '../utils/ttsUtils';
import '../styles/PhonicsReference.css';

/**
 * Select the best available voice for a given language
 * Same logic as SpeakButton for consistent quality
 */
function selectBestVoice(voices, language) {
  const langCode = language.split("-")[0];
  const matchingVoices = voices.filter((v) => v.lang.startsWith(langCode));

  if (matchingVoices.length === 0) return null;

  // Priority 1: Google voices (Chrome - usually highest quality)
  const googleVoice = matchingVoices.find((v) => v.name.includes("Google"));
  if (googleVoice) return googleVoice;

  // Priority 2: Safari/macOS enhanced voices (look for specific high-quality French voices)
  if (langCode === 'fr') {
    const safariEnhancedVoice = matchingVoices.find((v) => {
      const nameLower = v.name.toLowerCase();
      return nameLower.includes("amélie") ||
        nameLower.includes("amelie") ||
        nameLower.includes("thomas") ||
        nameLower.includes("audrey") ||
        nameLower.includes("marie") ||
        nameLower.includes("enhanced") ||
        nameLower.includes("premium") ||
        nameLower.includes("neural") ||
        (nameLower.includes("compact") && nameLower.includes("fr"));
    });
    if (safariEnhancedVoice) return safariEnhancedVoice;
  }

  // Priority 3: General enhanced voices
  const enhancedVoice = matchingVoices.find(
    (v) =>
      v.name.toLowerCase().includes("enhanced") ||
      v.name.toLowerCase().includes("premium") ||
      v.name.toLowerCase().includes("neural") ||
      v.name.toLowerCase().includes("compact")
  );
  if (enhancedVoice) return enhancedVoice;

  // Priority 4: Female voices (often sound more natural)
  const femaleVoice = matchingVoices.find(
    (v) =>
      v.name.toLowerCase().includes("female") ||
      v.name.toLowerCase().includes("samantha") ||
      v.name.toLowerCase().includes("karen") ||
      v.name.toLowerCase().includes("fiona") ||
      v.name.toLowerCase().includes("amelie") ||
      v.name.toLowerCase().includes("amélie") ||
      v.name.toLowerCase().includes("paulina") ||
      v.name.toLowerCase().includes("marie") ||
      v.name.toLowerCase().includes("celine") ||
      v.name.toLowerCase().includes("céline") ||
      v.name.toLowerCase().includes("audrey") ||
      v.name.toLowerCase().includes("aurelie") ||
      v.name.toLowerCase().includes("aurélie")
  );
  if (femaleVoice) return femaleVoice;

  // Priority 5: Avoid low-quality voices
  const decentVoice = matchingVoices.find(
    (v) =>
      !v.name.toLowerCase().includes("alex") &&
      !v.name.toLowerCase().includes("fred") &&
      !v.name.toLowerCase().includes("ralph") &&
      !v.name.toLowerCase().includes("male") &&
      !v.name.toLowerCase().includes("daniel") &&
      !v.name.toLowerCase().includes("junior")
  );
  if (decentVoice) return decentVoice;

  // Last resort: Return first matching voice
  return matchingVoices[0];
}

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
          console.log(`Phonics TTS: ${bestVoice.name} (${bestVoice.lang})`);
        }
        window.speechSynthesis.speak(utterance);
      });
    } else {
      const bestVoice = selectBestVoice(voices, utterance.lang);
      if (bestVoice) {
        utterance.voice = bestVoice;
        console.log(`Phonics TTS: ${bestVoice.name} (${bestVoice.lang})`);
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

