import { useState, useEffect, useRef } from 'react';
import { runTests, isExerciseComplete } from '../lessons/testRunner';
import TestOutput from './TestOutput';
import ReadingPassage from './ReadingPassage';

function ExercisePane({
  exercise,
  onNext,
  onPrevious,
  isFirstExercise,
  isLastExercise,
  isCompleted,
  onComplete,
  readingPassage,
  onBackToLesson
}) {
  const [userAnswer, setUserAnswer] = useState('');
  const [testResults, setTestResults] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const textareaRef = useRef(null);

  const handleSubmit = () => {
    if (!userAnswer.trim()) {
      alert('Please enter an answer first!');
      return;
    }

    // Blur the textarea so arrow keys work for navigation
    if (document.activeElement && document.activeElement.tagName === 'TEXTAREA') {
      document.activeElement.blur();
    }

    // If there's a reading passage, this is a reading comprehension exercise
    const isReadingComprehension = !!readingPassage;
    const results = runTests(exercise, userAnswer, isReadingComprehension);
    setTestResults(results);

    if (isExerciseComplete(results)) {
      onComplete(exercise.id);
    }
  };

  const handleKeyDown = (e) => {
    // Cmd+Enter (Mac) or Ctrl+Enter (Windows/Linux)
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Reset when exercise changes and focus textarea
  useEffect(() => {
    setUserAnswer('');
    setTestResults(null);
    setShowHint(false);

    // Focus the textarea after a brief delay to ensure it's rendered
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }, 0);
  }, [exercise.id]);

  const handleReset = () => {
    setUserAnswer('');
    setTestResults(null);
    setShowHint(false);
  };

  const handleNextExercise = () => {
    handleReset();
    onNext();
  };

  const canProceed = testResults && isExerciseComplete(testResults);

  // Global keyboard shortcuts for navigation
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      // Don't trigger if user is typing in textarea
      if (e.target.tagName === 'TEXTAREA') return;

      // Left arrow for Previous
      if (e.key === 'ArrowLeft' && !isFirstExercise) {
        e.preventDefault();
        onPrevious();
      }

      // Right arrow for Next (only if tests passed)
      if (e.key === 'ArrowRight' && !isLastExercise && canProceed) {
        e.preventDefault();
        handleNextExercise();
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isFirstExercise, isLastExercise, canProceed, onPrevious, handleNextExercise]);

  const isReadingModule = !!readingPassage;

  return (
    <div className={isReadingModule ? "reading-exercise-container" : "exercise-pane"}>
      {/* Show reading passage at top for ALL exercises in reading modules */}
      {readingPassage && (
        <div className="reading-article-wrapper">
          <ReadingPassage passage={readingPassage} />
        </div>
      )}

      <div className={isReadingModule ? "reading-quiz-section" : ""}>
        <div className="exercise-header">
          {onBackToLesson && (
            <div className="exercise-header-left">
              <button className="btn-back-to-lesson" onClick={onBackToLesson}>
                ← Back to Lesson
              </button>
            </div>
          )}
          <div className="exercise-title-row">
            <h3>{isReadingModule ? '📖' : '✏️'} Exercise {exercise.id}</h3>
            {isCompleted && <span className="badge-done">✓ Done</span>}
          </div>
        </div>

        <div className="exercise-instruction">
          <p><strong>{isReadingModule ? 'Question' : 'Task'}:</strong> {exercise.instruction}</p>
          {!isReadingModule && <p><strong>Answer:</strong> "{exercise.prompt}"</p>}
          {isReadingModule && <p><strong>Find the answer in the passage above</strong></p>}
        </div>

        <div className="code-editor">
          <div className="editor-header">
            <span>answer.fr</span>
            <span className="editor-language">French</span>
            <span className="editor-shortcut">⌘/Ctrl + Enter to submit</span>
          </div>
          <textarea
            ref={textareaRef}
            className="code-input"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your French sentence here..."
            spellCheck="false"
            autoFocus
          />
        </div>

        <div className="exercise-actions">
          <button
            className="btn-hint"
            onClick={() => setShowHint(!showHint)}
          >
            💡 {showHint ? 'Hide' : 'Show'} Hint
          </button>

          <div className="action-buttons">
            <button
              className="btn-secondary"
              onClick={handleReset}
            >
              Reset
            </button>
            <button
              className="btn-primary"
              onClick={handleSubmit}
            >
              <span className="keyboard-shortcut">⌘ Enter</span>
              Submit
            </button>
          </div>
        </div>

        {showHint && (
          <div className="hint-box">
            <strong>💡 Hint:</strong> {exercise.hint}
          </div>
        )}

        {testResults && (
          <TestOutput
            results={testResults}
            expectedAnswer={exercise.expectedAnswer}
          />
        )}

        {canProceed && (
          <div className="success-message">
            <h4>🎉 Excellent! All tests passed!</h4>
            <p>You've successfully completed this exercise.</p>
          </div>
        )}

        <div className="navigation-buttons">
          <button
            className="btn-nav"
            onClick={onPrevious}
            disabled={isFirstExercise}
          >
            ← Previous
            {!isFirstExercise && <span className="keyboard-shortcut-nav">←</span>}
          </button>

          <button
            className="btn-nav"
            onClick={handleNextExercise}
            disabled={isLastExercise || !canProceed}
          >
            Next →
            {!isLastExercise && canProceed && <span className="keyboard-shortcut-nav">→</span>}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExercisePane;


