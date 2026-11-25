// Spec 9.1: broken inputs each throw ContentError naming the broken file and the field.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { assembleCourse } from '../assemble.mjs';
import { ContentError } from '../problems.mjs';
import { miniOutline, miniFiles, MINI_KEYS, OUTLINE_FILE } from './mini-fixture.mjs';

const fileOf = (key) => `mini/modules/${key}.json`;

function fails(change) {
  const outline = miniOutline();
  let files = miniFiles();
  files = change(outline, files) || files;
  try {
    assembleCourse(outline, files, { outlineFile: OUTLINE_FILE });
  } catch (e) {
    assert.ok(e instanceof ContentError, `expected ContentError, got ${e}`);
    return e.problems;
  }
  assert.fail('expected ContentError');
}

function editText(files, key, fn) {
  const f = files.find((x) => x.file === fileOf(key));
  f.text = fn(f.text);
}
function editJson(files, key, fn) {
  editText(files, key, (t) => {
    const j = JSON.parse(t);
    fn(j);
    return JSON.stringify(j);
  });
}

test('the fixture assembles', () => {
  assert.equal(assembleCourse(miniOutline(), miniFiles(), { outlineFile: OUTLINE_FILE }).modules.size, 6);
});

test('truncated JSON', () => {
  const ps = fails((_, files) => editText(files, MINI_KEYS.reading, (t) => t.slice(0, Math.floor(t.length / 2))));
  assert.equal(ps[0].file, fileOf(MINI_KEYS.reading));
  assert.equal(ps[0].path, '');
  assert.equal(ps[0].code, 'json_invalid');
  assert.equal(ps.length, 1, 'a broken file is not also reported missing from the outline');
});

test('unknown field', () => {
  const ps = fails((_, files) => editJson(files, MINI_KEYS.practice, (j) => { j.colour = 'blue'; }));
  assert.deepEqual([ps[0].file, ps[0].path, ps[0].code], [fileOf(MINI_KEYS.practice), 'colour', 'field_unknown']);
});

test('duplicate item id', () => {
  const ps = fails((_, files) => editJson(files, MINI_KEYS.unit_exam, (j) => { j.items[2].id = j.items[0].id; }));
  assert.deepEqual([ps[0].file, ps[0].path, ps[0].code], [fileOf(MINI_KEYS.unit_exam), 'items[2].id', 'id_duplicate']);
});

test('module listed twice', () => {
  const ps = fails((o) => { o.units[1].entries.push(MINI_KEYS.reading); });
  assert.deepEqual([ps[0].file, ps[0].path, ps[0].code], [OUTLINE_FILE, 'units[1].entries[2]', 'outline_duplicate']);
});

test('missing file', () => {
  const ps = fails((_, files) => files.filter((f) => f.file !== fileOf(MINI_KEYS.practice)));
  assert.deepEqual([ps[0].file, ps[0].path, ps[0].code], [OUTLINE_FILE, 'units[1].entries[1]', 'outline_missing_file']);
});

test('stray brace', () => {
  const ps = fails((_, files) => editJson(files, MINI_KEYS.lesson, (j) => { j.title = 'Essential Verb · {être (to be)'; }));
  assert.deepEqual([ps[0].file, ps[0].path, ps[0].code], [fileOf(MINI_KEYS.lesson), 'title', 'span_unclosed']);
});

test('file name and module_key disagree', () => {
  const ps = fails((_, files) => editJson(files, MINI_KEYS.practice, (j) => { j.module_key = 'practice-avoir'; }));
  assert.deepEqual([ps[0].file, ps[0].path, ps[0].code], [fileOf(MINI_KEYS.practice), 'module_key', 'module_key_mismatch']);
});

test('every problem is collected before throwing', () => {
  const ps = fails((o, files) => {
    editJson(files, MINI_KEYS.practice, (j) => { j.colour = 'blue'; });
    editJson(files, MINI_KEYS.lesson, (j) => { j.access = 'free'; });
    o.units[0].entries.push('2024-01-04-avoir');
  });
  assert.deepEqual(ps.map((p) => p.code).sort(), ['field_unknown', 'field_unknown', 'outline_missing_file']);
});

test('a module file holding null', () => {
  const ps = fails((_, files) => editText(files, MINI_KEYS.practice, () => 'null'));
  assert.deepEqual(ps.map((p) => [p.file, p.path, p.code]), [[fileOf(MINI_KEYS.practice), '', 'field_type']]);
});

test('a parsed module that is null or not an object', () => {
  for (const bad of [null, 7, 'practice', []]) {
    const ps = fails((_, files) => files.map((f) => (f.file === fileOf(MINI_KEYS.practice) ? { file: f.file, json: bad } : f)));
    assert.deepEqual(ps.map((p) => [p.file, p.path, p.code]), [[fileOf(MINI_KEYS.practice), '', 'field_type']], JSON.stringify(bad));
  }
});

test('assembleCourse leaves its input untouched', () => {
  const outline = miniOutline();
  const files = miniFiles().map((f) => ({ file: f.file, json: JSON.parse(f.text) }));
  const before = JSON.stringify({ outline, files });
  assembleCourse(outline, files, { outlineFile: OUTLINE_FILE });
  assert.equal(JSON.stringify({ outline, files }), before);
});
