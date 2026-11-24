import { issue } from '../issues.mjs';
import { parseId } from '../ids.mjs';
import { entryReadings } from '../extract-teaches.mjs';

// Parts of speech that do not head a vocabulary entry when a content word follows ("il parle", "le livre").
const FUNCTION_POS = new Set(['article', 'determiner', 'pronoun', 'preposition', 'conjunction']);

// Headwords a vocabulary entry is about: every reading of its only token, or of its first content token (not an
// elision, not only function words). An entry made of function words alone ("il y a") is headed by its first token.
function entryHeads(text, ctx, isWord) {
  const toks = entryReadings(text, ctx.index, isWord);
  if (!toks.length) return [];
  const content = (t) => !/['’]$/.test(t.token.surface)
    && (t.readings.length === 0 || t.readings.some((r) => !FUNCTION_POS.has(r.pos)));
  const head = toks.length === 1 ? toks[0] : (toks.find(content) ?? toks[0]);
  return head.readings.map((r) => r.headwordId);
}

// Lex and cx IDs a lesson teaches, counting a generated word (teachesWords) only where it heads an entry.
// teachesWordsManual and teachesConstructions are explicit, so they always count.
function taughtHere(ctx, m, isWord) {
  const entry = ctx.graph.courseMap?.[m.moduleKey];
  const heads = new Set((m.vocab ?? []).flatMap((text) => entryHeads(text, ctx, isWord)));
  const out = new Set();
  for (const id of entry?.teachesWords ?? []) if (heads.has(id)) out.add(id);
  for (const id of [...(entry?.teachesWordsManual ?? []), ...(entry?.teachesConstructions ?? [])]) out.add(id);
  return [...out].filter((id) => ['lex', 'cx'].includes(parseId(id).kind));
}

// Twin headwords share a lemma and part of speech (vous / vous.pronoun) and are reported together.
function twinKey(ctx, id) {
  const n = ctx.graph.nodes.get(id);
  return parseId(id).kind === 'lex' && n?.lemma ? `${n.lemma}|${n.pos ?? ''}` : id;
}

export function ruleDuplicates(ctx) {
  const isWord = (f) => ctx.index.has(f) || ctx.graph.names.has(f);
  const where = new Map(); // nodeId -> lesson modules in course order
  for (const m of ctx.course) {
    if (m.kind !== 'lesson') continue;
    for (const id of taughtHere(ctx, m, isWord)) {
      if (!where.has(id)) where.set(id, []);
      where.get(id).push(m);
    }
  }
  const groups = new Map(); // twin key -> node IDs, in first-taught order
  for (const id of where.keys()) {
    const k = twinKey(ctx, id);
    if (!groups.has(k)) groups.set(k, []);
    groups.get(k).push(id);
  }
  const issues = [];
  for (const ids of groups.values()) {
    const repeated = ids.filter((id) => where.get(id).length >= 2);
    if (!repeated.length) continue;
    // reported on the earliest second teaching, merged into that node's first lesson
    const lead = [...repeated].sort((a, b) => where.get(a)[1].position - where.get(b)[1].position)[0];
    const [first, second] = where.get(lead);
    const positions = (id) => where.get(id).map((x) => x.position).join(', ');
    issues.push(issue({
      rule: 'taught-twice',
      severity: 'warning',
      moduleKey: second.moduleKey,
      position: second.position,
      nodeId: ids[0],
      ...(ids.length > 1 ? { nodeIds: ids } : {}),
      message: ids.map((id, i) => (i === 0 ? `${id} is taught at positions ${positions(id)}` : `${id} at positions ${positions(id)}`)).join('; '),
      fix: { kind: 'merge-duplicate', moduleKey: first.moduleKey },
    }));
  }
  return issues;
}
