import { parseId } from '../ids.mjs';

const FIELDS = ['teachesWords', 'teachesWordsManual', 'teachesConstructions'];

// Unique lex and cx IDs a course-map entry teaches (forms are not counted).
export function taughtNodeIds(entry) {
  const out = new Set();
  for (const f of FIELDS) {
    for (const id of entry?.[f] ?? []) {
      const { kind } = parseId(id);
      if (kind === 'lex' || kind === 'cx') out.add(id);
    }
  }
  return [...out];
}
