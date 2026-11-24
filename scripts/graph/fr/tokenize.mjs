import { fold, norm } from '../fold.mjs';

export { fold, norm };

const ELISIONS = ['jusqu', 'lorsqu', 'puisqu', 'qu', 'c', 'd', 'j', 'l', 'm', 'n', 's', 't'];
const ELISION_RE = new RegExp(`^(${ELISIONS.join('|')})['’ʼ‘]`, 'i');
// Longest first so "-t-il" wins over "-il".
const CLITICS = [
  '-t-elle', '-t-il', '-t-on',
  '-elles', '-nous', '-vous', '-leur', '-elle', '-ils', '-les', '-lui', '-moi', '-toi',
  '-tu', '-il', '-on', '-ce', '-le', '-la', '-en', '-y',
];
// A word run: letters joined by apostrophes or hyphens. Digits, underscores and punctuation fall outside.
const RUN_RE = /\p{L}+(?:['’ʼ‘-]\p{L}+)*/gu;

function make(surface, clitic = false) {
  return { surface, norm: norm(surface), fold: fold(surface), clitic };
}

function splitHyphenated(word, isWord) {
  if (!word.includes('-') || isWord(fold(word))) return [make(word)];
  const clitics = [];
  let head = word;
  while (head.includes('-')) {
    const f = fold(head);
    const hit = CLITICS.find((c) => f.endsWith(c) && f.length > c.length);
    if (!hit) break;
    clitics.unshift(make(head.slice(head.length - hit.length), true));
    head = head.slice(0, head.length - hit.length);
  }
  const parts = head.split('-').map((p) => make(p));
  return [...parts, ...clitics];
}

export function tokenize(text, opts = {}) {
  const isWord = opts.isWord ?? (() => false);
  const tokens = [];
  for (const [run] of String(text).normalize('NFC').matchAll(RUN_RE)) {
    let rest = run;
    let m;
    while ((m = ELISION_RE.exec(rest)) && rest.length > m[0].length) {
      tokens.push(make(m[0]));
      rest = rest.slice(m[0].length);
    }
    tokens.push(...splitHyphenated(rest, isWord));
  }
  return tokens;
}
