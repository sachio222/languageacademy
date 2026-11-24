// Levels: each module's level, coverage of the core lists, and the warnings that compare them with the course.
//
// A module's level is the highest level among the nodes it teaches (words, forms and constructions; nodeLevel), and
// a unit's level the highest level of its modules. A level counts as reached at the first position where the course
// has taught settings.levelThreshold (0.9) of that level's core words and every one of its core constructions.
import { issue } from '../issues.mjs';
import { LEVELS as ORDER } from '../functions.mjs';
import { nodeLevel, formOf, cellConstruction, POLITE_CONDITIONALS, POLITE_CONSTRUCTION } from '../levels-data.mjs';

const rank = (c) => ORDER.indexOf(c);
const LABEL = /\b(A1|A2|B1|B2|C1|C2)\+?/g;
const TEACHING = new Set(['lesson', 'help']);
const TEACH_FIELDS = ['teachesWords', 'teachesWordsManual', 'teachesConstructions'];

const maxLevel = (levels) => levels.reduce((best, c) => (best === null || rank(c) > rank(best) ? c : best), null);
const byId = (a, b) => (a < b ? -1 : a > b ? 1 : 0);
const zeroes = () => Object.fromEntries(ORDER.map((l) => [l, 0]));

// Highest CEFR label found in the texts, or null.
function labelLevel(texts) {
  return maxLevel(texts.filter((t) => t != null).flatMap((t) => [...String(t).matchAll(LABEL)].map((m) => m[1])));
}

// Node IDs a module teaches, as the timeline credits them: lessons and help pages through their teaches fields,
// readings through preTeach, other modules nothing.
export function moduleTeaches(m, entry) {
  if (!entry) return [];
  const fields = TEACHING.has(m.kind) ? TEACH_FIELDS : m.kind === 'reading' ? ['preTeach'] : [];
  return [...new Set(fields.flatMap((f) => entry[f] ?? []))];
}

const CACHE = new WeakMap();

// Everything the rule and the report data need, computed once per check context.
function analyse(ctx) {
  if (CACHE.has(ctx)) return CACHE.get(ctx);
  const { graph, course } = ctx;
  const taughtAt = ctx.timeline.taughtAt;
  const courseMap = graph.courseMap ?? {};
  const positions = course.map((m) => m.position);

  // Module and unit levels.
  const taughtNodes = new Map(); // position -> [{ id, level }]
  const missing = new Set();
  const modules = course.map((m) => {
    const nodes = moduleTeaches(m, courseMap[m.moduleKey]).map((id) => ({ id, level: nodeLevel(graph, id) }));
    for (const n of nodes) if (!n.level && !n.id.includes(':name:')) missing.add(n.id);
    taughtNodes.set(m.position, nodes);
    return {
      position: m.position, moduleKey: m.moduleKey, unitId: m.unitId, title: m.title,
      label: labelLevel([m.title, ...(m.conceptTerms ?? [])]),
      computed: maxLevel(nodes.map((n) => n.level).filter(Boolean)),
    };
  });
  const units = [];
  for (const [i, m] of course.entries()) {
    let u = units.find((x) => x.unitId === m.unitId);
    if (!u) {
      u = {
        unitId: m.unitId, title: m.unitTitle ?? null, label: labelLevel([m.unitTitle, m.unitDescription]),
        computed: null, firstPosition: m.position, lastPosition: m.position,
      };
      units.push(u);
    }
    u.lastPosition = m.position;
    u.computed = maxLevel([u.computed, modules[i].computed].filter(Boolean));
  }

  // Coverage of each core list, at every position and by the end.
  const threshold = graph.settings?.levelThreshold ?? 0.9;
  const limits = new Set((graph.readingLimits ?? []).map((r) => r.id));
  const countAt = (ids, p) => ids.reduce((n, id) => n + (taughtAt.has(id) && taughtAt.get(id) <= p ? 1 : 0), 0);
  const levels = {};
  const curve = positions.map((position) => ({ position }));
  for (const list of graph.coreLists ?? []) {
    const words = [...list.words].sort(byId);
    const constructions = [...list.constructions].sort(byId);
    let reachedAt = null;
    for (const point of curve) {
      const w = countAt(words, point.position);
      const c = countAt(constructions, point.position);
      point[list.level] = { words: w, constructions: c };
      if (reachedAt === null && w >= threshold * words.length && c === constructions.length) reachedAt = point.position;
    }
    const untaught = (ids) => ids.filter((id) => !taughtAt.has(id));
    levels[list.level] = {
      coreWords: words.length,
      coreConstructions: constructions.length,
      taughtWords: words.length - untaught(words).length,
      taughtConstructions: constructions.length - untaught(constructions).length,
      reachedAt,
      untaughtWords: untaught(words).filter((id) => !limits.has(id)),
      untaughtConstructions: untaught(constructions),
    };
  }

  // Headwords and constructions by level: in the graph, taught by the end, and taught by the end of each unit.
  const tally = (nodes, keep) => {
    const out = zeroes();
    for (const n of nodes) {
      const level = nodeLevel(graph, n.id);
      if (level && keep(n.id)) out[level] += 1;
    }
    return out;
  };
  const headwords = graph.headwords ?? [];
  const grammar = [...(graph.constructions ?? []), ...(graph.paradigms ?? [])];
  const all = () => true;
  const taught = (id) => taughtAt.has(id);
  const taughtCumulative = units.map((u) => ({
    unitId: u.unitId,
    position: u.lastPosition,
    ...tally(headwords, (id) => taught(id) && taughtAt.get(id) <= u.lastPosition),
  }));

  const readingLimits = (graph.readingLimits ?? []).map((r) => ({
    id: r.id, cefr: nodeLevel(graph, r.id), cells: r.cells ?? [], taughtAt: taughtAt.get(r.id) ?? null,
  })).sort((a, b) => byId(a.id, b.id));

  const report = {
    levels,
    modules,
    units,
    curve,
    headwordsByLevel: tally(headwords, all),
    constructionsByLevel: tally(grammar, all),
    taughtByLevel: { headwords: tally(headwords, taught), constructions: tally(grammar, taught) },
    taughtCumulative,
    readingLimits,
  };
  const result = { report, taughtNodes, missing };
  CACHE.set(ctx, result);
  return result;
}

// The fr-levels.json data: { levels: { A1: { coreWords, coreConstructions, taughtWords, taughtConstructions,
// reachedAt, untaughtWords, untaughtConstructions } }, modules, units, curve, headwordsByLevel, constructionsByLevel,
// taughtByLevel, taughtCumulative, readingLimits }. untaughtWords leaves out the reading limits, which stay in
// coreWords and are listed in readingLimits.
export function levelReport(ctx) {
  return analyse(ctx).report;
}

// The highest level reached before a position, or null.
function reachedBefore(levels, position) {
  return maxLevel(Object.entries(levels)
    .filter(([, l]) => l.reachedAt !== null && l.reachedAt < position)
    .map(([level]) => level));
}

// The construction that sets a form's level (the polite conditionals take je voudrais), or null.
function formConstruction(form) {
  if (POLITE_CONDITIONALS[form.headwordId]?.includes(form.cell)) return POLITE_CONSTRUCTION;
  return cellConstruction(form.cell);
}

// Drops a form whose headword or tense pattern is in the same list: the form only repeats it.
function withoutRepeatedForms(graph, nodes) {
  const ids = new Set(nodes.map((n) => n.id));
  return nodes.filter((n) => {
    const form = formOf(graph, n.id);
    return !form || !(ids.has(form.headwordId) || ids.has(formConstruction(form)));
  });
}

export function ruleLevels(ctx) {
  const issues = [];
  const { report, taughtNodes, missing } = analyse(ctx);

  for (const m of report.modules) {
    if (!m.label) continue;
    if (m.computed && rank(m.label) > rank(m.computed)) {
      issues.push(issue({
        rule: 'level-label',
        severity: 'warning',
        moduleKey: m.moduleKey,
        position: m.position,
        message: `${m.moduleKey} is labelled ${m.label} but teaches at most ${m.computed}`,
      }));
    }
    // A module that teaches nothing (a reading, practice set or exam) has no level of its own, so its label is a
    // claim about the learner: compare it with the highest level the course has reached by then.
    const reached = reachedBefore(report.levels, m.position + 1);
    if (!taughtNodes.get(m.position).length && (!reached || rank(m.label) > rank(reached))) {
      issues.push(issue({
        rule: 'level-label',
        severity: 'warning',
        moduleKey: m.moduleKey,
        position: m.position,
        message: `${m.moduleKey} is labelled ${m.label} but teaches nothing, and by this position the course has `
          + (reached ? `reached ${reached}` : 'reached no level yet'),
      }));
    }
  }
  for (const u of report.units) {
    if (u.computed && u.label && rank(u.label) > rank(u.computed)) {
      const first = report.modules.find((m) => m.position === u.firstPosition);
      issues.push(issue({
        rule: 'level-label',
        severity: 'warning',
        moduleKey: first.moduleKey,
        position: first.position,
        message: `unit ${u.unitId} "${u.title}" is labelled ${u.label} but its modules teach at most ${u.computed}`,
      }));
    }
  }

  // Out-of-order teaching: nodes two or more levels above the highest level reached before the module. Before any
  // level is reached, the learner works toward A1, so A1 is the base.
  for (const m of report.modules) {
    const reached = reachedBefore(report.levels, m.position);
    const floor = reached ?? ORDER[0];
    const ahead = withoutRepeatedForms(ctx.graph, taughtNodes.get(m.position)
      .filter((n) => n.level && rank(n.level) - rank(floor) >= 2))
      .sort((a, b) => rank(b.level) - rank(a.level) || byId(a.id, b.id));
    if (!ahead.length) continue;
    const where = reached
      ? `${floor}, the highest level the course has reached before it`
      : `${floor}, before the course has reached any level`;
    const s = ahead.length === 1 ? '' : 's';
    issues.push(issue({
      rule: 'level-order',
      severity: 'warning',
      moduleKey: m.moduleKey,
      position: m.position,
      nodes: ahead.map((n) => n.id),
      nodeLevels: ahead,
      message: `${m.moduleKey} teaches ${ahead.length} word${s} or pattern${s} two or more levels above ${where}: `
        + ahead.map((n) => `${n.id} (${n.level})`).join(', '),
    }));
  }

  if (missing.size > 0) {
    issues.push(issue({
      rule: 'level-data-missing',
      severity: 'warning',
      message: `${missing.size} taught words and grammar patterns have no level (A1 to C2) yet, so level labels cannot be checked`,
    }));
  }
  return issues;
}
