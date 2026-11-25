// French spans inside native text: {être}. A literal brace is written \{ . A stray } is literal.
// parseSpans is lenient: on bad input it never throws, and spanProblems reports what is wrong.

function scan(text) {
  const parts = [];
  const codes = [];
  let buf = '';
  let inFr = false;
  const push = (lang) => {
    if (buf !== '' || (lang === 'fr' && inFr)) parts.push({ lang, text: buf });
    buf = '';
  };
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === '\\' && text[i + 1] === '{') {
      buf += '{';
      i++;
    } else if (c === '{') {
      if (inFr) {
        codes.push('span_nested');
        buf += c;
      } else {
        push('native');
        inFr = true;
      }
    } else if (c === '}' && inFr) {
      if (buf === '') codes.push('span_empty');
      else parts.push({ lang: 'fr', text: buf });
      buf = '';
      inFr = false;
    } else {
      buf += c;
    }
  }
  if (inFr) {
    codes.push('span_unclosed');
    parts.push({ lang: 'native', text: '{' + buf });
  } else {
    push('native');
  }
  return { parts, codes };
}

export function parseSpans(text) {
  return scan(String(text)).parts;
}

export function frenchSpans(text) {
  return parseSpans(text).filter((s) => s.lang === 'fr').map((s) => s.text);
}

export function spanProblems(text) {
  return scan(String(text)).codes;
}
