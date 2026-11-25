// Outline validation (spec 5.1): content/fr/course.json against the module files. Pure: no file access.
import { problem } from './problems.mjs';
import { MODULE_KEY_PATTERN, hasPositionWord } from './schema/module.mjs';

export const OUTLINE_SCHEMA = 'la-course@1';
export const UNIT_KEY_PATTERN = /^unit[0-9]+$/;

const OUTLINE_FIELDS = ['schema', 'language', 'native', 'units', 'shelf', 'retired'];
const UNIT_FIELDS = ['unit_key', 'name', 'description', 'can_do', 'can_do_short', 'can_do_example_fr', 'theme', 'entries'];
// Required once a unit holds a written module; a unit of planned modules needs only its key and name.
const UNIT_TEXT_FIELDS = ['description', 'can_do', 'can_do_short', 'can_do_example_fr'];
const SHELF_FIELDS = ['pages', 'opens_words'];
const RETIRED_FIELDS = ['module_key', 'reason', 'replaced_by'];

const isStr = (v) => typeof v === 'string' && v.trim() !== '';
const isObj = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);

// modulesByKey: module_key -> parsed module JSON, or null for a file that exists but could not be read.
export function validateOutline(outline, modulesByKey, { file = 'course.json' } = {}) {
  const ps = [];
  const bad = (path, code, msg) => ps.push(problem(file, path, code, msg));
  if (!isObj(outline)) {
    bad('', 'field_type', 'course.json holds one JSON object');
    return ps;
  }
  if (outline.schema !== OUTLINE_SCHEMA) bad('schema', 'schema_invalid', `schema must be ${OUTLINE_SCHEMA}`);
  for (const k of Object.keys(outline)) if (!OUTLINE_FIELDS.includes(k)) bad(k, 'field_unknown', `${k} is not a field of the outline`);
  for (const k of ['language', 'native']) {
    if (outline[k] === undefined) bad(k, 'field_missing', `the outline needs ${k}`);
    else if (!isStr(outline[k])) bad(k, 'field_type', `${k} must be a language code`);
  }

  const listedAt = new Map(); // module_key -> path of its one listing
  const list = (key, path) => {
    if (typeof key !== 'string' || !MODULE_KEY_PATTERN.test(key)) {
      bad(path, 'module_key_invalid', `${JSON.stringify(key)} is not a module key`);
      return false;
    }
    if (listedAt.has(key)) {
      bad(path, 'outline_duplicate', `${key} is already listed at ${listedAt.get(key)}`);
      return false;
    }
    listedAt.set(key, path);
    if (!modulesByKey.has(key)) {
      bad(path, 'outline_missing_file', `${key} is listed but modules/${key}.json does not exist`);
      return false;
    }
    return true;
  };

  // Units.
  if (outline.units === undefined) bad('units', 'field_missing', 'the outline needs units');
  else if (!Array.isArray(outline.units)) bad('units', 'field_type', 'units must be a list');
  else {
    const unitKeys = new Set();
    outline.units.forEach((u, i) => {
      const p = `units[${i}]`;
      if (!isObj(u)) return bad(p, 'field_type', 'a unit is an object');
      for (const k of Object.keys(u)) if (!UNIT_FIELDS.includes(k)) bad(`${p}.${k}`, 'field_unknown', `${k} is not a field of a unit`);
      if (typeof u.unit_key !== 'string' || !UNIT_KEY_PATTERN.test(u.unit_key)) bad(`${p}.unit_key`, 'unit_key_invalid', `unit_key must match ${UNIT_KEY_PATTERN}`);
      else if (unitKeys.has(u.unit_key)) bad(`${p}.unit_key`, 'unit_duplicate', `${u.unit_key} is used by an earlier unit`);
      else unitKeys.add(u.unit_key);
      if (u.name === undefined) bad(`${p}.name`, 'field_missing', 'a unit needs a name');
      else if (!isStr(u.name)) bad(`${p}.name`, 'field_type', 'name must be a non-empty string');

      const entries = Array.isArray(u.entries) ? u.entries : [];
      const written = entries.some((k) => modulesByKey.get(k)?.status === 'written');
      for (const k of UNIT_TEXT_FIELDS) {
        if (u[k] === undefined) {
          if (written) bad(`${p}.${k}`, 'field_missing', `a unit with written modules needs ${k}`);
        } else if (!isStr(u[k])) bad(`${p}.${k}`, 'field_type', `${k} must be a non-empty string`);
      }
      if (u.theme !== undefined) {
        if (!isObj(u.theme)) bad(`${p}.theme`, 'field_type', 'theme is { icon, color }');
        else
          for (const k of Object.keys(u.theme))
            if (k !== 'icon' && k !== 'color') bad(`${p}.theme.${k}`, 'field_unknown', `${k} is not a field of a theme`);
            else if (!isStr(u.theme[k])) bad(`${p}.theme.${k}`, 'field_type', `${k} must be a non-empty string`);
      }
      for (const k of ['name', ...UNIT_TEXT_FIELDS])
        if (isStr(u[k]) && hasPositionWord(u[k])) bad(`${p}.${k}`, 'position_word', `${p}.${k} names a position ("${u[k]}")`);

      if (u.entries === undefined) bad(`${p}.entries`, 'field_missing', 'a unit lists its entries');
      else if (!Array.isArray(u.entries)) bad(`${p}.entries`, 'field_type', 'entries must be a list of module keys');
      else if (u.entries.length === 0) bad(`${p}.entries`, 'unit_empty', `${u.unit_key} has no entries`);
      else
        u.entries.forEach((key, j) => {
          const ep = `${p}.entries[${j}]`;
          if (list(key, ep) && modulesByKey.get(key)?.kind === 'reference')
            bad(ep, 'entry_kind_invalid', `${key} is a Reference page; list it in shelf.pages`);
        });
    });
  }

  // Reference shelf. Guides are linked automatically and are never listed here.
  let pages = [];
  if (outline.shelf === undefined) bad('shelf', 'field_missing', 'the outline needs shelf');
  else if (!isObj(outline.shelf)) bad('shelf', 'field_type', 'shelf is { pages, opens_words }');
  else {
    const shelf = outline.shelf;
    for (const k of Object.keys(shelf)) if (!SHELF_FIELDS.includes(k)) bad(`shelf.${k}`, 'field_unknown', `${k} is not a field of the shelf`);
    if (shelf.pages === undefined) bad('shelf.pages', 'field_missing', 'the shelf lists its pages');
    else if (!Array.isArray(shelf.pages)) bad('shelf.pages', 'field_type', 'shelf.pages must be a list of module keys');
    else {
      pages = shelf.pages;
      pages.forEach((key, j) => {
        const sp = `shelf.pages[${j}]`;
        const kind = modulesByKey.get(key)?.kind;
        // A guide here is usually also in its unit; name the rule, not the duplicate.
        if (kind === 'guide') return bad(sp, 'shelf_guide_listed', `${key} is a guide; guides appear on the shelf by themselves`);
        if (!list(key, sp)) return;
        if (kind !== undefined && kind !== 'reference') bad(sp, 'shelf_kind_invalid', `${key} is a ${kind}; shelf.pages lists Reference pages only`);
      });
    }
    if (shelf.opens_words !== undefined) {
      if (!Array.isArray(shelf.opens_words)) bad('shelf.opens_words', 'field_type', 'opens_words must be a list of module keys');
      else
        shelf.opens_words.forEach((key, j) => {
          if (!pages.includes(key)) bad(`shelf.opens_words[${j}]`, 'shelf_opens_words_unknown', `${key} is not a page in shelf.pages`);
        });
    }
  }

  // Retired keys. The registry is the outline plus retired; no key is ever used twice.
  const retired = new Set();
  if (outline.retired !== undefined) {
    if (!Array.isArray(outline.retired)) bad('retired', 'field_type', 'retired must be a list');
    else
      outline.retired.forEach((r, i) => {
        const p = `retired[${i}]`;
        if (!isObj(r)) return bad(p, 'field_type', 'a retired entry is { module_key, reason, replaced_by? }');
        for (const k of Object.keys(r)) if (!RETIRED_FIELDS.includes(k)) bad(`${p}.${k}`, 'field_unknown', `${k} is not a field of a retired entry`);
        if (r.reason === undefined) bad(`${p}.reason`, 'field_missing', 'a retired key needs a reason');
        else if (!isStr(r.reason)) bad(`${p}.reason`, 'field_type', 'reason must be a non-empty string');
        const key = r.module_key;
        if (typeof key !== 'string' || !MODULE_KEY_PATTERN.test(key)) return bad(`${p}.module_key`, 'module_key_invalid', `${JSON.stringify(key)} is not a module key`);
        if (retired.has(key)) bad(`${p}.module_key`, 'outline_duplicate', `${key} is retired twice`);
        else if (listedAt.has(key)) bad(`${p}.module_key`, 'outline_key_reused', `${key} is retired but listed at ${listedAt.get(key)}`);
        else if (modulesByKey.has(key)) bad(`${p}.module_key`, 'outline_key_reused', `${key} is retired but modules/${key}.json still exists`);
        retired.add(key);
        if (r.replaced_by !== undefined && !listedAt.has(r.replaced_by))
          bad(`${p}.replaced_by`, 'retired_replacement_unknown', `${r.replaced_by} is not a listed module`);
      });
  }

  // Every file is listed exactly once.
  for (const key of modulesByKey.keys())
    if (!listedAt.has(key) && !retired.has(key))
      bad('units', 'outline_missing_entry', `modules/${key}.json is listed in no unit and not in shelf.pages`);

  return ps;
}
