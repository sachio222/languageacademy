import { fold, norm } from './tokenize.mjs';
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
      nodeId: f.id, headwordId: f.of, cell: f.cell, via: 'irregular', paradigmId: null, surface: norm(f.surface),
    });
  }

  for (const h of graph.headwords) {
    const lemmaReading = (text) => ({
      nodeId: h.id, headwordId: h.id, cell: null, via: 'lemma', paradigmId: null, surface: norm(text),
    });
    add(index, fold(h.lemma), lemmaReading(h.lemma));
    const base = verbPart(h.lemma);
    if (base) add(index, fold(base), lemmaReading(base));

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
          surface: norm(surface),
        });
      }
    }
  }
  return index;
}

function stripClitic(f) {
  if (f.startsWith('-')) {
    f = f.slice(1);
    if (f.startsWith('t-')) f = f.slice(2);
  }
  return f;
}

// Lookup key for a token: strip a leading hyphen and a euphonic "t-" (-t-il).
export function lookupKey(token) {
  return stripClitic(token.fold);
}

// The same key with accents kept (from token.norm).
export function strictKey(token) {
  return stripClitic(token.norm);
}

export function lookupToken(index, token) {
  return index.get(lookupKey(token)) ?? [];
}

// Accent-sensitive lookup: only readings whose written surface equals the token's.
export function lookupTokenStrict(index, token) {
  const key = strictKey(token);
  return lookupToken(index, token).filter((r) => r.surface === key);
}
