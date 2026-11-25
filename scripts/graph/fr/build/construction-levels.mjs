// CEFR level of every French construction and how it was decided (the cefrSource values are listed in
// scripts/graph/levels-data.mjs). constructions.mjs reads this table when it writes constructions.json, so change a
// level here, not in the JSON file. Eaquals grammar: the level where the Eaquals core inventory for French (2015) lists
// the point as key. Judgment: our own call where the inventory says nothing direct, mostly fixed phrases (placed
// where a learner needs them, which can be before the grammar inside them) and patterns the inventory folds into a
// larger item. The conditionnel présent is A2: the inventory lists it for politeness at A1 and A2 and in full at B1,
// and a learner needs voudrais, pourrais and devrais before B1; the si + imparfait hypothesis carries the B1 use.
const EG = 'agent: Eaquals grammar';
const JD = 'agent: judgment';
const levels = (level, source, keys) => keys.split(/\s+/).filter(Boolean).map((k) => [k, { cefr: level, cefrSource: source }]);
export const LEVELS = new Map([
  ...levels('A1', EG, `adj.agreement adj.placement article.definite article.indefinite article.partitive cest contraction.a
    contraction.de demonstrative.adjective frame.aller-infinitive frame.etre-en-train-de frame.il-faut-infinitive
    frame.modal-infinitive frame.savoir-infinitive il-y-a imperative.tu imperative.vous neg.ne-pas neg.ne-jamais neg.de
    noun.gender passe-compose.avoir passe-compose.etre possessive.adjective pronoun.on pronoun.reflexive pronoun.stressed
    pronoun.subject pronoun.tu-vous q.est-ce-que q.intonation q.quest-ce-que q.words chunk.quest-ce-que-cest
    chunk.je-voudrais chunk.parce-que`),
  ...levels('A1', JD, `age.avoir-ans elision frame.aimer-infinitive q.inversion chunk.au-revoir chunk.ca-va
    chunk.comment-ca-va chunk.excusez-moi chunk.sil-vous-plait chunk.sil-te-plait chunk.je-ne-sais-pas chunk.bien-sur
    chunk.cest-ca chunk.quelque-chose chunk.on-y-va`),
  ...levels('A2', EG, `comparative comparative.irregular superlative futur-simple imparfait imperative.nous
    imperative.irregular neg.ne-plus neg.ne-rien neg.ne-personne ptcp.agreement pronoun.direct-object
    pronoun.indirect-object pronoun.en pronoun.y possessive.pronoun relative.qui relative.que relative.ou si.present
    subj.il-faut-que frame.apprendre-a-infinitive frame.demander-de-infinitive chunk.a-cause-de chunk.tout-le-monde
    chunk.de-temps-en-temps`),
  ...levels('A2', JD, `conditionnel-present adverb.placement imperative.pronouns passe-compose.reflexive
    frame.verb-que-clause frame.avoir-besoin-de reciprocal q.quest-ce-qui q.qui-est-ce-que q.qui-est-ce-qui chunk.allons-y
    chunk.vas-y chunk.quelque-part chunk.en-fait chunk.pendant-que chunk.tout-a-coup chunk.nest-ce-pas chunk.au-secours
    chunk.pharmacie-de-garde`),
  ...levels('B1', EG, `si.imparfait-conditionnel plus-que-parfait.avoir plus-que-parfait.etre subj.emotion-que
    subj.vouloir-que subj.ne-pas-penser-que subj.possible-que subj.douter-que subj.pour-que subj.bien-que subj.avant-que
    passive gerondif relative.dont relative.ce-que q.embedded chunk.grace-a`),
  ...levels('B1', JD, `neg.ne-pas-infinitive causative.faire rendre-adjective q.negative-inversion chunk.cest-a-dire`),
  ...levels('B2', EG, `conditionnel-passe.avoir conditionnel-passe.etre si.plus-que-parfait-conditionnel-passe
    futur-anterieur chunk.nulle-part`),
]);
// { cefr, cefrSource } for a construction key (the ID without fr:cx:).
export function levelOf(key, levels = LEVELS) {
  if (!levels.has(key)) throw new Error(`construction-levels.mjs: no CEFR level for fr:cx:${key}; add it to LEVELS`);
  return levels.get(key);
}

// Throws when a construction ID has no level, or when the table names a construction that does not exist.
export function checkLevels(ids, levels = LEVELS) {
  for (const id of ids) levelOf(id.replace(/^fr:cx:/, ''), levels);
  const known = new Set(ids.map((id) => id.replace(/^fr:cx:/, '')));
  const unused = [...levels.keys()].filter((k) => !known.has(k));
  if (unused.length) throw new Error(`construction-levels.mjs: LEVELS names constructions that do not exist: ${unused.join(', ')}`);
}
