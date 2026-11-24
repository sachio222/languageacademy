import { fold } from './tokenize.mjs';
import { parseId } from '../ids.mjs';

// Reflexive lemmas ("se lever", "s'appeler"): paradigms apply to the verb part.
const REFLEXIVE_RE = /^(?:se |s['’])(.+)$/i;

function verbPart(lemma) {
  const m = REFLEXIVE_RE.exec(lemma);
  return m ? m[1] : null;
}

function add(index, key, reading) {
  const list = index.get(key) ?? [];
  const dup = list.some((r) => r.nodeId === reading.nodeId && r.headwordId === reading.headwordId
    && r.cell === reading.cell && r.via === reading.via && r.paradigmId === reading.paradigmId);
  if (!dup) list.push(reading);
  index.set(key, list);
}

// FormIndex: Map<fold(surface), Reading[]>. Names are not indexed.
export function buildFormIndex(graph) {
  const index = new Map();
  const irregular = new Set();

  for (const f of graph.forms) {
    irregular.add(`${f.of}|${f.cell}`);
    add(index, fold(f.surface), {
      nodeId: f.id, headwordId: f.of, cell: f.cell, via: 'irregular', paradigmId: null,
    });
  }

  for (const h of graph.headwords) {
    const lemmaReading = { nodeId: h.id, headwordId: h.id, cell: null, via: 'lemma', paradigmId: null };
    add(index, fold(h.lemma), lemmaReading);
    const base = verbPart(h.lemma);
    if (base) add(index, fold(base), lemmaReading);

    const stem = base ?? h.lemma;
    const key = parseId(h.id).key;
    for (const pid of h.paradigms ?? []) {
      const paradigm = graph.nodes.get(pid);
      if (!paradigm) continue;
      for (const rule of paradigm.rules ?? []) {
        if (!stem.endsWith(rule.strip)) continue;
        if (irregular.has(`${h.id}|${rule.cell}`)) continue;
        const surface = stem.slice(0, stem.length - rule.strip.length) + rule.add;
        add(index, fold(surface), {
          nodeId: `${graph.lang}:form:${key}.${rule.cell}`,
          headwordId: h.id,
          cell: rule.cell,
          via: 'generated',
          paradigmId: pid,
        });
      }
    }
  }
  return index;
}

// Lookup key for a token: strip a leading hyphen and a euphonic "t-" (-t-il).
export function lookupKey(token) {
  let f = token.fold;
  if (f.startsWith('-')) {
    f = f.slice(1);
    if (f.startsWith('t-')) f = f.slice(2);
  }
  return f;
}

export function lookupToken(index, token) {
  return index.get(lookupKey(token)) ?? [];
}
