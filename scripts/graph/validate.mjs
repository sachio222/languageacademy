import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { issue } from './issues.mjs';
import { parseId } from './ids.mjs';
import { GROUPS, LEVELS } from './functions.mjs';
import { nodeLevel } from './levels-data.mjs';

// opts.course and opts.repoRoot turn on the help screen checks: every help module names its screen component in
// the course map, and that file exists. opts.course also checks that the language pair's cognates lesson is in the
// course.
export function validateGraph(graph, opts = {}) {
  const out = [];

  for (const id of graph.duplicates || []) {
    out.push(issue({ rule: 'duplicate-id', nodeId: id, message: `ID appears more than once: ${id}`, fix: { kind: 'merge-duplicate' } }));
  }

  for (const node of graph.nodes.values()) {
    try {
      parseId(node.id);
    } catch (err) {
      out.push(issue({ rule: 'malformed-id', nodeId: node.id, message: err.message }));
    }
  }

  const ref = (fromId, field, target) => {
    if (!graph.nodes.has(target)) {
      out.push(issue({
        rule: 'dangling-ref',
        nodeId: fromId,
        message: `${fromId}.${field} points at missing node ${target}`,
        fix: { kind: 'add-to-graph' },
      }));
    }
  };

  for (const f of graph.forms) if (f.of) ref(f.id, 'of', f.of);
  for (const h of graph.headwords) for (const p of h.paradigms || []) ref(h.id, 'paradigms', p);
  for (const n of [...graph.paradigms, ...graph.constructions]) {
    for (const t of n.needs || []) ref(n.id, 'needs', t);
    for (const t of n.contrastsWith || []) ref(n.id, 'contrastsWith', t);
  }
  for (const [moduleKey, entry] of Object.entries(graph.courseMap || {})) {
    const from = `courseMap:${moduleKey}`;
    for (const field of ['teachesConstructions', 'teachesWordsManual', 'excludeWords', 'tests', 'preTeach']) {
      for (const t of entry[field] || []) ref(from, field, t);
    }
    // An ignore entry is a node ID (has a colon) or a plain word; only node IDs can dangle.
    for (const [itemRef, o] of Object.entries(entry.overrides || {})) {
      for (const t of o?.ignore || []) if (String(t).includes(':')) ref(from, `overrides[${itemRef}].ignore`, String(t));
    }
  }

  // Functions and exponents: each function has one of the six groups and a CEFR level; each exponent names a
  // function and at least one language node, all of them in the graph.
  const functionIds = new Set((graph.functions ?? []).map((f) => f.id));
  for (const f of graph.functions ?? []) {
    if (!GROUPS.includes(f.group)) {
      out.push(issue({
        rule: 'function-bad-group', nodeId: f.id,
        message: `${f.id} has group ${JSON.stringify(f.group)}, which is not one of ${GROUPS.join(', ')}`,
      }));
    }
    if (!LEVELS.includes(f.cefr)) {
      out.push(issue({
        rule: 'function-bad-level', nodeId: f.id,
        message: `${f.id} has level ${JSON.stringify(f.cefr)}, which is not one of ${LEVELS.join(', ')}`,
      }));
    }
  }
  (graph.exponents ?? []).forEach((e, index) => {
    const from = `exponents[${index}]`;
    if (!functionIds.has(e.function)) {
      out.push(issue({
        rule: 'dangling-ref', nodeId: from,
        message: `${from}.function points at missing function ${e.function}`, fix: { kind: 'add-to-graph' },
      }));
    }
    if (!Array.isArray(e.nodes) || e.nodes.length === 0) {
      out.push(issue({ rule: 'exponent-empty', nodeId: from, message: `${from} (${e.function}) lists no nodes` }));
    }
    for (const t of e.nodes ?? []) {
      if (functionIds.has(t)) {
        out.push(issue({
          rule: 'dangling-ref', nodeId: from,
          message: `${from}.nodes names the function ${t}; an exponent lists language nodes only`,
        }));
      } else ref(from, 'nodes', t);
    }
  });

  // Core lists: every node is in the graph and has the list's level. Reading limits name headwords.
  for (const list of graph.coreLists ?? []) {
    const from = `core:${list.lang ?? graph.lang}-${list.level}`;
    for (const field of ['words', 'constructions']) {
      for (const id of list[field] ?? []) {
        if (!graph.nodes.has(id)) { ref(from, field, id); continue; }
        const level = nodeLevel(graph, id);
        if (level === list.level) continue;
        out.push(issue({
          rule: 'core-level-mismatch', nodeId: id,
          message: `${id} is in the ${list.level} core list but has level ${level ?? 'none'}; move it to the list of its level or change its level`,
        }));
      }
    }
  }
  for (const r of graph.readingLimits ?? []) {
    if (!graph.nodes.has(r.id)) { ref('readingLimits', 'id', r.id); continue; }
    if (parseId(r.id).kind === 'lex') continue;
    out.push(issue({
      rule: 'reading-limit-not-headword', nodeId: r.id,
      message: `reading-limits.json names ${r.id}, which is not a headword; list the headword (fr:lex:...) whose forms the checker cannot read`,
    }));
  }

  // The language pair: every cognate and false friend is a node, none is both, and the cognates lesson is in the course.
  const pair = graph.pair;
  if (pair) {
    const from = `pair:${pair.native}-${pair.target ?? graph.lang}`;
    for (const field of ['words', 'falseFriends']) for (const w of pair[field] ?? []) ref(from, field, w.id);
    const falseFriends = new Set((pair.falseFriends ?? []).map((w) => w.id));
    for (const w of pair.words ?? []) {
      if (!falseFriends.has(w.id)) continue;
      out.push(issue({
        rule: 'cognate-conflict', nodeId: w.id,
        message: `${from} lists ${w.id} both as a cognate and as a false friend; keep it in one list`,
      }));
    }
    if (pair.lesson && opts.course && !opts.course.some((m) => m.moduleKey === pair.lesson)) {
      out.push(issue({
        rule: 'dangling-ref', nodeId: from,
        message: `${from} names the cognates lesson ${pair.lesson}, which is not in the course`,
      }));
    }
  }

  for (const m of opts.course ?? []) {
    if (m.kind !== 'help' || typeof graph.courseMap?.[m.moduleKey]?.screen === 'string') continue;
    out.push(issue({
      rule: 'screen-missing', moduleKey: m.moduleKey, position: m.position,
      message: `${m.moduleKey} is a help module, but course-map.json names no screen component for it`,
    }));
  }
  if (opts.repoRoot) {
    for (const [moduleKey, entry] of Object.entries(graph.courseMap || {})) {
      if (typeof entry.screen !== 'string' || existsSync(join(opts.repoRoot, entry.screen))) continue;
      out.push(issue({
        rule: 'dangling-ref', nodeId: `courseMap:${moduleKey}`, moduleKey,
        message: `courseMap:${moduleKey}.screen points at missing file ${entry.screen}`,
      }));
    }
  }

  for (const c of graph.constructions) {
    const m = c.examples && c.examples.match;
    if (!Array.isArray(m) || m.length === 0) {
      out.push(issue({
        rule: 'construction-no-examples',
        nodeId: c.id,
        message: `Construction ${c.id} has no examples.match`,
        fix: { kind: 'add-to-graph' },
      }));
    }
  }
  return out;
}
