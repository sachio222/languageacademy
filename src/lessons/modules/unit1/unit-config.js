/**
 * Unit 1: Essential Grammar Configuration
 * Defines the pedagogical sequence and metadata for Unit 1
 */

import { famousWords } from "./famous-words.js";
import { module1 } from "./pronouns.js";
import { module3_etre } from "./etre.js";
import { module4_avoir } from "./avoir.js";
import { articles } from "./articles.js";
import { basicNouns } from "./basic-nouns.js";
import { cognatesHelpModule } from "./cognates-help.js";
import { plurals } from "./plurals.js";
import { liaisonHelpModule } from "./liaison-help.js";
import { connectors } from "./connectors.js";
import { reading1 } from "./reading-1.js";
import { unit1Practice } from "./unit-1-practice.js";
import { unit1Exam } from "./unit-1-exam.js";

export const unit1Config = {
  metadata: {
    id: 1,
    title: "Unit 1: Essential Grammar",
    description:
      "Master pronouns (I, you, he), être (to be), avoir (to have), articles, basic nouns, and connectors",
    icon: "🧩",
    color: "#3b82f6",
  },
  modules: [
    famousWords, // 1. Famous Words & Greetings
    module1, // 2. Core Pronouns
    module3_etre, // 3. Essential Verb - être (to be)
    module4_avoir, // 4. Essential Verb - avoir (to have)
    articles, // 5. Articles - un/une, le/la/les
    cognatesHelpModule, // 6. Cognates Help - French and English Share Many Words
    basicNouns, // 7. Basic Nouns - Foundation Vocabulary
    plurals, // 8. Plurals - Multiple Things
    liaisonHelpModule, // 9. Liaison Help - French Flow
    connectors, // 10. Connectors - et, mais, ou, aussi, très
    reading1, // 11. Reading Comprehension 1
    unit1Practice, // 12. Unit 1 Practice
    unit1Exam, // 13. Unit 1 Final Exam
  ],
};
