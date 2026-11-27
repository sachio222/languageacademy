// Adds the French words a B2 learner needs that the course word list lacked, so a B2 core list can name them. No
// lesson teaches them yet. Each word gets its level, part of speech, an English gloss and, for a noun, its gender.
// Paradigms follow the existing entries of the same kind, and dictionaryId is the app dictionary key when
// src/data/dictionary/words/cambridge/ has one. Verbs and adjectives also get the irregular forms their paradigms do
// not build: spelling changes of -er verbs (projette, influençons, déploie, relève), every cell of an irregular verb
// copied from a verb of the same family already in the list (soumettre from mettre, parvenir from venir), and the
// feminine of adjectives such as franc (franche).
// Candidates came from four places, each word judged by hand: the Lexique 3.83 lemmas in the frequency band after the
// one core-words.mjs used; the vocabulary themes the Eaquals inventory gives for B2 (work and the economy, society and
// politics, the media and the internet, the environment, health, science and technology, education, culture and the
// arts, law, feelings and attitudes); FLELex as a cross-check; and the words of argument a B1 learner still lacks,
// such as souligner, nier and remédier à. The lists below are in alphabetical order and record no frequency value or
// rank.
// Levels: B2 for a word a B2 learner needs, C1 for a word that is useful but beyond that need. A review moved some
// everyday words of this pass down to A2 or B1, in line with the levels of their neighbours in the older lists, and
// three rare ones up to C1 (entraver, guère, tantôt). A word marked /J was placed by judgment, because its frequency
// points to another level; /G marks a grammar word placed by the Eaquals grammar lists. The other words were placed
// by frequency and the Eaquals themes.
// Left out:
// - proper nouns, slang and familiar words (bosser, bouffer, fric, flic, rigoler, se balader), vulgar words, and words
//   that mostly literature or war films need (vengeance, orgueil, fureur);
// - words below B2 that the earlier lists missed (discussion, possibilité, concerner, peser, loisir, gratuit, récent,
//   logement, horaire, imprimante, tutoyer): they belong to a lower level;
// - words the checker uses as signs of English (section, location, positive and progressive, in ENGLISH_ONLY in
//   french-text.mjs), and words whose English spelling course labels and notes use, so that the converter in
//   scripts/content/migrate would read those labels as French: gratitude, regret, transactions, perception,
//   Integration, institutions, modifications, compliment, Structure, Formation, Concrete, intense, progression;
// - words the course already uses that the word list lacks (boisson, clarification, louche, fée, étudiante, avocate):
//   they stay unknown words until a lesson fix adds them;
// - words that made the checker read course text differently: influencer (the noun influence in the table of Reading
//   11, at position 157, read as the verb), triompher (the noun triomphe), flore (Café de Flore in Reading 9);
// - nouns and adjectives spelled like a form of a verb already in the list: employé, revenu, reproche, dispute,
//   représentant, enseignant, identifiant, communiqué, accusé, blessé, juré, rentrée, traité, partage, prise, mise,
//   reprise, atteinte, étendue, écrit, survivant, descendant, correspondant, tournant, envoyé, associé, dirigeant,
//   manifestant, lâche, souvenir (se souvenir), nouvelle (nouveau), and adjectives built on the present participle of a
//   listed verb (inquiétant, surprenant, rassurant, touchant, menaçant, exigeant, décevant, méfiant, résistant), or of
//   a verb this pass adds (satisfaisant, émouvant, tolérant);
// - verbs whose forms are spelled like a word already in the list: baser (base), classer (classe), copier (copie),
//   critiquer (critique), dater (date), enquêter (enquête), équiper (équipe), figurer (figure), limiter (limite),
//   masquer (masque), ménager (ménage), piloter (pilote), programmer (programme), ruiner (ruine), tracer (trace),
//   veiller (veille), restaurer (restaurant), fonder (fondons and fondent, forms of fondre), importer (n'importe),
//   se fier (fier), nuire (il nuit), secourir (je secours), priver (privé), brancher (branche), différer (ils
//   diffèrent, différent once accents are set aside) and précéder (précèdent, précédent); and a noun reading for
//   droit, pouvoir, moyen, physique, objectif and politique.
// Two verbs keep all their cells but one: maintenir has no present participle (maintenant is the adverb) and
// entreprendre no feminine participle (entreprise is the noun). foi takes no plural, which would be spelled fois.
// Some new words are spelled like a form of an older word, as offre and offrir already are. Course text does not use
// these spellings yet. In running text the checker counts such a word as known when either reading is taught; a
// lesson whose vocabulary table lists one of them may credit the other reading, and then needs that reading's ID in
// its excludeWords correction (see the README):
// - new nouns spelled like a form of an older verb: approche (approcher), baisse (baisser), dépense (dépenser), lutte
//   (lutter), mérite (mériter), donnée (donner), plainte (plaindre), parcours (parcourir), and the plurals soutiens
//   (soutenir), adoptions (adopter), mentions (mentir) and précisions (préciser); fréquente, the feminine of fréquent,
//   is also a form of fréquenter;
// - new verb forms spelled like an older noun: lions (lier, and the plural of lion), entretiens (entretenir, and the
//   plural of entretien);
// - words that differ from an older one only by accents, which the checker tells apart but folded lookups do not:
//   générer and gêner (générais, gênerais), répartir and repartir, retraité and retraite. répartir and retraité take
//   the IDs fr:lex:repartir.distribute and fr:lex:retraite.person (see IDS).
// New words also share spellings with each other: affection and affecter (affections), affiche and afficher,
// alternative and alternatif (alternative), analyse and analyser, cible and cibler, compromis and compromettre,
// contrainte and contraindre, cultivé and cultiver, débat and débattre, délégué and déléguer, épargne and épargner,
// extrait and extraire, facilité and faciliter, finance and financer, formule and formuler, garantie and garantir,
// immigré and immigrer, maintien and maintenir (maintiens), maîtrise and maîtriser, recours and recourir, résumé and
// résumer, trouble and troubler, vision and viser (visions).
// Source of truth: headwords.json and forms.json. Entries already present are skipped, so running it again changes
// nothing; add or change words by editing the JSON files.
// Usage: node scripts/graph/fr/build/b2-words.mjs   (run after add-words.mjs and core-words.mjs)
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { writeSortedJson } from '../../write-json.mjs';
import { fold } from '../../fold.mjs';
import { FR_DIR as DIR, REPO } from './lib.mjs';

const SOURCE = { F: 'agent: frequency + Eaquals', G: 'agent: Eaquals grammar', J: 'agent: judgment' };

// level -> pos -> one entry per line: "lemma[/J|/G] [gender]: gloss". A noun's gender is m, f or m/f (one form for
// both). "_" in a lemma stands for a space.
const WORDS = {
  // Words first drafted for B2 that a review placed lower, in line with the levels of their neighbours in the older
  // lists (chimie with géographie, fichier with informatique). They stay here so every word of this pass is in one
  // place.
  A2: {
    noun: `
      allergie/J f: allergy
      chimie/J f: chemistry
      débutant/J m: beginner
      fichier/J m: file
      quantité/J f: quantity
      réduction/J f: reduction; discount`,
    verb: `
      emménager/J: to move in
      rembourser/J: to pay back, refund`,
    adjective: `
      paresseux/J: lazy`,
  },
  B1: {
    noun: `
      amélioration/J f: improvement
      augmentation/J f: increase, pay rise
      catégorie/J f: category
      logiciel/J m: software
      option/J f: option
      philosophie/J f: philosophy
      pollution/J f: pollution
      promotion/J f: promotion; special offer
      routine/J f: routine
      téléchargement/J m: download`,
    verb: `
      gaspiller/J: to waste
      polluer/J: to pollute
      trier/J: to sort`,
    adjective: `
      amical/J: friendly
      annuel/J: annual, yearly
      chaleureux/J: warm, friendly
      chanceux/J: lucky
      égoïste/J: selfish
      électronique/J: electronic
      irrégulier/J: irregular
      mensuel/J: monthly
      obligatoire/J: compulsory
      optimiste/J: optimistic
      pessimiste/J: pessimistic
      têtu/J: stubborn`,
  },
  B2: {
    noun: `
      abandon m: abandonment, giving up
      abonnement m: subscription
      abus m: abuse, misuse
      accessoire m: accessory
      accomplissement m: achievement, fulfilment
      accouchement m: childbirth, delivery
      accusation f: accusation, charge
      acquisition f: acquisition, purchase
      actionnaire m/f: shareholder
      actualité f: current events, the news
      adaptation f: adaptation
      addiction f: addiction
      adhésion f: membership, support
      admirateur m: admirer
      admiration f: admiration
      adolescence f: adolescence
      adoption f: adoption
      adversaire m/f: opponent
      affection f: affection
      affiche f: poster
      affrontement m: clash, confrontation
      agacement m: irritation
      agglomération f: built-up area, town and suburbs
      agression f: assault, attack
      agriculteur m: farmer
      algorithme m: algorithm
      aliment m: food, foodstuff
      alimentation f: diet, food supply
      alliance f: alliance; wedding ring
      allocation f: allowance, benefit
      allusion f: allusion, hint
      alternance f: alternation; work-study programme
      alternative f: alternative, option
      ambassade f: embassy
      ambassadeur m: ambassador
      amende f: fine (penalty)
      amertume f: bitterness
      ampleur f: scale, extent
      analyse f: analysis
      anecdote f: anecdote
      antibiotique m: antibiotic
      anxiété f: anxiety
      appartenance f: belonging, membership
      applaudissement m: applause
      application f: application; app
      approche/J f: approach
      appui m: support, backing
      aptitude f: aptitude, ability
      architecture f: architecture
      argument m: argument (a reason given)
      argumentation/J f: line of argument
      arrestation f: arrest
      arrogance f: arrogance
      artisan m: craftsman, artisan
      artisanat m: crafts, craft industry
      association f: association, club
      astronaute m/f: astronaut
      atome m: atom
      atout m: asset, trump card
      attachement m: attachment
      attentat m: (terrorist) attack
      attitude/J f: attitude
      audace f: boldness, daring
      audience f: audience; court hearing
      auditeur m: listener
      autorisation f: permission, authorisation
      aveu m: confession, admission
      baisse f: fall, drop
      banquier m: banker
      bénéfice m: profit; benefit
      bénévolat m: voluntary work
      bénévole m/f: volunteer
      biais m: bias; means
      bien-être m: well-being
      bienveillance f: kindness, goodwill
      bilan m: assessment, results
      biodiversité f: biodiversity
      biographie f: biography
      bourse f: grant, scholarship; stock exchange
      brevet m: patent; certificate
      bricolage m: DIY, home repairs
      budget m: budget
      bulletin m: report, bulletin
      calcul m: calculation
      cambriolage m: burglary
      campus m: campus
      cancer m: cancer
      candidat m: candidate, applicant
      candidature f: application (for a job, a course)
      canicule f: heatwave
      capacité f: capacity, ability
      capitalisme m: capitalism
      caractéristique f: feature, characteristic
      carburant m: fuel
      catalogue m: catalogue
      cellule/J f: cell
      censure f: censorship
      chantier m: building site
      charbon m: coal
      chercheur m: researcher
      chirurgie f: surgery
      chirurgien m: surgeon
      chômage m: unemployment
      chômeur m: unemployed person
      chronique f: column, regular feature
      cible f: target
      cinéaste m/f: filmmaker
      circulation f: traffic; circulation
      citation f: quotation
      citoyenneté f: citizenship
      civilisation f: civilisation
      clarté f: clarity, light
      clientèle f: customers, clientele
      climat m: climate
      clinique f: clinic
      cohérence/J f: consistency, coherence
      collaborateur m: colleague, co-worker
      collaboration f: collaboration
      colocataire m/f: flatmate
      colocation f: flat-sharing
      commerçant m: shopkeeper, trader
      commission f: committee; commission
      communauté f: community
      comparaison f: comparison
      compassion f: compassion
      compensation f: compensation
      compétence f: skill, competence
      compétition f: competition, contest
      complicité f: closeness; complicity
      comportement m: behaviour
      compréhension f: understanding
      compromis m: compromise
      comptabilité f: accounting, accounts
      concentration f: concentration
      concept m: concept
      conception f: design; idea, view
      concession f: concession
      concurrence f: competition (in business)
      concurrent m: competitor
      condamnation f: conviction, sentence; condemnation
      confidence f: secret told in confidence
      conflit m: conflict
      confort m: comfort
      confusion f: confusion
      conjoint m: spouse, partner
      connexion f: connection; login
      consensus m: consensus
      considération f: consideration, respect
      consommateur m: consumer
      consommation f: consumption
      constitution f: constitution
      consultation f: consultation, appointment
      contexte m: context
      contradiction f: contradiction
      contrainte f: constraint
      contraste m: contrast
      contravention f: (parking) ticket, fine
      coopération f: cooperation
      corruption f: corruption
      coût m: cost
      coutume f: custom
      covoiturage m: car-sharing
      créateur m: creator, designer
      création f: creation
      créativité f: creativity
      crédibilité/J f: credibility
      criminalité f: crime (as a social problem)
      critère/J m: criterion
      croissance f: growth
      croyance f: belief
      culpabilité f: guilt
      cursus m: course of study
      cycle m: cycle
      débat m: debate
      débouché m: job opening; outlet, market
      décalage m: gap, time difference
      décennie/J f: decade
      déception f: disappointment
      décès m: death
      déclaration f: statement, declaration
      déclin m: decline
      défaite f: defeat
      défi m: challenge
      déficit m: deficit
      définition f: definition
      déforestation f: deforestation
      dégât m: damage
      dégradation f: damage, deterioration
      délai m: time limit, deadline
      délégué m: delegate, representative
      délinquance f: delinquency, petty crime
      délinquant m: offender
      délit m: offence
      démarche f: step, approach
      démission f: resignation
      démocratie f: democracy
      démonstration f: demonstration, proof
      dépendance f: dependence, addiction
      dépense f: expense, spending
      déplacement m: trip, travel; movement
      député m: member of parliament
      désaccord m: disagreement
      désastre m: disaster
      désespoir/J m: despair
      destruction f: destruction
      détente f: relaxation
      détention f: detention; possession
      détérioration/J f: deterioration
      détermination f: determination
      détresse f: distress
      développement m: development
      diagnostic m: diagnosis
      dictature f: dictatorship
      dignité f: dignity
      dimension f: dimension, size
      diplomatie f: diplomacy
      discipline f: discipline; subject
      discrimination f: discrimination
      disparition f: disappearance; extinction
      dispositif m: device; set of measures
      disposition/J f: arrangement; provision
      dissertation f: essay
      distinction f: distinction
      distribution f: distribution; cast
      diversité f: diversity
      divertissement m: entertainment
      doctorat m: doctorate, PhD
      documentaire m: documentary
      don/J m: gift, donation; talent
      donnée f: piece of data (données: data)
      durée f: length, duration
      échéance f: deadline, due date
      échelle f: ladder; scale
      écho/J m: echo
      écologie f: ecology
      écologiste m/f: environmentalist
      économiste m/f: economist
      écosystème m: ecosystem
      édition f: edition; publishing
      efficacité f: effectiveness, efficiency
      égalité f: equality
      égard/J m: consideration (à l'égard de: towards)
      égoïsme m: selfishness
      électeur m: voter
      élection f: election
      élevage m: livestock farming
      élite f: elite
      emballage m: packaging
      embarras m: embarrassment
      embauche f: hiring, recruitment
      émeute f: riot
      employeur m: employer
      empreinte/J f: print, mark, footprint
      emprunt m: loan
      enjeu m: what is at stake
      enregistrement m: recording; check-in
      enseignement m: teaching, education
      enterrement/J m: funeral
      enthousiasme m: enthusiasm
      entourage m: circle of family and friends
      entraînement m: training, practice
      entrepreneur m: entrepreneur; contractor
      envergure/J f: scale, calibre
      éolienne f: wind turbine
      épanouissement m: fulfilment, blossoming
      épargne f: savings
      épidémie f: epidemic
      équation f: equation
      équipement m: equipment
      ère f: era
      escroquerie f: fraud, swindle
      espérance f: hope; expectancy
      établissement m: institution, establishment
      éthique f: ethics
      éventualité f: possibility, eventuality
      évolution f: development, evolution
      exaspération f: exasperation
      excès m: excess
      exclusion f: exclusion
      exigence f: demand, requirement
      expérimentation f: experimentation
      exploitation f: exploitation; farm, business
      exploration f: exploration
      exportation f: export
      extinction f: extinction
      extrait m: extract, excerpt
      facilité f: ease; facility
      faiblesse f: weakness
      faillite f: bankruptcy
      faune f: wildlife, fauna
      fermeture f: closing, closure
      fiabilité/J f: reliability
      fiançailles f: engagement (to marry)
      fidélité f: loyalty, faithfulness
      fierté f: pride
      filière f: field of study, career path
      finance f: finance
      financement m: funding, financing
      flexibilité/J f: flexibility
      foi/J f: faith (de bonne foi: in good faith)
      foie m: liver
      fonctionnaire m/f: civil servant
      fonctionnement m: working, operation
      formalité f: formality
      formule f: formula; expression
      fournisseur m: supplier
      foyer/J m: home, household; hostel
      fragilité f: fragility
      fraude f: fraud
      fréquence f: frequency
      frustration f: frustration
      gain m: gain, earnings
      garantie f: guarantee, warranty
      gaspillage m: waste
      générosité f: generosity
      gentillesse f: kindness
      gestion f: management
      gestionnaire m/f: manager, administrator
      gloire/J f: glory
      gravité f: seriousness; gravity
      guérison f: recovery, cure
      habitat m: habitat; housing
      handicap m: disability; handicap
      harcèlement m: harassment
      hausse f: rise, increase
      hébergement m: accommodation
      héritage m: inheritance; heritage
      hiérarchie f: hierarchy
      honnêteté f: honesty
      humanité f: humanity
      humiliation f: humiliation
      hygiène f: hygiene
      hypocrisie f: hypocrisy
      hypothèse f: hypothesis
      idéologie f: ideology
      illustration f: illustration
      immigration f: immigration
      immigré m: immigrant
      impact m: impact
      impatience f: impatience
      importation f: import
      impôt m: tax
      imprévu m: unexpected event
      impuissance f: helplessness, powerlessness
      inauguration f: opening, inauguration
      incertitude f: uncertainty
      inconvénient m: drawback, disadvantage
      indemnité f: compensation, allowance
      indépendance f: independence
      indifférence f: indifference
      indignation f: indignation
      inégalité f: inequality
      infection f: infection
      inflation f: inflation
      infraction f: offence
      ingénierie/J f: engineering
      initiative f: initiative
      injustice f: injustice
      innocence f: innocence
      inondation f: flood
      insécurité f: insecurity
      insomnie f: insomnia
      inspiration f: inspiration
      installation f: installation; moving in
      intensité f: intensity
      interdiction f: ban
      intermédiaire m/f: intermediary, go-between
      internaute m/f: internet user
      interprétation f: interpretation
      intervention f: intervention; talk
      intimité f: privacy; intimacy
      intuition f: intuition
      inventeur m: inventor
      investissement m: investment
      ironie f: irony
      isolement m: isolation, loneliness
      jalousie f: jealousy
      journalisme m: journalism
      justification f: justification
      lacune/J f: gap (in knowledge)
      laïcité f: secularism
      lancement m: launch
      lecteur m: reader; player (CD, DVD)
      législation f: legislation
      licence f: bachelor's degree; licence
      licenciement m: dismissal, layoff
      livraison f: delivery
      locataire m/f: tenant
      loyauté f: loyalty
      lutte/J f: struggle, fight
      maintien m: maintenance, keeping
      maîtrise f: mastery, control
      majorité f: majority
      maladresse f: clumsiness
      malaise m: unease; fainting fit
      malentendu m: misunderstanding
      manifestation f: demonstration, protest; event
      marchandise f: goods
      marge f: margin
      maturité f: maturity
      mécanisme m: mechanism
      mécontentement m: dissatisfaction
      média m: medium (médias: the media)
      méfiance f: distrust
      mentalité f: mentality, mindset
      mention f: mention; grade (with honours)
      mépris m: contempt
      mérite m: merit
      messagerie f: messaging; voicemail
      militant m: activist
      ministère m: ministry
      minorité f: minority
      mobilité/J f: mobility
      modération/J f: moderation
      modestie f: modesty
      mondialisation f: globalisation
      motivation f: motivation
      municipalité f: town council, municipality
      mythe m: myth
      naïveté f: naivety
      négociation f: negotiation
      neutralité f: neutrality
      norme f: standard, norm
      nostalgie f: nostalgia
      notion f: notion, idea
      nuance f: shade, nuance
      obésité f: obesity
      objection f: objection
      obligation f: obligation
      observation f: observation
      obstacle m: obstacle
      occupation f: occupation, activity
      opportunité f: opportunity
      opposition f: opposition
      optimisme m: optimism
      ordonnance f: prescription; order
      organisme m: organism; body, organisation
      orientation f: guidance; direction
      originalité f: originality
      oubli m: forgetting, oversight
      paiement m: payment
      panique f: panic
      paradoxe m: paradox
      parcours m: route; career path, background
      paresse f: laziness
      parlement m: parliament
      participation f: participation
      particularité f: particular feature
      pauvreté f: poverty
      pénurie f: shortage
      perfection f: perfection
      performance f: performance, result
      permanence f: permanence; office hours
      personnalité f: personality
      perspective f: perspective, prospect
      pertinence/J f: relevance
      pessimisme m: pessimism
      pétrole m: oil, petroleum
      phase f: phase, stage
      phénomène m: phenomenon
      piratage m: hacking; piracy
      plainte f: complaint (porter plainte: to press charges)
      polémique f: controversy
      popularité/J f: popularity
      portée f: reach, scope
      pourcentage m: percentage
      poursuite f: chase; continuation
      précarité f: insecurity (of jobs, housing)
      précision f: precision, detail
      préjugé m: prejudice
      préoccupation f: concern, worry
      prévention f: prevention
      prévision f: forecast
      prière/J f: prayer
      prime f: bonus; premium
      priorité f: priority
      procédure f: procedure
      procès/J m: trial
      processus m: process
      production f: production
      productivité f: productivity
      profil m: profile
      profit m: profit
      profondeur f: depth
      propagande f: propaganda
      proportion f: proportion
      propriété f: property; ownership
      prospérité f: prosperity
      proximité f: nearness, proximity
      prudence f: caution
      psychologie f: psychology
      psychologue m/f: psychologist
      publication f: publication; post (online)
      qualification f: qualification
      racine f: root
      racisme m: racism
      raisonnement m: reasoning
      rapidité f: speed
      réalisateur m: director (of a film)
      réalisation f: carrying out; achievement
      réalisme m: realism
      récession f: recession
      réchauffement m: warming
      récolte f: harvest
      récompense f: reward
      réconciliation f: reconciliation
      recours m: recourse, appeal
      recrutement m: recruitment
      recul m: step back, distance; decline
      recyclage m: recycling
      rédacteur m: editor, writer
      rédaction f: writing; editorial staff
      référence f: reference
      réforme f: reform
      réfugié m: refugee
      refus m: refusal
      rejet m: rejection
      remboursement m: refund, repayment
      remède m: remedy, cure
      remerciement m: thanks
      rémunération f: pay, remuneration
      rendement m: output, yield
      rentabilité f: profitability
      réparation f: repair
      répartition f: distribution, sharing out
      répétition f: repetition; rehearsal
      reportage m: (news) report
      répression f: repression
      république f: republic
      réseau m: network
      résignation f: resignation, acceptance
      résolution f: resolution
      respiration f: breathing
      ressemblance f: likeness, resemblance
      ressource f: resource
      restriction f: restriction
      résumé m: summary
      retraité m: retired person, pensioner
      revanche/J f: revenge (en revanche: on the other hand)
      revendication f: demand, claim
      richesse f: wealth, richness
      rigueur f: rigour, strictness
      rumeur/J f: rumour
      rupture f: break, break-up
      sacrifice/J m: sacrifice
      sagesse f: wisdom
      salarié m: employee, wage earner
      sanction f: penalty, sanction
      sans-abri m/f: homeless person
      scandale m: scandal
      scénario m: script, screenplay; scenario
      scolarité f: schooling
      sculpture f: sculpture
      sécheresse f: drought
      sein/J m: breast; heart (au sein de: within)
      séisme m: earthquake
      sélection f: selection
      semestre m: semester, half-year
      sensibilité f: sensitivity
      séparation f: separation
      sérénité f: serenity, calm
      signal/J m: signal
      signature f: signature
      signification f: meaning
      simplicité f: simplicity
      sincérité f: sincerity
      solidarité f: solidarity
      sondage m: (opinion) poll, survey
      soulagement m: relief
      soupçon m: suspicion
      sous-titre m: subtitle
      soutien m: support
      spécialiste m/f: specialist
      stabilité/J f: stability
      stage m: internship, work placement; course
      stagiaire m/f: intern, trainee
      statistique f: statistic; statistics
      statut m: status
      stock m: stock
      stratégie f: strategy
      stress m: stress
      subtilité f: subtlety
      suggestion f: suggestion
      supposition f: assumption
      sûreté f: safety, security
      surveillance f: monitoring, surveillance
      survie f: survival
      suspicion/J f: suspicion
      symbole m: symbol
      sympathie f: liking, fellow feeling
      symptôme m: symptom
      syndicat m: trade union
      synthèse f: synthesis, summary
      tâche/J f: task
      taux m: rate
      taxe f: tax
      technicien m: technician
      téléspectateur m: (TV) viewer
      télétravail m: remote work
      témoignage m: testimony, account
      tendance f: trend; tendency
      tension f: tension; blood pressure
      tentative f: attempt
      territoire/J m: territory
      terrorisme m: terrorism
      terroriste m/f: terrorist
      thérapie f: therapy
      thèse f: thesis
      timidité f: shyness
      tolérance f: tolerance
      tragédie f: tragedy
      trahison f: betrayal
      transfert m: transfer
      transformation f: transformation
      transition f: transition
      transmission f: transmission, passing on
      transparence f: transparency
      traumatisme m: trauma
      travailleur m: worker
      tri m: sorting
      tribunal/J m: court
      trimestre m: term, quarter
      trouble m: disorder; unrest
      union/J f: union
      unité/J f: unit; unity
      urbanisme/J m: town planning
      usager m: user (of a service)
      utilisateur m: user
      utilisation f: use
      utilité f: usefulness
      vaccin m: vaccine
      vaccination f: vaccination
      valorisation/J f: enhancement, recognition
      variation f: variation
      variété f: variety
      verdict m: verdict
      vertu/J f: virtue
      vigilance f: vigilance
      virement m: (bank) transfer
      virus m: virus
      vision/J f: vision; view
      vocation f: vocation, calling
      vote m: vote`,
    verb: `
      abattre/J: to cut down, knock down; to slaughter
      abolir: to abolish
      abonner: to subscribe (s'abonner à)
      aborder: to tackle (a subject); to approach
      aboutir: to succeed, lead to (aboutir à)
      abstenir: to refrain; to abstain (s'abstenir de)
      abuser: to abuse; to go too far (abuser de)
      accéder: to reach, have access (accéder à)
      accélérer: to speed up
      accentuer: to stress, increase
      accomplir/J: to carry out, achieve
      accroître: to increase
      accumuler: to accumulate, pile up
      acquérir: to acquire
      adapter: to adapt (s'adapter à)
      affaiblir: to weaken
      affecter: to affect; to assign
      afficher: to display; to put up (a poster)
      affronter/J: to face, confront
      agacer: to annoy, irritate
      aggraver: to make worse
      agiter/J: to shake, wave; to stir up
      agrandir: to enlarge, extend
      alerter: to alert, warn
      alimenter: to feed, supply
      alléger: to lighten, reduce
      aménager: to fit out, lay out
      amplifier: to amplify, increase
      analyser: to analyse
      anticiper: to anticipate
      apaiser: to calm, soothe
      approfondir: to deepen, go into detail
      approuver/J: to approve (of)
      arracher/J: to pull out, snatch
      articuler: to articulate; to structure
      aspirer: to aspire (aspirer à); to suck up
      assimiler: to absorb, take in
      associer: to associate, combine
      assumer: to take on, accept (a responsibility)
      attribuer: to award, attribute
      avérer: to prove to be (s'avérer)
      bénéficier: to benefit (bénéficier de)
      bouleverser: to upset deeply; to disrupt
      capter: to pick up (a signal); to capture (attention)
      cibler/J: to target
      collaborer: to collaborate
      combattre/J: to fight, combat
      combler: to fill (a gap); to fulfil
      commenter: to comment on
      commettre/J: to commit (a crime, a mistake)
      compenser: to compensate for
      comporter/J: to include, consist of (se comporter: to behave)
      compromettre: to compromise, jeopardise
      concéder: to concede, grant
      concevoir: to design; to conceive, understand
      condamner/J: to condemn; to sentence
      confronter: to confront, compare
      conquérir: to conquer, win over
      consacrer/J: to devote (se consacrer à)
      consentir: to consent (consentir à)
      consommer: to consume, use
      constituer/J: to make up, constitute
      contester: to dispute, challenge
      contourner: to get round, bypass
      contraindre: to force, compel
      contredire: to contradict
      contribuer: to contribute (contribuer à)
      convertir: to convert
      convoquer: to summon, call (to a meeting)
      coopérer: to cooperate
      corrompre: to corrupt, bribe
      cultiver: to grow; to cultivate
      débattre: to debate
      déclencher: to trigger, set off
      décourager: to discourage
      déduire: to deduce; to deduct
      défier: to challenge, defy
      dégager/J: to clear; to give off
      dégrader: to damage, degrade
      déléguer: to delegate
      délivrer: to issue (a document); to free
      démentir: to deny (a report)
      demeurer/J: to remain; to live
      démissionner: to resign
      démontrer: to demonstrate, prove
      dénoncer/J: to denounce, report
      déplaire: to displease
      déplorer: to deplore, regret
      déployer: to deploy, spread out
      déprimer: to depress; to be depressed
      désigner/J: to point out; to appoint
      destiner: to intend (être destiné à)
      détacher/J: to untie, detach
      détecter: to detect
      détenir: to hold, possess; to detain
      déterminer: to determine
      détourner/J: to divert; to hijack
      dévoiler: to reveal, unveil
      diffuser: to broadcast; to spread
      diminuer: to decrease, reduce
      discriminer: to discriminate
      dispenser: to exempt; to give (care, lessons)
      disposer/J: to have available (disposer de); to arrange
      dissimuler/J: to conceal
      dissoudre: to dissolve
      dissuader: to dissuade, deter
      diviser: to divide
      dominer/J: to dominate
      doter: to equip, provide
      dresser/J: to draw up (a list); to put up
      éclaircir: to clear up, clarify
      éduquer: to educate, bring up
      effectuer: to carry out
      efforcer/J: to strive (s'efforcer de)
      effrayer/J: to frighten
      élargir: to widen, broaden
      élire: to elect
      émerger: to emerge
      émettre: to emit; to issue, express
      émigrer: to emigrate
      émouvoir: to move, touch (emotionally)
      emparer/J: to seize (s'emparer de)
      empirer/J: to get worse
      emprisonner: to imprison
      encadrer: to supervise; to frame
      endommager: to damage
      engendrer: to cause, give rise to
      entamer: to start, open
      entreprendre/J: to undertake
      entretenir/J: to maintain; to keep up
      envahir/J: to invade
      épanouir: to blossom, flourish (s'épanouir)
      épargner/J: to save; to spare
      éprouver/J: to feel, experience
      épuiser/J: to exhaust
      évacuer: to evacuate
      évaluer: to assess, evaluate
      évanouir: to faint (s'évanouir)
      exaspérer: to exasperate
      exclure: to exclude, rule out
      exécuter/J: to carry out
      exercer/J: to exercise; to practise (a job)
      expérimenter: to experiment, test
      exploiter: to exploit; to run (a business)
      explorer: to explore
      exposer/J: to exhibit; to set out; to expose
      extraire: to extract
      faciliter: to make easier
      fasciner: to fascinate
      favoriser: to favour, encourage
      financer: to finance, fund
      formuler: to formulate, express
      fouiller/J: to search
      freiner: to brake; to slow down
      frustrer: to frustrate
      gâcher/J: to spoil, waste
      garantir: to guarantee
      générer/J: to generate
      gérer: to manage
      gonfler/J: to inflate, swell
      gouverner: to govern
      harceler: to harass
      héberger: to put up, house; to host
      hériter: to inherit (hériter de)
      illustrer: to illustrate
      immigrer: to immigrate
      impliquer/J: to involve; to imply
      inaugurer: to open, inaugurate
      incarner: to embody; to play (a role)
      inciter: to encourage, urge (inciter à)
      incliner/J: to tilt; to bow
      inclure: to include
      indigner: to make indignant (s'indigner)
      infliger: to inflict, impose
      instaurer: to establish, bring in
      instruire: to teach, educate
      intégrer: to integrate; to join
      interpréter: to interpret; to perform
      introduire: to introduce; to insert
      inverser: to reverse
      investir: to invest
      isoler: to isolate; to insulate
      jouir/J: to enjoy (jouir de)
      licencier: to dismiss, lay off
      lier/J: to link, bind
      maintenir/J: to maintain, keep
      maîtriser: to master; to control
      manier: to handle
      manipuler: to handle; to manipulate
      mêler/J: to mix (se mêler de: to meddle in)
      mentionner: to mention
      mépriser: to despise
      mobiliser: to mobilise
      motiver: to motivate
      multiplier: to multiply, increase
      naviguer: to sail; to browse
      négliger: to neglect
      négocier: to negotiate
      nier/J: to deny
      opérer/J: to operate; to carry out
      opposer/J: to oppose, set against (s'opposer à)
      ordonner/J: to order; to arrange
      orienter: to guide; to position
      parvenir/J: to manage, succeed (parvenir à); to reach
      pencher/J: to lean (se pencher sur: to look into)
      pénétrer/J: to enter, penetrate
      percer/J: to pierce; to break through
      percevoir/J: to perceive; to receive (money)
      perfectionner: to improve, perfect
      persister: to persist
      persuader/J: to persuade
      perturber: to disrupt, disturb
      plaider: to plead
      planifier: to plan
      postuler: to apply (postuler à: for a job)
      précipiter/J: to rush, hasten
      prédire: to predict
      prélever: to take (a sample, an amount)
      préoccuper: to worry, concern
      prescrire: to prescribe
      privilégier: to favour, give priority to
      procéder: to proceed; to carry out (procéder à)
      procurer: to obtain, provide
      progresser: to progress
      projeter: to plan; to project; to throw
      promouvoir: to promote
      provenir: to come from (provenir de)
      rapprocher/J: to bring closer (se rapprocher: to get closer)
      rassembler/J: to gather, bring together
      recourir: to resort (recourir à)
      recruter: to recruit
      recueillir: to collect, gather; to take in
      redevenir/J: to become again
      redouter: to dread
      refléter: to reflect
      regrouper: to group together
      réjouir: to delight (se réjouir de)
      relancer: to revive; to remind, chase up
      relever/J: to raise; to note; to pick up (relever de: to come under)
      relier: to connect, link
      remédier: to remedy (remédier à)
      renforcer: to strengthen
      renouveler: to renew
      répandre/J: to spread
      répartir: to share out, distribute
      repérer/J: to spot, locate
      répliquer: to reply, retort
      repousser/J: to push back; to postpone
      réprimer: to suppress
      reproduire: to reproduce
      résider: to live, reside
      résigner: to resign oneself (se résigner à)
      résulter: to result (résulter de)
      résumer: to summarise
      rétablir: to restore (se rétablir: to recover)
      revendiquer: to claim, demand
      saisir/J: to seize, grab; to understand
      sanctionner: to punish, sanction
      satisfaire/J: to satisfy
      sauvegarder: to safeguard; to save (a file)
      séduire: to charm, attract
      sélectionner: to select
      sensibiliser: to raise awareness
      simplifier: to simplify
      solliciter: to request, ask for
      soucier/J: to care, worry (se soucier de)
      souligner: to underline, stress
      soumettre/J: to submit; to subject
      soupçonner/J: to suspect
      stimuler: to stimulate
      succéder: to succeed, follow (succéder à)
      surgir/J: to appear suddenly
      surmonter: to overcome
      survenir: to occur, happen
      susciter: to arouse, give rise to
      suspendre/J: to hang; to suspend
      témoigner/J: to testify; to show (témoigner de)
      tolérer: to tolerate
      transférer: to transfer
      troubler/J: to disturb, trouble
      vaincre/J: to defeat, overcome
      valoriser/J: to value, enhance
      viser/J: to aim at`,
    adjective: `
      abordable/J: affordable
      absolu/J: absolute
      abstrait: abstract
      absurde/J: absurd
      acceptable: acceptable
      accessible: accessible, affordable
      accidentel: accidental
      adéquat: suitable, adequate
      administratif: administrative
      affectueux: affectionate
      agressif: aggressive
      agricole: agricultural
      alimentaire: food (as in food industry)
      allergique: allergic
      alternatif/J: alternative
      ambigu: ambiguous
      ambitieux: ambitious
      anonyme: anonymous
      antérieur: previous, earlier
      anxieux: anxious
      apparent: apparent, visible
      arrogant: arrogant
      artificiel: artificial
      artistique: artistic
      audacieux: bold, daring
      authentique: authentic, genuine
      autonome/J: independent, self-sufficient
      autoritaire/J: authoritarian, bossy
      avantageux: advantageous, worthwhile
      banal: commonplace, ordinary
      bienveillant: kind, caring
      biologique: biological; organic
      brutal: brutal; sudden
      budgétaire: budgetary
      cardiaque: cardiac, heart
      catastrophique: disastrous
      catégorique: categorical, firm
      chimique: chemical
      civil/J: civil, civilian
      clandestin: illegal, clandestine
      cohérent: consistent, coherent
      commercial: commercial, trade
      comparable: comparable
      compétent: competent
      complexe: complex
      compréhensible: understandable
      confidentiel: confidential
      confus/J: confused; embarrassed
      conscient: aware, conscious
      conséquent: substantial; consistent
      conservateur: conservative
      considérable: considerable
      constant: constant
      contemporain: contemporary
      contradictoire: contradictory
      convaincant: convincing
      coûteux: costly, expensive
      créatif/J: creative
      crédible/J: credible, believable
      crucial: crucial
      cultivé: cultured, well-read
      décisif: decisive
      démocratique: democratic
      désastreux: disastrous
      désespéré: desperate, hopeless
      digne/J: worthy, dignified
      diplomatique: diplomatic
      discutable/J: debatable, questionable
      distinct: distinct
      douloureux/J: painful
      douteux: doubtful, dubious
      dramatique: dramatic; tragic
      durable: lasting; sustainable
      écologique: ecological, environmentally friendly
      efficace: effective, efficient
      électoral: electoral
      élémentaire: basic, elementary
      émotionnel: emotional
      énergique: energetic
      enthousiaste: enthusiastic
      environnemental: environmental
      équitable: fair
      esthétique: aesthetic
      éternel/J: eternal
      éventuel: possible
      exceptionnel: exceptional
      excessif: excessive
      explicite/J: explicit
      extrême/J: extreme
      fatal: fatal; inevitable
      favorable: favourable
      fiable: reliable
      financier: financial
      fiscal: tax, fiscal
      flexible/J: flexible
      fondamental: fundamental
      franc/J: frank, candid
      fréquent: frequent
      génétique: genetic
      global: overall, global
      hebdomadaire: weekly
      honteux: shameful; ashamed
      hostile: hostile
      hypocrite: hypocritical
      identique: identical
      illégal: illegal
      imprévisible: unpredictable
      imprudent: careless, rash
      inacceptable: unacceptable
      inattendu: unexpected
      incertain: uncertain
      incompréhensible: incomprehensible
      inconscient: unconscious; reckless
      indépendant: independent; self-employed
      indifférent: indifferent
      indispensable: essential
      individuel: individual
      industriel: industrial
      inédit: new, previously unseen
      inégal: unequal, uneven
      inévitable: inevitable
      inférieur: lower, inferior
      inhabituel: unusual
      initial: initial
      injuste: unfair
      innovant/J: innovative
      insignifiant: trivial, insignificant
      insolite: unusual, strange
      instable: unstable
      insuffisant: insufficient
      intellectuel: intellectual
      interne: internal
      intime/J: intimate, private
      irresponsable: irresponsible
      juridique: legal, juridical
      légal: legal
      légitime: legitimate
      libéral: liberal
      littéraire: literary
      loyal: loyal
      lucide: lucid, clear-headed
      majeur: major; of age
      maladroit: clumsy
      malhonnête: dishonest
      mécontent: dissatisfied
      médiatique: media
      mental: mental
      mineur: minor; under age
      mobile: mobile, moving
      modéré/J: moderate
      municipal: municipal, town
      mutuel: mutual
      naïf: naive
      nucléaire: nuclear
      numérique: digital
      obscur/J: dark; obscure
      parallèle: parallel
      passif: passive
      permanent: permanent
      pertinent/J: relevant
      plausible: plausible
      ponctuel/J: punctual; occasional
      potentiel: potential
      précaire: precarious, insecure
      préférable: preferable
      présidentiel: presidential
      prestigieux: prestigious
      primordial/J: essential, of prime importance
      prioritaire/J: priority
      productif/J: productive
      prometteur: promising
      provisoire: temporary, provisional
      psychologique: psychological
      radical: radical
      rationnel: rational
      réaliste: realistic
      relatif: relative
      remarquable: remarkable
      rentable/J: profitable
      respectueux: respectful
      rigoureux: rigorous; harsh
      rural: rural
      scandaleux: outrageous, scandalous
      secondaire: secondary
      serein: calm, serene
      solaire: solar
      solidaire: supportive, showing solidarity
      souple: flexible, supple
      spectaculaire: spectacular
      spontané: spontaneous
      stable: stable
      stratégique: strategic
      strict: strict
      subjectif/J: subjective
      subtil: subtle
      successif: successive
      supplémentaire: additional, extra
      suspect: suspicious; suspect
      symbolique: symbolic
      temporaire: temporary
      théorique/J: theoretical
      toxique: toxic
      tragique: tragic
      transparent: transparent
      trompeur: misleading
      universel: universal
      universitaire: university, academic
      urbain: urban
      valable: valid
      varié: varied
      verbal: verbal
      virtuel/J: virtual
      visuel: visual
      vital: vital
      vulnérable: vulnerable`,
    adverb: `
      auparavant/J: before, previously
      automatiquement: automatically
      brutalement: brutally; suddenly
      considérablement/J: considerably
      constamment: constantly
      continuellement: continually
      curieusement: oddly, curiously
      décidément: really, clearly (expressing a conclusion)
      définitivement: for good, permanently
      délibérément: deliberately
      dernièrement: lately, recently
      discrètement: discreetly
      dorénavant: from now on
      efficacement/J: effectively
      essentiellement: essentially, mainly
      étroitement: closely
      éventuellement: possibly, if need be
      excessivement/J: excessively
      exclusivement: exclusively
      fermement: firmly
      fortement: strongly
      fréquemment: frequently
      globalement/J: overall, on the whole
      gravement: seriously
      honnêtement: honestly
      indirectement/J: indirectly
      infiniment: infinitely, immensely
      intensément: intensely
      inutilement: needlessly
      inversement/J: conversely
      largement: widely; easily, by far
      littéralement: literally
      longuement/J: at length
      manifestement: obviously, clearly
      mutuellement: mutually, each other
      néanmoins/G: nevertheless
      nécessairement: necessarily
      nettement: clearly, markedly
      notamment: in particular, notably
      nullement: not at all
      officiellement: officially
      ouvertement: openly
      partiellement/J: partly
      patiemment: patiently
      physiquement: physically
      pleinement: fully
      principalement: mainly
      profondément/J: deeply
      progressivement: gradually
      provisoirement: temporarily, for the time being
      prudemment: carefully, cautiously
      purement: purely
      quasiment: almost, virtually
      radicalement/J: radically
      relativement: relatively
      respectivement/J: respectively
      sensiblement/J: noticeably; roughly
      séparément: separately
      sévèrement: severely
      simultanément: simultaneously
      soi-disant: supposedly, so-called
      soigneusement: carefully
      spontanément: spontaneously
      strictement: strictly
      systématiquement/J: systematically
      techniquement: technically
      vaguement/J: vaguely
      véritablement: truly
      violemment: violently
      visiblement: visibly, apparently
      vivement: deeply, keenly; quickly
      voire: or even
      volontairement: deliberately; voluntarily
      vraisemblablement: probably, in all likelihood`,
    conjunction: `
      quoique/G: although`,
    preposition: `
      concernant/G: concerning, regarding
      vis-à-vis/G: towards, with regard to (vis-à-vis de)`,
    pronoun: `
      quiconque/G: whoever, anyone`,
  },
  C1: {
    noun: `
      aléa m: hazard, unforeseen risk
      connivence f: complicity, tacit understanding
      dérive f: drift; excess
      désarroi m: confusion, helplessness
      écueil m: pitfall
      essor m: rapid growth, rise
      obsèques f: funeral
      pérennité f: durability, permanence
      prérogative f: prerogative
      réticence f: reluctance`,
    verb: `
      attester: to certify, testify to
      déceler: to detect
      enfreindre: to break, infringe (a rule)
      entériner: to ratify, confirm
      entraver/J: to hinder
      omettre: to omit, leave out
      pallier: to make up for, alleviate
      préconiser: to recommend, advocate
      présumer: to presume
      prôner: to advocate
      rétorquer: to retort`,
    adjective: `
      exhaustif: exhaustive
      inhérent: inherent
      pérenne: lasting, enduring
      sous-jacent: underlying`,
    adverb: `
      guère/J: hardly, barely (ne … guère)
      jadis: long ago, formerly
      naguère: not long ago; formerly
      tantôt/J: sometimes (tantôt … tantôt: now … now)`,
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
const IR_VERBS = set(`
  abolir aboutir accomplir affaiblir agrandir approfondir convertir éclaircir élargir envahir épanouir évanouir
  garantir investir jouir réjouir répartir rétablir saisir surgir`);
const RE_VERBS = set(`
  répandre suspendre`);
// -eter and -eler verbs that double the consonant before a silent e, as jeter and appeler do (projette, renouvelle).
const DOUBLE = set(`projeter renouveler`);

// Irregular verbs conjugated like a verb already in the list: lemma -> [model, start of the model's spelling,
// what replaces it]. Every cell is copied from the model, generated or irregular, with that start replaced:
// soumettre takes mettre's paradigms and its irregular forms (mets -> soumets, mis -> soumis).
const LIKE = {
  abattre: ['battre', '', 'a'],
  abstenir: ['tenir', '', 'abs'],
  combattre: ['battre', '', 'com'],
  commettre: ['mettre', '', 'com'],
  compromettre: ['mettre', '', 'compro'],
  concevoir: ['recevoir', 're', 'con'],
  consentir: ['sentir', '', 'con'],
  contraindre: ['craindre', 'cr', 'contr'],
  contredire: ['interdire', 'inter', 'contre'],
  corrompre: ['rompre', '', 'cor'],
  'débattre': ['battre', '', 'dé'],
  'déduire': ['réduire', 'ré', 'dé'],
  'démentir': ['mentir', '', 'dé'],
  'déplaire': ['plaire', '', 'dé'],
  'détenir': ['tenir', '', 'dé'],
  dissoudre: ['résoudre', 'ré', 'dis'],
  'élire': ['lire', '', 'é'],
  'émettre': ['mettre', '', 'é'],
  enfreindre: ['peindre', 'p', 'enfr'],
  entreprendre: ['prendre', '', 'entre'],
  entretenir: ['tenir', '', 'entre'],
  exclure: ['conclure', 'con', 'ex'],
  inclure: ['conclure', 'con', 'in'],
  instruire: ['construire', 'cons', 'ins'],
  introduire: ['produire', 'pro', 'intro'],
  maintenir: ['tenir', '', 'main'],
  omettre: ['mettre', '', 'o'],
  parvenir: ['venir', '', 'par'],
  percevoir: ['recevoir', 're', 'per'],
  'prédire': ['interdire', 'inter', 'pré'],
  prescrire: ['inscrire', 'in', 'pre'],
  provenir: ['venir', '', 'pro'],
  recourir: ['courir', '', 're'],
  recueillir: ['accueillir', 'ac', 're'],
  redevenir: ['devenir', '', 're'],
  reproduire: ['produire', '', 're'],
  satisfaire: ['faire', '', 'satis'],
  'séduire': ['réduire', 'ré', 'sé'],
  soumettre: ['mettre', '', 'sou'],
  survenir: ['venir', '', 'sur'],
  vaincre: ['convaincre', 'con', ''],
};
// Verbs that never agree keep one past participle, as rire, mentir and réagir do.
const ONE_PTCP = set(`consentir recourir`);
// Past participles that differ from the model's pattern: masculine, feminine, masculine plural, feminine plural.
const PTCP = {
  démentir: 'démenti démentie démentis démenties',
  dissoudre: 'dissous dissoute dissous dissoutes',
  inclure: 'inclus incluse inclus incluses',
};
// Cells left out because they are spelled like a word already in the list: maintenant (the adverb) and entreprise,
// entreprises (the noun).
const SKIP_CELLS = { entreprendre: ['ptcp.f', 'ptcp.fpl'], maintenir: ['prsptcp'] };

// Irregular verbs with no model in the list, written out cell by cell.
const P = ['1sg', '2sg', '3sg', '1pl', '2pl', '3pl'];
const persons = (tense, list) => list.split(' ').map((s, i) => [`${tense}.${P[i]}`, s]);
const endings = (tense, stem, list) => persons(tense, list.split(' ').map((e) => stem + e).join(' '));
const IMPF = 'ais ais ait ions iez aient';
const ptcp4 = (m) => [['ptcp', m], ['ptcp.f', `${m}e`], ['ptcp.pl', m.endsWith('s') ? m : `${m}s`], ['ptcp.fpl', `${m}es`]];
// acquérir, conquérir: acquiers, acquérons, acquièrent; j'acquerrai; acquis.
const querir = (s) => ({ paradigms: [], cells: [
  ...endings('prs', s, 'iers iers iert érons érez ièrent'), ...endings('impf', `${s}ér`, IMPF),
  ...endings('sbjv', s, 'ière ières ière érions ériez ièrent'), ...endings('fut', `${s}err`, 'ai as a ons ez ont'),
  ...endings('cond', `${s}err`, IMPF), ...ptcp4(`${s}is`), ['prsptcp', `${s}érant`]] });
// émouvoir, promouvoir: émeus, émouvons, émeuvent; j'émouvrai; ému, promu.
const mouvoir = (s, ptcp) => ({ paradigms: [], cells: [
  ...endings('prs', s, 'eus eus eut ouvons ouvez euvent'), ...endings('impf', `${s}ouv`, IMPF),
  ...endings('sbjv', s, 'euve euves euve ouvions ouviez euvent'), ...endings('fut', `${s}ouvr`, 'ai as a ons ez ont'),
  ...endings('cond', `${s}ouvr`, IMPF), ...ptcp4(ptcp), ['prsptcp', `${s}ouvant`]] });
// extraire: extrais, extrayons, extraient; extrait; the future follows the infinitive.
const traire = (s) => ({ paradigms: FUT, cells: [
  ...endings('prs', s, 'ais ais ait ayons ayez aient'), ...endings('impf', `${s}ay`, IMPF),
  ...endings('sbjv', s, 'aie aies aie ayions ayiez aient'), ...ptcp4(`${s}ait`), ['prsptcp', `${s}ayant`]] });
const HAND = {
  accroître: { paradigms: FUT, cells: [
    ...persons('prs', 'accrois accrois accroît accroissons accroissez accroissent'), ...endings('impf', 'accroiss', IMPF),
    ...endings('sbjv', 'accroiss', 'e es e ions iez ent'), ...ptcp4('accru'), ['prsptcp', 'accroissant']] },
  acquérir: querir('acqu'),
  conquérir: querir('conqu'),
  émouvoir: mouvoir('ém', 'ému'),
  extraire: traire('extr'),
  promouvoir: mouvoir('prom', 'promu'),
};

// Nouns with no plural form: invariable (sans-abri), plural only (fiançailles) or never plural (télétravail, and foi,
// whose plural would be spelled like fois). A noun ending in s, x or z takes no plural pattern either.
const NOUN_PLAIN = set(`bien-être fiançailles foi sans-abri télétravail`);

// Adjectives in -al whose plural takes -s (banals, fatals); feminines no pattern builds.
const ADJ_REGULAR = set(`banal fatal`);
const ADJ_F = {
  ambigu: 'ambiguë',
  conservateur: 'conservatrice',
  franc: 'franche',
  prometteur: 'prometteuse',
  trompeur: 'trompeuse',
};

function verbParadigms(lemma) {
  if (IR_VERBS.has(lemma)) return IR;
  if (RE_VERBS.has(lemma)) return RE;
  if (lemma.endsWith('er')) return ER;
  throw new Error(`b2-words: ${lemma} needs a class (IR_VERBS, RE_VERBS, LIKE or HAND)`);
}

function paradigms(lemma, pos) {
  if (pos === 'noun') {
    if (NOUN_PLAIN.has(lemma) || /[sxz]$/.test(lemma) || lemma.includes(' ')) return [];
    if (/(eau|au|eu)$/.test(lemma)) return ['fr:cx:noun.plural.x'];
    if (/al$/.test(lemma)) return ['fr:cx:noun.plural.al'];
    return ['fr:cx:noun.plural'];
  }
  if (pos === 'adjective') {
    if (ADJ_REGULAR.has(lemma)) return ['fr:cx:adj.regular'];
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

// Spelling changes the plain -er patterns miss, written as irregular forms as core-words.mjs does: -ger and -cer
// keep a soft g or c before a and o (influençons, dirigeait); -yer verbs write i before a silent e (aboie, aboiera);
// DOUBLE verbs double the consonant there (projette); other e + consonant + er verbs take è (relève, relèvera);
// é + consonants + er verbs, and é + consonants + uer verbs such as déléguer, take è in the singular and third plural of
// the present and subjunctive (gère, délègue).
const SILENT_E = /^(prs|sbjv)\.(1sg|2sg|3sg|3pl)$|^(fut|cond)\./;
const SILENT_E_PRESENT = /^(prs|sbjv)\.(1sg|2sg|3sg|3pl)$/;
function spell(lemma, cell, regular) {
  let base = lemma.slice(0, -2);
  const ending = regular.slice(base.length);
  if (/^[ao]/.test(ending) && base.endsWith('g')) base += 'e';
  else if (/^[ao]/.test(ending) && base.endsWith('c')) base = `${base.slice(0, -1)}ç`;
  if (SILENT_E.test(cell)) {
    if (base.endsWith('y')) base = `${base.slice(0, -1)}i`;
    else if (DOUBLE.has(lemma)) base += base.at(-1);
    else if (/e[bcdfghjklmnpqrstvwxz]$/.test(base)) base = base.replace(/e([bcdfghjklmnpqrstvwxz])$/, 'è$1');
  }
  if (SILENT_E_PRESENT.test(cell) && /é[^aeiouyàâäéèêëîïôöùûü]+u?$/.test(base)) base = base.replace(/é([^aeiouyàâäéèêëîïôöùûü]+u?)$/, 'è$1');
  return base + ending;
}

// Words whose plain ID belongs to a word of the same part of speech spelled the same without accents: the ID adds a
// word for the meaning, since a part of speech would not tell them apart.
const IDS = { répartir: 'fr:lex:repartir.distribute', retraité: 'fr:lex:retraite.person' };

const ENTRY = /^(\S+?)(?:\/([GJ]))?(?: (m|f|m\/f))?: (.+)$/;
const collator = new Intl.Collator('fr');
function entries(text, where) {
  const list = text.split('\n').map((s) => s.trim()).filter(Boolean).map((line) => {
    const m = ENTRY.exec(line);
    if (!m) throw new Error(`b2-words: cannot read "${line}" (${where})`);
    return { lemma: m[1].replace(/_/g, ' '), mark: m[2] ?? 'F', gender: m[3] ?? null, gloss: m[4] };
  });
  list.forEach((e, i) => {
    if (i > 0 && collator.compare(list[i - 1].lemma, e.lemma) >= 0) {
      throw new Error(`b2-words: ${where} is not in alphabetical order at ${e.lemma}`);
    }
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
const verbOf = (lemma) => {
  const h = headwords.find((x) => x.lemma === lemma && x.pos === 'verb');
  if (!h) throw new Error(`b2-words: model verb ${lemma} is not in the word list`);
  return h;
};
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
  let pids;
  let cells;
  if (HAND[lemma]) {
    ({ paradigms: pids, cells } = HAND[lemma]);
  } else if (LIKE[lemma]) {
    const [model, from, to] = LIKE[lemma];
    if (!model.startsWith(from) || to + model.slice(from.length) !== lemma) throw new Error(`b2-words: ${lemma} is not ${model} with ${from} -> ${to}`);
    const m = verbOf(model);
    pids = [...m.paradigms];
    cells = forms.filter((f) => f.of === m.id).map((f) => {
      if (!f.surface.startsWith(from)) throw new Error(`b2-words: ${model} form ${f.surface} does not start with ${from}`);
      return [f.cell, to + f.surface.slice(from.length)];
    });
  } else {
    pids = verbParadigms(lemma);
    cells = [];
    if (pids === ER) {
      for (const pid of pids) {
        for (const rule of paradigmRules.get(pid)) {
          const regular = lemma.slice(0, -2) + rule.add;
          const surface = spell(lemma, rule.cell, regular);
          if (surface !== regular) cells.push([rule.cell, surface]);
        }
      }
    }
  }
  const ptcp = PTCP[lemma] ?? (ONE_PTCP.has(lemma) ? (cells.find(([c]) => c === 'ptcp')?.[1] ?? regularOf(lemma, pids, 'ptcp')) : null);
  if (ptcp) {
    pids = pids.filter((p) => !p.startsWith('fr:cx:ptcp.'));
    cells = cells.filter(([c]) => !c.startsWith('ptcp'));
    ptcp.split(' ').forEach((s, i) => cells.push([['ptcp', 'ptcp.f', 'ptcp.pl', 'ptcp.fpl'][i], s]));
  }
  const skip = SKIP_CELLS[lemma] ?? [];
  return { pids, cells: cells.filter(([c]) => !skip.includes(c)) };
}

function adjectiveCells(lemma) {
  const f = ADJ_F[lemma];
  return f ? [['f', f], ['fpl', `${f}s`]] : [];
}

const collected = { headwords: 0, forms: 0, renamed: [] };
const listed = new Set();
const plan = [];
for (const [level, groups] of Object.entries(WORDS)) {
  for (const [pos, text] of Object.entries(groups)) {
    for (const e of entries(text, `${level} ${pos}`)) {
      if (listed.has(`${e.lemma}|${pos}`)) throw new Error(`b2-words: ${e.lemma} (${pos}) is listed twice`);
      listed.add(`${e.lemma}|${pos}`);
      plan.push({ ...e, level, pos });
    }
  }
}
for (const key of [...Object.keys(LIKE), ...Object.keys(HAND), ...IR_VERBS, ...RE_VERBS, ...ONE_PTCP, ...Object.keys(PTCP),
  ...Object.keys(SKIP_CELLS), ...DOUBLE]) {
  if (!listed.has(`${key}|verb`)) throw new Error(`b2-words: ${key} has a verb class but is not a listed verb`);
}
for (const key of [...Object.keys(ADJ_F), ...ADJ_REGULAR]) {
  if (!listed.has(`${key}|adjective`)) throw new Error(`b2-words: ${key} has adjective forms but is not a listed adjective`);
}
for (const key of NOUN_PLAIN) {
  if (!listed.has(`${key}|noun`)) throw new Error(`b2-words: ${key} has noun forms but is not a listed noun`);
}

for (const e of plan) {
  if (headwords.some((h) => h.lemma === e.lemma && h.pos === e.pos)) continue; // already in the word list
  let id = IDS[e.lemma] ?? `fr:lex:${keyOf(e.lemma)}`;
  if (byId.has(id)) {
    id = `${id}.${e.pos}`;
    collected.renamed.push(`${e.lemma} -> ${id}`);
    if (byId.has(id)) continue;
  }
  const shape = e.pos === 'verb' ? verbShape(e.lemma) : { pids: paradigms(e.lemma, e.pos), cells: [] };
  if (e.pos === 'adjective') shape.cells = adjectiveCells(e.lemma);
  const h = {
    cefr: e.level,
    cefrSource: SOURCE[e.mark],
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
console.log(`b2-words: ${collected.headwords} headwords and ${collected.forms} irregular forms added`
  + `${collected.renamed.length ? `; IDs with a part of speech: ${collected.renamed.join(', ')}` : ''}`);
