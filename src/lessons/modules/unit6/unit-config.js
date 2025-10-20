/**
 * Unit 6: Basic Fluency Configuration
 */

import { progressiveTenses } from "./progressive-tenses.js";
import { direModule } from "./dire.js";
import { prendreModule } from "./prendre.js";
import { mettreModule } from "./mettre.js";
import { demanderModule } from "./demander.js";
import { commanderModule } from "./commander.js";
import { besoinModule } from "./besoin.js";
import { top200Nouns } from "./top-200-nouns.js";
import { reading6 } from "./reading-6.js";
import { unit6Practice } from "./unit-6-practice.js";
import { unit6Exam } from "./unit-6-exam.js";

export const unit6Config = {
  metadata: {
    id: 6,
    title: "Unit 6: Basic Fluency",
    description:
      "Advanced communication verbs (say, take, put, ask), progressive tenses, expressing needs, and comprehensive vocabulary",
    icon: "💬",
    color: "#10b981",
  },
  modules: [
    progressiveTenses,
    direModule,
    prendreModule,
    mettreModule,
    demanderModule,
    commanderModule,
    besoinModule,
    top200Nouns,
    reading6,
    unit6Practice,
    unit6Exam,
  ],
};
