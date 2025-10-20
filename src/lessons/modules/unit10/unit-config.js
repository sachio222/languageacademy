/**
 * Unit 10: Mastery & Nuance Configuration
 * Defines the pedagogical sequence and metadata for Unit 10
 */

import { commonSpecialForms1Module } from "./common-special-forms-1.js";
import { commonSpecialForms2Module } from "./common-special-forms-2.js";
import { necessityPhrasesModule } from "./necessity-phrases.js";
import { wishPhrasesModule } from "./wish-phrases.js";
import { emotionPhrasesModule } from "./emotion-phrases.js";
import { opinionPhrasesModule } from "./opinion-phrases.js";
import { hypotheticalPhrasesModule } from "./hypothetical-phrases.js";
import { pastRegretPhrasesModule } from "./past-regret-phrases.js";
import { hadAlreadyPhrasesModule } from "./had-already-phrases.js";
import { commonAdverbsModule } from "./common-adverbs.js";
import { whileDoingPhrasesModule } from "./while-doing-phrases.js";
import { servicePhrasesModule } from "./service-phrases.js";
import { beforePhrasesModule } from "./before-phrases.js";
import { soThatPhrasesModule } from "./so-that-phrases.js";
import { althoughPhrasesModule } from "./although-phrases.js";
import { possibilityPhrasesModule } from "./possibility-phrases.js";
import { reading10 } from "./reading-10.js";
import { unit10Practice } from "./unit-10-practice.js";
import { unit10Exam } from "./unit-10-exam.js";

export const unit10Config = {
  metadata: {
    id: 10,
    title: "Unit 10: Mastery & Nuance",
    description:
      "B2 Level Phrases! Learn special verb forms, then use them in top practical expressions: necessity (il faut que), wishes (je veux que), emotions (je suis content que), hypotheticals (si j'étais...), regrets (si j'avais su), services (je me fais couper), and more!",
    icon: "🎓",
    color: "#8b5cf6",
  },
  modules: [
    commonSpecialForms1Module, // 117. Common Special Forms Part 1 - sois, ait, aille, fasse
    commonSpecialForms2Module, // 118. Common Special Forms Part 2 - vienne, parte, puisse
    necessityPhrasesModule, // 119. Il faut que... - Necessity Phrases
    wishPhrasesModule, // 120. Je veux que... - Wish Phrases
    emotionPhrasesModule, // 121. Je suis content que... - Emotion Phrases
    opinionPhrasesModule, // 122. Je pense que... - Opinion Phrases
    hypotheticalPhrasesModule, // 123. Si j'étais... - Hypothetical Phrases
    pastRegretPhrasesModule, // 124. Si j'avais su... - Past Regret Phrases
    hadAlreadyPhrasesModule, // 125. J'avais déjà... - Had Already Phrases
    commonAdverbsModule, // 126. vraiment, sérieusement... - Common Adverbs
    whileDoingPhrasesModule, // 127. En mangeant... - While Doing Phrases
    servicePhrasesModule, // 128. Je me fais couper... - Service Phrases
    beforePhrasesModule, // 129. Avant que... - Before Phrases
    soThatPhrasesModule, // 130. Pour que... - So That Phrases
    althoughPhrasesModule, // 131. Bien que... - Although Phrases
    possibilityPhrasesModule, // 132. Il est possible que... - Possibility Phrases
    reading10, // 133. Reading Test 10 - Mes Rêves et Mes Espoirs
    unit10Practice, // 134. Unit 10 Practice
    unit10Exam, // 135. Unit 10 Final Exam
  ],
};
