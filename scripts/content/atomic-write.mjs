// Writes a file through a temporary file and a rename (spec 9.1, Atomicity): an interrupted run leaves the old file
// or the new one, never half of one. The temporary file sits next to the target, so the rename stays on one disk.
import { mkdirSync, renameSync, rmSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';

export function writeFileAtomic(file, text) {
  mkdirSync(dirname(file), { recursive: true });
  const tmp = `${file}.tmp`;
  try {
    writeFileSync(tmp, text);
    renameSync(tmp, file);
  } catch (e) {
    // A temporary file this call wrote is removed; anything else standing at that path is not ours to remove.
    if (e.code !== 'EISDIR') rmSync(tmp, { force: true });
    throw e;
  }
}
