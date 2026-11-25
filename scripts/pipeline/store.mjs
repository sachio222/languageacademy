// The content-addressed blob store (design §3.4): briefs, drafts, verdicts and raw engine responses under
// .pipeline/store/sha256/<aa>/<hash>, where <hash> is the SHA-256 of the blob's UTF-8 bytes and <aa> its first two
// characters. The same text is stored once, under one name. Each blob is written with writeDurable (§3.5 step 1)
// before the event that names it is appended.
//
// put(data) stores a string as given, or an object as its canonical JSON, so put(obj) === canonicalSha256(obj). It
// does not normalize: text from an engine is NFC-normalized at ingest, before it is hashed anywhere.
// It refuses (TypeError) a value canonical JSON would change: undefined, NaN, a Date, a function, a lone surrogate.
// get(sha) returns the text, or null when no blob has that name; a blob whose bytes no longer hash to its name throws
// StoreCorruptError rather than hand back something other than what was stored. has(sha) verifies the same way: false
// when absent, StoreCorruptError when edited, so `has` never vouches for a blob `get` would refuse.
// createStore(dir, { io }) takes the io seam fsio uses (node:fs by default), for tests that count fsyncs.
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { canonicalJson } from '../content/bundle.mjs';
import { createFsio } from './fsio.mjs';
import { assertJsonValue, sha256Hex } from './hash.mjs';

const SHA256 = /^[0-9a-f]{64}$/;

export class StoreCorruptError extends Error {
  /** @param {string} sha256 @param {string} file @param {string} actual */
  constructor(sha256, file, actual) {
    super(`store: ${file} should hash to ${sha256} but hashes to ${actual}; it was changed on disk`);
    this.name = 'StoreCorruptError';
    this.sha256 = sha256;
    this.file = file;
    this.actual = actual;
  }
}

/** The text a value is stored as: a string as given, any other JSON object or array as canonical JSON. */
function textOf(data) {
  if (data === null || (typeof data !== 'string' && typeof data !== 'object'))
    throw new TypeError(`store.put takes a string, an object or an array, not ${data === null ? 'null' : typeof data}`);
  assertJsonValue(data, 'store.put');
  return typeof data === 'string' ? data : canonicalJson(data);
}

/**
 * @param {string} dir the store's root, e.g. <worktree>/.pipeline/store
 * @param {{ io?: typeof import('node:fs') }} [options]
 * @returns {{ put(data: string|object): string, get(sha: string): string|null, getJson(sha: string): any,
 *   has(sha: string): boolean, path(sha: string): string }}
 */
export function createStore(dir, { io } = {}) {
  if (typeof dir !== 'string' || dir === '') throw new TypeError('createStore needs a folder');
  const { writeDurable } = createFsio(io);

  /** The blob's file. A name that is not 64 lowercase hex is a programming error, and could escape the folder. */
  function path(sha) {
    if (typeof sha !== 'string' || !SHA256.test(sha)) throw new TypeError(`store: ${JSON.stringify(sha)} is not a SHA-256 (64 lowercase hex)`);
    return join(dir, 'sha256', sha.slice(0, 2), sha);
  }

  /** The stored bytes when they still hash to their name; null when absent. */
  function read(sha) {
    const file = path(sha);
    if (!existsSync(file)) return null;
    const bytes = readFileSync(file);
    const actual = sha256Hex(bytes);
    if (actual !== sha) throw new StoreCorruptError(sha, file, actual);
    return bytes;
  }

  return {
    path,
    put(data) {
      const text = textOf(data);
      const sha = sha256Hex(text);
      const file = path(sha);
      // A blob already there is kept when it still holds its content, and rewritten when it does not.
      if (existsSync(file) && sha256Hex(readFileSync(file)) === sha) return sha;
      writeDurable(file, text);
      return sha;
    },
    get(sha) {
      const bytes = read(sha);
      return bytes === null ? null : bytes.toString('utf8');
    },
    getJson(sha) {
      const bytes = read(sha);
      return bytes === null ? null : JSON.parse(bytes.toString('utf8'));
    },
    has(sha) {
      return read(sha) !== null;
    },
  };
}
