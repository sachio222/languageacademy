/**
 * Test Runner - Validates user answers against expected results
 * Like running unit tests in programming
 */

import { lintFrench, checkAnswer } from "../linter/frenchLinter.js";

/**
 * Run tests for a specific exercise
 */
export function runTests(exercise, userAnswer, isReadingComprehension = false) {
  const results = {
    passed: 0,
    failed: 0,
    total: 0,
    testResults: [],
    lintResults: null,
  };

  // First, lint the user's answer
  // Skip punctuation checks for reading comprehension exercises
  const lintResults = lintFrench(userAnswer, exercise.tense, exercise.verb, {
    skipPunctuation: isReadingComprehension,
  });

  results.lintResults = lintResults;

  // If linting fails, tests automatically fail
  if (!lintResults.valid) {
    results.total = 1;
    results.failed = 1;
    results.testResults.push({
      input: userAnswer,
      expected: true,
      actual: false,
      passed: false,
      message: "Failed linting - fix grammar errors first",
    });
    return results;
  }

  // Check if user answer matches expected answer
  let matchesExpected = checkAnswer(userAnswer, exercise.expectedAnswer, {
    caseSensitive: false,
    exactMatch: false,
  });

  // Also check acceptable alternative answers
  if (!matchesExpected && exercise.acceptableAnswers) {
    matchesExpected = exercise.acceptableAnswers.some((acceptable) =>
      checkAnswer(userAnswer, acceptable, {
        caseSensitive: false,
        exactMatch: false,
      })
    );
  }

  // NEW APPROACH: Check against the correct answer and known wrong answers
  if (matchesExpected) {
    // User got it right!
    results.total = 1;
    results.passed = 1;
    results.testResults.push({
      input: userAnswer,
      expected: true,
      actual: true,
      passed: true,
      message: "✓ Correct answer!",
    });
  } else {
    // User got it wrong - check if it's a known wrong answer with specific feedback
    results.total = 1;
    results.failed = 1;

    let feedbackMessage = `✗ Expected: "${exercise.expectedAnswer}"`;

    // Check if the wrong answer matches any known wrong answers
    if (exercise.wrongAnswers && exercise.wrongAnswers.length > 0) {
      for (const wrongAnswer of exercise.wrongAnswers) {
        const matchesWrongAnswer = checkAnswer(userAnswer, wrongAnswer.answer, {
          caseSensitive: false,
          exactMatch: false,
        });

        if (matchesWrongAnswer) {
          feedbackMessage = `✗ ${wrongAnswer.feedback}`;
          break;
        }
      }
    }

    results.testResults.push({
      input: userAnswer,
      expected: true,
      actual: false,
      passed: false,
      message: feedbackMessage,
    });
  }

  // BACKWARDS COMPATIBILITY: Support old test format if it exists
  if (exercise.tests && exercise.tests.length > 0) {
    results.total = exercise.tests.length;
    results.passed = 0;
    results.failed = 0;
    results.testResults = [];

    exercise.tests.forEach((test) => {
      const isUserAnswer = checkAnswer(userAnswer, test.input, {
        caseSensitive: false,
        exactMatch: false,
      });

      const passed =
        (isUserAnswer && test.shouldPass) ||
        (!isUserAnswer && !test.shouldPass);

      if (passed) {
        results.passed++;
      } else {
        results.failed++;
      }

      results.testResults.push({
        input: test.input,
        expected: test.shouldPass,
        actual: isUserAnswer,
        passed,
        message: test.error || (passed ? "✓ Test passed" : "✗ Test failed"),
      });
    });
  }

  return results;
}

/**
 * Check if exercise is complete (all tests pass)
 */
export function isExerciseComplete(testResults) {
  return (
    testResults.failed === 0 &&
    testResults.passed > 0 &&
    testResults.lintResults.valid
  );
}

/**
 * Calculate progress percentage for a lesson
 */
export function calculateLessonProgress(completedExercises, totalExercises) {
  if (totalExercises === 0) return 0;
  return Math.round((completedExercises / totalExercises) * 100);
}
