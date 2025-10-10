import { useState, useEffect, useRef } from 'react';
import { runTests, isExerciseComplete } from '../lessons/testRunner';
import TestOutput from './TestOutput';
import ReadingPassage from './ReadingPassage';
import FrenchCharacterPicker from './FrenchCharacterPicker';
import { ArrowBigLeft } from 'lucide-react';
import { extractModuleId, extractUnitId } from '../utils/progressSync';
import { useTextTracking } from '../hooks/useTextTracking';

function ExercisePane({
  exercise,
  onNext,
  onPrevious,
  isFirstExercise,
  isLastExercise,
  isCompleted,
  onComplete,
  readingPassage,
  onBackToLesson,
  moduleId,
  unitId
}) {
  const [userAnswer, setUserAnswer] = useState('');
  const [testResults, setTestResults] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const textareaRef = useRef(null);

  // Text tracking hook
  const {
    startTracking,
    stopTracking,
    trackTyping,
    trackPaste,
    trackDelete,
    trackFocus,
    trackBlur,
    trackSubmit
  } = useTextTracking();

  // Start text tracking when component mounts
  useEffect(() => {
    if (exercise?.id && moduleId && unitId) {
      startTracking(exercise.id, moduleId, unitId);
    }

    return () => {
      stopTracking();
    };
  }, [exercise?.id, moduleId, unitId, startTracking, stopTracking]);

  // Debounced text tracking to avoid too many database calls
  const debouncedTrackTyping = useRef(null);
  const handleTextChange = (newValue, cursorPosition) => {
    setUserAnswer(newValue);
    if (testResults) setTestResults(null); // Clear status when editing

    // Clear existing timeout
    if (debouncedTrackTyping.current) {
      clearTimeout(debouncedTrackTyping.current);
    }

    // Set new timeout for tracking
    debouncedTrackTyping.current = setTimeout(() => {
      trackTyping(newValue, cursorPosition);
    }, 500); // 500ms debounce
  };

  const handleKeyDown = (e) => {
    // Track delete events
    if (e.key === 'Backspace' || e.key === 'Delete') {
      trackDelete(userAnswer, e.target.selectionStart);
    }

    // Cmd+Enter (Mac) or Ctrl+Enter (Windows/Linux)
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    } else if (e.key === 'ArrowUp' && isFirstExercise) {
      e.preventDefault();
    } else if (e.key === 'ArrowDown' && isLastExercise) {
      e.preventDefault();
    }
  };

  const handleFocus = () => {
    trackFocus(userAnswer, textareaRef.current?.selectionStart || 0);
  };

  const handleBlur = () => {
    trackBlur(userAnswer, textareaRef.current?.selectionStart || 0);
  };

  const handlePaste = (e) => {
    // Let the paste happen first, then track it
    setTimeout(() => {
      const newValue = e.target.value;
      trackPaste(newValue, e.target.selectionStart);
    }, 0);
  };

  const handleSubmit = async () => {
    if (!userAnswer.trim()) {
      alert('Please enter an answer first!');
      return;
    }

    // Track the submit event
    await trackSubmit(userAnswer);

    // Blur the textarea so arrow keys work for navigation
    if (document.activeElement && document.activeElement.tagName === 'TEXTAREA') {
      document.activeElement.blur();
    }

    // Calculate time spent
    const timeSpent = startTime ? Math.round((Date.now() - startTime) / 1000) : 0;

    // If there's a reading passage, this is a reading comprehension exercise
    const isReadingComprehension = !!readingPassage;
    const results = runTests(exercise, userAnswer, isReadingComprehension);
    setTestResults(results);

    const isCorrect = isExerciseComplete(results);

    // Call the completion handler with all required analytics data
    if (onComplete) {
      await onComplete(
        exercise.id,
        moduleId || 'unknown',
        unitId || 'unknown',
        userAnswer,
        exercise.expectedAnswer,
        timeSpent,
        showHint
      );
    }
  };


  // Reset when exercise changes and focus textarea
  useEffect(() => {
    setUserAnswer('');
    setTestResults(null);
    setShowHint(false);
    setStartTime(Date.now()); // Start timing the exercise

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
    setStartTime(Date.now()); // Restart timing
  };

  const handleNextExercise = () => {
    handleReset();
    onNext();
  };

  const canProceed = testResults && isExerciseComplete(testResults);

  // Calculate editor status
  const getEditorStatus = () => {
    if (!testResults) return '';
    return canProceed ? 'success' : 'error';
  };

  const getFailedCount = () => {
    if (!testResults) return 0;
    return testResults.tests?.filter(t => !t.passed).length || 0;
  };

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
          <div className="exercise-title-row">
            <h3>{isReadingModule ? '📖' : '✏️'} Exercise {exercise.id}</h3>
            {isCompleted && <span className="badge-done">✓ Done</span>}
          </div>
          {onBackToLesson && (
            <button className="btn-back-to-lesson" onClick={onBackToLesson}>
              ← Back to Lesson
            </button>
          )}
        </div>

        <div className="exercise-instruction">
          <p><strong>{isReadingModule ? 'Question' : 'Task'}:</strong> {exercise.instruction}</p>
          {!isReadingModule && <p><strong>Answer:</strong> "{exercise.prompt}"</p>}
          {isReadingModule && <p><strong>Find the answer in the passage above</strong></p>}
        </div>

        <div className="code-editor">
          <div className={`editor-header ${getEditorStatus()}`}>
            <span>answer.fr</span>
            <span className="editor-language">French</span>

            {!testResults ? (
              <span className="editor-shortcut">⌘/Ctrl + Enter to submit</span>
            ) : canProceed ? (
              <span className="editor-status editor-status-success">
                ✓ All tests passed
              </span>
            ) : (
              <span className="editor-status editor-status-error">
                ✗ {getFailedCount()} test{getFailedCount() > 1 ? 's' : ''} failed
              </span>
            )}
          </div>
          <textarea
            ref={textareaRef}
            className="code-input"
            value={userAnswer}
            onChange={(e) => {
              handleTextChange(e.target.value, e.target.selectionStart);
            }}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onPaste={handlePaste}
            placeholder="Type your French sentence here..."
            spellCheck="false"
            autoFocus
          />
          <FrenchCharacterPicker
            inputRef={textareaRef}
            onCharacterClick={(value) => {
              const newValue = userAnswer + value;
              handleTextChange(newValue, newValue.length);
            }}
          />
        </div>

        <div className="exercise-actions">
          <div className="left-actions">
            <button
              className="btn-secondary"
              onClick={onPrevious}
              disabled={isFirstExercise}
              title="Previous"
            >
              <span className="">
                ←
              </span>
            </button>
            <button
              className="btn-hint"
              onClick={() => setShowHint(!showHint)}
            >
              💡 {showHint ? 'Hide' : 'Show'} Hint
            </button>
          </div>

          <div className="action-buttons">
            <button
              className="btn-secondary"
              onClick={handleReset}
            >
              Reset
            </button>
            {canProceed ? (
              <button
                className="btn-primary"
                onClick={handleNextExercise}
                disabled={isLastExercise}
              >
                <span className="keyboard-shortcut">→</span>
                Next
              </button>
            ) : (
              <button
                className="btn-primary"
                onClick={handleSubmit}
              >
                <span className="keyboard-shortcut">⌘ Enter</span>
                Submit
              </button>
            )}
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
      </div>
    </div>
  );
}

export default ExercisePane;


