/**
 * Unit 2: Asking & Describing Configuration
 * Defines the pedagogical sequence and metadata for Unit 2
 */

import { module2_demonstratives } from "./demonstratives.js";
import { caSurvival } from "./ca-survival.js";
import { determinersWithNouns } from "./determiners-with-nouns.js";
import { vouloirModule } from "./vouloir.js";
import { pouvoirModule } from "./pouvoir.js";
import { voirModule } from "./voir.js";
import { module6_questions } from "./questions.js";
import { questionsHelpModule } from "./questions-help.js";
import { stressedPronouns } from "./stressed-pronouns.js";
import { prepositions } from "./prepositions.js";
import { adjectives } from "./adjectives.js";
import { reading2 } from "./reading-2.js";
import { unit2Practice } from "./unit-2-practice.js";
import { unit2Exam } from "./unit-2-exam.js";

export const unit2Config = {
  metadata: {
    id: 2,
    title: "Unit 2: Asking & Describing",
    description:
      "Ask questions, use demonstratives (this/that), essential verbs (want/can/see), add descriptions with adjectives and prepositions",
    icon: "✍️",
    color: "#8b5cf6",
  },
  modules: [
    module2_demonstratives, // 12. Demonstratives - It, That, This
    caSurvival, // 13. ça Survival - Essential Usage
    determinersWithNouns, // 14. Determiners with Nouns
    vouloirModule, // 15. Essential Verb - vouloir (to want)
    pouvoirModule, // 16. Essential Verb - pouvoir (can)
    voirModule, // 17. Essential Verb - voir (to see)
    module6_questions, // 18. Questions - Where, What, How
    questionsHelpModule, // 19. Questions Help - How to Ask Questions
    stressedPronouns, // 20. Stressed Pronouns - moi, toi, lui
    prepositions, // 21. Prepositions - Spatial & Relational Words
    adjectives, // 22. Common Adjectives - Describing Things
    reading2, // 23. Reading Comprehension 2
    unit2Practice, // 24. Unit 2 Practice
    unit2Exam, // 25. Unit 2 Final Exam
  ],
};
