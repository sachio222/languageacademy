// Adds the general-course French words a learner needs at A1, A2 and B1 that the course word list lacked, so the
// core lists in curriculum-graph/core/levels/ can name them. No lesson teaches most of them yet; that gap is what
// the level coverage report shows. Each word gets its level here; paradigms follow the existing entries of the same
// kind, and dictionaryId is the app dictionary key when src/data/dictionary/words/cambridge/ has one.
// Candidates were the 3,000 most frequent lemmas of Lexique 3.83 and the Eaquals vocabulary themes, each judged by
// hand; proper nouns (and pierre, which course-map.mjs treats as the name Pierre), slang, vulgar words, words only literature or war films need, and closed-class words the graph
// already covers (sa, cette, quelques …) were left out. So were French words the checker uses as signs of English
// text (ours, four, article, futur, note and noter; see ENGLISH_ONLY in french-text.mjs) and livrer, whose present livre
// would read the noun livre as a verb. Nouns spelled like a form of a verb already in the list and read that way
// in vocabulary tables (reste, souffle, commande, allée, and doute, which made je doute qu'elle read as a
// relative clause) are left out too, and so are montre, which
// would take over the imperative montre-moi, and English-spelled cognates that course labels use as English (action,
// communication, direct, double, expression, instant, normal, opinion, respect, sensation, social, solution, usage,
// composer for Passé Composé, and doubler for hints such as double n). No frequency value is recorded here.
// Source of truth: headwords.json. Entries already present are skipped, so running it again changes nothing; add or
// change words by editing headwords.json.
// Usage: node scripts/graph/fr/build/core-words.mjs   (run after add-words.mjs)
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { writeSortedJson } from '../../write-json.mjs';
import { fold } from '../../fold.mjs';
import { FR_DIR as DIR, REPO } from './lib.mjs';

const SOURCE = { F: 'agent: frequency + Eaquals', G: 'agent: Eaquals grammar' };

// level -> pos -> words. "_" stands for a space. A word followed by "/G" was placed by the Eaquals grammar lists.
const WORDS = {
  A1: {
    noun: `monsieur mademoiselle accord bras verre mari bouche doigt jambe salle bureau dos journal dîner oreille oncle nez
      village bébé robe exemple médecin église bateau avion dent tante ventre animal déjeuner cadeau mètre poste
      grand-père grand-mère cousin bouteille course vêtement billet rendez-vous montagne étage chapeau centre salon métier
      plage repas valise couteau taxi théâtre lunettes quart veste  élève kilomètre dessin saison lycée soupe minuit
      soif félicitations prénom tasse appétit kilo moto aéroport crayon ordinateur piscine ticket chaussette canapé cahier
      exercice demi-heure vélo jupe douche bibliothèque copain assiette boulangerie pharmacie supermarché fourchette
      cuillère petit-déjeuner carotte oignon fraise citron poire raisin jambon confiture yaourt pull écharpe stylo gomme
      vendeur météo euro litre tennis onze douze treize quatorze seize`,
    verb: `passer écrire fermer répondre choisir accepter oublier envoyer chanter danser inviter téléphoner présenter coucher
      réserver compter épeler répéter remercier souhaiter féliciter refuser traverser détester désirer confirmer offrir
      neiger doucher dessiner`,
    adjective: `noir gris violet blond seul gros haut joli facile libre prochain simple court intelligent sympa américain
      allemand espagnol italien japonais russe belge suisse canadien chinois deuxième troisième quatrième préféré enchanté
      demi`,
    adverb: `bientôt/G longtemps volontiers`,
    interjection: `allô bravo`,
  },
  A2: {
    noun: `air feu amour affaire guerre  façon fond silence bois chef mur jeu police chemin passé présent papier épaule
      cheval bord retour roi peau patron image forme faute mariage seconde plan bonheur groupe joie boîte cour balle
      contraire ferme avis voisin goût visite départ moitié genou escalier cigarette camarade erreur appel conseil objet
      feuille douleur île choix équipe morceau champ message cou bain chaleur page joue avance avocat forêt santé toit
       enfance danger contact paquet chanson vol règle spectacle bar lune maladie sable directeur poids tort dommage
      arrivée fauteuil taille nombre gorge aventure amitié roman vache couple secours camion port caisse costume 
      arrêt rideau immeuble différence queue trottoir vitesse résultat ouvrier chaîne couverture appareil 
      liste parfum blague  usine cuir drap reine miroir boule os chauffeur club qualité quai danse repos cave excuse
      réunion alcool niveau caractère arabe tapis maîtresse infirmier explication marque paysage botte bouton meuble série
      nourriture disque boutique marchand invité secrétaire barbe écrivain promenade adulte policier collègue lecture poule
      fleuve fièvre champagne cochon journaliste avenue bâtiment texte activité ménage concert gant pilote huile serviette
      chiffre séjour emploi identité instrument moustache ceinture drapeau souris joueur monnaie pêche placard dizaine
      armoire poupée piano paire médicament ballon océan bagage lion canard serpent crème bague orage cravate comédie chou
      tiroir ascenseur balcon champion  écriture studio degré panier danseur courrier casquette bougie brouillard
      matinée réveil écran jouet bouquet jumeau mouchoir mouton carnet casque passager  poubelle émission oreiller
      tente cirque bol  congé cuisinier rock permis adolescent chèque renseignement bijou chanteur document guide pause
      collier panneau ambulance portefeuille salaire bonbon musicien propos ingénieur coiffeur facteur boulanger
      informatique mathématiques géographie nièce neveu épicerie boucherie gramme tranche centime passeport ski randonnée
      guitare magazine courriel portable rhume grippe stade température réfrigérateur vidéo`,
    verb: `laisser arrêter mourir sentir tenir sembler porter rire servir garder quitter occuper retourner jeter raconter
      rappeler toucher reprendre manquer espérer imaginer prier recevoir emmener reconnaître apporter bouger crier pleurer
      frapper conduire vendre avancer promettre marier amener inquiéter intéresser casser enlever tromper terminer mentir
      installer rejoindre rouler accompagner réfléchir proposer fumer reposer respirer durer allumer déranger recommencer
      attraper sonner partager signer vérifier prêter repartir remplir promener éteindre taper inventer ranger ennuyer
      endormir apprécier ramasser interdire attacher peindre déposer signifier plaisanter planter remplacer prononcer
      grandir conseiller vider refaire organiser goûter indiquer échanger louer  fâcher décrire avertir inscrire
      baigner disputer décrocher raccrocher fêter comparer coiffer traduire dépenser garer renseigner déménager cuire
      contacter bavarder recommander entraîner ajouter deviner`,
    adjective: `plein fou pauvre général propre ancien drôle bête impossible faux sale vide calme doux sérieux lourd tranquille
      amoureux  bizarre léger sec terrible ouvert large énorme fier inutile dangereux rond nécessaire merveilleux
      malheureux exact  incroyable curieux unique spécial mince méchant stupide responsable nombreux mignon charmant
      horrible brun superbe formidable joyeux inquiet agréable extraordinaire  géant professionnel roux pratique
      aimable absent amusant compliqué fantastique timide original courageux âgé grec britannique portugais polonais indien
      complet laid  idiot`,
    adverb: `assez/G plutôt surtout tellement exactement doucement debout absolument justement dedans parfaitement évidemment
      là-haut immédiatement heureusement malheureusement directement quelquefois/G`,
  },
  B1: {
    noun: `mort point peine type sang force cas regard  ordre sorte  genre esprit état arme travers geste effet
      maître parole ombre rapport lèvre  armée impression odeur signe ennemi soldat sentiment manière mouvement
      président courant prison cri arrière front passage trou sol honte loi présence larme intérêt liberté hasard compagnie
      colère occasion mesure fil désir parti agent  victime sécurité fer bande malheur crime détail trace soin foule
      condition société pitié mission ennui importance opération recherche poitrine désert adieu héros dossier terrain
       prisonnier conscience voie décision toile ministre existence volonté passion membre témoin figure destin
      meurtre intention patte risque trait personnage horreur somme acte jeunesse événement folie titre époux ange juge
      souci autorité bataille chasse veille voleur patient sort base branche défense poussière compagnon croix crise
      absence miracle flamme  victoire monstre violence hauteur terme justice prêtre attaque paysan mensonge zone
      source succès discours piste univers vitre cerveau goutte moteur uniforme génie solitude humeur attente puissance
      palais fumée presse siège élément corde douceur angoisse rang contrôle émotion haine fortune trésor fantôme rayon abri
      cuisse talent colline gardien millier portrait circonstance limite surface retraite enquête mystère style choc 
      pot tendresse modèle souffrance charme imagination urgence cercle cimetière horizon frontière origine loup fiancé
       menace blessure lien perte principe matériel manche carrière drogue promesse chagrin plateau mouche révolution
      centaine angle résistance épreuve carré boue curiosité faveur contrat masque domaine bêtise période crainte marin
      menton illusion chute rythme code responsabilité apparence récit misère ongle difficulté auteur échange gaz sommet
      coude linge roue patience  cauchemar fuite piège assurance essence caméra  statue tristesse atelier
      manque paradis talon carton plafond nerf fonction religion régime métal pression poète singe échec tabac gendarme
      ruine réaction rocher prétexte défaut inquiétude avantage cadre désordre concours intelligence cheminée menteur séance
      cabine drame cérémonie estomac luxe merveille aîné critique conséquence aspect langage décor tenue pile sourcil accès
      incident tissu poignet instruction instinct pouce certitude explosion chapitre découverte évidence jugement conviction
      atmosphère équilibre comptoir muscle vœu commerce photographie vallée satisfaction progrès assistant légende éducation
      théorie individu entretien catastrophe vente précaution offre outil ouverture  réflexion véhicule revue
      réputation traitement partenaire laine collection proposition grève protection incendie plastique maire conférence
      ambition poésie agence vitrine exception annonce copie administration nécessité opéra hôte étape objectif expert
      dette règlement maximum`,
    verb: `tuer tirer paraître agir valoir suffire battre disparaître remettre sauver approcher taire empêcher ramener apercevoir
      ignorer glisser lâcher serrer lancer cesser oser abandonner mener assurer souffrir jurer échapper craindre remarquer
      couvrir retenir charger brûler calmer tenter apparaître prévenir risquer obliger éviter arranger emporter annoncer
      atteindre pardonner supposer baisser supporter retirer détruire épouser séparer éloigner traiter fixer appartenir
      poursuivre étonner attaquer défendre obtenir couler appuyer engager diriger observer coller avouer élever placer
      prévoir fuir juger hésiter mériter accrocher former ressentir écraser marquer éclater  prouver forcer régler
      surveiller soulever entourer secouer représenter étendre causer murmurer allonger considérer songer plaindre gêner
      adresser enfermer trembler posséder libérer presser chasser hurler moquer dépasser reculer accorder rapporter
      produire plonger interroger nourrir briser piquer déclarer convenir confier débarrasser admettre insister nommer
      récupérer réaliser croiser achever éclairer convaincre prétendre transformer enfuir exprimer menacer imposer renvoyer
      avaler effacer respecter réunir parier rassurer exiger rompre mordre révéler accuser interrompre survivre haïr
      résister obéir soigner creuser contenir trahir fabriquer distinguer accueillir céder verser évoquer établir subir
      franchir provoquer contrôler fournir déchirer affirmer joindre conclure réduire habituer résoudre exploser rattraper
      énerver parcourir guérir lutter raser inspirer rejeter réclamer conserver confondre constater détendre rechercher
      débrouiller mesurer essuyer appliquer employer démarrer reprocher plier renverser transporter méfier emprunter punir
      bloquer  informer estimer concentrer intervenir préciser identifier réagir imiter fondre signaler publier
      décevoir consulter suggérer vieillir justifier chauffer échouer autoriser dérouler augmenter fréquenter exagérer
      transmettre impressionner envisager protester ralentir manifester enregistrer situer adopter loger citer filmer bâtir
      correspondre développer circuler décoller geler prolonger animer cueillir distribuer consister réchauffer éliminer
      `,
    adjective: `humain vivant moyen intérieur sombre capable étrange militaire inconnu pur commun national vif naturel immense
      ridicule immobile rare divers particulier sacré faible aveugle coupable sauvage innocent épais précis puissant
      supérieur malin brillant principal égal nerveux silencieux réel étroit  véritable sourd fidèle honnête vaste
      affreux violent jaloux total ordinaire physique moral furieux incapable mystérieux privé minuscule solide fameux gras
      cruel évident central précieux délicat idéal fragile religieux officiel prudent local électrique habituel technique
      régulier raisonnable étonnant discret urgent familial généreux précédent lumineux logique sain élégant médical chic
      amer final attentif modeste sincère pénible définitif scientifique sévère enceinte personnel bref`,
    adverb: `tant pourtant/G ailleurs/G autant/G environ/G autrefois/G aussitôt/G désormais davantage brusquement lors
      autrement naturellement apparemment légèrement franchement entièrement totalement particulièrement forcément
      uniquement suffisamment réellement certes toutefois/G`,
    preposition: `malgré/G dès/G selon sauf hors durant auprès`,
    conjunction: `lorsque sinon cependant/G ni/G tandis_que/G`,
    determiner: `aucun/G tel`,
  },
};

const ER = ['fr:cx:verb.er.present', 'fr:cx:ptcp.er', 'fr:cx:verb.er.impf', 'fr:cx:verb.future',
  'fr:cx:verb.conditional', 'fr:cx:verb.er.subjunctive', 'fr:cx:prsptcp.er'];
const IR = ['fr:cx:verb.ir.present', 'fr:cx:ptcp.ir', 'fr:cx:verb.ir.impf', 'fr:cx:verb.future',
  'fr:cx:verb.conditional', 'fr:cx:verb.ir.subjunctive', 'fr:cx:prsptcp.ir'];
const RE = ['fr:cx:verb.re.present', 'fr:cx:ptcp.re', 'fr:cx:verb.re.impf', 'fr:cx:verb.future',
  'fr:cx:verb.conditional', 'fr:cx:verb.re.subjunctive', 'fr:cx:prsptcp.re'];
const FUT = ['fr:cx:verb.future', 'fr:cx:verb.conditional'];
const set = (s) => new Set(s.split(/\s+/).filter(Boolean));
// Regular -ir verbs like finir and -re verbs like attendre.
const IR_VERBS = set(`choisir réfléchir remplir grandir agir nourrir obéir guérir punir trahir établir fournir subir franchir
  bâtir ralentir réunir vieillir`);
const RE_VERBS = set(`répondre vendre défendre étendre fondre confondre correspondre`);
// Irregular verbs whose future is built on the infinitive (écrire, j'écrirai); the other cells are irregular forms,
// not listed yet.
const FUT_VERBS = set(`écrire décrire inscrire offrir couvrir souffrir servir sentir ressentir mentir conduire produire traduire
  réduire détruire suffire rire taire paraître apparaître disparaître reconnaître promettre remettre admettre transmettre
  battre rompre interrompre joindre rejoindre craindre plaindre peindre éteindre atteindre convaincre résoudre conclure
  poursuivre survivre fuir enfuir haïr cuire interdire reprendre repartir prévoir`);
// -yer verbs change y to i before a silent e (j'appuie) and envoyer has an irregular future (j'enverrai), so they
// take only the cells the regular -er patterns build correctly.
const ER_PARTIAL = ['fr:cx:ptcp.er', 'fr:cx:verb.er.impf', 'fr:cx:prsptcp.er'];
// Nouns and adjectives whose plural or feminine no paradigm builds.
// avion, cour, fil and somme lose their plural, whose spelling is already a form in the list (avions, cours, fils,
// sommes); vif loses its feminine vive (vivre).
const PLAIN_NOUNS = set(`lunettes félicitations travail avion cour fil somme`);
const X_NOUNS = set(`bijou genou chou`);
const PLAIN_ADJECTIVES = set(`gros fou doux faux frais sec grec bas gras épais jaloux roux complet inquiet discret bref malin
  chic sympa demi vif`);
// -er verbs whose present, past participle and subjunctive are spelled like a noun or adjective already in the list
// (la porte, la place, la gare, prête, and the name Marie): they take only the cells that do not, so course text keeps its reading.
const NO_PRESENT = set(`adresser causer compter durer fêter garder garer marier neiger occuper placer planter porter prêter
  téléphoner`);
const NO_PRESENT_CELLS = ['fr:cx:verb.er.impf', 'fr:cx:verb.future', 'fr:cx:verb.conditional', 'fr:cx:prsptcp.er'];

function paradigms(lemma, pos) {
  if (pos === 'verb') {
    if (lemma.endsWith('yer')) return ER_PARTIAL;
    if (NO_PRESENT.has(lemma)) return NO_PRESENT_CELLS;
    if (lemma === 'intéresser') return ER.filter((p) => p !== 'fr:cx:prsptcp.er'); // intéressant is an adjective in the list
    if (IR_VERBS.has(lemma)) return IR;
    if (RE_VERBS.has(lemma)) return RE;
    if (FUT_VERBS.has(lemma)) return FUT;
    return lemma.endsWith('er') ? ER : [];
  }
  if (pos === 'noun') {
    if (PLAIN_NOUNS.has(lemma) || /[sxz]$/.test(lemma) || lemma.includes(' ')) return [];
    if (/^(onze|douze|treize|quatorze|seize)$/.test(lemma)) return [];
    if (X_NOUNS.has(lemma) || /(eau|au|eu)$/.test(lemma)) return ['fr:cx:noun.plural.x'];
    if (/al$/.test(lemma)) return ['fr:cx:noun.plural.al'];
    return ['fr:cx:noun.plural'];
  }
  if (pos === 'adjective') {
    if (PLAIN_ADJECTIVES.has(lemma)) return [];
    if (/e$/.test(lemma)) return ['fr:cx:adj.e'];
    if (/al$/.test(lemma)) return ['fr:cx:adj.al'];
    if (/eux$/.test(lemma)) return ['fr:cx:adj.eux'];
    if (/if$/.test(lemma)) return ['fr:cx:adj.if'];
    if (/er$/.test(lemma)) return ['fr:cx:adj.er'];
    if (/s$/.test(lemma)) return ['fr:cx:adj.s'];
    if (/(el|eil|en|on|et)$/.test(lemma)) return ['fr:cx:adj.double'];
    return ['fr:cx:adj.regular'];
  }
  return [];
}

// Keys of the app dictionary (live files only, not backups).
const dictDir = join(REPO, 'src/data/dictionary/words/cambridge');
const dictionary = new Set();
for (const f of readdirSync(dictDir).filter((n) => n.endsWith('.js'))) {
  for (const m of readFileSync(join(dictDir, f), 'utf8').matchAll(/id: "([^"]+)"/g)) dictionary.add(m[1]);
}

const headwords = JSON.parse(readFileSync(join(DIR, 'headwords.json'), 'utf8'));
const byId = new Map(headwords.map((h) => [h.id, h]));
const keyOf = (lemma) => fold(lemma).replace(/[\s']+/g, '-');
let added = 0;
const renamed = [];
const listed = new Set();
for (const [level, groups] of Object.entries(WORDS)) {
  for (const [pos, list] of Object.entries(groups)) {
    for (const raw of list.split(/\s+/).filter(Boolean)) {
      const [word, mark] = raw.split('/');
      const lemma = word.replace(/_/g, ' ');
      if (listed.has(`${lemma}|${pos}`)) throw new Error(`core-words: ${lemma} (${pos}) is listed twice`);
      listed.add(`${lemma}|${pos}`);
      let id = `fr:lex:${keyOf(lemma)}`;
      const same = headwords.find((h) => h.lemma === lemma && h.pos === pos);
      if (same) continue; // already in the word list
      if (byId.has(id)) {
        id = `${id}.${pos}`;
        renamed.push(`${lemma} -> ${id}`);
        if (byId.has(id)) continue;
      }
      const h = {
        cefr: level,
        cefrSource: SOURCE[mark ?? 'F'],
        dictionaryId: dictionary.has(`${lemma}-fr`) ? `${lemma}-fr` : null,
        id,
        lemma,
        paradigms: paradigms(lemma, pos),
        pos,
        senses: [],
      };
      headwords.push(h);
      byId.set(id, h);
      added += 1;
    }
  }
}
headwords.sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
writeSortedJson(join(DIR, 'headwords.json'), headwords);
console.log(`core-words: ${added} headwords added${renamed.length ? `; IDs with a part of speech: ${renamed.join(', ')}` : ''}`);
