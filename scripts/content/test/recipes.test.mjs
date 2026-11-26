// Recipes for the five module kinds and the time constants (unit-prep design §6, §7.1): one data file each in
// content/fr/recipes/, validated by plain JavaScript.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { CONTENT_ROOT } from '../load.mjs';
import { ContentError } from '../problems.mjs';
import { RECIPE_KINDS, loadRecipes } from '../prep/recipes.mjs';
import { validateRecipe, validateTime } from '../schema/recipe.mjs';

const copyRecipes = () => {
  const dir = mkdtempSync(join(tmpdir(), 'la-recipes-'));
  cpSync(join(CONTENT_ROOT, 'recipes'), join(dir, 'recipes'), { recursive: true });
  return dir;
};
const editJson = (file, edit) => {
  const doc = JSON.parse(readFileSync(file, 'utf8'));
  edit(doc);
  writeFileSync(file, JSON.stringify(doc, null, 2));
};

test('the five recipes and time.json load', () => {
  const r = loadRecipes();
  assert.deepEqual([...r.byKind.keys()].sort(), [...RECIPE_KINDS].sort());
  for (const kind of RECIPE_KINDS) assert.equal(r.byKind.get(kind).kind, kind);
  assert.match(r.sha256, /^[0-9a-f]{64}$/);
  assert.equal(loadRecipes().sha256, r.sha256, 'the hash is stable');
});

test('the working numbers are the ones the controller set', () => {
  const r = loadRecipes();
  const lesson = r.byKind.get('lesson');
  assert.equal(lesson.size.new_words.max, 12);
  assert.deepEqual(lesson.size.items, { min: 12, max: 20 });
  const exam = r.byKind.get('unit_exam');
  assert.equal(exam.blueprint.items_per_goal, 3);
  assert.equal(exam.size.cap_items, 30);
  assert.equal(exam.size.cap_minutes, 25);
  assert.deepEqual(r.byKind.get('practice').size.items, { min: 16, max: 24 });
  assert.equal(r.byKind.get('reading').size.new_words.max, 10);
});

test('the lesson recipe says a new word is met in a sentence of known words and then carries the next one', () => {
  const lesson = loadRecipes().byKind.get('lesson');
  const rules = lesson.drafter_rules.join(' ');
  assert.match(rules, /sentence made of words the learner already knows/);
  assert.match(rules, /carry the next new word/);
  assert.ok(lesson.skeleton.some((p) => p.part === 'vocabulary' && /known words/.test(p.rule)));
});

test('an unknown field is refused', () => {
  const dir = copyRecipes();
  try {
    editJson(join(dir, 'recipes', 'lesson.json'), (d) => { d.colour = 'blue'; });
    assert.throws(() => loadRecipes(dir), (e) => e instanceof ContentError && e.problems.some((p) => p.code === 'recipe_field_unknown'));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('a constant with no basis is refused', () => {
  const dir = copyRecipes();
  try {
    editJson(join(dir, 'recipes', 'time.json'), (d) => { delete d.steps['flash-cards'].s_per_word_pass.basis; });
    assert.throws(() => loadRecipes(dir), (e) => e instanceof ContentError && e.problems.some((p) => p.code === 'recipe_basis_missing'));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('a recipe number with no basis entry, a wrong kind and a min above its max are refused', () => {
  const lesson = JSON.parse(readFileSync(join(CONTENT_ROOT, 'recipes', 'lesson.json'), 'utf8'));
  const codes = (doc) => validateRecipe(doc, 'lesson.json', 'lesson').map((p) => p.code);
  assert.deepEqual(codes(lesson), []);
  assert.ok(codes({ ...lesson, kind: 'quiz' }).includes('recipe_kind'));
  assert.ok(codes({ ...lesson, size: { ...lesson.size, items: { min: 30, max: 20 } } }).includes('recipe_range'));
  const noBasis = structuredClone(lesson);
  delete noBasis.basis['size.items'];
  assert.ok(codes(noBasis).includes('recipe_basis_missing'));
  const time = JSON.parse(readFileSync(join(CONTENT_ROOT, 'recipes', 'time.json'), 'utf8'));
  assert.deepEqual(validateTime(time, 'time.json').map((p) => p.code), []);
});
