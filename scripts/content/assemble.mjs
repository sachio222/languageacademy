// assembleCourse: outline + module files -> Course (spec 7). Pure: no fs, so Vite can import it.
// Collects every problem from every file before throwing one ContentError.
import { problem, ContentError, isWarning } from './problems.mjs';
import { validateModule, defaultSteps } from './schema/module.mjs';
import { validateOutline } from './outline.mjs';
import { checkItemPassable } from './passable.mjs';

// Unit 1 is free; every other unit is Premium (spec 5.1, L rule LRN-4). Never written in a file.
export const FREE_UNIT_KEY = 'unit1';
export const accessFor = (unitKey) => (unitKey === FREE_UNIT_KEY ? 'free' : 'premium');

const isObj = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);
const keyOfFile = (file) => file.replace(/^.*[\\/]/, '').replace(/\.json$/, '');

/**
 * @param outline  parsed course.json
 * @param files    Array<{ file, json }> or Array<{ file, text }>; a file is named <module_key>.json.
 *                 An entry with a `json` key is taken as parsed, whatever its value.
 * @param opts     { outlineFile?: string, checkAnswer?: (item, typed) => boolean, graphIds?: { constructions, words } }
 *                 checkAnswer(item, typed, { blank? }) runs every declared answer of every well-formed item
 *                 through the app's checker (item_unpassable, mistake_accepted; spec 5.4). Omitted: nothing is checked.
 *                 graphIds (Sets of graph ids) checks the ids in teaches and tests (construction_unknown, word_unknown).
 */
export function assembleCourse(outline, files, opts = {}) {
  const outlineFile = opts.outlineFile || 'course.json';
  const problems = [];

  // module_key -> { file, json, parsed }. parsed is false only when the text is not JSON; a file whose JSON
  // is null or any other non-object is parsed and goes to validateModule, which reports field_type at ''.
  const sources = new Map();
  for (const f of files) {
    let json = f.json;
    let parsed = true;
    if (!('json' in f)) {
      try {
        json = JSON.parse(f.text);
      } catch (e) {
        problems.push(problem(f.file, '', 'json_invalid', `not valid JSON: ${e.message}`));
        json = undefined;
        parsed = false;
      }
    }
    const key = keyOfFile(f.file);
    if (sources.has(key)) {
      problems.push(problem(f.file, '', 'module_duplicate', `${key} already comes from ${sources.get(key).file}`));
      continue;
    }
    sources.set(key, { file: f.file, json, parsed });
  }

  const unitIndexOf = unitIndexes(outline);
  for (const [key, { file, json, parsed }] of sources) {
    if (!parsed) continue;
    if (isObj(json) && typeof json.module_key === 'string' && json.module_key !== key)
      problems.push(problem(file, 'module_key', 'module_key_mismatch', `module_key ${json.module_key} does not match the file name ${key}.json`));
    const own = validateModule(json, { file, unitIndex: unitIndexOf.get(key) ?? null, graphIds: opts.graphIds ?? null });
    problems.push(...own);
    // Only a module whose items are well formed can have its answers checked; a warning does not stop it.
    if (opts.checkAnswer && !own.some((p) => !isWarning(p)) && isObj(json) && Array.isArray(json.items))
      json.items.forEach((item, i) => problems.push(...checkItemPassable(item, opts.checkAnswer, { file, path: `items[${i}]` })));
  }

  // The outline sees a usable module object, or null for a file that exists but holds none (unparseable
  // or not an object; already reported above).
  const modulesByKey = new Map([...sources].map(([k, s]) => [k, s.parsed && isObj(s.json) ? s.json : null]));
  problems.push(...validateOutline(outline, modulesByKey, { file: outlineFile }));

  // Warnings never stop a load: the course carries them, and so does an error thrown for other problems.
  const warnings = problems.filter(isWarning);
  const errors = problems.filter((p) => !isWarning(p));
  if (errors.length) throw new ContentError(errors, warnings);
  return Object.assign(build(outline, sources), { warnings });
}

/**
 * The written course only: every planned module (status planned, a course plan stub) taken out of the files and the
 * outline, and units left empty dropped. A file that is not JSON is kept, so assembleCourse still reports it.
 * @param outline parsed course.json; files Array<{ file, json }> or Array<{ file, text }>
 * @returns { outline, files }
 */
export function withoutPlanned(outline, files) {
  const parsed = (f) => {
    if ('json' in f) return f.json;
    try {
      return JSON.parse(f.text);
    } catch {
      return null;
    }
  };
  const planned = new Set(files.filter((f) => parsed(f)?.status === 'planned').map((f) => keyOfFile(f.file)));
  const out = structuredClone(outline);
  if (isObj(out) && Array.isArray(out.units))
    out.units = out.units
      .map((u) => (isObj(u) && Array.isArray(u.entries) ? { ...u, entries: u.entries.filter((k) => !planned.has(k)) } : u))
      .filter((u) => !isObj(u) || !Array.isArray(u.entries) || u.entries.length > 0);
  return { outline: out, files: files.filter((f) => !planned.has(keyOfFile(f.file))) };
}

// module_key -> 1-based unit index, from the first listing (the outline check reports any second one).
function unitIndexes(outline) {
  const out = new Map();
  if (!isObj(outline) || !Array.isArray(outline.units)) return out;
  outline.units.forEach((u, i) => {
    if (isObj(u) && Array.isArray(u.entries)) for (const k of u.entries) if (!out.has(k)) out.set(k, i + 1);
  });
  return out;
}

function toModule(src, place, unit) {
  const m = structuredClone(src.json);
  if (Array.isArray(m.items)) m.items = m.items.map((item) => ({ ...item, steps: defaultSteps(item, m.kind) }));
  if (m.kind === 'unit_exam' && m.title === undefined && unit) m.title = `Unit exam · ${unit.name}`;
  return Object.assign(m, place, { file: src.file });
}

const NO_PLACE = { position: null, unit_position: null, display_number: null, unit_key: null, unit_index: null };

function build(outline, sources) {
  const modules = new Map();
  let position = 0;
  const units = outline.units.map((u, i) => {
    const index = i + 1;
    const unitModules = u.entries.map((key, j) => {
      position += 1;
      // position: course-wide order across units (the checker's taught-before order).
      // unit_position: L's position, the order inside the unit, guides included; display_number equals it.
      const place = { position, unit_position: j + 1, display_number: j + 1, unit_key: u.unit_key, unit_index: index };
      const m = toModule(sources.get(key), place, u);
      modules.set(key, m);
      return m;
    });
    return {
      unit_key: u.unit_key,
      ordinal: index,
      index,
      name: u.name,
      description: u.description ?? null,
      can_do: u.can_do ?? null,
      can_do_short: u.can_do_short ?? null,
      can_do_example_fr: u.can_do_example_fr ?? null,
      theme: u.theme ? { ...u.theme } : null,
      access: accessFor(u.unit_key),
      modules: unitModules,
    };
  });

  const pages = outline.shelf.pages.map((key) => {
    const m = toModule(sources.get(key), NO_PLACE, null);
    modules.set(key, m);
    return m;
  });
  const guides = units.flatMap((u) => u.modules).filter((m) => m.kind === 'guide').map((m) => m.module_key);
  const retired = (outline.retired || []).map((r) => ({ ...r }));

  return {
    language: outline.language,
    native: outline.native,
    units,
    shelf: { pages, guides, opens_words: [...(outline.shelf.opens_words || [])] },
    modules,
    registry: new Set([...modules.keys(), ...retired.map((r) => r.module_key)]),
    retired,
  };
}
