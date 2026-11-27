// plan:brief: everything a writer needs for one module, in one file, made from the plan and the language's folders.
//
//   node scripts/plan/cli.mjs brief <lang> <unit_key | module_key> [--out <dir>]
//
// A brief is assembled, never written by hand:
//   - what to write: the method for the module's kind (templates/<kind>.md), the same in every language;
//   - this module: what the plan says it teaches, its goal, situation, culture note and spoken words;
//   - the unit: its can-do, cast, places and situations (the written parts of the unit card), and its modules in order;
//   - what the learner knows by now: every pattern and word taught before this module, counting earlier planned
//     modules as written (scripts/graph/projection.mjs), and the words due for reuse (scripts/graph/rules/reuse.mjs);
//   - sizes and rules for the kind: the language's recipe (content/<lang>/recipes/<kind>.json);
//   - the rules of every module (templates/house.md) and the notes for this language (content/<lang>/writing-notes.md).
//
// briefsFor({ plan, context, limits, lang, repoRoot, target }) -> [{ module_key, file, text }]
// A brief's hash changes only when one of those inputs changes, so a writer can tell a stale brief from a current one.
import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dueFor } from '../graph/rules/reuse.mjs';
import { READING_KIND } from './md.mjs';
import { PlanError, plain, planPaths } from './plan.mjs';
import { wordReader } from './words.mjs';

const TEMPLATES = join(dirname(fileURLToPath(import.meta.url)), 'templates');
const KIND = { lesson: 'Lesson', guide: 'Guide', reading: 'Reading', practice: 'Practice set', unit_exam: 'Unit exam' };
const template = (name) => readFileSync(join(TEMPLATES, `${name}.md`), 'utf8').trim();

/** The method templates a module's brief opens with. */
export function templatesFor(module) {
  if (module.kind === 'lesson') return [module.teaches.constructions.length ? 'lesson-grammar' : 'lesson-words'];
  if (module.kind === 'reading') return [...new Set(module.reading.parts.map((p) => `reading-${p.kind}`))];
  return [module.kind];
}

function sizeLines(module, limits) {
  const recipe = limits.recipes.byKind.get(module.kind);
  const lines = [`- First pass: about ${module.minutes} minutes planned; at most ${module.kind === 'unit_exam' ? limits.exam_minutes : limits.minutes}${module.reading?.parts.length > 1 ? ' for each part' : ''}.`];
  const range = (v) => (v?.min !== undefined ? `${v.min} to ${v.max}` : v?.max !== undefined ? `at most ${v.max}` : null);
  if (module.kind === 'lesson') lines.push(`- New words: ${module.teaches.words.length} planned; at most ${limits.lesson_words}.`);
  if (module.kind === 'reading') lines.push(`- Table words: ${module.teaches.words.length} planned; at most ${limits.table_words}.`);
  if (range(recipe.size.items)) lines.push(`- Items: ${range(recipe.size.items)}.`);
  if (module.kind === 'unit_exam') lines.push(`- Items: ${module.exam.items} planned; at most ${limits.exam_items}.`);
  if (recipe.mix?.production_share_min) lines.push(`- At least ${Math.round(recipe.mix.production_share_min * 100)}% of items ask the learner to produce the language.`);
  if (module.kind === 'reading' && recipe.patterns_min) lines.push(`- The text uses at least ${Math.round(recipe.patterns_min * 100)}% of the patterns known by now.`);
  return lines;
}

function briefText({ plan, unit, module, context, limits, lang, repoRoot, word }) {
  const { projected, position, lookups } = context;
  const at = position.get(module.module_key);
  const cx = (id) => `\`${id}\`${lookups.constructions.get(id)?.label ? `: ${lookups.constructions.get(id).label}` : ''}`;
  const out = [];
  const section = (title, lines) => lines.filter(Boolean).length && out.push(`## ${title}`, '', ...lines.filter(Boolean), '');
  const field = (label, text) => (text ? `- **${label}.** ${text}` : null);

  out.push(`# Brief: ${KIND[module.kind]} · ${plain(module.title)}`, '', `Module \`${module.module_key}\` in ${unit.unit_key} (${plain(unit.title)}), position ${at} in the course. Language: ${lang}.`, '');
  section('What to write', templatesFor(module).flatMap((t) => [template(t), '']));

  const words = module.teaches.words.map(word);
  const wordLine = (w) => `- *${w.lemma}*: ${w.gloss || 'no meaning recorded'}${w.level ? ` (${w.level})` : ''}${w.register ? `, ${w.register}` : ''}${w.use === 'recognize' ? ', recognition only' : ''}${w.to_add ? ', not in the graph yet' : ''}`;
  section('This module', [
    field('Title', module.title), field('Goal', module.goal), field('Situation', module.situation), field('Summary', module.summary),
    module.teaches.constructions.length ? `- **Patterns it teaches.**\n${module.teaches.constructions.map((id) => `  - ${cx(id)}`).join('\n')}` : null,
    words.length ? `- **${module.kind === 'reading' ? 'Words its table teaches' : 'Words it teaches'}** (${words.length}):\n${words.map((w) => `  ${wordLine(w)}`).join('\n')}` : null,
    module.practises?.length ? `- **Patterns it leans on.** ${module.practises.map((id) => `\`${id}\``).join(', ')}` : null,
    field('Culture note', module.culture_note),
    module.spoken?.length ? `- **Spoken words its dialogue uses.** ${module.spoken.join(', ')}${module.spoken_example ? `. For example: ${module.spoken_example}` : ''}` : null,
    field('Note', module.note),
  ]);
  if (module.reading) {
    const r = module.reading;
    section('The reading', [
      ...r.parts.map((p, i) => `- **Part ${i + 1}.** *${p.title}* (${p.title_native}): ${READING_KIND[p.kind]}.`),
      field('Genre', r.genre), field('Premise', r.premise),
      r.must_use.length ? `- **Patterns the text must use.**\n${r.must_use.map((id) => `  - ${cx(id)}`).join('\n')}` : null,
      field('Length', [r.distinct_words && `about ${r.distinct_words} distinct words`, r.running_words && `about ${r.running_words} running words${r.parts.length > 1 ? ' for each part' : ''}`].filter(Boolean).join('; ')),
      field('Questions', r.questions), field('Art', r.art), field('Note', r.note),
    ]);
  }
  if (module.exam) section('The exam', [field('Items', String(module.exam.items)), field('Minutes', String(module.exam.minutes)), field('What it checks', module.exam.checks)]);

  section('The unit', [
    field('Can do', unit.can_do), field('Cast', unit.setting.cast.join('; ')), field('Places', unit.setting.places?.join('; ')),
    field('Situations', unit.setting.situations?.join('; ')), field('History', unit.culture?.history), field('Customs', unit.culture?.customs), field('Sound focus', unit.sound),
    '- **Modules, in order.**',
    ...unit.modules.map((m, i) => `  ${i + 1}. ${KIND[m.kind]}: ${plain(m.title)}${m.module_key === module.module_key ? ' (this module)' : ''}${m.goal && m.kind === 'lesson' ? `. ${m.goal}` : ''}`),
    ...(unit.open?.length ? ['- **To settle when the unit is written.**', ...unit.open.map((x) => `  - ${x}`)] : []),
  ]);

  section('Sizes', sizeLines(module, limits));
  const recipe = limits.recipes.byKind.get(module.kind);
  section(`Rules for a ${KIND[module.kind].toLowerCase()} (recipe)`, [
    ...recipe.skeleton.map((s) => `- **${s.part}.** ${s.rule}`),
    ...(recipe.drafter_rules ?? []).map((r) => `- ${r}`),
    ...(recipe.accept ?? []).map((a) => `- ${a.rule}`),
  ]);

  // What the learner knows by now: taught before this module, earlier planned modules counted as written.
  const before = at - 1;
  const taught = [...projected.timeline.taughtAt].filter(([, p]) => p <= before);
  const patterns = taught.filter(([id]) => lookups.constructions.has(id)).sort((a, b) => a[1] - b[1]);
  const unitOf = new Map(projected.course.map((m) => [m.position, m.unitKey]));
  const byUnit = new Map();
  for (const [id, p] of taught.filter(([id]) => lookups.headwords.has(id)).sort((a, b) => a[1] - b[1])) {
    const key = unitOf.get(p) ?? 'reference';
    if (!byUnit.has(key)) byUnit.set(key, []);
    byUnit.get(key).push(lookups.headwords.get(id).lemma);
  }
  const due = dueFor(projected, module.module_key)?.due ?? [];
  const dueWords = due.filter((d) => lookups.headwords.has(d.nodeId)).map((d) => lookups.headwords.get(d.nodeId).lemma);
  const duePatterns = due.filter((d) => lookups.constructions.has(d.nodeId)).map((d) => `\`${d.nodeId}\``);
  section('What the learner knows by now', [
    `${patterns.length} patterns and ${[...byUnit.values()].reduce((n, l) => n + l.length, 0)} words are taught before this module. Anything else needs a card here, a gloss, or another wording.`, '',
    dueWords.length ? `**Words due for reuse here:** ${dueWords.join(', ')}.` : null, dueWords.length ? '' : null,
    duePatterns.length ? `**Patterns due for reuse here:** ${duePatterns.join(', ')}.` : null, duePatterns.length ? '' : null,
    '**Patterns.**', '', patterns.map(([id]) => `\`${id.split(':').slice(2).join(':')}\``).join(', '), '',
    '**Words, by the unit that teaches them.**', '',
    ...[...byUnit].map(([key, lemmas]) => `- ${key}: ${lemmas.join(', ')}`),
  ]);

  section('Rules of every module', [template('house')]);
  const notes = join(planPaths(repoRoot, lang).content, 'writing-notes.md');
  if (existsSync(notes)) out.push(readFileSync(notes, 'utf8').trim().replace(/^# /, '## ').replace(/^## (?!Writing)/gm, '### '), '');
  const body = out.join('\n').replace(/\n{3,}/g, '\n\n');
  return `${body}\n---\nBrief ${createHash('sha256').update(body).digest('hex').slice(0, 12)}, made by \`plan:brief\` from the course plan. Do not edit it; change the plan and make it again.\n`;
}

export function briefsFor({ plan, context, limits, lang, repoRoot, target }) {
  const word = wordReader({ repoRoot, plan, lookups: context.lookups });
  const picked = [];
  for (const unit of plan.units) {
    unit.modules.forEach((module, i) => {
      if (unit.unit_key !== target && module.module_key !== target) return;
      if (!context.position.has(module.module_key)) return; // written already: nothing to brief
      picked.push({ unit, module, i });
    });
  }
  if (!picked.length) throw new PlanError(`${target}: no unit or planned module of that key in the ${lang} plan`);
  return picked.map(({ unit, module, i }) => ({
    module_key: module.module_key,
    file: join(unit.unit_key, `${String(i + 1).padStart(2, '0')}-${module.module_key}.md`),
    text: briefText({ plan, unit, module, context, limits, lang, repoRoot, word }),
  }));
}
