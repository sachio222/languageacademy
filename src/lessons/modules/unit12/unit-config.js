/**
 * Unit 12: Curiosity & Questions Configuration
 * Defines the pedagogical sequence and metadata for Unit 12
 */

import { natureAnimalsModule } from "./nature-animals.js";
import { movementVerbsModule } from "./movement-verbs.js";
import { naturalPhenomenaModule } from "./natural-phenomena-verbs.js";
import { questceQuiQueModule } from "./questce-qui-que.js";
import { pourquoiComplexModule } from "./pourquoi-complex.js";
import { commentComplexModule } from "./comment-complex.js";
import { quiestQuiQueModule } from "./quiest-qui-que.js";
import { inversionQuestionsModule } from "./inversion-questions.js";
import { embeddedQuestionsModule } from "./embedded-questions.js";
import { rhetoricalNegativeModule } from "./rhetorical-negative-questions.js";
import { multiClauseQuestionsModule } from "./multi-clause-questions.js";

export const unit12Config = {
  metadata: {
    id: 12,
    title: "Unit 12: Curiosity & Questions",
    description:
      "Ask ANY question in French! Learn nature vocabulary, then master all question structures: qu'est-ce qui/que distinction, complex pourquoi/comment, formal inversion, embedded questions, and native-level complexity.",
    icon: "❓",
    color: "#06b6d4",
  },
  modules: [
    natureAnimalsModule, // 146. Nature & Animals - Curiosity vocabulary
    movementVerbsModule, // 147. Movement Verbs - nager, sauter, voler, courir
    naturalPhenomenaModule, // 148. Natural Phenomena - briller, pousser, rendre
    questceQuiQueModule, // 149. qu'est-ce qui vs que - CRITICAL distinction
    pourquoiComplexModule, // 150. Complex pourquoi - Ask why about any process
    commentComplexModule, // 151. Complex comment - Ask how things work
    quiestQuiQueModule, // 152. qui est-ce qui vs que - Who questions
    inversionQuestionsModule, // 153. Inversion Questions - Formal register
    embeddedQuestionsModule, // 154. Embedded Questions - Polite indirect questions
    rhetoricalNegativeModule, // 155. Rhetorical & Negative - Advanced style
    multiClauseQuestionsModule, // 156. Multi-Clause Questions - Full complexity
  ],
};
