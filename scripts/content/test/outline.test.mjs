import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateOutline } from '../outline.mjs';
import { miniOutline, miniModule, MINI_KEYS } from './mini-fixture.mjs';

function modulesByKey() {
  return new Map(Object.values(MINI_KEYS).map((k) => [k, miniModule(k)]));
}
const run = (outline, mods = modulesByKey()) => validateOutline(outline, mods, { file: 'course.json' }).map((p) => [p.code, p.path]);

test('fixture outline is clean', () => {
  assert.deepEqual(run(miniOutline()), []);
});

test('module listed twice', () => {
  const o = miniOutline();
  o.units[2].entries.push(MINI_KEYS.lesson);
  assert.deepEqual(run(o), [['outline_duplicate', 'units[2].entries[1]']]);
});

test('file not listed', () => {
  const o = miniOutline();
  o.units[1].entries = o.units[1].entries.filter((k) => k !== MINI_KEYS.practice);
  const ps = validateOutline(o, modulesByKey(), { file: 'course.json' });
  assert.deepEqual(ps.map((p) => p.code), ['outline_missing_entry']);
  assert.match(ps[0].message, /practice-etre/);
});

test('listed but no file', () => {
  const o = miniOutline();
  o.units[0].entries.push('2024-01-04-avoir');
  assert.deepEqual(run(o), [['outline_missing_file', 'units[0].entries[2]']]);
});

test('a file that could not be read is not reported missing', () => {
  const mods = modulesByKey();
  mods.set(MINI_KEYS.practice, null);
  assert.deepEqual(run(miniOutline(), mods), []);
});

test('retired key reused', () => {
  const o = miniOutline();
  o.retired.push({ module_key: MINI_KEYS.reading, reason: 'split' });
  assert.deepEqual(run(o), [['outline_key_reused', 'retired[1].module_key']]);
});

test('guide on shelf pages', () => {
  const o = miniOutline();
  o.shelf.pages.push(MINI_KEYS.guide);
  assert.deepEqual(run(o), [['shelf_guide_listed', 'shelf.pages[1]']]);
});

test('a lesson on the shelf, a Reference page in a unit', () => {
  const o = miniOutline();
  o.units[1].entries = [MINI_KEYS.guide];
  o.units[2].entries.push(MINI_KEYS.reference);
  o.shelf.pages = [MINI_KEYS.practice];
  o.shelf.opens_words = [];
  assert.deepEqual(run(o), [
    ['entry_kind_invalid', 'units[2].entries[1]'],
    ['shelf_kind_invalid', 'shelf.pages[0]'],
  ]);
});

test('opens_words names shelf pages only', () => {
  const o = miniOutline();
  o.shelf.opens_words.push(MINI_KEYS.lesson);
  assert.deepEqual(run(o), [['shelf_opens_words_unknown', 'shelf.opens_words[1]']]);
});

test('unit keys', () => {
  const o = miniOutline();
  o.units[1].unit_key = 'Unit-2';
  o.units[2].unit_key = 'unit1';
  assert.deepEqual(run(o), [
    ['unit_key_invalid', 'units[1].unit_key'],
    ['unit_duplicate', 'units[2].unit_key'],
  ]);
});

test('unit fields: unknown, missing, empty, access never written', () => {
  const o = miniOutline();
  o.units[0].access = 'free';
  delete o.units[1].can_do_short;
  o.units.push({ unit_key: 'unit4', name: 'Later', entries: [] });
  assert.deepEqual(run(o), [
    ['field_unknown', 'units[0].access'],
    ['field_missing', 'units[1].can_do_short'],
    ['unit_empty', 'units[3].entries'],
  ]);
});

test('a unit of planned modules needs only a key and a name', () => {
  const mods = modulesByKey();
  mods.set('weather', { schema: 'la-module@1', module_key: 'weather', kind: 'lesson', status: 'planned', title: 'The weather', plan: { words: [], constructions: [], source: 'plan.json' } });
  const o = miniOutline();
  o.units.push({ unit_key: 'unit13', name: 'Weather', entries: ['weather'] });
  assert.deepEqual(run(o, mods), []);
});

test('position words in unit text', () => {
  const o = miniOutline();
  o.units[1].description = 'Builds on Unit 1.';
  assert.deepEqual(run(o), [['position_word', 'units[1].description']]);
});

test('outline schema and top-level fields', () => {
  const o = miniOutline();
  o.schema = 'la-course@2';
  o.colour = 'blue';
  assert.deepEqual(run(o), [
    ['schema_invalid', 'schema'],
    ['field_unknown', 'colour'],
  ]);
});
