import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import SpeakButton from './SpeakButton';

/**
 * Vocabulary Reference - Always-visible cheat sheet
 * Shows all vocabulary for current lesson
 */
function VocabularyReference({ vocabulary, title }) {
  const [isExpanded, setIsExpanded] = useState(true);

  if (!vocabulary || vocabulary.length === 0) {
    return null;
  }

  // Helper to get gender class for color coding
  const getGenderClass = (note) => {
    if (!note) return '';
    const noteLower = note.toLowerCase();
    if (noteLower.includes('feminine')) return 'feminine';
    if (noteLower.includes('masculine')) return 'masculine';
    return '';
  };

  // Helper to detect if this is the start of a new verb/concept section
  const isNewSection = (item, index, vocabularyArray) => {
    if (index === 0) return false; // First item never needs divider

    // Detect new verb by:
    // 1. Contains a rank (⭐ Rank X) = new verb
    // 2. Is infinitive form (ends with -er, -ir, -re, -oir)
    // 3. Note contains "infinitive" or "rank"
    const note = (item.note || '').toLowerCase();
    const french = (item.french || '').toLowerCase();

    // Check if this is a new base verb
    const isBaseVerb = note.includes('rank') ||
      note.includes('infinitive') ||
      french.match(/[aeiou]r$/) || // ends with -er, -ir, -re, -oir
      french.match(/^[a-z]+$/) && french.length > 3; // simple base word

    return isBaseVerb;
  };

  return (
    <div className="vocab-reference">
      <div
        className="vocab-header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h4>📖 {title || 'Vocabulary Reference'}</h4>
        <button className="toggle-btn">
          {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </button>
      </div>

      {isExpanded && (
        <div className="vocab-table">
          <table>
            <thead>
              <tr>
                <th>French</th>
                <th>English</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {vocabulary.map((item, idx) => {
                const genderClass = getGenderClass(item.note);
                const needsDivider = isNewSection(item, idx, vocabulary);

                const handleRowClick = (e) => {
                  if (!item.french) return;

                  // Ensure this is treated as a direct user interaction for Chrome
                  if ('speechSynthesis' in window) {
                    window.speechSynthesis.cancel();

                    const utterance = new SpeechSynthesisUtterance(item.french);
                    utterance.lang = 'fr-FR';
                    utterance.rate = 0.9;
                    utterance.pitch = 1.0;
                    utterance.volume = 1.0;

                    // Handle voice selection like SpeakButton does
                    let voices = window.speechSynthesis.getVoices();

                    // Handle async voice loading (Chrome requirement)
                    if (voices.length === 0) {
                      window.speechSynthesis.addEventListener("voiceschanged", () => {
                        voices = window.speechSynthesis.getVoices();
                        const frenchVoices = voices.filter(v => v.lang.startsWith('fr'));
                        if (frenchVoices.length > 0) {
                          // Prefer Google or enhanced voices
                          const bestVoice = frenchVoices.find(v => v.name.includes('Google')) ||
                            frenchVoices.find(v => v.name.toLowerCase().includes('enhanced')) ||
                            frenchVoices[0];
                          utterance.voice = bestVoice;
                        }
                        window.speechSynthesis.speak(utterance);
                      });
                    } else {
                      const frenchVoices = voices.filter(v => v.lang.startsWith('fr'));
                      if (frenchVoices.length > 0) {
                        // Prefer Google or enhanced voices
                        const bestVoice = frenchVoices.find(v => v.name.includes('Google')) ||
                          frenchVoices.find(v => v.name.toLowerCase().includes('enhanced')) ||
                          frenchVoices[0];
                        utterance.voice = bestVoice;
                      }
                      window.speechSynthesis.speak(utterance);
                    }
                  }
                };

                return (
                  <>
                    {needsDivider && (
                      <tr key={`divider-${idx}`} className="vocab-divider">
                        <td colSpan={3}>
                          <div className="vocab-section-break"></div>
                        </td>
                      </tr>
                    )}
                    <tr
                      key={idx}
                      onClick={handleRowClick}
                      className="vocab-row-clickable"
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleRowClick(e);
                        }
                      }}
                    >
                      <td className={`vocab-french ${genderClass}`}>
                        <div className="vocab-with-audio">
                          {item.french}
                          <SpeakButton text={item.french} language="fr-FR" size="small" />
                        </div>
                      </td>
                      <td className="vocab-english">{item.english}</td>
                      <td className="vocab-note">{item.note || '—'}</td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default VocabularyReference;

