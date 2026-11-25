// Hashes and ids for every pipeline record (design §4.1, §4.9).
// - sha256Hex: lowercase hex SHA-256 of a string (UTF-8) or of bytes.
// - canonicalSha256: SHA-256 of canonical JSON (keys sorted, arrays in order, no spaces), the same canonicalJson the
//   bundle hash uses. It hashes what it is given: normalize first with normalizeNfc where text came from an engine.
// - normalizeNfc: a deep copy with every string, keys included, in Unicode NFC, so a draft whose accents arrive
//   decomposed (e + U+0301) hashes, checks and writes as the same bytes as one typed with é.
// - taskIdFor: the first 24 hex of canonicalSha256 over what defines a task, so the same work always gets the same id.
// - ulid: a 26-character Crockford base32 id that sorts by time, from a clock reading and 10 random bytes the caller
//   supplies (the core's injected clock and random source, so tests are deterministic).
import { createHash } from 'node:crypto';
import { canonicalJson } from '../content/bundle.mjs';

const SHA256 = /^[0-9a-f]{64}$/;
const ROLES = ['draft', 'repair', 'review', 'header'];
const LENSES = ['none', 'primary', 'french', 'method'];
const REVIEWER_SOURCES = ['none', 'checks', 'review', 'jake'];

/** @param {string|Buffer|Uint8Array} data */
export function sha256Hex(data) {
  if (typeof data !== 'string' && !(data instanceof Uint8Array)) throw new TypeError(`sha256Hex takes a string or bytes, not ${typeof data}`);
  return createHash('sha256').update(data).digest('hex');
}

/** SHA-256 of canonical JSON. No normalization. */
export function canonicalSha256(value) {
  const json = canonicalJson(value);
  if (typeof json !== 'string') throw new TypeError(`canonicalSha256: ${typeof value} has no JSON form`);
  return sha256Hex(json);
}

const isPlainObject = (v) => {
  const proto = Object.getPrototypeOf(v);
  return proto === Object.prototype || proto === null;
};

/**
 * A deep copy of a JSON value with every string and every key in NFC. Refuses values JSON cannot hold, and an object
 * whose keys become equal once normalized (the document would be ambiguous).
 */
export function normalizeNfc(value, at = '') {
  if (typeof value === 'string') return value.normalize('NFC');
  if (value === null || typeof value === 'number' || typeof value === 'boolean') return value;
  if (Array.isArray(value)) return value.map((x, i) => normalizeNfc(x, `${at}/${i}`));
  if (typeof value === 'object' && isPlainObject(value)) {
    const entries = [];
    const seen = new Set();
    for (const [k, x] of Object.entries(value)) {
      const key = k.normalize('NFC');
      if (seen.has(key)) throw new TypeError(`normalizeNfc: keys at '${at}' collide once normalized: ${JSON.stringify(key)}`);
      seen.add(key);
      entries.push([key, normalizeNfc(x, `${at}/${key}`)]);
    }
    // fromEntries defines own properties, so a "__proto__" key stays data instead of setting the prototype.
    return Object.fromEntries(entries);
  }
  const what = value === undefined ? 'undefined' : typeof value === 'object' ? value.constructor?.name ?? 'object' : typeof value;
  throw new TypeError(`normalizeNfc: ${what} at '${at}' is not a JSON value`);
}

/**
 * The task id (design §4.1): first 24 hex of canonicalSha256 over subject (module key, or the header subject), role,
 * lens ('none' for roles other than review), round, input, prompt and engine configuration hashes, and the repair's
 * reviewer_source ('none' otherwise). Bad input throws: a missing field would vanish from the canonical JSON and let
 * two different tasks share an id, and a lens on a draft, repair or header task would give one piece of work two ids.
 */
export function taskIdFor({ subject, role, lens, round, input_sha256, prompt_sha256, engine_config_sha256, reviewer_source }) {
  const fields = { subject, role, lens: lens ?? 'none', round, input_sha256, prompt_sha256, engine_config_sha256, reviewer_source: reviewer_source ?? 'none' };
  if (typeof subject !== 'string' || subject === '') throw new TypeError('taskIdFor: subject must be a non-empty string');
  if (!ROLES.includes(role)) throw new TypeError(`taskIdFor: role ${JSON.stringify(role)} is not one of ${ROLES.join(', ')}`);
  if (!LENSES.includes(fields.lens)) throw new TypeError(`taskIdFor: lens ${JSON.stringify(lens)} is not one of ${LENSES.join(', ')}`);
  if (role !== 'review' && fields.lens !== 'none') throw new TypeError(`taskIdFor: a ${role} task has no lens, not ${JSON.stringify(lens)}`);
  if (!Number.isInteger(round) || round < 1) throw new TypeError(`taskIdFor: round must be an integer of at least 1, not ${round}`);
  for (const k of ['input_sha256', 'prompt_sha256', 'engine_config_sha256'])
    if (typeof fields[k] !== 'string' || !SHA256.test(fields[k])) throw new TypeError(`taskIdFor: ${k} must be 64 lowercase hex characters`);
  if (!REVIEWER_SOURCES.includes(fields.reviewer_source))
    throw new TypeError(`taskIdFor: reviewer_source ${JSON.stringify(reviewer_source)} is not one of ${REVIEWER_SOURCES.join(', ')}`);
  return canonicalSha256(fields).slice(0, 24);
}

const CROCKFORD = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';
const MAX_MS = 2 ** 48 - 1;

/** Base32 of a non-negative BigInt in exactly `length` characters. */
function base32(n, length) {
  let out = '';
  for (let i = 0; i < length; i++) {
    out = CROCKFORD[Number(n & 31n)] + out;
    n >>= 5n;
  }
  return out;
}

/**
 * ULID: 10 characters of time (48-bit milliseconds) then 16 of randomness (80 bits), so ids sort by time.
 * @param {number} ms milliseconds since the epoch, an integer from 0 to 2^48 - 1
 * @param {Buffer|Uint8Array} random exactly 10 bytes
 */
export function ulid(ms, random) {
  if (!Number.isInteger(ms) || ms < 0 || ms > MAX_MS) throw new TypeError(`ulid: time must be an integer from 0 to ${MAX_MS}, not ${ms}`);
  if (!(random instanceof Uint8Array) || random.length !== 10) throw new TypeError('ulid: random must be exactly 10 bytes');
  const r = [...random].reduce((acc, b) => (acc << 8n) | BigInt(b), 0n);
  return base32(BigInt(ms), 10) + base32(r, 16);
}
