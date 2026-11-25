// Item validation (spec 5.4). Pure: no file access. Roles: fr, native, native_fr.
import { problem } from '../problems.mjs';
import { spanProblems } from '../spans.mjs';

export const ITEM_TYPES = ['translate', 'respond', 'transform', 'gapfill', 'meaning', 'choice', 'comprehension'];
export const ID_PATTERN = /^[a-z0-9][a-z0-9-]*$/;

// A gap-fill blank is exactly three underscores; the bundle counts markers with this same pattern. A run of four or
// more underscores is no blank at all (blank_marker_invalid), so the schema and the bundle can never disagree.
export const BLANK = '___';
export const BLANK_MARKER = /(?<!_)___(?!_)/g;
const LONG_UNDERSCORES = /_{4,}/;
export const blankCount = (text) => (String(text).match(BLANK_MARKER) || []).length;
// Braces mark French inside native text (native_fr). In an fr or native field they would reach the learner as braces.
export const BRACE = /[{}]/;
/** The span_in_plain_field message for a text { path, role } (module texts use it too). */
export const plainFieldMessage = (t) => `${t.path} is ${t.role === 'fr' ? 'French' : 'native'} text, so it takes no {…} span; write it without braces`;

// Per type: required and optional fields. Roles/typed for the simple string fields live in FIELD_ROLES.
export const COMMON = ['id', 'type', 'hint', 'mistakes', 'word_ids', 'steps'];
export const SHAPES = {
  translate: { req: ['prompt', 'answer'], opt: ['accept'] },
  respond: { req: ['situation', 'answer'], opt: ['cue', 'accept'] },
  transform: { req: ['instruction', 'shown', 'answer'], opt: ['accept'] },
  gapfill: { req: ['text', 'blanks'], opt: ['gloss'] },
  // instruction: a question that says more than "what does it mean" ("… at the end of a sentence?").
  meaning: { req: ['shown', 'answer'], opt: ['instruction', 'accept'] },
  choice: { req: ['question', 'options'], opt: [] },
  // cue: the line under the question ("Sophie is in ___"), as respond has; L shows it as the question's second line.
  comprehension: { req: ['question'], opt: ['cue', 'answer', 'accept', 'options'] },
};

// [role, typed] for each plain string field, by type.
export const FIELD_ROLES = {
  translate: { prompt: ['native_fr', false], answer: ['fr', true], accept: ['fr', true] },
  respond: { situation: ['native_fr', false], cue: ['native_fr', false], answer: ['fr', true], accept: ['fr', true] },
  transform: { instruction: ['native_fr', false], shown: ['fr', false], answer: ['fr', true], accept: ['fr', true] },
  gapfill: { gloss: ['native_fr', false], text: ['fr', false] },
  meaning: { instruction: ['native_fr', false], shown: ['fr', false], answer: ['native', true], accept: ['native', true] },
  choice: { question: ['native_fr', false] },
  // Readings are answered in French (ruling: reading-6 "prendre le train", reading-3 "Café de la Paix").
  comprehension: { question: ['native_fr', false], cue: ['native_fr', false], answer: ['fr', true], accept: ['fr', true] },
};

const isStr = (v) => typeof v === 'string' && v.trim() !== '';
const isObj = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);

// Answer role (for mistakes[].answer and blanks) follows the item's own answer role.
function answerRole(type) {
  const r = FIELD_ROLES[type]?.answer;
  return r ? r[0] : 'fr';
}

export function itemTexts(item) {
  const out = [];
  const add = (path, role, text, typed) => {
    if (typeof text === 'string') out.push({ path, role, text, typed });
  };
  const roles = FIELD_ROLES[item.type] || {};
  for (const [field, [role, typed]] of Object.entries(roles)) {
    const v = item[field];
    if (Array.isArray(v)) v.forEach((t, i) => add(`${field}[${i}]`, role, t, typed));
    else add(field, role, v, typed);
  }
  add('hint', 'native_fr', item.hint, false);
  (item.mistakes || []).forEach((m, i) => {
    if (!isObj(m)) return;
    add(`mistakes[${i}].answer`, answerRole(item.type), m.answer, true);
    add(`mistakes[${i}].feedback`, 'native_fr', m.feedback, false);
  });
  (item.blanks || []).forEach((b, i) => {
    if (!isObj(b)) return;
    add(`blanks[${i}].answer`, 'fr', b.answer, true);
    (Array.isArray(b.accept) ? b.accept : []).forEach((t, j) => add(`blanks[${i}].accept[${j}]`, 'fr', t, true));
  });
  (Array.isArray(item.options) ? item.options : []).forEach((o, i) => {
    if (isObj(o)) add(`options[${i}].text`, o.fr ? 'fr' : 'native', o.text, false);
  });
  return out;
}

export function validateItem(item, { file, path, kind, unitIndex, stepsAllowed } = {}) {
  const ps = [];
  const bad = (sub, code, msg) => ps.push(problem(file, sub ? `${path}.${sub}` : path, code, msg));
  if (!isObj(item)) {
    bad('', 'item_invalid', 'item must be an object');
    return ps;
  }

  if (!ITEM_TYPES.includes(item.type)) {
    bad('type', 'item_type_invalid', `type must be one of ${ITEM_TYPES.join(', ')}`);
    return ps;
  }
  const shape = SHAPES[item.type];
  const known = new Set([...COMMON, ...shape.req, ...shape.opt]);
  for (const k of Object.keys(item)) if (!known.has(k)) bad(k, 'field_unknown', `${k} is not a field of ${item.type}`);
  for (const k of shape.req) if (item[k] === undefined) bad(k, 'field_missing', `${item.type} needs ${k}`);

  if (typeof item.id !== 'string' || !ID_PATTERN.test(item.id)) bad('id', 'id_invalid', `id must match ${ID_PATTERN}`);

  // A checker finding, not a load failure (spec 5.4): a warning, which Task 10 counts under the issue budget.
  if (item.type === 'translate' && unitIndex !== 1)
    ps.push(problem(file, `${path}.type`, 'translate_outside_unit1', 'a bare English sentence to translate, outside Unit 1; rewrite it over time (Jake, 2026-11-25)', 'warning'));

  // Plain string fields.
  for (const field of Object.keys(FIELD_ROLES[item.type])) {
    const v = item[field];
    if (v === undefined) continue;
    if (field === 'accept') {
      if (!Array.isArray(v) || !v.every(isStr)) bad(field, 'field_type', 'accept must be a list of non-empty strings');
    } else if (!isStr(v)) bad(field, 'field_type', `${field} must be a non-empty string`);
  }
  if (item.hint !== undefined && !isStr(item.hint)) bad('hint', 'field_type', 'hint must be a non-empty string');

  if (item.mistakes !== undefined) {
    if (!Array.isArray(item.mistakes)) bad('mistakes', 'field_type', 'mistakes must be a list');
    else
      item.mistakes.forEach((m, i) => {
        if (!isObj(m) || !isStr(m.answer) || !isStr(m.feedback)) return bad(`mistakes[${i}]`, 'field_type', 'mistake needs answer and feedback strings');
        for (const k of Object.keys(m)) if (k !== 'answer' && k !== 'feedback') bad(`mistakes[${i}].${k}`, 'field_unknown', `${k} is not a field of a mistake`);
      });
  }
  if (item.word_ids !== undefined && !(Array.isArray(item.word_ids) && item.word_ids.every(isStr))) bad('word_ids', 'field_type', 'word_ids must be a list of strings');

  if (item.steps !== undefined) {
    if (!Array.isArray(item.steps) || !item.steps.every(isStr)) bad('steps', 'field_type', 'steps must be a list of step ids');
    else if (item.steps.length === 0) bad('steps', 'steps_invalid', 'steps lists at least one step; leave it out for the default steps');
    else if (new Set(item.steps).size !== item.steps.length) bad('steps', 'steps_invalid', 'steps names a step twice');
    else
      for (const s of item.steps)
        if (Array.isArray(stepsAllowed) && !stepsAllowed.includes(s)) bad('steps', 'step_not_allowed', `step ${s} is not allowed in a ${kind} module`);
  }

  if (item.type === 'gapfill') {
    if (item.blanks !== undefined) {
      if (!Array.isArray(item.blanks) || item.blanks.length === 0) bad('blanks', 'field_type', 'blanks must be a non-empty list');
      else {
        item.blanks.forEach((b, i) => {
          if (!isObj(b) || !isStr(b.answer)) return bad(`blanks[${i}]`, 'field_type', 'blank needs an answer string');
          for (const k of Object.keys(b)) if (k !== 'answer' && k !== 'accept') bad(`blanks[${i}].${k}`, 'field_unknown', `${k} is not a field of a blank`);
          if (b.accept !== undefined && !(Array.isArray(b.accept) && b.accept.every(isStr))) bad(`blanks[${i}].accept`, 'field_type', 'accept must be a list of strings');
        });
        if (typeof item.text === 'string') {
          if (LONG_UNDERSCORES.test(item.text)) bad('text', 'blank_marker_invalid', `a blank is exactly ${BLANK}; text has a run of four or more underscores`);
          else {
            const n = blankCount(item.text);
            if (n !== item.blanks.length) bad('blanks', 'blank_count', `text has ${n} ${BLANK} markers but ${item.blanks.length} blanks`);
          }
        }
      }
    }
  }

  if (item.options !== undefined) checkOptions(item, bad);
  // A pick-one item is chosen, not typed, so it has no typed mistakes.
  if (item.mistakes !== undefined && (item.type === 'choice' || (item.type === 'comprehension' && item.options !== undefined)))
    bad('mistakes', 'mistakes_not_allowed', `a ${item.type} item that is picked has no mistakes`);
  if (item.type === 'comprehension' && item.answer === undefined && item.options === undefined)
    bad('answer', 'field_missing', 'comprehension needs answer or options');
  if (item.type === 'comprehension' && item.answer !== undefined && item.options !== undefined)
    bad('options', 'options_invalid', 'comprehension takes answer or options, not both');
  // accept lists other ways to type the answer, so it needs answer, and a picked question is never typed: accept with
  // neither answer nor options is the field_missing above, and accept beside options is this.
  if (item.type === 'comprehension' && item.accept !== undefined && item.options !== undefined)
    bad('accept', 'options_invalid', 'a picked comprehension item has options, never a typed accept');

  // French spans in native_fr text; no braces at all in fr and native text.
  for (const t of itemTexts(item)) {
    if (t.role === 'native_fr') for (const code of spanProblems(t.text)) bad(t.path, code, `bad French span in ${t.path}`);
    else if (BRACE.test(t.text)) bad(t.path, 'span_in_plain_field', plainFieldMessage(t));
  }

  return ps;
}

// Shared with guide checks (schema/module.mjs), which take the same options shape.
export function checkOptions(item, bad) {
  const o = item.options;
  if (!Array.isArray(o) || o.length < 2) return bad('options', 'options_invalid', 'options must be a list of at least two');
  let right = 0;
  o.forEach((opt, i) => {
    if (!isObj(opt) || !isStr(opt.text)) return bad(`options[${i}]`, 'options_invalid', 'option needs a text string');
    for (const k of Object.keys(opt)) if (!['text', 'fr', 'right'].includes(k)) bad(`options[${i}].${k}`, 'field_unknown', `${k} is not a field of an option`);
    for (const k of ['fr', 'right']) if (opt[k] !== undefined && typeof opt[k] !== 'boolean') bad(`options[${i}].${k}`, 'options_invalid', `${k} is true or false`);
    if (opt.right === true) right++;
  });
  if (right !== 1) bad('options', 'options_invalid', `options need exactly one right, found ${right}`);
}
