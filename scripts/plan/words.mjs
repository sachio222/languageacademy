// A plan word as a reader sees it: its lemma, its meaning in the native language and whether the graph holds it yet.
//
// wordReader({ repoRoot, plan, lookups }) -> (id) => { id, lemma, gloss, level, to_add, register, use }
// The meaning is the graph's first sense gloss; else the pair folder's glosses.json
// (curriculum-graph/pairs/<native>-<lang>/glosses.json, { glosses: { id: text } }); else the words_to_add entry's.
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { planPaths } from './plan.mjs';

export function wordReader({ repoRoot, plan, lookups }) {
  const file = join(planPaths(repoRoot, plan.language).pair(plan.native), 'glosses.json');
  const pair = existsSync(file) ? JSON.parse(readFileSync(file, 'utf8')).glosses ?? {} : {};
  const toAdd = new Map((plan.words_to_add ?? []).map((w) => [w.id, w]));
  return (id) => {
    const head = lookups.headwords.get(id) ?? lookups.headwords.get(lookups.forms.get(id)?.of);
    const add = toAdd.get(id);
    const lemma = lookups.forms.get(id)?.surface ?? head?.lemma ?? add?.lemma ?? id.split(':').at(-1);
    const gloss = head?.senses?.find((s) => s.gloss)?.gloss ?? pair[id] ?? add?.gloss ?? '';
    return { id, lemma, gloss, level: head?.cefr ?? add?.level ?? null, to_add: !head, register: add?.register ?? null, use: add?.use ?? head?.use ?? null };
  };
}
