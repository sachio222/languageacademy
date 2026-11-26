// Reads the loaded content course (scripts/content loadCourse) into the shape readCourse gives for today's lessons,
// so every rule runs on the content layer unchanged.
//
// Roles come from the content schema, never from English wording: an item's fields from itemTexts() (its type decides
// which field is French the learner types, which is French they read, and which is native text), every other string
// from moduleTexts(). French inside native text is the {…} spans. Every learner-facing string gets a ref, even when it
// holds no French, so a course-map correction keyed to it always finds it:
//   <key>#<item_id>                       the item: typed French (french, lenient) and French shown with it (shown)
//   <key>#<item_id>/hint, /instruction, /gloss, /mistakes/<k>/feedback
//   <key>#concepts/<id>/<field>, #vocabulary/<word_id>/<field>, #tables/<id>/rows/<n>/fr, #parts/<id>/text/<n>,
//   #parts/<id>/blocks/<n>/<type>/…, #checks/<id>/ask, #passage/<id>/fr, #title, #description, #can_do/<n>
// Hints, feedback, instructions and titles are read (for reuse) but stay outside the taught-before rule (OUTSIDE).
import { itemTexts } from '../content/schema/item.mjs';
import { moduleTexts } from '../content/schema/module.mjs';
import { frenchSpans, parseSpans } from '../content/spans.mjs';
import { extractTeaches } from './extract-teaches.mjs';

// Content kinds as readCourse names them. Reference pages are not on the learner's path (referenceModulesFromContent).
const KIND = { lesson: 'lesson', guide: 'help', reading: 'reading', practice: 'practice', unit_exam: 'exam' };

// Item sources the taught-before rule skips (Jake): hints, mistake feedback, instructions and titles. Their French is
// still read, so it counts for reuse.
export const OUTSIDE = new Set(['hint', 'feedback', 'instruction', 'title']);

// Native fields of an item that pose the task: their French spans are French the learner sees with the item, so they
// sit on the item and are checked (a respond situation's {merci}). instruction and gloss are instructions.
const PROMPT_FIELDS = new Set(['prompt', 'situation', 'cue', 'question']);

// Top-level lists whose entries carry their own id; a ref names the entry by that id, so it survives reordering.
const ID_OF = { items: 'id', concepts: 'id', vocabulary: 'word_id', tables: 'id', phrases: 'phrase_id_suffix', parts: 'id', checks: 'id', passage: 'id', sections: 'id' };

// The learner's name marker in a unit's can-do example ("Je suis {name}."), read as a name the graph knows.
const NAME_MARKER = /\{name\}/g;
const NAME_STAND_IN = 'Paul';

const plain = (text) => parseSpans(text).map((s) => s.text).join('');
const tidy = (s) => s.replace(/\s+/g, ' ').trim();
const spansOf = (text) => frenchSpans(text).map((s) => s.trim()).filter(Boolean);

// "parts[2].blocks[1].lines[0][0]" -> "parts/p-no-more/blocks/1/lines/0/0", naming id-carrying entries by their id.
export function refPath(mod, path) {
  const tokens = [...path.matchAll(/([A-Za-z_]+)|\[(\d+)\]/g)].map((m) => (m[1] !== undefined ? m[1] : Number(m[2])));
  const out = [];
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    const next = tokens[i + 1];
    if (i === 0 && typeof t === 'string' && ID_OF[t] && typeof next === 'number') {
      const id = mod[t]?.[next]?.[ID_OF[t]];
      if (typeof id === 'string') {
        out.push(...(t === 'items' ? [id] : [t, id]));
        i += 1;
        continue;
      }
    }
    out.push(String(t));
  }
  return out.join('/');
}

// French a guide block cell holds, by block type (schema/module.mjs BLOCK_SHAPES). The part of the path after the
// block type ("[0][0]", ".rows[0][1].say") picks the cell. 'fr' cells are French the learner sees or hears; 'none'
// cells are neither (a sound respelled for English readers, a link letter, a tone, the pieces of a sentence shown
// whole elsewhere); every other cell is native text, read for its spans.
const FR_CELLS = {
  pairs: /^\[\d+\]\[0\]$/,
  lines: /^\[\d+\]\[0\]$/,
  ties: /^\[\d+\]\.fr$/,
  cmp: /^\.rows\[\d+\]\[\d+\]\.(fr|say)$/,
  build: /^\[\d+\]\.fr$/,
  rise: /^\[\d+\]\.fr$/,
  flip: /^\[\d+\]\.fr$/,
  ways: /^\[\d+\]\.fr$/,
  verbs: /^\[\d+\]\.(v|f\[\d+\]\[\d+\])$/,
  table: /^\.rows\[\d+\](\[0\]|\[[12]\]\[0\])$/,
};
const NONE_CELLS = {
  pairs: /^\[\d+\]\[2\]$/,
  ties: /^\[\d+\]\.(a|b|link|sound)$/,
  rise: /^\[\d+\]\.tone$/,
  flip: /^\[\d+\]\.parts\b/,
  table: /^\.rows\[\d+\]\[3\]$/,
};
export function blockCellRole(path) {
  const m = /\.blocks\[\d+\]\.([a-z]+)(.*)$/.exec(path);
  if (!m) return 'native';
  const [, type, rest] = m;
  if (FR_CELLS[type]?.test(rest)) return 'fr';
  if (NONE_CELLS[type]?.test(rest)) return 'none';
  return 'native';
}

// A lesson's review row (review: true) shows a word taught earlier and teaches nothing (design §1, §17 item 11).
const isReview = (v) => v?.review === true;

// Where a module text sits, as an item source. null: not read as an item (the vocabulary word itself is what the
// module teaches; glossary rows and glosses are pop-up sources; info cards are native text outside the rule; a check's sound is a
// respelling). A review row's word teaches nothing, so it is read as French the learner sees ('vocab-review'): the
// taught-before rule checks it and it counts as a use for the reuse windows.
function moduleSource(mod, path, role) {
  const top = path.split(/[.[]/)[0];
  const word = /^vocabulary\[(\d+)\]\.fr$/.exec(path);
  if (word && isReview(mod.vocabulary?.[Number(word[1])])) return 'vocab-review';
  if (/^vocabulary\[\d+\]\.(fr$|info_card\b)/.test(path)) return null;
  if (top === 'glossary' || top === 'glosses') return null;
  if (/^checks\[\d+\]\.sound$/.test(path)) return null;
  if (role === 'block' && blockCellRole(path) === 'none') return null;
  if (top === 'title' || top === 'topic' || /^tables\[\d+\]\.title$/.test(path)) return 'title';
  if (top === 'description' || top === 'line') return 'description';
  if (top === 'can_do') return 'can-do';
  if (top === 'concepts') return 'concept';
  if (top === 'vocabulary') return /\.example_fr$/.test(path) ? 'vocab-example' : 'vocab-note';
  if (top === 'tables') return 'table';
  if (top === 'phrases') return 'phrase';
  if (top === 'passage') return 'passage';
  if (top === 'parts') return 'guide';
  if (top === 'checks') return /\.why$/.test(path) ? 'feedback' : 'check';
  return top;
}

const textItem = (ref, source, shown) => ({ ref, source, type: null, french: [], shown, lenient: [], englishPrompt: null, instruction: null });

// The module texts whose French L glosses with the module's glosses (L c3da2c0, j-stories.js J.gloss): in a lesson the
// French in concept cards, tables and Vocabulary Intro examples; in a guide its parts and checks; in a reading the
// passage only. An item's own glossable French (its prompt and shown French, never an answer or a choice) is set in
// readItem. `glossable` on a normalized item lists the texts a gloss may cover.
const GLOSSED_SOURCES = { lesson: new Set(['concept', 'table', 'vocab-example']), guide: new Set(['guide', 'check']), reading: new Set(['passage']) };
const glossesItems = (kind) => kind === 'lesson';

function moduleItems(key, mod) {
  const out = [];
  for (const t of moduleTexts(mod)) {
    if (t.path.startsWith('items[')) continue;
    const source = moduleSource(mod, t.path, t.role);
    if (source === null) continue;
    const fr = t.role === 'fr' || (t.role === 'block' && blockCellRole(t.path) === 'fr');
    const item = textItem(`${key}#${refPath(mod, t.path)}`, source, fr ? [t.text.trim()] : spansOf(t.text));
    if (GLOSSED_SOURCES[mod.kind]?.has(source)) item.glossable = [...item.shown];
    out.push(item);
  }
  return out;
}

// Fill each ___ of a gap-fill text with its blank's answer, in order.
function fillBlanks(text, answers) {
  let i = 0;
  return tidy(text.replace(/___/g, () => answers[i++] ?? ''));
}

function readItem(key, item, kind) {
  const base = `${key}#${item.id}`;
  const own = { ...textItem(base, 'items', []), type: item.type };
  const options = new Set();
  const extra = [];
  for (const t of itemTexts(item)) {
    const field = t.path.split(/[.[]/)[0];
    if (field === 'hint') extra.push(textItem(`${base}/hint`, 'hint', spansOf(t.text)));
    else if (field === 'mistakes') {
      // A mistake's answer is deliberately wrong French: never read. Its feedback is.
      const m = /^mistakes\[(\d+)\]\.feedback$/.exec(t.path);
      if (m) extra.push(textItem(`${base}/mistakes/${m[1]}/feedback`, 'feedback', spansOf(t.text)));
    } else if (t.role === 'fr' && t.typed) {
      if (field === 'blanks') {
        if (/\.accept\[/.test(t.path)) own.lenient.push(t.text);
      } else if (field === 'accept') own.lenient.push(t.text);
      else own.french.push(t.text);
    } else if (t.role === 'fr') {
      // shown, a French option; a gap-fill text is read filled with its answers below
      if (!(item.type === 'gapfill' && field === 'text')) own.shown.push(t.text.trim());
      if (field === 'options') options.add(t.text.trim());
    } else if (t.role === 'native_fr') {
      if (PROMPT_FIELDS.has(field)) own.shown.push(...spansOf(t.text));
      else extra.push(textItem(`${base}/${field}`, 'instruction', spansOf(t.text)));
    }
  }
  if (item.type === 'gapfill') {
    const answers = (item.blanks ?? []).map((b) => b.answer);
    own.french.unshift(fillBlanks(item.text, answers));
    own.blankAnswers = answers;
    own.gapFill = true;
  }
  // L glosses a lesson item's prompt and shown French, and the words of a gap-fill around its blanks (the rule leaves
  // the typed blanks out); never a choice, which is a button, nor an answer.
  if (glossesItems(kind)) own.glossable = [...own.shown.filter((x) => !options.has(x)), ...(item.type === 'gapfill' ? [own.french[0]] : [])];
  own.englishPrompt = item.prompt ?? item.situation ?? item.gloss ?? null;
  own.instruction = item.instruction ?? item.question ?? item.situation ?? null;
  return [own, ...extra];
}

// course: loadCourse() output. opts ({ isWord }) is accepted for readCourse's signature; roles come from the schema,
// so no wording test runs. Returns NormalizedModule[] in course order, each with the module's declared teaching
// (teaches: { words, constructions }, tests: construction ids), which courseMapFromContent reads.
// A planned module (status planned, a course plan stub) is not written yet, so it is not read at all: it teaches and
// tests nothing, its title claims no level, and the course the reuse windows run over ends at the last written module.
// Positions keep the loader's course order, so a written module keeps its place when a stub before it is written.
export function readCourseFromContent(course, opts = {}) { // eslint-disable-line no-unused-vars -- opts kept for readCourse's signature
  const out = [];
  for (const unit of course.units) {
    const written = unit.modules.filter((mod) => mod.status !== 'planned');
    written.forEach((mod, j) => {
      const key = mod.module_key;
      const items = [];
      for (const item of mod.items ?? []) items.push(...readItem(key, item, mod.kind));
      items.push(...moduleItems(key, mod));
      // The unit's can-do lines and description (outline, native text with spans) and its French can-do example say
      // what the unit promises the learner can do: checked where the unit's written modules end.
      if (j === written.length - 1) {
        for (const f of ['description', 'can_do', 'can_do_short']) {
          if (typeof unit[f] === 'string') items.push(textItem(`${key}#unit/${f}`, 'unit-can-do', spansOf(unit[f])));
        }
        if (typeof unit.can_do_example_fr === 'string') {
          items.push(textItem(`${key}#unit/can_do_example_fr`, 'unit-can-do', [unit.can_do_example_fr.replace(NAME_MARKER, NAME_STAND_IN)]));
        }
      }
      const shapes = [];
      if ((mod.items ?? []).length) shapes.push('items');
      if (mod.kind === 'reading') shapes.push('passage');
      out.push({
        position: mod.position,
        moduleKey: key,
        title: plain(mod.title ?? key),
        unitId: unit.index,
        unitKey: unit.unit_key, // the unit's stable identity; unitId is its place in the course and moves
        unitTitle: unit.name,
        unitDescription: unit.description ?? null,
        kind: KIND[mod.kind] ?? mod.kind,
        guide: mod.kind === 'guide',
        // The words the module's table teaches: review rows teach nothing, so extractTeaches never credits them.
        vocab: (mod.vocabulary ?? []).filter((v) => !isReview(v)).map((v) => v.fr).filter((f) => typeof f === 'string'),
        conceptTerms: (mod.concepts ?? []).map((c) => plain(c.term)).filter(Boolean),
        items,
        shapes,
        unreadShapes: [],
        blankProblems: [],
        teaches: { words: [...(mod.teaches?.words ?? [])], constructions: [...(mod.teaches?.constructions ?? [])] },
        tests: [...(mod.tests?.constructions ?? [])],
        // The module's glosses (fr only): forms of known words the learner taps for a meaning; taught-before counts a
        // token they cover as allowed.
        glosses: (mod.glosses ?? []).map((g) => g.fr).filter((f) => typeof f === 'string'),
      });
    });
  }
  return out;
}

// The Reference shelf's pages, each with the French of its vocabulary table: [{ moduleKey, title, vocab }].
// Reference rows never carry review: the schema rejects it there, so every vocab row here teaches its word.
export function referenceModulesFromContent(course) {
  return course.shelf.pages.map((mod) => ({
    moduleKey: mod.module_key,
    title: plain(mod.title ?? mod.module_key),
    vocab: (mod.vocabulary ?? []).map((v) => v.fr).filter((f) => typeof f === 'string'),
  }));
}

// The per-module entry every rule reads (graph.courseMap), built from the content layer and the course-map
// corrections (curriculum-graph/languages/<lang>/course-map.json, corrections only):
//   teachesWords          extracted from the module's own vocabulary table (lessons and readings), minus excludeWords
//   teachesWordsManual    the module's teaches.words
//   teachesConstructions  the module's teaches.constructions
//   tests                 the module's tests.constructions
//   excludeWords, overrides, itemKinds, contentNotes   from the corrections, as written
export function courseMapFromContent(course, corrections, { graph, index }) {
  const map = {};
  for (const m of course) {
    const entry = { ...(corrections[m.moduleKey] ?? {}) };
    if (m.teaches.words.length) entry.teachesWordsManual = [...m.teaches.words];
    if (m.teaches.constructions.length) entry.teachesConstructions = [...m.teaches.constructions];
    if (m.tests.length) entry.tests = [...m.tests];
    map[m.moduleKey] = entry;
  }
  // Corrections for a module outside the course stay, so course-map-unknown-module reports them.
  for (const [key, own] of Object.entries(corrections)) if (!map[key]) map[key] = { ...own };
  const { courseMap } = extractTeaches({ ...graph, courseMap: map }, course, index);
  for (const [key, e] of Object.entries(courseMap)) if (!Object.keys(e).length) delete courseMap[key];
  return courseMap;
}
