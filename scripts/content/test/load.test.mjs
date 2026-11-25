import { test } from 'node:test';
import assert from 'node:assert/strict';
import { loadCourse } from '../load.mjs';
import { MINI_ROOT, MINI_KEYS, miniModule } from './mini-fixture.mjs';

const course = loadCourse({ root: MINI_ROOT });

test('course shape', () => {
  assert.equal(course.language, 'fr');
  assert.equal(course.native, 'en');
  assert.deepEqual(course.units.map((u) => u.unit_key), ['unit1', 'unit2', 'unit3']);
  assert.deepEqual(course.units.map((u) => [u.ordinal, u.index]), [[1, 1], [2, 2], [3, 3]]);
  assert.equal(course.units[0].name, 'Essentials');
  assert.equal(course.units[0].can_do_short, 'introduce yourself');
  assert.deepEqual(course.units[0].theme, { icon: 'u-essentials', color: 'unit-1' });
  assert.equal(course.modules.size, 6);
  assert.deepEqual([...course.modules.keys()], [
    MINI_KEYS.lesson, MINI_KEYS.reading, MINI_KEYS.guide, MINI_KEYS.practice, MINI_KEYS.unit_exam, MINI_KEYS.reference,
  ]);
});

test('positions count numbered units only', () => {
  const pos = course.units.flatMap((u) => u.modules.map((m) => [m.module_key, m.position, m.unit_position, m.unit_key, m.unit_index]));
  assert.deepEqual(pos, [
    [MINI_KEYS.lesson, 1, 1, 'unit1', 1],
    [MINI_KEYS.reading, 2, 2, 'unit1', 1],
    [MINI_KEYS.guide, 3, 1, 'unit2', 2],
    [MINI_KEYS.practice, 4, 2, 'unit2', 2],
    [MINI_KEYS.unit_exam, 5, 1, 'unit3', 3],
  ]);
  const page = course.shelf.pages[0];
  assert.equal(page.module_key, MINI_KEYS.reference);
  assert.equal(page.position, null);
  assert.equal(page.unit_position, null);
  assert.equal(page.display_number, null);
  assert.equal(page.unit_key, null);
  assert.equal(page.unit_index, null);
});

test('unit1 access free, others premium', () => {
  assert.deepEqual(course.units.map((u) => u.access), ['free', 'premium', 'premium']);
});

test('guides linked on shelf', () => {
  assert.deepEqual(course.shelf.guides, [MINI_KEYS.guide]);
  assert.deepEqual(course.shelf.pages.map((m) => m.module_key), [MINI_KEYS.reference]);
  assert.deepEqual(course.shelf.opens_words, [MINI_KEYS.reference]);
});

test('display_number equals position for guides', () => {
  // L (domains/curriculum.md, Numbering): display_number equals L's position, the order inside the unit,
  // for every kind, guides included. Module.position is the course-wide order the checker uses.
  for (const m of course.units.flatMap((u) => u.modules)) assert.equal(m.display_number, m.unit_position, m.module_key);
  const guide = course.modules.get(MINI_KEYS.guide);
  assert.equal(guide.display_number, 1);
  assert.equal(guide.position, 3);
});

test('modules keep their source fields and name their file', () => {
  const lesson = course.modules.get(MINI_KEYS.lesson);
  const src = miniModule(MINI_KEYS.lesson);
  assert.equal(lesson.title, src.title);
  assert.deepEqual(lesson.vocabulary, src.vocabulary);
  assert.equal(lesson.file, `scripts/content/test/fixtures/mini/modules/${MINI_KEYS.lesson}.json`);
});

test('unit exam title comes from the outline', () => {
  assert.equal(course.modules.get(MINI_KEYS.unit_exam).title, 'Unit exam · Places');
});

test('items in single-step kinds name their step', () => {
  assert.deepEqual(course.modules.get(MINI_KEYS.practice).items.map((i) => i.steps), [['practice-exercises'], ['practice-exercises']]);
  assert.deepEqual(course.modules.get(MINI_KEYS.reading).items[0].steps, ['reading-passage']);
  assert.deepEqual(course.modules.get(MINI_KEYS.unit_exam).items[0].steps, ['exam-questions']);
});

test('registry holds every key ever used', () => {
  assert.deepEqual([...course.registry].sort(), [...Object.values(MINI_KEYS), '2024-01-03-old-avoir'].sort());
  assert.deepEqual(course.retired, [{ module_key: '2024-01-03-old-avoir', reason: 'merged into the être lesson', replaced_by: '2024-01-02-etre' }]);
});
