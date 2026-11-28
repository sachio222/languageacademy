// Every lesson brief tells its writer how a concept card is written (plan 2026-11-27-concept-cards-structured): the
// examples list, its layouts and the rules content:validate enforces, with a worked card. A guide brief says its
// examples go in a block, one per row.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { briefsFor } from '../brief.mjs';
import { loadChecked } from '../cli.mjs';
import { PLAN_FILE, REPO_ROOT, planModules } from '../plan.mjs';

const lang = readdirSync(join(REPO_ROOT, 'content')).find((l) => existsSync(join(REPO_ROOT, 'content', l, PLAN_FILE)));
const checked = await loadChecked({ lang });
const open = planModules(checked.plan).filter(({ module }) => checked.context.position.has(module.module_key));
const brief = (kind, grammar) => {
  const hit = open.find(({ module }) => module.kind === kind && (grammar === undefined || (module.teaches.constructions.length > 0) === grammar));
  return briefsFor({ ...checked, lang, repoRoot: REPO_ROOT, target: hit.module.module_key })[0].text;
};

for (const [name, text] of [['grammar lesson', () => brief('lesson', true)], ['word lesson', () => brief('lesson', false)]]) {
  test(`a ${name} brief gives the concept card shape, its rules and a worked card`, () => {
    const t = text();
    assert.ok(t.includes('## Concept cards'), 'a section of its own');
    for (const needle of ['"examples"', '"layout": "forms"', 'concept_inline_list', 'concept_example_meaning', 'concept_examples_size', 'concept_forms_pair', 'concept_example_formula', 'concept_plain_item', 'concept_example_not_target', '"layout": "plain"', 'one to six'])
      assert.ok(t.includes(needle), needle);
    assert.ok(!/"example":\s*"/.test(t), 'never the old one-string example');
  });
}

test('a guide brief puts its examples in a block, one per row, and gives a worked part', () => {
  const t = brief('guide');
  assert.ok(t.includes('"lines"'), 'the lines block');
  assert.ok(/never run (them )?together/i.test(t));
});
