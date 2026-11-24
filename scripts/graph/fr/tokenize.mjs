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
// A word run: letters joined by apostrophes or hyphens, with an optional final apostrophe (a bare elision). Digits, underscores and punctuation fall outside.
// An hour written as digits + h (7h, 7h30, 18h) is matched first so its h is not read as a word; such runs are skipped.
const HOUR = /^\d/;
const RUN_RE = /\d+h\d*(?!\p{L})|\p{L}+(?:['’ʼ‘-]\p{L}+)*['’ʼ‘]?/gu;

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

// Accepted answers are often typed without the apostrophe ("j ai", "l eau", "qu est-ce que"). A lone
// elidable letter followed by a space and a vowel or h is read as the elided form. Only for lenient text:
// strict French text is checked as written.
const LONE_ELISION_RE = new RegExp(`(^|[^\\p{L}'’ʼ‘])(${ELISIONS.join('|')}) +(?=[aeiouyhàâäéèêëîïôöùûüœæ])`, 'giu');

export function restoreElisions(text) {
  return String(text).normalize('NFC').replace(LONE_ELISION_RE, "$1$2'");
}

export function tokenize(text, opts = {}) {
  const isWord = opts.isWord ?? (() => false);
  const tokens = [];
  for (const [run] of String(text).normalize('NFC').matchAll(RUN_RE)) {
    if (HOUR.test(run)) continue;
    let rest = run;
    let m;
    while ((m = ELISION_RE.exec(rest))) {
      tokens.push(make(m[0]));
      rest = rest.slice(m[0].length);
    }
    // A trailing apostrophe only means something after an elision prefix.
    rest = rest.replace(/['’ʼ‘]$/, '');
    if (rest) tokens.push(...splitHyphenated(rest, isWord));
  }
  return tokens;
}
