import { useState, useEffect, useRef } from 'react';
import SpeakButton from './SpeakButton';
import { detectLanguage } from '../hooks/useSpeech';
import { usePageTime } from '../hooks/usePageTime';
import { useSectionProgress } from '../contexts/SectionProgressContext';
import { useSupabaseProgress } from '../contexts/SupabaseProgressContext';
import { extractModuleId } from '../utils/progressSync';
import { logger } from '../utils/logger';
import { splitTitle } from '../utils/moduleUtils';

/**
 * Study Mode - Learn before you test
 * Flashcard-style learning with answers revealed
 */

function StudyMode({ exercises, onFinishStudying, currentExerciseIndex = 0, updateExerciseInUrl, lesson }) {
  const [currentIndex, setCurrentIndex] = useState(currentExerciseIndex);
  const [isRevealed, setIsRevealed] = useState(false);
  const completionCalled = useRef(false);

  // Track page time for study time analytics
  const pageId = `studymode-${exercises?.length || 0}-exercises`;
  const { totalTime: pageTime, isTracking } = usePageTime(pageId, true);

  // Section progress tracking
  const { completeSectionProgress } = useSectionProgress();
  const { isAuthenticated } = useSupabaseProgress();

  // Extract moduleId from lesson
  const moduleId = lesson ? extractModuleId(lesson) : null;

  // Safety check for empty exercises
  if (!exercises || exercises.length === 0) {
    // Extract module prefix from lesson title
    const { modulePrefix } = lesson ? splitTitle(lesson.title) : { modulePrefix: null };

    return (
      <div className="study-mode">
        <div className="study-header">
          {modulePrefix && (
            <div className="module-prefix">
              {modulePrefix}
            </div>
          )}
          <h2>📚 Study Mode</h2>
          <p className="study-description">No exercises available for this module.</p>
        </div>
        <div className="study-navigation">
          <button className="btn-nav btn-primary" onClick={onFinishStudying}>
            Continue
          </button>
        </div>
      </div>
    );
  }

  // Sync with URL parameter changes (for browser back/forward)
  useEffect(() => {
    setCurrentIndex(currentExerciseIndex);
  }, [currentExerciseIndex]);

  // Auto-complete study-mode section when viewing the last flashcard
  useEffect(() => {
    const isLastCard = currentIndex === exercises.length - 1;

    if (isLastCard && !completionCalled.current && isAuthenticated && moduleId) {
      completionCalled.current = true;

      logger.log('StudyMode: Auto-completing flash-cards section - last flashcard viewed');

      completeSectionProgress(moduleId, 'flash-cards', {
        flashcards_viewed: exercises.length,
        completion_method: 'viewed_all_flashcards'
      }).then(result => {
        logger.log('StudyMode: Section completion successful', result);
      }).catch(error => {
        logger.error('StudyMode: Error completing flash-cards section:', error);
      });
    }
  }, [currentIndex, exercises.length, isAuthenticated, moduleId, completeSectionProgress]);

  const currentExercise = exercises[currentIndex];
  const progress = ((currentIndex + 1) / exercises.length) * 100;

  // Extract module prefix from lesson title
  const { modulePrefix } = lesson ? splitTitle(lesson.title) : { modulePrefix: null };

  const handleNext = () => {
    if (currentIndex < exercises.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      setIsRevealed(false);
      if (updateExerciseInUrl) {
        updateExerciseInUrl(newIndex);
      }
    } else {
      onFinishStudying();
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      setIsRevealed(false);
      if (updateExerciseInUrl) {
        updateExerciseInUrl(newIndex);
      }
    }
  };

  return (
    <div className="study-mode">
      <div className="study-header">
        {modulePrefix && (
          <div className="module-prefix">
            {modulePrefix}
          </div>
        )}
        <h2>📚 Study Mode - Learn First!</h2>
        <p className="study-description">Review all answers before testing yourself</p>
        <div className="study-progress-bar">
          <div className="study-progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <span className="study-progress-text">
          {currentIndex + 1} of {exercises.length}
        </span>
      </div>

      <div className="flashcard">
        <div className="flashcard-front">
          <div className="flashcard-label">Question:</div>
          <div className="flashcard-content">
            <h2>{currentExercise.prompt}</h2>
            <SpeakButton
              text={currentExercise.prompt}
              language={detectLanguage(currentExercise.prompt)}
              size="large"
              className="flashcard-speaker"
            />
          </div>
        </div>

        {!isRevealed ? (
          <button
            className="reveal-btn"
            onClick={() => setIsRevealed(true)}
          >
            🔍 Click to Reveal Answer
          </button>
        ) : (
          <div className="flashcard-back">
            <div className="flashcard-label">Answer:</div>
            <div className="flashcard-answer">
              <h2>{currentExercise.expectedAnswer}</h2>
              <SpeakButton
                text={currentExercise.expectedAnswer}
                ttsText={currentExercise.ttsText}
                language="fr-FR"
                size="large"
                className="flashcard-speaker"
              />
              {currentExercise.article && (
                <div className="flashcard-article">
                  with article: {currentExercise.article}
                </div>
              )}
            </div>
            {currentExercise.hint && (
              <div className="flashcard-hint">
                💡 {currentExercise.hint}
              </div>
            )}
            {currentExercise.instruction && (
              <div className="flashcard-instruction">
                ℹ️ {currentExercise.instruction}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="study-navigation">
        <button
          className="btn-nav"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
        >
          ← Previous
        </button>

        <button
          className="btn-nav btn-primary"
          onClick={handleNext}
        >
          {currentIndex === exercises.length - 1 ? '✓ Start Exercises' : 'Next →'}
        </button>
      </div>
    </div>
  );
}

export default StudyMode;

