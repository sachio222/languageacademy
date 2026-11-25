// Writes a file through a temporary file and a rename (spec 9.1, Atomicity): an interrupted run leaves the old file
// or the new one, never half of one. The temporary file sits next to the target, so the rename stays on one disk.
// Each call gets its own temporary name, so two writers never share one; the file and then its folder are fsynced,
// so a power cut cannot keep the rename and lose the bytes.
import { randomBytes } from 'node:crypto';
import { closeSync, fsyncSync, mkdirSync, openSync, renameSync, rmSync, writeSync } from 'node:fs';
import { basename, dirname, join } from 'node:path';

export function tempNameFor(file) {
  return join(dirname(file), `.${basename(file)}.${process.pid}.${randomBytes(6).toString('hex')}.tmp`);
}

export function writeFileAtomic(file, text) {
  const dir = dirname(file);
  mkdirSync(dir, { recursive: true });
  const tmp = tempNameFor(file);
  try {
    const fd = openSync(tmp, 'wx');
    try {
      const data = typeof text === 'string' ? Buffer.from(text) : text;
      let off = 0;
      while (off < data.length) off += writeSync(fd, data, off);
      fsyncSync(fd);
    } finally {
      closeSync(fd);
    }
    renameSync(tmp, file);
  } catch (e) {
    // Only this call's own temporary file is removed.
    rmSync(tmp, { force: true });
    throw e;
  }
  const dfd = openSync(dir, 'r');
  try {
    fsyncSync(dfd);
  } finally {
    closeSync(dfd);
  }
}
