// Smoke test on the committed French graph and course: the data must stay readable and consistent.
import test from 'node:test';
import assert from 'node:assert/strict';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadGraph } from '../load.mjs';
import { validateGraph } from '../validate.mjs';
import { runCheck } from '../check.mjs';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');

test('the French graph validates', () => {
  assert.deepEqual(validateGraph(loadGraph(join(repoRoot, 'curriculum-graph'), 'fr')), []);
});

test('the French check has no dangling refs, unread items or unknown course-map items', async () => {
  const { issues } = await runCheck({ repoRoot, lang: 'fr' });
  const bad = issues.filter((i) => ['dangling-ref', 'unread-items', 'course-map-unknown-item', 'course-map-unknown-module'].includes(i.rule));
  assert.deepEqual(bad.map((i) => i.message), []);
});

test('the real check opens Reference words from the lookup modules only', async () => {
  const { ctx } = await runCheck({ repoRoot, lang: 'fr' });
  const open = ctx.timeline.openByReference;
  for (const id of ['fr:lex:huit', 'fr:lex:lundi', 'fr:lex:ete', 'fr:lex:rouge', 'fr:lex:noel', 'fr:lex:b', 'fr:form:vif.f']) assert.ok(open.has(id), id);
  for (const id of ['fr:lex:je', 'fr:lex:tu', 'fr:form:etre.prs.1sg', 'fr:form:etre.ptcp', 'fr:lex:le', 'fr:lex:de', 'fr:form:vivre.sbjv.1sg',
    'fr:lex:etre', 'fr:lex:avoir', 'fr:lex:voir', 'fr:lex:parler', 'fr:lex:rire', 'fr:lex:epeler']) {
    assert.ok(!open.has(id), id);
  }
  // The label set still covers every Reference module.
  assert.ok(ctx.reference.size >= open.size);
});

test('the letter y the Reference opens does not hide the pronoun y in Reading 2', async () => {
  const { ctx } = await runCheck({ repoRoot, lang: 'fr' });
  // By module key, not position: a module inserted earlier in the course moves every position after it. Reading 2's
  // text no longer uses y, so the rule is asked directly at its position: the Reference opens the letter, the
  // pronoun is taught later, and a token y there reads as untaught.
  const at = ctx.course.find((m) => m.moduleKey === '2024-01-22-reading2').position;
  const readings = ctx.index.get('y');
  const letter = readings.find((r) => r.headwordId === 'fr:lex:y');
  const pronoun = readings.find((r) => r.headwordId === 'fr:lex:y.pronoun');
  assert.ok(letter && pronoun);
  assert.equal(ctx.timeline.isReadingAvailable(letter, at), true);
  assert.equal(ctx.timeline.isReadingAvailable(pronoun, at), false);
  assert.equal(ctx.timeline.isTokenAvailable(readings, at), false);
});

test('the real settings count cognates as known in typed and shown French', () => {
  const graph = loadGraph(join(repoRoot, 'curriculum-graph'), 'fr');
  assert.equal(graph.settings.cognates.allowIn, 'all');
});

test('the real level report counts cognates as available and keeps them apart from taught and Reference words', async () => {
  const { ctx } = await runCheck({ repoRoot, lang: 'fr' });
  const { levelReport } = await import('../rules/levels.mjs');
  const a1 = levelReport(ctx).levels.A1;
  assert.ok(a1.cognateWords > 0);
  assert.equal(a1.availableWords, a1.taughtWords + a1.referenceWords + a1.cognateWords);
});

test('the negation guide shows nothing untaught and teaches de only inside pas de', async () => {
  const { ctx, issues } = await runCheck({ repoRoot, lang: 'fr' });
  const key = '2026-11-24-negation-guide';
  assert.deepEqual(issues.filter((i) => i.moduleKey === key && i.rule.startsWith('untaught-')).map((i) => i.message), []);
  assert.ok(!(ctx.graph.courseMap[key].teachesWordsManual ?? []).includes('fr:lex:de'));
  // the preposition de is taught where a lesson first uses it, never by the guide: the questions lesson teaches
  // "combien de" (for "combien … de livres") and venir teaches "d'où" (C4)
  const de = issues.filter((i) => i.rule === 'untaught-word' && i.nodeId === 'fr:lex:de').map((i) => i.moduleKey);
  for (const moduleKey of ['2024-01-18-questions', '2024-01-26-venir']) assert.ok(!de.includes(moduleKey), moduleKey);
  assert.equal(ctx.timeline.taughtAt.get('fr:lex:de'), ctx.course.find((m) => m.moduleKey === '2024-01-18-questions').position);
});

test('the numbers lesson opens Unit 2, teaches 0 to 100 and the word ans, and shows nothing untaught', async () => {
  const { ctx, issues } = await runCheck({ repoRoot, lang: 'fr' });
  const key = '2026-11-24-numbers';
  const m = ctx.course.find((x) => x.moduleKey === key);
  assert.ok(m, 'numbers lesson is in the course');
  assert.equal(m.kind, 'lesson');
  assert.equal(m.unitId, 2);
  assert.equal(m.position, 14);
  assert.equal(ctx.course[14].moduleKey, '2026-11-24-negation-guide');
  // the Reference unit opens number words for lookup, but the lesson still credits every number it teaches
  const taught = new Set(ctx.graph.courseMap[key]?.teachesWords ?? []);
  for (const n of ['zero', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf', 'dix', 'onze', 'douze',
    'treize', 'quatorze', 'quinze', 'seize', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante', 'cent', 'an']) {
    assert.ok(taught.has(`fr:lex:${n}`), `fr:lex:${n}`);
  }
  // un, une (articles, position 5) and et (connectors) are taught before; the lesson lists them but does not claim them
  for (const id of ['fr:lex:un', 'fr:form:un.f', 'fr:lex:et']) assert.ok(!taught.has(id), id);
  const bad = issues.filter((i) => i.moduleKey === key
    && (i.rule.startsWith('untaught-') || ['translate-item', 'unknown-word', 'claim-untaught'].includes(i.rule)));
  assert.deepEqual(bad.map((i) => i.message), []);
});
