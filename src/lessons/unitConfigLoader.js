/**
 * Unit Config Loader - Loads unit configurations and auto-assembles everything
 * This replaces the massive moduleConfigs array with smaller, manageable unit configs
 */

import { unit1Config } from "./modules/unit1/unit-config.js";
import { unit2Config } from "./modules/unit2/unit-config.js";
import { unit3Config } from "./modules/unit3/unit-config.js";
import { unit4Config } from "./modules/unit4/unit-config.js";
import { unit5Config } from "./modules/unit5/unit-config.js";
import { unit6Config } from "./modules/unit6/unit-config.js";
import { unit7Config } from "./modules/unit7/unit-config.js";
import { unit8Config } from "./modules/unit8/unit-config.js";
import { unit9Config } from "./modules/unit9/unit-config.js";
import { unit10Config } from "./modules/unit10/unit-config.js";
import { unit11Config } from "./modules/unit11/unit-config.js";
import { unit12Config } from "./modules/unit12/unit-config.js";
import { referenceConfig } from "./modules/reference/unit-config.js";

// All unit configurations in pedagogical order
export const unitConfigs = [
  unit1Config,
  unit2Config,
  unit3Config,
  unit4Config,
  unit5Config,
  unit6Config,
  unit7Config,
  unit8Config,
  unit9Config,
  unit10Config,
  unit11Config,
  unit12Config,
  referenceConfig,
];

/**
 * Auto-assemble the master moduleConfigs array from unit configs
 * This maintains the same pedagogical order but from distributed unit files
 */
export function getModuleConfigs() {
  return unitConfigs.flatMap((unitConfig) => unitConfig.modules);
}

/**
 * Generate dynamic unit structure with auto-calculated ranges
 */
export function generateUnitStructure() {
  let currentLessonId = 1;

  return unitConfigs.map((unitConfig) => {
    const moduleCount = unitConfig.modules.length;
    const startId = currentLessonId;
    const endId = currentLessonId + moduleCount - 1;

    currentLessonId = endId + 1;

    return {
      ...unitConfig.metadata,
      lessonRange: [startId, endId],
    };
  });
}
