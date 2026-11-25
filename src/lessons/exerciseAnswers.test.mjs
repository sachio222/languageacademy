// Run with: node --test src/lessons/exerciseAnswers.test.mjs (the app has no test runner).
//
// Loads every course module through the same path the app uses (unit configs ->
// buildLesson -> lessonData) and runs each exercise's own expected answer through
// runTests, the check ExercisePane and ModuleExam use. A lesson whose exercises
// have no expectedAnswer cannot be passed by any learner.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { registerHooks } from 'node:module';

// The app is bundled by Vite, so its source uses extensionless relative imports
// and import.meta.env. Teach Node both, for files under src/ only.
registerHooks({
  resolve(specifier, context, nextResolve) {
    try {
      return nextResolve(specifier, context);
    } catch (error) {
      if (!specifier.startsWith('.')) throw error;
      for (const suffix of ['.js', '.jsx', '/index.js']) {
        try {
          return nextResolve(specifier + suffix, context);
        } catch {
          // try the next suffix
        }
      }
      throw error;
    }
  },
  load(url, context, nextLoad) {
    const result = nextLoad(url, context);
    if (!url.startsWith('file:') || !url.includes('/src/')) return result;
    const source = String(result.source);
    if (!source.includes('import.meta.env')) return result;
    return {
      ...result,
      format: result.format || 'module',
      source: source.replaceAll('import.meta.env', '({ DEV: false, PROD: true, MODE: "test" })'),
    };
  },
});

const { lessons, unitStructure } = await import('./lessonData.js');
const { getModuleConfigs } = await import('./unitConfigLoader.js');
const { runTests, isExerciseComplete } = await import('./testRunner.js');

const unitOf = (lessonId) =>
  unitStructure.find((u) => lessonId >= u.lessonRange[0] && lessonId <= u.lessonRange[1])?.id;

const label = (lesson) => `Unit ${unitOf(lesson.id)} #${lesson.id} ${lesson.moduleKey}`;

test('the course builds lessons with exercises', () => {
  assert.ok(lessons.length > 100, `expected the full course, got ${lessons.length} lessons`);
  assert.ok(lessons.some((l) => l.exercises.length > 0));
});

test('every built exercise has a non-empty expectedAnswer', () => {
  const broken = [];
  for (const lesson of lessons) {
    const missing = lesson.exercises.filter(
      (ex) => typeof ex.expectedAnswer !== 'string' || ex.expectedAnswer.trim() === ''
    );
    if (missing.length) broken.push(`${label(lesson)}: ${missing.length}/${lesson.exercises.length} exercises`);
  }
  assert.deepEqual(broken, [], `exercises with no expectedAnswer:\n  ${broken.join('\n  ')}`);
});

test("every exercise passes the app's answer check with its own expected answer", () => {
  const broken = [];
  let checked = 0;
  for (const lesson of lessons) {
    const isReading = !!lesson.readingPassage;
    const failing = lesson.exercises.filter((ex) => {
      checked++;
      if (typeof ex.expectedAnswer !== 'string') return true;
      return !isExerciseComplete(runTests(ex, ex.expectedAnswer, isReading));
    });
    if (failing.length) {
      const first = failing[0];
      broken.push(
        `${label(lesson)}: ${failing.length}/${lesson.exercises.length} fail (first: ${first.id} ${JSON.stringify(first.expectedAnswer ?? first.answer)})`
      );
    }
  }
  assert.ok(checked > 1000, `expected over 1000 exercises, checked ${checked}`);
  assert.deepEqual(broken, [], `exercises whose own answer is rejected:\n  ${broken.join('\n  ')}`);
});

test('modules written as an exercises list keep their exercise count and order', () => {
  // Saved answers are keyed by exercise position (moduleKey.N), so the build must
  // never drop, add or reorder hand-written exercises.
  const configs = getModuleConfigs();
  assert.equal(configs.length, lessons.length);
  configs.forEach((config, i) => {
    if (config.exerciseConfig || !Array.isArray(config.exercises) || config.exercises.length === 0) return;
    const built = lessons[i].exercises;
    assert.equal(built.length, config.exercises.length, `${label(lessons[i])} exercise count`);
    config.exercises.forEach((source, n) => {
      assert.equal(built[n].prompt, source.prompt, `${label(lessons[i])} exercise ${n + 1} order`);
      assert.equal(built[n].id, `${config.moduleKey}.${n + 1}`);
    });
  });
});

test('a lesson with an unanswerable exercise is reported through the logger', async () => {
  const { reportExercisesWithoutAnswer } = await import('./moduleBuilder.js');
  const logged = [];
  const fakeLogger = { error: (...args) => logged.push(args.join(' ')) };
  const broken = [
    { id: 1, moduleKey: 'ok-module', exercises: [{ id: 'ok-module.1', expectedAnswer: 'oui' }] },
    {
      id: 2,
      moduleKey: 'broken-module',
      exercises: [
        { id: 'broken-module.1', expectedAnswer: 'non' },
        { id: 'broken-module.2', answer: 'peut-être' },
        { id: 'broken-module.3', expectedAnswer: '  ' },
      ],
    },
  ];
  const problems = reportExercisesWithoutAnswer(broken, fakeLogger);
  assert.deepEqual(problems, [
    { lessonId: 2, moduleKey: 'broken-module', missing: 2, total: 3, exerciseIds: ['broken-module.2', 'broken-module.3'] },
  ]);
  assert.equal(logged.length, 1);
  assert.match(logged[0], /broken-module/);
  assert.match(logged[0], /2 of 3/);

  logged.length = 0;
  assert.deepEqual(reportExercisesWithoutAnswer(lessons, fakeLogger), []);
  assert.equal(logged.length, 0, 'the real course logs nothing');
});

test('a legacy exercise ({ answer, wrongAnswers: [{ answer, feedback }] }) builds into one the app can check', async () => {
  const { buildLesson } = await import('./moduleBuilder.js');
  const lesson = buildLesson({
    moduleKey: 'legacy-shape',
    title: 'Legacy',
    exercises: [
      {
        type: 'fillblank',
        prompt: 'Complete: Je mange ___ j\'ai faim',
        answer: 'parce que',
        wrongAnswers: [{ answer: 'car', feedback: "'parce que' is more natural here." }],
      },
    ],
  });
  const [ex] = lesson.exercises;
  assert.equal(ex.expectedAnswer, 'parce que');
  assert.ok(isExerciseComplete(runTests(ex, 'parce que')));
  const wrong = runTests(ex, 'car');
  assert.ok(!isExerciseComplete(wrong));
  assert.equal(wrong.testResults[0].message, "✗ 'parce que' is more natural here.");
});
