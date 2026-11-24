// Builds curriculum-graph/languages/fr/constructions.json: every French construction node, with its detector
// (see ../detect.mjs for the step keys) and the sentences it must and must not match.
// Source of truth: this script. Edit or add a node here, run
//   node scripts/graph/fr/build/constructions.mjs
// and then pnpm graph:test, which runs every node's examples. Do not edit constructions.json by hand.
// --stub writes detectors that never match, to watch the examples test fail.
import { join } from 'node:path';
import { loadGraph } from '../../load.mjs';
import { writeSortedJson } from '../../write-json.mjs';
import { REPO } from './lib.mjs';
import { levelOf, checkLevels } from './construction-levels.mjs';

const STUB = process.argv.includes('--stub');
const graph = loadGraph(join(REPO, 'curriculum-graph'), 'fr');

const lex = (k) => {
  const id = k.includes(':') ? k : `fr:lex:${k}`;
  if (!graph.nodes.has(id)) throw new Error(`unknown headword ${id}`);
  return id;
};
// One token that has a reading of any of these headwords (with the cell glob, when given).
const HW = (keys, cell) => ({ any: keys.map((k) => (cell ? { headword: lex(k), cell } : { headword: lex(k) })) });

// Slots read from the graph at check time: no word lists to regenerate.
const INF = { pos: 'verb', via: 'lemma' };
const VERB = { pos: 'verb' };
const NOUN_OR_ADJ = { any: [{ pos: 'noun' }, { pos: 'adjective' }] };
const GRADABLE = { any: [{ pos: 'adjective' }, { surface: 'vite|souvent|tot|tard|lentement|rapidement|facilement|loin|pres|longtemps' }] };

const S = (surface, extra = {}) => ({ surface, ...extra });
const opt = (step) => ({ ...step, optional: true });
const QUE = S("que|qu'");
const DE = S("de|d'");
const NE = S("ne|n'");
const SUBJ = "je|j'|tu|il|elle|on|nous|vous|ils|elles";
const CL_SUBJ = { clitic: true, surface: '-(t-)?(tu|il|elle|on|nous|vous|ils|elles)' };
// The next token is not an inverted subject (-tu, -t-il, -vous …) and not the -ce of est-ce.
const NOT_CL_SUBJ = S('(?!-(t-)?(tu|il|elle|on|nous|vous|ils|elles|ce)$).+');
const ADV = { any: [{ pos: 'adverb' }, { surface: 'rien|tout' }] };
const OBJ = S("le|la|les|l'|me|m'|te|t'|se|s'|nous|vous|lui|leur|y|en");
const PTCP = { cell: 'ptcp*' };
// Past participles of the verbs that take être (DR & MRS VANDERTRAMP), with agreement endings.
const ETRE_VERB_PTCP = '(alle|venu|parti|arrive|sorti|entre|rentre|reste|monte|descendu|tombe|devenu|revenu|retourne|ne|mort|passe|reparti|ressorti|remonte|redescendu|retombe|parvenu)(e|s|es)?';
const ETRE_PTCP = { cell: 'ptcp*', surface: ETRE_VERB_PTCP };
// Auxiliary + optional inverted subject + up to two adverbs ("n'ai pas encore", "a-t-il bien").
const REL_PRONOUN = "celui|celle|ceux|celles|quelqu'un|moi|toi|lui|elle|nous|vous|eux|elles";
const QUE_CLAUSE_NOUNS = 'est|parce|fait|temps|moment|peur|preuve|surprise|idee|impression|espoir|chance|dommage';
// an adjective after the antecedent noun; most words are both noun and adjective in the graph, so the step only needs an adjective reading
const ADJ_STEP = { pos: 'adjective' };
const ADJ_PTCP = 'fatigue|occupe|surpris|marie|assis|ferme|ouvert|perdu|connu|interesse|presse|decu|ravi|etonne|fache|desole|habille|leve|couche|reveille|prepare|pret|ete';
const PASSIVE_PTCP = { cell: 'ptcp*', surface: '(?!(' + ETRE_VERB_PTCP.slice(1, ETRE_VERB_PTCP.indexOf(')')) + '|' + ADJ_PTCP + ')(e|s|es)?$).+' };
const AUX_TAIL = [opt(CL_SUBJ), opt(ADV), opt(ADV)];
const ETRE_PRS = { headword: 'fr:lex:etre', cell: 'prs.*' };
const AVOIR_PRS = { headword: 'fr:lex:avoir', cell: 'prs.*' };
const AVOIR_IMPF = { headword: 'fr:lex:avoir', cell: 'impf.*' };
const ETRE_IMPF = { headword: 'fr:lex:etre', cell: 'impf.*' };
const AVOIR_COND = { headword: 'fr:lex:avoir', cell: 'cond.*' };
const ETRE_COND = { headword: 'fr:lex:etre', cell: 'cond.*' };
const SI = S("si|s'");
const SI_SUBJ = S(SUBJ);

const MODAL = HW(['pouvoir', 'vouloir', 'devoir']);
const ALLER_PI = { any: [{ headword: lex('aller'), cell: 'prs.*' }, { headword: lex('aller'), cell: 'impf.*' }] };
const FAIRE = HW(['faire']);
const FALLOIR = { headword: 'fr:lex:falloir' };
const SAVOIR = HW(['savoir.verb']);
const LIKE = HW(['aimer', 'adorer', 'preferer']);
const APPRENDRE = HW(['apprendre']);
const DEMANDER = HW(['demander']);
const REPORT = HW(['dire', 'penser', 'croire', 'savoir.verb', 'trouver']);
// souhaiter is not in the graph yet; its forms are listed by surface.
const WISH = { any: [...HW(['vouloir', 'preferer']).any, { headword: lex('aimer'), cell: 'cond.*' },
  { surface: 'souhaite|souhaites|souhaitons|souhaitez|souhaitent|souhaiterais|souhaiterait' }] };
// ravi, fier, déçu, étonné, fâché and dommage are not in the graph yet; listed by surface.
const EMOTION = { any: [...HW(['content', 'heureux', 'triste', 'desole', 'surpris', 'reconnaissant', 'regretter', 'peur']).any,
  { surface: '(ravi|fier|fiere|decu|etonne|fache)(e|s|es)?|fieres?|dommage' }] };
const NOT_COMPARISON = S("(?!(moi|toi|lui|eux|jamais|prevu|avant|hier|d'habitude|d)$).+");
const KNOW_ASK = { any: [...HW(['savoir.verb', 'demander', 'dire', 'comprendre']).any, { surface: 'expliqu(e|es|ons|ez|ent|er)' }] };
const QWORD_EMBED = S("ou|quand|comment|pourquoi|combien|quel|quelle|quels|quelles|qui|si|s'");
const NUMBER = S('un|une|deux|trois|quatre|cinq|six|sept|huit|neuf|dix|onze|douze|treize|quatorze|quinze|seize|vingt|vingts|trente|quarante|cinquante|soixante|cent|cents|et');
// Verbs that govern de + noun, so "de la" after them is not a partitive (je viens de la gare).
const DE_VERB_STEMS = 'vien|ven|sor|par|arriv|rentr|revien|reven|retourn|parl|pens|decid|essai|essay|demand|fini|oubli|chois|refus|accept|propos|continu|rev|promet|permet|arret|excus|conseill|remerci|occup|souvien|chang|profit|descend|depend|approch|dis|dit|risqu|merit|agit|jou|sert|serv|suis|es|sont|somme|ete|etai|etio|seri|sera|soi|soy|moqu|tomb|sauv|eloign|separ|felicit|plai|souffr|habit|traite|pass';
const RECIPROCAL_VERB = HW(['aimer', 'parler', 'voir', 'connaitre', 'comprendre', 'regarder', 'ecouter', 'aider', 'rencontrer', 'retrouver', 'dire', 'embrasser']
  .filter((v) => graph.nodes.has(`fr:lex:${v}`)), '*.*');

const node = (id, label, needs, detect, match, noMatch) => ({
  id: `fr:cx:${id}`,
  label,
  needs: needs.map((n) => (n.startsWith('fr:') ? n : `fr:cx:${n}`)),
  detect: STUB && detect ? [{ surface: '(?!)' }] : detect,
  examples: { match, noMatch },
  contrastsWith: [],
  ...levelOf(id),
});

const PRESENT = ['verb.er.present', 'verb.ir.present', 'verb.re.present'];
const PTCPS = ['ptcp.er', 'ptcp.ir', 'ptcp.re'];
const IMPF = ['verb.er.impf', 'verb.ir.impf', 'verb.re.impf'];
const SBJV = ['verb.er.subjunctive', 'verb.ir.subjunctive', 'verb.re.subjunctive'];
const chunk = (key, label, words, match, noMatch, needs = []) => node(`chunk.${key}`, label, needs, words.map((w) => (typeof w === 'string' ? S(w) : w)), match, noMatch);

const C = [
  // ---- Articles and nouns
  node('article.definite', 'Definite article le, la, l\', les (the) before another word', [],
    [{ headword: 'fr:lex:le', clitic: false }, S('.+')],
    ['Le chat est noir.', 'J\'aime les livres.', 'L\'école est grande.'],
    ['Un chat est noir.', 'Je suis là.']),
  node('article.indefinite', 'Indefinite article un, une, des (a, an, some)', [],
    [S('un|une|des')],
    ['J\'ai un chat.', 'C\'est une maison.', 'Il a des amis.'],
    ['J\'ai le chat.', 'C\'est la maison.']),
  node('article.partitive', 'Partitive article du, de la, de l\' after a verb, before a noun or adjective (some bread, some water)', ['article.definite', 'contraction.de'],
    [{ cell: '*.*', surface: `(?!(${DE_VERB_STEMS})).+` }, S("du|de|d'"), opt(S("la|l'")), NOUN_OR_ADJ],
    ['Je mange du pain.', 'Tu bois de l\'eau.', 'Il y a de la viande.', 'Nous avons du temps.'],
    ['Je viens de la maison.', 'Je parle de la France.', 'Je n\'ai pas de pain.', 'Le livre du professeur.', 'Il a dû partir.']),
  node('contraction.de', 'Contraction de + le = du and de + les = des after a noun, after près, loin or autour, or after a verb that takes de (le livre du professeur, près du parc, il vient du restaurant)', ['article.definite'],
    [
      [{ pos: 'noun', surface: '(?!(est|fait|ete|es|part)$).+' }, S('du|des')],
      [S('pres|loin|autour|lors|hors'), S('du|des')],
      [{ cell: '*.*', surface: '(vien|ven|sor|part|arriv|rentr|revien|reven|retourn|parl|pens|descend|depend|approch|souvien|occup|sort|rev|profit|chang)[a-z]*' }, S('du|des')],
    ],
    ['C\'est le livre du professeur.', 'Il vient du restaurant.', 'J\'habite près du parc.', 'C\'est la fin des vacances.'],
    ['Je mange du pain.', 'J\'ai des amis.', 'C\'est le livre de Marie.']),
  node('contraction.a', 'Contraction à + le = au, à + les = aux (au café, aux amis)', ['article.definite'],
    [S('au|aux'), S('(?!revoir$).+')],
    ['Je vais au café.', 'Je parle aux enfants.'],
    ['Je vais à la maison.', 'Au revoir !']),
  node('neg.de', 'de (d\') instead of un, une, des or du after a negation (je n\'ai pas de chat)', ['neg.ne-pas', 'article.indefinite'],
    [NE, S('pas|plus|jamais', { skip: 4 }), DE],
    ['Je n\'ai pas de chat.', 'Il n\'y a plus de pain.', 'Je ne mange jamais de viande.'],
    ['Je n\'ai pas le chat.', 'J\'ai du pain.', 'Je n\'ai pas besoin de ça.']),
  node('noun.gender', 'Noun gender: every noun is masculine or feminine (un livre, une maison); gender is a property of the noun, not visible as a pattern in the tokens', [],
    null,
    ['Le livre est sur la table.', 'Une maison et un jardin.'],
    ['Parler.']),
  node('adj.agreement', 'Adjective agreement in gender and number with the noun (petit, petite, petits, petites); which noun an adjective agrees with is not visible in the tokens', ['adj.regular', 'adj.e', 'noun.gender'],
    null,
    ['Une petite maison.', 'Les chats sont noirs.'],
    ['Il parle.']),
  node('adj.placement', 'Adjective placement: most adjectives follow the noun, short common ones (beau, bon, grand, petit, jeune, vieux, nouveau) come before it; word order with a part-of-speech slot cannot be read from the tokens', ['adj.agreement'],
    null,
    ['Un petit chat noir.', 'Une jeune femme française.'],
    ['Le chat mange.']),
  node('elision', 'Elision: je, me, te, se, le, la, de, ne, que and ce drop their vowel before a vowel sound (j\'ai, l\'école, c\'est)', [],
    [{ cell: 'elided' }],
    ['J\'ai un chat.', 'C\'est l\'école.', 'Il n\'est pas là.'],
    ['Je suis grand.', 'Tu as le livre.']),
  node('demonstrative.adjective', 'Demonstrative adjective ce, cet, cette, ces before a noun (ce livre, cet homme, cette maison)', ['noun.gender'],
    [S('ce|cet|cette|ces'), S("(?!(que|qu'|qui|sont|n'|ne|soit|serait|sera|etait|etaient|seront|dont|fut|la|a|y|en|me|m'|te|t'|se|s'|lui|leur|nous|vous|le|les|l')$).+")],
    ['J\'ai ce livre.', 'Cette maison est grande.', 'Cet homme est mon ami.'],
    ['C\'est ce que je veux.', 'Ce sont mes amis.', 'Ce n\'est pas grave.']),
  node('possessive.adjective', 'Possessive adjectives mon, ma, mes, ton, ta, tes, son, sa, ses, notre, nos, votre, vos, leur, leurs, agreeing with the thing owned; leur counts only before a noun, so the pronoun leur (je leur parle) does not', ['noun.gender'],
    [
      [S('mon|ma|mes|ton|ta|tes|son|sa|ses|notre|nos|votre|vos|leurs')],
      [S('leur'), { pos: 'noun' }],
    ],
    ['C\'est mon livre.', 'Sa maison est grande.', 'Nos amis sont là.', 'C\'est leur maison.'],
    ['C\'est le livre de Marie.', 'Je leur parle.']),
  node('possessive.pronoun', 'Possessive pronouns le mien, la tienne, les siens, le nôtre, le vôtre, le leur (mine, yours, his)', ['possessive.adjective', 'article.definite'],
    [S('le|la|les'), S('mien|mienne|miens|miennes|tien|tienne|tiens|tiennes|sien|sienne|siens|siennes|notre|notres|votre|votres|leur|leurs')],
    ['C\'est le mien.', 'Cette maison est la sienne.', 'Ce livre est le nôtre.'],
    ['C\'est mon livre.', 'C\'est notre maison.']),
  // ---- Pronouns
  node('pronoun.subject', 'Subject pronouns je, tu, il, elle, on, nous, vous, ils, elles', [],
    [S(SUBJ)],
    ['Je suis là.', 'Nous avons un chat.'],
    ['Bonjour !', 'Le chat mange.']),
  node('pronoun.tu-vous', 'tu or vous: informal or formal "you"; which one a sentence uses is visible, but the choice of register is not', ['pronoun.subject'],
    null,
    ['Tu es gentil.', 'Vous êtes gentil, madame.'],
    ['Il est gentil.']),
  node('pronoun.on', 'on (we, one, people) with the il/elle verb form', ['pronoun.subject'],
    [S('on|-on|-t-on')],
    ['On va au café.', 'Comment dit-on « merci » ?'],
    ['Nous allons au café.']),
  node('pronoun.stressed', 'Stressed pronouns moi, toi, lui, elle, nous, vous, eux, elles alone, after a preposition, et or que, after c\'est, or before aussi, même, non or seul (moi ?, avec moi, et toi ?, pour elle, c\'est lui, lui aussi); lui, nous and vous count only in positions where they cannot be subject or object pronouns, and a pronoun written after a verb without its hyphen (regarde moi) does not count', ['pronoun.subject'],
    [
      [S('moi|toi|eux', { start: true })],
      [S("avec|chez|sans|entre|apres|avant|devant|derriere|vers|contre|selon|sauf|pour|a|de|d'|sur|sous|par"), S('moi|toi|eux|elle|elles')],
      [S("et|ou|que|qu'|comme"), S('moi|toi|eux')],
      [S('avec|chez|sans|entre|apres|avant|devant|derriere|vers|contre|selon|sauf'), S('lui|nous|vous')],
      [S("c'"), S('est|etait|sera|serait'), S('moi|toi|lui|elle|nous|vous|eux|elles')],
      [S('moi|toi|lui|elle|nous|vous|eux|elles'), S('aussi|meme|non|seul|seule|seuls|seules')],
    ],
    ['Tu viens avec moi ?', 'Moi aussi.', 'C\'est pour eux.', 'Je travaille avec lui.', 'C\'est elle.', 'Lui aussi, il aime le café.', 'Ça va, et toi ?', 'Il est plus grand que moi.'],
    ['Je viens.', 'Excusez-moi.', 'Je lui parle.', 'Nous allons au café.', 'Regarde moi.', 'Je pense qu\'elle vient.', 'Il mange et elle boit.']),
  node('pronoun.direct-object', 'Direct object pronouns le, la, l\', les before the verb (je le vois, je ne la vois pas)', ['pronoun.subject', 'article.definite'],
    [S(`${SUBJ}|ne|n'`), S("le|la|les|l'"), { cell: '*.*' }],
    ['Je le vois.', 'Je ne la vois pas.', 'Il l\'aime.'],
    ['Je vois le chat.', 'Il aime la musique.']),
  node('pronoun.indirect-object', 'Indirect object pronouns lui and leur before the verb (je lui donne, il leur parle)', ['pronoun.direct-object'],
    [S(`${SUBJ}|ne|n'`), opt(S("le|la|les|l'")), S('lui|leur'), { cell: '*.*' }],
    ['Je lui donne le livre.', 'Il leur parle.', 'Je le lui donne.'],
    ['Je parle à Marie.', 'C\'est leur maison.', 'Je viens avec lui.']),
  node('pronoun.reflexive', 'Reflexive pronouns with a pronominal verb, the pronoun matching the subject (je me lève, tu te lèves, il se lève, nous nous levons, vous vous levez, ils s\'appellent), also before an infinitive (je vais me lever)', ['pronoun.subject'],
    [
      [S("se|s'"), VERB],
      [S('je'), opt(NE), S("me|m'"), VERB],
      [S('tu'), opt(NE), S("te|t'"), VERB],
      [S('nous'), opt(NE), S('nous'), VERB],
      [S('vous'), opt(NE), S('vous'), VERB],
      [S("je|j'"), S("me|m'", { skip: 3 }), INF],
      [S('tu'), S("te|t'", { skip: 3 }), INF],
      [S('nous'), S('nous', { skip: 3 }), INF],
      [S('vous'), S('vous', { skip: 3 }), INF],
    ],
    ['Il se lève à sept heures.', 'Elle s\'appelle Marie.', 'Je me lave.', 'Tu te lèves tôt.', 'Nous nous préparons.', 'Vous vous appelez comment ?', 'Je vais me lever.'],
    ['S\'il te plaît.', 'Il lève la main.', 'Il me voit.', 'Je te parle.', 'Tu me donnes le livre.', 'Je veux te voir.']),
  node('pronoun.y', 'The pronoun y (there, about it) before the verb or attached to an imperative (j\'y vais, on y va, vas-y); y in il y a is not counted', ['pronoun.direct-object'],
    [
      [S('y'), S("(?!(a|avait|aura|aurait|ait|aient|avoir|en|-t-il)$).+")],
      [{ cell: '*.*' }, S('-y', { clitic: true })],
    ],
    ['J\'y vais demain.', 'On y va ?', 'Je n\'y pense pas.', 'Vas-y !', 'Allons-y !'],
    ['Il y a un chat.', 'Il n\'y a pas de pain.', 'Il y en a deux.']),
  node('pronoun.en', 'The pronoun en (some, of it) before the verb or an infinitive, or attached to an imperative (j\'en ai, il y en a, je vais en acheter, prends-en)', ['pronoun.direct-object', 'article.partitive'],
    [
      [S(`${SUBJ}|ne|n'|y|me|m'|te|t'|se|s'|lui|leur`), S('en'), { cell: '*.*' }],
      [S('en'), INF],
      [{ cell: '*.*' }, S('-en', { clitic: true })],
    ],
    ['J\'en ai deux.', 'Il y en a beaucoup.', 'Je n\'en veux pas.', 'Je vais en acheter.', 'Prends-en !'],
    ['Je vais en France.', 'En fait, je ne sais pas.', 'Il est en train de manger.', 'Je travaille en écoutant de la musique.']),
  // ---- c'est, il y a
  node('cest', 'c\'est / ce sont (it is, that is), also c\'était and ce n\'est pas', ['fr:lex:etre', 'elision'],
    [S("c'|ce"), opt(NE), S('est|etait|sera|serait|sont|etaient|soit|seront')],
    ['C\'est un chat.', 'Ce sont mes amis.', 'Ce n\'est pas grave.', 'C\'était super.'],
    ['Il est grand.', 'Est-ce que tu viens ?']),
  node('il-y-a', 'il y a (there is, there are), in any tense and negated (il y avait, il n\'y a pas)', ['fr:lex:avoir'],
    [S('il'), opt(NE), S('y'), opt(S('en')), { headword: 'fr:lex:avoir' }],
    ['Il y a un chat.', 'Il n\'y a pas de pain.', 'Il y avait beaucoup de gens.'],
    ['Il a un chat.', 'J\'y vais.']),
  // ---- Questions
  node('q.est-ce-que', 'Question with est-ce que (est-ce que tu viens ?)', ['pronoun.subject'],
    [S('est'), S('-ce', { clitic: true }), QUE],
    ['Est-ce que tu as un chat ?', 'Où est-ce que tu vas ?'],
    ['Tu as un chat ?', 'Est-ce le tien ?', 'N\'est-ce pas ?']),
  node('q.intonation', 'Question by rising intonation (tu viens ?); only the question mark shows it, and the tokenizer drops punctuation', ['pronoun.subject'],
    null,
    ['Tu viens ?', 'Tu as un chat ?'],
    ['Tu viens.']),
  node('q.words', 'Question words comment, pourquoi, combien, quel, où, quand, qui, que, quoi (how, why, how much, which, where, when, who, what); où, quand, qui, que and quoi count before est-ce, before an inverted verb, at the start before a verb, or (où, qui, quoi) after a verb, so "ou" (or), quand (when), relative qui and que and the filler quoi do not', [],
    [
      [S('comment|pourquoi|combien|quel|quelle|quels|quelles')],
      [S("ou|quand|qui|que|qu'|quoi"), S('est'), S('-ce', { clitic: true })],
      [S("ou|quand|qui|que|qu'|quoi"), { cell: '*.*' }, CL_SUBJ],
      [S('ou|quand|qui|que', { start: true }), { cell: '*.*' }],
      [{ cell: '*.*' }, { any: [{ headword: 'fr:lex:ou.adverb' }, { surface: 'qui|quoi' }] }],
    ],
    ['Comment tu t\'appelles ?', 'Pourquoi tu pars ?', 'Quel âge as-tu ?', 'Où est la gare ?', 'Tu vas où ?', 'Quand est-ce que tu pars ?', 'Que fais-tu ?', 'Tu fais quoi ?', 'Qui parle ?'],
    ['Je vais au café.', 'Il mange comme un enfant.', 'Tu veux du thé ou du café ?', 'Je mange quand j\'ai faim.', 'Le chat qui dort est noir.', 'C\'est bon, quoi.']),
  node('q.inversion', 'Question by inversion of verb and subject pronoun (as-tu, va-t-il, parlez-vous)', ['pronoun.subject'],
    [{ cell: '*.*', surface: '(?!(rendez|asseyez|levez|depechez|amusez|habillez|lavez|reveillez|preparez|calmez|souvenez|couchez|promenez|taisez|arretez|inquietez|occupez|approchez|installez|depechons|amusons|levons|preparons)$).+' }, CL_SUBJ],
    ['As-tu un chat ?', 'Où va-t-il ?', 'Parlez-vous français ?'],
    ['Tu as un chat ?', 'Est-ce que tu viens ?', 'Asseyez-vous.', 'Donne-moi le livre.']),
  node('q.negative-inversion', 'Negative question with inversion (n\'es-tu pas content ? ne veux-tu pas venir ?)', ['q.inversion', 'neg.ne-pas'],
    [NE, opt(OBJ), { cell: '*.*' }, CL_SUBJ, S('pas|jamais|plus')],
    ['N\'es-tu pas content ?', 'Ne veux-tu pas essayer ?', 'N\'as-tu pas faim ?'],
    ['Tu n\'es pas content ?', 'N\'est-ce pas ?', 'Es-tu content ?']),
  node('q.quest-ce-que', 'qu\'est-ce que: "what" as the object (qu\'est-ce que tu veux ?)', ['q.est-ce-que'],
    [S("qu'"), S('est'), S('-ce', { clitic: true }), QUE],
    ['Qu\'est-ce que tu veux ?', 'Qu\'est-ce qu\'il mange ?'],
    ['Qu\'est-ce qui tombe ?', 'Est-ce que tu veux du café ?']),
  node('q.quest-ce-qui', 'qu\'est-ce qui: "what" as the subject (qu\'est-ce qui tombe ?)', ['q.quest-ce-que'],
    [S("qu'"), S('est'), S('-ce', { clitic: true }), S('qui')],
    ['Qu\'est-ce qui tombe ?', 'Qu\'est-ce qui rend l\'herbe verte ?'],
    ['Qu\'est-ce que tu vois ?', 'Qui est-ce qui parle ?']),
  node('q.qui-est-ce-que', 'qui est-ce que: "who" as the object (qui est-ce que tu vois ?)', ['q.est-ce-que'],
    [S('qui'), S('est'), S('-ce', { clitic: true }), QUE],
    ['Qui est-ce que tu vois ?', 'Qui est-ce qu\'il aime ?'],
    ['Qui est-ce qui parle ?', 'Qu\'est-ce que tu vois ?', 'Qui est-ce ?']),
  node('q.qui-est-ce-qui', 'qui est-ce qui: "who" as the subject (qui est-ce qui parle ?)', ['q.qui-est-ce-que'],
    [S('qui'), S('est'), S('-ce', { clitic: true }), S('qui')],
    ['Qui est-ce qui parle ?', 'Qui est-ce qui fait ça ?'],
    ['Qui est-ce que tu vois ?', 'Qu\'est-ce qui tombe ?']),
  node('q.embedded', 'Embedded (indirect) question after savoir, se demander, dire or comprendre, with no est-ce que (je ne sais pas où il est, je me demande pourquoi)', ['q.words'],
    [KNOW_ASK, opt(S('-moi|-nous|-lui|-leur', { clitic: true })), opt(S('pas')), QWORD_EMBED],
    ['Je ne sais pas où il est.', 'Je me demande pourquoi c\'est comme ça.', 'Peux-tu me dire où est la gare ?', 'Dis-moi comment tu fais ça.'],
    ['Je sais que tu es là.', 'Où est la gare ?', 'Je ne sais pas.']),
  // ---- Negation
  node('neg.ne-pas', 'Negation ne … pas around the conjugated verb (je ne suis pas, je n\'ai pas)', [],
    [NE, S('pas', { skip: 4 })],
    ['Je ne suis pas grand.', 'Je n\'ai pas de chat.', 'Je ne le vois pas.'],
    ['Je suis grand.', 'Pas de problème.']),
  node('neg.ne-jamais', 'Negation ne … jamais (never)', ['neg.ne-pas'],
    [NE, S('jamais', { skip: 4 })],
    ['Je ne vais jamais au cinéma.', 'Elle ne mange jamais de viande.'],
    ['Je vais toujours au cinéma.', 'Je ne vais pas au cinéma.']),
  node('neg.ne-rien', 'Negation ne … rien (nothing), also rien ne … at the start of a sentence', ['neg.ne-pas'],
    [
      [NE, S('rien', { skip: 4 })],
      [S('rien', { start: true }), NE],
    ],
    ['Je ne vois rien.', 'Il ne donne rien.', 'Rien ne marche.'],
    ['Je vois tout.', 'De rien !']),
  node('neg.ne-plus', 'Negation ne … plus (no longer, no more)', ['neg.ne-pas'],
    [NE, S('plus', { skip: 4 })],
    ['Je n\'ai plus faim.', 'Il ne travaille plus ici.'],
    ['J\'ai plus de temps.', 'Je n\'ai pas faim.']),
  node('neg.ne-personne', 'Negation ne … personne (nobody), also personne ne … at the start of a sentence', ['neg.ne-pas'],
    [
      [NE, S('personne', { skip: 4 })],
      [S('personne', { start: true }), NE],
    ],
    ['Je ne vois personne.', 'Il n\'aime personne.', 'Personne ne vient.'],
    ['Je vois une personne.', 'Je ne vois pas.', 'Une personne ne parle pas.']),
  node('neg.ne-pas-infinitive', 'ne pas together before an infinitive (pourquoi ne pas essayer ? comment ne pas aimer ça ?)', ['neg.ne-pas'],
    [S('ne'), S('pas'), INF],
    ['Pourquoi ne pas essayer ?', 'Comment ne pas aimer ça ?'],
    ['Je ne veux pas essayer.', 'Je n\'aime pas ça.']),
  // ---- Verb frames
  node('frame.modal-infinitive', 'Modal verb pouvoir, vouloir or devoir + infinitive (je peux venir, je veux partir, je dois travailler)', ['pronoun.subject'],
    [MODAL, opt(CL_SUBJ), opt(ADV), opt(OBJ), opt(OBJ), INF],
    ['Je peux venir.', 'Tu veux manger ?', 'Je ne peux pas partir.', 'Je dois le faire.'],
    ['Je veux un café.', 'Tu peux ?', 'Je veux le livre.']),
  node('frame.aller-infinitive', 'aller + infinitive: the near future (je vais manger, il allait partir)', ['fr:lex:aller'],
    [ALLER_PI, opt(CL_SUBJ), opt(ADV), opt(OBJ), opt(OBJ), INF],
    ['Je vais manger.', 'Tu vas partir ?', 'Je ne vais pas le faire.'],
    ['Je vais au café.', 'Ça va bien.']),
  node('frame.etre-en-train-de', 'être en train de + infinitive: an action in progress (je suis en train de manger, j\'étais en train de parler)', ['fr:lex:etre'],
    [{ headword: 'fr:lex:etre' }, opt(CL_SUBJ), opt(S('pas|toujours|encore|deja')), S('en'), S('train'), DE],
    ['Je suis en train de manger.', 'J\'étais en train de parler.'],
    ['Je suis dans le train.', 'Je prends le train.']),
  node('frame.avoir-besoin-de', 'avoir besoin de + noun or infinitive (j\'ai besoin de temps, tu as besoin de partir)', [],
    [{ headword: 'fr:lex:avoir' }, opt(CL_SUBJ), opt(S('pas|plus|vraiment|toujours|encore')), S('besoin'), DE],
    ['J\'ai besoin de temps.', 'Je n\'ai pas besoin d\'aide.', 'As-tu besoin de manger ?'],
    ['J\'ai du temps.', 'Le besoin est grand.']),
  node('frame.il-faut-infinitive', 'il faut + infinitive: general necessity (il faut manger)', [],
    [S('il'), opt(NE), FALLOIR, opt(S('pas')), opt(OBJ), opt(OBJ), INF],
    ['Il faut manger.', 'Il ne faut pas partir.', 'Il faut le faire.'],
    ['Il faut que tu manges.', 'Il faut du pain.']),
  node('frame.savoir-infinitive', 'savoir + infinitive: know how to (je sais nager)', ['frame.modal-infinitive'],
    [SAVOIR, opt(CL_SUBJ), opt(S('pas|bien|tres|vraiment')), opt(OBJ), INF],
    ['Je sais nager.', 'Tu sais parler français ?', 'Il ne sait pas jouer du piano.'],
    ['Je sais la réponse.', 'Je ne sais pas.']),
  node('frame.aimer-infinitive', 'aimer, adorer or préférer + infinitive: like doing (j\'aime parler français)', [],
    [LIKE, opt(CL_SUBJ), opt(S('pas|bien|beaucoup|mieux|vraiment|tellement')), opt(OBJ), INF],
    ['J\'aime parler français.', 'Elle adore nager.', 'Je préfère rester ici.'],
    ['J\'aime le café.', 'Je t\'aime.']),
  node('frame.apprendre-a-infinitive', 'apprendre à + infinitive: learn to (j\'apprends à nager)', [],
    [APPRENDRE, S('a'), INF],
    ['J\'apprends à nager.', 'Il apprend à parler français.'],
    ['J\'apprends le français.', 'Il apprend à l\'école.']),
  node('frame.demander-de-infinitive', 'demander de + infinitive: ask to do (il me demande de venir)', [],
    [DEMANDER, DE, opt(OBJ), INF],
    ['Il me demande de venir.', 'Elle nous demande de rester.'],
    ['Je demande de l\'aide.', 'Je demande à Marie.']),
  node('frame.verb-que-clause', 'dire, penser, croire, savoir or trouver + que + clause (je pense que c\'est bon, il dit qu\'il vient)', ['pronoun.subject'],
    [REPORT, opt(CL_SUBJ), opt(S('pas|bien|aussi|vraiment')), QUE],
    ['Je pense que c\'est bon.', 'Il dit qu\'il vient.', 'Je sais que tu es là.'],
    ['Je pense à toi.', 'Qu\'est-ce que tu dis ?']),
  node('age.avoir-ans', 'Age with avoir: j\'ai vingt ans (not être)', ['fr:lex:avoir'],
    [S(SUBJ), { headword: 'fr:lex:avoir' }, opt(NUMBER), opt(NUMBER), opt(NUMBER), opt(NUMBER), S('ans')],
    ['J\'ai vingt ans.', 'Elle a trente-deux ans.'],
    ['Il y a deux ans.', 'J\'ai deux chats.']),
  // ---- Tenses
  node('futur-simple', 'Futur simple, any verb (je parlerai, il ira, nous serons)', ['verb.future'],
    [{ cell: 'fut.*' }],
    ['Je parlerai français.', 'Il ira à Paris.', 'Nous serons là.'],
    ['Je parle français.', 'Je vais parler.']),
  node('imparfait', 'Imparfait, any verb (j\'étais, il faisait, je parlais)', [...IMPF],
    [{ cell: 'impf.*' }],
    ['J\'étais fatigué.', 'Il faisait beau.', 'Je parlais français.'],
    ['Je suis fatigué.', 'Il fait beau.']),
  node('conditionnel-present', 'Conditionnel présent, any verb (je voudrais, tu devrais, il pourrait)', ['verb.conditional'],
    [{ cell: 'cond.*' }],
    ['Je voudrais un café.', 'Tu devrais partir.', 'Nous pourrions venir.'],
    ['Je veux un café.', 'Tu dois partir.']),
  node('passe-compose.avoir', 'Passé composé with avoir: avoir in the present + past participle (j\'ai mangé, tu n\'as pas vu)', ['fr:lex:avoir', ...PTCPS],
    [AVOIR_PRS, ...AUX_TAIL, PTCP],
    ['J\'ai mangé une pomme.', 'Tu n\'as pas vu le film.', 'As-tu parlé avec Marie ?', 'Il a bien dormi.'],
    ['J\'ai un chat.', 'Il a faim.', 'Je mange une pomme.']),
  node('passe-compose.etre', 'Passé composé with être for the DR & MRS VANDERTRAMP verbs (je suis allé, elle est venue)', ['fr:lex:etre', 'passe-compose.avoir'],
    [ETRE_PRS, ...AUX_TAIL, ETRE_PTCP],
    ['Je suis allé au café.', 'Elle est venue hier.', 'Ils ne sont pas partis.'],
    ['Je suis grand.', 'Je vais au café.', 'Il est content.']),
  node('passe-compose.reflexive', 'Passé composé of pronominal verbs with être (je me suis levé, elle s\'est lavée, nous nous sommes préparés, vous vous êtes amusés)', ['passe-compose.etre', 'pronoun.reflexive'],
    [
      [S("me|te|se|m'|t'|s'"), ETRE_PRS, ...AUX_TAIL, PTCP],
      [S('nous'), opt(NE), S('nous'), ETRE_PRS, ...AUX_TAIL, PTCP],
      [S('vous'), opt(NE), S('vous'), ETRE_PRS, ...AUX_TAIL, PTCP],
    ],
    ['Je me suis levé à sept heures.', 'Elle s\'est lavée.', 'Ils se sont amusés.', 'Nous nous sommes préparés.', 'Vous vous êtes levés tôt.'],
    ['Je me lève à sept heures.', 'Je suis allé au café.', 'Nous sommes partis.']),
  node('ptcp.agreement', 'Past participle agreement with the subject after être (elle est allée, ils sont partis)', ['passe-compose.etre', 'adj.agreement'],
    [ETRE_PRS, ...AUX_TAIL, { cell: 'ptcp.*', surface: ETRE_VERB_PTCP }],
    ['Elle est allée au café.', 'Ils sont partis hier.', 'Elles sont venues.'],
    ['Il est allé au café.', 'Elle a mangé.']),
  node('plus-que-parfait.avoir', 'Plus-que-parfait with avoir: avoir in the imparfait + past participle (j\'avais déjà mangé)', ['fr:lex:avoir', 'passe-compose.avoir', 'imparfait'],
    [AVOIR_IMPF, ...AUX_TAIL, PTCP],
    ['J\'avais déjà mangé.', 'Nous avions fini.', 'Il avait déjà commencé.'],
    ['J\'avais faim.', 'J\'ai déjà mangé.']),
  node('plus-que-parfait.etre', 'Plus-que-parfait with être for the être verbs (j\'étais déjà parti, elle était venue)', ['fr:lex:etre', 'passe-compose.etre', 'plus-que-parfait.avoir'],
    [ETRE_IMPF, ...AUX_TAIL, ETRE_PTCP],
    ['J\'étais déjà parti.', 'Elle était déjà partie.'],
    ['J\'étais fatigué.', 'Je suis parti.']),
  node('conditionnel-passe.avoir', 'Conditionnel passé with avoir: avoir in the conditionnel + past participle (j\'aurais réussi, tu aurais dû)', ['fr:lex:avoir', 'passe-compose.avoir', 'conditionnel-present'],
    [AVOIR_COND, ...AUX_TAIL, PTCP],
    ['J\'aurais réussi.', 'Tu aurais dû venir.'],
    ['J\'aurais faim.', 'J\'ai réussi.']),
  node('conditionnel-passe.etre', 'Conditionnel passé with être for the être verbs (je serais venu, elle serait partie)', ['fr:lex:etre', 'passe-compose.etre', 'conditionnel-passe.avoir'],
    [ETRE_COND, ...AUX_TAIL, ETRE_PTCP],
    ['Je serais venu.', 'Elle serait partie.'],
    ['Je serais content.', 'Je suis venu.']),
  // ---- Hypotheticals
  node('si.imparfait-conditionnel', 'Hypothesis si + imparfait, with the result in the conditionnel (si j\'étais riche, je voyagerais); avais or étais followed by a past participle is the plus-que-parfait and does not count here', ['imparfait', 'conditionnel-present'],
    [
      [SI, SI_SUBJ, opt(NE), opt(OBJ), { cell: 'impf.*', surface: '(?!(av|et)(ais|ait|ions|iez|aient)$).+' }],
      [SI, SI_SUBJ, opt(NE), opt(OBJ), { any: [AVOIR_IMPF, ETRE_IMPF] }, opt(S('pas|plus|jamais')),
        { surface: '(?!(ete|fait|vu|vue|dit|pu|su|eu)$).+', any: [{ pos: 'noun' }, { pos: 'adjective' }, { pos: 'pronoun' }, { pos: 'determiner' }, { pos: 'article' }, { pos: 'preposition' }, { surface: 'ici|la|plus|moins|assez|tres|trop|si|aussi|un|une|des|du|de|d\'' }] }],
    ],
    ['Si j\'étais riche, je voyagerais.', 'Si on avait le temps, on pourrait marcher.', 'S\'il faisait beau, j\'irais à la plage.', 'Si j\'étais toi, je ferais ça.', 'Si j\'avais de l\'argent, je voyagerais.', 'Si tu étais ici, je serais content.'],
    ['Si tu veux, on y va.', 'Il s\'appelait Paul.', 'J\'étais riche.', 'Si j\'avais su, je serais venu.', 'Si j\'avais étudié, j\'aurais réussi.', 'Si elle m\'avait dit, j\'aurais compris.', 'Si j\'avais déjà mangé, je ne viendrais pas.', 'Si j\'avais été là, j\'aurais aidé.']),
  node('si.plus-que-parfait-conditionnel-passe', 'Past hypothesis si + plus-que-parfait, with the result in the conditionnel passé (si j\'avais su, je serais venu)', ['si.imparfait-conditionnel', 'plus-que-parfait.avoir', 'conditionnel-passe.avoir'],
    [SI, SI_SUBJ, opt(NE), S('avais|avait|avions|aviez|avaient|etais|etait|etions|etiez|etaient'), opt(ADV), opt(ADV), PTCP],
    ['Si j\'avais su, je serais venu.', 'Si j\'avais étudié, j\'aurais réussi.', 'Si tu étais venu, tu aurais vu Marie.'],
    ['Si j\'avais de l\'argent, je voyagerais.', 'J\'avais su.']),
  // ---- Subjunctive triggers
  node('subj.il-faut-que', 'Subjunctive after il faut que (il faut que tu partes)', ['frame.il-faut-infinitive', ...SBJV],
    [S('il'), opt(NE), FALLOIR, opt(S('pas')), QUE],
    ['Il faut que tu manges.', 'Il faut qu\'elle vienne.', 'Il ne faut pas que tu partes.'],
    ['Il faut manger.', 'Il faut du temps.']),
  node('subj.vouloir-que', 'Subjunctive after a wish: vouloir que, aimer (conditionnel) que, préférer que (je veux que tu viennes, j\'aimerais que tu sois là)', ['frame.modal-infinitive', ...SBJV],
    [WISH, opt(CL_SUBJ), opt(S('pas|bien|vraiment')), QUE],
    ['Je veux que tu viennes.', 'J\'aimerais que tu sois là.', 'Il veut qu\'on parte.'],
    ['Je veux venir.', 'Qu\'est-ce que tu veux ?']),
  node('subj.emotion-que', 'Subjunctive after an emotion + que (je suis content que tu sois là, j\'ai peur qu\'il parte, je regrette que)', ['adj.agreement', ...SBJV],
    [EMOTION, QUE, NOT_COMPARISON],
    ['Je suis content que tu sois là.', 'J\'ai peur qu\'il parte.', 'Je regrette que tu ne puisses pas venir.'],
    ['Je suis content.', 'Il est plus content que moi.', 'J\'ai peur du noir.']),
  node('subj.bien-que', 'Subjunctive after bien que (although)', SBJV,
    [S('bien'), QUE, NOT_COMPARISON],
    ['Bien que je sois fatigué, je travaille.', 'Bien qu\'il fasse froid, on sort.'],
    ['Il parle aussi bien que moi.', 'Je vais bien.']),
  node('subj.pour-que', 'Subjunctive after pour que (so that)', SBJV,
    [S('pour'), QUE],
    ['Je parle lentement pour que tu comprennes.', 'Je t\'appelle pour qu\'on parte ensemble.'],
    ['Je travaille pour mon père.', 'C\'est pour toi.']),
  node('subj.avant-que', 'Subjunctive after avant que (before someone does something)', SBJV,
    [S('avant'), QUE],
    ['Je mange avant que tu partes.', 'Viens avant qu\'il soit trop tard.'],
    ['Je mange avant le film.', 'Avant de partir, je mange.']),
  node('subj.possible-que', 'Subjunctive after il est possible que and il se peut que (it is possible that)', SBJV,
    [S('possible|impossible|peut'), QUE],
    ['Il est possible qu\'il vienne.', 'Il se peut que je parte demain.'],
    ['C\'est possible.', 'Peut-être qu\'il viendra.']),
  node('subj.douter-que', 'Subjunctive after douter que (je doute qu\'elle sache)', SBJV,
    [S('doute|doutes|doutons|doutez|doutent|doutais|doutait'), QUE],
    ['Je doute qu\'elle sache.', 'Je doute que ce soit possible.'],
    ['Je pense qu\'elle sait.', 'J\'ai un doute.']),
  node('subj.ne-pas-penser-que', 'Subjunctive after a negated opinion: je ne pense pas que, je ne crois pas que (je ne pense pas qu\'il vienne)', ['frame.verb-que-clause', 'neg.ne-pas', ...SBJV],
    [NE, { any: [{ headword: lex('penser'), cell: 'prs.*' }, { headword: lex('penser'), cell: 'impf.*' }, { headword: lex('croire'), cell: 'prs.*' }, { headword: lex('croire'), cell: 'impf.*' }] }, S('pas'), QUE],
    ['Je ne pense pas qu\'il vienne.', 'Je ne crois pas qu\'il ait raison.'],
    ['Je pense qu\'il vient.', 'Je ne pense pas.']),
  // ---- Gérondif, causative
  node('gerondif', 'Gérondif en + present participle: while doing, by doing (en mangeant, en parlant)', ['prsptcp.er', 'prsptcp.ir', 'prsptcp.re'],
    [S('en'), { cell: 'prsptcp' }],
    ['Je travaille en écoutant de la musique.', 'Il lit en mangeant.'],
    ['Je vais en France.', 'Il mange.']),
  node('causative.faire', 'Causative (se) faire + infinitive: have something done (je fais réparer ma voiture, je me fais couper les cheveux)', ['frame.modal-infinitive'],
    [FAIRE, opt(S('pas|jamais')), INF],
    ['Je fais réparer ma voiture.', 'Je me fais couper les cheveux.', 'Il fait construire une maison.'],
    ['Je fais mes devoirs.', 'Il fait beau.', 'Je fais du sport.']),
  node('rendre-adjective', 'rendre + object + adjective: make something + adjective (le soleil rend l\'herbe verte); the adjective slot cannot be told apart from a noun in the tokens', [],
    null,
    ['Le soleil rend l\'herbe verte.', 'Le froid rend l\'eau glacée.'],
    ['Je rends le livre.']),
  // ---- Imperative, reciprocal
  node('imperative.tu', 'Imperative, tu form: the tu present without the pronoun, -er verbs drop the -s (mange !, viens ici !, ne mange pas !); counted when the verb is the first word and another word follows that is not an inverted subject; a one-word command (Mange !) is not detected, and avoir, être, pouvoir, vouloir, devoir and savoir present forms do not count, because answers that leave out the subject (ai acheté, veux voir) start the same way', PRESENT,
    [
      [{ start: true, surface: '(?!(excusez|excuse|faut|entre|ai|as|avons|avez|suis|es|sommes|etes|veux|peux|dois|voulons|voulez|pouvons|pouvez|devons|devez|sais|savons|savez)$).+', any: [{ pos: 'verb', cell: 'prs.2sg' }, { pos: 'verb', cell: 'prs.1sg' }] }, NOT_CL_SUBJ],
      [S('ne|n\'', { start: true }), opt(OBJ), opt(OBJ), { any: [{ pos: 'verb', cell: 'prs.2sg' }, { pos: 'verb', cell: 'prs.1sg' }] }, S('pas|jamais|plus|rien')],
    ],
    ['Mange ta soupe !', 'Viens ici !', 'Prends le bus.', 'Ne mange pas ça !'],
    ['Tu manges ta soupe.', 'Viens-tu ici ?', 'Est-ce que tu viens ?', 'Ne veux-tu pas venir ?', 'Entre toi et moi, c\'est un secret.']),
  node('imperative.vous', 'Imperative, vous form: the vous present without the pronoun (mangez !, venez avec moi !, ne parlez pas !); counted when the verb is the first word and another word follows that is not an inverted subject; a one-word command (Mangez !) is not detected, and avoir, être, pouvoir, vouloir, devoir and savoir present forms do not count, because answers that leave out the subject start the same way', PRESENT,
    [
      [{ start: true, surface: '(?!(excusez|excuse|faut|entre|ai|as|avons|avez|suis|es|sommes|etes|veux|peux|dois|voulons|voulez|pouvons|pouvez|devons|devez|sais|savons|savez)$).+', pos: 'verb', cell: 'prs.2pl' }, NOT_CL_SUBJ],
      [S('ne|n\'', { start: true }), opt(OBJ), opt(OBJ), { pos: 'verb', cell: 'prs.2pl' }, S('pas|jamais|plus|rien')],
    ],
    ['Venez avec moi !', 'Parlez plus lentement, s\'il vous plaît.', 'Ne parlez pas !'],
    ['Vous parlez français.', 'Parlez-vous français ?', 'Excusez-moi.', 'Êtes-vous partis en vacances ?']),
  node('imperative.nous', 'Imperative, nous form: let us … (allons au café !, partons !, ne parlons pas !); counted when the verb is the first word and another word follows that is not an inverted subject', PRESENT,
    [
      [{ start: true, pos: 'verb', cell: 'prs.1pl' }, NOT_CL_SUBJ],
      [S('ne|n\'', { start: true }), opt(OBJ), opt(OBJ), { pos: 'verb', cell: 'prs.1pl' }, S('pas|jamais|plus|rien')],
    ],
    ['Allons au café !', 'Mangeons ensemble.', 'Allons-y !', 'Ne parlons pas de ça.'],
    ['Nous allons au café.', 'Allons-nous au café ?']),
  node('imperative.irregular', 'Irregular imperatives of être, avoir, savoir, vouloir and aller (sois, soyez, soyons, aie, ayez, ayons, sache, sachez, veuillez, va), as the first word; va counts only when another word follows that is not an inverted subject (va là-bas, not va-t-il)', ['imperative.tu', 'imperative.vous'],
    [
      [{ start: true, any: [
        { headword: lex('etre'), surface: 'sois|soyez|soyons' },
        { headword: lex('avoir'), surface: 'aie|ayez|ayons' },
        { headword: lex('savoir.verb'), surface: 'sache|sachons|sachez' },
        { surface: 'veuillez' },
      ] }],
      [S('va', { start: true }), NOT_CL_SUBJ],
    ],
    ['Sois gentil !', 'Aie confiance !', 'Soyez patients.', 'Va là-bas !'],
    ['Il faut que tu sois gentil.', 'Tu es gentil.', 'Va-t-il venir ?', 'Il va là-bas.']),
  node('imperative.pronouns', 'Affirmative imperative with an attached object pronoun (donne-le-moi, regarde-moi, vas-y); -nous and -vous are left out because they also mark inversion, and excusez-moi is its own chunk', ['imperative.tu', 'imperative.vous', 'pronoun.direct-object'],
    [{ cell: '*.*', surface: '(?!(excusez|excuse)$).+' }, S('-(moi|toi|le|la|les|lui|leur|y|en)', { clitic: true })],
    ['Donne-le-moi !', 'Regarde-moi !', 'Vas-y !', 'Dépêche-toi !'],
    ['Tu me regardes.', 'Excusez-moi.', 'As-tu un chat ?']),
  node('reciprocal', 'Reciprocal pronominal verbs with a plural subject: each other (nous nous aimons, ils se parlent, on se voit demain)', ['pronoun.reflexive'],
    [S('nous|vous|ils|elles|on'), S("nous|vous|se|s'"), RECIPROCAL_VERB],
    ['Nous nous aimons.', 'Ils se parlent tous les jours.', 'On se voit demain.'],
    ['Ils se lèvent tôt.', 'Nous parlons français.']),
  // ---- Comparison
  node('comparative', 'Comparative plus, moins or aussi + adjective or adverb, with or without que (plus grand, moins chère que, aussi vite que)', ['adj.agreement'],
    [S('plus|moins|aussi'), GRADABLE],
    ['Ce livre est plus grand.', 'Cette maison est moins grande que l\'autre.', 'Elle court aussi vite que toi.'],
    ['Je ne mange plus parce que je suis malade.', 'Moi aussi, je pense que oui.', 'Il est grand.']),
  node('comparative.irregular', 'Irregular comparatives meilleur, mieux, pire (better, worse)', ['comparative'],
    [S('meilleur|meilleure|meilleurs|meilleures|mieux|pire|pires')],
    ['C\'est un meilleur livre.', 'Elle chante mieux que moi.'],
    ['C\'est un bon livre.', 'Elle chante bien.']),
  node('superlative', 'Superlative le, la, les (or a possessive) + plus, moins, meilleur, pire (le plus grand, la meilleure, mon meilleur ami)', ['comparative', 'comparative.irregular', 'article.definite'],
    [S('le|la|les|mon|ma|mes|ton|ta|tes|son|sa|ses|notre|nos|votre|vos|leur|leurs'), S('plus|moins|meilleur|meilleure|meilleurs|meilleures|pire|pires|mieux')],
    ['C\'est le plus grand musée.', 'C\'est la meilleure pizza.', 'Tu es mon meilleur ami.'],
    ['Il est plus grand que moi.', 'Je ne la vois plus.']),
  node('adverb.placement', 'Adverb placement: adverbs usually follow the conjugated verb (je vais toujours, il a bien mangé); the adverb position cannot be read from the tokens', [],
    null,
    ['Je vais toujours au café.', 'Il a bien mangé.'],
    ['Je vais au café.']),
  // ---- Chunks
  chunk('sil-vous-plait', 'Fixed phrase: s\'il vous plaît (please, formal)', ["s'", 'il', 'vous', 'plait'],
    ['Un café, s\'il vous plaît.', 'S\'il vous plaît, madame.'], ['S\'il te plaît.', 'Il vous plaît ?']),
  chunk('sil-te-plait', 'Fixed phrase: s\'il te plaît (please, informal)', ["s'", 'il', 'te', 'plait'],
    ['Donne-moi ça, s\'il te plaît.', 'S\'il te plaît, viens.'], ['S\'il vous plaît.', 'Il te plaît ?']),
  chunk('ca-va', 'Fixed phrase: ça va (how is it going; it is fine)', ['ca', 'va'],
    ['Ça va ?', 'Oui, ça va bien.'], ['Il va au café.', 'Ça marche.']),
  chunk('comment-ca-va', 'Fixed phrase: comment ça va ? (how are you?)', ['comment', 'ca', 'va'],
    ['Comment ça va ?', 'Bonjour Marie, comment ça va ?'], ['Ça va ?', 'Comment tu vas ?']),
  chunk('cest-ca', 'Fixed phrase: c\'est ça (that is right, that is it)', ["c'", 'est', 'ca'],
    ['Oui, c\'est ça.', 'C\'est ça !'], ['C\'est un chat.', 'J\'ai ça.']),
  chunk('au-revoir', 'Fixed phrase: au revoir (goodbye)', ['au', 'revoir'],
    ['Au revoir !', 'Au revoir, Paul.'], ['Je vais au café.', 'Je vais revoir Marie.']),
  chunk('bien-sur', 'Fixed phrase: bien sûr (of course)', ['bien', 'sur'],
    ['Bien sûr !', 'Oui, bien sûr.'], ['Je suis sûr.', 'Je vais bien.']),
  chunk('excusez-moi', 'Fixed phrase: excusez-moi / excuse-moi (excuse me)', ['excusez|excuse', { clitic: true, surface: '-moi' }],
    ['Excusez-moi, où est la gare ?', 'Excuse-moi !'], ['Regarde-moi.', 'Excusez Paul.']),
  chunk('quest-ce-que-cest', 'Fixed phrase: qu\'est-ce que c\'est ? (what is it?)', ["qu'", 'est', { clitic: true, surface: '-ce' }, 'que', "c'", 'est'],
    ['Qu\'est-ce que c\'est ?', 'Et ça, qu\'est-ce que c\'est ?'], ['Qu\'est-ce que tu veux ?', 'C\'est quoi ?'], ['q.quest-ce-que']),
  chunk('quelque-chose', 'Fixed phrase: quelque chose (something)', ['quelque', 'chose'],
    ['Je veux quelque chose.', 'Tu as quelque chose à manger ?'], ['C\'est une chose importante.', 'Quelques amis.']),
  chunk('je-ne-sais-pas', 'Fixed phrase: je ne sais pas (I don\'t know)', ['je', 'ne', 'sais', 'pas'],
    ['Je ne sais pas.', 'Je ne sais pas où il est.'], ['Je sais.', 'Tu ne sais pas ?'], ['neg.ne-pas']),
  chunk('tout-le-monde', 'Fixed phrase: tout le monde (everyone), with a singular verb', ['tout', 'le', 'monde'],
    ['Tout le monde sait ça.', 'Bonjour tout le monde !'], ['Le monde est grand.', 'Tout le temps.']),
  chunk('de-temps-en-temps', 'Fixed phrase: de temps en temps (from time to time)', ['de', 'temps', 'en', 'temps'],
    ['Je vais au cinéma de temps en temps.', 'De temps en temps, il pleut.'], ['J\'ai le temps.', 'De temps à autre.']),
  chunk('quelque-part', 'Fixed phrase: quelque part (somewhere)', ['quelque', 'part'],
    ['Il est quelque part.', 'Je vais quelque part.'], ['Il part demain.', 'Quelque chose.']),
  chunk('nulle-part', 'Fixed phrase: nulle part (nowhere)', ['nulle', 'part'],
    ['Je ne vais nulle part.', 'Il n\'est nulle part.'], ['Il part demain.', 'C\'est nul.']),
  chunk('en-fait', 'Fixed phrase: en fait (in fact, actually)', ['en', 'fait'],
    ['En fait, je ne sais pas.', 'Il est en fait très gentil.'], ['Il fait beau.', 'Je vais en France.']),
  chunk('parce-que', 'Fixed phrase: parce que (because)', ['parce', "que|qu'"],
    ['Je mange parce que j\'ai faim.', 'Parce qu\'il pleut.'], ['Je mange car j\'ai faim.', 'Je pense que oui.']),
  chunk('cest-a-dire', 'Fixed phrase: c\'est-à-dire (that is to say)', ["c'", 'est', 'a', 'dire'],
    ['C\'est-à-dire que je ne viens pas.', 'Demain, c\'est-à-dire samedi.'], ['C\'est difficile à dire.', 'Je veux dire ça.']),
  chunk('nest-ce-pas', 'Fixed phrase: n\'est-ce pas ? (isn\'t it?, right?)', ["n'", 'est', { clitic: true, surface: '-ce' }, 'pas'],
    ['C\'est beau, n\'est-ce pas ?', 'N\'est-ce pas vrai ?'], ['Ce n\'est pas vrai.', 'Est-ce vrai ?']),
  chunk('tout-a-coup', 'Fixed phrase: tout à coup (suddenly)', ['tout', 'a', 'coup'],
    ['Tout à coup, il pleut.', 'Et tout à coup, le chat tombe.'], ['Un coup de fil.', 'Tout à fait.']),
  chunk('a-cause-de', 'Fixed phrase: à cause de (because of)', ['a', 'cause', "de|d'|du|des"],
    ['Je reste à cause de la pluie.', 'C\'est à cause du froid.'], ['Pour quelle cause ?', 'Grâce à toi.']),
  chunk('grace-a', 'Fixed phrase: grâce à (thanks to)', ['grace', 'a|au|aux'],
    ['Grâce à toi, j\'ai réussi.', 'C\'est grâce au soleil.'], ['Merci à toi.', 'À cause de toi.']),
  chunk('on-y-va', 'Fixed phrase: on y va (let\'s go)', ['on', 'y', 'va'],
    ['On y va ?', 'Allez, on y va !'], ['On va au café.', 'Il y va.']),
  chunk('pendant-que', 'Fixed phrase: pendant que (while)', ['pendant', "que|qu'"],
    ['Je lis pendant que tu manges.', 'Pendant qu\'il dort, je travaille.'], ['Je lis pendant le film.', 'Je pense que oui.']),
  // ---- Fixed phrases taught whole before their general pattern
  chunk('je-voudrais', 'Fixed phrase: je voudrais (I would like), the polite request taught as a phrase before the conditionnel', ['je', 'voudrais'],
    ['Je voudrais un café, s\'il vous plaît.', 'Bonjour, je voudrais un livre.'], ['Je veux un café.', 'Tu voudrais du café ?', 'Je ne voudrais pas ça.']),
  chunk('vas-y', 'Fixed phrase: vas-y ! (go on!, go ahead!), taught as a phrase before the pronoun y', ['vas', { clitic: true, surface: '-y' }],
    ['Vas-y, mange !', 'Allez, vas-y !'], ['Tu vas à Paris.', 'On y va.', 'Va au parc.']),
  chunk('allons-y', 'Fixed phrase: allons-y ! (let\'s go!), taught as a phrase before the pronoun y', ['allons', { clitic: true, surface: '-y' }],
    ['Allons-y, les enfants !', 'Bon, allons-y !'], ['Nous allons au parc.', 'Allons au café.', 'Vas-y !']),
  // ---- Claims in exam and practice concept lists that had no construction
  node('si.present', 'Real condition si + present tense (si tu veux, si j\'ai le temps, je viens si tu veux); si after savoir, se demander, dire or a negation (je ne sais pas si) is an embedded question and does not count; s\'il vous plaît and s\'il te plaît are fixed phrases and do not count', [],
    [
      [{ start: true, surface: "si|s'" }, S(SUBJ + "|c'|ce"), opt(NE), opt(OBJ), { cell: 'prs.*', surface: '(?!plait$).+' }],
      [S('(?!(sais|sait|savons|savez|savent|savoir|su|demande|demandes|demandons|demandez|demandent|demander|demandais|demandait|dis|dit|disons|dites|disent|dire|-moi|-nous|-lui|-leur|me|te|se|pas)$).+'),
        S("si|s'"), S(SUBJ + "|c'|ce"), opt(NE), opt(OBJ), { cell: 'prs.*', surface: '(?!plait$).+' }],
    ],
    ['Si tu veux, on y va.', 'Si j\'ai le temps, je viens.', 'Je viens si tu veux.', 'Si c\'est possible, je pars demain.'],
    ['Si j\'étais riche, je voyagerais.', 'Je ne sais pas si tu viens.', 'Je me demande s\'il vient.', 'Il est si grand.']),
  node('relative.qui', 'Relative pronoun qui as the subject of a relative clause after a noun (optionally followed by up to two adjectives), a pronoun or a name (la personne qui parle, le livre rouge qui est ici, c\'est toi qui pars, le Café de Flore qui est en face); a reading passage is one text, so a name ending one sentence before a question starting with qui also matches', [],
    [
      [{ pos: 'noun', surface: '(?!(-?ce|est)$).+' }, opt(ADJ_STEP), opt(ADJ_STEP), S('qui'), opt(NE), opt(OBJ), opt(OBJ), VERB],
      [{ any: [S(REL_PRONOUN), { name: true }] }, S('qui'), opt(NE), opt(OBJ), opt(OBJ), VERB],
    ],
    ['La personne qui parle est mon amie.', 'C\'est toi qui pars.', 'J\'ai un ami qui habite à Paris.', 'Le livre rouge qui est ici est à moi.',
      'Nous allons au Café de Flore qui est en face du jardin.', 'Le restaurant Le Procope qui est derrière le cinéma est vieux.'],
    ['Qui parle ?', 'Qu\'est-ce qui brille ?', 'Qui est-ce qui vient ?', 'Avec qui ?', 'Qui est-ce que tu vois ?']),
  node('relative.que', 'Relative pronoun que (qu\') as the object of a relative clause after a noun (optionally followed by up to two adjectives), celui / celle / ceux / celles or a stressed pronoun (le livre que je cherche, le grand livre rouge que je cherche, celles qu\'on aime, c\'est toi que je vois); the subject after que must be a pronoun, so a noun subject (le livre que Paul cherche) is not counted; nouns that take a que clause (peur, idée, preuve, fait …) are left out, while a reported clause after a noun (il dit à sa mère que tu viens) still matches', [],
    [
      [{ pos: 'noun', surface: '(?!(' + QUE_CLAUSE_NOUNS + ')$).+' }, opt(ADJ_STEP), opt(ADJ_STEP), QUE, S(SUBJ)],
      [S('celui|celle|ceux|celles|moi|toi|lui|eux'), QUE, S(SUBJ)],
    ],
    ['Le livre que je cherche est ici.', 'La chose qu\'il veut est chère.', 'C\'est la ville que nous aimons.',
      'Ce sont celles qu\'on aime.', 'Le grand livre rouge que je cherche est ici.', 'Les meilleures journées sont celles qu\'on ne pense pas avoir.'],
    ['Je pense que tu viens.', 'Il est plus grand que moi.', 'Il faut que tu partes.', 'Qu\'est-ce que tu veux ?', 'J\'ai peur qu\'il parte.', 'Il est possible qu\'il vienne.']),
  node('relative.ou', 'Relative pronoun où after a noun of place or time, optionally followed by up to two adjectives (la ville où j\'habite, le jour où il est venu, ce quartier célèbre où les artistes ont vécu); in lenient text où and ou (or) fold together', [],
    [{ pos: 'noun', surface: '(?!(demande|est)$).+' }, opt(ADJ_STEP), opt(ADJ_STEP), { headword: 'fr:lex:ou.adverb' }, { any: [S(SUBJ), { pos: 'article' }, { pos: 'determiner' }] }],
    ['La ville où j\'habite est belle.', 'C\'est l\'endroit où je vais.', 'Le jour où il est venu, il pleuvait.', 'C\'est ce quartier célèbre où les artistes ont vécu.'],
    ['Où vas-tu ?', 'Tu es où ?', 'Le chat est où ?']),
  node('relative.dont', 'Relative pronoun dont (of which, whose, about which: la chose dont je parle)', [],
    [S('dont')],
    ['La chose dont je parle est importante.', 'Le livre dont tu as besoin est ici.'],
    ['Je parle de ça.', 'J\'ai besoin de ce livre.']),
  node('relative.ce-que', 'Headless relatives ce que (what, as object) and ce qui (what, as subject): je fais ce que je veux, ce qui est important', [],
    [S('ce'), S("que|qu'|qui")],
    ['Je fais ce que je veux.', 'Ce qui est important, c\'est la famille.', 'Dis-moi ce qu\'il fait.'],
    ['Qu\'est-ce que tu veux ?', 'Qu\'est-ce qui brille ?', 'Ce livre est bon.']),
  node('futur-anterieur', 'Futur antérieur: avoir or être in the futur simple + past participle (il aura fait, nous aurons parlé, elle sera partie)', ['futur-simple', 'passe-compose.avoir', 'passe-compose.etre'],
    [
      [{ headword: 'fr:lex:avoir', cell: 'fut.*' }, ...AUX_TAIL, PTCP],
      [{ headword: 'fr:lex:etre', cell: 'fut.*' }, ...AUX_TAIL, ETRE_PTCP],
    ],
    ['Il aura fini demain.', 'Nous aurons parlé avant le dîner.', 'Elle sera partie à midi.'],
    ['Il aura faim.', 'Il a fini.', 'Elle sera contente.']),
  node('passive', 'Passive voice: être + past participle of a verb that is not an être verb (je suis aimé, la maison est construite, il a été compris); participles used as everyday adjectives (fatigué, occupé, surpris, marié, assis …) do not count; nous and vous count as subjects only at the start of a sentence, so the reflexive nous nous sommes levés is not read as passive', ['fr:lex:etre', 'passe-compose.etre'],
    [
      [{ any: [S("je|j'|tu|il|elle|on|ils|elles"), { pos: 'noun' }] }, opt(NE), { headword: 'fr:lex:etre' }, ...AUX_TAIL, PASSIVE_PTCP],
      [{ start: true, surface: 'nous|vous' }, opt(NE), { headword: 'fr:lex:etre' }, ...AUX_TAIL, PASSIVE_PTCP],
      [{ headword: 'fr:lex:avoir' }, opt(ADV), S('ete'), opt(ADV), PASSIVE_PTCP],
    ],
    ['Je suis aimé.', 'La maison est construite par mon père.', 'Nous sommes aidés.', 'Il a été compris.'],
    ['Je suis allé au café.', 'Je me suis lavé.', 'Nous nous sommes levés.', 'Je suis fatigué.', 'Elle a mangé.']),
];

checkLevels(C.map((c) => c.id));
const out = C.sort((a, b) => a.id.localeCompare(b.id));
writeSortedJson(join(REPO, 'curriculum-graph/languages/fr/constructions.json'), out);
console.log(`wrote ${out.length} constructions (${out.filter((c) => c.detect).length} with detectors)${STUB ? ' [STUB]' : ''}`);
