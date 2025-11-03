import { useEffect } from 'react';
import '../styles/ModuleCompleteModal.css';
import SpeakButton from './SpeakButton';
import { getTTSText } from '../utils/ttsUtils';
import { logger } from '../utils/logger';

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
    (v) => v.name.toLowerCase().includes("female") || v.name.toLowerCase().includes("woman")
  );
  if (femaleVoice) return femaleVoice;

  // Last resort: Return first matching voice
  return matchingVoices[0];
}

function ModuleCompleteModal({ lesson, onNextModule, onBackToModules, onClose, onTakeExam, onRetakeExercises, totalModules, hasNextModule, timeSpent = 0 }) {
  if (!lesson) return null;

  // Use prop if provided, otherwise fallback to ID comparison
  const showNextButton = hasNextModule !== undefined ? hasNextModule : lesson.id < totalModules;
  const vocabularyItems = lesson.vocabularyReference || [];
  const concepts = lesson.concepts || [];

  // Format time spent
  const formatTime = (seconds) => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return secs > 0 ? `${minutes}m ${secs}s` : `${minutes}m`;
  };

  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={(e) => {
      // Close on backdrop click without navigating
      if (e.target.className === 'modal-overlay') {
        onClose();
      }
    }}>
      <div className="modal-content module-complete-modal">
        <div className="modal-header">
          <button className="modal-close-btn" onClick={onClose} title="Close">
            ×
          </button>
          <h3>🎉 Module Complete</h3>
          {lesson.exercises && lesson.exercises.length > 0 && onRetakeExercises && (
            <button className="reset-exercises-link" onClick={onRetakeExercises}>
              Clear progress
            </button>
          )}
        </div>

        <div className="modal-body">
          {/* Stats Section */}
          <div className="completion-stats">
            <div className="stat-card">
              <div className="stat-icon">✅</div>
              <div className="stat-value">{lesson.exercises?.length || 0}</div>
              <div className="stat-label">Exercises</div>
            </div>
            {vocabularyItems.length > 0 && (
              <div className="stat-card">
                <div className="stat-icon">📚</div>
                <div className="stat-value">{vocabularyItems.length}</div>
                <div className="stat-label">Words</div>
              </div>
            )}
            {timeSpent > 0 && (
              <div className="stat-card">
                <div className="stat-icon">⏱️</div>
                <div className="stat-value">{formatTime(timeSpent)}</div>
                <div className="stat-label">Time</div>
              </div>
            )}
          </div>

          {/* Vocabulary Summary */}
          {vocabularyItems.length > 0 && (
            <div className="summary-section">
              <h4>📖 Vocabulary Learned</h4>
              <div className="vocabulary-grid">
                {vocabularyItems.map((item, index) => {
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
                            logger.log(`Module complete vocab TTS: ${bestVoice.name} (${bestVoice.lang})`);
                          }
                          window.speechSynthesis.speak(utterance);
                        });
                      } else {
                        const bestVoice = selectBestVoice(voices, utterance.lang);
                        if (bestVoice) {
                          utterance.voice = bestVoice;
                          logger.log(`Module complete vocab TTS: ${bestVoice.name} (${bestVoice.lang})`);
                        }
                        window.speechSynthesis.speak(utterance);
                      }
                    }
                  };

                  return (
                    <div
                      key={index}
                      className="vocabulary-summary-item clickable-row"
                      onClick={handleRowClick}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleRowClick(e);
                        }
                      }}
                    >
                      <div className="vocab-content">
                        <span className="vocab-french">{item.french}</span>
                        <span className="vocab-arrow">→</span>
                        <span className="vocab-english">{item.english}</span>
                      </div>
                      <div
                        className="vocab-speak-btn-container"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <SpeakButton
                          text={item.french}
                          ttsText={item.ttsText}
                          language="fr-FR"
                          size="small"
                          className="vocab-speak-btn"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Concepts Summary */}
          {concepts.length > 0 && (
            <div className="summary-section">
              <h4>🎯 Key Concepts</h4>
              <div className="concepts-grid">
                {concepts.map((concept, index) => (
                  <div key={index} className="concept-summary-card">
                    <div className="concept-term">{concept.term}</div>
                    <div className="concept-definition">{concept.definition}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          {showNextButton && (
            <button className="btn-primary btn-large" onClick={onNextModule}>
              Continue to Next Module →
            </button>
          )}
          <button
            className={showNextButton ? "btn-secondary" : "btn-primary"}
            onClick={onBackToModules}
          >
            Back to Modules
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModuleCompleteModal;


