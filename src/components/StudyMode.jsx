import { useState, useEffect } from 'react';
import SpeakButton from './SpeakButton';
import { detectLanguage } from '../hooks/useSpeech';
import { usePageTime } from '../hooks/usePageTime';

/**
 * Study Mode - Learn before you test
 * Flashcard-style learning with answers revealed
 */
function StudyMode({ exercises, onFinishStudying, currentExerciseIndex = 0, updateExerciseInUrl }) {
  const [currentIndex, setCurrentIndex] = useState(currentExerciseIndex);
  const [isRevealed, setIsRevealed] = useState(false);

  // Track page time for study time analytics
  const pageId = `studymode-${exercises?.length || 0}-exercises`;
  const { totalTime: pageTime, isTracking } = usePageTime(pageId, true);

  // Safety check for empty exercises
  if (!exercises || exercises.length === 0) {
    return (
      <div className="study-mode">
        <div className="study-header">
          <h3>📚 Study Mode</h3>
          <p>No exercises available for this module.</p>
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

  const currentExercise = exercises[currentIndex];
  const progress = ((currentIndex + 1) / exercises.length) * 100;

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
        <h3>📚 Study Mode - Learn First!</h3>
        <p>Review all answers before testing yourself</p>
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

