// The golden test's machinery (spec 8.2, "Proof the live screens see the same lessons"): read the migration report
// back into lines, compare a live lesson with the adapter's lesson field by field, and sort each difference into an
// allowed class from scripts/content/test/fixtures/golden-allowed.json. Pure: no fs, no app imports.
import { sentences } from '../migrate/reading.mjs';

const isObj = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);
const isStr = (v) => typeof v === 'string';

/* ---------- the migration report, read back ---------- */

// Section heading -> report line kind (scripts/content/migrate/report.mjs SECTIONS).
const HEADINGS = {
  'Needs Jake': 'held_out',
  'Guide checks written by hand': 'guide_checks_by_hand',
  'Readings with no story': 'story_missing',
  'Answers the checker rejects': 'answer_fails',
  'Spellings taught more than once': 'word_sense',
  'Item types to confirm': 'type_guess',
  'Practice blanks that were in the wrong place': 'blank_misplaced',
  'Position words': 'position_word',
  'Exercises rewritten as Jake ruled': 'rewritten',
  'English prompts written as respond items': 'framed_respond',
  'Passage words with no pop-up': 'reading_word_no_popup',
  'Estimates to confirm': 'estimate',
  'Hand edits kept': 'hand_edit',
  'Hand edits the source or converter changed under': 'merge_conflict',
  'Source changes since the last run': 'source_changed',
  'Source exercises added since the last run': 'source_added',
  'Source exercises removed since the last run': 'source_removed',
  'Live ids with no converted item': 'live_unmatched',
  'Fields with no place in a module file': 'dropped_field',
  Notes: 'note',
  'Text written differently': 'text_changed',
  Outline: 'outline',
};

/**
 * content/fr/migration-report.md as report lines: { kind, module_key, path, detail }. A grouped line
 * ("12 × instruction written as the gloss …: `items[0].instruction`, …") gives one line per path, its detail the
 * group's words. live_unmatched groups by module ("**key**: 33 exercises") give one line with path null.
 */
export function parseReport(markdown) {
  const out = [];
  let kind = null;
  let sub = null;
  let module = null;
  for (const raw of String(markdown).split('\n')) {
    const line = raw.trimEnd();
    let m;
    if ((m = /^## (.+)$/.exec(line))) {
      kind = HEADINGS[m[1]] ?? null;
      if (kind === null) throw new Error(`migration report: unknown section "${m[1]}"`);
      sub = null;
      module = null;
      continue;
    }
    if (kind === null) continue;
    if ((m = /^### (.+)$/.exec(line))) {
      sub = m[1];
      module = null;
      continue;
    }
    if ((m = /^\*\*([^*]+)\*\*$/.exec(line))) {
      module = m[1] === 'course' ? null : m[1];
      continue;
    }
    if (!line.startsWith('- ')) continue;
    const body = line.slice(2);
    if (kind === 'live_unmatched' && (m = /^\*\*([^*]+)\*\*: (\d+) (.+)$/.exec(body))) {
      out.push({ kind, module_key: m[1], path: null, detail: `${m[2]} ${m[3]}`, reason: sub });
      continue;
    }
    if ((m = /^(\d+) × (.+?): ((?:`[^`]+`(?:, )?)+)$/.exec(body))) {
      for (const p of m[3].matchAll(/`([^`]+)`/g)) out.push({ kind, module_key: module, path: p[1], detail: m[2], ...(sub ? { reason: sub } : {}) });
      continue;
    }
    if ((m = /^`([^`]+)` (.*)$/.exec(body))) {
      out.push({ kind, module_key: module, path: m[1], detail: m[2], ...(sub ? { reason: sub } : {}) });
      continue;
    }
    out.push({ kind, module_key: module, path: null, detail: body, ...(sub ? { reason: sub } : {}) });
  }
  return out;
}

/* ---------- text, with French spans read back ---------- */

// Spans {…} are stripped from what the adapter returns, so a span edit is invisible; where Task 6/7 replaced today's
// quotes with a span ("Who is 'je'?" -> "Who is {je}?"), today's quotes around a span's text are dropped before
// comparing. `spans` holds every span text of the module.
const QUOTES = [["'", "'"], ['‘', '’'], ['"', '"'], ['“', '”'], ['«', '»'], ['« ', ' »']];
export function unquoteSpans(text, spans) {
  if (!isStr(text) || !spans?.size) return text;
  let out = text;
  for (const s of spans) {
    if (!s || !out.includes(s)) continue;
    for (const [o, c] of QUOTES) out = out.split(`${o}${s}${c}`).join(s);
  }
  return out;
}
// Leading and trailing spaces are not compared: no screen shows them (the conversion trims every text).
export function sameText(live, converted, spans) {
  if (live === converted) return true;
  if (!isStr(live) || !isStr(converted)) return false;
  return unquoteSpans(live.trim(), spans) === unquoteSpans(converted.trim(), spans);
}

/* ---------- lesson comparison ---------- */

// What the live screens and testRunner.js read of an exercise (the rest, like `vocabulary` or the Unit 9 `type` and
// `answer`, is never read).
export const EXERCISE_FIELDS = ['id', 'displayNumber', 'instruction', 'prompt', 'hint', 'expectedAnswer', 'acceptableAnswers', 'wrongAnswers', 'tense', 'verb', 'article', 'ttsText'];
export const LESSON_FIELDS = [
  'id', 'moduleKey', 'title', 'description', 'concepts', 'vocabularyReference', 'exercises', 'skipStudyMode', 'isReadingComprehension',
  'readingPassage', 'isUnitExam', 'unitNumber', 'isFillInTheBlank', 'sentences', 'isPhonicsReference', 'isHelpModule', 'guide',
];
// Empty values a screen reads the same way: null, undefined and a missing key; an empty list where the reader
// writes `|| []`.
const EMPTY_LISTS = new Set(['acceptableAnswers', 'wrongAnswers']);
const isEmpty = (v, field) => v === undefined || v === null || (EMPTY_LISTS.has(field) && Array.isArray(v) && v.length === 0);

// What the checker accepts besides the expected answer (testRunner.js tries expectedAnswer, then each acceptable
// answer): a set, so the order of acceptableAnswers and a copy of the expected answer in it read the same. The
// expected answer itself is compared on its own.
function acceptedSet(ex) {
  const expected = isStr(ex?.expectedAnswer) ? ex.expectedAnswer.trim() : null;
  return [...new Set((Array.isArray(ex?.acceptableAnswers) ? ex.acceptableAnswers : []).filter(isStr).map((a) => a.trim()))].filter((a) => a !== expected).sort();
}

const normKey = (s) => String(s ?? '').toLowerCase().normalize('NFC').replace(/[’ʼ‘]/g, "'").replace(/\s+/g, ' ').trim();

// Longest common subsequence of two key lists, as [i, j] pairs.
function lcs(a, b) {
  const n = a.length;
  const k = b.length;
  const t = Array.from({ length: n + 1 }, () => new Array(k + 1).fill(0));
  for (let i = n - 1; i >= 0; i--) for (let j = k - 1; j >= 0; j--) t[i][j] = a[i] === b[j] ? t[i + 1][j + 1] + 1 : Math.max(t[i + 1][j], t[i][j + 1]);
  const out = [];
  for (let i = 0, j = 0; i < n && j < k; ) {
    if (a[i] === b[j]) {
      out.push([i, j]);
      i++;
      j++;
    } else if (t[i + 1][j] >= t[i][j + 1]) i++;
    else j++;
  }
  return out;
}
// Pairs of two lists: matched by key in order, and the gaps between matches paired by place.
function align(a, b, keyOf) {
  const pairs = [];
  const common = lcs(a.map(keyOf), b.map(keyOf));
  let i = 0;
  let j = 0;
  for (const [ci, cj] of [...common, [a.length, b.length]]) {
    const n = Math.max(ci - i, cj - j);
    for (let x = 0; x < n; x++) pairs.push([i + x < ci ? i + x : null, j + x < cj ? j + x : null]);
    if (ci < a.length) pairs.push([ci, cj]);
    i = ci + 1;
    j = cj + 1;
  }
  return pairs;
}

// List keys for pairing items of a list whose entries can be added or removed.
const KEYS = {
  exercises: (e) => normKey(e?.expectedAnswer),
  vocabularyReference: (v) => `${normKey(v?.french)}|${normKey(v?.english)}`,
  concepts: (c) => normKey(c?.term),
  sentences: (s) => (s?.blanks || []).map((b) => normKey(b.answer)).join('|'),
};

// A practice sentence as FillInTheBlank.jsx draws it: the text with each blank in place of the character at its
// position. Spaces are evened out (the page collapses them), so a blank on the first or the second of two spaces
// reads the same.
export function shownSentence(s) {
  let out = '';
  let last = 0;
  for (const b of [...(s?.blanks || [])].sort((x, y) => x.position - y.position)) {
    if (b.position > last) out += String(s.text).slice(last, b.position);
    out += ' ___ ';
    last = b.position + 1;
  }
  out += String(s?.text ?? '').slice(last);
  return out.replace(/\s+/g, ' ').trim();
}

function compareValue(live, conv, path, field, ctx, out) {
  if (isEmpty(live, field) && isEmpty(conv, field)) return;
  if (field === 'sentences[]' && isObj(live) && isObj(conv)) {
    compareValue(shownSentence(live), shownSentence(conv), `${path}.shown`, 'shown', ctx, out);
    compareValue(live.instruction, conv.instruction, `${path}.instruction`, 'instruction', ctx, out);
    const lb = live.blanks || [];
    const cb = conv.blanks || [];
    for (let k = 0; k < Math.max(lb.length, cb.length); k++) {
      compareValue(lb[k]?.answer, cb[k]?.answer, `${path}.blanks[${k}].answer`, 'answer', ctx, out);
      compareValue(lb[k]?.hint, cb[k]?.hint, `${path}.blanks[${k}].hint`, 'hint', ctx, out);
    }
    return;
  }
  const leaf = isStr(live) || isStr(conv) || typeof live !== 'object' || typeof conv !== 'object' || live === null || conv === null;
  if (leaf && ctx.stats) ctx.stats.fields += 1;
  if (isStr(live) || isStr(conv) || typeof live !== 'object' || typeof conv !== 'object' || live === null || conv === null) {
    if (isStr(live) && isStr(conv) ? sameText(live, conv, ctx.spans) : live === conv) return;
    out.push({ path, live, converted: conv });
    return;
  }
  if (Array.isArray(live) && Array.isArray(conv)) {
    const keyOf = KEYS[field];
    const pairs = keyOf ? align(live, conv, keyOf) : Array.from({ length: Math.max(live.length, conv.length) }, (_, i) => [i < live.length ? i : null, i < conv.length ? i : null]);
    for (const [i, j] of pairs) {
      const p = i !== null ? `${path}[${i}]` : `${path}[+${j}]`;
      if (i === null) out.push({ path: p, live: undefined, converted: conv[j] });
      else if (j === null) out.push({ path: p, live: live[i], converted: undefined });
      else compareValue(live[i], conv[j], p, `${field}[]`, ctx, out);
    }
    return;
  }
  if (Array.isArray(live) !== Array.isArray(conv)) {
    out.push({ path, live, converted: conv });
    return;
  }
  const fields = field === 'exercises[]' ? EXERCISE_FIELDS : [...new Set([...Object.keys(live), ...Object.keys(conv)])];
  const from = out.length;
  for (const f of fields) {
    if (field === 'exercises[]' && f === 'acceptableAnswers') {
      const a = acceptedSet(live);
      const b = acceptedSet(conv);
      if (ctx.stats) ctx.stats.fields += 1;
      for (const x of a.filter((v) => !b.includes(v))) out.push({ path: `${path}.accepts`, live: x, converted: undefined });
      for (const x of b.filter((v) => !a.includes(v))) out.push({ path: `${path}.accepts`, live: undefined, converted: x });
      continue;
    }
    compareValue(live[f], conv[f], `${path}.${f}`, f, ctx, out);
  }
  // An exercise's differences carry both sides' prompt and hint, so a class can relate a moved text to its new place.
  if (field === 'exercises[]')
    for (const d of out.slice(from)) d.exercise = { live: { prompt: live.prompt, hint: live.hint }, converted: { prompt: conv.prompt, hint: conv.hint } };
}

// A passage is compared as the migration report lists story changes (reading.mjs changedSentences): sentence by
// sentence, speaker labels and pictures aside. Speakers are compared on their own, paragraph by paragraph: the name,
// and today's colour mark (**Paul[9]:**, ReadingPassage.jsx). Pictures are compared in order by their file
// (![src|size|caption]). A translation sentence carries the French of its paragraph, so a caption or a changed line
// can be tied to its story line.
const PICTURE = /^!\[([^\]|]*)[^\]]*\]$/;
const picturesOf = (text) =>
  String(text ?? '')
    .split(/\n+/)
    .map((p) => PICTURE.exec(p.trim())?.[1])
    .filter(Boolean);
const SPEAKER = /^\*\*([^*]+?):\*\*\s*/;
function paragraphs(text) {
  return String(text ?? '')
    .split('\n\n')
    .map((p, i) => {
      const t = p.trim();
      const m = SPEAKER.exec(t);
      const label = m ? m[1].trim() : null;
      return { i, label, name: label ? label.replace(/\[\d+\]$/, '') : null, colour: label ? (/\[(\d+)\]$/.exec(label)?.[1] ?? null) : null, body: m ? t.slice(m[0].length) : t };
    })
    .filter((p) => p.body || p.label);
}
function comparePassage(live, conv, out, ctx) {
  if (isEmpty(live) && isEmpty(conv)) return;
  if (!isObj(live) || !isObj(conv)) {
    out.push({ path: 'readingPassage', live, converted: conv });
    return;
  }
  const frOf = (rp) => {
    const ps = String(rp.text ?? '').split('\n\n');
    return (i) => sentences((ps[i] ?? '').replace(SPEAKER, ''));
  };
  const liveFr = frOf(live);
  const convFr = frOf(conv);
  for (const f of [...new Set([...Object.keys(live), ...Object.keys(conv)])]) {
    if (f !== 'text' && f !== 'translation') {
      compareValue(live[f], conv[f], `readingPassage.${f}`, f, ctx, out);
      continue;
    }
    const lp = paragraphs(live[f]);
    const cp = paragraphs(conv[f]);
    const a = lp.flatMap((p) => sentences(p.body).map((s) => ({ s, p })));
    const b = cp.flatMap((p) => sentences(p.body).map((s) => ({ s, p })));
    for (const [i, j] of align(a, b, (x) => x.s)) {
      if (ctx.stats) ctx.stats.fields += 1;
      if (i !== null && j !== null && a[i].s === b[j].s) continue;
      const d = { path: `readingPassage.${f}#sentence`, live: i === null ? null : a[i].s, converted: j === null ? null : b[j].s };
      if (f === 'translation') d.fr = [...(i === null ? [] : liveFr(a[i].p.i)), ...(j === null ? [] : convFr(b[j].p.i))];
      out.push(d);
    }
    if (f === 'text') {
      const lpic = picturesOf(live.text);
      const cpic = picturesOf(conv.text);
      for (const [i, j] of align(lpic, cpic, (x) => x)) {
        if (ctx.stats) ctx.stats.fields += 1;
        if (i !== null && j !== null && lpic[i] === cpic[j]) continue;
        out.push({ path: 'readingPassage.text#picture', live: i === null ? null : lpic[i], converted: j === null ? null : cpic[j] });
      }
    }
    const ls = lp.filter((p) => p.label);
    const cs = cp.filter((p) => p.label);
    for (const [i, j] of align(ls, cs, (p) => sentences(p.body)[0] ?? '')) {
      if (ctx.stats) ctx.stats.fields += 1;
      const x = i === null ? null : ls[i];
      const y = j === null ? null : cs[j];
      if (x && y && x.name === y.name && x.colour === y.colour) continue;
      if (x && y && x.name === y.name) out.push({ path: `readingPassage.${f}#speaker_colour`, live: x.label, converted: y.label });
      else out.push({ path: `readingPassage.${f}#speaker`, live: x?.name ?? null, converted: y?.name ?? null, line: (x ?? y).body });
    }
  }
}

/**
 * Every difference between a live lesson (golden-lessons.json) and the adapter's lesson, on the fields the screens
 * and testRunner.js read: [{ path, live, converted }]. ctx = { spans: Set<string> (the module's span texts),
 * stats?: { fields } (counts every value compared) }.
 */
export function compareLesson(live, conv, ctx = {}) {
  const out = [];
  for (const f of LESSON_FIELDS) {
    if (f === 'readingPassage') comparePassage(live[f], conv[f], out, ctx);
    else compareValue(live[f], conv[f], f, f, ctx, out);
  }
  // A vocabulary difference names its card, so a class can tie it to a report line about that card.
  for (const d of out) {
    const m = /^vocabularyReference\[(\d+)\]/.exec(d.path);
    if (m) d.card = live.vocabularyReference?.[+m[1]]?.french;
  }
  return out;
}

/* ---------- allowed classes ---------- */

const show = (v) => (v === undefined ? 'undefined' : JSON.stringify(v));
const flat = (v) => (isStr(v) ? v : v === undefined || v === null ? '' : JSON.stringify(v));
// Report paths and lesson paths name the same item by its index: items[3], exerciseConfig.items[3], exercises[3],
// sentences[3] and concepts[3] all give 3.
const firstIndex = (p) => {
  const m = /\[(\d+)\]/.exec(String(p ?? ''));
  return m ? +m[1] : null;
};

// How a difference's values must relate to its report line, by name (golden-allowed.json `relation`).
export const RELATIONS = {
  // The report line quotes today's value.
  live_in_detail: (d, l) => flat(d.live) !== '' && l.detail.includes(flat(d.live)),
  // The report line quotes the new value.
  converted_in_detail: (d, l) => flat(d.converted) !== '' && l.detail.includes(flat(d.converted)),
  // The report line quotes both (a hand edit: "from" → "to").
  both_in_detail: (d, l) => RELATIONS.live_in_detail(d, l) && RELATIONS.converted_in_detail(d, l),
  // Story text: the line is the sentence change itself.
  story_sentence: (d, l) =>
    l.detail === (d.live === null ? `story text: added: "${d.converted}"` : d.converted === null ? `story text: removed: "${d.live}"` : `story text: "${d.live}" → "${d.converted}"`),
  // The report line names the module (an outline line about the shelf).
  module_in_detail: (d, l) => l.detail.includes(d.module_key),
  // A position in the lists: the report line's item index is the difference's.
  same_index: (d, l) => firstIndex(l.path) !== null && firstIndex(l.path) === firstIndex(d.path),
  // The live value with a prefix the report names: "Complete: <text>" -> "<text>".
  prefix_dropped: (d, l) => {
    const m = /^"([^"]*)" prefix dropped/.exec(l.detail);
    return !!m && RELATIONS.same_index(d, l) && isStr(d.live) && isStr(d.converted) && d.live.startsWith(m[1]) && d.live.slice(m[1].length).trim() === d.converted.trim();
  },
  // A fill-blank prompt whose gloss and after-sentence words were edited by hand: the gloss line quotes the old and
  // new gloss, and a hint line in the same module says which words were "(removed)".
  fillblank_hand_edit: (d, l, lines) => {
    const g = /^"(.*)" → "(.*)"$/.exec(l.detail);
    const i = firstIndex(d.path);
    if (!g || !RELATIONS.same_index(d, l) || !isStr(d.live) || !isStr(d.converted)) return false;
    const removed = lines.find((x) => x.kind === 'hand_edit' && x.path === `items[${i}].hint` && / → "\(removed\)"$/.test(x.detail));
    const words = removed ? /^""(.*)"" → /.exec(removed.detail)?.[1] : null;
    const before = d.converted.replace(`(${g[2]})`, `(${g[1]})`);
    return d.live.replace(/^Complete[^:]*:\s*/, '') === (words ? `${before} - ${words}` : before);
  },
  // A generic instruction the conversion dropped (items.mjs isGenericInstruction): the report groups them by shape,
  // `generic instruction dropped (Say "…")`, with … for the quoted prompt; the line's item is the difference's.
  generic_instruction: (d, l) => {
    if (!isStr(d.live) || d.converted !== undefined || !RELATIONS.same_index(d, l)) return false;
    const m = /^generic instruction dropped \((.*)\)$/.exec(l.detail) ?? /generic instruction "(.*)"$/.exec(l.detail);
    if (!m) return false;
    const re = new RegExp(`^${m[1].split('…').map(escapeRe).join('.+')}$`, 's');
    return re.test(d.live.trim());
  },
  // A concept card a practice set, unit exam or reading no longer holds: the line names its term, at its index.
  concept_term: (d, l) => isObj(d.live) && RELATIONS.same_index(d, l) && l.detail.startsWith(`concept "${d.live.term}"`),
  // A title the report quotes without today's "Module N: " or "Reference N: " prefix.
  title_in_detail: (d, l) => isStr(d.live) && l.detail.includes(`"${d.live.replace(/^(?:Module \d+|Reference [IVXL]+): /, '')}"`),
  // The report line quotes today's value, at the difference's item index.
  live_in_detail_same_index: (d, l) => RELATIONS.same_index(d, l) && RELATIONS.live_in_detail(d, l),
  // A hand edit that removed an accept or a mistake: the line quotes today's answer and says "(removed)".
  removed_by_hand: (d, l) =>
    RELATIONS.same_index(d, l) && d.converted === undefined && / → "\(removed\)"$/.test(l.detail) && l.detail.includes(`"${isObj(d.live) ? d.live.answer : d.live}"`),
  // A vocabulary card's note now holds a card listed twice today: the line names the card.
  twin_card: (d, l) => isStr(d.card) && l.detail.startsWith(`"${d.card}" (`) && /is listed twice/.test(l.detail),
  // The live text with the converted text inside it, at the same index ("Complete: 'I am a man'" -> "I am a man").
  live_contains_converted: (d, l) => RELATIONS.same_index(d, l) && isStr(d.live) && isStr(d.converted) && d.live.includes(d.converted),
  // A speaker label that now names the French speaker: the line quotes both names.
  speaker_names: (d, l) => isStr(d.live) && isStr(d.converted) && l.detail === `"${d.converted}" names the speaker; the English line said "${d.live}"`,
  // A translation sentence whose paragraph's French has a story line (a caption added, a line changed).
  story_translation: (d, l) => {
    const m = /^story text: (?:added: "(.*)"|removed: "(.*)"|"(.*)" → "(.*)")$/.exec(l.detail);
    if (!m) return false;
    const said = [m[1], m[2], m[3], m[4]].filter(Boolean);
    return (d.fr || []).some((s) => said.includes(s));
  },
  // Ledger ruling 2026-11-25 Task 8 (1): a Unit 9 fill-blank prompt's words after the sentence are now the hint.
  // The prompt: today's is "Complete…: <the new prompt> - <the new hint>". The hint: it was the end of today's prompt.
  suffix_now_hint_prompt: (d) => {
    const h = d.exercise?.converted?.hint;
    return isStr(d.live) && isStr(d.converted) && isStr(h) && d.live.replace(/^Complete[^:]*:\s*/, '') === `${d.converted} - ${h}`;
  },
  suffix_now_hint_hint: (d) => d.live === undefined && isStr(d.converted) && isStr(d.exercise?.live?.prompt) && d.exercise.live.prompt.endsWith(` - ${d.converted}`),
  // Ledger ruling 2026-11-25 Task 8 (3): a Unit 9 multi-blank answer is the blanks' words joined with one space; where
  // today's answer also typed the words between the blanks ("ai pas aimé" for "n'___ pas ___"), removing exactly the
  // sentence's own in-between text from today's answer gives the new one, so no word of the answer is lost.
  blanks_without_between: (d) => {
    const text = d.exercise?.converted?.prompt;
    if (!isStr(d.live) || !isStr(d.converted) || !isStr(text)) return false;
    const between = text.replace(/\s\([^)]*\)$/, '').split('___').slice(1, -1).map((t) => t.trim()).filter(Boolean);
    if (!between.length) return false;
    let s = ` ${d.live.trim()} `;
    for (const m of between) {
      if (!s.includes(` ${m} `)) return false;
      s = s.replace(` ${m} `, ' ');
    }
    return s.trim() === d.converted.trim();
  },
  // Ledger ruling 2026-11-25 Task 8 (2): a reading's pictures are L's story art (img/reading<N>/…) in place of today's.
  story_art: (d) => (d.converted === null || /^img\/reading\d+\//.test(d.converted)) && (d.live === null || isStr(d.live)),
  // Ledger ruling 2026-11-25 Task 8 (5): the note line names today's mark and the speaker kept.
  speaker_colour_note: (d, l) => isStr(d.live) && isStr(d.converted) && l.detail.startsWith(`speaker_colour_dropped: "${d.live}" is the speaker "${d.converted}"`),
  any: () => true,
};
/**
 * Checks against content/fr/legacy/live-ids.json (Task 6, spec 8.3), for classes with `basis.data`.
 * - concept_id_from_live_ids: a concept card now carries its id, and it is the id live-ids.json gives today's card
 *   index (the Task 8 interface adds `id` to each concept); a module main lacks has no entry and keeps its own ids.
 * - item_id_not_on_main: an exercise id is `<module_key>.<item_id>` because main has no exercise for the item
 *   (spec 8.3: items added on course-guides get new ids and no live id), or it is main's live id for the item where
 *   this branch's lessonData numbers it differently.
 */
export function liveIdChecks(liveIds) {
  const of = (key) => liveIds[key] ?? { items: {}, concepts: {} };
  return {
    concept_id_from_live_ids: (d) => {
      const m = /^concepts\[(\d+)\]\.id$/.exec(d.path);
      if (!m || d.live !== undefined || !isStr(d.converted)) return false;
      // A module or card main does not have (the numbers lesson and the adjectives card, added on course-guides) has
      // no live ticks to keep.
      const mapped = of(d.module_key).concepts;
      if (liveIds[d.module_key] === undefined) return true;
      if (mapped[m[1]] === undefined) return !Object.values(mapped).includes(d.converted);
      return mapped[m[1]] === d.converted;
    },
    item_id_not_on_main: (d) => {
      if (!/^exercises\[\d+\]\.id$/.test(d.path) || !isStr(d.converted)) return false;
      const items = of(d.module_key).items;
      const prefix = `${d.module_key}.`;
      if (!d.converted.startsWith(prefix)) return false;
      const rest = d.converted.slice(prefix.length);
      if (/^\d+$/.test(rest)) return d.converted in items && d.live !== d.converted;
      return !Object.values(items).includes(rest);
    },
  };
}

function escapeRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Sorts differences into the allowed classes. A class: { class, reason, basis: { report?: kind, detail?: regex,
 * path?: regex, relation?: name } | { ruling: text, modules: [...] }, paths: [regex], kinds?: [module kind], count }.
 * A difference belongs to the first class whose path pattern matches its path and whose basis holds: a report line of
 * that kind in the same module (detail and path matching, values related as named; `course: true` for the course-wide
 * outline lines), a ruling's module, or `data`: a named check against Task 6's data (extra, such as live-ids.json).
 * Returns { byClass: Map<class, diffs[]>, unexplained: diffs[] }.
 * diffs: [{ module_key, kind, path, live, converted, ... }]; report: parseReport lines; extra: { [relation]: fn }.
 */
export function classify(diffs, classes, report, extra = {}) {
  const relations = { ...RELATIONS, ...extra };
  const byModule = new Map();
  for (const l of report) byModule.set(l.module_key, [...(byModule.get(l.module_key) || []), l]);
  const compiled = classes.map((c) => ({
    ...c,
    pathRes: c.paths.map((p) => new RegExp(p)),
    detailRe: c.basis.detail ? new RegExp(c.basis.detail) : null,
    linePathRe: c.basis.path ? new RegExp(c.basis.path) : null,
  }));
  for (const c of compiled)
    for (const r of [c.basis.relation, c.basis.data].filter(Boolean)) if (!relations[r]) throw new Error(`golden-allowed.json ${c.class}: unknown relation ${r}`);
  const byClass = new Map(compiled.map((c) => [c.class, []]));
  const unexplained = [];
  for (const d of diffs) {
    const hit = compiled.find((c) => {
      if (!c.pathRes.some((re) => re.test(d.path))) return false;
      if (c.kinds && !c.kinds.includes(d.kind)) return false;
      // A ruling holds in the modules it names, for the values it names (a single exception), and where its
      // relation holds (checked on the difference alone: a ruling has no report line).
      if (c.basis.ruling) {
        if (c.basis.modules && !c.basis.modules.includes(d.module_key)) return false;
        if (c.basis.values && !(c.basis.values.live === d.live && c.basis.values.converted === d.converted)) return false;
        return !c.basis.relation || relations[c.basis.relation](d, null, []);
      }
      if (c.basis.data) return relations[c.basis.data](d);
      const rel = relations[c.basis.relation ?? 'any'];
      const lines = byModule.get(c.basis.course ? null : d.module_key) || [];
      return lines.some((l) => l.kind === c.basis.report && (!c.detailRe || c.detailRe.test(l.detail)) && (!c.linePathRe || c.linePathRe.test(l.path ?? '')) && rel(d, l, lines));
    });
    if (hit) byClass.get(hit.class).push(d);
    else unexplained.push(d);
  }
  return { byClass, unexplained };
}

export const describe = (d) => `${d.module_key} ${d.path}: live ${show(d.live)} | converted ${show(d.converted)}`;
