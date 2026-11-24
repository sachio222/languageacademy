import { tokenize, fold } from '../fr/tokenize.mjs';
import { lookupToken } from '../fr/forms.mjs';
import { detectConstructions } from '../fr/detect.mjs';
import { issue } from '../issues.mjs';

const memo = new WeakMap();

// Per item: one entry for each text in french then lenient.
// Returns Map<itemRef, Array<{ text, tokens, readings, constructions }>>.
export function analyzeItems(ctx) {
  const cached = memo.get(ctx);
  if (cached) return cached;
  const { graph, index } = ctx;
  const isWord = (f) => index.has(f) || graph.names.has(f);
  const out = new Map();
  for (const m of ctx.course) {
    for (const it of m.items) {
      const texts = [...new Set([...(it.french ?? []), ...(it.lenient ?? [])])];
      out.set(it.ref, texts.map((text) => {
        const tokens = tokenize(text, { isWord });
        const readings = tokens.map((t) => lookupToken(index, t));
        const constructions = detectConstructions(tokens, readings, graph.constructions ?? []);
        return { text, tokens, readings, constructions };
      }));
    }
  }
  memo.set(ctx, out);
  return out;
}

// Map<headwordId | fold | constructionId, { moduleKey, position }>: the first module that uses it.
export function firstUse(ctx) {
  const analysis = analyzeItems(ctx);
  const first = new Map();
  const note = (key, m) => {
    if (!first.has(key) || m.position < first.get(key).position) {
      first.set(key, { moduleKey: m.moduleKey, position: m.position });
    }
  };
  for (const m of ctx.course) {
    for (const it of m.items) {
      for (const a of analysis.get(it.ref) ?? []) {
        a.tokens.forEach((t, i) => {
          if (ctx.graph.names.has(t.fold)) return;
          const rs = a.readings[i];
          if (rs.length === 0) note(t.fold, m);
          else for (const r of rs) note(r.headwordId, m);
        });
        for (const id of a.constructions) note(id, m);
      }
    }
  }
  return first;
}

const suppressions = (ctx, moduleKey, itemRef) => {
  const list = ctx.graph.courseMap?.[moduleKey]?.overrides?.[itemRef]?.ignore ?? [];
  return new Set(list.map((x) => (String(x).includes(':') ? String(x) : fold(String(x)))));
};

export function ruleTaughtBefore(ctx) {
  const { graph, timeline } = ctx;
  const analysis = analyzeItems(ctx);
  const first = firstUse(ctx);
  const titleAt = new Map(ctx.course.map((m) => [m.position, m.title]));
  const issues = [];

  const laterNote = (id, position) => {
    const at = timeline.taughtAt.get(id);
    return at !== undefined && at > position ? at : null;
  };
  const taughtClause = (at) => `taught later at position ${at} (${titleAt.get(at) ?? 'unknown module'})`;

  for (const m of ctx.course) {
    const seen = new Set();
    for (const it of m.items) {
      const ignore = suppressions(ctx, m.moduleKey, it.ref);
      for (const a of analysis.get(it.ref) ?? []) {
        a.tokens.forEach((t, i) => {
          if (graph.names.has(t.fold) || ignore.has(t.fold)) return;
          const key = `${m.moduleKey}|${t.fold}`;
          if (seen.has(key)) return;
          const rs = a.readings[i];
          const base = { moduleKey: m.moduleKey, position: m.position, itemRef: it.ref, surface: t.surface };
          if (rs.length === 0) {
            seen.add(key);
            issues.push(issue({
              ...base, rule: 'unknown-word',
              message: `"${t.surface}" is not in the graph (${it.ref}: ${a.text})`,
              fix: { kind: 'add-to-graph', moduleKey: first.get(t.fold)?.moduleKey ?? m.moduleKey },
            }));
            return;
          }
          if (rs.some((r) => timeline.isReadingAvailable(r, m.position))) return;
          seen.add(key);
          const heads = [...new Set(rs.map((r) => r.headwordId))];
          const laters = heads.map((h) => laterNote(h, m.position)).filter((x) => x !== null);
          const taughtEarlier = heads.some((h) => timeline.isAvailable(h, m.position));
          let tail = 'it is not taught anywhere in the course';
          if (laters.length) tail = taughtClause(Math.min(...laters));
          else if (taughtEarlier) tail = 'the word is taught earlier, but this form is not';
          const useAt = heads.map((h) => first.get(h)).filter(Boolean)
            .sort((x, y) => x.position - y.position)[0];
          issues.push(issue({
            ...base, rule: 'untaught-word', nodeId: heads[0],
            message: `"${t.surface}" is used before it is taught (${it.ref}: ${a.text}); ${tail}`,
            fix: { kind: 'teach-earlier', moduleKey: useAt?.moduleKey ?? m.moduleKey },
          }));
        });
        for (const id of a.constructions) {
          const key = `${m.moduleKey}|${id}`;
          if (seen.has(key) || ignore.has(id) || timeline.isAvailable(id, m.position)) continue;
          seen.add(key);
          const at = laterNote(id, m.position);
          issues.push(issue({
            rule: 'untaught-construction', moduleKey: m.moduleKey, position: m.position,
            itemRef: it.ref, nodeId: id,
            message: `${id} is used before it is taught (${it.ref}: ${a.text}); ${at ? taughtClause(at) : 'it is not taught anywhere in the course'}`,
            fix: { kind: 'teach-earlier', moduleKey: first.get(id)?.moduleKey ?? m.moduleKey },
          }));
        }
      }
    }
  }
  return issues;
}
