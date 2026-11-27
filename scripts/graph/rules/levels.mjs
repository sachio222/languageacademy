// Levels: each module's level, coverage of the core lists, and the warnings that compare them with the course.
//
// A module's level is the highest level among the nodes it teaches (words, forms and constructions; nodeLevel), and
// a unit's level the highest level of its modules. A level counts as reached at the first position where
// settings.levelThreshold (0.9) of that level's core words and every one of its core constructions are available:
// taught by a lesson, open in the Reference unit (timeline.availableAt) or a cognate from the cognates lesson on
// (cognateOpening), because a learner can use all three.
import { issue } from '../issues.mjs';
import { moduleTeaches, cognateOpening } from '../timeline.mjs';
import { LEVELS as ORDER, CORE_LEVELS, nodeLevel, formOf, cellConstruction, POLITE_CONDITIONALS, POLITE_CONSTRUCTION } from '../levels-data.mjs';

const rank = (c) => ORDER.indexOf(c);
const LABEL = /\b(A1|A2|B1|B2|C1|C2)\+?/g;

const maxLevel = (levels) => levels.reduce((best, c) => (best === null || rank(c) > rank(best) ? c : best), null);
const byId = (a, b) => (a < b ? -1 : a > b ? 1 : 0);
const zeroes = () => Object.fromEntries(ORDER.map((l) => [l, 0]));

// Highest CEFR label found in the texts as { level, text }, where text keeps a trailing + (B2+), or null.
function labelMatch(texts) {
  let best = null;
  for (const t of texts.filter((x) => x != null)) {
    for (const m of String(t).matchAll(LABEL)) {
      if (best === null || rank(m[1]) > rank(best.level)) best = { level: m[1], text: m[0] };
    }
  }
  return best;
}

const CACHE = new WeakMap();

// Everything the rule and the report data need, computed once per check context.
function analyse(ctx) {
  if (CACHE.has(ctx)) return CACHE.get(ctx);
  const { graph, course } = ctx;
  const taughtAt = ctx.timeline.taughtAt;
  const availableAt = ctx.timeline.availableAt ?? taughtAt;
  const courseMap = graph.courseMap ?? {};
  const positions = course.map((m) => m.position);

  // Module and unit levels.
  const taughtNodes = new Map(); // position -> [{ id, level }]
  const labelTexts = new Map(); // position or `unit:<id>` -> the label as written (B2+)
  const missing = new Set();
  const modules = course.map((m) => {
    const nodes = moduleTeaches(m, courseMap[m.moduleKey]).map((id) => ({ id, level: nodeLevel(graph, id) }));
    for (const n of nodes) if (!n.level && !n.id.includes(':name:')) missing.add(n.id);
    taughtNodes.set(m.position, nodes);
    const label = labelMatch([m.title, ...(m.conceptTerms ?? [])]);
    if (label) labelTexts.set(m.position, label.text);
    return {
      position: m.position, moduleKey: m.moduleKey, unitId: m.unitId, title: m.title,
      label: label?.level ?? null,
      computed: maxLevel(nodes.map((n) => n.level).filter(Boolean)),
    };
  });
  const units = [];
  for (const [i, m] of course.entries()) {
    let u = units.find((x) => x.unitId === m.unitId);
    if (!u) {
      const label = labelMatch([m.unitTitle, m.unitDescription]);
      if (label) labelTexts.set(`unit:${m.unitId}`, label.text);
      u = {
        unitId: m.unitId, title: m.unitTitle ?? null, label: label?.level ?? null,
        computed: null, computedCount: 0, firstPosition: m.position, lastPosition: m.position,
      };
      units.push(u);
    }
    u.lastPosition = m.position;
    u.computed = maxLevel([u.computed, modules[i].computed].filter(Boolean));
  }
  // How many distinct nodes each unit teaches at its own level: a single word can set a unit's level.
  for (const u of units) {
    if (!u.computed) continue;
    const ids = new Set();
    for (const m of course) {
      if (m.unitId !== u.unitId) continue;
      for (const n of taughtNodes.get(m.position)) if (n.level === u.computed) ids.add(n.id);
    }
    u.computedCount = ids.size;
  }

  // Coverage of each core list, at every position and by the end.
  const threshold = graph.settings?.levelThreshold ?? 0.9;
  const limits = new Set((graph.readingLimits ?? []).map((r) => r.id));
  const cognateAt = cognateOpening(graph, course);
  const by = (at, id, p) => at.has(id) && at.get(id) <= p;
  const countIn = (at, ids, p) => ids.reduce((n, id) => n + (by(at, id, p) ? 1 : 0), 0);
  // How the words of a list are available at a position: taught by a lesson, else open in the Reference unit, else a
  // cognate. availableWords is the sum.
  const wordKinds = (ids, p) => {
    const out = { words: 0, referenceWords: 0, cognateWords: 0 };
    for (const id of ids) {
      if (by(taughtAt, id, p)) out.words += 1;
      else if (by(availableAt, id, p)) out.referenceWords += 1;
      else if (by(cognateAt, id, p)) out.cognateWords += 1;
    }
    return { ...out, availableWords: out.words + out.referenceWords + out.cognateWords };
  };
  // Reached counts available words and constructions; onPoint gets the counts at each point.
  const firstReached = (words, constructions, onPoint) => {
    let reachedAt = null;
    for (const point of curve) {
      const kinds = wordKinds(words, point.position);
      const c = countIn(availableAt, constructions, point.position);
      onPoint?.(point, { ...kinds, constructions: countIn(taughtAt, constructions, point.position) });
      if (reachedAt === null && kinds.availableWords >= threshold * words.length && c === constructions.length) reachedAt = point.position;
    }
    return reachedAt;
  };
  const untaught = (ids) => ids.filter((id) => !taughtAt.has(id));
  const end = positions.length ? Math.max(...positions) : 0;
  const levels = {};
  const curve = positions.map((position) => ({ position }));
  // Lists in level order, so "through A2" adds the A1 list to the A2 one.
  const lists = [...(graph.coreLists ?? [])].sort((a, b) => CORE_LEVELS.indexOf(a.level) - CORE_LEVELS.indexOf(b.level));
  const below = { words: [], constructions: [] };
  for (const list of lists) {
    const words = [...list.words].sort(byId);
    const constructions = [...list.constructions].sort(byId);
    const reachedAt = firstReached(words, constructions, (point, k) => {
      point[list.level] = {
        words: k.words, constructions: k.constructions,
        referenceWords: k.referenceWords, cognateWords: k.cognateWords, availableWords: k.availableWords,
      };
    });
    below.words.push(...words);
    below.constructions.push(...constructions);
    const counts = (ws, cs, reached) => {
      const k = wordKinds(ws, end);
      return {
        coreWords: ws.length,
        coreConstructions: cs.length,
        taughtWords: k.words,
        taughtConstructions: cs.length - untaught(cs).length,
        referenceWords: k.referenceWords,
        cognateWords: k.cognateWords,
        availableWords: k.availableWords,
        reachedAt: reached,
      };
    };
    const cumulative = counts(below.words, below.constructions, firstReached(below.words, below.constructions));
    levels[list.level] = {
      cumulative,
      ...counts(words, constructions, reachedAt),
      untaughtWords: untaught(words).filter((id) => !limits.has(id)),
      untaughtReferenceWords: untaught(words).filter((id) => !limits.has(id) && availableAt.has(id) && availableAt.get(id) <= end),
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
  const result = { report, taughtNodes, missing, labelTexts };
  CACHE.set(ctx, result);
  return result;
}

// The fr-levels.json data: { levels: { A1: { coreWords, coreConstructions, taughtWords, taughtConstructions,
// referenceWords, availableWords, reachedAt, untaughtWords, untaughtConstructions, cumulative } }, modules, units,
// curve, headwordsByLevel, constructionsByLevel, taughtByLevel, taughtCumulative, readingLimits }. taughtWords and
// taughtConstructions count what lessons teach by the end; referenceWords counts the core words taught by no lesson
// but open in the Reference unit; cognateWords the core words neither taught nor open in the Reference that are
// cognates of the language pair (cognateOpening); availableWords is the sum of the three. reachedAt reads available words. untaughtWords
// (taught by no lesson, Reference words included) leaves out the reading limits, which stay in coreWords and are
// listed in readingLimits; untaughtReferenceWords names those of them open in the Reference unit. Each core list holds only the nodes new at its level; cumulative counts the level
// together with the levels below it ({ coreWords, coreConstructions, taughtWords, taughtConstructions,
// referenceWords, cognateWords, availableWords, reachedAt }), so A2's cumulative block covers the A1 and A2 lists.
// Each curve point gives, per level, { words, constructions } taught by that position plus referenceWords,
// cognateWords and availableWords.
export function levelReport(ctx) {
  return analyse(ctx).report;
}

// The highest level reached before a position, or null. A level counts only once the course has reached it together
// with the levels below it (its cumulative block), so a course that covers the B1 list before the A1 list has not
// reached B1.
function reachedBefore(levels, position) {
  return maxLevel(Object.entries(levels)
    .filter(([, l]) => l.cumulative.reachedAt !== null && l.cumulative.reachedAt < position)
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
  const { report, taughtNodes, missing, labelTexts } = analyse(ctx);
  const name = (m) => `${m.position}. ${m.title}`;
  // A unit's unit_key by its index: the identity a unit label carries, since an inserted unit moves the index.
  const unitKeys = new Map(ctx.course.map((m) => [m.unitId, m.unitKey]));

  for (const m of report.modules) {
    if (!m.label) continue;
    if (m.computed && rank(m.label) > rank(m.computed)) {
      issues.push(issue({
        rule: 'level-label',
        severity: 'warning',
        moduleKey: m.moduleKey,
        position: m.position,
        levelLabel: { of: 'module', label: labelTexts.get(m.position), against: 'computed', value: m.computed },
        message: `${name(m)} is labelled ${labelTexts.get(m.position)} but teaches at most ${m.computed}`,
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
        levelLabel: { of: 'module', label: labelTexts.get(m.position), against: 'reached', value: reached ?? null },
        message: `${name(m)} is labelled ${labelTexts.get(m.position)} but teaches nothing, and by this position the course has `
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
        // of names the unit by its unit_key, which an inserted unit never moves (a course without keys: its index).
        levelLabel: { of: `unit:${unitKeys.get(u.unitId) ?? u.unitId}`, label: labelTexts.get(`unit:${u.unitId}`), against: 'computed', value: u.computed },
        message: `unit ${u.unitId} "${u.title}" is labelled ${labelTexts.get(`unit:${u.unitId}`)} but its modules teach at most ${u.computed}`,
      }));
    }
  }

  // Out-of-order teaching: nodes further above the highest level reached before the module than the course allows
  // (settings.levelOrder: 1 level by default, so a node two or more levels up is reported; words and patterns each
  // have their own allowance, a pattern being a construction, a paradigm or a form). Before any level is reached,
  // the learner works toward A1, so A1 is the base.
  const allowed = { words: 1, patterns: 1, ...(ctx.graph.settings?.levelOrder === 'off' ? {} : ctx.graph.settings?.levelOrder) };
  const allowance = (id) => (id.includes(':lex:') ? allowed.words : allowed.patterns);
  const levelsOf = (n) => `${n} level${n === 1 ? '' : 's'}`;
  const beyond = allowed.words === 1 && allowed.patterns === 1
    ? 'two or more levels above'
    : `further than the course allows (a word ${levelsOf(allowed.words)}, a pattern ${levelsOf(allowed.patterns)}) above`;
  for (const m of ctx.graph.settings?.levelOrder === 'off' ? [] : report.modules) {
    const reached = reachedBefore(report.levels, m.position);
    const floor = reached ?? ORDER[0];
    const ahead = withoutRepeatedForms(ctx.graph, taughtNodes.get(m.position)
      .filter((n) => n.level && rank(n.level) - rank(floor) > allowance(n.id)))
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
      message: `${name(m)} teaches ${ahead.length} word${s} or pattern${s} ${beyond} ${where}: `
        + ahead.map((n) => `${n.id} (${n.level})`).join(', '),
    }));
  }

  if (missing.size > 0) {
    issues.push(issue({
      rule: 'level-data-missing',
      severity: 'warning',
      nodes: [...missing].sort(),
      message: `${missing.size} taught words and grammar patterns have no level (A1 to C2) yet, so level labels cannot be checked`,
    }));
  }
  return issues;
}
