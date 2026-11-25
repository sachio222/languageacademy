# French course fix list

1489 errors, 981 warnings, 127 modules with errors.

## How to read this

A checker read every lesson, practice, reading and exam in course order and tested one thing for each French word and grammar pattern: was it taught before the learner meets it? Positions count the modules in course order, from 1 to 160. A code such as fr:lex:livre names the entry in the course word list, and a code starting fr:cx: names a grammar pattern. The Reference unit (alphabet, numbers, days and months, colors and similar pages) has no position, because learners can open it at any time. The words on its pages L'Alphabet, Les Nombres, Jours et Mois, Les Fêtes, Les Couleurs and La Francophonie count as available from position 1 on, so a lesson may use a number or a day without teaching it first. Only the nouns, adjectives, numbers and letters on those pages count, with their forms; verbs and grammar words such as le or je do not. A Reference word spelled like another word, such as the letter y and the pronoun y, counts only once a lesson teaches that spelling. Sections 6 and 7 count Reference words apart from the words lessons teach.

Besides the exercises, the checker reads the French a learner sees on concept cards, hints, instructions, vocabulary notes, feedback on a wrong answer, module titles and the four help screens. A line that comes from one of these names it before the quote, for example Hint: or Help screen:, instead of Sentence:.

Section 1 lists words and patterns used before they are taught, module by module. Each line gives the reason (taught in a later module, a form such as bonne of a word taught earlier as bon, or not taught anywhere) and quotes the sentence it came from. The default fix is to teach the word earlier, in the module where it is first used; each line names that module. If the sentence does not need the word, remove it instead.

Section 2 lists exam and practice topics the course has not taught by that point. Section 3 counts, per module, exercises after Unit 1 that show an English prompt and ask for the French; these should become other exercise types. Section 4 lists words and patterns explained in more than one lesson: keep the explanation in the lesson named and turn the others into practice. A word counts as explained where it heads a vocabulary entry, not where it appears inside a longer phrase. Section 5 counts taught words that do not come back soon enough to stick.

Section 6 measures the course against the CEFR levels, the scale of the Common European Framework of Reference that runs from A1 for beginners through A2 and B1 to C2. Each level has a core list: the words and grammar patterns new at that level, so a learner at A2 needs both the A1 and A2 lists. A level counts as reached once 90% of its core words are taught, open in the Reference unit or cognates, and every grammar pattern on its list is taught. The level of each word and pattern is our own grading, informed by public sources: the Eaquals inventory of French grammar and functions by level, word frequencies from Lexique, and FLELex, which grades words by how often French textbooks use them at each level. A module's level is the highest level among the words and patterns it teaches. Section 6 also lists level labels that claim more than the modules teach, and modules that teach a word or pattern two or more levels above the highest level reached before them (counting from A1 until the course reaches a level).

Section 7 lists what a learner can do with French at each level, such as asking the time, and the module where each becomes possible. Section 8 lists modules that store exercises in an older format.

Section 9 lists words missing from the course word list. Most are typos, English words, or accepted answers typed without accents or apostrophes. Section 10 lists everything else, including fill-in-the-blank sentences whose blank sits inside a word, on a punctuation mark that the app then hides, or after the full stop.

This list was checked for English speakers. A cognate is a French word they read correctly without a lesson, such as restaurant. From the cognates lesson on, every cognate counts as known, in French the learner types as well as French they read or hear, so Section 1 does not list it. The cognates come from curriculum-graph/pairs/en-fr/cognates.json.

## Lesson text to fix

- 17. ça - Survival Phrases: the vocabulary note "ça + va (être)" names the wrong verb: "va" comes from aller, so the note should read "ça + va (aller)".
- 68. Time & Taste Practice - Fill in the Blanks: the concept cards teach "plus bon que" and "c'est plus bon", which are wrong French; the comparative of bon is "meilleur" ("meilleur que", "c'est meilleur").
- 69. Unit exam · Time & Taste: the concept cards teach "plus bon que (better than)" and "c'est plus bon", which are wrong French; the comparative of bon is "meilleur" ("meilleur que", "c'est meilleur").
- 112. Causal & Reason Words - Explaining Why: the gap-fill "Je suis en retard ___ le traffic" with answer "à cause du" reads "à cause du le traffic" once filled; drop "le" from the prompt. "traffic" is the English spelling: French writes "trafic" (also in the à cause de concept card and a feedback line).
- 113. Spatial Prepositions - Position & Location: the gap-fill "La lampe est ___ le lit" with answer "au-dessus du" reads "au-dessus du le lit" once filled; drop "le" from the prompt. "il-y-a" in the parmi exercises is written "il y a", without hyphens.
- 118. être Verbs - DR & MRS VANDERTRAMP (went, came, left): the gap-fill "Elle ne ___ pas ___" with answer "est pas venue" reads "Elle ne est pas venue" once filled; French elides it to "Elle n'est pas venue".
- 121. Imparfait Formation - All Verbs (was doing, used to do): the gap-fill "Je ___ au café quand tu m'as appelé" with answer "allais" reads "Je allais"; French elides it to "J'allais".
- 123. Past Tense Composition - Building Complete Stories: the gap-fill "Pendant que je ___, on a parlé pendant une heure" with answer "étais" reads "je étais"; French elides it to "j'étais" (and "While I was there" needs "là": "Pendant que j'étais là").
- 125. Discourse & Past Tense Practice - Fill in the Blanks: the gap-fill "Il est fatigué ___ du travail" with answer "à cause de" reads "à cause de du travail" once filled; French says "à cause du travail": make the answer "à cause du" and drop "du" from the prompt.
- 156. Daily Essentials Practice - Fill in the Blanks: the gap-fill "Je ___ mes amis au café" with answer "attends" reads "Je attends"; French elides it to "J'attends".
- 160. Natural Phenomena - How Nature Works: the vocabulary entry and concept card "rendre + adjective" have the English placeholder "adjective" where a French example belongs (for example "rendre heureux").

# 1. Untaught words and patterns

## Essential Grammar

### 2. Core Pronouns - The Building Blocks

- "va" (fr:lex:aller): taught later, at position 17 (ça - Survival Phrases); teach in this module. Concept card: "On va au café"
- fr:cx:contraction.a: taught later, at position 30 (Contractions - du, au, de la, à la); teach in this module. Concept card: "On va au café"

### 3. Essential Verb - être (to be)

- "heureux" (fr:lex:heureux): taught later, at position 124 (Reading - Une Histoire du Passé); teach in this module. Concept card: "Je suis heureux"
- "étudiant" (fr:lex:etudier): taught later, at position 84 (Studying & Reviewing - étudier & réviser); teach in this module. Concept card: "Je suis étudiant"
- "à" (fr:lex:a.preposition): taught later, at position 25 (Prepositions - Spatial & Relational Words); teach in this module. Concept card: "Je suis à Paris"

### 6. Cognates

- "veux" (fr:lex:vouloir): taught later, at position 19 (Essential Verb - vouloir (to want)); teach in this module. Guide: "Je veux un café."
- "du" (fr:lex:du): taught later, at position 30 (Contractions - du, au, de la, à la); teach in this module. Guide: "Je veux du café."
- fr:cx:article.partitive: taught later, at position 30 (Contractions - du, au, de la, à la); teach in this module. Guide: "Je veux du café."

### 7. Basic Nouns - People & Things

- "c'" (fr:lex:ce.pronoun): taught later, at position 16 (Demonstratives - It, That, This); teach in this module. Sentence: "c'est une maison"
- fr:cx:cest: taught later, at position 17 (ça - Survival Phrases); teach in this module. Sentence: "c'est une maison"

### 11. Reading Comprehension - First Paragraph!

- "bons" (fr:lex:bon): the word bon is taught at position 1, but this form is not; teach in a lesson before this module. Passage: "…et des chiens. Les chiens sont très bons, mais les chats sont bons aussi."
- "C'" (fr:lex:ce.pronoun): taught later, at position 16 (Demonstratives - It, That, This); teach in Basic Nouns - People & Things (position 7). Passage: "C'est un très bon jour ! Nous sommes très bons."
- fr:cx:cest: taught later, at position 17 (ça - Survival Phrases); teach in Basic Nouns - People & Things (position 7). Passage: "C'est un très bon jour ! Nous sommes très bons."

## Asking & Describing

### 19. Essential Verb - vouloir (to want)

- "te" (fr:lex:te): taught later, at position 35 (Object Pronouns - Him, Her, It, Them); teach in this module. Sentence: "je veux ça s'il te plaît"
- fr:cx:chunk.sil-te-plait: taught later, at position 42 (Survival Phrases - Real-World Essentials); teach in this module. Sentence: "je veux ça s'il te plaît"
- fr:cx:q.inversion: taught later, at position 22 (Question Words - Ask Anything!); teach in this module. Concept card: "Veux-tu un livre?"

### 20. Essential Verb - pouvoir (can)

- "te" (fr:lex:te): taught later, at position 35 (Object Pronouns - Him, Her, It, Them); teach in Essential Verb - vouloir (to want) (position 19). Sentence: "je peux avoir ça s'il te plaît"
- fr:cx:chunk.sil-te-plait: taught later, at position 42 (Survival Phrases - Real-World Essentials); teach in Essential Verb - vouloir (to want) (position 19). Sentence: "je peux avoir ça s'il te plaît"
- fr:cx:q.inversion: taught later, at position 22 (Question Words - Ask Anything!); teach in Essential Verb - vouloir (to want) (position 19). Concept card: "Peux-tu être un ami?"

### 21. Essential Verb - voir (to see)

- fr:cx:pronoun.direct-object: taught later, at position 35 (Object Pronouns - Him, Her, It, Them); teach in this module. Concept card: "je le vois"

### 22. Question Words - Ask Anything!

- "de" (fr:lex:de): taught later, at position 25 (Prepositions - Spatial & Relational Words); teach in Saying No - Negation Guide (position 15). Sentence: "combien est-ce que tu as de livres"
- fr:cx:article.partitive: taught later, at position 30 (Contractions - du, au, de la, à la); teach in Cognates (position 6). Sentence: "combien est-ce que tu as de livres"
- "fais" (fr:lex:faire): taught later, at position 43 (Essential Verb - faire (to do/make)); teach in this module. Concept card: "Que fais-tu?"

### 23. The Power to Ask Anything

- "viens" (fr:lex:venir): taught later, at position 31 (Essential Verb - venir (to come)); teach in this module. Guide: "Quand est-ce que tu viens ?"
- "soir" (fr:lex:soir): taught later, at position 53 (Reading Comprehension - La nouvelle époque de Marie); teach in this module. Guide: "Tu viens ce soir."
- "prêt" (fr:lex:pret): not taught anywhere in the course; teach in this module. Guide: "Tu es prêt."

### 24. Stressed Pronouns - moi, toi, lui...

- "avec" (fr:lex:avec): taught later, at position 25 (Prepositions - Spatial & Relational Words); teach in this module. Sentence: "avec moi"
- "pour" (fr:lex:pour): taught later, at position 25 (Prepositions - Spatial & Relational Words); teach in this module. Sentence: "pour toi"

### 25. Prepositions - Spatial & Relational Words

- "porte" (fr:lex:porte): taught later, at position 51 (Everyday Nouns - Life & World); teach in this module. Sentence: "le livre est derrière la porte"

### 27. Reading Comprehension - Rendez-vous en Normandie

- "ma" (fr:lex:mon): taught later, at position 36 (Possessive Adjectives - My, Your, His, Her); teach in a lesson before this module. Sentence: "ma nouvelle voiture"
- fr:cx:possessive.adjective: taught later, at position 36 (Possessive Adjectives - My, Your, His, Her); teach in a lesson before this module. Sentence: "ma nouvelle voiture"
- "sa" (fr:lex:son): taught later, at position 36 (Possessive Adjectives - My, Your, His, Her); teach in a lesson before this module. Sentence: "dans sa voiture"
- "mon" (fr:lex:mon): taught later, at position 36 (Possessive Adjectives - My, Your, His, Her); teach in a lesson before this module. Sentence: "J'ai mon chien ___ ma voiture"
- "en" (fr:lex:en): taught later, at position 48 (Time & Frequency - now, always, never, today); teach in a lesson before this module. Sentence: "ces belles choses en Normandie"
- "y" (fr:lex:y.pronoun): taught later, at position 83 (Talking About People in General); teach in a lesson before this module. Passage: "…? C'est un livre sur la Normandie. Il y a Mont-Saint-Michel, Rouen... Ces…"
- fr:cx:il-y-a: taught later, at position 121 (Imparfait Formation - All Verbs (was doing, used to do)); teach in a lesson before this module. Passage: "Ça ? C'est un livre sur la Normandie. Il y a Mont-Saint-Michel, Rouen... Ces…"
- "ville" (fr:lex:ville): taught later, at position 51 (Everyday Nouns - Life & World); teach in a lesson before this module. Passage: "La ville a de vieilles et belles maisons. Est-ce que tu veux voir ces maisons ?"
- fr:cx:article.partitive: taught later, at position 30 (Contractions - du, au, de la, à la); teach in Cognates (position 6). Passage: "La ville a de vieilles et belles maisons. Est-ce que tu veux voir ces maisons ?"

### 29. Unit exam · Asking & Describing

- "venir" (fr:lex:venir): taught later, at position 31 (Essential Verb - venir (to come)); teach in The Power to Ask Anything (position 23). Unit can-do example: "Qu’est-ce que c’est ? Je veux ça. Je peux venir."

## Movement & Possession

### 30. Contractions - du, au, de la, à la

- "pain" (fr:lex:pain): taught later, at position 51 (Everyday Nouns - Life & World); teach in this module. Concept card: "du pain"
- "viande" (fr:lex:viande): taught later, at position 63 (Everyday Food Nouns); teach in this module. Concept card: "de la viande"
- "eau" (fr:lex:eau): taught later, at position 51 (Everyday Nouns - Life & World); teach in this module. Concept card: "de l'eau"
- "école" (fr:lex:ecole): taught later, at position 91 (Knowledge & Learning - Essential Nouns); teach in this module. Concept card: "à l'école"

### 31. Essential Verb - venir (to come)

- "ma" (fr:lex:mon): taught later, at position 36 (Possessive Adjectives - My, Your, His, Her); teach in a lesson before Reading Comprehension - Rendez-vous en Normandie (position 27). Sentence: "je viens de ma maison"
- fr:cx:possessive.adjective: taught later, at position 36 (Possessive Adjectives - My, Your, His, Her); teach in a lesson before Reading Comprehension - Rendez-vous en Normandie (position 27). Sentence: "je viens de ma maison"
- "son" (fr:lex:son): taught later, at position 36 (Possessive Adjectives - My, Your, His, Her); teach in a lesson before Reading Comprehension - Rendez-vous en Normandie (position 27). Sentence: "il vient avec son chat"
- fr:cx:q.qui-est-ce-qui: taught later, at position 164 (qui est-ce qui vs qui est-ce que - Master 'Who' Questions); teach in this module. Sentence: "qui est-ce qui vient?"
- "d'" (fr:lex:de): the word de is taught at position 25, but this form is not; teach in Saying No - Negation Guide (position 15). Sentence: "d'où viens-tu?"
- "te" (fr:lex:te): taught later, at position 35 (Object Pronouns - Him, Her, It, Them); teach in Essential Verb - vouloir (to want) (position 19). Sentence: "je viens te voir"
- "me" (fr:lex:me): taught later, at position 35 (Object Pronouns - Him, Her, It, Them); teach in this module. Sentence: "pourquoi viens-tu me voir?"

### 32. Essential Verb - aller (to go)

- "ma" (fr:lex:mon): taught later, at position 36 (Possessive Adjectives - My, Your, His, Her); teach in a lesson before Reading Comprehension - Rendez-vous en Normandie (position 27). Sentence: "nous allons avec ma voiture"
- fr:cx:possessive.adjective: taught later, at position 36 (Possessive Adjectives - My, Your, His, Her); teach in a lesson before Reading Comprehension - Rendez-vous en Normandie (position 27). Sentence: "nous allons avec ma voiture"
- fr:cx:q.qui-est-ce-que: taught later, at position 164 (qui est-ce qui vs qui est-ce que - Master 'Who' Questions); teach in this module. Sentence: "qui est-ce que tu veux aller?"
- "manger" (fr:lex:manger): taught later, at position 53 (Reading Comprehension - La nouvelle époque de Marie); teach in this module. Concept card: "Je vais manger"
- "partir" (fr:lex:partir): taught later, at position 34 (Essential Verb - partir (to leave)); teach in this module. Concept card: "je vais partir"

### 33. Understanding Verb Patterns

- "partir" (fr:lex:partir): taught later, at position 34 (Essential Verb - partir (to leave)); teach in Essential Verb - aller (to go) (position 32). Guide: "partir"

### 36. Possessive Adjectives - My, Your, His, Her

- "frère" (fr:lex:frere): taught later, at position 79 (Essential Vocabulary - Time, People & Ideas); teach in this module. Concept card: "ton frère"
- "sœur" (fr:lex:sœur): taught later, at position 79 (Essential Vocabulary - Time, People & Ideas); teach in this module. Concept card: "ta sœur"
- "bureau" (fr:lex:bureau): not taught anywhere in the course; teach in this module. Concept card: "votre bureau"
- "bagages" (fr:lex:bagage): not taught anywhere in the course; teach in this module. Concept card: "vos bagages"
- "jardin" (fr:lex:jardin): taught later, at position 53 (Reading Comprehension - La nouvelle époque de Marie); teach in this module. Concept card: "notre jardin"

### 39. Reading Comprehension - La Première Page

- "Paix" (fr:lex:paix): not taught anywhere in the course; teach in a lesson before this module. Sentence: "Café de la Paix"
- "Comte" (fr:lex:comte): not taught anywhere in the course; teach in a lesson before this module. Sentence: "Le Comte de Monte-Cristo"
- "aujourd'hui" (fr:lex:aujourd-hui): taught later, at position 48 (Time & Frequency - now, always, never, today); teach in a lesson before this module. Sentence: "Il a son ___ ___ aujourd'hui"
- "lieues" (fr:lex:lieue): not taught anywhere in the course; teach in a lesson before this module. Passage: "…livre de Jules Verne, Vingt mille lieues sous les mers. Il est nouveau. Tu…"
- fr:cx:chunk.sil-te-plait: taught later, at position 42 (Survival Phrases - Real-World Essentials); teach in Essential Verb - vouloir (to want) (position 19). Passage: "Oui, s'il te plaît, au café."

### 40. Movement & Possession Practice - Fill in the Blanks

- "demain" (fr:lex:demain): taught later, at position 48 (Time & Frequency - now, always, never, today); teach in a lesson before this module. Sentence: "Nous partons demain."
- "magasin" (fr:lex:magasin): not taught anywhere in the course; teach in a lesson before this module. Sentence: "Elle vient du magasin."

## Everyday Words

### 43. Essential Verb - faire (to do/make)

- fr:cx:causative.faire: taught later, at position 138 (Je me fais couper... - Service Phrases); teach in this module. Sentence: "nous lui faisons voir notre maison"
- fr:cx:pronoun.indirect-object: taught later, at position 148 (donner - To Give); teach in this module. Sentence: "nous lui faisons voir notre maison"

### 44. Essential Verb - devoir (must)

- "maintenant" (fr:lex:maintenant): taught later, at position 48 (Time & Frequency - now, always, never, today); teach in this module. Sentence: "il doit partir maintenant"

### 45. Essential Verb - parler (to speak)

- "ensemble" (fr:lex:ensemble): taught later, at position 124 (Reading - Une Histoire du Passé); teach in this module. Concept card: "nous parlons ensemble"

### 46. Essential Verbs - chercher & trouver

- "clés" (fr:lex:cle): taught later, at position 151 (Search & Find - chercher, trouver); teach in this module. Concept card: "je cherche mes clés"
- "trouvé" (fr:lex:trouver): the word trouver is taught at position 46, but this form is not; teach in this module. Concept card: "j'ai trouvé!"
- fr:cx:passe-compose.avoir: taught later, at position 64 (manger - To Eat (Present & Past)); teach in this module. Concept card: "j'ai trouvé!"

### 48. Time & Frequency - now, always, never, today

- "ici" (fr:lex:ici): taught later, at position 50 (Location Adverbs - here, there, everywhere); teach in this module. Sentence: "nous sommes toujours ici"
- "mange" (fr:lex:manger): taught later, at position 53 (Reading Comprehension - La nouvelle époque de Marie); teach in Essential Verb - aller (to go) (position 32). Sentence: "je mange parfois"

### 49. Negation Part 2 - I can't, I won't, I never

- "ici" (fr:lex:ici): taught later, at position 50 (Location Adverbs - here, there, everywhere); teach in Time & Frequency - now, always, never, today (position 48). Sentence: "ils ne sont pas ici"

### 51. Everyday Nouns - Life & World

- "travailler" (fr:lex:travailler): taught later, at position 115 (Passé Composé - Regular -ER Verbs (I spoke, I ate)); teach in this module. Sentence: "je dois travailler"
- "vit" (fr:lex:vivre): taught later, at position 144 (Reading - Mes Rêves et Mes Espoirs); teach in this module. Sentence: "elle vit dans la ville"
- "habite" (fr:lex:habiter): not taught anywhere in the course; teach in this module. Sentence: "elle habite dans la ville"

### 53. Reading Comprehension - La nouvelle époque de Marie

- "Éditeurs" (fr:lex:editeur): not taught anywhere in the course; teach in a lesson before this module. Sentence: "Les Éditeurs"
- "carrefour" (fr:lex:carrefour): not taught anywhere in the course; teach in a lesson before this module. Sentence: "carrefour de l'Odéon"
- "alors" (fr:lex:alors): taught later, at position 92 (Discourse Markers - Sound Like a Native); teach in a lesson before this module. Passage: "Ah bon ! Ce soir alors ! Tu veux venir à Saint-Germain ce soir avec moi ?"
- "gentil" (fr:lex:gentil): taught later, at position 107 (Irregular Commands - être, avoir, aller, faire); teach in a lesson before this module. Passage: "…non ! Je ne veux pas ça. Tu es très gentil, mais je vais payer avec ma carte."
- "heures" (fr:lex:heure): taught later, at position 79 (Essential Vocabulary - Time, People & Ideas); teach in a lesson before this module. Passage: "Ça va. Alors, ce soir à six heures ?"
- fr:cx:conditionnel-present: taught later, at position 58 (Should & Could - Advice and Possibility); teach in a lesson before this module. Passage: "Nous voudrions du pain et de l'eau, s'il vous plaît."
- "Miam" (fr:lex:miam): not taught anywhere in the course; teach in a lesson before this module. Passage: "Miam ! Le pain est très bon ici. C'est délicieux !"
- fr:cx:comparative.irregular: taught later, at position 56 (Comparisons & Intensity); teach in a lesson before this module. Passage: "Oui ! Je viens toujours ici. Je ne vais jamais aux autres cafés. Ce café est le…"
- fr:cx:superlative: taught later, at position 56 (Comparisons & Intensity); teach in a lesson before this module. Passage: "Oui ! Je viens toujours ici. Je ne vais jamais aux autres cafés. Ce café est le…"
- "bons" (fr:lex:bon): the word bon is taught at position 1, but this form is not; teach in a lesson before Reading Comprehension - First Paragraph! (position 11). Passage: "Oui ! Nous pouvons être de bons amis ! Et tu vas voir, la vie ici est très…"
- "Mmmh" (fr:lex:mmmh): not taught anywhere in the course; teach in a lesson before this module. Passage: "Mmmh! J'aime cette ville. Je ne vais jamais partir !"
- "Fin" (fr:lex:fin): taught later, at position 79 (Essential Vocabulary - Time, People & Ideas); teach in a lesson before this module. Passage: "Fin!"

### 54. Everyday Words Practice - Fill in the Blanks

- "vu" (fr:lex:voir): the word voir is taught at position 21, but this form is not; teach in a lesson before this module. Sentence: "Tu as vu ça hier."
- fr:cx:passe-compose.avoir: taught later, at position 64 (manger - To Eat (Present & Past)); teach in Essential Verbs - chercher & trouver (position 46). Sentence: "Tu as vu ça hier."

### 55. Unit exam · Everyday Words

- "beaucoup" (fr:lex:beaucoup): taught later, at position 80 (Reading Comprehension - Un Voyage en Famille); teach in a lesson before this module. Sentence: "merci beaucoup"
- "bas" (fr:lex:bas): not taught anywhere in the course; teach in a lesson before this module. Sentence: "là bas"

## Time & Taste

### 56. Comparisons & Intensity

- "cher" (fr:lex:cher): not taught anywhere in the course; teach in this module. Sentence: "c'est trop cher"

### 57. Slang - Comparisons & Intensity

- "fou" (fr:lex:fou): not taught anywhere in the course; teach in this module. Vocabulary note: "fou"

### 58. Should & Could - Advice and Possibility

- "travailler" (fr:lex:travailler): taught later, at position 115 (Passé Composé - Regular -ER Verbs (I spoke, I ate)); teach in Everyday Nouns - Life & World (position 51). Sentence: "il devrait travailler"
- "m'" (fr:lex:me): the word me is taught at position 35, but this form is not; teach in this module. Sentence: "est-ce que tu pourrais m'aider"

### 60. aimer - To Like / To Love

- "travailler" (fr:lex:travailler): taught later, at position 115 (Passé Composé - Regular -ER Verbs (I spoke, I ate)); teach in Everyday Nouns - Life & World (position 51). Sentence: "nous aimons travailler"
- "mère" (fr:lex:mere): taught later, at position 79 (Essential Vocabulary - Time, People & Ideas); teach in this module. Concept card: "j'aime ma mère"

### 61. être - Past Tense (was / were)

- "heureux" (fr:lex:heureux): taught later, at position 124 (Reading - Une Histoire du Passé); teach in Essential Verb - être (to be) (position 3). Concept card: "j'étais heureux"

### 64. manger - To Eat (Present & Past)

- "ensemble" (fr:lex:ensemble): taught later, at position 124 (Reading - Une Histoire du Passé); teach in Essential Verb - parler (to speak) (position 45). Sentence: "nous mangeons ensemble"
- "passé" (fr:lex:passe): not taught anywhere in the course; teach in this module. Vocabulary note: "passé composé - avoir + mangé"

### 66. boire - To Drink (Present & Past)

- "passé" (fr:lex:passe): not taught anywhere in the course; teach in manger - To Eat (Present & Past) (position 64). Vocabulary note: "passé composé"

### 67. Reading Comprehension - La fée verte (The Green Fairy)

- "gens" (fr:lex:gens): taught later, at position 83 (Talking About People in General); teach in a lesson before this module. Sentence: "les gens"
- "passé" (fr:lex:passe): not taught anywhere in the course; teach in manger - To Eat (Present & Past) (position 64). Vocabulary note: "passé composé"
- "retrouvent" (fr:lex:retrouver): taught later, at position 144 (Reading - Mes Rêves et Mes Espoirs); teach in a lesson before this module. Passage: "…van Gogh et Paul Gauguin se retrouvent à leur café préféré pour boire…"
- "dit" (fr:lex:dire): taught later, at position 72 (dire - To Say / To Tell); teach in a lesson before this module. Passage: "…boisson favorite, l'absinthe. On dit parfois qu'elle fait voir des fées…"
- fr:cx:causative.faire: taught later, at position 138 (Je me fais couper... - Service Phrases); teach in Essential Verb - faire (to do/make) (position 43). Passage: "La ville d'Arles. Vincent van Gogh et Paul Gauguin se retrouvent à leur café…"
- fr:cx:pronoun.reflexive: taught later, at position 98 (Reflexive Pronouns - me, te, se, nous, vous); teach in a lesson before this module. Passage: "La ville d'Arles. Vincent van Gogh et Paul Gauguin se retrouvent à leur café…"
- "demande" (fr:lex:demande): taught later, at position 76 (demander - To Ask); teach in a lesson before this module. Passage: "« Comment ça va ? » demande Paul."
- "apporte" (fr:lex:apporter): not taught anywhere in the course; teach in a lesson before this module. Passage: "Le serveur apporte leurs absinthes. Ils boivent beaucoup. Ils l'aiment."
- "beaucoup" (fr:lex:beaucoup): taught later, at position 80 (Reading Comprehension - Un Voyage en Famille); teach in a lesson before Unit exam · Everyday Words (position 55). Passage: "Le serveur apporte leurs absinthes. Ils boivent beaucoup. Ils l'aiment."
- "regarde" (fr:lex:regarder): taught later, at position 105 (Commands - tu form (Informal)); teach in a lesson before this module. Passage: "Vincent regarde autour du café."
- "autour" (fr:lex:autour): taught later, at position 114 (More Spatial Relations - Distance & Proximity); teach in a lesson before this module. Passage: "Vincent regarde autour du café."
- fr:cx:chunk.nest-ce-pas: taught later, at position 168 (Rhetorical & Negative Questions - Advanced Style); teach in a lesson before this module. Passage: "« Bonne idée ! » dit Paul. « Ce café est plus beau la nuit que le jour, n'est-ce…"
- "peintures" (fr:lex:peinture): taught later, at position 144 (Reading - Mes Rêves et Mes Espoirs); teach in a lesson before this module. Passage: "…» dit Vincent. « Je vais à mon hôtel. Je vais chercher mes peintures. »"
- "heures" (fr:lex:heure): taught later, at position 79 (Essential Vocabulary - Time, People & Ideas); teach in a lesson before Reading Comprehension - La nouvelle époque de Marie (position 53). Passage: "Deux heures plus tard"
- "tard" (fr:lex:tard): taught later, at position 124 (Reading - Une Histoire du Passé); teach in a lesson before this module. Passage: "Deux heures plus tard"
- "sourit" (fr:lex:sourire): not taught anywhere in the course; teach in a lesson before this module. Passage: "Vincent sourit. « Peut-être. Nous allons voir. »"
- "appelle" (fr:lex:appeler): the word appeler is taught at position 67, but this form is not; teach in a lesson before this module. Passage: "« Je l'appelle : Terrasse du café le soir, » dit Vincent."
- "Fin" (fr:lex:fin): taught later, at position 79 (Essential Vocabulary - Time, People & Ideas); teach in a lesson before Reading Comprehension - La nouvelle époque de Marie (position 53). Passage: "Fin."

### 68. Time & Taste Practice - Fill in the Blanks

- "cher" (fr:lex:cher): not taught anywhere in the course; teach in Comparisons & Intensity (position 56). Sentence: "C'est trop cher!"
- fr:cx:relative.ou: not taught anywhere in the course; teach in a lesson before this module. Sentence: "C'est le même restaurant où nous avons mangé."
- "ensemble" (fr:lex:ensemble): taught later, at position 124 (Reading - Une Histoire du Passé); teach in Essential Verb - parler (to speak) (position 45). Sentence: "Nous mangeons ensemble."

### 69. Unit exam · Time & Taste

- "cher" (fr:lex:cher): not taught anywhere in the course; teach in Comparisons & Intensity (position 56). Sentence: "trop cher"
- "ensemble" (fr:lex:ensemble): taught later, at position 124 (Reading - Une Histoire du Passé); teach in Essential Verb - parler (to speak) (position 45). Sentence: "nous mangeons ensemble"

## Basic Fluency

### 70. Progressive & Future - Expressing Time

- "viendrons" (fr:lex:venir): the word venir is taught at position 31, but this form is not; teach in this module. Sentence: "nous viendrons"
- "irai" (fr:lex:aller): the word aller is taught at position 17, but this form is not; teach in this module. Sentence: "j'irai"
- "fera" (fr:lex:faire): the word faire is taught at position 43, but this form is not; teach in this module. Sentence: "il ne le fera pas"
- "allais" (fr:lex:aller): the word aller is taught at position 17, but this form is not; teach in this module. Sentence: "j'allais partir"
- "pourrons" (fr:lex:pouvoir): the word pouvoir is taught at position 20, but this form is not; teach in this module. Sentence: "nous ne pourrons pas venir"

### 72. dire - To Say / To Tell

- "vérité" (fr:lex:verite): not taught anywhere in the course; teach in this module. Sentence: "tu dis la vérité"
- "histoire" (fr:lex:histoire): taught later, at position 79 (Essential Vocabulary - Time, People & Ideas); teach in this module. Sentence: "nous disons une histoire"
- "vrai" (fr:lex:vrai): taught later, at position 80 (Reading Comprehension - Un Voyage en Famille); teach in this module. Sentence: "ils disent que c'est vrai"
- "m'" (fr:lex:me): the word me is taught at position 35, but this form is not; teach in Should & Could - Advice and Possibility (position 58). Sentence: "tu m'as dit"
- fr:cx:pronoun.indirect-object: taught later, at position 148 (donner - To Give); teach in Essential Verb - faire (to do/make) (position 43). Concept card: "il lui dit"

### 73. prendre - To Take

- "vite" (fr:lex:vite): taught later, at position 159 (Movement Verbs - Actions in Nature); teach in this module. Sentence: "tu apprends vite"
- "apprend" (fr:lex:apprendre): the word apprendre is taught at position 73, but this form is not; teach in this module. Sentence: "elle apprend l'anglais"
- "anglais" (fr:lex:anglais): not taught anywhere in the course; teach in this module. Sentence: "elle apprend l'anglais"
- "apprenons" (fr:lex:apprendre): the word apprendre is taught at position 73, but this form is not; teach in this module. Sentence: "nous apprenons ensemble"
- "ensemble" (fr:lex:ensemble): taught later, at position 124 (Reading - Une Histoire du Passé); teach in Essential Verb - parler (to speak) (position 45). Sentence: "nous apprenons ensemble"
- "comprend" (fr:lex:comprendre): the word comprendre is taught at position 73, but this form is not; teach in this module. Sentence: "il comprend le français"
- "comprenons" (fr:lex:comprendre): the word comprendre is taught at position 73, but this form is not; teach in this module. Sentence: "nous comprenons la question"
- "comprennent" (fr:lex:comprendre): the word comprendre is taught at position 73, but this form is not; teach in this module. Sentence: "ils ne comprennent pas"
- "pris" (fr:lex:prendre): the word prendre is taught at position 73, but this form is not; teach in this module. Sentence: "j'ai pris le bus"
- "beaucoup" (fr:lex:beaucoup): taught later, at position 80 (Reading Comprehension - Un Voyage en Famille); teach in a lesson before Unit exam · Everyday Words (position 55). Sentence: "j'ai beaucoup appris"
- "appris" (fr:lex:apprendre): the word apprendre is taught at position 73, but this form is not; teach in this module. Sentence: "j'ai beaucoup appris"
- fr:cx:imperative.pronouns: taught later, at position 108 (Commands with Pronouns); teach in this module. Sentence: "prends-le"
- fr:cx:imperative.tu: taught later, at position 105 (Commands - tu form (Informal)); teach in this module. Sentence: "prends-le"
- "heures" (fr:lex:heure): taught later, at position 79 (Essential Vocabulary - Time, People & Ideas); teach in a lesson before Reading Comprehension - La nouvelle époque de Marie (position 53). Concept card: "ça prend deux heures"

### 74. donner - To Give

- fr:cx:imperative.pronouns: taught later, at position 108 (Commands with Pronouns); teach in prendre - To Take (position 73). Sentence: "donne-moi"
- fr:cx:imperative.tu: taught later, at position 105 (Commands - tu form (Informal)); teach in prendre - To Take (position 73). Sentence: "donne-moi"

### 75. mettre - To Put / To Set

- "chemise" (fr:lex:chemise): not taught anywhere in the course; teach in this module. Sentence: "il met une chemise"
- "chaussures" (fr:lex:chaussure): not taught anywhere in the course; teach in this module. Sentence: "nous mettons nos chaussures"
- "heures" (fr:lex:heure): taught later, at position 79 (Essential Vocabulary - Time, People & Ideas); teach in a lesson before Reading Comprehension - La nouvelle époque de Marie (position 53). Sentence: "ça met deux heures"
- "mis" (fr:lex:mettre): the word mettre is taught at position 75, but this form is not; teach in this module. Sentence: "j'ai mis"
- "travailler" (fr:lex:travailler): taught later, at position 115 (Passé Composé - Regular -ER Verbs (I spoke, I ate)); teach in Everyday Nouns - Life & World (position 51). Concept card: "je me mets à travailler"
- fr:cx:pronoun.reflexive: taught later, at position 98 (Reflexive Pronouns - me, te, se, nous, vous); teach in a lesson before Reading Comprehension - La fée verte (The Green Fairy) (position 67). Concept card: "je me mets à travailler"

### 76. demander - To Ask

- "père" (fr:lex:pere): taught later, at position 79 (Essential Vocabulary - Time, People & Ideas); teach in this module. Sentence: "tu demandes à ton père"
- "mère" (fr:lex:mere): taught later, at position 79 (Essential Vocabulary - Time, People & Ideas); teach in aimer - To Like / To Love (position 60). Sentence: "il demande à sa mère"
- "attendre" (fr:lex:attendre): taught later, at position 153 (Social Situations - Wait, Arrive, Stay); teach in this module. Sentence: "elle nous demande d'attendre"
- "m'" (fr:lex:me): the word me is taught at position 35, but this form is not; teach in Should & Could - Advice and Possibility (position 58). Sentence: "tu m'as demandé"
- fr:cx:q.embedded: taught later, at position 167 (Embedded Questions - Polite Indirect Questions); teach in this module. Concept card: "tu demandes pourquoi?"

### 77. commander - To Order

- "par" (fr:lex:par): taught later, at position 152 (Perception Verbs - écouter, regarder); teach in this module. Sentence: "nous commandons par téléphone"

### 78. avoir besoin de - To Need

- "sommeil" (fr:lex:sommeil): not taught anywhere in the course; teach in this module. Sentence: "vous avez besoin de sommeil"
- "espace" (fr:lex:espace): not taught anywhere in the course; teach in this module. Sentence: "ils ont besoin d'espace"
- "dormir" (fr:lex:dormir): taught later, at position 124 (Reading - Une Histoire du Passé); teach in this module. Sentence: "j'ai besoin de dormir"
- "travailler" (fr:lex:travailler): taught later, at position 115 (Passé Composé - Regular -ER Verbs (I spoke, I ate)); teach in Everyday Nouns - Life & World (position 51). Sentence: "elle a besoin de travailler"

### 79. Essential Vocabulary - Time, People & Ideas

- "longue" (fr:lex:long): taught later, at position 114 (More Spatial Relations - Distance & Proximity); teach in this module. Sentence: "c'est une longue histoire"

### 80. Reading Comprehension - Un Voyage en Famille

- fr:cx:chunk.bien-sur: taught later, at position 92 (Discourse Markers - Sound Like a Native); teach in a lesson before this module. Passage: "Oui, bien sûr. Tu peux prendre trois livres."

### 81. Basic Fluency Practice - Fill in the Blanks

- "vérité" (fr:lex:verite): not taught anywhere in the course; teach in dire - To Say / To Tell (position 72). Sentence: "Tu dis la vérité."
- "apprenons" (fr:lex:apprendre): the word apprendre is taught at position 73, but this form is not; teach in prendre - To Take (position 73). Sentence: "Nous apprenons ensemble."
- "ensemble" (fr:lex:ensemble): taught later, at position 124 (Reading - Une Histoire du Passé); teach in Essential Verb - parler (to speak) (position 45). Sentence: "Nous apprenons ensemble."
- "gentil" (fr:lex:gentil): taught later, at position 107 (Irregular Commands - être, avoir, aller, faire); teach in a lesson before Reading Comprehension - La nouvelle époque de Marie (position 53). Sentence: "Mon père est gentil."

### 82. Unit exam · Basic Fluency

- fr:cx:imperative.pronouns: taught later, at position 108 (Commands with Pronouns); teach in prendre - To Take (position 73). Sentence: "donne-moi ta main, s'il te plaît"
- fr:cx:imperative.tu: taught later, at position 105 (Commands - tu form (Informal)); teach in prendre - To Take (position 73). Sentence: "donne-moi ta main, s'il te plaît"
- "comprend" (fr:lex:comprendre): the word comprendre is taught at position 73, but this form is not; teach in prendre - To Take (position 73). Sentence: "il ne comprend pas la question"

## Knowledge & Learning

### 83. Talking About People in General

- "étudier" (fr:lex:etudier): taught later, at position 84 (Studying & Reviewing - étudier & réviser); teach in Essential Verb - être (to be) (position 3). Sentence: "on doit étudier"
- "apprend" (fr:lex:apprendre): the word apprendre is taught at position 73, but this form is not; teach in prendre - To Take (position 73). Sentence: "on apprend en pratiquant"
- fr:cx:gerondif: taught later, at position 137 (En mangeant... - While Doing Phrases); teach in this module. Sentence: "on apprend en pratiquant"
- "croire" (fr:lex:croire): taught later, at position 90 (croire - To Believe); teach in this module. Sentence: "on doit croire"
- "gentils" (fr:lex:gentil): taught later, at position 107 (Irregular Commands - être, avoir, aller, faire); teach in a lesson before Reading Comprehension - La nouvelle époque de Marie (position 53). Concept card: "les gens sont gentils"
- "faisant" (fr:lex:faire): the word faire is taught at position 43, but this form is not; teach in this module. Concept card: "On apprend en faisant des erreurs"
- "erreurs" (fr:lex:erreur): not taught anywhere in the course; teach in this module. Concept card: "On apprend en faisant des erreurs"

### 84. Studying & Reviewing - étudier & réviser

- "ensemble" (fr:lex:ensemble): taught later, at position 124 (Reading - Une Histoire du Passé); teach in Essential Verb - parler (to speak) (position 45). Sentence: "nous étudions ensemble"
- "sais" (fr:lex:savoir.verb): the word savoir is taught at position 83, but this form is not; teach in this module. Concept card: "je sais"
- "pendant" (fr:lex:pendant): taught later, at position 94 (Reading - L'Art d'Apprendre); teach in this module. Concept card: "j'étudie pendant 2 heures"
- "crois" (fr:lex:croire): taught later, at position 90 (croire - To Believe); teach in Talking About People in General (position 83). Concept card: "je crois"

### 85. Learning & Teaching - apprendre & enseigner

- "m'" (fr:lex:me): the word me is taught at position 35, but this form is not; teach in Should & Could - Advice and Possibility (position 58). Sentence: "tu m'enseignes"
- "anglais" (fr:lex:anglais): not taught anywhere in the course; teach in prendre - To Take (position 73). Sentence: "il apprend l'anglais"
- "ensemble" (fr:lex:ensemble): taught later, at position 124 (Reading - Une Histoire du Passé); teach in Essential Verb - parler (to speak) (position 45). Sentence: "nous apprenons ensemble"
- "sais" (fr:lex:savoir.verb): the word savoir is taught at position 83, but this form is not; teach in Studying & Reviewing - étudier & réviser (position 84). Concept card: "je sais"
- "nager" (fr:lex:nager): taught later, at position 159 (Movement Verbs - Actions in Nature); teach in this module. Concept card: "j'apprends à nager"

### 87. savoir - To Know (Facts/Skills)

- "nager" (fr:lex:nager): taught later, at position 159 (Movement Verbs - Actions in Nature); teach in Learning & Teaching - apprendre & enseigner (position 85). Concept card: "je sais nager"
- "connais" (fr:lex:connaitre): taught later, at position 88 (connaître - To Know (People/Places)); teach in this module. Concept card: "je connais Marie"

### 92. Discourse Markers - Sound Like a Native

- "prêt" (fr:lex:pret): not taught anywhere in the course; teach in The Power to Ask Anything (position 23). Sentence: "je suis presque prêt"

### 94. Reading - L'Art d'Apprendre

- "poser" (fr:lex:poser): taught later, at position 109 (Reading - Ma Journée); teach in a lesson before this module. Sentence: "poser des questions"
- fr:cx:imperative.vous: taught later, at position 106 (Commands - vous form (Formal/Plural)); teach in a lesson before this module. Sentence: "comprenez mes idées"
- fr:cx:si.present: not taught anywhere in the course; teach in a lesson before this module. Passage: "Mais étudier, ce n'est pas la même chose qu'apprendre. Je peux étudier pendant…"
- "étudiants" (fr:lex:etudiant): taught later, at position 109 (Reading - Ma Journée); teach in Essential Verb - être (to be) (position 3). Passage: "Socrate demande des questions à ses étudiants."
- fr:cx:subj.ne-pas-penser-que: taught later, at position 132 (Je pense que... - Opinion Phrases); teach in a lesson before this module. Passage: "Finalement, on doit croire en soi. Si on ne croit pas qu'on peut apprendre, on…"

### 96. Unit exam · Knowledge & Learning

- "parce" (fr:lex:parce): taught later, at position 112 (Causal & Reason Words - Explaining Why); teach in a lesson before this module. Sentence: "je révise mes leçons parce que j'ai un examen"
- fr:cx:chunk.parce-que: taught later, at position 112 (Causal & Reason Words - Explaining Why); teach in a lesson before this module. Sentence: "je révise mes leçons parce que j'ai un examen"

## Daily Life & Actions

### 97. Temporal & Sequential Words - Time & Order

- "dîner" (fr:lex:diner): not taught anywhere in the course; teach in this module. Concept card: "après le dîner"

### 98. Reflexive Pronouns - me, te, se, nous, vous

- "habille" (fr:lex:habiller): taught later, at position 101 (Getting Ready - se laver, s'habiller, se préparer); teach in this module. Sentence: "elle ... habille (she gets dressed)"
- "amusent" (fr:lex:amuser): taught later, at position 102 (Daily Actions - se souvenir, s'amuser, se dépêcher); teach in this module. Sentence: "ils ... amusent (they have fun)"

### 99. s'appeler - To Be Called (Your Name!)

- "étudiants" (fr:lex:etudiant): taught later, at position 109 (Reading - Ma Journée); teach in Essential Verb - être (to be) (position 3). Sentence: "ils s'appellent les étudiants"

### 100. Morning Routine - se réveiller, se lever

- "tôt" (fr:lex:tot): taught later, at position 144 (Reading - Mes Rêves et Mes Espoirs); teach in this module. Sentence: "tu te réveilles tôt"
- "tard" (fr:lex:tard): taught later, at position 124 (Reading - Une Histoire du Passé); teach in a lesson before Reading Comprehension - La fée verte (The Green Fairy) (position 67). Concept card: "tu te lèves tard"

### 102. Daily Actions - se souvenir, s'amuser, se dépêcher

- fr:cx:imperative.pronouns: taught later, at position 108 (Commands with Pronouns); teach in prendre - To Take (position 73). Concept card: "dépêche-toi!"
- fr:cx:imperative.tu: taught later, at position 105 (Commands - tu form (Informal)); teach in prendre - To Take (position 73). Concept card: "dépêche-toi!"

### 104. Reciprocal Reflexives - Each Other

- "regardent" (fr:lex:regarder): taught later, at position 105 (Commands - tu form (Informal)); teach in a lesson before Reading Comprehension - La fée verte (The Green Fairy) (position 67). Concept card: "ils se regardent"

### 107. Irregular Commands - être, avoir, aller, faire

- fr:cx:imperative.pronouns: taught later, at position 108 (Commands with Pronouns); teach in prendre - To Take (position 73). Sentence: "vas-y"
- fr:cx:pronoun.y: not taught anywhere in the course; teach in this module. Can-do line: "Vas-y!"
- "Soyons" (fr:lex:etre): the word être is taught at position 3, but this form is not; teach in this module. Concept card: "tu: Sois! vous: Soyez! nous: Soyons!"
- "sage" (fr:lex:sage): taught later, at position 129 (Il faut que... - Saying What's Necessary); teach in this module. Concept card: "Sois sage!"
- "Ayons" (fr:lex:avoir): the word avoir is taught at position 4, but this form is not; teach in this module. Concept card: "tu: Aie! vous: Ayez! nous: Ayons!"
- "patience" (fr:lex:patience): not taught anywhere in the course; teach in this module. Concept card: "Ayez patience!"

### 108. Commands with Pronouns

- "Montre" (fr:lex:montrer): taught later, at position 155 (Reading - La France Moderne); teach in this module. Concept card: "Montre-la-moi!"

### 109. Reading - Ma Journée

- fr:cx:relative.ce-que: not taught anywhere in the course; teach in a lesson before this module. Sentence: "Je me souviens de tout ce qu'on apprend"
- "lendemain" (fr:lex:lendemain): not taught anywhere in the course; teach in a lesson before this module. Sentence: "elle rentre contente et pense au lendemain"
- "parce" (fr:lex:parce): taught later, at position 112 (Causal & Reason Words - Explaining Why); teach in a lesson before Unit exam · Knowledge & Learning (position 96). Passage: "…pour la Sorbonne. Je dois me dépêcher parce que mon cours est à neuf heures."
- fr:cx:chunk.parce-que: taught later, at position 112 (Causal & Reason Words - Explaining Why); teach in a lesson before Unit exam · Knowledge & Learning (position 96). Passage: "Après le café, je me lave et je m'habille. Je me prépare pour la Sorbonne. Je…"
- "comprenais" (fr:lex:comprendre): the word comprendre is taught at position 73, but this form is not; teach in a lesson before this module. Passage: "…bien maintenant. Avant, je ne comprenais pas tout, mais maintenant, je sais…"
- "appris" (fr:lex:apprendre): the word apprendre is taught at position 73, but this form is not; teach in prendre - To Take (position 73). Passage: "…Je pense: "Aujourd'hui, j'ai bien appris. Demain, je vais apprendre encore…"

### 110. Daily Life & Actions Practice - Fill in the Blanks

- "parce" (fr:lex:parce): taught later, at position 112 (Causal & Reason Words - Explaining Why); teach in a lesson before Unit exam · Knowledge & Learning (position 96). Sentence: "Je me dépêche parce que je suis en retard."
- "retard" (fr:lex:retard): not taught anywhere in the course; teach in a lesson before this module. Sentence: "Je me dépêche parce que je suis en retard."
- fr:cx:chunk.parce-que: taught later, at position 112 (Causal & Reason Words - Explaining Why); teach in a lesson before Unit exam · Knowledge & Learning (position 96). Sentence: "Je me dépêche parce que je suis en retard."
- "tard" (fr:lex:tard): taught later, at position 124 (Reading - Une Histoire du Passé); teach in a lesson before Reading Comprehension - La fée verte (The Green Fairy) (position 67). Sentence: "Elle s'est levée tard."

### 111. Unit exam · Daily Life & Actions

- "tôt" (fr:lex:tot): taught later, at position 144 (Reading - Mes Rêves et Mes Espoirs); teach in Morning Routine - se réveiller, se lever (position 100). Sentence: "on se lève tôt"

## Discourse & Past Tense

### 112. Causal & Reason Words - Explaining Why

- "utile" (fr:lex:utile): not taught anywhere in the course; teach in this module. Sentence: "On étudie le français car c'est utile"
- "pluie" (fr:lex:pluie): taught later, at position 158 (Nature & Animals - Curiosity Vocabulary); teach in this module. Sentence: "À cause de la pluie, on reste ici"
- "reste" (fr:lex:rester): taught later, at position 118 (être Verbs - DR & MRS VANDERTRAMP (went, came, left)); teach in this module. Sentence: "À cause de la pluie, on reste ici"
- "restes" (fr:lex:rester): taught later, at position 118 (être Verbs - DR & MRS VANDERTRAMP (went, came, left)); teach in this module. Sentence: "Pourquoi tu restes? - Parce que je suis fatigué"
- "retard" (fr:lex:retard): not taught anywhere in the course; teach in a lesson before Daily Life & Actions Practice - Fill in the Blanks (position 110). Sentence: "Je suis en retard à cause du le traffic"
- "réussi" (fr:lex:reussir): taught later, at position 134 (Si j'avais su... - Past Regret Phrases); teach in this module. Sentence: "J'ai réussi grâce au professeur"
- "travaille" (fr:lex:travailler): taught later, at position 115 (Passé Composé - Regular -ER Verbs (I spoke, I ate)); teach in Everyday Nouns - Life & World (position 51). Sentence: "Il ne travaille pas car il est riche"
- "mauvais" (fr:lex:mauvais): not taught anywhere in the course; teach in this module. Sentence: "À cause du mauvais temps, on annule le match"
- "annule" (fr:lex:annuler): not taught anywhere in the course; teach in this module. Sentence: "À cause du mauvais temps, on annule le match"
- "prêt" (fr:lex:pret): not taught anywhere in the course; teach in The Power to Ask Anything (position 23). Sentence: "On va partir puisque tu es prêt"
- "dors" (fr:lex:dormir): taught later, at position 124 (Reading - Une Histoire du Passé); teach in avoir besoin de - To Need (position 78). Sentence: "Je ne dors pas bien à cause du bruit"
- "bruit" (fr:lex:bruit): taught later, at position 161 (qu'est-ce qui vs qu'est-ce que - Master 'What' Questions); teach in this module. Sentence: "Je ne dors pas bien à cause du bruit"
- "pleut" (fr:lex:pleuvoir): taught later, at position 160 (Natural Phenomena - How Nature Works); teach in this module. Concept card: "Je reste ici car il pleut"

### 113. Spatial Prepositions - Position & Location

- fr:cx:il-y-a: taught later, at position 121 (Imparfait Formation - All Verbs (was doing, used to do)); teach in a lesson before Reading Comprehension - Rendez-vous en Normandie (position 27). Sentence: "Parmi les étudiants, il-y-a des français"
- "clés" (fr:lex:cle): taught later, at position 151 (Search & Find - chercher, trouver); teach in Essential Verbs - chercher & trouver (position 46). Sentence: "Mes clés sont sur la table"
- "lit" (fr:lex:lire): not taught anywhere in the course; teach in this module. Sentence: "La lampe est au-dessus du le lit"
- "assis" (fr:lex:asseoir): taught later, at position 124 (Reading - Une Histoire du Passé); teach in this module. Sentence: "Il est assis devant moi"
- "chambre" (fr:lex:chambre): not taught anywhere in the course; teach in this module. Sentence: "Ma chambre est au-dessous"
- "dort" (fr:lex:dormir): taught later, at position 124 (Reading - Une Histoire du Passé); teach in avoir besoin de - To Need (position 78). Sentence: "Le chat dort sous mon lit"
- "fenêtre" (fr:lex:fenetre): taught later, at position 124 (Reading - Une Histoire du Passé); teach in this module. Sentence: "Il y a un arbre devant ma fenêtre"
- "niveau" (fr:lex:niveau): not taught anywhere in the course; teach in this module. Concept card: "Au-dessous du niveau"
- "chaise" (fr:lex:chaise): not taught anywhere in the course; teach in this module. Concept card: "sous la chaise"

### 114. More Spatial Relations - Distance & Proximity

- "gare" (fr:lex:gare): taught later, at position 124 (Reading - Une Histoire du Passé); teach in this module. Sentence: "La gare est loin de la maison"
- "pièce" (fr:lex:piece): not taught anywhere in the course; teach in this module. Sentence: "La table est au milieu de la pièce"
- "habite" (fr:lex:habiter): not taught anywhere in the course; teach in Everyday Nouns - Life & World (position 51). Sentence: "J'habite près d' ici"
- "assis" (fr:lex:asseoir): taught later, at position 124 (Reading - Une Histoire du Passé); teach in Spatial Prepositions - Position & Location (position 113). Sentence: "Il est assis en face de moi"
- fr:cx:il-y-a: taught later, at position 121 (Imparfait Formation - All Verbs (was doing, used to do)); teach in a lesson before Reading Comprehension - Rendez-vous en Normandie (position 27). Sentence: "Il y a un jardin autour de la maison"
- "couloir" (fr:lex:couloir): not taught anywhere in the course; teach in this module. Sentence: "La porte est au bout du couloir"
- "Assieds" (fr:lex:asseoir): taught later, at position 124 (Reading - Une Histoire du Passé); teach in Spatial Prepositions - Position & Location (position 113). Sentence: "Assieds-toi à côté de moi"

### 115. Passé Composé - Regular -ER Verbs (I spoke, I ate)

- "clés" (fr:lex:cle): taught later, at position 151 (Search & Find - chercher, trouver); teach in Essential Verbs - chercher & trouver (position 46). Sentence: "Vous avez cherché mes clés?"
- "télé" (fr:lex:tele): taught later, at position 152 (Perception Verbs - écouter, regarder); teach in this module. Sentence: "On a regardé la télé hier soir"
- "tard" (fr:lex:tard): taught later, at position 124 (Reading - Une Histoire du Passé); teach in a lesson before Reading Comprehension - La fée verte (The Green Fairy) (position 67). Sentence: "On a travaillé tard hier"
- "Passé" (fr:lex:passe): not taught anywhere in the course; teach in manger - To Eat (Present & Past) (position 64). Concept card: "Passé Composé"

### 117. Irregular Past Participles - Set 2 (wanted, could, had to, said)

- "tôt" (fr:lex:tot): taught later, at position 144 (Reading - Mes Rêves et Mes Espoirs); teach in Morning Routine - se réveiller, se lever (position 100). Sentence: "Elle a dû partir tôt"

### 118. être Verbs - DR & MRS VANDERTRAMP (went, came, left)

- "tôt" (fr:lex:tot): taught later, at position 144 (Reading - Mes Rêves et Mes Espoirs); teach in Morning Routine - se réveiller, se lever (position 100). Sentence: "Il est parti tôt"
- "sortis" (fr:lex:sortir): the word sortir is taught at position 118, but this form is not; teach in this module. Sentence: "Vous êtes sortis hier?"
- "tard" (fr:lex:tard): taught later, at position 124 (Reading - Une Histoire du Passé); teach in a lesson before Reading Comprehension - La fée verte (The Green Fairy) (position 67). Sentence: "On est rentré tard"
- "venus" (fr:lex:venir): the word venir is taught at position 31, but this form is not; teach in this module. Sentence: "Ils sont venus hier"
- "partis" (fr:lex:partir): the word partir is taught at position 34, but this form is not; teach in this module. Sentence: "Êtes vous partis en vacances?"
- "vacances" (fr:lex:vacances): taught later, at position 155 (Reading - La France Moderne); teach in this module. Sentence: "Êtes vous partis en vacances?"
- "venue" (fr:lex:venir): the word venir is taught at position 31, but this form is not; teach in this module. Sentence: "Elle ne est pas venue"
- "Mourir" (fr:lex:mourir): not taught anywhere in the course; teach in this module. Concept card: "Descendre, Revenir, Mourir, Retourner, Sortir, Venir, Aller, Naître, Devenir,…"
- "Retourner" (fr:lex:retourner): not taught anywhere in the course; teach in this module. Concept card: "Descendre, Revenir, Mourir, Retourner, Sortir, Venir, Aller, Naître, Devenir,…"
- "Naître" (fr:lex:naitre): taught later, at position 147 (Age & Personal Information); teach in Negation Part 2 - I can't, I won't, I never (position 49). Concept card: "…Retourner, Sortir, Venir, Aller, Naître, Devenir, Entrer, Rentrer, Tomber,…"

### 119. Past Participle Agreement with être

- "venue" (fr:lex:venir): the word venir is taught at position 31, but this form is not; teach in être Verbs - DR & MRS VANDERTRAMP (went, came, left) (position 118). Sentence: "Marie est venue hier"
- "partis" (fr:lex:partir): the word partir is taught at position 34, but this form is not; teach in être Verbs - DR & MRS VANDERTRAMP (went, came, left) (position 118). Sentence: "Nous sommes partis tôt"
- "tôt" (fr:lex:tot): taught later, at position 144 (Reading - Mes Rêves et Mes Espoirs); teach in Morning Routine - se réveiller, se lever (position 100). Sentence: "Nous sommes partis tôt"
- "ensemble" (fr:lex:ensemble): taught later, at position 124 (Reading - Une Histoire du Passé); teach in Essential Verb - parler (to speak) (position 45). Sentence: "Pierre et Marie sont partis ensemble"
- "garçons" (fr:lex:garçon): not taught anywhere in the course; teach in this module. Sentence: "Les garçons sont rentrés tard"
- "tard" (fr:lex:tard): taught later, at position 124 (Reading - Une Histoire du Passé); teach in a lesson before Reading Comprehension - La fée verte (The Green Fairy) (position 67). Sentence: "Les garçons sont rentrés tard"
- "Monsieur" (fr:lex:monsieur): not taught anywhere in the course; teach in this module. Vocabulary example: "Monsieur, vous êtes allé où?"
- "venus" (fr:lex:venir): the word venir is taught at position 31, but this form is not; teach in être Verbs - DR & MRS VANDERTRAMP (went, came, left) (position 118). Concept card: "nous sommes venus"
- "venues" (fr:lex:venir): the word venir is taught at position 31, but this form is not; teach in this module. Concept card: "nous sommes venues"

### 121. Imparfait Formation - All Verbs (was doing, used to do)

- "vouliez" (fr:lex:vouloir): the word vouloir is taught at position 19, but this form is not; teach in this module. Sentence: "Vous vouliez du café?"
- "habitaient" (fr:lex:habiter): not taught anywhere in the course; teach in Everyday Nouns - Life & World (position 51). Sentence: "Ils habitaient dans un grand appartement"
- "jouais" (fr:lex:jouer): taught later, at position 155 (Reading - La France Moderne); teach in this module. Sentence: "Quand j'étais jeune, je jouais au foot"
- "foot" (fr:lex:foot): not taught anywhere in the course; teach in this module. Sentence: "Quand j'étais jeune, je jouais au foot"
- "retard" (fr:lex:retard): not taught anywhere in the course; teach in a lesson before Daily Life & Actions Practice - Fill in the Blanks (position 110). Sentence: "Tu étais toujours en retard"

### 122. Passé Composé vs Imparfait - The Golden Rule

- "jouais" (fr:lex:jouer): taught later, at position 155 (Reading - La France Moderne); teach in Imparfait Formation - All Verbs (was doing, used to do) (position 121). Sentence: "Quand j'étais jeune, je jouais au foot"
- "foot" (fr:lex:foot): not taught anywhere in the course; teach in Imparfait Formation - All Verbs (was doing, used to do) (position 121). Sentence: "Quand j'étais jeune, je jouais au foot"
- "mangeais" (fr:lex:manger): the word manger is taught at position 53, but this form is not; teach in this module. Sentence: "Pendant que je mangeais, tu as appelé"
- "habitaient" (fr:lex:habiter): not taught anywhere in the course; teach in Everyday Nouns - Life & World (position 51). Sentence: "Ils habitaient dans un grand appartement"
- "retard" (fr:lex:retard): not taught anywhere in the course; teach in a lesson before Daily Life & Actions Practice - Fill in the Blanks (position 110). Sentence: "Elle était toujours en retard"
- "buvait" (fr:lex:boire): the word boire is taught at position 66, but this form is not; teach in this module. Sentence: "Il buvait du café quand je suis arrivé"
- "Passé" (fr:lex:passe): not taught anywhere in the course; teach in manger - To Eat (Present & Past) (position 64). Concept card: "Passé Composé"

### 123. Past Tense Composition - Building Complete Stories

- fr:cx:pronoun.y: not taught anywhere in the course; teach in Irregular Commands - être, avoir, aller, faire (position 107). Sentence: "On allait au café chaque samedi, mais hier on n'y est pas allé"
- "chambre" (fr:lex:chambre): not taught anywhere in the course; teach in Spatial Prepositions - Position & Location (position 113). Sentence: "Le livre était sur la table dans ma chambre"
- "télé" (fr:lex:tele): taught later, at position 152 (Perception Verbs - écouter, regarder); teach in Passé Composé - Regular -ER Verbs (I spoke, I ate) (position 115). Sentence: "J'ai fait mes devoirs ensuite j'ai regardé la télé"
- "réussi" (fr:lex:reussir): taught later, at position 134 (Si j'avais su... - Past Regret Phrases); teach in Causal & Reason Words - Explaining Why (position 112). Sentence: "Grâce à toi, j'ai réussi"
- "pluie" (fr:lex:pluie): taught later, at position 158 (Nature & Animals - Curiosity Vocabulary); teach in Causal & Reason Words - Explaining Why (position 112). Sentence: "À cause de la pluie, on est restés à la maison"
- "libre" (fr:lex:libre): not taught anywhere in the course; teach in this module. Concept card: "…au parc près de chez moi. J'étais content parce que j'avais du temps libre."
- "assis" (fr:lex:asseoir): taught later, at position 124 (Reading - Une Histoire du Passé); teach in Spatial Prepositions - Position & Location (position 113). Concept card: "…de l'école. Il y avait beaucoup de gens. Ils étaient assis autour des tables."
- "soif" (fr:lex:soif): not taught anywhere in the course; teach in this module. Concept card: "…sorti. J'ai vu Marie donc on a parlé. On est allés au café car on avait soif."

### 124. Reading - Une Histoire du Passé

- "tôt" (fr:lex:tot): taught later, at position 144 (Reading - Mes Rêves et Mes Espoirs); teach in Morning Routine - se réveiller, se lever (position 100). Passage: "…mais ce jour-là, j'ai voulu sortir tôt parce que le temps était si beau."
- fr:cx:subj.emotion-que: taught later, at position 131 (Je suis content que... - Emotion Phrases); teach in a lesson before this module. Passage: ""Bonjour! Je voulais être dehors parce qu'il faisait si beau. Je suis content…"
- fr:cx:pronoun.indirect-object: taught later, at position 148 (donner - To Give); teach in Essential Verb - faire (to do/make) (position 43). Passage: "Nous avons parlé pendant une heure. Il m'a dit qu'il voulait un nouveau travail…"
- "célèbre" (fr:lex:celebre): not taught anywhere in the course; teach in a lesson before this module. Passage: "…Café de Flore est très bon et très célèbre à Paris! Il y avait beaucoup de gens…"
- fr:cx:relative.qui: not taught anywhere in the course; teach in a lesson before this module. Passage: "Ensuite, comme nous avions faim, nous avons décidé d'aller au Café de Flore qui…"
- fr:cx:relative.ce-que: not taught anywhere in the course; teach in a lesson before Reading - Ma Journée (position 109). Passage: "Au restaurant, nous avons mangé de la bonne cuisine française. C'était…"
- fr:cx:relative.que: not taught anywhere in the course; teach in a lesson before this module. Passage: "Parfois, les meilleures journées sont celles qu'on ne pense pas avoir. Grâce à…"

### 125. Discourse & Past Tense Practice - Fill in the Blanks

- "retard" (fr:lex:retard): not taught anywhere in the course; teach in a lesson before Daily Life & Actions Practice - Fill in the Blanks (position 110). Sentence: "Je suis en retard parce que j'ai raté le bus."
- "raté" (fr:lex:rater): not taught anywhere in the course; teach in a lesson before this module. Sentence: "Je suis en retard parce que j'ai raté le bus."
- "réussi" (fr:lex:reussir): taught later, at position 134 (Si j'avais su... - Past Regret Phrases); teach in Causal & Reason Words - Explaining Why (position 112). Sentence: "grâce à à toi, j'ai réussi."
- "chaises" (fr:lex:chaise): not taught anywhere in the course; teach in Spatial Prepositions - Position & Location (position 113). Sentence: "Le chat est entre les deux chaises."
- "habite" (fr:lex:habiter): not taught anywhere in the course; teach in Everyday Nouns - Life & World (position 51). Sentence: "Elle habite près du parc."
- "lu" (fr:lex:lire): not taught anywhere in the course; teach in Spatial Prepositions - Position & Location (position 113). Sentence: "Hier, j'ai lu un livre."
- "venus" (fr:lex:venir): the word venir is taught at position 31, but this form is not; teach in être Verbs - DR & MRS VANDERTRAMP (went, came, left) (position 118). Sentence: "Ils sont venus de France."
- "jouais" (fr:lex:jouer): taught later, at position 155 (Reading - La France Moderne); teach in Imparfait Formation - All Verbs (was doing, used to do) (position 121). Sentence: "Quand j'étais petit, je jouais beaucoup."
- "lisais" (fr:lex:lire): not taught anywhere in the course; teach in Spatial Prepositions - Position & Location (position 113). Sentence: "Je lisais quand tu es arrivé."
- "courait" (fr:lex:courir): taught later, at position 159 (Movement Verbs - Actions in Nature); teach in Knowledge & Learning - Essential Nouns (position 91). Sentence: "Il courait tous les jours, mais hier il a marché."
- "cuisinais" (fr:lex:cuisiner): not taught anywhere in the course; teach in a lesson before Reading - Ma Journée (position 109). Sentence: "Pendant que je cuisinais, j'ai entendu un bruit."
- "entendu" (fr:lex:entendre): not taught anywhere in the course; teach in a lesson before this module. Sentence: "Pendant que je cuisinais, j'ai entendu un bruit."
- "bruit" (fr:lex:bruit): taught later, at position 161 (qu'est-ce qui vs qu'est-ce que - Master 'What' Questions); teach in Causal & Reason Words - Explaining Why (position 112). Sentence: "Pendant que je cuisinais, j'ai entendu un bruit."
- "pleuvait" (fr:lex:pleuvoir): taught later, at position 160 (Natural Phenomena - How Nature Works); teach in Causal & Reason Words - Explaining Why (position 112). Sentence: "comme il pleuvait, nous sommes restés à la maison."
- "cachée" (fr:lex:cacher): not taught anywhere in the course; teach in a lesson before this module. Sentence: "Elle s'est cachée derrière l'arbre pour que personne ne la voie."
- "voie" (fr:lex:voir): the word voir is taught at position 21, but this form is not; teach in a lesson before this module. Sentence: "Elle s'est cachée derrière l'arbre pour que personne ne la voie."
- fr:cx:subj.pour-que: taught later, at position 140 (Pour que... - So That Phrases); teach in a lesson before this module. Sentence: "Elle s'est cachée derrière l'arbre pour que personne ne la voie."

### 126. Unit exam · Discourse & Past Tense

- "venus" (fr:lex:venir): the word venir is taught at position 31, but this form is not; teach in être Verbs - DR & MRS VANDERTRAMP (went, came, left) (position 118). Sentence: "ils sont venus"
- "lisais" (fr:lex:lire): not taught anywhere in the course; teach in Spatial Prepositions - Position & Location (position 113). Sentence: "lisais"
- "lire" (fr:lex:lire): not taught anywhere in the course; teach in Spatial Prepositions - Position & Location (position 113). Sentence: "je _____ (lire) quand il a téléphoné"
- "acheté" (fr:lex:acheter): taught later, at position 144 (Reading - Mes Rêves et Mes Espoirs); teach in a lesson before this module. Sentence: "ai acheté"
- "acheter" (fr:lex:acheter): taught later, at position 144 (Reading - Mes Rêves et Mes Espoirs); teach in a lesson before this module. Sentence: "hier j'_____ (acheter) un livre"
- "ouverte" (fr:lex:ouvrir): not taught anywhere in the course; teach in a lesson before this module. Sentence: "est ouverte"
- "ouvrir" (fr:lex:ouvrir): not taught anywhere in the course; teach in a lesson before this module. Sentence: "soudain la porte s'_____ (ouvrir)"
- "pleuvait" (fr:lex:pleuvoir): taught later, at position 160 (Natural Phenomena - How Nature Works); teach in Causal & Reason Words - Explaining Why (position 112). Sentence: "pleuvait"
- "pleuvoir" (fr:lex:pleuvoir): taught later, at position 160 (Natural Phenomena - How Nature Works); teach in Causal & Reason Words - Explaining Why (position 112). Sentence: "pendant qu'il _____ (pleuvoir), je suis resté dedans"
- "dedans" (fr:lex:dedans): not taught anywhere in the course; teach in a lesson before this module. Sentence: "pendant qu'il _____ (pleuvoir), je suis resté dedans"

## Mastery & Nuance

### 127. Forms Used After 'il faut que' and 'je veux que'

- "faut" (fr:lex:falloir): taught later, at position 129 (Il faut que... - Saying What's Necessary); teach in this module. Module description: "il faut que..."
- "sage" (fr:lex:sage): taught later, at position 129 (Il faut que... - Saying What's Necessary); teach in Irregular Commands - être, avoir, aller, faire (position 107). Concept card: "Tu es sage"
- fr:cx:frame.il-faut-infinitive: taught later, at position 129 (Il faut que... - Saying What's Necessary); teach in this module. Concept card: "Il faut aller"

### 128. More Forms for 'il faut que' and 'je veux que' Phrases

- "faut" (fr:lex:falloir): taught later, at position 129 (Il faut que... - Saying What's Necessary); teach in Forms Used After 'il faut que' and 'je veux que' (position 127). Module description: "il faut que..."
- fr:cx:frame.il-faut-infinitive: taught later, at position 129 (Il faut que... - Saying What's Necessary); teach in Forms Used After 'il faut que' and 'je veux que' (position 127). Concept card: "Il faut partir"

### 133. Si j'étais... - Daydreaming & Hypotheticals

- "achèterais" (fr:lex:acheter): taught later, at position 144 (Reading - Mes Rêves et Mes Espoirs); teach in a lesson before Unit exam · Discourse & Past Tense (position 126). Module description: "Si j'étais riche, j'achèterais..."

### 134. Si j'avais su... - Past Regret Phrases

- fr:cx:plus-que-parfait.avoir: taught later, at position 135 (J'avais déjà... - Had Already Done Phrases); teach in this module. Sentence: "si j'avais su"
- fr:cx:conditionnel-passe.etre: not taught anywhere in the course; teach in this module. Sentence: "je serais venu"
- fr:cx:conditionnel-passe.avoir: not taught anywhere in the course; teach in this module. Sentence: "j'aurais réussi"

### 135. J'avais déjà... - Had Already Done Phrases

- fr:cx:plus-que-parfait.etre: not taught anywhere in the course; teach in this module. Sentence: "j'étais déjà parti"

### 136. vraiment, sérieusement... - Common Adverbs

- "courir" (fr:lex:courir): taught later, at position 159 (Movement Verbs - Actions in Nature); teach in Knowledge & Learning - Essential Nouns (position 91). Sentence: "courir rapidement"
- "court" (fr:lex:courir): taught later, at position 159 (Movement Verbs - Actions in Nature); teach in Knowledge & Learning - Essential Nouns (position 91). Sentence: "court rapidement"

### 137. En mangeant... - While Doing Phrases

- "télé" (fr:lex:tele): taught later, at position 152 (Perception Verbs - écouter, regarder); teach in Passé Composé - Regular -ER Verbs (I spoke, I ate) (position 115). Module description: "En mangeant, je regarde la télé"

### 141. Bien que... - Although Phrases

- "sort" (fr:lex:sortir): the word sortir is taught at position 118, but this form is not; teach in this module. Concept card: "Bien qu'il fasse froid, on sort"

### 144. Reading - Mes Rêves et Mes Espoirs

- "habitait" (fr:lex:habiter): not taught anywhere in the course; teach in Everyday Nouns - Life & World (position 51). Sentence: "Où habitait Sophie?"
- "achèterait" (fr:lex:acheter): the word acheter is taught at position 144, but this form is not; teach in a lesson before this module. Sentence: "Si Sophie était riche, qu'est-ce qu'elle achèterait?"
- "habite" (fr:lex:habiter): not taught anywhere in the course; teach in Everyday Nouns - Life & World (position 51). Passage: "Je m'appelle Sophie et j'habite à Paris depuis cinq ans. J'adore cette ville!…"
- "assise" (fr:lex:asseoir): the word asseoir is taught at position 124, but this form is not; teach in a lesson before this module. Passage: "Hier soir, j'étais assise dans un petit café près de Notre-Dame. Je regardais la…"
- "habiter" (fr:lex:habiter): not taught anywhere in the course; teach in Everyday Nouns - Life & World (position 51). Passage: "…maison à Montmartre. J'aimerais habiter dans ce quartier célèbre où les…"
- "célèbre" (fr:lex:celebre): not taught anywhere in the course; teach in a lesson before Reading - Une Histoire du Passé (position 124). Passage: "…habiter dans ce quartier célèbre où les artistes ont vécu. Si j'avais…"
- fr:cx:relative.ou: not taught anywhere in the course; teach in a lesson before Time & Taste Practice - Fill in the Blanks (position 68). Passage: "Si j'étais riche, j'achèterais une petite maison à Montmartre. J'aimerais…"
- "savait" (fr:lex:savoir.verb): the word savoir is taught at position 83, but this form is not; teach in a lesson before this module. Passage: "Mon ami Marc est arrivé au café. Il savait que j'aime ce café parce que c'est…"
- fr:cx:si.present: not taught anywhere in the course; teach in a lesson before Reading - L'Art d'Apprendre (position 94). Passage: ""Je comprends. Mais il faut que tu essaies! Si tu ne fais rien, tu ne sauras…"
- fr:cx:pronoun.indirect-object: taught later, at position 148 (donner - To Give); teach in Essential Verb - faire (to do/make) (position 43). Passage: "Nous avons parlé pendant une heure. Je lui ai dit que je voulais être professeur…"
- "sens" (fr:lex:sentir): not taught anywhere in the course; teach in a lesson before this module. Passage: "…nous parlions, j'avais déjà perdu espoir. Mais maintenant, je me sens mieux."
- fr:cx:conditionnel-passe.avoir: not taught anywhere in the course; teach in Si j'avais su... - Past Regret Phrases (position 134). Passage: "Si j'avais su plus tôt que l'espoir était si important, j'aurais continué mes…"
- "saura" (fr:lex:savoir.verb): the word savoir is taught at position 83, but this form is not; teach in a lesson before this module. Passage: "…essayer! Si on ne fait rien, on ne saura jamais. Et moi, je veux savoir si mes…"
- fr:cx:q.embedded: taught later, at position 167 (Embedded Questions - Polite Indirect Questions); teach in demander - To Ask (position 76). Passage: "Comme Marc a dit: il faut essayer! Si on ne fait rien, on ne saura jamais. Et…"

### 145. Mastery & Nuance Practice - Fill in the Blanks

- fr:cx:conditionnel-passe.avoir: not taught anywhere in the course; teach in Si j'avais su... - Past Regret Phrases (position 134). Sentence: "Si j'avais su, j'aurais continué mes études."
- "retard" (fr:lex:retard): not taught anywhere in the course; teach in a lesson before Daily Life & Actions Practice - Fill in the Blanks (position 110). Sentence: "Il est possible qu'il soit en retard."
- "suives" (fr:lex:suivre): not taught anywhere in the course; teach in a lesson before this module. Sentence: "Si j'étais toi, je voudrais que tu suives tes rêves."

### 146. Unit exam · Mastery & Nuance

- "marcherait" (fr:lex:marcher): the word marcher is taught at position 80, but this form is not; teach in a lesson before this module. Sentence: "si on avait le temps, on marcherait"
- "marcherions" (fr:lex:marcher): the word marcher is taught at position 80, but this form is not; teach in a lesson before this module. Sentence: "si nous avions le temps, nous marcherions"
- fr:cx:conditionnel-passe.etre: not taught anywhere in the course; teach in Si j'avais su... - Past Regret Phrases (position 134). Sentence: "si j'avais su, je serais venu"
- fr:cx:conditionnel-passe.avoir: not taught anywhere in the course; teach in Si j'avais su... - Past Regret Phrases (position 134). Sentence: "si j'avais eu le temps, j'aurais aidé"
- fr:cx:plus-que-parfait.etre: not taught anywhere in the course; teach in J'avais déjà... - Had Already Done Phrases (position 135). Sentence: "elle était déjà partie"
- "saura" (fr:lex:savoir.verb): the word savoir is taught at position 83, but this form is not; teach in a lesson before Reading - Mes Rêves et Mes Espoirs (position 144). Sentence: "saura"
- fr:cx:si.present: not taught anywhere in the course; teach in a lesson before Reading - L'Art d'Apprendre (position 94). Sentence: "Si on ne fait rien, on ne _____ jamais"

## Daily Essentials

### 148. donner - To Give

- "cadeau" (fr:lex:cadeau): not taught anywhere in the course; teach in this module. Concept card: "Je donne un cadeau"

### 150. Daily Life Essentials - Sleep, Work, Live

- "centre" (fr:lex:centre): not taught anywhere in the course; teach in this module. Concept card: "Je vis à Paris, je travaille au centre-ville, et je dors bien"

### 155. Reading - La France Moderne

- "quels" (fr:lex:quel): the word quel is taught at position 22, but this form is not; teach in a lesson before this module. Sentence: "Dans quels secteurs travaillent les Français?"
- fr:cx:relative.qui: not taught anywhere in the course; teach in a lesson before Reading - Une Histoire du Passé (position 124). Passage: "La France d'aujourd'hui est un pays qui continue à évoluer rapidement. Avec ses…"
- "compte" (fr:lex:compte): not taught anywhere in the course; teach in a lesson before this module. Passage: "Paris, sa capitale, compte plus de deux millions de personnes. Cette ville…"
- "attire" (fr:lex:attirer): not taught anywhere in the course; teach in a lesson before this module. Passage: "…personnes. Cette ville magnifique attire des millions de visiteurs chaque…"
- "célèbres" (fr:lex:celebre): not taught anywhere in the course; teach in a lesson before Reading - Une Histoire du Passé (position 124). Passage: "…Ils viennent admirer ses monuments célèbres comme la Tour Eiffel, Notre-Dame,…"
- "lieux" (fr:lex:lieu): not taught anywhere in the course; teach in a lesson before this module. Passage: "…touristes cherchent souvent des directions pour trouver ces lieux historiques."
- "étrangères" (fr:lex:etranger): the word étranger is taught at position 155, but this form is not; teach in a lesson before this module. Passage: "…sciences, l'histoire, les langues étrangères, et la littérature.…"
- "peintres" (fr:lex:peintre): not taught anywhere in the course; teach in a lesson before this module. Passage: "…créé des œuvres magnifiques. Ces peintres impressionnistes vivent encore dans…"
- "mémoire" (fr:lex:memoire): not taught anywhere in the course; teach in a lesson before this module. Passage: "…vivent encore dans la mémoire collective. Aujourd'hui, les…"
- "célèbre" (fr:lex:celebre): not taught anywhere in the course; teach in a lesson before Reading - Une Histoire du Passé (position 124). Passage: "…souvent dans des quartiers comme Montmartre, près du célèbre Moulin Rouge."
- "également" (fr:lex:egalement): not taught anywhere in the course; teach in a lesson before this module. Passage: "La cuisine française reste également très populaire dans le monde. Les plats…"
- "inoubliables" (fr:lex:inoubliable): not taught anywhere in the course; teach in a lesson before this module. Passage: "…Les restaurants français créent des expériences culinaires inoubliables."
- "plusieurs" (fr:lex:plusieurs): not taught anywhere in the course; teach in a lesson before this module. Passage: "L'économie française dépend de plusieurs secteurs importants. Beaucoup de…"
- "françaises" (fr:lex:francais): the word français is taught at position 73, but this form is not; teach in a lesson before this module. Passage: "…ou l'agriculture. Les entreprises françaises exportent leurs produits vers…"
- "delà" (fr:lex:dela): not taught anywhere in the course; teach in a lesson before this module. Passage: "…vers l'est, l'ouest, le nord et le sud - dans toute l'Europe et au-delà."
- "traverse" (fr:lex:traverser): not taught anywhere in the course; teach in a lesson before this module. Passage: "Un train rapide traverse la campagne vers le sud."
- "bord" (fr:lex:bord): not taught anywhere in the course; teach in a lesson before this module. Passage: "L'été à Nice, au bord de la Méditerranée."
- "vélo" (fr:lex:velo): not taught anywhere in the course; teach in a lesson before this module. Passage: "À vélo et en tram, la France pense à l'avenir."

### 156. Daily Essentials Practice - Fill in the Blanks

- "jusqu'" (fr:lex:jusque): not taught anywhere in the course; teach in a lesson before this module. Sentence: "Je reste ici jusqu'à demain."

## Curiosity & Questions

### 158. Nature & Animals - Curiosity Vocabulary

- "souffler" (fr:lex:souffler): taught later, at position 160 (Natural Phenomena - How Nature Works); teach in this module. Vocabulary note: "souffler"
- "pleuvoir" (fr:lex:pleuvoir): taught later, at position 160 (Natural Phenomena - How Nature Works); teach in Causal & Reason Words - Explaining Why (position 112). Vocabulary note: "pleuvoir"
- "nage" (fr:lex:nager): taught later, at position 159 (Movement Verbs - Actions in Nature); teach in Learning & Teaching - apprendre & enseigner (position 85). Concept card: "Comment est-ce qu'une tortue nage? Comment est-ce qu'un écureuil saute?"
- "saute" (fr:lex:sauter): taught later, at position 159 (Movement Verbs - Actions in Nature); teach in this module. Concept card: "Comment est-ce qu'une tortue nage? Comment est-ce qu'un écureuil saute?"
- "volent" (fr:lex:voler): taught later, at position 159 (Movement Verbs - Actions in Nature); teach in this module. Concept card: "Pourquoi est-ce que les oiseaux volent?"

### 159. Movement Verbs - Actions in Nature

- "nageais" (fr:lex:nager): the word nager is taught at position 159, but this form is not; teach in this module. Concept card: "Je nageais"

### 160. Natural Phenomena - How Nature Works

- fr:cx:q.quest-ce-qui: taught later, at position 161 (qu'est-ce qui vs qu'est-ce que - Master 'What' Questions); teach in this module. Concept card: "Qu'est-ce qui rend le ciel bleu?"

### 162. Complex pourquoi Questions - Ask Why About Anything

- "ailes" (fr:lex:aile): not taught anywhere in the course; teach in this module. Sentence: "pourquoi est-ce que les oiseaux ont des ailes?"

# 2. Exam topics not taught

## Essential Grammar

### 13. Unit exam · Essential Grammar

- exam 2024-01-11-unit1-exam (position 13) tests fr:cx:cest, which is not taught by then

## Everyday Words

### 54. Everyday Words Practice - Fill in the Blanks

- practice 2024-04-03-unit-4-practice (position 54) tests fr:cx:chunk.je-ne-sais-pas, which is not taught by then

### 55. Unit exam · Everyday Words

- exam 2024-04-02-unit-4-exam (position 55) tests fr:cx:chunk.je-ne-sais-pas, which is not taught by then

## Time & Taste

### 68. Time & Taste Practice - Fill in the Blanks

- practice 2024-04-15-unit-5-practice (position 68) tests fr:cx:passe-compose.etre, which is not taught by then
- practice 2024-04-15-unit-5-practice (position 68) tests fr:cx:si.present, which is not taught by then

### 69. Unit exam · Time & Taste

- exam 2024-04-14-unit-5-exam (position 69) tests fr:cx:passe-compose.etre, which is not taught by then
- exam 2024-04-14-unit-5-exam (position 69) tests fr:cx:si.present, which is not taught by then

## Discourse & Past Tense

### 126. Unit exam · Discourse & Past Tense

- exam 2024-06-09-unit-9-exam (position 126) tests fr:cx:plus-que-parfait.avoir, which is not taught by then
- exam 2024-06-09-unit-9-exam (position 126) tests fr:cx:plus-que-parfait.etre, which is not taught by then

## Mastery & Nuance

### 145. Mastery & Nuance Practice - Fill in the Blanks

- practice 2024-02-05-unit-10-practice (position 145) tests fr:cx:relative.qui, which is not taught by then
- practice 2024-02-05-unit-10-practice (position 145) tests fr:cx:relative.que, which is not taught by then
- practice 2024-02-05-unit-10-practice (position 145) tests fr:cx:relative.ou, which is not taught by then
- practice 2024-02-05-unit-10-practice (position 145) tests fr:cx:relative.dont, which is not taught by then
- practice 2024-02-05-unit-10-practice (position 145) tests fr:cx:relative.ce-que, which is not taught by then

### 146. Unit exam · Mastery & Nuance

- exam 2024-02-04-unit-10-exam (position 146) tests fr:cx:relative.qui, which is not taught by then
- exam 2024-02-04-unit-10-exam (position 146) tests fr:cx:relative.que, which is not taught by then
- exam 2024-02-04-unit-10-exam (position 146) tests fr:cx:relative.ou, which is not taught by then
- exam 2024-02-04-unit-10-exam (position 146) tests fr:cx:relative.dont, which is not taught by then
- exam 2024-02-04-unit-10-exam (position 146) tests fr:cx:relative.ce-que, which is not taught by then

## Daily Essentials

### 156. Daily Essentials Practice - Fill in the Blanks

- practice 2024-02-16-unit-11-practice (position 156) tests fr:cx:futur-anterieur, which is not taught by then
- practice 2024-02-16-unit-11-practice (position 156) tests fr:cx:conditionnel-passe.avoir, which is not taught by then
- practice 2024-02-16-unit-11-practice (position 156) tests fr:cx:passive, which is not taught by then

### 157. Unit exam · Daily Essentials

- exam 2024-02-15-unit-11-exam (position 157) tests fr:cx:futur-anterieur, which is not taught by then
- exam 2024-02-15-unit-11-exam (position 157) tests fr:cx:conditionnel-passe.avoir, which is not taught by then
- exam 2024-02-15-unit-11-exam (position 157) tests fr:cx:passive, which is not taught by then

# 3. Translation prompts to convert

- 18. Determiners + Nouns - Building Phrases: 8 prompts
- 24. Stressed Pronouns - moi, toi, lui...: 2 prompts
- 25. Prepositions - Spatial & Relational Words: 12 prompts
- 26. Common Adjectives - Describing Things: 13 prompts
- 29. Unit exam · Asking & Describing: 22 prompts
- 30. Contractions - du, au, de la, à la: 3 prompts
- 41. Unit exam · Movement & Possession: 8 prompts
- 46. Essential Verbs - chercher & trouver: 7 prompts
- 47. Negation - ne...pas (not): 5 prompts
- 48. Time & Frequency - now, always, never, today: 23 prompts
- 49. Negation Part 2 - I can't, I won't, I never: 10 prompts
- 50. Location Adverbs - here, there, everywhere: 9 prompts
- 51. Everyday Nouns - Life & World: 21 prompts
- 55. Unit exam · Everyday Words: 34 prompts
- 56. Comparisons & Intensity: 10 prompts
- 58. Should & Could - Advice and Possibility: 13 prompts
- 59. Would Forms - Hypotheticals and Desires: 14 prompts
- 60. aimer - To Like / To Love: 10 prompts
- 61. être - Past Tense (was / were): 15 prompts
- 62. avoir - Past Tense (had): 9 prompts
- 63. Everyday Food Nouns: 21 prompts
- 64. manger - To Eat (Present & Past): 14 prompts
- 66. boire - To Drink (Present & Past): 15 prompts
- 69. Unit exam · Time & Taste: 53 prompts
- 70. Progressive & Future - Expressing Time: 21 prompts
- 72. dire - To Say / To Tell: 18 prompts
- 73. prendre - To Take: 22 prompts
- 74. donner - To Give: 9 prompts
- 75. mettre - To Put / To Set: 17 prompts
- 76. demander - To Ask: 22 prompts
- 77. commander - To Order: 20 prompts
- 78. avoir besoin de - To Need: 22 prompts
- 79. Essential Vocabulary - Time, People & Ideas: 33 prompts
- 82. Unit exam · Basic Fluency: 65 prompts
- 83. Talking About People in General: 3 prompts
- 84. Studying & Reviewing - étudier & réviser: 5 prompts
- 85. Learning & Teaching - apprendre & enseigner: 5 prompts
- 91. Knowledge & Learning - Essential Nouns: 6 prompts
- 92. Discourse Markers - Sound Like a Native: 10 prompts
- 93. Modifiers - tout, même, mal: 6 prompts
- 96. Unit exam · Knowledge & Learning: 39 prompts
- 97. Temporal & Sequential Words - Time & Order: 7 prompts
- 98. Reflexive Pronouns - me, te, se, nous, vous: 1 prompt
- 99. s'appeler - To Be Called (Your Name!): 3 prompts
- 100. Morning Routine - se réveiller, se lever: 5 prompts
- 101. Getting Ready - se laver, s'habiller, se préparer: 3 prompts
- 102. Daily Actions - se souvenir, s'amuser, se dépêcher: 3 prompts
- 103. Reflexive Verbs in Past Tense: 2 prompts
- 104. Reciprocal Reflexives - Each Other: 3 prompts
- 111. Unit exam · Daily Life & Actions: 24 prompts
- 126. Unit exam · Discourse & Past Tense: 18 prompts
- 146. Unit exam · Mastery & Nuance: 29 prompts
- 148. donner - To Give: 8 prompts
- 150. Daily Life Essentials - Sleep, Work, Live: 12 prompts
- 151. Search & Find - chercher, trouver: 10 prompts
- 152. Perception Verbs - écouter, regarder: 10 prompts
- 153. Social Situations - Wait, Arrive, Stay: 13 prompts
- 154. Directions & Navigation: 12 prompts
- 157. Unit exam · Daily Essentials: 4 prompts
- 158. Nature & Animals - Curiosity Vocabulary: 15 prompts
- 159. Movement Verbs - Actions in Nature: 16 prompts
- 160. Natural Phenomena - How Nature Works: 13 prompts
- 162. Complex pourquoi Questions - Ask Why About Anything: 16 prompts
- 163. Complex comment Questions - Ask How Things Work: 13 prompts
- 167. Embedded Questions - Polite Indirect Questions: 13 prompts
- 168. Rhetorical & Negative Questions - Advanced Style: 5 prompts
- 169. Multi-Clause Questions - Full Complexity: 14 prompts

# 4. Taught twice

- fr:cx:noun.gender is taught at positions 5, 7; merge into Articles - The, A, An
- fr:lex:le is taught at positions 5, 8, 35, 37; merge into Articles - The, A, An
- fr:cx:article.indefinite is taught at positions 5, 8; merge into Articles - The, A, An
- fr:cx:article.definite is taught at positions 5, 8; merge into Articles - The, A, An
- fr:lex:livre is taught at positions 7, 8; merge into Basic Nouns - People & Things
- fr:lex:chat is taught at positions 7, 8, 158; merge into Basic Nouns - People & Things
- fr:lex:chien is taught at positions 7, 8; merge into Basic Nouns - People & Things
- fr:lex:ami is taught at positions 7, 8; merge into Basic Nouns - People & Things
- fr:lex:enfant is taught at positions 7, 8; merge into Basic Nouns - People & Things
- fr:lex:chose is taught at positions 7, 8; merge into Basic Nouns - People & Things
- fr:lex:etre is taught at positions 3, 17, 18, 22, 38, 42, 57, 61, 70, 72, 75, 83, 89, 92, 103, 107, 118, 119, 121, 123, 127, 131, 133, 134, 135, 139, 140, 142, 147, 151, 152, 154, 160, 161, 164, 168, 169; merge into Essential Verb - être (to be)
- fr:lex:avoir is taught at positions 4, 17, 18, 38, 47, 62, 64, 66, 78, 83, 107, 115, 116, 117, 123, 127, 131, 133, 134, 135, 147, 151, 160, 168; merge into Essential Verb - avoir (to have)
- fr:lex:ca is taught at positions 16, 17; merge into Demonstratives - It, That, This
- fr:cx:demonstrative.adjective is taught at positions 16, 18; merge into Demonstratives - It, That, This
- fr:cx:frame.modal-infinitive is taught at positions 19, 20, 31, 44, 117; merge into Essential Verb - vouloir (to want)
- fr:lex:aller is taught at positions 17, 22, 32, 38, 49, 59, 70, 83, 91, 93, 107, 121, 127, 154; merge into ça - Survival Phrases
- fr:cx:chunk.ca-va is taught at positions 17, 22; merge into ça - Survival Phrases
- fr:lex:elle is taught at positions 2, 24; fr:lex:elle.pronoun at positions 2, 24; merge into Core Pronouns - The Building Blocks
- fr:lex:nous is taught at positions 2, 24, 35, 98; fr:lex:nous.pronoun at positions 2, 24, 35, 98; merge into Core Pronouns - The Building Blocks
- fr:lex:vous is taught at positions 2, 24, 35, 98; fr:lex:vous.pronoun at positions 2, 24, 35, 98; merge into Core Pronouns - The Building Blocks
- fr:lex:elles is taught at positions 2, 24; merge into Core Pronouns - The Building Blocks
- fr:lex:bon is taught at positions 1, 26, 42, 92; merge into Famous Words & Greetings
- fr:cx:elision is taught at positions 4, 30, 47, 99; merge into Essential Verb - avoir (to have)
- fr:lex:des is taught at positions 8, 30; merge into Plurals - More Than One
- fr:lex:a.preposition is taught at positions 25, 30; merge into Prepositions - Spatial & Relational Words
- fr:lex:de is taught at positions 25, 30; merge into Prepositions - Spatial & Relational Words
- fr:lex:vouloir is taught at positions 19, 38, 42, 59, 77, 121, 130; merge into Essential Verb - vouloir (to want)
- fr:lex:venir is taught at positions 31, 38, 105, 106, 128, 139, 140; merge into Essential Verb - venir (to come)
- fr:cx:pronoun.direct-object is taught at positions 35, 38; merge into Object Pronouns - Him, Her, It, Them
- fr:lex:plaire is taught at positions 1, 42; merge into Famous Words & Greetings
- fr:lex:pardon is taught at positions 1, 42; merge into Famous Words & Greetings
- fr:cx:chunk.sil-vous-plait is taught at positions 1, 42; merge into Famous Words & Greetings
- fr:lex:ou.adverb is taught at positions 22, 42, 150, 154, 166; merge into Question Words - Ask Anything!
- fr:lex:combien is taught at positions 22, 42; merge into Question Words - Ask Anything!
- fr:lex:tres is taught at positions 10, 48; merge into Basic Connectors - et, mais, ou, aussi, très
- fr:lex:ne is taught at positions 47, 49, 70, 73, 86, 87, 90, 108, 132, 167, 168; merge into Negation - ne...pas (not)
- fr:cx:adverb.placement is taught at positions 48, 50; merge into Time & Frequency - now, always, never, today
- fr:lex:addition is taught at positions 42, 51; merge into Survival Phrases - Real-World Essentials
- fr:lex:temps is taught at positions 48, 51; merge into Time & Frequency - now, always, never, today
- fr:lex:quelque is taught at positions 50, 51; merge into Location Adverbs - here, there, everywhere
- fr:lex:tout is taught at positions 51, 56, 83, 93, 121, 122, 154; merge into Everyday Nouns - Life & World
- fr:cx:chunk.tout-le-monde is taught at positions 51, 56, 83, 93; merge into Everyday Nouns - Life & World
- fr:lex:trop is taught at positions 56, 57; merge into Comparisons & Intensity
- fr:lex:pouvoir is taught at positions 20, 58, 83, 128, 140, 142, 167; merge into Essential Verb - pouvoir (can)
- fr:lex:devoir is taught at positions 44, 58, 83; merge into Essential Verb - devoir (must)
- fr:lex:faire is taught at positions 43, 59, 83, 107, 121, 127, 138; merge into Essential Verb - faire (to do/make)
- fr:cx:conditionnel-present is taught at positions 58, 59; merge into Should & Could - Advice and Possibility
- fr:cx:imparfait is taught at positions 61, 62, 121; merge into être - Past Tense (was / were)
- fr:lex:cafe is taught at positions 1, 63; merge into Famous Words & Greetings
- fr:cx:article.partitive is taught at positions 30, 63; merge into Contractions - du, au, de la, à la
- fr:lex:eau is taught at positions 51, 63; merge into Everyday Nouns - Life & World
- fr:lex:pain is taught at positions 51, 63; merge into Everyday Nouns - Life & World
- fr:cx:passe-compose.avoir is taught at positions 64, 66, 115, 116, 117; merge into manger - To Eat (Present & Past)
- fr:cx:frame.aller-infinitive is taught at positions 32, 70; merge into Essential Verb - aller (to go)
- fr:lex:parler is taught at positions 45, 70, 104, 105, 106, 121, 137; merge into Essential Verb - parler (to speak)
- fr:lex:manger is taught at positions 64, 70, 105, 106, 137; merge into manger - To Eat (Present & Past)
- fr:cx:verb.er.present is taught at positions 45, 74; merge into Essential Verb - parler (to speak)
- fr:lex:aide is taught at positions 76, 78, 148; merge into demander - To Ask
- fr:lex:personne is taught at positions 51, 79, 83; merge into Everyday Nouns - Life & World
- fr:lex:on is taught at positions 2, 83; merge into Core Pronouns - The Building Blocks
- fr:cx:pronoun.on is taught at positions 2, 83; merge into Core Pronouns - The Building Blocks
- fr:lex:voir is taught at positions 21, 83, 104, 154; merge into Essential Verb - voir (to see)
- fr:lex:dire is taught at positions 72, 83; merge into dire - To Say / To Tell
- fr:lex:apprendre is taught at positions 73, 85; merge into prendre - To Take
- fr:lex:comprendre is taught at positions 73, 86, 92, 93, 104, 128, 140; merge into prendre - To Take
- fr:cx:frame.verb-que-clause is taught at positions 72, 89, 90, 132, 151; merge into dire - To Say / To Tell
- fr:lex:question is taught at positions 79, 91; merge into Essential Vocabulary - Time, People & Ideas
- fr:lex:savoir.verb is taught at positions 87, 91, 128, 140, 167; merge into savoir - To Know (Facts/Skills)
- fr:lex:bien is taught at positions 1, 92, 141, 150, 152; merge into Famous Words & Greetings
- fr:lex:fait is taught at positions 79, 92; merge into Essential Vocabulary - Time, People & Ideas
- fr:lex:penser is taught at positions 89, 92, 105, 132; merge into penser - To Think
- fr:lex:meme is taught at positions 56, 93; merge into Comparisons & Intensity
- fr:lex:mal is taught at positions 56, 93; merge into Comparisons & Intensity
- fr:lex:me is taught at positions 35, 98; merge into Object Pronouns - Him, Her, It, Them
- fr:lex:te is taught at positions 35, 98; merge into Object Pronouns - Him, Her, It, Them
- fr:lex:aimer is taught at positions 60, 98, 104, 130; merge into aimer - To Like / To Love
- fr:lex:comment is taught at positions 22, 99, 152, 154, 163, 166, 168, 169; merge into Question Words - Ask Anything!
- fr:lex:lever is taught at positions 98, 100; merge into Reflexive Pronouns - me, te, se, nous, vous
- fr:lex:laver is taught at positions 98, 101; merge into Reflexive Pronouns - me, te, se, nous, vous
- fr:lex:preparer is taught at positions 98, 101; merge into Reflexive Pronouns - me, te, se, nous, vous
- fr:lex:connaitre is taught at positions 88, 104; merge into connaître - To Know (People/Places)
- fr:lex:partir is taught at positions 34, 105, 128, 139; merge into Essential Verb - partir (to leave)
- fr:lex:prendre is taught at positions 73, 105, 106, 121; merge into prendre - To Take
- fr:lex:ecouter is taught at positions 105, 106, 108, 137, 152; merge into Commands - tu form (Informal)
- fr:lex:regarder is taught at positions 105, 106, 108, 152; merge into Commands - tu form (Informal)
- fr:lex:donner is taught at positions 74, 108, 148; merge into donner - To Give
- fr:lex:pourquoi is taught at positions 22, 112, 162, 166, 168, 169; merge into Question Words - Ask Anything!
- fr:lex:raison is taught at positions 79, 112; merge into Essential Vocabulary - Time, People & Ideas
- fr:lex:dans is taught at positions 25, 113; merge into Prepositions - Spatial & Relational Words
- fr:lex:sur.preposition is taught at positions 25, 113; merge into Prepositions - Spatial & Relational Words
- fr:lex:sous is taught at positions 25, 113; merge into Prepositions - Spatial & Relational Words
- fr:lex:derriere is taught at positions 25, 113; merge into Prepositions - Spatial & Relational Words
- fr:lex:devant is taught at positions 25, 113; merge into Prepositions - Spatial & Relational Words
- fr:lex:entre is taught at positions 25, 113; merge into Prepositions - Spatial & Relational Words
- fr:lex:place is taught at positions 51, 113; merge into Everyday Nouns - Life & World
- fr:lex:ici is taught at positions 50, 114; merge into Location Adverbs - here, there, everywhere
- fr:lex:cote is taught at positions 79, 114, 154; merge into Essential Vocabulary - Time, People & Ideas
- fr:lex:deja is taught at positions 48, 115; merge into Time & Frequency - now, always, never, today
- fr:lex:hier is taught at positions 48, 115, 122; merge into Time & Frequency - now, always, never, today
- fr:cx:ptcp.er is taught at positions 64, 115; merge into manger - To Eat (Present & Past)
- fr:lex:devoir.noun is taught at positions 44, 116; merge into Essential Verb - devoir (must)
- fr:cx:ptcp.agreement is taught at positions 103, 118, 119; merge into Reflexive Verbs in Past Tense
- fr:lex:y is taught at positions 83, 121, 123; merge into Talking About People in General
- fr:lex:y.pronoun is taught at positions 83, 121, 123; merge into Talking About People in General
- fr:lex:quand is taught at positions 22, 122, 166; merge into Question Words - Ask Anything!
- fr:lex:toujours is taught at positions 48, 122; merge into Time & Frequency - now, always, never, today
- fr:lex:moment is taught at positions 79, 122; merge into Essential Vocabulary - Time, People & Ideas
- fr:lex:pendant is taught at positions 97, 122; merge into Temporal & Sequential Words - Time & Order
- fr:lex:donc is taught at positions 92, 123; merge into Discourse Markers - Sound Like a Native
- fr:lex:alors is taught at positions 92, 123; merge into Discourse Markers - Sound Like a Native
- fr:cx:il-y-a is taught at positions 121, 123; merge into Imparfait Formation - All Verbs (was doing, used to do)
- fr:cx:subj.il-faut-que is taught at positions 127, 128, 129; merge into Forms Used After 'il faut que' and 'je veux que'
- fr:cx:subj.vouloir-que is taught at positions 127, 128, 130; merge into Forms Used After 'il faut que' and 'je veux que'
- fr:lex:probablement is taught at positions 92, 136; merge into Discourse Markers - Sound Like a Native
- fr:lex:peut-etre is taught at positions 92, 142; merge into Discourse Markers - Sound Like a Native
- fr:cx:age.avoir-ans is taught at positions 4, 147; merge into Essential Verb - avoir (to have)
- fr:lex:an is taught at positions 14, 147; merge into Numbers - 0 to 100
- fr:lex:quel is taught at positions 22, 147; merge into Question Words - Ask Anything!
- fr:lex:travailler is taught at positions 137, 150; merge into En mangeant... - While Doing Phrases
- fr:lex:chercher is taught at positions 46, 151; merge into Essential Verbs - chercher & trouver
- fr:lex:trouver is taught at positions 46, 151, 152; merge into Essential Verbs - chercher & trouver
- fr:lex:bus is taught at positions 73, 153; merge into prendre - To Take
- fr:lex:arriver is taught at positions 139, 153; merge into Avant que... - Before Phrases
- fr:lex:voiture is taught at positions 7, 154; merge into Basic Nouns - People & Things
- fr:lex:cinq is taught at positions 14, 154; merge into Numbers - 0 to 100
- fr:lex:excuser is taught at positions 42, 154; merge into Survival Phrases - Real-World Essentials
- fr:lex:pres is taught at positions 114, 154; merge into More Spatial Relations - Distance & Proximity
- fr:lex:loin is taught at positions 114, 154; merge into More Spatial Relations - Distance & Proximity
- fr:lex:face is taught at positions 114, 154; merge into More Spatial Relations - Distance & Proximity
- fr:lex:petit is taught at positions 26, 158; merge into Common Adjectives - Describing Things
- fr:lex:poisson is taught at positions 63, 158; merge into Everyday Food Nouns
- fr:lex:marcher is taught at positions 137, 159; merge into En mangeant... - While Doing Phrases
- fr:lex:plante is taught at positions 158, 160; merge into Nature & Animals - Curiosity Vocabulary
- fr:lex:vent is taught at positions 158, 160; merge into Nature & Animals - Curiosity Vocabulary
- fr:lex:pluie is taught at positions 158, 160; merge into Nature & Animals - Curiosity Vocabulary
- fr:cx:q.quest-ce-que is taught at positions 22, 161; merge into Question Words - Ask Anything!
- fr:cx:q.est-ce-que is taught at positions 22, 162, 163; merge into Question Words - Ask Anything!
- fr:cx:q.inversion is taught at positions 22, 163, 166; merge into Question Words - Ask Anything!
- fr:lex:demander is taught at positions 76, 167; merge into demander - To Ask

# 5. Not reused

- Essential Grammar: 34
- Asking & Describing: 71
- Movement & Possession: 18
- Everyday Words: 70
- Time & Taste: 74
- Basic Fluency: 63
- Knowledge & Learning: 55
- Daily Life & Actions: 30
- Discourse & Past Tense: 68
- Mastery & Nuance: 71
- Daily Essentials: 131
- Curiosity & Questions: 25

First 20:

- fr:lex:bonjour (taught at position 1) expected by position 3; last use at position 144
- fr:lex:bonsoir (taught at position 1) expected by position 3; last use at position 53
- fr:lex:merci (taught at position 1) expected by position 3; last use at position 144
- fr:lex:oui (taught at position 1) expected by position 3; last use at position 144
- fr:lex:non (taught at position 1) expected by position 3; last use at position 132
- fr:lex:se (taught at position 1) expected by position 3; last use at position 155
- fr:lex:si (taught at position 1) expected by position 3; last use at position 163
- fr:lex:plaire (taught at position 1) expected by position 3; last use at position 160
- fr:lex:pardon (taught at position 1) expected by position 3; last use at position 76
- fr:lex:au (taught at position 1) expected by position 7; last use at position 165
- fr:lex:revoir (taught at position 1) expected by position 3; last use at position 144
- fr:lex:voila (taught at position 1) expected by position 3; last use at position 109
- fr:lex:bon (taught at position 1) expected by position 3; last use at position 157
- fr:lex:bien (taught at position 1) expected by position 3; last use at position 157
- fr:lex:salut (taught at position 1) expected by position 3; last use at position 144
- fr:cx:chunk.au-revoir (taught at position 1) expected by position 3; last use at position 144
- fr:cx:chunk.sil-vous-plait (taught at position 1) expected by position 3; last use at position 82
- fr:lex:on (taught at position 2) expected by position 4; last use at position 169
- fr:cx:pronoun.tu-vous (taught at position 2) expected by position 4; never used again
- fr:cx:pronoun.on (taught at position 2) expected by position 4; last use at position 169

# 6. Levels

Each core list holds only the words and grammar patterns new at its level, so the A2 figures count A2 words alone. A learner at A2 also needs the A1 list, so the second table counts each level together with the levels below it. All percentages are rounded to the nearest whole number, and 100% means the whole list is taught.

Core words of each level alone taught by the end of the course: A1 62%, A2 22%, B1 7%.

Counting each level together with the levels below it: through A1 62%, through A2 43%, through B1 30%.

Core words available are the words lessons teach, plus the core words no lesson teaches that the Reference unit lists or that are cognates from the cognates lesson on. A learner can use all of them, so where a level is reached counts available words.

Each level on its own list:

| Level | Core words taught | Open in the Reference unit | Cognates | Core words available | Core constructions taught | Reached at |
|---|---|---|---|---|---|---|
| A1 | 62% (458 of 733) | 36 | 33 | 72% (527 of 733) | 38 of 40 | Not reached |
| A2 | 22% (150 of 681) | 8 | 17 | 26% (175 of 681) | 17 of 23 | Not reached |
| B1 | 7% (62 of 841) | 7 | 8 | 9% (77 of 841) | 13 of 17 | Not reached |

Each level together with the levels below it:

| Levels | Core words taught | Open in the Reference unit | Cognates | Core words available | Core constructions taught | Reached at |
|---|---|---|---|---|---|---|
| Through A1 | 62% (458 of 733) | 36 | 33 | 72% (527 of 733) | 38 of 40 | Not reached |
| Through A2 | 43% (608 of 1414) | 44 | 50 | 50% (702 of 1414) | 55 of 63 | Not reached |
| Through B1 | 30% (670 of 2255) | 51 | 58 | 35% (779 of 2255) | 68 of 80 | Not reached |

## Core grammar patterns not taught

- A1: Present tense of regular -ir verbs like finir (je finis, nous finissons) (fr:cx:verb.ir.present); Present tense of regular -re verbs like attendre (j'attends, il attend) (fr:cx:verb.re.present)
- A2: The pronoun en (some, of it) before the verb or an infinitive, or attached to an imperative (j'en ai, il y en a, je vais en acheter, prends-en) (fr:cx:pronoun.en); The pronoun y (there, about it) before the verb or attached to an imperative (j'y vais, on y va, vas-y) (fr:cx:pronoun.y); Relative pronoun où after a noun of place or time (fr:cx:relative.ou); Relative pronoun que (qu') as the object of a relative clause after a noun, celui / celle / ceux / celles or a stressed pronoun (le livre que je cherche, le grand livre rouge que je cherche, celles qu'on aime, c'est toi que je vois) (fr:cx:relative.que); Relative pronoun qui as the subject of a relative clause after a noun, a pronoun or a name (la personne qui parle, le livre rouge qui est ici, c'est toi qui pars, le Café de Flore qui est en face) (fr:cx:relative.qui); Real condition si + present tense (si tu veux, si j'ai le temps, je viens si tu veux) (fr:cx:si.present)
- B1: Passive voice: être + past participle of a verb that is not an être verb (je suis aimé, la maison est construite, il a été compris) (fr:cx:passive); Plus-que-parfait with être for the être verbs (j'étais déjà parti, elle était venue) (fr:cx:plus-que-parfait.etre); Headless relatives ce que (what, as object) and ce qui (what, as subject): je fais ce que je veux, ce qui est important (fr:cx:relative.ce-que); Relative pronoun dont (of which, whose, about which: la chose dont je parle) (fr:cx:relative.dont)

## Core words not taught

- A1, 272 words (plus 3 listed under Verbs the checker cannot read yet): accepter, accident, accord, aéroport, Ah, allemand, allô, alphabet (open in the Reference unit), américain, anglais, animal, anniversaire (open in the Reference unit), annuler, août (open in the Reference unit), appartement, appétit, assiette, automne (open in the Reference unit), avion, avril (open in the Reference unit), banque, bateau, bébé, belge, bibliothèque, bientôt, billet, blond, bouche, boulangerie, bouteille, bras, bravo, bureau, cacher, cadeau, cahier, canadien, canapé, carotte, centre, chaise, chambre, chanter, chapeau, chaussette, chaussure, chemise, cher, chinois, choisir, citron, clair (open in the Reference unit), client, confirmer, confiture, contre, copain, coucher, course, court, cousin, couteau, crayon, cuillère, danser, décembre (open in the Reference unit), déjeuner, demi, demi-heure, dent, désirer, dessert, dessin, dessiner, détester, deuxième, dimanche (open in the Reference unit), dîner, direction, docteur, doigt, dos, douche, doucher, écharpe, écrire, église, élève, enchanté, entendre, entrée, envoyer, épeler, espagnol, étage, été (open in the Reference unit), euro, exemple, exercice, expliquer, facile, félicitations, féliciter, fermer, fête (open in the Reference unit), février (open in the Reference unit), foot, fourchette, fraise, gagner, garçon, gomme, grand-mère, grand-père, gris (open in the Reference unit), gros, habiter, haut, hôpital, important, intelligent, intéressant, inviter, italien, jambe, jambon, janvier (open in the Reference unit), japonais, jaune (open in the Reference unit), jeudi (open in the Reference unit), joli, journal, juillet (open in the Reference unit), juin (open in the Reference unit), jupe, kilo, kilomètre, lampe, lettre (open in the Reference unit), libre, lire, lit, litre, longtemps, lundi (open in the Reference unit), lunettes, lycée, machine, madame, mademoiselle, magasin, mai (open in the Reference unit), marché, mardi (open in the Reference unit), mari, marron (open in the Reference unit), mars (open in the Reference unit), match, mauvais, médecin, menu, mercredi (open in the Reference unit), météo, métier, mètre, midi, minuit, monsieur, montagne, montre, moto, musée, neige (open in the Reference unit), nez, Noël (open in the Reference unit), noir (open in the Reference unit), novembre (open in the Reference unit), numéro, octobre (open in the Reference unit), offrir, oh, oignon, oncle, ordinateur, oreille, oublier, ouvrir, passer, pays (open in the Reference unit), petit-déjeuner, pharmacie, photo, pièce, piscine, plage, poire, pomme de terre, poste, préféré, prénom, présenter, prêt, printemps (open in the Reference unit), prochain, pull, quart, quatrième, radio, raisin, refuser, remercier, repas, répéter, répondre, réserver, retard, robe, rose (open in the Reference unit), route, russe, sac, saison, salle, salon, sans, secret, sens, septembre (open in the Reference unit), serveur, seul, simple, soif, sommeil, souhaiter, soupe, sourire, sport, station, steak, stylo, suisse (open in the Reference unit), suivre, sujet, supermarché, surprise, sympa, tante, tasse, taxi, télévision, tennis, théâtre, ticket, touriste, traverser, troisième, valise, vélo, vendeur, vendredi (open in the Reference unit), ventre, verre, veste, vêtement, village, violet (open in the Reference unit), visiter, volontiers, voyage, vue, yaourt
- A2, 521 words (plus 10 listed under Verbs the checker cannot read yet): absent, absolument, accent (open in the Reference unit), accompagner, acteur, activité, actrice, adolescent, adulte, affaire, âgé, agréable, aile, aimable, air, ajouter, alcool, allumer, ambulance, amener, amitié, amour, amoureux, amusant, ancien, appareil, appel, apporter, apprécier, arabe, armoire, arrêt, arrêter, arrivée, ascenseur, assez, assister, attacher, attirer, attraper, avance, avancer, aventure, avenue, avertir, avis, avocat, bagage, bague, baigner, bain, balcon, balle, ballon, bar, barbe, bas, bâtiment, bavarder, beige (open in the Reference unit), bête, bijou, bizarre, blague, blesser, bois, boîte, bol, bonbon, bonheur, bord, botte, boucherie, bouger, bougie, boulanger, boule, bouquet, boutique, bouton, britannique, brouillard, brun, caisse, calme, camarade, camion, canard, caractère, carnet, carrefour, casque, casquette, casser, cave, ceinture, célèbre, centime, chacun, chaîne, chaleur, champagne, champion, chanson, chanteur, charmant, château, chauffeur, chef, chemin, chèque, cheval, chiffre, choix, chou, cigarette, cirque, classique, club, cochon, coiffer, coiffeur, collègue, collier, comédie, comparer, complet, compliqué, compte, concert, conduire, congé, conseil, conseiller, contact, contacter, contraire, costume, cou, couloir, couple, cour, courageux, courriel, courrier, couverture, cravate, crème, crier, cuir, cuire, cuisiner, cuisinier, curieux, danger, dangereux, danse, danseur, debout, décrire, décrocher, dedans, degré, déménager, départ, dépenser, déposer, déranger, deviner, différence, directement, directeur, disputer, disque, dizaine, document, dommage, doucement, douleur, doux, drap, drapeau, drôle, échanger, écran, écriture, écrivain, émission, emmener, emploi, endormir, enfance, enlever, ennuyer, énorme, entraîner, épaule, épicerie, époque, équipe, erreur, escalier, espace, espérer, éteindre, évidemment, exact, exactement, examen, excuse, expérience, explication, extraordinaire, fâcher, façon, facteur, fantastique, faute, fauteuil, faux, ferme, feu, feuille (open in the Reference unit), fier, fièvre, fleuve, foncé (open in the Reference unit), fond, forêt, forme, formidable, fou, frapper, fumer, gant, garage, géant, général, généralement, genou, géographie, gorge, goût, goûter, gramme, grandir, grec, grippe, groupe, guerre, guide, guitare, heureusement, horrible, huile, identité, idiot, île, image, imaginer, immédiatement, immeuble, impossible, incroyable, indien, indiquer, infirmier, informatique, ingénieur, inquiet, inquiéter, inscrire, installer, instrument, interdire, inutile, inventer, invité, jeter, jeu, joie, joue, jouet, joueur, jour férié, journaliste, joyeux (open in the Reference unit), jumeau, jusque, justement, là-haut, laid, laisser, large, lecture, léger, librairie, lieu, lion, liste, louer, lourd, lune, magazine, maîtresse, maladie, malheureusement, malheureux, manquer, marchand, mariage, marque, mathématiques, matinée, méchant, médicament, mémoire, ménage, mentir, merveilleux, message, meuble, mignon, mince, miroir, moitié, monnaie, morceau, mouchoir, mourir, moustache, mouton, mur, musicien, nécessaire, neveu, nièce, niveau, nombre, nombreux, nourriture, objet, océan, orage, oreiller, organiser, original, os, ouvert, ouvrier, page, paire, pâle (open in the Reference unit), panier, panneau, papier, Pâques (open in the Reference unit), paquet, parfaitement, parfum, parking, partager, passager, passé, passeport, patron, pause, pauvre, paysage, peau, pêche, peindre, permis, piano, pilote, placard, plaisanter, plan, plein, pleurer, plusieurs, plutôt, poids, police, policier, polonais, port, portable, portefeuille, portugais, poubelle, poule, poupée, pratique, présent, prier, produit, professionnel, programme, projet, promenade, promener, promettre, prononcer, propos, proposer, propre, quai, qualité, quelquefois, queue, quitter, raccrocher, raconter, ramasser, randonnée, ranger, rappeler, rater, recevoir, recommander, recommencer, refaire, réfléchir, réfrigérateur, règle, reine, rejoindre, remplacer, remplir, renseignement, renseigner, repartir, repos, reposer, reprendre, respirer, responsable, résultat, retour, retourner, réunion, réveil, rhume, rideau, rire, rivière, rock, roi (open in the Reference unit), roman, rond, rouler, roux, sable, salaire, sale, santé, sec, seconde, secours, secrétaire, séjour, sembler, sensible, sentir, série, sérieux, serpent, serviette, servir, signer, signifier, silence, situation, ski, sofa, sonner, souris, spécial, spectacle, stade, studio, stupide, superbe, surtout, taille, taper, tapis, tellement, température, tenir, tente, terminer, terrasse, terrible, test, texte, timide, tiroir, toit, tort, toucher, traduire, tranche, tranquille, tromper, trottoir, unique, usine, utile, vache, vendre, vérifier, vérité, vide, vidéo, vider, visite, vitesse, voisin, vol
- B1, 775 words (plus 4 listed under Verbs the checker cannot read yet): abandonner, abri, absence, accès, accorder, accrocher, accueillir, accuser, achever, acte, actuellement, adieu, admettre, administration, adopter, affirmer, affreux, agence, agent, agir, ailleurs, aîné, allonger, ambition, amer, ange, angle, angoisse, animer, annonce, annoncer, apercevoir, apparaître, apparemment, apparence, appartenir, appliquer, approcher, appuyer, argenté (open in the Reference unit), arme, armée, arranger, arrière, aspect, assistant, assurance, assurer, atelier, atmosphère, attaque, attaquer, atteindre, attente, attentif, aucun, augmenter, auprès, aussitôt, autant, auteur, autoriser, autorité, autrefois, autrement, avaler, avantage, aveugle, avouer, baisser, ballet, bande, base, bataille, bâtir, battre, bêtise, blessure, bloquer, boue, branche, bref, brillant, briser, brûler, brusquement, buffet, cabine, cadre, calmer, caméra, capable, carré, carrière, carton, cas, catastrophe, cauchemar, céder, centaine, central, cependant, cercle, cérémonie, certes, certitude, cerveau, cesser, chagrin, chapitre, charger, charme, chasse, chasser, chauffer, cheminée, chic, choc, chute, cimetière, circonstance, circuler, citer, code, colère, collection, coller, colline, commerce, commun, compagnie, compagnon, comptoir, concentrer, conclure, concours, condition, conférence, confier, confondre, conscience, conséquence, conserver, considérer, consister, constater, consulter, contenir, contrat, contrôle, contrôler, convaincre, convenir, conviction, copie, corde, correspondre, coude, couler, coupable, courant, couvrir, craindre, crainte, creuser, cri, crime, crise, critique, croiser, croix, cruel, cueillir, cuisse, curiosité, davantage, débarrasser, débrouiller, décevoir, déchirer, décision, déclarer, décoller, décor, découverte, défaut, défendre, défense, définitif, délicat, démarrer, dépasser, dérouler, dès, désert, désir, désordre, désormais, destin, détail, détendre, détruire, dette, développer, différemment, difficulté, diriger, discours, discret, disparaître, distinguer, distribuer, divers, domaine, dont, doré (open in the Reference unit), dossier, douceur, drame, drogue, durant, échange, échapper, échec, échouer, éclairer, éclater, écraser, éditeur, éducation, effacer, effet, égal, également, électrique, élégant, élément, élever, éliminer, éloigner, émotion, empêcher, employer, emporter, emprunter, enceinte, énerver, enfermer, enfuir, engager, ennemi, ennui, enquête, enregistrer, entièrement, entourer, entretien, envers, environ, envisager, épais, épouser, époux, épreuve, équilibre, esprit, essence, essentiel, essuyer, estimer, estomac, établir, étape, état, étendre, étonnant, étonner, étrange, étroit, événement, évidence, évident, éviter, évoquer, exagérer, exception, exiger, existence, expert, exploser, explosion, exprimer, fabriquer, faible, fameux, familial, fantôme, faveur, fer, fiancé, fidèle, figure, fil, filmer, final, fixer, flamme, folie, fonction, fondre, fontaine, force, forcément, forcer, former, fortune, foule, fournir, fragile, franchement, franchir, francophone (open in the Reference unit), fréquenter, front, frontière, fuir, fuite, fumée, furieux, gardien, gaz, geler, gendarme, gêner, généreux, génie, genre, geste, glisser, goutte, gras, grève, guérir, habituel, habituer, haine, haïr, hasard, hauteur, héros, hésiter, honnête, honte, horizon, horreur, hors, hôte, humain, humeur, hurler, idéal, identifier, ignorer, illusion, imagination, imiter, immense, immobile, importance, imposer, impression, impressionner, incapable, incendie, incident, inconnu, individu, informer, innocent, inoubliable, inquiétude, insister, instinct, instruction, intelligence, intention, intérêt, intérieur, interroger, interrompre, intervenir, jaloux, jeunesse, joindre, juge, jugement, juger, jurer, justice, justifier, lâcher, laine, lancer, langage, larme, légende, légèrement, lendemain, lequel, lèvre, libérer, liberté, lien, limite, linge, local, loger, logique, loi, lors, lorsque, loup, lumineux, lutter, luxe, maire, maître, malgré, malheur, malin, manche, manière, manifester, manque, marin, marquer, masque, matériel, maximum, médical, méfier, membre, menace, menacer, mener, mensonge, menteur, menton, mériter, merveille, mesure, mesurer, métal, meurtre, militaire, millier, ministre, minuscule, miracle, misère, mission, modèle, modeste, monstre, mont, moquer, moral, mordre, mort, moteur, mouche, mouvement, moyen, multicolore (open in the Reference unit), murmurer, muscle, mystère, mystérieux, national (open in the Reference unit), naturel, naturellement, nécessité, nerf, nerveux, ni, nommer, nourrir, obéir, objectif, obliger, observer, obtenir, occasion, odeur, officiel (open in the Reference unit), offre, ombre, ongle, opéra, opération, ordinaire, ordre, origine, oser, outil, ouverture, paix, palais, paradis, paraître, parcourir, pardonner, parier, parole, partenaire, parti, particulier, particulièrement, passage, passion, patience, patient, patte, paysan, peine, peintre, pénible, période, personnage, personnel, perte, photographie, physique, piège, pile, piquer, piste, pitié, plafond, plaindre, plastique, plateau, plier, plonger, poésie, poète, poignet, point, poitrine, portrait, posséder, pot, pouce, poursuivre, pourtant, poussière, précaution, précédent, précieux, précis, préciser, présence, président, presse, presser, pression, prétendre, prétexte, prêtre, prévenir, prévoir, principal, principe, prison, prisonnier, privé, progrès, prolonger, promesse, proposition, protection, protester, prouver, provoquer, prudent, publier, puissance, puissant, punir, pur, raisonnable, ralentir, ramener, rang, rapport, rapporter, rare, raser, rassurer, rattraper, rayon, réaction, réagir, réaliser, réchauffer, recherche, rechercher, récit, réclamer, reculer, récupérer, réduire, réel, réellement, réflexion, regard, régime, règlement, régler, régulier, rejeter, religieux, religion, remarquer, remettre, renverser, renvoyer, représenter, reprocher, réputation, résistance, résister, résoudre, respecter, responsabilité, ressentir, retenir, retirer, retraite, réunir, révéler, révolution, revue, ridicule, risque, risquer, rocher, rompre, roue, ruine, rythme, sacré, sain, sang, satisfaction, sauf, sauvage, sauver, scientifique, séance, secouer, sécurité, selon, sentiment, séparer, serrer, sévère, siège, signaler, signe, silencieux, sincère, singe, sinon, situer, société, soigner, soin, sol, soldat, solide, solitude, sombre, somme, sommet, songer, sort, sorte, souci, souffrance, souffrir, soulever, source, sourcil, sourd, statue, style, subir, succès, suffire, suffisamment, suggérer, supérieur, supporter, supposer, surface, surveiller, survivre, tabac, talent, talon, tandis que, tant, technique, tel, témoin, tendresse, tenter, tenue, terme, terrain, théorie, tirer, tissu, titre, toile, total, totalement, toutefois, trace, traditionnel, trahir, trait, traitement, traiter, tranquillement, transformer, transmettre, transporter, travers, trembler, trésor, tristesse, trou, tuer, type, uniforme, uniquement, univers, urgence, urgent, vallée, valoir, vaste, véhicule, veille, vente, venue, véritable, verser, victime, victoire, vieillir, vif (open in the Reference unit), violence, violent, vitre, vitrine, vivant, vœu, voie, voleur, volonté, voyageur, zone

## Verbs the checker cannot read yet

The checker cannot yet tell these verbs from a noun or adjective with the same spelling: it reads il porte as the noun porte, not as the verb porter. They count in the core lists above, and when untaught they are listed here instead of with the core words not taught.

- adresser (B1): not taught
- causer (B1): not taught
- compter (A1): not taught
- durer (A2): not taught
- fêter (A2): not taught
- garder (A2): not taught
- garer (A2): not taught
- intéresser (A2): not taught
- marier (A2): not taught
- neiger (A1): not taught
- occuper (A2): not taught
- placer (B1): not taught
- planter (A2): not taught
- porter (A2): not taught
- prêter (A2): not taught
- taire (B1): not taught
- téléphoner (A1): not taught

## Units

| Unit | Positions | Level label | Highest level taught | Taught at that level |
|---|---|---|---|---|
| Essential Grammar | 1 to 13 | None | A2 | 2 |
| Asking & Describing | 14 to 29 | None | A2 | 4 |
| Movement & Possession | 30 to 41 | None | A2 | 15 |
| Everyday Words | 42 to 55 | None | B2 | 1 |
| Time & Taste | 56 to 69 | None | C1 | 3 |
| Basic Fluency | 70 to 82 | None | B1 | 2 |
| Knowledge & Learning | 83 to 96 | None | B2 | 1 |
| Daily Life & Actions | 97 to 111 | None | B1 | 1 |
| Discourse & Past Tense | 112 to 126 | None | B1 | 6 |
| Mastery & Nuance | 127 to 146 | B2 | B2 | 1 |
| Daily Essentials | 147 to 157 | None | C1 | 4 |
| Curiosity & Questions | 158 to 169 | None | B1 | 13 |

A single word or grammar pattern is enough to set a unit's highest level, so the last column gives how many words, forms and grammar patterns the unit teaches at that level.

## Level labels

None.

## Modules that teach above the level reached

The course reaches no level, so each module below teaches words or grammar patterns two or more levels above A1 (B1 or higher).

- 50. Location Adverbs - here, there, everywhere: fr:cx:chunk.nulle-part (B2)
- 57. Slang - Comparisons & Intensity: fr:lex:capot (C1), fr:lex:gnama (C1), fr:lex:chelou (B2), fr:lex:ben (B1), fr:lex:dingue (B1), fr:lex:ecœurant (B1), fr:lex:fun (B1), fr:lex:hyper (B1), fr:lex:mortel (B1), fr:lex:top (B1), fr:lex:vachement (B1)
- 67. Reading Comprehension - La fée verte (The Green Fairy): fr:lex:absinthe (C1)
- 72. dire - To Say / To Tell: fr:cx:chunk.cest-a-dire (B1)
- 76. demander - To Ask: fr:lex:permission (B1)
- 83. Talking About People in General: fr:lex:peuple (B1), fr:lex:population (B1)
- 84. Studying & Reviewing - étudier & réviser: fr:lex:reviser (B1)
- 91. Knowledge & Learning - Essential Nouns: fr:lex:apprentissage (B2), fr:lex:savoir (B1)
- 92. Discourse Markers - Sound Like a Native: fr:lex:ainsi (B1), fr:lex:presque (B1)
- 94. Reading - L'Art d'Apprendre: fr:lex:apprentissage (B2), fr:form:etudier.prsptcp (B1), fr:lex:methode (B1), fr:lex:reviser (B1), fr:lex:revision (B1), fr:lex:savoir (B1), fr:lex:soi (B1)
- 109. Reading - Ma Journée: fr:lex:typique (B1)
- 112. Causal & Reason Words - Explaining Why: fr:cx:chunk.grace-a (B1), fr:lex:car (B1), fr:lex:grace (B1), fr:lex:motif (B1), fr:lex:puisque (B1)
- 113. Spatial Prepositions - Position & Location: fr:lex:parmi (B1)
- 124. Reading - Une Histoire du Passé: fr:lex:car (B1), fr:lex:grace (B1)
- 127. Forms Used After 'il faut que' and 'je veux que': fr:cx:subj.vouloir-que (B1)
- 128. More Forms for 'il faut que' and 'je veux que' Phrases: fr:cx:subj.vouloir-que (B1)
- 130. Je veux que... - Expressing Wishes: fr:cx:subj.vouloir-que (B1)
- 131. Je suis content que... - Emotion Phrases: fr:cx:subj.emotion-que (B1)
- 132. Je pense que... - Opinion Phrases: fr:cx:subj.douter-que (B1), fr:cx:subj.ne-pas-penser-que (B1), fr:lex:douter (B1)
- 133. Si j'étais... - Daydreaming & Hypotheticals: fr:cx:si.imparfait-conditionnel (B1)
- 134. Si j'avais su... - Past Regret Phrases: fr:cx:si.plus-que-parfait-conditionnel-passe (B2)
- 135. J'avais déjà... - Had Already Done Phrases: fr:cx:plus-que-parfait.avoir (B1)
- 136. vraiment, sérieusement... - Common Adverbs: fr:lex:serieusement (B1)
- 137. En mangeant... - While Doing Phrases: fr:cx:gerondif (B1), fr:cx:prsptcp.er (B1)
- 138. Je me fais couper... - Service Phrases: fr:cx:causative.faire (B1)
- 139. Avant que... - Before Phrases: fr:cx:subj.avant-que (B1)
- 140. Pour que... - So That Phrases: fr:cx:subj.pour-que (B1)
- 141. Bien que... - Although Phrases: fr:cx:subj.bien-que (B1)
- 142. Il est possible que... - Possibility Phrases: fr:cx:subj.possible-que (B1)
- 144. Reading - Mes Rêves et Mes Espoirs: fr:lex:grace (B1), fr:lex:reconnaissant (B1), fr:lex:savoir (B1)
- 155. Reading - La France Moderne: fr:lex:homologue (C1), fr:lex:innovation (C1), fr:lex:internationalement (C1), fr:lex:agriculture (B2), fr:lex:arc (B2), fr:lex:bouillabaisse (B2), fr:lex:combiner (B2), fr:lex:contribution (B2), fr:lex:diplomate (B2), fr:lex:educatif (B2), fr:lex:enrichir (B2), fr:lex:exporter (B2), fr:lex:industrie (B2), fr:lex:preserver (B2), fr:lex:significatif (B2), fr:form:embrasser.prsptcp (B1), fr:lex:activement (B1), fr:lex:citoyen (B1), fr:lex:communiquer (B1), fr:lex:conclusion (B1), fr:lex:connecter (B1), fr:lex:coq (B1), fr:lex:culturel (B1), fr:lex:dechet (B1), fr:lex:economie (B1), fr:lex:economique (B1), fr:lex:economiser (B1), fr:lex:encourager (B1), fr:lex:environnement (B1), fr:lex:evoluer (B1), fr:lex:generation (B1), fr:lex:gouvernement (B1), fr:lex:historique (B1), fr:lex:influence (B1), fr:lex:inspirer (B1), fr:lex:litterature (B1), fr:lex:mondial (B1), fr:lex:moulin (B1), fr:lex:nation (B1), fr:lex:organisation (B1), fr:lex:patrimoine (B1), fr:lex:politique (B1), fr:lex:populaire (B1), fr:lex:primaire (B1), fr:lex:produire (B1), fr:lex:public (B1), fr:lex:quotidien (B1), fr:lex:ratatouille (B1), fr:lex:recycler (B1), fr:lex:regulierement (B1), fr:lex:secteur (B1), fr:lex:technologie (B1), fr:lex:triomphe (B1), fr:lex:visiteur (B1), fr:lex:œuvre (B1)
- 158. Nature & Animals - Curiosity Vocabulary: fr:lex:abeille (B1), fr:lex:ecureuil (B1), fr:lex:papillon (B1), fr:lex:tortue (B1)
- 160. Natural Phenomena - How Nature Works: fr:cx:rendre-adjective (B1), fr:lex:glace.adjective (B1)
- 163. Complex comment Questions - Ask How Things Work: fr:lex:ecureuil (B1), fr:lex:tortue (B1)
- 166. Inversion Questions - Formal Register: fr:lex:fleurir (B1), fr:lex:tortue (B1)
- 167. Embedded Questions - Polite Indirect Questions: fr:cx:q.embedded (B1)
- 168. Rhetorical & Negative Questions - Advanced Style: fr:cx:neg.ne-pas-infinitive (B1), fr:cx:q.negative-inversion (B1)

# 7. What a learner can do

A function is something a learner does with French, such as greeting someone or asking the time. It becomes possible at the first module by which every word and grammar pattern of one French way to do it is taught, open in the Reference unit or a cognate. "Possible" is a floor: the course has taught at least one short way to do the function, often a single phrase. That is not proof that a learner can do it at that level, so the table puts each level's count beside the share of that level's core words the course teaches.

| Level | Functions possible by the end | Core words of that level taught |
|---|---|---|
| A1 | 41 of 42 | 62% (458 of 733) |
| A2 | 23 of 23 | 22% (150 of 681) |
| B1 | 19 of 19 | 7% (62 of 841) |

Some functions rely on words that no lesson teaches by then but the Reference unit lists (année, anniversaire, clair, français, lundi, mai, trois). The Reference unit is always open, so those functions count as possible, and "(relies on the Reference unit)" marks them below.

Some functions rely on cognates that no lesson teaches by then (aider, attention, film, finalement, intéressant, sûr). From the cognates lesson on, cognates count as known, so those functions count as possible, and "(relies on cognates)" marks them below.

Some functions need words that no lesson teaches and that the Reference unit lists without opening them (épeler). It opens only the nouns, adjectives, numbers and letters on its lookup pages, so those functions never become possible. Below, "(Reference unit)" marks those words.

## A1

Possible, with the module where each becomes possible:

- 1. Famous Words & Greetings: Say sorry
- 1. Famous Words & Greetings: Give good wishes and compliments (relies on the Reference unit)
- 1. Famous Words & Greetings: Greet people and say goodbye
- 1. Famous Words & Greetings: Say thank you
- 3. Essential Verb - être (to be): Ask for and give personal details (relies on the Reference unit)
- 3. Essential Verb - être (to be): Say the day and the date (relies on the Reference unit)
- 3. Essential Verb - être (to be): Introduce yourself
- 10. Basic Connectors - et, mais, ou, aussi, très: Join simple ideas
- 17. ça - Survival Phrases: Ask how someone is
- 19. Essential Verb - vouloir (to want): Invite someone or offer something
- 19. Essential Verb - vouloir (to want): Say what you want
- 20. Essential Verb - pouvoir (can): Accept or turn down an invitation
- 20. Essential Verb - pouvoir (can): Say what you can and cannot do
- 22. Question Words - Ask Anything!: Ask permission
- 22. Question Words - Ask Anything!: Ask who someone is or what something is
- 26. Common Adjectives - Describing Things: Ask about and describe people
- 26. Common Adjectives - Describing Things: Ask about and describe things
- 35. Object Pronouns - Him, Her, It, Them: Approach someone and ask for something (relies on cognates)
- 36. Possessive Adjectives - My, Your, His, Her: Introduce someone
- 42. Survival Phrases - Real-World Essentials: Ask for information
- 42. Survival Phrases - Real-World Essentials: Buy things and ask the price
- 42. Survival Phrases - Real-World Essentials: Order in a café or restaurant
- 48. Time & Frequency - now, always, never, today: Talk about plans
- 48. Time & Frequency - now, always, never, today: Talk about the weather
- 51. Everyday Nouns - Life & World: Ask the way or give directions
- 51. Everyday Nouns - Life & World: Ask about and describe places
- 53. Reading Comprehension - La nouvelle époque de Marie: Say what you like and dislike
- 53. Reading Comprehension - La nouvelle époque de Marie: Talk about your day and your timetable
- 70. Progressive & Future - Expressing Time: Talk about and use transport
- 72. dire - To Say / To Tell: Ask how to say something in French (relies on the Reference unit)
- 72. dire - To Say / To Tell: Ask what a word or a remark means
- 73. prendre - To Take: Say you did not understand
- 79. Essential Vocabulary - Time, People & Ideas: Book a table or a room
- 79. Essential Vocabulary - Time, People & Ideas: Count and use numbers
- 79. Essential Vocabulary - Time, People & Ideas: Talk about your family
- 79. Essential Vocabulary - Time, People & Ideas: Ask and tell the time
- 87. savoir - To Know (Facts/Skills): Say you do not know
- 94. Reading - L'Art d'Apprendre: Say how much or how many
- 94. Reading - L'Art d'Apprendre: Say what you prefer
- 104. Reciprocal Reflexives - Each Other: Make, move or cancel an appointment
- 105. Commands - tu form (Informal): Give and follow simple instructions

Never possible in the course:

- Ask how a word is spelled: still needs épeler (Reference unit)

## A2

Possible, with the module where each becomes possible:

- 15. Saying No - Negation Guide: Express doubt or objection (relies on cognates)
- 17. ça - Survival Phrases: Check that you are understood (relies on the Reference unit)
- 17. ça - Survival Phrases: Show interest or indifference (relies on cognates)
- 44. Essential Verb - devoir (must): Say what someone has to do
- 44. Essential Verb - devoir (must): Start and end a conversation
- 45. Essential Verb - parler (to speak): Make a simple phone call
- 56. Comparisons & Intensity: Compare people and things
- 56. Comparisons & Intensity: Say how you feel physically
- 57. Slang - Comparisons & Intensity: Give an opinion
- 58. Should & Could - Advice and Possibility: Ask for and give advice
- 61. être - Past Tense (was / were): Describe how things used to be
- 62. avoir - Past Tense (had): Agree or disagree
- 64. manger - To Eat (Present & Past): Tell what happened
- 64. manger - To Eat (Present & Past): Say what you enjoyed or did not enjoy (relies on cognates)
- 78. avoir besoin de - To Need: Ask for help or offer it
- 83. Talking About People in General: Suggest something to do
- 97. Temporal & Sequential Words - Time & Order: Put events in order
- 105. Commands - tu form (Informal): Warn someone (relies on cognates)
- 107. Irregular Commands - être, avoir, aller, faire: Present a town or a country
- 112. Causal & Reason Words - Explaining Why: Give a reason
- 115. Passé Composé - Regular -ER Verbs (I spoke, I ate): Talk about your work
- 129. Il faut que... - Saying What's Necessary: Plan something together
- 147. Age & Personal Information: Tell the story of someone's life

Never possible in the course:

None.

## B1

Possible, with the module where each becomes possible:

- 6. Cognates: Wrap up what you are saying (relies on cognates)
- 56. Comparisons & Intensity: Give your view of a film or book (relies on the Reference unit; relies on cognates)
- 58. Should & Could - Advice and Possibility: Talk about hopes and wishes
- 64. manger - To Eat (Present & Past): Tell a memory or a story
- 72. dire - To Say / To Tell: Refer back to something already said
- 72. dire - To Say / To Tell: Repeat what someone said to check it
- 72. dire - To Say / To Tell: Say something again in other words
- 72. dire - To Say / To Tell: Report what someone said
- 72. dire - To Say / To Tell: Join a discussion and change the subject
- 92. Discourse Markers - Sound Like a Native: Make a guess about what is true
- 92. Discourse Markers - Sound Like a Native: Sum up a story and comment on it (relies on cognates)
- 97. Temporal & Sequential Words - Time & Order: Give a short talk on a topic
- 112. Causal & Reason Words - Explaining Why: Explain cause and effect
- 112. Causal & Reason Words - Explaining Why: Take part in an interview
- 112. Causal & Reason Words - Explaining Why: Give and support an opinion
- 131. Je suis content que... - Emotion Phrases: Talk about feelings
- 133. Si j'étais... - Daydreaming & Hypotheticals: Talk about an imagined situation
- 141. Bien que... - Although Phrases: Make a complaint
- 168. Rhetorical & Negative Questions - Advanced Style: Raise a problem and suggest a solution

Never possible in the course:

None.

# 8. Exercises in a nonstandard format

None.

# 9. Unknown words

- 7. Basic Nouns - People & Things: avocate
- 9. French Flow · Liaison: vou, leh, they, are, have
- 27. Reading Comprehension - Rendez-vous en Normandie: Complete
- 35. Object Pronouns - Him, Her, It, Them: he, sees, want, you, informal, she, has, him, it, masculine, we, have, her, feminine, see, us, wants, formal, plural, them
- 41. Unit exam · Movement & Possession: Denver
- 53. Reading Comprehension - La nouvelle époque de Marie: jamias
- 55. Unit exam · Everyday Words: aujourd, hui
- 57. Slang - Comparisons & Intensity: cest, louche
- 64. manger - To Eat (Present & Past): quest, composé
- 66. boire - To Drink (Present & Past): quest, composé
- 67. Reading Comprehension - La fée verte (The Green Fairy): composé, boisson, favorite, fées
- 72. dire - To Say / To Tell: càd
- 92. Discourse Markers - Sound Like a Native: clarification
- 94. Reading - L'Art d'Apprendre: comprendez, étudiante
- 98. Reflexive Pronouns - me, te, se, nous, vous: wash, myself, you, get, up, he, prepares, himself, she, gets, dressed, we, ready, they, have
- 112. Causal & Reason Words - Explaining Why: traffic
- 115. Passé Composé - Regular -ER Verbs (I spoke, I ate): Composé
- 121. Imparfait Formation - All Verbs (was doing, used to do): parl
- 122. Passé Composé vs Imparfait - The Golden Rule: Composé, PC, reaction
- 124. Reading - Une Histoire du Passé: weekend
- 126. Unit exam · Discourse & Past Tense: téléphoné
- 128. More Forms for 'il faut que' and 'je veux que' Phrases: Normal
- 146. Unit exam · Mastery & Nuance: you, need, to, be, want, him, have, go, do, your, homework, she, needs, come, leave
- 155. Reading - La France Moderne: tram
- 158. Nature & Animals - Curiosity Vocabulary: Elements

# 10. Other problems

- exam_item_copied (warning) [13. Unit exam · Essential Grammar]: 2024-01-11-unit1-exam#i-j-ai-un-livre repeats the lesson item 2024-01-08-connectors#i-j-ai-un-livre word for word; write the exam its own item
- exam_item_copied (warning) [13. Unit exam · Essential Grammar]: 2024-01-11-unit1-exam#i-nous-avons-les-livres repeats the lesson item 2024-01-07-plurals#i-nous-avons-les-livres word for word; write the exam its own item
- exam_item_copied (warning) [29. Unit exam · Asking & Describing]: 2024-01-24-unit2-exam#i-avec-moi repeats the lesson item 2024-01-19-stressed-pronouns#i-avec-moi word for word; write the exam its own item
- exam_item_copied (warning) [29. Unit exam · Asking & Describing]: 2024-01-24-unit2-exam#i-avec-lui repeats the lesson item 2024-01-19-stressed-pronouns#i-avec-lui word for word; write the exam its own item
- exam_item_copied (warning) [29. Unit exam · Asking & Describing]: 2024-01-24-unit2-exam#i-le-chat-est-dans repeats the lesson item 2024-01-20-prepositions#i-le-chat-est-dans word for word; write the exam its own item
- guide_only_teaching (error) [51. Everyday Nouns - Life & World]: 2024-03-24-everyday-nouns#i-il-n-a-pas uses fr:cx:neg.de, which only a guide teaches by position 51; teach it in a lesson first (il n'a pas d'argent)
- guide_only_teaching (error) [53. Reading Comprehension - La nouvelle époque de Marie]: 2024-03-30-reading-4#i-argent uses fr:cx:neg.de, which only a guide teaches by position 53; teach it in a lesson first (Je n'ai pas d'___)
- exam_item_copied (warning) [55. Unit exam · Everyday Words]: 2024-04-02-unit-4-exam#i-je-trouve repeats the lesson item 2024-10-22-search-find#i-je-trouve word for word; write the exam its own item
- exam_item_copied (warning) [55. Unit exam · Everyday Words]: 2024-04-02-unit-4-exam#i-je-cherche-le-livre repeats the lesson item 2024-10-22-search-find#i-je-cherche-le-livre word for word; write the exam its own item
- exam_item_copied (warning) [55. Unit exam · Everyday Words]: 2024-04-02-unit-4-exam#i-maintenant repeats the lesson item 2024-04-01-time-adverbs#i-maintenant word for word; write the exam its own item
- exam_item_copied (warning) [55. Unit exam · Everyday Words]: 2024-04-02-unit-4-exam#i-toujours repeats the lesson item 2024-04-01-time-adverbs#i-toujours word for word; write the exam its own item
- exam_item_copied (warning) [55. Unit exam · Everyday Words]: 2024-04-02-unit-4-exam#i-aujourd-hui repeats the lesson item 2024-04-01-time-adverbs#i-aujourd-hui word for word; write the exam its own item
- exam_item_copied (warning) [55. Unit exam · Everyday Words]: 2024-04-02-unit-4-exam#i-demain repeats the lesson item 2024-04-01-time-adverbs#i-demain word for word; write the exam its own item
- exam_item_copied (warning) [55. Unit exam · Everyday Words]: 2024-04-02-unit-4-exam#i-deja repeats the lesson item 2024-04-01-time-adverbs#i-deja word for word; write the exam its own item
- exam_item_copied (warning) [55. Unit exam · Everyday Words]: 2024-04-02-unit-4-exam#i-encore repeats the lesson item 2024-04-01-time-adverbs#i-encore word for word; write the exam its own item
- exam_item_copied (warning) [55. Unit exam · Everyday Words]: 2024-04-02-unit-4-exam#i-parfois repeats the lesson item 2024-04-01-time-adverbs#i-parfois word for word; write the exam its own item
- exam_item_copied (warning) [55. Unit exam · Everyday Words]: 2024-04-02-unit-4-exam#i-ici repeats the lesson item 2024-03-26-location-adverbs#i-ici word for word; write the exam its own item
- exam_item_copied (warning) [55. Unit exam · Everyday Words]: 2024-04-02-unit-4-exam#i-la repeats the lesson item 2024-03-26-location-adverbs#i-la word for word; write the exam its own item
- guide_only_teaching (error) [62. avoir - Past Tense (had)]: 2024-04-05-avoir-past#i-je-n-avais-pas uses fr:cx:neg.de, which only a guide teaches by position 62; teach it in a lesson first (je n'avais pas de chat)
- guide_only_teaching (error) [64. manger - To Eat (Present & Past)]: 2024-04-12-manger#i-je-ne-mange-pas uses fr:cx:neg.de, which only a guide teaches by position 64; teach it in a lesson first (je ne mange pas de viande)
- guide_only_teaching (error) [66. boire - To Drink (Present & Past)]: 2024-04-06-boire#i-je-ne-bois-pas uses fr:cx:neg.de, which only a guide teaches by position 66; teach it in a lesson first (je ne bois pas de café)
- reading_word_no_popup (error) [67. Reading Comprehension - La fée verte (The Green Fairy)]: "boisson" in the passage of 2024-04-13-reading-5 has no pop-up: add it to the dictionary or the reading's glossary
- reading_word_no_popup (error) [67. Reading Comprehension - La fée verte (The Green Fairy)]: "favorite" in the passage of 2024-04-13-reading-5 has no pop-up: add it to the dictionary or the reading's glossary
- reading_word_no_popup (error) [67. Reading Comprehension - La fée verte (The Green Fairy)]: "fées" in the passage of 2024-04-13-reading-5 has no pop-up: add it to the dictionary or the reading's glossary
- reading_word_no_popup (error) [67. Reading Comprehension - La fée verte (The Green Fairy)]: "vertes" in the passage of 2024-04-13-reading-5 has no pop-up: add it to the dictionary or the reading's glossary
- reading_word_no_popup (error) [67. Reading Comprehension - La fée verte (The Green Fairy)]: "Terrasse" in the passage of 2024-04-13-reading-5 has no pop-up: add it to the dictionary or the reading's glossary
- guide_only_teaching (error) [68. Time & Taste Practice - Fill in the Blanks]: 2024-04-15-unit-5-practice#i-mange-4 uses fr:cx:neg.de, which only a guide teaches by position 68; teach it in a lesson first (Je ne mange pas de viande.)
- exam_item_copied (warning) [69. Unit exam · Time & Taste]: 2024-04-14-unit-5-exam#i-je-ne-devrais-pas repeats the lesson item 2024-04-09-conditionals#i-je-ne-devrais-pas word for word; write the exam its own item
- exam_item_copied (warning) [69. Unit exam · Time & Taste]: 2024-04-14-unit-5-exam#i-nous-voudrions-de-l repeats the lesson item 2024-04-16-would-conditionals#i-nous-voudrions-de-l word for word; write the exam its own item
- exam_item_copied (warning) [69. Unit exam · Time & Taste]: 2024-04-14-unit-5-exam#i-je-ferais-ca repeats the lesson item 2024-04-16-would-conditionals#i-je-ferais-ca word for word; write the exam its own item
- exam_item_copied (warning) [69. Unit exam · Time & Taste]: 2024-04-14-unit-5-exam#i-c-etait-bon repeats the lesson item 2024-04-10-etre-past#i-c-etait-bon word for word; write the exam its own item
- exam_item_copied (warning) [69. Unit exam · Time & Taste]: 2024-04-14-unit-5-exam#i-nous-etions-ici repeats the lesson item 2024-04-10-etre-past#i-nous-etions-ici word for word; write the exam its own item
- exam_item_copied (warning) [69. Unit exam · Time & Taste]: 2024-04-14-unit-5-exam#i-ils-etaient-contents repeats the lesson item 2024-04-10-etre-past#i-ils-etaient-contents word for word; write the exam its own item
- exam_item_copied (warning) [69. Unit exam · Time & Taste]: 2024-04-14-unit-5-exam#i-nous-avions-un-chat repeats the lesson item 2024-04-05-avoir-past#i-nous-avions-un-chat word for word; write the exam its own item
- exam_item_copied (warning) [69. Unit exam · Time & Taste]: 2024-04-14-unit-5-exam#i-j-aime-le-cafe repeats the lesson item 2024-04-04-aimer#i-j-aime-le-cafe word for word; write the exam its own item
- exam_item_copied (warning) [69. Unit exam · Time & Taste]: 2024-04-14-unit-5-exam#i-je-n-etais-pas repeats the lesson item 2024-04-10-etre-past#i-je-n-etais-pas word for word; write the exam its own item
- exam_item_copied (warning) [69. Unit exam · Time & Taste]: 2024-04-14-unit-5-exam#i-je-ne-devrais-pas-2 repeats the lesson item 2024-04-09-conditionals#i-je-ne-devrais-pas word for word; write the exam its own item
- exam_item_copied (warning) [69. Unit exam · Time & Taste]: 2024-04-14-unit-5-exam#i-nous-mangeons-ensemble repeats the lesson item 2024-04-12-manger#i-nous-mangeons-ensemble word for word; write the exam its own item
- guide_only_teaching (error) [74. donner - To Give]: 2024-10-22-donner#i-il-ne-donne-rien uses "rien", which only a guide teaches by position 74; teach it in a lesson first (il ne donne rien)
- guide_only_teaching (error) [74. donner - To Give]: 2024-10-22-donner#i-il-ne-donne-rien uses fr:cx:neg.ne-rien, which only a guide teaches by position 74; teach it in a lesson first (il ne donne rien)
- exam_item_copied (warning) [82. Unit exam · Basic Fluency]: 2024-04-26-unit-6-exam#i-je-suis-en-train repeats the lesson item 2024-04-23-progressive-tenses#i-je-suis-en-train word for word; write the exam its own item
- exam_item_copied (warning) [82. Unit exam · Basic Fluency]: 2024-04-26-unit-6-exam#i-nous-sommes-en-train repeats the lesson item 2024-04-23-progressive-tenses#i-nous-sommes-en-train word for word; write the exam its own item
- exam_item_copied (warning) [82. Unit exam · Basic Fluency]: 2024-04-26-unit-6-exam#i-j-etais-en-train repeats the lesson item 2024-04-23-progressive-tenses#i-j-etais-en-train word for word; write the exam its own item
- exam_item_copied (warning) [82. Unit exam · Basic Fluency]: 2024-04-26-unit-6-exam#i-je-vais-manger repeats the lesson item 2024-04-23-progressive-tenses#i-je-vais-manger word for word; write the exam its own item
- exam_item_copied (warning) [82. Unit exam · Basic Fluency]: 2024-04-26-unit-6-exam#i-ils-vont-venir repeats the lesson item 2024-04-23-progressive-tenses#i-ils-vont-venir word for word; write the exam its own item
- exam_item_copied (warning) [82. Unit exam · Basic Fluency]: 2024-04-26-unit-6-exam#i-je-parlerai repeats the lesson item 2024-04-23-progressive-tenses#i-je-parlerai word for word; write the exam its own item
- exam_item_copied (warning) [82. Unit exam · Basic Fluency]: 2024-04-26-unit-6-exam#i-tu-mangeras repeats the lesson item 2024-04-23-progressive-tenses#i-tu-mangeras word for word; write the exam its own item
- exam_item_copied (warning) [82. Unit exam · Basic Fluency]: 2024-04-26-unit-6-exam#i-je-ne-peux-pas repeats the lesson item 2024-03-27-negation-2#i-je-ne-peux-pas word for word; write the exam its own item
- exam_item_copied (warning) [82. Unit exam · Basic Fluency]: 2024-04-26-unit-6-exam#i-je-dis repeats the lesson item 2024-04-20-dire#i-je-dis word for word; write the exam its own item
- exam_item_copied (warning) [82. Unit exam · Basic Fluency]: 2024-04-26-unit-6-exam#i-il-dit repeats the lesson item 2024-04-20-dire#i-il-dit word for word; write the exam its own item
- exam_item_copied (warning) [82. Unit exam · Basic Fluency]: 2024-04-26-unit-6-exam#i-il-me-dit repeats the lesson item 2024-04-20-dire#i-il-me-dit word for word; write the exam its own item
- exam_item_copied (warning) [82. Unit exam · Basic Fluency]: 2024-04-26-unit-6-exam#i-je-prends repeats the lesson item 2024-04-22-prendre#i-je-prends word for word; write the exam its own item
- exam_item_copied (warning) [82. Unit exam · Basic Fluency]: 2024-04-26-unit-6-exam#i-il-prend repeats the lesson item 2024-04-22-prendre#i-il-prend word for word; write the exam its own item
- exam_item_copied (warning) [82. Unit exam · Basic Fluency]: 2024-04-26-unit-6-exam#i-nous-prenons repeats the lesson item 2024-04-22-prendre#i-nous-prenons word for word; write the exam its own item
- exam_item_copied (warning) [82. Unit exam · Basic Fluency]: 2024-04-26-unit-6-exam#i-ils-prennent repeats the lesson item 2024-04-22-prendre#i-ils-prennent word for word; write the exam its own item
- exam_item_copied (warning) [82. Unit exam · Basic Fluency]: 2024-04-26-unit-6-exam#i-je-comprends repeats the lesson item 2024-04-22-prendre#i-je-comprends word for word; write the exam its own item
- exam_item_copied (warning) [82. Unit exam · Basic Fluency]: 2024-04-26-unit-6-exam#i-j-apprends repeats the lesson item 2024-04-22-prendre#i-j-apprends word for word; write the exam its own item
- exam_item_copied (warning) [82. Unit exam · Basic Fluency]: 2024-04-26-unit-6-exam#i-j-apprends-le-francais repeats the lesson item 2024-04-22-prendre#i-j-apprends-le-francais word for word; write the exam its own item
- exam_item_copied (warning) [82. Unit exam · Basic Fluency]: 2024-04-26-unit-6-exam#i-je-donne repeats the lesson item 2024-10-22-donner#i-je-donne word for word; write the exam its own item
- exam_item_copied (warning) [82. Unit exam · Basic Fluency]: 2024-04-26-unit-6-exam#i-tu-donnes repeats the lesson item 2024-02-10-donner#i-tu-donnes word for word; write the exam its own item
- exam_item_copied (warning) [82. Unit exam · Basic Fluency]: 2024-04-26-unit-6-exam#i-je-mets repeats the lesson item 2024-04-21-mettre#i-je-mets word for word; write the exam its own item
- exam_item_copied (warning) [82. Unit exam · Basic Fluency]: 2024-04-26-unit-6-exam#i-nous-mettons repeats the lesson item 2024-04-21-mettre#i-nous-mettons word for word; write the exam its own item
- exam_item_copied (warning) [82. Unit exam · Basic Fluency]: 2024-04-26-unit-6-exam#i-je-mets-un-manteau repeats the lesson item 2024-04-21-mettre#i-je-mets-un-manteau word for word; write the exam its own item
- exam_item_copied (warning) [82. Unit exam · Basic Fluency]: 2024-04-26-unit-6-exam#i-je-demande repeats the lesson item 2024-04-19-demander#i-je-demande word for word; write the exam its own item
- exam_item_copied (warning) [82. Unit exam · Basic Fluency]: 2024-04-26-unit-6-exam#i-il-me-demande-de repeats the lesson item 2024-04-19-demander#i-il-me-demande-de word for word; write the exam its own item
- exam_item_copied (warning) [82. Unit exam · Basic Fluency]: 2024-04-26-unit-6-exam#i-je-commande repeats the lesson item 2024-04-18-commander#i-je-commande word for word; write the exam its own item
- exam_item_copied (warning) [82. Unit exam · Basic Fluency]: 2024-04-26-unit-6-exam#i-nous-commandons repeats the lesson item 2024-04-18-commander#i-nous-commandons word for word; write the exam its own item
- exam_item_copied (warning) [82. Unit exam · Basic Fluency]: 2024-04-26-unit-6-exam#i-je-voudrais-commander repeats the lesson item 2024-04-18-commander#i-je-voudrais-commander word for word; write the exam its own item
- exam_item_copied (warning) [82. Unit exam · Basic Fluency]: 2024-04-26-unit-6-exam#i-j-ai-besoin-d repeats the lesson item 2024-04-17-besoin#i-j-ai-besoin-d word for word; write the exam its own item
- exam_item_copied (warning) [82. Unit exam · Basic Fluency]: 2024-04-26-unit-6-exam#i-j-ai-besoin-de-2 repeats the lesson item 2024-04-17-besoin#i-j-ai-besoin-de-2 word for word; write the exam its own item
- exam_item_copied (warning) [82. Unit exam · Basic Fluency]: 2024-04-26-unit-6-exam#i-toute-ma-famille repeats the lesson item 2024-04-25-top-200-nouns#i-toute-ma-famille word for word; write the exam its own item
- reading_word_no_popup (error) [94. Reading - L'Art d'Apprendre]: "étudiante" in the passage of 2024-05-07-reading-7 has no pop-up: add it to the dictionary or the reading's glossary
- guide_only_teaching (error) [94. Reading - L'Art d'Apprendre]: 2024-05-07-reading-7#passage/b-d-abord-on-doit/fr uses fr:cx:neg.de, which only a guide teaches by position 94; teach it in a lesson first (D'abord, on doit demander des questions. Socrate pense que les questions sont essentielles. Si on ne demande pas de questions, on ne pense pas. Et si on ne pense pas, on ne comprend pas.)
- exam_item_copied (warning) [96. Unit exam · Knowledge & Learning]: 2024-05-10-unit-7-exam#i-on-doit-etudier repeats the lesson item 2024-05-05-on-and-people#on-people-2 word for word; write the exam its own item
- exam_item_copied (warning) [96. Unit exam · Knowledge & Learning]: 2024-05-10-unit-7-exam#i-je-comprends repeats the lesson item 2024-04-22-prendre#i-je-comprends word for word; write the exam its own item
- exam_item_copied (warning) [96. Unit exam · Knowledge & Learning]: 2024-05-10-unit-7-exam#i-je-ne-comprends-pas repeats the lesson item 2024-04-22-prendre#i-je-ne-comprends-pas word for word; write the exam its own item
- exam_item_copied (warning) [96. Unit exam · Knowledge & Learning]: 2024-05-10-unit-7-exam#i-tout-le-monde-sait repeats the lesson item 2024-04-28-comparison-modifiers#comparison-modifiers-1 word for word; write the exam its own item
- exam_item_copied (warning) [96. Unit exam · Knowledge & Learning]: 2024-05-10-unit-7-exam#i-j-apprends-le-francais repeats the lesson item 2024-05-04-learning-verbs#learning-verbs-1 word for word; write the exam its own item
- exam_item_copied (warning) [96. Unit exam · Knowledge & Learning]: 2024-05-10-unit-7-exam#i-elle-enseigne-le-francais repeats the lesson item 2024-05-04-learning-verbs#learning-verbs-4 word for word; write the exam its own item
- exam_item_copied (warning) [96. Unit exam · Knowledge & Learning]: 2024-05-10-unit-7-exam#i-je-revise-mes-lecons repeats the lesson item 2024-05-09-studying-verbs#studying-verbs-2 word for word; write the exam its own item
- exam_item_copied (warning) [96. Unit exam · Knowledge & Learning]: 2024-05-10-unit-7-exam#i-j-ai-une-question repeats the lesson item 2024-04-25-top-200-nouns#i-j-ai-une-question word for word; write the exam its own item
- exam_item_copied (warning) [96. Unit exam · Knowledge & Learning]: 2024-05-10-unit-7-exam#i-peut-etre repeats the lesson item 2024-05-02-discourse-markers#discourse-markers-8 word for word; write the exam its own item
- exam_item_copied (warning) [96. Unit exam · Knowledge & Learning]: 2024-05-10-unit-7-exam#i-certainement repeats the lesson item 2024-05-02-discourse-markers#discourse-markers-9 word for word; write the exam its own item
- exam_item_copied (warning) [96. Unit exam · Knowledge & Learning]: 2024-05-10-unit-7-exam#i-bien-sur repeats the lesson item 2024-05-02-discourse-markers#discourse-markers-13 word for word; write the exam its own item
- exam_item_copied (warning) [96. Unit exam · Knowledge & Learning]: 2024-05-10-unit-7-exam#i-je-comprends-mal repeats the lesson item 2024-04-28-comparison-modifiers#comparison-modifiers-4 word for word; write the exam its own item
- exam_item_copied (warning) [96. Unit exam · Knowledge & Learning]: 2024-05-10-unit-7-exam#i-je-sais-tout repeats the lesson item 2024-04-28-comparison-modifiers#comparison-modifiers-6 word for word; write the exam its own item
- exam_item_copied (warning) [111. Unit exam · Daily Life & Actions]: 2024-05-24-unit-8-exam#i-avant repeats the lesson item 2024-05-23-temporal-words#temporal-2 word for word; write the exam its own item
- exam_item_copied (warning) [111. Unit exam · Daily Life & Actions]: 2024-05-24-unit-8-exam#i-apres repeats the lesson item 2024-05-23-temporal-words#temporal-3 word for word; write the exam its own item
- exam_item_copied (warning) [111. Unit exam · Daily Life & Actions]: 2024-05-24-unit-8-exam#i-finalement repeats the lesson item 2024-05-23-temporal-words#temporal-7 word for word; write the exam its own item
- exam_item_copied (warning) [111. Unit exam · Daily Life & Actions]: 2024-05-24-unit-8-exam#i-avant-le-cours-j repeats the lesson item 2024-05-23-temporal-words#temporal-10 word for word; write the exam its own item
- exam_item_copied (warning) [111. Unit exam · Daily Life & Actions]: 2024-05-24-unit-8-exam#i-je-me-lave repeats the lesson item 2024-05-21-reflexive-pronouns#reflexive-pronouns-8 word for word; write the exam its own item
- exam_item_copied (warning) [111. Unit exam · Daily Life & Actions]: 2024-05-24-unit-8-exam#i-je-m-appelle-marie repeats the lesson item 2024-05-22-s-appeler#s-appeler-1 word for word; write the exam its own item
- exam_item_copied (warning) [111. Unit exam · Daily Life & Actions]: 2024-05-24-unit-8-exam#i-il-s-appelle-pierre repeats the lesson item 2024-05-22-s-appeler#s-appeler-3 word for word; write the exam its own item
- exam_item_copied (warning) [111. Unit exam · Daily Life & Actions]: 2024-05-24-unit-8-exam#i-elle-s-appelle-sophie repeats the lesson item 2024-05-22-s-appeler#s-appeler-4 word for word; write the exam its own item
- exam_item_copied (warning) [111. Unit exam · Daily Life & Actions]: 2024-05-24-unit-8-exam#i-je-me-reveille repeats the lesson item 2024-05-19-morning-routine#morning-1 word for word; write the exam its own item
- exam_item_copied (warning) [111. Unit exam · Daily Life & Actions]: 2024-05-24-unit-8-exam#i-je-me-leve repeats the lesson item 2024-05-19-morning-routine#morning-4 word for word; write the exam its own item
- exam_item_copied (warning) [111. Unit exam · Daily Life & Actions]: 2024-05-24-unit-8-exam#i-je-m-habille repeats the lesson item 2024-05-17-getting-ready#getting-ready-2 word for word; write the exam its own item
- exam_item_copied (warning) [111. Unit exam · Daily Life & Actions]: 2024-05-24-unit-8-exam#i-je-me-prepare-pour repeats the lesson item 2024-05-17-getting-ready#getting-ready-3 word for word; write the exam its own item
- exam_item_copied (warning) [111. Unit exam · Daily Life & Actions]: 2024-05-24-unit-8-exam#i-je-me-souviens repeats the lesson item 2024-05-16-daily-reflexives#daily-reflex-1 word for word; write the exam its own item
- exam_item_copied (warning) [111. Unit exam · Daily Life & Actions]: 2024-05-24-unit-8-exam#i-je-me-depeche repeats the lesson item 2024-05-16-daily-reflexives#daily-reflex-5 word for word; write the exam its own item
- exam_item_copied (warning) [111. Unit exam · Daily Life & Actions]: 2024-05-24-unit-8-exam#i-elle-s-est-levee repeats the lesson item 2024-06-07-reflexive-past#reflex-past-2 word for word; write the exam its own item
- exam_item_copied (warning) [111. Unit exam · Daily Life & Actions]: 2024-05-24-unit-8-exam#i-nous-nous-aimons repeats the lesson item 2024-06-06-reciprocal-reflexives#reciprocal-1 word for word; write the exam its own item
- exam_item_copied (warning) [111. Unit exam · Daily Life & Actions]: 2024-05-24-unit-8-exam#i-ils-se-parlent repeats the lesson item 2024-06-06-reciprocal-reflexives#reciprocal-4 word for word; write the exam its own item
- guide_only_teaching (error) [124. Reading - Une Histoire du Passé]: 2024-06-05-reading-9#passage/b-hier-c-etait-samedi/fr uses fr:cx:neg.de, which only a guide teaches by position 124; teach it in a lesson first (Hier, c'était samedi et il faisait très beau à Paris. J'étais content parce que c'était le week-end et je n'avais pas de travail.)
- exam_item_copied (warning) [126. Unit exam · Discourse & Past Tense]: 2024-06-09-unit-9-exam#i-devant repeats the lesson item 2024-01-20-prepositions#i-devant word for word; write the exam its own item
- exam_item_copied (warning) [126. Unit exam · Discourse & Past Tense]: 2024-06-09-unit-9-exam#i-derriere repeats the lesson item 2024-01-20-prepositions#i-derriere word for word; write the exam its own item
- exam_item_copied (warning) [126. Unit exam · Discourse & Past Tense]: 2024-06-09-unit-9-exam#i-entre repeats the lesson item 2024-01-20-prepositions#i-entre word for word; write the exam its own item
- guide_only_teaching (error) [144. Reading - Mes Rêves et Mes Espoirs]: 2024-02-01-reading-10#passage/b-je-comprends-mais-il/fr uses "rien", which only a guide teaches by position 144; teach it in a lesson first ("Je comprends. Mais il faut que tu essaies! Si tu ne fais rien, tu ne sauras jamais," j'ai dit.)
- guide_only_teaching (error) [144. Reading - Mes Rêves et Mes Espoirs]: 2024-02-01-reading-10#passage/b-je-comprends-mais-il/fr uses fr:cx:neg.ne-rien, which only a guide teaches by position 144; teach it in a lesson first ("Je comprends. Mais il faut que tu essaies! Si tu ne fais rien, tu ne sauras jamais," j'ai dit.)
- guide_only_teaching (error) [146. Unit exam · Mastery & Nuance]: 2024-02-04-unit-10-exam#i-saura uses "rien", which only a guide teaches by position 146; teach it in a lesson first (Si on ne fait rien, on ne _____ jamais)
- guide_only_teaching (error) [146. Unit exam · Mastery & Nuance]: 2024-02-04-unit-10-exam#i-saura uses fr:cx:neg.ne-rien, which only a guide teaches by position 146; teach it in a lesson first (Si on ne fait rien, on ne _____ jamais)
- reading_word_no_popup (error) [155. Reading - La France Moderne]: "traverse" in the passage of 2024-02-12-reading-11 has no pop-up: add it to the dictionary or the reading's glossary
- reading_word_no_popup (error) [155. Reading - La France Moderne]: "bord" in the passage of 2024-02-12-reading-11 has no pop-up: add it to the dictionary or the reading's glossary
- reading_word_no_popup (error) [155. Reading - La France Moderne]: "vélo" in the passage of 2024-02-12-reading-11 has no pop-up: add it to the dictionary or the reading's glossary
- reading_word_no_popup (error) [155. Reading - La France Moderne]: "tram" in the passage of 2024-02-12-reading-11 has no pop-up: add it to the dictionary or the reading's glossary
- exam_item_copied (warning) [157. Unit exam · Daily Essentials]: 2024-02-15-unit-11-exam#i-je-dors repeats the lesson item 2024-05-15-daily-actions-1#i-je-dors word for word; write the exam its own item
- exam_item_copied (warning) [157. Unit exam · Daily Essentials]: 2024-02-15-unit-11-exam#i-je-travaille repeats the lesson item 2024-05-15-daily-actions-1#i-je-travaille word for word; write the exam its own item
- exam_item_copied (warning) [157. Unit exam · Daily Essentials]: 2024-02-15-unit-11-exam#i-je-vis repeats the lesson item 2024-05-15-daily-actions-1#i-je-vis word for word; write the exam its own item
