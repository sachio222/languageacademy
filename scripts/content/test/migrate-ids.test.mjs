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

test('an answer correction that still accepts the old answer keeps its item id, even next to a removed exercise', () => {
  const heLeaves = { instruction: 'Translate:', prompt: 'he leaves', expectedAnswer: 'il part' };
  const first = convertModule(lesson([leave, youLeave, heLeaves]), ctx);
  const id = first.mod.items[2].id;
  // main removes "you leave" and makes "il s'en va" the answer, still accepting "il part".
  const corrected = { ...heLeaves, expectedAnswer: "il s'en va", acceptableAnswers: ['il part'] };
  const second = convertModule(lesson([leave, corrected]), { ...ctx, existing: clone(first.mod), record: first.record });
  const he = second.mod.items.find((i) => i.prompt === 'he leaves');
  assert.equal(he.id, id);
  assert.equal(he.answer, "il s'en va");
  assert.deepEqual(he.accept, ['il part']);
  assert.equal(second.mod.items.some((i) => i.prompt === 'you leave'), false);
  assert.equal(second.report.some((l) => l.kind === 'id_new_answer'), false);
});

// content:bundle --check fails an item id whose answers share nothing with the last release's (item_id_reused): the
// id would name another question. So a correction that accepts none of the old answers takes a new id, reported.
test('main corrects "tu pars" to "toi, tu pars": the item takes a new id, and the run reports it', () => {
  const first = convertModule(lesson([leave, youLeave]), ctx);
  const old = first.mod.items.find((i) => i.prompt === 'you leave');
  assert.equal(old.id, 'i-tu-pars');
  // main removes "I leave" and corrects the answer under the same prompt (the reviewer's answer-correction sim).
  const second = convertModule(lesson([{ ...youLeave, expectedAnswer: 'toi, tu pars' }]), { ...ctx, existing: clone(first.mod), record: first.record });
  assert.deepEqual(second.mod.items.map((i) => [i.id, i.prompt, i.answer]), [['i-toi-tu-pars', 'you leave', 'toi, tu pars']]);
  const news = second.report.filter((l) => l.kind === 'id_new_answer');
  assert.equal(news.length, 1);
  assert.match(news[0].detail, /^i-toi-tu-pars: replaces i-tu-pars/);
  assert.match(news[0].detail, /"toi, tu pars" accepts none of its answers \("tu pars"\)/);
  // The old id is reported once, as replaced, not also as a removed source exercise.
  assert.equal(second.report.some((l) => l.kind === 'source_removed' && /i-tu-pars/.test(l.detail)), false);
  // A rerun, and --force, keep the new id and report nothing new.
  const rerun = convertModule(lesson([{ ...youLeave, expectedAnswer: 'toi, tu pars' }]), { ...ctx, existing: clone(second.mod), record: second.record });
  assert.deepEqual(rerun.mod, second.mod);
  assert.equal(rerun.report.some((l) => l.kind === 'id_new_answer'), false);
  const forced = convertModule(lesson([{ ...youLeave, expectedAnswer: 'toi, tu pars' }]), { ...ctx, existing: null, record: null, handFixes: second.handFixes, written: second.mod, idRecord: second.record });
  assert.deepEqual(forced.mod, second.mod);
});

test('a spelling fix of an answer the old one no longer matches ("il par" to "il part") takes a new id too', () => {
  const heIs = { instruction: 'Translate:', prompt: 'he leaves', expectedAnswer: 'il par' };
  const first = convertModule(lesson([leave, youLeave, heIs]), ctx);
  const id = first.mod.items[2].id;
  const second = convertModule(lesson([leave, { ...heIs, expectedAnswer: 'il part' }]), { ...ctx, existing: clone(first.mod), record: first.record });
  const he = second.mod.items.find((i) => i.prompt === 'he leaves');
  assert.notEqual(he.id, id);
  assert.equal(he.answer, 'il part');
  assert.ok(second.report.some((l) => l.kind === 'id_new_answer' && l.detail.startsWith(`${he.id}: replaces ${id}`)));
});

// A writer's hand edit on an item whose answer main then corrects to one that accepts none of the old answers: the
// item takes a new id, and the edit has nowhere to go. That is a conflict naming both ids, never a silent loss
// (C0 review I1).
test('a hand edit on an item main gives a new id is a conflict until settled or accepted', () => {
  const first = convertModule(lesson([leave, youLeave]), ctx);
  const edited = clone(first.mod);
  edited.items.find((i) => i.id === 'i-tu-pars').hint = 'Writer hint: {tu pars}';
  const second = convertModule(lesson([leave, youLeave]), { ...ctx, existing: edited, record: first.record });
  assert.deepEqual(Object.keys(second.handFixes), ['items/i-tu-pars']);
  const corrected = lesson([leave, { ...youLeave, expectedAnswer: 'toi, tu pars' }]);
  const conflictOf = (r) => r.report.filter((l) => l.kind === 'merge_conflict');
  // A normal run keeps the edited item as written and reports the conflict, with both ids.
  const normal = convertModule(corrected, { ...ctx, existing: clone(second.mod), record: second.record });
  assert.deepEqual(normal.mod, second.mod, 'nothing changes until the conflict is settled');
  assert.deepEqual(normal.handFixes, second.handFixes, 'the hand edit stays recorded');
  assert.equal(conflictOf(normal).length, 1);
  assert.match(conflictOf(normal)[0].detail, /i-tu-pars/);
  assert.match(conflictOf(normal)[0].detail, /i-toi-tu-pars/);
  // --force reports the same.
  const forced = convertModule(corrected, { ...ctx, existing: null, record: null, handFixes: second.handFixes, written: second.mod, idRecord: second.record });
  assert.deepEqual(forced.mod, normal.mod);
  assert.deepEqual(conflictOf(forced).map((l) => l.detail), conflictOf(normal).map((l) => l.detail));
  // Undoing the edit settles it: the correction then goes through with its new id.
  const undone = convertModule(corrected, { ...ctx, existing: clone(first.mod), record: second.record });
  assert.deepEqual(conflictOf(undone), []);
  assert.deepEqual(undone.mod.items.map((i) => i.id), ['i-je-pars', 'i-toi-tu-pars']);
  // --accept-conflicts takes main's correction under the new id, drops the edit and says so with both ids.
  const accepted = convertModule(corrected, { ...ctx, existing: clone(second.mod), record: second.record, acceptConflicts: true });
  assert.deepEqual(conflictOf(accepted), []);
  assert.deepEqual(accepted.mod.items.map((i) => i.id), ['i-je-pars', 'i-toi-tu-pars']);
  assert.equal('items/i-tu-pars' in accepted.handFixes, false);
  const note = accepted.report.find((l) => l.kind === 'conflict_accepted');
  assert.ok(note && /i-tu-pars/.test(note.detail) && /i-toi-tu-pars/.test(note.detail), JSON.stringify(accepted.report));
  // An edit made since the last run (not yet in hand-fixes.json) is caught the same way.
  const fresh = convertModule(corrected, { ...ctx, existing: clone(edited), record: first.record });
  assert.equal(conflictOf(fresh).length, 1);
  assert.deepEqual(fresh.mod.items.map((i) => i.id), ['i-je-pars', 'i-tu-pars']);
});

// The same for an item the writer removed by hand (hand-fixes.json records items/<id>: null): main's correction must
// not bring it back silently under a new id (C0 re-review).
test('a hand removal of an item main gives a new id is a conflict too, and stays removed until accepted', () => {
  const first = convertModule(lesson([leave, youLeave]), ctx);
  const removed = clone(first.mod);
  removed.items = removed.items.filter((i) => i.id !== 'i-tu-pars');
  const second = convertModule(lesson([leave, youLeave]), { ...ctx, existing: removed, record: first.record });
  assert.deepEqual(second.handFixes, { 'items/i-tu-pars': null });
  const corrected = lesson([leave, { ...youLeave, expectedAnswer: 'toi, tu pars' }]);
  const conflictOf = (r) => r.report.filter((l) => l.kind === 'merge_conflict');
  const normal = convertModule(corrected, { ...ctx, existing: clone(second.mod), record: second.record });
  const forced = convertModule(corrected, { ...ctx, existing: null, record: null, handFixes: second.handFixes, written: second.mod, idRecord: second.record });
  for (const [run, r] of [['normal', normal], ['--force', forced]]) {
    assert.deepEqual(r.mod.items.map((i) => i.id), ['i-je-pars'], `${run}: the removal stands`);
    assert.deepEqual(r.handFixes, { 'items/i-tu-pars': null }, `${run}: the removal stays recorded`);
    assert.equal(conflictOf(r).length, 1, run);
    assert.match(conflictOf(r)[0].detail, /removal/);
    assert.match(conflictOf(r)[0].detail, /i-tu-pars/);
    assert.match(conflictOf(r)[0].detail, /i-toi-tu-pars/);
  }
  assert.deepEqual(forced.record, normal.record);
  // --accept-conflicts takes main's corrected item, under its new id, and the removal record goes.
  const accepted = convertModule(corrected, { ...ctx, existing: clone(second.mod), record: second.record, acceptConflicts: true });
  assert.deepEqual(conflictOf(accepted), []);
  assert.deepEqual(accepted.mod.items.map((i) => [i.id, i.answer]), [['i-je-pars', 'je pars'], ['i-toi-tu-pars', 'toi, tu pars']]);
  assert.equal('items/i-tu-pars' in accepted.handFixes, false);
  assert.ok(accepted.report.some((l) => l.kind === 'conflict_accepted' && /i-tu-pars/.test(l.detail) && /i-toi-tu-pars/.test(l.detail)));
});
