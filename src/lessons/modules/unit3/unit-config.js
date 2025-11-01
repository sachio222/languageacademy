/**
 * Unit 3: Movement & Possession Configuration
 * Defines the pedagogical sequence and metadata for Unit 3
 */

import { contractions } from "./contractions.js";
import { venirModule } from "../unit2/venir.js"; // Still in unit2 folder
import { allerModule } from "../unit2/aller.js"; // Still in unit2 folder
import { verbPatternHelp } from "../unit2/verb-pattern-help.js"; // Still in unit2 folder
import { partirModule } from "./partir.js";
import { module7_object_pronouns } from "./object-pronouns.js";
import { module8_possessive_adjectives } from "./possessive-adjectives.js";
import { module9_possessive_pronouns } from "./possessive-pronouns.js";
import { reading3 } from "./reading-3.js";
import { module10_combining } from "./combining.js";
import { unit3Practice } from "./unit-3-practice.js";
import { unit3Exam } from "./unit-3-exam.js";

export const unit3Config = {
  metadata: {
    id: 3,
    title: "Unit 3: Movement & Possession",
    description:
      "Master motion verbs (go, come, leave), object pronouns (it/them), and possessives (mine, yours)",
    icon: "🏃",
    color: "#06b6d4",
  },
  modules: [
    contractions, // 25. Contractions - du, au, de la, à la
    venirModule, // 26. Essential Verb - venir (to come)
    allerModule, // 27. Essential Verb - aller (to go)
    verbPatternHelp, // 28. Understanding Verb Patterns (Help Module)
    partirModule, // 29. Essential Verb - partir (to leave)
    module7_object_pronouns, // 30. Object Pronouns - Him, Her, It, Them
    module8_possessive_adjectives, // 31. Possessive Adjectives - My, Your, His
    module9_possessive_pronouns, // 32. Possessive Pronouns - Mine, Yours, His
    module10_combining, // 33. Combining Concepts
    reading3, // 34. Reading Comprehension 3
    unit3Practice, // 35. Unit 3 Practice
    unit3Exam, // 36. Unit 3 Final Exam
  ],
};
