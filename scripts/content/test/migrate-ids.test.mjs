// Ids never move to another item (spec 8.1, C-ID-4; final review I3 and the id-stability triage). A rerun pairs each
// source exercise and card with what is written by content before it mints anything, under --force too.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import '../vite-shim.mjs';
import { convertModule } from '../migrate/module.mjs';
import { rememberWord } from '../word-ids.mjs';

const ctx = { unitKey: 'unit3', unitIndex: 3 };
const clone = (v) => JSON.parse(JSON.stringify(v));
const lesson = (items, vocab = [{ french: 'je pars', english: 'I leave' }, { french: 'tu pars', english: 'you leave' }]) => ({
  moduleKey: '2024-01-29-test-partir',
  title: 'Partir',
  description: 'To leave.',
  vocabularyReference: vocab,
  exerciseConfig: { type: 'custom', items },
});
const leave = { instruction: 'Translate:', prompt: 'I leave', expectedAnswer: 'je pars', hint: 'je + pars' };
const youLeave = { instruction: 'Translate:', prompt: 'you leave', expectedAnswer: 'tu pars' };
const byId = (mod) => Object.fromEntries(mod.items.map((i) => [i.id, i]));

// The written file after a person fixed i-je-pars by hand and a normal run recorded it (hand-fixes.json).
function writtenWithFix() {
  const first = convertModule(lesson([leave, youLeave]), ctx);
  const edited = clone(first.mod);
  edited.items.find((i) => i.id === 'i-je-pars').hint = 'Hand hint: {je pars}';
  const second = convertModule(lesson([leave, youLeave]), { ...ctx, existing: edited, record: first.record });
  assert.deepEqual(Object.keys(second.handFixes), ['items/i-je-pars']);
  return second;
}

test('--force keeps i-je-pars on "I leave" when main inserts another item answered "je pars" before it', () => {
  const written = writtenWithFix();
  // main: a new exercise first, with the same answer.
  const changed = lesson([{ instruction: 'Translate:', prompt: 'I am leaving', expectedAnswer: 'je pars' }, leave, youLeave]);
  // --force: nothing is merged from the file, but ids still come from it and from the record.
  const forced = convertModule(changed, { ...ctx, existing: null, record: null, handFixes: written.handFixes, written: written.mod, idRecord: written.record });
  const items = byId(forced.mod);
  assert.equal(items['i-je-pars'].prompt, 'I leave');
  assert.equal(items['i-je-pars'].hint, 'Hand hint: {je pars}', 'the hand fix stays on its item');
  const added = forced.mod.items.find((i) => i.prompt === 'I am leaving');
  assert.ok(added && added.id !== 'i-je-pars' && !(added.id in byId(written.mod)), `new id for the new item: ${added?.id}`);
  assert.equal(added.hint, undefined, 'the hand fix did not move to the new item');
  assert.equal(items['i-tu-pars'].prompt, 'you leave');
});

test('--force keeps word ids when an earlier module now teaches the same spelling', () => {
  const written = writtenWithFix();
  // A module before this one (a new lesson, or a moved one) now teaches "je pars" in another sense, so a fresh
  // proposal for this card would be a sense id.
  const seenBySpelling = new Map();
  rememberWord({ word_id: 'je-pars-fr', fr: 'je pars', gloss: 'I set off (on a trip)' }, '2024-01-28-earlier', seenBySpelling);
  const forced = convertModule(lesson([leave, youLeave]), { ...ctx, seenBySpelling, existing: null, record: null, handFixes: written.handFixes, written: written.mod, idRecord: written.record });
  assert.deepEqual(forced.mod.vocabulary.map((w) => w.word_id), written.mod.vocabulary.map((w) => w.word_id));
  assert.deepEqual(forced.mod, written.mod, '--force from an unchanged source gives back the written file');
});

test('a letter-typo fix in a vocabulary card keeps its word id when the gloss is unchanged', () => {
  const typo = [{ french: 'je prs', english: 'I leave' }, { french: 'tu pars', english: 'you leave' }];
  const first = convertModule(lesson([leave, youLeave], typo), ctx);
  const id = first.mod.vocabulary[0].word_id;
  // main fixes the spelling and drops the other card, so no unchanged neighbour holds the place.
  const fixed = [{ french: 'je pars', english: 'I leave' }];
  const second = convertModule(lesson([leave, youLeave], fixed), { ...ctx, existing: clone(first.mod), record: first.record });
  assert.deepEqual(second.mod.vocabulary.map((w) => [w.word_id, w.fr]), [[id, 'je pars']]);
  // A different word with the same gloss is a new card.
  const other = [{ french: 'je quitte', english: 'I leave' }];
  const third = convertModule(lesson([leave, youLeave], other), { ...ctx, existing: clone(first.mod), record: first.record });
  assert.notEqual(third.mod.vocabulary[0].word_id, id);
});

test('an answer correction keeps its item id when the prompt is unchanged, even next to a removed exercise', () => {
  const heIs = { instruction: 'Translate:', prompt: 'he leaves', expectedAnswer: 'il par' };
  const first = convertModule(lesson([leave, youLeave, heIs]), ctx);
  const id = first.mod.items[2].id;
  // main removes "you leave" and corrects "il par" to "il part".
  const second = convertModule(lesson([leave, { ...heIs, expectedAnswer: 'il part' }]), { ...ctx, existing: clone(first.mod), record: first.record });
  const he = second.mod.items.find((i) => i.prompt === 'he leaves');
  assert.equal(he.id, id);
  assert.equal(he.answer, 'il part');
  assert.equal(second.mod.items.some((i) => i.prompt === 'you leave'), false);
});
