// Stem spelling of -er verbs, read through the checker's form index: a verb whose last stem vowel is é before one or
// more consonants (céder, régler, intégrer), or before consonants and the u of -guer and -quer (déléguer), writes è
// where the ending is a silent e: je cède, tu règles, il intègre, ils délèguent, in the present and the subjunctive.
// The sweep covers every such verb in the word list that takes the regular -er present.
import test from 'node:test';
import assert from 'node:assert/strict';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadGraph } from '../load.mjs';
import { buildFormIndex } from '../fr/forms.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const graph = loadGraph(join(here, '..', '..', '..', 'curriculum-graph'), 'fr');
const index = buildFormIndex(graph);

// Each cell's surfaces for a headword, as the checker reads them (irregular forms replace the generated ones).
function surfaces(headwordId, cell) {
  const out = [];
  for (const readings of index.values()) {
    for (const r of readings) if (r.headwordId === headwordId && r.cell === cell) out.push(r.surface);
  }
  return out;
}

const SILENT = { '1sg': 'e', '2sg': 'es', '3sg': 'e', '3pl': 'ent' };
const STEM = /é([^aeiouyàâäéèêëîïôöùûü]+u?)er$/;
const verbs = graph.headwords.filter((h) => h.pos === 'verb' && STEM.test(h.lemma)
  && (h.paradigms ?? []).includes('fr:cx:verb.er.present'));

test('the sweep finds the é-stem verbs, déléguer among them', () => {
  const lemmas = verbs.map((h) => h.lemma);
  for (const l of ['céder', 'régler', 'préférer', 'déléguer']) assert.ok(lemmas.includes(l), l);
});

test('every é + consonants (+ u) + er verb writes è before a silent e in the present and subjunctive', () => {
  const wrong = [];
  for (const h of verbs) {
    const stem = h.lemma.slice(0, -2).replace(/é([^aeiouyàâäéèêëîïôöùûü]+u?)$/, 'è$1');
    for (const tense of ['prs', 'sbjv']) {
      for (const [person, ending] of Object.entries(SILENT)) {
        const cell = `${tense}.${person}`;
        const got = surfaces(h.id, cell);
        if (got.length !== 1 || got[0] !== stem + ending) wrong.push(`${h.lemma} ${cell}: ${got.join('/') || 'none'}`);
      }
    }
  }
  assert.deepEqual(wrong, []);
});

test('a verb with é before a vowel or before qu keeps its stem: éduquer, créer', () => {
  for (const [lemma, cell, surface] of [['éduquer', 'prs.3sg', 'éduque'], ['créer', 'prs.3sg', 'crée']]) {
    const h = graph.headwords.find((x) => x.lemma === lemma && x.pos === 'verb');
    assert.ok(h, lemma);
    assert.deepEqual(surfaces(h.id, cell), [surface], lemma);
  }
});
