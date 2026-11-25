// Durable writes for the pipeline's state (design §3.5), over an injectable `io` (node:fs by default) so tests can
// count the calls durability depends on.
// - writeDurable(file, text): the whole file replaced or not at all. A unique temporary name beside the target (the
//   same tempNameFor writeFileAtomic uses), every byte written, fsync, close, rename, then fsync of the folder.
// - appendLineDurable(file, line): one line added to the end of a log with a single write of line + '\n' on a file
//   opened for append, then fsync before close. A crash can leave only a prefix of that line at the end of the file,
//   which the log reader recognizes as torn. A line holding a newline is refused, since it would read back as two
//   lines. Returns the number of bytes written.
// - mkdirDurable(dir): creates `dir` and any missing parents, then fsyncs every folder it created and the existing
//   folder above them, so each new folder's entry survives a power cut. A no-op when `dir` exists.
// Both writes create their folder with mkdirDurable, and the append fsyncs the folder when it created the file.
import * as nodeFs from 'node:fs';
import { dirname } from 'node:path';
import { tempNameFor } from '../content/atomic-write.mjs';

/** @param {typeof nodeFs} [io] */
export function createFsio(io = nodeFs) {
  function fsyncDir(dir) {
    const fd = io.openSync(dir, 'r');
    try {
      io.fsyncSync(fd);
    } finally {
      io.closeSync(fd);
    }
  }

  function mkdirDurable(dir) {
    // mkdirSync with recursive returns the first folder it created, or undefined when nothing was created.
    const first = io.mkdirSync(dir, { recursive: true });
    if (first === undefined) return;
    for (let d = dir; ; d = dirname(d)) {
      fsyncDir(d);
      if (d === first) break;
    }
    fsyncDir(dirname(first));
  }

  /** @param {string} file @param {string|Uint8Array} text */
  function writeDurable(file, text) {
    const dir = dirname(file);
    mkdirDurable(dir);
    const tmp = tempNameFor(file);
    try {
      const fd = io.openSync(tmp, 'wx');
      try {
        const data = typeof text === 'string' ? Buffer.from(text, 'utf8') : text;
        let off = 0;
        while (off < data.length) off += io.writeSync(fd, data, off);
        io.fsyncSync(fd);
      } finally {
        io.closeSync(fd);
      }
      io.renameSync(tmp, file);
    } catch (e) {
      // Only this call's own temporary file is removed.
      io.rmSync(tmp, { force: true });
      throw e;
    }
    fsyncDir(dir);
  }

  /** @param {string} file @param {string} line one line, without its newline @returns {number} bytes written */
  function appendLineDurable(file, line) {
    if (typeof line !== 'string') throw new TypeError(`appendLineDurable takes a string, not ${typeof line}`);
    if (line.includes('\n')) throw new Error(`appendLineDurable: the line holds a newline, so it would read back as more than one line: ${file}`);
    const dir = dirname(file);
    mkdirDurable(dir);
    const created = !io.existsSync(file);
    const data = Buffer.from(`${line}\n`, 'utf8');
    const fd = io.openSync(file, 'a');
    try {
      // One write call: a crash leaves a prefix of this line, never this line split around another writer's.
      const written = io.writeSync(fd, data);
      if (written !== data.length) throw new Error(`appendLineDurable: wrote ${written} of ${data.length} bytes to ${file}; the log's last line is torn`);
      io.fsyncSync(fd);
    } finally {
      io.closeSync(fd);
    }
    if (created) fsyncDir(dir);
    return data.length;
  }

  return { writeDurable, appendLineDurable, mkdirDurable };
}

export const { writeDurable, appendLineDurable, mkdirDurable } = createFsio();
