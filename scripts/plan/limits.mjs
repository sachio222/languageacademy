// The sizes a planned module may have. One source: the recipes of the language's module kinds
// (content/<lang>/recipes, unit-prep design section 7) and, for what no recipe sets, the planning method (method.json).
//
// readLimits(repoRoot, lang) -> { lesson_words, table_words, minutes, exam_items, exam_minutes, guides, recipes }
//   minutes is the five-day rule: what a learner on the smallest daily option covers in five days.
import { loadRecipes } from '../content/prep/recipes.mjs';
import { fiveDayMinutes } from '../content/prep/time.mjs';
import { planPaths, readMethod } from './plan.mjs';

export function readLimits(repoRoot, lang) {
  const recipes = loadRecipes(planPaths(repoRoot, lang).content);
  const size = (kind) => recipes.byKind.get(kind).size;
  return {
    lesson_words: size('lesson').new_words.max,
    table_words: size('reading').new_words.max,
    minutes: fiveDayMinutes(recipes.time),
    exam_items: size('unit_exam').cap_items,
    exam_minutes: size('unit_exam').cap_minutes,
    guides: readMethod().unit.max_guides,
    recipes,
  };
}
