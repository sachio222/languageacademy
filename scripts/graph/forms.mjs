// The form index every language reads text with: Map<fold(surface), Reading[]> over the word list's lemmas, its
// irregular forms and the forms its paradigms generate. Names are not indexed. makeForms takes what differs by
// language: fold and norm, any extra spelling a lemma is looked up by (French: the verb of a reflexive lemma, lever for
// se lever), and how a token's lookup key is cut from its folded spelling (French: a leading hyphen and the euphonic t
// of -t-il). A language module spreads the result into its own members (language.mjs).
import { parseId } from './ids.mjs';

function add(index, key, reading) {
  const list = index.get(key) ?? [];
  const dup = list.some((r) => r.nodeId === reading.nodeId && r.headwordId === reading.headwordId
    && r.cell === reading.cell && r.via === reading.via && r.paradigmId === reading.paradigmId);
  if (!dup) list.push(reading);
  index.set(key, list);
}

export function makeForms({ fold, norm, lemmaBase = () => null, cutKey = (s) => s }) {
  function buildFormIndex(graph) {
    const index = new Map();
    const irregular = new Set();
    const posOf = new Map(graph.headwords.map((h) => [h.id, h.pos ?? null]));

    for (const f of graph.forms) {
      irregular.add(`${f.of}|${f.cell}`);
      add(index, fold(f.surface), {
        nodeId: f.id, headwordId: f.of, cell: f.cell, via: 'irregular', paradigmId: null, surface: norm(f.surface),
        pos: posOf.get(f.of) ?? null,
      });
    }

    for (const h of graph.headwords) {
      const lemmaReading = (text) => ({
        nodeId: h.id, headwordId: h.id, cell: null, via: 'lemma', paradigmId: null, surface: norm(text), pos: h.pos ?? null,
      });
      add(index, fold(h.lemma), lemmaReading(h.lemma));
      const base = lemmaBase(h.lemma);
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
            pos: h.pos ?? null,
          });
        }
      }
    }
    return index;
  }

  // Lookup key for a token, and the same key with accents kept (from token.norm).
  const lookupKey = (token) => cutKey(token.fold);
  const strictKey = (token) => cutKey(token.norm);
  const lookupToken = (index, token) => index.get(lookupKey(token)) ?? [];
  // Accent-sensitive lookup: only readings whose written surface equals the token's.
  const lookupTokenStrict = (index, token) => {
    const key = strictKey(token);
    return lookupToken(index, token).filter((r) => r.surface === key);
  };
  return { buildFormIndex, lookupKey, strictKey, lookupToken, lookupTokenStrict };
}
