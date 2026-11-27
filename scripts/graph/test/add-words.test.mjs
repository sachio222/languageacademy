// The word builder (scripts/graph/add-words.mjs): one list per language, one builder for all of them.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { addWords, listProblems, idOf, readLanguage, readDictionaryIds, loadRules, langDir } from '../add-words.mjs';

const sorted = (value) => {
  if (Array.isArray(value)) return value.map(sorted);
  if (value && typeof value === 'object') return Object.fromEntries(Object.keys(value).sort().map((k) => [k, sorted(value[k])]));
  return value;
};
const asFile = (value) => `${JSON.stringify(sorted(value), null, 2)}\n`;

test('the French word list rebuilds its words byte for byte', async () => {
  const lang = 'fr';
  const { list, data } = readLanguage(lang);
  const rules = await loadRules(lang);
  const ids = new Set(list.map((e) => idOf(lang, e)));
  assert.ok(list.length > 0);
  for (const id of ids) assert.ok(data.headwords.some((h) => h.id === id), `${id} is listed but not in headwords.json: run pnpm graph:add-words`);
  // Take every listed word and its forms out, then build them again from the list alone.
  const without = {
    headwords: data.headwords.filter((h) => !ids.has(h.id)),
    forms: data.forms.filter((f) => !ids.has(f.of)),
    paradigms: data.paradigms,
  };
  const out = addWords({ lang, list, data: without, rules, dictionaryIds: readDictionaryIds() });
  assert.equal(out.added.headwords, list.length);
  assert.equal(asFile(out.headwords), readFileSync(join(langDir(lang), 'headwords.json'), 'utf8'));
  assert.equal(asFile(out.forms), readFileSync(join(langDir(lang), 'forms.json'), 'utf8'));
  // Run on the data as it is, it adds nothing.
  const again = addWords({ lang, list, data, rules, dictionaryIds: readDictionaryIds() });
  assert.deepEqual(again.added, { headwords: 0, forms: 0 });
});

// A made-up language: the builder itself knows nothing about French.
const xx = {
  paradigms: [{ id: 'xx:cx:noun.plural', rules: [{ cell: 'pl', strip: '', add: 's' }] }, { id: 'xx:cx:verb', rules: [{ cell: 'prs.1sg', strip: 'ar', add: 'o' }] }],
  headwords: [{ id: 'xx:lex:dar', lemma: 'dar', pos: 'verb', paradigms: ['xx:cx:verb'] }],
  forms: [{ id: 'xx:form:dar.prs.1sg', of: 'xx:lex:dar', cell: 'prs.1sg', surface: 'doy' }],
};
const xxRules = { inflect: (e) => ({ paradigms: e.pos === 'noun' ? ['xx:cx:noun.plural'] : e.pos === 'verb' ? ['xx:cx:verb'] : [], cells: [] }) };
const build = (list) => addWords({ lang: 'xx', list, data: xx, rules: xxRules, dictionaryIds: new Set(['casa-xx']) });

test('a word takes its paradigms from the language rules, and its register and use from the list', () => {
  const out = build([
    { lemma: 'casa', pos: 'noun', gender: 'f', level: 'A1', gloss: 'house' },
    { lemma: 'tío', pos: 'noun', gender: 'm', level: 'B1', gloss: 'guy', register: 'slang', use: 'recognize', forms: { pl: 'tíos', dim: 'tiíto' } },
  ]);
  const casa = out.headwords.find((h) => h.id === 'xx:lex:casa');
  assert.deepEqual(casa, { cefr: 'A1', cefrSource: 'agent: judgment', dictionaryId: 'casa-xx', gender: 'f', id: 'xx:lex:casa', lemma: 'casa', paradigms: ['xx:cx:noun.plural'], pos: 'noun', senses: [{ gloss: 'house' }] });
  const tio = out.headwords.find((h) => h.id === 'xx:lex:tio');
  assert.equal(tio.register, 'slang');
  assert.equal(tio.use, 'recognize');
  // tíos is what the paradigm builds, so only the form no paradigm builds is stored
  assert.deepEqual(out.forms.filter((f) => f.of === 'xx:lex:tio'), [{ cell: 'dim', id: 'xx:form:tio.dim', of: 'xx:lex:tio', surface: 'tiíto' }]);
  assert.deepEqual(out.added, { headwords: 2, forms: 1 });
});

test('a verb like another copies its paradigms and forms with the start added', () => {
  const out = build([{ lemma: 'redar', pos: 'verb', level: 'B2', gloss: 'to give again', like: 'dar' }]);
  assert.deepEqual(out.headwords.find((h) => h.id === 'xx:lex:redar').paradigms, ['xx:cx:verb']);
  assert.deepEqual(out.forms.find((f) => f.of === 'xx:lex:redar'), { cell: 'prs.1sg', id: 'xx:form:redar.prs.1sg', of: 'xx:lex:redar', surface: 'redoy' });
});

test('a word already in the list is skipped, and one whose ID is taken must name its own', () => {
  assert.deepEqual(build([{ lemma: 'dar', pos: 'verb', level: 'A1', gloss: 'to give' }]).added, { headwords: 0, forms: 0 });
  assert.throws(() => build([{ lemma: 'dár', pos: 'noun', gender: 'm', level: 'A1', gloss: 'gift' }]), /needs its own id/);
  assert.equal(build([{ lemma: 'dár', pos: 'noun', gender: 'm', level: 'A1', gloss: 'gift', id: 'xx:lex:dar.gift' }]).added.headwords, 1);
});

test('the list is checked before anything is built', () => {
  const bad = listProblems([
    { lemma: 'casa', pos: 'noun', level: 'A1', gloss: 'house' },
    { lemma: 'ir', pos: 'verb', gender: 'm', level: 'A7', gloss: 'to go', register: 'rude', use: 'produce', colour: 'red' },
    { lemma: 'ir', pos: 'verb', level: 'A1', gloss: 'to go' },
    { lemma: 'ver', pos: 'verb', level: 'A1' },
  ], 'xx');
  for (const part of ['only a noun, takes a gender', 'level A7', 'register rude', 'use produce', 'colour is not a field', 'listed twice', 'gloss is missing']) {
    assert.ok(bad.some((line) => line.includes(part)), `no problem mentions "${part}": ${bad.join(' | ')}`);
  }
  assert.throws(() => build([{ lemma: 'casa', pos: 'noun', level: 'A1', gloss: 'house' }]), /takes a gender/);
});

test('French rules: verb classes, spelling changes of -er verbs, noun and adjective patterns', async () => {
  const lang = 'fr';
  const { data } = readLanguage(lang);
  const rules = await loadRules(lang);
  const build1 = (entry) => {
    const out = addWords({ lang, list: [{ level: 'B2', gloss: 'x', ...entry }], data: { ...data, headwords: [], forms: [] }, rules });
    return { paradigms: out.headwords[0].paradigms, forms: Object.fromEntries(out.forms.map((f) => [f.cell, f.surface])) };
  };
  const verb = (lemma, extra = {}) => build1({ lemma, pos: 'verb', ...extra });
  assert.equal(verb('zzcorriger').forms['prs.1pl'], 'zzcorrigeons');
  assert.equal(verb('zzplacer').forms['prs.1pl'], 'zzplaçons');
  assert.equal(verb('zzpeser').forms['fut.1sg'], 'zzpèserai');
  assert.equal(verb('zzsécher').forms['prs.3sg'], 'zzsèche');
  assert.equal(verb('zzsécher').forms['fut.1sg'], undefined); // séchera keeps é
  assert.equal(verb('zztutoyer').forms['prs.3sg'], 'zztutoie');
  assert.deepEqual(verb('zzvexer').forms, {}); // e before x takes no accent
  assert.equal(verb('zzprojeter', { class: 'double' }).forms['prs.3sg'], 'zzprojette');
  assert.ok(verb('zzfinir', { class: 'ir' }).paradigms.includes('fr:cx:verb.ir.present'));
  assert.ok(verb('zzattendre', { class: 're' }).paradigms.includes('fr:cx:verb.re.present'));
  assert.throws(() => verb('zzvoir'), /needs a class/);
  assert.throws(() => verb('zzparler', { class: 'oir' }), /not one of/);
  const noun = (lemma, extra = {}) => build1({ lemma, pos: 'noun', gender: 'm', ...extra }).paradigms;
  assert.deepEqual(noun('zzbateau'), ['fr:cx:noun.plural.x']);
  assert.deepEqual(noun('zzjournal'), ['fr:cx:noun.plural.al']);
  assert.deepEqual(noun('zzcolis'), []);
  assert.deepEqual(noun('zzbeau-père', { forms: { pl: 'zzbeaux-pères' } }), []);
  const adjective = (lemma) => build1({ lemma, pos: 'adjective' }).paradigms;
  assert.deepEqual(['zzactif', 'zzheureux', 'zzcalme', 'zzactuel', 'zzgrand'].map(adjective),
    [['fr:cx:adj.if'], ['fr:cx:adj.eux'], ['fr:cx:adj.e'], ['fr:cx:adj.double'], ['fr:cx:adj.regular']]);
});
