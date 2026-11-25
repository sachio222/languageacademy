// content/fr/migration-report.md (spec 8.2 item 4): everything a person should check after the conversion.
// Pure: takes report lines and returns Markdown. Lines keep course order; sections come in a fixed order.

// kind -> [heading, one sentence on what the lines mean]
const SECTIONS = [
  ['held_out', 'Needs Jake', 'These exercises are left out of the converted files, because fixing them takes a teaching decision. Each stays out on every rerun until it is decided.'],
  ['guide_checks_by_hand', 'Guide checks written by hand', 'The source guide has no checks, so its three are written by hand in the module file. A rerun keeps them, and hand-fixes.json records them.'],
  ['story_missing', 'Readings with no story', 'Prototype L has no illustrated story for these readings, so the passage is today’s readingPassage text, without its pictures. Story art is a separate piece of work.'],
  ['answer_fails', 'Answers the checker rejects', 'The app’s answer checker rejects a declared answer, or accepts a listed mistake. Each needs a fix in its module file.'],
  ['word_sense', 'Spellings taught more than once', 'Each line proposes whether a spelling taught again is the same meaning (same word_id) or a new one (a sense suffix). Confirm or change the word_id in the module file; a rerun keeps it.'],
  ['type_guess', 'Item types to confirm', 'The classifier had no clear rule for these items, so the type is its best guess.'],
  ['blank_misplaced', 'Practice blanks that were in the wrong place', 'The practice screen shows a blank in place of the character at its position, so these blanks cut a word, dropped a mark or sat after the full stop. Each is placed where the language-graph checker reads it.'],
  ['position_word', 'Position words', 'Learner text that names a module, unit or reading by number. The source says it this way; the module file names the subject instead, and each line fixed so says "fixed by hand".'],
  ['rewritten', 'Exercises rewritten as Jake ruled', 'No conversion of today’s text fits these, so each is written as Jake ruled, in its place.'],
  ['framed_respond', 'English prompts written as respond items', 'An English prompt framed by its instruction ("Say \'you would do it\' (informal)") or by a context note ("I know Marie (person)") is a respond item, with the whole frame as the situation, since the context does the teaching (Jake, 2026-11-25). A bare English sentence is a translate item; outside Unit 1 each is a checker warning, rewritten over time.'],
  ['reading_word_no_popup', 'Passage words with no pop-up', 'Each word below appears in the reading’s passage and has no dictionary entry (src/data/dictionary/), no row in the reading’s glossary or vocabulary table, and is not a name in curriculum-graph/languages/fr/names.json. Each needs one of the three, so every word a learner taps opens a pop-up.'],
  ['estimate', 'Estimates to confirm', 'The source sets no value, so the conversion wrote an estimate.'],
  ['hand_edit', 'Hand edits kept', 'The module file differs from a fresh conversion of an unchanged source here. A rerun keeps the file.'],
  ['merge_conflict', 'Hand edits the source or converter changed under', 'A hand edit is kept, and the source or the converter now gives something else for the same part. Compare the two and settle it in the module file; the line stays until the file matches the new output.'],
  ['live_unmatched', 'Live ids with no converted item', 'The live app stores answers under these exercise ids and concept indexes, and no converted item, concept or section has the same content, so live-ids.json has no entry for them. Real misses come first: each needs a look. The other two groups are expected, since the new files hold nothing for those ids.'],
  ['dropped_field', 'Fields with no place in a module file', 'Today’s objects hold these, and the module schema has no field for them.'],
  ['text_changed', 'Text written differently', 'The same words, moved into a field of the new shape.'],
  ['note', 'Notes', 'Things the conversion keeps or drops on a ruling, listed so nothing changes unseen (ledger ruling 2026-11-25 Task 8).'],
  ['course_map', 'Course map split', 'What each module teaches and tests now sits in its module file (`teaches`, `tests`). `curriculum-graph/languages/fr/course-map.corrections.json` keeps the checker’s corrections, each under its module key and item id. These lines list every course-map entry that moved to a new key or has no place in either file.'],
  ['outline', 'Outline', 'Changes the outline step made when it wrote course.json from today’s unit configs.'],
];

// What one run changed (a source change converted again, an exercise added or removed, a conflict accepted): news for
// that run, which `content:migrate` prints. The report never holds them, so it is the same on every rerun and under --force.
export const RUN_ONLY_KINDS = ['source_changed', 'source_added', 'source_removed', 'conflict_accepted'];

const count = (lines, kind) => lines.filter((l) => l.kind === kind).length;

// Lines that repeat one mechanical change are listed once per module, with their paths.
function groupOf(l) {
  if (l.kind === 'framed_respond') return /framed by its instruction/.test(l.detail) ? 'framed by its instruction' : 'framed by a context note';
  if (l.kind === 'dropped_field' && /: generic instruction "/.test(l.detail)) return `generic instruction dropped (${/generic instruction "(.*)"$/.exec(l.detail)[1].replace(/(["'‘“]).*(["'’”])/, '$1…$2')})`;
  if (l.kind === 'text_changed' && /prefix dropped/.test(l.detail)) return `"${/"([^"]*)" prefix/.exec(l.detail)[1]}" prefix dropped; the sentence is the text`;
  if (l.kind === 'text_changed' && /written as the gloss/.test(l.detail)) return 'instruction written as the gloss ("Complete:" and quotes dropped)';
  return null;
}

/**
 * @param lines   ReportLine[] ({ module_key, path, kind, detail }), course order
 * @param summary { modules, items, held, byUnit?: [{ unit, translate, respond }], kinds?: { lesson, practice, unit_exam, guide, reading, reference }, readingMinted? }
 */
export function renderReport(allLines, summary) {
  const lines = allLines.filter((l) => !RUN_ONLY_KINDS.includes(l.kind));
  const out = [];
  out.push('# Converting today’s modules to module files', '');
  const k = summary.kinds;
  const made = k
    ? ` (${k.lesson} lessons, ${k.practice} practice sets, ${k.unit_exam} unit exams, ${k.guide} guides, ${k.reading} readings and ${k.reference} Reference pages)`
    : '';
  out.push(
    `\`pnpm content:migrate\` wrote ${summary.modules} module files${made} under \`content/fr/modules/\` from today’s modules in \`src/lessons/modules/\`, with ${summary.items} items. ` +
      'Guides and readings also read prototype L’s guides and illustrated stories (`content/fr/legacy/l-sources.json`). ' +
      (summary.held ? `${summary.held} exercises are held out until Jake decides them (first section). ` : '') +
      (summary.readingMinted ? `${summary.readingMinted} word ids are first minted in a reading’s vocabulary table, since a reading teaches its own table. ` : '') +
      'The sections below list every guess the conversion made and every place where the written files differ from today’s source.',
    '',
  );
  out.push('This file is written again on every run. Fixes go in the module files, never here.', '');
  if (summary.byUnit?.length) {
    out.push('English-to-French prompts by unit: a bare English sentence is a `translate` item, a framed one a `respond` item.', '');
    out.push('| Unit | Bare `translate` | Framed `respond` |', '|---|---|---|');
    for (const u of summary.byUnit) out.push(`| ${u.unit} | ${u.translate} | ${u.respond} |`);
    out.push('');
  }
  const misses = lines.filter((l) => l.kind === 'live_unmatched' && (l.reason ?? 'miss') === 'miss').length;
  out.push('| Section | Lines |', '|---|---|');
  for (const [kind, heading] of SECTIONS) {
    if (!count(lines, kind)) continue;
    const note = kind === 'live_unmatched' ? ` (${misses} real ${misses === 1 ? 'miss' : 'misses'})` : '';
    out.push(`| ${heading} | ${count(lines, kind)}${note} |`);
  }
  out.push('');
  for (const [kind, heading, about] of SECTIONS) {
    const mine = lines.filter((l) => l.kind === kind);
    if (!mine.length) continue;
    out.push(`## ${heading}`, '');
    if (about) out.push(about, '');
    if (kind === 'live_unmatched') writeLiveUnmatched(out, mine);
    else writeLines(out, mine);
    out.push('');
  }
  return out.join('\n').replace(/\n{3,}/g, '\n\n').trimEnd() + '\n';
}

// Live ids by reason: real misses line by line, the expected groups as one count per module.
const LIVE_REASONS = [
  ['reference_words', 'Reference word lists', 'The live app builds an exercise from each word of a Reference page; a Reference page has no items.', 'exercise'],
  ['no_concepts', 'Concept cards of modules that hold none', 'Practice sets, unit exams and readings hold no concept cards, so the live ticks on their cards have no new id.', 'concept card'],
];
function writeLiveUnmatched(out, mine) {
  const misses = mine.filter((l) => (l.reason ?? 'miss') === 'miss');
  out.push('### Real misses', '');
  if (misses.length) writeLines(out, misses);
  else out.push('None.');
  out.push('');
  for (const [reason, heading, about, noun] of LIVE_REASONS) {
    const ls = mine.filter((l) => l.reason === reason);
    if (!ls.length) continue;
    out.push(`### ${heading}`, '', about, '');
    const byModule = new Map();
    for (const l of ls) byModule.set(l.module_key, [...(byModule.get(l.module_key) || []), l]);
    for (const [key, ms] of byModule) out.push(`- **${key}**: ${ms.length} ${noun}${ms.length === 1 ? '' : 's'}`);
    out.push('');
  }
}

// One section's lines, module by module, with repeated mechanical changes grouped.
function writeLines(out, mine) {
  let current = null;
  let groups = null;
  const flush = () => {
    for (const [g, ls] of groups || [])
      out.push(
        g === 'words'
          ? `- ${ls.length} ${ls.length === 1 ? 'word' : 'words'}: ${ls.map((l) => l.detail).join(', ')}`
          : `- ${ls.length} × ${g}: ${ls.map((l) => `\`${l.path}\``).join(', ')}`,
      );
    groups = null;
  };
  for (const l of mine) {
    if (l.module_key !== current) {
      flush();
      current = l.module_key;
      out.push('', `**${current ?? 'course'}**`, '');
    }
    if (l.kind === 'reading_word_no_popup') {
      groups = groups || new Map();
      groups.set('words', [...(groups.get('words') || []), l]);
      continue;
    }
    const g = groupOf(l);
    if (g) {
      groups = groups || new Map();
      groups.set(g, [...(groups.get(g) || []), l]);
    } else out.push(`- \`${l.path}\` ${l.detail.replace(/\n/g, ' ')}`);
  }
  flush();
}
