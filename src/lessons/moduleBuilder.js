/**
 * Module Builder - Converts modular config into full lesson structure
 * This makes it easy to add new modules without touching existing code
 */

import { pronouns } from "./vocabularyData.js";
import { logger } from "../utils/logger";

/**
 * Build exercises from module configuration
 * Note: moduleId is passed in but will be overwritten with dynamic ID later
 */
export function buildExercises(moduleId, exerciseConfig) {
  const exercises = [];
  let exerciseNumber = 1;

  if (exerciseConfig.type === "translation") {
    // Translation exercises (e.g., pronouns, nouns)
    exerciseConfig.items.forEach((item) => {
      const word = exerciseConfig.vocabulary[item.key];
      // Use englishFull for prompts if available (more specific)
      const promptText = word.englishFull || word.english;
      const displayText = word.english; // For instructions

      exercises.push({
        id: `${moduleId}.${exerciseNumber}`,
        instruction: `Translate "${displayText}" to French`,
        prompt: promptText,
        hint: word.note || `The French word for "${displayText}"`,
        expectedAnswer: word.french,
        article: word.article || null, // Include article for nouns (shown in study mode)
        tense: null,
        verb: null,
        vocabulary: item.key,
        wrongAnswers: item.wrongAnswers.map((key) => ({
          answer: exerciseConfig.vocabulary[key].french,
          feedback: `That's "${exerciseConfig.vocabulary[key].english}", not "${displayText}"`,
        })),
      });
      exerciseNumber++;
    });
  } else if (exerciseConfig.type === "conjugation") {
    // Conjugation exercises (e.g., être, avoir)
    exerciseConfig.items.forEach((item) => {
      const conj = exerciseConfig.conjugations[item.key];
      const pronoun = pronouns[item.key];

      // Use englishFull for prompts if available (more specific)
      const promptText = conj.englishFull || conj.english;
      const displayText = conj.english; // For instructions

      // Find common wrong conjugations
      const wrongAnswers = item.customWrongAnswers || [];
      if (wrongAnswers.length === 0) {
        Object.keys(exerciseConfig.conjugations).forEach((key) => {
          if (key !== item.key) {
            const wrongConj = exerciseConfig.conjugations[key];
            wrongAnswers.push({
              answer: wrongConj.combined,
              feedback: `That's "${wrongConj.english}", not "${displayText}"`,
            });
          }
        });
        // Limit to 2 wrong answers
        wrongAnswers.splice(2);
      }

      exercises.push({
        id: `${moduleId}.${exerciseNumber}`,
        instruction: item.context
          ? `${item.context}. Say "${displayText}"`
          : `Say "${displayText}" in French`,
        prompt: promptText,
        hint: `${pronoun.french} + ${exerciseConfig.verb} = ?`,
        expectedAnswer: conj.combined,
        tense: "present",
        verb: exerciseConfig.verb,
        vocabulary: item.key,
        wrongAnswers,
      });
      exerciseNumber++;
    });
  } else if (exerciseConfig.type === "mixed") {
    // Mixed exercises (e.g., vouloir + pouvoir)
    exerciseConfig.items.forEach((item) => {
      const conj = item.conjugations[item.key];
      const pronoun = pronouns[item.key];

      // Use englishFull for prompts if available (more specific)
      const promptText = conj.englishFull || conj.english;
      const displayText = conj.english; // For instructions

      // Find wrong answers from same verb
      const wrongAnswers = [];
      Object.keys(item.conjugations).forEach((key) => {
        if (key !== item.key) {
          const wrongConj = item.conjugations[key];
          wrongAnswers.push({
            answer: wrongConj.combined,
            feedback: `That's "${wrongConj.english}", not "${displayText}"`,
          });
        }
      });
      wrongAnswers.splice(2);

      exercises.push({
        id: `${moduleId}.${exerciseNumber}`,
        instruction: item.context
          ? `${item.context}. Say "${displayText}"`
          : `Say "${displayText}" in French`,
        prompt: promptText,
        hint: `${pronoun.french} + ${item.verb} = ?`,
        expectedAnswer: conj.combined,
        tense: "present",
        verb: item.verb,
        vocabulary: item.key,
        wrongAnswers,
      });
      exerciseNumber++;
    });
  } else if (exerciseConfig.type === "custom") {
    // Custom exercises (e.g., question words, unit exams)
    logger.log(
      `[DEBUG] Processing custom exercises, items count: ${
        exerciseConfig.items?.length || 0
      }`
    );

    exerciseConfig.items.forEach((item) => {
      exercises.push({
        id: `${moduleId}.${exerciseNumber}`,
        instruction: item.instruction,
        prompt: item.prompt,
        hint: item.hint,
        expectedAnswer: item.expectedAnswer,
        acceptableAnswers: item.acceptableAnswers || [],
        tense: item.tense || null,
        verb: item.verb || null,
        wrongAnswers: item.wrongAnswers || [],
      });
      exerciseNumber++;
    });

    logger.log(`[DEBUG] Custom exercises built: ${exercises.length} total`);
  }

  return exercises;
}

/**
 * Build exercises from vocabularyReference for reference modules
 */
function buildVocabularyExercises(moduleId, vocabularyReference) {
  if (!vocabularyReference || vocabularyReference.length === 0) {
    return [];
  }

  return vocabularyReference.map((item, index) => {
    const exerciseNumber = index + 1;
    return {
      id: `${moduleId}.${exerciseNumber}`,
      instruction: `Translate "${item.english}" to French`,
      prompt: item.english,
      hint: item.note || `The French word/phrase for "${item.english}"`,
      expectedAnswer: item.french,
      ttsText: item.ttsText, // Copy TTS override for pronunciation
      article: null,
      tense: null,
      verb: null,
      vocabulary: item.french,
      wrongAnswers: [], // Reference modules focus on learning, not testing wrong answers
    };
  });
}

/**
 * Bring a hand-written exercise to the shape every consumer reads.
 * Older modules (most of Unit 9) put the correct answer in `answer`, but
 * runTests, ModuleExam, StudyMode and progress saving all read `expectedAnswer`.
 * Wrong answers as `{ answer, feedback }` objects or plain strings are both
 * already understood by runTests, so they pass through.
 */
export function normalizeExercise(exercise) {
  return {
    ...exercise,
    expectedAnswer: exercise.expectedAnswer ?? exercise.answer,
    acceptableAnswers: exercise.acceptableAnswers || [],
    wrongAnswers: exercise.wrongAnswers || [],
  };
}

/**
 * Find built exercises with no expected answer. No learner can pass such an
 * exercise, so each lesson that has one is logged as an error (in production
 * too) instead of failing silently in front of the learner.
 */
export function reportExercisesWithoutAnswer(lessons, log = logger) {
  const problems = [];
  for (const lesson of lessons) {
    const missing = (lesson.exercises || []).filter(
      (ex) => typeof ex.expectedAnswer !== "string" || ex.expectedAnswer.trim() === ""
    );
    if (missing.length === 0) continue;
    const problem = {
      lessonId: lesson.id,
      moduleKey: lesson.moduleKey,
      missing: missing.length,
      total: lesson.exercises.length,
      exerciseIds: missing.map((ex) => ex.id),
    };
    problems.push(problem);
    log.error(
      `[lessons] ${problem.moduleKey} (lesson ${problem.lessonId}): ${problem.missing} of ${problem.total} exercises have no expectedAnswer, so no answer can pass them. First: ${problem.exerciseIds[0]}`
    );
  }
  return problems;
}

/**
 * Build complete lesson from module config
 * Note: id will be set dynamically in lessonData.js
 */
export function buildLesson(moduleConfig, moduleNumber = null) {
  // Generate exercises
  let exercises = [];

  // Debug logging for unit exams
  if (moduleConfig.isUnitExam) {
    logger.log(`[DEBUG] Building unit exam: ${moduleConfig.title}`);
    logger.log(`[DEBUG] Has exerciseConfig:`, !!moduleConfig.exerciseConfig);
    logger.log(
      `[DEBUG] exerciseConfig.items length:`,
      moduleConfig.exerciseConfig?.items?.length || 0
    );
  }

  if (moduleConfig.exerciseConfig) {
    exercises = buildExercises(
      moduleConfig.id || 0,
      moduleConfig.exerciseConfig
    );

    // Debug logging for unit exams
    if (moduleConfig.isUnitExam) {
      logger.log(
        `[DEBUG] buildExercises returned ${exercises.length} exercises`
      );
    }
  } else if (moduleConfig.exercises && moduleConfig.exercises.length > 0) {
    // Same count and order as written: saved answers are keyed by position.
    exercises = moduleConfig.exercises.map(normalizeExercise);
  } else if (
    moduleConfig.vocabularyReference &&
    moduleConfig.vocabularyReference.length > 0
  ) {
    // Generate exercises from vocabularyReference for reference modules
    exercises = buildVocabularyExercises(
      moduleConfig.id || 0,
      moduleConfig.vocabularyReference
    );
  }

  const lesson = {
    // id is set dynamically in lessonData.js
    moduleKey: moduleConfig.moduleKey, // Permanent identifier for cross-references
    title: moduleConfig.title,
    description: moduleConfig.description,
    concepts: moduleConfig.concepts || [],
    vocabularyReference: moduleConfig.vocabularyReference || [],
    exercises: exercises,
    // Pass through special flags for reading comprehension
    skipStudyMode: moduleConfig.skipStudyMode || false,
    isReadingComprehension: moduleConfig.isReadingComprehension || false,
    readingPassage: moduleConfig.readingPassage || null,
    // Pass through unit exam flags
    isUnitExam: moduleConfig.isUnitExam || false,
    unitNumber: moduleConfig.unitNumber || null,
    // Pass through fill-in-the-blank flags
    isFillInTheBlank: moduleConfig.isFillInTheBlank || false,
    sentences: moduleConfig.sentences || null,
    // Pass through phonics reference flag
    isPhonicsReference: moduleConfig.isPhonicsReference || false,
    // Pass through help module flag
    isHelpModule: moduleConfig.isHelpModule || false,
  };

  // Debug logging for unit exams
  if (moduleConfig.isUnitExam) {
    logger.log(
      `[DEBUG] Final lesson exercises length: ${lesson.exercises.length}`
    );
    logger.log(`[DEBUG] Lesson built successfully for unit exam`);
  }

  return lesson;
}
