import { issue } from './issues.mjs';
import { parseId } from './ids.mjs';

export function validateGraph(graph) {
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
    for (const t of entry.teachesConstructions || []) ref(`courseMap:${moduleKey}`, 'teachesConstructions', t);
    for (const t of entry.excludeWords || []) ref(`courseMap:${moduleKey}`, 'excludeWords', t);
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
