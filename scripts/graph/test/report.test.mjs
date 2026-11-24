import test from 'node:test';
import assert from 'node:assert/strict';
import { renderFixList, summarize, checkSummaryLines } from '../report.mjs';
import { makeModule } from './helpers.mjs';

const course = [
  makeModule({ position: 1, unitTitle: 'Unit One', title: 'Hello' }),
  makeModule({ position: 2, unitTitle: 'Unit One', title: 'Being' }),
  makeModule({ position: 3, unitId: 2, unitTitle: 'Unit Two', title: 'Food' }),
];

test('summarize counts errors, warnings and modules with errors', () => {
  const s = summarize([
    { rule: 'untaught-word', severity: 'error', moduleKey: 'm1' },
    { rule: 'unknown-word', severity: 'error', moduleKey: 'm2' },
    { rule: 'reuse-missed', severity: 'warning', moduleKey: 'm2' },
  ]);
  assert.equal(s.errors, 2);
  assert.equal(s.warnings, 1);
  assert.equal(s.modulesWithErrors, 2);
  assert.deepEqual(s.byRule, { 'untaught-word': 1, 'unknown-word': 1, 'reuse-missed': 1 });
});

test('checkSummaryLines prints unread-items and dangling-ref even at zero, then the totals', () => {
  const lines = checkSummaryLines(summarize([
    { rule: 'untaught-word', severity: 'error', moduleKey: 'm1' },
    { rule: 'reuse-missed', severity: 'warning', moduleKey: 'm1' },
  ]));
  assert.deepEqual(lines, [
    'dangling-ref: 0',
    'reuse-missed: 1',
    'unread-items: 0',
    'untaught-word: 1',
    'errors: 1, warnings: 1, modules with errors: 1',
  ]);
});

test('renderFixList puts an untaught word under its unit and module heading', () => {
  const md = renderFixList([
    {
      rule: 'untaught-word', severity: 'error', moduleKey: 'm2', position: 2, surface: 'chat',
      nodeId: 'fr:lex:chat', message: '"chat" is used before it is taught (x); taught later at position 3 (Food)',
      fix: { kind: 'teach-earlier', moduleKey: 'm2' },
    },
    {
      rule: 'untaught-word', severity: 'error', moduleKey: 'm2', position: 2, surface: 'pain',
      nodeId: 'fr:lex:pain', message: '"pain" is used before it is taught (x); it is not taught anywhere in the course',
      fix: { kind: 'teach-earlier', moduleKey: 'm3' },
    },
  ], course);
  const lines = md.split('\n');
  const unit = lines.indexOf('## Unit One');
  const mod = lines.indexOf('### 2. Being');
  assert.ok(unit >= 0 && mod > unit);
  const chat = lines.find((l) => l.includes('chat'));
  assert.ok(chat.includes('fr:lex:chat') && chat.includes('teach in this module'));
  assert.ok(chat.includes('taught later at position 3 (Food)'));
  const pain = lines.find((l) => l.includes('pain'));
  assert.ok(pain.includes('teach in Food (position 3)'));
});

test('renderFixList lists rules the other sections do not show under Other problems', () => {
  const md = renderFixList([
    { rule: 'unread-items', severity: 'error', moduleKey: 'm2', position: 2, message: 'm2 has content the reader could not read: x' },
    { rule: 'dangling-ref', severity: 'error', message: 'node fr:lex:a points at fr:lex:zz, which does not exist' },
  ], course);
  const other = md.slice(md.indexOf('# 9. Other problems'));
  assert.ok(other.includes('unread-items (error) [2. Being]: m2 has content'));
  assert.ok(other.includes('dangling-ref (error): node fr:lex:a'));
});

test('renderFixList opens with a plain how-to-read paragraph after the summary', () => {
  const md = renderFixList([], course);
  const lines = md.split('\n');
  const how = lines.indexOf('## How to read this');
  assert.ok(how > 0 && how < lines.indexOf('# 1. Untaught words and patterns'));
  const text = lines.slice(how + 1, lines.indexOf('# 1. Untaught words and patterns')).join(' ');
  assert.match(text, /teach the word earlier/);
  assert.match(text, /remove it/);
  assert.ok(!/[\u2013\u2014]/.test(text), 'no en or em dashes');
});

test('content notes in the course map are listed before the sections', () => {
  const md = renderFixList([], course, { m3: { contentNotes: ['"plus bon que" should be "meilleur que".'] } });
  const lines = md.split('\n');
  const note = lines.findIndex((l) => l === '- 3. Food: "plus bon que" should be "meilleur que".');
  assert.ok(note > 0 && note < lines.indexOf('# 1. Untaught words and patterns'));
});

test('a fix aimed at a module that cannot teach points to the lessons before it', () => {
  const withExam = [...course, makeModule({ position: 4, unitId: 2, unitTitle: 'Unit Two', title: 'Exam', kind: 'exam' })];
  const md = renderFixList([
    { rule: 'untaught-word', severity: 'error', moduleKey: 'm4', position: 4, surface: 'sept', nodeId: 'fr:lex:sept',
      message: '"sept" is used before it is taught (x); it is not taught anywhere in the course', fix: { kind: 'teach-earlier', moduleKey: 'm4' } },
    { rule: 'untaught-word', severity: 'error', moduleKey: 'm4', position: 4, surface: 'huit', nodeId: 'fr:lex:huit',
      message: '"huit" is used before it is taught (x); it is not taught anywhere in the course', fix: { kind: 'teach-earlier', moduleKey: 'm4' } },
  ].slice(0, 1).concat([
    { rule: 'untaught-word', severity: 'error', moduleKey: 'm3', position: 3, surface: 'neuf', nodeId: 'fr:lex:neuf',
      message: '"neuf" is used before it is taught (x); it is not taught anywhere in the course', fix: { kind: 'teach-earlier', moduleKey: 'm4' } },
  ]), withExam);
  assert.ok(md.split('\n').some((l) => l.includes('"sept"') && l.includes('teach in a lesson before this module')));
  assert.ok(md.split('\n').some((l) => l.includes('"neuf"') && l.includes('teach in a lesson before Exam (position 4)')));
});
