// plan:speed: the course (written units plus the plan) against other orders of the same items, at equal study time
// and at equal words (speed.mjs). Reads the language's local frequency ranks (frequency.mjs); writes no frequency
// value. Nothing here names a language.
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { loadCourse } from '../content/load.mjs';
import { loadRecipes } from '../content/prep/recipes.mjs';
import { moduleMinutes } from '../content/prep/time.mjs';
import { cognateOpening } from '../graph/timeline.mjs';
import { planContext } from './context.mjs';
import { readRanks } from './frequency.mjs';
import { readRoles } from './method-score.mjs';
import { planPaths, readPlan } from './plan.mjs';
import { fitCost, frequencyOrder, pack, randomOrder, ruleOrder, simulate, summarize, textbookOrder, universe, valueAt, violations } from './speed.mjs';

const LEVELS = ['A1', 'A2', 'B1'];
const TEACHING = new Set(['lesson', 'guide']);
const quant = (xs, q) => { const s = [...xs].sort((a, b) => a - b); return s.length ? s[Math.min(s.length - 1, Math.floor(q * s.length))] : 0; };

export async function speedCommand({ repoRoot, lang, seeds = 200, caps = { words: 12, patterns: 2 } }) {
  const plan = readPlan(repoRoot, lang);
  const table = readRoles(repoRoot, lang);
  const { projected } = await planContext({ repoRoot, lang, plan });
  const paths = planPaths(repoRoot, lang);
  const graph = projected.graph;
  const hwIds = new Set(graph.headwords.map((h) => h.id));
  // Known from the start in every order: what the Reference pages and the cognates open.
  const free = new Set([...(projected.reference ?? []), ...cognateOpening(graph, projected.course).keys()].filter((id) => hwIds.has(id)));
  const ranks = readRanks(lang);
  const core = {};
  for (const lv of LEVELS) {
    const f = join(repoRoot, 'curriculum-graph', 'core', 'levels', `${lang}-${lv}.json`);
    if (existsSync(f)) { const d = JSON.parse(readFileSync(f, 'utf8')); core[lv] = { words: d.words ?? [], constructions: d.constructions ?? [] }; }
  }
  const U = universe({ graph, table, taughtAt: projected.timeline.taughtAt, free, ranks, core });

  // Our course: its modules as they stand, each with the items first taught there and its own study minutes.
  const content = loadCourse({ root: paths.content, graphDir: paths.graphLang, planned: true });
  const recipes = loadRecipes(paths.content);
  const ordered = [...projected.course].sort((a, b) => a.position - b.position);
  const itemsAt = new Map();
  for (const [id, x] of [...U.words, ...U.patterns]) { if (!itemsAt.has(x.at)) itemsAt.set(x.at, []); itemsAt.get(x.at).push(id); }
  const ours = ordered.map((m) => {
    const json = content.modules.get(m.moduleKey);
    let minutes = 0;
    if (json && recipes.byKind.has(json.kind)) {
      const t = moduleMinutes(json, recipes.time, { recipe: recipes.byKind.get(json.kind) });
      minutes = t.first_pass + t.review;
    }
    const ids = (itemsAt.get(m.position) ?? []).sort((a, b) => (U.patterns.has(a) ? 1 : 0) - (U.patterns.has(b) ? 1 : 0));
    return {
      position: m.position, unit: m.unitKey, kind: json?.kind ?? m.kind, written: json?.status !== 'planned', minutes,
      words: ids.filter((id) => U.words.has(id)), patterns: ids.filter((id) => U.patterns.has(id)), order: ids,
    };
  });

  // One cost for every order, read off our own written lessons and guides; units close with the same overhead.
  const fitRows = ours.filter((m) => m.written && TEACHING.has(m.kind) && m.minutes > 0).map((m) => ({ words: m.words.length, patterns: m.patterns.length, minutes: m.minutes }));
  const fit = fitCost(fitRows);
  const units = [...new Set(ours.map((m) => m.unit))];
  const overheadOf = (u) => ours.filter((m) => m.unit === u && !TEACHING.has(m.kind)).reduce((s, m) => s + m.minutes, 0);
  const teachingOf = (u) => ours.filter((m) => m.unit === u && TEACHING.has(m.kind)).length;
  const unit = units.reduce((s, u) => s + overheadOf(u), 0) / units.length;
  const every = Math.max(1, Math.round(units.reduce((s, u) => s + teachingOf(u), 0) / units.length));
  const cost = { c0: Math.max(0, fit.c0), cw: Math.max(0, fit.cw), cp: Math.max(0, fit.cp), unit, every, r2: fit.r2, from: fitRows.length };

  // Our course twice: at its own recipe minutes, and costed like every other order.
  const ourRecipe = ours.map((m) => ({ words: m.words, patterns: m.patterns, order: m.order, minutes: m.minutes }));
  const ourModel = ours.filter((m) => m.order.length).map((m) => ({ words: m.words, patterns: m.patterns, order: m.order, extra: !TEACHING.has(m.kind) }));
  const orders = {
    course_recipe: ourRecipe,
    course: ourModel,
    rule: pack(ruleOrder(U, { words: caps.words }), U, caps),
    textbook: pack(textbookOrder(U), U, caps),
    frequency: pack(frequencyOrder(U), U, caps),
    frequency_unpaced: pack(frequencyOrder(U, { pace: false }), U, caps),
  };
  const problems = Object.fromEntries(Object.entries(orders).filter(([k]) => k !== 'course_recipe' && k !== 'course').map(([k, l]) => [k, violations(l, U).length]));
  const series = Object.fromEntries(Object.entries(orders).map(([k, l]) => [k, simulate(l, U, cost)]));

  // Random orders: a band at each hour and at each word count.
  const maxH = Math.ceil(Math.max(...Object.values(series).map((s) => s.at(-1).minutes)) / 60);
  const hourGrid = Array.from({ length: maxH + 1 }, (_, i) => i);
  const wordGrid = Array.from({ length: Math.ceil(U.words.size / 25) + 1 }, (_, i) => i * 25);
  const rp = { hours: hourGrid.map(() => []), hoursReach: hourGrid.map(() => []), words: wordGrid.map(() => []), wordsReach: wordGrid.map(() => []) };
  for (let s = 1; s <= seeds; s += 1) {
    const sm = simulate(pack(randomOrder(U, s), U, caps), U, cost);
    hourGrid.forEach((h, i) => { rp.hours[i].push(valueAt(sm, 'minutes', h * 60, 'patterns')); rp.hoursReach[i].push(valueAt(sm, 'minutes', h * 60, 'reach')); });
    wordGrid.forEach((w, i) => { rp.words[i].push(valueAt(sm, 'words', w, 'patterns')); rp.wordsReach[i].push(valueAt(sm, 'words', w, 'reach')); });
  }
  const band = (arr) => arr.map((xs) => [quant(xs, 0.05), quant(xs, 0.5), quant(xs, 0.95)]);
  const random = { hours: hourGrid, patterns_by_hour: band(rp.hours), reach_by_hour: band(rp.hoursReach), words: wordGrid, patterns_by_words: band(rp.words), reach_by_words: band(rp.wordsReach) };

  // Where our course is ahead or behind: at the end of each of our units, against the others at the same time.
  const unitEnds = [];
  let ci = 0;
  for (const u of units) {
    const lastIdx = ours.map((m, i) => [m, i]).filter(([m]) => m.unit === u && m.order.length).map(([, i]) => i).at(-1);
    if (lastIdx === undefined) continue;
    const lessonsSoFar = ours.slice(0, lastIdx + 1).filter((m) => m.order.length).length;
    ci = lessonsSoFar - 1;
    const s = series.course[ci];
    const row = { unit: u, hours: Math.round((s.minutes / 60) * 10) / 10, words: s.words, patterns: s.patterns, reach: s.reach };
    for (const k of ['rule', 'textbook', 'frequency']) {
      row[k] = { patterns: valueAt(series[k], 'minutes', s.minutes, 'patterns'), reach: valueAt(series[k], 'minutes', s.minutes, 'reach'), words: valueAt(series[k], 'minutes', s.minutes, 'words') };
    }
    unitEnds.push(row);
  }

  // How much the answer moves with the assumptions that matter most (random orders left out).
  const variant = (name, c, cp) => {
    const lessons = {
      course: ourModel, rule: pack(ruleOrder(U, { words: cp.words }), U, cp), textbook: pack(textbookOrder(U), U, cp), frequency: pack(frequencyOrder(U), U, cp),
    };
    const sm = Object.fromEntries(Object.entries(lessons).map(([k, l]) => [k, simulate(l, U, c)]));
    return { name, at: [25, 50, 100].map((h) => ({ hours: h, ...Object.fromEntries(Object.entries(sm).map(([k, x]) => [k, { patterns: valueAt(x, 'minutes', h * 60, 'patterns'), reach: valueAt(x, 'minutes', h * 60, 'reach'), words: valueAt(x, 'minutes', h * 60, 'words') }])) })) };
  };
  const through0 = fitThroughOrigin(fitRows);
  const sensitivity = [
    variant('one pattern per lesson', cost, { words: caps.words, patterns: 1 }),
    variant('eight words per lesson', cost, { words: 8, patterns: caps.patterns }),
    variant('time by item only (no fixed lesson cost)', { ...cost, c0: 0, cw: through0.cw, cp: through0.cp }, caps),
    variant('no reading, practice and exam time', { ...cost, unit: 0 }, caps),
  ];

  const summary = summarize(series);
  const chart = Object.fromEntries(Object.entries(series).map(([k, s]) => [k, s.map((x) => [Math.round(x.minutes) / 60, x.words, x.patterns, x.reach, x.core.A1 ?? null, x.core.A2 ?? null, x.core.B1 ?? null])]));
  const data = {
    lang, about: 'Same items in every order. Columns of chart series: hours, words, patterns, reach, A1 core share, A2 core share, B1 core share.',
    items: { words: U.words.size, patterns: U.patterns.size, counted_patterns: [...U.patterns.values()].filter((p) => p.counted).length, free_words: U.free.size },
    cost: { minutes_per_lesson: round2(cost.c0), minutes_per_word: round2(cost.cw), minutes_per_pattern: round2(cost.cp), unit_minutes: round2(cost.unit), lessons_per_unit: cost.every, fit_r2: round2(cost.r2), fit_lessons: cost.from },
    caps, frequency: ranks ? 'local ranks used' : 'no local frequency file: every word weighs the same',
    order_problems: problems, summary, unit_ends: unitEnds, sensitivity, chart, random,
  };
  return { data, text: render(data) };
}

const round2 = (x) => Math.round(x * 100) / 100;

/** minutes = cw * words + cp * patterns, fitted with no fixed cost per lesson. */
function fitThroughOrigin(rows) {
  const a = rows.reduce((s, r) => s + r.words * r.words, 0);
  const b = rows.reduce((s, r) => s + r.words * r.patterns, 0);
  const c = rows.reduce((s, r) => s + r.patterns * r.patterns, 0);
  const d = rows.reduce((s, r) => s + r.words * r.minutes, 0);
  const e = rows.reduce((s, r) => s + r.patterns * r.minutes, 0);
  const det = a * c - b * b;
  return det ? { cw: Math.max(0, (d * c - b * e) / det), cp: Math.max(0, (a * e - b * d) / det) } : { cw: 0, cp: 0 };
}

const NAMES = { course_recipe: 'our course, own minutes', course: 'our course', rule: 'method rule', textbook: 'textbook order', frequency: 'frequency list', frequency_unpaced: 'frequency, unpaced' };

export function render(d) {
  const L = [];
  const pad = (s, n) => String(s).padEnd(n);
  L.push(`# Speed test (${d.lang}): the same ${d.items.words} words and ${d.items.patterns} patterns (${d.items.counted_patterns} counted) in different orders`, '');
  L.push(`Every order pays the same time: ${d.cost.minutes_per_lesson} min a lesson + ${d.cost.minutes_per_word} per new word + ${d.cost.minutes_per_pattern} per new pattern, and ${d.cost.unit_minutes} min of reading, practice and exam every ${d.cost.lessons_per_unit} lessons (fit to ${d.cost.fit_lessons} written lessons, R² ${d.cost.fit_r2}). Lessons hold at most ${d.caps.words} words and ${d.caps.patterns} patterns. ${d.items.free_words} words open from the start in every order. Frequency: ${d.frequency}.`, '');
  L.push(`Order problems (items before what they need): ${Object.entries(d.order_problems).map(([k, v]) => `${k} ${v}`).join(', ')}`, '');
  const cols = Object.keys(d.summary);
  L.push('## Patterns known, then sentence shapes (reach), at equal study hours', '');
  L.push(pad('hours', 7) + cols.map((c) => pad(NAMES[c] ?? c, 24)).join(''));
  d.summary[cols[0]].hours.forEach((_, i) => {
    L.push(pad(d.summary[cols[0]].hours[i].hours, 7) + cols.map((c) => { const x = d.summary[c].hours[i]; return pad(`${x.patterns} / ${x.reach} / ${x.words}w`, 24); }).join(''));
  });
  L.push('(patterns / reach / words)', '', '## At equal words', '');
  L.push(pad('words', 7) + cols.map((c) => pad(NAMES[c] ?? c, 24)).join(''));
  d.summary[cols[0]].words.forEach((_, i) => {
    L.push(pad(d.summary[cols[0]].words[i].words, 7) + cols.map((c) => { const x = d.summary[c].words[i]; return pad(x.hours === null ? '-' : `${x.patterns} / ${x.reach} / ${x.hours}h`, 24); }).join(''));
  });
  L.push('(patterns / reach / hours)', '', '## Core lists usable at equal hours (A1 / A2 / B1)', '');
  L.push(pad('hours', 7) + cols.map((c) => pad(NAMES[c] ?? c, 24)).join(''));
  d.summary[cols[0]].hours.forEach((_, i) => {
    L.push(pad(d.summary[cols[0]].hours[i].hours, 7) + cols.map((c) => { const x = d.summary[c].hours[i].core; return pad(['A1', 'A2', 'B1'].map((lv) => `${Math.round((x[lv] ?? 0) * 100)}%`).join(' / '), 24); }).join(''));
  });
  L.push('', '## Totals', '');
  for (const c of cols) { const t = d.summary[c].total; L.push(`${pad(NAMES[c] ?? c, 26)}${t.hours} h, ${t.words} words, ${t.patterns} patterns, reach ${t.reach}`); }
  L.push('', '## Our course at the end of each unit, against the others at the same study time', '');
  L.push(`${pad('unit', 8)}${pad('hours', 7)}${pad('ours p/reach', 15)}${pad('rule', 14)}${pad('textbook', 14)}frequency`);
  for (const u of d.unit_ends) L.push(`${pad(u.unit, 8)}${pad(u.hours, 7)}${pad(`${u.patterns}/${u.reach}`, 15)}${pad(`${u.rule.patterns}/${u.rule.reach}`, 14)}${pad(`${u.textbook.patterns}/${u.textbook.reach}`, 14)}${u.frequency.patterns}/${u.frequency.reach}`);
  L.push('', '## Sensitivity: patterns / reach / words at 25, 50 and 100 hours', '');
  for (const v of d.sensitivity ?? []) {
    L.push(v.name);
    for (const a of v.at) L.push(`  ${pad(`${a.hours} h`, 7)}${['course', 'rule', 'textbook', 'frequency'].map((k) => pad(`${NAMES[k]} ${a[k].patterns}/${a[k].reach}/${a[k].words}w`, 34)).join('')}`);
  }
  return `${L.join('\n')}\n`;
}
