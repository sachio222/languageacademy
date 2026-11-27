// The golden test's machinery (spec 8.2, "Proof the live screens see the same lessons"): read the migration report
// back into lines, compare a live lesson with the adapter's lesson field by field, and sort each difference into an
// allowed class from scripts/content/test/fixtures/golden-allowed.json. Pure: no fs, no app imports.
import { sentences, pairGap } from '../migrate/reading.mjs';
import { normText } from '../migrate/items.mjs';

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
  'Course map split': 'course_map',
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
// Pairs of two lists: matched by key in order, and the gaps between matches paired by place. textOf, for sentences:
// a gap with more on one side pairs as the migration report pairs story sentences (reading.mjs pairGap), by the
// words they share, so a caption added before a reworded line stands alone.
function align(a, b, keyOf, textOf = null) {
  const pairs = [];
  const common = lcs(a.map(keyOf), b.map(keyOf));
  let i = 0;
  let j = 0;
  for (const [ci, cj] of [...common, [a.length, b.length]]) {
    const n = Math.max(ci - i, cj - j);
    if (textOf) for (const [x, y] of pairGap(a.slice(i, ci).map(textOf), b.slice(j, cj).map(textOf))) pairs.push([x === null ? null : i + x, y === null ? null : j + y]);
    else for (let x = 0; x < n; x++) pairs.push([i + x < ci ? i + x : null, j + x < cj ? j + x : null]);
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
  // An exercise's differences carry both sides' exercise, so a class can relate a moved text to its new place.
  if (field === 'exercises[]') for (const d of out.slice(from)) d.exercise = { live, converted: conv };
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
      const from = out.length;
      compareValue(live[f], conv[f], `readingPassage.${f}`, f, ctx, out);
      for (const d of out.slice(from)) d.passage = live; // today's subtitle, for its translation
      continue;
    }
    const lp = paragraphs(live[f]);
    const cp = paragraphs(conv[f]);
    const a = lp.flatMap((p) => sentences(p.body).map((s) => ({ s, p })));
    const b = cp.flatMap((p) => sentences(p.body).map((s) => ({ s, p })));
    for (const [i, j] of align(a, b, (x) => x.s, (x) => x.s)) {
      if (ctx.stats) ctx.stats.fields += 1;
      if (i !== null && j !== null && a[i].s === b[j].s) continue;
      const d = { path: `readingPassage.${f}#sentence`, live: i === null ? null : a[i].s, converted: j === null ? null : b[j].s };
      if (f === 'translation') Object.assign(d, { fr: [...(i === null ? [] : liveFr(a[i].p.i)), ...(j === null ? [] : convFr(b[j].p.i))], frConv: j === null ? [] : convFr(b[j].p.i), enConv: j === null ? [] : sentences(b[j].p.body) });
      out.push(d);
    }
    if (f === 'text') {
      const lpic = picturesOf(live.text);
      const cpic = picturesOf(conv.text);
      for (const [i, j] of align(lpic, cpic, (x) => x)) {
        if (ctx.stats) ctx.stats.fields += 1;
        if (i !== null && j !== null && lpic[i] === cpic[j]) continue;
        out.push({ path: 'readingPassage.text#picture', live: i === null ? null : lpic[i], converted: j === null ? null : cpic[j], pictures: cpic });
      }
    }
    // Scene headings (## …), as the passage draws them apart from the text.
    // A translation heading carries its paragraph's French, as a translation sentence does.
    const heads = (ps) => ps.filter((p) => /^##\s/.test(p.body)).map((p) => ({ s: sentences(p.body.replace(/^##\s*/, '')).join(' '), i: p.i }));
    const lh = heads(lp);
    const ch = heads(cp);
    for (const [i, j] of align(lh, ch, (x) => x.s)) {
      if (ctx.stats) ctx.stats.fields += 1;
      if (i !== null && j !== null && lh[i].s === ch[j].s) continue;
      const d = { path: `readingPassage.${f}#scene`, live: i === null ? null : lh[i].s, converted: j === null ? null : ch[j].s };
      if (f === 'translation') Object.assign(d, { fr: [...(i === null ? [] : liveFr(lh[i].i)), ...(j === null ? [] : convFr(ch[j].i))], frConv: j === null ? [] : convFr(ch[j].i), enConv: j === null ? [] : sentences((cp.find((p) => p.i === ch[j].i)?.body ?? '').replace(/^##\s*/, '')) });
      out.push(d);
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
  // A vocabulary difference names its card and carries both tables; a practice or guide difference carries both
  // sides' sentence or section; so a class can check a moved text against where it went.
  for (const d of out) {
    let m = /^vocabularyReference\[(\d+)\]/.exec(d.path);
    if (m) Object.assign(d, { card: live.vocabularyReference?.[+m[1]]?.french, cards: { live: live.vocabularyReference || [], converted: conv.vocabularyReference || [] } });
    m = /^sentences\[(\d+)\]/.exec(d.path);
    if (m) d.sentence = { live: live.sentences?.[+m[1]], converted: conv.sentences?.[+m[1]] };
    m = /^guide\.sections\[(\d+)\]/.exec(d.path);
    if (m) d.section = { live: live.guide?.sections?.[+m[1]], converted: conv.guide?.sections?.[+m[1]] };
    m = /^concepts\[(\d+)\]/.exec(d.path);
    if (m) d.concept = conv.concepts?.[+m[1]];
    d.spans = ctx.spans;
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
  // A practice instruction written as the gloss: today's, with "Complete…:" and the quotes around the whole of it
  // dropped, is the new gloss (items.mjs convertSentence), at the same index.
  gloss_exact: (d, l) => {
    if (!RELATIONS.same_index(d, l) || !isStr(d.live) || !isStr(d.converted)) return false;
    let g = d.live.trim().replace(/^Complete[^:]*:\s*/, '');
    const whole = /^(["'‘“])(.*)(["'’”])$/.exec(g);
    if (whole && !/['‘"“]/.test(whole[2].replace(/(?<=\p{L})['’](?=\p{L})/gu, ''))) g = whole[2];
    return sameText(g, d.converted, d.spans);
  },
  // A misplaced practice blank: the new sentence is the one the line says the checker reads, and the words a learner
  // sees are today's words (blanks and marks aside); a blank that cut a word drops one letter of it today.
  blank_misplaced_exact: (d, l, lines = []) => {
    if (!RELATIONS.same_index(d, l) || !isStr(d.live) || !isStr(d.converted)) return false;
    const m = /placed as the checker reads it: "(.*)"(?: \(fixed by hand\))?$/.exec(l.detail);
    const even = (s) => s.replace(/\s*___\s*/g, ' ___ ').replace(/\s+/g, ' ').trim();
    // The checker's placing, or a hand edit of it the report records ("<placed>" → "<edited>").
    const i = firstIndex(d.path);
    const edited = lines
      .filter((x) => x.kind === 'hand_edit' && x.path === `items[${i}].text`)
      .map((x) => /^"(.*)" → "(.*)"$/.exec(x.detail))
      .filter((x) => x && m && even(x[1]) === even(m[1]))
      .map((x) => x[2]);
    if (!m || ![m[1], ...edited].some((t) => even(t) === even(d.converted))) return false;
    // Letters only: today's sentence is the new one less exactly one letter for each blank the report says cut a
    // word (the screen drew the blank in that letter's place), in order.
    const letters = (s) => [...s.replace(/___/g, '').normalize('NFC')].filter((ch) => /[\p{L}\p{N}']/u.test(ch));
    const a = letters(d.live);
    const b = letters(d.converted);
    const cuts = lines.filter((x) => x.kind === 'blank_misplaced' && firstIndex(x.path) === firstIndex(d.path) && /sits inside the word/.test(x.detail)).length;
    if (b.length - a.length !== cuts) return false;
    let k = 0;
    for (const ch of b) if (k < a.length && a[k] === ch) k += 1;
    return k === a.length;
  },
  // Blank hints joined: the new first hint is today's blank hints joined with " / ", and the other blanks have none.
  hints_joined_exact: (d, l) => {
    const s = d.sentence;
    if (!RELATIONS.same_index(d, l) || !s?.live || !s?.converted) return false;
    const joined = (s.live.blanks || []).map((b) => b.hint).filter(isStr).map((h) => h.trim()).join(' / ');
    return s.converted.blanks?.[0]?.hint === joined && s.converted.blanks.slice(1).every((b) => b.hint === undefined);
  },
  // A card's usage and agreement notes joined into its note: the new note is today's note, usage and agreement, in
  // that order, joined with "; ".
  usage_into_note_exact: (d, l) => {
    const i = firstIndex(d.path);
    const live = d.cards?.live?.[i];
    if (!RELATIONS.same_index(d, l) || !live) return false;
    const conv = d.cards.converted.find((c) => c.french === live.french && c.english === live.english);
    return !!conv && conv.note === [live.note, live.usage, live.agreement].filter(isStr).map((s) => s.trim()).join('; ');
  },
  // A card listed twice: one card is left, and its note is exactly every copy's note (with its usage and agreement)
  // joined with "; ", as merge.mjs mergeVocabulary joins them, or the hand edit of exactly that joined note the
  // report records ("feminine; from Unit 4 everyday-nouns" → "feminine", a position word fixed by hand).
  twin_card_exact: (d, l, lines = []) => {
    const i = firstIndex(d.path);
    const live = d.cards?.live?.[i];
    if (!RELATIONS.twin_card(d, l) || !live) return false;
    const copies = d.cards.live.filter((c) => c.french === live.french && c.english === live.english);
    const left = d.cards.converted.filter((c) => c.french === live.french && c.english === live.english);
    if (copies.length < 2 || left.length !== 1) return false;
    const parts = [];
    for (const c of copies) {
      const n = [c.note, c.usage, c.agreement].filter(isStr).map((s) => s.trim()).join('; ');
      if (n && !parts.includes(n)) parts.push(n);
    }
    const joined = parts.join('; ');
    const note = left[0].note ?? '';
    return note === joined || lines.some((x) => x.kind === 'hand_edit' && /\.note$/.test(x.path ?? '') && x.detail === `"${joined}" → "${note}"`);
  },
  // Dropped, with the line quoting today's value: nothing took its place.
  dropped_quoted: (d, l) => d.converted === undefined && RELATIONS.live_in_detail(d, l),
  // The negation guide's row notes, joined into the part's note: each of today's row notes (quotes around spans
  // dropped) is in the part's note, and the part's note is exactly them, joined with a space.
  row_notes_in_part_note: (d, l) => {
    const s = d.section;
    if (!RELATIONS.same_index(d, l) || !s?.live || !isStr(s.converted?.note)) return false;
    const notes = (s.live.rows || []).map((r) => r.note).filter(isStr).map((n) => unquoteSpans(n.trim(), d.spans));
    return notes.length > 0 && unquoteSpans(s.converted.note, d.spans) === notes.join(' ');
  },
  // A subtitle that is now a passage block: every one of its sentences has its own "story text: added" line (the
  // French subtitle), or its paragraph's French does (the English one).
  subtitle_sentences_reported: (d, l, lines = []) => {
    if (!isStr(d.live) || d.converted !== undefined) return false;
    const added = new Set(lines.filter((x) => x.kind === 'text_changed' && x.path === 'passage').map((x) => /^story text: added: "(.*)"$/.exec(x.detail)?.[1]).filter(Boolean));
    const fr = sentences(/Translation$/.test(d.path) ? d.passage?.subtitle : d.live);
    return fr.length > 0 && fr.every((s) => added.has(s));
  },
  // A field the report quotes as dropped ("<value>" (speech override; no field)), at its index, gone now.
  quoted_dropped: (d, l) => d.converted === undefined && RELATIONS.same_index(d, l) && isStr(d.live) && l.detail.startsWith(`"${d.live}" (`),
  // A reading question's prompt dropped: the line quotes it, at its index, and nothing took its place.
  comprehension_dropped: (d, l) => d.converted === undefined && RELATIONS.live_in_detail_same_index(d, l),
  // A meaning item's prompt: the line quotes today's prompt and the French now shown, exactly.
  meaning_prompt_exact: (d, l) => {
    const m = /prompt "(.*)": the instruction says it, and the French "(.*)" is shown$/.exec(l.detail);
    return !!m && RELATIONS.same_index(d, l) && d.live === m[1] && d.converted === m[2];
  },
  // A guide's title is L's: the line quotes today's title and L's, exactly.
  guide_title_quoted: (d, l) => {
    const m = /^"(.*)" is L's title "(.*)"$/.exec(l.detail);
    const strip = (s) => (isStr(s) ? s.replace(/^(?:Module \d+|Reference [IVXL]+): /, '') : s);
    return !!m && strip(d.live) === m[1] && strip(d.converted) === m[2];
  },
  any: () => true,
};
/**
 * Checks that pin an allowed difference to the source data it came from, for classes with `basis.data` or as a
 * class's relation. data = { liveIds (live-ids.json), course (loadCourse), lSources (l-sources.json), handFixes
 * (hand-fixes.json), rewrites (holds.mjs REWRITES), plain (span braces removed), adapt (module -> toLegacyLesson) }.
 * - concept_id_from_live_ids: a concept card's id is the one live-ids.json gives today's card index (the Task 8
 *   interface adds `id`); a card or module main lacks keeps the module's own id for that card.
 * - item_id_not_on_main: an exercise id names its own item: `<module_key>.<item_id>` for an item main has no exercise
 *   for (spec 8.3), or main's live id for that very item where this branch numbers it differently.
 * - story_art: the reading's pictures, in order, are the L story's art (ledger ruling 2026-11-25 Task 8 (2)).
 * - story_translation_l: a story line's English is L's English for that story.
 * - position_word_hand_fixed: the new text is what hand-fixes.json holds for the module.
 * - unit_exam_title_outline: "Unit exam · <the outline's unit name>".
 * - savoir_pinned: the choice item as Jake ruled it (holds.mjs REWRITES), field by field.
 */
export function goldenChecks({ liveIds = {}, course = null, lSources = null, handFixes = {}, rewrites = [], plain = (t) => t, adapt = null } = {}) {
  const of = (key) => liveIds[key] ?? { items: {}, concepts: {} };
  const mod = (key) => course?.modules.get(key) ?? null;
  const storyOf = (key) => lSources?.stories?.find((s) => `reading${s.n}` === mod(key)?.story_id) ?? null;
  const noPrefix = (s) => (isStr(s) ? s.replace(/^(?:Module \d+|Reference [IVXL]+): /, '') : s);
  return {
    concept_id_from_live_ids: (d) => {
      const m = /^concepts\[(\d+)\]\.id$/.exec(d.path);
      if (!m || d.live !== undefined || !isStr(d.converted)) return false;
      const mapped = of(d.module_key).concepts;
      // A module or card main does not have (the numbers lesson, the adjectives card) keeps its own concept id: the
      // id the converted module holds at that very index.
      if (liveIds[d.module_key] === undefined || mapped[m[1]] === undefined)
        return !Object.values(mapped).includes(d.converted) && mod(d.module_key)?.concepts?.[+m[1]]?.id === d.converted;
      return mapped[m[1]] === d.converted;
    },
    item_id_not_on_main: (d) => {
      if (!/^exercises\[\d+\]\.id$/.test(d.path) || !isStr(d.converted) || !d.exercise?.converted) return false;
      const item = mod(d.module_key)?.items?.[d.exercise.converted.displayNumber - 1];
      const prefix = `${d.module_key}.`;
      if (!item || !d.converted.startsWith(prefix)) return false;
      const items = of(d.module_key).items;
      const rest = d.converted.slice(prefix.length);
      if (/^\d+$/.test(rest)) return items[d.converted] === item.id && d.live !== d.converted;
      return rest === item.id && !Object.values(items).includes(rest);
    },
    story_art: (d) => {
      const story = storyOf(d.module_key);
      if (!story || !Array.isArray(d.pictures)) return false;
      const art = story.blocks.filter((b) => b.img).map((b) => b.img);
      return art.length === d.pictures.length && art.every((a, i) => a === d.pictures[i]) && (d.converted === null || art.includes(d.converted));
    },
    // The English of its own block, exactly and in order: the converted paragraph's English sentences are the
    // sentences of the L block whose French is this paragraph's French.
    story_translation_l: (d, l) => {
      if (!RELATIONS.story_translation(d, l)) return false;
      if (d.converted === null) return true;
      const story = storyOf(d.module_key);
      const fr = (d.frConv || []).join(' ');
      const block = story?.blocks.find((b) => {
        const t = b.fr ?? b.scene ?? b.end;
        return isStr(t) && sentences(t).join(' ') === fr;
      });
      if (!fr || !block || !isStr(block.en)) return false;
      const want = sentences(block.en);
      const have = d.enConv || [];
      return want.length === have.length && want.every((s, k) => s === have[k]) && have.includes(d.converted);
    },
    // The hand-fixed value at the difference's own place: the field, the concept card (by id), the word card (by
    // word_id) or the item (by id, drawn through the adapter as the live screen reads it).
    position_word_hand_fixed: (d, l) => {
      if (!RELATIONS.title_in_detail(d, l)) return false;
      const fixes = handFixes[d.module_key];
      const m = mod(d.module_key);
      if (!fixes || !m) return false;
      const conv = d.converted === undefined ? undefined : String(noPrefix(d.converted)).trim();
      const same = (v) => (v === undefined ? conv === undefined : isStr(v) && plain(v).trim() === conv);
      let p;
      if (d.path === 'title' || d.path === 'description') return d.path in fixes && same(fixes[d.path]);
      if ((p = /^concepts\[\d+\]\.(term|definition|example)$/.exec(d.path))) {
        const c = (fixes.concepts || []).find((x) => x.id === d.concept?.id);
        return !!c && same(c[p[1]]);
      }
      if ((p = /^vocabularyReference\[(\d+)\]\.note$/.exec(d.path))) {
        const card = d.cards?.live?.[+p[1]];
        const w = (m.vocabulary || []).find((x) => x.fr === card?.french && x.gloss === card?.english);
        const fix = w && fixes[`vocabulary/${w.word_id}`];
        return !!fix && same(fix.note);
      }
      if ((p = /^exercises\[\d+\]\.(instruction|prompt|hint|wrongAnswers\[(\d+)\]\.feedback)$/.exec(d.path))) {
        const n = d.exercise?.converted?.displayNumber;
        const item = m.items?.[n - 1];
        const fix = item && fixes[`items/${item.id}`];
        if (!fix || !adapt) return false;
        const ex = adapt({ ...m, items: m.items.map((it, k) => (k === n - 1 ? { ...fix, steps: it.steps } : it)) }).exercises[n - 1];
        const v = p[2] === undefined ? ex[p[1]] : ex.wrongAnswers?.[+p[2]]?.feedback;
        return same(v);
      }
      return false;
    },
    unit_exam_title_outline: (d, l) => {
      const m = mod(d.module_key);
      const unit = course?.units.find((u) => u.unit_key === m?.unit_key);
      return RELATIONS.title_in_detail(d, l) && !!unit && d.converted === `Module ${m.position}: Unit exam · ${unit.name}`;
    },
    savoir_pinned: (d, l) => {
      if (!RELATIONS.same_index(d, l)) return false;
      const w = rewrites.find((r) => r.module_key === d.module_key && firstIndex(r.ref) === firstIndex(d.path));
      if (!w) return false;
      const f = /^exercises\[\d+\]\.(\w+)/.exec(d.path)?.[1];
      const right = (w.item.options || []).find((o) => o.right);
      const expected = { prompt: plain(w.item.question), expectedAnswer: plain(right?.text), hint: w.item.hint === undefined ? undefined : plain(w.item.hint) }[f];
      return d.converted === expected;
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

/* ---------- after the conversion: the frozen baseline and later recorded edits ---------- */

// Final review I1. The conversion-era classes above hold exact counts, frozen per module in
// scripts/content/test/fixtures/golden-baseline.json at the end of the conversion. A module changed since the freeze
// (a hand fix recorded in content/fr/legacy/hand-fixes.json, or its source changed on main, as the migration record
// content/fr/legacy/migration-sources.json shows) is excused from its frozen counts, but every difference in it still
// needs a class: a conversion-era relation, checked against the regenerated report, or a recorded hand fix.

const canon = (v) => (Array.isArray(v) ? v.map(canon) : isObj(v) ? Object.fromEntries(Object.keys(v).sort().map((k) => [k, canon(v[k])])) : v);
/** A short fingerprint of a JSON value, keys in any order. */
export const fingerprint = (v) => {
  // A small FNV-1a over the canonical JSON: no crypto import, so the module stays pure.
  let h = 0x811c9dc5;
  for (const ch of JSON.stringify(canon(v ?? null))) {
    h ^= ch.codePointAt(0);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h.toString(16).padStart(8, '0');
};
/** Every source hash a module's migration record holds, in a fixed order: it moves only when the source does. */
export function sourcesFingerprint(record) {
  const srcs = [];
  const walk = (v) => {
    if (Array.isArray(v)) v.forEach(walk);
    else if (isObj(v)) for (const k of Object.keys(v).sort()) k === 'src' ? srcs.push(String(v[k])) : walk(v[k]);
  };
  walk(record ?? null);
  return fingerprint(srcs);
}
/** { module_key: { part: fingerprint } } of hand-fixes.json. */
export const handFixPrints = (handFixes) => Object.fromEntries(Object.entries(handFixes || {}).map(([k, parts]) => [k, Object.fromEntries(Object.entries(parts).map(([p, v]) => [p, fingerprint(v)]))]));

/**
 * What changed after the freeze: { handFixed: Map<module_key, Set<part>> (parts whose recorded fix is new or
 * different), sourceChanged: Set<module_key>, changed: Set<module_key> (either, or a fix removed) }.
 */
export function changedSince(baseline, { handFixes = {}, records = {} } = {}) {
  const handFixed = new Map();
  const changed = new Set();
  const now = handFixPrints(handFixes);
  for (const key of new Set([...Object.keys(now), ...Object.keys(baseline.hand_fixes || {})])) {
    const a = now[key] || {};
    const b = baseline.hand_fixes?.[key] || {};
    const parts = new Set(Object.keys(a).filter((p) => a[p] !== b[p]));
    if (parts.size) handFixed.set(key, parts);
    if (parts.size || Object.keys(b).some((p) => !(p in a))) changed.add(key);
  }
  const sourceChanged = new Set();
  for (const [key, print] of Object.entries(baseline.sources || {})) if (records[key] && sourcesFingerprint(records[key]) !== print) sourceChanged.add(key);
  for (const key of sourceChanged) changed.add(key);
  return { handFixed, sourceChanged, changed };
}

/**
 * The data check for differences a recorded hand fix explains (class hand_fix_recorded): the difference sits in a part
 * whose fix in hand-fixes.json is new since the freeze, and the module holds exactly that fix there, so the learner sees
 * what the fix says. Parts: title, description, concepts, a vocabulary card (by word_id), an item (by its place, as the
 * adapter numbers it), a practice sentence (its item), a guide part (parts/<id>) and a passage block (passage/<id>).
 * An item, concept card or vocabulary card added by hand passes when it is recorded and no live id maps to it, and so
 * do the later live exercises it renumbers, by exactly the recorded additions before them.
 */
export function handFixCheck({ course, handFixes = {}, handFixed = new Map(), liveIds = {}, records = {} }) {
  const mod = (key) => course?.modules.get(key) ?? null;
  const strip = (item) => (isObj(item) ? Object.fromEntries(Object.entries(item).filter(([k]) => k !== 'steps')) : item);
  const holds = (key, part, value) => handFixed.get(key)?.has(part) && JSON.stringify(canon(strip(value))) === JSON.stringify(canon(strip(handFixes[key]?.[part])));
  // An item or concept card added by hand: no live exercise or card maps to it (live-ids.json), and hand-fixes.json
  // records it, the item under its own id.
  const liveItem = (key, id) => Object.values(liveIds[key]?.items ?? {}).includes(id);
  const liveConcept = (key, id) => Object.values(liveIds[key]?.concepts ?? {}).includes(id);
  const addedItem = (key, item) => !!item && !liveItem(key, item.id) && holds(key, `items/${item.id}`, item);
  return (d) => {
    const m = mod(d.module_key);
    if (!m || !handFixed.has(d.module_key)) return false;
    let p;
    if (d.path === 'title' || d.path === 'description') return holds(d.module_key, d.path, m[d.path]);
    // An added card: the module holds the recorded concepts and no live card maps to the new one.
    if ((p = /^concepts\[\+(\d+)\]$/.exec(d.path)) && d.live === undefined) {
      const c = m.concepts?.[+p[1]];
      return !!c && !liveConcept(d.module_key, c.id) && holds(d.module_key, 'concepts', m.concepts);
    }
    if (/^concepts(\[|$)/.test(d.path)) return holds(d.module_key, 'concepts', m.concepts);
    // An added exercise: the item it is drawn from was added by hand and is recorded.
    if (/^exercises\[\+\d+\]$/.test(d.path) && d.live === undefined && isObj(d.converted))
      return addedItem(d.module_key, m.items?.[d.converted.displayNumber - 1]);
    // A live exercise numbered later because recorded added items now come before it: the same exercise (its live id),
    // moved by exactly that many.
    if (/^exercises\[\d+\]\.displayNumber$/.test(d.path) && d.exercise?.live && d.exercise?.converted) {
      const { live, converted } = d.exercise;
      if (live.id !== converted.id || !Number.isInteger(live.displayNumber) || !Number.isInteger(converted.displayNumber)) return false;
      const before = (m.items ?? []).slice(0, converted.displayNumber - 1).filter((it) => addedItem(d.module_key, it)).length;
      return before > 0 && converted.displayNumber - live.displayNumber === before;
    }
    if ((p = /^vocabularyReference\[\+?(\d+)\]/.exec(d.path))) {
      // An added card's row carries the card itself (compareLesson attaches the tables to paired rows only).
      const i = +p[1];
      if (d.path.includes('[+')) {
        const card = d.cards?.converted?.[i] ?? (d.live === undefined ? d.converted : undefined);
        const w = (m.vocabulary || []).find((x) => x.fr === card?.french && x.gloss === card?.english);
        return !!w && holds(d.module_key, `vocabulary/${w.word_id}`, w);
      }
      // A paired card is the module row with the live card's text. When the recorded fix rewrote that text (C4b:
      // Reading 7's "étudiant(s)" became "étudiant"), it is the row with the word id the migration record gives the
      // live card, and only when that row is the converted card in the live card's own place: a card lost from the
      // module moves a neighbour into that place, and the neighbour's fix never explains the loss.
      const live = d.cards?.live?.[i];
      const conv = d.cards?.converted?.[i];
      let w = (m.vocabulary || []).find((x) => x.fr === live?.french && x.gloss === live?.english);
      if (!w && live) {
        const key = `${normText(live.french)}|${normText(live.english)}`;
        const ids = (records[d.module_key]?.vocabulary ?? []).filter((r) => r.key === key).map((r) => r.word_id);
        const row = ids.length === 1 ? (m.vocabulary || []).find((x) => x.word_id === ids[0]) : null;
        if (row && conv && conv.french === row.fr && conv.english === row.gloss) w = row;
      }
      return !!w && holds(d.module_key, `vocabulary/${w.word_id}`, w);
    }
    if ((p = /^(?:exercises|sentences)\[\+?(\d+)\]/.exec(d.path))) {
      const n = d.exercise?.converted?.displayNumber ?? (d.path.startsWith('sentences') ? +p[1] + 1 : null);
      const item = n ? m.items?.[n - 1] : null;
      return !!item && holds(d.module_key, `items/${item.id}`, item);
    }
    if ((p = /^guide\.sections\[(\d+)\]/.exec(d.path))) {
      const part = m.parts?.[+p[1]];
      return !!part && holds(d.module_key, `parts/${part.id}`, part);
    }
    if (/^readingPassage\.(text|translation)#sentence$/.test(d.path) && isStr(d.converted)) {
      const field = d.path.includes('translation') ? 'en' : 'fr';
      const block = (m.passage || []).find((b) => isStr(b[field]) && sentences(b[field]).includes(d.converted));
      return !!block && holds(d.module_key, `passage/${block.id}`, block);
    }
    return false;
  };
}
