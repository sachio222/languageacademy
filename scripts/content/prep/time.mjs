// Study-time estimates (unit-prep design §7.1, §7.2), from the constants in content/fr/recipes/time.json.
//
// A step's estimate is its seconds divided by 60, rounded to the nearest whole minute (halves up), at least 1; a
// guide's step is its own `minutes`. Seconds per step:
//   vocabulary-intro      s_per_word per vocabulary row shown, s_per_concept per concept card, s_per_table_row per row
//   pronunciation         s_per_phrase per phrase (a lesson with no phrases list says each vocabulary row)
//   flash-cards           s_per_word_pass per vocabulary row, times passes
//   speed-match           s_per_round per round of round_size cards (one round when the lesson has any words)
//   writing, lesson-exam, practice-exercises, exam-questions
//                         each item asked in the step, by type (steps.items); a gap-fill adds gapfill_extra_blank
//                         per blank after the first
//   reading-passage       passage words at words_per_minute, s_per_popup per vocabulary row, s_per_question per item
//   interactive-help      the guide's minutes
// Conversation is a step L marks "soon": it holds nothing and is not estimated.
// Review minutes: round((new words × reviews_per_word × s_review_word + constructions × reviews_per_construction ×
// s_review_construction) ÷ 60). Practice sets and unit exams teach nothing, so they add none.
//
// A stub (status planned) has no contents yet: it is estimated as if written to its recipe, with its plan words as
// vocabulary rows and phrases, one concept card per plan construction, and items = opts.items (the blueprint's count)
// or the recipe's size.items.max, split by mix.typical, with mistakes.items_with_mistakes_min of them also in Writing.
import { STEPS_BY_KIND, defaultSteps } from '../schema/module.mjs';

export const SOON_STEPS = new Set(['conversation']);
const v = (c) => c.value;

/** The first-pass ceiling of the size rule: days × (smallest daily minutes − review minutes per session). */
export const fiveDayMinutes = (time) => v(time.days) * (v(time.smallest_daily_minutes) - v(time.review_minutes_per_session));

/** One item's first-pass seconds by its type. */
export function itemSeconds(item, time) {
  const t = time.steps.items;
  const base = t[item.type] ? v(t[item.type]) : v(t.respond);
  if (item.type !== 'gapfill') return base;
  const blanks = Array.isArray(item.blanks) ? item.blanks.length : 1;
  return base + v(t.gapfill_extra_blank) * Math.max(0, blanks - 1);
}

const roundMinutes = (seconds) => Math.max(1, Math.round(seconds / 60));
const stepsOf = (item, kind) => (Array.isArray(item.steps) ? item.steps : defaultSteps(item, kind));
const wordsIn = (text) => String(text ?? '').split(/\s+/).filter((w) => /\p{L}/u.test(w)).length;

/** Items split by the recipe's typical mix, largest remainder first (ties in the mix's order). */
export function typicalItems(recipe, count) {
  const mix = Object.entries(recipe?.mix?.typical ?? {});
  if (!mix.length || count <= 0) return [];
  const raw = mix.map(([type, share], i) => ({ type, i, n: Math.floor(share * count), rest: share * count - Math.floor(share * count) }));
  let left = count - raw.reduce((a, r) => a + r.n, 0);
  for (const r of [...raw].sort((a, b) => b.rest - a.rest || a.i - b.i)) {
    if (left <= 0) break;
    r.n += 1;
    left -= 1;
  }
  return raw.flatMap((r) => Array.from({ length: r.n }, () => r.type));
}

/** A stub written to its recipe, as time.mjs counts it. */
export function projectedModule(module, recipe, { items = null, passageWords = null } = {}) {
  const plan = module.plan ?? { words: [], constructions: [] };
  const kind = module.kind;
  const count = items ?? recipe?.size?.items?.max ?? 0;
  const types = typicalItems(recipe, count);
  const share = recipe?.mistakes?.items_with_mistakes_min ?? 0;
  const inWriting = kind === 'lesson' ? Math.ceil(share * types.length) : 0;
  const own = { lesson: ['writing', 'lesson-exam'], practice: ['practice-exercises'], unit_exam: ['exam-questions'], reading: ['reading-passage'] }[kind] ?? [];
  const asked = (i) => (kind === 'lesson' ? (i < inWriting ? own : ['lesson-exam']) : own);
  const rows = (kind === 'lesson' || kind === 'reading' ? plan.words : []).map((id) => ({ word_id: id, fr: id }));
  return {
    module_key: module.module_key,
    kind,
    status: 'planned',
    vocabulary: rows,
    concepts: kind === 'lesson' ? plan.constructions.map((id) => ({ id })) : [],
    tables: [],
    phrases: kind === 'lesson' ? rows.map((r) => ({ fr: r.fr })) : undefined,
    teaches: { constructions: kind === 'lesson' ? [...plan.constructions] : [] },
    passage: kind === 'reading' ? [{ id: 'projected', fr: Array.from({ length: passageWords ?? 0 }, () => 'mot').join(' ') }] : undefined,
    minutes: kind === 'guide' ? 5 : undefined,
    items: types.map((type, i) => ({ id: `projected-${i}`, type, steps: asked(i) })),
  };
}

/** A step's first-pass seconds. */
export function stepSeconds(module, stepId, time) {
  const s = time.steps;
  const rows = (module.vocabulary ?? []).length;
  const itemsIn = (sid) => (module.items ?? []).filter((it) => stepsOf(it, module.kind).includes(sid));
  switch (stepId) {
    case 'vocabulary-intro': {
      const tableRows = (module.tables ?? []).reduce((n, t) => n + (t.rows ?? []).length, 0);
      return rows * v(s['vocabulary-intro'].s_per_word) + (module.concepts ?? []).length * v(s['vocabulary-intro'].s_per_concept) + tableRows * v(s['vocabulary-intro'].s_per_table_row);
    }
    case 'pronunciation':
      return (Array.isArray(module.phrases) ? module.phrases.length : rows) * v(s.pronunciation.s_per_phrase);
    case 'flash-cards':
      return rows * v(s['flash-cards'].s_per_word_pass) * v(s['flash-cards'].passes);
    case 'speed-match': {
      const cards = Array.isArray(module.speed_match) ? module.speed_match.length : Math.min(rows, v(s['speed-match'].round_size));
      return Math.ceil(cards / v(s['speed-match'].round_size)) * v(s['speed-match'].s_per_round);
    }
    case 'reading-passage': {
      const words = (module.passage ?? []).reduce((n, b) => n + wordsIn(b.fr), 0);
      const r = s['reading-passage'];
      return (words / v(r.words_per_minute)) * 60 + rows * v(r.s_per_popup) + itemsIn(stepId).length * v(r.s_per_question);
    }
    case 'interactive-help':
      return (module.minutes ?? 0) * 60;
    default:
      return itemsIn(stepId).reduce((n, it) => n + itemSeconds(it, time), 0);
  }
}

/** A step's estimate in whole minutes (a guide's step is its own minutes). */
export function stepMinutes(module, stepId, time) {
  if (stepId === 'interactive-help') return module.minutes ?? 0;
  return roundMinutes(stepSeconds(module, stepId, time));
}

/**
 * Review minutes a module adds over the following weeks. opts.newWords and opts.constructions override the counts
 * (the card passes its lemma counts); otherwise new words are the vocabulary rows that are not review rows.
 */
export function reviewMinutes(module, time, opts = {}) {
  if (module.kind === 'practice' || module.kind === 'unit_exam') return 0;
  const plan = module.status === 'planned' ? module.plan : null;
  const newWords = opts.newWords ?? (plan ? plan.words.length : (module.vocabulary ?? []).filter((r) => r.review !== true).length);
  const constructions = module.kind === 'reading' ? 0 : opts.constructions ?? (plan ? plan.constructions.length : (module.teaches?.constructions ?? []).length);
  const r = time.review;
  return Math.round((newWords * v(r.reviews_per_word) * v(r.s_review_word) + constructions * v(r.reviews_per_construction) * v(r.s_review_construction)) / 60);
}

/**
 * { steps: Record<stepId, minutes>, first_pass, review } for a module. A stub is estimated through projectedModule,
 * with opts.recipe (its kind's recipe), opts.items and opts.passageWords.
 */
export function moduleMinutes(module, time, opts = {}) {
  const counted = module.status === 'planned' ? projectedModule(module, opts.recipe, opts) : module;
  const steps = {};
  for (const sid of STEPS_BY_KIND[module.kind] ?? []) if (!SOON_STEPS.has(sid)) steps[sid] = stepMinutes(counted, sid, time);
  const first_pass = Object.values(steps).reduce((a, b) => a + b, 0);
  return { steps, first_pass, review: reviewMinutes(module, time, opts) };
}
