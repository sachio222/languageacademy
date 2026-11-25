// A writer's day, for tests that must hold when the course moves on (final review I1, I7): Unit 12's three planned
// stubs written in a copy of the content folder, and, when the story art exists, L's story record for the reading
// added to that copy's legacy/l-sources.json (as `pnpm content:migrate l-sources` would add it).
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const write = (root, mod) => writeFileSync(join(root, 'modules', `${mod.module_key}.json`), JSON.stringify(mod, null, 2) + '\n');

export const UNIT12_STORY = {
  n: 12,
  unit: 12,
  title: 'Les Questions d’Amélie',
  titleEn: 'Amélie’s Questions',
  style: 'A.M. Cassandre, Art Deco travel posters',
  credit: 'Illustrated after the Art Deco travel posters of A.M. Cassandre',
  ext: 'webp',
  cover: 'img/reading12/cover-800.webp',
  href: 'reading12.html',
  blocks: [],
  vocab: [],
};

/** Writes unit12-reading, unit12-practice and unit12-exam as written modules under `root`; `story` adds story 12. */
export function writeUnit12(root, { story = true } = {}) {
  write(root, {
    schema: 'la-module@1',
    module_key: 'unit12-reading',
    kind: 'reading',
    status: 'written',
    title: 'Reading · {Les Questions d’Amélie}',
    description: 'A summer day in Normandy: Amélie asks her grandfather why the moon is white.',
    can_do: ['Follow a story told in questions and answers'],
    story_id: 'reading12',
    vocabulary: [
      { word_id: 'lune-fr', fr: 'la lune', gloss: 'the moon' },
      { word_id: 'grand-pere-fr', fr: 'le grand-père', gloss: 'the grandfather' },
    ],
    passage: [
      { id: 'b-1', fr: 'Amélie a huit ans. Elle est avec son grand-père.', en: 'Amélie is eight. She is with her grandfather.' },
      { id: 'b-2', fr: 'Pourquoi la lune est-elle blanche ?', en: 'Why is the moon white?' },
    ],
    items: [{ id: 'q-age', type: 'comprehension', question: '{Quel âge a Amélie ?}', cue: 'How old is Amélie?', answer: 'huit ans', accept: ['elle a huit ans'] }],
  });
  write(root, {
    schema: 'la-module@1',
    module_key: 'unit12-practice',
    kind: 'practice',
    status: 'written',
    title: 'Practice · Questions in context',
    description: 'Fill in the question words.',
    items: [{ id: 'g-pourquoi', type: 'gapfill', text: '___ la lune est-elle blanche ?', blanks: [{ answer: 'Pourquoi' }], gloss: 'Why is the moon white?' }],
    tests: { constructions: [] },
  });
  write(root, {
    schema: 'la-module@1',
    module_key: 'unit12-exam',
    kind: 'unit_exam',
    status: 'written',
    description: 'Ask any question.',
    items: [{ id: 'x-pourquoi', type: 'respond', situation: 'Ask your grandfather why.', cue: 'Why?', answer: 'pourquoi ?', accept: ['pourquoi'] }],
    tests: { constructions: [] },
  });
  if (story) {
    const file = join(root, 'legacy', 'l-sources.json');
    const l = JSON.parse(readFileSync(file, 'utf8'));
    if (!l.stories.some((s) => s.n === UNIT12_STORY.n)) l.stories.push(UNIT12_STORY);
    writeFileSync(file, JSON.stringify(l, null, 2) + '\n');
  }
}
