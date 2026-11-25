import { test } from 'node:test';
import assert from 'node:assert/strict';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readModule } from '../course.mjs';
import { loadGraph } from '../load.mjs';
import { validateGraph } from '../validate.mjs';
import { ruleTaughtBefore } from '../rules/taught-before.mjs';
import { FIELDS, levelOf } from '../fields.mjs';
import { makeModule, makeCtx } from './helpers.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, '../../..');
const base = loadGraph(join(here, 'fixtures', 'graph-mini'), 'fr');

// A guide is a help module whose screen is data: GuideScreen.jsx renders module.guide.
const guideModule = (guide) => ({
  moduleKey: 'g2', title: 'Saying no', description: 'One rule for not', isHelpModule: true,
  concepts: [], vocabularyReference: [], exercises: [], guide,
});

const negation = {
  sections: [
    {
      heading: 'Not',
      rule: 'Put “ne” before the verb and “pas” after it.',
      rows: [
        { french: 'je parle', english: 'I speak' },
        { french: 'je ne parle pas', english: "I don't speak", note: 'Say “ne” softly.' },
      ],
      examples: [{ french: 'Tu ne parles pas.', english: "You don't speak." }],
    },
    {
      heading: 'Going',
      rule: 'The same with “aller”.',
      rows: [{ french: 'je ne vais pas', english: "I'm not going" }],
      examples: [{ french: 'Il ne va pas.', english: "He isn't going." }],
    },
  ],
};

test('readModule returns every French cell of a guide as French the learner sees', () => {
  const m = readModule(guideModule(negation), 2, 1);
  const shown = (ref) => m.items.find((i) => i.ref === `g2#${ref}`)?.shown;
  assert.deepEqual(shown('guide.sections[0].rows[0].french'), ['je parle']);
  assert.deepEqual(shown('guide.sections[0].rows[1].french'), ['je ne parle pas']);
  assert.deepEqual(shown('guide.sections[0].examples[0].french'), ['Tu ne parles pas.']);
  assert.deepEqual(shown('guide.sections[1].rows[0].french'), ['je ne vais pas']);
  assert.deepEqual(shown('guide.sections[1].examples[0].french'), ['Il ne va pas.']);
  // the rule and the note are English with quoted French
  assert.deepEqual(shown('guide.sections[0].rule'), ['ne', 'pas']);
  assert.deepEqual(shown('guide.sections[0].rows[1].note'), ['ne']);
  assert.deepEqual(shown('guide.sections[1].rule'), ['aller']);
  // English is never read
  const all = m.items.flatMap((i) => [...i.french, ...i.shown]).join('\n');
  for (const english of ['I speak', "don't", 'going', 'Not']) assert.ok(!all.includes(english), english);
  assert.equal(m.kind, 'help');
  assert.equal(m.guide, true);
  assert.deepEqual(m.unreadShapes, []);
});

test('a guide that shows a word taught after its position yields one untaught-word issue for that word', () => {
  const guide = {
    sections: [{
      heading: 'Not',
      rule: 'Put “ne” before the verb and “pas” after it.',
      rows: [{ french: 'je ne parle pas', english: "I don't speak" }],
      examples: [{ french: 'Je ne travaille pas.', english: "I don't work." }],
    }],
  };
  const course = [
    makeModule({ position: 1, moduleKey: 'm1' }),
    { ...readModule(guideModule(guide), 2, 1), position: 2 },
    makeModule({ position: 5, moduleKey: 'm5' }),
  ];
  const courseMap = {
    m1: { teachesWords: ['fr:lex:je', 'fr:lex:parler'], teachesConstructions: ['fr:cx:verb.er.present'] },
    g2: { teachesWordsManual: ['fr:lex:ne', 'fr:lex:pas'] },
    m5: { teachesWords: ['fr:lex:travailler'] },
  };
  const ctx = makeCtx({ graph: { ...base, courseMap }, course });
  const issues = ruleTaughtBefore(ctx).filter((i) => i.rule.startsWith('untaught-') && i.moduleKey === 'g2');
  assert.deepEqual(issues.map((i) => [i.rule, i.surface, i.itemRef]),
    [['untaught-word', 'travaille', 'g2#guide.sections[0].examples[0].french']]);
  assert.match(issues[0].message, /position 5/);
});

test('validateGraph accepts a guide help module with no screen component', () => {
  const course = [{ ...readModule(guideModule(negation), 1, 1), position: 1 }];
  const graph = { ...base, pair: null, courseMap: { g2: {} } };
  assert.deepEqual(validateGraph(graph, { course, repoRoot }).map((i) => i.rule), []);
  // a help module with neither a guide nor a screen is still reported
  const plain = [makeModule({ position: 1, moduleKey: 'h1', kind: 'help' })];
  assert.deepEqual(validateGraph({ ...graph, courseMap: { h1: {} } }, { course: plain, repoRoot }).map((i) => i.rule),
    ['screen-missing']);
});

test('the field registry lists every field of a guide', () => {
  const missing = [];
  const walk = (value, level) => {
    if (Array.isArray(value)) { value.forEach((v) => walk(v, level)); return; }
    if (!value || typeof value !== 'object') return;
    for (const [name, child] of Object.entries(value)) {
      if (!FIELDS[level]?.[name]) { missing.push(`${level}.${name}`); continue; }
      const next = levelOf(level, name);
      if (next) walk(child, next);
    }
  };
  walk(guideModule(negation), 'module');
  assert.deepEqual(missing, []);
});
