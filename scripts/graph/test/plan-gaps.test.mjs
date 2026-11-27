// The graph has what the course plan to A2 (Units 12 to 29) needs before its lessons can be written and checked:
// the new headwords of Getting things done, its two fixed phrases, and the present tense of every verb the plan
// teaches (flags.verbsNeedingForms in the course plan's plan.json). Each check reads the committed graph through the
// checker's own loader, form index and detectors, so a form passes only if the checker reads it as the right verb.
import test from 'node:test';
import assert from 'node:assert/strict';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadGraph } from '../load.mjs';
import { buildFormIndex, lookupToken, lookupTokenStrict } from '../fr/forms.mjs';
import { tokenize } from '../fr/tokenize.mjs';
import { matchPattern, detectConstructions } from '../detect.mjs';
import { validCefrSource } from '../levels-data.mjs';
import { readCourse } from '../fr/live-course.mjs';
import { runCheck } from '../check.mjs';
import { extractTeaches } from '../extract-teaches.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(here, '..', '..', '..');
const graph = loadGraph(join(repoRoot, 'curriculum-graph'), 'fr');
const index = buildFormIndex(graph);
const isWord = (f) => index.has(f) || graph.names.has(f);
const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

// The fourteen Getting things done words that were not in the graph: lemma, part of speech, gender for nouns.
const HEADWORDS = [
  ['plombier', 'noun', 'm'], ['serrurier', 'noun', 'm'], ['électricien', 'noun', 'm'], ['réparateur', 'noun', 'm'],
  ['propriétaire', 'noun', 'm/f'], ['panne', 'noun', 'f'], ['robinet', 'noun', 'm'], ['serrure', 'noun', 'f'],
  ['chauffage', 'noun', 'm'], ['devis', 'noun', 'm'], ['facture', 'noun', 'f'], ['dépanner', 'verb', null],
  ['disponible', 'adjective', null], ['pompier', 'noun', 'm'],
];

test('the Getting things done headwords are in the graph with a part of speech, gloss, gender and level', () => {
  for (const [lemma, pos, gender] of HEADWORDS) {
    const h = graph.headwords.find((x) => x.lemma === lemma && x.pos === pos);
    assert.ok(h, `${lemma} (${pos}) is a headword`);
    assert.ok(LEVELS.includes(h.cefr), `${lemma} has a level`);
    assert.ok(validCefrSource(h.cefrSource) && h.cefrSource.startsWith('team: '), `${lemma} has a team level source`);
    assert.ok(typeof h.senses?.[0]?.gloss === 'string' && h.senses[0].gloss.length > 0, `${lemma} has an English gloss`);
    if (gender) assert.equal(h.gender, gender, `${lemma} gender`);
    const [token] = tokenize(lemma, { isWord });
    assert.ok(lookupTokenStrict(index, token).some((r) => r.headwordId === h.id), `${lemma} reads as ${h.id}`);
  }
});

test('the plural of the new nouns and the forms of dépanner read as their headwords', () => {
  for (const [surface, id] of [['plombiers', 'fr:lex:plombier'], ['pannes', 'fr:lex:panne'], ['factures', 'fr:lex:facture'],
    ['pompiers', 'fr:lex:pompier'], ['disponibles', 'fr:lex:disponible'], ['dépanne', 'fr:lex:depanner'],
    ['dépannez', 'fr:lex:depanner'], ['dépanné', 'fr:lex:depanner']]) {
    const [token] = tokenize(surface, { isWord });
    assert.ok(lookupTokenStrict(index, token).some((r) => r.headwordId === id), `${surface} reads as ${id}`);
  }
});

const CHUNKS = [
  ['fr:cx:chunk.au-secours', ['Au secours !', 'Au secours, aidez-moi !'], ['Les secours arrivent.', 'Je vais au marché.']],
  ['fr:cx:chunk.pharmacie-de-garde', ['Où est la pharmacie de garde ?', 'Il y a deux pharmacies de garde ce soir.'],
    ['La pharmacie est fermée.', 'Le garde de la pharmacie.']],
];

test('au secours and pharmacie de garde are fixed phrases the checker finds in a sentence', () => {
  for (const [id, match, noMatch] of CHUNKS) {
    const c = graph.nodes.get(id);
    assert.ok(c, `${id} is in the graph`);
    assert.ok(LEVELS.includes(c.cefr) && validCefrSource(c.cefrSource), `${id} has a level and a source`);
    const read = (text) => {
      const tokens = tokenize(text, { isWord });
      return { tokens, readings: tokens.map((t) => lookupToken(index, t)) };
    };
    for (const s of match) {
      const { tokens, readings } = read(s);
      assert.ok(matchPattern(tokens, readings, c.detect, graph.names), `${id} should match: ${s}`);
      assert.ok(detectConstructions(tokens, readings, graph.constructions, graph.names).includes(id), `${id} detected in: ${s}`);
    }
    for (const s of noMatch) {
      const { tokens, readings } = read(s);
      assert.equal(matchPattern(tokens, readings, c.detect, graph.names), false, `${id} should not match: ${s}`);
    }
  }
});

// Present tense (je, tu, il, nous, vous, ils) and masculine past participle of the 86 verbs, written out by hand.
const VERBS = {
  accueillir: ['accueille accueilles accueille accueillons accueillez accueillent', 'accueilli'],
  admettre: ['admets admets admet admettons admettez admettent', 'admis'],
  adresser: ['adresse adresses adresse adressons adressez adressent', 'adressé'],
  apercevoir: ['aperçois aperçois aperçoit apercevons apercevez aperçoivent', 'aperçu'],
  apparaître: ['apparais apparais apparaît apparaissons apparaissez apparaissent', 'apparu'],
  appartenir: ['appartiens appartiens appartient appartenons appartenez appartiennent', 'appartenu'],
  appuyer: ['appuie appuies appuie appuyons appuyez appuient', 'appuyé'],
  atteindre: ['atteins atteins atteint atteignons atteignez atteignent', 'atteint'],
  avertir: ['avertis avertis avertit avertissons avertissez avertissent', 'averti'],
  battre: ['bats bats bat battons battez battent', 'battu'],
  causer: ['cause causes cause causons causez causent', 'causé'],
  conclure: ['conclus conclus conclut concluons concluez concluent', 'conclu'],
  conduire: ['conduis conduis conduit conduisons conduisez conduisent', 'conduit'],
  contenir: ['contiens contiens contient contenons contenez contiennent', 'contenu'],
  convaincre: ['convaincs convaincs convainc convainquons convainquez convainquent', 'convaincu'],
  convenir: ['conviens conviens convient convenons convenez conviennent', 'convenu'],
  couvrir: ['couvre couvres couvre couvrons couvrez couvrent', 'couvert'],
  craindre: ['crains crains craint craignons craignez craignent', 'craint'],
  cuire: ['cuis cuis cuit cuisons cuisez cuisent', 'cuit'],
  disparaître: ['disparais disparais disparaît disparaissons disparaissez disparaissent', 'disparu'],
  durer: ['dure dures dure durons durez durent', 'duré'],
  décevoir: ['déçois déçois déçoit décevons décevez déçoivent', 'déçu'],
  décrire: ['décris décris décrit décrivons décrivez décrivent', 'décrit'],
  détendre: ['détends détends détend détendons détendez détendent', 'détendu'],
  détruire: ['détruis détruis détruit détruisons détruisez détruisent', 'détruit'],
  endormir: ['endors endors endort endormons endormez endorment', 'endormi'],
  enfuir: ['enfuis enfuis enfuit enfuyons enfuyez enfuient', 'enfui'],
  ennuyer: ['ennuie ennuies ennuie ennuyons ennuyez ennuient', 'ennuyé'],
  envoyer: ['envoie envoies envoie envoyons envoyez envoient', 'envoyé'],
  fuir: ['fuis fuis fuit fuyons fuyez fuient', 'fui'],
  fêter: ['fête fêtes fête fêtons fêtez fêtent', 'fêté'],
  garder: ['garde gardes garde gardons gardez gardent', 'gardé'],
  garer: ['gare gares gare garons garez garent', 'garé'],
  haïr: ['hais hais hait haïssons haïssez haïssent', 'haï'],
  inscrire: ['inscris inscris inscrit inscrivons inscrivez inscrivent', 'inscrit'],
  interdire: ['interdis interdis interdit interdisons interdisez interdisent', 'interdit'],
  interrompre: ['interromps interromps interrompt interrompons interrompez interrompent', 'interrompu'],
  intervenir: ['interviens interviens intervient intervenons intervenez interviennent', 'intervenu'],
  joindre: ['joins joins joint joignons joignez joignent', 'joint'],
  marier: ['marie maries marie marions mariez marient', 'marié'],
  mentir: ['mens mens ment mentons mentez mentent', 'menti'],
  mordre: ['mords mords mord mordons mordez mordent', 'mordu'],
  neiger: ['neige neiges neige neigeons neigez neigent', 'neigé'],
  obtenir: ['obtiens obtiens obtient obtenons obtenez obtiennent', 'obtenu'],
  occuper: ['occupe occupes occupe occupons occupez occupent', 'occupé'],
  offrir: ['offre offres offre offrons offrez offrent', 'offert'],
  paraître: ['parais parais paraît paraissons paraissez paraissent', 'paru'],
  peindre: ['peins peins peint peignons peignez peignent', 'peint'],
  placer: ['place places place plaçons placez placent', 'placé'],
  plaindre: ['plains plains plaint plaignons plaignez plaignent', 'plaint'],
  planter: ['plante plantes plante plantons plantez plantent', 'planté'],
  porter: ['porte portes porte portons portez portent', 'porté'],
  poursuivre: ['poursuis poursuis poursuit poursuivons poursuivez poursuivent', 'poursuivi'],
  produire: ['produis produis produit produisons produisez produisent', 'produit'],
  promettre: ['promets promets promet promettons promettez promettent', 'promis'],
  prétendre: ['prétends prétends prétend prétendons prétendez prétendent', 'prétendu'],
  prévenir: ['préviens préviens prévient prévenons prévenez préviennent', 'prévenu'],
  prévoir: ['prévois prévois prévoit prévoyons prévoyez prévoient', 'prévu'],
  prêter: ['prête prêtes prête prêtons prêtez prêtent', 'prêté'],
  recevoir: ['reçois reçois reçoit recevons recevez reçoivent', 'reçu'],
  reconnaître: ['reconnais reconnais reconnaît reconnaissons reconnaissez reconnaissent', 'reconnu'],
  refaire: ['refais refais refait refaisons refaites refont', 'refait'],
  rejoindre: ['rejoins rejoins rejoint rejoignons rejoignez rejoignent', 'rejoint'],
  remettre: ['remets remets remet remettons remettez remettent', 'remis'],
  renvoyer: ['renvoie renvoies renvoie renvoyons renvoyez renvoient', 'renvoyé'],
  repartir: ['repars repars repart repartons repartez repartent', 'reparti'],
  reprendre: ['reprends reprends reprend reprenons reprenez reprennent', 'repris'],
  ressentir: ['ressens ressens ressent ressentons ressentez ressentent', 'ressenti'],
  retenir: ['retiens retiens retient retenons retenez retiennent', 'retenu'],
  rire: ['ris ris rit rions riez rient', 'ri'],
  rompre: ['romps romps rompt rompons rompez rompent', 'rompu'],
  réagir: ['réagis réagis réagit réagissons réagissez réagissent', 'réagi'],
  réduire: ['réduis réduis réduit réduisons réduisez réduisent', 'réduit'],
  résoudre: ['résous résous résout résolvons résolvez résolvent', 'résolu'],
  servir: ['sers sers sert servons servez servent', 'servi'],
  souffrir: ['souffre souffres souffre souffrons souffrez souffrent', 'souffert'],
  suffire: ['suffis suffis suffit suffisons suffisez suffisent', 'suffi'],
  survivre: ['survis survis survit survivons survivez survivent', 'survécu'],
  taire: ['tais tais tait taisons taisez taisent', null], // tu, tue, tus, tues: see the test below
  tenir: ['tiens tiens tient tenons tenez tiennent', 'tenu'],
  traduire: ['traduis traduis traduit traduisons traduisez traduisent', 'traduit'],
  transmettre: ['transmets transmets transmet transmettons transmettez transmettent', 'transmis'],
  téléphoner: ['téléphone téléphones téléphone téléphonons téléphonez téléphonent', 'téléphoné'],
  valoir: ['vaux vaux vaut valons valez valent', 'valu'],
  écrire: ['écris écris écrit écrivons écrivez écrivent', 'écrit'],
  éteindre: ['éteins éteins éteint éteignons éteignez éteignent', 'éteint'],
};

// Six more verbs that had no present tense; the plan does not list them yet.
const MORE_VERBS = {
  mourir: ['meurs meurs meurt mourons mourez meurent', 'mort'],
  sentir: ['sens sens sent sentons sentez sentent', 'senti'],
  cueillir: ['cueille cueilles cueille cueillons cueillez cueillent', 'cueilli'],
  employer: ['emploie emploies emploie employons employez emploient', 'employé'],
  essuyer: ['essuie essuies essuie essuyons essuyez essuient', 'essuyé'],
  parcourir: ['parcours parcours parcourt parcourons parcourez parcourent', 'parcouru'],
};

// The -er verbs whose present is spelled like a noun, adjective or name already in the graph (la porte, la garde,
// Marie). Their forms stay out of the graph (reading-limits.json) until the checker can tell the two apart. neiger
// left the list: it is impersonal (il neige), and a vocabulary entry reads the noun after an article (la neige).
const READING_LIMITED = new Set(['adresser', 'causer', 'durer', 'fêter', 'garder', 'garer', 'marier', 'occuper',
  'placer', 'planter', 'porter', 'prêter', 'téléphoner']);

const PERSONS = [['je', '1sg'], ['tu', '2sg'], ['il', '3sg'], ['nous', '1pl'], ['vous', '2pl'], ['ils', '3pl']];
// je elides before a vowel or a mute h; haïr starts with an aspirated h.
const subject = (pronoun, form) => (pronoun === 'je' && /^[aeiouyàâéèêëîïôûh]/i.test(form) && !/^h/i.test(form) ? `j'${form}` : `${pronoun} ${form}`);

const headwordOf = (lemma) => {
  const h = graph.headwords.find((x) => x.pos === 'verb' && x.lemma === lemma);
  assert.ok(h, `${lemma} is a verb headword`);
  return h;
};

// The readings of the last word of a text, read the way the checker reads French the learner types.
const lastReadings = (text) => {
  const tokens = tokenize(text, { isWord });
  return lookupTokenStrict(index, tokens[tokens.length - 1]);
};

test('the plan lists 86 verbs, 13 of them reading-limited', () => {
  assert.equal(Object.keys(VERBS).length, 86);
  for (const lemma of READING_LIMITED) {
    assert.ok(VERBS[lemma], lemma);
    const limit = graph.readingLimits.find((r) => r.id === headwordOf(lemma).id);
    assert.ok(limit?.cells.includes('prs'), `${lemma} is in reading-limits.json with its present`);
  }
});

for (const [lemma, [present, participle]] of Object.entries({ ...VERBS, ...MORE_VERBS })) {
  const todo = READING_LIMITED.has(lemma) ? 'spelled like a noun or name; needs a checker change (reading-limits.json)' : undefined;
  test(`${lemma}: the six present forms and the past participle read as ${lemma}`, { todo }, () => {
    const h = headwordOf(lemma);
    const forms = present.split(' ');
    assert.equal(forms.length, 6);
    PERSONS.forEach(([pronoun, person], i) => {
      const text = subject(pronoun, forms[i]);
      const readings = lastReadings(text);
      assert.ok(readings.some((r) => r.headwordId === h.id && r.cell === `prs.${person}`),
        `${text} reads as ${h.id} prs.${person}; got ${JSON.stringify(readings.map((r) => `${r.headwordId} ${r.cell}`))}`);
    });
    if (participle === null) return;
    const readings = lastReadings(`j'ai ${participle}`);
    assert.ok(readings.some((r) => r.headwordId === h.id && r.cell === 'ptcp'),
      `${participle} reads as the past participle of ${h.id}; got ${JSON.stringify(readings.map((r) => `${r.headwordId} ${r.cell}`))}`);
  });
}

test('the participle tu of taire stays out, so the pronoun tu and as-tu never read as a passé composé', () => {
  const taire = headwordOf('taire');
  assert.ok(graph.readingLimits.find((r) => r.id === taire.id)?.cells.includes('ptcp'), 'taire is in reading-limits.json with its participle');
  for (const s of ['tu', 'tue', 'tus', 'tues']) assert.ok(!lastReadings(`il a ${s}`).some((r) => r.headwordId === taire.id), `${s} does not read as taire`);
  const pc = graph.nodes.get('fr:cx:passe-compose.avoir');
  const tokens = tokenize('As-tu un chat ?', { isWord });
  assert.equal(matchPattern(tokens, tokens.map((t) => lookupToken(index, t)), pc.detect, graph.names), false);
});

test('extraction of the possessive pronouns table credits le tien, not tenir, today and in the content layer', async () => {
  const key = '2024-02-01-possessive-pronouns';
  const course = await readCourse(repoRoot);
  const { courseMap } = extractTeaches(graph, course, index);
  const taught = courseMap[key].teachesWords;
  assert.ok(taught.includes('fr:form:tien.f'), 'la tienne is credited to le tien');
  for (const id of ['fr:lex:tenir', 'fr:form:tenir.sbjv.1sg', 'fr:form:tenir.sbjv.3sg']) assert.ok(!taught.includes(id), `${id} is not credited`);
  // the checker derives the same words from the module file
  const { ctx } = await runCheck({ repoRoot, lang: 'fr' });
  assert.deepEqual([...taught].sort(), [...ctx.graph.courseMap[key].teachesWords].sort());
});

const detected = (text) => {
  const tokens = tokenize(text, { isWord });
  return detectConstructions(tokens, tokens.map((t) => lookupToken(index, t)), graph.constructions, graph.names);
};

test('the participle of an être verb after être reads as passé composé with être, not passive', () => {
  for (const s of ['Il est apparu.', 'Elle est apparue.', 'Elle est intervenue.', 'Ils sont intervenus.', 'Il est mort.', 'Elle est repartie.']) {
    const cx = detected(s);
    assert.ok(cx.includes('fr:cx:passe-compose.etre'), `${s} reads as passe-compose.etre`);
    assert.ok(!cx.includes('fr:cx:passive'), `${s} does not read as passive`);
  }
});

test('participles used as everyday adjectives after être do not read as passive', () => {
  for (const s of ['Je suis convaincu.', 'Il est endormi.', 'Je suis inscrite.', 'Je suis détendu.', 'La lumière est éteinte.',
    'C\'est interdit.', 'Le ciel est couvert.', 'C\'est prévu.', 'Le problème est résolu.', 'Mon chat est disparu.', 'Je suis employé dans une banque.']) {
    assert.ok(!detected(s).includes('fr:cx:passive'), `${s} does not read as passive`);
  }
  // a real passive with a new verb still reads as passive
  assert.ok(detected('La lettre est écrite par Marie.').includes('fr:cx:passive'));
});

test('mentir and réagir have one participle, as verbs that never agree', () => {
  for (const s of ['mentie', 'menties', 'réagie', 'réagies']) {
    assert.ok(!lastReadings(`il a ${s}`).some((r) => r.cell?.startsWith('ptcp')), `${s} is not a participle`);
  }
});
