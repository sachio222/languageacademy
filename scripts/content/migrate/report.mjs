// content/fr/migration-report.md (spec 8.2 item 4): everything a person should check after the conversion.
// Pure: takes report lines and returns Markdown. Lines keep course order; sections come in a fixed order.

// kind -> [heading, one sentence on what the lines mean]
const SECTIONS = [
  ['held_out', 'Needs Jake', 'These exercises are left out of the converted files, because fixing them takes a teaching decision. Each stays out on every rerun until it is decided.'],
  ['answer_fails', 'Answers the checker rejects', 'The app’s answer checker rejects a declared answer, or accepts a listed mistake. Each needs a fix in its module file.'],
  ['word_sense', 'Spellings taught more than once', 'Each line proposes whether a spelling taught again is the same meaning (same word_id) or a new one (a sense suffix). Confirm or change the word_id in the module file; a rerun keeps it.'],
  ['type_guess', 'Item types to confirm', 'The classifier had no clear rule for these items, so the type is its best guess.'],
  ['blank_misplaced', 'Practice blanks that were in the wrong place', 'The practice screen shows a blank in place of the character at its position, so these blanks cut a word, dropped a mark or sat after the full stop. Each is placed where the language-graph checker reads it.'],
  ['position_word', 'Position words', 'Learner text that names a module, unit or reading by number. The source says it this way; the module file names the subject instead, and each line fixed so says "fixed by hand".'],
  ['rewritten', 'Exercises rewritten as Jake ruled', 'No conversion of today’s text fits these, so each is written as Jake ruled, in its place.'],
  ['framed_respond', 'English prompts written as respond items', 'An English prompt framed by its instruction ("Say \'you would do it\' (informal)") or by a context note ("I know Marie (person)") is a respond item, with the whole frame as the situation, since the context does the teaching (Jake, 2026-11-25). A bare English sentence is a translate item; outside Unit 1 each is a checker warning, rewritten over time.'],
  ['hand_edit', 'Hand edits kept', 'The module file differs from a fresh conversion of an unchanged source here. A rerun keeps the file.'],
  ['source_changed', 'Source changes since the last run', 'The source changed, so these parts were converted again; their ids stay.'],
  ['source_added', 'Source exercises added since the last run', ''],
  ['source_removed', 'Source exercises removed since the last run', ''],
  ['live_unmatched', 'Live ids with no converted item', 'The live app stores answers under these exercise ids and concept indexes, and no converted item or concept has the same content, so live-ids.json has no entry for them.'],
  ['dropped_field', 'Fields with no place in a module file', 'Today’s objects hold these, and the module schema has no field for them.'],
  ['text_changed', 'Text written differently', 'The same words, moved into a field of the new shape.'],
  ['outline', 'Outline', 'Changes the outline step made when it wrote course.json from today’s unit configs.'],
];

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
 * @param summary { modules, items, held, byUnit?: [{ unit, translate, respond }] }
 */
export function renderReport(lines, summary) {
  const out = [];
  out.push('# Converting lessons, practice sets and unit exams to module files', '');
  out.push(
    `\`pnpm content:migrate modules\` wrote ${summary.modules} module files under \`content/fr/modules/\` from today’s lessons, practice sets and unit exams in \`src/lessons/modules/\`, with ${summary.items} items. ` +
      (summary.held ? `${summary.held} exercises are held out until Jake decides them (first section). ` : '') +
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
  out.push('| Section | Lines |', '|---|---|');
  for (const [kind, heading] of SECTIONS) if (count(lines, kind)) out.push(`| ${heading} | ${count(lines, kind)} |`);
  out.push('');
  for (const [kind, heading, about] of SECTIONS) {
    const mine = lines.filter((l) => l.kind === kind);
    if (!mine.length) continue;
    out.push(`## ${heading}`, '');
    if (about) out.push(about, '');
    let current = null;
    let groups = null;
    const flush = () => {
      for (const [g, ls] of groups || []) out.push(`- ${ls.length} × ${g}: ${ls.map((l) => `\`${l.path}\``).join(', ')}`);
      groups = null;
    };
    for (const l of mine) {
      if (l.module_key !== current) {
        flush();
        current = l.module_key;
        out.push('', `**${current ?? 'course'}**`, '');
      }
      const g = groupOf(l);
      if (g) {
        groups = groups || new Map();
        groups.set(g, [...(groups.get(g) || []), l]);
      } else out.push(`- \`${l.path}\` ${l.detail.replace(/\n/g, ' ')}`);
    }
    flush();
    out.push('');
  }
  return out.join('\n').replace(/\n{3,}/g, '\n\n').trimEnd() + '\n';
}
