import { useState, useRef, useEffect } from 'react';
import { runTests, isExerciseComplete } from '../lessons/testRunner';
import FrenchCharacterPicker from './FrenchCharacterPicker';
import { useSupabaseProgress } from '../contexts/SupabaseProgressContext';
import { extractModuleId, extractUnitId } from '../utils/progressSync';

/**
 * Module Exam - Comprehensive test to solidify learning
 * Tests all exercises from the module in random order
 */
function ModuleExam({ lesson, onPassExam, onRetryLesson, unitInfo }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const inputRef = useRef(null);

  const supabaseProgress = useSupabaseProgress();
  const { recordExamAttempt, isAuthenticated } = supabaseProgress || {};

  // Randomize exercises for the exam and start timing
  const [examQuestions] = useState(() => {
    return [...lesson.exercises].sort(() => Math.random() - 0.5);
  });

  // Start timing when exam begins
  useEffect(() => {
    setStartTime(Date.now());
  }, []);

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

  const handleSubmitExam = async () => {
    // Calculate time spent
    const timeSpent = startTime ? Math.round((Date.now() - startTime) / 1000) : 0;

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
    const passed = totalCorrect >= passingScore;
    const percentage = Math.round((totalCorrect / examQuestions.length) * 100);

    const examData = {
      examResults,
      totalCorrect,
      totalQuestions: examQuestions.length,
      passed,
      passingScore,
      percentage,
      timeSpent,
    };

    setResults(examData);
    setSubmitted(true);

    // Record exam attempt in Supabase
    if (isAuthenticated) {
      try {
        const answersData = {};
        examResults.forEach(result => {
          answersData[result.exercise.id] = {
            userAnswer: result.userAnswer,
            correctAnswer: result.exercise.expectedAnswer,
            isCorrect: result.passed
          };
        });

        await recordExamAttempt(
          'module',
          extractModuleId(lesson),
          examQuestions.length,
          totalCorrect,
          percentage,
          timeSpent,
          answersData,
          passed
        );
      } catch (error) {
        console.error('Error recording exam attempt:', error);
      }
    }

    // If passed, notify parent with score and time
    if (passed) {
      setTimeout(() => {
        onPassExam(percentage, timeSpent);
      }, 2000);
    }
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
            <button className="btn-primary btn-large" onClick={() => onPassExam(results.percentage, results.timeSpent)}>
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
            ref={inputRef}
            type="text"
            value={answers[currentQuestion.id] || ''}
            onChange={(e) => handleAnswerChange(e.target.value)}
            placeholder="Type your French answer here..."
            autoFocus
          />
          <FrenchCharacterPicker
            inputRef={inputRef}
            onCharacterClick={handleAnswerChange}
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

