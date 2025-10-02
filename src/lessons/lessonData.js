/**
 * Lesson Data - Main entry point
 * Import modules and build lessons automatically
 *
 * TO ADD A NEW MODULE:
 * 1. Create a new file in /modules/moduleX-name.js
 * 2. Import it here
 * 3. Add to moduleConfigs array
 * That's it!
 */

import { buildLesson } from "./moduleBuilder.js";

// Import all module configurations
// Filenames are semantic (based on content), not numbered
import { famousWords } from "./modules/famous-words.js";
import { module1 } from "./modules/pronouns.js";
import { module3_etre } from "./modules/etre.js";
import { module4_avoir } from "./modules/avoir.js";
import { articles } from "./modules/articles.js";
import { basicNouns } from "./modules/basic-nouns.js";
import { plurals } from "./modules/plurals.js";
import { module2_demonstratives } from "./modules/demonstratives.js";
import { caSurvival } from "./modules/ca-survival.js";
import { determinersWithNouns } from "./modules/determiners-with-nouns.js";
import { module5_vouloir_pouvoir } from "./modules/vouloir-pouvoir.js";
import { module6_questions } from "./modules/questions.js";
import { module7_object_pronouns } from "./modules/object-pronouns.js";
import { module8_possessive_adjectives } from "./modules/possessive-adjectives.js";
import { module9_possessive_pronouns } from "./modules/possessive-pronouns.js";
import { module10_combining } from "./modules/combining.js";

// Module configurations in PEDAGOGICAL order
// Order matters! Each module builds on previous ones
const moduleConfigs = [
  // === CONFIDENCE BUILDER - Familiar words first! ===
  famousWords, // 1. Greetings & famous words - bonjour, merci, café (may recognize some!)

  // === FOUNDATION LAYER - Core building blocks ===
  module1, // 2. Pronouns (ranks 1-8) - je, tu, il, elle
  module3_etre, // 3. être (rank 13) - COMBO: "je suis", "tu es", "il est"
  module4_avoir, // 4. avoir (rank 14) - COMBO: "j'ai", "tu as", "il a"

  // === NOUN LAYER - Vocabulary building ===
  articles, // 5. Articles - un/une, le/la/les, des
  basicNouns, // 6. Nouns - COMBO: "j'ai un chat", "il est un homme"
  plurals, // 7. Plurals - COMBO: "j'ai des chats", "nous avons les livres"

  // === COMPOSITION LAYER - Functional programming! ===
  module2_demonstratives, // 8. ça, ce, cette, ces - learn ALL demonstratives
  caSurvival, // 9. ça practice - COMBO: "c'est ça", "ça va?", "j'ai ça"
  determinersWithNouns, // 10. COMPOSITION: "j'ai ce livre", "elle a cette maison"

  // === ACTION LAYER - More essential verbs ===
  module5_vouloir_pouvoir, // 11. want/can (ranks 18-19) - COMBO: "je veux ça", "je veux le livre"

  // === COMMUNICATION LAYER - Questions ===
  module6_questions, // 12. Questions (26-32) - COMBO: "où est le chat?", "qu'est-ce que c'est?"

  // === ADVANCED LAYER - Complex pronouns ===
  module7_object_pronouns, // 13. le, la, les - COMBO: "je le veux", "il l'a"
  module8_possessive_adjectives, // 14. mon, ton, son - COMBO: "mon chat", "sa maison"
  module9_possessive_pronouns, // 15. le mien, le tien - COMBO: "c'est le mien"

  // === MASTERY LAYER - Everything together ===
  module10_combining, // 16. FULL SENTENCES: "il a mon livre", "est-ce le sien?"
];

// Build all lessons from configs
// IDs and module numbers are assigned dynamically based on array position (1-indexed)
export const lessons = moduleConfigs.map((config, index) => {
  const moduleId = index + 1;
  const lesson = buildLesson(config, moduleId); // Pass module number

  // Set dynamic ID and update exercise IDs to match
  return {
    ...lesson,
    id: moduleId,
    exercises: lesson.exercises.map((ex, exIdx) => ({
      ...ex,
      id: `${moduleId}.${exIdx + 1}`,
    })),
  };
});

// Helper functions
export function getLessonById(id) {
  return lessons.find((lesson) => lesson.id === id);
}

export function getExerciseById(lessonId, exerciseId) {
  const lesson = getLessonById(lessonId);
  if (!lesson) return null;
  return lesson.exercises.find((ex) => ex.id === exerciseId);
}
