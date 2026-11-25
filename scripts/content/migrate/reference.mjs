// Reference shelf pages as module files (spec 5.9, 6): `kind: reference` with `vocabulary`, `sections` and optional
// `screen`, no items and no progress. Today's concept cards become sections (heading, text, example), the word list
// becomes the vocabulary table, with word ids in course order after every unit (the shelf sits outside the numbered
// units). The spelling patterns page (`isPhonicsReference`) is drawn today from src/data/frenchPhonics.js; that data
// is written out as its sections, so the page needs no screen of its own. The pronunciation test page (a word list
// with `exerciseConfig.type` "none", spoken on L's pronunciation screen) takes `screen: pronunciation-test`.
import { markFrench, unmark } from './mark-french.mjs';
import { normText } from './items.mjs';
import { slugify, freeId } from '../item-ids.mjs';
import { createMerger, mergeField, mergeList, mergeVocabulary, mergeDeclared, finishReport, clone, sortKeys, sourceCards } from './merge.mjs';
import { MODULE_SCHEMA, hasPositionWord, moduleTexts } from '../schema/module.mjs';

const isStr = (v) => typeof v === 'string' && v.trim() !== '';

const KNOWN = ['moduleKey', 'id', 'title', 'description', 'concepts', 'vocabularyReference', 'exercises', 'isPhonicsReference', 'emailMetadata', 'exerciseConfig'];

function unknown(obj, known, where) {
  const bad = Object.keys(obj || {}).filter((k) => !known.includes(k));
  if (bad.length) throw new Error(`${where}: fields the conversion does not know: ${bad.join(', ')}`);
}

export const sectionId = (heading, taken) => freeId(`s-${slugify(unmark(heading), { words: 4 }) || 'section'}`, taken);

/** A concept card ({ term, definition, example? }) as a section without id. */
export function sectionFromConcept(c, { isWord = null } = {}) {
  unknown(c, ['term', 'definition', 'example'], `concept "${c.term}"`);
  const mark = (t, mode) => markFrench(String(t).trim(), mode, { isWord });
  const s = { heading: mark(c.term, 'segments'), text: mark(c.definition, 'quoted') };
  if (isStr(c.example)) s.example = mark(c.example, 'example');
  return s;
}

// A spelling-page section is named for the sound it teaches: `s-` and the sound's name, never a number.
const SOUND_NAMES = {
  '/a/': 'a', '/e/': 'e-closed', '/ɛ/': 'e-open', '/ə/': 'schwa', '/i/': 'i', '/o/': 'o-closed', '/ɔ/': 'o-open',
  '/u/': 'u', '/y/': 'y', '/ɑ̃/': 'a-nasal', '/ɛ̃/': 'e-nasal', '/ɔ̃/': 'o-nasal', '/wa/': 'wa', '/wɛ̃/': 'we-nasal',
  '/ɥi/': 'ui', '/j/': 'j', '/s/': 's', '/z/': 'z', '/k/': 'k', '/ʒ/': 'zh', '/ʃ/': 'sh', '/ɲ/': 'gn', '/ʁ/': 'r', '/g/': 'g',
};
export function soundId(sound) {
  const name = SOUND_NAMES[sound] ?? (/^\/.*\/$/.test(sound) ? null : slugify(sound, { words: 4 }));
  if (!name) throw new Error(`frenchPhonics.js: name the sound ${sound} in reference.mjs SOUND_NAMES`);
  return `s-${name}`;
}

/**
 * frenchPhonics (src/data/frenchPhonics.js) as sections: one per sound, headed by its category and sound, with one row
 * per spelling (the spelling, its note, and its example words as a French note).
 */
export function sectionsFromPhonics(phonics) {
  const out = [];
  for (const cat of phonics) {
    unknown(cat, ['category', 'icon', 'patterns'], `phonics category "${cat.category}"`);
    for (const p of cat.patterns) {
      unknown(p, ['sound', 'description', 'spellings'], `phonics pattern ${p.sound}`);
      out.push({
        heading: `${cat.category}: ${p.sound}`,
        text: String(p.description).trim(),
        rows: p.spellings.map((sp) => {
          unknown(sp, ['spelling', 'examples', 'notes'], `phonics spelling ${sp.spelling}`);
          const row = { fr: sp.spelling, en: isStr(sp.notes) ? sp.notes.trim() : 'spelling' };
          if ((sp.examples || []).length) row.note = sp.examples.map((e) => `{${e}}`).join(', ');
          return row;
        }),
      });
    }
  }
  return out;
}

/**
 * One of today's Reference pages as a reference file, merged with what is written.
 * @param old   today's module object (a module of the Reference unit)
 * @param opts  { phonics?, existing?, record?, handFixes?, isWord?, dictionary?, seenBySpelling? }
 * @returns { mod, report, record, handFixes }
 */
export function referenceFrom(old, opts = {}) {
  const key = old.moduleKey;
  unknown(old, KNOWN, key);
  const lines = [];
  const add = (path, kind, detail) => lines.push({ module_key: key, path, kind, detail });
  const isWord = opts.isWord ?? null;
  const mark = (t, mode) => markFrench(String(t).trim(), mode, { isWord });
  if ((old.exercises || []).length) throw new Error(`${key}: a Reference page with exercises`);
  const cfg = old.exerciseConfig;
  if (cfg && !(cfg.type === 'none' && !(cfg.items || []).length)) throw new Error(`${key}: a Reference page with exerciseConfig ${cfg.type}`);

  const fresh = { title: mark(old.title, 'segments'), description: mark(old.description ?? '', 'quoted') };
  const caps = (old.emailMetadata?.capabilities || []).filter(isStr);
  if (caps.length) fresh.can_do = caps.map((c) => mark(c, 'quoted'));
  for (const f of ['realWorldUse', 'milestone', 'nextModuleTeaser', 'isUnitCompletion', 'utilityScore'])
    if (old.emailMetadata?.[f] !== undefined) add(`emailMetadata.${f}`, 'dropped_field', `${JSON.stringify(old.emailMetadata[f])} (no field; a Reference page has no next module)`);
  if (isStr(old.id)) add('id', 'dropped_field', `"${old.id}" (today's page slug; the module_key names the page)`);

  let freshSections;
  let sectionSources;
  if (old.isPhonicsReference) {
    if (!opts.phonics) throw new Error(`${key}: isPhonicsReference needs src/data/frenchPhonics.js (opts.phonics)`);
    freshSections = sectionsFromPhonics(opts.phonics);
    sectionSources = opts.phonics.flatMap((c) => c.patterns.map((p) => ({ category: c.category, ...p })));
    add('isPhonicsReference', 'text_changed', `the page's spelling patterns (src/data/frenchPhonics.js, ${freshSections.length} sounds) are written out as its sections`);
    add('sections', 'dropped_field', `${opts.phonics.length} category icons (emoji; no field)`);
  } else {
    freshSections = (old.concepts || []).map((c) => sectionFromConcept(c, { isWord }));
    sectionSources = old.concepts || [];
  }
  if (cfg?.type === 'none') {
    fresh.screen = 'pronunciation-test';
    add('screen', 'text_changed', 'a word list to say aloud (exerciseConfig type "none"): screen pronunciation-test');
  }

  const m = createMerger({ existing: opts.existing, record: opts.record, handFixes: opts.handFixes, add });
  const mod = { schema: MODULE_SCHEMA, module_key: key, kind: 'reference', status: 'written' };
  const fields = {};
  const sources = { title: old.title, description: old.description, can_do: old.emailMetadata?.capabilities ?? null, screen: cfg?.type ?? null };
  for (const f of ['title', 'description', 'can_do']) mergeField(m, f, fresh[f], sources[f], { mod, outFields: fields });
  mergeDeclared(m, opts.declaration, 'teaches', { mod, outFields: fields });
  const v = mergeVocabulary(m, old.vocabularyReference || [], { key, seenBySpelling: opts.seenBySpelling ?? new Map(), dictionary: opts.dictionary ?? new Map(), add });
  if (v.vocab.length) mod.vocabulary = v.vocab;
  const sections = mergeList(
    m,
    'sections',
    freshSections.map((s, i) => ({ value: s, src: sectionSources[i], idBase: old.isPhonicsReference ? soundId(sectionSources[i].sound) : null })),
    { keyOf: (s) => normText(unmark(s.heading)), makeId: (s, taken, f) => (f.idBase ? freeId(f.idBase, taken) : sectionId(s.heading, taken)), add },
  );
  if (sections.list.length) mod.sections = sections.list;
  if (m.ex?.tables !== undefined) mod.tables = clone(m.ex.tables);
  mergeField(m, 'screen', fresh.screen, sources.screen, { mod, outFields: fields });

  // What the source says, unmerged, so a position word fixed by hand is still listed, marked "(fixed by hand)".
  const freshMod = { ...mod, ...fresh, vocabulary: sourceCards(old.vocabularyReference), sections: freshSections.map((s, i) => ({ id: `s${i}`, ...s })) };
  finishReport(m, lines, add, moduleTexts(freshMod, {}), hasPositionWord);
  return {
    mod,
    report: lines,
    record: { fields: sortKeys(fields), vocabulary: v.record, lists: { sections: sections.record } },
    handFixes: sortKeys(m.outFixes),
  };
}
