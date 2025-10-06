/**
 * Helper functions for vocabulary data
 */

import { pronouns } from "./pronouns.js";

/**
 * Helper to generate wrong answer feedback
 */
export function getWrongAnswerHint(correctAnswer, userAnswer, category) {
  // For pronouns
  if (category === "pronoun" && pronouns[userAnswer]) {
    const wrongPronoun = pronouns[userAnswer];
    return `That's "${wrongPronoun.english}", not "${pronouns[correctAnswer]?.english}"`;
  }

  // For conjugations
  if (category === "conjugation") {
    return `Check your conjugation - the answer should be "${correctAnswer}"`;
  }

  return `Incorrect - expected "${correctAnswer}"`;
}

