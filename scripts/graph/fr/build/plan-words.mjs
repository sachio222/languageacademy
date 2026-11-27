// Adds the everyday words the plan for Units 13 to 29 teaches that the word list lacked, so each planned lesson can
// name the words it teaches. Each word gets its level, part of speech, an English gloss and, for a noun, its gender.
// Paradigms follow the existing entries of the same kind, and dictionaryId is the app dictionary key when
// src/data/dictionary/words/cambridge/ has one. Verbs also get the irregular forms their paradigms do not build:
// spelling changes of -er verbs (pèse, sèche, tutoie, corrigeons) and every cell of défaire, copied from
// faire. Two nouns get a plural no pattern builds (beaux-pères, belles-mères).
// The words came from the unit plans (Units 13 to 29), which list each word under the lesson that teaches it: words
// below B2 that the earlier passes left out (discussion, possibilité, concerner, peser, loisir, gratuit, récent,
// logement, horaire, imprimante, tutoyer and the like), and four feminine nouns the lessons teach beside their
// masculines, as the list already keeps ami and amie apart: voisine, copine, vendeuse, cousine, comédienne, pharmacienne and spectatrice. The lists below are
// in alphabetical order and record no frequency value or rank. Every level here is a judgment made by hand: a
// feminine noun takes the level of its masculine.
// Four words of the plan were already in the list from the B2 pass and are not repeated here: candidature, chantier,
// locataire and tribunal.
// tache (a stain) differs from tâche (a task) only by its accent, and tâche holds the ID fr:lex:tache, so tache takes
// fr:lex:tache.stain (see IDS), as répartir took fr:lex:repartir.distribute.
// Some of these words are spelled like a form of another word. In running text the checker counts such a word as
// known when either reading is taught; a lesson whose vocabulary table lists one of them may credit the other
// reading, and then needs that reading's ID in its excludeWords correction (see the README):
// - new words spelled like a form of an older word: bavarde and bavardes (bavard, and bavarder), inventions
//   (invention, and inventer), versions (version, and verser), concernant (concerner, and the preposition), défaite
//   and défaites (défaire, and the noun défaite), photographie and photographies (photographier, and the noun),
//   vote and votes (voter, and the noun vote), tache and taches (tâche, once accents are set aside);
// - new words that pair with each other: envie and envier (envie, envies), mélange and mélanger (mélange, mélanges);
// - words spelled as in English, or with a form spelled as an English word that course labels use: blog, caution,
//   continent, dialogue, discussion, excursion, exposition, festival, invention, invisible, invitation, milliard,
//   mode, probable, rage, site, version, visa, visible, and the feminines active, immédiate and négative. An English
//   label made only of such words would be read as French by the converter in scripts/content/migrate. One was: the
//   note "presentation" in Reading 4, which folds to présentation. presentation is now in ENGLISH_ONLY in
//   french-text.mjs, since French never writes it without the accent.
// Left out, though the plan teaches them in Unit 27: compléter, modifier and profession. With them in the list the
// converter marks three English notes as French: "complete direction instruction" in the directions lesson (complete
// folds to complète), "modifier" in Reading 7 and "profession" in Reading 8. ENGLISH_ONLY cannot hold these words:
// French and English spell modifier and profession alike, and cues such as "Complete: Je ___ voir
// Mont-Saint-Michel" mix complete with French that must still be read. Add the three words here once those notes
// are reworded.
// Source of truth: headwords.json and forms.json. Entries already present are skipped, so running it again changes
// nothing; add or change words by editing the JSON files.
// Usage: node scripts/graph/fr/build/plan-words.mjs   (run after add-words.mjs, core-words.mjs and b2-words.mjs)
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { writeSortedJson } from '../../write-json.mjs';
import { fold } from '../../fold.mjs';
import { FR_DIR as DIR, REPO } from './lib.mjs';

const SOURCE = 'agent: judgment';

// level -> pos -> one entry per line: "lemma [gender]: gloss". A noun's gender is m, f or m/f (one form for both).
const WORDS = {
  A1: {
    noun: `
      copine f: friend (female); girlfriend
      cousine f: cousin (female)
      enveloppe f: envelope
      envie f: wish, desire (avoir envie de: to feel like)
      nationalité f: nationality
      vendeuse f: saleswoman, shop assistant`,
  },
  A2: {
    noun: `
      accueil m: welcome; reception desk
      achat m: purchase
      architecte m/f: architect
      beau-père m: father-in-law; stepfather
      belle-mère f: mother-in-law; stepmother
      blog m: blog
      clavier m: keyboard
      colis m: parcel
      comédien m: actor (not comedian)
      comédienne f: actress (not comedian)
      comptable m/f: accountant
      continent m: continent
      dialogue m: dialogue
      diplôme m: diploma, degree
      discussion f: discussion, talk
      douane f: customs
      électricité f: electricity
      embouteillage m: traffic jam
      étiquette f: label, tag
      évier m: kitchen sink
      excursion f: trip, outing
      exposition f: exhibition
      festival m: festival
      formulaire m: form (to fill in)
      horaire m: timetable; working hours
      imprimante f: printer
      ingrédient m: ingredient
      inscription f: enrolment, registration
      invitation f: invitation
      itinéraire m: route, itinerary
      lessive f: washing, laundry; washing powder
      logement m: housing, accommodation
      loisir m: leisure; leisure activity
      loyer m: rent
      mode f: fashion
      passe-temps m: hobby, pastime
      pharmacien m: pharmacist, chemist
      pharmacienne f: pharmacist, chemist (female)
      photographe m/f: photographer
      poème m: poem
      possibilité f: possibility
      pourboire m: tip (for service)
      présentation f: presentation; introduction
      publicité f: advertising; advertisement
      réservation f: booking, reservation
      site m: site; website
      spécialité f: speciality
      tablette f: tablet; bar (of chocolate)
      tache f: stain, mark
      tarif m: price, rate
      tempête f: storm
      tourisme m: tourism
      toux f: cough
      trajet m: journey, trip
      vaisselle f: dishes; washing-up
      visa m: visa
      vitamine f: vitamin
      voisine f: neighbour (female)`,
    verb: `
      applaudir: to applaud, clap
      corriger: to correct
      découper: to cut up, cut out
      imprimer: to print
      mélanger: to mix
      peser: to weigh
      photographier: to photograph
      saluer: to greet, say hello to
      sécher: to dry
      tutoyer: to say "tu" to
      vouvoyer: to say "vous" to`,
    adjective: `
      bavard: talkative, chatty
      bruyant: noisy
      célibataire: single, unmarried
      confortable: comfortable
      désagréable: unpleasant
      gourmand: fond of good food
      gratuit: free (of charge)
      pareil: the same, alike
      poli: polite
      récent: recent
      romantique: romantic
      scolaire: school (year, holidays)
      sportif: sporty, athletic; sports
      sympathique: nice, friendly
      touristique: tourist, popular with tourists`,
    adverb: `
      calmement: calmly
      correctement: correctly, properly
      énormément: a great deal, enormously
      gentiment: kindly, nicely
      habituellement: usually
      normalement: normally, usually
      récemment: recently`,
  },
  B1: {
    noun: `
      ambiance f: atmosphere, mood
      banlieue f: suburbs, outskirts
      caution f: deposit (on a rented flat); guarantor
      commentaire m: comment, remark
      épisode m: episode
      galerie f: gallery
      honneur m: honour
      humour m: humour
      invention f: invention
      laboratoire m: laboratory
      médecine f: medicine (the science)
      mélange m: mixture, mix
      milliard m: billion
      politesse f: politeness
      rage f: rage, fury; rabies
      réussite f: success
      spectateur m: spectator, member of the audience
      spectatrice f: spectator, member of the audience (female)
      thème m: theme, topic
      tuyau m: pipe, hose
      version f: version`,
    verb: `
      améliorer: to improve
      concerner: to concern, be about
      consoler: to comfort, console
      défaire: to undo; to unpack
      envier: to envy
      rédiger: to write, draft
      supprimer: to delete, remove
      vexer: to upset, offend
      voter: to vote`,
    adjective: `
      actif: active
      actuel: current, present
      extérieur: outside, outer
      immédiat: immediate
      insupportable: unbearable
      invisible: invisible
      négatif: negative
      probable: likely, probable
      profond: deep
      visible: visible`,
    adverb: `
      clairement: clearly
      difficilement: with difficulty
      effectivement: indeed, that's right
      extrêmement: extremely
      personnellement: personally
      pratiquement: practically, almost
      précisément: precisely, exactly
      quotidiennement: daily, every day
      sincèrement: sincerely
      spécialement: specially, especially`,
  },
};

const ER = ['fr:cx:verb.er.present', 'fr:cx:ptcp.er', 'fr:cx:verb.er.impf', 'fr:cx:verb.future',
  'fr:cx:verb.conditional', 'fr:cx:verb.er.subjunctive', 'fr:cx:prsptcp.er'];
const IR = ['fr:cx:verb.ir.present', 'fr:cx:ptcp.ir', 'fr:cx:verb.ir.impf', 'fr:cx:verb.future',
  'fr:cx:verb.conditional', 'fr:cx:verb.ir.subjunctive', 'fr:cx:prsptcp.ir'];
const set = (s) => new Set(s.split(/\s+/).filter(Boolean));

// Regular -ir verbs like finir.
const IR_VERBS = set(`applaudir`);

// Irregular verbs conjugated like a verb already in the list: lemma -> [model, start of the model's spelling,
// what replaces it]. Every cell is copied from the model with that start replaced: défaire takes faire's forms
// (fais -> défais, fait -> défait, font -> défont).
const LIKE = {
  'défaire': ['faire', '', 'dé'],
};

// Nouns whose plural no pattern builds. A noun ending in s, x or z takes no plural pattern (colis, toux,
// passe-temps).
const NOUN_PL = {
  'beau-père': 'beaux-pères',
  'belle-mère': 'belles-mères',
};
// Nouns in -al whose plural takes -s (festivals).
const NOUN_REGULAR = set(`festival`);
// Adjectives that double the final consonant in the feminine and that the endings below do not catch (pareille).
const ADJ_DOUBLE = set(`pareil`);

function verbParadigms(lemma) {
  if (IR_VERBS.has(lemma)) return IR;
  if (lemma.endsWith('er')) return ER;
  throw new Error(`plan-words: ${lemma} needs a class (IR_VERBS or LIKE)`);
}

function paradigms(lemma, pos) {
  if (pos === 'noun') {
    if (NOUN_PL[lemma] || /[sxz]$/.test(lemma)) return [];
    if (NOUN_REGULAR.has(lemma)) return ['fr:cx:noun.plural'];
    if (/(eau|au|eu)$/.test(lemma)) return ['fr:cx:noun.plural.x'];
    if (/al$/.test(lemma)) return ['fr:cx:noun.plural.al'];
    return ['fr:cx:noun.plural'];
  }
  if (pos === 'adjective') {
    if (ADJ_DOUBLE.has(lemma)) return ['fr:cx:adj.double'];
    if (/e$/.test(lemma)) return ['fr:cx:adj.e'];
    if (/al$/.test(lemma)) return ['fr:cx:adj.al'];
    if (/eux$/.test(lemma)) return ['fr:cx:adj.eux'];
    if (/[iï]f$/.test(lemma)) return ['fr:cx:adj.if'];
    if (/er$/.test(lemma)) return ['fr:cx:adj.er'];
    if (/s$/.test(lemma)) return ['fr:cx:adj.s'];
    if (/(el|en|on|et)$/.test(lemma)) return ['fr:cx:adj.double'];
    return ['fr:cx:adj.regular'];
  }
  return [];
}

// Spelling changes the plain -er patterns miss, written as irregular forms as core-words.mjs and b2-words.mjs do:
// -ger verbs keep a soft g before a and o (corrigeons, mélangeait); -yer verbs write i before a silent e (tutoie,
// tutoiera); e + consonant + er verbs take è there (pèse, pèsera); é + consonants + er verbs take è in the singular
// and third plural of the present and subjunctive (sèche). x is left out of the consonants, since e before
// x takes no accent (je vexe).
const SILENT_E = /^(prs|sbjv)\.(1sg|2sg|3sg|3pl)$|^(fut|cond)\./;
const SILENT_E_PRESENT = /^(prs|sbjv)\.(1sg|2sg|3sg|3pl)$/;
function spell(lemma, cell, regular) {
  let base = lemma.slice(0, -2);
  const ending = regular.slice(base.length);
  if (/^[ao]/.test(ending) && base.endsWith('g')) base += 'e';
  else if (/^[ao]/.test(ending) && base.endsWith('c')) base = `${base.slice(0, -1)}ç`;
  if (SILENT_E.test(cell)) {
    if (base.endsWith('y')) base = `${base.slice(0, -1)}i`;
    else if (/e[bcdfghjklmnpqrstvwz]$/.test(base)) base = base.replace(/e([bcdfghjklmnpqrstvwz])$/, 'è$1');
  }
  if (SILENT_E_PRESENT.test(cell) && /é[^aeiouyàâäéèêëîïôöùûü]+u?$/.test(base)) base = base.replace(/é([^aeiouyàâäéèêëîïôöùûü]+u?)$/, 'è$1');
  return base + ending;
}

// A word whose plain ID belongs to a word of the same part of speech spelled the same without accents: the ID adds a
// word for the meaning.
const IDS = { tache: 'fr:lex:tache.stain' };

const ENTRY = /^(\S+?)(?: (m|f|m\/f))?: (.+)$/;
const collator = new Intl.Collator('fr');
function entries(text, where) {
  const list = text.split('\n').map((s) => s.trim()).filter(Boolean).map((line) => {
    const m = ENTRY.exec(line);
    if (!m) throw new Error(`plan-words: cannot read "${line}" (${where})`);
    return { lemma: m[1], gender: m[2] ?? null, gloss: m[3] };
  });
  list.forEach((e, i) => {
    if (i > 0 && collator.compare(list[i - 1].lemma, e.lemma) >= 0) {
      throw new Error(`plan-words: ${where} is not in alphabetical order at ${e.lemma}`);
    }
    if (where.endsWith('noun') !== Boolean(e.gender)) throw new Error(`plan-words: ${e.lemma} (${where}): a noun, and only a noun, takes a gender`);
  });
  return list;
}

// Keys of the app dictionary (live files only, not backups).
const dictDir = join(REPO, 'src/data/dictionary/words/cambridge');
const dictionary = new Set();
for (const f of readdirSync(dictDir).filter((n) => n.endsWith('.js'))) {
  for (const m of readFileSync(join(dictDir, f), 'utf8').matchAll(/id: "([^"]+)"/g)) dictionary.add(m[1]);
}

const paradigmRules = new Map(JSON.parse(readFileSync(join(DIR, 'paradigms.json'), 'utf8')).map((p) => [p.id, p.rules]));
const headwords = JSON.parse(readFileSync(join(DIR, 'headwords.json'), 'utf8'));
const forms = JSON.parse(readFileSync(join(DIR, 'forms.json'), 'utf8'));
const byId = new Map(headwords.map((h) => [h.id, h]));
const formIds = new Set(forms.map((f) => f.id));
const keyOf = (lemma) => fold(lemma).replace(/[\s']+/g, '-');
const regularOf = (lemma, pids, cell) => {
  for (const pid of pids) {
    for (const rule of paradigmRules.get(pid) ?? []) {
      if (rule.cell === cell && lemma.endsWith(rule.strip)) return lemma.slice(0, lemma.length - rule.strip.length) + rule.add;
    }
  }
  return null;
};

// A verb's paradigms and the irregular cells it needs on top of them.
function verbShape(lemma) {
  if (LIKE[lemma]) {
    const [model, from, to] = LIKE[lemma];
    if (!model.startsWith(from) || to + model.slice(from.length) !== lemma) throw new Error(`plan-words: ${lemma} is not ${model} with ${from} -> ${to}`);
    const m = headwords.find((x) => x.lemma === model && x.pos === 'verb');
    if (!m) throw new Error(`plan-words: model verb ${model} is not in the word list`);
    return { pids: [...m.paradigms], cells: forms.filter((f) => f.of === m.id).map((f) => [f.cell, to + f.surface.slice(from.length)]) };
  }
  const pids = verbParadigms(lemma);
  const cells = [];
  if (pids === ER) {
    for (const pid of pids) {
      for (const rule of paradigmRules.get(pid)) {
        const regular = lemma.slice(0, -2) + rule.add;
        const surface = spell(lemma, rule.cell, regular);
        if (surface !== regular) cells.push([rule.cell, surface]);
      }
    }
  }
  return { pids, cells };
}

const collected = { headwords: 0, forms: 0 };
const listed = new Set();
const plan = [];
for (const [level, groups] of Object.entries(WORDS)) {
  for (const [pos, text] of Object.entries(groups)) {
    for (const e of entries(text, `${level} ${pos}`)) {
      if (listed.has(`${e.lemma}|${pos}`)) throw new Error(`plan-words: ${e.lemma} (${pos}) is listed twice`);
      listed.add(`${e.lemma}|${pos}`);
      plan.push({ ...e, level, pos });
    }
  }
}
for (const key of [...Object.keys(LIKE), ...IR_VERBS]) {
  if (!listed.has(`${key}|verb`)) throw new Error(`plan-words: ${key} has a verb class but is not a listed verb`);
}
for (const key of ADJ_DOUBLE) {
  if (!listed.has(`${key}|adjective`)) throw new Error(`plan-words: ${key} has adjective forms but is not a listed adjective`);
}
for (const key of [...Object.keys(NOUN_PL), ...NOUN_REGULAR, ...Object.keys(IDS)]) {
  if (!listed.has(`${key}|noun`)) throw new Error(`plan-words: ${key} has noun forms or an ID but is not a listed noun`);
}

for (const e of plan) {
  if (headwords.some((h) => h.lemma === e.lemma && h.pos === e.pos)) continue; // already in the word list
  const id = IDS[e.lemma] ?? `fr:lex:${keyOf(e.lemma)}`;
  if (byId.has(id)) throw new Error(`plan-words: ${e.lemma} needs its own ID in IDS: ${id} is ${byId.get(id).lemma}`);
  let shape = { pids: paradigms(e.lemma, e.pos), cells: [] };
  if (e.pos === 'verb') shape = verbShape(e.lemma);
  if (e.pos === 'noun' && NOUN_PL[e.lemma]) shape.cells = [['pl', NOUN_PL[e.lemma]]];
  const h = {
    cefr: e.level,
    cefrSource: SOURCE,
    dictionaryId: dictionary.has(`${e.lemma}-fr`) ? `${e.lemma}-fr` : null,
    ...(e.gender ? { gender: e.gender } : {}),
    id,
    lemma: e.lemma,
    paradigms: shape.pids,
    pos: e.pos,
    senses: [{ gloss: e.gloss }],
  };
  headwords.push(h);
  byId.set(id, h);
  collected.headwords += 1;
  const key = id.slice('fr:lex:'.length);
  for (const [cell, surface] of shape.cells) {
    const fid = `fr:form:${key}.${cell}`;
    if (formIds.has(fid)) continue;
    if (regularOf(e.lemma, shape.pids, cell) === surface) continue; // the paradigm already builds it
    forms.push({ cell, id: fid, of: id, surface });
    formIds.add(fid);
    collected.forms += 1;
  }
}

const byIdOrder = (a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0);
writeSortedJson(join(DIR, 'headwords.json'), headwords.sort(byIdOrder));
writeSortedJson(join(DIR, 'forms.json'), forms.sort(byIdOrder));
console.log(`plan-words: ${collected.headwords} headwords and ${collected.forms} irregular forms added`);
