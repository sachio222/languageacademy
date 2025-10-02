import { useState } from 'react';

/**
 * Study Mode - Learn before you test
 * Flashcard-style learning with answers revealed
 */
function StudyMode({ exercises, onFinishStudying }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);

  const currentExercise = exercises[currentIndex];
  const progress = ((currentIndex + 1) / exercises.length) * 100;

  const handleNext = () => {
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsRevealed(false);
    } else {
      onFinishStudying();
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsRevealed(false);
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
          </div>
        </div>

        {!isRevealed ? (
          <button
            className="reveal-btn"
            onClick={() => setIsRevealed(true)}
          >
            🔍 Reveal Answer
          </button>
        ) : (
          <div className="flashcard-back">
            <div className="flashcard-label">Answer:</div>
            <div className="flashcard-answer">
              <h2>{currentExercise.expectedAnswer}</h2>
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

