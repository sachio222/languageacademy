/**
 * Unit 7: Knowledge & Learning Configuration
 */

import { onAndPeopleModule } from "./on-and-people.js";
import { comprendreModule } from "./comprendre.js";
import { penserModule } from "./penser.js";
import { savoirModule } from "./savoir.js";
import { connaitreModule } from "./connaitre.js";
import { croireModule } from "./croire.js";
import { learningVerbsModule } from "./learning-verbs.js";
import { studyingVerbsModule } from "./studying-verbs.js";
import { knowledgeNounsModule } from "./knowledge-nouns.js";
import { discourseMarkersModule } from "./discourse-markers.js";
import { comparisonModifiersModule } from "./comparison-modifiers.js";
import { reading7 } from "./reading-7.js";
import { unit7Practice } from "./unit-7-practice.js";
import { unit7Exam } from "./unit-7-exam.js";

export const unit7Config = {
  metadata: {
    id: 7,
    title: "Unit 7: Knowledge & Learning",
    description:
      "Express understanding, thinking, and learning: comprendre (understand), savoir (know), penser (think), plus discourse markers for natural speech",
    icon: "🧠",
    color: "#f97316",
  },
  modules: [
    onAndPeopleModule,        // 73. on (we/one/people) + les gens, tout le monde
    studyingVerbsModule,      // 74. étudier (study) & réviser (review) - where learning begins!
    learningVerbsModule,      // 75. apprendre (learn) & enseigner (teach) - acquiring knowledge
    comprendreModule,         // 76. comprendre (to understand) - rank 61, follows prendre pattern
    savoirModule,             // 77. savoir (to know facts/skills) - rank 21 ⭐ "je ne sais pas"!
    connaitreModule,          // 78. connaître (to know people/places) - rank 62, completes savoir distinction
    penserModule,             // 79. penser (to think) - rank 59, express opinions based on knowledge
    croireModule,             // 80. croire (to believe) - rank 60, tentative opinions
    knowledgeNounsModule,     // 81. Essential learning nouns - question, réponse, idée, cours, école
    discourseMarkersModule,   // 82. donc, en fait, bah, quoi - natural speech flow
    comparisonModifiersModule, // 83. tout, même, mal - completes comparison words
    reading7,                 // 84. Reading 7 - L'Art d'Apprendre
    unit7Practice,            // 85. Unit 7 Practice
    unit7Exam,                // 86. Unit 7 Final Exam
  ],
};
