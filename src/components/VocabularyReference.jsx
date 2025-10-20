import { useState, Fragment } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import SpeakButton from './SpeakButton';
import { getTTSText } from '../utils/ttsUtils';
import { renderGenderSplitText, getGenderClass, hasGenderSplit } from '../utils/genderSplitUtils.jsx';

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
 * Vocabulary Reference - Always-visible cheat sheet
 * Shows all vocabulary for current lesson
 */
function VocabularyReference({ vocabulary, title }) {
  const [isExpanded, setIsExpanded] = useState(true);

  if (!vocabulary || vocabulary.length === 0) {
    return null;
  }

  // Use centralized gender class helper

  // Helper to detect if this is the start of a new verb/concept section
  const isNewSection = (item, index, vocabularyArray) => {
    if (index === 0) return false; // First item never needs divider

    const note = (item.note || '').toLowerCase();

    // ONLY check note field for explicit verb markers - don't guess from french word!
    const isNewVerb = note.includes('regular -er verb') ||
      note.includes('regular -ir verb') ||
      note.includes('irregular -ir verb') ||
      note.includes('irregular verb') ||
      note.includes('impersonal') ||
      note.includes('causative') ||
      note.includes('section divider');

    return isNewVerb;
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
                const isSplitWord = hasGenderSplit(item.french, item.note);
                const genderClass = getGenderClass(item.note, isSplitWord);
                const needsDivider = isNewSection(item, idx, vocabulary);

                const handleRowClick = (e) => {
                  if (!item.french) return;

                  // Use ttsText if available, otherwise apply global TTS corrections
                  const speechText = item.ttsText || getTTSText(item.french);

                  // Use same high-quality voice selection as SpeakButton
                  if ('speechSynthesis' in window) {
                    window.speechSynthesis.cancel();

                    const utterance = new SpeechSynthesisUtterance(speechText);
                    utterance.lang = 'fr-FR';
                    utterance.rate = 0.9;
                    utterance.pitch = 1.0;
                    utterance.volume = 1.0;

                    let voices = window.speechSynthesis.getVoices();

                    // Handle async voice loading (some browsers load voices asynchronously)
                    if (voices.length === 0) {
                      window.speechSynthesis.addEventListener("voiceschanged", () => {
                        voices = window.speechSynthesis.getVoices();
                        const bestVoice = selectBestVoice(voices, utterance.lang);
                        if (bestVoice) {
                          utterance.voice = bestVoice;
                          console.log(`Vocab row TTS: ${bestVoice.name} (${bestVoice.lang})`);
                        }
                        window.speechSynthesis.speak(utterance);
                      });
                    } else {
                      const bestVoice = selectBestVoice(voices, utterance.lang);
                      if (bestVoice) {
                        utterance.voice = bestVoice;
                        console.log(`Vocab row TTS: ${bestVoice.name} (${bestVoice.lang})`);
                      }
                      window.speechSynthesis.speak(utterance);
                    }
                  }
                };

                return (
                  <Fragment key={`vocab-${idx}`}>
                    {needsDivider && (
                      <tr className="vocab-divider">
                        <td colSpan={3}>
                          <div className="vocab-section-break"></div>
                        </td>
                      </tr>
                    )}
                    <tr
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
                          {renderGenderSplitText(item.french, item.note)}
                          <SpeakButton text={item.french} ttsText={item.ttsText} language="fr-FR" size="small" />
                        </div>
                      </td>
                      <td className="vocab-english">{item.english}</td>
                      <td className="vocab-note">{item.note || '—'}</td>
                    </tr>
                  </Fragment>
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

