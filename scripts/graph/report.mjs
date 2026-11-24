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

const LATER = /taught later at position \d+ \(.*\)$/;

function fixClause(i, byKey) {
  const target = i.fix?.moduleKey;
  const base = !target || target === i.moduleKey
    ? 'teach in this module'
    : (() => {
      const m = byKey.get(target);
      return m ? `teach in ${m.title} (position ${m.position})` : `teach in ${target}`;
    })();
  const later = LATER.exec(i.message ?? '');
  return later ? `${base}; ${later[0]}` : base;
}

export function renderFixList(issues, course) {
  const byKey = new Map(course.map((m) => [m.moduleKey, m]));
  const unitOf = (i) => byKey.get(i.moduleKey)?.unitTitle ?? 'Other';
  const of = (...rules) => issues.filter((i) => rules.includes(i.rule));
  const out = ['# French course fix list', ''];
  const s = summarize(issues);
  out.push(`${s.errors} errors, ${s.warnings} warnings, ${s.modulesWithErrors} modules with errors.`, '');

  const grouped = (list, line) => {
    if (!list.length) { out.push('None.', ''); return; }
    const sorted = [...list].sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
    let unit = null;
    let pos = null;
    for (const i of sorted) {
      if (unitOf(i) !== unit) {
        unit = unitOf(i);
        pos = null;
        out.push(`## ${unit}`, '');
      }
      if (i.position !== pos) {
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
    return `- ${what}: ${fixClause(i, byKey)}`;
  });

  out.push('# 2. Exam topics not taught', '');
  grouped(of('claim-untaught', 'claims-unmapped'), (i) => `- ${i.message}`);

  out.push('# 3. Translation prompts to convert', '');
  const tr = new Map();
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
  return out.join('\n');
}
