// Task 6, spec 8.3: live exercise ids and concept indexes mapped to the new ids, by content.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import '../vite-shim.mjs';
import { convertModule } from '../migrate/module.mjs';
import { liveIdMap, liveIdMatch } from '../migrate/live-ids.mjs';

const old = {
  moduleKey: '2024-01-15-adjectives',
  title: 'Common Adjectives',
  description: 'Describe things.',
  concepts: [
    { term: 'Adjective agreement', definition: 'Adjectives agree.', example: 'petit, petite' },
    { term: 'BAGS adjectives', definition: 'Some go before the noun.', example: 'un petit chat' },
  ],
  vocabularyReference: [{ french: 'petit', english: 'small', note: '' }],
  exerciseConfig: {
    type: 'custom',
    items: [
      { instruction: 'Translate to French', prompt: 'a small cat', expectedAnswer: 'un petit chat' },
      { instruction: 'Translate to French', prompt: 'a small house', expectedAnswer: 'une petite maison' },
      { instruction: 'Translate to French', prompt: 'small', expectedAnswer: 'petit' },
    ],
  },
};
// What lessonData.js on main builds for this module: exercise ids moduleKey.N, concepts by index.
const live = (o) => ({
  moduleKey: o.moduleKey,
  concepts: o.concepts,
  exercises: o.exerciseConfig.items.map((it, i) => ({ id: `${o.moduleKey}.${i + 1}`, prompt: it.prompt, expectedAnswer: it.expectedAnswer })),
});

test('live ids survive reordering', () => {
  const { mod } = convertModule(old, { unitKey: 'unit2', unitIndex: 2 });
  const map = liveIdMap([live(old)], new Map([[old.moduleKey, mod]]));
  const ids = mod.items.map((i) => i.id);
  assert.deepEqual(map[old.moduleKey].items, {
    '2024-01-15-adjectives.1': ids[0],
    '2024-01-15-adjectives.2': ids[1],
    '2024-01-15-adjectives.3': ids[2],
  });
  assert.deepEqual(map[old.moduleKey].concepts, { 0: mod.concepts[0].id, 1: mod.concepts[1].id });

  const reversed = { ...mod, items: [...mod.items].reverse(), concepts: [...mod.concepts].reverse() };
  assert.deepEqual(liveIdMap([live(old)], new Map([[old.moduleKey, reversed]])), map);
});

test('an item added on the branch has no live id', () => {
  // Lesson 24's adjectives items exist on this branch only, so main's lesson lacks them.
  const branch = structuredClone(old);
  branch.exerciseConfig.items.push({ instruction: "Complete the phrase with 'bon' in its place", prompt: 'un ami + bon →', expectedAnswer: 'un bon ami' });
  const { mod } = convertModule(branch, { unitKey: 'unit2', unitIndex: 2 });
  const added = mod.items.find((i) => i.answer === 'un bon ami').id;
  const { map, unmatched } = liveIdMatch([live(old)], new Map([[old.moduleKey, mod]]));
  assert.ok(!Object.values(map[old.moduleKey].items).includes(added));
  assert.equal(Object.keys(map[old.moduleKey].items).length, 3);
  assert.deepEqual(unmatched, []);
});

test('a choice item written in place of a typed exercise keeps its live id', () => {
  const mod = {
    module_key: 'm',
    items: [
      { id: 'i-for-facts', type: 'choice', question: 'When do you use {savoir}?', options: [{ text: 'For facts and skills', right: true }, { text: 'For people and places you are familiar with' }] },
      { id: 'i-for-people', type: 'choice', question: 'When do you use {connaître}?', options: [{ text: 'For people and places', right: true }, { text: 'For facts and skills' }] },
    ],
  };
  const lesson = { moduleKey: 'm', concepts: [], exercises: [{ id: 'm.1', prompt: 'savoir is for...', expectedAnswer: 'facts' }, { id: 'm.2', prompt: 'connaître is for...', expectedAnswer: 'people' }] };
  assert.deepEqual(liveIdMap([lesson], new Map([['m', mod]])).m.items, { 'm.1': 'i-for-facts', 'm.2': 'i-for-people' });
});

test('a live exercise with no converted item is listed', () => {
  const { mod } = convertModule(old, { unitKey: 'unit2', unitIndex: 2 });
  const lesson = live(old);
  lesson.exercises.push({ id: `${old.moduleKey}.4`, prompt: 'gone', expectedAnswer: 'parti' });
  const { unmatched } = liveIdMatch([lesson], new Map([[old.moduleKey, mod]]));
  assert.deepEqual(unmatched.map((u) => u.live_id), [`${old.moduleKey}.4`]);
});

test('a concept card rewritten on the branch (term, definition and examples) keeps its live index through its id', () => {
  const { mod } = convertModule(old, { unitKey: 'unit2', unitIndex: 2 });
  const [a, b] = mod.concepts;
  const rewritten = {
    ...mod,
    concepts: [
      { id: a.id, term: 'Adjectives match their noun', definition: 'An adjective takes the gender of its noun.', examples: [{ fr: 'un petit chat', en: 'a small cat' }] },
      { id: b.id, term: 'Before the noun', definition: 'These adjectives go first.', examples: [{ fr: 'une petite maison', en: 'a small house' }] },
    ],
  };
  const { map, unmatched } = liveIdMatch([live(old)], new Map([[old.moduleKey, rewritten]]));
  assert.deepEqual(map[old.moduleKey].concepts, { 0: a.id, 1: b.id });
  assert.deepEqual(unmatched.filter((u) => u.what === 'concept'), []);
});
