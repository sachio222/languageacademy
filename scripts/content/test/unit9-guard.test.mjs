// Guard: the Unit 9 gap-fill exercises (type "fillblank", authored with `answer`) must be passable
// in the app. The app's checker reads `expectedAnswer`; the builder maps `answer` onto it
// (src/lessons/moduleBuilder.js, normalizeExercise). This test types each authored answer into the
// app's own checker (src/lessons/testRunner.js) against the exercise as lessonData.js exports it.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import '../vite-shim.mjs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');

const imp = (p) => import(pathToFileURL(path.join(repo, p)).href);
const { unitConfigs } = await imp('src/lessons/unitConfigLoader.js');
const { runTests, isExerciseComplete } = await imp('src/lessons/testRunner.js');
const { lessons } = await imp('src/lessons/lessonData.js');

const EXPECTED_MODULES = 11;
const EXPECTED_EXERCISES = 195;

test('unit9 fillblank exercises pass with their authored answer', () => {
  // The modules whose authored exercises are type "fillblank" (spec section 6: the 11 Unit 9 lessons).
  const keys = [];
  for (const u of unitConfigs) {
    for (const m of u.modules) {
      if ((m.exercises ?? []).some((e) => e.type === 'fillblank')) keys.push(m.moduleKey);
    }
  }
  assert.equal(keys.length, EXPECTED_MODULES, `fillblank modules: ${keys.join(', ')}`);

  let total = 0;
  const failures = [];
  for (const key of keys) {
    const lesson = lessons.find((l) => l.moduleKey === key);
    assert.ok(lesson, `no built lesson for ${key}`);
    for (const ex of lesson.exercises.filter((e) => e.type === 'fillblank')) {
      total += 1;
      // runTests().passed is a count of passed checks; the app's pass decision is isExerciseComplete.
      if (!isExerciseComplete(runTests(ex, ex.answer))) failures.push(ex.id);
    }
  }
  assert.equal(total, EXPECTED_EXERCISES);
  assert.deepEqual(failures, [], `${failures.length} of ${total} fillblank exercises fail with their authored answer`);
});
