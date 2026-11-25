// An in-repo JSON Schema validator for the pipeline's contracts (design §4; no schema package, plan Global
// Constraints). It covers the subset of draft 2020-12 the contracts use, with an $id registry across files.
//
// createValidator(schemaDirs) reads every *.json file in each folder (not recursive). Each file is one schema with a
// root `$id` (for example `la-brief@1`). Loading fails, so a typo can never pass silently, when:
//   - a keyword is not one this validator implements, or an annotation ($schema, $id, description, title, examples);
//   - a keyword's value has the wrong shape (a `type` name that does not exist, a pattern that does not compile,
//     a negative length, a `format` other than date-time, ...);
//   - a `$ref` does not resolve, an `$id` repeats, a file has no `$id`, or `$id` appears below the root;
//   - a `$ref` points at something that is not a schema (`#/required`, `#/$defs`, a `type` value, an `enum` entry);
//   - `$ref`, allOf/anyOf/oneOf and if/then/else form a cycle that returns to a schema without descending into the
//     document (`a: { $ref: '#/$defs/a' }`), which would never end. Recursion through properties or items is fine.
// Supported: $ref (`la-x@1`, `la-x@1#/$defs/y`, `#/...`), $defs, type (a name or a list; integer, number, string,
// boolean, object, array, null), const, enum, pattern (Unicode), minLength, maxLength (code points), minimum,
// maximum, minItems, maxItems, items, required, properties, additionalProperties (false or a schema),
// propertyNames, allOf, anyOf, oneOf, if/then/else, format: "date-time" (UTC with milliseconds: 2026-11-26T14:02:10.114Z,
// a real calendar date). Boolean schemas `true` and `false` work wherever a schema does.
//
// validate(id, doc, pointer = '') returns every problem as "<json pointer>: <message>", empty when the document is
// valid. `id` may carry a fragment (`la-pipeline-common@1#/$defs/time`). `pointer` is prefixed to every error, for a
// document checked as part of a larger one. An unknown id or fragment is a programming error and throws.
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const DRAFT_2020_12 = 'https://json-schema.org/draft/2020-12/schema';
const TYPES = ['null', 'boolean', 'object', 'array', 'number', 'string', 'integer'];
const ANNOTATIONS = new Set(['$schema', '$id', 'description', 'title', 'examples']);
const SUBSCHEMA = new Set(['items', 'additionalProperties', 'propertyNames', 'if', 'then', 'else']);
const SCHEMA_MAP = new Set(['properties', '$defs']);
const SCHEMA_LIST = new Set(['allOf', 'anyOf', 'oneOf']);
const COUNTS = new Set(['minLength', 'maxLength', 'minItems', 'maxItems']);
const BOUNDS = new Set(['minimum', 'maximum']);
const VALUES = new Set(['$ref', 'type', 'const', 'enum', 'pattern', 'required', 'format']);
const KNOWN = new Set([...ANNOTATIONS, ...SUBSCHEMA, ...SCHEMA_MAP, ...SCHEMA_LIST, ...COUNTS, ...BOUNDS, ...VALUES]);
const DATE_TIME = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

const typeOf = (v) => (v === null ? 'null' : Array.isArray(v) ? 'array' : Number.isInteger(v) ? 'integer' : typeof v);
const isType = (v, t) => typeOf(v) === t || (t === 'number' && typeOf(v) === 'integer');
const isObject = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);
const escapeToken = (k) => String(k).replace(/~/g, '~0').replace(/\//g, '~1');
const unescapeToken = (k) => k.replace(/~1/g, '/').replace(/~0/g, '~');
const show = (v) => (typeof v === 'string' && v.length > 80 ? JSON.stringify(`${v.slice(0, 77)}...`) : JSON.stringify(v));

/** Deep equality of JSON values; object key order does not matter. */
function equal(a, b) {
  if (a === b) return true;
  if (typeOf(a) !== typeOf(b) && !(typeof a === 'number' && typeof b === 'number')) return false;
  if (Array.isArray(a)) return a.length === b.length && a.every((x, i) => equal(x, b[i]));
  if (isObject(a)) {
    const ka = Object.keys(a);
    return ka.length === Object.keys(b).length && ka.every((k) => Object.hasOwn(b, k) && equal(a[k], b[k]));
  }
  return false;
}

/** 2026-11-26T14:02:10.114Z, and a real instant: no 30 February, no hour 24. */
const isDateTime = (s) => DATE_TIME.test(s) && !Number.isNaN(Date.parse(s)) && new Date(s).toISOString() === s;

export function createValidator(schemaDirs) {
  if (!Array.isArray(schemaDirs) || schemaDirs.length === 0) throw new TypeError('createValidator takes a list of schema folders');
  /** @type {Map<string, { schema: any, file: string }>} */
  const registry = new Map();
  for (const dir of schemaDirs) {
    for (const name of readdirSync(dir).filter((f) => f.endsWith('.json')).sort()) {
      const file = join(dir, name);
      let schema;
      try {
        schema = JSON.parse(readFileSync(file, 'utf8'));
      } catch (e) {
        throw new Error(`${file}: not JSON (${e.message})`);
      }
      if (!isObject(schema) || typeof schema.$id !== 'string' || schema.$id === '' || schema.$id.includes('#'))
        throw new Error(`${file}: a schema file needs a root $id without a fragment`);
      if (registry.has(schema.$id)) throw new Error(`${file}: duplicate $id ${schema.$id}, also in ${registry.get(schema.$id).file}`);
      registry.set(schema.$id, { schema, file });
    }
  }

  const patterns = new Map();

  /** Resolve a $ref (or a validate id) against the schema `base` it appears in. Returns [node, rootId]. */
  function resolve(ref, base) {
    const hash = ref.indexOf('#');
    const id = hash === -1 ? ref : ref.slice(0, hash);
    const frag = hash === -1 ? '' : ref.slice(hash + 1);
    const rootId = id || base;
    const entry = registry.get(rootId);
    if (!entry) throw new Error(`unknown schema ${rootId} (from ${ref})`);
    if (frag !== '' && !frag.startsWith('/')) throw new Error(`unresolved ${ref}: only JSON pointer fragments are supported`);
    let node = entry.schema;
    for (const token of frag.split('/').slice(1)) {
      const key = unescapeToken(token);
      if (node === null || typeof node !== 'object' || !Object.hasOwn(node, key)) throw new Error(`unresolved ${ref} in ${rootId}`);
      node = node[key];
    }
    return [node, rootId];
  }

  /* ---------- load-time checks: every keyword known, every value well formed, every $ref resolving ---------- */

  /** Every place a schema sits, as `<rootId>#<json pointer>`, so a $ref can be checked to land on one. */
  const schemaAt = new Map();
  /** Every $ref, checked once all files are compiled (a $ref may point into a file compiled later). */
  const refs = [];
  const keyOf = (rootId, pointer) => `${rootId}#${pointer}`;
  const failAt = (rootId, where, msg) => {
    throw new Error(`${registry.get(rootId).file}: ${where || '(root)'}: ${msg}`);
  };

  function compile(s, rootId, where, isRoot = false) {
    const fail = (msg) => failAt(rootId, where, msg);
    schemaAt.set(keyOf(rootId, where), { node: s, rootId, where });
    if (typeof s === 'boolean') return;
    if (!isObject(s)) fail('a schema must be an object or a boolean');
    for (const [kw, val] of Object.entries(s)) {
      const at = `${where}/${escapeToken(kw)}`;
      if (!KNOWN.has(kw)) fail(`unknown keyword ${JSON.stringify(kw)}`);
      if (kw === '$id' && !isRoot) fail('$id is allowed only at the root of a schema file');
      if (kw === '$schema' && (!isRoot || val !== DRAFT_2020_12)) fail(`$schema must be ${DRAFT_2020_12}, at the root`);
      if ((kw === 'title' || kw === 'description') && typeof val !== 'string') fail(`${kw} must be a string`);
      if (kw === 'examples' && !Array.isArray(val)) fail('examples must be an array');
      if (SUBSCHEMA.has(kw)) compile(val, rootId, at);
      if (SCHEMA_MAP.has(kw)) {
        if (!isObject(val)) fail(`${kw} must be an object of schemas`);
        for (const [k, sub] of Object.entries(val)) compile(sub, rootId, `${at}/${escapeToken(k)}`);
      }
      if (SCHEMA_LIST.has(kw)) {
        if (!Array.isArray(val) || val.length === 0) fail(`${kw} must be a non-empty array of schemas`);
        val.forEach((sub, i) => compile(sub, rootId, `${at}/${i}`));
      }
      if (COUNTS.has(kw) && !(Number.isInteger(val) && val >= 0)) fail(`${kw} must be a non-negative integer`);
      if (BOUNDS.has(kw) && typeof val !== 'number') fail(`${kw} must be a number`);
      if (kw === 'type') {
        const list = [].concat(val);
        if (list.length === 0 || !list.every((t) => TYPES.includes(t)) || new Set(list).size !== list.length)
          fail(`type ${JSON.stringify(val)}: each must be one of ${TYPES.join(', ')}, without repeats`);
      }
      if (kw === 'enum' && (!Array.isArray(val) || val.length === 0)) fail('enum must be a non-empty array');
      if (kw === 'required' && (!Array.isArray(val) || !val.every((k) => typeof k === 'string'))) fail('required must be an array of strings');
      if (kw === 'format' && val !== 'date-time') fail(`format ${JSON.stringify(val)} is not supported (only date-time)`);
      if (kw === 'pattern') {
        if (typeof val !== 'string') fail('pattern must be a string');
        try {
          patterns.set(val, new RegExp(val, 'u'));
        } catch (e) {
          fail(`pattern ${JSON.stringify(val)} does not compile: ${e.message}`);
        }
      }
      if (kw === '$ref') {
        if (typeof val !== 'string' || val === '') fail('$ref must be a non-empty string');
        try {
          resolve(val, rootId);
        } catch (e) {
          fail(`$ref ${val}: ${e.message}`);
        }
        refs.push({ rootId, where, ref: val });
      }
    }
  }
  for (const [id, { schema }] of registry) compile(schema, id, '', true);

  /** The schema-position key a $ref names. */
  const targetKey = (ref, base) => {
    const hash = ref.indexOf('#');
    return hash === -1 ? keyOf(ref, '') : keyOf(ref.slice(0, hash) || base, ref.slice(hash + 1));
  };
  for (const { rootId, where, ref } of refs)
    if (!schemaAt.has(targetKey(ref, rootId))) failAt(rootId, where, `$ref ${ref} points at a value that is not a schema`);

  // Cycle check over the edges that apply a schema to the same value: $ref, allOf/anyOf/oneOf, if/then/else.
  // properties, items, additionalProperties and propertyNames move to a part of the value, so a loop through them ends.
  const sameValue = ({ node, rootId, where }) => {
    if (typeof node !== 'object') return [];
    const next = [];
    if (node.$ref !== undefined) next.push(targetKey(node.$ref, rootId));
    for (const kw of SCHEMA_LIST) (node[kw] ?? []).forEach((_, i) => next.push(keyOf(rootId, `${where}/${kw}/${i}`)));
    for (const kw of ['if', 'then', 'else']) if (node[kw] !== undefined) next.push(keyOf(rootId, `${where}/${kw}`));
    return next;
  };
  const done = new Set();
  const path = [];
  const onPath = new Set();
  const visit = (key) => {
    if (done.has(key)) return;
    if (onPath.has(key)) {
      const loop = [...path.slice(path.indexOf(key)), key];
      const { rootId, where } = schemaAt.get(key);
      failAt(rootId, where, `$ref cycle that never descends into the document: ${loop.join(' -> ')}`);
    }
    onPath.add(key);
    path.push(key);
    for (const next of sameValue(schemaAt.get(key))) visit(next);
    path.pop();
    onPath.delete(key);
    done.add(key);
  };
  for (const key of schemaAt.keys()) visit(key);

  /* ---------- validation ---------- */

  function check(v, s, rootId, at, out) {
    if (s === true) return;
    if (s === false) {
      out.push(`${at}: not allowed`);
      return;
    }
    if (s.$ref) {
      const [node, nextRoot] = resolve(s.$ref, rootId);
      check(v, node, nextRoot, at, out);
    }
    if (s.type !== undefined) {
      const types = [].concat(s.type);
      if (!types.some((t) => isType(v, t))) {
        out.push(`${at}: expected ${types.join('|')}, found ${typeOf(v)}`);
        return;
      }
    }
    if ('const' in s && !equal(v, s.const)) out.push(`${at}: must be ${show(s.const)}`);
    if (s.enum && !s.enum.some((e) => equal(e, v))) out.push(`${at}: ${show(v)} is not one of ${s.enum.map(show).join(', ')}`);
    if (typeof v === 'string') {
      const n = [...v].length;
      if (s.minLength !== undefined && n < s.minLength) out.push(`${at}: ${n} characters, under ${s.minLength}`);
      if (s.maxLength !== undefined && n > s.maxLength) out.push(`${at}: ${n} characters, over ${s.maxLength}`);
      if (s.pattern !== undefined && !patterns.get(s.pattern).test(v)) out.push(`${at}: ${show(v)} does not match ${s.pattern}`);
      if (s.format === 'date-time' && !isDateTime(v)) out.push(`${at}: ${show(v)} is not a UTC time with milliseconds (2026-11-26T14:02:10.114Z)`);
    }
    if (typeof v === 'number') {
      if (s.minimum !== undefined && v < s.minimum) out.push(`${at}: ${v} is below ${s.minimum}`);
      if (s.maximum !== undefined && v > s.maximum) out.push(`${at}: ${v} is above ${s.maximum}`);
    }
    if (Array.isArray(v)) {
      if (s.minItems !== undefined && v.length < s.minItems) out.push(`${at}: ${v.length} items, under ${s.minItems}`);
      if (s.maxItems !== undefined && v.length > s.maxItems) out.push(`${at}: ${v.length} items, over ${s.maxItems}`);
      if (s.items !== undefined) v.forEach((x, i) => check(x, s.items, rootId, `${at}/${i}`, out));
    }
    if (isObject(v)) {
      for (const k of s.required || []) if (!Object.hasOwn(v, k)) out.push(`${at}: missing ${k}`);
      for (const [k, x] of Object.entries(v)) {
        const p = `${at}/${escapeToken(k)}`;
        if (s.propertyNames !== undefined) {
          const keyErrors = [];
          check(k, s.propertyNames, rootId, p, keyErrors);
          for (const e of keyErrors) out.push(e.startsWith(`${p}: `) ? `${p}: property name ${e.slice(p.length + 2)}` : e);
        }
        if (s.properties && Object.hasOwn(s.properties, k)) check(x, s.properties[k], rootId, p, out);
        else if (s.additionalProperties !== undefined) check(x, s.additionalProperties, rootId, p, out);
      }
    }
    if (s.allOf) for (const sub of s.allOf) check(v, sub, rootId, at, out);
    for (const kw of ['anyOf', 'oneOf']) {
      if (!s[kw]) continue;
      const results = s[kw].map((sub) => {
        const o = [];
        check(v, sub, rootId, at, o);
        return o;
      });
      const matched = results.filter((r) => r.length === 0).length;
      if (kw === 'anyOf' ? matched === 0 : matched !== 1) {
        const closest = matched === 0 ? ` (closest: ${[...results].sort((a, b) => a.length - b.length)[0].slice(0, 3).join('; ')})` : '';
        out.push(`${at}: ${kw} matched ${matched} of ${s[kw].length} options${closest}`);
      }
    }
    if (s.if !== undefined) {
      const probe = [];
      check(v, s.if, rootId, at, probe);
      const branch = probe.length === 0 ? s.then : s.else;
      if (branch !== undefined) check(v, branch, rootId, at, out);
    }
  }

  return {
    validate(id, doc, pointer = '') {
      if (typeof id !== 'string' || id === '') throw new TypeError('validate needs a schema id');
      const [node, rootId] = resolve(id, undefined);
      const out = [];
      check(doc, node, rootId, pointer, out);
      return out;
    },
    ids() {
      return [...registry.keys()].sort();
    },
  };
}
