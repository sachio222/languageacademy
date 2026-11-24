// Turns the checker's issues into counts and a markdown fix list for the product owner.

export function summarize(issues) {
  const byRule = {};
  let errors = 0;
  let warnings = 0;
  const modules = new Set();
  for (const i of issues) {
    byRule[i.rule] = (byRule[i.rule] ?? 0) + 1;
    if (i.severity === 'error') {
      errors += 1;
      if (i.moduleKey) modules.add(i.moduleKey);
    } else warnings += 1;
  }
  return { byRule, errors, warnings, modulesWithErrors: modules.size };
}

// Rules graph:check always prints, even at zero: a course that reads cleanly has none of them.
const ALWAYS_PRINTED = ['dangling-ref', 'unread-items'];

// The lines graph:check prints: one count per rule, sorted, then the totals.
export function checkSummaryLines(summary) {
  const counts = { ...Object.fromEntries(ALWAYS_PRINTED.map((r) => [r, 0])), ...summary.byRule };
  const rules = Object.keys(counts).sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
  return [
    ...rules.map((rule) => `${rule}: ${counts[rule]}`),
    `errors: ${summary.errors}, warnings: ${summary.warnings}, modules with errors: ${summary.modulesWithErrors}`,
  ];
}

// Rules that sections 1 to 8 show; anything else lands in section 9.
const HANDLED = new Set([
  'untaught-word', 'untaught-construction', 'claim-untaught', 'claims-unmapped', 'translate-item',
  'taught-twice', 'reuse-missed', 'level-label', 'level-data-missing', 'nonstandard-shape', 'unknown-word',
]);

const TEACHING = new Set(['lesson', 'help']);

// Exams, practice and reading modules cannot teach, so a fix aimed at one points to the lessons before it.
function fixClause(i, byKey) {
  const target = i.fix?.moduleKey;
  const m = target ? byKey.get(target) : null;
  const canTeach = !m || TEACHING.has(m.kind ?? 'lesson');
  let base;
  if (!target || target === i.moduleKey) base = canTeach ? 'teach in this module' : 'teach in a lesson before this module';
  else if (!m) base = `teach in ${target}`;
  else base = `${canTeach ? 'teach in' : 'teach in a lesson before'} ${m.title} (position ${m.position})`;
  return base;
}

// Why a word or pattern counts as untaught, in plain words.
function reasonClause(i) {
  if (i.reason === 'later' && i.taughtLaterAt) return `taught later, at position ${i.taughtLaterAt.position} (${i.taughtLaterAt.title})`;
  if (i.reason === 'form' && i.taughtEarlierAt) {
    return `the word ${i.lemma ?? i.nodeId} is taught at position ${i.taughtEarlierAt.position}, but this form is not`;
  }
  if (i.reason === 'nowhere') return 'not taught anywhere in the course';
  return null;
}

// The sentence around `surface`, cut at word breaks to about `max` characters, with … where text was cut.
export function excerpt(text, surface, max = 80) {
  const t = String(text ?? '').replace(/\s+/g, ' ').trim();
  if (t.length <= max) return t;
  // the surface as a whole word, so "a" does not match inside "maison"
  const word = surface ? new RegExp(`(?<!\\p{L})${String(surface).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?!\\p{L})`, 'iu') : null;
  const hit = word ? t.search(word) : -1;
  const centre = hit < 0 ? 0 : hit + String(surface).length / 2;
  let a = Math.max(0, Math.round(centre - max / 2));
  let b = Math.min(t.length, a + max);
  a = Math.max(0, b - max);
  if (a > 0) a = t.indexOf(' ', a) + 1 || a;
  if (b < t.length) b = t.lastIndexOf(' ', b) > a ? t.lastIndexOf(' ', b) : b;
  return `${a > 0 ? '…' : ''}${t.slice(a, b).trim()}${b < t.length ? '…' : ''}`;
}

const HOW_TO_READ = [
  'A checker read every lesson, practice, reading and exam in course order and tested one thing for each French word '
    + 'and grammar pattern: was it taught before the learner meets it? Positions count the modules in course order, from 1 to 160. '
    + 'A code such as fr:lex:livre names the entry in the course word list, and a code starting fr:cx: names a grammar pattern. '
    + 'The Reference unit (alphabet, numbers, days and months, colors and similar pages) has no position, because learners can '
    + 'open it at any time, so it teaches nothing at any point in the course.',
  'Besides the exercises, the checker reads the French a learner sees on concept cards, hints, instructions, vocabulary notes, '
    + 'feedback on a wrong answer, module titles and the four help screens. A line that comes from one of these names it before '
    + 'the quote, for example Hint: or Help screen:, instead of Sentence:.',
  'Section 1 lists words and patterns used before they are taught, module by module. Each line gives the reason (taught in a '
    + 'later module, a form such as bonne of a word taught earlier as bon, or not taught anywhere) and quotes the sentence it '
    + 'came from. The default fix is to teach the word earlier, in the module where it is first used; each line names that module. '
    + 'If the sentence does not need the word, remove it instead.',
  'Section 2 lists exam and practice topics the course has not taught by that point. Section 3 counts, per module, exercises after '
    + 'Unit 1 that show an English prompt and ask for the French; these should become other exercise types. Section 4 lists words and '
    + 'patterns explained in more than one lesson: keep the explanation in the lesson named and turn the others into practice. A word '
    + 'counts as explained where it heads a vocabulary entry, not where it appears inside a longer phrase. Section 5 counts taught words '
    + 'that do not come back soon enough to stick. Section 6 will compare level labels (A1 to C2) with the words each module teaches; the '
    + 'course word list has no level data yet, so for now it reports how many entries lack a level. Section 7 lists modules that store '
    + 'exercises in an older format.',
  'Section 8 lists words missing from the course word list. Most are typos, English words, or accepted answers typed without '
    + 'accents or apostrophes. Section 9 lists everything else, including fill-in-the-blank sentences whose blank sits inside a word, '
    + 'on a punctuation mark that the app then hides, or after the full stop.',
];

// The label before the quoted text of a Section 1 line, by the source of the item it came from.
const SOURCE_LABEL = {
  concept: 'Concept card', hint: 'Hint', instruction: 'Instruction', 'vocab-note': 'Vocabulary note',
  feedback: 'Feedback', title: 'Module title', description: 'Module description', screen: 'Help screen',
};

export function renderFixList(issues, course, courseMap = {}) {
  const byKey = new Map(course.map((m) => [m.moduleKey, m]));
  const sourceOf = new Map(course.flatMap((m) => (m.items ?? []).map((it) => [it.ref, it.source])));
  const unitOf = (i) => byKey.get(i.moduleKey)?.unitTitle ?? 'Other';
  const byPos = (a, b) => (a.position ?? 0) - (b.position ?? 0);
  const of = (...rules) => issues.filter((i) => rules.includes(i.rule)).sort(byPos);
  const out = ['# French course fix list', ''];
  const s = summarize(issues);
  out.push(`${s.errors} errors, ${s.warnings} warnings, ${s.modulesWithErrors} modules with errors.`, '');
  out.push('## How to read this', '');
  for (const para of HOW_TO_READ) out.push(para, '');
  const notes = course.flatMap((m) => (courseMap[m.moduleKey]?.contentNotes ?? []).map((n) => `- ${m.position}. ${m.title}: ${n}`));
  if (notes.length) out.push('## Lesson text to fix', '', ...notes, '');

  const grouped = (list, line) => {
    if (!list.length) { out.push('None.', ''); return; }
    const sorted = [...list].sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
    let unit = null;
    let pos = null;
    for (const i of sorted) {
      if (unitOf(i) !== unit) {
        if (unit !== null) out.push('');
        unit = unitOf(i);
        pos = null;
        out.push(`## ${unit}`, '');
      }
      if (i.position !== pos) {
        if (pos !== null) out.push('');
        pos = i.position;
        out.push(`### ${i.position ?? '?'}. ${byKey.get(i.moduleKey)?.title ?? i.moduleKey ?? 'course'}`, '');
      }
      out.push(line(i));
    }
    out.push('');
  };

  out.push('# 1. Untaught words and patterns', '');
  grouped(of('untaught-word', 'untaught-construction'), (i) => {
    const what = i.surface ? `"${i.surface}" (${i.nodeId ?? 'no node'})` : i.nodeId;
    const why = reasonClause(i);
    const label = SOURCE_LABEL[sourceOf.get(i.itemRef)] ?? 'Sentence';
    const sentence = i.text ? ` ${label}: "${excerpt(i.text, i.surface)}"` : '';
    return `- ${what}: ${why ? `${why}; ` : ''}${fixClause(i, byKey)}.${sentence}`;
  });

  out.push('# 2. Exam topics not taught', '');
  grouped(of('claim-untaught', 'claims-unmapped'), (i) => `- ${i.message}`);

  out.push('# 3. Translation prompts to convert', '');
  const tr = new Map(); // of() sorts by position, so modules appear in course order
  for (const i of of('translate-item')) tr.set(i.moduleKey, (tr.get(i.moduleKey) ?? 0) + 1);
  if (!tr.size) out.push('None.');
  for (const [key, n] of tr) {
    const m = byKey.get(key);
    out.push(`- ${m ? `${m.position}. ${m.title}` : key}: ${n} prompt${n === 1 ? '' : 's'}`);
  }
  out.push('');

  out.push('# 4. Taught twice', '');
  const twice = of('taught-twice');
  if (!twice.length) out.push('None.');
  for (const i of twice) out.push(`- ${i.message}; ${i.fix?.kind === 'merge-duplicate' ? `merge into ${byKey.get(i.fix.moduleKey)?.title ?? i.fix.moduleKey}` : 'merge'}`);
  out.push('');

  out.push('# 5. Not reused', '');
  const missed = of('reuse-missed');
  if (!missed.length) out.push('None.');
  else {
    const perUnit = new Map();
    for (const i of missed) perUnit.set(unitOf(i), (perUnit.get(unitOf(i)) ?? 0) + 1);
    for (const [unit, n] of perUnit) out.push(`- ${unit}: ${n}`);
    out.push('', 'First 20:', '');
    for (const i of missed.slice(0, 20)) out.push(`- ${i.message}`);
  }
  out.push('');

  out.push('# 6. Level labels', '');
  const levels = of('level-label', 'level-data-missing');
  if (!levels.length) out.push('None.');
  for (const i of levels) out.push(`- ${i.message}`);
  out.push('');

  out.push('# 7. Exercises in a nonstandard format', '');
  const shapes = of('nonstandard-shape');
  if (!shapes.length) out.push('None.');
  for (const i of shapes) out.push(`- ${i.message}`);
  out.push('');

  out.push('# 8. Unknown words', '');
  const unknown = of('unknown-word');
  if (!unknown.length) out.push('None.');
  const perModule = new Map();
  for (const i of unknown) {
    if (!perModule.has(i.moduleKey)) perModule.set(i.moduleKey, new Set());
    perModule.get(i.moduleKey).add(i.surface);
  }
  for (const [key, set] of perModule) {
    const m = byKey.get(key);
    out.push(`- ${m ? `${m.position}. ${m.title}` : key}: ${[...set].join(', ')}`);
  }
  out.push('');

  out.push('# 9. Other problems', '');
  const other = issues.filter((i) => !HANDLED.has(i.rule)).sort(byPos);
  if (!other.length) out.push('None.');
  for (const i of other) {
    const m = byKey.get(i.moduleKey);
    const where = m ? ` [${m.position}. ${m.title}]` : (i.moduleKey ? ` [${i.moduleKey}]` : '');
    out.push(`- ${i.rule} (${i.severity})${where}: ${i.message}`);
  }
  out.push('');
  return out.join('\n');
}
