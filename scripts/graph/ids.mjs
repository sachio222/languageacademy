const LANG_KINDS = new Set(['lex', 'form', 'cx', 'name', 'snd', 'scr', 'reg']);
const SHARED_KINDS = new Set(['fn', 'nt', 'dm', 'sense']);

// Language nodes: <lang>:<kind>:<key>. Shared nodes: <kind>:<key>.
export function parseId(id) {
  if (typeof id !== 'string') throw new Error(`Malformed ID: ${String(id)}`);
  const parts = id.split(':');
  if (parts.length >= 3 && LANG_KINDS.has(parts[1]) && /^[a-z]{2,3}$/.test(parts[0])) {
    const key = parts.slice(2).join(':');
    if (key) return { lang: parts[0], kind: parts[1], key };
  }
  if (parts.length >= 2 && SHARED_KINDS.has(parts[0])) {
    const key = parts.slice(1).join(':');
    if (key) return { lang: null, kind: parts[0], key };
  }
  throw new Error(`Malformed ID: ${id}`);
}
