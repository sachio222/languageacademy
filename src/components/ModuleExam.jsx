import { useState } from 'react';
import { runTests, isExerciseComplete } from '../lessons/testRunner';

/**
 * Module Exam - Comprehensive test to solidify learning
 * Tests all exercises from the module in random order
 */
function ModuleExam({ lesson, onPassExam, onRetryLesson }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState(null);

  // Randomize exercises for the exam
  const [examQuestions] = useState(() => {
    return [...lesson.exercises].sort(() => Math.random() - 0.5);
  });

  const currentQuestion = examQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / examQuestions.length) * 100;

  const handleAnswerChange = (value) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: value,
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < examQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmitExam = () => {
    // Grade all answers
    const examResults = examQuestions.map((exercise) => {
      const userAnswer = answers[exercise.id] || '';
      const testResult = runTests(exercise, userAnswer, false);
      return {
        exercise,
        userAnswer,
        testResult,
        passed: isExerciseComplete(testResult),
      };
    });

    const totalCorrect = examResults.filter((r) => r.passed).length;
    const passingScore = Math.ceil(examQuestions.length * 0.8); // 80% to pass

    setResults({
      examResults,
      totalCorrect,
      totalQuestions: examQuestions.length,
      passed: totalCorrect >= passingScore,
      passingScore,
    });
    setSubmitted(true);
  };

  if (submitted && results) {
    const scorePercentage = Math.round(
      (results.totalCorrect / results.totalQuestions) * 100
    );

    return (
      <div className="exam-results">
        <div className="exam-results-header">
          <h2>📊 Module Exam Results</h2>
          <div className={`score ${results.passed ? 'passed' : 'failed'}`}>
            {scorePercentage}%
          </div>
        </div>

        {results.passed ? (
          <div className="exam-passed">
            <div className="exam-message">
              <h3>🎉 Congratulations! You passed!</h3>
              <p>
                You got {results.totalCorrect} out of {results.totalQuestions}{' '}
                correct.
              </p>
              <p>You've mastered this module and solidified the concepts!</p>
            </div>
            <button className="btn-primary btn-large" onClick={() => onPassExam(true)}>
              Continue to Next Module →
            </button>
          </div>
        ) : (
          <div className="exam-failed">
            <div className="exam-message">
              <h3>📚 Keep Practicing!</h3>
              <p>
                You got {results.totalCorrect} out of {results.totalQuestions}{' '}
                correct.
              </p>
              <p>You need {results.passingScore} correct to pass (80%).</p>
              <p>Review the material and try again - you've got this!</p>
            </div>
            <div className="exam-actions">
              <button className="btn-secondary" onClick={onRetryLesson}>
                Review Lesson
              </button>
              <button
                className="btn-primary"
                onClick={() => {
                  setSubmitted(false);
                  setAnswers({});
                  setCurrentQuestionIndex(0);
                  setResults(null);
                }}
              >
                Retake Exam
              </button>
            </div>
          </div>
        )}

        <div className="exam-breakdown">
          <h4>Detailed Results:</h4>
          {results.examResults.map((result, idx) => (
            <div
              key={idx}
              className={`exam-item ${result.passed ? 'correct' : 'incorrect'}`}
            >
              <div className="exam-item-header">
                <span className="exam-item-number">
                  {result.passed ? '✓' : '✗'} Question {idx + 1}
                </span>
                <span className="exam-item-prompt">{result.exercise.prompt}</span>
              </div>
              <div className="exam-item-details">
                <div>
                  <strong>Your answer:</strong>{' '}
                  {result.userAnswer || '(no answer)'}
                </div>
                {!result.passed && (
                  <div className="exam-item-correct">
                    <strong>Correct answer:</strong>{' '}
                    {result.exercise.expectedAnswer}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const allAnswered = examQuestions.every((q) => answers[q.id]?.trim());

  return (
    <div className="module-exam">
      <div className="exam-header">
        <h2>📝 Module Final Exam</h2>
        <p>Test your knowledge! You need 80% to pass and move on.</p>
        <div className="exam-progress-bar">
          <div className="exam-progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <span className="exam-progress-text">
          Question {currentQuestionIndex + 1} of {examQuestions.length}
        </span>
      </div>

      <div className="exam-question">
        <div className="question-number">Question {currentQuestionIndex + 1}</div>
        <div className="question-prompt">
          <strong>{currentQuestion.instruction}</strong>
        </div>
        <div className="question-english">{currentQuestion.prompt}</div>

        <div className="answer-input">
          <label>Your Answer:</label>
          <input
            type="text"
            value={answers[currentQuestion.id] || ''}
            onChange={(e) => handleAnswerChange(e.target.value)}
            placeholder="Type your French answer here..."
            autoFocus
          />
        </div>

        {currentQuestion.hint && (
          <div className="question-hint">
            <strong>💡 Hint:</strong> {currentQuestion.hint}
          </div>
        )}
      </div>

      {!allAnswered && currentQuestionIndex === examQuestions.length - 1 && (
        <div className="exam-warning">
          ⚠️ Please answer all questions before submitting
        </div>
      )}

      <div className="exam-navigation">
        <button
          className="btn-nav"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
        >
          ← Previous
        </button>

        <div className="exam-nav-center">
          {answers[currentQuestion.id]?.trim() ? (
            <span className="answered-indicator">✓ Answered</span>
          ) : (
            <span className="unanswered-indicator">Not answered</span>
          )}
        </div>

        {currentQuestionIndex === examQuestions.length - 1 ? (
          <button
            className="btn-primary btn-submit"
            onClick={handleSubmitExam}
            disabled={!allAnswered}
          >
            Submit Exam
          </button>
        ) : (
          <button className="btn-nav" onClick={handleNext}>
            Next →
          </button>
        )}
      </div>
    </div>
  );
}

export default ModuleExam;

