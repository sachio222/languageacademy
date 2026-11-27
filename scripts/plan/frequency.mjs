// How common each word is, for the plan's order check: a local file, never part of the repository.
//
// The file is <dir>/<lang>.tsv, one word per line as "lemma<TAB>value", a higher value meaning a more common word.
// <dir> is $LA_FREQUENCY_DIR, else ~/.languageacademy/frequency. Each language's file is made once, by hand, from
// whatever frequency list that language has; its values must never be committed, printed or written to a report.
// The tools print bands only (method.json frequency.bands), and skip the trend cleanly when the file is absent.
//
//   readRanks(lang, dir?)                      Map<lemma, rank> (1 = most common), or null when there is no file
//   frequencyTrend(units, ranks, bands)        [{ unit_key, words, ranked, band, band_index, steps_back }]
//     units: [{ unit_key, lemmas }]. band is the band of the unit's middle word; steps_back is true when that band
//     is more common than the band of the unit before it (units with no ranked word are passed over).
import { existsSync, readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

export const frequencyDir = () => process.env.LA_FREQUENCY_DIR ?? join(homedir(), '.languageacademy', 'frequency');

export function readRanks(lang, dir = frequencyDir()) {
  const file = join(dir, `${lang}.tsv`);
  if (!existsSync(file)) return null;
  const value = new Map();
  for (const line of readFileSync(file, 'utf8').split('\n')) {
    const [lemma, v] = line.split('\t');
    const n = Number(v);
    if (!lemma || !Number.isFinite(n)) continue;
    if (!value.has(lemma) || n > value.get(lemma)) value.set(lemma, n);
  }
  const ordered = [...value].sort((a, b) => b[1] - a[1] || (a[0] < b[0] ? -1 : 1));
  return new Map(ordered.map(([lemma], i) => [lemma, i + 1]));
}

const bandIndex = (rank, bands) => bands.findIndex((b) => b.to_rank === null || rank <= b.to_rank);

export function frequencyTrend(units, ranks, bands) {
  let last = null;
  return units.map((u) => {
    const ranked = u.lemmas.map((l) => ranks.get(l) ?? ranks.get(l.toLowerCase())).filter((r) => r !== undefined).sort((a, b) => a - b);
    if (!ranked.length) return { unit_key: u.unit_key, words: u.lemmas.length, ranked: 0, band: null, band_index: null, steps_back: false };
    // The middle word, as the median of an even count takes the mean of the two middle ranks.
    const mid = ranked.length % 2 ? ranked[(ranked.length - 1) / 2] : (ranked[ranked.length / 2 - 1] + ranked[ranked.length / 2]) / 2;
    const index = bandIndex(mid, bands);
    const row = { unit_key: u.unit_key, words: u.lemmas.length, ranked: ranked.length, band: bands[index].name, band_index: index, steps_back: last !== null && index < last };
    last = index;
    return row;
  });
}
