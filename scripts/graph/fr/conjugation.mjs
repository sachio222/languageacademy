// A French verb's present tense as the Verb forms step teaches it, built from the graph's forms (forms.json, and the
// regular patterns in paradigms.json). A lesson names the verb; everything else comes from here:
//   rows      one per person, in order of use in speech (je, tu, il/elle/on, vous, ils/elles, nous), each with its
//             form, its stem (the start of the form), its silent letters (the end of the form) and its sound group
//   groups    the forms that sound alike
//   contrast  what a learner can and cannot hear between il and ils (the -ent of the plural is never said)
//   shape     a signature two verbs share when they are conjugated alike (pouvoir after vouloir, sortir after partir)
// The sound of a form is read off its spelling: the present's final s, x, t and d are silent, so is a final e, the
// -ent of ils, the s of -ons and the z of -ez. Two forms sound alike when what is left is spelled alike.
const CELLS = ['prs.1sg', 'prs.2sg', 'prs.3sg', 'prs.2pl', 'prs.3pl', 'prs.1pl'];
const PERSON = { 'prs.1sg': 'je', 'prs.2sg': 'tu', 'prs.3sg': 'il/elle/on', 'prs.2pl': 'vous', 'prs.3pl': 'ils/elles', 'prs.1pl': 'nous' };
const VOWEL = /^[aeiouyàâäéèêëîïôöùûüœæh]/i;
const HAS_VOWEL = /[aeiouyàâäéèêëîïôöùûüœæ]/i;

/** The six present forms of a verb, by cell: the spellings forms.json holds, else what the verb's paradigms build. */
export function presentForms(graph, lexId) {
  const head = graph.headwords.find((h) => h.id === lexId);
  if (!head) throw new Error(`${lexId} is not a headword of the graph`);
  const out = {};
  for (const id of head.paradigms ?? []) {
    const p = graph.paradigms.find((x) => x.id === id);
    for (const r of p?.rules ?? [])
      if (CELLS.includes(r.cell) && out[r.cell] === undefined && head.lemma.endsWith(r.strip)) out[r.cell] = head.lemma.slice(0, head.lemma.length - r.strip.length) + r.add;
  }
  for (const f of graph.forms) if (f.of === lexId && CELLS.includes(f.cell)) out[f.cell] = f.surface;
  const missing = CELLS.filter((c) => typeof out[c] !== 'string');
  if (missing.length) throw new Error(`the graph has no ${missing.join(', ')} form of ${head.lemma}`);
  return { lemma: head.lemma, forms: out, regularEr: (head.paradigms ?? []).includes('fr:cx:verb.er.present') };
}

// The letters at the end of a form that are not said.
function silentTail(cell, form) {
  if (cell === 'prs.1pl') return form.endsWith('ons') ? 's' : form.endsWith('es') ? 'es' : '';
  if (cell === 'prs.2pl') return form.endsWith('ez') ? 'z' : form.endsWith('es') ? 'es' : '';
  if (cell === 'prs.3pl') return form.endsWith('ent') ? 'ent' : form.endsWith('ont') ? 't' : '';
  // Singular: a final e or es is silent (parle, parles), and so is a final run of s, x, t, d, p (prends, veut).
  for (const tail of [form.match(/es?$/)?.[0], form.match(/[sxtdp]+$/)?.[0]])
    if (tail && HAS_VOWEL.test(form.slice(0, form.length - tail.length))) return tail;
  return /[sxtd]$/.test(form) && form.length > 1 ? form.slice(-1) : '';
}

// What is said, spelled: the form less its silent letters, with the circumflex left off (connaît sounds like connais).
const saidOf = (form, silent) => form.slice(0, form.length - silent.length).replace(/î/g, 'i').replace(/û/g, 'u').replace(/â/g, 'a');

// The start of the form the endings attach to: the form less -ons, -ez or -ent, else less its silent letters.
function stemOf(cell, form, silent) {
  const ending = { 'prs.1pl': 'ons', 'prs.2pl': 'ez', 'prs.3pl': 'ent' }[cell];
  if (ending && form.endsWith(ending) && form.length > ending.length) return form.slice(0, form.length - ending.length);
  return form.slice(0, form.length - silent.length) || form;
}

// The last sound of what is said, in words a learner can read: a vowel, a nasal vowel, or a consonant by its sound.
function lastSound(said) {
  const s = said.toLowerCase();
  if (/[aeiouyéèêëîïôöùûüœ][nm]$/.test(s) && !/[nm][nm]$/.test(s)) return { kind: 'nasal' };
  if (/[aeiouyéèêëîïôöùûüœ]$/.test(s)) return { kind: 'vowel' };
  const map = [[/gn$/, 'ny'], [/ch$/, 'sh'], [/qu$/, 'k'], [/ill$/, 'y'], [/ss$/, 's'], [/[aeiouyéèêî]s$/, 'z'], [/c$/, 'k'], [/([bdfglmnprstvz])\1$/, null]];
  for (const [re, name] of map) if (re.test(s)) return { kind: 'consonant', sound: name ?? s.slice(-1) };
  return { kind: 'consonant', sound: s.slice(-1) };
}
const article = (sound) => (/^[aefhilmnorsx]$/.test(sound) ? 'an' : 'a');
const endsText = (form, e) =>
  e.kind === 'vowel' ? `{${form}} ends on a vowel sound.` : e.kind === 'nasal' ? `{${form}} ends on a vowel sound, with no n.` : `{${form}} ends with ${article(e.sound)} ${e.sound} sound.`;

const elide = (person, form) => (person === 'je' && VOWEL.test(form) ? "j'" : person);
const spoken = (person, form) => (person.endsWith("'") ? person + form : `${person} ${form}`);

/**
 * The conjugation of one verb.
 * @param graph  { headwords, forms, paradigms } of the French graph
 * @param spec   { verb } (the infinitive as the graph spells its lemma)
 * @returns { verb, rows, groups, contrast, shape, regularEr }
 */
export function conjugation(graph, spec) {
  const head = graph.headwords.find((h) => h.pos === 'verb' && h.lemma === spec.verb) ?? graph.headwords.find((h) => h.lemma === spec.verb);
  if (!head) throw new Error(`${spec.verb} is not a verb of the graph`);
  const { lemma, forms, regularEr } = presentForms(graph, head.id);
  const cells = CELLS.map((cell) => {
    const form = forms[cell], silent = silentTail(cell, form), said = saidOf(form, silent);
    return { cell, form, silent, said, stem: stemOf(cell, form, silent) };
  });
  // nous and vous keep their whole form as the group's name (voulons, voulez); the others are named by what is said.
  const groupOf = (c) => (c.cell === 'prs.1pl' || c.cell === 'prs.2pl' ? c.form : c.said);
  const groups = [];
  for (const c of cells) if (!groups.includes(groupOf(c))) groups.push(groupOf(c));
  // Group ids in the order a learner meets the sounds: singular, they, you, we.
  const order = ['prs.1sg', 'prs.2sg', 'prs.3sg', 'prs.3pl', 'prs.2pl', 'prs.1pl'];
  groups.sort((a, b) => order.indexOf(cells.find((c) => groupOf(c) === a).cell) - order.indexOf(cells.find((c) => groupOf(c) === b).cell));
  const rows = cells.map((c) => {
    const row = { cell: c.cell, person: c.cell === 'prs.1sg' ? elide('je', c.form) : PERSON[c.cell], form: c.form, group: groupOf(c), stem: c.stem };
    if (c.silent) row.silent = c.silent;
    return row;
  });

  const one = cells.find((c) => c.cell === 'prs.3sg'), many = cells.find((c) => c.cell === 'prs.3pl');
  const same = one.said === many.said;
  const liaison = VOWEL.test(many.form);
  let listen;
  if (same) listen = `{${one.form}} and {${many.form}} sound the same: the -ent is never said. The spelling and the rest of the sentence tell you who it is.`;
  else if (!many.form.endsWith('ent')) listen = `{${one.form}} and {${many.form}} are different words. You hear the difference in the whole word.`;
  else listen = `${endsText(one.form, lastSound(one.said))} ${endsText(many.form, lastSound(many.said))} The -ent itself is never said.`;
  const contrast = {
    same,
    one: spoken('il', one.form),
    many: spoken('ils', many.form),
    listen,
    ...(liaison ? { liaison: { one: spoken('il', one.form), many: spoken('ils', many.form), listen: `Before a vowel the s of {ils} is said, as a z sound: {ils ${many.form}}. {il ${one.form}} has no z.` } } : {}),
  };

  // Verbs conjugated alike share this: which persons sound alike, the singular's silent letters, how the plural stem
  // grows from the singular, whether ils keeps the stem of nous and of the infinitive, and the infinitive's ending.
  const sg = cells.find((c) => c.cell === 'prs.1sg'), we = cells.find((c) => c.cell === 'prs.1pl');
  const partition = cells.map((c) => groups.indexOf(groupOf(c))).join('');
  const grow = we.stem.startsWith(sg.said) ? we.stem.length - sg.said.length : 'x';
  const shape = regularEr && cells.every((c) => c.cell === 'prs.1pl' || c.cell === 'prs.2pl' || c.said === sg.said)
    ? 'er'
    : [
        lemma.match(/(oir|ir|re|er)$/)?.[0] ?? '-',
        partition,
        cells.slice(0, 3).map((c) => c.silent || '-').join(''),
        grow,
        many.stem === we.stem ? 'same' : 'own',
        lemma.startsWith(we.stem) ? 'inf' : 'new',
        // vous in -ez and nous in -ons, or a form of its own (dites, faites, sommes)
        cells.find((c) => c.cell === 'prs.2pl').form.endsWith('ez') && we.form.endsWith('ons') ? 'ez' : 'odd',
      ].join('|');
  return { verb: lemma, rows, groups: groups.map((id) => ({ id })), contrast, shape, regularEr };
}
