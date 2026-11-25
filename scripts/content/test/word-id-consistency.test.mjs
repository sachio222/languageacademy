// One word_id, one word (final review I5): a word_id names the same French wherever it is taught, so L's misses,
// review queue and word cards never mix two words. Checked course-wide when the course loads.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { assembleCourse } from '../assemble.mjs';
import { loadCourse } from '../load.mjs';
import { miniOutline, miniFiles, OUTLINE_FILE } from './mini-fixture.mjs';

// The mini course with one card added to a module's table: the reading (reading-cafe, after the être lesson) or the
// alphabet Reference page (on the shelf, after every unit).
function withCard(card, key = 'reading-cafe') {
  return miniFiles().map((f) => {
    if (!f.file.endsWith(`/${key}.json`)) return f;
    const m = JSON.parse(f.text);
    m.vocabulary = [...(m.vocabulary || []), card];
    return { file: f.file, json: m };
  });
}
const withReadingCard = (card) => withCard(card);
const load = (files) => {
  try {
    return { course: assembleCourse(miniOutline(), files, { outlineFile: OUTLINE_FILE }) };
  } catch (e) {
    return { error: e };
  }
};

test("a word_id taught earlier for another word is word_id_conflict (the reviewer's la lune / je-suis-fr probe)", () => {
  const { error } = load(withReadingCard({ word_id: 'je-suis-fr', fr: 'la lune', gloss: 'the moon' }));
  assert.ok(error, 'the course loaded');
  const p = error.problems.filter((x) => x.code === 'word_id_conflict');
  assert.equal(p.length, 1, error.message);
  assert.equal(p[0].file, 'mini/modules/reading-cafe.json');
  assert.equal(p[0].path, 'vocabulary[2].word_id');
  assert.match(p[0].message, /je suis/);
});

test('the same word again, with or without its article, end mark or capital, keeps its word_id', () => {
  for (const fr of ['Je suis', 'je suis !', 'je suis']) {
    const { course, error } = load(withReadingCard({ word_id: 'je-suis-fr', fr, gloss: 'I am' }));
    assert.equal(error, undefined, `${fr}: ${error?.message}`);
    assert.deepEqual(course.warnings.filter((w) => w.code.startsWith('word_id')), [], fr);
  }
  // "un café" in the reading, "le café" on the shelf: one word.
  const shelf = load(withCard({ word_id: 'cafe-fr', fr: 'le café', gloss: 'the coffee' }, '2024-04-01-alphabet'));
  assert.equal(shelf.error, undefined, shelf.error?.message);
  assert.deepEqual(shelf.course.warnings.filter((w) => w.code.startsWith('word_id')), []);
});

test('a spelling taught before under another id, with no sense suffix, is a warning', () => {
  const { course, error } = load(withReadingCard({ word_id: 'suis-fr', fr: 'je suis', gloss: 'I am' }));
  assert.equal(error, undefined, error?.message);
  const w = course.warnings.filter((x) => x.code === 'word_id_unsuffixed');
  assert.equal(w.length, 1);
  assert.match(w[0].message, /je-suis-fr/);
  // A sense suffix says it is another meaning on purpose.
  const sense = load(withReadingCard({ word_id: 'je-suis-fr.follow', fr: 'je suis', gloss: 'I follow' }));
  assert.equal(sense.error, undefined, sense.error?.message);
  assert.deepEqual(sense.course.warnings.filter((x) => x.code.startsWith('word_id')), []);
});

test('the real course has no word_id conflict and no unsuffixed respelling', () => {
  const course = loadCourse();
  assert.deepEqual(course.warnings.filter((w) => w.code.startsWith('word_id')), []);
});
