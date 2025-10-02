import { useState, useEffect } from 'react';
import { runTests, isExerciseComplete } from '../lessons/testRunner';
import TestOutput from './TestOutput';

function ExercisePane({
  exercise,
  onNext,
  onPrevious,
  isFirstExercise,
  isLastExercise,
  isCompleted,
  onComplete
}) {
  const [userAnswer, setUserAnswer] = useState('');
  const [testResults, setTestResults] = useState(null);
  const [showHint, setShowHint] = useState(false);

  const handleSubmit = () => {
    if (!userAnswer.trim()) {
      alert('Please enter an answer first!');
      return;
    }

    const results = runTests(exercise, userAnswer);
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

  // Reset when exercise changes
  useEffect(() => {
    setUserAnswer('');
    setTestResults(null);
    setShowHint(false);
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

  return (
    <div className="exercise-pane">
      <div className="exercise-header">
        <h3>✏️ Exercise {exercise.id}</h3>
        {isCompleted && <span className="badge-done">✓ Done</span>}
      </div>

      <div className="exercise-instruction">
        <p><strong>Task:</strong> {exercise.instruction}</p>
        <p><strong>Translate:</strong> "{exercise.prompt}"</p>
      </div>

      <div className="code-editor">
        <div className="editor-header">
          <span>answer.fr</span>
          <span className="editor-language">French</span>
          <span className="editor-shortcut">⌘/Ctrl + Enter to submit</span>
        </div>
        <textarea
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
        </button>

        <button
          className="btn-nav"
          onClick={handleNextExercise}
          disabled={isLastExercise || !canProceed}
        >
          Next →
        </button>
      </div>
    </div>
  );
}

export default ExercisePane;


