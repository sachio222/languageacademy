// Item validation (spec 5.4). Pure: no file access. Roles: fr, native, native_fr.
import { problem } from '../problems.mjs';
import { spanProblems } from '../spans.mjs';

export const ITEM_TYPES = ['translate', 'respond', 'transform', 'gapfill', 'meaning', 'choice', 'comprehension'];
export const ID_PATTERN = /^[a-z0-9][a-z0-9-]*$/;

// Per type: required and optional fields. Roles/typed for the simple string fields live in FIELD_ROLES.
const COMMON = ['id', 'type', 'hint', 'mistakes', 'word_ids', 'steps'];
const SHAPES = {
  translate: { req: ['prompt', 'answer'], opt: ['accept'] },
  respond: { req: ['situation', 'answer'], opt: ['cue', 'accept'] },
  transform: { req: ['instruction', 'shown', 'answer'], opt: ['accept'] },
  gapfill: { req: ['text', 'blanks'], opt: ['gloss'] },
  meaning: { req: ['shown', 'answer'], opt: ['accept'] },
  choice: { req: ['question', 'options'], opt: [] },
  comprehension: { req: ['question'], opt: ['answer', 'accept', 'options'] },
};

// [role, typed] for each plain string field, by type.
const FIELD_ROLES = {
  translate: { prompt: ['native_fr', false], answer: ['fr', true], accept: ['fr', true] },
  respond: { situation: ['native_fr', false], cue: ['native_fr', false], answer: ['fr', true], accept: ['fr', true] },
  transform: { instruction: ['native_fr', false], shown: ['fr', false], answer: ['fr', true], accept: ['fr', true] },
  gapfill: { gloss: ['native_fr', false], text: ['fr', false] },
  meaning: { shown: ['fr', false], answer: ['native', true], accept: ['native', true] },
  choice: { question: ['native_fr', false] },
  // The spec gives no role for comprehension answers; they are the learner's reading of the story, so native.
  comprehension: { question: ['native_fr', false], answer: ['native', true], accept: ['native', true] },
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

  if (item.type === 'translate' && unitIndex !== 1) bad('type', 'translate_outside_unit1', 'translate items are allowed in Unit 1 only');

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
          const n = item.text.split('___').length - 1;
          if (n !== item.blanks.length) bad('blanks', 'blank_count', `text has ${n} ___ markers but ${item.blanks.length} blanks`);
        }
      }
    }
  }

  if (item.options !== undefined) checkOptions(item, bad);
  if (item.type === 'comprehension' && item.answer === undefined && item.options === undefined)
    bad('answer', 'field_missing', 'comprehension needs answer or options');
  if (item.type === 'comprehension' && item.answer !== undefined && item.options !== undefined)
    bad('options', 'options_invalid', 'comprehension takes answer or options, not both');

  // French spans in native_fr text.
  for (const t of itemTexts(item))
    if (t.role === 'native_fr') for (const code of spanProblems(t.text)) bad(t.path, code, `bad French span in ${t.path}`);

  return ps;
}

function checkOptions(item, bad) {
  const o = item.options;
  if (!Array.isArray(o) || o.length < 2) return bad('options', 'options_invalid', 'options must be a list of at least two');
  let right = 0;
  o.forEach((opt, i) => {
    if (!isObj(opt) || !isStr(opt.text)) return bad(`options[${i}]`, 'options_invalid', 'option needs a text string');
    for (const k of Object.keys(opt)) if (!['text', 'fr', 'right'].includes(k)) bad(`options[${i}].${k}`, 'field_unknown', `${k} is not a field of an option`);
    if (opt.right === true) right++;
  });
  if (right !== 1) bad('options', 'options_invalid', `options need exactly one right, found ${right}`);
}
