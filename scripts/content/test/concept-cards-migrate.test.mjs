// The concept card migration (scripts/content/concept-cards.mjs): reads every card's old example string, sorts it into
// converted, needs meaning or could not convert, flags definitions that run a list together, and applies the
// conversions to the units it is given.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { surveyCards, applyCards, reportMarkdown } from '../concept-cards.mjs';
import fr from '../../graph/fr/language.mjs';

const P = fr.persons;
const lesson = (key, concepts) => ({ module_key: key, kind: 'lesson', concepts });
const units = [
  {
    unit_key: 'unit1',
    modules: [
      lesson('m-etre', [
        { id: 'c-usage', term: 'Usage', definition: 'Use it with an adjective.', example: '{Je suis heureux} (I am happy), {Il est heureux} (he is happy)' },
        { id: 'c-forms', term: 'Forms', definition: 'Notice: {je suis}, {tu es}, {il est}.', example: '{je suis}, {tu es}, {nous sommes}, {vous êtes}' },
        { id: 'c-prose', term: 'Why', definition: 'Because.', example: 'Use it to say who you are' },
      ]),
    ],
  },
  {
    unit_key: 'unit2',
    modules: [lesson('m-adj', [{ id: 'c-bel', term: 'Bel', definition: 'Before a vowel.', example: '{un bel enfant}, {un nouvel ami}' }])],
    reference: [],
  },
];

test('surveyCards sorts every card and flags definitions that run a list together', () => {
  const s = surveyCards(units, P);
  assert.deepEqual(s.map((c) => [c.unit, c.module_key, c.id, c.status, c.layout ?? null, c.definitionList]), [
    ['unit1', 'm-etre', 'c-usage', 'converted', null, false],
    ['unit1', 'm-etre', 'c-forms', 'converted', 'forms', true],
    ['unit1', 'm-etre', 'c-prose', 'unconvertible', null, false],
    ['unit2', 'm-adj', 'c-bel', 'needs_meaning', null, false],
  ]);
  assert.equal(s[2].reason, 'prose with no French examples');
});

test('a run of English items with no French marks becomes a plain card, its closing remark named for a writer', () => {
  const u = [{ unit_key: 'unit1', modules: [lesson('m', [{ id: 'c-greet', term: 'Greetings', definition: 'Basic phrases.', example: 'Hello, thank you, yes, no, please, goodbye - universal communication' }])] }];
  const s = surveyCards(u, P, fr);
  assert.equal(s[0].status, 'converted');
  assert.equal(s[0].layout, 'plain');
  const card = applyCards(u, s, ['unit1']).get('m').concepts[0];
  assert.deepEqual(card, { id: 'c-greet', term: 'Greetings', definition: 'Basic phrases.', layout: 'plain', examples: ['Hello', 'Thank you', 'Yes', 'No', 'Please', 'Goodbye'].map((text) => ({ text })) });
  assert.match(reportMarkdown(s), /remark left out \(universal communication\)/);
});

test('a card already in the new shape is counted as done', () => {
  const s = surveyCards([{ unit_key: 'unit1', modules: [lesson('m', [{ id: 'c', term: 't', definition: 'd', examples: [{ fr: 'Oui.', en: 'Yes.' }] }])] }], P);
  assert.equal(s[0].status, 'done');
});

test('applyCards rewrites converted cards in the given units only, keeping ids and field order', () => {
  const s = surveyCards(units, P);
  const changed = applyCards(units, s, ['unit1']);
  assert.deepEqual([...changed.keys()], ['m-etre']);
  const [usage, forms, prose] = changed.get('m-etre').concepts;
  assert.deepEqual(usage, { id: 'c-usage', term: 'Usage', definition: 'Use it with an adjective.', examples: [{ fr: 'Je suis heureux', en: 'I am happy' }, { fr: 'Il est heureux', en: 'he is happy' }] });
  assert.deepEqual(Object.keys(forms), ['id', 'term', 'definition', 'layout', 'examples']);
  assert.equal(forms.layout, 'forms');
  // a card the script cannot read keeps its string for the writers
  assert.equal(prose.example, 'Use it to say who you are');
  // the source is never changed in place
  assert.equal(units[0].modules[0].concepts[0].example.startsWith('{Je suis'), true);
});

test('reportMarkdown counts each status for all units and for the applied units', () => {
  const md = reportMarkdown(surveyCards(units, P), { applied: ['unit1'] });
  assert.match(md, /\| All units \| 4 \| 2 \| 1 \| 1 \| 0 \| 1 \|/);
  assert.match(md, /\| unit1 \| 3 \| 2 \| 0 \| 1 \| 0 \| 1 \|/);
  assert.match(md, /c-prose/);
});

test('every unit and the Reference shelf are migrated: no card or section holds the old string', async () => {
  const { readFileSync } = await import('node:fs');
  const { CONTENT_ROOT } = await import('../load.mjs');
  const outline = JSON.parse(readFileSync(`${CONTENT_ROOT}/course.json`, 'utf8'));
  const shelf = (Array.isArray(outline.shelf) ? outline.shelf : outline.shelf.pages).map((p) => (typeof p === 'string' ? p : p.module_key));
  const left = [];
  for (const key of [...outline.units.flatMap((u) => u.entries), ...shelf]) {
    const mod = JSON.parse(readFileSync(`${CONTENT_ROOT}/modules/${key}.json`, 'utf8'));
    if (mod.status === 'planned') continue;
    for (const c of mod.concepts ?? []) if (!Array.isArray(c.examples) || c.example !== undefined) left.push(`${key} ${c.id}`);
    for (const s of mod.sections ?? []) if (s.example !== undefined) left.push(`${key} ${s.id}`);
  }
  assert.deepEqual(left, []);
});
