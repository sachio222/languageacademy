import { useEffect, useState } from 'react';
import '../styles/ModuleCompleteModal.css';
import SpeakButton from './SpeakButton';
import PricingModal from './PricingModal';
import { useSubscription } from '../hooks/useSubscription';
import { getTTSText, selectBestVoice } from '../utils/ttsUtils';
import { createVocabRowClickHandler } from '../utils/vocabularyUtils';
import { logger } from '../utils/logger';

function ModuleCompleteModal({ lesson, onNextModule, onBackToModules, onClose, onTakeExam, onRetakeExercises, totalModules, hasNextModule, timeSpent = 0 }) {
  const { isPaid, showPricingModal, pricingModalContext, showUpgradeModal, hideUpgradeModal } = useSubscription();
  const [hasTriggeredUpgrade, setHasTriggeredUpgrade] = useState(false);
  
  if (!lesson) return null;

  // Check if this is the last lesson of Unit 1 (lesson 11)
  const isUnit1Complete = lesson.id === 11;
  const shouldShowUpgradePrompt = isUnit1Complete && !isPaid && !hasTriggeredUpgrade;

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

  // Trigger upgrade modal for Unit 1 completion (free users only)
  useEffect(() => {
    if (shouldShowUpgradePrompt) {
      // Delay slightly to let completion modal show first
      const timer = setTimeout(() => {
        showUpgradeModal('unit-1-complete', {
          hasCompletedUnit1: true,
          wordsLearned: vocabularyItems.length,
          timeSpent
        });
        setHasTriggeredUpgrade(true);
      }, 1500); // 1.5 second delay for celebration to sink in
      
      return () => clearTimeout(timer);
    }
  }, [shouldShowUpgradePrompt, showUpgradeModal, vocabularyItems.length, timeSpent]);

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
                  // Create handler outside of JSX for better performance
                  const handleRowClick = createVocabRowClickHandler(
                    item.french,
                    item.ttsText,
                    getTTSText,
                    selectBestVoice,
                    logger
                  );

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
          {/* Show upgrade button for Unit 1 complete (free users) */}
          {shouldShowUpgradePrompt ? (
            <>
              <button 
                className="btn-primary btn-large"
                onClick={() => showUpgradeModal('unit-1-complete', {
                  hasCompletedUnit1: true,
                  wordsLearned: vocabularyItems.length,
                  timeSpent
                })}
                style={{
                  background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                  border: 'none'
                }}
              >
                🎉 Unlock All Units & Continue Learning →
              </button>
              <button
                className="btn-secondary"
                onClick={onBackToModules}
              >
                Back to Home
              </button>
            </>
          ) : (
            <>
              {showNextButton && (
                <button className="btn-primary btn-large" onClick={onNextModule}>
                  Continue to Next Module →
                </button>
              )}
              <button
                className={showNextButton ? "btn-secondary" : "btn-primary"}
                onClick={onBackToModules}
              >
                Back to Home
              </button>
            </>
          )}
        </div>
      </div>

      {/* Pricing Modal (renders separately) */}
      <PricingModal
        isOpen={showPricingModal}
        onClose={() => hideUpgradeModal(false, null)}
        context={pricingModalContext}
      />
    </div>
  );
}

export default ModuleCompleteModal;


