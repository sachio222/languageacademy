/**
 * Dynamic Unit Structure Generator
 * Auto-calculates unit ranges based on actual modules in unit folders
 * No more manual range maintenance!
 */

import * as unit1 from "./modules/unit1/index.js";
import * as unit2 from "./modules/unit2/index.js";
import * as unit3 from "./modules/unit3/index.js";
import * as unit4 from "./modules/unit4/index.js";
import * as unit5 from "./modules/unit5/index.js";
import * as unit6 from "./modules/unit6/index.js";
import * as unit7 from "./modules/unit7/index.js";
import * as unit8 from "./modules/unit8/index.js";
import * as unit9 from "./modules/unit9/index.js";
import * as unit10 from "./modules/unit10/index.js";
import * as unit11 from "./modules/unit11/index.js";
import * as unit12 from "./modules/unit12/index.js";
import * as reference from "./modules/reference/index.js";

// Unit definitions with metadata - order matters for lesson ID assignment
const unitDefinitions = [
  {
    id: 1,
    folder: "unit1",
    modules: unit1,
    title: "Unit 1: Essential Grammar",
    description:
      "Master pronouns (I, you, he), être (to be), avoir (to have), articles, basic nouns, and connectors",
    icon: "🏗️",
    color: "#3b82f6",
  },
  {
    id: 2,
    folder: "unit2",
    modules: unit2,
    title: "Unit 2: Asking & Describing",
    description:
      "Ask questions, use demonstratives (this/that), essential verbs (want/can/see), add descriptions with adjectives and prepositions",
    icon: "🧩",
    color: "#8b5cf6",
  },
  {
    id: 3,
    folder: "unit3",
    modules: unit3,
    title: "Unit 3: Movement & Possession",
    description:
      "Master motion verbs (go, come, leave), object pronouns (it/them), and possessives (mine, yours)",
    icon: "🎯",
    color: "#06b6d4",
  },
  {
    id: 4,
    folder: "unit4",
    modules: unit4,
    title: "Unit 4: Everyday Words",
    description:
      "Survival phrases, negation (I don't), time & location words, and essential daily verbs",
    icon: "🥖",
    color: "#f59e0b",
  },
  {
    id: 5,
    folder: "unit5",
    modules: unit5,
    title: "Unit 5: Time & Taste",
    description:
      "Talk about the past (I was, I had), express preferences and opinions, order food, and add nuance with conditionals",
    icon: "⏳",
    color: "#ec4899",
  },
  {
    id: 6,
    folder: "unit6",
    modules: unit6,
    title: "Unit 6: Basic Fluency",
    description:
      "Advanced communication verbs (say, take, put, ask), progressive tenses, expressing needs, and comprehensive vocabulary",
    icon: "💬",
    color: "#10b981",
  },
  {
    id: 7,
    folder: "unit7",
    modules: unit7,
    title: "Unit 7: Knowledge & Learning",
    description:
      "Express understanding, thinking, and learning: comprendre (understand), savoir (know), penser (think), plus discourse markers for natural speech",
    icon: "🧠",
    color: "#f97316",
  },
  {
    id: 8,
    folder: "unit8",
    modules: unit8,
    title: "Unit 8: Daily Life & Actions",
    description:
      "Sequence actions in time, describe routines, introduce yourself properly: temporal words, reflexive verbs (s'appeler, se lever, se laver), and commands",
    icon: "🌅",
    color: "#8b5cf6",
  },
  {
    id: 9,
    folder: "unit9",
    modules: unit9,
    title: "Unit 9: Discourse & Past Tense",
    description:
      "Complete storytelling mastery: causal/spatial words (parce que, près de), passé composé (j'ai mangé, je suis allé), imparfait (j'étais, il faisait), and the critical PC vs IMP distinction",
    icon: "📖",
    color: "#ef4444",
  },
  {
    id: 10,
    folder: "unit10",
    modules: unit10,
    title: "Unit 10: Mastery & Nuance",
    description:
      "B2 Level Phrases! Learn special verb forms, then use them in top practical expressions: necessity (il faut que), wishes (je veux que), emotions (je suis content que), hypotheticals (si j'étais...), regrets (si j'avais su), services (je me fais couper), and more!",
    icon: "🎓",
    color: "#8b5cf6",
  },
  {
    id: 11,
    folder: "unit11",
    modules: unit11,
    title: "Unit 11: Daily Essentials",
    description:
      "Complete the top 100! Essential life skills: age expressions, high-frequency verbs (give, sleep, work, live, search, find, listen, watch, wait, arrive, stay), and directions. Perfect 100% top 100 coverage!",
    icon: "🌟",
    color: "#f59e0b",
  },
  {
    id: 12,
    folder: "unit12",
    modules: unit12,
    title: "Unit 12: Curiosity & Questions",
    description:
      "Ask ANY question in French! Learn nature vocabulary, then master all question structures: qu'est-ce qui/que distinction, complex pourquoi/comment, formal inversion, embedded questions, and native-level complexity.",
    icon: "❓",
    color: "#06b6d4",
  },
  {
    id: 13,
    folder: "reference",
    modules: reference,
    title: "Reference",
    description:
      "Essential reference materials - alphabet, numbers, dates, holidays, French-speaking countries, language facts, colors, and spelling patterns",
    icon: "📚",
    color: "#6366f1",
    isReference: true,
  },
];

/**
 * Generate dynamic unit structure based on moduleConfigs array order
 * This automatically calculates lesson ranges by finding unit exam boundaries
 * Adding/removing modules updates ranges automatically
 */
export function generateDynamicUnitStructure(moduleConfigs) {
  const units = [];
  let currentUnitId = 1;
  let unitStartId = 1;

  // Find unit boundaries by looking for unit exams
  moduleConfigs.forEach((config, index) => {
    const lessonId = index + 1;

    // Check if this is a unit exam that ends the current unit
    if (config.isUnitExam && config.title.includes(`Unit ${currentUnitId}`)) {
      // Find the unit definition for this unit
      const unitDef = unitDefinitions.find((u) => u.id === currentUnitId);

      if (unitDef) {
        units.push({
          id: currentUnitId,
          title: unitDef.title,
          description: unitDef.description,
          lessonRange: [unitStartId, lessonId],
          icon: unitDef.icon,
          color: unitDef.color,
          isReference: unitDef.isReference || false,
        });
      }

      // Next unit starts after this exam
      currentUnitId++;
      unitStartId = lessonId + 1;
    }
  });

  // Handle remaining modules (Unit 12 without exam + Reference)
  if (unitStartId <= moduleConfigs.length) {
    // Check if there are remaining regular units without exams
    const remainingModules = moduleConfigs.slice(unitStartId - 1);

    // Find where reference modules start (they have isReference flag or start with "Reference")
    let referenceStartIndex = remainingModules.findIndex(
      (config) => config.isReference || config.title.includes("Reference")
    );

    if (referenceStartIndex === -1) {
      // No reference modules found, all remaining are Unit 12
      const unitDef = unitDefinitions.find((u) => u.id === currentUnitId);
      if (unitDef) {
        units.push({
          id: currentUnitId,
          title: unitDef.title,
          description: unitDef.description,
          lessonRange: [unitStartId, moduleConfigs.length],
          icon: unitDef.icon,
          color: unitDef.color,
          isReference: false,
        });
      }
    } else {
      // Split between Unit 12 and Reference
      const unit12EndId = unitStartId + referenceStartIndex - 1;
      const referenceStartId = unit12EndId + 1;

      // Add Unit 12
      const unit12Def = unitDefinitions.find((u) => u.id === currentUnitId);
      if (unit12Def) {
        units.push({
          id: currentUnitId,
          title: unit12Def.title,
          description: unit12Def.description,
          lessonRange: [unitStartId, unit12EndId],
          icon: unit12Def.icon,
          color: unit12Def.color,
          isReference: false,
        });
      }

      // Add Reference
      const referenceDef = unitDefinitions.find((u) => u.isReference);
      if (referenceDef) {
        units.push({
          id: 13,
          title: referenceDef.title,
          description: referenceDef.description,
          lessonRange: [referenceStartId, moduleConfigs.length],
          icon: referenceDef.icon,
          color: referenceDef.color,
          isReference: true,
        });
      }
    }
  }

  return units;
}

/**
 * Get all modules from all units in the correct order
 * This maintains the same module order as before, but dynamically
 */
export function getAllModulesInOrder() {
  const allModules = {};

  unitDefinitions.forEach((unitDef) => {
    Object.assign(allModules, unitDef.modules);
  });

  return allModules;
}
