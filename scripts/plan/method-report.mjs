// plan:method: the course, written and planned, scored against the teaching method (method-score.mjs), as text and
// as data. The written course before the plan's first unit is the baseline the method was read from.
import { analyzeItems } from '../graph/rules/taught-before.mjs';
import { planContext } from './context.mjs';
import { foundationSummary, median, readRoles, scoreShape, scoreWriting, shareSummary, shortId } from './method-score.mjs';
import { readPlan } from './plan.mjs';

const pct = (x) => (x === null || x === undefined ? 'n/a' : `${Math.round(x * 100)}%`);
const pad = (s, n) => String(s).padEnd(n);

export async function methodCommand({ repoRoot, lang }) {
  const plan = readPlan(repoRoot, lang);
  const table = readRoles(repoRoot, lang);
  const context = await planContext({ repoRoot, lang, plan });
  const { base, projected } = context;
  const planUnits = new Set(plan.units.map((u) => u.unit_key));
  const shape = scoreShape({ graph: projected.graph, table, course: projected.course, taughtAt: projected.timeline.taughtAt });
  const writing = scoreWriting({ graph: base.graph, course: base.course, analysis: analyzeItems(base), taughtAt: base.timeline.taughtAt });
  const baseRows = writing.filter((x) => !planUnits.has(x.unit_key));
  const planRows = writing.filter((x) => planUnits.has(x.unit_key));
  const data = {
    lang,
    shape: { units: shape.units, modules: shape.modules, never: shape.never },
    writing: { baseline: { share: shareSummary(baseRows), foundation: foundationSummary(baseRows) }, plan_units: { share: shareSummary(planRows), foundation: foundationSummary(planRows) }, modules: writing },
  };
  return { data, text: render(data, planUnits) };
}

export function render(data, planUnits) {
  const L = [];
  const { shape, writing } = data;
  L.push(`# The course scored against the teaching method (${data.lang})`, '');
  L.push('Shape: what each unit adds. "opened" counts (word, pattern) pairs a module makes sayable: each new word in every known pattern whose slot takes it, and each new pattern with every earlier word it takes.', '');
  L.push(`${pad('unit', 9)}${pad('teaching', 9)}${pad('words', 7)}${pad('patterns', 9)}${pad('known', 7)}${pad('reach/word', 11)}${pad('opened/module', 14)}roles of new patterns; roles of new words; classes; modules of 6+ fillers with no new verb or pattern`);
  for (const u of shape.units) {
    L.push(`${pad(u.unit_key ?? '-', 9)}${pad(u.teaching, 9)}${pad(u.words, 7)}${pad(u.patterns, 9)}${pad(u.patterns_known, 7)}${pad(u.median_reach ?? '-', 11)}${pad(u.opened_per_teaching, 14)}${Object.entries(u.by_role).map(([k, v]) => `${k} ${v}`).join(', ') || '-'}; ${Object.entries(u.word_roles).map(([k, v]) => `${k} ${v}`).join(', ') || '-'}; ${Object.entries(u.by_class).map(([k, v]) => `${k} ${v}`).join(', ') || '-'}; ${u.no_carrier}`);
  }
  L.push('');
  const b = writing.baseline;
  const p = writing.plan_units;
  const line = (name, s) => `${name}: ${s.share.lessons} lessons, new words as a share of the words their exercises use: median ${pct(s.share.median)}, quartiles ${pct(s.share.q1)} to ${pct(s.share.q3)}, highest ${pct(s.share.max)}`;
  L.push('Writing: how lessons teach.', line('written course before the plan', b), line('written units of the plan', p), '');
  const f = (name, s) => {
    const x = s.foundation;
    return `${name}: ${x.new_words} new words; ${x.never_in_a_sentence} never in a sentence; ${x.met_alone} first met alone; ${x.met_beside_another_new_word} first met beside another new word; ${x.carried_a_later_new_word} then carried a later new word at its first meeting; ${x.never_beside_another_new_word} never in a sentence with another new word of the module; ${x.supports_a_new_word_in_the_next_modules} of ${x.with_later_modules} are in the sentence where a new word of the next three modules is first met; ${x.used_once_only} used once only; ${x.leaned_on_next} of ${x.with_later_modules} used by one of the next three modules; ${x.never_used_again} never used again`;
  };
  L.push(f('written course before the plan', b), f('written units of the plan', p), '');
  L.push('## Patterns the course never teaches, with their needs met', '');
  for (const n of shape.never.filter((x) => x.ready_at !== null).sort((a, b2) => b2.takes - a.takes)) L.push(`${pad(shortId(n.id), 44)}${pad(n.role, 10)}ready from ${pad(n.ready_at, 5)}takes ${pad(n.takes, 6)}${n.label.slice(0, 90)}`);
  L.push('', '## Patterns that waited longest after their needs were met (plan units)', '');
  const waits = shape.modules.filter((m) => planUnits.has(m.unit_key)).flatMap((m) => m.patterns.filter((x) => x.role !== 'paradigm' && x.role !== 'chunk' && x.waited !== null).map((x) => ({ ...x, m })));
  for (const w of waits.sort((a, b2) => b2.waited - a.waited).slice(0, 25)) L.push(`${pad(shortId(w.id), 44)}${pad(w.role, 10)}taught at ${pad(w.m.position, 5)}${pad(w.m.unit_key, 8)}waited ${pad(w.waited, 5)}takes ${w.takes}`);
  L.push('', '## Each module of the plan units', '');
  for (const m of shape.modules.filter((x) => planUnits.has(x.unit_key) && (x.words.length || x.patterns.length))) {
    L.push(`${m.position} ${m.unit_key} ${m.module_key} (${m.kind}): ${m.patterns_known} patterns known, opened ${m.opened}`);
    for (const x of m.patterns) L.push(`    pattern ${shortId(x.id)} [${x.role}] takes ${x.takes} known words${x.reuses.length ? `; new job for ${x.reuses.map(shortId).join(', ')}` : ''}${x.waited ? `; waited ${x.waited}` : ''}`);
    if (m.words.length) L.push(`    words: ${m.words.map((w) => `${w.lemma} [${w.role === 'filler' ? '' : `${w.role} `}${w.pos} ${w.reach}]`).join(', ')}`);
  }
  L.push('', '## Each written module of the plan units', '');
  for (const r of writing.modules.filter((x) => planUnits.has(x.unit_key))) {
    L.push(`${r.position} ${r.module_key} (${r.kind}): ${r.items} items, ${r.used} words used, ${r.fresh} new (${pct(r.new_share)}), ${r.untaught} not taught yet; items ${Object.entries(r.types).map(([k, v]) => `${k} ${v}`).join(', ')}`);
    for (const w of r.words) L.push(`    ${w.lemma}: together ${w.together}, supports ${w.supports}; ${w.first === null ? 'never in a sentence' : `first met in "${w.first}"${w.strangers ? ` beside ${w.strangers} other new` : ''}`}; ${w.uses} uses; carried ${w.carried.length ? w.carried.join(', ') : 'nothing'}; next three modules ${w.next}, later ${w.after}`);
  }
  return `${L.join('\n')}\n`;
}
export { median };
