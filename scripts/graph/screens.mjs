// Reads the French a learner sees on a help screen whose content is written into its React component
// (src/components/CognatesHelp.jsx and the other help screens), from the component's source text.
//
// The French on these screens sits in three places, and only these are read:
// - JSX text between tags ("<div className="phrase-french">les amis</div>"), joined across inline tags such as
//   <strong> so a sentence stays whole;
// - the `text` attribute of an element ("<SpeakButton text="vous êtes" />"), which the learner hears;
// - string values under an object key that names French ({ french: "un restaurant", english: "restaurant" }).
// Each text is then split like a concept example (see frenchIn in french-text.mjs) and only its French is kept.
// Button labels are skipped.
// Imports, class names, styles, ids, log messages, database names and progress keys are code, never JSX text or
// such a value, so they are never returned. Arguments of speak() calls are not read: they repeat the text on screen,
// and LiaisonHelp misspells two on purpose ("vou avez") so the voice drops the liaison.
import { frenchIn } from './french-text.mjs';

// Tags that sit inside a run of text without breaking it.
const INLINE = new Set(['strong', 'em', 'b', 'i', 'u', 'br']);
// Button labels ("Continue →", "← Previous") are English app controls; "Continue" also spells a French verb form.
const CHROME = new Set(['button']);
const WORD_CHAR = /[\p{L}\p{N}_$]/u;

function stripComments(src) {
  return src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:\\'"`])\/\/[^\n]*/g, '$1');
}

// Index just past the string literal that opens at i ('…', "…" or `…`, with ${…} inside a template).
function skipString(src, i) {
  const q = src[i];
  let j = i + 1;
  while (j < src.length && src[j] !== q) {
    if (src[j] === '\\') j += 2;
    else if (q === '`' && src[j] === '$' && src[j + 1] === '{') j = skipBraces(src, j + 1);
    else j += 1;
  }
  return j + 1;
}

// A quote opens a string in code unless it follows a letter: "It's" inside JSX text is an apostrophe.
const opensString = (src, j) => /['"`]/.test(src[j]) && !WORD_CHAR.test(src[j - 1] ?? '');

// Index just past the {…} expression that opens at i.
function skipBraces(src, i) {
  let depth = 0;
  let j = i;
  while (j < src.length) {
    const c = src[j];
    if (opensString(src, j)) { j = skipString(src, j); continue; }
    if (c === '{') depth += 1;
    else if (c === '}') {
      depth -= 1;
      if (depth === 0) return j + 1;
    }
    j += 1;
  }
  return j;
}

// The tag that opens at i (<div …>, </div>, <SpeakButton … />, <> or </>), or null when i is not a tag.
function readTag(src, i) {
  let j = i + 1;
  const closing = src[j] === '/';
  if (closing) j += 1;
  while (closing && src[j] === ' ') j += 1;
  const m = /^[A-Za-z][\w.]*/.exec(src.slice(j, j + 64));
  if (!m && src[j] !== '>') return null;
  const name = m ? m[0].toLowerCase() : '';
  j += m ? m[0].length : 0;
  const start = j;
  while (j < src.length && src[j] !== '>') {
    if (opensString(src, j)) j = skipString(src, j);
    else if (src[j] === '{') j = skipBraces(src, j);
    else j += 1;
  }
  if (j >= src.length) return null;
  const inside = src.slice(start, j);
  const text = /(?:^|\s)text="([^"]*)"/.exec(inside);
  return { end: j + 1, name, closing, selfClosing: /\/\s*$/.test(inside), text: text ? text[1] : null };
}

// [{ at, text }]: JSX text runs and text attributes, in source order.
function jsxTexts(src) {
  const out = [];
  let depth = 0;
  let chrome = 0; // open CHROME elements: their text is skipped
  let run = null;
  const flush = () => {
    if (run && run.text.trim()) out.push({ at: run.at, text: run.text.replace(/\s+/g, ' ').trim() });
    run = null;
  };
  let i = 0;
  while (i < src.length) {
    const c = src[i];
    const tag = c === '<' ? readTag(src, i) : null;
    if (tag) {
      if (!INLINE.has(tag.name)) flush();
      else if (tag.name === 'br' && run) run.text += ' ';
      if (tag.text !== null) out.push({ at: i, text: tag.text });
      if (tag.closing) depth = Math.max(0, depth - 1);
      else if (!tag.selfClosing) depth += 1;
      if (CHROME.has(tag.name) && !tag.selfClosing) chrome = Math.max(0, chrome + (tag.closing ? -1 : 1));
      i = tag.end;
    } else if (depth > 0 && c === '{') {
      // an expression inside JSX ({moduleId}, {items.map(…)}) is code
      flush();
      i = skipBraces(src, i);
    } else if (depth > 0) {
      if (!chrome) {
        run ??= { at: i, text: '' };
        run.text += c;
      }
      i += 1;
    } else if (opensString(src, i)) {
      i = skipString(src, i);
    } else {
      i += 1;
    }
  }
  flush();
  return out;
}

export function readScreen(source, { isWord = null } = {}) {
  const src = stripComments(String(source));
  const texts = jsxTexts(src);
  for (const m of src.matchAll(/\b\w*french\w*\s*:\s*(["'])((?:\\.|(?!\1)[^\\\n])*)\1/gi)) {
    texts.push({ at: m.index, text: m[2].replace(/\\(.)/g, '$1') });
  }
  texts.sort((a, b) => a.at - b.at);
  return [...new Set(texts.flatMap(({ text }) => frenchIn(text, 'segments', isWord)))];
}
