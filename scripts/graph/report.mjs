// Turns the checker's issues into counts and a markdown fix list for the product owner.
import { languageName } from './pairs.mjs';
import { percent } from './report-data.mjs';
import { LEVELS } from './levels-data.mjs';

// stats (from runCheck): the native language checked for and how many tokens the cognate allowance let through.
export function summarize(issues, stats = {}) {
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
  const extra = {};
  if (stats.native !== undefined) extra.native = stats.native;
  if (stats.cognatesAllowed !== undefined) extra.cognatesAllowed = stats.cognatesAllowed;
  if (stats.coverage !== undefined) extra.coverage = stats.coverage;
  if (stats.functionsPossible !== undefined) extra.functionsPossible = stats.functionsPossible;
  return { byRule, errors, warnings, modulesWithErrors: modules.size, ...extra };
}

// Rules graph:check always prints, even at zero: a course that reads cleanly has none of them.
const ALWAYS_PRINTED = ['dangling-ref', 'level-data-missing', 'unread-items'];

// The lines graph:check prints: one count per rule, sorted, then the totals.
export function checkSummaryLines(summary) {
  const counts = { ...Object.fromEntries(ALWAYS_PRINTED.map((r) => [r, 0])), ...summary.byRule };
  const rules = Object.keys(counts).sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
  return [
    ...rules.map((rule) => `${rule}: ${counts[rule]}`),
    `errors: ${summary.errors}, warnings: ${summary.warnings}, modules with errors: ${summary.modulesWithErrors}`,
    ...(summary.native !== undefined ? [`native: ${summary.native}`] : []),
    ...(summary.cognatesAllowed !== undefined ? [`cognatesAllowed: ${summary.cognatesAllowed}`] : []),
    ...Object.entries(summary.coverage ?? {}).map(([level, c]) => {
      const line = coverageClause(c, `${level}: `, `${level} core`);
      const k = c.cumulative;
      const same = !k || (k.coreWords === c.coreWords && k.coreConstructions === c.coreConstructions);
      return same ? line : `${line}; ${coverageClause(k, `through ${level}: `, 'core')}`;
    }),
    ...(summary.functionsPossible && Object.keys(summary.functionsPossible).length
      ? [`functions possible by the end: ${Object.entries(summary.functionsPossible).map(([level, f]) => `${level} ${f.possible} of ${f.total}`).join(', ')}`]
      : []),
  ];
}

// "A1: 50% of A1 core words (369 of 733), 64 more open in the Reference unit, 37 of 40 A1 core constructions, not
// reached". The Reference clause shows only when some core words are open there.
function coverageClause(c, lead, noun) {
  const reference = c.referenceWords ? `${c.referenceWords} more open in the Reference unit, ` : '';
  return `${lead}${percent(c.taughtWords, c.coreWords)}% of ${noun} words (${c.taughtWords} of ${c.coreWords}), ${reference}`
    + `${c.taughtConstructions} of ${c.coreConstructions} ${noun} constructions, `
    + (c.reachedAt === null ? 'not reached' : `reached at position ${c.reachedAt}`);
}

// Rules that sections 1 to 9 show; anything else lands in section 10.
const HANDLED = new Set([
  'untaught-word', 'untaught-construction', 'claim-untaught', 'claims-unmapped', 'translate-item',
  'taught-twice', 'reuse-missed', 'level-label', 'level-data-missing', 'level-order', 'nonstandard-shape', 'unknown-word',
  'function-no-exponent', 'function-unreachable',
]);

const TEACHING = new Set(['lesson', 'help']);

// Exams, practice and reading modules cannot teach, so a fix aimed at one points to the lessons before it. A typed
// cognate's fix is aimed at the module where the learner first types it, and it has a second fix.
function fixClause(i, byKey) {
  const target = i.fix?.moduleKey;
  const m = target ? byKey.get(target) : null;
  const canTeach = !m || TEACHING.has(m.kind ?? 'lesson');
  let base;
  if (!target || target === i.moduleKey) base = canTeach ? 'teach in this module' : 'teach in a lesson before this module';
  else if (!m) base = `teach in ${target}`;
  else base = `${canTeach ? 'teach in' : 'teach in a lesson before'} ${m.title} (position ${m.position})`;
  return i.reason === 'cognate' ? `${base}, or let the learner read it instead of typing it` : base;
}

// Why a word or pattern counts as untaught, in plain words. A typed cognate says so, then gives its other reason.
function reasonClause(i, speakers) {
  if (i.reason === 'cognate') {
    const rest = reasonClause({ ...i, reason: i.baseReason }, speakers);
    return `*${i.surface}* is a cognate, so ${speakers} may read it before it is taught, but they should not have to type it${rest ? `; ${rest}` : ''}`;
  }
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

// The opening paragraph of How to read this. openFrom: the position from which the Reference unit counts as open
// (settings.reference.openFrom), or null when it stays closed. titles: the titles of the Reference pages that open.
function openingParagraph(openFrom, titles = []) {
  const pages = titles.length > 1 ? `${titles.slice(0, -1).join(', ')} and ${titles.at(-1)}` : titles[0];
  const reference = openFrom == null
    ? 'The Reference unit (alphabet, numbers, days and months, colors and similar pages) has no position, because learners can '
      + 'open it at any time, so it teaches nothing at any point in the course.'
    : 'The Reference unit (alphabet, numbers, days and months, colors and similar pages) has no position, because learners can '
      + `open it at any time. The words on ${pages ? `its pages ${pages}` : 'its lookup pages'} count as available from position ${openFrom} on, `
      + 'so a lesson may use a number or a day without teaching it first. Only the nouns, adjectives, numbers and letters on those '
      + 'pages count, with their forms; verbs and grammar words such as le or je do not. A Reference word spelled like another '
      + 'word, such as the letter y and the pronoun y, counts only once a lesson teaches that spelling. Sections 6 and 7 count '
      + 'Reference words apart from the words lessons teach.';
  return 'A checker read every lesson, practice, reading and exam in course order and tested one thing for each French word '
    + 'and grammar pattern: was it taught before the learner meets it? Positions count the modules in course order, from 1 to 160. '
    + 'A code such as fr:lex:livre names the entry in the course word list, and a code starting fr:cx: names a grammar pattern. '
    + reference;
}

const HOW_TO_READ = [
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
    + 'that do not come back soon enough to stick.',
  'Section 6 measures the course against the CEFR levels, the scale of the Common European Framework of Reference that runs from A1 '
    + 'for beginners through A2 and B1 to C2. Each level has a core list: the words and grammar patterns new at that level, so a learner at A2 needs both the A1 and A2 lists. '
    + 'A level counts as reached once 90% of its core words are taught or open in the Reference unit and every grammar pattern on its '
    + 'list is taught. The level of '
    + 'each word and pattern is our own grading, informed by public sources: the Eaquals inventory of French grammar and functions by '
    + 'level, word frequencies from Lexique, and FLELex, which grades words by how often French textbooks use them at each level. A '
    + 'module\'s level is the highest level among the words and patterns it teaches. Section 6 also lists level labels that claim more '
    + 'than the modules teach, and modules that teach a word or pattern two or more levels above the highest level reached before them '
    + '(counting from A1 until the course reaches a level).',
  'Section 7 lists what a learner can do with French at each level, such as asking the time, and the module where each becomes '
    + 'possible. Section 8 lists modules that store exercises in an older format.',
  'Section 9 lists words missing from the course word list. Most are typos, English words, or accepted answers typed without '
    + 'accents or apostrophes. Section 10 lists everything else, including fill-in-the-blank sentences whose blank sits inside a word, '
    + 'on a punctuation mark that the app then hides, or after the full stop.',
];

// The label before the quoted text of a Section 1 line, by the source of the item it came from.
const SOURCE_LABEL = {
  concept: 'Concept card', hint: 'Hint', instruction: 'Instruction', 'vocab-note': 'Vocabulary note',
  feedback: 'Feedback', title: 'Module title', description: 'Module description', screen: 'Help screen',
};

// The how-to-read paragraph on cognates, for the native language the list was checked for. allowIn:
// settings.cognates.allowIn, 'shown' (cognates count as known only in French the learner reads or hears) or 'all'.
function cognatesParagraph(pair, allowIn = 'shown') {
  const lang = languageName(pair.native);
  if (!pair.words?.length) {
    return `This list was checked for ${lang} speakers. No cognate list exists for ${lang} speakers, so every untaught word `
      + 'counts, however close it is to a word they know.';
  }
  const file = `curriculum-graph/pairs/${pair.native}-${pair.target ?? 'fr'}/cognates.json`;
  if (allowIn === 'all') {
    return `This list was checked for ${lang} speakers. A cognate is a French word they read correctly without a lesson, `
      + 'such as restaurant. From the cognates lesson on, every cognate counts as known, in French the learner types as well '
      + `as French they read or hear, so Section 1 does not list it. The cognates come from ${file}.`;
  }
  return `This list was checked for ${lang} speakers, so a cognate (a French word they read correctly without a lesson, `
    + 'such as restaurant) may appear in French the learner reads or hears from the cognates lesson on, before a lesson '
    + `teaches it. The cognates come from curriculum-graph/pairs/${pair.native}-${pair.target ?? 'fr'}/cognates.json, and `
    + 'Section 1 still lists a cognate the learner has to type. That line names the module where the learner first types it: '
    + 'teach the word there, or let the learner read it instead of typing it.';
}

const plural = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`;

// A node's name for the report: a headword's lemma, a construction's label, or the ID itself.
function nodeName(graph, id) {
  const n = graph?.nodes?.get(id);
  return n?.lemma ?? n?.label ?? id;
}

// A short name for a node in a list: a headword's lemma, a form as written, a construction's label without checker
// notes, or the ID itself.
function shortName(graph, id) {
  const n = graph?.nodes?.get(id);
  return n?.lemma ?? n?.surface ?? (n?.label ? displayLabel(n.label) : id);
}

// A construction label for the report: the description before any checker note (the part after "; " or from
// ", optionally" on, and "(optionally ...)" asides), which says how the detector reads text rather than what is taught.
export function displayLabel(label) {
  return String(label).split('; ')[0].split(', optionally')[0].replace(/\s*\(optionally[^)]*\)/g, '').trim();
}

// "12. Title" for a course position.
function moduleAt(byPosition, position) {
  const m = byPosition.get(position);
  return m ? `${position}. ${m.title}` : `position ${position}`;
}

// Section 6: coverage of each core list, where each level is reached, unit levels, level labels and out-of-order
// teaching. opts.levels is levelReport(ctx); opts.graph names the nodes.
function renderLevels(out, of, byPosition, opts) {
  const data = opts.levels;
  const levels = Object.entries(data?.levels ?? {});
  if (!levels.length) {
    out.push('No core lists yet, so coverage cannot be measured.', '');
  } else {
    const row = (name, c) => {
      const reached = c.reachedAt === null ? 'Not reached' : moduleAt(byPosition, c.reachedAt);
      const available = c.availableWords ?? c.taughtWords;
      return `| ${name} | ${percent(c.taughtWords, c.coreWords)}% (${c.taughtWords} of ${c.coreWords}) | ${c.referenceWords ?? 0} `
        + `| ${percent(available, c.coreWords)}% (${available} of ${c.coreWords}) `
        + `| ${c.taughtConstructions} of ${c.coreConstructions} | ${reached} |`;
    };
    const head = (first) => `| ${first} | Core words taught | Open in the Reference unit | Core words available | Core constructions taught | Reached at |`;
    const rule = '|---|---|---|---|---|---|';
    const first = levels[0][0];
    const next = levels[1]?.[0];
    out.push('Each core list holds only the words and grammar patterns new at its level'
      + (next ? `, so the ${next} figures count ${next} words alone. A learner at ${next} also needs the ${first} list, so the `
        + 'second table counts each level together with the levels below it.' : '.')
      + ' All percentages are rounded to the nearest whole number, and 100% means the whole list is taught.', '');
    const alone = levels.map(([level, l]) => `${level} ${percent(l.taughtWords, l.coreWords)}%`).join(', ');
    out.push(`Core words of each level alone taught by the end of the course: ${alone}.`, '');
    const through = levels.map(([level, l]) => `through ${level} ${percent(l.cumulative.taughtWords, l.cumulative.coreWords)}%`).join(', ');
    out.push(`Counting each level together with the levels below it: ${through}.`, '');
    out.push('Core words available are the words lessons teach plus the core words no lesson teaches but the Reference unit lists. '
      + 'A learner can use both, so where a level is reached counts available words.', '');
    out.push('Each level on its own list:', '');
    out.push(head('Level'), rule);
    for (const [level, l] of levels) out.push(row(level, l));
    out.push('');
    out.push('Each level together with the levels below it:', '');
    out.push(head('Levels'), rule);
    for (const [level, l] of levels) out.push(row(`Through ${level}`, l.cumulative));
    out.push('');
    out.push('## Core grammar patterns not taught', '');
    const cx = levels.filter(([, l]) => l.untaughtConstructions.length);
    if (!cx.length) out.push('None.');
    for (const [level, l] of cx) {
      out.push(`- ${level}: ${l.untaughtConstructions.map((id) => `${displayLabel(nodeName(opts.graph, id))} (${id})`).join('; ')}`);
    }
    out.push('');
    out.push('## Core words not taught', '');
    for (const [level, l] of levels) {
      const open = new Set(l.untaughtReferenceWords ?? []);
      const names = l.untaughtWords.map((id) => `${nodeName(opts.graph, id)}${open.has(id) ? ' (open in the Reference unit)' : ''}`);
      // Untaught core words left out of untaughtWords are reading limits, listed in their own section.
      const limited = l.coreWords - l.taughtWords - names.length;
      const plus = limited > 0 ? ` (plus ${limited} listed under Verbs the checker cannot read yet)` : '';
      out.push(`- ${level}, ${plural(names.length, 'word')}${plus}${names.length ? `: ${names.join(', ')}` : ''}`);
    }
    out.push('');
    const limits = data.readingLimits ?? [];
    if (limits.length) {
      out.push('## Verbs the checker cannot read yet', '');
      out.push('The checker cannot yet tell these verbs from a noun or adjective with the same spelling: it reads il porte as '
        + 'the noun porte, not as the verb porter. They count in the core lists above, and when untaught they are listed here '
        + 'instead of with the core words not taught.', '');
      for (const r of limits) {
        const status = r.taughtAt === null ? 'not taught' : `taught at ${moduleAt(byPosition, r.taughtAt)}`;
        out.push(`- ${nodeName(opts.graph, r.id)} (${r.cefr ?? 'no level'}): ${status}`);
      }
      out.push('');
    }
  }

  const units = data?.units ?? [];
  if (units.length) {
    out.push('## Units', '');
    out.push('| Unit | Positions | Level label | Highest level taught | Taught at that level |', '|---|---|---|---|---|');
    for (const u of units) {
      out.push(`| ${u.title ?? u.unitId} | ${u.firstPosition} to ${u.lastPosition} | ${u.label ?? 'None'} | ${u.computed ?? 'None'} `
        + `| ${u.computed ? u.computedCount : 0} |`);
    }
    out.push('', 'A single word or grammar pattern is enough to set a unit\'s highest level, so the last column gives how many '
      + 'words, forms and grammar patterns the unit teaches at that level.', '');
  }

  out.push('## Level labels', '');
  const labels = of('level-label', 'level-data-missing');
  if (!labels.length) out.push('None.');
  for (const i of labels) out.push(`- ${i.message}`);
  out.push('');

  out.push('## Modules that teach above the level reached', '');
  const order = of('level-order');
  if (!order.length) out.push('None.');
  else {
    const reached = levels.filter(([, l]) => l.reachedAt !== null);
    out.push(reached.length
      ? 'Each module below teaches words or grammar patterns two or more levels above the highest level the course has reached before it.'
      : 'The course reaches no level, so each module below teaches words or grammar patterns two or more levels above A1 (B1 or higher).', '');
  }
  for (const i of order) {
    const levelOf = new Map((i.nodeLevels ?? []).map((n) => [n.id, n.level]));
    const list = (i.nodes ?? []).map((id) => `${id} (${levelOf.get(id) ?? '?'})`).join(', ');
    out.push(`- ${moduleAt(byPosition, i.position)}: ${list}`);
  }
  out.push('');
}

// Section 7: functions by level, with the module where each becomes possible and what the others still need.
// opts.functions is functionReport(ctx).
function renderFunctions(out, byPosition, opts) {
  const fns = opts.functions?.functions ?? [];
  if (!fns.length) { out.push('No functions yet.', ''); return; }
  const levels = LEVELS.filter((l) => fns.some((f) => f.cefr === l));
  out.push('A function is something a learner does with French, such as greeting someone or asking the time. It becomes '
    + 'possible at the first module by which every word and grammar pattern of one French way to do it is taught or open in '
    + 'the Reference unit. '
    + '"Possible" is a floor: the course has taught at least one short way to do the function, often a single phrase. That is '
    + 'not proof that a learner can do it at that level, so the table puts each level\'s count beside the share of that '
    + 'level\'s core words the course teaches.', '');
  out.push('| Level | Functions possible by the end | Core words of that level taught |', '|---|---|---|');
  for (const level of levels) {
    const of = fns.filter((f) => f.cefr === level);
    const core = opts.levels?.levels?.[level];
    const words = core ? `${percent(core.taughtWords, core.coreWords)}% (${core.taughtWords} of ${core.coreWords})` : 'No core list';
    out.push(`| ${level} | ${of.filter((f) => f.position !== null).length} of ${of.length} | ${words} |`);
  }
  out.push('');
  const viaReference = [...new Set(fns.flatMap((f) => f.viaReferenceNodes ?? []).map((id) => shortName(opts.graph, id)))]
    .sort((a, b) => a.localeCompare(b, 'fr'));
  if (viaReference.length) {
    out.push(`Some functions rely on words that no lesson teaches by then but the Reference unit lists (${viaReference.join(', ')}). `
      + 'The Reference unit is always open, so those functions count as possible, and "(relies on the Reference unit)" marks them below.', '');
  }
  const referenceOnly = [...new Set(fns.flatMap((f) => f.referenceOnly))].sort();
  if (referenceOnly.length) {
    const names = referenceOnly.map((id) => nodeName(opts.graph, id)).join(', ');
    out.push((opts.referenceOpenFrom == null
      ? `Some functions need words that no lesson teaches and only the Reference unit lists (${names}). `
        + 'That unit has no position in the course, so it teaches nothing, and those functions never become possible. '
      : `Some functions need words that no lesson teaches and that the Reference unit lists without opening them (${names}). `
        + 'It opens only the nouns, adjectives, numbers and letters on its lookup pages, so those functions never become possible. ')
      + 'Below, "(Reference unit)" marks those words.', '');
  }
  for (const level of levels) {
    out.push(`## ${level}`, '');
    const possible = fns.filter((f) => f.cefr === level && f.position !== null)
      .sort((a, b) => a.position - b.position || (a.id < b.id ? -1 : 1));
    const never = fns.filter((f) => f.cefr === level && f.position === null);
    out.push('Possible, with the module where each becomes possible:', '');
    if (!possible.length) out.push('None.');
    for (const f of possible) out.push(`- ${moduleAt(byPosition, f.position)}: ${f.label}${f.viaReference ? ' (relies on the Reference unit)' : ''}`);
    out.push('');
    out.push('Never possible in the course:', '');
    if (!never.length) out.push('None.');
    for (const f of never) {
      const ref = new Set(f.referenceOnly);
      const needs = f.missing.map((id) => `${shortName(opts.graph, id)}${ref.has(id) ? ' (Reference unit)' : ''}`).join(', ');
      out.push(`- ${f.label}: ${f.exponentCount === 0 ? 'no French way to do it is listed yet' : `still needs ${needs}`}`);
    }
    out.push('');
  }
}

// opts.pair: the language pair the issues were checked with (graph.pair); it sets the cognates paragraph, together
// with opts.cognatesAllowIn (settings.cognates.allowIn).
// opts.levels and opts.functions: levelReport and functionReport for Sections 6 and 7; opts.graph names their nodes.
export function renderFixList(issues, course, courseMap = {}, opts = {}) {
  const speakers = `${languageName(opts.pair?.native ?? 'en')} speakers`;
  const byKey = new Map(course.map((m) => [m.moduleKey, m]));
  const byPosition = new Map(course.map((m) => [m.position, m]));
  const sourceOf = new Map(course.flatMap((m) => (m.items ?? []).map((it) => [it.ref, it.source])));
  const unitOf = (i) => byKey.get(i.moduleKey)?.unitTitle ?? 'Other';
  const byPos = (a, b) => (a.position ?? 0) - (b.position ?? 0);
  const of = (...rules) => issues.filter((i) => rules.includes(i.rule)).sort(byPos);
  const out = ['# French course fix list', ''];
  const s = summarize(issues);
  out.push(`${s.errors} errors, ${s.warnings} warnings, ${s.modulesWithErrors} modules with errors.`, '');
  out.push('## How to read this', '');
  for (const para of [openingParagraph(opts.referenceOpenFrom, opts.referenceOpenTitles), ...HOW_TO_READ]) out.push(para, '');
  if (opts.pair) out.push(cognatesParagraph(opts.pair, opts.cognatesAllowIn), '');
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
    const why = reasonClause(i, speakers);
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

  out.push('# 6. Levels', '');
  renderLevels(out, of, byPosition, opts);

  out.push('# 7. What a learner can do', '');
  renderFunctions(out, byPosition, opts);

  out.push('# 8. Exercises in a nonstandard format', '');
  const shapes = of('nonstandard-shape');
  if (!shapes.length) out.push('None.');
  for (const i of shapes) out.push(`- ${i.message}`);
  out.push('');

  out.push('# 9. Unknown words', '');
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

  out.push('# 10. Other problems', '');
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
