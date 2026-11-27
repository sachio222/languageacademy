// Adds the general-course French words a learner needs at A1, A2 and B1 that the course word list lacked, so the
// core lists in curriculum-graph/core/levels/ can name them. No lesson teaches most of them yet; that gap is what
// the level coverage report shows. Each word gets its level here; paradigms follow the existing entries of the same
// kind, and dictionaryId is the app dictionary key when src/data/dictionary/words/cambridge/ has one. The -er verbs
// also get irregular forms for their spelling changes (rangeons, jette, mène), as manger and appeler have.
// Candidates were the 3,000 most frequent lemmas of Lexique 3.83 and the Eaquals vocabulary themes, each judged by
// hand. The lists below are in alphabetical order and record no frequency value or rank.
// Left out: proper nouns (and pierre, which course-map.mjs treats as the name Pierre), slang, vulgar words, words
// only literature or war films need, and closed-class words the graph already covers (sa, cette, quelques …). Also
// left out, because adding them would change how the checker reads course text:
// - French words the checker uses as signs of English text (ours, four, article, futur, note and noter; see
//   ENGLISH_ONLY in fr/text.mjs);
// - livrer, whose present livre would read the noun livre as a verb;
// - nouns spelled like a form of a verb already in the list and read that way in vocabulary tables (reste, souffle,
//   commande, allée) or by a detector (doute made je doute qu'elle read as a relative clause);
// - English-spelled cognates that course labels use as English (action, communication, direct, double, expression,
//   instant, normal, opinion, respect, sensation, social, solution, usage, composer for Passé Composé, and doubler
//   for hints such as double n).
// montre is in although the checker then reads the imperative montre-moi as the noun.
// Source of truth: headwords.json and forms.json. Entries already present are skipped, so running it again changes
// nothing; add or change words by editing the JSON files.
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
    noun: `accord aéroport animal appétit assiette avion bateau bébé bibliothèque billet bouche boulangerie
      bouteille bras bureau cadeau cahier canapé carotte centre chapeau chaussette citron confiture copain course cousin
      couteau crayon cuillère déjeuner demi-heure dent dessin dîner doigt dos douche douze écharpe église élève étage
      euro exemple exercice félicitations fourchette fraise gomme grand-mère grand-père jambe jambon journal jupe kilo
      kilomètre litre lunettes lycée mademoiselle mari médecin météo métier mètre minuit monsieur montagne montre moto
      nez oignon oncle onze ordinateur oreille petit-déjeuner pharmacie piscine plage poire poste prénom pull quart
      quatorze raisin rendez-vous repas robe saison salle salon seize soif soupe stylo supermarché tante tasse taxi
      tennis théâtre ticket treize valise vélo vendeur ventre verre veste vêtement village yaourt`,
    verb: `accepter chanter choisir compter confirmer coucher danser désirer dessiner détester doucher écrire
      envoyer épeler féliciter fermer inviter neiger offrir oublier passer présenter refuser remercier répéter répondre
      réserver souhaiter téléphoner traverser`,
    adjective: `allemand américain belge blond canadien chinois court demi deuxième enchanté espagnol facile gris
      gros haut intelligent italien japonais joli libre noir préféré prochain quatrième russe seul simple suisse sympa
      troisième violet`,
    adverb: `bientôt/G longtemps volontiers`,
    interjection: `allô bravo`,
  },
  A2: {
    noun: `activité adolescent adulte affaire air alcool ambulance amitié amour appareil appel arabe armoire
      arrêt arrivée ascenseur avance aventure avenue avis avocat bagage bague bain balcon balle ballon bar barbe
      bâtiment bijou blague bois boîte bol bonbon bonheur bord botte boucherie bougie boulanger boule bouquet boutique
      bouton brouillard caisse camarade camion canard caractère carnet casque casquette cave ceinture centime chaîne
      chaleur champ champagne champion chanson chanteur chauffeur chef chemin chèque cheval chiffre choix chou cigarette
      cirque club cochon coiffeur collègue collier comédie concert congé conseil contact contraire costume cou couple
      cour courriel courrier couverture cravate crème cuir cuisinier danger danse danseur degré départ différence
      directeur disque dizaine document dommage douleur drap drapeau écran écriture écrivain émission emploi enfance
      épaule épicerie équipe erreur escalier excuse explication façon facteur faute fauteuil ferme feu feuille fièvre
      fleuve fond forêt forme gant genou géographie gorge goût gramme grippe groupe guerre guide guitare huile identité
      île image immeuble infirmier informatique ingénieur instrument invité jeu joie joue jouet joueur journaliste
      jumeau lecture lion liste lune magazine maîtresse maladie marchand mariage marque mathématiques matinée médicament
      ménage message meuble miroir moitié monnaie morceau mouchoir moustache mouton mur musicien neveu nièce niveau
      nombre nourriture objet océan orage oreiller os ouvrier page paire panier panneau papier paquet parfum passager
      passé passeport patron pause paysage peau pêche permis piano pilote placard plan poids police policier port
      portable portefeuille poubelle poule poupée présent promenade propos quai qualité queue randonnée réfrigérateur
      règle reine renseignement repos résultat retour réunion réveil rhume rideau rock roi roman sable salaire santé
      seconde secours secrétaire séjour série serpent serviette silence ski souris spectacle stade studio taille tapis
      température tente texte tiroir toit tort tranche trottoir usine vache vidéo visite vitesse voisin vol`,
    verb: `accompagner ajouter allumer amener apporter apprécier arrêter attacher attraper avancer avertir
      baigner bavarder bouger casser coiffer comparer conduire conseiller contacter crier cuire décrire décrocher
      déménager dépenser déposer déranger deviner disputer durer échanger emmener endormir enlever ennuyer entraîner
      espérer éteindre fâcher fêter frapper fumer garder garer goûter grandir imaginer indiquer inquiéter inscrire
      installer interdire intéresser inventer jeter laisser louer manquer marier mentir mourir occuper organiser
      partager peindre plaisanter planter pleurer porter prêter prier promener promettre prononcer proposer quitter
      raccrocher raconter ramasser ranger rappeler recevoir recommander recommencer reconnaître refaire réfléchir
      rejoindre remplacer remplir renseigner repartir reposer reprendre respirer retourner rire rouler sembler sentir
      servir signer signifier sonner taper tenir terminer toucher traduire tromper vendre vérifier vider`,
    adjective: `absent âgé agréable aimable amoureux amusant ancien bête bizarre britannique brun calme charmant
      complet compliqué courageux curieux dangereux doux drôle énorme exact extraordinaire fantastique faux fier
      formidable fou géant général grec horrible idiot impossible incroyable indien inquiet inutile joyeux laid large
      léger lourd malheureux méchant merveilleux mignon mince nécessaire nombreux original ouvert pauvre plein polonais
      portugais pratique professionnel propre responsable rond roux sale sec sérieux spécial stupide superbe terrible
      timide tranquille unique vide`,
    adverb: `absolument assez/G debout dedans directement doucement évidemment exactement heureusement
      immédiatement justement là-haut malheureusement parfaitement plutôt quelquefois/G surtout tellement`,
  },
  B1: {
    noun: `abri absence accès acte adieu administration agence agent aîné ambition ange angle angoisse annonce
      apparence arme armée arrière aspect assistant assurance atelier atmosphère attaque attente auteur autorité
      avantage bande base bataille bêtise blessure boue branche cabine cadre caméra carré carrière carton cas
      catastrophe cauchemar centaine cercle cérémonie certitude cerveau chagrin chapitre charme chasse cheminée choc
      chute cimetière circonstance code colère collection colline commerce compagnie compagnon comptoir concours
      condition conférence conscience conséquence contrat contrôle conviction copie corde coude courant crainte cri
      crime crise critique croix cuisse curiosité décision décor découverte défaut défense désert désir désordre destin
      détail dette difficulté discours domaine dossier douceur drame drogue échange échec éducation effet élément
      émotion ennemi ennui enquête entretien époux épreuve équilibre esprit essence estomac étape état événement
      évidence exception existence expert explosion fantôme faveur fer fiancé figure fil flamme folie fonction force
      fortune foule front frontière fuite fumée gardien gaz gendarme génie genre geste goutte grève haine hasard hauteur
      héros honte horizon horreur hôte humeur illusion imagination importance impression incendie incident individu
      inquiétude instinct instruction intelligence intention intérêt jeunesse juge jugement justice laine langage larme
      légende lèvre liberté lien limite linge loi loup luxe maire maître malheur manche manière manque marin masque
      matériel maximum membre menace mensonge menteur menton merveille mesure métal meurtre millier ministre miracle
      misère mission modèle monstre mort moteur mouche mouvement muscle mystère nécessité nerf objectif occasion odeur
      offre ombre ongle opéra opération ordre origine outil ouverture palais paradis parole partenaire parti passage
      passion patience patient patte paysan peine période personnage perte photographie piège pile piste pitié plafond
      plastique plateau poésie poète poignet point poitrine portrait pot pouce poussière précaution présence président
      presse pression prétexte prêtre principe prison prisonnier progrès promesse proposition protection puissance rang
      rapport rayon réaction recherche récit réflexion regard régime règlement religion réputation résistance
      responsabilité retraite révolution revue risque rocher roue ruine rythme sang satisfaction séance sécurité
      sentiment siège signe singe société soin sol soldat solitude somme sommet sort sorte souci souffrance source
      sourcil statue style succès surface tabac talent talon témoin tendresse tenue terme terrain théorie tissu titre
      toile trace trait traitement travers trésor tristesse trou type uniforme univers urgence vallée véhicule veille
      vente victime victoire violence vitre vitrine vœu voie voleur volonté zone`,
    verb: `abandonner accorder accrocher accueillir accuser achever admettre adopter adresser affirmer agir
      allonger animer annoncer apercevoir apparaître appartenir appliquer approcher appuyer arranger assurer attaquer
      atteindre augmenter autoriser avaler avouer baisser bâtir battre bloquer briser brûler calmer causer céder cesser
      charger chasser chauffer circuler citer coller concentrer conclure confier confondre conserver considérer
      consister constater consulter contenir contrôler convaincre convenir correspondre couler couvrir craindre creuser
      croiser cueillir débarrasser débrouiller décevoir déchirer déclarer décoller défendre démarrer dépasser dérouler
      détendre détruire développer diriger disparaître distinguer distribuer échapper échouer éclairer éclater écraser
      effacer élever éliminer éloigner empêcher employer emporter emprunter énerver enfermer enfuir engager enregistrer
      entourer envisager épouser essuyer estimer établir étendre étonner éviter évoquer exagérer exiger exploser
      exprimer fabriquer filmer fixer fondre forcer former fournir franchir fréquenter fuir geler gêner glisser guérir
      habituer haïr hésiter hurler identifier ignorer imiter imposer impressionner informer insister inspirer interroger
      interrompre intervenir joindre juger jurer justifier lâcher lancer libérer loger lutter manifester marquer méfier
      menacer mener mériter mesurer moquer mordre murmurer nommer nourrir obéir obliger observer obtenir oser paraître
      parcourir pardonner parier piquer placer plaindre plier plonger posséder poursuivre préciser presser prétendre
      prévenir prévoir produire prolonger protester prouver provoquer publier punir ralentir ramener rapporter raser
      rassurer rattraper réagir réaliser réchauffer rechercher réclamer reculer récupérer réduire régler rejeter
      remarquer remettre renverser renvoyer représenter reprocher résister résoudre respecter ressentir retenir retirer
      réunir révéler risquer rompre sauver secouer séparer serrer signaler situer soigner songer souffrir soulever subir
      suffire suggérer supporter supposer surveiller survivre taire tenter tirer trahir traiter transformer transmettre
      transporter trembler tuer valoir verser vieillir`,
    adjective: `affreux amer attentif aveugle bref brillant capable central chic commun coupable cruel définitif
      délicat discret divers égal électrique élégant enceinte épais étonnant étrange étroit évident faible fameux
      familial fidèle final fragile furieux généreux gras habituel honnête humain idéal immense immobile incapable
      inconnu innocent intérieur jaloux local logique lumineux malin médical militaire minuscule modeste moral moyen
      mystérieux national naturel nerveux officiel ordinaire particulier pénible personnel physique précédent précieux
      précis principal privé prudent puissant pur raisonnable rare réel régulier religieux ridicule sacré sain sauvage
      scientifique sévère silencieux sincère solide sombre sourd supérieur technique total urgent vaste véritable vif
      violent vivant`,
    adverb: `ailleurs/G apparemment aussitôt/G autant/G autrefois/G autrement brusquement certes davantage
      désormais entièrement environ/G forcément franchement légèrement lors naturellement particulièrement pourtant/G
      réellement suffisamment tant totalement toutefois/G uniquement`,
    preposition: `auprès dès/G durant hors malgré/G sauf selon`,
    conjunction: `cependant/G lorsque ni/G sinon tandis_que/G`,
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
const IR_VERBS = set(`agir bâtir choisir établir fournir franchir grandir guérir nourrir obéir punir ralentir
  réfléchir remplir réunir subir trahir vieillir`);
const RE_VERBS = set(`confondre correspondre défendre étendre fondre répondre vendre`);
// Irregular verbs whose future is built on the infinitive (écrire, j'écrirai); the other cells are irregular forms,
// not listed yet.
const FUT_VERBS = set(`admettre apparaître atteindre battre conclure conduire convaincre couvrir craindre cuire
  décrire détruire disparaître écrire enfuir éteindre fuir haïr inscrire interdire interrompre joindre mentir offrir
  paraître peindre plaindre poursuivre prévoir produire promettre reconnaître réduire rejoindre remettre repartir
  reprendre résoudre ressentir rire rompre sentir servir souffrir suffire survivre taire traduire transmettre`);
// -yer verbs change y to i before a silent e (j'appuie) and envoyer has an irregular future (j'enverrai), so they
// take only the cells the regular -er patterns build correctly.
const ER_PARTIAL = ['fr:cx:ptcp.er', 'fr:cx:verb.er.impf', 'fr:cx:prsptcp.er'];
// Nouns and adjectives whose plural or feminine no paradigm builds.
// avion, cour, fil and somme lose their plural, whose spelling is already a form in the list (avions, cours, fils,
// sommes); vif loses its feminine vive (vivre).
const PLAIN_NOUNS = set(`avion cour félicitations fil lunettes somme travail`);
const X_NOUNS = set(`bijou chou genou`);
const PLAIN_ADJECTIVES = set(`bas bref chic complet demi discret doux épais faux fou frais gras grec gros inquiet jaloux
  malin roux sec sympa vif`);
// -er verbs whose present, past participle and subjunctive are spelled like a noun or adjective already in the list
// (la porte, la place, la gare, prête, and the name Marie): they take only the cells that do not, so course text keeps its reading.
const NO_PRESENT = set(`adresser causer compter durer fêter garder garer marier neiger occuper placer planter
  porter prêter téléphoner`);
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

// Spelling changes the plain -er patterns miss, written as irregular forms the way forms.json already does for
// manger, commencer, appeler, lever and préférer:
// -ger and -cer keep a soft g or c before a and o (rangeons, rangeait, avançons); -eter and -eler verbs in DOUBLE
// double the consonant before a silent e (jette, rappellera); other e + consonant + er verbs take è there (mène,
// mènera); é + consonants + er verbs take è in the singular and third plural of the present and subjunctive (espère).
const DOUBLE = set(`épeler jeter rappeler rejeter`);
const SILENT_E = /^(prs|sbjv)\.(1sg|2sg|3sg|3pl)$|^(fut|cond)\./;
const SILENT_E_PRESENT = /^(prs|sbjv)\.(1sg|2sg|3sg|3pl)$/;
function spell(lemma, cell, regular) {
  if (!lemma.endsWith('er')) return regular;
  let base = lemma.slice(0, -2);
  const ending = regular.slice(base.length);
  if (/^[ao]/.test(ending) && base.endsWith('g')) base += 'e';
  else if (/^[ao]/.test(ending) && base.endsWith('c')) base = `${base.slice(0, -1)}ç`;
  if (SILENT_E.test(cell)) {
    if (DOUBLE.has(lemma)) base += base.at(-1);
    else if (/e[bcdfghjklmnpqrstvwxz]$/.test(base)) base = base.replace(/e([bcdfghjklmnpqrstvwxz])$/, 'è$1');
  }
  if (SILENT_E_PRESENT.test(cell) && /é[^aeiouyéè]+$/.test(base)) base = base.replace(/é([^aeiouyéè]+)$/, 'è$1');
  return base + ending;
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
const byIdOrder = (a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0);
headwords.sort(byIdOrder);
writeSortedJson(join(DIR, 'headwords.json'), headwords);

// Irregular forms for the stem changes of the listed -er verbs, for the cells their paradigms build.
const paradigmRules = new Map(JSON.parse(readFileSync(join(DIR, 'paradigms.json'), 'utf8')).map((p) => [p.id, p.rules]));
const forms = JSON.parse(readFileSync(join(DIR, 'forms.json'), 'utf8'));
const formIds = new Set(forms.map((f) => f.id));
let formsAdded = 0;
for (const groups of Object.values(WORDS)) {
  for (const raw of (groups.verb ?? '').split(/\s+/).filter(Boolean)) {
    const lemma = raw.split('/')[0];
    const h = headwords.find((x) => x.lemma === lemma && x.pos === 'verb');
    for (const pid of h.paradigms) {
      for (const rule of paradigmRules.get(pid) ?? []) {
        if (!lemma.endsWith(rule.strip)) continue;
        const regular = lemma.slice(0, lemma.length - rule.strip.length) + rule.add;
        const surface = spell(lemma, rule.cell, regular);
        const id = `fr:form:${h.id.slice('fr:lex:'.length)}.${rule.cell}`;
        if (surface === regular || formIds.has(id)) continue;
        forms.push({ cell: rule.cell, id, of: h.id, surface });
        formIds.add(id);
        formsAdded += 1;
      }
    }
  }
}
forms.sort(byIdOrder);
writeSortedJson(join(DIR, 'forms.json'), forms);
console.log(`core-words: ${added} headwords and ${formsAdded} spelling forms added${renamed.length ? `; IDs with a part of speech: ${renamed.join(', ')}` : ''}`);
