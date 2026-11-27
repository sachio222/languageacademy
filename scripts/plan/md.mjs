// plan:md: the course plan as a document a person reads, made from the plan file and nothing else that could drift.
//
// renderMd({ plan, report, context, lang, repoRoot }) -> markdown
import { REPO_ROOT, plain, readReadingTypes } from './plan.mjs';
import { wordReader } from './words.mjs';

const KIND = { lesson: 'Lesson', guide: 'Guide', reading: 'Reading', practice: 'Practice set', unit_exam: 'Unit exam' };
export const READING_KIND = { story: 'story', article: 'article', exposition: 'exposition', 'learning-alongside': 'a character learns alongside the reader' };
const TYPES = readReadingTypes().byId;
/** A reading part's type by its name, as a reader sees it. */
export const typeName = (id) => TYPES.get(id)?.name ?? id;
const short = (id) => id.split(':').slice(2).join(':');
const fr = (text) => String(text ?? '').replace(/\{([^}]+)\}/g, '*$1*');

export function renderMd({ plan, report, context, repoRoot = REPO_ROOT }) {
  const word = wordReader({ repoRoot, plan, lookups: context.lookups });
  const out = [];
  const first = plan.units[0].unit_key;
  const last = plan.units.at(-1).unit_key;
  out.push(`# Course plan (${plan.language}): ${first} to ${last}`, '');
  if (plan.about) out.push(plan.about, '');
  out.push('This document is made from `course-plan.json` by `pnpm plan:md`. Change the plan file, never this page.', '');
  out.push('## What the plan holds', '');
  const k = report.by_kind;
  out.push(`${report.units} units and ${report.modules} modules: ${k.lesson} lessons, ${k.guide} guides, ${k.reading} readings, ${k.practice} practice sets and ${k.unit_exam} unit exams. They teach ${report.words.toLocaleString('en-US')} new words, each once. ${report.words_to_add} of those words are not in the graph yet (marked \\*).`, '');
  out.push('| Level | Reached in | Module | Position |', '|---|---|---|---|');
  for (const [level, l] of Object.entries(report.levels)) {
    out.push(l.reached ? `| ${level} | ${l.in_written_course ? 'the written course' : l.unit_key} | ${l.module_key ?? ''} | ${l.position} |` : `| ${level} | not reached | | |`);
  }
  out.push('', '| Unit | Lessons | Guides | New words |', '|---|---|---|---|');
  for (const u of report.by_unit) out.push(`| ${u.unit_key} | ${u.lessons} | ${u.guides} | ${u.words} |`);
  out.push('');

  for (const unit of plan.units) {
    out.push(`## ${unit.unit_key}: ${fr(unit.title)}`, '', `**Can do.** ${fr(unit.can_do)}`, '');
    out.push(`**Cast.** ${unit.setting.cast.join('; ')}.`, '');
    if (unit.setting.places?.length) out.push(`**Places.** ${unit.setting.places.join('; ')}.`, '');
    if (unit.setting.situations?.length) out.push(`**Situations.** ${unit.setting.situations.join('; ')}.`, '');
    if (unit.culture?.history) out.push(`**History.** ${unit.culture.history}`, '');
    if (unit.culture?.customs) out.push(`**Customs.** ${unit.culture.customs}`, '');
    if (unit.sound) out.push(`**Sound focus.** ${unit.sound}`, '');
    unit.modules.forEach((m, i) => {
      const at = context.position.get(m.module_key);
      out.push(`${i + 1}. **${KIND[m.kind]}: ${fr(m.title)}** (\`${m.module_key}\`${at ? `, position ${at}` : ', written'}, ${m.minutes} min)`);
      const line = (label, text) => text && out.push(`   - ${label}: ${text}`);
      line('Goal', fr(m.goal));
      line('Situation', m.situation);
      if (m.teaches.constructions.length) line('Patterns', m.teaches.constructions.map(short).join(', '));
      if (m.teaches.words.length) {
        line(`${m.kind === 'reading' ? 'Table words' : 'Words'} (${m.teaches.words.length})`, m.teaches.words.map(word).map((w) => `*${w.lemma}*${w.to_add ? '\\*' : ''}${w.gloss ? ` (${w.gloss})` : ''}`).join(', '));
      }
      if (m.practises?.length) line('Leans on', m.practises.map(short).join(', '));
      if (m.reading) {
        const r = m.reading;
        line('Parts', r.parts.map((p) => `*${p.title}* (${p.title_native}), ${READING_KIND[p.kind]}, type: ${typeName(p.type)}`).join('; '));
        line('Why this type', r.type_note);
        line('Genre', r.genre);
        line('Premise', r.premise);
        if (r.must_use.length) line('Must use', r.must_use.map(short).join(', '));
        line('Length', [r.distinct_words && `about ${r.distinct_words} distinct words`, r.running_words && `about ${r.running_words} running words${r.parts.length > 1 ? ' a part' : ''}`].filter(Boolean).join('; '));
        line('Questions', r.questions);
        line('Art', r.art);
        line('Note', r.note);
      }
      if (m.exam) line('Exam', `${m.exam.items} items, ${m.exam.minutes} minutes${m.exam.checks ? `; ${m.exam.checks}` : ''}`);
      line('Summary', m.summary);
      line('Culture note', m.culture_note);
      if (m.spoken?.length) line('Spoken', `${m.spoken.map((s) => `*${s}*`).join(', ')}${m.spoken_example ? `. ${m.spoken_example}` : ''}`);
      line('Note', m.note);
    });
    out.push('');
    if (unit.notes?.length) out.push('**Why it is built this way.**', '', ...unit.notes.map((x) => `- ${x}`), '');
    if (unit.open?.length) out.push('**To settle when the unit is written.**', '', ...unit.open.map((x) => `- ${x}`), '');
  }

  if (plan.words_to_add?.length) {
    out.push('## Words to add to the graph', '', '| Word | Meaning | Kind | Level | Taught in | Note |', '|---|---|---|---|---|---|');
    for (const w of plan.words_to_add) {
      const note = [w.register, w.use === 'recognize' ? 'recognition only' : null, w.held].filter(Boolean).join('; ');
      out.push(`| *${w.lemma}* | ${w.gloss} | ${[w.pos, w.gender].filter(Boolean).join(', ')} | ${w.level} | \`${w.module_key}\` | ${note} |`);
    }
    out.push('');
  }
  if (plan.later?.length) out.push('## Kept for the next level', '', ...plan.later.map((x) => `- ${x}`), '');
  return out.join('\n').replace(/\n{3,}/g, '\n\n') + '\n';
}
export { plain };
