// A second writer for the interleaving test: waits for 'go', appends `n` events to `file` with no fence, and reports
// each append it was told succeeded ({ seq, sha256 }) and how many threw.
import { appendEvent } from '../../log.mjs';

const [file, id, n] = process.argv.slice(2);
let ms = Date.parse('2026-11-26T14:02:10.114Z');
const ctx = { tenant: 'fr-en', run_id: `run-${id}`, lock_epoch: 1, actor: { kind: 'core', id }, now: () => new Date((ms += 1)).toISOString() };

process.on('message', (m) => {
  if (m !== 'go') return;
  const ok = [];
  let failed = 0;
  for (let i = 0; i < Number(n); i++) {
    try {
      const e = appendEvent(file, { type: 'test.append', subject: {}, data: { id, i } }, ctx);
      ok.push({ seq: e.seq, sha256: e.sha256 });
    } catch {
      failed++;
    }
  }
  process.send({ id, ok, failed }, () => process.exit(0));
});
process.send('ready');
