// A small JSON Schema validator for the tests (no schema package): the keywords la-bundle@1 and the two OpenAPI files
// it references use, with $ref across those files. Returns a list of "pointer: message" strings, empty when valid.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const typeOf = (v) => (v === null ? 'null' : Array.isArray(v) ? 'array' : Number.isInteger(v) ? 'integer' : typeof v);
const isType = (v, t) => typeOf(v) === t || (t === 'number' && typeOf(v) === 'integer');
const equal = (a, b) => JSON.stringify(a) === JSON.stringify(b);

export function schemaValidator(dir, rootFile) {
  const docs = new Map();
  const doc = (f) => {
    if (!docs.has(f)) docs.set(f, JSON.parse(readFileSync(join(dir, f), 'utf8')));
    return docs.get(f);
  };
  const resolve = (ref, file) => {
    const [f, frag = ''] = ref.split('#');
    const target = f || file;
    let node = doc(target);
    for (const part of frag.split('/').filter(Boolean)) node = node[part.replace(/~1/g, '/').replace(/~0/g, '~')];
    if (node === undefined) throw new Error(`unresolved $ref ${ref} from ${file}`);
    return [node, target];
  };
  const patterns = new Map();
  const re = (p) => patterns.get(p) ?? patterns.set(p, new RegExp(p, 'u')).get(p);

  function check(v, s, file, at, out) {
    if (s === true || s === undefined) return;
    if (s === false) return out.push(`${at}: not allowed`);
    if (s.$ref) {
      const [node, f] = resolve(s.$ref, file);
      check(v, node, f, at, out);
    }
    if (s.type) {
      const types = [].concat(s.type);
      if (!types.some((t) => isType(v, t))) return out.push(`${at}: expected ${types.join('|')}, found ${typeOf(v)}`);
    }
    if ('const' in s && !equal(v, s.const)) out.push(`${at}: must be ${JSON.stringify(s.const)}`);
    if (s.enum && !s.enum.some((e) => equal(e, v))) out.push(`${at}: ${JSON.stringify(v)} not in enum`);
    if (typeof v === 'string') {
      const n = [...v].length;
      if (s.maxLength !== undefined && n > s.maxLength) out.push(`${at}: ${n} characters, over ${s.maxLength}`);
      if (s.minLength !== undefined && n < s.minLength) out.push(`${at}: ${n} characters, under ${s.minLength}`);
      if (s.pattern && !re(s.pattern).test(v)) out.push(`${at}: ${JSON.stringify(v)} does not match ${s.pattern}`);
    }
    if (typeof v === 'number') {
      if (s.minimum !== undefined && v < s.minimum) out.push(`${at}: below ${s.minimum}`);
      if (s.maximum !== undefined && v > s.maximum) out.push(`${at}: above ${s.maximum}`);
      if (s.multipleOf !== undefined && Math.abs(v / s.multipleOf - Math.round(v / s.multipleOf)) > 1e-9) out.push(`${at}: not a multiple of ${s.multipleOf}`);
    }
    if (Array.isArray(v)) {
      if (s.minItems !== undefined && v.length < s.minItems) out.push(`${at}: ${v.length} items, under ${s.minItems}`);
      if (s.maxItems !== undefined && v.length > s.maxItems) out.push(`${at}: ${v.length} items, over ${s.maxItems}`);
      if (s.items) v.forEach((x, i) => check(x, s.items, file, `${at}/${i}`, out));
    }
    if (typeOf(v) === 'object') {
      for (const k of s.required || []) if (!(k in v)) out.push(`${at}: missing ${k}`);
      for (const [k, x] of Object.entries(v)) {
        if (s.properties && k in s.properties) check(x, s.properties[k], file, `${at}/${k}`, out);
        else if (s.additionalProperties === false) out.push(`${at}/${k}: not allowed`);
        else if (typeof s.additionalProperties === 'object') check(x, s.additionalProperties, file, `${at}/${k}`, out);
        if (s.propertyNames) check(k, s.propertyNames, file, `${at}/${k} (key)`, out);
      }
    }
    for (const [kw, need] of [['oneOf', 1], ['anyOf', 0]]) {
      if (!s[kw]) continue;
      const results = s[kw].map((sub) => {
        const o = [];
        check(v, sub, file, at, o);
        return o;
      });
      const ok = results.filter((r) => r.length === 0).length;
      if (need === 1 ? ok !== 1 : ok === 0)
        out.push(`${at}: ${kw} matched ${ok} options` + (ok === 0 ? ` (closest: ${results.sort((a, b) => a.length - b.length)[0].slice(0, 3).join('; ')})` : ''));
    }
  }

  return {
    validate(value, ref = '#') {
      const out = [];
      const [node, f] = resolve(ref, rootFile);
      check(value, node, f, '', out);
      return out;
    },
  };
}
