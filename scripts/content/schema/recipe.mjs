// la-recipe@1 and la-time@1 (unit-prep design §6.1, §7.1): the recipe of each module kind and the time constants every
// estimate uses, validated by plain JavaScript, as the module schema is.
//
// validateRecipe(doc, file, kind) -> Problem[]   codes recipe_field_unknown, recipe_kind, recipe_range, recipe_basis_missing
// validateTime(doc, file) -> Problem[]           codes recipe_field_unknown, recipe_basis_missing, recipe_range
//
// Every number a recipe sets is a working number until the research check (design §7.4) confirms it, so each one
// names its source in `basis`: a key there covers the number at that path and every number under it
// ("size.items" covers size.items.min and size.items.max).
import { problem } from '../problems.mjs';

export const RECIPE_SCHEMA = 'la-recipe@1';
export const TIME_SCHEMA = 'la-time@1';
export const RECIPE_KINDS = ['lesson', 'guide', 'reading', 'practice', 'unit_exam'];

const COMMON = ['schema', 'kind', 'version', 'about', 'skeleton', 'size', 'mix', 'accept', 'mistakes', 'glosses', 'drafter_rules', 'basis'];
const EXTRA = { lesson: ['goal_verbs'], guide: [], reading: ['distinct_words', 'patterns_min'], practice: ['blueprint'], unit_exam: ['blueprint'] };
// The parts whose numbers need a basis entry.
const SOURCED = ['size', 'mix', 'blueprint', 'distinct_words', 'patterns_min', 'mistakes'];

const isObj = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);
const isText = (v) => typeof v === 'string' && v.trim() !== '';

/** [path, number] for every number under `value`, paths joined with dots (arrays by index). */
function numbers(value, path, out = []) {
  if (typeof value === 'number') out.push([path, value]);
  else if (Array.isArray(value)) value.forEach((v, i) => numbers(v, `${path}.${i}`, out));
  else if (isObj(value)) for (const [k, v] of Object.entries(value)) numbers(v, path ? `${path}.${k}` : k, out);
  return out;
}

const covered = (path, keys) => keys.some((k) => path === k || path.startsWith(`${k}.`));

export function validateRecipe(doc, file, kind) {
  const out = [];
  const bad = (path, code, message) => out.push(problem(file, path, code, message));
  if (!isObj(doc)) return [problem(file, '', 'recipe_kind', 'a recipe is one JSON object')];
  if (doc.schema !== RECIPE_SCHEMA) bad('schema', 'recipe_kind', `schema must be ${RECIPE_SCHEMA}`);
  if (!RECIPE_KINDS.includes(doc.kind) || (kind && doc.kind !== kind)) bad('kind', 'recipe_kind', `kind must be ${kind ?? RECIPE_KINDS.join(', ')}, not ${JSON.stringify(doc.kind)}`);
  const allowed = new Set([...COMMON, ...(EXTRA[doc.kind] ?? [])]);
  for (const k of Object.keys(doc)) if (!allowed.has(k)) bad(k, 'recipe_field_unknown', `${k} is not a field of a ${doc.kind} recipe`);
  if (!Number.isInteger(doc.version) || doc.version < 1) bad('version', 'recipe_range', 'version is a whole number of 1 or more');
  if (!Array.isArray(doc.skeleton) || !doc.skeleton.every((p) => isObj(p) && isText(p.part) && isText(p.rule))) bad('skeleton', 'recipe_kind', 'skeleton is a list of { part, rule }');
  if (!Array.isArray(doc.drafter_rules) || !doc.drafter_rules.every(isText)) bad('drafter_rules', 'recipe_kind', 'drafter_rules is a list of sentences');
  if (!isObj(doc.size)) bad('size', 'recipe_kind', 'size is an object');
  if (!isObj(doc.basis)) bad('basis', 'recipe_basis_missing', 'basis names the source of every number');

  // Ranges: a { min, max } pair in order; shares between 0 and 1; a typical mix that adds up to 1.
  const walkRanges = (v, path) => {
    if (!isObj(v)) return;
    if (typeof v.min === 'number' && typeof v.max === 'number' && v.min > v.max) bad(path, 'recipe_range', `min ${v.min} is above max ${v.max}`);
    for (const [k, x] of Object.entries(v)) walkRanges(x, `${path}.${k}`);
  };
  walkRanges(doc.size, 'size');
  for (const [path, n] of numbers({ mix: doc.mix, blueprint: doc.blueprint, mistakes: doc.mistakes, patterns_min: doc.patterns_min }, '')) {
    if (/(share_min|_min|tolerance|typical\.[a-z_]+|target_success\.\d|patterns_min)$/.test(path) && !/types_min$/.test(path) && (n < 0 || n > 1))
      bad(path, 'recipe_range', `${path} is a share between 0 and 1, not ${n}`);
  }
  const typical = doc.mix?.typical;
  if (isObj(typical) && Object.keys(typical).length) {
    const sum = Object.values(typical).reduce((a, b) => a + b, 0);
    if (Math.abs(sum - 1) > 1e-9) bad('mix.typical', 'recipe_range', `mix.typical adds up to ${sum}, not 1`);
    for (const t of Object.keys(typical)) if (!(doc.mix.types ?? []).includes(t)) bad(`mix.typical.${t}`, 'recipe_range', `${t} is not one of mix.types`);
  }

  // Every number has a source.
  const keys = isObj(doc.basis) ? Object.keys(doc.basis) : [];
  for (const [k, v] of Object.entries(doc.basis ?? {})) if (!isText(v)) bad(`basis.${k}`, 'recipe_basis_missing', `basis.${k} must name a source`);
  const sourced = Object.fromEntries(SOURCED.filter((k) => doc[k] !== undefined).map((k) => [k, doc[k]]));
  for (const [path] of numbers(sourced, '')) if (!covered(path, keys)) bad(path, 'recipe_basis_missing', `${path} has no basis entry`);
  return out;
}

const TIME_SHAPE = {
  smallest_daily_minutes: null, review_minutes_per_session: null, days: null,
  steps: {
    'vocabulary-intro': { s_per_word: null, s_per_concept: null, s_per_table_row: null },
    'verb-forms': { s_full_step: null, s_like_step: null, s_pattern_check: null },
    pronunciation: { s_per_phrase: null },
    'flash-cards': { s_per_word_pass: null, passes: null },
    'speed-match': { s_per_round: null, round_size: null },
    items: { respond: null, translate: null, transform: null, gapfill: null, gapfill_extra_blank: null, meaning: null, choice: null, comprehension: null },
    'reading-passage': { words_per_minute: null, s_per_popup: null, s_per_question: null },
  },
  review: { reviews_per_word: null, s_review_word: null, reviews_per_construction: null, s_review_construction: null },
};

export function validateTime(doc, file) {
  const out = [];
  const bad = (path, code, message) => out.push(problem(file, path, code, message));
  if (!isObj(doc)) return [problem(file, '', 'recipe_kind', 'time.json is one JSON object')];
  if (doc.schema !== TIME_SCHEMA) bad('schema', 'recipe_kind', `schema must be ${TIME_SCHEMA}`);
  const walk = (shape, value, path) => {
    for (const k of Object.keys(value ?? {})) {
      if (path === '' && ['schema', 'version', 'about'].includes(k)) continue;
      if (!(k in shape)) bad(path ? `${path}.${k}` : k, 'recipe_field_unknown', `${k} is not a time constant`);
    }
    for (const [k, sub] of Object.entries(shape)) {
      const p = path ? `${path}.${k}` : k;
      const v = value?.[k];
      if (sub === null) {
        if (!isObj(v) || typeof v.value !== 'number') bad(p, 'recipe_range', `${p} needs { value, basis } with a number`);
        else {
          if (!(v.value > 0)) bad(p, 'recipe_range', `${p} must be above 0`);
          if (!isText(v.basis)) bad(p, 'recipe_basis_missing', `${p} has no basis`);
          for (const extra of Object.keys(v)) if (!['value', 'basis'].includes(extra)) bad(`${p}.${extra}`, 'recipe_field_unknown', `${extra} is not part of a constant`);
        }
      } else walk(sub, v, p);
    }
  };
  walk(TIME_SHAPE, doc, '');
  if (isObj(doc.smallest_daily_minutes) && isObj(doc.review_minutes_per_session) && doc.review_minutes_per_session.value >= doc.smallest_daily_minutes.value)
    bad('review_minutes_per_session', 'recipe_range', 'review minutes must leave time for new study at the smallest daily option');
  return out;
}
