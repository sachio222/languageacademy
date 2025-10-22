/**
 * Unit 4: Everyday Words Configuration
 * Defines the pedagogical sequence and metadata for Unit 4
 */

import { survivalPhrases } from "./survival-phrases.js";
import { faireModule } from "./faire.js";
import { devoirModule } from "./devoir.js";
import { parlerModule } from "./parler.js";
import { searchFindModule } from "./search-find.js";
import { negation } from "./negation.js";
import { timeAdverbs } from "./time-adverbs.js";
import { locationAdverbs } from "./location-adverbs.js";
import { negation2 } from "./negation-2.js";
import { everydayNouns } from "./everyday-nouns.js";
import { reading4 } from "./reading-4.js";
import { unit4Practice } from "./unit-4-practice.js";
import { unit4Exam } from "./unit-4-exam.js";

export const unit4Config = {
  metadata: {
    id: 4,
    title: "Unit 4: Everyday Words",
    description:
      "Survival phrases, negation (I don't), time & location words, and essential daily verbs",
    icon: "🥖",
    color: "#f59e0b",
  },
  modules: [
    survivalPhrases, // 37. Survival Phrases - Real-World Essentials
    faireModule, // 38. Essential Verb - faire (to do/make)
    devoirModule, // 39. Essential Verb - devoir (must/should)
    parlerModule, // 40. Essential Verb - parler (to speak)
    searchFindModule, // 41. Essential Verbs - chercher & trouver
    negation, // 42. Negation - I Don't, You Don't
    timeAdverbs, // 43. Time Adverbs - When & How Often
    negation2, // 44. Negation Part 2 - Modal Verbs
    locationAdverbs, // 45. Location Adverbs - Where & Direction
    everydayNouns, // 46. Everyday Nouns - Daily Life Vocabulary
    reading4, // 47. Reading Comprehension 4
    unit4Practice, // 48. Unit 4 Practice
    unit4Exam, // 49. Unit 4 Final Exam
  ],
};
