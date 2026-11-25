// Task 7: Reference shelf pages converted to module files (spec 5.9, 6).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { referenceFrom } from '../migrate/reference.mjs';
import { liveIdMatch } from '../migrate/live-ids.mjs';
import { todaysModules, frenchPhonics } from '../migrate/sources.mjs';
import { validateModule } from '../schema/module.mjs';
import { unmark } from '../migrate/mark-french.mjs';

const { configs } = await todaysModules();
const phonics = await frenchPhonics();
const clone = (v) => JSON.parse(JSON.stringify(v));

test('reference shelf page', () => {
  const old = configs.get('2024-04-01-alphabet');
  const { mod } = referenceFrom(old);
  assert.equal(mod.kind, 'reference');
  assert.equal(mod.items, undefined);
  assert.equal(mod.sections.length, old.concepts.length);
  assert.equal(mod.sections[0].heading, 'The French Alphabet');
  // Marked as a lesson's concept example is (mark-french 'example'), so the checker reads what it reads today.
  assert.match(unmark(mod.sections[0].example), /^A \(ah\), B \(bay\)/);
  assert.equal(mod.vocabulary.length, old.vocabularyReference.length);
  assert.deepEqual(validateModule(mod, {}), []);
});

test('the spelling patterns page writes its phonics data out as sections', () => {
  const { mod } = referenceFrom(configs.get('2024-04-08-spelling-patterns'), { phonics });
  const sounds = phonics.reduce((n, c) => n + c.patterns.length, 0);
  assert.equal(mod.sections.length, sounds);
  assert.equal(mod.sections[0].heading, 'Basic Vowel Sounds: /a/');
  // Each section is named for the sound it teaches, not numbered.
  const ids = mod.sections.map((s) => s.id);
  assert.deepEqual(ids.slice(0, 4), ['s-a', 's-e-closed', 's-e-open', 's-schwa']);
  assert.ok(ids.includes('s-a-nasal') && ids.includes('s-silent-h') && ids.includes('s-elision'), ids.join(' '));
  assert.equal(new Set(ids).size, ids.length);
  assert.ok(ids.every((id) => !/-\d+$/.test(id)), ids.join(' '));
  assert.deepEqual(mod.sections[0].rows[0], { fr: 'a', en: 'Most common', note: '{chat}, {la}, {va}' });
  assert.equal(mod.screen, undefined);
  assert.deepEqual(validateModule(mod, {}), []);
});

test('the pronunciation test page takes the pronunciation-test screen', () => {
  const old = configs.get('2024-12-18-pronunciation-test');
  const { mod } = referenceFrom(old);
  assert.equal(mod.screen, 'pronunciation-test');
  assert.equal(mod.vocabulary.length, old.vocabularyReference.length);
  assert.deepEqual(validateModule(mod, {}), []);
});

test('rerun keeps a hand edit to a section, and live concept ticks map to section ids', () => {
  const old = configs.get('2024-04-05-colors');
  const first = referenceFrom(old);
  const edited = clone(first.mod);
  edited.sections[1].text = 'Edited by hand.';
  const second = referenceFrom(old, { existing: edited, record: first.record });
  assert.deepEqual(second.mod, edited);
  assert.equal(second.handFixes[`sections/${edited.sections[1].id}`].text, 'Edited by hand.');
  const { map, unmatched } = liveIdMatch([{ moduleKey: old.moduleKey, exercises: [], concepts: old.concepts }], new Map([[old.moduleKey, second.mod]]));
  assert.deepEqual(unmatched, []);
  assert.equal(map[old.moduleKey].concepts['0'], edited.sections[0].id);
});
