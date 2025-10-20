/**
 * Unit 11: Daily Essentials Configuration
 * Defines the pedagogical sequence and metadata for Unit 11
 */

import { agePersonalInfoModule } from "./age-personal-info.js";
import { donnerModule } from "./donner.js";
import { dailyActions1Module } from "../unit8/daily-actions-1.js";  // This belongs in Unit 11, not Unit 8
import { searchAndFindModule } from "./search-and-find.js";
import { perceptionVerbsModule } from "./perception-verbs.js";
import { socialSituationsModule } from "./social-situations.js";
import { directionsNavigationModule } from "./directions-navigation.js";
import { reading11 } from "./reading-11.js";
import { unit11Practice } from "./unit-11-practice.js";
import { unit11Exam } from "./unit-11-exam.js";

export const unit11Config = {
  metadata: {
    id: 11,
    title: "Unit 11: Daily Essentials",
    description:
      "Complete the top 100! Essential life skills: age expressions, high-frequency verbs (give, sleep, work, live, search, find, listen, watch, wait, arrive, stay), and directions. Perfect 100% top 100 coverage!",
    icon: "🌟",
    color: "#f59e0b",
  },
  modules: [
    agePersonalInfoModule, // 134. Age & Personal Information - J'ai 25 ans
    donnerModule, // 135. donner (to give) - Rank 24, CRITICAL frequency
    dailyActions1Module, // 136. Daily Actions - dormir, travailler, vivre
    searchAndFindModule, // 137. Search & Find - chercher, trouver
    perceptionVerbsModule, // 138. Perception - écouter, regarder full conjugations
    socialSituationsModule, // 139. Social Situations - attendre, arriver, rester
    directionsNavigationModule, // 140. Directions & Navigation - Essential travel skills
    reading11, // 141. Reading Test 11 - La France Moderne
    unit11Practice, // 142. Unit 11 Practice
    unit11Exam, // 143. Unit 11 Final Exam
  ],
};
