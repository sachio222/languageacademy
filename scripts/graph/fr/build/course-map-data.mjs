// Course-map decisions for the French course, keyed by course position, with the reason for each.
// Read by course-map.mjs.
// Construction IDs are written without the fr:cx: prefix.

// teachesConstructions: what each lesson's concept cards explain (and, for fixed phrases,
// what its vocabulary table lists as an entry). Reminder cards ("same pattern as parler",
// "Remember the gender", "Composition Power" lines that only combine taught verbs) do not count.
export const TEACH = {
  1: ['chunk.au-revoir', 'chunk.sil-vous-plait'], // Essential Greetings & Politeness card; both phrases are vocab entries
  2: ['pronoun.subject', 'pronoun.tu-vous', 'pronoun.on'],
  4: ['elision', 'age.avoir-ans'], // Elision with First Person; Common Uses: age "I have 20 years"
  5: ['article.indefinite', 'article.definite', 'noun.gender'],
  7: ['noun.gender'], // Noun Gender - Critical Concept!
  8: ['noun.plural', 'article.definite', 'article.indefinite'], // Basic Plural Rule; Plural Articles les / des
  14: ['demonstrative.adjective'],
  15: ['cest', 'chunk.cest-ca', 'chunk.ca-va'], // c'est ça; Building Blocks c'est + ça
  16: ['demonstrative.adjective'], // Functional Composition ce(livre)
  17: ['frame.modal-infinitive'], // vouloir + infinitive (nous voulons avoir une maison)
  18: ['frame.modal-infinitive'], // pouvoir + infinitive (je peux avoir ça)
  20: ['q.est-ce-que', 'q.intonation', 'q.inversion', 'q.words', 'q.quest-ce-que',
    'chunk.quest-ce-que-cest', 'chunk.comment-ca-va', 'chunk.ca-va'],
  // Help modules carry no concept cards; their pages are React components. QuestionsHelp (21) explains the three
  // question methods; LiaisonHelp (9), CognatesHelp (6) and VerbPatternHelp (31) teach no construction node.
  21: ['q.est-ce-que', 'q.intonation', 'q.inversion'],
  22: ['pronoun.stressed'],
  24: ['adj.agreement', 'adj.placement', 'adj.regular', 'adj.e'],
  28: ['contraction.de', 'contraction.a', 'article.partitive', 'elision'], // Before Vowels: de l', à l'
  29: ['frame.modal-infinitive'], // to say 'I want to come' you can say 'je veux venir'
  30: ['frame.aller-infinitive'],
  33: ['pronoun.direct-object'],
  34: ['possessive.adjective'],
  35: ['possessive.pronoun'],
  36: ['pronoun.direct-object'], // Object Pronoun Placement card restates the rule
  40: ['chunk.sil-vous-plait', 'chunk.sil-te-plait', 'chunk.excusez-moi', 'chunk.je-voudrais'], // vocab entry "je voudrais" (polite form!)
  42: ['frame.modal-infinitive'], // devoir + infinitive (nous devons + être)
  43: ['verb.er.present'],
  45: ['neg.ne-pas', 'elision'], // ne contracts to n'
  46: ['adverb.placement', 'chunk.de-temps-en-temps'],
  47: ['neg.ne-jamais'],
  48: ['adverb.placement', 'chunk.quelque-part', 'chunk.nulle-part'],
  49: ['chunk.quelque-chose', 'chunk.tout-le-monde', 'neg.ne-personne'], // vocabulary entries; "personne = nobody … je ne vois personne" teaches ne…personne
  53: ['comparative', 'comparative.irregular', 'superlative', 'chunk.tout-le-monde'],
  55: ['conditionnel-present'],
  56: ['conditionnel-present'],
  57: ['frame.aimer-infinitive'],
  58: ['imparfait'],
  59: ['imparfait'],
  60: ['article.partitive'], // Using Partitive Articles with food
  61: ['passe-compose.avoir', 'ptcp.er'],
  62: ['passe-compose.avoir'],
  66: ['frame.etre-en-train-de', 'frame.aller-infinitive', 'futur-simple', 'verb.future'],
  67: ['frame.verb-que-clause', 'chunk.cest-a-dire'],
  69: ['verb.er.present'], // Regular -er conjugation: donn- + endings
  71: ['frame.demander-de-infinitive'],
  73: ['frame.avoir-besoin-de'],
  78: ['pronoun.on', 'chunk.tout-le-monde', 'chunk.on-y-va'],
  80: ['frame.apprendre-a-infinitive'],
  82: ['frame.savoir-infinitive', 'chunk.je-ne-sais-pas'],
  84: ['frame.verb-que-clause'], // penser que
  85: ['frame.verb-que-clause'], // croire que
  87: ['chunk.en-fait', 'chunk.bien-sur'], // bien sûr is a vocabulary entry
  88: ['chunk.tout-le-monde'],
  93: ['pronoun.reflexive'],
  94: ['elision'], // Notice the elision: je m'appelle
  98: ['passe-compose.reflexive', 'ptcp.agreement'],
  99: ['reciprocal'],
  100: ['imperative.tu'],
  101: ['imperative.vous'],
  102: ['imperative.irregular', 'imperative.nous', 'chunk.vas-y', 'chunk.allons-y'], // nous: Soyons! Ayons! Allons! Faisons!; Vas-y! and Allons-y! are vocab entries and on the card
  103: ['imperative.pronouns'],
  107: ['chunk.parce-que', 'chunk.grace-a', 'chunk.a-cause-de'],
  110: ['passe-compose.avoir', 'ptcp.er'],
  111: ['passe-compose.avoir'], // All use AVOIR as auxiliary
  112: ['passe-compose.avoir', 'frame.modal-infinitive'], // Modal verbs + infinitive in past
  113: ['passe-compose.etre', 'ptcp.agreement'],
  114: ['ptcp.agreement'],
  115: ['imparfait', 'verb.er.impf', 'verb.ir.impf', 'verb.re.impf', 'il-y-a'], // il y avait is a vocabulary entry
  116: ['chunk.pendant-que', 'chunk.tout-a-coup'], // vocabulary entries
  117: ['il-y-a'], // il y avait is a vocabulary entry
  121: ['subj.il-faut-que', 'subj.vouloir-que'],
  122: ['subj.il-faut-que', 'subj.vouloir-que'],
  123: ['subj.il-faut-que', 'frame.il-faut-infinitive'],
  124: ['subj.vouloir-que'],
  125: ['subj.emotion-que'],
  126: ['subj.ne-pas-penser-que', 'frame.verb-que-clause', 'subj.douter-que'], // je doute que: vocabulary entries
  127: ['si.imparfait-conditionnel'],
  128: ['si.plus-que-parfait-conditionnel-passe'],
  129: ['plus-que-parfait.avoir'],
  131: ['gerondif', 'prsptcp.er'],
  132: ['causative.faire'],
  133: ['subj.avant-que'],
  134: ['subj.pour-que'],
  135: ['subj.bien-que'],
  136: ['subj.possible-que'],
  140: ['age.avoir-ans'],
  141: ['pronoun.indirect-object'], // Je lui donne le livre
  143: ['frame.verb-que-clause'], // Je trouve que... = I think that
  152: ['rendre-adjective'],
  153: ['q.quest-ce-qui', 'q.quest-ce-que'],
  154: ['q.est-ce-que'], // Basic Pattern: pourquoi est-ce que + statement
  155: ['q.est-ce-que', 'q.inversion'],
  156: ['q.qui-est-ce-qui', 'q.qui-est-ce-que'],
  157: ['q.inversion'],
  158: ['q.embedded'],
  159: ['q.negative-inversion', 'neg.ne-pas-infinitive', 'chunk.nest-ce-pas'],
};

// tests: the constructions each exam and practice module's concept list claims to test.
export const TESTS = {
  12: ['pronoun.subject', 'article.indefinite', 'article.definite'],
  13: ['pronoun.subject', 'article.indefinite', 'article.definite', 'noun.plural', 'cest'],
  26: ['demonstrative.adjective', 'chunk.ca-va', 'frame.modal-infinitive', 'pronoun.stressed', 'q.words',
    'chunk.comment-ca-va', 'chunk.quest-ce-que-cest'],
  27: ['demonstrative.adjective', 'chunk.ca-va', 'frame.modal-infinitive', 'pronoun.stressed', 'q.words',
    'chunk.comment-ca-va', 'chunk.quest-ce-que-cest', 'adj.agreement', 'adj.placement'],
  38: ['contraction.a', 'pronoun.direct-object', 'possessive.adjective', 'possessive.pronoun'],
  39: ['contraction.a', 'contraction.de', 'elision', 'pronoun.direct-object', 'possessive.adjective', 'possessive.pronoun'],
  51: ['chunk.sil-vous-plait', 'chunk.excusez-moi', 'chunk.je-ne-sais-pas', 'frame.modal-infinitive', 'neg.ne-pas', 'neg.ne-jamais'],
  52: ['chunk.sil-vous-plait', 'chunk.excusez-moi', 'chunk.je-ne-sais-pas', 'neg.ne-pas', 'neg.ne-jamais', 'adverb.placement'],
  64: ['passe-compose.avoir', 'passe-compose.etre', 'comparative', 'si.present'],
  65: ['passe-compose.avoir', 'passe-compose.etre', 'comparative', 'si.present'],
  76: ['frame.etre-en-train-de', 'frame.avoir-besoin-de'],
  77: ['frame.etre-en-train-de', 'frame.avoir-besoin-de'],
  90: ['pronoun.on', 'frame.verb-que-clause'],
  91: ['pronoun.on'],
  105: ['pronoun.reflexive', 'reciprocal'],
  106: ['pronoun.reflexive', 'reciprocal', 'imperative.tu', 'imperative.vous'],
  119: ['imparfait', 'chunk.en-fait'],
  120: ['imparfait', 'passe-compose.avoir', 'plus-que-parfait.avoir', 'plus-que-parfait.etre', 'chunk.en-fait'],
  138: ['relative.qui', 'relative.que', 'relative.ou', 'relative.dont', 'relative.ce-que',
    'subj.il-faut-que', 'subj.vouloir-que', 'subj.possible-que', 'subj.bien-que',
    'chunk.quelque-chose', 'neg.ne-personne', 'neg.ne-rien'],
  139: ['relative.qui', 'relative.que', 'relative.ou', 'relative.dont', 'relative.ce-que',
    'subj.il-faut-que', 'subj.vouloir-que', 'subj.possible-que', 'subj.bien-que', 'subj.douter-que', 'subj.emotion-que',
    'chunk.quelque-chose', 'neg.ne-personne', 'neg.ne-rien', 'si.imparfait-conditionnel'],
  148: ['futur-simple', 'futur-anterieur', 'conditionnel-present', 'conditionnel-passe.avoir', 'passive', 'causative.faire', 'gerondif'],
  149: ['futur-simple', 'futur-anterieur', 'conditionnel-present', 'conditionnel-passe.avoir', 'passive', 'causative.faire', 'gerondif'],
};

// Homographs: the reading a vocabulary entry teaches, where extraction credits another one.
// [position, { manual: [...], exclude: [...] }, reason]
// excludeWords holds graph nodes only: forms generated by a paradigm (aider.prs.1sg, droit.f …) are not nodes,
// so they stay in teachesWords; excluding the lemma already makes them unavailable.
export const HOMOGRAPHS = [
  [23, { manual: ['fr:lex:devant', 'fr:lex:entre'], exclude: ['fr:lex:devoir', 'fr:form:devoir.prsptcp', 'fr:lex:entrer'] },
    'vocab "devant" = in front of, "entre" = between; extraction read them as devoir and entrer forms'],
  [108, { manual: ['fr:lex:devant', 'fr:lex:entre'], exclude: ['fr:lex:devoir', 'fr:form:devoir.prsptcp', 'fr:lex:entrer'] },
    'vocab "devant" = in front of, "entre" = between; extraction read them as devoir and entrer forms'],
  [48, { manual: ['fr:lex:part'], exclude: ['fr:lex:partir', 'fr:form:partir.prs.3sg'] },
    'vocab "quelque part", "nulle part": part is the noun, not partir'],
  [68, { manual: ['fr:lex:bus'], exclude: ['fr:lex:boire', 'fr:form:boire.ptcp.pl'] },
    'vocab "prendre le bus": bus is the noun, not the participle of boire'],
  [145, { manual: ['fr:lex:bus'], exclude: ['fr:lex:boire', 'fr:form:boire.ptcp.pl'] },
    'vocab "j\'attends le bus": bus is the noun, not the participle of boire'],
  [71, { manual: ['fr:lex:aide'], exclude: ['fr:lex:aider'] },
    'vocab "demander de l\'aide": aide is the noun, not aider'],
  [73, { manual: ['fr:lex:aide'], exclude: ['fr:lex:aider'] },
    'vocab "j\'ai besoin d\'aide": aide is the noun, not aider'],
  [141, { manual: ['fr:lex:aide'], exclude: ['fr:lex:aider'] },
    'vocab "donner de l\'aide": aide is the noun, not aider'],
  [74, { manual: ['fr:lex:fait', 'fr:lex:partie'], exclude: ['fr:lex:faire', 'fr:form:faire.prs.3sg', 'fr:form:faire.ptcp', 'fr:lex:partir'] },
    'vocab "le fait" = fact and "la partie" = part / game: nouns, not faire and partir forms'],
  [86, { manual: ['fr:lex:cours', 'fr:lex:pensee'], exclude: ['fr:lex:courir', 'fr:form:courir.prs.1sg', 'fr:form:courir.prs.2sg', 'fr:lex:penser'] },
    'vocab "le cours" = class and "la pensée" = thought: nouns, not courir and penser forms'],
  [87, { manual: ['fr:lex:fait'], exclude: ['fr:lex:faire', 'fr:form:faire.prs.3sg', 'fr:form:faire.ptcp'] },
    'vocab "en fait" = in fact: fait is the noun, not faire'],
  [125, { manual: ['fr:lex:surpris'], exclude: ['fr:lex:surprendre', 'fr:form:surprendre.ptcp', 'fr:form:surprendre.ptcp.pl'] },
    'vocab "je suis surpris que…" = I\'m surprised: surpris is the adjective, not the participle of surprendre'],
  [146, { manual: ['fr:lex:droite', 'fr:lex:est'], exclude: [] },
    'vocab "à droite" = to the right (noun droite, not the feminine of droit) and "l\'est" = east (noun est; être stays credited by "où est")'],
];

// Names that appear in the course's French text (people, places, brands, titles).
export const NAMES = [
  // people
  'Marie', 'Paul', 'Pierre', 'Sophie', 'Marc', 'Thomas', 'Vincent', 'van', 'Gogh', 'Gauguin', 'Jules', 'Verne',
  'Amélie', 'Socrate', 'Claude', 'Monet', 'Auguste', 'Renoir',
  // places and landmarks
  'Paris', 'France', 'Europe', 'Normandie', 'Rouen', 'Caen', 'Honfleur', 'Bayeux', 'Mont-Saint-Michel', 'Montmartre',
  'Eiffel', 'Luxembourg', 'Sorbonne', 'Notre-Dame', 'Louvre', 'Champs-Élysées', 'Saint-Germain', 'Germain', 'Odéon', 'Versailles',
  'Arles', 'Lyon', 'Nice', 'Bordeaux', 'Marseille', 'Cannes', 'Seine', 'Méditerranée',
  // cafés, brands and titles
  'Flore', 'Procope', 'Ladurée', 'Amazon', 'Monte-Cristo',
];
// Headwords that were names; no file other than the generated course map references them.
export const NAME_HEADWORDS = ['marie', 'paris', 'nice', 'seine', 'marc', 'pierre', 'verne', 'bordeaux', 'mediterranee', 'flore', 'van'];
// (van is only ever the name Vincent van Gogh in the course; nothing else references fr:lex:van.)

export const PRONOUN_NOTES = {
  'fr:lex:elle': 'subject pronoun (elle parle)',
  'fr:lex:elle.pronoun': 'stressed pronoun, after a preposition or c\'est (avec elle, c\'est elle)',
  'fr:lex:nous': 'subject pronoun (nous parlons)',
  'fr:lex:nous.pronoun': 'object, reflexive or stressed pronoun (il nous voit, nous nous levons, avec nous)',
  'fr:lex:vous': 'subject pronoun (vous parlez)',
  'fr:lex:vous.pronoun': 'object, reflexive or stressed pronoun (je vous vois, vous vous levez, avec vous)',
  'fr:lex:lui': 'stressed pronoun (c\'est lui, avec lui, lui aussi)',
  'fr:lex:lui.pronoun': 'indirect object pronoun before the verb (je lui parle)',
  'fr:lex:eux': 'stressed pronoun used alone or for emphasis (eux, ils partent ; eux aussi)',
  'fr:lex:eux.pronoun': 'after a preposition or c\'est (avec eux, chez eux, c\'est eux)',
  'fr:lex:toi': 'stressed pronoun used alone or for emphasis (toi, tu viens ? ; toi aussi)',
  'fr:lex:toi.pronoun': 'after a preposition or c\'est, or attached to an imperative (avec toi, assieds-toi)',
};

// Lesson text to fix (Plan 2), shown at the top of the fix list: errors the checker's rules cannot see.
// [position, note]
export const CONTENT_NOTES = [
  [64, 'the concept cards teach "plus bon que" and "c\'est plus bon", which are wrong French; the comparative of bon is "meilleur" ("meilleur que", "c\'est meilleur").'],
  [65, 'the concept cards teach "plus bon que (better than)" and "c\'est plus bon", which are wrong French; the comparative of bon is "meilleur" ("meilleur que", "c\'est meilleur").'],
  [107, 'the gap-fill "Je suis en retard ___ le traffic" with answer "à cause du" reads "à cause du le traffic" once filled; drop "le" from the prompt. "traffic" is the English spelling: French writes "trafic" (also in the à cause de concept card and a feedback line).'],
  [108, 'the gap-fill "La lampe est ___ le lit" with answer "au-dessus du" reads "au-dessus du le lit" once filled; drop "le" from the prompt. "il-y-a" in the parmi exercises is written "il y a", without hyphens.'],
  [113, 'the gap-fill "Elle ne ___ pas ___" with answer "est pas venue" reads "Elle ne est pas venue" once filled; French elides it to "Elle n\'est pas venue".'],
  [115, 'the gap-fill "Je ___ au café quand tu m\'as appelé" with answer "allais" reads "Je allais"; French elides it to "J\'allais".'],
  [117, 'the gap-fill "Pendant que je ___, on a parlé pendant une heure" with answer "étais" reads "je étais"; French elides it to "j\'étais" (and "While I was there" needs "là": "Pendant que j\'étais là").'],
  [119, 'the gap-fill "Il est fatigué ___ du travail" with answer "à cause de" reads "à cause de du travail" once filled; French says "à cause du travail": make the answer "à cause du" and drop "du" from the prompt.'],
  [148, 'the gap-fill "Je ___ mes amis au café" with answer "attends" reads "Je attends"; French elides it to "J\'attends".'],
  [152, 'the vocabulary entry and concept card "rendre + adjective" have the English placeholder "adjective" where a French example belongs (for example "rendre heureux").'],
];

// Phrases taught whole before their general pattern: a use that sits entirely inside one of these chunks
// does not count as the general construction (overrides written by build-map).
export const CHUNK_ONLY = [
  ['conditionnel-present', ['chunk.je-voudrais']], // je voudrais, taught at 40; the conditionnel at 55
  ['pronoun.y', ['chunk.on-y-va', 'chunk.vas-y', 'chunk.allons-y']], // on y va (78), vas-y and allons-y (102); the pronoun y is never taught
];

// English text the checker reads as French and its rules cannot tell apart: each item ref with the node IDs (or
// words) to ignore there (overrides written by build-map). [item ref, ignore, reason]
export const MISREADS = [
  ['2024-01-02-etre#concepts[0].example', ['fr:lex:express'], '"Express: I am, you are..." is an English instruction'],
  ['2024-01-11-unit1-exam#concepts[2].example', ['fr:lex:express', 'possession'], '"express possession (j\'ai...)" is English'],
  ['2024-01-13-ca-survival#exerciseConfig.items[4].hint', ['fr:lex:combiner', 'fr:cx:imperative.tu'], '"Combine avoir + ça" opens with the English verb combine'],
  ['2024-01-13-ca-survival#exerciseConfig.items[5].hint', ['fr:lex:combiner', 'fr:cx:imperative.tu'], '"Combine avoir + ça" opens with the English verb combine'],
  ['2024-01-13-ca-survival#vocabularyReference[2].note', ['fr:cx:frame.aller-infinitive'], '"ça + va (être)" labels va with (être); it shows no aller + infinitive'],
  ['2024-01-19-stressed-pronouns#concepts[1].example', ['fr:lex:me'], '"Me?" is the English gloss of "Moi?"'],
  ['2024-02-02-combining#exerciseConfig.items[10].hint', ['fr:lex:combiner', 'fr:cx:imperative.tu'], '"Combine venir + avec + moi" opens with the English verb combine'],
  ['2024-02-02-combining#exerciseConfig.items[11].wrongAnswers[0].feedback', ['fr:cx:imperative.irregular'], '"Use \'va partir\'" quotes il va partir (aller + infinitive), not the command va'],
  ['2024-02-02-service-phrases#title', ['fr:lex:service', 'fr:lex:phrase'], '"Service Phrases" is the English half of the title'],
  ['2024-04-24-reading-6#vocabularyReference[32].note', ['fr:lex:question', 'fr:lex:phrase'], '"question phrase" is an English label'],
];
