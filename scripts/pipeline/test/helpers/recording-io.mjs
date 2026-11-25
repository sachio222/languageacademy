// A stand-in for node:fs that does the real work and records each call that durability depends on, with the path an
// fd was opened on, so a test can assert "one write, then fsync, then close" or "the new folder was fsynced".
import * as fs from 'node:fs';

/**
 * @returns {{ io: typeof fs, calls: { op: string, path: string|null, bytes?: string }[], ops: (path?: string) => string[] }}
 */
export function recordingIo() {
  const calls = [];
  const pathOf = new Map();
  const io = {
    ...fs,
    openSync(path, flags, mode) {
      const fd = fs.openSync(path, flags, mode);
      pathOf.set(fd, String(path));
      calls.push({ op: `open:${flags}`, path: String(path) });
      return fd;
    },
    writeSync(fd, data, ...rest) {
      const n = fs.writeSync(fd, data, ...rest);
      calls.push({ op: 'write', path: pathOf.get(fd) ?? null, bytes: Buffer.from(typeof data === 'string' ? data : data.subarray(rest[0] ?? 0, (rest[0] ?? 0) + n)).toString('utf8') });
      return n;
    },
    fsyncSync(fd) {
      fs.fsyncSync(fd);
      calls.push({ op: 'fsync', path: pathOf.get(fd) ?? null });
    },
    closeSync(fd) {
      fs.closeSync(fd);
      calls.push({ op: 'close', path: pathOf.get(fd) ?? null });
      pathOf.delete(fd);
    },
    renameSync(from, to) {
      fs.renameSync(from, to);
      calls.push({ op: 'rename', path: String(to), from: String(from) });
    },
    mkdirSync(path, options) {
      const first = fs.mkdirSync(path, options);
      calls.push({ op: 'mkdir', path: String(path), first: first ?? null });
      return first;
    },
  };
  /** The ops in order, optionally only those on one path. */
  const ops = (path) => calls.filter((c) => path === undefined || c.path === path).map((c) => c.op);
  return { io, calls, ops };
}
