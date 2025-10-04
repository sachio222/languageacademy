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
  let matchResult = checkAnswer(userAnswer, exercise.expectedAnswer, {
    caseSensitive: false,
    exactMatch: false,
  });

  // Also check acceptable alternative answers
  if (!matchResult.isMatch && exercise.acceptableAnswers) {
    for (const acceptable of exercise.acceptableAnswers) {
      const altResult = checkAnswer(userAnswer, acceptable, {
        caseSensitive: false,
        exactMatch: false,
      });
      if (altResult.isMatch) {
        matchResult = altResult;
        break;
      }
    }
  }

  // NEW APPROACH: Check against the correct answer and known wrong answers
  if (matchResult.isMatch) {
    // User got it right!
    results.total = 1;
    results.passed = 1;

    let message = "✓ Correct answer!";
    if (matchResult.hasAccentWarning) {
      message = matchResult.warningMessage;
    }

    results.testResults.push({
      input: userAnswer,
      expected: true,
      actual: true,
      passed: true,
      message: message,
      hasAccentWarning: matchResult.hasAccentWarning,
    });
  } else {
    // User got it wrong - check if it's a known wrong answer with specific feedback
    results.total = 1;
    results.failed = 1;

    let feedbackMessage = `✗ Expected: "${exercise.expectedAnswer}"`;

    // Check if the wrong answer matches any known wrong answers
    if (exercise.wrongAnswers && exercise.wrongAnswers.length > 0) {
      for (const wrongAnswer of exercise.wrongAnswers) {
        const wrongMatchResult = checkAnswer(userAnswer, wrongAnswer.answer, {
          caseSensitive: false,
          exactMatch: false,
        });

        if (wrongMatchResult.isMatch) {
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
      const testMatchResult = checkAnswer(userAnswer, test.input, {
        caseSensitive: false,
        exactMatch: false,
      });

      const isUserAnswer = testMatchResult.isMatch;

      const passed =
        (isUserAnswer && test.shouldPass) ||
        (!isUserAnswer && !test.shouldPass);

      if (passed) {
        results.passed++;
      } else {
        results.failed++;
      }

      let message = test.error || (passed ? "✓ Test passed" : "✗ Test failed");
      if (passed && testMatchResult.hasAccentWarning) {
        message = testMatchResult.warningMessage;
      }

      results.testResults.push({
        input: test.input,
        expected: test.shouldPass,
        actual: isUserAnswer,
        passed,
        message: message,
        hasAccentWarning: testMatchResult.hasAccentWarning,
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
