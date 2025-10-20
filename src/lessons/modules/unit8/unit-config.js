/**
 * Unit 8: Daily Life & Actions Configuration
 * Defines the pedagogical sequence and metadata for Unit 8
 */

import { temporalWordsModule } from "./temporal-words.js";
import { reflexivePronounsModule } from "./reflexive-pronouns.js";
import { sAppelerModule } from "./s-appeler.js";
import { morningRoutineModule } from "./morning-routine.js";
import { gettingReadyModule } from "./getting-ready.js";
import { dailyReflexivesModule } from "./daily-reflexives.js";
import { reflexivePastModule } from "../unit9/reflexive-past.js"; // This should be in Unit 8
import { reciprocalReflexivesModule } from "../unit9/reciprocal-reflexives.js"; // This should be in Unit 8
import { commandsTuModule } from "./commands-tu.js";
import { commandsVousModule } from "./commands-vous.js";
import { irregularCommandsModule } from "./irregular-commands.js";
import { commandsPronounsModule } from "./commands-pronouns.js";
import { reading8 } from "./reading-8.js";
import { unit8Practice } from "./unit-8-practice.js";
import { unit8Exam } from "./unit-8-exam.js";

export const unit8Config = {
  metadata: {
    id: 8,
    title: "Unit 8: Daily Life & Actions",
    description:
      "Sequence actions in time, describe routines, introduce yourself properly: temporal words, reflexive verbs (s'appeler, se lever, se laver), and commands",
    icon: "🌅",
    color: "#8b5cf6",
  },
  modules: [
    temporalWordsModule, // 86. Temporal & Sequential Words - Time & Order
    reflexivePronounsModule, // 87. Reflexive Pronouns - me, te, se, nous, vous
    sAppelerModule, // 88. s'appeler (to be called) - "Je m'appelle..."
    morningRoutineModule, // 89. Morning Routine - se réveiller, se lever
    gettingReadyModule, // 90. Getting Ready - se laver, s'habiller, se préparer
    dailyReflexivesModule, // 91. Daily Reflexives - se souvenir, s'amuser, se dépêcher
    reflexivePastModule, // 92. Reflexive Verbs in Past Tense
    reciprocalReflexivesModule, // 93. Reciprocal Reflexives - Each Other
    commandsTuModule, // 94. Commands - tu form (Informal)
    commandsVousModule, // 95. Commands - vous form (Formal/Plural)
    irregularCommandsModule, // 96. Irregular Commands - être, avoir, aller, faire
    commandsPronounsModule, // 97. Commands with Pronouns
    reading8, // 98. Reading Test 8 - Ma Journée
    unit8Practice, // 99. Unit 8 Practice
    unit8Exam, // 100. Unit 8 Final Exam
  ],
};
