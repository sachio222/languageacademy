// Durable writes for the pipeline's state (design §3.5).
// - writeDurable(file, text): the whole file replaced or not at all: a unique temporary name, fsync, rename, fsync of
//   the folder. It is writeFileAtomic from scripts/content, the one the content tools use.
// - appendLineDurable(file, line): one line added to the end of a log with a single write of line + '\n' on a file
//   opened for append, then fsync. A crash can leave only a prefix of that line at the end of the file, which the log
//   reader recognizes as torn. A line holding a newline is refused, since it would read back as two lines.
import { closeSync, existsSync, fsyncSync, mkdirSync, openSync, writeSync } from 'node:fs';
import { dirname } from 'node:path';
import { writeFileAtomic } from '../content/atomic-write.mjs';

/** @param {string} file @param {string|Uint8Array} text */
export function writeDurable(file, text) {
  writeFileAtomic(file, text);
}

/** fsync a folder, so a file created in it survives a power cut. */
function fsyncDir(dir) {
  const fd = openSync(dir, 'r');
  try {
    fsyncSync(fd);
  } finally {
    closeSync(fd);
  }
}

/** @param {string} file @param {string} line one line, without its newline */
export function appendLineDurable(file, line) {
  if (typeof line !== 'string') throw new TypeError(`appendLineDurable takes a string, not ${typeof line}`);
  if (line.includes('\n')) throw new Error(`appendLineDurable: the line holds a newline, so it would read back as more than one line: ${file}`);
  const dir = dirname(file);
  mkdirSync(dir, { recursive: true });
  const created = !existsSync(file);
  const data = Buffer.from(`${line}\n`, 'utf8');
  const fd = openSync(file, 'a');
  try {
    // One write call: a crash leaves a prefix of this line, never this line split around another writer's.
    const written = writeSync(fd, data);
    if (written !== data.length) throw new Error(`appendLineDurable: wrote ${written} of ${data.length} bytes to ${file}; the log's last line is torn`);
    fsyncSync(fd);
  } finally {
    closeSync(fd);
  }
  if (created) fsyncDir(dir);
}
