// Readings as module files (spec 5.7, 6). The passage comes from the approved story L shows (prototypes/l/
// stories-data.js, frozen in content/fr/legacy/l-sources.json); the vocabulary table and the comprehension
// questions come from the module file. A reading teaches the words in its own table (Jake's ruling), so its cards take
// word ids in course order like a lesson's. The report lists every sentence where the story differs from today's
// `readingPassage.text` (text_changed), a reading with no story (story_missing, text from the module), and every
// passage word with no pop-up (reading_word_no_popup).
import { markFrench, unmark } from './mark-french.mjs';
import { normText, mistakesOf, acceptOf } from './items.mjs';
import { slugify, freeId, makeItemId } from '../item-ids.mjs';
import { createMerger, mergeField, mergeList, mergeVocabulary, mergeDeclared, finishReport, clone, sortKeys, sourceCards } from './merge.mjs';
import { preTeachRows } from './course-map.mjs';
import { MODULE_SCHEMA, hasPositionWord, moduleTexts } from '../schema/module.mjs';
import { tokenize, fold } from '../../graph/fr/tokenize.mjs';

const isStr = (v) => typeof v === 'string' && v.trim() !== '';

const KNOWN = ['moduleKey', 'title', 'description', 'skipStudyMode', 'isReadingComprehension', 'emailMetadata', 'concepts', 'readingPassage', 'vocabularyReference', 'exerciseConfig', 'unit'];
const PASSAGE_FIELDS = ['title', 'text', 'translation', 'subtitle', 'subtitleTranslation'];
const ITEM_FIELDS = ['id', 'instruction', 'prompt', 'hint', 'expectedAnswer', 'acceptableAnswers', 'wrongAnswers'];
const STORY_BLOCK_FIELDS = ['fr', 'en', 'img', 'w', 'h', 'alt', 'dateline', 'scene', 'end'];
const VOCAB_FIELDS = ['french', 'english', 'note', 'example', 'usage', 'agreement', 'ttsText', 'wikipedia'];

function unknown(obj, known, where) {
  const bad = Object.keys(obj || {}).filter((k) => !known.includes(k));
  if (bad.length) throw new Error(`${where}: fields the conversion does not know: ${bad.join(', ')}`);
}

/* ---------- passage markup ---------- */

// Story and live passage markup: "**Speaker:** text" at the start, Name[3] (a speaker's colour), {1871} (no pop-up),
// *italic*. A block keeps *italic* titles; the speaker moves to `speaker`; [n] and the braces go.
const SPEAKER = /^\*\*([^*]+?):\*\*\s*/;
const clean = (s) => String(s ?? '').replace(/\{([^}]*)\}/g, '$1').replace(/(\p{L})\[\d+\]/gu, '$1').trim();
function splitSpeaker(text) {
  const m = SPEAKER.exec(String(text ?? ''));
  return m ? { speaker: clean(m[1]), text: clean(String(text).slice(m[0].length)) } : { speaker: null, text: clean(text) };
}
const unitalic = (s) => s.replace(/^\*([^*]+)\*$/, '$1');
// L defines no inline markup in a passage (L 3da5ad7), so *italic* titles lose their asterisks; each one is reported.
function noItalics(text, path, add) {
  for (const m of String(text).matchAll(/\*([^*]+)\*/g)) add(path, 'text_changed', `italic markup removed: ${m[0]}`);
  return String(text).replace(/\*([^*]+)\*/g, '$1');
}

/** Story blocks (fr, en, img/w/h/alt, dateline, scene, end) as passage blocks without ids, with report lines. */
export function blocksFromStory(story, add = () => {}) {
  return story.blocks.map((b, i) => {
    unknown(b, STORY_BLOCK_FIELDS, `story ${story.n} blocks[${i}]`);
    const out = {};
    const frRaw = b.fr ?? b.scene ?? b.end;
    if (frRaw !== undefined) {
      const fr = splitSpeaker(frRaw);
      const en = splitSpeaker(b.en);
      if (fr.speaker) out.speaker = fr.speaker;
      out.fr = noItalics(b.dateline ? unitalic(fr.text) : fr.text, `passage[${i}].fr`, add);
      if (b.en !== undefined) out.en = noItalics(b.dateline ? unitalic(en.text) : en.text, `passage[${i}].en`, add);
      if (fr.speaker && en.speaker && fr.speaker !== en.speaker)
        add(`passage[${i}].speaker`, 'text_changed', `"${fr.speaker}" names the speaker; the English line said "${en.speaker}"`);
    }
    if (b.img !== undefined) out.img = { src: b.img, w: b.w, h: b.h, alt: b.alt };
    if (b.dateline) out.layout = 'dateline';
    if (b.scene !== undefined) out.layout = 'scene';
    if (b.end !== undefined) out.layout = 'end';
    return out;
  });
}

const IMAGE = /^!\[([^\]]*)\]$/;
const HEADER = /^##\s*(.+)$/;
/** Today's `readingPassage` (text and translation, paragraph by paragraph) as passage blocks, for a reading with no story. */
export function blocksFromPassage(rp, add = () => {}) {
  const fr = String(rp.text ?? '').split('\n\n');
  const en = String(rp.translation ?? '').split('\n\n');
  const out = [];
  if (isStr(rp.subtitle)) out.push({ fr: rp.subtitle.trim(), ...(isStr(rp.subtitleTranslation) ? { en: rp.subtitleTranslation.trim() } : {}) });
  fr.forEach((p, i) => {
    const t = p.trim();
    if (!t) return;
    if (IMAGE.test(t)) return add(`readingPassage.text`, 'dropped_field', `image ${t}: no size or description to show it with`);
    const h = HEADER.exec(t);
    const a = splitSpeaker(h ? h[1] : t);
    const b = splitSpeaker(String(en[i] ?? '').trim().replace(HEADER, '$1'));
    const block = { ...(a.speaker ? { speaker: a.speaker } : {}), fr: noItalics(a.text, `readingPassage.text`, add), en: noItalics(b.text || '', `readingPassage.translation`, add) };
    if (h) block.layout = 'scene';
    if (!block.en) add(`readingPassage.translation`, 'dropped_field', `no translation beside "${a.text.slice(0, 60)}"`);
    out.push(block);
  });
  return out.filter((b) => b.en);
}

export function blockId(b, taken) {
  if (b.img) return freeId(`img-${slugify(String(b.img.src).split('/').pop(), { words: 4 }) || 'image'}`, taken);
  return freeId(`b-${slugify(b.fr ?? '', { words: 4 }) || 'block'}`, taken);
}

/* ---------- sentences that changed ---------- */

// Sentences of a text as a learner reads them: markup gone, quotes and spaces made even.
export function sentences(text) {
  return String(text ?? '')
    .split(/\n+/)
    .map((p) => splitSpeaker(p.trim()).text)
    .filter((p) => p && !IMAGE.test(p) && !/^-{3,}$/.test(p)) // pictures and rules (---) are not sentences
    .flatMap((p) => p.replace(/^##\s*/, '').split(/(?<=[.!?…])\s+(?=\S)/))
    .map((s) => s.replace(/\*/g, '').replace(/[’ʼ‘]/g, "'").replace(/\s+/g, ' ').normalize('NFC').trim())
    .filter(Boolean);
}

// Longest common subsequence of two sentence lists, as [i, j] pairs.
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

/** Each sentence where the passage differs from today's text: { from, to } with null for an added or removed one. */
export function changedSentences(liveText, passage) {
  const live = sentences(liveText);
  const now = passage.filter((b) => isStr(b.fr)).flatMap((b) => sentences(b.fr));
  const common = lcs(live, now);
  const out = [];
  let i = 0;
  let j = 0;
  for (const [ci, cj] of [...common, [live.length, now.length]]) {
    const gone = live.slice(i, ci);
    const added = now.slice(j, cj);
    const n = Math.max(gone.length, added.length);
    for (let x = 0; x < n; x++) out.push({ from: gone[x] ?? null, to: added[x] ?? null });
    i = ci + 1;
    j = cj + 1;
  }
  return out;
}

/* ---------- pop-ups ---------- */

const ELIDED = { "j'": 'je', "l'": 'le', "d'": 'de', "n'": 'ne', "s'": 'se', "c'": 'ce', "qu'": 'que', "m'": 'me', "t'": 'te', "jusqu'": 'jusque', "lorsqu'": 'lorsque', "puisqu'": 'puisque' };
// A clitic after a hyphen (est-ce, excusez-moi, va-t-il) is the word itself: ce, moi, il.
const foldTok = (t) => fold(t.surface.replace(/[’ʼ‘]/g, "'").replace(/^-(?:t-)?/, ''));

/**
 * The distinct passage words with no pop-up (spec 5.7): not in the dictionary (`dictionaryForms`, folded spellings
 * and forms), the reading's glossary or vocabulary table, and not a name (`names`, folded). Capitalised words count
 * as names only when names.json lists them.
 */
export function wordsWithoutPopup(mod, { dictionaryForms = new Set(), names = new Set() } = {}) {
  const covered = new Set();
  for (const row of [...(mod.glossary || []), ...(mod.vocabulary || [])]) for (const t of tokenize(row.fr)) covered.add(foldTok(t));
  const missing = new Map();
  for (const b of mod.passage || []) {
    if (!isStr(b.fr)) continue;
    for (const t of tokenize(b.fr.replace(/\*/g, ''))) {
      const f = foldTok(t);
      const base = ELIDED[f] ?? f;
      if (covered.has(f) || dictionaryForms.has(f) || dictionaryForms.has(base) || names.has(f)) continue;
      if (!missing.has(f)) missing.set(f, t.surface);
    }
  }
  return [...missing.values()];
}

/* ---------- conversion ---------- */

const GENERIC_PROMPT = /^find the answer in the passage/i;

/** One reading question (exerciseConfig custom item) as a comprehension item without id. */
// L marks French in a question with braces only (L 3da5ad7): "Who is 'tu' (you)?" is "Who is {tu} (you)?".
const unquoteSpans = (t) => String(t).replace(/(['‘"“])\{([^}]+)\}(['’"”])/g, '{$2}');

export function comprehensionFrom(it, { isWord = null, add = () => {}, ref } = {}) {
  unknown(it, ITEM_FIELDS, ref);
  const mark = (t, mode, own = null) => unquoteSpans(markFrench(String(t).trim(), mode, { isWord, own }));
  const answer = String(it.expectedAnswer ?? '').trim();
  const item = { type: 'comprehension', question: mark(it.instruction, 'quoted') };
  const prompt = String(it.prompt ?? '').trim();
  const repeats = normText(prompt) === normText(it.instruction);
  if (prompt && !GENERIC_PROMPT.test(prompt) && !repeats) item.cue = mark(prompt, 'quoted');
  else if (prompt) add(`${ref}.prompt`, 'dropped_field', `"${prompt}" (${repeats ? 'repeats the question' : 'says only where the answer is'})`);
  item.answer = answer;
  const accept = acceptOf(it.acceptableAnswers, answer);
  if (accept.length) item.accept = accept;
  if (isStr(it.hint)) item.hint = mark(it.hint, 'quoted');
  const mistakes = mistakesOf(it.wrongAnswers, answer, (t, mode, own) => unquoteSpans(markFrench(t, mode, { isWord, own })));
  if (mistakes.length) item.mistakes = mistakes;
  return item;
}

/**
 * One of today's readings as a reading file, merged with what is written.
 * @param old    today's module object (isReadingComprehension)
 * @param story  the L story for this reading (l-sources.json `stories`), or null
 * @param opts   { unitIndex, existing?, record?, handFixes?, isWord?, dictionary?: Map, seenBySpelling?: Map,
 *                 dictionaryForms?: Set, names?: Set, minted?: Set, imageCredit?: (sitePath) => string | null }
 * @returns { mod, report, record, handFixes }
 */
export function readingFrom(old, story, opts = {}) {
  const key = old.moduleKey;
  unknown(old, KNOWN, key);
  unknown(old.readingPassage, PASSAGE_FIELDS, `${key} readingPassage`);
  (old.vocabularyReference || []).forEach((v, i) => unknown(v, VOCAB_FIELDS, `${key} vocabularyReference[${i}]`));
  if (old.exerciseConfig?.type !== 'custom') throw new Error(`${key}: exerciseConfig.type ${old.exerciseConfig?.type}; a reading's questions are custom items`);
  const lines = [];
  const add = (path, kind, detail) => lines.push({ module_key: key, path, kind, detail });
  const isWord = opts.isWord ?? null;
  const mark = (t, mode) => markFrench(String(t).trim(), mode, { isWord });
  const unitIndex = opts.unitIndex ?? null;

  /* fresh */
  const fresh = { title: mark(old.title, 'segments'), description: mark(old.description ?? '', 'quoted') };
  const caps = (old.emailMetadata?.capabilities || []).filter(isStr);
  if (caps.length) fresh.can_do = caps.map((c) => mark(c, 'quoted'));
  for (const f of ['realWorldUse', 'milestone', 'nextModuleTeaser', 'isUnitCompletion', 'utilityScore'])
    if (old.emailMetadata?.[f] !== undefined) add(`emailMetadata.${f}`, 'dropped_field', `${JSON.stringify(old.emailMetadata[f])} (no field; the next-module teaser is computed from the outline)`);
  (old.concepts || []).forEach((c, i) => add(`concepts[${i}]`, 'dropped_field', `concept "${c.term}": a reading has no concept cards`));
  if (old.skipStudyMode !== undefined) add('skipStudyMode', 'dropped_field', `${old.skipStudyMode} (Study Mode belongs to lessons only)`);
  if (old.unit !== undefined) add('unit', 'dropped_field', `${old.unit} (the outline places the module)`);
  if (isStr(old.readingPassage.title)) add('readingPassage.title', 'dropped_field', `"${old.readingPassage.title}" (the story's title comes from stories/)`);

  // Today's speaker colour marks (**Paul[9]:**, ReadingPassage.jsx): L defines no inline markup, so the name is
  // kept as the speaker and the colour goes (ledger ruling 2026-11-25 Task 8).
  for (const mk of String(old.readingPassage.text ?? '').matchAll(/\*\*([^*]+?\[\d+\]):\*\*/g))
    add('readingPassage.text', 'note', `speaker_colour_dropped: "${mk[1]}" is the speaker "${mk[1].replace(/\[\d+\]$/, '')}"; L has no colour mark`);

  fresh.story_id = story ? `reading${story.n}` : `reading${unitIndex ?? ''}`;
  let freshPassage;
  if (story) {
    freshPassage = blocksFromStory(story, add);
    for (const c of changedSentences(old.readingPassage.text, freshPassage)) {
      const detail =
        c.from === null ? `added: "${c.to}"` : c.to === null ? `removed: "${c.from}"` : `"${c.from}" → "${c.to}"`;
      add('passage', 'text_changed', `story text: ${detail}`);
    }
    if (isStr(old.readingPassage.subtitle)) add('readingPassage.subtitle', 'text_changed', 'the subtitle is a passage block in the story');
  } else {
    add('story_id', 'story_missing', `no L story for this reading; the passage is today's readingPassage text, and ${fresh.story_id} names no story yet`);
    freshPassage = blocksFromPassage(old.readingPassage, add);
  }

  /* merge */
  const m = createMerger({ existing: opts.existing, record: opts.record, handFixes: opts.handFixes, add });
  const mod = { schema: MODULE_SCHEMA, module_key: key, kind: 'reading', status: 'written' };
  const fields = {};
  const sources = { title: old.title, description: old.description, can_do: old.emailMetadata?.capabilities ?? null, story_id: story?.n ?? null };
  for (const f of ['title', 'description', 'can_do']) mergeField(m, f, fresh[f], sources[f], { mod, outFields: fields });
  mergeDeclared(m, opts.declaration, 'teaches', { mod, outFields: fields, written: opts.written });
  mergeField(m, 'story_id', fresh.story_id, sources.story_id, { mod, outFields: fields });

  // The course map's preTeach words in the passage join the table as cards after today's (course-map.mjs).
  const table = [...(old.vocabularyReference || [])];
  if (opts.declaration?.pre_teach?.length) {
    const passageNow = { passage: freshPassage, vocabulary: sourceCards(old.vocabularyReference) };
    const pre = preTeachRows(key, opts.declaration.pre_teach, passageNow, { wordOf: opts.wordOf ?? (() => null) });
    lines.push(...pre.report);
    for (const r of pre.rows) table.push({ french: r.fr, english: r.gloss });
  }
  const v = mergeVocabulary(m, table, { key, seenBySpelling: opts.seenBySpelling ?? new Map(), dictionary: opts.dictionary ?? new Map(), add, minted: opts.minted ?? null, infoCards: opts.imageCredit ?? (() => ({ credit: null, stated: null })) });
  mod.vocabulary = v.vocab;

  const passage = mergeList(
    m,
    'passage',
    freshPassage.map((b, i) => ({ value: b, src: story ? story.blocks[i] : b })),
    { keyOf: (b) => normText(b.img ? b.img.src : `${b.speaker ?? ''} ${b.fr ?? ''}`), makeId: blockId, add },
  );
  mod.passage = passage.list;

  // Glossary: the story's pop-up words that the table does not teach and the dictionary lacks (spec 5.7).
  const inTable = new Set(mod.vocabulary.map((w) => normText(w.fr)));
  const dictForms = opts.dictionaryForms ?? new Set();
  const glossary = [];
  let notes = 0;
  for (const g of story?.vocab || []) {
    unknown(g, ['fr', 'en', 'note'], `story ${story.n} vocab`);
    if (inTable.has(normText(g.fr)) || dictForms.has(fold(String(g.fr).trim()))) continue;
    if (glossary.some((x) => normText(x.fr) === normText(g.fr))) continue;
    glossary.push({ fr: String(g.fr).trim(), en: String(g.en).trim() });
    if (isStr(g.note)) notes++;
  }
  if (notes) add('glossary', 'dropped_field', `${notes} story glossary notes (a glossary row holds fr and en)`);
  mergeField(m, 'glossary', glossary.length ? glossary : undefined, story?.vocab ?? null, { mod, outFields: fields });

  const srcItems = old.exerciseConfig.items || [];
  const items = mergeList(
    m,
    'items',
    srcItems.map((it, i) => ({ value: comprehensionFrom(it, { isWord, add, ref: `exerciseConfig.items[${i}]` }), src: it, authored: it.id })),
    {
      keyOf: (it) => `${normText(unmark(it.question))}|${normText(it.answer ?? '')}`,
      makeId: (it, taken, f) => makeItemId({ id: f.authored, ...it }, taken),
      // In place: the same question or the same answer, edited.
      samePlace: (s, r) => String(s.key).split('|')[0] === String(r.key).split('|')[0] || String(s.key).split('|')[1] === String(r.key).split('|')[1],
      add,
    },
  );
  mod.items = items.list;
  mergeDeclared(m, opts.declaration, 'tests', { mod, outFields: fields, written: opts.written });

  // What the source says, unmerged, so a position word fixed by hand is still listed, marked "(fixed by hand)".
  const freshMod = {
    ...mod,
    ...fresh,
    vocabulary: sourceCards(old.vocabularyReference),
    passage: freshPassage.map((b, i) => ({ id: `b${i}`, ...b })),
    items: srcItems.map((it) => comprehensionFrom(it, { isWord, ref: '' })),
  };
  finishReport(m, lines, add, moduleTexts(freshMod, { unitIndex }), hasPositionWord);
  for (const w of wordsWithoutPopup(mod, { dictionaryForms: dictForms, names: opts.names }))
    add('passage', 'reading_word_no_popup', w);

  return {
    mod,
    report: lines,
    record: { fields: sortKeys(fields), vocabulary: v.record, lists: { passage: passage.record, items: items.record } },
    handFixes: sortKeys(m.outFixes),
  };
}
