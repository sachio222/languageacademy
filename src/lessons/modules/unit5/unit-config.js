/**
 * Unit 5: Time & Taste Configuration
 * Defines the pedagogical sequence and metadata for Unit 5
 */

import { comparisons } from "./comparisons.js";
import { conditionals } from "./conditionals.js";
import { wouldConditionals } from "./would-conditionals.js";
import { aimerModule } from "./aimer.js";
import { etrePast } from "./etre-past.js";
import { avoirPast } from "./avoir-past.js";
import { foodNouns } from "./food-nouns.js";
import { mangerModule } from "./manger.js";
import { boireModule } from "./boire.js";
import { comparisonsSlang } from "./comparisons-slang.js";
import { reading5 } from "./reading-5.js";
import { unit5Practice } from "./unit-5-practice.js";
import { unit5Exam } from "./unit-5-exam.js";

export const unit5Config = {
  metadata: {
    id: 5,
    title: "Unit 5: Time & Taste",
    description:
      "Talk about the past (I was, I had), express preferences and opinions, order food, and add nuance with conditionals",
    icon: "⌚",
    color: "#ec4899",
  },
  modules: [
    comparisons, // 49. Comparisons & Intensity
    comparisonsSlang, // 50. Comparisons & Slang - Natural Speech
    conditionals, // 51. Conditionals - If/Then Logic
    wouldConditionals, // 52. Would Conditionals - Polite Requests
    aimerModule, // 53. Essential Verb - aimer (to like/love)
    etrePast, // 54. être in Past Tense - I Was, You Were
    avoirPast, // 55. avoir in Past Tense - I Had, You Had
    foodNouns, // 56. Food Nouns - Restaurant Vocabulary
    mangerModule, // 57. Essential Verb - manger (to eat)
    boireModule, // 58. Essential Verb - boire (to drink)
    reading5, // 59. Reading Comprehension 5
    unit5Practice, // 60. Unit 5 Practice
    unit5Exam, // 61. Unit 5 Final Exam
  ],
};
