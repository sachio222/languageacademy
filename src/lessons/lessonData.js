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
import { connectors } from "./modules/connectors.js";
import { reading1 } from "./modules/reading-1.js";
import { unit1Practice } from "./modules/unit-1-practice.js";
import { unit1Exam } from "./modules/unit-1-exam.js";
import { module2_demonstratives } from "./modules/demonstratives.js";
import { caSurvival } from "./modules/ca-survival.js";
import { determinersWithNouns } from "./modules/determiners-with-nouns.js";
import { vouloirModule } from "./modules/vouloir.js";
import { pouvoirModule } from "./modules/pouvoir.js";
import { module6_questions } from "./modules/questions.js";
import { stressedPronouns } from "./modules/stressed-pronouns.js";
import { prepositions } from "./modules/prepositions.js";
import { adjectives } from "./modules/adjectives.js";
import { venirModule } from "./modules/venir.js";
import { allerModule } from "./modules/aller.js";
import { partirModule } from "./modules/partir.js";
import { voirModule } from "./modules/voir.js";
import { reading2 } from "./modules/reading-2.js";
import { unit2Practice } from "./modules/unit-2-practice.js";
import { unit2Exam } from "./modules/unit-2-exam.js";
import { contractions } from "./modules/contractions.js";
import { module7_object_pronouns } from "./modules/object-pronouns.js";
import { module8_possessive_adjectives } from "./modules/possessive-adjectives.js";
import { module9_possessive_pronouns } from "./modules/possessive-pronouns.js";
import { reading3 } from "./modules/reading-3.js";
import { module10_combining } from "./modules/combining.js";
import { unit3Practice } from "./modules/unit-3-practice.js";
import { unit3Exam } from "./modules/unit-3-exam.js";
import { survivalPhrases } from "./modules/survival-phrases.js";
import { faireModule } from "./modules/faire.js";
import { devoirModule } from "./modules/devoir.js";
import { parlerModule } from "./modules/parler.js";
import { negation } from "./modules/negation.js";
import { timeAdverbs } from "./modules/time-adverbs.js";
import { locationAdverbs } from "./modules/location-adverbs.js";
import { negation2 } from "./modules/negation-2.js";
import { everydayNouns } from "./modules/everyday-nouns.js";
import { reading4 } from "./modules/reading-4.js";
import { unit4Practice } from "./modules/unit-4-practice.js";
import { unit4Exam } from "./modules/unit-4-exam.js";
import { comparisons } from "./modules/comparisons.js";
import { conditionals } from "./modules/conditionals.js";
import { wouldConditionals } from "./modules/would-conditionals.js";
import { aimerModule } from "./modules/aimer.js";
import { etrePast } from "./modules/etre-past.js";
import { avoirPast } from "./modules/avoir-past.js";
import { foodNouns } from "./modules/food-nouns.js";

// Module configurations in PEDAGOGICAL order
// Order matters! Each module builds on previous ones
const moduleConfigs = [
  // === CONFIDENCE BUILDER - Familiar words first! ===
  famousWords, // 1. Greetings & famous words - bonjour, merci, café (may recognize some!)

  // === FOUNDATION LAYER - Core building blocks ===
  module1, // 2. Pronouns - je, tu, il, elle
  module3_etre, // 3. être - COMBO: "je suis", "tu es", "il est"
  module4_avoir, // 4. avoir - COMBO: "j'ai", "tu as", "il a"

  // === NOUN LAYER - Vocabulary building ===
  articles, // 5. Articles - un/une, le/la/les, des
  basicNouns, // 6. Nouns - COMBO: "j'ai un chat", "il est un homme"
  plurals, // 7. Plurals - COMBO: "j'ai des chats", "nous avons les livres"

  // === CONNECTORS - Link your ideas and add emphasis! ===
  connectors, // 8. et, mais, ou, aussi, très - "un chat et un chien", "j'ai un chat aussi", "très bon"

  // === FIRST MILESTONE - You can READ French! ===
  reading1, // 9. READING TEST - Full paragraph! (uses M1-8 including 'et'!)
  unit1Practice, // 10. PRACTICE - Fill in the blanks with Unit 1 vocabulary!
  unit1Exam, // 11. UNIT 1 FINAL EXAM - Test everything from Unit 1!

  // === COMPOSITION LAYER - Functional programming! ===
  module2_demonstratives, // 12. ça, ce, cette, ces - learn ALL demonstratives
  caSurvival, // 13. ça practice - COMBO: "c'est ça", "ça va?", "j'ai ça"
  determinersWithNouns, // 14. COMPOSITION: "j'ai ce livre", "elle a cette maison"

  // === ACTION LAYER - More essential verbs ===
  vouloirModule, // 15. vouloir (to want) - "je veux ça", "tu veux le livre"
  pouvoirModule, // 16. pouvoir (can) - "je peux", "tu peux ça"

  // === COMMUNICATION LAYER - Questions ===
  module6_questions, // 17. Questions (26-32) - COMBO: "où est le chat?", "qu'est-ce que c'est?"

  // === EXPANSION LAYER - Pronouns, Prepositions & Descriptors ===
  stressedPronouns, // 18. moi, toi, lui, elle, nous, vous, eux, elles - for use with prepositions!
  prepositions, // 19. avec, dans, sur, à, de - "avec moi", "dans la maison", "pour toi"
  adjectives, // 20. bon, grand, petit, nouveau, vieux, etc. - "un bon livre", "une belle maison"

  // === SECOND MILESTONE - See your progress! ===
  reading2, // 21. READING TEST 2 - Dialogue! Uses questions, ça, vouloir, prepositions, adjectives, stressed pronouns!
  unit2Practice, // 22. PRACTICE - Fill in the blanks with Unit 2 vocabulary!
  unit2Exam, // 23. UNIT 2 FINAL EXAM - Test everything from Unit 2!

  // ============================================
  // UNIT 3: EXPANSION - Complex Structures
  // ============================================

  // === CONTRACTIONS - Easy transition into Unit 3! ===
  contractions, // 24. du, au, de la, à la - combining prepositions with articles!

  // === MOTION LAYER - Essential movement verbs ===
  venirModule, // 25. venir - "je viens", "tu viens", "il vient"
  allerModule, // 26. aller - "je vais", "tu vas", "il va" - MOST COMMON!
  partirModule, // 27. partir - "je pars", "tu pars", "il part"

  // === PERCEPTION LAYER - Essential perception verb ===
  voirModule, // 28. voir - "je vois", "tu vois", "il voit" - NEEDED for object pronouns!

  // === ADVANCED LAYER - Complex pronouns ===
  module7_object_pronouns, // 29. le, la, les - COMBO: "je le vois", "il l'a" (builds on voir, vouloir, avoir)
  module8_possessive_adjectives, // 30. mon, ton, son - COMBO: "mon chat", "sa maison"
  module9_possessive_pronouns, // 31. le mien, le tien - COMBO: "c'est le mien"

  // === MASTERY LAYER - Practice writing complex sentences ===
  module10_combining, // 32. FULL SENTENCES: "il a mon livre", "est-ce le sien?"

  // === THIRD MILESTONE - Test your reading comprehension! ===
  reading3, // 33. READING TEST 3 - Conversation! Uses everything from Unit 3!
  unit3Practice, // 34. PRACTICE - Fill in the blanks with Unit 3 vocabulary!
  unit3Exam, // 35. UNIT 3 FINAL EXAM - Test everything from Unit 3!

  // ============================================
  // UNIT 4: EXPRESSION - Real-World Communication
  // ============================================

  // === SURVIVAL PHRASES - Function in France! ===
  survivalPhrases, // 36. je voudrais, s'il vous plaît, c'est combien?, excusez-moi - practical phrases!

  // === ESSENTIAL VERBS - More modal verbs and communication! ===
  faireModule, // 37. faire (to do/make) - je fais, tu fais, il fait
  devoirModule, // 38. devoir (must/have to) - je dois, tu dois, il doit
  parlerModule, // 39. parler (to speak) - je parle, tu parles, il parle - first regular -ER verb!

  // === NEGATION - Say what you DON'T do! ===
  negation, // 40. ne...pas - "je ne veux pas", "tu n'as pas"

  // === TIME & FREQUENCY - When and how often! ===
  timeAdverbs, // 41. maintenant, toujours, jamais, aujourd'hui, demain, hier - essential time words!

  // === NEGATION PART 2 - Modal verbs & never ===
  negation2, // 42. je ne peux pas (I can't), je ne vais jamais (I never go), il ne fait jamais - expand negation!

  // === LOCATION - Where things are! ===
  locationAdverbs, // 43. ici, là, là-bas, partout, quelque part, nulle part - express location!

  // === EVERYDAY NOUNS - Essential vocabulary for real conversations! ===
  everydayNouns, // 44. High-frequency nouns: le temps, la vie, le monde, l'eau, le pain, l'argent - practical vocabulary!

  // === FOURTH MILESTONE - Real-world French! ===
  reading4, // 45. READING TEST 4 - Conversation! Uses all Unit 4 vocabulary!
  unit4Practice, // 46. PRACTICE - Fill in the blanks with Unit 4 vocabulary!
  unit4Exam, // 47. UNIT 4 FINAL EXAM - Test everything from Unit 4!

  // ============================================
  // UNIT 5: SOPHISTICATION - Past Tense & Nuance
  // ============================================

  // === COMPARISON & INTENSITY - Express nuance! ===
  comparisons, // 48. Comparisons - plus, moins, meilleur, pire, trop, tout, même - express comparisons and intensity!

  // === CONDITIONAL MOOD - Should & Could ===
  conditionals, // 49. Should & Could - je devrais (I should), je pourrais (I could) - in couplets!

  // === CONDITIONAL MOOD - Would Forms ===
  wouldConditionals, // 50. Would Forms - je voudrais (I would like), j'irais (I would go), je ferais (I would do)

  // === ESSENTIAL VERBS - High-frequency emotion verb ===
  aimerModule, // 51. aimer - to like/love - j'aime le café, je t'aime!

  // === PAST TENSE - Talk about the past! ===
  etrePast, // 52. être past tense - j'étais (I was), tu étais (you were), il était (he was)
  avoirPast, // 53. avoir past tense - j'avais (I had), tu avais (you had), il avait (he had)

  // === EVERYDAY VOCABULARY - Essential nouns ===
  foodNouns, // 54. Food nouns - le pain, l'eau, le café, la viande, les légumes - everyday essentials!

  // TO BE ADDED:
  // 55. comprendre - to understand
  // 56. READING TEST 5
  // 57. PRACTICE
  // 58. UNIT 5 EXAM
];

// Build all lessons from configs
// IDs and module numbers are assigned dynamically based on array position (1-indexed)
const allLessons = moduleConfigs.map((config, index) => {
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

// Pedagogical unit structure - aligned with cognitive science
// Each unit ends with a comprehensive exam
export const unitStructure = [
  {
    id: 1,
    title: "Unit 1: Foundation",
    description:
      "Core building blocks - pronouns, verbs, nouns, and connectors",
    lessonRange: [1, 11], // Lessons 1-9 + Practice + Unit 1 Exam
    icon: "🏗️",
    color: "#3b82f6",
  },
  {
    id: 2,
    title: "Unit 2: Composition",
    description:
      "Functional combinations - demonstratives, questions, prepositions, and adjectives",
    lessonRange: [12, 23], // Lessons 12-21 + Practice + Unit 2 Exam (ID 23)
    icon: "🧩",
    color: "#8b5cf6",
  },
  {
    id: 3,
    title: "Unit 3: Expansion",
    description:
      "Advanced pronouns and contractions - master 'I see it', 'it's mine', 'to the café', and motion verbs",
    lessonRange: [24, 35], // Lessons 24-33 + Practice + Unit 3 Exam (ID 35)
    icon: "🎯",
    color: "#06b6d4",
  },
  {
    id: 4,
    title: "Unit 4: Expression",
    description:
      "Say more with less - negation, daily verbs, and real-world communication",
    lessonRange: [36, 47], // Lessons 36-45 + Unit 4 Practice (46) + Unit 4 Exam (47)
    icon: "💬",
    color: "#f59e0b",
  },
  {
    id: 5,
    title: "Unit 5: Sophistication",
    description:
      "Past tense and nuance - comparisons, conditionals, and essential verbs (was, had, like, understand)",
    lessonRange: [48, 58], // Lessons 48-56 + Reading 5 + Practice + Unit 5 Exam (TO BE COMPLETED)
    icon: "⏳",
    color: "#ec4899",
  },
];

// Export flat list of lessons for backward compatibility
export const lessons = allLessons;

// Helper functions
export function getLessonById(id) {
  return lessons.find((lesson) => lesson.id === id);
}

export function getExerciseById(lessonId, exerciseId) {
  const lesson = getLessonById(lessonId);
  if (!lesson) return null;
  return lesson.exercises.find((ex) => ex.id === exerciseId);
}
