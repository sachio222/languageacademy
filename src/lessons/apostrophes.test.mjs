// Run with: node --test src/lessons/apostrophes.test.mjs
// iPhone and Mac keyboards type a curly apostrophe; the stored answers use a straight one.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { registerHooks } from 'node:module';

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
});

const { checkAnswer } = await import('../linter/frenchLinter.js');
const { runTests, isExerciseComplete } = await import('./testRunner.js');

const CURLY = ['’', '‘', 'ʼ'];

for (const mark of CURLY) {
  const code = 'U+' + mark.codePointAt(0).toString(16).toUpperCase().padStart(4, '0');

  test(`checkAnswer: ${code} typed against a straight-apostrophe answer passes`, () => {
    assert.equal(checkAnswer(`j${mark}ai`, "j'ai").isMatch, true);
    assert.equal(checkAnswer(`c${mark}est`, "c'est").isMatch, true);
    assert.equal(checkAnswer(`J${mark}ai faim.`, "j'ai faim").isMatch, true);
  });

  test(`checkAnswer: straight apostrophe typed against a ${code} answer passes`, () => {
    assert.equal(checkAnswer("j'ai", `j${mark}ai`).isMatch, true);
    assert.equal(checkAnswer("c'est", `c${mark}est`).isMatch, true);
  });

  test(`runTests: ${code} passes as expectedAnswer and as an acceptable answer`, () => {
    const viaExpected = { expectedAnswer: "j'ai", tests: [] };
    assert.equal(isExerciseComplete(runTests(viaExpected, `j${mark}ai`, false)), true);
    const reverse = { expectedAnswer: `c${mark}est`, tests: [] };
    assert.equal(isExerciseComplete(runTests(reverse, "c'est", false)), true);
    const viaAccept = { expectedAnswer: 'je mange', acceptableAnswers: [`j${mark}ai`], tests: [] };
    assert.equal(isExerciseComplete(runTests(viaAccept, "j'ai", false)), true);
  });
}

test('FillInTheBlank blank: curly typed against blank.answer passes (it calls checkAnswer directly)', () => {
  assert.equal(checkAnswer('l’eau', "l'eau").isMatch, true);
});

test('a genuinely wrong answer still fails', () => {
  assert.equal(checkAnswer('j’ai', "c'est").isMatch, false);
  assert.equal(checkAnswer('jai', "j'ai").isMatch, true); // existing behaviour: apostrophe is dropped
  assert.equal(checkAnswer('j’aime', "j'ai").isMatch, false);
});

test('existing punctuation and accent behaviour is unchanged', () => {
  const r = checkAnswer('je suis fatigue!!', 'je suis fatigué');
  assert.equal(r.isMatch, true);
  assert.equal(checkAnswer('Je suis fatigué.', 'je suis fatigué').isMatch, true);
});
