# Converting today’s modules to module files

`pnpm content:migrate` wrote 171 module files (124 lessons, 11 practice sets, 11 unit exams, 5 guides, 11 readings and 9 Reference pages) under `content/fr/modules/` from today’s modules in `src/lessons/modules/`, with 2627 items. Guides and readings also read prototype L’s guides and illustrated stories (`content/fr/legacy/l-sources.json`). 530 word ids are first minted in a reading’s vocabulary table, since a reading teaches its own table. The sections below list every guess the conversion made and every place where the written files differ from today’s source.

This file is written again on every run. Fixes go in the module files, never here.

English-to-French prompts by unit: a bare English sentence is a `translate` item, a framed one a `respond` item.

| Unit | Bare `translate` | Framed `respond` |
|---|---|---|
| unit1 Essential Grammar | 35 | 48 |
| unit2 Asking & Describing | 57 | 99 |
| unit3 Movement & Possession | 11 | 104 |
| unit4 Everyday Words | 109 | 85 |
| unit5 Time & Taste | 174 | 112 |
| unit6 Basic Fluency | 249 | 37 |
| unit7 Knowledge & Learning | 72 | 29 |
| unit8 Daily Life & Actions | 51 | 55 |
| unit9 Discourse & Past Tense | 18 | 17 |
| unit10 Mastery & Nuance | 29 | 101 |
| unit11 Daily Essentials | 69 | 70 |
| unit12 Curiosity & Questions | 0 | 60 |

| Section | Lines |
|---|---|
| Guide checks written by hand | 1 |
| Spellings taught more than once | 401 |
| Item types to confirm | 259 |
| Practice blanks that were in the wrong place | 51 |
| Position words | 119 |
| Exercises rewritten as Jake ruled | 2 |
| English prompts written as respond items | 822 |
| Passage words with no pop-up | 6 |
| Estimates to confirm | 1 |
| Hand edits kept | 1134 |
| Live ids with no converted item | 340 (25 real misses) |
| Fields with no place in a module file | 1954 |
| Text written differently | 661 |
| Notes | 3 |
| Outline | 16 |

## Guide checks written by hand

The source guide has no checks, so its three are written by hand in the module file. A rerun keeps them, and hand-fixes.json records them.

**2026-11-24-negation-guide**

- `checks` three checks, written by hand in the module file (kept on rerun)

## Spellings taught more than once

Each line proposes whether a spelling taught again is the same meaning (same word_id) or a new one (a sense suffix). Confirm or change the word_id in the module file; a rerun keeps it.

**2024-01-07-plurals**

- `vocabulary[1]` "les": same meaning as "the (plural)" in 2024-01-05-articles: kept les-fr

**2026-11-24-numbers**

- `vocabulary[1]` "un": new meaning "one": un-fr.one; met before as "a/an (masculine)" (un-fr, 2024-01-05-articles)
- `vocabulary[2]` "une": new meaning "one": une-fr.one; met before as "a/an (feminine)" (une-fr, 2024-01-05-articles)

**2024-01-13-ca-survival**

- `vocabulary[0]` "ça": same meaning as "that/it (informal)" in 2024-01-12-demonstratives: kept ca-fr
- `vocabulary[3]` "ça va?": new meaning "how's it going?": ca-va-fr.question; met before as "it goes/OK" (ca-va-fr, 2024-01-13-ca-survival)

**2024-01-18-questions**

- `vocabulary[2]` "où": ou-fr already names "ou", a different spelling: ou-fr.where
- `vocabulary[11]` "ça va?": new meaning "you good?": ca-va-fr.question-2; met before as "it goes/OK" (ca-va-fr, 2024-01-13-ca-survival); "how's it going?" (ca-va-fr.question, 2024-01-13-ca-survival) (written: ca-va-fr.question) (fixed by hand)

**2024-01-19-stressed-pronouns**

- `vocabulary[3]` "elle": new meaning "her (stressed)": elle-fr.stressed; met before as "she" (elle-fr, 2024-01-01-pronouns)
- `vocabulary[4]` "nous": new meaning "us (stressed)": nous-fr.stressed; met before as "we" (nous-fr, 2024-01-01-pronouns)
- `vocabulary[5]` "vous": new meaning "you (stressed, formal/plural)": vous-fr.stressed; met before as "you (formal/plural)" (vous-fr, 2024-01-01-pronouns)
- `vocabulary[7]` "elles": new meaning "them (stressed, feminine)": elles-fr.stressed; met before as "they (feminine)" (elles-fr, 2024-01-01-pronouns)

**2024-01-25-contractions**

- `vocabulary[3]` "des": new meaning "of/from the (plural)": des-fr.of; met before as "some / plural a" (des-fr, 2024-01-07-plurals)

**2024-01-30-object-pronouns**

- `vocabulary[2]` "le": new meaning "him/it (masculine)": le-fr.object-pronoun; met before as "the (masculine)" (le-fr, 2024-01-05-articles)
- `vocabulary[3]` "la": new meaning "her/it (feminine)": la-fr.object-pronoun; met before as "the (feminine)" (la-fr, 2024-01-05-articles)
- `vocabulary[4]` "nous": new meaning "us": nous-fr.object-pronoun; met before as "we" (nous-fr, 2024-01-01-pronouns); "us (stressed)" (nous-fr.stressed, 2024-01-19-stressed-pronouns)
- `vocabulary[5]` "vous": new meaning "you (formal/plural)": vous-fr.object-pronoun; met before as "you (formal/plural)" (vous-fr, 2024-01-01-pronouns); "you (stressed, formal/plural)" (vous-fr.stressed, 2024-01-19-stressed-pronouns)
- `vocabulary[6]` "les": new meaning "them": les-fr.object-pronoun; met before as "the (plural)" (les-fr, 2024-01-05-articles); "the (plural)" (les-fr, 2024-01-07-plurals)

**2024-03-31-survival-phrases**

- `vocabulary[1]` "s'il vous plaît": same meaning as "please" in 2024-01-01-famous-words: kept s-il-vous-plait-fr
- `vocabulary[2]` "s'il te plaît": same meaning as "please (to a friend)" in 2024-01-15-vouloir: kept s-il-te-plait-fr
- `vocabulary[11]` "pardon": same meaning as "excuse me / sorry" in 2024-01-01-famous-words: kept pardon-fr

**2024-04-01-time-adverbs**

- `vocabulary[12]` "aujourd'hui": same meaning as "today" in 2024-02-03-reading3: kept aujourd-hui-fr

**2024-03-27-negation-2**

- `vocabulary[3]` "je ne veux pas": same meaning as "I don't want" in 2024-03-28-negation: kept je-ne-veux-pas-fr

**2024-03-26-location-adverbs**

- `vocabulary[0]` "ici": same meaning as "here" in 2024-04-01-time-adverbs: kept ici-fr
- `vocabulary[1]` "là": la-fr already names "la", a different spelling: la-fr.there

**2024-03-24-everyday-nouns**

- `vocabulary[7]` "la ville": same meaning as "the town / the city" in 2024-01-22-reading2: kept la-ville-fr
- `vocabulary[22]` "l'addition": same meaning as "the bill/check" in 2024-03-31-survival-phrases: kept l-addition-fr

**2024-03-30-reading-4**

- `vocabulary[2]` "comment ça va": new meaning "how are you": comment-ca-va-fr.how-are-you; met before as "how's it going?" (comment-ca-va-fr, 2024-01-18-questions)
- `vocabulary[4]` "je ne peux pas": same meaning as "I can't" in 2024-03-27-negation-2: kept je-ne-peux-pas-fr
- `vocabulary[5]` "maintenant": same meaning as "now" in 2024-04-01-time-adverbs: kept maintenant-fr
- `vocabulary[6]` "je dois": same meaning as "I must" in 2024-03-23-devoir: kept je-dois-fr
- `vocabulary[7]` "le travail": same meaning as "work" in 2024-03-24-everyday-nouns: kept le-travail-fr
- `vocabulary[8]` "aujourd'hui": same meaning as "today" in 2024-02-03-reading3: kept aujourd-hui-fr
- `vocabulary[9]` "demain": same meaning as "tomorrow" in 2024-04-01-time-adverbs: kept demain-fr
- `vocabulary[10]` "toujours": same meaning as "always" in 2024-04-01-time-adverbs: kept toujours-fr
- `vocabulary[13]` "venir": same meaning as "to come" in 2024-01-26-venir: kept venir-fr
- `vocabulary[17]` "la carte de crédit": same meaning as "credit card" in 2024-03-24-everyday-nouns: kept la-carte-de-credit-fr
- `vocabulary[19]` "là-bas": same meaning as "over there" in 2024-03-26-location-adverbs: kept la-bas-fr
- `vocabulary[22]` "où": same meaning as "where" in 2024-01-18-questions: kept ou-fr.where
- `vocabulary[23]` "la place": same meaning as "square/place" in 2024-03-24-everyday-nouns: kept la-place-fr
- `vocabulary[25]` "c'est ça": same meaning as "that's it/right" in 2024-01-13-ca-survival: kept c-est-ca-fr
- `vocabulary[26]` "tout le monde": same meaning as "everybody/everyone" in 2024-03-24-everyday-nouns: kept tout-le-monde-fr
- `vocabulary[27]` "partir": same meaning as "to leave / to depart" in 2024-01-29-partir: kept partir-fr
- `vocabulary[28]` "au revoir": same meaning as "goodbye" in 2024-01-01-famous-words: kept au-revoir-fr
- `vocabulary[34]` "le pain": same meaning as "bread" in 2024-03-24-everyday-nouns: kept le-pain-fr
- `vocabulary[35]` "l'eau": same meaning as "water" in 2024-03-24-everyday-nouns: kept l-eau-fr
- `vocabulary[36]` "s'il vous plaît": same meaning as "please" in 2024-01-01-famous-words: kept s-il-vous-plait-fr
- `vocabulary[37]` "voilà": new meaning "there you go": voila-fr.there-you-go; met before as "there it is / here you go" (voila-fr, 2024-01-01-famous-words)
- `vocabulary[38]` "jamais": same meaning as "never (with ne)" in 2024-04-01-time-adverbs: kept jamais-fr
- `vocabulary[44]` "la ville": same meaning as "the town / the city" in 2024-01-22-reading2: kept la-ville-fr
- `vocabulary[45]` "personne": same meaning as "nobody/no one" in 2024-03-24-everyday-nouns: kept personne-fr
- `vocabulary[48]` "la vie": same meaning as "life" in 2024-03-24-everyday-nouns: kept la-vie-fr

**2024-04-07-comparisons-slang**

- `vocabulary[7]` "trop": same meaning as "too much / too" in 2024-04-08-comparisons: kept trop-fr

**2024-04-16-would-conditionals**

- `vocabulary[0]` "je voudrais": same meaning as "I would like" in 2024-03-31-survival-phrases: kept je-voudrais-fr
- `vocabulary[3]` "nous voudrions": same meaning as "we would like" in 2024-03-30-reading-4: kept nous-voudrions-fr

**2024-04-04-aimer**

- `vocabulary[1]` "j'aime": same meaning as "I love / I like" in 2024-03-30-reading-4: kept j-aime-fr

**2024-04-11-food-nouns**

- `vocabulary[0]` "l'eau": same meaning as "water" in 2024-03-24-everyday-nouns: kept l-eau-fr
- `vocabulary[8]` "le pain": same meaning as "bread" in 2024-03-24-everyday-nouns: kept le-pain-fr

**2024-04-12-manger**

- `vocabulary[0]` "manger": same meaning as "to eat" in 2024-03-30-reading-4: kept manger-fr
- `vocabulary[1]` "je mange": same meaning as "I eat" in 2024-04-01-time-adverbs: kept je-mange-fr

**2024-04-13-reading-5**

- `vocabulary[5]` "café": new meaning "café": cafe-fr.caf; met before as "coffee" (cafe-fr, 2024-01-01-famous-words)
- `vocabulary[9]` "nous avons mangé": same meaning as "we ate" in 2024-04-12-manger: kept nous-avons-mange-fr
- `vocabulary[10]` "hier": same meaning as "yesterday" in 2024-04-01-time-adverbs: kept hier-fr
- `vocabulary[11]` "aujourd'hui": same meaning as "today" in 2024-02-03-reading3: kept aujourd-hui-fr
- `vocabulary[15]` "boire": same meaning as "to drink" in 2024-04-06-boire: kept boire-fr (fixed by hand)
- `vocabulary[16]` "faire": same meaning as "to do / to make" in 2024-03-25-faire: kept faire-fr (fixed by hand)
- `vocabulary[17]` "aimer": same meaning as "to like / to love" in 2024-04-04-aimer: kept aimer-fr (fixed by hand)
- `vocabulary[18]` "vouloir": same meaning as "to want" in 2024-01-15-vouloir: kept vouloir-fr (fixed by hand)
- `vocabulary[19]` "aller": same meaning as "to go" in 2024-01-27-aller: kept aller-fr (fixed by hand)
- `vocabulary[20]` "venir": same meaning as "to come" in 2024-01-26-venir: kept venir-fr (fixed by hand)
- `vocabulary[21]` "partir": same meaning as "to leave / to depart" in 2024-01-29-partir: kept partir-fr (fixed by hand)
- `vocabulary[22]` "voir": same meaning as "to see" in 2024-01-17-voir: kept voir-fr (fixed by hand)
- `vocabulary[23]` "chercher": same meaning as "to search/look for" in 2024-10-22-search-find: kept chercher-fr (fixed by hand)
- `vocabulary[26]` "parler": same meaning as "to speak / to talk" in 2024-03-29-parler: kept parler-fr (fixed by hand)
- `vocabulary[35]` "mon ami": same meaning as "my friend" in 2024-03-30-reading-4: kept mon-ami-fr
- `vocabulary[37]` "excusez-moi": same meaning as "excuse me" in 2024-03-31-survival-phrases: kept excusez-moi-fr (fixed by hand)
- `vocabulary[38]` "encore": new meaning "more / again": encore-fr.more; met before as "still" (encore-fr, 2024-04-01-time-adverbs)

**2024-04-23-progressive-tenses**

- `vocabulary[8]` "je ne peux pas": same meaning as "I can't" in 2024-03-27-negation-2: kept je-ne-peux-pas-fr

**2024-04-18-commander**

- `vocabulary[11]` "vous commandez?": new meaning "are you ready to order?": vous-commandez-fr.question; met before as "you order (formal/plural)" (vous-commandez-fr, 2024-04-18-commander) (written: vous-commandez-fr.are-you-ready) (fixed by hand)

**2024-04-25-top-200-nouns**

- `vocabulary[6]` "la fin": same meaning as "the end" in 2024-03-30-reading-4: kept la-fin-fr
- `vocabulary[21]` "le problème": same meaning as "problem" in 2024-03-30-reading-4: kept le-probleme-fr

**2024-04-24-reading-6**

- `vocabulary[1]` "prendre": same meaning as "to take" in 2024-04-22-prendre: kept prendre-fr
- `vocabulary[5]` "apprendre": same meaning as "to learn" in 2024-04-22-prendre: kept apprendre-fr
- `vocabulary[6]` "mettre": same meaning as "to put / to set / to wear" in 2024-04-21-mettre: kept mettre-fr
- `vocabulary[8]` "demander": same meaning as "to ask / to ask for" in 2024-04-19-demander: kept demander-fr
- `vocabulary[9]` "manger": same meaning as "to eat" in 2024-03-30-reading-4: kept manger-fr (fixed by hand)
- `vocabulary[11]` "dire": same meaning as "to say / to tell" in 2024-04-20-dire: kept dire-fr
- `vocabulary[14]` "j'ai besoin de": same meaning as "I need" in 2024-04-17-besoin: kept j-ai-besoin-de-fr
- `vocabulary[15]` "tu as besoin de": same meaning as "you need (informal)" in 2024-04-17-besoin: kept tu-as-besoin-de-fr
- `vocabulary[19]` "la famille": same meaning as "family" in 2024-04-25-top-200-nouns: kept la-famille-fr
- `vocabulary[20]` "le père": same meaning as "father" in 2024-04-25-top-200-nouns: kept le-pere-fr
- `vocabulary[21]` "la mère": same meaning as "mother" in 2024-04-25-top-200-nouns: kept la-mere-fr
- `vocabulary[25]` "le moment": same meaning as "moment" in 2024-04-25-top-200-nouns: kept le-moment-fr
- `vocabulary[28]` "le monde": same meaning as "world" in 2024-03-24-everyday-nouns: kept le-monde-fr
- `vocabulary[29]` "la ville": same meaning as "the town / the city" in 2024-01-22-reading2: kept la-ville-fr (fixed by hand)
- `vocabulary[34]` "dans": same meaning as "in / inside" in 2024-01-20-prepositions: kept dans-fr
- `vocabulary[41]` "oui": same meaning as "yes" in 2024-01-01-famous-words: kept oui-fr
- `vocabulary[45]` "trois": same meaning as "three" in 2026-11-24-numbers: kept trois-fr
- `vocabulary[46]` "est-ce que": new meaning "question marker": est-ce-que-fr.question-marker; met before as "question maker" (est-ce-que-fr, 2024-01-18-questions)
- `vocabulary[47]` "quelque chose": same meaning as "something" in 2024-03-24-everyday-nouns: kept quelque-chose-fr
- `vocabulary[51]` "toujours": same meaning as "always" in 2024-04-01-time-adverbs: kept toujours-fr (fixed by hand)
- `vocabulary[52]` "c'est vrai": same meaning as "that's true" in 2024-04-20-dire: kept c-est-vrai-fr
- `vocabulary[53]` "voir": same meaning as "to see" in 2024-01-17-voir: kept voir-fr (fixed by hand)
- `vocabulary[57]` "faire": same meaning as "to do / to make" in 2024-03-25-faire: kept faire-fr (fixed by hand)
- `vocabulary[59]` "beaucoup": same meaning as "a lot / very much" in 2024-03-31-survival-phrases: kept beaucoup-fr
- `vocabulary[64]` "déjà": same meaning as "already" in 2024-04-01-time-adverbs: kept deja-fr
- `vocabulary[65]` "tu parles": same meaning as "you speak (informal)" in 2024-03-29-parler: kept tu-parles-fr (fixed by hand)
- `vocabulary[67]` "merci": same meaning as "thank you" in 2024-01-01-famous-words: kept merci-fr (fixed by hand)
- `vocabulary[69]` "maintenant": same meaning as "now" in 2024-04-01-time-adverbs: kept maintenant-fr (fixed by hand)
- `vocabulary[70]` "avoir": same meaning as "to have" in 2024-01-04-avoir: kept avoir-fr (fixed by hand)
- `vocabulary[74]` "pour": same meaning as "for" in 2024-01-20-prepositions: kept pour-fr (fixed by hand)

**2024-05-05-on-and-people**

- `vocabulary[0]` "on": same meaning as "we (informal) / one / people" in 2024-01-01-pronouns: kept on-fr
- `vocabulary[7]` "on dit": same meaning as "people say" in 2024-04-13-reading-5: kept on-dit-fr
- `vocabulary[10]` "les gens": same meaning as "people" in 2024-04-13-reading-5: kept les-gens-fr
- `vocabulary[13]` "tout le monde": same meaning as "everybody/everyone" in 2024-03-24-everyday-nouns: kept tout-le-monde-fr
- `vocabulary[17]` "personne": same meaning as "nobody/no one" in 2024-03-24-everyday-nouns: kept personne-fr

**2024-05-04-learning-verbs**

- `vocabulary[0]` "apprendre": same meaning as "to learn" in 2024-04-22-prendre: kept apprendre-fr
- `vocabulary[1]` "j'apprends": same meaning as "I learn" in 2024-04-22-prendre: kept j-apprends-fr
- `vocabulary[4]` "nous apprenons": same meaning as "we learn" in 2024-04-22-prendre: kept nous-apprenons-fr
- `vocabulary[14]` "j'apprends le français": same meaning as "I learn French / I'm learning French" in 2024-04-22-prendre: kept j-apprends-le-francais-fr

**2024-04-29-comprendre**

- `vocabulary[0]` "comprendre": same meaning as "to understand" in 2024-04-22-prendre: kept comprendre-fr
- `vocabulary[1]` "je comprends": same meaning as "I understand" in 2024-04-22-prendre: kept je-comprends-fr
- `vocabulary[2]` "tu comprends": new meaning "you understand (informal)": tu-comprends-fr.you-understand; met before as "do you understand?" (tu-comprends-fr, 2024-04-22-prendre) (written: tu-comprends-fr) (fixed by hand)
- `vocabulary[4]` "nous comprenons": same meaning as "we understand" in 2024-04-22-prendre: kept nous-comprenons-fr
- `vocabulary[7]` "Je ne comprends pas": same meaning as "I don't understand" in 2024-04-22-prendre: kept je-ne-comprends-pas-fr
- `vocabulary[8]` "Tu comprends?": same meaning as "do you understand?" in 2024-04-22-prendre: kept tu-comprends-fr (written: tu-comprends-fr.question)

**2024-05-08-savoir**

- `vocabulary[8]` "Tu sais?": new meaning "Do you know? / You know?": tu-sais-fr.question; met before as "you know (informal)" (tu-sais-fr, 2024-05-08-savoir)

**2024-04-30-connaitre**

- `vocabulary[9]` "Tu connais?": new meaning "Do you know (it/him/her)?": tu-connais-fr.question; met before as "you know (informal)" (tu-connais-fr, 2024-04-30-connaitre)

**2024-05-01-croire**

- `vocabulary[9]` "Tu crois?": new meaning "Do you think so? / Do you believe it?": tu-crois-fr.question; met before as "you believe (informal)" (tu-crois-fr, 2024-05-01-croire)

**2024-05-03-knowledge-nouns**

- `vocabulary[10]` "la question": same meaning as "question" in 2024-04-25-top-200-nouns: kept la-question-fr

**2024-05-02-discourse-markers**

- `vocabulary[4]` "bon": new meaning "well / so (discourse use)": bon-fr.discourse; met before as "good" (bon-fr, 2024-01-01-famous-words)
- `vocabulary[5]` "alors": same meaning as "so / then" in 2024-03-30-reading-4: kept alors-fr
- `vocabulary[8]` "peut-être": same meaning as "maybe" in 2024-04-13-reading-5: kept peut-etre-fr
- `vocabulary[13]` "bien sûr": same meaning as "of course" in 2024-04-24-reading-6: kept bien-sur-fr

**2024-04-28-comparison-modifiers**

- `vocabulary[1]` "toute": same meaning as "all/whole" in 2024-04-24-reading-6: kept toute-fr
- `vocabulary[4]` "tout le monde": same meaning as "everybody/everyone" in 2024-03-24-everyday-nouns: kept tout-le-monde-fr
- `vocabulary[7]` "même": same meaning as "same / even" in 2024-04-08-comparisons: kept meme-fr
- `vocabulary[10]` "mal": same meaning as "badly / bad" in 2024-04-08-comparisons: kept mal-fr

**2024-05-07-reading-7**

- `vocabulary[0]` "apprendre": same meaning as "to learn" in 2024-04-22-prendre: kept apprendre-fr (fixed by hand)
- `vocabulary[2]` "étudier": same meaning as "to study" in 2024-05-09-studying-verbs: kept etudier-fr (fixed by hand)
- `vocabulary[5]` "comprendre": same meaning as "to understand" in 2024-04-22-prendre: kept comprendre-fr (fixed by hand)
- `vocabulary[6]` "comprends": same meaning as "understand (you/I)" in 2024-04-24-reading-6: kept comprends-fr
- `vocabulary[9]` "savoir": same meaning as "to know (facts/skills)" in 2024-05-08-savoir: kept savoir-fr (fixed by hand)
- `vocabulary[12]` "connaître": same meaning as "to know / to be familiar with" in 2024-04-30-connaitre: kept connaitre-fr (fixed by hand)
- `vocabulary[14]` "penser": same meaning as "to think" in 2024-05-06-penser: kept penser-fr (fixed by hand)
- `vocabulary[18]` "croire": same meaning as "to believe / to think" in 2024-05-01-croire: kept croire-fr (fixed by hand)
- `vocabulary[20]` "réviser": same meaning as "to review / to revise" in 2024-05-09-studying-verbs: kept reviser-fr (fixed by hand)
- `vocabulary[23]` "chercher": same meaning as "to search/look for" in 2024-10-22-search-find: kept chercher-fr (fixed by hand)
- `vocabulary[25]` "trouver": same meaning as "to find" in 2024-10-22-search-find: kept trouver-fr (fixed by hand)
- `vocabulary[37]` "donc": same meaning as "so / therefore" in 2024-05-02-discourse-markers: kept donc-fr
- `vocabulary[38]` "en fait": same meaning as "in fact / actually" in 2024-05-02-discourse-markers: kept en-fait-fr
- `vocabulary[39]` "bon": new meaning "well": bon-fr.well; met before as "good" (bon-fr, 2024-01-01-famous-words); "well / so (discourse use)" (bon-fr.discourse, 2024-05-02-discourse-markers)
- `vocabulary[40]` "alors": same meaning as "so / then" in 2024-03-30-reading-4: kept alors-fr
- `vocabulary[41]` "quoi": same meaning as "like / you know (filler at end)" in 2024-05-02-discourse-markers: kept quoi-fr
- `vocabulary[42]` "tout le monde": same meaning as "everybody/everyone" in 2024-03-24-everyday-nouns: kept tout-le-monde-fr
- `vocabulary[43]` "même": same meaning as "same / even" in 2024-04-08-comparisons: kept meme-fr (fixed by hand)
- `vocabulary[44]` "mal": same meaning as "badly / bad" in 2024-04-08-comparisons: kept mal-fr
- `vocabulary[49]` "comment": same meaning as "how" in 2024-01-18-questions: kept comment-fr
- `vocabulary[55]` "demander": same meaning as "to ask / to ask for" in 2024-04-19-demander: kept demander-fr (fixed by hand)
- `vocabulary[60]` "bons": same meaning as "good (plural)" in 2024-01-09-reading1: kept bons-fr
- `vocabulary[62]` "meilleures": same meaning as "better (plural)" in 2024-04-13-reading-5: kept meilleures-fr
- `vocabulary[64]` "maintenant": same meaning as "now" in 2024-04-01-time-adverbs: kept maintenant-fr
- `vocabulary[65]` "beaucoup": same meaning as "a lot / very much" in 2024-03-31-survival-phrases: kept beaucoup-fr
- `vocabulary[75]` "déjà": same meaning as "already" in 2024-04-01-time-adverbs: kept deja-fr

**2024-05-23-temporal-words**

- `vocabulary[0]` "pendant": same meaning as "during / for" in 2024-05-07-reading-7: kept pendant-fr
- `vocabulary[2]` "après": same meaning as "after" in 2024-05-07-reading-7: kept apres-fr
- `vocabulary[4]` "d'abord": same meaning as "first" in 2024-05-07-reading-7: kept d-abord-fr
- `vocabulary[5]` "ensuite": same meaning as "next / then" in 2024-05-07-reading-7: kept ensuite-fr
- `vocabulary[7]` "finalement": same meaning as "finally" in 2024-05-07-reading-7: kept finalement-fr

**2024-05-21-reflexive-pronouns**

- `vocabulary[0]` "me": new meaning "myself": me-fr.reflexive; met before as "me" (me-fr, 2024-01-30-object-pronouns)
- `vocabulary[1]` "te": new meaning "yourself (informal)": te-fr.reflexive; met before as "you (informal)" (te-fr, 2024-01-30-object-pronouns)
- `vocabulary[3]` "nous": new meaning "ourselves": nous-fr.reflexive; met before as "we" (nous-fr, 2024-01-01-pronouns); "us (stressed)" (nous-fr.stressed, 2024-01-19-stressed-pronouns); "us" (nous-fr.object-pronoun, 2024-01-30-object-pronouns)
- `vocabulary[4]` "vous": new meaning "yourselves / yourself (formal)": vous-fr.reflexive; met before as "you (formal/plural)" (vous-fr, 2024-01-01-pronouns); "you (stressed, formal/plural)" (vous-fr.stressed, 2024-01-19-stressed-pronouns); "you (formal/plural)" (vous-fr.object-pronoun, 2024-01-30-object-pronouns)

**2024-05-19-morning-routine**

- `vocabulary[9]` "tu te lèves": same meaning as "you get (yourself) up" in 2024-05-21-reflexive-pronouns: kept tu-te-leves-fr

**2024-05-17-getting-ready**

- `vocabulary[1]` "je me lave": new meaning "I wash myself": je-me-lave-fr.i-wash-myself; met before as "I wash myself" (je-me-lave-fr, 2024-05-21-reflexive-pronouns) (written: je-me-lave-fr) (fixed by hand)

**2024-06-06-reciprocal-reflexives**

- `vocabulary[0]` "nous nous aimons": same meaning as "we love ourselves / we love each other" in 2024-05-21-reflexive-pronouns: kept nous-nous-aimons-fr

**2024-05-13-commands-tu**

- `vocabulary[4]` "Pense!": same meaning as "think(s)" in 2024-05-07-reading-7: kept pense-fr
- `vocabulary[5]` "Viens!": same meaning as "come" in 2024-03-30-reading-4: kept viens-fr

**2024-05-18-irregular-commands**

- `vocabulary[9]` "Allons-y!": same meaning as "Let's go!" in 2024-05-03-knowledge-nouns: kept allons-y-fr
- `vocabulary[10]` "Fais!": same meaning as "do/make (you)" in 2024-04-24-reading-6: kept fais-fr (fixed by hand)
- `vocabulary[11]` "Faites!": same meaning as "do/make" in 2024-05-07-reading-7: kept faites-fr (fixed by hand)

**2024-05-20-reading-8**

- `vocabulary[0]` "d'abord": same meaning as "first" in 2024-05-07-reading-7: kept d-abord-fr
- `vocabulary[1]` "ensuite": same meaning as "next / then" in 2024-05-07-reading-7: kept ensuite-fr
- `vocabulary[2]` "puis": same meaning as "then" in 2024-05-23-temporal-words: kept puis-fr
- `vocabulary[3]` "après": same meaning as "after" in 2024-05-07-reading-7: kept apres-fr
- `vocabulary[4]` "finalement": same meaning as "finally" in 2024-05-07-reading-7: kept finalement-fr
- `vocabulary[5]` "avant": same meaning as "before" in 2024-05-23-temporal-words: kept avant-fr
- `vocabulary[6]` "pendant": same meaning as "during / for" in 2024-05-07-reading-7: kept pendant-fr
- `vocabulary[7]` "je m'appelle": same meaning as "my name is / I'm called" in 2024-05-22-s-appeler: kept je-m-appelle-fr
- `vocabulary[8]` "je me réveille": same meaning as "I wake up" in 2024-05-19-morning-routine: kept je-me-reveille-fr
- `vocabulary[9]` "je me lève": same meaning as "I get up" in 2024-05-19-morning-routine: kept je-me-leve-fr
- `vocabulary[10]` "je me lave": same meaning as "I wash myself" in 2024-05-17-getting-ready: kept je-me-lave-fr
- `vocabulary[11]` "je m'habille": same meaning as "I get dressed" in 2024-05-17-getting-ready: kept je-m-habille-fr
- `vocabulary[12]` "je me prépare": same meaning as "I get ready" in 2024-05-17-getting-ready: kept je-me-prepare-fr
- `vocabulary[13]` "je me dépêche": new meaning "I hurry": je-me-depeche-fr.i-hurry; met before as "I'm hurrying" (je-me-depeche-fr, 2024-05-16-daily-reflexives)
- `vocabulary[14]` "je me souviens": same meaning as "I remember" in 2024-05-16-daily-reflexives: kept je-me-souviens-fr
- `vocabulary[15]` "on s'amuse": new meaning "we have fun": on-s-amuse-fr.we-have-fun; met before as "we're having fun" (on-s-amuse-fr, 2024-05-16-daily-reflexives)
- `vocabulary[19]` "on se voit": same meaning as "we see each other" in 2024-06-06-reciprocal-reflexives: kept on-se-voit-fr
- `vocabulary[22]` "Pense!": same meaning as "think(s)" in 2024-05-07-reading-7: kept pense-fr
- `vocabulary[23]` "Parle!": same meaning as "Speak!" in 2024-05-13-commands-tu: kept parle-fr
- `vocabulary[28]` "quelques": same meaning as "some/a few" in 2024-04-24-reading-6: kept quelques-fr
- `vocabulary[31]` "café": same meaning as "coffee" in 2024-01-01-famous-words: kept cafe-fr
- `vocabulary[39]` "contente": same meaning as "happy" in 2024-04-24-reading-6: kept contente-fr
- `vocabulary[40]` "encore": same meaning as "more / again" in 2024-04-13-reading-5: kept encore-fr.more
- `vocabulary[42]` "voilà": new meaning "there is / that's": voila-fr.there-is; met before as "there it is / here you go" (voila-fr, 2024-01-01-famous-words); "there you go" (voila-fr.there-you-go, 2024-03-30-reading-4)
- `vocabulary[43]` "votre": same meaning as "your (singular, formal)" in 2024-01-31-possessive-adjectives: kept votre-fr

**2024-05-26-causal-words**

- `vocabulary[0]` "parce que": same meaning as "because" in 2024-05-20-reading-8: kept parce-que-fr
- `vocabulary[6]` "pourquoi": same meaning as "why" in 2024-01-18-questions: kept pourquoi-fr
- `vocabulary[7]` "la raison": same meaning as "reason" in 2024-04-25-top-200-nouns: kept la-raison-fr

**2024-06-08-spatial-prepositions**

- `vocabulary[0]` "devant": same meaning as "in front of / before" in 2024-01-20-prepositions: kept devant-fr
- `vocabulary[1]` "derrière": same meaning as "behind" in 2024-01-20-prepositions: kept derriere-fr
- `vocabulary[2]` "entre": same meaning as "between" in 2024-01-20-prepositions: kept entre-fr
- `vocabulary[6]` "dans": same meaning as "in / inside" in 2024-01-20-prepositions: kept dans-fr
- `vocabulary[7]` "sur": same meaning as "on / on top of" in 2024-01-20-prepositions: kept sur-fr
- `vocabulary[8]` "sous": same meaning as "under / beneath" in 2024-01-20-prepositions: kept sous-fr
- `vocabulary[11]` "la place": same meaning as "square/place" in 2024-03-24-everyday-nouns: kept la-place-fr

**2024-05-28-more-spatial-relations**

- `vocabulary[11]` "ici": same meaning as "here" in 2024-04-01-time-adverbs: kept ici-fr

**2024-05-30-passe-compose-er**

- `vocabulary[1]` "j'ai mangé": same meaning as "I ate / I have eaten" in 2024-04-12-manger: kept j-ai-mange-fr
- `vocabulary[5]` "j'ai trouvé": same meaning as "I found / I have found" in 2024-10-22-search-find: kept j-ai-trouve-fr
- `vocabulary[10]` "hier": same meaning as "yesterday" in 2024-04-01-time-adverbs: kept hier-fr
- `vocabulary[11]` "déjà": same meaning as "already" in 2024-04-01-time-adverbs: kept deja-fr

**2024-06-02-passe-compose-irregular-2**

- `vocabulary[4]` "j'ai pris": same meaning as "I took" in 2024-04-22-prendre: kept j-ai-pris-fr
- `vocabulary[5]` "j'ai mis": same meaning as "I put / I put on" in 2024-04-21-mettre: kept j-ai-mis-fr
- `vocabulary[7]` "j'ai appris": same meaning as "I learned" in 2024-04-22-prendre: kept j-ai-appris-fr

**2024-05-27-imparfait-all-verbs**

- `vocabulary[6]` "nous étions": same meaning as "we were" in 2024-04-10-etre-past: kept nous-etions-fr

**2024-06-04-pc-vs-imparfait**

- `vocabulary[0]` "quand": same meaning as "when" in 2024-01-18-questions: kept quand-fr
- `vocabulary[3]` "tous les jours": same meaning as "every day" in 2024-05-27-imparfait-all-verbs: kept tous-les-jours-fr
- `vocabulary[5]` "toujours": same meaning as "always" in 2024-04-01-time-adverbs: kept toujours-fr (fixed by hand)
- `vocabulary[6]` "hier": same meaning as "yesterday" in 2024-04-01-time-adverbs: kept hier-fr

**2024-06-03-past-tense-composition**

- `vocabulary[0]` "donc": same meaning as "so / therefore" in 2024-05-02-discourse-markers: kept donc-fr
- `vocabulary[1]` "alors": same meaning as "so / then" in 2024-03-30-reading-4: kept alors-fr
- `vocabulary[2]` "c'était": same meaning as "it was" in 2024-04-13-reading-5: kept c-etait-fr
- `vocabulary[3]` "il y avait": same meaning as "there was / there were" in 2024-05-27-imparfait-all-verbs: kept il-y-avait-fr

**2024-06-05-reading-9**

- `vocabulary[1]` "Jardin du Luxembourg": same meaning as "Luxembourg Garden (famous Paris park)" in 2024-03-30-reading-4: kept jardin-du-luxembourg-fr
- `vocabulary[4]` "la Sorbonne": same meaning as "the Sorbonne" in 2024-05-20-reading-8: kept la-sorbonne-fr
- `vocabulary[9]` "hier": same meaning as "yesterday" in 2024-04-01-time-adverbs: kept hier-fr
- `vocabulary[10]` "c'était": same meaning as "it was" in 2024-04-13-reading-5: kept c-etait-fr
- `vocabulary[12]` "il faisait": same meaning as "it was (weather) / he was doing" in 2024-05-27-imparfait-all-verbs: kept il-faisait-fr
- `vocabulary[14]` "parce que": same meaning as "because" in 2024-05-20-reading-8: kept parce-que-fr
- `vocabulary[16]` "le travail": same meaning as "work" in 2024-03-24-everyday-nouns: kept le-travail-fr
- `vocabulary[17]` "d'abord": same meaning as "first" in 2024-05-07-reading-7: kept d-abord-fr
- `vocabulary[18]` "je me suis réveillé": same meaning as "I woke up (masc)" in 2024-06-07-reflexive-past: kept je-me-suis-reveille-fr
- `vocabulary[19]` "d'habitude": same meaning as "usually, normally" in 2024-06-04-pc-vs-imparfait: kept d-habitude-fr
- `vocabulary[21]` "plus tard": same meaning as "later" in 2024-04-13-reading-5: kept plus-tard-fr
- `vocabulary[23]` "j'ai voulu": same meaning as "I wanted" in 2024-06-02-passe-compose-irregular-2: kept j-ai-voulu-fr
- `vocabulary[25]` "le temps": same meaning as "time/weather" in 2024-03-24-everyday-nouns: kept le-temps-fr
- `vocabulary[30]` "près de": same meaning as "near, close to" in 2024-05-28-more-spatial-relations: kept pres-de-fr
- `vocabulary[32]` "il y avait": same meaning as "there was / there were" in 2024-05-27-imparfait-all-verbs: kept il-y-avait-fr
- `vocabulary[37]` "quand": same meaning as "when" in 2024-01-18-questions: kept quand-fr
- `vocabulary[39]` "j'ai vu": same meaning as "I saw" in 2024-06-01-passe-compose-irregular-1: kept j-ai-vu-fr
- `vocabulary[41]` "Pierre": same meaning as "Pierre (friend's name)" in 2024-06-05-reading-9: kept pierre-fr (written: pierre-fr.pierre)
- `vocabulary[50]` "salut": same meaning as "hi / bye" in 2024-01-01-famous-words: kept salut-fr
- `vocabulary[52]` "ici": same meaning as "here" in 2024-04-01-time-adverbs: kept ici-fr
- `vocabulary[53]` "j'ai demandé": same meaning as "I asked" in 2024-05-30-passe-compose-er: kept j-ai-demande-fr
- `vocabulary[68]` "car": same meaning as "for, because" in 2024-05-26-causal-words: kept car-fr
- `vocabulary[69]` "j'ai eu": same meaning as "I had" in 2024-06-01-passe-compose-irregular-1: kept j-ai-eu-fr
- `vocabulary[71]` "le problème": same meaning as "problem" in 2024-03-30-reading-4: kept le-probleme-fr
- `vocabulary[73]` "ensuite": same meaning as "next / then" in 2024-05-07-reading-7: kept ensuite-fr
- `vocabulary[74]` "comme": same meaning as "as, since" in 2024-05-26-causal-words: kept comme-fr
- `vocabulary[80]` "en face de": same meaning as "across from, opposite" in 2024-05-28-more-spatial-relations: kept en-face-de-fr
- `vocabulary[84]` "à côté de": same meaning as "next to, beside" in 2024-05-28-more-spatial-relations: kept a-cote-de-fr
- `vocabulary[87]` "autour de": same meaning as "around" in 2024-05-28-more-spatial-relations: kept autour-de-fr
- `vocabulary[88]` "partout": same meaning as "everywhere" in 2024-03-26-location-adverbs: kept partout-fr
- `vocabulary[91]` "pendant que": same meaning as "while" in 2024-06-04-pc-vs-imparfait: kept pendant-que-fr
- `vocabulary[94]` "Marie": same meaning as "Marie (friend's name)" in 2024-06-05-reading-9: kept marie-fr (written: marie-fr.marie)
- `vocabulary[111]` "grâce à": same meaning as "thanks to" in 2024-05-26-causal-words: kept grace-a-fr
- `vocabulary[117]` "ensemble": same meaning as "together" in 2024-03-29-parler: kept ensemble-fr
- `vocabulary[118]` "nous sommes allés": same meaning as "we went" in 2024-05-29-passe-compose-agreement: kept nous-sommes-alles-fr
- `vocabulary[126]` "la gare": new meaning "the station": la-gare-fr.the-station; met before as "the train station" (la-gare-fr, 2024-05-28-more-spatial-relations) (written: la-gare-fr)
- `vocabulary[137]` "derrière": same meaning as "behind" in 2024-01-20-prepositions: kept derriere-fr
- `vocabulary[138]` "nous avons mangé": same meaning as "we ate" in 2024-04-12-manger: kept nous-avons-mange-fr
- `vocabulary[146]` "la vie": same meaning as "life" in 2024-03-24-everyday-nouns: kept la-vie-fr
- `vocabulary[149]` "à cause de": same meaning as "because of" in 2024-05-26-causal-words: kept a-cause-de-fr
- `vocabulary[160]` "finalement": same meaning as "finally" in 2024-05-07-reading-7: kept finalement-fr
- `vocabulary[162]` "chez moi": same meaning as "to my place / home" in 2024-05-20-reading-8: kept chez-moi-fr
- `vocabulary[167]` "heureux": same meaning as "happy" in 2024-01-02-etre: kept heureux-fr
- `vocabulary[170]` "parfois": same meaning as "sometimes" in 2024-04-01-time-adverbs: kept parfois-fr

**2024-01-25-emotion-phrases**

- `vocabulary[0]` "je suis content que tu sois là": new meaning "I'm happy you're here": je-suis-content-que-tu-sois-la-fr.i-m-happy; met before as "I'm glad you're here" (je-suis-content-que-tu-sois-la-fr, 2024-06-05-reading-9) (written: je-suis-content-que-tu-sois-la-fr) (fixed by hand)

**2024-01-22-common-adverbs**

- `vocabulary[0]` "vraiment": same meaning as "really / truly" in 2024-05-07-reading-7: kept vraiment-fr
- `vocabulary[6]` "probablement": same meaning as "probably" in 2024-05-02-discourse-markers: kept probablement-fr

**2024-02-01-reading-10**

- `vocabulary[0]` "Paris": same meaning as "Paris (capital of France)" in 2024-06-05-reading-9: kept paris-fr
- `vocabulary[7]` "la Tour Eiffel": same meaning as "Eiffel Tower" in 2024-04-24-reading-6: kept la-tour-eiffel-fr
- `vocabulary[16]` "il faut que": same meaning as "it's necessary that / someone needs to" in 2024-01-23-common-special-forms-1: kept il-faut-que-fr
- `vocabulary[23]` "sois": same meaning as "Be! (informal)" in 2024-05-18-irregular-commands: kept sois-fr
- `vocabulary[42]` "depuis": same meaning as "since / for" in 2024-05-23-temporal-words: kept depuis-fr
- `vocabulary[43]` "toujours": same meaning as "always" in 2024-04-01-time-adverbs: kept toujours-fr
- `vocabulary[54]` "en train de": same meaning as "in the process of" in 2024-05-07-reading-7: kept en-train-de-fr
- `vocabulary[56]` "artiste": same meaning as "artist" in 2024-04-13-reading-5: kept artiste-fr
- `vocabulary[61]` "essaies": same meaning as "try (subjunctive, tu)" in 2024-02-01-reading-10: kept essaies-fr (written: essaies-fr.try)
- `vocabulary[63]` "professeur": same meaning as "teacher / professor" in 2024-05-20-reading-8: kept professeur-fr
- `vocabulary[70]` "encore": same meaning as "still" in 2024-04-01-time-adverbs: kept encore-fr
- `vocabulary[76]` "réussisse": same meaning as "succeeds/succeed (subjunctive)" in 2024-02-01-reading-10: kept reussisse-fr (written: reussisse-fr.succeeds)
- `vocabulary[80]` "magnifique": same meaning as "magnificent" in 2024-05-07-reading-7: kept magnifique-fr
- `vocabulary[84]` "toute la nuit": same meaning as "all night" in 2024-04-13-reading-5: kept toute-la-nuit-fr
- `vocabulary[90]` "continuer": same meaning as "to continue" in 2024-04-13-reading-5: kept continuer-fr
- `vocabulary[97]` "demain": same meaning as "tomorrow" in 2024-04-01-time-adverbs: kept demain-fr
- `vocabulary[98]` "appeler": same meaning as "to call" in 2024-04-13-reading-5: kept appeler-fr
- `vocabulary[100]` "demande": same meaning as "ask(s)" in 2024-05-07-reading-7: kept demande-fr
- `vocabulary[105]` "grâce à": same meaning as "thanks to" in 2024-05-26-causal-words: kept grace-a-fr
- `vocabulary[111]` "savoir": same meaning as "to know (facts/skills)" in 2024-05-08-savoir: kept savoir-fr

**2024-02-10-donner**

- `vocabulary[0]` "donner": same meaning as "to give" in 2024-10-22-donner: kept donner-fr
- `vocabulary[1]` "je donne": same meaning as "I give" in 2024-10-22-donner: kept je-donne-fr
- `vocabulary[2]` "tu donnes": same meaning as "you give (informal)" in 2024-10-22-donner: kept tu-donnes-fr
- `vocabulary[5]` "nous donnons": same meaning as "we give" in 2024-10-22-donner: kept nous-donnons-fr
- `vocabulary[6]` "vous donnez": same meaning as "you give (formal/plural)" in 2024-10-22-donner: kept vous-donnez-fr

**2024-05-15-daily-actions-1**

- `vocabulary[0]` "dormir": same meaning as "to sleep" in 2024-06-05-reading-9: kept dormir-fr
- `vocabulary[9]` "travailler": same meaning as "to work" in 2024-03-24-everyday-nouns: kept travailler-fr

**2024-02-13-search-and-find**

- `vocabulary[0]` "chercher": same meaning as "to search/look for" in 2024-10-22-search-find: kept chercher-fr
- `vocabulary[1]` "je cherche": same meaning as "I search/look for" in 2024-10-22-search-find: kept je-cherche-fr
- `vocabulary[2]` "tu cherches": same meaning as "you search/look for" in 2024-10-22-search-find: kept tu-cherches-fr
- `vocabulary[5]` "nous cherchons": same meaning as "we search/look for" in 2024-10-22-search-find: kept nous-cherchons-fr
- `vocabulary[6]` "vous cherchez": same meaning as "you search/look for" in 2024-10-22-search-find: kept vous-cherchez-fr
- `vocabulary[9]` "trouver": same meaning as "to find" in 2024-10-22-search-find: kept trouver-fr
- `vocabulary[10]` "je trouve": same meaning as "I find" in 2024-10-22-search-find: kept je-trouve-fr
- `vocabulary[11]` "tu trouves": same meaning as "you find" in 2024-10-22-search-find: kept tu-trouves-fr
- `vocabulary[14]` "nous trouvons": same meaning as "we find" in 2024-10-22-search-find: kept nous-trouvons-fr
- `vocabulary[15]` "vous trouvez": same meaning as "you find" in 2024-10-22-search-find: kept vous-trouvez-fr
- `vocabulary[21]` "j'ai trouvé!": same meaning as "I found / I have found" in 2024-10-22-search-find: kept j-ai-trouve-fr

**2024-02-11-perception-verbs**

- `vocabulary[12]` "il regarde": new meaning "he watches": il-regarde-fr.he-watches; met before as "he looks / he looks at" (il-regarde-fr, 2024-04-13-reading-5) (written: il-regarde-fr)
- `vocabulary[25]` "je trouve que": same meaning as "I think that / I find that" in 2024-02-13-search-and-find: kept je-trouve-que-fr

**2024-02-09-directions-navigation**

- `vocabulary[11]` "allez": same meaning as "Go! (formal/plural)" in 2024-05-18-irregular-commands: kept allez-fr
- `vocabulary[12]` "va": same meaning as "Go! (informal)" in 2024-05-18-irregular-commands: kept va-fr
- `vocabulary[15]` "près de": same meaning as "near, close to" in 2024-05-28-more-spatial-relations: kept pres-de-fr
- `vocabulary[16]` "loin de": same meaning as "far from" in 2024-05-28-more-spatial-relations: kept loin-de-fr
- `vocabulary[17]` "à côté de": same meaning as "next to, beside" in 2024-05-28-more-spatial-relations: kept a-cote-de-fr
- `vocabulary[18]` "en face de": same meaning as "across from, opposite" in 2024-05-28-more-spatial-relations: kept en-face-de-fr
- `vocabulary[30]` "vous voyez": same meaning as "you see (formal)" in 2024-01-17-voir: kept vous-voyez-fr

**2024-02-12-reading-11**

- `vocabulary[1]` "rapidement": new meaning "rapidly": rapidement-fr.rapidly; met before as "quickly" (rapidement-fr, 2024-01-22-common-adverbs)
- `vocabulary[47]` "facilement": same meaning as "easily" in 2024-01-22-common-adverbs: kept facilement-fr
- `vocabulary[96]` "questions": same meaning as "questions" in 2024-05-07-reading-7: kept questions-fr
- `vocabulary[120]` "Paris": same meaning as "Paris (capital of France)" in 2024-06-05-reading-9: kept paris-fr
- `vocabulary[122]` "Notre-Dame": same meaning as "Notre-Dame Cathedral (iconic medieval cathedral)" in 2024-02-01-reading-10: kept notre-dame-fr
- `vocabulary[127]` "Montmartre": same meaning as "Montmartre (historic artist district in Paris)" in 2024-02-01-reading-10: kept montmartre-fr
- `vocabulary[129]` "Lyon": same meaning as "Lyon (second largest city in France)" in 2024-06-05-reading-9: kept lyon-fr
- `vocabulary[131]` "Bordeaux": same meaning as "Bordeaux (famous wine city in southwest France)" in 2024-02-01-reading-10: kept bordeaux-fr
- `vocabulary[132]` "Nice": same meaning as "Nice (beautiful city on French Riviera)" in 2024-02-01-reading-10: kept nice-fr
- `vocabulary[137]` "Vincent van Gogh": same meaning as "Vincent van Gogh" in 2024-04-13-reading-5: kept vincent-van-gogh-fr

**2024-03-15-nature-animals**

- `vocabulary[8]` "un chat": same meaning as "a cat (male)" in 2024-01-06-basic-nouns: kept un-chat-fr
- `vocabulary[19]` "petit / petite": same meaning as "small" in 2024-01-21-adjectives: kept petit-petite-fr

**2024-03-16-movement-verbs**

- `vocabulary[30]` "marcher": same meaning as "to walk" in 2024-04-24-reading-6: kept marcher-fr

**2024-03-17-natural-phenomena**

- `vocabulary[31]` "je suis tombé(e)": same meaning as "I fell" in 2024-05-31-passe-compose-etre: kept je-suis-tombe-e-fr

**2024-03-15-questce-qui-que**

- `vocabulary[1]` "qu'est-ce que": new meaning "what (object)": qu-est-ce-que-fr.object-pronoun; met before as "what" (qu-est-ce-que-fr, 2024-04-24-reading-6) (written: qu-est-ce-que-fr) (fixed by hand)

**2024-03-22-inversion-questions**

- `vocabulary[6]` "Comment nage une tortue?": same meaning as "How does a turtle swim?" in 2024-03-20-comment-complex: kept comment-nage-une-tortue-fr

**2024-03-23-embedded-questions**

- `vocabulary[1]` "je ne sais pas": same meaning as "I don't know" in 2024-05-08-savoir: kept je-ne-sais-pas-fr

**2024-04-01-alphabet**

- `vocabulary[0]` "a": a-fr already names "à", a different spelling: a-fr.a
- `vocabulary[11]` "l": l-fr already names "l'", a different spelling: l-fr.l

**2024-04-02-numbers**

- `vocabulary[0]` "zéro": same meaning as "zero" in 2026-11-24-numbers: kept zero-fr
- `vocabulary[1]` "un": same meaning as "one" in 2026-11-24-numbers: kept un-fr.one
- `vocabulary[2]` "deux": same meaning as "two" in 2026-11-24-numbers: kept deux-fr
- `vocabulary[3]` "trois": same meaning as "three" in 2026-11-24-numbers: kept trois-fr
- `vocabulary[4]` "quatre": same meaning as "four" in 2026-11-24-numbers: kept quatre-fr
- `vocabulary[5]` "cinq": same meaning as "five" in 2026-11-24-numbers: kept cinq-fr
- `vocabulary[6]` "six": same meaning as "six" in 2026-11-24-numbers: kept six-fr
- `vocabulary[7]` "sept": same meaning as "seven" in 2026-11-24-numbers: kept sept-fr
- `vocabulary[8]` "huit": same meaning as "eight" in 2026-11-24-numbers: kept huit-fr
- `vocabulary[9]` "neuf": same meaning as "nine" in 2026-11-24-numbers: kept neuf-fr
- `vocabulary[10]` "dix": same meaning as "ten" in 2026-11-24-numbers: kept dix-fr
- `vocabulary[11]` "vingt": same meaning as "twenty" in 2026-11-24-numbers: kept vingt-fr
- `vocabulary[12]` "vingt-et-un": vingt-et-un-fr already names "vingt et un", a different spelling: vingt-et-un-fr.twenty-one
- `vocabulary[13]` "vingt-deux": same meaning as "twenty-two" in 2026-11-24-numbers: kept vingt-deux-fr
- `vocabulary[14]` "trente": same meaning as "thirty" in 2026-11-24-numbers: kept trente-fr
- `vocabulary[17]` "quarante": same meaning as "forty" in 2026-11-24-numbers: kept quarante-fr
- `vocabulary[19]` "cinquante": same meaning as "fifty" in 2026-11-24-numbers: kept cinquante-fr
- `vocabulary[21]` "soixante": same meaning as "sixty" in 2026-11-24-numbers: kept soixante-fr
- `vocabulary[24]` "soixante-dix": same meaning as "seventy" in 2026-11-24-numbers: kept soixante-dix-fr
- `vocabulary[25]` "soixante-et-onze": soixante-et-onze-fr already names "soixante et onze", a different spelling: soixante-et-onze-fr.seventy-one
- `vocabulary[28]` "quatre-vingts": same meaning as "eighty" in 2026-11-24-numbers: kept quatre-vingts-fr
- `vocabulary[29]` "quatre-vingt-un": same meaning as "eighty-one" in 2026-11-24-numbers: kept quatre-vingt-un-fr
- `vocabulary[30]` "quatre-vingt-dix": same meaning as "ninety" in 2026-11-24-numbers: kept quatre-vingt-dix-fr
- `vocabulary[33]` "cent": same meaning as "one hundred" in 2026-11-24-numbers: kept cent-fr

**2024-04-03-days-months**

- `vocabulary[5]` "samedi": same meaning as "Saturday" in 2024-06-05-reading-9: kept samedi-fr
- `vocabulary[23]` "aujourd'hui": same meaning as "today" in 2024-02-03-reading3: kept aujourd-hui-fr
- `vocabulary[24]` "demain": same meaning as "tomorrow" in 2024-04-01-time-adverbs: kept demain-fr
- `vocabulary[25]` "hier": same meaning as "yesterday" in 2024-04-01-time-adverbs: kept hier-fr
- `vocabulary[27]` "le week-end": same meaning as "the weekend" in 2024-06-05-reading-9: kept le-week-end-fr

**2024-04-05-colors**

- `vocabulary[29]` "un arbre": same meaning as "a tree" in 2024-03-15-nature-animals: kept un-arbre-fr
- `vocabulary[30]` "une fleur": same meaning as "a flower" in 2024-03-15-nature-animals: kept une-fleur-fr

**2024-04-06-french-countries**

- `vocabulary[5]` "parler français": same meaning as "to speak French" in 2024-04-24-reading-6: kept parler-francais-fr

**2024-04-07-language-stats**

- `vocabulary[1]` "une voyelle": same meaning as "a vowel" in 2024-04-01-alphabet: kept une-voyelle-fr
- `vocabulary[2]` "une consonne": same meaning as "a consonant" in 2024-04-01-alphabet: kept une-consonne-fr
- `vocabulary[4]` "un accent": same meaning as "an accent" in 2024-04-01-alphabet: kept un-accent-fr
- `vocabulary[18]` "francophone": same meaning as "French-speaking" in 2024-04-06-french-countries: kept francophone-fr

**2024-12-18-pronunciation-test**

- `vocabulary[0]` "bonjour": same meaning as "hello / good day" in 2024-01-01-famous-words: kept bonjour-fr
- `vocabulary[1]` "merci": same meaning as "thank you" in 2024-01-01-famous-words: kept merci-fr
- `vocabulary[2]` "au revoir": same meaning as "goodbye" in 2024-01-01-famous-words: kept au-revoir-fr
- `vocabulary[3]` "oui": same meaning as "yes" in 2024-01-01-famous-words: kept oui-fr
- `vocabulary[4]` "non": same meaning as "no" in 2024-01-01-famous-words: kept non-fr
- `vocabulary[5]` "s'il vous plaît": same meaning as "please" in 2024-01-01-famous-words: kept s-il-vous-plait-fr
- `vocabulary[6]` "rouge": same meaning as "red" in 2024-04-05-colors: kept rouge-fr
- `vocabulary[7]` "trois": same meaning as "three" in 2026-11-24-numbers: kept trois-fr
- `vocabulary[9]` "bon": same meaning as "good" in 2024-01-01-famous-words: kept bon-fr
- `vocabulary[11]` "un": same meaning as "one" in 2026-11-24-numbers: kept un-fr.one
- `vocabulary[13]` "je suis": same meaning as "I am" in 2024-01-02-etre: kept je-suis-fr
- `vocabulary[14]` "tu es": same meaning as "you are (informal)" in 2024-01-02-etre: kept tu-es-fr
- `vocabulary[15]` "il est": same meaning as "he is" in 2024-01-02-etre: kept il-est-fr
- `vocabulary[16]` "tu": same meaning as "you (informal)" in 2024-01-01-pronouns: kept tu-fr
- `vocabulary[18]` "plus": same meaning as "more" in 2024-04-08-comparisons: kept plus-fr
- `vocabulary[19]` "comment": same meaning as "how" in 2024-01-18-questions: kept comment-fr
- `vocabulary[20]` "très bien": new meaning "very good": tres-bien-fr.very-good; met before as "very well" (tres-bien-fr, 2024-04-24-reading-6)
- `vocabulary[21]` "peut-être": same meaning as "maybe" in 2024-04-13-reading-5: kept peut-etre-fr
- `vocabulary[22]` "beaucoup": same meaning as "a lot / very much" in 2024-03-31-survival-phrases: kept beaucoup-fr
- `vocabulary[24]` "nuit": same meaning as "night" in 2024-02-01-reading-10: kept nuit-fr

## Item types to confirm

The classifier had no clear rule for these items, so the type is its best guess.

**2024-01-12-demonstratives**

- `items[0]` i-ca: classifier: translate (English prompt with a French answer); written as respond (framed)

**2024-01-15-vouloir**

- `items[0]` i-je-veux: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[1]` i-tu-veux: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[2]` i-il-veut: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[3]` i-elle-veut: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[4]` i-nous-voulons: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[5]` i-vous-voulez: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[6]` i-ils-veulent: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[7]` i-elles-veulent: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[8]` i-je-veux-ca: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[9]` i-nous-voulons-ce-livre: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[10]` i-je-veux-etre-un: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[11]` i-je-veux-avoir-un: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[12]` i-elle-veut-avoir-une: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[13]` i-je-veux-ca-s: classifier: translate (English prompt with a French answer); written as respond (framed)

**2024-01-16-pouvoir**

- `items[0]` i-je-peux: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[1]` i-tu-peux: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[2]` i-il-peut: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[3]` i-elle-peut: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[4]` i-nous-pouvons: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[5]` i-vous-pouvez: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[6]` i-ils-peuvent: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[7]` i-elles-peuvent: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[8]` i-je-peux-avoir-ca: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[9]` i-il-peut-avoir-un: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[10]` i-nous-pouvons-avoir-une: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[11]` i-je-peux-etre-un: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[12]` i-elle-peut-etre-artiste: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[13]` i-je-peux-vouloir-ca: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[14]` i-ils-peuvent-vouloir-un: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[15]` i-je-peux-avoir-ca-2: classifier: translate (English prompt with a French answer); written as respond (framed)

**2024-01-18-questions**

- `items[10]` i-est-ce-que-tu: classifier: other (transformation or comprehension); English or mixed prompt, written as respond (instruction as situation, prompt as cue)

**2024-01-25-contractions**

- `items[0]` i-du-chat: classifier: other (transformation or comprehension); English or mixed prompt, written as respond (instruction as situation, prompt as cue)
- `items[1]` i-de-la-maison: classifier: other (transformation or comprehension); English or mixed prompt, written as respond (instruction as situation, prompt as cue)
- `items[2]` i-des-livres: classifier: other (transformation or comprehension); English or mixed prompt, written as respond (instruction as situation, prompt as cue)
- `items[3]` i-de-l-ami: classifier: other (transformation or comprehension); English or mixed prompt, written as respond (instruction as situation, prompt as cue)
- `items[4]` i-au-cafe: classifier: other (transformation or comprehension); English or mixed prompt, written as respond (instruction as situation, prompt as cue)
- `items[5]` i-a-la-maison: classifier: other (transformation or comprehension); English or mixed prompt, written as respond (instruction as situation, prompt as cue)
- `items[6]` i-aux-amis: classifier: other (transformation or comprehension); English or mixed prompt, written as respond (instruction as situation, prompt as cue)

**2024-01-26-venir**

- `items[0]` i-je-viens: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[1]` i-tu-viens: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[2]` i-il-vient: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[3]` i-elle-vient: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[4]` i-nous-venons: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[5]` i-vous-venez: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[6]` i-ils-viennent: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[7]` i-elles-viennent: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[8]` i-je-viens-avec-ca: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[9]` i-je-viens-de-chez: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[10]` i-il-vient-avec-son: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[11]` i-nous-venons-avec-vous: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[12]` i-qui-vient: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[13]` i-d-ou-viens-tu: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[14]` i-avec-quoi-viens-tu: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[15]` i-je-veux-venir: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[16]` i-veux-tu-venir: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[17]` i-je-veux-venir-avec: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[18]` i-peux-tu-venir: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[19]` i-je-peux-venir-a: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[20]` i-je-viens-te-voir: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[21]` i-pourquoi-viens-tu-me: classifier: translate (English prompt with a French answer); written as respond (framed)

**2024-01-27-aller**

- `items[0]` i-je-vais: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[1]` i-tu-vas: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[2]` i-il-va: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[3]` i-elle-va: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[4]` i-nous-allons: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[5]` i-vous-allez: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[6]` i-ils-vont: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[7]` i-elles-vont: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[8]` i-je-vais-avec-eux: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[9]` i-tu-vas-avec-quoi: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[10]` i-il-va-avec-moi: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[11]` i-nous-allons-avec-ma: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[12]` i-qui-est-ce-que: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[13]` i-je-veux-aller-avec: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[14]` i-peux-tu-aller: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[15]` i-je-peux-aller-avec: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[16]` i-je-vais-etre-bon: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[17]` i-qu-est-ce-que: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[18]` i-je-vais-avoir-ca: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[19]` i-qu-est-ce-que-2: classifier: translate (English prompt with a French answer); written as respond (framed) (fixed by hand)

**2024-01-29-partir**

- `items[0]` i-je-pars: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[1]` i-tu-pars: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[2]` i-il-part: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[3]` i-elle-part: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[4]` i-nous-partons: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[5]` i-vous-partez: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[6]` i-ils-partent: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[7]` i-elles-partent: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[8]` i-je-pars-de-ca: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[9]` i-qu-est-ce-que: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[10]` i-il-part-de-ca: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[11]` i-nous-partons-de-ca: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[12]` i-qu-est-ce-que-2: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[13]` i-je-veux-partir-de: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[14]` i-peux-tu-partir: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[15]` i-je-peux-partir-de: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[16]` i-je-vais-partir-de: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[17]` i-qu-est-ce-que-3: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[18]` i-je-viens-partir-de: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[19]` i-pourquoi-viens-tu-partir: classifier: translate (English prompt with a French answer); written as respond (framed)

**2024-01-31-possessive-adjectives**

- `items[0]` i-mon: classifier: other (prompt has a gap); English or mixed prompt, written as respond (instruction as situation, prompt as cue)
- `items[1]` i-ma: classifier: other (prompt has a gap); English or mixed prompt, written as respond (instruction as situation, prompt as cue)
- `items[2]` i-mes: classifier: other (prompt has a gap); English or mixed prompt, written as respond (instruction as situation, prompt as cue)
- `items[3]` i-ton: classifier: other (prompt has a gap); English or mixed prompt, written as respond (instruction as situation, prompt as cue)
- `items[4]` i-ta: classifier: other (prompt has a gap); English or mixed prompt, written as respond (instruction as situation, prompt as cue)
- `items[5]` i-tes: classifier: other (prompt has a gap); English or mixed prompt, written as respond (instruction as situation, prompt as cue)
- `items[6]` i-son: classifier: other (prompt has a gap); English or mixed prompt, written as respond (instruction as situation, prompt as cue)
- `items[7]` i-sa: classifier: other (prompt has a gap); English or mixed prompt, written as respond (instruction as situation, prompt as cue)
- `items[8]` i-ses: classifier: other (prompt has a gap); English or mixed prompt, written as respond (instruction as situation, prompt as cue)
- `items[9]` i-notre: classifier: other (prompt has a gap); English or mixed prompt, written as respond (instruction as situation, prompt as cue)
- `items[10]` i-nos: classifier: other (prompt has a gap); English or mixed prompt, written as respond (instruction as situation, prompt as cue)
- `items[11]` i-votre: classifier: other (prompt has a gap); English or mixed prompt, written as respond (instruction as situation, prompt as cue)
- `items[12]` i-vos: classifier: other (prompt has a gap); English or mixed prompt, written as respond (instruction as situation, prompt as cue)
- `items[13]` i-leur: classifier: other (prompt has a gap); English or mixed prompt, written as respond (instruction as situation, prompt as cue)
- `items[14]` i-leurs: classifier: other (prompt has a gap); English or mixed prompt, written as respond (instruction as situation, prompt as cue)

**2024-02-02-combining**

- `items[1]` i-elle-l-a: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[2]` i-ils-les-ont: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[4]` i-c-est-le-sien: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[5]` i-c-est-le-leur: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[6]` i-est-ce-le-tien: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[7]` i-est-ce-le-sien: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[8]` i-est-ce-la-sienne: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[9]` i-je-le-veux: classifier: translate (English prompt with a French answer); written as respond (framed) (fixed by hand)
- `items[10]` i-tu-viens-avec-moi: classifier: translate (English prompt with a French answer); written as respond (framed) (fixed by hand)
- `items[11]` i-il-va-partir: classifier: translate (English prompt with a French answer); written as respond (framed) (fixed by hand)

**2024-03-31-survival-phrases**

- `items[2]` i-c-est-combien-le: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[10]` i-ou-est-le-cafe: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[11]` i-ou-sont-les-toilettes: classifier: translate (English prompt with a French answer); written as respond (framed)

**2024-03-25-faire**

- `items[0]` i-je-fais: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[1]` i-tu-fais: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[2]` i-il-fait: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[3]` i-elle-fait: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[4]` i-nous-faisons: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[5]` i-vous-faites: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[6]` i-ils-font: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[7]` i-elles-font: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[8]` i-je-fais-ca: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[9]` i-qu-est-ce-que: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[10]` i-il-fait-ca: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[11]` i-nous-faisons-ca: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[12]` i-que-veux-tu-faire: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[13]` i-je-veux-faire-ca: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[14]` i-peux-tu-faire-ca: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[15]` i-je-peux-faire-ca: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[16]` i-je-vais-faire-ca: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[17]` i-qu-est-ce-que-2: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[18]` i-nous-lui-faisons-voir: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[19]` i-qu-est-ce-que-3: classifier: translate (English prompt with a French answer); written as respond (framed)

**2024-03-23-devoir**

- `items[0]` i-je-dois: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[1]` i-tu-dois: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[2]` i-il-doit: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[3]` i-elle-doit: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[4]` i-nous-devons: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[5]` i-vous-devez: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[6]` i-ils-doivent: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[7]` i-elles-doivent: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[8]` i-je-dois-faire-ca: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[9]` i-qu-est-ce-que: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[10]` i-il-doit-faire-ca: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[11]` i-nous-devons-faire-ca: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[12]` i-pourquoi-dois-tu-aller: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[13]` i-nous-devons-aller-a: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[14]` i-il-doit-partir-maintenant: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[15]` i-quand-dois-tu-partir: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[16]` i-ils-doivent-l-avoir: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[17]` i-qu-est-ce-que-2: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[18]` i-je-dois-etre-bon: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[19]` i-qu-est-ce-que-3: classifier: translate (English prompt with a French answer); written as respond (framed)

**2024-03-28-negation**

- `items[0]` i-je-ne-suis-pas: classifier: other (transformation or comprehension); English or mixed prompt, written as respond (instruction as situation, prompt as cue)
- `items[1]` i-je-n-ai-pas: classifier: other (transformation or comprehension); English or mixed prompt, written as respond (instruction as situation, prompt as cue)
- `items[2]` i-tu-n-es-pas: classifier: other (transformation or comprehension); English or mixed prompt, written as respond (instruction as situation, prompt as cue)
- `items[3]` i-il-n-a-pas: classifier: other (transformation or comprehension); English or mixed prompt, written as respond (instruction as situation, prompt as cue)
- `items[4]` i-je-ne-veux-pas: classifier: other (transformation or comprehension); English or mixed prompt, written as respond (instruction as situation, prompt as cue)
- `items[5]` i-tu-ne-vas-pas: classifier: other (transformation or comprehension); English or mixed prompt, written as respond (instruction as situation, prompt as cue)
- `items[6]` i-nous-n-avons-pas: classifier: other (transformation or comprehension); English or mixed prompt, written as respond (instruction as situation, prompt as cue)
- `items[9]` i-je-ne-le-vois: classifier: other (transformation or comprehension); English or mixed prompt, written as respond (instruction as situation, prompt as cue)

**2024-02-07-wish-phrases**

- `items[1]` i-je-veux-qu-il: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[3]` i-j-aimerais-que-tu: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[5]` i-je-veux-qu-elle: classifier: translate (English prompt with a French answer); written as respond (framed)

**2024-01-25-emotion-phrases**

- `items[1]` i-je-suis-triste-que: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[2]` i-j-ai-peur-qu: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[3]` i-je-suis-desole-que: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[4]` i-je-suis-surpris-que: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[5]` i-je-regrette-que-tu: classifier: translate (English prompt with a French answer); written as respond (framed)

**2024-01-29-opinion-phrases**

- `items[0]` i-je-pense-qu-il: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[1]` i-je-ne-pense-pas: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[2]` i-je-doute-qu-elle: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[3]` i-je-ne-crois-pas: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[4]` i-je-ne-pense-pas-2: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[5]` i-je-doute-que-ce: classifier: translate (English prompt with a French answer); written as respond (framed)

**2024-01-27-hypothetical-phrases**

- `items[3]` i-si-tu-etais-ici: classifier: translate (English prompt with a French answer); written as respond (framed)

**2024-01-26-had-already-phrases**

- `items[0]` i-j-avais-deja-mange: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[1]` i-j-etais-deja-parti: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[2]` i-elle-etait-deja-partie: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[3]` i-j-avais-deja-vu: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[4]` i-il-avait-deja-commence: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[5]` i-nous-avions-deja-fini: classifier: translate (English prompt with a French answer); written as respond (framed)

**2024-01-22-common-adverbs**

- `items[2]` i-parler-lentement: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[4]` i-comprendre-facilement: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[5]` i-completement-fini: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[6]` i-probablement: classifier: translate (English prompt with a French answer); written as respond (framed)

**2024-02-02-service-phrases**

- `items[0]` i-je-me-fais-couper: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[1]` i-je-fais-reparer-ma: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[2]` i-je-me-fais-maquiller: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[3]` i-je-fais-nettoyer-la: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[4]` i-je-me-fais-examiner: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[5]` i-je-fais-construire-une: classifier: translate (English prompt with a French answer); written as respond (framed)

**2024-02-08-age-personal-info**

- `items[1]` i-quel-age-as-tu: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[2]` i-quel-age-avez-vous: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[3]` i-elle-a-dix-huit: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[4]` i-je-suis-ne-en: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[5]` i-je-suis-nee-en: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[6]` i-je-suis-ne-a: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[7]` i-je-m-appelle-sophie: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[8]` i-en-quelle-annee-etes: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[9]` i-j-ai-trente-ans: classifier: translate (English prompt with a French answer); written as respond (framed)

**2024-02-15-unit-11-exam**

- `items[1]` i-quel-age-avez-vous: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[2]` i-quel-age-as-tu: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[3]` i-je-suis-ne-en: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[4]` i-je-suis-nee-a: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[5]` i-je-m-appelle-sophie: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[6]` i-je-donne: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[7]` i-ils-donnent: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[8]` i-je-te-donne-le: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[9]` i-tu-peux-me-donner: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[10]` i-donner-rendez-vous: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[12]` i-tu-dors-bien: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[13]` i-je-dors-huit-heures: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[15]` i-ou-travaillez-vous: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[16]` i-je-travaille-dur: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[18]` i-je-vis-a-bordeaux: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[19]` i-vivre-sa-vie: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[20]` i-je-cherche-ma-voiture: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[21]` i-j-ai-trouve: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[22]` i-comment-tu-trouves-ca: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[23]` i-je-trouve-que-c: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[24]` i-j-ecoute-de-la: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[25]` i-nous-regardons-des-films: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[26]` i-qu-est-ce-que: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[27]` i-ecoute-le-professeur: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[28]` i-j-attends-mon-ami: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[29]` i-a-quelle-heure-tu: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[30]` i-le-train-arrive-a: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[31]` i-je-reste-trois-jours: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[32]` i-combien-de-temps-tu: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[33]` i-j-attends-tu-arrives: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[34]` i-tournez-a-gauche: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[35]` i-tournez-a-droite: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[36]` i-allez-tout-droit: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[37]` i-ou-est-le-musee: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[38]` i-c-est-loin: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[39]` i-excusez-moi-ou-est: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[40]` i-c-est-a-cinq: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[41]` i-allez-tout-droit-puis: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[42]` i-la-france-a-soixante: classifier: translate (English prompt with a French answer); written as respond (framed) (fixed by hand)
- `items[43]` i-les-touristes-cherchent-des: classifier: translate (English prompt with a French answer); written as respond (framed) (fixed by hand)
- `items[44]` i-les-artistes-francais-vivent: classifier: translate (English prompt with a French answer); written as respond (framed) (fixed by hand)
- `items[45]` i-la-france-moderne-combine: classifier: translate (English prompt with a French answer); written as respond (framed) (fixed by hand)

## Practice blanks that were in the wrong place

The practice screen shows a blank in place of the character at its position, so these blanks cut a word, dropped a mark or sat after the full stop. Each is placed where the language-graph checker reads it.

**2024-01-10-unit1-practice**

- `items[10]` i-mais-aussi: the blank for "aussi" at position 47 sits on the mark ".", which the app drops; placed as the checker reads it: "Nous sommes des enfants ___ nous avons des chiens ___."

**2024-01-23-unit2-practice**

- `items[6]` i-moi: the blank for "moi" at position 12 sits on the mark ".", which the app drops; placed as the checker reads it: "Il est avec ___."
- `items[11]` i-sous-voiture: the blank for "voiture" at position 18 sits on the mark ".", which the app drops; placed as the checker reads it: "Le chien est ___ la ___."

**2024-04-03-unit-4-practice**

- `items[6]` i-demain: the blank for "demain" at position 8 sits on the mark ".", which the app drops; placed as the checker reads it: "Il part ___."
- `items[7]` i-hier: the blank for "hier" at position 13 sits after the end of the sentence; placed as the checker reads it: "Tu as vu ça ___." (fixed by hand)
- `items[8]` i-ici: the blank for "ici" at position 8 sits on the mark ".", which the app drops; placed as the checker reads it: "Je suis ___."
- `items[9]` i-la: the blank for "là" at position 13 sits on the mark ".", which the app drops; placed as the checker reads it: "Le livre est ___."
- `items[14]` i-parlons-ici: the blank for "ici" at position 22 sits after the end of the sentence; placed as the checker reads it: "Nous ___ français ___."
- `items[18]` i-fais-demain: the blank for "demain" at position 17 sits on the mark ".", which the app drops; placed as the checker reads it: "Je ___ mon travail ___."
- `items[19]` i-n-pas-ici: the blank for "ici" at position 23 sits on the mark ".", which the app drops; placed as the checker reads it: "Nous ___avons ___ l'argent ___."

**2024-04-15-unit-5-practice**

- `items[27]` i-baguette: the blank for "baguette" at position 12 sits on the mark ".", which the app drops; placed as the checker reads it: "Je veux une ___."
- `items[28]` i-express: the blank for "express" at position 15 sits on the mark ",", which the app drops; placed as the checker reads it: "Je voudrais un ___, s'il vous plaît."
- `items[29]` i-genial: the blank for "génial" at position 6 sits on the mark "!", which the app drops; placed as the checker reads it: "C'est ___!"
- `items[30]` i-top: the blank for "top" at position 18 sits on the mark "!", which the app drops; placed as the checker reads it: "Ce restaurant est ___!"
- `items[31]` i-devrions-au: the blank for "au" at position 15 sits inside the word "restaurant"; placed as the checker reads it: "Nous ___ aller ___ restaurant."
- `items[32]` i-avais-manger: the blank for "manger" at position 25 sits inside the word "maintenant"; placed as the checker reads it: "J'___ faim et je veux ___ maintenant."

**2024-04-27-unit-6-practice**

- `items[28]` i-besoin-2: the blank for "besoin" at position 7 sits inside the word "de"; placed as the checker reads it: "Tu as ___ de partir."
- `items[35]` i-question: the blank for "question" at position 9 sits on the mark ".", which the app drops; placed as the checker reads it: "J'ai une ___."
- `items[36]` i-fois: the blank for "fois" at position 19 sits after the end of the sentence; placed as the checker reads it: "C'est la première ___."
- `items[38]` i-moment: the blank for "moment" at position 6 sits on the mark ",", which the app drops; placed as the checker reads it: "En ce ___, je suis occupé."
- `items[40]` i-ville: the blank for "ville" at position 20 sits on the mark ".", which the app drops; placed as the checker reads it: "Paris est une belle ___."
- `items[44]` i-prendre: the blank for "prendre" at position 28 sits inside the word "train"; placed as the checker reads it: "Nous sommes en train de ___ le train."

**2024-05-11-unit-7-practice**

- `items[6]` i-comprends-2: the blank for "comprends" at position 3 sits on the mark "?", which the app drops; placed as the checker reads it: "Tu ___?"
- `items[12]` i-penses: the blank for "penses" at position 17 sits on the mark "?", which the app drops; placed as the checker reads it: "Qu'est-ce que tu ___?"
- `items[15]` i-sais-connais: the blank for "connais" at position 29 sits inside the word "pas"; placed as the checker reads it: "Je ___ la réponse mais je ne ___ pas Paris."
- `items[17]` i-en-fait: the blank for "en fait" at position 0 sits on the mark ",", which the app drops; placed as the checker reads it: "___, je ne sais pas."
- `items[18]` i-question: the blank for "question" at position 9 sits on the mark ".", which the app drops; placed as the checker reads it: "J'ai une ___."
- `items[19]` i-idee: the blank for "idée" at position 16 sits on the mark ".", which the app drops; placed as the checker reads it: "C'est une bonne ___."
- `items[22]` i-mal: the blank for "mal" at position 14 sits after the end of the sentence; placed as the checker reads it: "Je comprends ___."
- `items[23]` i-on-pense-apprendre: the blank for "apprendre" at position 32 sits after the end of the sentence; placed as the checker reads it: "___ que tout le monde peut ___."

**2024-05-25-unit-8-practice**

- `items[0]` i-d-abord-ensuite: the blank for "d'abord" at position 0 sits on the mark ",", which the app drops; placed as the checker reads it: "___, je mange., ___ je pars." (fixed by hand)
- `items[0]` i-d-abord-ensuite: the blank for "ensuite" at position 14 sits inside the word "je"; placed as the checker reads it: "___, je mange., ___ je pars." (fixed by hand)
- `items[4]` i-t-appelles: the blank for "t'appelles" at position 11 sits on the mark "?", which the app drops; placed as the checker reads it: "Comment tu ___?"
- `items[6]` i-me-leve: the blank for "me lève" at position 13 sits after the end of the sentence; placed as the checker reads it: "Ensuite, je ___."
- `items[7]` i-me-lave: the blank for "me lave" at position 3 sits on the mark ".", which the app drops; placed as the checker reads it: "Je ___."
- `items[17]` i-ecoute: the blank for "écoute" at position 0 sits on the mark "!", which the app drops; placed as the checker reads it: "___!"
- `items[20]` i-apres-m-habille-me: the blank for "m'habille" at position 29 sits after the end of the sentence; placed as the checker reads it: "___ le café, je ___ et ___ je." (fixed by hand)

**2024-06-10-unit-9-practice**

- `items[18]` i-comme-sommes-restes: the blank for "sommes restés" at position 25 sits inside the word "maison"; placed as the checker reads it: "___ il pleuvait, nous ___ à la maison." (fixed by hand)

**2024-02-05-unit-10-practice**

- `items[5]` i-parte: the blank for "parte" at position 16 sits on the mark ".", which the app drops; placed as the checker reads it: "J'ai peur qu'il ___."
- `items[7]` i-voyagerais: the blank for "voyagerais" at position 33 sits inside the word "plus"; placed as the checker reads it: "Si j'avais plus de temps, je ___ plus."
- `items[10]` i-vient: the blank for "vient" at position 15 sits on the mark ".", which the app drops; placed as the checker reads it: "Je pense qu'il ___."
- `items[11]` i-vienne: the blank for "vienne" at position 22 sits on the mark ".", which the app drops; placed as the checker reads it: "Je ne pense pas qu'il ___."
- `items[17]` i-couper: the blank for "couper" at position 12 sits inside the word "les"; placed as the checker reads it: "Je me fais ___ les cheveux demain."

**2024-02-16-unit-11-practice**

- `items[5]` i-travaillez: the blank for "travaillez" at position 3 sits on the mark "-", which the app drops; placed as the checker reads it: "Où ___-vous?"
- `items[8]` i-trouve: the blank for "trouvé" at position 5 sits on the mark "!", which the app drops; placed as the checker reads it: "J'ai ___! Elles étaient dans ma voiture."
- `items[14]` i-a-gauche: the blank for "à gauche" at position 8 sits on the mark ",", which the app drops; placed as the checker reads it: "Tournez ___, puis allez tout droit."
- `items[16]` i-ou-un: the blank for "un" at position 37 sits inside the word "rendez"; placed as the checker reads it: "Excusez-moi, ___ est la gare? J'ai ___ rendez-vous là-bas à trois heures."
- `items[17]` i-attends-arrivent: the blank for "arrivent" at position 40 sits inside the word "vers"; placed as the checker reads it: "Je ___ mes amis au café. Ils ___ généralement vers huit heures."
- `items[18]` i-evolue-vivent: the blank for "vivent" at position 41 sits inside the word "dans"; placed as the checker reads it: "La France ___ rapidement. Ses habitants ___ dans des villes modernes."
- `items[19]` i-j-ai-vis-travaille: the blank for "vis" at position 42 sits inside the word "Lyon"; placed as the checker reads it: "Je m'appelle Marie, ___ trente ans, et je ___ à Lyon où je ___ comme professeur."
- `items[19]` i-j-ai-vis-travaille: the blank for "travaille" at position 57 sits inside the word "comme"; placed as the checker reads it: "Je m'appelle Marie, ___ trente ans, et je ___ à Lyon où je ___ comme professeur."

## Position words

Learner text that names a module, unit or reading by number. The source says it this way; the module file names the subject instead, and each line fixed so says "fixed by hand".

**2024-01-06-basic-nouns**

- `concepts[1].definition` "Combine nouns with verbs you already know from M2-M3" (fixed by hand)
- `items[0].hint` "Combine avoir (M3) + article (M4) + noun - all previous modules!" (fixed by hand)

**2024-01-07-plurals**

- `concepts[2].definition` "Every exercise combines plurals with verbs from M2-M3" (fixed by hand)

**2024-01-10-unit1-practice**

- `title` "Unit 1 Practice - Fill in the Blanks" (fixed by hand)
- `description` "Complete sentences using everything you've learned in Unit 1. Fill in the blanks to create correct French sentences!" (fixed by hand)
- `can_do[2]` "Apply everything from Unit 1 in context" (fixed by hand)

**2024-01-13-ca-survival**

- `items[1].hint` "Combine: it is + that (using être from M3)" (fixed by hand)

**2024-01-22-reading2**

- `title` "Reading Comprehension 2 - Rendez-vous en Normandie" (fixed by hand)
- `description` "An exciting trip through beautiful Normandy! Explore famous places using vocabulary from Units 1 & 2." (fixed by hand)

**2024-01-23-unit2-practice**

- `title` "Unit 2 Practice - Fill in the Blanks" (fixed by hand)
- `description` "Complete sentences using demonstratives, questions, prepositions, and adjectives from Unit 2!" (fixed by hand)
- `can_do[2]` "Apply Unit 2 vocabulary in realistic contexts" (fixed by hand)

**2024-01-24-unit2-exam**

- `description` "Test everything from Unit 2! Demonstratives, essential verbs (vouloir/pouvoir/voir), questions, stressed pronouns, prepositions, and descriptive sentences." (fixed by hand)

**2024-02-02-combining**

- `items[9].hint` "Combine vouloir from M12 + object pronoun BEFORE verb" (fixed by hand)
- `items[10].hint` "Combine venir (M17) + avec (M14) + moi" (fixed by hand)
- `items[11].hint` "Combine aller (M18) + partir infinitive (M19) - future construction!" (fixed by hand)

**2024-02-03-reading3**

- `title` "Reading Comprehension 3 - La Première Page" (fixed by hand)

**2024-02-04-unit3-practice**

- `title` "Unit 3 Practice - Fill in the Blanks" (fixed by hand)
- `description` "Master contractions, motion verbs, object pronouns, and possessive forms from Unit 3!" (fixed by hand)
- `can_do[2]` "Apply Unit 3 advanced structures in context" (fixed by hand)

**2024-02-05-unit3-exam**

- `description` "Test everything from Unit 3! Motion verbs, object pronouns, possessives, and complex sentence combinations." (fixed by hand)

**2024-03-30-reading-4**

- `title` "Reading Comprehension 4 - La nouvelle époque de Marie" (fixed by hand)
- `description` "Unit 4 mastery! A natural conversation using all your vocabulary." (fixed by hand)

**2024-04-03-unit-4-practice**

- `title` "Unit 4 Practice - Fill in the Blanks" (fixed by hand)
- `description` "Practice survival phrases, negation, time/location adverbs, and essential verbs from Unit 4!" (fixed by hand)

**2024-04-02-unit-4-exam**

- `description` "Test everything from Unit 4! Survival phrases, essential verbs, negation, and expressing time and place." (fixed by hand)

**2024-04-13-reading-5**

- `title` "Reading Comprehension 5 - La fée verte (The Green Fairy)" (fixed by hand)
- `description` "Unit 5 mastery! A story about Vincent van Gogh painting his famous 'Café Terrace at Night' in Arles with Paul Gauguin." (fixed by hand)
- `vocabulary[15].note` "Unit 5 verb" (fixed by hand)
- `vocabulary[16].note` "Unit 4 verb" (fixed by hand)
- `vocabulary[17].note` "Unit 5 verb" (fixed by hand)
- `vocabulary[18].note` "Unit 2 verb" (fixed by hand)
- `vocabulary[19].note` "Unit 3 verb" (fixed by hand)
- `vocabulary[20].note` "Unit 3 verb" (fixed by hand)
- `vocabulary[21].note` "Unit 3 verb" (fixed by hand)
- `vocabulary[22].note` "Unit 2 verb" (fixed by hand)
- `vocabulary[23].note` "Unit 4 verb" (fixed by hand)
- `vocabulary[24].note` "Unit 4 verb" (fixed by hand)
- `vocabulary[25].note` "Unit 4 verb" (fixed by hand)
- `vocabulary[26].note` "Unit 4 verb" (fixed by hand)
- `vocabulary[37].note` "Unit 4 - polite expression" (fixed by hand)

**2024-04-15-unit-5-practice**

- `title` "Unit 5 Practice - Fill in the Blanks" (fixed by hand)
- `description` "Complete sentences using comparisons, past tense, conditionals, and food vocabulary from Unit 5!" (fixed by hand)
- `can_do[2]` "Apply Unit 5 sophistication in context" (fixed by hand)

**2024-04-14-unit-5-exam**

- `description` "Test everything from Unit 5! Comparisons, slang, past tense, conditionals, and food vocabulary." (fixed by hand)

**2024-04-24-reading-6**

- `title` "Reading Comprehension 6 - Un Voyage en Famille" (fixed by hand)
- `description` "A family plans a trip to Paris. Uses Unit 6 vocabulary: progressive tenses, dire, prendre, mettre, demander, commander, besoin." (fixed by hand)
- `vocabulary[9].note` "Unit 5 verb" (fixed by hand)
- `vocabulary[29].note` "feminine; from Unit 4 everyday-nouns" (fixed by hand)
- `vocabulary[38].note` "from Unit 6 mettre module" (fixed by hand)
- `vocabulary[39].note` "from Unit 1" (fixed by hand)
- `vocabulary[48].note` "from Unit 5 food-nouns" (fixed by hand)
- `vocabulary[49].note` "from Unit 5 food-nouns" (fixed by hand)
- `vocabulary[51].note` "Unit 4 time-adverbs" (fixed by hand)
- `vocabulary[53].note` "Unit 3 voir module" (fixed by hand)
- `vocabulary[55].note` "from Unit 5 comparisons" (fixed by hand)
- `vocabulary[56].note` "time expression with Unit 6 moment" (fixed by hand)
- `vocabulary[57].note` "Unit 4 faire module" (fixed by hand)
- `vocabulary[58].note` "plural adjective from Unit 2" (fixed by hand)
- `vocabulary[60].note` "from Unit 4 parler" (fixed by hand)
- `vocabulary[65].note` "from Unit 4 parler" (fixed by hand)
- `vocabulary[67].note` "from Unit 1 famous-words" (fixed by hand)
- `vocabulary[68].note` "bon from Unit 2 adjectives" (fixed by hand)
- `vocabulary[69].note` "Unit 4 time-adverbs" (fixed by hand)
- `vocabulary[70].note` "Unit 1 avoir module" (fixed by hand)
- `vocabulary[71].note` "from Unit 2 adjectives (beau)" (fixed by hand)
- `vocabulary[72].note` "superlative from Unit 5" (fixed by hand)
- `vocabulary[74].note` "Unit 2 prepositions" (fixed by hand)

**2024-04-27-unit-6-practice**

- `title` "Unit 6 Practice - Fill in the Blanks" (fixed by hand)
- `description` "Complete sentences using progressive tenses, communication verbs, and essential vocabulary from Unit 6!" (fixed by hand)
- `can_do[2]` "Apply advanced Unit 6 structures in context" (fixed by hand)

**2024-04-26-unit-6-exam**

- `description` "Test everything from Unit 6! Progressive tenses, future forms, communication verbs, and essential vocabulary." (fixed by hand)

**2024-05-07-reading-7**

- `title` "Reading 7 - L'Art d'Apprendre" (fixed by hand)
- `description` "A philosophical article about learning and education. Uses all cognitive verbs from Unit 7!" (fixed by hand)
- `vocabulary[0].note` "Unit 7 verb" (fixed by hand)
- `vocabulary[2].note` "Unit 7 verb" (fixed by hand)
- `vocabulary[5].note` "Unit 7 verb" (fixed by hand)
- `vocabulary[9].note` "Unit 7 verb" (fixed by hand)
- `vocabulary[12].note` "Unit 7 verb" (fixed by hand)
- `vocabulary[14].note` "Unit 7 verb" (fixed by hand)
- `vocabulary[18].note` "Unit 7 verb" (fixed by hand)
- `vocabulary[20].note` "Unit 7 verb" (fixed by hand)
- `vocabulary[23].note` "Unit 6 verb" (fixed by hand)
- `vocabulary[25].note` "Unit 6 verb" (fixed by hand)
- `vocabulary[55].note` "Unit 6 verb" (fixed by hand)

**2024-05-11-unit-7-practice**

- `title` "Unit 7 Practice - Fill in the Blanks" (fixed by hand)
- `description` "Complete sentences using cognitive verbs, on, discourse markers, and essential vocabulary from Unit 7!" (fixed by hand)

**2024-05-10-unit-7-exam**

- `description` "Test everything from Unit 7! Cognitive verbs (understand, know, think, believe), on pronoun, discourse markers, and modifiers." (fixed by hand)

**2024-05-22-s-appeler**

- `concepts[1].term` "This should've been in Unit 1!" (fixed by hand)

**2024-05-20-reading-8**

- `title` "Reading 8 - Ma Journée" (fixed by hand)
- `description` "A story about a typical day. Uses temporal words, reflexive verbs, and all Unit 8 vocabulary!" (fixed by hand)

**2024-05-25-unit-8-practice**

- `title` "Unit 8 Practice - Fill in the Blanks" (fixed by hand)
- `description` "Complete sentences using temporal words, reflexive verbs, and commands from Unit 8!" (fixed by hand)

**2024-05-24-unit-8-exam**

- `description` "Test everything from Unit 8! Temporal words, reflexive verbs (introductions, routines), commands, and reciprocal actions." (fixed by hand)

**2024-06-05-reading-9**

- `title` "Reading 9 - Une Histoire du Passé" (fixed by hand)
- `description` "A story in the past using passé composé, imparfait, causal words, and spatial prepositions - bringing together all of Unit 9" (fixed by hand)

**2024-06-10-unit-9-practice**

- `title` "Unit 9 Practice - Fill in the Blanks" (fixed by hand)
- `description` "Complete sentences using causal words, spatial prepositions, and past tenses from Unit 9!" (fixed by hand)

**2024-06-09-unit-9-exam**

- `description` "Test everything from Unit 9! Causal words, spatial prepositions, passé composé, imparfait, and the critical PC vs IMP distinction for complete storytelling mastery." (fixed by hand)

**2024-02-01-reading-10**

- `title` "Reading 10 - Mes Rêves et Mes Espoirs" (fixed by hand)
- `description` "A story about dreams and ambitions using Unit 10's advanced expressions: wishes (je veux que...), emotions (je suis content que...), hypotheticals (si j'étais...), and more" (fixed by hand)

**2024-02-05-unit-10-practice**

- `title` "Unit 10 Practice - Fill in the Blanks" (fixed by hand)
- `description` "Complete sentences using Unit 10's B2 level phrases: necessity, wishes, emotions, hypotheticals, and more!" (fixed by hand)

**2024-02-04-unit-10-exam**

- `description` "Test everything from Unit 10! Master B2 level phrases: necessity (il faut que), wishes (je veux que), emotions (je suis content que), hypotheticals (si j'étais...), regrets (si j'avais su...), and more advanced expressions." (fixed by hand)
- `items[36].hint` "Marc's wisdom from Reading 10: 'If we don't do anything, we'll never _____'"
- `items[37].instruction` "From Reading 10: What did Sophie want about her life?" (fixed by hand)
- `items[38].instruction` "From Reading 10: What had Sophie already done before talking to Marc?" (fixed by hand)

**2024-02-08-age-personal-info**

- `description` "Essential life skills! Learn to say your age (J'ai 25 ans), ask others' ages (Quel âge avez-vous?), and share personal information. Finally complete what should have been in Unit 1!" (fixed by hand)

**2024-02-12-reading-11**

- `title` "Reading 11 - La France Moderne" (fixed by hand)

**2024-02-16-unit-11-practice**

- `title` "Unit 11 Practice - Fill in the Blanks" (fixed by hand)
- `description` "Complete sentences using Unit 11's essential vocabulary: age expressions, missing top 100 verbs, and directions!" (fixed by hand)

**2024-02-15-unit-11-exam**

- `description` "Final test for Unit 11! Demonstrate mastery of age expressions, all missing top 100 verbs (give, sleep, work, live, search, find, listen, watch, wait, arrive, stay), directions, and practical communication. Achieve complete French foundation!" (fixed by hand)
- `items[42].situation` "From Reading 11: France's population" (fixed by hand)
- `items[43].situation` "From Reading 11: What tourists look for" (fixed by hand)
- `items[44].situation` "From Reading 11: Where artists live" (fixed by hand)
- `items[45].situation` "From Reading 11: Modern France combines what?" (fixed by hand)

**2024-03-19-pourquoi-complex**

- `concepts[0].definition` "You already know pourquoi - now compose it with EVERYTHING from Units 1-11!" (fixed by hand)

**2024-03-25-multi-clause-questions**

- `concepts[0].term` "Questions + Unit 10 Structures" (fixed by hand)
- `concepts[0].definition` "Combine question words with all the sophisticated structures from Unit 10" (fixed by hand)

## Exercises rewritten as Jake ruled

No conversion of today’s text fits these, so each is written as Jake ruled, in its place.

**2024-05-10-unit-7-exam**

- `items[18]` i-for-facts-and-skills: Jake, 2026-11-25: "When do you use savoir?" as a choice item (its English answers fit no typed item)
- `items[23]` i-for-people-places-and: Jake, 2026-11-25: "When do you use connaître?" as a choice item (its English answers fit no typed item)

## English prompts written as respond items

An English prompt framed by its instruction ("Say 'you would do it' (informal)") or by a context note ("I know Marie (person)") is a respond item, with the whole frame as the situation, since the context does the teaching (Jake, 2026-11-25). A bare English sentence is a translate item; outside Unit 1 each is a checker warning, rewritten over time.

**2024-01-01-famous-words**

- 13 × framed by its instruction: `items[0]`, `items[1]`, `items[2]`, `items[3]`, `items[4]`, `items[5]`, `items[6]`, `items[7]`, `items[8]`, `items[9]`, `items[10]`, `items[11]`, `items[12]`

**2024-01-01-pronouns**

- 9 × framed by its instruction: `items[0]`, `items[1]`, `items[2]`, `items[3]`, `items[4]`, `items[5]`, `items[6]`, `items[7]`, `items[8]`

**2024-01-05-articles**

- 6 × framed by its instruction: `items[0]`, `items[1]`, `items[2]`, `items[3]`, `items[4]`, `items[5]`

**2024-01-06-basic-nouns**

- 6 × framed by its instruction: `items[1]`, `items[2]`, `items[4]`, `items[7]`, `items[8]`, `items[10]`
- 2 × framed by a context note: `items[6]`, `items[12]`

**2024-01-07-plurals**

- 4 × framed by a context note: `items[1]`, `items[3]`, `items[5]`, `items[6]`

**2024-01-08-connectors**

- 3 × framed by its instruction: `items[4]`, `items[6]`, `items[8]`

**2024-01-11-unit1-exam**

- 5 × framed by a context note: `items[1]`, `items[3]`, `items[6]`, `items[15]`, `items[21]`

**2024-01-12-demonstratives**

- 10 × framed by its instruction: `items[0]`, `items[1]`, `items[2]`, `items[3]`, `items[4]`, `items[5]`, `items[6]`, `items[7]`, `items[8]`, `items[9]`

**2024-01-13-ca-survival**

- 6 × framed by its instruction: `items[0]`, `items[1]`, `items[2]`, `items[3]`, `items[4]`, `items[5]`

**2024-01-14-determiners-nouns**

- 3 × framed by a context note: `items[3]`, `items[4]`, `items[8]`

**2024-01-15-vouloir**

- 14 × framed by its instruction: `items[0]`, `items[1]`, `items[2]`, `items[3]`, `items[4]`, `items[5]`, `items[6]`, `items[7]`, `items[8]`, `items[9]`, `items[10]`, `items[11]`, `items[12]`, `items[13]`

**2024-01-16-pouvoir**

- 16 × framed by its instruction: `items[0]`, `items[1]`, `items[2]`, `items[3]`, `items[4]`, `items[5]`, `items[6]`, `items[7]`, `items[8]`, `items[9]`, `items[10]`, `items[11]`, `items[12]`, `items[13]`, `items[14]`, `items[15]`

**2024-01-18-questions**

- 18 × framed by its instruction: `items[0]`, `items[1]`, `items[2]`, `items[3]`, `items[4]`, `items[5]`, `items[6]`, `items[7]`, `items[8]`, `items[9]`, `items[11]`, `items[12]`, `items[13]`, `items[14]`, `items[15]`, `items[16]`, `items[17]`, `items[18]`

**2024-01-19-stressed-pronouns**

- 10 × framed by its instruction: `items[0]`, `items[1]`, `items[2]`, `items[3]`, `items[4]`, `items[5]`, `items[6]`, `items[7]`, `items[9]`, `items[11]`

**2024-01-20-prepositions**

- 8 × framed by its instruction: `items[0]`, `items[1]`, `items[2]`, `items[3]`, `items[4]`, `items[5]`, `items[6]`, `items[9]`

**2024-01-21-adjectives**

- 3 × framed by a context note: `items[4]`, `items[8]`, `items[15]`

**2024-01-24-unit2-exam**

- 11 × framed by a context note: `items[11]`, `items[12]`, `items[13]`, `items[15]`, `items[18]`, `items[19]`, `items[20]`, `items[22]`, `items[27]`, `items[31]`, `items[32]`

**2024-01-26-venir**

- 22 × framed by its instruction: `items[0]`, `items[1]`, `items[2]`, `items[3]`, `items[4]`, `items[5]`, `items[6]`, `items[7]`, `items[8]`, `items[9]`, `items[10]`, `items[11]`, `items[12]`, `items[13]`, `items[14]`, `items[15]`, `items[16]`, `items[17]`, `items[18]`, `items[19]`, `items[20]`, `items[21]`

**2024-01-27-aller**

- 20 × framed by its instruction: `items[0]`, `items[1]`, `items[2]`, `items[3]`, `items[4]`, `items[5]`, `items[6]`, `items[7]`, `items[8]`, `items[9]`, `items[10]`, `items[11]`, `items[12]`, `items[13]`, `items[14]`, `items[15]`, `items[16]`, `items[17]`, `items[18]`, `items[19]`

**2024-01-29-partir**

- 20 × framed by its instruction: `items[0]`, `items[1]`, `items[2]`, `items[3]`, `items[4]`, `items[5]`, `items[6]`, `items[7]`, `items[8]`, `items[9]`, `items[10]`, `items[11]`, `items[12]`, `items[13]`, `items[14]`, `items[15]`, `items[16]`, `items[17]`, `items[18]`, `items[19]`

**2024-02-01-possessive-pronouns**

- 12 × framed by its instruction: `items[0]`, `items[1]`, `items[2]`, `items[3]`, `items[4]`, `items[5]`, `items[6]`, `items[7]`, `items[8]`, `items[9]`, `items[10]`, `items[11]`

**2024-02-02-combining**

- 12 × framed by its instruction: `items[0]`, `items[1]`, `items[2]`, `items[3]`, `items[4]`, `items[5]`, `items[6]`, `items[7]`, `items[8]`, `items[9]`, `items[10]`, `items[11]`

**2024-02-05-unit3-exam**

- 18 × framed by a context note: `items[0]`, `items[1]`, `items[2]`, `items[4]`, `items[7]`, `items[8]`, `items[9]`, `items[11]`, `items[12]`, `items[13]`, `items[14]`, `items[15]`, `items[16]`, `items[17]`, `items[18]`, `items[19]`, `items[23]`, `items[25]`

**2024-03-31-survival-phrases**

- 14 × framed by its instruction: `items[0]`, `items[1]`, `items[2]`, `items[3]`, `items[4]`, `items[5]`, `items[6]`, `items[7]`, `items[8]`, `items[9]`, `items[10]`, `items[11]`, `items[12]`, `items[13]`

**2024-03-25-faire**

- 20 × framed by its instruction: `items[0]`, `items[1]`, `items[2]`, `items[3]`, `items[4]`, `items[5]`, `items[6]`, `items[7]`, `items[8]`, `items[9]`, `items[10]`, `items[11]`, `items[12]`, `items[13]`, `items[14]`, `items[15]`, `items[16]`, `items[17]`, `items[18]`, `items[19]`

**2024-03-23-devoir**

- 20 × framed by its instruction: `items[0]`, `items[1]`, `items[2]`, `items[3]`, `items[4]`, `items[5]`, `items[6]`, `items[7]`, `items[8]`, `items[9]`, `items[10]`, `items[11]`, `items[12]`, `items[13]`, `items[14]`, `items[15]`, `items[16]`, `items[17]`, `items[18]`, `items[19]`

**2024-10-22-search-find**

- 7 × framed by its instruction: `items[0]`, `items[2]`, `items[3]`, `items[6]`, `items[7]`, `items[12]`, `items[13]`

**2024-03-28-negation**

- 3 × framed by its instruction: `items[10]`, `items[11]`, `items[15]`

**2024-04-01-time-adverbs**

- 1 × framed by its instruction: `items[6]`

**2024-03-27-negation-2**

- 8 × framed by its instruction: `items[1]`, `items[2]`, `items[4]`, `items[6]`, `items[9]`, `items[11]`, `items[12]`, `items[15]`

**2024-03-26-location-adverbs**

- 3 × framed by its instruction: `items[2]`, `items[5]`, `items[10]`

**2024-03-24-everyday-nouns**

- 2 × framed by its instruction: `items[5]`, `items[22]`

**2024-04-02-unit-4-exam**

- 1 × framed by its instruction: `items[0]`
- 6 × framed by a context note: `items[1]`, `items[6]`, `items[8]`, `items[10]`, `items[14]`, `items[40]`

**2024-04-08-comparisons**

- 8 × framed by its instruction: `items[0]`, `items[1]`, `items[3]`, `items[4]`, `items[5]`, `items[6]`, `items[7]`, `items[12]`

**2024-04-07-comparisons-slang**

- 19 × framed by its instruction: `items[0]`, `items[1]`, `items[2]`, `items[3]`, `items[4]`, `items[5]`, `items[6]`, `items[7]`, `items[8]`, `items[9]`, `items[10]`, `items[11]`, `items[12]`, `items[13]`, `items[14]`, `items[15]`, `items[16]`, `items[17]`, `items[18]`

**2024-04-09-conditionals**

- 7 × framed by its instruction: `items[2]`, `items[3]`, `items[8]`, `items[9]`, `items[14]`, `items[15]`, `items[19]`

**2024-04-16-would-conditionals**

- 7 × framed by its instruction: `items[0]`, `items[1]`, `items[4]`, `items[7]`, `items[10]`, `items[13]`, `items[16]`

**2024-04-04-aimer**

- 10 × framed by its instruction: `items[2]`, `items[3]`, `items[8]`, `items[9]`, `items[13]`, `items[15]`, `items[16]`, `items[17]`, `items[18]`, `items[19]`

**2024-04-10-etre-past**

- 5 × framed by its instruction: `items[2]`, `items[3]`, `items[10]`, `items[11]`, `items[15]`

**2024-04-05-avoir-past**

- 11 × framed by its instruction: `items[2]`, `items[3]`, `items[8]`, `items[9]`, `items[12]`, `items[13]`, `items[15]`, `items[16]`, `items[17]`, `items[18]`, `items[19]`

**2024-04-11-food-nouns**

- 3 × framed by its instruction: `items[2]`, `items[6]`, `items[23]`

**2024-04-12-manger**

- 12 × framed by its instruction: `items[2]`, `items[3]`, `items[8]`, `items[9]`, `items[12]`, `items[13]`, `items[14]`, `items[17]`, `items[18]`, `items[20]`, `items[23]`, `items[25]`

**2024-04-06-boire**

- 13 × framed by its instruction: `items[2]`, `items[3]`, `items[8]`, `items[9]`, `items[12]`, `items[13]`, `items[14]`, `items[17]`, `items[18]`, `items[20]`, `items[24]`, `items[26]`, `items[27]`

**2024-04-14-unit-5-exam**

- 12 × framed by a context note: `items[2]`, `items[3]`, `items[12]`, `items[15]`, `items[20]`, `items[23]`, `items[28]`, `items[33]`, `items[37]`, `items[42]`, `items[56]`, `items[69]`
- 5 × framed by its instruction: `items[6]`, `items[7]`, `items[8]`, `items[9]`, `items[10]`

**2024-04-20-dire**

- 4 × framed by its instruction: `items[1]`, `items[4]`, `items[13]`, `items[18]`

**2024-04-22-prendre**

- 4 × framed by its instruction: `items[1]`, `items[4]`, `items[24]`, `items[25]`

**2024-10-22-donner**

- 7 × framed by its instruction: `items[1]`, `items[5]`, `items[8]`, `items[10]`, `items[11]`, `items[17]`, `items[18]`

**2024-04-21-mettre**

- 5 × framed by its instruction: `items[1]`, `items[4]`, `items[19]`, `items[20]`, `items[21]`

**2024-04-19-demander**

- 3 × framed by its instruction: `items[1]`, `items[4]`, `items[14]`

**2024-04-18-commander**

- 3 × framed by its instruction: `items[1]`, `items[4]`, `items[13]`

**2024-04-17-besoin**

- 1 × framed by its instruction: `items[6]`

**2024-04-26-unit-6-exam**

- 10 × framed by a context note: `items[4]`, `items[7]`, `items[17]`, `items[19]`, `items[20]`, `items[27]`, `items[31]`, `items[39]`, `items[41]`, `items[48]`

**2024-05-05-on-and-people**

- 3 × framed by its instruction: `items[0]`, `items[4]`, `items[6]`

**2024-05-09-studying-verbs**

- 1 × framed by a context note: `items[2]`

**2024-05-04-learning-verbs**

- 1 × framed by a context note: `items[1]`

**2024-05-02-discourse-markers**

- 5 × framed by its instruction: `items[0]`, `items[2]`, `items[3]`, `items[4]`, `items[5]`

**2024-05-10-unit-7-exam**

- 17 × framed by a context note: `items[0]`, `items[1]`, `items[2]`, `items[3]`, `items[4]`, `items[7]`, `items[9]`, `items[11]`, `items[13]`, `items[16]`, `items[19]`, `items[20]`, `items[21]`, `items[22]`, `items[26]`, `items[27]`, `items[58]`
- 2 × framed by its instruction: `items[44]`, `items[45]`

**2024-05-23-temporal-words**

- 5 × framed by its instruction: `items[0]`, `items[3]`, `items[4]`, `items[5]`, `items[11]`

**2024-05-22-s-appeler**

- 3 × framed by its instruction: `items[1]`, `items[4]`, `items[5]`

**2024-05-19-morning-routine**

- 1 × framed by its instruction: `items[2]`

**2024-05-17-getting-ready**

- 2 × framed by its instruction: `items[3]`, `items[5]`
- 1 × framed by a context note: `items[4]`

**2024-05-16-daily-reflexives**

- 3 × framed by its instruction: `items[1]`, `items[3]`, `items[5]`

**2024-06-07-reflexive-past**

- 3 × framed by its instruction: `items[0]`, `items[3]`, `items[4]`

**2024-06-06-reciprocal-reflexives**

- 3 × framed by its instruction: `items[1]`, `items[2]`, `items[5]`

**2024-05-13-commands-tu**

- 6 × framed by its instruction: `items[0]`, `items[1]`, `items[2]`, `items[3]`, `items[4]`, `items[5]`

**2024-05-14-commands-vous**

- 4 × framed by its instruction: `items[0]`, `items[1]`, `items[2]`, `items[3]`

**2024-05-18-irregular-commands**

- 6 × framed by its instruction: `items[0]`, `items[1]`, `items[2]`, `items[3]`, `items[4]`, `items[5]`

**2024-05-12-commands-pronouns**

- 5 × framed by its instruction: `items[0]`, `items[1]`, `items[2]`, `items[3]`, `items[4]`

**2024-05-24-unit-8-exam**

- 7 × framed by a context note: `items[14]`, `items[21]`, `items[22]`, `items[24]`, `items[26]`, `items[30]`, `items[32]`
- 6 × framed by its instruction: `items[35]`, `items[36]`, `items[37]`, `items[38]`, `items[39]`, `items[40]`

**2024-06-09-unit-9-exam**

- 17 × framed by a context note: `items[0]`, `items[1]`, `items[2]`, `items[3]`, `items[4]`, `items[5]`, `items[15]`, `items[17]`, `items[21]`, `items[25]`, `items[26]`, `items[27]`, `items[28]`, `items[30]`, `items[31]`, `items[33]`, `items[34]`

**2024-01-23-common-special-forms-1**

- 8 × framed by its instruction: `items[0]`, `items[1]`, `items[2]`, `items[3]`, `items[4]`, `items[5]`, `items[6]`, `items[7]`

**2024-01-24-common-special-forms-2**

- 10 × framed by its instruction: `items[0]`, `items[1]`, `items[2]`, `items[3]`, `items[4]`, `items[5]`, `items[6]`, `items[7]`, `items[8]`, `items[9]`

**2024-01-28-necessity-phrases**

- 7 × framed by its instruction: `items[0]`, `items[1]`, `items[2]`, `items[3]`, `items[4]`, `items[5]`, `items[6]`

**2024-02-07-wish-phrases**

- 6 × framed by its instruction: `items[0]`, `items[1]`, `items[2]`, `items[3]`, `items[4]`, `items[5]`

**2024-01-25-emotion-phrases**

- 6 × framed by its instruction: `items[0]`, `items[1]`, `items[2]`, `items[3]`, `items[4]`, `items[5]`

**2024-01-29-opinion-phrases**

- 6 × framed by its instruction: `items[0]`, `items[1]`, `items[2]`, `items[3]`, `items[4]`, `items[5]`

**2024-01-27-hypothetical-phrases**

- 6 × framed by its instruction: `items[0]`, `items[1]`, `items[2]`, `items[3]`, `items[4]`, `items[5]`

**2024-01-30-past-regret-phrases**

- 6 × framed by its instruction: `items[0]`, `items[1]`, `items[2]`, `items[3]`, `items[4]`, `items[5]`

**2024-01-26-had-already-phrases**

- 6 × framed by its instruction: `items[0]`, `items[1]`, `items[2]`, `items[3]`, `items[4]`, `items[5]`

**2024-01-22-common-adverbs**

- 6 × framed by its instruction: `items[0]`, `items[1]`, `items[2]`, `items[4]`, `items[5]`, `items[6]`

**2024-02-06-while-doing-phrases**

- 6 × framed by its instruction: `items[0]`, `items[1]`, `items[2]`, `items[3]`, `items[4]`, `items[5]`

**2024-02-02-service-phrases**

- 6 × framed by its instruction: `items[0]`, `items[1]`, `items[2]`, `items[3]`, `items[4]`, `items[5]`

**2024-01-21-before-phrases**

- 5 × framed by its instruction: `items[0]`, `items[1]`, `items[2]`, `items[3]`, `items[4]`

**2024-02-03-so-that-phrases**

- 5 × framed by its instruction: `items[0]`, `items[1]`, `items[2]`, `items[3]`, `items[4]`

**2024-01-20-although-phrases**

- 5 × framed by its instruction: `items[0]`, `items[1]`, `items[2]`, `items[3]`, `items[4]`

**2024-01-31-possibility-phrases**

- 6 × framed by its instruction: `items[0]`, `items[1]`, `items[2]`, `items[3]`, `items[4]`, `items[5]`

**2024-02-04-unit-10-exam**

- 1 × framed by a context note: `items[11]`

**2024-02-08-age-personal-info**

- 10 × framed by its instruction: `items[0]`, `items[1]`, `items[2]`, `items[3]`, `items[4]`, `items[5]`, `items[6]`, `items[7]`, `items[8]`, `items[9]`

**2024-02-10-donner**

- 1 × framed by a context note: `items[1]`
- 1 × framed by its instruction: `items[11]`

**2024-05-15-daily-actions-1**

- 2 × framed by a context note: `items[1]`, `items[5]`
- 1 × framed by its instruction: `items[10]`

**2024-02-13-search-and-find**

- 1 × framed by a context note: `items[1]`
- 3 × framed by its instruction: `items[9]`, `items[10]`, `items[13]`

**2024-02-11-perception-verbs**

- 2 × framed by a context note: `items[1]`, `items[5]`
- 2 × framed by its instruction: `items[12]`, `items[13]`

**2024-02-14-social-situations**

- 2 × framed by a context note: `items[1]`, `items[8]`

**2024-02-09-directions-navigation**

- 1 × framed by a context note: `items[1]`
- 2 × framed by its instruction: `items[10]`, `items[11]`

**2024-02-15-unit-11-exam**

- 42 × framed by its instruction: `items[1]`, `items[2]`, `items[3]`, `items[4]`, `items[5]`, `items[6]`, `items[7]`, `items[8]`, `items[9]`, `items[10]`, `items[12]`, `items[13]`, `items[15]`, `items[16]`, `items[18]`, `items[19]`, `items[20]`, `items[21]`, `items[22]`, `items[23]`, `items[24]`, `items[25]`, `items[26]`, `items[27]`, `items[28]`, `items[29]`, `items[30]`, `items[31]`, `items[32]`, `items[33]`, `items[34]`, `items[35]`, `items[36]`, `items[37]`, `items[38]`, `items[39]`, `items[40]`, `items[41]`, `items[42]`, `items[43]`, `items[44]`, `items[45]`

**2024-03-16-movement-verbs**

- 2 × framed by a context note: `items[1]`, `items[8]`
- 1 × framed by its instruction: `items[18]`

**2024-03-17-natural-phenomena**

- 2 × framed by its instruction: `items[5]`, `items[6]`

**2024-03-15-questce-qui-que**

- 16 × framed by its instruction: `items[0]`, `items[1]`, `items[2]`, `items[3]`, `items[4]`, `items[5]`, `items[6]`, `items[7]`, `items[8]`, `items[9]`, `items[10]`, `items[11]`, `items[12]`, `items[13]`, `items[14]`, `items[15]`

**2024-03-19-pourquoi-complex**

- 2 × framed by its instruction: `items[12]`, `items[13]`

**2024-03-20-comment-complex**

- 3 × framed by its instruction: `items[13]`, `items[14]`, `items[15]`

**2024-03-16-quiest-qui-que**

- 15 × framed by its instruction: `items[0]`, `items[1]`, `items[2]`, `items[3]`, `items[4]`, `items[5]`, `items[6]`, `items[7]`, `items[8]`, `items[9]`, `items[10]`, `items[11]`, `items[12]`, `items[13]`, `items[14]`

**2024-03-22-inversion-questions**

- 15 × framed by its instruction: `items[0]`, `items[1]`, `items[2]`, `items[3]`, `items[4]`, `items[5]`, `items[6]`, `items[7]`, `items[8]`, `items[9]`, `items[10]`, `items[11]`, `items[12]`, `items[13]`, `items[14]`

**2024-03-23-embedded-questions**

- 2 × framed by its instruction: `items[13]`, `items[14]`

**2024-03-24-rhetorical-negative**

- 7 × framed by its instruction: `items[1]`, `items[5]`, `items[6]`, `items[7]`, `items[8]`, `items[9]`, `items[11]`

## Passage words with no pop-up

Each word below appears in the reading’s passage and has no dictionary entry (src/data/dictionary/), no row in the reading’s glossary or vocabulary table, and is not a name in curriculum-graph/languages/fr/names.json. Each needs one of the three, so every word a learner taps opens a pop-up.

**2024-04-13-reading-5**

- 5 words: boisson, favorite, fées, vertes, Terrasse

**2024-02-12-reading-11**

- 1 word: tram

## Estimates to confirm

The source sets no value, so the conversion wrote an estimate.

**2026-11-24-negation-guide**

- `minutes` 3 minutes for three parts (L sets Cognates 4, Liaison 4, Questions 5, Verb Patterns 6)

## Hand edits kept

The module file differs from a fresh conversion of an unchanged source here. A rerun keeps the file.

**2024-01-01-pronouns**

- `concepts[3].example` "On va au café (We're going to the café) - uses il/elle verb forms, not nous forms" → "On means 'we' when friends talk, or 'people' in general. It takes the same verb form as il and elle."

**2024-01-02-etre**

- `concepts` "["id":"c-etre-to-be","term":"être = to be","definition":"The most important verb. Describes states and identity.","example":"Express: I am, you are, he is, she is, we are, they are","id":"c-conjugation-pattern","term":"Conjugation Pattern","definition":"Each pronoun gets a unique verb form - you must memorize all 8 to communicate who is doing what!","example":"je suis, tu es, il est, elle est, nous sommes, vous êtes, ils sont, elles sont","id":"c-practical-usage","term":"Practical Usage","definition":"Use with adjectives: \"I am happy\" or professions: \"I am a student\", or locations: \"I am in Paris\"","example":"Je suis heureux (I am happy), Je suis étudiant (I am a student), Je suis à Paris (I am in Paris)"]" → "["id":"c-etre-to-be","term":"être = to be","definition":"The most important verb. Describes states and identity.","example":"Express: I am, you are, he is, she is, we are, they are","id":"c-conjugation-pattern","term":"Conjugation Pattern","definition":"Each pronoun gets a unique verb form - you must memorize all 8 to communicate who is doing what!","example":"je suis, tu es, il est, elle est, nous sommes, vous êtes, ils sont, elles sont","id":"c-practical-usage","term":"Practical Usage","definition":"Use it with an adjective, as in \"I am happy\", or with your name, as in \"I am Paul\".","example":"Je suis heureux (I am happy), Il est heureux (he is happy), Je suis Paul (I am Paul), Tu es bon ! (you're good!)","id":"c-at-the-cafe","term":"At the café","definition":"With the words from the first lesson, you can already answer a waiter.","example":"Bonjour ! Café ? (Hello! Coffee?) Oui, merci ! (Yes, thanks!)"]"

**2024-10-21-cognates-help**

- `parts[4].text[0]` "Every French noun is masculine or feminine, so learn each cognate with its article, un or une. French does not drop the article the way English does in “I want coffee”." → "Every French noun is masculine or feminine, so learn each cognate with its article, un or une. French does not drop the article the way English does in “Coffee is good”."
- `parts[4].blocks[0].lines[0][0]` "Je veux un café." → "J'ai un café."
- `parts[4].blocks[0].lines[0][1]` "I want a coffee." → "I have a coffee."
- `parts[4].blocks[0].lines[1][0]` "Je veux du café." → "Le café est bon."
- `parts[4].blocks[0].lines[1][1]` "I want some coffee." → "Coffee is good."

**2024-01-06-basic-nouns**

- `concepts[1].definition` "Combine nouns with verbs you already know from M2-M3" → "Combine nouns with être and avoir, the verbs you already know"
- `items[0].hint` "Combine avoir (M3) + article (M4) + noun - all previous modules!" → "Combine avoir + article + noun - all from earlier lessons!"

**2024-01-07-plurals**

- `concepts[0].example` "chat → chats, livre → livres, ami → amis" → "chat → chats, livre → livres, ami → amis; c'est un livre (it's a book) → ce sont des livres (they're books)"
- `concepts[2].definition` "Every exercise combines plurals with verbs from M2-M3" → "Every exercise combines plurals with être and avoir"

**2024-01-10-unit1-practice**

- `title` "Unit 1 Practice - Fill in the Blanks" → "Essential Grammar Practice - Fill in the Blanks"
- `description` "Complete sentences using everything you've learned in Unit 1. Fill in the blanks to create correct French sentences!" → "Complete sentences using everything you've learned in this unit. Fill in the blanks to create correct French sentences!"
- `can_do[2]` "Apply everything from Unit 1 in context" → "Apply everything from this unit in context"

**2026-11-24-negation-guide**

- `checks` "[]" → "["id":"k1","ask":"Which one means “I don't have a cat”?","options":["text":"Je n'ai pas de chat.","fr":true,"right":true,"text":"Je n'ai pas un chat.","fr":true,"text":"Je ne ai pas de chat.","fr":true],"why":"After pas, un becomes de, and ne becomes n' before a vowel: Je n'ai pas de chat.","id":"k2","ask":"Which one means “You aren't a child”?","options":["text":"Tu ne pas es un enfant.","fr":true,"text":"Tu n'es pas un enfant.","fr":true,"right":true,"text":"Tu n'es pas d'enfant.","fr":true],"why":"ne goes before the verb and pas after it. After être, un stays as it is: Tu n'es pas un enfant.","id":"k3","ask":"Which one means “I don't have a car anymore”?","options":["text":"Je n'ai jamais de voiture.","fr":true,"text":"Je n'ai pas de voiture.","fr":true,"text":"Je n'ai plus de voiture.","fr":true,"right":true],"why":"plus takes the place of pas and means anymore."]"

**2024-01-13-ca-survival**

- `items[1].hint` "Combine: it is + that (using être from M3)" → "Combine: it is + that (using être)"

**2024-01-15-vouloir**

- `concepts[0].example` "'I want that' (Je veux ça), 'Do you want a book?' (Veux-tu un livre?), 'We want to have a house' (Nous voulons avoir une maison)" → "'I want that' (Je veux ça), 'Do you want a book?' (Veux-tu un livre ?), 'We want to have a house' (Nous voulons avoir une maison), 'How are you? Do you want a coffee?' (Ça va ? Tu veux un café ?)"

**2024-01-17-voir**

- `concepts[0].example` "Very common! Essential for object pronouns in next module" → "Very common, often after vouloir: je veux voir (I want to see). The next lesson uses it with object pronouns."
- `concepts[3].example` "Foundation for: je le vois, je la vois, je les vois" → "Foundation for: je le vois, je la vois, je les vois, je te vois (I see you)"

**2024-01-18-questions**

- `vocabulary[11].word_id` "ca-va-fr.question-2" → "ca-va-fr.question"
- `concepts[6].example` "Que fais-tu? (what do you do?) vs Tu fais quoi? (you do what?) vs Quoi? (what?!)" → "Que veux-tu? (what do you want?) vs Tu veux quoi? (you want what?) vs Quoi? (what?!)"

**2024-01-19-questions-help**

- `parts[1].blocks[1].lines` "[["Où est-ce que tu es ?","Where are you?"],["Quand est-ce que tu viens ?","When are you coming?"]]" → "[["Où est-ce que tu es ?","Where are you?"],["Quand est-ce que tu veux un café ?","When do you want a coffee?"],["Qu'est-ce que c'est ?","What is it?"],["Qu'est-ce que tu vois ?","What do you see?"],["Combien de livres est-ce que tu as ?","How many books do you have?"]]"
- `parts[2].blocks[0].rise[0].fr` "Tu viens ce soir." → "Tu veux un café."
- `parts[2].blocks[0].rise[0].en` "You are coming tonight." → "You want a coffee."
- `parts[2].blocks[0].rise[1].fr` "Tu viens ce soir ?" → "Tu veux un café ?"
- `parts[2].blocks[0].rise[1].en` "Are you coming tonight?" → "Do you want a coffee?"
- `parts[3].blocks[0].flip[0].fr` "Tu es prêt." → "Tu es fatigué."
- `parts[3].blocks[0].flip[0].en` "You are ready." → "You are tired."
- `parts[3].blocks[0].flip[0].parts[2][0]` "prêt" → "fatigué"
- `parts[3].blocks[0].flip[1].fr` "Es-tu prêt ?" → "Es-tu fatigué ?"
- `parts[3].blocks[0].flip[1].en` "Are you ready?" → "Are you tired?"
- `parts[3].blocks[0].flip[1].parts[3][0]` "prêt ?" → "fatigué ?"
- `checks[1].say` "Tu viens ce soir ?" → "Tu veux un café ?"
- `checks[1].show` "Tu viens ce soir ?" → "Tu veux un café ?"
- `checks[2].id` "k3" → "k3-fatigue"
- `checks[2].options[0].text` "Tu es prêt ?" → "Tu es fatigué ?"
- `checks[2].options[1].text` "Es-tu prêt ?" → "Es-tu fatigué ?"
- `checks[2].options[2].text` "Est-ce que tu es prêt ?" → "Est-ce que tu es fatigué ?"
- `checks[2].why` "The verb comes first, joined to tu with a hyphen: Es-tu prêt ?" → "The verb comes first, joined to tu with a hyphen: Es-tu fatigué ?"

**2024-01-22-reading2**

- `title` "Reading Comprehension 2 - Rendez-vous en Normandie" → "Reading Comprehension - Rendez-vous en Normandie"
- `description` "An exciting trip through beautiful Normandy! Explore famous places using vocabulary from Units 1 & 2." → "An exciting trip through beautiful Normandy! Explore famous places with the words you know so far."

**2024-01-23-unit2-practice**

- `title` "Unit 2 Practice - Fill in the Blanks" → "Asking & Describing Practice - Fill in the Blanks"
- `description` "Complete sentences using demonstratives, questions, prepositions, and adjectives from Unit 2!" → "Complete sentences using demonstratives, questions, prepositions, and adjectives from this unit!"
- `can_do[2]` "Apply Unit 2 vocabulary in realistic contexts" → "Apply this unit's vocabulary in realistic contexts"
- `items[1].text` "J'ai ___ voiture." → "J'ai ___ belle voiture."
- `items[1].gloss` "'I have this car' (feminine)" → "'I have this beautiful car' (feminine)"
- `items[15].text` "Nous ___ le livre." → "Nous ___ le nouveau livre."
- `items[15].gloss` "We want the book" → "We want the new book"
- `items[16].text` "Elle ___ cette maison." → "Elle ___ cette petite maison."
- `items[16].gloss` "She sees this house" → "She sees this little house"

**2024-01-24-unit2-exam**

- `description` "Test everything from Unit 2! Demonstratives, essential verbs (vouloir/pouvoir/voir), questions, stressed pronouns, prepositions, and descriptive sentences." → "Test everything from this unit! Demonstratives, essential verbs (vouloir/pouvoir/voir), questions, stressed pronouns, prepositions, and descriptive sentences."
- `items[32].mistakes` "["answer":"elles sont à Ladurée","feedback":"That's acceptable but 'chez' is more natural for shops/businesses - use 'chez Ladurée'"]" → "(removed)"

**2024-01-25-contractions**

- `concepts[2].example` "du pain (some bread), de la viande (some meat), de l'eau (some water)" → "du café (some coffee), de la musique (some music), des livres (some books)"
- `concepts[3].example` "de l'ami (of the friend), à l'école (at the school)" → "de l'ami (of the friend), à l'hôtel (at the hotel)"

**2024-01-27-aller**

- `concepts[0].example` "'I am going in the house' (Je vais dans la maison), 'I am going to eat' (Je vais manger)" → "'I am going in the house' (Je vais dans la maison), 'I am going to see Paul' (Je vais voir Paul)"
- `concepts[2].definition` "Combine aller with previous modules for infinite expressions. For example, to say 'I am going to leave' you can say 'je vais partir'." → "Combine aller with previous modules for infinite expressions. For example, to say 'I am going to come' you can say 'je vais venir'."
- `concepts[2].example` "je vais + ça, nous allons + être, ils vont + avoir" → "je vais + ça, nous allons + être, ils vont + avoir, tu vas + me voir"
- `items[19].accept` "["qu'est-ce que tu as?"]" → "(removed)"

**2024-01-28-verb-pattern-help**

- `parts[3].note` "The -ent is written but never spoken. In writing, it tells you that several people are doing something. It can change how the letters before it sound, so ils veulent sounds a little different from il veut." → "The -ent is written but not spoken. In writing, it tells you that several people are doing something. It can change how the letters before it sound, so ils veulent sounds a little different from il veut."
- `parts[7].blocks[0].list[2]` "Most verbs you meet next follow these patterns, starting with partir in the next lesson." → "Most verbs you meet next follow these patterns, starting with the verb for 'to leave' in the next lesson."
- `checks[1].why` "The -ent is written but never spoken." → "The -ent is written but not spoken."

**2024-01-31-possessive-adjectives**

- `concepts[2].example` "INFORMAL with friends/family: ton/ta/tes (ton frère, ta sœur, tes amis). FORMAL with strangers/respect: votre/vos (votre bureau, vos bagages)" → "INFORMAL with friends/family: ton/ta/tes (ton ami, ta maison, tes livres). FORMAL with strangers/respect: votre/vos (votre maison, vos amis)"
- `concepts[3].example` "NOTRE/NOS (our): notre maison, notre jardin, nos enfants. VOTRE/VOS (your formal): votre livre, votre famille, vos idées. LEUR/LEURS (their): leur chat, leur maison, leurs amis" → "NOTRE/NOS (our): notre maison, notre ami, nos enfants. VOTRE/VOS (your formal): votre livre, votre famille, vos idées. LEUR/LEURS (their): leur chat, leur maison, leurs amis"

**2024-02-02-combining**

- `items[9].hint` "Combine vouloir from M12 + object pronoun BEFORE verb" → "Combine vouloir + object pronoun BEFORE verb"
- `items[10].hint` "Combine venir (M17) + avec (M14) + moi" → "Combine venir + avec + moi"
- `items[11].hint` "Combine aller (M18) + partir infinitive (M19) - future construction!" → "Combine aller + partir infinitive - future construction!"

**2024-02-03-reading3**

- `title` "Reading Comprehension 3 - La Première Page" → "Reading Comprehension - La Première Page"

**2024-02-04-unit3-practice**

- `title` "Unit 3 Practice - Fill in the Blanks" → "Movement & Possession Practice - Fill in the Blanks"
- `description` "Master contractions, motion verbs, object pronouns, and possessive forms from Unit 3!" → "Master contractions, motion verbs, object pronouns, and possessive forms from this unit!"
- `can_do[2]` "Apply Unit 3 advanced structures in context" → "Apply this unit's advanced structures in context"
- `items[4].text` "Nous ___ demain." → "Nous ___ avec Paul."
- `items[4].gloss` "We leave tomorrow" → "We leave with Paul"
- `items[14].text` "Elle ___ ___ magasin." → "Elle ___ ___ café."
- `items[14].gloss` "'She comes from the store' (use contraction)" → "'She comes from the café' (use contraction)"

**2024-02-05-unit3-exam**

- `description` "Test everything from Unit 3! Motion verbs, object pronouns, possessives, and complex sentence combinations." → "Test everything from this unit! Motion verbs, object pronouns, possessives, and complex sentence combinations."

**2024-03-29-parler**

- `concepts[4].example` "je parle français (I speak French), nous parlons de toi (we talk about you)" → "je parle français maintenant (I speak French now), nous parlons de toi (we talk about you)"

**2024-10-22-search-find**

- `concepts[0].example` "je cherche mes clés (I'm looking for my keys), tu cherches quoi? (what are you looking for?)" → "je cherche mon livre (I'm looking for my book), tu cherches quoi? (what are you looking for?)"

**2024-03-27-negation-2**

- `concepts[1].example` "je vais → je ne vais jamais (I never go)" → "je vais → je ne vais jamais (I never go), je mange toujours ici → je ne mange jamais ici (I never eat here)"

**2024-03-26-location-adverbs**

- `concepts[3].example` "je vais là (I go there), il est ici (he is here)" → "je vais là (I go there), il est ici (he is here), demain, il est là-bas (tomorrow he is over there)"

**2024-03-24-everyday-nouns**

- `concepts` "["id":"c-abstract-vs-concrete-nouns","term":"Abstract vs Concrete Nouns","definition":"Abstract nouns (temps, vie, monde) express ideas. Concrete nouns (pain, eau, table) are physical objects.","example":"la vie (life - abstract), le pain (bread - concrete)","id":"c-using-in-real-conversations","term":"Using in Real Conversations","definition":"These are the nouns you'll use constantly in French - combine with verbs you know!","example":"je veux du pain, j'ai le temps, il parle du monde","id":"c-remember-the-gender","term":"Remember the Gender!","definition":"Always learn the article with the noun - it shows the gender","example":"le temps (masculine), la vie (feminine)"]" → "["id":"c-abstract-vs-concrete-nouns","term":"Abstract vs Concrete Nouns","definition":"Abstract nouns (temps, vie, monde) express ideas. Concrete nouns (pain, eau, table) are physical objects.","example":"la vie (life - abstract), le pain (bread - concrete)","id":"c-using-in-real-conversations","term":"Using in Real Conversations","definition":"These are the nouns you'll use constantly in French - combine with verbs you know!","example":"je veux du pain, j'ai le temps, il parle du monde","id":"c-remember-the-gender","term":"Remember the Gender!","definition":"Always learn the article with the noun - it shows the gender","example":"le temps (masculine), la vie (feminine)","id":"c-pas-de","term":"pas de: no, not any","definition":"After ne … pas, un, une, des, du, de la and de l' usually become de, or d' before a vowel. le, la and les stay as they are. After être they stay: ce n'est pas un livre.","example":"J'ai du pain. becomes Je n'ai pas de pain. (I don't have any bread.)"]"

**2024-03-30-reading-4**

- `title` "Reading Comprehension 4 - La nouvelle époque de Marie" → "Reading Comprehension - La nouvelle époque de Marie"
- `description` "Unit 4 mastery! A natural conversation using all your vocabulary." → "A natural conversation using all your vocabulary."
- `items[16]` "(none)" → ""id":"i-travail","type":"comprehension","question":"Why can't Marie go with Paul now?","cue":"Je dois aller au ___","answer":"travail","accept":["au travail","elle doit aller au travail","elle doit travailler"],"hint":"Look at what Marie must do""

**2024-04-03-unit-4-practice**

- `title` "Unit 4 Practice - Fill in the Blanks" → "Everyday Words Practice - Fill in the Blanks"
- `description` "Practice survival phrases, negation, time/location adverbs, and essential verbs from Unit 4!" → "Practice survival phrases, negation, time/location adverbs, and essential verbs from this unit!"
- `items[7].text` "Tu as vu ça ___." → "J'ai trouvé ça ___."
- `items[7].gloss` "You saw that yesterday" → "I found that yesterday"

**2024-04-02-unit-4-exam**

- `description` "Test everything from Unit 4! Survival phrases, essential verbs, negation, and expressing time and place." → "Test everything from this unit! Survival phrases, essential verbs, negation, and expressing time and place."
- `items[35].accept` "["là bas","la-bas","la bas"]" → "["la-bas"]"

**2024-04-12-manger**

- `vocabulary[7].note` "passé composé - avoir + mangé" → "passé composé: avoir + mangé"

**2024-04-13-reading-5**

- `title` "Reading Comprehension 5 - La fée verte (The Green Fairy)" → "Reading Comprehension - La fée verte (The Green Fairy)"
- `description` "Unit 5 mastery! A story about Vincent van Gogh painting his famous 'Café Terrace at Night' in Arles with Paul Gauguin." → "A story about Vincent van Gogh painting his famous 'Café Terrace at Night' in Arles with Paul Gauguin."
- `vocabulary[15].note` ""Unit 5 verb"" → "(removed)"
- `vocabulary[16].note` ""Unit 4 verb"" → "(removed)"
- `vocabulary[17].note` ""Unit 5 verb"" → "(removed)"
- `vocabulary[18].note` ""Unit 2 verb"" → "(removed)"
- `vocabulary[19].note` ""Unit 3 verb"" → "(removed)"
- `vocabulary[20].note` ""Unit 3 verb"" → "(removed)"
- `vocabulary[21].note` ""Unit 3 verb"" → "(removed)"
- `vocabulary[22].note` ""Unit 2 verb"" → "(removed)"
- `vocabulary[23].note` ""Unit 4 verb"" → "(removed)"
- `vocabulary[24].note` ""Unit 4 verb"" → "(removed)"
- `vocabulary[25].note` ""Unit 4 verb"" → "(removed)"
- `vocabulary[26].note` ""Unit 4 verb"" → "(removed)"
- `vocabulary[37].note` "Unit 4 - polite expression" → "polite expression"

**2024-04-15-unit-5-practice**

- `title` "Unit 5 Practice - Fill in the Blanks" → "Time & Taste Practice - Fill in the Blanks"
- `description` "Complete sentences using comparisons, past tense, conditionals, and food vocabulary from Unit 5!" → "Complete sentences using comparisons, past tense, conditionals, and food vocabulary from this unit!"
- `can_do[2]` "Apply Unit 5 sophistication in context" → "Apply this unit's sophistication in context"

**2024-04-14-unit-5-exam**

- `description` "Test everything from Unit 5! Comparisons, slang, past tense, conditionals, and food vocabulary." → "Test everything from this unit! Comparisons, slang, past tense, conditionals, and food vocabulary."

**2024-10-22-donner**

- `concepts` "["id":"c-donner-to-give","term":"donner = to give","definition":"Very common verb for giving things, offering help, providing information","example":"je donne le livre (I give the book), tu donnes ton nom (you give your name)","id":"c-regular-er-conjugation","term":"Regular -er conjugation","definition":"Present tense: je donne, tu donnes, il donne, nous donnons, vous donnez, ils donnent","example":"Regular pattern: donn- + endings (-e, -es, -e, -ons, -ez, -ent)","id":"c-common-uses-of-donner","term":"Common uses of donner","definition":"Giving objects (donner un cadeau), giving information (donner l'adresse), giving help (donner de l'aide)","example":"je donne mon numéro (I give my number), ça donne faim (it makes you hungry)","id":"c-donner-vs-prendre","term":"Donner vs Prendre","definition":"Perfect opposites - donner (to give) and prendre (to take)","example":"je donne le livre à Marie, elle prend le livre (I give the book to Marie, she takes the book)","id":"c-with-prepositions","term":"With prepositions","definition":"Often used with 'à' (to) - donner quelque chose à quelqu'un","example":"je donne le livre à mon ami (I give the book to my friend)"]" → "["id":"c-donner-to-give","term":"donner = to give","definition":"Very common verb for giving things, offering help, providing information","example":"je donne le livre (I give the book), tu donnes ton nom (you give your name)","id":"c-regular-er-conjugation","term":"Regular -er conjugation","definition":"Present tense: je donne, tu donnes, il donne, nous donnons, vous donnez, ils donnent","example":"Regular pattern: donn- + endings (-e, -es, -e, -ons, -ez, -ent)","id":"c-common-uses-of-donner","term":"Common uses of donner","definition":"Giving objects (donner un cadeau), giving information (donner l'adresse), giving help (donner de l'aide)","example":"je donne mon numéro (I give my number), ça donne faim (it makes you hungry)","id":"c-donner-vs-prendre","term":"Donner vs Prendre","definition":"Perfect opposites - donner (to give) and prendre (to take)","example":"je donne le livre à Marie, elle prend le livre (I give the book to Marie, she takes the book)","id":"c-with-prepositions","term":"With prepositions","definition":"Often used with 'à' (to) - donner quelque chose à quelqu'un","example":"je donne le livre à mon ami (I give the book to my friend)","id":"c-ne-rien","term":"ne … rien: nothing","definition":"rien takes the place of pas: ne goes before the verb and rien after it.","example":"Il ne donne rien. (He doesn't give anything.), Je ne vois rien. (I don't see anything.)"]"
- `items[12].hint` "il + ne + donne + pas + anything" → "ne + donne + rien"
- `items[12].mistakes` "(none)" → "["answer":"il ne donne pas","feedback":"For nothing, rien takes the place of pas: il ne donne rien."]"
- `items[12].accept` "["il ne donne pas"]" → "(removed)"

**2024-04-21-mettre**

- `concepts[4].example` "ça met deux heures (it takes two hours), je me mets à travailler (I start working)" → "ça met deux heures (it takes two hours, like ça prend deux heures), je me mets à travailler (I start working), je me mets à apprendre le français (I start learning French)"

**2024-04-18-commander**

- `vocabulary[11].word_id` "vous-commandez-fr.question" → "vous-commandez-fr.are-you-ready"

**2024-04-24-reading-6**

- `title` "Reading Comprehension 6 - Un Voyage en Famille" → "Reading Comprehension - Un Voyage en Famille"
- `description` "A family plans a trip to Paris. Uses Unit 6 vocabulary: progressive tenses, dire, prendre, mettre, demander, commander, besoin." → "A family plans a trip to Paris. Uses this unit's vocabulary: progressive tenses, dire, prendre, mettre, demander, commander, besoin."
- `vocabulary[9].note` ""Unit 5 verb"" → "(removed)"
- `vocabulary[29].note` "feminine; from Unit 4 everyday-nouns" → "feminine"
- `vocabulary[38].note` ""from Unit 6 mettre module"" → "(removed)"
- `vocabulary[39].note` ""from Unit 1"" → "(removed)"
- `vocabulary[48].note` ""from Unit 5 food-nouns"" → "(removed)"
- `vocabulary[49].note` ""from Unit 5 food-nouns"" → "(removed)"
- `vocabulary[51].note` ""Unit 4 time-adverbs"" → "(removed)"
- `vocabulary[53].note` ""Unit 3 voir module"" → "(removed)"
- `vocabulary[55].note` ""from Unit 5 comparisons"" → "(removed)"
- `vocabulary[56].note` "time expression with Unit 6 moment" → "time expression"
- `vocabulary[57].note` ""Unit 4 faire module"" → "(removed)"
- `vocabulary[58].note` "plural adjective from Unit 2" → "plural adjective"
- `vocabulary[60].note` ""from Unit 4 parler"" → "(removed)"
- `vocabulary[65].note` ""from Unit 4 parler"" → "(removed)"
- `vocabulary[67].note` ""from Unit 1 famous-words"" → "(removed)"
- `vocabulary[68].note` "bon from Unit 2 adjectives" → "feminine of bon"
- `vocabulary[69].note` ""Unit 4 time-adverbs"" → "(removed)"
- `vocabulary[70].note` ""Unit 1 avoir module"" → "(removed)"
- `vocabulary[71].note` "from Unit 2 adjectives (beau)" → "feminine of beau"
- `vocabulary[72].note` "superlative from Unit 5" → "superlative"
- `vocabulary[74].note` ""Unit 2 prepositions"" → "(removed)"

**2024-04-27-unit-6-practice**

- `title` "Unit 6 Practice - Fill in the Blanks" → "Basic Fluency Practice - Fill in the Blanks"
- `description` "Complete sentences using progressive tenses, communication verbs, and essential vocabulary from Unit 6!" → "Complete sentences using progressive tenses, communication verbs, and essential vocabulary from this unit!"
- `can_do[2]` "Apply advanced Unit 6 structures in context" → "Apply this unit's advanced structures in context"

**2024-04-26-unit-6-exam**

- `description` "Test everything from Unit 6! Progressive tenses, future forms, communication verbs, and essential vocabulary." → "Test everything from this unit! Progressive tenses, future forms, communication verbs, and essential vocabulary."

**2024-05-05-on-and-people**

- `vocabulary[6].note` "On doit étudier" → "On doit travailler"
- `concepts[0].example` "on va au cinéma (we're going to movies), on dit que (people say that), on ne peut pas (one cannot)" → "on va au cinéma (we're going to movies), on va au restaurant en famille (we're going to a restaurant as a family), on dit que (people say that), on ne peut pas (one cannot)"
- `concepts[5].example` "On apprend en faisant des erreurs (We/One learns by making mistakes), On ne peut pas tout savoir (One can't know everything)" → "On apprend tous les jours (We learn every day), On ne peut pas tout savoir (One can't know everything)"

**2024-05-09-studying-verbs**

- `concepts[2].example` "j'étudie → j'apprends → je comprends → je révise → je sais" → "j'étudie → j'apprends → je comprends → je révise"
- `concepts[3].example` "j'étudie pendant 2 heures (I study for 2 hours - action), j'apprends beaucoup (I learn a lot - result)" → "j'étudie le soir (I study in the evening - action), j'apprends beaucoup (I learn a lot - result)"
- `concepts[4].example` "J'étudie → j'apprends → je comprends → je révise → je sais → je pense → je crois (I study → learn → understand → review → know → think → believe)" → "J'étudie → j'apprends → je comprends → je révise → je pense (I study → learn → understand → review → think). Knowing and believing come in the next lessons."

**2024-05-04-learning-verbs**

- `concepts[0].example` "j'apprends le français (I'm learning French), nous apprenons ensemble (we're learning together)" → "j'apprends le français (I'm learning French), j'apprends beaucoup de mots (I'm learning a lot of words), nous apprenons ensemble (we're learning together)"
- `concepts[3].example` "Il m'enseigne → j'apprends → je comprends → je sais (complete learning cycle!)" → "Il m'enseigne → j'apprends → je comprends (complete learning cycle!)"
- `concepts[4].example` "j'apprends à nager (I'm learning to swim), j'apprends à parler français (I'm learning to speak French)" → "j'apprends à faire du café (I'm learning to make coffee), j'apprends à parler français (I'm learning to speak French)"

**2024-04-29-comprendre**

- `vocabulary[2].word_id` "tu-comprends-fr.you-understand" → "tu-comprends-fr"
- `concepts[3].example` "je comprends le français (I understand French), je comprends Marie (I understand Marie)" → "je comprends le français (I understand French), je comprends Marie (I understand Marie), je comprends la leçon (I understand the lesson)"
- `glosses` "(none)" → "["fr":"compris","en":"understood","note":"past participle of comprendre, like pris: j'ai compris"]"

**2024-05-08-savoir**

- `concepts[0].example` "je sais la réponse (I know the answer), je sais nager (I know how to swim)" → "je sais la réponse (I know the answer), je sais parler anglais (I can speak English)"
- `concepts[3].example` "je sais parler français (I know how to speak French), je sais nager (I can swim)" → "je sais parler français (I know how to speak French), je sais faire du café (I know how to make coffee)"
- `concepts[4].example` "je sais la réponse (I know the answer), je connais Marie (I know Marie) ← next module!" → "je sais la réponse (I know the answer). To know Marie, a person, the next lesson uses another verb."
- `glosses` "(none)" → "["fr":"savais","en":"knew","note":"imparfait of savoir: je ne savais pas"]"

**2024-04-30-connaitre**

- `concepts[0].example` "je connais Marie (I know Marie), je connais Paris (I know/am familiar with Paris)" → "je connais Marie (I know Marie), je connais Paris (I know/am familiar with Paris), Je ne sais pas, je ne connais pas Paris (I don't know, I don't know Paris)"

**2024-05-06-penser**

- `concepts[2].example` "je pense que oui (I think so), je pense que non (I don't think so)" → "je pense que oui (I think so), je pense que non (I don't think so), je pense que je connais Marie (I think I know Marie), je pense qu'il sait parler anglais (I think he can speak English)"

**2024-05-01-croire**

- `glosses` "(none)" → "["fr":"croyais","en":"believed, thought","note":"imparfait of croire: je croyais que…"]"

**2024-05-03-knowledge-nouns**

- `glosses` "(none)" → "["fr":"enchantée","en":"pleased to meet you","note":"feminine of enchanté, said or written by a woman"]"

**2024-05-02-discourse-markers**

- `concepts[5].example` "Bon, on commence? (Well, shall we start?), Alors, tu viens? (So, are you coming?)" → "Bon, on commence? (Well, shall we start?), Alors, tu viens? (So, are you coming?), Alors, tu vas à l'université ? En fait, je n'ai pas de cours aujourd'hui. (So, are you going to the university? Actually, I don't have class today.), Bon, voilà la réponse. (Well, there's the answer.)"

**2024-04-28-comparison-modifiers**

- `glosses` "(none)" → "["fr":"enchantée","en":"pleased to meet you","note":"feminine of enchanté","fr":"études","en":"studies","note":"plural of étude: tes études, your studies","fr":"compris","en":"understood","note":"past participle of comprendre: Paul a compris"]"

**2024-05-07-reading-7**

- `title` "Reading 7 - L'Art d'Apprendre" → "Reading - L'Art d'Apprendre"
- `description` "A philosophical article about learning and education. Uses all cognitive verbs from Unit 7!" → "A philosophical article about learning and education. Uses all cognitive verbs from this unit!"
- `vocabulary[0].note` ""Unit 7 verb"" → "(removed)"
- `vocabulary[2].note` ""Unit 7 verb"" → "(removed)"
- `vocabulary[4].fr` "étudiant(s)" → "étudiant"
- `vocabulary[4].gloss` "student(s)" → "student"
- `vocabulary[4].note` "noun" → "noun; plural étudiants"
- `vocabulary[5].note` ""Unit 7 verb"" → "(removed)"
- `vocabulary[9].note` ""Unit 7 verb"" → "(removed)"
- `vocabulary[12].note` ""Unit 7 verb"" → "(removed)"
- `vocabulary[14].note` ""Unit 7 verb"" → "(removed)"
- `vocabulary[18].note` ""Unit 7 verb"" → "(removed)"
- `vocabulary[20].note` ""Unit 7 verb"" → "(removed)"
- `vocabulary[23].note` ""Unit 6 verb"" → "(removed)"
- `vocabulary[25].note` ""Unit 6 verb"" → "(removed)"
- `vocabulary[43].note` "modifier" → "adverb or adjective"
- `vocabulary[55].note` ""Unit 6 verb"" → "(removed)"
- `glossary` "["fr":"étudiant(s)","en":"student(s)","fr":"poser des questions","en":"to ask questions","fr":"demande du temps","en":"takes time"]" → "["fr":"poser des questions","en":"to ask questions","fr":"demande du temps","en":"takes time"]"
- `glosses` "(none)" → "["fr":"étudiante","en":"student (a woman)","note":"feminine of étudiant","fr":"étudiants","en":"students","note":"plural of étudiant","fr":"pose","en":"asks","note":"present of poser: Socrate pose des questions"]"
- `items[2].answer` "demander des questions" → "poser des questions"

**2024-05-11-unit-7-practice**

- `title` "Unit 7 Practice - Fill in the Blanks" → "Knowledge & Learning Practice - Fill in the Blanks"
- `description` "Complete sentences using cognitive verbs, on, discourse markers, and essential vocabulary from Unit 7!" → "Complete sentences using cognitive verbs, on, discourse markers, and essential vocabulary from this unit!"

**2024-05-10-unit-7-exam**

- `description` "Test everything from Unit 7! Cognitive verbs (understand, know, think, believe), on pronoun, discourse markers, and modifiers." → "Test everything from this unit! Cognitive verbs (understand, know, think, believe), on pronoun, discourse markers, and modifiers."

**2024-05-23-temporal-words**

- `concepts` "["id":"c-temporal-prepositions","term":"Temporal Prepositions","definition":"Words that show when or for how long something happens - used with nouns","example":"pendant des heures (for hours), avant le cours (before class), après le dîner (after dinner)","id":"c-sequential-connectors","term":"Sequential Connectors","definition":"Words that show the order of actions - connect sentences smoothly","example":"D'abord, je mange. Ensuite, je pars. Finalement, j'arrive. (First, I eat. Then, I leave. Finally, I arrive.)","id":"c-building-smooth-narratives","term":"Building Smooth Narratives","definition":"Use these words to tell stories and describe routines naturally","example":"Before: 'Je mange. Je pars.' (choppy) After: 'D'abord, je mange. Ensuite, je pars.' (smooth!)","id":"c-position-in-sentence","term":"Position in Sentence","definition":"Sequential connectors usually start sentences. Prepositions go before nouns.","example":"D'abord, je pars (First, I leave). Je pars après le cours (I leave after class)."]" → "["id":"c-temporal-prepositions","term":"Temporal Prepositions","definition":"Words that show when or for how long something happens - used with nouns","example":"pendant des heures (for hours), avant le cours (before class), après le travail (after work); Après le travail, je bois un café (After work, I have a coffee)","id":"c-time-phrases","term":"Time Phrases","definition":"Short phrases that say when or how often","example":"une fois (once), cette année (this year), en ce moment (right now)","id":"c-sequential-connectors","term":"Sequential Connectors","definition":"Words that show the order of actions - connect sentences smoothly","example":"D'abord, je mange. Ensuite, je pars. Finalement, j'arrive. (First, I eat. Then, I leave. Finally, I arrive.)","id":"c-building-smooth-narratives","term":"Building Smooth Narratives","definition":"Use these words to tell stories and describe routines naturally","example":"Before: 'Je mange. Je pars.' (choppy) After: 'D'abord, je mange. Ensuite, je pars.' (smooth!)","id":"c-position-in-sentence","term":"Position in Sentence","definition":"Sequential connectors usually start sentences. Prepositions go before nouns.","example":"D'abord, je pars (First, I leave). Je pars après le cours (I leave after class)."]"

**2024-05-21-reflexive-pronouns**

- `items[3].instruction` "Which reflexive pronoun goes with 'elle'?" → "Which reflexive pronoun goes with 'elle'? The sentence means "her name is Marie"."
- `items[3].shown` "elle ... habille (she gets dressed)" → "elle ... appelle Marie"
- `items[6].instruction` "Which reflexive pronoun goes with 'ils'?" → "Which reflexive pronoun goes with 'ils'? The sentence means "they meet up"."
- `items[6].shown` "ils ... amusent (they have fun)" → "ils ... retrouvent"

**2024-05-22-s-appeler**

- `concepts[0].example` "Je m'appelle Marie (I call myself Marie = My name is Marie), Comment tu t'appelles? (What do you call yourself? = What's your name?)" → "Je m'appelle Marie (I call myself Marie = My name is Marie), Comment tu t'appelles? (What do you call yourself? = What's your name?), Mon frère s'appelle Paul (My brother's name is Paul)"
- `concepts[1].term` "This should've been in Unit 1!" → "The Most Basic Introduction"

**2024-05-17-getting-ready**

- `vocabulary[1].word_id` "je-me-lave-fr.i-wash-myself" → "je-me-lave-fr"
- `concepts[2].example` "je me prépare pour le cours (I get ready for class), on se prépare (we get ready)" → "je me prépare pour le cours (I get ready for class), je me prépare tôt le matin (I get ready early in the morning), on se prépare (we get ready)"

**2024-05-16-daily-reflexives**

- `concepts[2].example` "je me dépêche (I'm hurrying), dépêche-toi! (hurry up!)" → "je me dépêche (I'm hurrying), je me dépêche, je suis en retard (I'm hurrying, I'm late), dépêche-toi! (hurry up!)"

**2024-06-07-reflexive-past**

- `concepts[3].example` "Ce matin, je me suis réveillé à 7h. Ensuite, je me suis levé. Après, je me suis lavé." → "Ce matin, je me suis réveillé à 7h. Ensuite, je me suis levé. Après, je me suis lavé. J'étais en retard, donc je me suis dépêché."

**2024-05-13-commands-tu**

- `concepts[0].example` "Mange! (Eat!), Parle! (Speak!), Va! (Go!)" → "Mange! (Eat!), Parle! (Speak!), Va! (Go!), Pars tôt! (Leave early!)"
- `concepts[3].example` "To a friend: Mange! (Eat!), Écoute! (Listen!), Viens! (Come!)" → "To a friend: Mange! (Eat!), Écoute! (Listen!), Viens! (Come!), Viens, on est en retard! (Come on, we're late!)"

**2024-05-14-commands-vous**

- `concepts[0].example` "To strangers: Mangez! To a group: Venez! (Come!)" → "To strangers: Mangez! To a group: Venez ! On se voit demain ! (Come! See you tomorrow!)"

**2024-05-18-irregular-commands**

- `vocabulary[0].note` "⭐ être command - tu form" → "⭐ être command, tu form"
- `vocabulary[1].note` "être command - vous form" → "être command, vous form"
- `vocabulary[3].note` "avoir command - tu form" → "avoir command, tu form"
- `vocabulary[4].note` "avoir command - vous form" → "avoir command, vous form"
- `vocabulary[6].note` "⭐ aller command - tu form" → "⭐ aller command, tu form"
- `vocabulary[7].note` "aller command - vous form" → "aller command, vous form"
- `vocabulary[10].note` "faire command - tu form" → "faire command, tu form"
- `vocabulary[11].note` "faire command - vous form" → "faire command, vous form"
- `concepts` "["id":"c-most-common-verbs-irregular","term":"Most Common Verbs = Irregular Commands","definition":"être, avoir, aller, and faire don't follow normal command patterns","example":"Sois gentil! (Be nice!), Aie courage! (Have courage!), Va là-bas! (Go over there!)","id":"c-must-memorize-these","term":"Must Memorize These","definition":"These irregular forms are used constantly - worth memorizing!","example":"Vas-y! (Go ahead! / Go for it!) - extremely common phrase","id":"c-etre-commands","term":"être Commands","definition":"tu: Sois! vous: Soyez! nous: Soyons!","example":"Sois sage! (Be good!), Soyez gentil! (Be kind!)","id":"c-avoir-commands","term":"avoir Commands","definition":"tu: Aie! vous: Ayez! nous: Ayons!","example":"Aie confiance! (Have confidence!), Ayez patience! (Have patience!)","id":"c-aller-commands","term":"aller Commands","definition":"tu: Va! vous: Allez! nous: Allons! Special: Vas-y!","example":"Va là-bas! (Go over there!), Allons-y! (Let's go!), Vas-y! (Go ahead!)","id":"c-faire-commands","term":"faire Commands","definition":"tu: Fais! vous: Faites! nous: Faisons!","example":"Fais attention! (Pay attention! / Be careful!), Faites ça! (Do that!)"]" → "["id":"c-most-common-verbs-irregular","term":"Most Common Verbs = Irregular Commands","definition":"être, avoir, aller, and faire don't follow normal command patterns","example":"Sois gentil! (Be nice!), Aie courage! (Have courage!), Va là-bas! (Go over there!)","id":"c-must-memorize-these","term":"Must Memorize These","definition":"These irregular forms are used constantly, so they are worth memorizing!","example":"Vas-y! (Go ahead! / Go for it!), an extremely common phrase","id":"c-etre-commands","term":"être Commands","definition":"tu: Sois! vous: Soyez! nous: Soyons!","example":"Sois là à six heures! (Be there at six!), Soyez gentil! (Be kind!)","id":"c-avoir-commands","term":"avoir Commands","definition":"tu: Aie! vous: Ayez! nous: Ayons!","example":"Aie confiance! (Have confidence!), N'ayez pas peur! (Don't be afraid!)","id":"c-aller-commands","term":"aller Commands","definition":"tu: Va! vous: Allez! nous: Allons! Special: Vas-y!","example":"Va là-bas! (Go over there!), Allons-y! (Let's go!), Vas-y! (Go ahead!)","id":"c-faire-commands","term":"faire Commands","definition":"tu: Fais! vous: Faites! nous: Faisons!","example":"Fais attention! (Pay attention! / Be careful!), Faites ça! (Do that!)","id":"c-y-there","term":"y: there","definition":"y stands for a place you already named, like au café or chez Paul. In a statement it goes before the verb. In a positive command it goes after the verb, which is where the y in vas-y comes from.","example":"Tu vas au café ? Oui, j'y vais. (Are you going to the café? Yes, I'm going there.)"]"

**2024-05-12-commands-pronouns**

- `can_do` "["Give commands with object pronouns (Give it to me!)","Use pronouns with affirmative and negative commands","Form complex commands like 'Don't do it!' or 'Look at me!'"]" → "["Give commands with object pronouns (Give it to me!)","Use pronouns with affirmative and negative commands","Form complex commands like 'Don't do it!' or 'Look at me!'","Say some or how many with en: j'en veux, j'en ai trois."]"
- `concepts` "["id":"c-affirmative-commands-attach-with","term":"Affirmative Commands: Attach with Hyphens","definition":"In positive commands, pronouns attach to the verb with hyphens","example":"Donne-le! (Give it!), Regarde-moi! (Look at me!), Écoute-le! (Listen to him!)","id":"c-negative-commands-separate-with","term":"Negative Commands: Separate with ne...pas","definition":"In negative commands, pronouns go BEFORE the verb (normal position)","example":"Ne le fais pas! (Don't do it!), Ne me regarde pas! (Don't look at me!)","id":"c-pronoun-order-in-commands","term":"Pronoun Order in Commands","definition":"Object pronouns: le/la/les come first, then moi/toi","example":"Donne-le-moi! (Give it to me! - le before moi), Montre-la-moi! (Show it to me!)"]" → "["id":"c-affirmative-commands-attach-with","term":"Affirmative Commands: Attach with Hyphens","definition":"In positive commands, pronouns attach to the verb with hyphens","example":"Donne-le! (Give it!), Regarde-moi! (Look at me!), Écoute-le! (Listen to him!), Regarde-moi et fais attention! (Look at me and pay attention!), Amuse-toi bien! (Have fun!), Dépêche-toi, habille-toi! (Hurry up, get dressed!)","id":"c-negative-commands-separate-with","term":"Negative Commands: Separate with ne...pas","definition":"In negative commands, pronouns go BEFORE the verb (normal position)","example":"Ne le fais pas! (Don't do it!), Ne me regarde pas! (Don't look at me!)","id":"c-pronoun-order-in-commands","term":"Pronoun Order in Commands","definition":"Object pronouns: le/la/les come first, then moi/toi","example":"Donne-le-moi! (Give it to me! - le before moi), Montre-la-moi! (Show it to me!)","id":"c-en-some","term":"en: some, of them","definition":"en stands for something you already named with du, de la, de l', des or a number. In a statement it goes before the verb. In a positive command it goes after the verb, with a hyphen, like the other pronouns.","example":"Tu veux du café ? Oui, j'en veux. (Do you want some coffee? Yes, I want some.), Prends-en ! (Take some!)"]"

**2024-05-20-reading-8**

- `title` "Reading 8 - Ma Journée" → "Reading - Ma Journée"
- `description` "A story about a typical day. Uses temporal words, reflexive verbs, and all Unit 8 vocabulary!" → "A story about a typical day. Uses temporal words, reflexive verbs, and all this unit's vocabulary!"
- `vocabulary[32].note` "profession" → "a job"
- `glossary` "(none)" → "["fr":"comprenais","en":"understood (was understanding)"]"
- `glosses` "(none)" → "["fr":"comprenais","en":"understood","note":"imparfait of comprendre"]"
- `items[9]` "(none)" → ""id":"i-pense-a-demain","type":"comprehension","question":"What pattern shows Marie's daily commitment to learning?","cue":"She goes from morning preparation to...","answer":"elle rentre contente et pense à demain","accept":["je rentre contente et pense à demain","contente et pense à demain","elle pense à demain"],"hint":"What cycle does her day show from morning to evening?""

**2024-05-25-unit-8-practice**

- `title` "Unit 8 Practice - Fill in the Blanks" → "Daily Life & Actions Practice - Fill in the Blanks"
- `description` "Complete sentences using temporal words, reflexive verbs, and commands from Unit 8!" → "Complete sentences using temporal words, reflexive verbs, and commands from this unit!"
- `items[0].text` "___, je mange., ___ je pars." → "___, je mange. ___, je pars."
- `items[20].text` "___ le café, je ___ et ___ je." → "___ le café, je ___ et je ___."
- `items[20].blanks[1].answer` "m'habille" → "me lave"
- `items[20].blanks[2].answer` "me lave" → "m'habille"
- `items[20].hint` "temporal: after / s'habiller for je / se laver for je" → "temporal: after / se laver for je / s'habiller for je"

**2024-05-24-unit-8-exam**

- `description` "Test everything from Unit 8! Temporal words, reflexive verbs (introductions, routines), commands, and reciprocal actions." → "Test everything from this unit! Temporal words, reflexive verbs (introductions, routines), commands, and reciprocal actions."

**2024-05-26-causal-words**

- `concepts[1].example` "On étudie le français car c'est utile (We study French for it's useful), Je reste ici car il pleut (I'm staying here for it's raining)" → "On étudie le français car c'est beau (We study French for it's beautiful), Je prends un café car je suis fatigué (I'm having a coffee for I'm tired)"
- `concepts[3].example` "Comme il fait beau, on va au parc (As it's nice, we're going to the park), Comme je suis fatigué, je reste à la maison (As I'm tired, I'm staying home)" → "Comme il fait beau, on va au parc (As it's nice, we're going to the park), Comme je suis fatigué, je vais dormir (As I'm tired, I'm going to sleep)"
- `concepts[4].example` "Grâce à toi, je comprends mieux (Thanks to you, I understand better), Grâce au professeur, j'ai réussi (Thanks to the teacher, I succeeded)" → "Grâce à toi, je comprends mieux (Thanks to you, I understand better), Grâce au professeur, je parle bien (Thanks to the teacher, I speak well)"
- `concepts[5].example` "À cause de la pluie, on reste ici (Because of the rain, we're staying here), À cause du traffic, je suis en retard (Because of traffic, I'm late)" → "À cause de la musique, je ne peux pas travailler (Because of the music, I can't work), À cause du bus, je suis en retard (Because of the bus, I'm late)"
- `items[1].text` "On étudie le français ___ c'est utile" → "On étudie le français ___ c'est beau"
- `items[1].gloss` "We study French for it's useful" → "We study French for it's beautiful"
- `items[5].text` "___ la pluie, on reste ici" → "___ la musique, je ne peux pas travailler"
- `items[5].gloss` "Because of the rain, we're staying here" → "Because of the music, I can't work"
- `items[6].text` "Pourquoi tu restes? - ___ je suis fatigué" → "Pourquoi tu ne viens pas ? - ___ je suis fatigué"
- `items[6].gloss` "Why are you staying? - Because I'm tired" → "Why aren't you coming? - Because I'm tired"
- `items[7].text` "Je suis en retard ___ le traffic" → "Je suis en retard ___ bus"
- `items[7].gloss` "I'm late because of traffic" → "I'm late because of the bus"
- `items[7].mistakes[0].feedback` "Parce que needs a CLAUSE: 'parce qu'il y a du traffic'. Use 'à cause de' + noun!" → "Parce que needs a CLAUSE: 'parce que le bus est en retard'. Use 'à cause de' + noun!"
- `items[8].text` "J'ai réussi ___ professeur" → "Je comprends ___ professeur"
- `items[8].gloss` "I succeeded thanks to the teacher" → "I understand thanks to the teacher"
- `items[10].text` "___ du mauvais temps, on annule le match" → "___ du travail, je ne peux pas venir"
- `items[10].gloss` "Because of bad weather, we're canceling the match" → "Because of work, I can't come"
- `items[10].mistakes[0].feedback` "Bad weather isn't positive! Use 'à cause de' for negative reasons." → "Work isn't a positive reason here. Use 'à cause de'."
- `items[10].mistakes[1].feedback` "Parce que needs a CLAUSE: 'parce qu'il fait mauvais'. Use 'à cause de' + noun!" → "Parce que needs a CLAUSE: 'parce que j'ai du travail'. Use 'à cause de' + noun!"
- `items[11].text` "On va partir ___ tu es prêt" → "On va partir ___ tu es là"
- `items[11].gloss` "We'll leave since you're ready" → "We'll leave since you're here"
- `items[16].text` "Je ne dors pas bien ___ bruit" → "Je suis fatigué ___ travail"
- `items[16].gloss` "I don't sleep well because of the noise" → "I'm tired because of work"

**2024-06-08-spatial-prepositions**

- `concepts[5].example` "Au-dessous du niveau (Below the level), Le parking est au-dessous (The parking is below)" → "au-dessous de nous (below us), Le parking est au-dessous (The parking is below)"
- `concepts[6].example` "Le livre est dans le sac (in the bag), sur la table (on the table), sous la chaise (under the chair)" → "Le livre est dans le sac (in the bag), sur la table (on the table), sous la table (under the table)"
- `items[7].text` "Mes clés sont ___ la table" → "Mon téléphone est ___ la table"
- `items[7].gloss` "My keys are on the table" → "My phone is on the table"
- `items[11].text` "La lampe est ___ le lit" → "J'habite ___ café"
- `items[11].gloss` "The lamp is above the bed" → "I live above the café"
- `items[11].mistakes[0].feedback` "Sur means 'on' (touching). Use 'au-dessus de' for 'above' (hanging)!" → "Use 'au-dessus de' for 'above'."
- `items[14].text` "Ma chambre est ___" → "La cuisine est ___"
- `items[14].gloss` "My bedroom is downstairs/below" → "The kitchen is downstairs/below"
- `items[15].text` "Le chat dort ___ mon lit" → "Le chat est ___ la voiture"
- `items[15].gloss` "The cat sleeps under my bed" → "The cat is under the car"

**2024-05-28-more-spatial-relations**

- `concepts[6].example` "Au milieu de la pièce (In the middle of the room), Il est au milieu (He's in the middle)" → "Au milieu de la place (In the middle of the square), Il est au milieu (He's in the middle)"
- `items[6].text` "La table est ___ pièce" → "La table est ___ cuisine"
- `items[6].gloss` "The table is in the middle of the room" → "The table is in the middle of the kitchen"
- `items[15].text` "La porte est ___ couloir" → "La porte est ___ jardin"
- `items[15].gloss` "The door is at the end of the hallway" → "The door is at the end of the garden"
- `items[17].text` "Assieds-toi ___ moi" → "Mets-toi ___ moi"
- `items[17].gloss` "Sit next to me/Sit beside me" → "Sit next to me"

**2024-05-30-passe-compose-er**

- `vocabulary[8].example_fr` "J'ai regardé la télé" → "J'ai regardé la ville"
- `items[4].text` "Vous ___ mes clés?" → "Vous ___ mon livre ?"
- `items[4].gloss` "Did you look for my keys?" → "Did you look for my book?"
- `items[9].text` "On ___ la télé hier soir" → "On ___ un film hier soir"
- `items[9].gloss` "We watched TV last night" → "We watched a film last night"

**2024-06-01-passe-compose-irregular-1**

- `concepts[3].example` "J'ai vu le film (I saw the movie), Tu as vu Marie? (Did you see Marie?)" → "J'ai vu le film (I saw the movie), Tu as vu Marie? (Did you see Marie?), J'ai vu Paul, il est assis au café (I saw Paul, he's sitting at the café)"

**2024-05-31-passe-compose-etre**

- `items[17].text` "Elle ne ___ pas ___" → "Elle n'___ pas ___"

**2024-05-29-passe-compose-agreement**

- `vocabulary[6].example_fr` "Monsieur, vous êtes allé où?" → "Paul, vous êtes allé où ?"
- `vocabulary[8].example_fr` "Les garçons, vous êtes allés où?" → "Les enfants, vous êtes allés où ?"
- `items[10].text` "Les garçons ___ tard" → "Paul et Marc ___ tard"
- `items[10].gloss` "The boys came home late" → "Paul and Marc came home late"
- `items[10].mistakes[0].feedback` "Les garçons is plural! Add -s for masculine plural: sont rentrés." → "Paul et Marc is plural! Add -s for masculine plural: sont rentrés."
- `items[10].mistakes[1].feedback` "Garçons (boys) is masculine! Use -s (not -es): sont rentrés." → "Paul and Marc are men, so use -s (not -es): sont rentrés."

**2024-05-27-imparfait-all-verbs**

- `items[15].text` "Quand j'___ jeune, je jouais au foot" → "Quand j'___ jeune, je jouais avec mon chien"
- `items[15].gloss` "When I was young, I used to play soccer" → "When I was young, I used to play with my dog"

**2024-06-04-pc-vs-imparfait**

- `vocabulary[5].review` "(none)" → "true"
- `items[5].text` "Quand j'étais jeune, je ___ au foot" → "Quand j'étais jeune, je ___ avec mon chien"
- `items[5].gloss` "When I was young, I used to play soccer" → "When I was young, I used to play with my dog"

**2024-06-03-past-tense-composition**

- `concepts[0].example` "Hier, il faisait beau donc je suis allé au parc près de chez moi. J'étais content parce que j'avais du temps libre." → "Hier, il faisait beau donc je suis allé au parc près de chez moi. J'étais content parce que j'avais du temps."
- `concepts[3].example` "Comme il faisait beau, je suis sorti. J'ai vu Marie donc on a parlé. On est allés au café car on avait soif." → "Comme il faisait beau, je suis sorti. J'ai vu Marie donc on a parlé. On est allés au café car on avait faim."
- `concepts[4].example` "D'abord, je suis allé au café près de l'école. Ensuite, j'ai vu Marie devant le cinéma." → "D'abord, je suis allé au café près de l'école. Ensuite, j'ai vu Marie devant le cinéma. Après, j'ai joué avec mon chien."
- `items[9].gloss` "Thanks to being hungry, I ate" → "Because I was hungry, I ate"
- `items[9].hint` ""WRONG! Fix: ___ j'avais faim, j'ai mangé (Because I was hungry, I ate)"" → "(removed)"
- `items[10].text` "Le livre était ___ la table ___ ma chambre" → "Le livre était ___ la table ___ la cuisine"
- `items[10].gloss` "The book was on the table in my room" → "The book was on the table in the kitchen"
- `items[12].text` "J'___ mes devoirs ___ j'ai regardé la télé" → "J'___ mes devoirs ___ j'ai écouté de la musique"
- `items[12].gloss` "I did my homework then I watched TV" → "I did my homework then I listened to music"
- `items[13].text` "___ toi, j'ai réussi" → "___ toi, j'ai appris le français"
- `items[13].gloss` "Thanks to you, I succeeded" → "Thanks to you, I learned French"
- `items[14].text` "___ la pluie, on est restés à la maison" → "___ la fête, on est rentrés tard"
- `items[14].gloss` "Because of the rain, we stayed home" → "Because of the party, we got home late"
- `items[14].mistakes[0].feedback` "Rain isn't positive! Use 'à cause de' for negative/neutral reasons." → "The party is the cause here, not a thanks. Use 'à cause de'."
- `items[14].mistakes[1].feedback` "Parce que needs a CLAUSE! Use 'à cause de la pluie' (because of THE RAIN - noun)." → "Use 'à cause de la fête' (because of THE PARTY, a noun)."

**2024-06-05-reading-9**

- `title` "Reading 9 - Une Histoire du Passé" → "Reading - Une Histoire du Passé"
- `description` "A story in the past using passé composé, imparfait, causal words, and spatial prepositions - bringing together all of Unit 9" → "A story in the past using passé composé, imparfait, causal words, and spatial prepositions - bringing together all of this unit"
- `passage[6].fr` ""Salut Pierre! Qu'est-ce que tu fais ici?" j'ai demandé." → "J'ai demandé: "Salut Pierre! Qu'est-ce que tu fais ici?""
- `passage[6].en` ""Hi Pierre! What are you doing here?" I asked." → "I asked: "Hi Pierre! What are you doing here?""
- `passage[7].fr` ""Bonjour! Je voulais être dehors parce qu'il faisait si beau. Je suis content que tu sois là!" il a dit." → "Il a dit: "Bonjour! Je voulais être dehors parce qu'il faisait si beau. Je suis content que tu sois là!""
- `passage[7].en` ""Hello! I wanted to be outside because it was so nice. I'm glad you're here!" he said." → "He said: "Hello! I wanted to be outside because it was so nice. I'm glad you're here!""
- `passage[8].fr` "Nous avons parlé pendant une heure. Il m'a dit qu'il voulait un nouveau travail à la Sorbonne parce qu'il n'aimait pas son travail. Je lui ai dit que je comprenais car j'ai eu le même problème l'année dernière." → "Nous avons parlé pendant une heure. Pierre voulait un nouveau travail à la Sorbonne parce qu'il n'aimait pas son travail. Je le comprenais, car j'ai eu le même problème l'année dernière."
- `passage[8].en` "We talked for an hour. He told me he wanted a new job at the Sorbonne because he didn't like his job. I told him that I understood because I had the same problem last year." → "We talked for an hour. Pierre wanted a new job at the Sorbonne because he didn't like his job. I understood him, because I had the same problem last year."
- `passage[12].fr` ""Quelle surprise!" elle a dit. "Je ne savais pas que vous étiez ici!"" → "Elle a dit: "Quelle surprise! Je ne savais pas que vous étiez ici!""
- `passage[12].en` ""What a surprise!" she said. "I didn't know you were here!"" → "She said: "What a surprise! I didn't know you were here!""
- `passage[13].fr` "Marie était notre amie de la Sorbonne. Nous ne l'avons pas vue depuis six mois parce qu'elle est maintenant à Lyon. Grâce à cette rencontre, nous avons pu être ensemble pour l'après-midi." → "Marie était notre amie de la Sorbonne. Nous ne la voyons pas souvent parce qu'elle habite maintenant à Lyon. Grâce à cette rencontre, nous avons pu être ensemble pour l'après-midi."
- `passage[13].en` "Marie was our friend from the Sorbonne. We haven't seen her for six months because she's now in Lyon. Thanks to this meeting, we were able to be together for the afternoon." → "Marie was our friend from the Sorbonne. We don't see her often because she now lives in Lyon. Thanks to this meeting, we were able to be together for the afternoon."

**2024-06-10-unit-9-practice**

- `title` "Unit 9 Practice - Fill in the Blanks" → "Discourse & Past Tense Practice - Fill in the Blanks"
- `description` "Complete sentences using causal words, spatial prepositions, and past tenses from Unit 9!" → "Complete sentences using causal words, spatial prepositions, and past tenses from this unit!"
- `items[0].text` "Je suis en retard ___ j'ai raté le bus." → "Je suis en retard ___ je suis parti tard."
- `items[0].gloss` "I'm late because I missed the bus" → "I'm late because I left late"
- `items[2].text` "___ à toi, j'ai réussi." → "___ toi, j'ai appris le français."
- `items[2].gloss` "Thanks to you, I succeeded" → "Thanks to you, I learned French"
- `items[4].text` "Le chat est ___ les deux chaises." → "Le chat est ___ la porte et la table."
- `items[4].gloss` "The cat is between the two chairs" → "The cat is between the door and the table"
- `items[18].text` "___ il pleuvait, nous ___ à la maison." → "___ nous étions fatigués, nous ___ à la maison."
- `items[18].gloss` "Since it was raining, we stayed home" → "Since we were tired, we stayed home"

**2024-06-09-unit-9-exam**

- `description` "Test everything from Unit 9! Causal words, spatial prepositions, passé composé, imparfait, and the critical PC vs IMP distinction for complete storytelling mastery." → "Test everything from this unit! Causal words, spatial prepositions, passé composé, imparfait, and the critical PC vs IMP distinction for complete storytelling mastery."

**2024-01-23-common-special-forms-1**

- `concepts[0].example` "Normal statement: Tu es sage (You are good). Wish about you: Il faut que tu sois sage (You need to be good - different form!)" → "Normal statement: Tu es gentil (You are kind). Wish about you: Il faut que tu sois gentil (You need to be kind - different form!)"
- `concepts[1].example` "✓ Il faut que tu sois sage (You need to be good), ✓ Je veux qu'il aille (I want him to go)" → "✓ Il faut que tu sois gentil (You need to be kind), ✓ Je veux qu'il aille (I want him to go)"

**2024-01-28-necessity-phrases**

- `vocabulary[0].review` "(none)" → "true"
- `vocabulary[1].review` "(none)" → "true"
- `vocabulary[2].review` "(none)" → "true"
- `vocabulary[3].review` "(none)" → "true"
- `vocabulary[4].review` "(none)" → "true"
- `vocabulary[5].review` "(none)" → "true"
- `vocabulary[6].review` "(none)" → "true"
- `concepts[0].example` "Il faut manger (general: someone should eat) → Il faut que tu manges (YOU specifically need to eat)" → "Il faut manger (general: someone should eat) → Il faut que tu manges (YOU specifically need to eat); Il faut qu'on aille au parc (We need to go to the park)"

**2024-02-07-wish-phrases**

- `concepts[1].example` "J'aimerais que tu viennes (I'd like you to come)" → "J'aimerais que tu viennes (I'd like you to come), Je ne veux pas que tu tombes ! (I don't want you to fall!)"

**2024-01-25-emotion-phrases**

- `vocabulary[0].word_id` "je-suis-content-que-tu-sois-la-fr.i-m-happy" → "je-suis-content-que-tu-sois-la-fr"
- `concepts[0].example` "Je suis content (I'm happy - about what?) → Je suis content que tu sois là (I'm happy YOU'RE here!)" → "Je suis content (I'm happy - about what?) → Je suis content que tu sois là (I'm happy YOU'RE here!); Il faut que tu viennes : je veux que tu sois là ! (You have to come: I want you to be there!)"

**2024-01-27-hypothetical-phrases**

- `description` "Talk about fantasies and what-ifs! 'Si j'étais riche, j'achèterais...' (If I were rich, I'd buy...), 'Si j'avais le temps, je voyagerais' (If I had time, I'd travel). Everyone loves daydreaming!" → "Talk about fantasies and what-ifs! 'Si j'étais riche...' (If I were rich...), 'Si j'avais le temps, je voyagerais' (If I had time, I'd travel). Everyone loves daydreaming!"

**2024-01-22-common-adverbs**

- `vocabulary[3].note` "courir rapidement" → "manger rapidement"

**2024-02-06-while-doing-phrases**

- `description` "Describe multitasking! 'En mangeant, je regarde la télé' (While eating, I watch TV), 'On apprend en pratiquant' (We learn by practicing). Natural speech patterns!" → "Describe multitasking! 'En mangeant, je regarde un film' (While eating, I watch a film), 'On apprend en pratiquant' (We learn by practicing). Natural speech patterns!"
- `concepts[1].example` "Je travaille en écoutant de la musique (I work while listening to music)" → "Je travaille en écoutant de la musique (I work while listening to music), Je mange lentement en regardant un film (I eat slowly while watching a film)"

**2024-01-21-before-phrases**

- `concepts[1].example` "Finis avant que papa rentre! (Finish before dad gets home!)" → "Finis avant que papa rentre! (Finish before dad gets home!), Avant que tu partes, parlons en mangeant (Before you leave, let's talk while we eat)"

**2024-02-03-so-that-phrases**

- `concepts[1].example` "Je parle lentement pour que tu comprennes (I speak slowly so you understand)" → "Je parle lentement pour que tu comprennes (I speak slowly so you understand), Je fais venir Marie pour que tu sois content (I'm having Marie come so that you're happy)"

**2024-01-20-although-phrases**

- `concepts[0].example` "Bien que je sois fatigué, je travaille (Although I'm tired, I'm working)" → "Bien que je sois fatigué, je travaille (Although I'm tired, I'm working), Bien que je sois fatigué, je t'aide pour que tu partes avant qu'il soit trop tard (Although I'm tired, I'm helping you so you can leave before it's too late)"
- `concepts[1].example` "Bien qu'il fasse froid, on sort (Even though it's cold, we're going out)" → "Bien qu'il fasse froid, on va au parc (Even though it's cold, we're going to the park)"

**2024-02-01-reading-10**

- `title` "Reading 10 - Mes Rêves et Mes Espoirs" → "Reading - Mes Rêves et Mes Espoirs"
- `description` "A story about dreams and ambitions using Unit 10's advanced expressions: wishes (je veux que...), emotions (je suis content que...), hypotheticals (si j'étais...), and more" → "A story about dreams and ambitions using this unit's advanced expressions: wishes (je veux que...), emotions (je suis content que...), hypotheticals (si j'étais...), and more"
- `passage[6].fr` "Mon ami Marc est arrivé au café. Il savait que j'aime ce café parce que c'est près de Notre-Dame. Je suis contente qu'il soit venu! On se parle toujours de nos rêves." → "Mon ami Marc est arrivé au café. Il savait que j'aime ce café parce que c'est près de Notre-Dame. Je suis contente qu'il soit là! On se parle toujours de nos rêves."
- `passage[6].en` "My friend Marc arrived at the café. He knew I like this café because it's near Notre-Dame. I'm glad he came! We always talk to each other about our dreams." → "My friend Marc arrived at the café. He knew I like this café because it's near Notre-Dame. I'm glad he's here! We always talk to each other about our dreams."
- `passage[7].fr` ""Salut Sophie! Je savais que tu serais ici," il a dit." → "Il a dit: "Salut Sophie! Je savais que tu serais ici.""
- `passage[7].en` ""Hi Sophie! I knew you'd be here," he said." → "He said: "Hi Sophie! I knew you'd be here.""
- `passage[8].fr` ""Bonjour Marc! Je suis heureuse que tu sois là. J'étais en train de penser à mes rêves," j'ai dit." → "J'ai dit: "Bonjour Marc! Je suis heureuse que tu sois là. J'étais en train de penser à mes rêves.""
- `passage[8].en` ""Hello Marc! I'm happy you're here. I was thinking about my dreams," I said." → "I said: "Hello Marc! I'm happy you're here. I was thinking about my dreams.""
- `passage[9].fr` ""Ah oui? Moi aussi, j'ai beaucoup de rêves. Je veux que ma vie change," il a dit." → "Il a dit: "Ah oui? Moi aussi, j'ai beaucoup de rêves. Je veux que ma vie change.""
- `passage[9].en` ""Oh yes? Me too, I have many dreams. I want my life to change," he said." → "He said: "Oh yes? Me too, I have many dreams. I want my life to change.""
- `passage[10].fr` "Marc m'a dit qu'il voulait être artiste. Il voulait que les gens voient ses peintures au Louvre un jour. C'est un grand rêve! Le Louvre est le musée le plus célèbre du monde." → "Marc m'a parlé de son rêve: être artiste. Il voulait que les gens voient ses peintures au Louvre un jour. C'est un grand rêve! Le Louvre est le musée le plus célèbre du monde."
- `passage[10].en` "Marc told me he wanted to be an artist. He wanted people to see his paintings at the Louvre one day. It's a big dream! The Louvre is the most famous museum in the world." → "Marc talked to me about his dream: to be an artist. He wanted people to see his paintings at the Louvre one day. It's a big dream! The Louvre is the most famous museum in the world."
- `passage[11].fr` ""Je veux qu'un jour mes peintures soient au Louvre. Mais j'ai peur que ce soit difficile," il a dit." → "Il a dit: "Je veux qu'un jour mes peintures soient au Louvre. Mais j'ai peur que ce soit difficile.""
- `passage[11].en` ""I want my paintings to be at the Louvre one day. But I'm afraid it might be difficult," he said." → "He said: "I want my paintings to be at the Louvre one day. But I'm afraid it might be difficult.""
- `passage[13].fr` ""Je comprends. Mais il faut que tu essaies! Si tu ne fais rien, tu ne sauras jamais," j'ai dit." → "J'ai dit: "Je comprends. Mais il faut que tu essaies! Si tu ne fais rien, tu ne sauras jamais.""
- `passage[13].en` ""I understand. But you have to try! If you don't do anything, you'll never know," I said." → "I said: "I understand. But you have to try! If you don't do anything, you'll never know.""
- `passage[14].fr` "Nous avons parlé pendant une heure. Je lui ai dit que je voulais être professeur de français. J'aimerais que mes étudiants adorent la langue française comme moi." → "Nous avons parlé pendant une heure. Je lui ai parlé de mon rêve: être professeur de français. J'aimerais que mes étudiants adorent la langue française comme moi."
- `passage[14].en` "We talked for an hour. I told him I wanted to be a French teacher. I'd like my students to love the French language like me." → "We talked for an hour. I talked to him about my dream: to be a French teacher. I'd like my students to love the French language like me."
- `passage[15].fr` ""Je suis content que tu aies ce rêve. Tu serais une excellente professeur," Marc a dit." → "Marc a dit: "Je suis content que tu aies ce rêve. Tu serais une excellente professeur.""
- `passage[15].en` ""I'm glad you have this dream. You'd be an excellent teacher," Marc said." → "Marc said: "I'm glad you have this dream. You'd be an excellent teacher.""
- `passage[16].fr` ""Merci! Mais j'ai peur que ce soit trop difficile. J'avais déjà essayé l'année dernière mais je n'ai pas réussi," j'ai dit." → "J'ai dit: "Merci! Mais j'ai peur que ce soit trop difficile. J'avais déjà essayé l'année dernière mais je n'ai pas réussi.""
- `passage[16].en` ""Thank you! But I'm afraid it might be too difficult. I had already tried last year but I didn't succeed," I said." → "I said: "Thank you! But I'm afraid it might be too difficult. I had already tried last year but I didn't succeed.""
- `passage[17].fr` ""Il faut que tu essaies encore! Si j'étais toi, je ne renoncerais pas," il a dit." → "Il a dit: "Il faut que tu essaies encore! Si j'étais toi, je ne renoncerais pas.""
- `passage[17].en` ""You have to try again! If I were you, I wouldn't give up," he said." → "He said: "You have to try again! If I were you, I wouldn't give up.""
- `passage[19].fr` "Nous avons décidé d'aider l'un l'autre. Je veux qu'il réussisse avec ses peintures, et il veut que je réussisse comme professeur." → "Nous avons décidé de nous aider l'un l'autre. Je veux qu'il réussisse avec ses peintures, et il veut que je réussisse comme professeur."
- `passage[20].fr` ""Je suis heureux que nous soyons amis. On peut s'aider," Marc a dit." → "Marc a dit: "Je suis heureux que nous soyons amis. On peut s'aider.""
- `passage[20].en` ""I'm happy we're friends. We can help each other," Marc said." → "Marc said: "I'm happy we're friends. We can help each other.""
- `passage[21].fr` ""Moi aussi! J'aimerais que nous réussissions tous les deux," j'ai dit." → "J'ai dit: "Moi aussi! J'aimerais que nous réussissions tous les deux.""
- `passage[21].en` ""Me too! I'd like us both to succeed," I said." → "I said: "Me too! I'd like us both to succeed.""
- `passage[24].fr` ""Si on avait plus de temps, on pourrait marcher toute la nuit," Marc a dit." → "Marc a dit: "Si on avait plus de temps, on pourrait marcher toute la nuit.""
- `passage[24].en` ""If we had more time, we could walk all night," Marc said." → "Marc said: "If we had more time, we could walk all night.""
- `passage[25].fr` ""Oui ! J'adore Paris la nuit. C'est pour ça que je veux rester ici toute ma vie," j'ai dit." → "J'ai dit: "Oui ! J'adore Paris la nuit. C'est pour ça que je veux rester ici toute ma vie.""
- `passage[25].en` ""Yes! I love Paris at night. That's why I want to stay here all my life," I said." → "I said: "Yes! I love Paris at night. That's why I want to stay here all my life.""
- `passage[27].fr` ""Sophie, il faut que tu saches une chose: tes rêves sont importants. Je veux que tu continues à essayer," il a dit." → "Il a dit: "Sophie, il faut que tu saches une chose: tes rêves sont importants. Je veux que tu continues à essayer.""
- `passage[27].en` ""Sophie, you need to know one thing: your dreams are important. I want you to keep trying," he said." → "He said: "Sophie, you need to know one thing: your dreams are important. I want you to keep trying.""
- `passage[28].fr` ""Merci Marc. Je suis reconnaissante que tu m'aies dit ça. Toi aussi, tu dois continuer avec tes peintures," j'ai dit." → "J'ai dit: "Merci Marc. Je suis reconnaissante que tu sois là pour moi. Toi aussi, tu dois continuer avec tes peintures.""
- `passage[28].en` ""Thank you Marc. I'm grateful you told me that. You too, you must continue with your paintings," I said." → "I said: "Thank you Marc. I'm grateful you're here for me. You too, you must continue with your paintings.""
- `passage[29].fr` "En rentrant chez moi, j'ai pensé à notre conversation. Je regrette que j'aie perdu espoir avant. Mais maintenant, je suis contente que Marc soit mon ami." → "En rentrant chez moi, j'ai pensé à notre conversation. Avant, j'avais perdu espoir, et je le regrette. Mais maintenant, je suis contente que Marc soit mon ami."
- `passage[29].en` "Walking home, I thought about our conversation. I regret that I lost hope before. But now, I'm glad Marc is my friend." → "Walking home, I thought about our conversation. Before, I had lost hope, and I regret it. But now, I'm glad Marc is my friend."
- `passage[34].fr` "Comme Marc a dit: il faut essayer! Si on ne fait rien, on ne saura jamais. Et moi, je veux savoir si mes rêves peuvent devenir réalité." → "Comme Marc l'a dit: il faut essayer! Si on ne fait rien, on ne saura jamais. Et moi, je veux savoir si mes rêves peuvent devenir réalité."
- `glossary` "(none)" → "["fr":"assise","en":"sitting (feminine)","fr":"savait","en":"knew","fr":"saura","en":"will know","fr":"achèterait","en":"would buy"]"
- `glosses` "(none)" → "["fr":"assise","en":"sitting","note":"past participle of asseoir","fr":"savait","en":"knew","note":"imparfait of savoir","fr":"saura","en":"will know","note":"future of savoir"]"
- `items[3].question` "Si Sophie était riche, qu'est-ce qu'elle achèterait?" → "Si tu étais Sophie, qu'est-ce que tu achèterais ?"
- `items[3].cue` "If Sophie were rich, what would she buy?" → "If you were Sophie, what would you buy?"
- `items[7].answer` "aider l'un l'autre" → "s'aider"
- `items[7].accept` "["l'un l'autre","s'aider","aider","ils ont décidé de s'aider"]" → "["s'aider l'un l'autre","se aider","l'un l'autre","aider","nous aider","de s'aider","ils ont décidé de s'aider","ils ont décidé de s'aider l'un l'autre"]"
- `items[7].hint` "Aider..." → "Ils ont décidé de s'..."

**2024-02-05-unit-10-practice**

- `title` "Unit 10 Practice - Fill in the Blanks" → "Mastery & Nuance Practice - Fill in the Blanks"
- `description` "Complete sentences using Unit 10's B2 level phrases: necessity, wishes, emotions, hypotheticals, and more!" → "Complete sentences using this unit's B2 level phrases: necessity, wishes, emotions, hypotheticals, and more!"

**2024-02-04-unit-10-exam**

- `description` "Test everything from Unit 10! Master B2 level phrases: necessity (il faut que), wishes (je veux que), emotions (je suis content que), hypotheticals (si j'étais...), regrets (si j'avais su...), and more advanced expressions." → "Test everything from this unit! Master B2 level phrases: necessity (il faut que), wishes (je veux que), emotions (je suis content que), hypotheticals (si j'étais...), regrets (si j'avais su...), and more advanced expressions."
- `items[37].instruction` "From Reading 10: What did Sophie want about her life?" → "From the reading Mes Rêves et Mes Espoirs: What did Sophie want about her life?"
- `items[38].instruction` "From Reading 10: What had Sophie already done before talking to Marc?" → "From the reading Mes Rêves et Mes Espoirs: What had Sophie already done before talking to Marc?"

**2024-02-08-age-personal-info**

- `description` "Essential life skills! Learn to say your age (J'ai 25 ans), ask others' ages (Quel âge avez-vous?), and share personal information. Finally complete what should have been in Unit 1!" → "Essential life skills! Learn to say your age (J'ai 25 ans), ask others' ages (Quel âge avez-vous?), and share personal information."

**2024-02-10-donner**

- `concepts` "["id":"c-donner-to-give","term":"donner = to give","definition":"One of the most common verbs - used for gifts, help, information, objects","example":"Je donne un cadeau (I give a gift), Tu me donnes ton numéro? (Do you give me your number?)","id":"c-regular-er-conjugation","term":"Regular -ER Conjugation","definition":"Follows standard -ER pattern like parler, manger","example":"je donne, tu donnes, il donne, nous donnons, vous donnez, ils donnent","id":"c-direct-and-indirect-objects","term":"Direct and Indirect Objects","definition":"Give WHAT (direct) to WHOM (indirect) - donner quelque chose à quelqu'un","example":"Je donne le livre à Marie (I give the book to Marie) → Je lui donne le livre (I give it to her)","id":"c-common-expressions","term":"Common Expressions","definition":"Many fixed phrases use donner in French","example":"donner l'heure (tell the time), donner raison (agree with someone), donner rendez-vous (make an appointment)"]" → "["id":"c-donner-to-give","term":"donner = to give","definition":"One of the most common verbs - used for gifts, help, information, objects","example":"Je donne un livre (I give a book), Tu me donnes ton numéro? (Do you give me your number?)","id":"c-regular-er-conjugation","term":"Regular -ER Conjugation","definition":"Follows standard -ER pattern like parler, manger","example":"je donne, tu donnes, il donne, nous donnons, vous donnez, ils donnent","id":"c-direct-and-indirect-objects","term":"Direct and Indirect Objects","definition":"Give WHAT (direct) to WHOM (indirect) - donner quelque chose à quelqu'un","example":"Je donne le livre à Marie (I give the book to Marie) → Je lui donne le livre (I give it to her)","id":"c-two-pronouns","term":"Two pronouns: je te le donne","definition":"When the thing you give becomes le, la or les, it goes after me, te, nous or vous, and both stay before the verb","example":"Je te donne le livre (I give you the book) → Je te le donne (I give it to you). Tu me donnes ton numéro ? (Do you give me your number?) → Tu me le donnes ? (Do you give it to me?)","id":"c-common-expressions","term":"Common Expressions","definition":"Many fixed phrases use donner in French","example":"donner l'heure (tell the time), donner raison (agree with someone), donner rendez-vous (make an appointment)"]"

**2024-05-15-daily-actions-1**

- `concepts[3].example` "Je vis à Paris, je travaille au centre-ville, et je dors bien (I live in Paris, work downtown, and sleep well)" → "Je vis à Paris, je travaille près d'ici, et je dors bien (I live in Paris, work near here, and sleep well)"

**2024-02-13-search-and-find**

- `concepts[0].example` "Je cherche mes clés (I'm looking for my keys), Tu cherches quoi? (What are you looking for?)" → "Je cherche mes clés (I'm looking for my keys), Tu cherches quoi? (What are you looking for?), C'est dur de trouver mes clés ! (It's hard to find my keys!)"

**2024-02-14-social-situations**

- `concepts[0].example` "J'attends le bus (I'm waiting for the bus), Tu attends quelqu'un? (Are you waiting for someone?)" → "J'attends le bus (I'm waiting for the bus), Tu attends quelqu'un? (Are you waiting for someone?), J'attends Marie et j'écoute de la musique (I'm waiting for Marie and listening to music)"

**2024-02-09-directions-navigation**

- `vocabulary[9].note` "complete direction instruction" → "a full instruction, ready to say"
- `vocabulary[10].note` "complete direction instruction" → "a full instruction, ready to say"
- `concepts[3].example` "Allez tout droit, puis tournez à gauche (Go straight, then turn left)" → "Allez tout droit jusqu'à la gare, puis tournez à gauche (Go straight as far as the station, then turn left)"

**2024-02-12-reading-11**

- `title` "Reading 11 - La France Moderne" → "Reading - La France Moderne"
- `glossary` "(none)" → "["fr":"compte","en":"has (in number)","fr":"attire","en":"attracts","fr":"lieux","en":"places","fr":"étrangères","en":"foreign","fr":"peintres","en":"painters","fr":"mémoire","en":"memory","fr":"également","en":"also, as well","fr":"inoubliables","en":"unforgettable","fr":"plusieurs","en":"several","fr":"françaises","en":"French","fr":"au-delà","en":"beyond","fr":"traverse","en":"crosses","fr":"au bord de","en":"on the shore of","fr":"vélo","en":"bike","fr":"quels","en":"which"]"
- `glosses` "(none)" → "["fr":"étrangères","en":"foreign","note":"feminine plural of étranger","fr":"françaises","en":"French","note":"feminine plural of français"]"

**2024-02-16-unit-11-practice**

- `title` "Unit 11 Practice - Fill in the Blanks" → "Daily Essentials Practice - Fill in the Blanks"
- `description` "Complete sentences using Unit 11's essential vocabulary: age expressions, missing top 100 verbs, and directions!" → "Complete sentences using this unit's essential vocabulary: age expressions, missing top 100 verbs, and directions!"

**2024-02-15-unit-11-exam**

- `description` "Final test for Unit 11! Demonstrate mastery of age expressions, all missing top 100 verbs (give, sleep, work, live, search, find, listen, watch, wait, arrive, stay), directions, and practical communication. Achieve complete French foundation!" → "Final test for this unit! Demonstrate mastery of age expressions, all missing top 100 verbs (give, sleep, work, live, search, find, listen, watch, wait, arrive, stay), directions, and practical communication. Achieve complete French foundation!"
- `items[42].situation` "From Reading 11: France's population" → "From the reading La France Moderne: France's population"
- `items[43].situation` "From Reading 11: What tourists look for" → "From the reading La France Moderne: What tourists look for"
- `items[44].situation` "From Reading 11: Where artists live" → "From the reading La France Moderne: Where artists live"
- `items[45].situation` "From Reading 11: Modern France combines what?" → "From the reading La France Moderne: Modern France combines what?"

**2024-03-15-nature-animals**

- `vocabulary[0].note` "masculine - silent 's' in oiseau" → "masculine: the s sounds like z"
- `vocabulary[14].note` "masculine - for 'souffler' (to blow)" → "masculine: le vent"
- `vocabulary[15].note` "feminine - for 'pleuvoir' (to rain)" → "feminine: la pluie"
- `concepts[0].definition` "These animals are perfect examples for asking 'how does X do Y?' questions" → "The next lessons ask how and why these animals move. Start with what each one is like."
- `concepts[0].example` "Comment est-ce qu'une tortue nage? Comment est-ce qu'un écureuil saute?" → "La tortue est lente. (The turtle is slow.) L'écureuil est rapide. (The squirrel is fast.)"
- `concepts[2].term` "Nature Elements" → "Nature words"
- `concepts[2].example` "le vent (wind), la pluie (rain), une plante (plant), un arbre (tree)" → "le vent (wind), la pluie (rain), une plante (plant), un arbre (tree); Il y a des millions d'oiseaux (There are millions of birds)"
- `concepts[4].definition` "This vocabulary enables curiosity questions in future modules" → "These words come back in the question lessons that follow."
- `concepts[4].example` "After learning this: you can ask 'Pourquoi est-ce que les oiseaux volent?' (Why do birds fly?)" → "Pourquoi est-ce que la tortue est lente ? (Why is the turtle slow?)"
- `items[0].type` "translate" → "gapfill"
- `items[0].text` "(none)" → ""Je vois ___ : il est petit et bleu.""
- `items[0].blanks` "(none)" → "["answer":"un oiseau"]"
- `items[0].gloss` "(none)" → ""I see a bird: it is small and blue.""
- `items[0].mistakes[0].feedback` "Oiseau is masculine. Use 'un oiseau' (the 's' is silent!)" → "Oiseau is masculine: un oiseau."
- `items[0].mistakes[1].feedback` "Careful with spelling: oiseau (the 's' is silent)" → "Check the spelling: oiseau."
- `items[0].prompt` ""a bird"" → "(removed)"
- `items[0].answer` ""un oiseau"" → "(removed)"
- `items[0].hint` ""masculine article + oiseau"" → "(removed)"
- `items[1].type` "translate" → "gapfill"
- `items[1].text` "(none)" → ""C'est ___ : elle est très lente.""
- `items[1].blanks` "(none)" → "["answer":"une tortue"]"
- `items[1].gloss` "(none)" → ""It's a turtle: it is very slow.""
- `items[1].prompt` ""a turtle"" → "(removed)"
- `items[1].answer` ""une tortue"" → "(removed)"
- `items[1].hint` ""feminine article + tortue"" → "(removed)"
- `items[2].type` "translate" → "gapfill"
- `items[2].text` "(none)" → ""Il y a ___ dans l'arbre : il est petit et rapide.""
- `items[2].blanks` "(none)" → "["answer":"un écureuil","accept":["un ecureuil"]]"
- `items[2].gloss` "(none)" → ""There is a squirrel in the tree: it is small and fast.""
- `items[2].prompt` ""a squirrel"" → "(removed)"
- `items[2].answer` ""un écureuil"" → "(removed)"
- `items[2].accept` "["un ecureuil"]" → "(removed)"
- `items[2].hint` ""masculine article + écureuil"" → "(removed)"
- `items[3].type` "translate" → "gapfill"
- `items[3].text` "(none)" → ""Nous avons ___ et un chat à la maison.""
- `items[3].blanks` "(none)" → "["answer":"un lapin"]"
- `items[3].gloss` "(none)" → ""We have a rabbit and a cat at home.""
- `items[3].mistakes` "(none)" → "["answer":"une lapin","feedback":"lapin is masculine: un lapin."]"
- `items[3].prompt` ""a rabbit"" → "(removed)"
- `items[3].answer` ""un lapin"" → "(removed)"
- `items[3].hint` ""masculine article + lapin"" → "(removed)"
- `items[4].type` "translate" → "gapfill"
- `items[4].text` "(none)" → ""Le chat regarde ___.""
- `items[4].blanks` "(none)" → "["answer":"un papillon"]"
- `items[4].gloss` "(none)" → ""The cat is watching a butterfly.""
- `items[4].prompt` ""a butterfly"" → "(removed)"
- `items[4].answer` ""un papillon"" → "(removed)"
- `items[4].hint` ""masculine article + papillon"" → "(removed)"
- `items[5].type` "translate" → "gapfill"
- `items[5].text` "(none)" → ""Il y a ___ dans la fleur.""
- `items[5].blanks` "(none)" → "["answer":"une abeille"]"
- `items[5].gloss` "(none)" → ""There is a bee in the flower.""
- `items[5].mistakes` "(none)" → "["answer":"un abeille","feedback":"abeille is feminine: une abeille."]"
- `items[5].prompt` ""a bee"" → "(removed)"
- `items[5].answer` ""une abeille"" → "(removed)"
- `items[5].hint` ""feminine article + abeille"" → "(removed)"
- `items[6].type` "translate" → "gapfill"
- `items[6].text` "(none)" → ""Je donne ___ à ma mère.""
- `items[6].blanks` "(none)" → "["answer":"une plante"]"
- `items[6].gloss` "(none)" → ""I'm giving my mother a plant.""
- `items[6].prompt` ""a plant"" → "(removed)"
- `items[6].answer` ""une plante"" → "(removed)"
- `items[6].hint` ""feminine article + plante"" → "(removed)"
- `items[7].type` "translate" → "gapfill"
- `items[7].text` "(none)" → ""J'aime le soleil, mais je n'aime pas ___.""
- `items[7].blanks` "(none)" → "["answer":"le vent"]"
- `items[7].gloss` "(none)" → ""I like the sun, but I don't like the wind.""
- `items[7].prompt` ""the wind"" → "(removed)"
- `items[7].answer` ""le vent"" → "(removed)"
- `items[7].hint` ""masculine article + vent"" → "(removed)"
- `items[8].type` "translate" → "gapfill"
- `items[8].text` "(none)" → ""Les plantes aiment ___.""
- `items[8].blanks` "(none)" → "["answer":"la pluie"]"
- `items[8].gloss` "(none)" → ""Plants like the rain.""
- `items[8].prompt` ""the rain"" → "(removed)"
- `items[8].answer` ""la pluie"" → "(removed)"
- `items[8].hint` ""feminine article + pluie"" → "(removed)"
- `items[9].type` "translate" → "transform"
- `items[9].instruction` "(none)" → ""Say the opposite.""
- `items[9].shown` "(none)" → ""La tortue est rapide.""
- `items[9].prompt` ""The turtle is slow"" → "(removed)"
- `items[9].hint` ""la tortue + est + lente (feminine)"" → "(removed)"
- `items[10].type` "translate" → "transform"
- `items[10].instruction` "(none)" → ""Say the opposite.""
- `items[10].shown` "(none)" → ""L'écureuil est lent.""
- `items[10].prompt` ""The squirrel is fast"" → "(removed)"
- `items[10].hint` ""l'écureuil + est + rapide"" → "(removed)"
- `items[11].type` "translate" → "transform"
- `items[11].instruction` "(none)" → ""Say the opposite.""
- `items[11].shown` "(none)" → ""L'abeille est grande.""
- `items[11].mistakes` "(none)" → "["answer":"l'abeille est petit","feedback":"abeille is feminine, so the adjective adds -e: petite."]"
- `items[11].prompt` ""The bee is small"" → "(removed)"
- `items[11].hint` ""l'abeille + est + petite (feminine)"" → "(removed)"
- `items[12].type` "translate" → "transform"
- `items[12].instruction` "(none)" → ""Put the color in the right place.""
- `items[12].shown` "(none)" → ""un oiseau + bleu""
- `items[12].mistakes` "(none)" → "["answer":"un bleu oiseau","feedback":"Colors come after the noun: un oiseau bleu."]"
- `items[12].prompt` ""a blue bird"" → "(removed)"
- `items[12].hint` ""un oiseau + bleu"" → "(removed)"
- `items[13].type` "translate" → "gapfill"
- `items[13].text` "(none)" → ""Sur la fleur, il y a ___.""
- `items[13].blanks` "(none)" → "["answer":"un papillon jaune"]"
- `items[13].gloss` "(none)" → ""On the flower, there is a yellow butterfly.""
- `items[13].mistakes` "(none)" → "["answer":"un jaune papillon","feedback":"Colors come after the noun: un papillon jaune."]"
- `items[13].prompt` ""a yellow butterfly"" → "(removed)"
- `items[13].answer` ""un papillon jaune"" → "(removed)"
- `items[13].hint` ""un papillon + jaune"" → "(removed)"
- `items[14].type` "translate" → "respond"
- `items[14].situation` "(none)" → ""You are in the garden with a friend. Tell them you see a bird.""
- `items[14].accept` "(none)" → "["regarde, je vois un oiseau"]"
- `items[14].prompt` ""I see a bird"" → "(removed)"
- `items[14].hint` ""je vois + un oiseau"" → "(removed)"

**2024-03-16-movement-verbs**

- `concepts` "["id":"c-six-essential-movement-verbs","term":"Six Essential Movement Verbs","definition":"These verbs describe all basic types of movement in nature and daily life","example":"nager (swim), sauter (jump), voler (fly), courir (run), marcher (walk), grimper (climb)","id":"c-regular-er-verbs-pattern","term":"Regular -ER Verbs Pattern","definition":"Most movement verbs follow the regular -ER pattern you already know","example":"nager: je nage, tu nages, il nage, nous nageons, vous nagez, ils nagent","id":"c-courir-irregular-ir-verb","term":"courir - Irregular -IR Verb","definition":"Courir (to run) is irregular but common - memorize the pattern","example":"je cours, tu cours, il court, nous courons, vous courez, ils courent","id":"c-animals-movement","term":"Animals + Movement","definition":"Combine with animal vocabulary to describe how animals move","example":"La tortue nage (the turtle swims), L'oiseau vole (the bird flies), L'écureuil saute (the squirrel jumps)","id":"c-works-in-all-tenses","term":"Works in All Tenses","definition":"These verbs work in all tenses you've learned - present, past, imparfait","example":"Je nage (I swim), J'ai nagé (I swam), Je nageais (I was swimming)"]" → "["id":"c-six-essential-movement-verbs","term":"Six Essential Movement Verbs","definition":"These verbs describe all basic types of movement in nature and daily life","example":"nager (swim), sauter (jump), voler (fly), courir (run), marcher (walk), grimper (climb)","id":"c-regular-er-verbs-pattern","term":"Regular -ER Verbs Pattern","definition":"Most movement verbs follow the regular -ER pattern you already know","example":"nager: je nage, tu nages, il nage, nous nageons, vous nagez, ils nagent","id":"c-courir-irregular-ir-verb","term":"courir - Irregular -IR Verb","definition":"Courir (to run) is irregular but common - memorize the pattern","example":"je cours, tu cours, il court, nous courons, vous courez, ils courent; Je cours jusqu'à la gare (I run as far as the station)","id":"c-animals-movement","term":"Animals + Movement","definition":"Combine with animal vocabulary to describe how animals move","example":"La tortue nage (the turtle swims), Les oiseaux volent (birds fly), L'écureuil saute (the squirrel jumps)","id":"c-works-in-all-tenses","term":"Works in All Tenses","definition":"These verbs work in every tense you know. The table below shows the present, the passé composé and the imparfait.","example":"Je nage (I swim), J'ai nagé (I swam), Je nageais (I was swimming, I used to swim)","id":"c-savoir-infinitive","term":"savoir + infinitive: know how to","definition":"Use savoir with an infinitive for a skill someone has learned, and pouvoir for whether they are able to at that moment.","example":"Je sais nager. (I can swim, I know how.) Les jeunes oiseaux ne savent pas encore voler. (Baby birds can't fly yet.)"]"
- `tables` "(none)" → "["id":"t-three-tenses","title":"nager and courir in the present and the past","rows":["fr":"je nage","en":"I swim","note":"present","fr":"j'ai nagé","en":"I swam","note":"passé composé, with avoir","fr":"je nageais","en":"I was swimming, I used to swim","note":"imparfait: nage- keeps its e before -ais","fr":"il court","en":"he runs","note":"present","fr":"il a couru","en":"he ran","note":"passé composé, with avoir","fr":"il courait","en":"he was running, he used to run","note":"imparfait"]]"
- `items[0].type` "translate" → "gapfill"
- `items[0].text` "(none)" → ""Le matin, je ___ avec mon frère.""
- `items[0].blanks` "(none)" → "["answer":"nage"]"
- `items[0].gloss` "(none)" → ""In the morning, I swim with my brother.""
- `items[0].mistakes` "(none)" → "["answer":"nages","feedback":"With je, nager ends in -e: je nage."]"
- `items[0].prompt` ""I swim"" → "(removed)"
- `items[0].answer` ""je nage"" → "(removed)"
- `items[0].hint` ""nager for je"" → "(removed)"
- `items[1].type` "respond" → "gapfill"
- `items[1].text` "(none)" → ""Tu ___ très bien !""
- `items[1].blanks` "(none)" → "["answer":"nages"]"
- `items[1].gloss` "(none)" → ""You swim very well!""
- `items[1].situation` ""you swim (informal)"" → "(removed)"
- `items[1].answer` ""tu nages"" → "(removed)"
- `items[1].hint` ""nager for tu"" → "(removed)"
- `items[2].type` "translate" → "gapfill"
- `items[2].text` "(none)" → ""Nous ___ tous les matins.""
- `items[2].blanks` "(none)" → "["answer":"nageons"]"
- `items[2].gloss` "(none)" → ""We swim every morning.""
- `items[2].mistakes` "(none)" → "["answer":"nagons","feedback":"Keep the e before -ons so the g stays soft: nageons."]"
- `items[2].prompt` ""we swim"" → "(removed)"
- `items[2].answer` ""nous nageons"" → "(removed)"
- `items[2].hint` ""nager for nous - careful with spelling!"" → "(removed)"
- `items[3].type` "translate" → "transform"
- `items[3].instruction` "(none)" → ""Change the subject to je.""
- `items[3].shown` "(none)" → ""L'écureuil saute.""
- `items[3].prompt` ""I jump"" → "(removed)"
- `items[3].hint` ""sauter for je"" → "(removed)"
- `items[4].type` "translate" → "gapfill"
- `items[4].text` "(none)" → ""Les lapins ___ dans le jardin.""
- `items[4].blanks` "(none)" → "["answer":"sautent"]"
- `items[4].gloss` "(none)" → ""The rabbits are jumping in the garden.""
- `items[4].prompt` ""they jump"" → "(removed)"
- `items[4].answer` ""ils sautent"" → "(removed)"
- `items[4].hint` ""sauter for ils"" → "(removed)"
- `items[5].type` "translate" → "gapfill"
- `items[5].text` "(none)" → ""Le papillon ___ de fleur en fleur.""
- `items[5].blanks` "(none)" → "["answer":"vole"]"
- `items[5].gloss` "(none)" → ""The butterfly flies from flower to flower.""
- `items[5].prompt` ""he flies"" → "(removed)"
- `items[5].answer` ""il vole"" → "(removed)"
- `items[5].hint` ""voler for il"" → "(removed)"
- `items[6].type` "translate" → "transform"
- `items[6].instruction` "(none)" → ""Change the subject to nous.""
- `items[6].shown` "(none)" → ""Les oiseaux volent.""
- `items[6].mistakes` "(none)" → "["answer":"nous volent","feedback":"With nous, the verb usually ends in -ons: nous volons."]"
- `items[6].prompt` ""we fly"" → "(removed)"
- `items[6].hint` ""voler for nous"" → "(removed)"
- `items[7].type` "translate" → "gapfill"
- `items[7].text` "(none)" → ""Je ___ tous les jours dans le parc.""
- `items[7].blanks` "(none)" → "["answer":"cours"]"
- `items[7].gloss` "(none)" → ""I run every day in the park.""
- `items[7].mistakes` "(none)" → "["answer":"court","feedback":"With je, write cours. court goes with il and elle."]"
- `items[7].prompt` ""I run"" → "(removed)"
- `items[7].answer` ""je cours"" → "(removed)"
- `items[7].hint` ""courir for je - irregular!"" → "(removed)"
- `items[8].type` "respond" → "transform"
- `items[8].instruction` "(none)" → ""Change the subject to tu.""
- `items[8].shown` "(none)" → ""Il court.""
- `items[8].mistakes` "(none)" → "["answer":"tu court","feedback":"With tu, write cours, with an s."]"
- `items[8].situation` ""you run (informal)"" → "(removed)"
- `items[8].hint` ""courir for tu - same as je"" → "(removed)"
- `items[9].type` "translate" → "gapfill"
- `items[9].text` "(none)" → ""Il ___ plus vite que moi.""
- `items[9].blanks` "(none)" → "["answer":"court"]"
- `items[9].gloss` "(none)" → ""He runs faster than me.""
- `items[9].mistakes` "(none)" → "["answer":"cours","feedback":"With il, write court, with a t."]"
- `items[9].prompt` ""he runs"" → "(removed)"
- `items[9].answer` ""il court"" → "(removed)"
- `items[9].hint` ""courir for il - drop the -s"" → "(removed)"
- `items[10].type` "translate" → "gapfill"
- `items[10].text` "(none)" → ""La tortue est lente : elle ___ lentement.""
- `items[10].blanks` "(none)" → "["answer":"marche"]"
- `items[10].gloss` "(none)" → ""The turtle is slow: it walks slowly.""
- `items[10].prompt` ""I walk"" → "(removed)"
- `items[10].answer` ""je marche"" → "(removed)"
- `items[10].hint` ""marcher for je"" → "(removed)"
- `items[11].type` "translate" → "gapfill"
- `items[11].text` "(none)" → ""L'écureuil ___ dans l'arbre.""
- `items[11].blanks` "(none)" → "["answer":"grimpe"]"
- `items[11].gloss` "(none)" → ""The squirrel climbs up the tree.""
- `items[11].prompt` ""she climbs"" → "(removed)"
- `items[11].answer` ""elle grimpe"" → "(removed)"
- `items[11].hint` ""grimper for elle"" → "(removed)"
- `items[12].type` "translate" → "transform"
- `items[12].instruction` "(none)" → ""Make it singular.""
- `items[12].shown` "(none)" → ""Les tortues nagent.""
- `items[12].prompt` ""The turtle swims"" → "(removed)"
- `items[12].hint` ""la tortue + nage"" → "(removed)"
- `items[13].type` "translate" → "transform"
- `items[13].instruction` "(none)" → ""Make it singular.""
- `items[13].shown` "(none)" → ""Les oiseaux volent.""
- `items[13].mistakes` "(none)" → "["answer":"l'oiseau volent","feedback":"With one bird, the verb loses -nt: l'oiseau vole."]"
- `items[13].prompt` ""The bird flies"" → "(removed)"
- `items[13].hint` ""l'oiseau + vole"" → "(removed)"
- `items[14].type` "translate" → "respond"
- `items[14].situation` "(none)" → ""Your friend asks: Qu'est-ce que l'écureuil fait ? Say that the squirrel is jumping.""
- `items[14].accept` "["l'ecureuil saute"]" → "["l'ecureuil saute","il saute","il est en train de sauter","l'écureuil est en train de sauter"]"
- `items[14].prompt` ""The squirrel jumps"" → "(removed)"
- `items[14].hint` ""l'écureuil + saute"" → "(removed)"
- `items[15].type` "translate" → "transform"
- `items[15].instruction` "(none)" → ""Change the subject to le lapin.""
- `items[15].shown` "(none)" → ""Je saute.""
- `items[15].prompt` ""The rabbit jumps"" → "(removed)"
- `items[15].hint` ""le lapin + saute"" → "(removed)"
- `items[16].type` "translate" → "respond"
- `items[16].situation` "(none)" → ""Your friend is running ahead of you in the park. Tell them they run fast.""
- `items[16].accept[0]` "tu cours vite!" → "tu cours vite !"
- `items[16].prompt` ""You run fast!"" → "(removed)"
- `items[16].hint` ""tu cours + vite"" → "(removed)"
- `items[17].type` "translate" → "respond"
- `items[17].situation` "(none)" → ""Your friend asks: Qu'est-ce que tu fais en été ? Say that you swim in the sea.""
- `items[17].accept` "(none)" → "["en été, je nage dans la mer","l'été, je nage dans la mer"]"
- `items[17].prompt` ""I swim in the sea"" → "(removed)"
- `items[17].hint` ""je nage + dans la mer"" → "(removed)"
- `items[18].type` "respond" → "transform"
- `items[18].instruction` "(none)" → ""Put it in the passé composé.""
- `items[18].shown` "(none)" → ""Je nage.""
- `items[18].mistakes` "(none)" → "["answer":"je suis nagé","feedback":"nager takes avoir in the passé composé: j'ai nagé."]"
- `items[18].situation` ""Say 'I swam' (passé composé)"" → "(removed)"
- `items[18].cue` ""I swam"" → "(removed)"
- `items[18].hint` ""j'ai + past participle of nager"" → "(removed)"

**2024-03-17-natural-phenomena**

- `vocabulary[33].note` "⭐⭐⭐ CRITICAL - irregular like prendre - CAUSATIVE!" → "a regular -re verb, like attendre: nous rendons, ils rendent"
- `vocabulary[44].note` "⭐ QUESTION PATTERN with causative!" → "a preview of the next lesson, which teaches this question"
- `concepts` "["id":"c-natural-process-verbs","term":"Natural Process Verbs","definition":"Verbs that describe what happens in nature - shining, growing, raining","example":"Le soleil brille (the sun shines), Les plantes poussent (plants grow), Le vent souffle (the wind blows)","id":"c-pleuvoir-impersonal-verb","term":"pleuvoir - Impersonal Verb","definition":"Pleuvoir (to rain) only uses 'il' form - il pleut (it rains)","example":"il pleut (it rains), il a plu (it rained), il pleuvait (it was raining)","id":"c-rendre-critical-causative-verb","term":"rendre - CRITICAL Causative Verb!","definition":"Rendre means 'to make/render' - conjugates like prendre. Use with adjectives to show cause!","example":"Le soleil rend l'herbe verte (the sun makes grass green), Le froid rend l'eau glacée (cold makes water frozen)","id":"c-causative-pattern-rendre-adjective","term":"Causative Pattern: rendre + adjective","definition":"Pattern: [subject] + rendre + [object] + [adjective] = subject makes object [adjective]","example":"Qu'est-ce qui rend le ciel bleu? (What makes the sky blue?) → La lumière rend le ciel bleu (Light makes the sky blue)","id":"c-setting-up-question-patterns","term":"Setting Up Question Patterns","definition":"These verbs enable sophisticated 'why' and 'what makes' questions","example":"Pourquoi est-ce que le soleil brille? Qu'est-ce qui rend l'herbe verte? Comment est-ce que les plantes poussent?"]" → "["id":"c-natural-process-verbs","term":"Natural Process Verbs","definition":"Verbs that describe what happens in nature - shining, growing, raining","example":"Le soleil brille (the sun shines), Les plantes poussent (plants grow), Le vent souffle (the wind blows)","id":"c-pleuvoir-impersonal-verb","term":"pleuvoir - Impersonal Verb","definition":"Pleuvoir (to rain) only uses 'il' form - il pleut (it rains)","example":"il pleut (it rains), il a plu (it rained), il pleuvait (it was raining)","id":"c-rendre-critical-causative-verb","term":"rendre - CRITICAL Causative Verb!","definition":"rendre with an adjective means to make something that way. It is a regular -re verb, like attendre: nous rendons, ils rendent.","example":"Le soleil rend l'herbe verte (the sun makes grass green), Le froid rend l'eau glacée (cold makes water frozen)","id":"c-causative-pattern-rendre-adjective","term":"Causative Pattern: rendre + adjective","definition":"Pattern: [subject] + rendre + [object] + [adjective] = subject makes object [adjective]","example":"La pluie rend la terre humide (rain makes the earth wet), Le soleil rend l'herbe verte (the sun makes grass green)","id":"c-setting-up-question-patterns","term":"Setting Up Question Patterns","definition":"The next lessons use these verbs to ask why and how.","example":"Pourquoi est-ce que le soleil brille ? Comment est-ce que les plantes poussent ?","id":"c-ne-plus-no-longer","term":"ne … plus: no longer","definition":"Put ne before the verb and plus after it to say that something has stopped. It works like ne … pas.","example":"Il ne pleut plus. (It isn't raining any more.) Le vent ne souffle plus. (The wind isn't blowing any more.)"]"
- `items[0].type` "translate" → "gapfill"
- `items[0].text` "(none)" → ""Il fait beau : le soleil ___.""
- `items[0].blanks` "(none)" → "["answer":"brille"]"
- `items[0].gloss` "(none)" → ""The weather is nice: the sun is shining.""
- `items[0].prompt` ""he shines"" → "(removed)"
- `items[0].answer` ""il brille"" → "(removed)"
- `items[0].hint` ""briller for il"" → "(removed)"
- `items[1].type` "translate" → "respond"
- `items[1].situation` "(none)" → ""Your friend asks: Il fait beau aujourd'hui ? Say yes, the sun is shining.""
- `items[1].accept` "(none)" → "["oui, le soleil brille","oui, il fait beau, le soleil brille"]"
- `items[1].prompt` ""The sun shines"" → "(removed)"
- `items[1].hint` ""le soleil + brille"" → "(removed)"
- `items[2].type` "translate" → "gapfill"
- `items[2].text` "(none)" → ""Au printemps, les fleurs ___.""
- `items[2].blanks` "(none)" → "["answer":"poussent"]"
- `items[2].gloss` "(none)" → ""In spring, flowers grow.""
- `items[2].prompt` ""they grow"" → "(removed)"
- `items[2].answer` ""ils poussent"" → "(removed)"
- `items[2].hint` ""pousser for ils"" → "(removed)"
- `items[3].type` "translate" → "transform"
- `items[3].instruction` "(none)" → ""Make it plural.""
- `items[3].shown` "(none)" → ""La plante pousse.""
- `items[3].prompt` ""Plants grow"" → "(removed)"
- `items[3].hint` ""les plantes + poussent"" → "(removed)"
- `items[4].type` "translate" → "respond"
- `items[4].situation` "(none)" → ""Your friend asks: Quand est-ce que les plantes poussent ? Answer: in spring.""
- `items[4].accept` "(none)" → "["au printemps","elles poussent au printemps"]"
- `items[4].prompt` ""Plants grow in spring"" → "(removed)"
- `items[4].hint` ""les plantes poussent + au printemps"" → "(removed)"
- `items[5].situation` "Say 'It rains' / 'It's raining'" → "You look out of the window and see rain. Tell your friend it is raining."
- `items[5].cue` ""It rains"" → "(removed)"
- `items[5].hint` ""impersonal verb - only il pleut"" → "(removed)"
- `items[6].type` "respond" → "transform"
- `items[6].instruction` "(none)" → ""Put it in the passé composé.""
- `items[6].shown` "(none)" → ""Il pleut.""
- `items[6].mistakes` "(none)" → "["answer":"il a pleuvu","feedback":"The past participle of pleuvoir is irregular: il a plu."]"
- `items[6].situation` ""Say 'It rained' (passé composé)"" → "(removed)"
- `items[6].cue` ""It rained"" → "(removed)"
- `items[6].hint` ""il + a + plu (irregular past participle!)"" → "(removed)"
- `items[7].type` "translate" → "gapfill"
- `items[7].text` "(none)" → ""Il fait froid et le vent ___.""
- `items[7].blanks` "(none)" → "["answer":"souffle"]"
- `items[7].gloss` "(none)" → ""It is cold and the wind is blowing.""
- `items[7].prompt` ""The wind blows"" → "(removed)"
- `items[7].answer` ""le vent souffle"" → "(removed)"
- `items[7].hint` ""le vent + souffle"" → "(removed)"
- `items[8].type` "translate" → "gapfill"
- `items[8].text` "(none)" → ""Je ___ ma mère heureuse.""
- `items[8].blanks` "(none)" → "["answer":"rends"]"
- `items[8].gloss` "(none)" → ""I make my mother happy.""
- `items[8].mistakes` "(none)" → "["answer":"rend","feedback":"With je, rendre ends in -s: je rends."]"
- `items[8].prompt` ""I make / I render"" → "(removed)"
- `items[8].answer` ""je rends"" → "(removed)"
- `items[8].hint` ""rendre for je - like prendre!"" → "(removed)"
- `items[9].type` "translate" → "gapfill"
- `items[9].text` "(none)" → ""Le soleil me ___ heureux.""
- `items[9].blanks` "(none)" → "["answer":"rend"]"
- `items[9].gloss` "(none)" → ""The sun makes me happy.""
- `items[9].prompt` ""it makes / renders"" → "(removed)"
- `items[9].answer` ""il rend"" → "(removed)"
- `items[9].hint` ""rendre for il"" → "(removed)"
- `items[10].type` "translate" → "gapfill"
- `items[10].text` "(none)" → ""Les vacances me ___ heureux.""
- `items[10].blanks` "(none)" → "["answer":"rendent"]"
- `items[10].gloss` "(none)" → ""Holidays make me happy.""
- `items[10].prompt` ""they make / render"" → "(removed)"
- `items[10].answer` ""ils rendent"" → "(removed)"
- `items[10].hint` ""rendre for ils"" → "(removed)"
- `items[11].type` "translate" → "transform"
- `items[11].instruction` "(none)" → ""Say it with rendre.""
- `items[11].shown` "(none)" → ""le soleil / l'herbe / verte""
- `items[11].prompt` ""The sun makes grass green"" → "(removed)"
- `items[11].hint` ""le soleil + rend + l'herbe + verte"" → "(removed)"
- `items[12].type` "translate" → "transform"
- `items[12].instruction` "(none)" → ""Say it with rendre.""
- `items[12].shown` "(none)" → ""Il fait froid, alors l'eau est glacée.""
- `items[12].prompt` ""Cold makes water frozen"" → "(removed)"
- `items[12].hint` ""le froid + rend + l'eau + glacée"" → "(removed)"
- `items[13].type` "translate" → "transform"
- `items[13].instruction` "(none)" → ""Say it with rendre.""
- `items[13].shown` "(none)" → ""Il pleut, alors la terre est humide.""
- `items[13].prompt` ""Rain makes the earth wet"" → "(removed)"
- `items[13].hint` ""la pluie + rend + la terre + humide"" → "(removed)"
- `items[14].type` "translate" → "respond"
- `items[14].situation` "(none)" → ""Your friend asks: Où est-ce que le soleil brille ? Answer: in the sky.""
- `items[14].accept` "(none)" → "["dans le ciel","il brille dans le ciel"]"
- `items[14].prompt` ""The sun shines in the sky"" → "(removed)"
- `items[14].hint` ""le soleil brille + dans le ciel"" → "(removed)"

**2024-03-15-questce-qui-que**

- `vocabulary[1].word_id` "qu-est-ce-que-fr.object-pronoun" → "qu-est-ce-que-fr"
- `concepts[3].definition` "If verb has NO object → use QUI. If verb has an object → use QUE" → "If 'what' is the subject (no other subject follows) → qui. If another subject follows → que."
- `items[0].mistakes[0].feedback` "Use 'qu'est-ce QUI' when asking what DOES something (subject). 'Brille' has no object! The thing itself shines. Use QUI for subjects, QUE for objects." → "Use qu'est-ce qui here: 'what' is the subject, and no other subject follows. Use qu'est-ce que when another subject follows."

**2024-03-19-pourquoi-complex**

- `concepts[0].definition` "You already know pourquoi - now compose it with EVERYTHING from Units 1-11!" → "You already know pourquoi - now compose it with EVERYTHING you've learned so far!"
- `items[0].type` "translate" → "transform"
- `items[0].instruction` "(none)" → ""Ask why, with pourquoi est-ce que.""
- `items[0].shown` "(none)" → ""Le ciel est bleu.""
- `items[0].answer` "pourquoi est-ce que le ciel est bleu?" → "pourquoi est-ce que le ciel est bleu ?"
- `items[0].mistakes` "(none)" → "["answer":"pourquoi est-ce que est le ciel bleu ?","feedback":"After est-ce que, keep statement order: subject, then verb."]"
- `items[0].prompt` ""Why is the sky blue?"" → "(removed)"
- `items[0].hint` ""pourquoi est-ce que + le ciel est bleu"" → "(removed)"
- `items[1].type` "translate" → "transform"
- `items[1].instruction` "(none)" → ""Ask why, with pourquoi est-ce que.""
- `items[1].shown` "(none)" → ""L'herbe est verte.""
- `items[1].answer` "pourquoi est-ce que l'herbe est verte?" → "pourquoi est-ce que l'herbe est verte ?"
- `items[1].prompt` ""Why is grass green?"" → "(removed)"
- `items[1].hint` ""pourquoi est-ce que + l'herbe est verte"" → "(removed)"
- `items[2].type` "translate" → "transform"
- `items[2].instruction` "(none)" → ""Ask why, with pourquoi est-ce que.""
- `items[2].shown` "(none)" → ""Les nuages sont blancs.""
- `items[2].answer` "pourquoi est-ce que les nuages sont blancs?" → "pourquoi est-ce que les nuages sont blancs ?"
- `items[2].prompt` ""Why are clouds white?"" → "(removed)"
- `items[2].hint` ""pourquoi est-ce que + les nuages sont blancs"" → "(removed)"
- `items[3].type` "translate" → "transform"
- `items[3].instruction` "(none)" → ""Ask why, with pourquoi est-ce que.""
- `items[3].shown` "(none)" → ""C'est comme ça.""
- `items[3].answer` "pourquoi est-ce que c'est comme ça?" → "pourquoi est-ce que c'est comme ça ?"
- `items[3].prompt` ""Why is it like that?"" → "(removed)"
- `items[3].hint` ""pourquoi est-ce que + c'est comme ça"" → "(removed)"
- `items[4].type` "translate" → "respond"
- `items[4].situation` "(none)" → ""Your little brother has your phone. Ask your mother why he has it, with pourquoi est-ce que.""
- `items[4].answer` "pourquoi est-ce qu'il a ça?" → "pourquoi est-ce qu'il a ça ?"
- `items[4].accept` "["pourquoi est-ce qu'il a ça"]" → "["pourquoi est-ce qu'il a ça","pourquoi est-ce qu'il a mon téléphone ?"]"
- `items[4].prompt` ""Why does he have that?"" → "(removed)"
- `items[4].hint` ""pourquoi est-ce que + il a ça"" → "(removed)"
- `items[5].type` "translate" → "transform"
- `items[5].instruction` "(none)" → ""Ask why, with pourquoi est-ce que.""
- `items[5].shown` "(none)" → ""Les oiseaux ont des ailes.""
- `items[5].answer` "pourquoi est-ce que les oiseaux ont des ailes?" → "pourquoi est-ce que les oiseaux ont des ailes ?"
- `items[5].prompt` ""Why do birds have wings?"" → "(removed)"
- `items[5].hint` ""pourquoi est-ce que + les oiseaux ont des ailes"" → "(removed)"
- `items[6].type` "translate" → "transform"
- `items[6].instruction` "(none)" → ""Ask why, with pourquoi est-ce que.""
- `items[6].shown` "(none)" → ""Le soleil brille.""
- `items[6].answer` "pourquoi est-ce que le soleil brille?" → "pourquoi est-ce que le soleil brille ?"
- `items[6].prompt` ""Why does the sun shine?"" → "(removed)"
- `items[6].hint` ""pourquoi est-ce que + le soleil brille"" → "(removed)"
- `items[7].type` "translate" → "transform"
- `items[7].instruction` "(none)" → ""Ask why, with pourquoi est-ce que.""
- `items[7].shown` "(none)" → ""Les oiseaux volent.""
- `items[7].answer` "pourquoi est-ce que les oiseaux volent?" → "pourquoi est-ce que les oiseaux volent ?"
- `items[7].prompt` ""Why do birds fly?"" → "(removed)"
- `items[7].hint` ""pourquoi est-ce que + les oiseaux volent"" → "(removed)"
- `items[8].type` "translate" → "transform"
- `items[8].instruction` "(none)" → ""Ask why, with pourquoi est-ce que.""
- `items[8].shown` "(none)" → ""Les plantes poussent.""
- `items[8].answer` "pourquoi est-ce que les plantes poussent?" → "pourquoi est-ce que les plantes poussent ?"
- `items[8].prompt` ""Why do plants grow?"" → "(removed)"
- `items[8].hint` ""pourquoi est-ce que + les plantes poussent"" → "(removed)"
- `items[9].type` "translate" → "transform"
- `items[9].instruction` "(none)" → ""Ask why, with pourquoi est-ce que.""
- `items[9].shown` "(none)" → ""Il pleut.""
- `items[9].answer` "pourquoi est-ce qu'il pleut?" → "pourquoi est-ce qu'il pleut ?"
- `items[9].mistakes` "(none)" → "["answer":"pourquoi est-ce que il pleut ?","feedback":"que becomes qu' before a vowel: est-ce qu'il."]"
- `items[9].prompt` ""Why does it rain?"" → "(removed)"
- `items[9].hint` ""pourquoi est-ce que + il pleut"" → "(removed)"
- `items[10].type` "translate" → "respond"
- `items[10].situation` "(none)" → ""Your little brother is running in the house. Ask him why he is running, with pourquoi est-ce que.""
- `items[10].answer` "pourquoi est-ce que tu cours?" → "pourquoi est-ce que tu cours ?"
- `items[10].accept` "["pourquoi est-ce que tu cours"]" → "["pourquoi est-ce que tu cours","pourquoi est-ce que tu cours dans la maison ?"]"
- `items[10].prompt` ""Why are you running?"" → "(removed)"
- `items[10].hint` ""pourquoi est-ce que + tu cours"" → "(removed)"
- `items[11].type` "translate" → "transform"
- `items[11].instruction` "(none)" → ""Ask why, with pourquoi est-ce que.""
- `items[11].shown` "(none)" → ""Il fait ça.""
- `items[11].answer` "pourquoi est-ce qu'il fait ça?" → "pourquoi est-ce qu'il fait ça ?"
- `items[11].prompt` ""Why does he do that?"" → "(removed)"
- `items[11].hint` ""pourquoi est-ce que + il fait ça"" → "(removed)"
- `items[14].type` "translate" → "transform"
- `items[14].instruction` "(none)" → ""Ask why, with pourquoi est-ce que.""
- `items[14].shown` "(none)" → ""Je dois faire ça.""
- `items[14].answer` "pourquoi est-ce que je dois faire ça?" → "pourquoi est-ce que je dois faire ça ?"
- `items[14].prompt` ""Why do I have to do that?"" → "(removed)"
- `items[14].hint` ""pourquoi est-ce que + je dois faire ça"" → "(removed)"
- `items[15].type` "translate" → "transform"
- `items[15].instruction` "(none)" → ""Ask why, with pourquoi est-ce que.""
- `items[15].shown` "(none)" → ""On peut voir le soleil.""
- `items[15].answer` "pourquoi est-ce qu'on peut voir le soleil?" → "pourquoi est-ce qu'on peut voir le soleil ?"
- `items[15].prompt` ""Why can we see the sun?"" → "(removed)"
- `items[15].hint` ""pourquoi est-ce que + on peut voir le soleil"" → "(removed)"
- `items[16].type` "translate" → "transform"
- `items[16].instruction` "(none)" → ""Ask why, with pourquoi est-ce que.""
- `items[16].shown` "(none)" → ""Tu te dépêches.""
- `items[16].answer` "pourquoi est-ce que tu te dépêches?" → "pourquoi est-ce que tu te dépêches ?"
- `items[16].prompt` ""Why are you hurrying?"" → "(removed)"
- `items[16].hint` ""pourquoi est-ce que + tu te dépêches"" → "(removed)"
- `items[17].type` "translate" → "transform"
- `items[17].instruction` "(none)" → ""Ask why, with pourquoi est-ce que.""
- `items[17].shown` "(none)" → ""Les plantes ont besoin d'eau.""
- `items[17].answer` "pourquoi est-ce que les plantes ont besoin d'eau?" → "pourquoi est-ce que les plantes ont besoin d'eau ?"
- `items[17].prompt` ""Why do plants need water?"" → "(removed)"
- `items[17].hint` ""pourquoi est-ce que + les plantes ont besoin d'eau"" → "(removed)"

**2024-03-20-comment-complex**

- `vocabulary[1].review` "(none)" → "true"
- `vocabulary[3].review` "(none)" → "true"
- `vocabulary[9].review` "(none)" → "true"
- `items[0].type` "translate" → "transform"
- `items[0].instruction` "(none)" → ""Ask how, with comment est-ce que.""
- `items[0].shown` "(none)" → ""Une tortue nage.""
- `items[0].answer` "comment est-ce qu'une tortue nage?" → "comment est-ce qu'une tortue nage ?"
- `items[0].mistakes` "(none)" → "["answer":"comment est-ce que une tortue nage ?","feedback":"que becomes qu' before a vowel: est-ce qu'une tortue."]"
- `items[0].prompt` ""How does a turtle swim?"" → "(removed)"
- `items[0].hint` ""comment est-ce que + une tortue nage"" → "(removed)"
- `items[1].type` "translate" → "transform"
- `items[1].instruction` "(none)" → ""Ask how, with comment est-ce que.""
- `items[1].shown` "(none)" → ""Un oiseau vole.""
- `items[1].answer` "comment est-ce qu'un oiseau vole?" → "comment est-ce qu'un oiseau vole ?"
- `items[1].prompt` ""How does a bird fly?"" → "(removed)"
- `items[1].hint` ""comment est-ce que + un oiseau vole"" → "(removed)"
- `items[2].type` "translate" → "transform"
- `items[2].instruction` "(none)" → ""Ask how, with comment est-ce que.""
- `items[2].shown` "(none)" → ""Un écureuil saute.""
- `items[2].answer` "comment est-ce qu'un écureuil saute?" → "comment est-ce qu'un écureuil saute ?"
- `items[2].accept` "["comment est-ce qu'un écureuil saute","comment est-ce qu'un ecureuil saute","comment est-ce qu'un ecureuil saute?"]" → "["comment est-ce qu'un écureuil saute","comment est-ce qu'un ecureuil saute"]"
- `items[2].prompt` ""How does a squirrel jump?"" → "(removed)"
- `items[2].hint` ""comment est-ce que + un écureuil saute"" → "(removed)"
- `items[3].type` "translate" → "transform"
- `items[3].instruction` "(none)" → ""Ask how, with comment est-ce que.""
- `items[3].shown` "(none)" → ""Un lapin saute.""
- `items[3].answer` "comment est-ce qu'un lapin saute?" → "comment est-ce qu'un lapin saute ?"
- `items[3].prompt` ""How does a rabbit jump?"" → "(removed)"
- `items[3].hint` ""comment est-ce que + un lapin saute"" → "(removed)"
- `items[4].type` "translate" → "transform"
- `items[4].instruction` "(none)" → ""Ask how, with comment est-ce que.""
- `items[4].shown` "(none)" → ""Un écureuil grimpe.""
- `items[4].answer` "comment est-ce qu'un écureuil grimpe?" → "comment est-ce qu'un écureuil grimpe ?"
- `items[4].accept` "["comment est-ce qu'un écureuil grimpe","comment est-ce qu'un ecureuil grimpe","comment est-ce qu'un ecureuil grimpe?"]" → "["comment est-ce qu'un écureuil grimpe","comment est-ce qu'un ecureuil grimpe"]"
- `items[4].prompt` ""How does a squirrel climb?"" → "(removed)"
- `items[4].hint` ""comment est-ce que + un écureuil grimpe"" → "(removed)"
- `items[5].type` "translate" → "transform"
- `items[5].instruction` "(none)" → ""Ask how, with comment est-ce que.""
- `items[5].shown` "(none)" → ""Les plantes poussent.""
- `items[5].answer` "comment est-ce que les plantes poussent?" → "comment est-ce que les plantes poussent ?"
- `items[5].prompt` ""How do plants grow?"" → "(removed)"
- `items[5].hint` ""comment est-ce que + les plantes poussent"" → "(removed)"
- `items[6].type` "translate" → "transform"
- `items[6].instruction` "(none)" → ""Ask how, with comment est-ce que.""
- `items[6].shown` "(none)" → ""Le soleil brille.""
- `items[6].answer` "comment est-ce que le soleil brille?" → "comment est-ce que le soleil brille ?"
- `items[6].prompt` ""How does the sun shine?"" → "(removed)"
- `items[6].hint` ""comment est-ce que + le soleil brille"" → "(removed)"
- `items[7].type` "translate" → "transform"
- `items[7].instruction` "(none)" → ""Ask how, with comment est-ce que.""
- `items[7].shown` "(none)" → ""La pluie tombe.""
- `items[7].answer` "comment est-ce que la pluie tombe?" → "comment est-ce que la pluie tombe ?"
- `items[7].prompt` ""How does rain fall?"" → "(removed)"
- `items[7].hint` ""comment est-ce que + la pluie tombe"" → "(removed)"
- `items[8].type` "translate" → "respond"
- `items[8].situation` "(none)" → ""Your friend opens a box that you could not open. Ask how it is done, with comment est-ce que and on.""
- `items[8].cue` "(none)" → ""How do we do that?""
- `items[8].answer` "comment est-ce qu'on fait ça?" → "comment est-ce qu'on fait ça ?"
- `items[8].prompt` ""How do we do that?"" → "(removed)"
- `items[8].hint` ""comment est-ce que + on fait ça"" → "(removed)"
- `items[9].type` "translate" → "respond"
- `items[9].situation` "(none)" → ""Your friend does a card trick. Ask how they do that, with comment est-ce que.""
- `items[9].answer` "comment est-ce que tu fais ça?" → "comment est-ce que tu fais ça ?"
- `items[9].prompt` ""How do you do that?"" → "(removed)"
- `items[9].hint` ""comment est-ce que + tu fais ça"" → "(removed)"
- `items[10].type` "translate" → "respond"
- `items[10].situation` "(none)" → ""Your friend swims very well. Ask how they swim, with comment est-ce que.""
- `items[10].answer` "comment est-ce que tu nages?" → "comment est-ce que tu nages ?"
- `items[10].accept` "["comment est-ce que tu nages"]" → "["comment est-ce que tu nages","comment est-ce que tu nages si bien ?"]"
- `items[10].prompt` ""How do you swim?"" → "(removed)"
- `items[10].hint` ""comment est-ce que + tu nages"" → "(removed)"
- `items[11].type` "translate" → "transform"
- `items[11].instruction` "(none)" → ""Ask how, with comment est-ce que.""
- `items[11].shown` "(none)" → ""Il court si vite.""
- `items[11].answer` "comment est-ce qu'il court si vite?" → "comment est-ce qu'il court si vite ?"
- `items[11].prompt` ""How does he run so fast?"" → "(removed)"
- `items[11].hint` ""comment est-ce que + il court si vite"" → "(removed)"
- `items[12].type` "translate" → "transform"
- `items[12].instruction` "(none)" → ""Ask how, with comment est-ce que.""
- `items[12].shown` "(none)" → ""Ça rend l'herbe verte.""
- `items[12].answer` "comment est-ce que ça rend l'herbe verte?" → "comment est-ce que ça rend l'herbe verte ?"
- `items[12].prompt` ""How does that make grass green?"" → "(removed)"
- `items[12].hint` ""comment est-ce que + ça rend l'herbe verte"" → "(removed)"

**2024-03-16-quiest-qui-que**

- `items[12].type` "respond" → "gapfill"
- `items[12].text` "(none)" → ""___ tu as vu au marché ?""
- `items[12].blanks` "(none)" → "["answer":"qui est-ce que"]"
- `items[12].gloss` "(none)" → ""Who did you see at the market?""
- `items[12].mistakes` "(none)" → "["answer":"qui est-ce qui","feedback":"Another subject, tu, comes next, so the person seen is the object: qui est-ce que."]"
- `items[12].situation` ""Ask 'Who did you meet?' (object, past tense)"" → "(removed)"
- `items[12].cue` ""Who did you meet?"" → "(removed)"
- `items[12].answer` ""qui est-ce que tu as rencontré?"" → "(removed)"
- `items[12].accept` "["qui est-ce que tu as rencontré","qui est-ce que tu as rencontre","qui est-ce que tu as rencontre?"]" → "(removed)"
- `items[12].hint` ""qui est-ce que + tu as rencontré"" → "(removed)"

**2024-03-23-embedded-questions**

- `items[0].type` "translate" → "transform"
- `items[0].instruction` "(none)" → ""Start with Je me demande.""
- `items[0].shown` "(none)" → ""Pourquoi est-ce que c'est comme ça ?""
- `items[0].mistakes` "(none)" → "["answer":"je me demande pourquoi est-ce que c'est comme ça","feedback":"After je me demande, drop est-ce que: pourquoi c'est comme ça."]"
- `items[0].prompt` ""I wonder why it's like that"" → "(removed)"
- `items[0].hint` ""je me demande + pourquoi c'est comme ça (no est-ce que!)"" → "(removed)"
- `items[1].type` "translate" → "transform"
- `items[1].instruction` "(none)" → ""Start with Je me demande.""
- `items[1].shown` "(none)" → ""Comment est-ce que ça marche ?""
- `items[1].prompt` ""I wonder how that works"" → "(removed)"
- `items[1].hint` ""je me demande + comment ça marche"" → "(removed)"
- `items[2].type` "translate" → "respond"
- `items[2].situation` "(none)" → ""You look up at the sky with a friend. Say that you wonder why it is blue, starting with Je me demande.""
- `items[2].cue` "(none)" → ""I wonder why the sky is blue""
- `items[2].accept` "(none)" → "["je me demande pourquoi il est bleu"]"
- `items[2].mistakes` "(none)" → "["answer":"je me demande pourquoi le ciel est-il bleu","feedback":"Inside the sentence, use statement order with no inversion: pourquoi le ciel est bleu."]"
- `items[2].prompt` ""I wonder why the sky is blue"" → "(removed)"
- `items[2].hint` ""je me demande + pourquoi le ciel est bleu"" → "(removed)"
- `items[3].type` "translate" → "transform"
- `items[3].instruction` "(none)" → ""Start with Je me demande.""
- `items[3].shown` "(none)" → ""Où est-il ?""
- `items[3].mistakes` "(none)" → "["answer":"je me demande où est-il","feedback":"Inside the sentence, put the subject before the verb: où il est."]"
- `items[3].prompt` ""I wonder where he is"" → "(removed)"
- `items[3].hint` ""je me demande + où il est"" → "(removed)"
- `items[4].type` "translate" → "respond"
- `items[4].situation` "(none)" → ""Someone asks you: Comment est-ce qu'on fait ça ? You have no idea. Say you don't know how we do that.""
- `items[4].accept` "(none)" → "["je ne sais pas comment on fait"]"
- `items[4].prompt` ""I don't know how we do that"" → "(removed)"
- `items[4].hint` ""je ne sais pas + comment on fait ça"" → "(removed)"
- `items[5].type` "translate" → "transform"
- `items[5].instruction` "(none)" → ""Start with Je ne sais pas.""
- `items[5].shown` "(none)" → ""Pourquoi fait-il ça ?""
- `items[5].prompt` ""I don't know why he does that"" → "(removed)"
- `items[5].hint` ""je ne sais pas + pourquoi il fait ça"" → "(removed)"
- `items[6].type` "translate" → "respond"
- `items[6].situation` "(none)" → ""A child asks you: Comment est-ce qu'une tortue nage ? You have no idea. Say so, starting with Je ne sais pas.""
- `items[6].cue` "(none)" → ""I don't know how a turtle swims""
- `items[6].accept` "(none)" → "["je ne sais pas comment nage une tortue","je ne sais pas comment elle nage"]"
- `items[6].mistakes` "(none)" → "["answer":"je ne sais pas comment est-ce qu'une tortue nage","feedback":"After je ne sais pas, drop est-ce que."]"
- `items[6].prompt` ""I don't know how a turtle swims"" → "(removed)"
- `items[6].hint` ""je ne sais pas + comment une tortue nage"" → "(removed)"
- `items[7].type` "translate" → "respond"
- `items[7].situation` "(none)" → ""A tourist asks you: Où est la gare ? You don't know. Tell them.""
- `items[7].accept` "(none)" → "["je ne sais pas où la gare est","désolé, je ne sais pas où est la gare","désolée, je ne sais pas où est la gare"]"
- `items[7].prompt` ""I don't know where the station is"" → "(removed)"
- `items[7].hint` ""je ne sais pas + où est la gare"" → "(removed)"
- `items[8].type` "translate" → "respond"
- `items[8].situation` "(none)" → ""You are lost in town. Ask a friend where the station is, politely, with peux-tu me dire.""
- `items[8].answer` "peux-tu me dire où est la gare?" → "peux-tu me dire où est la gare ?"
- `items[8].accept` "["peux-tu me dire où est la gare"]" → "["peux-tu me dire où est la gare","peux-tu me dire où la gare est ?"]"
- `items[8].prompt` ""Can you tell me where the station is?"" → "(removed)"
- `items[8].hint` ""peux-tu me dire + où est la gare"" → "(removed)"
- `items[9].type` "translate" → "transform"
- `items[9].instruction` "(none)" → ""Ask politely, with Peux-tu me dire.""
- `items[9].shown` "(none)" → ""Comment ça marche ?""
- `items[9].answer` "peux-tu me dire comment ça marche?" → "peux-tu me dire comment ça marche ?"
- `items[9].prompt` ""Can you tell me how that works?"" → "(removed)"
- `items[9].hint` ""peux-tu me dire + comment ça marche"" → "(removed)"
- `items[10].type` "translate" → "transform"
- `items[10].instruction` "(none)" → ""Ask politely, with Peux-tu me dire.""
- `items[10].shown` "(none)" → ""Pourquoi est-ce qu'il fait ça ?""
- `items[10].answer` "peux-tu me dire pourquoi il fait ça?" → "peux-tu me dire pourquoi il fait ça ?"
- `items[10].mistakes` "(none)" → "["answer":"peux-tu me dire pourquoi est-ce qu'il fait ça ?","feedback":"After peux-tu me dire, drop est-ce que: pourquoi il fait ça."]"
- `items[10].prompt` ""Can you tell me why he does that?"" → "(removed)"
- `items[10].hint` ""peux-tu me dire + pourquoi il fait ça"" → "(removed)"
- `items[11].type` "translate" → "transform"
- `items[11].instruction` "(none)" → ""Ask it with Tu sais.""
- `items[11].shown` "(none)" → ""Pourquoi il fait ça ?""
- `items[11].answer` "tu sais pourquoi il fait ça?" → "tu sais pourquoi il fait ça ?"
- `items[11].prompt` ""Do you know why he does that?"" → "(removed)"
- `items[11].hint` ""tu sais + pourquoi il fait ça"" → "(removed)"
- `items[12].type` "translate" → "transform"
- `items[12].instruction` "(none)" → ""Start with On ne comprend pas.""
- `items[12].shown` "(none)" → ""Pourquoi c'est comme ça ?""
- `items[12].prompt` ""We don't understand why it's like that"" → "(removed)"
- `items[12].hint` ""on ne comprend pas + pourquoi c'est comme ça"" → "(removed)"

**2024-03-24-rhetorical-negative**

- `items[0].type` "translate" → "respond"
- `items[0].situation` "(none)" → ""Your friend doubts that French bread is the best. Ask a negative question to get them to agree.""
- `items[0].answer` "n'est-ce pas vrai?" → "n'est-ce pas vrai ?"
- `items[0].accept` "["n'est-ce pas vrai"]" → "["n'est-ce pas vrai","c'est vrai, n'est-ce pas ?"]"
- `items[0].prompt` ""Isn't that true?"" → "(removed)"
- `items[0].hint` ""n'est-ce pas + vrai"" → "(removed)"
- `items[2].type` "translate" → "transform"
- `items[2].instruction` "(none)" → ""Ask it with inversion.""
- `items[2].shown` "(none)" → ""Tu n'es pas content ?""
- `items[2].answer` "n'es-tu pas content?" → "n'es-tu pas content ?"
- `items[2].accept` "["n'es-tu pas content"]" → "["n'es-tu pas content","n'es-tu pas contente ?","n'es-tu pas contente"]"
- `items[2].mistakes` "(none)" → "["answer":"ne es-tu pas content ?","feedback":"ne becomes n' before a vowel: n'es-tu pas."]"
- `items[2].prompt` ""Aren't you happy?"" → "(removed)"
- `items[2].hint` ""n'es-tu pas + content"" → "(removed)"
- `items[3].type` "translate" → "transform"
- `items[3].instruction` "(none)" → ""Ask it with inversion.""
- `items[3].shown` "(none)" → ""Tu n'as pas faim ?""
- `items[3].answer` "n'as-tu pas faim?" → "n'as-tu pas faim ?"
- `items[3].mistakes` "(none)" → "["answer":"n'as pas-tu faim ?","feedback":"pas comes after the inverted pair: n'as-tu pas."]"
- `items[3].prompt` ""Aren't you hungry?"" → "(removed)"
- `items[3].hint` ""n'as-tu pas + faim"" → "(removed)"
- `items[4].type` "translate" → "transform"
- `items[4].instruction` "(none)" → ""Ask it with inversion.""
- `items[4].shown` "(none)" → ""Tu ne veux pas essayer ?""
- `items[4].answer` "ne veux-tu pas essayer?" → "ne veux-tu pas essayer ?"
- `items[4].prompt` ""Don't you want to try?"" → "(removed)"
- `items[4].hint` ""ne veux-tu pas + essayer"" → "(removed)"
- `items[10].type` "translate" → "transform"
- `items[10].instruction` "(none)" → ""Ask it with inversion.""
- `items[10].shown` "(none)" → ""Ce n'est pas magnifique ?""
- `items[10].answer` "n'est-ce pas magnifique?" → "n'est-ce pas magnifique ?"
- `items[10].prompt` ""Isn't that magnificent?"" → "(removed)"
- `items[10].hint` ""n'est-ce pas + magnifique"" → "(removed)"
- `items[11].accept` "["pourquoi ne pas aller là-bas","pourquoi ne pas aller la-bas","pourquoi ne pas aller la-bas?"]" → "["pourquoi ne pas aller là-bas","pourquoi ne pas aller la-bas","pourquoi ne pas aller la-bas?","pourquoi ne pas y aller ?"]"

**2024-03-25-multi-clause-questions**

- `concepts[0].term` "Questions + Unit 10 Structures" → "Questions + Mastery & Nuance Structures"
- `concepts[0].definition` "Combine question words with all the sophisticated structures from Unit 10" → "Combine question words with all the sophisticated structures from the Mastery & Nuance unit"
- `items[0].type` "translate" → "transform"
- `items[0].instruction` "(none)" → ""Ask why, with pourquoi est-ce que.""
- `items[0].shown` "(none)" → ""Il faut que je fasse ça.""
- `items[0].answer` "pourquoi est-ce qu'il faut que je fasse ça?" → "pourquoi est-ce qu'il faut que je fasse ça ?"
- `items[0].mistakes` "(none)" → "["answer":"pourquoi est-ce qu'il faut que je fais ça ?","feedback":"After il faut que, use the subjunctive: que je fasse."]"
- `items[0].prompt` ""Why do I have to do that?"" → "(removed)"
- `items[0].hint` ""pourquoi est-ce que + il faut que je fasse ça"" → "(removed)"
- `items[1].type` "translate" → "transform"
- `items[1].instruction` "(none)" → ""Ask why, with pourquoi est-ce que.""
- `items[1].shown` "(none)" → ""Il faut que tu partes.""
- `items[1].answer` "pourquoi est-ce qu'il faut que tu partes?" → "pourquoi est-ce qu'il faut que tu partes ?"
- `items[1].prompt` ""Why do you have to leave?"" → "(removed)"
- `items[1].hint` ""pourquoi est-ce que + il faut que tu partes"" → "(removed)"
- `items[2].type` "translate" → "respond"
- `items[2].situation` "(none)" → ""Your friend asks you to clean the kitchen. Ask why they want you to do that, with pourquoi est-ce que.""
- `items[2].answer` "pourquoi est-ce que tu veux que je fasse ça?" → "pourquoi est-ce que tu veux que je fasse ça ?"
- `items[2].prompt` ""Why do you want me to do that?"" → "(removed)"
- `items[2].hint` ""pourquoi est-ce que + tu veux que je fasse ça"" → "(removed)"
- `items[3].type` "translate" → "transform"
- `items[3].instruction` "(none)" → ""Ask how, with comment est-ce que.""
- `items[3].shown` "(none)" → ""Tu veux que je le fasse.""
- `items[3].answer` "comment est-ce que tu veux que je le fasse?" → "comment est-ce que tu veux que je le fasse ?"
- `items[3].prompt` ""How do you want me to do it?"" → "(removed)"
- `items[3].hint` ""comment est-ce que + tu veux que je le fasse"" → "(removed)"
- `items[4].type` "translate" → "transform"
- `items[4].instruction` "(none)" → ""Ask why, with pourquoi est-ce que.""
- `items[4].shown` "(none)" → ""Tu veux qu'il vienne.""
- `items[4].answer` "pourquoi est-ce que tu veux qu'il vienne?" → "pourquoi est-ce que tu veux qu'il vienne ?"
- `items[4].prompt` ""Why do you want him to come?"" → "(removed)"
- `items[4].hint` ""pourquoi est-ce que + tu veux qu'il vienne"" → "(removed)"
- `items[5].type` "translate" → "transform"
- `items[5].instruction` "(none)" → ""Ask why, with pourquoi est-ce que.""
- `items[5].shown` "(none)" → ""Tu penses que c'est comme ça.""
- `items[5].answer` "pourquoi est-ce que tu penses que c'est comme ça?" → "pourquoi est-ce que tu penses que c'est comme ça ?"
- `items[5].prompt` ""Why do you think it's like that?"" → "(removed)"
- `items[5].hint` ""pourquoi est-ce que + tu penses que c'est comme ça"" → "(removed)"
- `items[6].type` "translate" → "transform"
- `items[6].instruction` "(none)" → ""Ask how, with comment est-ce que.""
- `items[6].shown` "(none)" → ""Tu penses qu'on devrait faire ça.""
- `items[6].answer` "comment est-ce que tu penses qu'on devrait faire ça?" → "comment est-ce que tu penses qu'on devrait faire ça ?"
- `items[6].prompt` ""How do you think we should do that?"" → "(removed)"
- `items[6].hint` ""comment est-ce que + tu penses qu'on devrait faire ça"" → "(removed)"
- `items[7].type` "translate" → "transform"
- `items[7].instruction` "(none)" → ""Ask what, with qu'est-ce que.""
- `items[7].shown` "(none)" → ""Tu penses qu'il devrait faire quelque chose.""
- `items[7].answer` "qu'est-ce que tu penses qu'il devrait faire?" → "qu'est-ce que tu penses qu'il devrait faire ?"
- `items[7].prompt` ""What do you think he should do?"" → "(removed)"
- `items[7].hint` ""qu'est-ce que + tu penses qu'il devrait faire"" → "(removed)"
- `items[8].type` "translate" → "transform"
- `items[8].instruction` "(none)" → ""Ask what, with qu'est-ce qui.""
- `items[8].shown` "(none)" → ""Quelque chose rendrait l'herbe plus verte.""
- `items[8].answer` "qu'est-ce qui rendrait l'herbe plus verte?" → "qu'est-ce qui rendrait l'herbe plus verte ?"
- `items[8].mistakes` "(none)" → "["answer":"qu'est-ce que rendrait l'herbe plus verte ?","feedback":"The thing does the making, so it is the subject: qu'est-ce qui."]"
- `items[8].prompt` ""What would make grass greener?"" → "(removed)"
- `items[8].hint` ""qu'est-ce qui + rendrait l'herbe plus verte"" → "(removed)"
- `items[9].type` "translate" → "transform"
- `items[9].instruction` "(none)" → ""Ask why, with pourquoi est-ce que.""
- `items[9].shown` "(none)" → ""Tu ferais ça.""
- `items[9].answer` "pourquoi est-ce que tu ferais ça?" → "pourquoi est-ce que tu ferais ça ?"
- `items[9].prompt` ""Why would you do that?"" → "(removed)"
- `items[9].hint` ""pourquoi est-ce que + tu ferais ça (conditional!)"" → "(removed)"
- `items[10].type` "translate" → "transform"
- `items[10].instruction` "(none)" → ""Ask why, with pourquoi est-ce que.""
- `items[10].shown` "(none)" → ""Ça ne marche pas.""
- `items[10].answer` "pourquoi est-ce que ça ne marche pas?" → "pourquoi est-ce que ça ne marche pas ?"
- `items[10].prompt` ""Why doesn't it work?"" → "(removed)"
- `items[10].hint` ""pourquoi est-ce que + ça ne marche pas"" → "(removed)"
- `items[11].type` "translate" → "transform"
- `items[11].instruction` "(none)" → ""Ask why, with pourquoi est-ce que.""
- `items[11].shown` "(none)" → ""Il ne veut pas venir.""
- `items[11].answer` "pourquoi est-ce qu'il ne veut pas venir?" → "pourquoi est-ce qu'il ne veut pas venir ?"
- `items[11].prompt` ""Why doesn't he want to come?"" → "(removed)"
- `items[11].hint` ""pourquoi est-ce que + il ne veut pas venir"" → "(removed)"
- `items[12].type` "translate" → "respond"
- `items[12].situation` "(none)" → ""Your friend Marc smiles when Paul walks in. Ask Marc why he is happy that Paul is here, with pourquoi est-ce que.""
- `items[12].answer` "pourquoi est-ce que tu es content qu'il soit là?" → "pourquoi est-ce que tu es content qu'il soit là ?"
- `items[12].accept` "["pourquoi est-ce que tu es content qu'il soit là","pourquoi est-ce que tu es content qu'il soit la","pourquoi est-ce que tu es content qu'il soit la?"]" → "["pourquoi est-ce que tu es content qu'il soit là","pourquoi est-ce que tu es content qu'il soit la","pourquoi est-ce que tu es content que Paul soit là ?","pourquoi est-ce que tu es content que Paul soit là"]"
- `items[12].mistakes` "(none)" → "["answer":"pourquoi est-ce que tu es content qu'il est là ?","feedback":"After content que, use the subjunctive: qu'il soit là."]"
- `items[12].prompt` ""Why are you happy that he's here?"" → "(removed)"
- `items[12].hint` ""pourquoi est-ce que + tu es content qu'il soit là"" → "(removed)"
- `items[13].type` "translate" → "transform"
- `items[13].instruction` "(none)" → ""Ask how, with comment est-ce que.""
- `items[13].shown` "(none)" → ""Tu penses qu'on pourrait le faire marcher.""
- `items[13].answer` "comment est-ce que tu penses qu'on pourrait le faire marcher?" → "comment est-ce que tu penses qu'on pourrait le faire marcher ?"
- `items[13].prompt` ""How do you think we could make it work?"" → "(removed)"
- `items[13].hint` ""comment est-ce que + tu penses qu'on pourrait le faire marcher"" → "(removed)"

## Live ids with no converted item

The live app stores answers under these exercise ids and concept indexes, and no converted item, concept or section has the same content, so live-ids.json has no entry for them. Real misses come first: each needs a look. The other two groups are expected, since the new files hold nothing for those ids.

### Real misses

**2024-05-05-on-and-people**

- `2024-05-05-on-and-people.2` exercise "We must study (using on)" → "on doit étudier"
- `2024-05-05-on-and-people.8` exercise "We must believe (using on)" → "on doit croire"

**2024-05-02-discourse-markers**

- `2024-05-02-discourse-markers.14` exercise "I am almost ready" → "je suis presque prêt"

**2024-05-07-reading-7**

- `2024-05-07-reading-7.3` exercise "First, we must..." → "demander des questions"

**2024-05-10-unit-7-exam**

- `2024-05-10-unit-7-exam.62` exercise "I'm reviewing my lessons because I have an exam" → "je révise mes leçons parce que j'ai un examen"

**2024-05-21-reflexive-pronouns**

- `2024-05-21-reflexive-pronouns.4` exercise "elle ... habille (she gets dressed)" → "se"
- `2024-05-21-reflexive-pronouns.7` exercise "ils ... amusent (they have fun)" → "se"

**2024-05-20-reading-8**

- `2024-05-20-reading-8.10` exercise "She goes from morning preparation to..." → "elle rentre contente et pense au lendemain"

**2024-05-26-causal-words**

- `2024-05-26-causal-words.2` exercise "Complete: On étudie le français ___ c'est utile (We study French for it's useful)" → "car"
- `2024-05-26-causal-words.6` exercise "Complete: ___ la pluie, on reste ici (Because of the rain, we're staying here)" → "À cause de"
- `2024-05-26-causal-words.7` exercise "Complete: Pourquoi tu restes? - ___ je suis fatigué (Why are you staying? - Because I'm tired)" → "Parce que"
- `2024-05-26-causal-words.8` exercise "Complete: Je suis en retard ___ le traffic (I'm late because of traffic)" → "à cause du"
- `2024-05-26-causal-words.17` exercise "Complete: Je ne dors pas bien ___ bruit (I don't sleep well because of the noise)" → "à cause du"

**2024-05-28-more-spatial-relations**

- `2024-05-28-more-spatial-relations.7` exercise "Complete: La table est ___ pièce (The table is in the middle of the room)" → "au milieu de la"

**2024-05-31-passe-compose-etre**

- `2024-05-31-passe-compose-etre.5` exercise "Complete: Vous ___ hier? (Did you go out yesterday?) - Use 'sortir' with ÊTRE!" → "êtes sortis"
- `2024-05-31-passe-compose-etre.16` exercise "Complete: ___ vous ___ en vacances? (Did you go on vacation?) - Use 'partir' with ÊTRE!" → "Êtes partis"

**2024-05-27-imparfait-all-verbs**

- `2024-05-27-imparfait-all-verbs.16` exercise "Complete: Quand j'___ jeune, je jouais au foot (When I was young, I used to play soccer) - Use 'être' in imparfait" → "étais"

**2024-06-04-pc-vs-imparfait**

- `2024-06-04-pc-vs-imparfait.18` exercise "Complete: Il ___ du café quand je suis arrivé (He was drinking coffee when I arrived) - Choose correct tense for 'boire'" → "buvait"

**2024-06-09-unit-9-exam**

- `2024-06-09-unit-9-exam.36` exercise "je _____ (lire) quand il a téléphoné" → "lisais"
- `2024-06-09-unit-9-exam.37` exercise "hier j'_____ (acheter) un livre" → "ai acheté"
- `2024-06-09-unit-9-exam.39` exercise "soudain la porte s'_____ (ouvrir)" → "est ouverte"
- `2024-06-09-unit-9-exam.40` exercise "pendant qu'il _____ (pleuvoir), je suis resté dedans" → "pleuvait"

**2024-01-22-common-adverbs**

- `2024-01-22-common-adverbs.4` exercise "run quickly" → "courir rapidement"

**2024-02-01-reading-10**

- `2024-02-01-reading-10.8` exercise "What did they decide to do?" → "aider l'un l'autre"

**2024-02-04-unit-10-exam**

- `2024-02-04-unit-10-exam.37` exercise "Si on ne fait rien, on ne _____ jamais" → "saura"

### Reference word lists

The live app builds an exercise from each word of a Reference page; a Reference page has no items.

- **2024-04-01-alphabet**: 33 exercises
- **2024-04-02-numbers**: 39 exercises
- **2024-04-03-days-months**: 28 exercises
- **2024-04-04-holidays**: 20 exercises
- **2024-04-05-colors**: 36 exercises
- **2024-04-06-french-countries**: 20 exercises
- **2024-04-07-language-stats**: 20 exercises

### Concept cards of modules that hold none

Practice sets, unit exams and readings hold no concept cards, so the live ticks on their cards have no new id.

- **2024-01-09-reading1**: 3 concept cards
- **2024-01-10-unit1-practice**: 3 concept cards
- **2024-01-11-unit1-exam**: 3 concept cards
- **2024-01-22-reading2**: 3 concept cards
- **2024-01-23-unit2-practice**: 3 concept cards
- **2024-01-24-unit2-exam**: 4 concept cards
- **2024-02-03-reading3**: 3 concept cards
- **2024-02-04-unit3-practice**: 3 concept cards
- **2024-02-05-unit3-exam**: 5 concept cards
- **2024-03-30-reading-4**: 3 concept cards
- **2024-04-03-unit-4-practice**: 3 concept cards
- **2024-04-02-unit-4-exam**: 5 concept cards
- **2024-04-13-reading-5**: 3 concept cards
- **2024-04-15-unit-5-practice**: 3 concept cards
- **2024-04-14-unit-5-exam**: 5 concept cards
- **2024-04-24-reading-6**: 3 concept cards
- **2024-04-27-unit-6-practice**: 3 concept cards
- **2024-04-26-unit-6-exam**: 5 concept cards
- **2024-05-07-reading-7**: 3 concept cards
- **2024-05-11-unit-7-practice**: 3 concept cards
- **2024-05-10-unit-7-exam**: 5 concept cards
- **2024-05-20-reading-8**: 3 concept cards
- **2024-05-25-unit-8-practice**: 3 concept cards
- **2024-05-24-unit-8-exam**: 5 concept cards
- **2024-06-05-reading-9**: 3 concept cards
- **2024-06-10-unit-9-practice**: 3 concept cards
- **2024-06-09-unit-9-exam**: 5 concept cards
- **2024-02-01-reading-10**: 3 concept cards
- **2024-02-05-unit-10-practice**: 3 concept cards
- **2024-02-04-unit-10-exam**: 5 concept cards
- **2024-02-12-reading-11**: 3 concept cards
- **2024-02-16-unit-11-practice**: 3 concept cards
- **2024-02-15-unit-11-exam**: 6 concept cards

## Fields with no place in a module file

Today’s objects hold these, and the module schema has no field for them.

**2024-01-01-famous-words**

- `emailMetadata.realWorldUse` "greet people and be polite" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Build your first sentences with pronouns" (no field; the next-module teaser is computed from the outline)

**2024-01-01-pronouns**

- `emailMetadata.realWorldUse` "build every sentence you'll ever speak" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Combine these with être to make your first real sentences" (no field; the next-module teaser is computed from the outline)

**2024-01-02-etre**

- `emailMetadata.realWorldUse` "introduce yourself and describe people" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "First real sentences" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add avoir (to have) to express possession" (no field; the next-module teaser is computed from the outline)

**2024-01-04-avoir**

- `emailMetadata.realWorldUse` "express what you have and what you need" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Combine with ça to have real conversations" (no field; the next-module teaser is computed from the outline)

**2024-01-05-articles**

- `emailMetadata.realWorldUse` "prepare to talk about real things" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add nouns to talk about real objects" (no field; the next-module teaser is computed from the outline)

**2024-10-21-cognates-help**

- `emailMetadata.capabilities` ["Recognize French words that look like English","Understand why French isn't as hard as you thought","Build confidence with familiar word patterns"] (can_do holds L's "What you can do now" lines)
- `emailMetadata.realWorldUse` "quickly expand your vocabulary using cognates" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Continue building your noun vocabulary" (no field; the next-module teaser is computed from the outline)

**2024-01-06-basic-nouns**

- `emailMetadata.realWorldUse` "name and talk about concrete objects" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Talk about real things" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Learn plurals to talk about multiple things" (no field; the next-module teaser is computed from the outline)
- 8 × generic instruction dropped (Say "…"): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[3].instruction`, `exerciseConfig.items[5].instruction`, `exerciseConfig.items[6].instruction`, `exerciseConfig.items[9].instruction`, `exerciseConfig.items[11].instruction`, `exerciseConfig.items[12].instruction`, `exerciseConfig.items[13].instruction`

**2024-01-07-plurals**

- `emailMetadata.realWorldUse` "talk about multiple objects and groups" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Learn demonstratives to point to specific things" (no field; the next-module teaser is computed from the outline)
- 8 × generic instruction dropped (Say "…"): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[1].instruction`, `exerciseConfig.items[2].instruction`, `exerciseConfig.items[3].instruction`, `exerciseConfig.items[4].instruction`, `exerciseConfig.items[5].instruction`, `exerciseConfig.items[6].instruction`, `exerciseConfig.items[7].instruction`

**2024-10-20-liaison-help**

- `emailMetadata.capabilities` ["Understand how French words flow together","Recognize when sounds connect between words","Sound more natural when speaking French"] (can_do holds L's "What you can do now" lines)
- `emailMetadata.realWorldUse` "speak with natural French rhythm and flow" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Use connectors to link your ideas" (no field; the next-module teaser is computed from the outline)

**2024-01-08-connectors**

- `emailMetadata.realWorldUse` "make your French sound natural and connected" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Practice everything you've learned with reading comprehension" (no field; the next-module teaser is computed from the outline)
- 6 × generic instruction dropped (Say '…'): `exerciseConfig.items[1].instruction`, `exerciseConfig.items[2].instruction`, `exerciseConfig.items[3].instruction`, `exerciseConfig.items[5].instruction`, `exerciseConfig.items[7].instruction`, `exerciseConfig.items[9].instruction`

**2024-01-09-reading1**

- `emailMetadata.realWorldUse` "read simple French texts and understand them" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "First reading comprehension" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Practice combining everything you've learned" (no field; the next-module teaser is computed from the outline)
- `concepts[0]` concept "First Reading Milestone": a reading has no concept cards
- `concepts[1]` concept "Comprehension Achievement": a reading has no concept cards
- `concepts[2]` concept "Functional Literacy": a reading has no concept cards
- `skipStudyMode` true (Study Mode belongs to lessons only)
- `readingPassage.title` "Les Amis (The Friends)" (the story's title comes from stories/)
- `glossary` 7 story glossary notes (a glossary row holds fr and en)
- `exerciseConfig.items[1].prompt` "Find the answer in the passage above" (says only where the answer is)
- `exerciseConfig.items[3].prompt` "Find the answer in the passage above" (says only where the answer is)
- `exerciseConfig.items[5].prompt` "Find the answer in the passage above" (says only where the answer is)
- `exerciseConfig.items[6].prompt` "Find the answer in the passage above" (says only where the answer is)

**2024-01-10-unit1-practice**

- `emailMetadata.realWorldUse` "form your own original French sentences" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Take the Unit 1 exam to prove your mastery" (no field; the next-module teaser is computed from the outline)
- `concepts[0]` concept "Foundation Reinforcement": a practice set teaches nothing
- `concepts[1]` concept "Composition Practice": a practice set teaches nothing
- `concepts[2]` concept "Scaffolded Learning": a practice set teaches nothing
- `skipStudyMode` true (Study Mode belongs to lessons only)

**2024-01-11-unit1-exam**

- `title` "Unit 1 Final Exam - Foundation": a unit exam's title comes from the outline ("Unit exam · <unit name>")
- `emailMetadata.realWorldUse` "communicate basic needs and introductions" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Conversational basics achieved" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Start Unit 2 to ask questions and describe things" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.isUnitCompletion` true (no field; the next-module teaser is computed from the outline)
- `concepts[0]` concept "Foundation Layer Complete": a unit exam teaches nothing
- `concepts[1]` concept "Functional Composition": a unit exam teaches nothing
- `concepts[2]` concept "Immediate Utility": a unit exam teaches nothing
- `skipStudyMode` true (Study Mode belongs to lessons only)
- `unitNumber` 1 (the outline places the exam)
- 24 × generic instruction dropped (Translate to French): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[1].instruction`, `exerciseConfig.items[2].instruction`, `exerciseConfig.items[3].instruction`, `exerciseConfig.items[4].instruction`, `exerciseConfig.items[5].instruction`, `exerciseConfig.items[6].instruction`, `exerciseConfig.items[7].instruction`, `exerciseConfig.items[8].instruction`, `exerciseConfig.items[9].instruction`, `exerciseConfig.items[10].instruction`, `exerciseConfig.items[11].instruction`, `exerciseConfig.items[12].instruction`, `exerciseConfig.items[13].instruction`, `exerciseConfig.items[14].instruction`, `exerciseConfig.items[15].instruction`, `exerciseConfig.items[16].instruction`, `exerciseConfig.items[17].instruction`, `exerciseConfig.items[18].instruction`, `exerciseConfig.items[19].instruction`, `exerciseConfig.items[20].instruction`, `exerciseConfig.items[21].instruction`, `exerciseConfig.items[22].instruction`, `exerciseConfig.items[23].instruction`

**2026-11-24-numbers**

- `emailMetadata.realWorldUse` "say ages and count people and things" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Learn to say no: je ne suis pas, je n'ai pas" (no field; the next-module teaser is computed from the outline)

**2026-11-24-negation-guide**

- `emailMetadata.realWorldUse` "say no in French" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Point at things with this and that" (no field; the next-module teaser is computed from the outline)

**2024-01-12-demonstratives**

- `emailMetadata.realWorldUse` "point to and identify specific objects" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Combine demonstratives with nouns to say 'this book', 'that cat'" (no field; the next-module teaser is computed from the outline)

**2024-01-13-ca-survival**

- `emailMetadata.realWorldUse` "greet someone and ask how they're doing" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "First real conversations" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add more verbs to express wants and abilities" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.utilityScore` 8 (no field; the next-module teaser is computed from the outline)

**2024-01-14-determiners-nouns**

- `emailMetadata.realWorldUse` "specify exactly which object you're talking about" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Functional composition mastered" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add vouloir to express what you want" (no field; the next-module teaser is computed from the outline)
- 11 × generic instruction dropped (Say "…"): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[1].instruction`, `exerciseConfig.items[2].instruction`, `exerciseConfig.items[3].instruction`, `exerciseConfig.items[4].instruction`, `exerciseConfig.items[5].instruction`, `exerciseConfig.items[6].instruction`, `exerciseConfig.items[7].instruction`, `exerciseConfig.items[8].instruction`, `exerciseConfig.items[9].instruction`, `exerciseConfig.items[10].instruction`

**2024-01-15-vouloir**

- `emailMetadata.realWorldUse` "express your wants and make polite requests" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Express desires and wants" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add pouvoir to express what you can do" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.utilityScore` 9 (no field; the next-module teaser is computed from the outline)

**2024-01-16-pouvoir**

- `emailMetadata.realWorldUse` "express what you can do and ask permission" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add voir to talk about what you see" (no field; the next-module teaser is computed from the outline)

**2024-01-17-voir**

- `emailMetadata.realWorldUse` "describe what you see and perceive" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Master question words to ask anything" (no field; the next-module teaser is computed from the outline)

**2024-01-18-questions**

- `emailMetadata.realWorldUse` "ask questions and have real conversations" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Can ask questions" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Learn stressed pronouns for emphasis" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.utilityScore` 10 (no field; the next-module teaser is computed from the outline)

**2024-01-19-questions-help**

- `emailMetadata.capabilities` ["Understand the three ways to ask questions in French","Choose the right question method for each situation","Build confidence in asking questions naturally"] (can_do holds L's "What you can do now" lines)
- `emailMetadata.realWorldUse` "master French question formation" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Use stressed pronouns for emphasis" (no field; the next-module teaser is computed from the outline)

**2024-01-19-stressed-pronouns**

- `emailMetadata.realWorldUse` "emphasize and specify people in conversation" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add prepositions to describe locations and relationships" (no field; the next-module teaser is computed from the outline)
- 2 × generic instruction dropped (Say '…'): `exerciseConfig.items[8].instruction`, `exerciseConfig.items[10].instruction`

**2024-01-20-prepositions**

- `emailMetadata.realWorldUse` "describe where things are and relationships between people" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add adjectives to describe qualities" (no field; the next-module teaser is computed from the outline)
- `vocabularyReference[7].ttsText` "a" (speech override; no field)
- `exerciseConfig.items[3].ttsText` i-a: "a" (speech override; no field)
- 12 × generic instruction dropped (Say '…'): `exerciseConfig.items[7].instruction`, `exerciseConfig.items[8].instruction`, `exerciseConfig.items[10].instruction`, `exerciseConfig.items[11].instruction`, `exerciseConfig.items[12].instruction`, `exerciseConfig.items[13].instruction`, `exerciseConfig.items[14].instruction`, `exerciseConfig.items[15].instruction`, `exerciseConfig.items[16].instruction`, `exerciseConfig.items[17].instruction`, `exerciseConfig.items[18].instruction`, `exerciseConfig.items[19].instruction`

**2024-01-21-adjectives**

- `emailMetadata.realWorldUse` "describe qualities and characteristics of things" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Practice reading comprehension with everything you've learned" (no field; the next-module teaser is computed from the outline)
- 16 × generic instruction dropped (Say "…"): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[1].instruction`, `exerciseConfig.items[2].instruction`, `exerciseConfig.items[3].instruction`, `exerciseConfig.items[4].instruction`, `exerciseConfig.items[5].instruction`, `exerciseConfig.items[6].instruction`, `exerciseConfig.items[7].instruction`, `exerciseConfig.items[8].instruction`, `exerciseConfig.items[9].instruction`, `exerciseConfig.items[10].instruction`, `exerciseConfig.items[11].instruction`, `exerciseConfig.items[12].instruction`, `exerciseConfig.items[13].instruction`, `exerciseConfig.items[14].instruction`, `exerciseConfig.items[15].instruction`

**2024-01-22-reading2**

- `emailMetadata.realWorldUse` "read French stories and understand cultural content" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Cultural reading comprehension" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Practice everything with interactive exercises" (no field; the next-module teaser is computed from the outline)
- `concepts[0]` concept "Adventure Reading Milestone": a reading has no concept cards
- `concepts[1]` concept "Conversational French": a reading has no concept cards
- `concepts[2]` concept "Cultural Context": a reading has no concept cards
- `skipStudyMode` true (Study Mode belongs to lessons only)
- `readingPassage.title` "Rendez-vous en Normandie (The Normandy Meetup)" (the story's title comes from stories/)
- `glossary` 6 story glossary notes (a glossary row holds fr and en)

**2024-01-23-unit2-practice**

- `emailMetadata.realWorldUse` "form complex original French sentences" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Take the Unit 2 exam to prove your compositional skills" (no field; the next-module teaser is computed from the outline)
- `concepts[0]` concept "Composition Practice": a practice set teaches nothing
- `concepts[1]` concept "Essential Verb Mastery": a practice set teaches nothing
- `concepts[2]` concept "Question Building": a practice set teaches nothing
- `skipStudyMode` true (Study Mode belongs to lessons only)

**2024-01-24-unit2-exam**

- `title` "Unit 2 Final Exam - Composition": a unit exam's title comes from the outline ("Unit exam · <unit name>")
- `emailMetadata.realWorldUse` "have real two-way conversations" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Conversational fluency achieved" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Start Unit 3 to master movement and possession" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.isUnitCompletion` true (no field; the next-module teaser is computed from the outline)
- `concepts[0]` concept "Composition Layer Mastery": a unit exam teaches nothing
- `concepts[1]` concept "Essential Communication Verbs": a unit exam teaches nothing
- `concepts[2]` concept "Question Formation": a unit exam teaches nothing
- `concepts[3]` concept "Descriptive Language": a unit exam teaches nothing
- `skipStudyMode` true (Study Mode belongs to lessons only)
- `unitNumber` 2 (the outline places the exam)
- 33 × generic instruction dropped (Translate to French): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[1].instruction`, `exerciseConfig.items[2].instruction`, `exerciseConfig.items[3].instruction`, `exerciseConfig.items[4].instruction`, `exerciseConfig.items[5].instruction`, `exerciseConfig.items[6].instruction`, `exerciseConfig.items[7].instruction`, `exerciseConfig.items[8].instruction`, `exerciseConfig.items[9].instruction`, `exerciseConfig.items[10].instruction`, `exerciseConfig.items[11].instruction`, `exerciseConfig.items[12].instruction`, `exerciseConfig.items[13].instruction`, `exerciseConfig.items[14].instruction`, `exerciseConfig.items[15].instruction`, `exerciseConfig.items[16].instruction`, `exerciseConfig.items[17].instruction`, `exerciseConfig.items[18].instruction`, `exerciseConfig.items[19].instruction`, `exerciseConfig.items[20].instruction`, `exerciseConfig.items[21].instruction`, `exerciseConfig.items[22].instruction`, `exerciseConfig.items[23].instruction`, `exerciseConfig.items[24].instruction`, `exerciseConfig.items[25].instruction`, `exerciseConfig.items[26].instruction`, `exerciseConfig.items[27].instruction`, `exerciseConfig.items[28].instruction`, `exerciseConfig.items[29].instruction`, `exerciseConfig.items[30].instruction`, `exerciseConfig.items[31].instruction`, `exerciseConfig.items[32].instruction`

**2024-01-25-contractions**

- `emailMetadata.realWorldUse` "speak French that sounds natural and fluid" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Master movement verbs like venir and aller" (no field; the next-module teaser is computed from the outline)
- 3 × generic instruction dropped (Say '…'): `exerciseConfig.items[7].instruction`, `exerciseConfig.items[8].instruction`, `exerciseConfig.items[9].instruction`

**2024-01-26-venir**

- `emailMetadata.realWorldUse` "talk about arrival and origin" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add aller to express where you're going" (no field; the next-module teaser is computed from the outline)

**2024-01-27-aller**

- `emailMetadata.realWorldUse` "talk about movement and future plans" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Learn verb patterns to master conjugation" (no field; the next-module teaser is computed from the outline)

**2024-01-28-verb-pattern-help**

- `emailMetadata.capabilities` ["Recognize patterns across French verb conjugations","Predict how new verbs will conjugate","Understand why verbs change the way they do"] (can_do holds L's "What you can do now" lines)
- `emailMetadata.realWorldUse` "learn new verbs faster using patterns" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Apply patterns to partir (to leave)" (no field; the next-module teaser is computed from the outline)

**2024-01-29-partir**

- `emailMetadata.realWorldUse` "talk about leaving places and travel" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Learn object pronouns to say 'I see him/her/it'" (no field; the next-module teaser is computed from the outline)

**2024-01-30-object-pronouns**

- `emailMetadata.realWorldUse` "speak more concisely and naturally" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Concise sentence formation" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add possessive adjectives to show ownership" (no field; the next-module teaser is computed from the outline)

**2024-01-31-possessive-adjectives**

- `emailMetadata.realWorldUse` "talk about who owns what" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Express ownership and possession" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Learn possessive pronouns to say 'it's mine'" (no field; the next-module teaser is computed from the outline)

**2024-02-01-possessive-pronouns**

- `emailMetadata.realWorldUse` "claim ownership and clarify who things belong to" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Combine everything you've learned" (no field; the next-module teaser is computed from the outline)

**2024-02-02-combining**

- `emailMetadata.realWorldUse` "have sophisticated conversations about ownership" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Complex sentence mastery" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Test your comprehension with cultural reading" (no field; the next-module teaser is computed from the outline)

**2024-02-03-reading3**

- `emailMetadata.realWorldUse` "read French literature and authentic content" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Advanced reading comprehension" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Practice advanced structures with interactive exercises" (no field; the next-module teaser is computed from the outline)
- `concepts[0]` concept "Advanced Reading Milestone": a reading has no concept cards
- `concepts[1]` concept "Natural French Flow": a reading has no concept cards
- `concepts[2]` concept "Complex Relationships": a reading has no concept cards
- `skipStudyMode` true (Study Mode belongs to lessons only)
- `readingPassage.title` "La Première Page (The First Page)" (the story's title comes from stories/)
- `glossary` 11 story glossary notes (a glossary row holds fr and en)

**2024-02-04-unit3-practice**

- `emailMetadata.realWorldUse` "form sophisticated French sentences" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Take the Unit 3 exam to prove your mastery" (no field; the next-module teaser is computed from the outline)
- `concepts[0]` concept "Movement & Possession Practice": a practice set teaches nothing
- `concepts[1]` concept "Motion Verb Fluency": a practice set teaches nothing
- `concepts[2]` concept "Pronoun Mastery": a practice set teaches nothing
- `skipStudyMode` true (Study Mode belongs to lessons only)

**2024-02-05-unit3-exam**

- `title` "Unit 3 Final Exam - Movement & Possession": a unit exam's title comes from the outline ("Unit exam · <unit name>")
- `emailMetadata.realWorldUse` "have sophisticated conversations about movement and ownership" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Advanced conversational French" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Start Unit 4 for everyday communication" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.isUnitCompletion` true (no field; the next-module teaser is computed from the outline)
- `concepts[0]` concept "Movement & Possession Mastery": a unit exam teaches nothing
- `concepts[1]` concept "Motion and Movement": a unit exam teaches nothing
- `concepts[2]` concept "Object Pronouns": a unit exam teaches nothing
- `concepts[3]` concept "Possession and Ownership": a unit exam teaches nothing
- `concepts[4]` concept "Contractions": a unit exam teaches nothing
- `skipStudyMode` true (Study Mode belongs to lessons only)
- `unitNumber` 3 (the outline places the exam)
- 26 × generic instruction dropped (Translate to French): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[1].instruction`, `exerciseConfig.items[2].instruction`, `exerciseConfig.items[3].instruction`, `exerciseConfig.items[4].instruction`, `exerciseConfig.items[5].instruction`, `exerciseConfig.items[6].instruction`, `exerciseConfig.items[7].instruction`, `exerciseConfig.items[8].instruction`, `exerciseConfig.items[9].instruction`, `exerciseConfig.items[10].instruction`, `exerciseConfig.items[11].instruction`, `exerciseConfig.items[12].instruction`, `exerciseConfig.items[13].instruction`, `exerciseConfig.items[14].instruction`, `exerciseConfig.items[15].instruction`, `exerciseConfig.items[16].instruction`, `exerciseConfig.items[17].instruction`, `exerciseConfig.items[18].instruction`, `exerciseConfig.items[19].instruction`, `exerciseConfig.items[20].instruction`, `exerciseConfig.items[21].instruction`, `exerciseConfig.items[22].instruction`, `exerciseConfig.items[23].instruction`, `exerciseConfig.items[24].instruction`, `exerciseConfig.items[25].instruction`

**2024-03-31-survival-phrases**

- `emailMetadata.realWorldUse` "survive and thrive in France" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Real-world travel ready" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Master faire (to do/make) for daily activities" (no field; the next-module teaser is computed from the outline)

**2024-03-25-faire**

- `emailMetadata.realWorldUse` "talk about what you do and make" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add devoir to express obligations" (no field; the next-module teaser is computed from the outline)
- `exercises` 5 exercises the builder never shows (it uses exerciseConfig)

**2024-03-23-devoir**

- `emailMetadata.realWorldUse` "express obligations and what you must do" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Learn parler to talk about speaking and communication" (no field; the next-module teaser is computed from the outline)

**2024-03-29-parler**

- `emailMetadata.realWorldUse` "talk about communication and languages" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Learn chercher and trouver to search and find things" (no field; the next-module teaser is computed from the outline)

**2024-10-22-search-find**

- `emailMetadata.realWorldUse` "search for and find things in daily life" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Learn negation to say what you don't do" (no field; the next-module teaser is computed from the outline)
- 7 × generic instruction dropped (Say '…'): `exerciseConfig.items[1].instruction`, `exerciseConfig.items[4].instruction`, `exerciseConfig.items[5].instruction`, `exerciseConfig.items[8].instruction`, `exerciseConfig.items[9].instruction`, `exerciseConfig.items[10].instruction`, `exerciseConfig.items[11].instruction`

**2024-03-28-negation**

- `emailMetadata.realWorldUse` "express what you don't do or want" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Negative expressions mastered" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add time words to say when things happen" (no field; the next-module teaser is computed from the outline)
- 5 × generic instruction dropped (Say '…'): `exerciseConfig.items[7].instruction`, `exerciseConfig.items[8].instruction`, `exerciseConfig.items[12].instruction`, `exerciseConfig.items[13].instruction`, `exerciseConfig.items[14].instruction`

**2024-04-01-time-adverbs**

- `emailMetadata.realWorldUse` "express when and how often things happen" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Master more negation with modal verbs" (no field; the next-module teaser is computed from the outline)
- 23 × generic instruction dropped (Say '…'): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[1].instruction`, `exerciseConfig.items[2].instruction`, `exerciseConfig.items[3].instruction`, `exerciseConfig.items[4].instruction`, `exerciseConfig.items[5].instruction`, `exerciseConfig.items[7].instruction`, `exerciseConfig.items[8].instruction`, `exerciseConfig.items[9].instruction`, `exerciseConfig.items[10].instruction`, `exerciseConfig.items[11].instruction`, `exerciseConfig.items[12].instruction`, `exerciseConfig.items[13].instruction`, `exerciseConfig.items[14].instruction`, `exerciseConfig.items[15].instruction`, `exerciseConfig.items[16].instruction`, `exerciseConfig.items[17].instruction`, `exerciseConfig.items[18].instruction`, `exerciseConfig.items[19].instruction`, `exerciseConfig.items[20].instruction`, `exerciseConfig.items[21].instruction`, `exerciseConfig.items[22].instruction`, `exerciseConfig.items[23].instruction`

**2024-03-27-negation-2**

- `emailMetadata.realWorldUse` "express refusal and things you never do" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add location words to describe where" (no field; the next-module teaser is computed from the outline)
- 10 × generic instruction dropped (Say '…'): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[3].instruction`, `exerciseConfig.items[5].instruction`, `exerciseConfig.items[7].instruction`, `exerciseConfig.items[8].instruction`, `exerciseConfig.items[10].instruction`, `exerciseConfig.items[13].instruction`, `exerciseConfig.items[14].instruction`, `exerciseConfig.items[16].instruction`, `exerciseConfig.items[17].instruction`

**2024-03-26-location-adverbs**

- `emailMetadata.realWorldUse` "indicate locations and direct people" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add everyday nouns for daily life" (no field; the next-module teaser is computed from the outline)
- 9 × generic instruction dropped (Say '…'): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[1].instruction`, `exerciseConfig.items[3].instruction`, `exerciseConfig.items[4].instruction`, `exerciseConfig.items[6].instruction`, `exerciseConfig.items[7].instruction`, `exerciseConfig.items[8].instruction`, `exerciseConfig.items[9].instruction`, `exerciseConfig.items[11].instruction`

**2024-03-24-everyday-nouns**

- `emailMetadata.realWorldUse` "discuss daily life and the world around you" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Test comprehension with cultural reading" (no field; the next-module teaser is computed from the outline)
- 21 × generic instruction dropped (Say "…"): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[1].instruction`, `exerciseConfig.items[2].instruction`, `exerciseConfig.items[3].instruction`, `exerciseConfig.items[4].instruction`, `exerciseConfig.items[6].instruction`, `exerciseConfig.items[7].instruction`, `exerciseConfig.items[8].instruction`, `exerciseConfig.items[9].instruction`, `exerciseConfig.items[10].instruction`, `exerciseConfig.items[11].instruction`, `exerciseConfig.items[12].instruction`, `exerciseConfig.items[13].instruction`, `exerciseConfig.items[14].instruction`, `exerciseConfig.items[15].instruction`, `exerciseConfig.items[16].instruction`, `exerciseConfig.items[17].instruction`, `exerciseConfig.items[18].instruction`, `exerciseConfig.items[20].instruction`, `exerciseConfig.items[21].instruction`, `exerciseConfig.items[22].instruction`

**2024-03-30-reading-4**

- `emailMetadata.realWorldUse` "understand real French conversations" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Authentic conversation comprehension" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Practice with interactive exercises" (no field; the next-module teaser is computed from the outline)
- `concepts[0]` concept "Café Conversation Milestone": a reading has no concept cards
- `concepts[1]` concept "Real-World French": a reading has no concept cards
- `concepts[2]` concept "Cultural Integration": a reading has no concept cards
- `skipStudyMode` true (Study Mode belongs to lessons only)
- `readingPassage.title` "La nouvelle époque de Marie (Marie's new life)" (the story's title comes from stories/)
- `glossary` 2 story glossary notes (a glossary row holds fr and en)

**2024-04-03-unit-4-practice**

- `emailMetadata.realWorldUse` "navigate daily French situations" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Take the Unit 4 exam to prove your practical French" (no field; the next-module teaser is computed from the outline)
- `concepts[0]` concept "Survival French Practice": a practice set teaches nothing
- `concepts[1]` concept "Action Verb Mastery": a practice set teaches nothing
- `concepts[2]` concept "Negation and Politeness": a practice set teaches nothing
- `skipStudyMode` true (Study Mode belongs to lessons only)

**2024-04-02-unit-4-exam**

- `title` "Unit 4 Final Exam - Expression": a unit exam's title comes from the outline ("Unit exam · <unit name>")
- `emailMetadata.realWorldUse` "handle everyday situations in France" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Practical French mastery" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Start Unit 5 for past tense and nuance" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.isUnitCompletion` true (no field; the next-module teaser is computed from the outline)
- `concepts[0]` concept "Everyday Communication Mastery": a unit exam teaches nothing
- `concepts[1]` concept "Essential Action Verbs": a unit exam teaches nothing
- `concepts[2]` concept "Negation and Politeness": a unit exam teaches nothing
- `concepts[3]` concept "Time and Space Orientation": a unit exam teaches nothing
- `concepts[4]` concept "Daily Life Vocabulary": a unit exam teaches nothing
- `skipStudyMode` true (Study Mode belongs to lessons only)
- `unitNumber` 4 (the outline places the exam)
- 40 × generic instruction dropped (Translate to French): `exerciseConfig.items[1].instruction`, `exerciseConfig.items[2].instruction`, `exerciseConfig.items[3].instruction`, `exerciseConfig.items[4].instruction`, `exerciseConfig.items[5].instruction`, `exerciseConfig.items[6].instruction`, `exerciseConfig.items[7].instruction`, `exerciseConfig.items[8].instruction`, `exerciseConfig.items[9].instruction`, `exerciseConfig.items[10].instruction`, `exerciseConfig.items[11].instruction`, `exerciseConfig.items[12].instruction`, `exerciseConfig.items[13].instruction`, `exerciseConfig.items[14].instruction`, `exerciseConfig.items[15].instruction`, `exerciseConfig.items[16].instruction`, `exerciseConfig.items[17].instruction`, `exerciseConfig.items[18].instruction`, `exerciseConfig.items[19].instruction`, `exerciseConfig.items[20].instruction`, `exerciseConfig.items[21].instruction`, `exerciseConfig.items[22].instruction`, `exerciseConfig.items[23].instruction`, `exerciseConfig.items[24].instruction`, `exerciseConfig.items[25].instruction`, `exerciseConfig.items[26].instruction`, `exerciseConfig.items[27].instruction`, `exerciseConfig.items[28].instruction`, `exerciseConfig.items[29].instruction`, `exerciseConfig.items[30].instruction`, `exerciseConfig.items[31].instruction`, `exerciseConfig.items[32].instruction`, `exerciseConfig.items[33].instruction`, `exerciseConfig.items[34].instruction`, `exerciseConfig.items[35].instruction`, `exerciseConfig.items[36].instruction`, `exerciseConfig.items[37].instruction`, `exerciseConfig.items[38].instruction`, `exerciseConfig.items[39].instruction`, `exerciseConfig.items[40].instruction`

**2024-04-08-comparisons**

- `emailMetadata.realWorldUse` "compare and evaluate things" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add slang comparisons for natural speech" (no field; the next-module teaser is computed from the outline)
- 10 × generic instruction dropped (Say "…"): `exerciseConfig.items[2].instruction`, `exerciseConfig.items[8].instruction`, `exerciseConfig.items[9].instruction`, `exerciseConfig.items[10].instruction`, `exerciseConfig.items[11].instruction`, `exerciseConfig.items[13].instruction`, `exerciseConfig.items[14].instruction`, `exerciseConfig.items[15].instruction`, `exerciseConfig.items[16].instruction`, `exerciseConfig.items[17].instruction`

**2024-04-07-comparisons-slang**

- `emailMetadata.realWorldUse` "speak like a native with authentic slang" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add conditional forms for polite requests" (no field; the next-module teaser is computed from the outline)

**2024-04-09-conditionals**

- `emailMetadata.realWorldUse` "give advice and express possibilities" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add 'would' for even more polite requests" (no field; the next-module teaser is computed from the outline)
- 13 × generic instruction dropped (Say "…"): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[1].instruction`, `exerciseConfig.items[4].instruction`, `exerciseConfig.items[5].instruction`, `exerciseConfig.items[6].instruction`, `exerciseConfig.items[7].instruction`, `exerciseConfig.items[10].instruction`, `exerciseConfig.items[11].instruction`, `exerciseConfig.items[12].instruction`, `exerciseConfig.items[13].instruction`, `exerciseConfig.items[16].instruction`, `exerciseConfig.items[17].instruction`, `exerciseConfig.items[18].instruction`

**2024-04-16-would-conditionals**

- `emailMetadata.realWorldUse` "make polite requests and express hypotheticals" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Practice all Unit 5 skills with interactive exercises" (no field; the next-module teaser is computed from the outline)
- 14 × generic instruction dropped (Say "…"): `exerciseConfig.items[2].instruction`, `exerciseConfig.items[3].instruction`, `exerciseConfig.items[5].instruction`, `exerciseConfig.items[6].instruction`, `exerciseConfig.items[8].instruction`, `exerciseConfig.items[9].instruction`, `exerciseConfig.items[11].instruction`, `exerciseConfig.items[12].instruction`, `exerciseConfig.items[14].instruction`, `exerciseConfig.items[15].instruction`, `exerciseConfig.items[17].instruction`, `exerciseConfig.items[18].instruction`, `exerciseConfig.items[19].instruction`, `exerciseConfig.items[20].instruction`

**2024-04-04-aimer**

- `emailMetadata.realWorldUse` "express preferences and affection" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Learn past tense with être to say 'I was'" (no field; the next-module teaser is computed from the outline)
- 10 × generic instruction dropped (Say "…"): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[1].instruction`, `exerciseConfig.items[4].instruction`, `exerciseConfig.items[5].instruction`, `exerciseConfig.items[6].instruction`, `exerciseConfig.items[7].instruction`, `exerciseConfig.items[10].instruction`, `exerciseConfig.items[11].instruction`, `exerciseConfig.items[12].instruction`, `exerciseConfig.items[14].instruction`

**2024-04-10-etre-past**

- `emailMetadata.realWorldUse` "describe past situations and states" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Past tense foundation" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add avoir in past tense to say 'I had'" (no field; the next-module teaser is computed from the outline)
- 15 × generic instruction dropped (Say "…"): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[1].instruction`, `exerciseConfig.items[4].instruction`, `exerciseConfig.items[5].instruction`, `exerciseConfig.items[6].instruction`, `exerciseConfig.items[7].instruction`, `exerciseConfig.items[8].instruction`, `exerciseConfig.items[9].instruction`, `exerciseConfig.items[12].instruction`, `exerciseConfig.items[13].instruction`, `exerciseConfig.items[14].instruction`, `exerciseConfig.items[16].instruction`, `exerciseConfig.items[17].instruction`, `exerciseConfig.items[18].instruction`, `exerciseConfig.items[19].instruction`

**2024-04-05-avoir-past**

- `emailMetadata.realWorldUse` "talk about past possessions and experiences" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add food vocabulary for restaurant conversations" (no field; the next-module teaser is computed from the outline)
- 9 × generic instruction dropped (Say "…"): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[1].instruction`, `exerciseConfig.items[4].instruction`, `exerciseConfig.items[5].instruction`, `exerciseConfig.items[6].instruction`, `exerciseConfig.items[7].instruction`, `exerciseConfig.items[10].instruction`, `exerciseConfig.items[11].instruction`, `exerciseConfig.items[14].instruction`

**2024-04-11-food-nouns**

- `emailMetadata.realWorldUse` "order food in France" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Use manger and boire with food vocabulary" (no field; the next-module teaser is computed from the outline)
- 21 × generic instruction dropped (Say "…"): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[1].instruction`, `exerciseConfig.items[3].instruction`, `exerciseConfig.items[4].instruction`, `exerciseConfig.items[5].instruction`, `exerciseConfig.items[7].instruction`, `exerciseConfig.items[8].instruction`, `exerciseConfig.items[9].instruction`, `exerciseConfig.items[10].instruction`, `exerciseConfig.items[11].instruction`, `exerciseConfig.items[12].instruction`, `exerciseConfig.items[13].instruction`, `exerciseConfig.items[14].instruction`, `exerciseConfig.items[15].instruction`, `exerciseConfig.items[16].instruction`, `exerciseConfig.items[17].instruction`, `exerciseConfig.items[18].instruction`, `exerciseConfig.items[19].instruction`, `exerciseConfig.items[20].instruction`, `exerciseConfig.items[21].instruction`, `exerciseConfig.items[22].instruction`

**2024-04-12-manger**

- `emailMetadata.realWorldUse` "talk about food and eating" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add boire to talk about drinks" (no field; the next-module teaser is computed from the outline)
- 14 × generic instruction dropped (Say "…"): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[1].instruction`, `exerciseConfig.items[4].instruction`, `exerciseConfig.items[5].instruction`, `exerciseConfig.items[6].instruction`, `exerciseConfig.items[7].instruction`, `exerciseConfig.items[10].instruction`, `exerciseConfig.items[11].instruction`, `exerciseConfig.items[15].instruction`, `exerciseConfig.items[16].instruction`, `exerciseConfig.items[19].instruction`, `exerciseConfig.items[21].instruction`, `exerciseConfig.items[22].instruction`, `exerciseConfig.items[24].instruction`

**2024-04-06-boire**

- `emailMetadata.realWorldUse` "order drinks and discuss beverages" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Practice reading comprehension with food context" (no field; the next-module teaser is computed from the outline)
- 15 × generic instruction dropped (Say "…"): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[1].instruction`, `exerciseConfig.items[4].instruction`, `exerciseConfig.items[5].instruction`, `exerciseConfig.items[6].instruction`, `exerciseConfig.items[7].instruction`, `exerciseConfig.items[10].instruction`, `exerciseConfig.items[11].instruction`, `exerciseConfig.items[15].instruction`, `exerciseConfig.items[16].instruction`, `exerciseConfig.items[19].instruction`, `exerciseConfig.items[21].instruction`, `exerciseConfig.items[22].instruction`, `exerciseConfig.items[23].instruction`, `exerciseConfig.items[25].instruction`

**2024-04-13-reading-5**

- `emailMetadata.realWorldUse` "enjoy French cultural and historical content" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Cultural literacy achieved" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Practice all your skills with interactive exercises" (no field; the next-module teaser is computed from the outline)
- `concepts[0]` concept "Art and History Milestone": a reading has no concept cards
- `concepts[1]` concept "French Art Culture": a reading has no concept cards
- `concepts[2]` concept "Past Tense Narrative": a reading has no concept cards
- `skipStudyMode` true (Study Mode belongs to lessons only)
- `readingPassage.title` "La fée verte (The Green Fairy)" (the story's title comes from stories/)

**2024-04-15-unit-5-practice**

- `emailMetadata.realWorldUse` "form nuanced French sentences" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Take the Unit 5 exam to prove your mastery" (no field; the next-module teaser is computed from the outline)
- `concepts[0]` concept "Taste and Time Practice": a practice set teaches nothing
- `concepts[1]` concept "Past Tense Mastery": a practice set teaches nothing
- `concepts[2]` concept "Comparative Language": a practice set teaches nothing
- `skipStudyMode` true (Study Mode belongs to lessons only)

**2024-04-14-unit-5-exam**

- `title` "Unit 5 Final Exam - Sophistication": a unit exam's title comes from the outline ("Unit exam · <unit name>")
- `emailMetadata.realWorldUse` "discuss past experiences and express preferences" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Past tense and nuanced expression achieved" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Start Unit 6 for advanced communication verbs" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.isUnitCompletion` true (no field; the next-module teaser is computed from the outline)
- `concepts[0]` concept "Time and Taste Mastery": a unit exam teaches nothing
- `concepts[1]` concept "Past Tense Foundation": a unit exam teaches nothing
- `concepts[2]` concept "Comparisons and Preferences": a unit exam teaches nothing
- `concepts[3]` concept "Conditional Thinking": a unit exam teaches nothing
- `concepts[4]` concept "Food and Time Vocabulary": a unit exam teaches nothing
- `skipStudyMode` true (Study Mode belongs to lessons only)
- `unitNumber` 5 (the outline places the exam)
- 65 × generic instruction dropped (Translate to French): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[1].instruction`, `exerciseConfig.items[2].instruction`, `exerciseConfig.items[3].instruction`, `exerciseConfig.items[4].instruction`, `exerciseConfig.items[5].instruction`, `exerciseConfig.items[11].instruction`, `exerciseConfig.items[12].instruction`, `exerciseConfig.items[13].instruction`, `exerciseConfig.items[14].instruction`, `exerciseConfig.items[15].instruction`, `exerciseConfig.items[16].instruction`, `exerciseConfig.items[17].instruction`, `exerciseConfig.items[18].instruction`, `exerciseConfig.items[19].instruction`, `exerciseConfig.items[20].instruction`, `exerciseConfig.items[21].instruction`, `exerciseConfig.items[22].instruction`, `exerciseConfig.items[23].instruction`, `exerciseConfig.items[24].instruction`, `exerciseConfig.items[25].instruction`, `exerciseConfig.items[26].instruction`, `exerciseConfig.items[27].instruction`, `exerciseConfig.items[28].instruction`, `exerciseConfig.items[29].instruction`, `exerciseConfig.items[30].instruction`, `exerciseConfig.items[31].instruction`, `exerciseConfig.items[32].instruction`, `exerciseConfig.items[33].instruction`, `exerciseConfig.items[34].instruction`, `exerciseConfig.items[35].instruction`, `exerciseConfig.items[36].instruction`, `exerciseConfig.items[37].instruction`, `exerciseConfig.items[38].instruction`, `exerciseConfig.items[39].instruction`, `exerciseConfig.items[40].instruction`, `exerciseConfig.items[41].instruction`, `exerciseConfig.items[42].instruction`, `exerciseConfig.items[43].instruction`, `exerciseConfig.items[44].instruction`, `exerciseConfig.items[45].instruction`, `exerciseConfig.items[46].instruction`, `exerciseConfig.items[47].instruction`, `exerciseConfig.items[48].instruction`, `exerciseConfig.items[49].instruction`, `exerciseConfig.items[50].instruction`, `exerciseConfig.items[51].instruction`, `exerciseConfig.items[52].instruction`, `exerciseConfig.items[53].instruction`, `exerciseConfig.items[54].instruction`, `exerciseConfig.items[55].instruction`, `exerciseConfig.items[56].instruction`, `exerciseConfig.items[57].instruction`, `exerciseConfig.items[58].instruction`, `exerciseConfig.items[59].instruction`, `exerciseConfig.items[60].instruction`, `exerciseConfig.items[61].instruction`, `exerciseConfig.items[62].instruction`, `exerciseConfig.items[63].instruction`, `exerciseConfig.items[64].instruction`, `exerciseConfig.items[65].instruction`, `exerciseConfig.items[66].instruction`, `exerciseConfig.items[67].instruction`, `exerciseConfig.items[68].instruction`, `exerciseConfig.items[69].instruction`

**2024-04-23-progressive-tenses**

- `emailMetadata.realWorldUse` "describe what's happening now and what will happen" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Master dire to express what you say" (no field; the next-module teaser is computed from the outline)
- `exerciseConfig.items[0].explanation` i-je-suis-en-train: "'en train de' + infinitive = ongoing action happening now" (the item has a hint)
- `exerciseConfig.items[1].explanation` i-elle-est-en-train: "Use 'est' (is) + en train de + infinitive" (the item has a hint)
- `exerciseConfig.items[2].explanation` i-nous-sommes-en-train: "nous sommes (we are) + en train de + partir (to leave)" (the item has a hint)
- `exerciseConfig.items[3].explanation` i-j-etais-en-train: "Use past tense: j'étais (I was) + en train de + manger" (the item has a hint)
- `exerciseConfig.items[4].explanation` i-ils-etaient-en-train: "ils étaient (they were) + en train de + parler" (the item has a hint)
- `exerciseConfig.items[5].explanation` i-je-vais-manger: "aller + infinitive = near future (going to do)" (the item has a hint)
- `exerciseConfig.items[6].explanation` i-tu-vas-parler: "tu vas (you are going) + parler (to speak)" (the item has a hint)
- `exerciseConfig.items[7].explanation` i-nous-allons-partir: "nous allons (we are going) + partir (to leave)" (the item has a hint)
- `exerciseConfig.items[8].explanation` i-ils-vont-venir: "ils vont (they are going) + venir (to come)" (the item has a hint)
- `exerciseConfig.items[9].explanation` i-je-parlerai: "Future tense: infinitive + -rai (je parlerai)" (the item has a hint)
- `exerciseConfig.items[10].explanation` i-tu-mangeras: "Future tense: manger + -as (tu mangeras)" (the item has a hint)
- `exerciseConfig.items[11].explanation` i-il-partira: "Future tense: partir + -a (il partira)" (the item has a hint)
- `exerciseConfig.items[12].explanation` i-nous-viendrons: "Future tense: venir → viendr- + ons (irregular stem)" (the item has a hint)
- `exerciseConfig.items[13].explanation` i-j-irai: "Irregular future: aller → ir- + ai (j'irai)" (the item has a hint)
- `exerciseConfig.items[14].explanation` i-je-ne-peux-pas: "Negative modal: je ne peux pas + infinitive" (the item has a hint)
- `exerciseConfig.items[15].explanation` i-je-ne-vais-pas: "Negative near future: je ne vais pas + aller" (the item has a hint)
- `exerciseConfig.items[16].explanation` i-je-ne-devrais-pas: "Negative conditional: je ne devrais pas + infinitive" (the item has a hint)
- `exerciseConfig.items[17].explanation` i-tu-ne-peux-pas: "tu ne peux pas (you can't) + faire ça (do that)" (the item has a hint)
- `exerciseConfig.items[18].explanation` i-il-ne-le-fera: "Future negative: il ne le fera pas (he won't do it) - object pronoun 'le' before verb" (the item has a hint)
- `exerciseConfig.items[19].explanation` i-j-allais-partir: "Past tense of aller (j'allais) + infinitive = was going to" (the item has a hint)
- `exerciseConfig.items[20].explanation` i-nous-ne-pourrons-pas: "Future of pouvoir (pourrons) + negative + infinitive" (the item has a hint)
- 21 × generic instruction dropped (Say "…"): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[1].instruction`, `exerciseConfig.items[2].instruction`, `exerciseConfig.items[3].instruction`, `exerciseConfig.items[4].instruction`, `exerciseConfig.items[5].instruction`, `exerciseConfig.items[6].instruction`, `exerciseConfig.items[7].instruction`, `exerciseConfig.items[8].instruction`, `exerciseConfig.items[9].instruction`, `exerciseConfig.items[10].instruction`, `exerciseConfig.items[11].instruction`, `exerciseConfig.items[12].instruction`, `exerciseConfig.items[13].instruction`, `exerciseConfig.items[14].instruction`, `exerciseConfig.items[15].instruction`, `exerciseConfig.items[16].instruction`, `exerciseConfig.items[17].instruction`, `exerciseConfig.items[18].instruction`, `exerciseConfig.items[19].instruction`, `exerciseConfig.items[20].instruction`

**2024-04-20-dire**

- `emailMetadata.realWorldUse` "communicate what you and others say" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add prendre for taking things and transportation" (no field; the next-module teaser is computed from the outline)
- `exerciseConfig.items[0].explanation` i-je-dis: "Irregular: je dis (sounds like 'dee')" (the item has a hint)
- `exerciseConfig.items[1].explanation` i-tu-dis: "Same as je: tu dis" (the item has a hint)
- `exerciseConfig.items[2].explanation` i-il-dit: "Third person: il dit (same pronunciation)" (the item has a hint)
- `exerciseConfig.items[3].explanation` i-nous-disons: "nous disons - add -ons" (the item has a hint)
- `exerciseConfig.items[4].explanation` i-vous-dites: "⚠️ Irregular! vous dites (NOT disez)" (the item has a hint)
- `exerciseConfig.items[5].explanation` i-ils-disent: "ils disent - add -ent (silent)" (the item has a hint)
- `exerciseConfig.items[6].explanation` i-je-dis-bonjour: "je dis (I say) + bonjour (hello)" (the item has a hint)
- `exerciseConfig.items[7].explanation` i-tu-dis-la-verite: "tu dis (you say/tell) + la vérité (the truth)" (the item has a hint)
- `exerciseConfig.items[8].explanation` i-elle-dit-oui: "elle dit (she says) + oui (yes)" (the item has a hint)
- `exerciseConfig.items[9].explanation` i-nous-disons-une-histoire: "nous disons (we tell) + une histoire (a story)" (the item has a hint)
- `exerciseConfig.items[10].explanation` i-je-dis-que-c: "je dis que (I say that) + c'est bon (it's good)" (the item has a hint)
- `exerciseConfig.items[11].explanation` i-il-dit-qu-il: "il dit que (he says that) → qu'il (elision before vowel)" (the item has a hint)
- `exerciseConfig.items[12].explanation` i-ils-disent-que-c: "ils disent que (they say that) + c'est vrai (it's true)" (the item has a hint)
- `exerciseConfig.items[13].explanation` i-je-te-dis: "je te dis - object pronoun 'te' goes before verb" (the item has a hint)
- `exerciseConfig.items[14].explanation` i-tu-me-dis: "tu me dis - object pronoun 'me' before verb" (the item has a hint)
- `exerciseConfig.items[15].explanation` i-il-me-dit: "il me dit - me (to me) goes before the verb" (the item has a hint)
- `exerciseConfig.items[16].explanation` i-elle-nous-dit: "elle nous dit - nous (to us) before verb" (the item has a hint)
- `exerciseConfig.items[17].explanation` i-c-est-a-dire: "Common phrase: c'est-à-dire (that is to say, i.e.)" (the item has a hint)
- `exerciseConfig.items[18].explanation` i-on-dit-que: "on dit que - 'on' = people in general" (the item has a hint)
- `exerciseConfig.items[19].explanation` i-comme-on-dit: "Common expression: comme on dit (as they say)" (the item has a hint)
- `exerciseConfig.items[20].explanation` i-j-ai-dit: "Passé composé: j'ai dit (I said/have said)" (the item has a hint)
- `exerciseConfig.items[21].explanation` i-tu-m-as-dit: "tu m'as dit - object pronoun before auxiliary verb" (the item has a hint)
- 18 × generic instruction dropped (Say "…"): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[2].instruction`, `exerciseConfig.items[3].instruction`, `exerciseConfig.items[5].instruction`, `exerciseConfig.items[6].instruction`, `exerciseConfig.items[7].instruction`, `exerciseConfig.items[8].instruction`, `exerciseConfig.items[9].instruction`, `exerciseConfig.items[10].instruction`, `exerciseConfig.items[11].instruction`, `exerciseConfig.items[12].instruction`, `exerciseConfig.items[14].instruction`, `exerciseConfig.items[15].instruction`, `exerciseConfig.items[16].instruction`, `exerciseConfig.items[17].instruction`, `exerciseConfig.items[19].instruction`, `exerciseConfig.items[20].instruction`, `exerciseConfig.items[21].instruction`

**2024-04-22-prendre**

- `emailMetadata.realWorldUse` "talk about taking things and learning" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add donner to express giving" (no field; the next-module teaser is computed from the outline)
- `exerciseConfig.items[0].explanation` i-je-prends: "Irregular: je prends (with 's')" (the item has a hint)
- `exerciseConfig.items[1].explanation` i-tu-prends: "Same as je: tu prends" (the item has a hint)
- `exerciseConfig.items[2].explanation` i-il-prend: "Third person: il prend (no 's'!)" (the item has a hint)
- `exerciseConfig.items[3].explanation` i-nous-prenons: "nous prenons - add -ons" (the item has a hint)
- `exerciseConfig.items[4].explanation` i-vous-prenez: "vous prenez - add -ez" (the item has a hint)
- `exerciseConfig.items[5].explanation` i-ils-prennent: "ils prennent - double 'n' + silent -ent" (the item has a hint)
- `exerciseConfig.items[6].explanation` i-je-prends-le-bus: "je prends (I take) + le bus (the bus) - very common phrase" (the item has a hint)
- `exerciseConfig.items[7].explanation` i-tu-prends-le-train: "tu prends (you take) + le train (the train)" (the item has a hint)
- `exerciseConfig.items[8].explanation` i-elle-prend-son-temps: "elle prend (she takes - no 's'!) + son temps (her time)" (the item has a hint)
- `exerciseConfig.items[9].explanation` i-je-prends-un-cafe: "In French, use 'prendre' for having food/drink: je prends un café" (the item has a hint)
- `exerciseConfig.items[10].explanation` i-nous-prenons-la-voiture: "nous prenons (we take) + la voiture (the car)" (the item has a hint)
- `exerciseConfig.items[11].explanation` i-j-apprends: "j'apprends - double 'p' like prendre" (the item has a hint)
- `exerciseConfig.items[12].explanation` i-j-apprends-le-francais: "j'apprends (I learn) + le français (French)" (the item has a hint)
- `exerciseConfig.items[13].explanation` i-tu-apprends-vite: "tu apprends (you learn) + vite (quickly)" (the item has a hint)
- `exerciseConfig.items[14].explanation` i-elle-apprend-l-anglais: "elle apprend (no 's'!) + l'anglais (English)" (the item has a hint)
- `exerciseConfig.items[15].explanation` i-nous-apprenons-ensemble: "nous apprenons (we learn) + ensemble (together)" (the item has a hint)
- `exerciseConfig.items[16].explanation` i-je-comprends: "je comprends - essential phrase! Rank 61 in top 100 words" (the item has a hint)
- `exerciseConfig.items[17].explanation` i-je-ne-comprends-pas: "Very useful: je ne comprends pas (I don't understand)" (the item has a hint)
- `exerciseConfig.items[18].explanation` i-tu-comprends: "Common question: tu comprends? (do you understand?)" (the item has a hint)
- `exerciseConfig.items[19].explanation` i-il-comprend-le-francais: "il comprend (no 's'!) + le français" (the item has a hint)
- `exerciseConfig.items[20].explanation` i-nous-comprenons-la-question: "nous comprenons (we understand) + la question" (the item has a hint)
- `exerciseConfig.items[21].explanation` i-ils-ne-comprennent-pas: "ils ne comprennent pas - double 'n' + negative" (the item has a hint)
- `exerciseConfig.items[22].explanation` i-j-ai-pris-le: "Passé composé: j'ai pris (irregular past participle)" (the item has a hint)
- `exerciseConfig.items[23].explanation` i-j-ai-beaucoup-appris: "j'ai beaucoup appris - adverb 'beaucoup' before past participle" (the item has a hint)
- 22 × generic instruction dropped (Say "…"): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[2].instruction`, `exerciseConfig.items[3].instruction`, `exerciseConfig.items[5].instruction`, `exerciseConfig.items[6].instruction`, `exerciseConfig.items[7].instruction`, `exerciseConfig.items[8].instruction`, `exerciseConfig.items[9].instruction`, `exerciseConfig.items[10].instruction`, `exerciseConfig.items[11].instruction`, `exerciseConfig.items[12].instruction`, `exerciseConfig.items[13].instruction`, `exerciseConfig.items[14].instruction`, `exerciseConfig.items[15].instruction`, `exerciseConfig.items[16].instruction`, `exerciseConfig.items[17].instruction`, `exerciseConfig.items[18].instruction`, `exerciseConfig.items[19].instruction`, `exerciseConfig.items[20].instruction`, `exerciseConfig.items[21].instruction`, `exerciseConfig.items[22].instruction`, `exerciseConfig.items[23].instruction`

**2024-10-22-donner**

- `emailMetadata.realWorldUse` "express giving and offering" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add mettre to talk about putting and placing" (no field; the next-module teaser is computed from the outline)
- 9 × generic instruction dropped (Say '…'): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[2].instruction`, `exerciseConfig.items[3].instruction`, `exerciseConfig.items[4].instruction`, `exerciseConfig.items[6].instruction`, `exerciseConfig.items[7].instruction`, `exerciseConfig.items[9].instruction`, `exerciseConfig.items[12].instruction`, `exerciseConfig.items[13].instruction`

**2024-04-21-mettre**

- `emailMetadata.realWorldUse` "talk about placing things and getting dressed" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add demander to ask for things" (no field; the next-module teaser is computed from the outline)
- `exerciseConfig.items[0].explanation` i-je-mets: "Irregular: je mets (single 't', silent 's')" (the item has a hint)
- `exerciseConfig.items[1].explanation` i-tu-mets: "Same as je: tu mets" (the item has a hint)
- `exerciseConfig.items[2].explanation` i-elle-met: "Third person: elle met (no 's'!)" (the item has a hint)
- `exerciseConfig.items[3].explanation` i-nous-mettons: "nous mettons - double 'tt' + ons" (the item has a hint)
- `exerciseConfig.items[4].explanation` i-vous-mettez: "vous mettez - double 'tt' + ez" (the item has a hint)
- `exerciseConfig.items[5].explanation` i-ils-mettent: "ils mettent - double 'tt' + ent (silent)" (the item has a hint)
- `exerciseConfig.items[6].explanation` i-je-mets-la-table: "Common phrase: je mets la table (I set the table)" (the item has a hint)
- `exerciseConfig.items[7].explanation` i-tu-peux-mettre-la: "tu peux (can you) + mettre la table (set the table)" (the item has a hint)
- `exerciseConfig.items[8].explanation` i-nous-mettons-la-table: "nous mettons (we put/set) + la table" (the item has a hint)
- `exerciseConfig.items[9].explanation` i-je-mets-le-livre: "je mets (I put) + le livre (the book) + sur la table (on the table)" (the item has a hint)
- `exerciseConfig.items[10].explanation` i-tu-mets-ca-ici: "tu mets (you put) + ça (that) + ici (here)" (the item has a hint)
- `exerciseConfig.items[11].explanation` i-elle-met-son-sac: "elle met (she puts - no 's'!) + son sac (her bag) + dans la voiture (in the car)" (the item has a hint)
- `exerciseConfig.items[12].explanation` i-je-mets-un-manteau: "je mets (I put on) + un manteau (a coat)" (the item has a hint)
- `exerciseConfig.items[13].explanation` i-tu-mets-un-pantalon: "tu mets (you put on) + un pantalon (pants)" (the item has a hint)
- `exerciseConfig.items[14].explanation` i-qu-est-ce-que: "qu'est-ce que (what) + tu mets (you wear/put on)" (the item has a hint)
- `exerciseConfig.items[15].explanation` i-il-met-une-chemise: "il met (he puts on) + une chemise (a shirt)" (the item has a hint)
- `exerciseConfig.items[16].explanation` i-nous-mettons-nos-chaussures: "nous mettons (we put on) + nos chaussures (our shoes)" (the item has a hint)
- `exerciseConfig.items[17].explanation` i-ca-met-du-temps: "Idiomatic: ça met du temps (it takes time) - can also say 'ça prend du temps'" (the item has a hint)
- `exerciseConfig.items[18].explanation` i-ca-met-deux-heures: "ça met deux heures (it takes two hours)" (the item has a hint)
- `exerciseConfig.items[19].explanation` i-j-ai-mis: "Passé composé: j'ai mis (irregular past participle)" (the item has a hint)
- `exerciseConfig.items[20].explanation` i-j-ai-mis-la: "j'ai mis la table (I set the table - past)" (the item has a hint)
- `exerciseConfig.items[21].explanation` i-tu-as-mis-un: "tu as mis un manteau (you put on a coat - past)" (the item has a hint)
- 17 × generic instruction dropped (Say "…"): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[2].instruction`, `exerciseConfig.items[3].instruction`, `exerciseConfig.items[5].instruction`, `exerciseConfig.items[6].instruction`, `exerciseConfig.items[7].instruction`, `exerciseConfig.items[8].instruction`, `exerciseConfig.items[9].instruction`, `exerciseConfig.items[10].instruction`, `exerciseConfig.items[11].instruction`, `exerciseConfig.items[12].instruction`, `exerciseConfig.items[13].instruction`, `exerciseConfig.items[14].instruction`, `exerciseConfig.items[15].instruction`, `exerciseConfig.items[16].instruction`, `exerciseConfig.items[17].instruction`, `exerciseConfig.items[18].instruction`

**2024-04-19-demander**

- `emailMetadata.realWorldUse` "ask for help and information" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add commander to order food and products" (no field; the next-module teaser is computed from the outline)
- `exerciseConfig.items[0].explanation` i-je-demande: "Regular -ER verb: je demande" (the item has a hint)
- `exerciseConfig.items[1].explanation` i-tu-demandes: "Regular -ER: tu demandes (with -es)" (the item has a hint)
- `exerciseConfig.items[2].explanation` i-il-demande: "Third person: il demande" (the item has a hint)
- `exerciseConfig.items[3].explanation` i-nous-demandons: "nous demandons - regular -ons ending" (the item has a hint)
- `exerciseConfig.items[4].explanation` i-vous-demandez: "vous demandez - regular -ez ending" (the item has a hint)
- `exerciseConfig.items[5].explanation` i-ils-demandent: "ils demandent - regular -ent (silent)" (the item has a hint)
- `exerciseConfig.items[6].explanation` i-je-demande-de-l: "Very common: je demande de l'aide (I ask for help) - rank 63!" (the item has a hint)
- `exerciseConfig.items[7].explanation` i-tu-demandes-un-cafe: "tu demandes (you ask for) + un café (a coffee)" (the item has a hint)
- `exerciseConfig.items[8].explanation` i-elle-demande-l-addition: "elle demande l'addition (she asks for the bill) - restaurant phrase" (the item has a hint)
- `exerciseConfig.items[9].explanation` i-nous-demandons-la-permission: "nous demandons la permission (we ask for permission)" (the item has a hint)
- `exerciseConfig.items[10].explanation` i-je-demande-pardon: "Polite expression: je demande pardon (I ask forgiveness / I apologize)" (the item has a hint)
- `exerciseConfig.items[11].explanation` i-je-demande-a-marie: "Use 'à' when asking someone: je demande à Marie" (the item has a hint)
- `exerciseConfig.items[12].explanation` i-tu-demandes-a-ton: "tu demandes à ton père (you ask your father) - use 'à'" (the item has a hint)
- `exerciseConfig.items[13].explanation` i-il-demande-a-sa: "il demande à sa mère (he asks his mother)" (the item has a hint)
- `exerciseConfig.items[14].explanation` i-je-te-demande: "je te demande - object pronoun 'te' before verb" (the item has a hint)
- `exerciseConfig.items[15].explanation` i-tu-me-demandes: "tu me demandes - object pronoun 'me' before verb" (the item has a hint)
- `exerciseConfig.items[16].explanation` i-il-me-demande: "il me demande - 'me' (to me) before verb" (the item has a hint)
- `exerciseConfig.items[17].explanation` i-elle-nous-demande: "elle nous demande - 'nous' (us) before verb" (the item has a hint)
- `exerciseConfig.items[18].explanation` i-je-demande-de-partir: "Use 'de' before infinitive: je demande de partir" (the item has a hint)
- `exerciseConfig.items[19].explanation` i-il-me-demande-de: "il me demande de venir - object pronoun + de + infinitive" (the item has a hint)
- `exerciseConfig.items[20].explanation` i-elle-nous-demande-d: "elle nous demande d'attendre - de → d' before vowel" (the item has a hint)
- `exerciseConfig.items[21].explanation` i-ils-te-demandent-d: "ils te demandent d'aider (they ask you to help)" (the item has a hint)
- `exerciseConfig.items[22].explanation` i-pourquoi-tu-demandes: "pourquoi (why) + tu demandes (you ask)" (the item has a hint)
- `exerciseConfig.items[23].explanation` i-j-ai-demande: "Passé composé: j'ai demandé (regular -é past participle)" (the item has a hint)
- `exerciseConfig.items[24].explanation` i-tu-m-as-demande: "tu m'as demandé - object pronoun before auxiliary" (the item has a hint)
- 22 × generic instruction dropped (Say "…"): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[2].instruction`, `exerciseConfig.items[3].instruction`, `exerciseConfig.items[5].instruction`, `exerciseConfig.items[6].instruction`, `exerciseConfig.items[7].instruction`, `exerciseConfig.items[8].instruction`, `exerciseConfig.items[9].instruction`, `exerciseConfig.items[10].instruction`, `exerciseConfig.items[11].instruction`, `exerciseConfig.items[12].instruction`, `exerciseConfig.items[13].instruction`, `exerciseConfig.items[15].instruction`, `exerciseConfig.items[16].instruction`, `exerciseConfig.items[17].instruction`, `exerciseConfig.items[18].instruction`, `exerciseConfig.items[19].instruction`, `exerciseConfig.items[20].instruction`, `exerciseConfig.items[21].instruction`, `exerciseConfig.items[22].instruction`, `exerciseConfig.items[23].instruction`, `exerciseConfig.items[24].instruction`

**2024-04-18-commander**

- `emailMetadata.realWorldUse` "order food, drinks, and products" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Express needs with avoir besoin de" (no field; the next-module teaser is computed from the outline)
- `exerciseConfig.items[0].explanation` i-je-commande: "Regular -ER verb: je commande" (the item has a hint)
- `exerciseConfig.items[1].explanation` i-tu-commandes: "Regular -ER: tu commandes (with -es)" (the item has a hint)
- `exerciseConfig.items[2].explanation` i-elle-commande: "Third person: elle commande" (the item has a hint)
- `exerciseConfig.items[3].explanation` i-nous-commandons: "nous commandons - regular -ons ending" (the item has a hint)
- `exerciseConfig.items[4].explanation` i-vous-commandez: "vous commandez - regular -ez ending (also: 'are you ordering?')" (the item has a hint)
- `exerciseConfig.items[5].explanation` i-ils-commandent: "ils commandent - regular -ent (silent)" (the item has a hint)
- `exerciseConfig.items[6].explanation` i-je-commande-un-cafe: "Very common: je commande un café (I order a coffee)" (the item has a hint)
- `exerciseConfig.items[7].explanation` i-tu-commandes-une-pizza: "tu commandes une pizza (you order a pizza)" (the item has a hint)
- `exerciseConfig.items[8].explanation` i-il-commande-un-steak: "il commande un steak (he orders a steak)" (the item has a hint)
- `exerciseConfig.items[9].explanation` i-elle-commande-du-vin: "elle commande du vin (she orders wine) - use 'du' (some)" (the item has a hint)
- `exerciseConfig.items[10].explanation` i-nous-commandons-le-menu: "nous commandons le menu (we order the set menu)" (the item has a hint)
- `exerciseConfig.items[11].explanation` i-ils-commandent-le-dessert: "ils commandent le dessert (they order dessert)" (the item has a hint)
- `exerciseConfig.items[12].explanation` i-je-voudrais-commander: "Polite: je voudrais commander (I would like to order)" (the item has a hint)
- `exerciseConfig.items[13].explanation` i-vous-commandez-2: "Simple question waiters ask: vous commandez? (are you ordering?)" (the item has a hint)
- `exerciseConfig.items[14].explanation` i-qu-est-ce-que: "qu'est-ce que (what) + tu commandes (you order)" (the item has a hint)
- `exerciseConfig.items[15].explanation` i-je-commande-en-ligne: "je commande en ligne (I order online) - modern phrase" (the item has a hint)
- `exerciseConfig.items[16].explanation` i-tu-commandes-sur-amazon: "tu commandes sur Amazon (you order on Amazon) - use 'sur'" (the item has a hint)
- `exerciseConfig.items[17].explanation` i-nous-commandons-par-telephone: "nous commandons par téléphone (we order by phone) - use 'par'" (the item has a hint)
- `exerciseConfig.items[18].explanation` i-je-ne-commande-pas: "je ne commande pas (I'm not ordering)" (the item has a hint)
- `exerciseConfig.items[19].explanation` i-tu-ne-commandes-pas: "tu ne commandes pas ça (you don't order that)" (the item has a hint)
- `exerciseConfig.items[20].explanation` i-j-ai-commande: "Passé composé: j'ai commandé (regular -é past participle)" (the item has a hint)
- `exerciseConfig.items[21].explanation` i-nous-avons-commande-une: "nous avons commandé une pizza (we ordered a pizza)" (the item has a hint)
- `exerciseConfig.items[22].explanation` i-ils-ont-commande-le: "ils ont commandé le dessert (they ordered dessert)" (the item has a hint)
- 20 × generic instruction dropped (Say "…"): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[2].instruction`, `exerciseConfig.items[3].instruction`, `exerciseConfig.items[5].instruction`, `exerciseConfig.items[6].instruction`, `exerciseConfig.items[7].instruction`, `exerciseConfig.items[8].instruction`, `exerciseConfig.items[9].instruction`, `exerciseConfig.items[10].instruction`, `exerciseConfig.items[11].instruction`, `exerciseConfig.items[12].instruction`, `exerciseConfig.items[14].instruction`, `exerciseConfig.items[15].instruction`, `exerciseConfig.items[16].instruction`, `exerciseConfig.items[17].instruction`, `exerciseConfig.items[18].instruction`, `exerciseConfig.items[19].instruction`, `exerciseConfig.items[20].instruction`, `exerciseConfig.items[21].instruction`, `exerciseConfig.items[22].instruction`

**2024-04-17-besoin**

- `emailMetadata.realWorldUse` "express needs and necessities" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Expand vocabulary with top 200 words" (no field; the next-module teaser is computed from the outline)
- `exerciseConfig.items[0].explanation` i-j-ai-besoin-d: "j'ai besoin d'aide - de → d' before vowel (aide)" (the item has a hint)
- `exerciseConfig.items[1].explanation` i-tu-as-besoin-d: "tu as besoin d'argent (you need money) - d' before vowel" (the item has a hint)
- `exerciseConfig.items[2].explanation` i-j-ai-besoin-de: "j'ai besoin de temps (I need time) - common phrase" (the item has a hint)
- `exerciseConfig.items[3].explanation` i-il-a-besoin-d: "il a besoin d'eau (he needs water) - d' before vowel" (the item has a hint)
- `exerciseConfig.items[4].explanation` i-elle-a-besoin-d: "elle a besoin d'une voiture (she needs a car) - d' before 'une'" (the item has a hint)
- `exerciseConfig.items[5].explanation` i-nous-avons-besoin-de: "nous avons besoin de café (we need coffee)" (the item has a hint)
- `exerciseConfig.items[6].explanation` i-vous-avez-besoin-de: "vous avez besoin de sommeil (you need sleep)" (the item has a hint)
- `exerciseConfig.items[7].explanation` i-ils-ont-besoin-d: "ils ont besoin d'espace (they need space) - d' before vowel" (the item has a hint)
- `exerciseConfig.items[8].explanation` i-j-ai-besoin-de-2: "j'ai besoin de manger (I need to eat) - de + infinitive" (the item has a hint)
- `exerciseConfig.items[9].explanation` i-tu-as-besoin-de: "tu as besoin de partir (you need to leave) - de + infinitive" (the item has a hint)
- `exerciseConfig.items[10].explanation` i-j-ai-besoin-de-3: "j'ai besoin de dormir (I need to sleep)" (the item has a hint)
- `exerciseConfig.items[11].explanation` i-elle-a-besoin-de: "elle a besoin de travailler (she needs to work)" (the item has a hint)
- `exerciseConfig.items[12].explanation` i-nous-avons-besoin-de-2: "nous avons besoin de parler (we need to talk)" (the item has a hint)
- `exerciseConfig.items[13].explanation` i-ils-ont-besoin-de: "ils ont besoin de comprendre (they need to understand)" (the item has a hint)
- `exerciseConfig.items[14].explanation` i-de-quoi-tu-as: "de quoi (of what) + tu as besoin (you have need) - 'de quoi' stays together" (the item has a hint)
- `exerciseConfig.items[15].explanation` i-tu-as-besoin-d-2: "Simple question: tu as besoin d'aide? (do you need help?)" (the item has a hint)
- `exerciseConfig.items[16].explanation` i-il-a-besoin-de: "il a besoin de ça? (does he need that?)" (the item has a hint)
- `exerciseConfig.items[17].explanation` i-je-n-ai-pas: "Negative: je n'ai pas besoin d'aide - ne...pas around avoir" (the item has a hint)
- `exerciseConfig.items[18].explanation` i-tu-n-as-pas: "tu n'as pas besoin de ça (you don't need that)" (the item has a hint)
- `exerciseConfig.items[19].explanation` i-elle-n-a-pas: "elle n'a pas besoin de partir (she doesn't need to leave)" (the item has a hint)
- `exerciseConfig.items[20].explanation` i-nous-n-avons-pas: "nous n'avons pas besoin d'argent (we don't need money)" (the item has a hint)
- `exerciseConfig.items[21].explanation` i-j-avais-besoin-d: "Past (imperfect): j'avais besoin d'aide (I needed/was needing help)" (the item has a hint)
- `exerciseConfig.items[22].explanation` i-tu-avais-besoin-de: "tu avais besoin de temps (you needed time)" (the item has a hint)
- 22 × generic instruction dropped (Say "…"): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[1].instruction`, `exerciseConfig.items[2].instruction`, `exerciseConfig.items[3].instruction`, `exerciseConfig.items[4].instruction`, `exerciseConfig.items[5].instruction`, `exerciseConfig.items[7].instruction`, `exerciseConfig.items[8].instruction`, `exerciseConfig.items[9].instruction`, `exerciseConfig.items[10].instruction`, `exerciseConfig.items[11].instruction`, `exerciseConfig.items[12].instruction`, `exerciseConfig.items[13].instruction`, `exerciseConfig.items[14].instruction`, `exerciseConfig.items[15].instruction`, `exerciseConfig.items[16].instruction`, `exerciseConfig.items[17].instruction`, `exerciseConfig.items[18].instruction`, `exerciseConfig.items[19].instruction`, `exerciseConfig.items[20].instruction`, `exerciseConfig.items[21].instruction`, `exerciseConfig.items[22].instruction`

**2024-04-25-top-200-nouns**

- `emailMetadata.realWorldUse` "discuss time, people, and abstract ideas" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Expanded vocabulary mastery" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Test comprehension with cultural reading" (no field; the next-module teaser is computed from the outline)
- `exerciseConfig.items[0].explanation` i-une-annee: "feminine: une année (a year) - for duration, use 'un an'" (the item has a hint)
- `exerciseConfig.items[1].explanation` i-une-fois: "une fois (once / one time) - deux fois (twice)" (the item has a hint)
- `exerciseConfig.items[2].explanation` i-un-moment: "masculine: un moment (a moment)" (the item has a hint)
- `exerciseConfig.items[3].explanation` i-une-heure: "feminine: une heure (one hour) - silent 'h'" (the item has a hint)
- `exerciseConfig.items[4].explanation` i-une-minute: "feminine: une minute (one minute)" (the item has a hint)
- `exerciseConfig.items[5].explanation` i-le-debut: "masculine: le début (the beginning) - au début (at the beginning)" (the item has a hint)
- `exerciseConfig.items[6].explanation` i-la-fin: "feminine: la fin (the end) - à la fin (at the end)" (the item has a hint)
- `exerciseConfig.items[7].explanation` i-une-personne: "feminine: une personne (a person) - always feminine!" (the item has a hint)
- `exerciseConfig.items[8].explanation` i-ma-famille: "feminine: ma famille (my family)" (the item has a hint)
- `exerciseConfig.items[9].explanation` i-mon-pere: "masculine: mon père (my father)" (the item has a hint)
- `exerciseConfig.items[10].explanation` i-ma-mere: "feminine: ma mère (my mother)" (the item has a hint)
- `exerciseConfig.items[11].explanation` i-mon-frere: "masculine: mon frère (my brother)" (the item has a hint)
- `exerciseConfig.items[12].explanation` i-ma-soeur: "feminine: ma sœur (my sister)" (the item has a hint)
- `exerciseConfig.items[13].explanation` i-un-fils: "masculine: un fils (a son) - 's' is silent!" (the item has a hint)
- `exerciseConfig.items[14].explanation` i-une-fille: "feminine: une fille (a daughter) - also means 'girl'" (the item has a hint)
- `exerciseConfig.items[15].explanation` i-les-yeux: "masculine plural: les yeux - irregular! (singular: un œil)" (the item has a hint)
- `exerciseConfig.items[16].explanation` i-le-visage: "masculine: le visage (the face)" (the item has a hint)
- `exerciseConfig.items[17].explanation` i-le-corps: "masculine: le corps (the body) - 'p' and 's' are silent!" (the item has a hint)
- `exerciseConfig.items[18].explanation` i-le-coeur: "masculine: le cœur (the heart)" (the item has a hint)
- `exerciseConfig.items[19].explanation` i-la-voix: "feminine: la voix (the voice) - 'x' is silent!" (the item has a hint)
- `exerciseConfig.items[20].explanation` i-une-histoire: "feminine: une histoire (a story) - also means 'history'" (the item has a hint)
- `exerciseConfig.items[21].explanation` i-un-probleme: "masculine: un problème (a problem)" (the item has a hint)
- `exerciseConfig.items[22].explanation` i-une-question: "feminine: une question (a question)" (the item has a hint)
- `exerciseConfig.items[23].explanation` i-la-raison: "feminine: la raison (the reason)" (the item has a hint)
- `exerciseConfig.items[24].explanation` i-un-fait: "masculine: un fait (a fact) - silent 't'" (the item has a hint)
- `exerciseConfig.items[25].explanation` i-une-partie: "feminine: une partie (a part) - also means 'game'" (the item has a hint)
- `exerciseConfig.items[26].explanation` i-le-cote: "masculine: le côté (the side) - à côté de (next to)" (the item has a hint)
- `exerciseConfig.items[27].explanation` i-j-ai-un-probleme: "j'ai un problème (I have a problem) - very common phrase!" (the item has a hint)
- `exerciseConfig.items[28].explanation` i-j-ai-une-question: "j'ai une question (I have a question) - useful phrase!" (the item has a hint)
- `exerciseConfig.items[29].explanation` i-c-est-une-longue: "c'est une longue histoire (it's a long story) - common expression" (the item has a hint)
- `exerciseConfig.items[30].explanation` i-toute-ma-famille: "toute ma famille (my whole family) - 'toute' agrees with feminine 'famille'" (the item has a hint)
- `exerciseConfig.items[31].explanation` i-au-debut: "au début (at the beginning) - à + le = au" (the item has a hint)
- `exerciseConfig.items[32].explanation` i-a-la-fin: "à la fin (at the end) - common time expression" (the item has a hint)
- 33 × generic instruction dropped (Say "…"): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[1].instruction`, `exerciseConfig.items[2].instruction`, `exerciseConfig.items[3].instruction`, `exerciseConfig.items[4].instruction`, `exerciseConfig.items[5].instruction`, `exerciseConfig.items[6].instruction`, `exerciseConfig.items[7].instruction`, `exerciseConfig.items[8].instruction`, `exerciseConfig.items[9].instruction`, `exerciseConfig.items[10].instruction`, `exerciseConfig.items[11].instruction`, `exerciseConfig.items[12].instruction`, `exerciseConfig.items[13].instruction`, `exerciseConfig.items[14].instruction`, `exerciseConfig.items[15].instruction`, `exerciseConfig.items[16].instruction`, `exerciseConfig.items[17].instruction`, `exerciseConfig.items[18].instruction`, `exerciseConfig.items[19].instruction`, `exerciseConfig.items[20].instruction`, `exerciseConfig.items[21].instruction`, `exerciseConfig.items[22].instruction`, `exerciseConfig.items[23].instruction`, `exerciseConfig.items[24].instruction`, `exerciseConfig.items[25].instruction`, `exerciseConfig.items[26].instruction`, `exerciseConfig.items[27].instruction`, `exerciseConfig.items[28].instruction`, `exerciseConfig.items[29].instruction`, `exerciseConfig.items[30].instruction`, `exerciseConfig.items[31].instruction`, `exerciseConfig.items[32].instruction`

**2024-04-24-reading-6**

- `emailMetadata.realWorldUse` "understand French conversations about planning and communication" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Advanced communication comprehension" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Practice all Unit 6 skills" (no field; the next-module teaser is computed from the outline)
- `concepts[0]` concept "Advanced Communication Milestone": a reading has no concept cards
- `concepts[1]` concept "Real-World Scenarios": a reading has no concept cards
- `concepts[2]` concept "Fluency Integration": a reading has no concept cards
- `skipStudyMode` true (Study Mode belongs to lessons only)
- `readingPassage.title` "Un Voyage en Famille" (the story's title comes from stories/)
- `exerciseConfig.items[5].prompt` "What will Marie see for the first time?" (repeats the question)

**2024-04-27-unit-6-practice**

- `emailMetadata.realWorldUse` "form sophisticated communication" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Take the Unit 6 exam to prove your fluency" (no field; the next-module teaser is computed from the outline)
- `concepts[0]` concept "Fluency Practice": a practice set teaches nothing
- `concepts[1]` concept "Progressive Tense Mastery": a practice set teaches nothing
- `concepts[2]` concept "Communication Verb Fluency": a practice set teaches nothing
- `skipStudyMode` true (Study Mode belongs to lessons only)

**2024-04-26-unit-6-exam**

- `title` "Unit 6 Final Exam - Communication": a unit exam's title comes from the outline ("Unit exam · <unit name>")
- `emailMetadata.realWorldUse` "communicate with advanced nuance and precision" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Advanced communication fluency" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Start Unit 7 for cognitive verbs" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.isUnitCompletion` true (no field; the next-module teaser is computed from the outline)
- `concepts[0]` concept "Fluency and Mastery Achievement": a unit exam teaches nothing
- `concepts[1]` concept "Progressive Tenses": a unit exam teaches nothing
- `concepts[2]` concept "Essential Communication Verbs": a unit exam teaches nothing
- `concepts[3]` concept "Expressing Needs and Wants": a unit exam teaches nothing
- `concepts[4]` concept "Extensive Vocabulary": a unit exam teaches nothing
- `skipStudyMode` true (Study Mode belongs to lessons only)
- `unitNumber` 6 (the outline places the exam)
- 75 × generic instruction dropped (Translate to French): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[1].instruction`, `exerciseConfig.items[2].instruction`, `exerciseConfig.items[3].instruction`, `exerciseConfig.items[4].instruction`, `exerciseConfig.items[6].instruction`, `exerciseConfig.items[7].instruction`, `exerciseConfig.items[8].instruction`, `exerciseConfig.items[9].instruction`, `exerciseConfig.items[10].instruction`, `exerciseConfig.items[11].instruction`, `exerciseConfig.items[12].instruction`, `exerciseConfig.items[13].instruction`, `exerciseConfig.items[14].instruction`, `exerciseConfig.items[15].instruction`, `exerciseConfig.items[16].instruction`, `exerciseConfig.items[17].instruction`, `exerciseConfig.items[18].instruction`, `exerciseConfig.items[19].instruction`, `exerciseConfig.items[20].instruction`, `exerciseConfig.items[21].instruction`, `exerciseConfig.items[22].instruction`, `exerciseConfig.items[23].instruction`, `exerciseConfig.items[24].instruction`, `exerciseConfig.items[25].instruction`, `exerciseConfig.items[26].instruction`, `exerciseConfig.items[27].instruction`, `exerciseConfig.items[28].instruction`, `exerciseConfig.items[29].instruction`, `exerciseConfig.items[30].instruction`, `exerciseConfig.items[31].instruction`, `exerciseConfig.items[32].instruction`, `exerciseConfig.items[33].instruction`, `exerciseConfig.items[34].instruction`, `exerciseConfig.items[35].instruction`, `exerciseConfig.items[36].instruction`, `exerciseConfig.items[37].instruction`, `exerciseConfig.items[38].instruction`, `exerciseConfig.items[39].instruction`, `exerciseConfig.items[40].instruction`, `exerciseConfig.items[41].instruction`, `exerciseConfig.items[42].instruction`, `exerciseConfig.items[43].instruction`, `exerciseConfig.items[44].instruction`, `exerciseConfig.items[45].instruction`, `exerciseConfig.items[46].instruction`, `exerciseConfig.items[47].instruction`, `exerciseConfig.items[48].instruction`, `exerciseConfig.items[49].instruction`, `exerciseConfig.items[50].instruction`, `exerciseConfig.items[51].instruction`, `exerciseConfig.items[52].instruction`, `exerciseConfig.items[53].instruction`, `exerciseConfig.items[54].instruction`, `exerciseConfig.items[55].instruction`, `exerciseConfig.items[56].instruction`, `exerciseConfig.items[57].instruction`, `exerciseConfig.items[58].instruction`, `exerciseConfig.items[59].instruction`, `exerciseConfig.items[60].instruction`, `exerciseConfig.items[61].instruction`, `exerciseConfig.items[62].instruction`, `exerciseConfig.items[63].instruction`, `exerciseConfig.items[64].instruction`, `exerciseConfig.items[65].instruction`, `exerciseConfig.items[66].instruction`, `exerciseConfig.items[67].instruction`, `exerciseConfig.items[68].instruction`, `exerciseConfig.items[69].instruction`, `exerciseConfig.items[70].instruction`, `exerciseConfig.items[71].instruction`, `exerciseConfig.items[72].instruction`, `exerciseConfig.items[73].instruction`, `exerciseConfig.items[74].instruction`, `exerciseConfig.items[75].instruction`
- 1 × generic instruction dropped (What does '…' mean?): `exerciseConfig.items[5].instruction`

**2024-05-05-on-and-people**

- `emailMetadata.realWorldUse` "speak naturally about people in general" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Natural French pronoun usage" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add discourse markers for conversational flow" (no field; the next-module teaser is computed from the outline)
- 3 × generic instruction dropped (Say '…'): `exercises[2].instruction`, `exercises[3].instruction`, `exercises[5].instruction`

**2024-05-09-studying-verbs**

- `emailMetadata.realWorldUse` "talk about studying and academic work" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Master the most important pronoun: on (we/people)" (no field; the next-module teaser is computed from the outline)
- 6 × generic instruction dropped (Say '…'): `exercises[0].instruction`, `exercises[1].instruction`, `exercises[2].instruction`, `exercises[3].instruction`, `exercises[4].instruction`, `exercises[5].instruction`

**2024-05-04-learning-verbs**

- `emailMetadata.realWorldUse` "discuss learning and education" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add studying verbs to complete your learning vocabulary" (no field; the next-module teaser is computed from the outline)
- 6 × generic instruction dropped (Say '…'): `exercises[0].instruction`, `exercises[1].instruction`, `exercises[2].instruction`, `exercises[3].instruction`, `exercises[4].instruction`, `exercises[5].instruction`

**2024-04-29-comprendre**

- `emailMetadata.realWorldUse` "communicate understanding and confusion" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add penser to express your thoughts" (no field; the next-module teaser is computed from the outline)

**2024-05-08-savoir**

- `emailMetadata.realWorldUse` "express what you know and don't know" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Knowledge expression mastery" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add connaître to talk about people and places you know" (no field; the next-module teaser is computed from the outline)

**2024-04-30-connaitre**

- `emailMetadata.realWorldUse` "talk about people and places you know" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add learning and studying verbs" (no field; the next-module teaser is computed from the outline)

**2024-05-06-penser**

- `emailMetadata.realWorldUse` "express opinions and thoughts" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add croire to express beliefs" (no field; the next-module teaser is computed from the outline)

**2024-05-01-croire**

- `emailMetadata.realWorldUse` "express beliefs and tentative opinions" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add knowledge nouns to discuss learning concepts" (no field; the next-module teaser is computed from the outline)

**2024-05-03-knowledge-nouns**

- `emailMetadata.realWorldUse` "discuss education and ideas" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add discourse markers to sound like a native" (no field; the next-module teaser is computed from the outline)
- 6 × generic instruction dropped (Translate '…'): `exercises[0].instruction`, `exercises[1].instruction`, `exercises[2].instruction`, `exercises[3].instruction`, `exercises[4].instruction`, `exercises[5].instruction`

**2024-05-02-discourse-markers**

- `emailMetadata.realWorldUse` "speak with natural French rhythm and flow" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Natural conversational French" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Complete modifiers with tout, même, mal" (no field; the next-module teaser is computed from the outline)
- 9 × generic instruction dropped (Say '…'): `exercises[1].instruction`, `exercises[6].instruction`, `exercises[7].instruction`, `exercises[8].instruction`, `exercises[9].instruction`, `exercises[10].instruction`, `exercises[11].instruction`, `exercises[12].instruction`, `exercises[14].instruction`

**2024-04-28-comparison-modifiers**

- `emailMetadata.realWorldUse` "add nuance to comparisons and descriptions" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Test comprehension with cultural reading" (no field; the next-module teaser is computed from the outline)
- 6 × generic instruction dropped (Say '…'): `exercises[0].instruction`, `exercises[1].instruction`, `exercises[2].instruction`, `exercises[3].instruction`, `exercises[4].instruction`, `exercises[5].instruction`

**2024-05-07-reading-7**

- `emailMetadata.realWorldUse` "read French intellectual and educational content" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Academic comprehension achieved" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Practice Unit 7 cognitive skills" (no field; the next-module teaser is computed from the outline)
- `concepts[0]` concept "Academic Reading Milestone": a reading has no concept cards
- `concepts[1]` concept "Educational Context": a reading has no concept cards
- `concepts[2]` concept "Cognitive Language Integration": a reading has no concept cards
- `skipStudyMode` true (Study Mode belongs to lessons only)
- `readingPassage.title` "L'Art d'Apprendre" (the story's title comes from stories/)
- `glossary` 3 story glossary notes (a glossary row holds fr and en)

**2024-05-11-unit-7-practice**

- `emailMetadata.realWorldUse` "communicate intellectual ideas naturally" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Take the Unit 7 exam to prove your cognitive mastery" (no field; the next-module teaser is computed from the outline)
- `concepts[0]` concept "Cognitive Practice": a practice set teaches nothing
- `concepts[1]` concept "Knowledge Verb Mastery": a practice set teaches nothing
- `concepts[2]` concept "Learning Context Integration": a practice set teaches nothing
- `skipStudyMode` true (Study Mode belongs to lessons only)

**2024-05-10-unit-7-exam**

- `title` "Unit 7 Final Exam - Knowledge & Learning": a unit exam's title comes from the outline ("Unit exam · <unit name>")
- `emailMetadata.realWorldUse` "express thoughts, knowledge, and opinions" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Cognitive expression mastery" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Start Unit 8 for daily routines and reflexive verbs" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.isUnitCompletion` true (no field; the next-module teaser is computed from the outline)
- `concepts[0]` concept "Knowledge and Learning Mastery": a unit exam teaches nothing
- `concepts[1]` concept "Cognitive Verb Mastery": a unit exam teaches nothing
- `concepts[2]` concept "Learning and Teaching": a unit exam teaches nothing
- `concepts[3]` concept "On vs Nous Usage": a unit exam teaches nothing
- `concepts[4]` concept "Cultural and Academic Vocabulary": a unit exam teaches nothing
- `skipStudyMode` true (Study Mode belongs to lessons only)
- `unitNumber` 7 (the outline places the exam)
- 55 × generic instruction dropped (Translate to French): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[1].instruction`, `exerciseConfig.items[2].instruction`, `exerciseConfig.items[3].instruction`, `exerciseConfig.items[4].instruction`, `exerciseConfig.items[6].instruction`, `exerciseConfig.items[7].instruction`, `exerciseConfig.items[8].instruction`, `exerciseConfig.items[9].instruction`, `exerciseConfig.items[10].instruction`, `exerciseConfig.items[11].instruction`, `exerciseConfig.items[12].instruction`, `exerciseConfig.items[13].instruction`, `exerciseConfig.items[14].instruction`, `exerciseConfig.items[15].instruction`, `exerciseConfig.items[16].instruction`, `exerciseConfig.items[17].instruction`, `exerciseConfig.items[19].instruction`, `exerciseConfig.items[20].instruction`, `exerciseConfig.items[21].instruction`, `exerciseConfig.items[22].instruction`, `exerciseConfig.items[24].instruction`, `exerciseConfig.items[25].instruction`, `exerciseConfig.items[26].instruction`, `exerciseConfig.items[27].instruction`, `exerciseConfig.items[28].instruction`, `exerciseConfig.items[29].instruction`, `exerciseConfig.items[30].instruction`, `exerciseConfig.items[31].instruction`, `exerciseConfig.items[32].instruction`, `exerciseConfig.items[33].instruction`, `exerciseConfig.items[34].instruction`, `exerciseConfig.items[35].instruction`, `exerciseConfig.items[36].instruction`, `exerciseConfig.items[37].instruction`, `exerciseConfig.items[38].instruction`, `exerciseConfig.items[39].instruction`, `exerciseConfig.items[40].instruction`, `exerciseConfig.items[41].instruction`, `exerciseConfig.items[42].instruction`, `exerciseConfig.items[46].instruction`, `exerciseConfig.items[47].instruction`, `exerciseConfig.items[48].instruction`, `exerciseConfig.items[49].instruction`, `exerciseConfig.items[50].instruction`, `exerciseConfig.items[51].instruction`, `exerciseConfig.items[52].instruction`, `exerciseConfig.items[53].instruction`, `exerciseConfig.items[54].instruction`, `exerciseConfig.items[55].instruction`, `exerciseConfig.items[56].instruction`, `exerciseConfig.items[57].instruction`, `exerciseConfig.items[58].instruction`, `exerciseConfig.items[59].instruction`, `exerciseConfig.items[60].instruction`
- 1 × generic instruction dropped (What does '…' mean?): `exerciseConfig.items[5].instruction`

**2024-05-23-temporal-words**

- `emailMetadata.realWorldUse` "organize and tell stories chronologically" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Temporal sequencing mastered" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Test comprehension with daily life reading" (no field; the next-module teaser is computed from the outline)
- 7 × generic instruction dropped (Say '…'): `exercises[1].instruction`, `exercises[2].instruction`, `exercises[6].instruction`, `exercises[7].instruction`, `exercises[8].instruction`, `exercises[9].instruction`, `exercises[10].instruction`

**2024-05-21-reflexive-pronouns**

- `emailMetadata.realWorldUse` "build foundation for daily routine expressions" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Learn s'appeler to finally introduce yourself properly" (no field; the next-module teaser is computed from the outline)
- 1 × generic instruction dropped (Say '…'): `exercises[7].instruction`

**2024-05-22-s-appeler**

- `emailMetadata.realWorldUse` "introduce yourself and ask people's names" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Proper French introductions" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Describe your morning routine" (no field; the next-module teaser is computed from the outline)
- 3 × generic instruction dropped (Say '…'): `exercises[0].instruction`, `exercises[2].instruction`, `exercises[3].instruction`

**2024-05-19-morning-routine**

- `emailMetadata.realWorldUse` "talk about morning routines" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add more daily reflexive verbs" (no field; the next-module teaser is computed from the outline)
- 5 × generic instruction dropped (Say '…'): `exercises[0].instruction`, `exercises[1].instruction`, `exercises[3].instruction`, `exercises[4].instruction`, `exercises[5].instruction`

**2024-05-17-getting-ready**

- `emailMetadata.realWorldUse` "describe your complete morning routine" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Learn daily actions like sleep, work, and live" (no field; the next-module teaser is computed from the outline)
- 4 × generic instruction dropped (Say '…'): `exercises[0].instruction`, `exercises[1].instruction`, `exercises[2].instruction`, `exercises[4].instruction`

**2024-05-16-daily-reflexives**

- `emailMetadata.realWorldUse` "describe daily mental and emotional states" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Learn getting ready and preparation verbs" (no field; the next-module teaser is computed from the outline)
- 3 × generic instruction dropped (Say '…'): `exercises[0].instruction`, `exercises[2].instruction`, `exercises[4].instruction`

**2024-06-07-reflexive-past**

- `emailMetadata.realWorldUse` "describe past daily routines" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Express mutual actions with reciprocal reflexives" (no field; the next-module teaser is computed from the outline)
- 2 × generic instruction dropped (Say '…'): `exercises[1].instruction`, `exercises[2].instruction`

**2024-06-06-reciprocal-reflexives**

- `emailMetadata.realWorldUse` "describe mutual relationships and actions" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Master the passé composé vs imparfait distinction" (no field; the next-module teaser is computed from the outline)
- 3 × generic instruction dropped (Say '…'): `exercises[0].instruction`, `exercises[3].instruction`, `exercises[4].instruction`

**2024-05-13-commands-tu**

- `emailMetadata.realWorldUse` "give instructions to friends" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add formal commands for polite instructions" (no field; the next-module teaser is computed from the outline)

**2024-05-14-commands-vous**

- `emailMetadata.realWorldUse` "give polite instructions" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Learn irregular commands" (no field; the next-module teaser is computed from the outline)

**2024-05-18-irregular-commands**

- `emailMetadata.realWorldUse` "give common everyday instructions" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Combine commands with pronouns" (no field; the next-module teaser is computed from the outline)

**2024-05-12-commands-pronouns**

- `emailMetadata.realWorldUse` "give precise instructions with objects" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add temporal words to sequence events" (no field; the next-module teaser is computed from the outline)

**2024-05-20-reading-8**

- `emailMetadata.realWorldUse` "understand French daily life narratives" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Daily routine comprehension" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Practice all Unit 8 reflexive skills" (no field; the next-module teaser is computed from the outline)
- `concepts[0]` concept "Daily Life Reading Milestone": a reading has no concept cards
- `concepts[1]` concept "Routine and Relationships": a reading has no concept cards
- `concepts[2]` concept "Temporal Narrative Integration": a reading has no concept cards
- `skipStudyMode` true (Study Mode belongs to lessons only)
- `readingPassage.title` "Ma Journée" (the story's title comes from stories/)

**2024-05-25-unit-8-practice**

- `emailMetadata.realWorldUse` "describe your daily life in French" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Take the Unit 8 exam to prove your daily life mastery" (no field; the next-module teaser is computed from the outline)
- `concepts[0]` concept "Daily Life Practice": a practice set teaches nothing
- `concepts[1]` concept "Temporal Fluency": a practice set teaches nothing
- `concepts[2]` concept "Reflexive Mastery": a practice set teaches nothing
- `skipStudyMode` true (Study Mode belongs to lessons only)

**2024-05-24-unit-8-exam**

- `title` "Unit 8 Final Exam - Daily Life & Actions": a unit exam's title comes from the outline ("Unit exam · <unit name>")
- `emailMetadata.realWorldUse` "talk about daily life and give directions" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Daily routine fluency" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Start Unit 9 for past tense mastery" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.isUnitCompletion` true (no field; the next-module teaser is computed from the outline)
- `concepts[0]` concept "Daily Life and Actions Mastery": a unit exam teaches nothing
- `concepts[1]` concept "Temporal Mastery": a unit exam teaches nothing
- `concepts[2]` concept "Reflexive Verbs": a unit exam teaches nothing
- `concepts[3]` concept "Routine and Commands": a unit exam teaches nothing
- `concepts[4]` concept "Reciprocal Actions": a unit exam teaches nothing
- `skipStudyMode` true (Study Mode belongs to lessons only)
- `unitNumber` 8 (the outline places the exam)
- 31 × generic instruction dropped (Translate to French): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[1].instruction`, `exerciseConfig.items[2].instruction`, `exerciseConfig.items[3].instruction`, `exerciseConfig.items[4].instruction`, `exerciseConfig.items[5].instruction`, `exerciseConfig.items[6].instruction`, `exerciseConfig.items[7].instruction`, `exerciseConfig.items[12].instruction`, `exerciseConfig.items[13].instruction`, `exerciseConfig.items[14].instruction`, `exerciseConfig.items[15].instruction`, `exerciseConfig.items[16].instruction`, `exerciseConfig.items[17].instruction`, `exerciseConfig.items[18].instruction`, `exerciseConfig.items[19].instruction`, `exerciseConfig.items[20].instruction`, `exerciseConfig.items[21].instruction`, `exerciseConfig.items[22].instruction`, `exerciseConfig.items[23].instruction`, `exerciseConfig.items[24].instruction`, `exerciseConfig.items[25].instruction`, `exerciseConfig.items[26].instruction`, `exerciseConfig.items[27].instruction`, `exerciseConfig.items[28].instruction`, `exerciseConfig.items[29].instruction`, `exerciseConfig.items[30].instruction`, `exerciseConfig.items[31].instruction`, `exerciseConfig.items[32].instruction`, `exerciseConfig.items[33].instruction`, `exerciseConfig.items[34].instruction`

**2024-05-26-causal-words**

- `emailMetadata.realWorldUse` "explain reasons and provide justifications" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add spatial prepositions to describe locations" (no field; the next-module teaser is computed from the outline)
- `unit` 9 (the outline places the module)
- `fillInBlanksSentences` 10 strings, never shown (the exercises hold the same sentences)

**2024-06-08-spatial-prepositions**

- `emailMetadata.realWorldUse` "describe locations and give directions" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add more spatial relations for complete descriptions" (no field; the next-module teaser is computed from the outline)
- `unit` 9 (the outline places the module)
- `fillInBlanksSentences` 10 strings, never shown (the exercises hold the same sentences)

**2024-05-28-more-spatial-relations**

- `emailMetadata.realWorldUse` "give precise directions and describe locations" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Start learning past tense with regular -ER verbs" (no field; the next-module teaser is computed from the outline)
- `unit` 9 (the outline places the module)
- `fillInBlanksSentences` 10 strings, never shown (the exercises hold the same sentences)

**2024-05-30-passe-compose-er**

- `emailMetadata.realWorldUse` "describe completed past actions" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Past tense foundation" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add irregular past participles" (no field; the next-module teaser is computed from the outline)
- `unit` 9 (the outline places the module)
- `fillInBlanksSentences` 10 strings, never shown (the exercises hold the same sentences)

**2024-06-01-passe-compose-irregular-1**

- `emailMetadata.realWorldUse` "describe common past actions" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add more irregular past participles" (no field; the next-module teaser is computed from the outline)
- `unit` 9 (the outline places the module)
- `fillInBlanksSentences` 10 strings, never shown (the exercises hold the same sentences)

**2024-06-02-passe-compose-irregular-2**

- `emailMetadata.realWorldUse` "describe past intentions and obligations" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Learn motion verbs with être" (no field; the next-module teaser is computed from the outline)
- `unit` 9 (the outline places the module)
- `fillInBlanksSentences` 10 strings, never shown (the exercises hold the same sentences)

**2024-05-31-passe-compose-etre**

- `emailMetadata.realWorldUse` "tell stories about where you went" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Motion verb past tense mastery" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Learn past participle agreement rules" (no field; the next-module teaser is computed from the outline)
- `unit` 9 (the outline places the module)
- `fillInBlanksSentences` 10 strings, never shown (the exercises hold the same sentences)

**2024-05-29-passe-compose-agreement**

- `emailMetadata.realWorldUse` "write grammatically correct past tense" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Form imparfait for all verbs" (no field; the next-module teaser is computed from the outline)
- `unit` 9 (the outline places the module)
- `fillInBlanksSentences` 10 strings, never shown (the exercises hold the same sentences)

**2024-05-27-imparfait-all-verbs**

- `emailMetadata.realWorldUse` "describe past habits and ongoing situations" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Imparfait mastery" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Learn when to use passé composé vs imparfait" (no field; the next-module teaser is computed from the outline)
- `unit` 9 (the outline places the module)
- `fillInBlanksSentences` 10 strings, never shown (the exercises hold the same sentences)

**2024-06-04-pc-vs-imparfait**

- `emailMetadata.realWorldUse` "tell sophisticated stories about the past" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Past tense storytelling mastery" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Practice composing complex past narratives" (no field; the next-module teaser is computed from the outline)
- `unit` 9 (the outline places the module)
- `fillInBlanksSentences` 10 strings, never shown (the exercises hold the same sentences)

**2024-06-03-past-tense-composition**

- `emailMetadata.realWorldUse` "tell complete stories with all past tense elements" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Story composition mastery" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Test your storytelling with reading comprehension" (no field; the next-module teaser is computed from the outline)
- `unit` 9 (the outline places the module)
- `fillInBlanksSentences` 10 strings, never shown (the exercises hold the same sentences)

**2024-06-05-reading-9**

- `emailMetadata.realWorldUse` "read French stories and narratives" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Past tense narrative comprehension" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Practice all past tense skills" (no field; the next-module teaser is computed from the outline)
- `concepts[0]` concept "Narrative Reading Milestone": a reading has no concept cards
- `concepts[1]` concept "Past Tense Narrative": a reading has no concept cards
- `concepts[2]` concept "Discourse Integration": a reading has no concept cards
- `skipStudyMode` true (Study Mode belongs to lessons only)
- `unit` 9 (the outline places the module)
- `readingPassage.title` "Un Samedi à Paris" (the story's title comes from stories/)

**2024-06-10-unit-9-practice**

- `emailMetadata.realWorldUse` "tell complete stories about the past" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Take the Unit 9 exam to prove your storytelling mastery" (no field; the next-module teaser is computed from the outline)
- `concepts[0]` concept "Past Tense Practice": a practice set teaches nothing
- `concepts[1]` concept "Imparfait Mastery": a practice set teaches nothing
- `concepts[2]` concept "Discourse Integration": a practice set teaches nothing
- `skipStudyMode` true (Study Mode belongs to lessons only)

**2024-06-09-unit-9-exam**

- `title` "Unit 9 Final Exam - Discourse & Past Tense": a unit exam's title comes from the outline ("Unit exam · <unit name>")
- `emailMetadata.realWorldUse` "tell stories and describe past experiences" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Past tense storytelling mastery" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Start Unit 10 for advanced B2 expressions" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.isUnitCompletion` true (no field; the next-module teaser is computed from the outline)
- `concepts[0]` concept "Past Tenses and Discourse Mastery": a unit exam teaches nothing
- `concepts[1]` concept "Imparfait Mastery": a unit exam teaches nothing
- `concepts[2]` concept "Past Tense Contrast": a unit exam teaches nothing
- `concepts[3]` concept "Plus-que-parfait": a unit exam teaches nothing
- `concepts[4]` concept "Discourse Markers": a unit exam teaches nothing
- `skipStudyMode` true (Study Mode belongs to lessons only)
- `unitNumber` 9 (the outline places the exam)
- 35 × generic instruction dropped (Translate to French): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[1].instruction`, `exerciseConfig.items[2].instruction`, `exerciseConfig.items[3].instruction`, `exerciseConfig.items[4].instruction`, `exerciseConfig.items[5].instruction`, `exerciseConfig.items[6].instruction`, `exerciseConfig.items[7].instruction`, `exerciseConfig.items[8].instruction`, `exerciseConfig.items[9].instruction`, `exerciseConfig.items[10].instruction`, `exerciseConfig.items[11].instruction`, `exerciseConfig.items[12].instruction`, `exerciseConfig.items[13].instruction`, `exerciseConfig.items[14].instruction`, `exerciseConfig.items[15].instruction`, `exerciseConfig.items[16].instruction`, `exerciseConfig.items[17].instruction`, `exerciseConfig.items[18].instruction`, `exerciseConfig.items[19].instruction`, `exerciseConfig.items[20].instruction`, `exerciseConfig.items[21].instruction`, `exerciseConfig.items[22].instruction`, `exerciseConfig.items[23].instruction`, `exerciseConfig.items[24].instruction`, `exerciseConfig.items[25].instruction`, `exerciseConfig.items[26].instruction`, `exerciseConfig.items[27].instruction`, `exerciseConfig.items[28].instruction`, `exerciseConfig.items[29].instruction`, `exerciseConfig.items[30].instruction`, `exerciseConfig.items[31].instruction`, `exerciseConfig.items[32].instruction`, `exerciseConfig.items[33].instruction`, `exerciseConfig.items[34].instruction`

**2024-01-23-common-special-forms-1**

- `emailMetadata.realWorldUse` "build foundation for advanced French expressions" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add more special forms" (no field; the next-module teaser is computed from the outline)
- `unit` 10 (the outline places the module)

**2024-01-24-common-special-forms-2**

- `emailMetadata.realWorldUse` "express complex wishes and necessities" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Use these forms in necessity phrases" (no field; the next-module teaser is computed from the outline)
- `unit` 10 (the outline places the module)

**2024-01-28-necessity-phrases**

- `emailMetadata.realWorldUse` "express what needs to happen" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "B2 necessity expressions" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Express wishes with je veux que" (no field; the next-module teaser is computed from the outline)
- `unit` 10 (the outline places the module)

**2024-02-07-wish-phrases**

- `emailMetadata.realWorldUse` "express wishes about what others should do" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Express emotions with je suis content que" (no field; the next-module teaser is computed from the outline)
- `unit` 10 (the outline places the module)

**2024-01-25-emotion-phrases**

- `emailMetadata.realWorldUse` "express emotions about others" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Share opinions with je pense que" (no field; the next-module teaser is computed from the outline)
- `unit` 10 (the outline places the module)

**2024-01-29-opinion-phrases**

- `emailMetadata.realWorldUse` "share opinions tactfully" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Express hypothetical situations" (no field; the next-module teaser is computed from the outline)
- `unit` 10 (the outline places the module)

**2024-01-27-hypothetical-phrases**

- `emailMetadata.realWorldUse` "express hypotheticals and daydreams" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Hypothetical thinking mastery" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Express past regrets with si j'avais su" (no field; the next-module teaser is computed from the outline)
- `unit` 10 (the outline places the module)

**2024-01-30-past-regret-phrases**

- `emailMetadata.realWorldUse` "express regrets and missed opportunities" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Express 'had already' with j'avais déjà" (no field; the next-module teaser is computed from the outline)
- `unit` 10 (the outline places the module)

**2024-01-26-had-already-phrases**

- `unit` 10 (the outline places the module)

**2024-01-22-common-adverbs**

- `emailMetadata.realWorldUse` "add nuance and emphasis to everything you say" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Express 'while doing' with en + present participle" (no field; the next-module teaser is computed from the outline)
- `unit` 10 (the outline places the module)

**2024-02-06-while-doing-phrases**

- `unit` 10 (the outline places the module)

**2024-02-02-service-phrases**

- `unit` 10 (the outline places the module)

**2024-01-21-before-phrases**

- `unit` 10 (the outline places the module)

**2024-02-03-so-that-phrases**

- `unit` 10 (the outline places the module)

**2024-01-20-although-phrases**

- `unit` 10 (the outline places the module)

**2024-01-31-possibility-phrases**

- `unit` 10 (the outline places the module)

**2024-02-01-reading-10**

- `emailMetadata.realWorldUse` "read French philosophical and emotional content" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "B2 reading comprehension" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Practice all B2 expressions" (no field; the next-module teaser is computed from the outline)
- `concepts[0]` concept "Expertise Reading Milestone": a reading has no concept cards
- `concepts[1]` concept "Sophisticated Discourse": a reading has no concept cards
- `concepts[2]` concept "Mastery Integration": a reading has no concept cards
- `skipStudyMode` true (Study Mode belongs to lessons only)
- `unit` 10 (the outline places the module)
- `readingPassage.title` "Un Rêve à Paris" (the story's title comes from stories/)

**2024-02-05-unit-10-practice**

- `emailMetadata.realWorldUse` "communicate at B2 level" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Take the Unit 10 exam to prove your B2 mastery" (no field; the next-module teaser is computed from the outline)
- `concepts[0]` concept "Mastery Practice": a practice set teaches nothing
- `concepts[1]` concept "Relative Pronoun Mastery": a practice set teaches nothing
- `concepts[2]` concept "Subjunctive Integration": a practice set teaches nothing
- `skipStudyMode` true (Study Mode belongs to lessons only)

**2024-02-04-unit-10-exam**

- `title` "Unit 10 Final Exam - Mastery & Nuance": a unit exam's title comes from the outline ("Unit exam · <unit name>")
- `emailMetadata.realWorldUse` "express complex thoughts and hypothetical situations" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "B2 level mastery achieved" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Start Unit 11 for complete top 100 word coverage" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.isUnitCompletion` true (no field; the next-module teaser is computed from the outline)
- `concepts[0]` concept "Mastery and Nuance Achievement": a unit exam teaches nothing
- `concepts[1]` concept "Relative Pronouns Mastery": a unit exam teaches nothing
- `concepts[2]` concept "Subjunctive Mood": a unit exam teaches nothing
- `concepts[3]` concept "Indefinite Pronouns": a unit exam teaches nothing
- `concepts[4]` concept "Advanced Hypotheticals": a unit exam teaches nothing
- `skipStudyMode` true (Study Mode belongs to lessons only)
- `unitNumber` 10 (the outline places the exam)
- 30 × generic instruction dropped (Translate to French): `exerciseConfig.items[6].instruction`, `exerciseConfig.items[7].instruction`, `exerciseConfig.items[8].instruction`, `exerciseConfig.items[9].instruction`, `exerciseConfig.items[10].instruction`, `exerciseConfig.items[11].instruction`, `exerciseConfig.items[12].instruction`, `exerciseConfig.items[13].instruction`, `exerciseConfig.items[14].instruction`, `exerciseConfig.items[15].instruction`, `exerciseConfig.items[16].instruction`, `exerciseConfig.items[17].instruction`, `exerciseConfig.items[18].instruction`, `exerciseConfig.items[19].instruction`, `exerciseConfig.items[20].instruction`, `exerciseConfig.items[21].instruction`, `exerciseConfig.items[22].instruction`, `exerciseConfig.items[23].instruction`, `exerciseConfig.items[24].instruction`, `exerciseConfig.items[25].instruction`, `exerciseConfig.items[26].instruction`, `exerciseConfig.items[27].instruction`, `exerciseConfig.items[28].instruction`, `exerciseConfig.items[29].instruction`, `exerciseConfig.items[30].instruction`, `exerciseConfig.items[31].instruction`, `exerciseConfig.items[32].instruction`, `exerciseConfig.items[33].instruction`, `exerciseConfig.items[34].instruction`, `exerciseConfig.items[35].instruction`

**2024-02-08-age-personal-info**

- `emailMetadata.realWorldUse` "share personal information in French" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Personal information mastery" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Complete top 100 words with donner" (no field; the next-module teaser is computed from the outline)
- `unit` 11 (the outline places the module)

**2024-02-10-donner**

- `emailMetadata.realWorldUse` "talk about giving and sharing" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Top 100 word completion milestone" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add daily action verbs" (no field; the next-module teaser is computed from the outline)
- `unit` 11 (the outline places the module)
- 4 × generic instruction dropped (Translate to French): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[1].instruction`, `exerciseConfig.items[2].instruction`, `exerciseConfig.items[3].instruction`
- 4 × generic instruction dropped (Say: '…'): `exerciseConfig.items[4].instruction`, `exerciseConfig.items[5].instruction`, `exerciseConfig.items[6].instruction`, `exerciseConfig.items[8].instruction`
- 1 × generic instruction dropped (Ask: '…'): `exerciseConfig.items[7].instruction`

**2024-05-15-daily-actions-1**

- `emailMetadata.realWorldUse` "describe fundamental daily activities" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Master commands to give instructions" (no field; the next-module teaser is computed from the outline)
- `unit` 11 (the outline places the module)
- 9 × generic instruction dropped (Translate to French): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[1].instruction`, `exerciseConfig.items[2].instruction`, `exerciseConfig.items[3].instruction`, `exerciseConfig.items[4].instruction`, `exerciseConfig.items[5].instruction`, `exerciseConfig.items[6].instruction`, `exerciseConfig.items[7].instruction`, `exerciseConfig.items[8].instruction`
- 1 × generic instruction dropped (Ask: '…'): `exerciseConfig.items[9].instruction`
- 4 × generic instruction dropped (Say: '…'): `exerciseConfig.items[11].instruction`, `exerciseConfig.items[12].instruction`, `exerciseConfig.items[13].instruction`, `exerciseConfig.items[14].instruction`

**2024-02-13-search-and-find**

- `emailMetadata.realWorldUse` "search for and find things" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add perception verbs to complete sensory vocabulary" (no field; the next-module teaser is computed from the outline)
- `unit` 11 (the outline places the module)
- 6 × generic instruction dropped (Translate to French): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[1].instruction`, `exerciseConfig.items[2].instruction`, `exerciseConfig.items[3].instruction`, `exerciseConfig.items[4].instruction`, `exerciseConfig.items[5].instruction`
- 4 × generic instruction dropped (Say: '…'): `exerciseConfig.items[6].instruction`, `exerciseConfig.items[10].instruction`, `exerciseConfig.items[11].instruction`, `exerciseConfig.items[13].instruction`
- 1 × generic instruction dropped (Ask: '…'): `exerciseConfig.items[7].instruction`

**2024-02-11-perception-verbs**

- `emailMetadata.realWorldUse` "talk about what you listen to and watch" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add social situation verbs" (no field; the next-module teaser is computed from the outline)
- `unit` 11 (the outline places the module)
- 6 × generic instruction dropped (Translate to French): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[1].instruction`, `exerciseConfig.items[2].instruction`, `exerciseConfig.items[3].instruction`, `exerciseConfig.items[4].instruction`, `exerciseConfig.items[5].instruction`
- 4 × generic instruction dropped (Say: '…'): `exerciseConfig.items[6].instruction`, `exerciseConfig.items[7].instruction`, `exerciseConfig.items[10].instruction`, `exerciseConfig.items[11].instruction`
- 2 × generic instruction dropped (Ask: '…'): `exerciseConfig.items[8].instruction`, `exerciseConfig.items[9].instruction`

**2024-02-14-social-situations**

- `emailMetadata.realWorldUse` "coordinate meetings and social events" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Master directions and navigation" (no field; the next-module teaser is computed from the outline)
- `unit` 11 (the outline places the module)
- 9 × generic instruction dropped (Translate to French): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[1].instruction`, `exerciseConfig.items[2].instruction`, `exerciseConfig.items[3].instruction`, `exerciseConfig.items[4].instruction`, `exerciseConfig.items[5].instruction`, `exerciseConfig.items[6].instruction`, `exerciseConfig.items[7].instruction`, `exerciseConfig.items[8].instruction`
- 3 × generic instruction dropped (Say: '…'): `exerciseConfig.items[9].instruction`, `exerciseConfig.items[11].instruction`, `exerciseConfig.items[13].instruction`
- 3 × generic instruction dropped (Ask: '…'): `exerciseConfig.items[10].instruction`, `exerciseConfig.items[12].instruction`, `exerciseConfig.items[14].instruction`

**2024-02-09-directions-navigation**

- `emailMetadata.realWorldUse` "navigate and give directions in France" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Navigation mastery" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Test comprehension with cultural reading" (no field; the next-module teaser is computed from the outline)
- `unit` 11 (the outline places the module)
- 7 × generic instruction dropped (Translate to French): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[1].instruction`, `exerciseConfig.items[2].instruction`, `exerciseConfig.items[3].instruction`, `exerciseConfig.items[4].instruction`, `exerciseConfig.items[5].instruction`, `exerciseConfig.items[6].instruction`
- 4 × generic instruction dropped (Say: '…'): `exerciseConfig.items[7].instruction`, `exerciseConfig.items[8].instruction`, `exerciseConfig.items[13].instruction`, `exerciseConfig.items[14].instruction`
- 2 × generic instruction dropped (Ask: '…'): `exerciseConfig.items[9].instruction`, `exerciseConfig.items[12].instruction`

**2024-02-12-reading-11**

- `emailMetadata.realWorldUse` "read authentic French publications" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Advanced reading mastery" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Practice all essential vocabulary" (no field; the next-module teaser is computed from the outline)
- `concepts[0]` concept "Final Reading Milestone": a reading has no concept cards
- `concepts[1]` concept "Complete French Mastery": a reading has no concept cards
- `concepts[2]` concept "B2+ Level Achievement": a reading has no concept cards
- `skipStudyMode` true (Study Mode belongs to lessons only)
- `unit` 11 (the outline places the module)
- `readingPassage.title` "La France d'Aujourd'hui : Un Pays en Mouvement" (the story's title comes from stories/)

**2024-02-16-unit-11-practice**

- `emailMetadata.realWorldUse` "handle all essential daily situations" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Take the Unit 11 exam to achieve complete top 100 mastery" (no field; the next-module teaser is computed from the outline)
- `concepts[0]` concept "Advanced Structures Practice": a practice set teaches nothing
- `concepts[1]` concept "Future and Conditional Mastery": a practice set teaches nothing
- `concepts[2]` concept "Passive and Causative Integration": a practice set teaches nothing
- `skipStudyMode` true (Study Mode belongs to lessons only)

**2024-02-15-unit-11-exam**

- `title` "Unit 11 Final Exam - Daily Essentials & Practical Communication": a unit exam's title comes from the outline ("Unit exam · <unit name>")
- `emailMetadata.realWorldUse` "handle any daily situation in France" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Complete top 100 word mastery" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Start Unit 12 for advanced question mastery" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.isUnitCompletion` true (no field; the next-module teaser is computed from the outline)
- `concepts[0]` concept "Advanced Structures Mastery": a unit exam teaches nothing
- `concepts[1]` concept "Future Tense Mastery": a unit exam teaches nothing
- `concepts[2]` concept "Conditional Mood": a unit exam teaches nothing
- `concepts[3]` concept "Passive Voice": a unit exam teaches nothing
- `concepts[4]` concept "Causative Faire": a unit exam teaches nothing
- `concepts[5]` concept "Gerunds and Transitions": a unit exam teaches nothing
- `skipStudyMode` true (Study Mode belongs to lessons only)
- `unitNumber` 11 (the outline places the exam)
- 4 × generic instruction dropped (Translate to French): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[11].instruction`, `exerciseConfig.items[14].instruction`, `exerciseConfig.items[17].instruction`

**2024-03-15-nature-animals**

- `emailMetadata.realWorldUse` "discuss nature and animals" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add movement verbs for describing nature" (no field; the next-module teaser is computed from the outline)
- `unit` 12 (the outline places the module)
- `exerciseConfig.items[12].explanation` i-un-oiseau-bleu: "In French, color comes AFTER the noun: un oiseau bleu (a bird blue)" (the item has a hint)
- 15 × generic instruction dropped (Say '…'): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[1].instruction`, `exerciseConfig.items[2].instruction`, `exerciseConfig.items[3].instruction`, `exerciseConfig.items[4].instruction`, `exerciseConfig.items[5].instruction`, `exerciseConfig.items[6].instruction`, `exerciseConfig.items[7].instruction`, `exerciseConfig.items[8].instruction`, `exerciseConfig.items[9].instruction`, `exerciseConfig.items[10].instruction`, `exerciseConfig.items[11].instruction`, `exerciseConfig.items[12].instruction`, `exerciseConfig.items[13].instruction`, `exerciseConfig.items[14].instruction`

**2024-03-16-movement-verbs**

- `unit` 12 (the outline places the module)
- 12 × generic instruction dropped (Translate to French): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[1].instruction`, `exerciseConfig.items[2].instruction`, `exerciseConfig.items[3].instruction`, `exerciseConfig.items[4].instruction`, `exerciseConfig.items[5].instruction`, `exerciseConfig.items[6].instruction`, `exerciseConfig.items[7].instruction`, `exerciseConfig.items[8].instruction`, `exerciseConfig.items[9].instruction`, `exerciseConfig.items[10].instruction`, `exerciseConfig.items[11].instruction`
- 6 × generic instruction dropped (Say '…'): `exerciseConfig.items[12].instruction`, `exerciseConfig.items[13].instruction`, `exerciseConfig.items[14].instruction`, `exerciseConfig.items[15].instruction`, `exerciseConfig.items[16].instruction`, `exerciseConfig.items[17].instruction`

**2024-03-17-natural-phenomena**

- `unit` 12 (the outline places the module)
- `exerciseConfig.items[11].explanation` i-le-soleil-rend-l: "CAUSATIVE PATTERN: subject + rend + object + adjective. The sun MAKES grass green!" (the item has a hint)
- 5 × generic instruction dropped (Translate to French): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[2].instruction`, `exerciseConfig.items[8].instruction`, `exerciseConfig.items[9].instruction`, `exerciseConfig.items[10].instruction`
- 8 × generic instruction dropped (Say '…'): `exerciseConfig.items[1].instruction`, `exerciseConfig.items[3].instruction`, `exerciseConfig.items[4].instruction`, `exerciseConfig.items[7].instruction`, `exerciseConfig.items[11].instruction`, `exerciseConfig.items[12].instruction`, `exerciseConfig.items[13].instruction`, `exerciseConfig.items[14].instruction`

**2024-03-15-questce-qui-que**

- `emailMetadata.realWorldUse` "ask any 'what' question correctly" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Advanced question mastery" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Master complex 'why' questions" (no field; the next-module teaser is computed from the outline)
- `unit` 12 (the outline places the module)
- `exerciseConfig.items[2].explanation` i-qu-est-ce-qui-3: "Perfect! 'Qu'est-ce qui fait' = What does (subject). The subject is doing the action of 'making shine'." (the item has a hint)
- `exerciseConfig.items[14].explanation` i-qu-est-ce-qui-9: "Transform any statement into a question by identifying the subject and using qu'est-ce qui!" (the item has a hint)
- `exerciseConfig.items[15].explanation` i-qu-est-ce-que-7: "Transform statements with objects by using qu'est-ce que + subject + verb!" (the item has a hint)

**2024-03-19-pourquoi-complex**

- `unit` 12 (the outline places the module)
- `exerciseConfig.items[12].explanation` i-pourquoi-est-ce-qu-4: "Use 'en train de' for ongoing actions - you learned this earlier!" (the item has a hint)
- 16 × generic instruction dropped (Ask '…'): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[1].instruction`, `exerciseConfig.items[2].instruction`, `exerciseConfig.items[3].instruction`, `exerciseConfig.items[4].instruction`, `exerciseConfig.items[5].instruction`, `exerciseConfig.items[6].instruction`, `exerciseConfig.items[7].instruction`, `exerciseConfig.items[8].instruction`, `exerciseConfig.items[9].instruction`, `exerciseConfig.items[10].instruction`, `exerciseConfig.items[11].instruction`, `exerciseConfig.items[14].instruction`, `exerciseConfig.items[15].instruction`, `exerciseConfig.items[16].instruction`, `exerciseConfig.items[17].instruction`

**2024-03-20-comment-complex**

- `unit` 12 (the outline places the module)
- `exerciseConfig.items[13].explanation` i-comment-nage-une-tortue: "In formal French, invert verb and subject: Comment nage une tortue? Same meaning as 'Comment est-ce qu'une tortue nage?'" (the item has a hint)
- `exerciseConfig.items[15].explanation` i-comment-est-ce-qu-8: "Both 'comment est-ce qu'on fait ça?' and 'comment fait-on ça?' are correct!" (the item has a hint)
- 13 × generic instruction dropped (Ask '…'): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[1].instruction`, `exerciseConfig.items[2].instruction`, `exerciseConfig.items[3].instruction`, `exerciseConfig.items[4].instruction`, `exerciseConfig.items[5].instruction`, `exerciseConfig.items[6].instruction`, `exerciseConfig.items[7].instruction`, `exerciseConfig.items[8].instruction`, `exerciseConfig.items[9].instruction`, `exerciseConfig.items[10].instruction`, `exerciseConfig.items[11].instruction`, `exerciseConfig.items[12].instruction`

**2024-03-16-quiest-qui-que**

- `unit` 12 (the outline places the module)
- `exerciseConfig.items[13].explanation` i-qui-est-ce-qui-8: "Both qu'est-ce qui (what) and qui est-ce qui (who) use QUI for subject questions!" (the item has a hint)
- `exerciseConfig.items[14].explanation` i-qui-est-ce-que-7: "Both qu'est-ce que (what) and qui est-ce que (who) use QUE for object questions!" (the item has a hint)

**2024-03-22-inversion-questions**

- `unit` 12 (the outline places the module)
- `exerciseConfig.items[5].explanation` i-pourquoi-a-t-il: "Add -t- between vowel-ending verb and il/elle for liaison: a-t-il" (the item has a hint)
- `exerciseConfig.items[8].explanation` i-pourquoi-les-nuages-sont: "With noun subjects, keep noun then add inverted pronoun: les nuages sont-ils" (the item has a hint)
- `exerciseConfig.items[14].explanation` i-comment-fais-tu-ca-2: "Both forms mean the same! Informal: Comment est-ce que tu fais ça? Formal: Comment fais-tu ça?" (the item has a hint)

**2024-03-23-embedded-questions**

- `unit` 12 (the outline places the module)
- `exerciseConfig.items[0].explanation` i-je-me-demande-pourquoi: "After 'je me demande', use statement order - no est-ce que needed!" (the item has a hint)
- `exerciseConfig.items[13].explanation` i-je-me-demande-pourquoi-3: "Transform direct questions to embedded by removing est-ce que!" (the item has a hint)
- 9 × generic instruction dropped (Say '…'): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[1].instruction`, `exerciseConfig.items[2].instruction`, `exerciseConfig.items[3].instruction`, `exerciseConfig.items[4].instruction`, `exerciseConfig.items[5].instruction`, `exerciseConfig.items[6].instruction`, `exerciseConfig.items[7].instruction`, `exerciseConfig.items[12].instruction`
- 4 × generic instruction dropped (Ask '…'): `exerciseConfig.items[8].instruction`, `exerciseConfig.items[9].instruction`, `exerciseConfig.items[10].instruction`, `exerciseConfig.items[11].instruction`

**2024-03-24-rhetorical-negative**

- `unit` 12 (the outline places the module)
- `exerciseConfig.items[1].explanation` i-n-est-ce-pas-2: "N'est-ce pas? at the end of a statement = 'right?' or 'isn't it?'" (the item has a hint)
- `exerciseConfig.items[5].explanation` i-comment-ne-pas-aimer: "Rhetorical question - implies everyone DOES love it!" (the item has a hint)
- `exerciseConfig.items[6].explanation` i-qui-ne-voudrait-pas: "Rhetorical question - implies everyone WOULD want it!" (the item has a hint)
- `exerciseConfig.items[7].explanation` i-pourquoi-ne-pas-essayer: "Rhetorical suggestion - means 'you should try!'" (the item has a hint)
- 5 × generic instruction dropped (Ask '…'): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[2].instruction`, `exerciseConfig.items[3].instruction`, `exerciseConfig.items[4].instruction`, `exerciseConfig.items[10].instruction`

**2024-03-25-multi-clause-questions**

- `unit` 12 (the outline places the module)
- `exerciseConfig.items[0].explanation` i-pourquoi-est-ce-qu: "Combining question with Unit 10 necessity phrase!" (the item has a hint)
- `exerciseConfig.items[8].explanation` i-qu-est-ce-qui: "Conditional causative question - hypothetical 'would make'" (the item has a hint)
- `exerciseConfig.items[13].explanation` i-comment-est-ce-que-3: "Peak complexity! Question + opinion + conditional + causative - you've mastered it all!" (the item has a hint)
- 14 × generic instruction dropped (Ask '…'): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[1].instruction`, `exerciseConfig.items[2].instruction`, `exerciseConfig.items[3].instruction`, `exerciseConfig.items[4].instruction`, `exerciseConfig.items[5].instruction`, `exerciseConfig.items[6].instruction`, `exerciseConfig.items[7].instruction`, `exerciseConfig.items[8].instruction`, `exerciseConfig.items[9].instruction`, `exerciseConfig.items[10].instruction`, `exerciseConfig.items[11].instruction`, `exerciseConfig.items[12].instruction`, `exerciseConfig.items[13].instruction`

**2024-04-01-alphabet**

- `id` "alphabet" (today's page slug; the module_key names the page)

**2024-04-02-numbers**

- `id` "numbers" (today's page slug; the module_key names the page)

**2024-04-03-days-months**

- `id` "days-months" (today's page slug; the module_key names the page)

**2024-04-04-holidays**

- `id` "holidays" (today's page slug; the module_key names the page)

**2024-04-05-colors**

- `id` "colors" (today's page slug; the module_key names the page)

**2024-04-06-french-countries**

- `id` "french-countries" (today's page slug; the module_key names the page)

**2024-04-07-language-stats**

- `id` "language-stats" (today's page slug; the module_key names the page)

**2024-04-08-spelling-patterns**

- `sections` 6 category icons (emoji; no field)

**2024-12-18-pronunciation-test**

- `emailMetadata.realWorldUse` "speak French confidently with clear pronunciation" (no field; a Reference page has no next module)
- `emailMetadata.nextModuleTeaser` "Continue with conversation practice" (no field; a Reference page has no next module)

## Text written differently

The same words, moved into a field of the new shape.

**2024-01-02-etre**

- `items[5].prompt` i-vous-etes: prompt "you are (formal or plural)" joined to the instruction (a transform has no cue field)
- `items[6].prompt` i-ils-sont: prompt "they are (masculine or mixed)" joined to the instruction (a transform has no cue field)
- `items[7].prompt` i-elles-sont: prompt "they are (all feminine)" joined to the instruction (a transform has no cue field)

**2024-01-04-avoir**

- `items[5].prompt` i-vous-avez: prompt "you have (formal or plural)" joined to the instruction (a transform has no cue field)
- `items[6].prompt` i-ils-ont: prompt "they have (masculine or mixed)" joined to the instruction (a transform has no cue field)
- `items[7].prompt` i-elles-ont: prompt "they have (all feminine)" joined to the instruction (a transform has no cue field)

**2024-10-21-cognates-help**

- `title` "Cognates - French and English Share Many Words" is L's title "Cognates"

**2024-10-20-liaison-help**

- `title` "French Flow - Liaison Help" is L's title "French Flow · Liaison"
- `parts` "Silent letters at the end" from LiaisonHelp.jsx (L's copy predates it)
- `parts` "Elision: l'ami, j'ai" from LiaisonHelp.jsx (L's copy predates it)

**2024-01-09-reading1**

- `passage` story text: added: "Paul, un chat et un chien."
- `passage` story text: added: "Marie, la maison et la voiture."
- `passage` story text: added: "Les amis ont des livres et des chats."
- `passage` story text: added: "Les amis, les enfants, les chiens et le chat."
- `passage` story text: added: "Au revoir, Paul et Marie !"

**2024-01-10-unit1-practice**

- `items[4].blanks` i-un-et: 2 blank hints joined into one hint
- `items[6].blanks` i-avez-ou: 2 blank hints joined into one hint
- `items[10].blanks` i-mais-aussi: 2 blank hints joined into one hint
- `items[11].blanks` i-la-ou: 2 blank hints joined into one hint
- 12 × instruction written as the gloss ("Complete:" and quotes dropped): `items[0].instruction`, `items[1].instruction`, `items[2].instruction`, `items[3].instruction`, `items[4].instruction`, `items[5].instruction`, `items[6].instruction`, `items[7].instruction`, `items[8].instruction`, `items[9].instruction`, `items[10].instruction`, `items[11].instruction`

**2026-11-24-negation-guide**

- `guide.sections[1].rows` 2 row notes joined into the part's note (L's lines have no note cell)
- `line` the guide row line is the description (the source has no line)

**2024-01-17-voir**

- `items[0].prompt` i-je-vois: prompt "I see / I am seeing" joined to the instruction (a transform has no cue field)
- `items[1].prompt` i-tu-vois: prompt "you see / you are seeing (informal)" joined to the instruction (a transform has no cue field)
- `items[2].prompt` i-il-voit: prompt "he sees / he is seeing" joined to the instruction (a transform has no cue field)
- `items[3].prompt` i-elle-voit: prompt "she sees / she is seeing" joined to the instruction (a transform has no cue field)
- `items[4].prompt` i-nous-voyons: prompt "we see / we are seeing" joined to the instruction (a transform has no cue field)
- `items[5].prompt` i-vous-voyez: prompt "you see / you are seeing (formal or plural)" joined to the instruction (a transform has no cue field)
- `items[6].prompt` i-ils-voient: prompt "they see / they are seeing (masculine or mixed)" joined to the instruction (a transform has no cue field)
- `items[7].prompt` i-elles-voient: prompt "they see / they are seeing (all feminine)" joined to the instruction (a transform has no cue field)

**2024-01-22-reading2**

- `passage` story text: added: "Sophie et Thomas à Caen."
- `passage` story text: added: "Marie, la nouvelle voiture et le chien à Honfleur."
- `passage` story text: added: "Les vieilles et belles maisons de Bayeux."
- `passage` story text: added: "La petite maison de Pierre à Rouen."
- `passage` story text: added: "Le Mont-Saint-Michel."
- `passage` story text: added: "Il est très grand !"

**2024-01-23-unit2-practice**

- `items[10].blanks` i-veux-cette: 2 blank hints joined into one hint
- `items[11].blanks` i-sous-voiture: 2 blank hints joined into one hint
- `items[12].blanks` i-que-tu: 2 blank hints joined into one hint
- `items[13].blanks` i-peut-voir: 2 blank hints joined into one hint
- `items[14].blanks` i-ce-ces: 2 blank hints joined into one hint
- `items[18].blanks` i-avoir-ces: 2 blank hints joined into one hint
- `items[19].blanks` i-chez-toi: 2 blank hints joined into one hint
- 20 × instruction written as the gloss ("Complete:" and quotes dropped): `items[0].instruction`, `items[1].instruction`, `items[2].instruction`, `items[3].instruction`, `items[4].instruction`, `items[5].instruction`, `items[6].instruction`, `items[7].instruction`, `items[8].instruction`, `items[9].instruction`, `items[10].instruction`, `items[11].instruction`, `items[12].instruction`, `items[13].instruction`, `items[14].instruction`, `items[15].instruction`, `items[16].instruction`, `items[17].instruction`, `items[18].instruction`, `items[19].instruction`

**2024-02-03-reading3**

- `passage[2].fr` italic markup removed: *Le Comte de Monte-Cristo*
- `passage[6].fr` italic markup removed: *Vingt mille lieues sous les mers*
- `passage` story text: added: "Sophie et Marc à Paris."
- `passage` story text: added: "Le nouveau livre de Sophie."
- `passage` story text: added: "Paul et son jeune enfant à Montmartre."
- `passage` story text: added: "Un nouveau livre pour Sophie."
- `passage` story text: added: "Un bon café au Café de la Paix."

**2024-02-04-unit3-practice**

- `items[12].blanks` i-vas-au: 2 blank hints joined into one hint
- `items[13].blanks` i-les-vois: 2 blank hints joined into one hint
- `items[14].blanks` i-vient-du: 2 blank hints joined into one hint
- `items[15].blanks` i-ton-ta: 2 blank hints joined into one hint
- `items[16].blanks` i-vont-ses: 2 blank hints joined into one hint
- `items[17].blanks` i-le-au: 2 blank hints joined into one hint
- `items[18].blanks` i-pars-ton-au: 3 blank hints joined into one hint
- 20 × instruction written as the gloss ("Complete:" and quotes dropped): `items[0].instruction`, `items[1].instruction`, `items[2].instruction`, `items[3].instruction`, `items[4].instruction`, `items[5].instruction`, `items[6].instruction`, `items[7].instruction`, `items[8].instruction`, `items[9].instruction`, `items[10].instruction`, `items[11].instruction`, `items[12].instruction`, `items[13].instruction`, `items[14].instruction`, `items[15].instruction`, `items[16].instruction`, `items[17].instruction`, `items[18].instruction`, `items[19].instruction`

**2024-03-29-parler**

- `items[0].prompt` i-je-parle: prompt "I speak / I talk" joined to the instruction (a transform has no cue field)
- `items[1].prompt` i-tu-parles: prompt "you speak / you talk (informal)" joined to the instruction (a transform has no cue field)
- `items[2].prompt` i-il-parle: prompt "he speaks / he talks" joined to the instruction (a transform has no cue field)
- `items[3].prompt` i-elle-parle: prompt "she speaks / she talks" joined to the instruction (a transform has no cue field)
- `items[4].prompt` i-nous-parlons: prompt "we speak / we talk" joined to the instruction (a transform has no cue field)
- `items[5].prompt` i-vous-parlez: prompt "you speak / you talk (formal or plural)" joined to the instruction (a transform has no cue field)
- `items[6].prompt` i-ils-parlent: prompt "they speak / they talk (masculine or mixed)" joined to the instruction (a transform has no cue field)
- `items[7].prompt` i-elles-parlent: prompt "they speak / they talk (all feminine)" joined to the instruction (a transform has no cue field)

**2024-03-30-reading-4**

- `passage[21].speaker` "La femme" names the speaker; the English line said "The woman"
- `passage[23].speaker` "La femme" names the speaker; the English line said "The woman"
- `passage` story text: added: "Marie doit aller au travail."
- `passage` story text: added: "Marie et Paul dans la rue."
- `passage` story text: "Ce soir au café:" → "Ce soir au café"
- `passage` story text: added: "Ce soir, au café Les Éditeurs."
- `passage` story text: added: "Du pain et de l'eau."
- `passage` story text: added: "Marie aime cette ville."

**2024-04-03-unit-4-practice**

- `items[4].blanks` i-ne-pas: 2 blank hints joined into one hint
- `items[12].blanks` i-ne-pas-2: 2 blank hints joined into one hint
- `items[13].blanks` i-dois-maintenant: 2 blank hints joined into one hint
- `items[14].blanks` i-parlons-ici: 2 blank hints joined into one hint
- `items[15].blanks` i-ne-jamais: 2 blank hints joined into one hint
- `items[16].blanks` i-ne-pas-3: 2 blank hints joined into one hint
- `items[18].blanks` i-fais-demain: 2 blank hints joined into one hint
- `items[19].blanks` i-n-pas-ici: 3 blank hints joined into one hint
- 20 × instruction written as the gloss ("Complete:" and quotes dropped): `items[0].instruction`, `items[1].instruction`, `items[2].instruction`, `items[3].instruction`, `items[4].instruction`, `items[5].instruction`, `items[6].instruction`, `items[7].instruction`, `items[8].instruction`, `items[9].instruction`, `items[10].instruction`, `items[11].instruction`, `items[12].instruction`, `items[13].instruction`, `items[14].instruction`, `items[15].instruction`, `items[16].instruction`, `items[17].instruction`, `items[18].instruction`, `items[19].instruction`

**2024-04-13-reading-5**

- `passage` story text: added: "La ville d'Arles."
- `passage` story text: added: "Vincent van Gogh et Paul Gauguin se retrouvent à leur café préféré pour boire leur boisson favorite, l'absinthe."
- `passage` story text: added: "On dit parfois qu'elle fait voir des fées vertes."
- `passage` story text: added: "Vincent van Gogh et Paul Gauguin parlent dans un café à Arles."
- `passage` story text: added: "Le serveur apporte leurs absinthes."
- `passage` story text: added: "Ils boivent beaucoup."
- `passage` story text: added: "Ils l'aiment."
- `passage` story text: added: "Vincent part pour son hôtel."
- `passage` story text: added: "Il trouve ses peintures."
- `passage` story text: added: "Il revient au café."
- `passage` story text: added: "Ils boivent encore de l'absinthe."
- `passage` story text: added: "Ils sont au café toute la nuit."
- `passage` story text: added: "Vincent fait son tableau."
- `passage` story text: added: "Paul boit son absinthe avec lui."
- `readingPassage.subtitle` the subtitle is a passage block in the story

**2024-04-15-unit-5-practice**

- `items[31].blanks` i-devrions-au: 2 blank hints joined into one hint
- `items[32].blanks` i-avais-manger: 2 blank hints joined into one hint
- `items[33].blanks` i-etait-mange: 2 blank hints joined into one hint
- 37 × instruction written as the gloss ("Complete:" and quotes dropped): `items[0].instruction`, `items[1].instruction`, `items[2].instruction`, `items[3].instruction`, `items[4].instruction`, `items[5].instruction`, `items[6].instruction`, `items[7].instruction`, `items[8].instruction`, `items[9].instruction`, `items[10].instruction`, `items[11].instruction`, `items[12].instruction`, `items[13].instruction`, `items[14].instruction`, `items[15].instruction`, `items[16].instruction`, `items[17].instruction`, `items[18].instruction`, `items[19].instruction`, `items[20].instruction`, `items[21].instruction`, `items[22].instruction`, `items[23].instruction`, `items[24].instruction`, `items[25].instruction`, `items[26].instruction`, `items[27].instruction`, `items[28].instruction`, `items[29].instruction`, `items[30].instruction`, `items[31].instruction`, `items[32].instruction`, `items[33].instruction`, `items[34].instruction`, `items[35].instruction`, `items[36].instruction`

**2024-04-24-reading-6**

- `passage[1].speaker` "Le père" names the speaker; the English line said "Father"
- `passage[4].speaker` "La mère" names the speaker; the English line said "Mother"
- `passage[6].speaker` "La mère" names the speaker; the English line said "Mother"
- `passage[8].speaker` "Le père" names the speaker; the English line said "Father"
- `passage[10].speaker` "Le père" names the speaker; the English line said "Father"
- `passage[13].speaker` "Le père" names the speaker; the English line said "Father"
- `passage[16].speaker` "La mère" names the speaker; the English line said "Mother"
- `passage[18].speaker` "Le père" names the speaker; the English line said "Father"
- `passage[20].speaker` "La mère" names the speaker; the English line said "Mother"
- `passage[22].speaker` "Le père" names the speaker; the English line said "Father"
- `passage` story text: added: "Le père, la mère, Marie et son frère à la maison."
- `passage` story text: added: "Marie peut prendre trois livres."
- `passage` story text: added: "Dans le train, la famille mange du pain et du fromage."
- `passage` story text: added: "Marie voit la Tour Eiffel pour la première fois."
- `vocabularyReference[58]` "la ville" ("city") is listed twice; one card, notes joined

**2024-04-27-unit-6-practice**

- 50 × instruction written as the gloss ("Complete:" and quotes dropped): `items[0].instruction`, `items[1].instruction`, `items[2].instruction`, `items[3].instruction`, `items[4].instruction`, `items[5].instruction`, `items[6].instruction`, `items[7].instruction`, `items[8].instruction`, `items[9].instruction`, `items[10].instruction`, `items[11].instruction`, `items[12].instruction`, `items[13].instruction`, `items[14].instruction`, `items[15].instruction`, `items[16].instruction`, `items[17].instruction`, `items[18].instruction`, `items[19].instruction`, `items[20].instruction`, `items[21].instruction`, `items[22].instruction`, `items[23].instruction`, `items[24].instruction`, `items[25].instruction`, `items[26].instruction`, `items[27].instruction`, `items[28].instruction`, `items[29].instruction`, `items[30].instruction`, `items[31].instruction`, `items[32].instruction`, `items[33].instruction`, `items[34].instruction`, `items[35].instruction`, `items[36].instruction`, `items[37].instruction`, `items[38].instruction`, `items[39].instruction`, `items[40].instruction`, `items[41].instruction`, `items[42].instruction`, `items[43].instruction`, `items[44].instruction`, `items[45].instruction`, `items[46].instruction`, `items[47].instruction`, `items[48].instruction`, `items[49].instruction`

**2024-04-29-comprendre**

- `items[5].prompt` i-vous-comprenez: prompt "you understand (formal or plural)" joined to the instruction (a transform has no cue field)
- `items[6].prompt` i-ils-comprennent: prompt "they understand (masculine or mixed)" joined to the instruction (a transform has no cue field)
- `items[7].prompt` i-elles-comprennent: prompt "they understand (all feminine)" joined to the instruction (a transform has no cue field)

**2024-05-08-savoir**

- `items[5].prompt` i-vous-savez: prompt "you know (formal or plural)" joined to the instruction (a transform has no cue field)
- `items[6].prompt` i-ils-savent: prompt "they know (masculine or mixed)" joined to the instruction (a transform has no cue field)
- `items[7].prompt` i-elles-savent: prompt "they know (all feminine)" joined to the instruction (a transform has no cue field)

**2024-04-30-connaitre**

- `items[0].prompt` i-je-connais: prompt "I know (people/places)" joined to the instruction (a transform has no cue field)
- `items[5].prompt` i-vous-connaissez: prompt "you know (formal or plural)" joined to the instruction (a transform has no cue field)
- `items[6].prompt` i-ils-connaissent: prompt "they know (masculine or mixed)" joined to the instruction (a transform has no cue field)
- `items[7].prompt` i-elles-connaissent: prompt "they know (all feminine)" joined to the instruction (a transform has no cue field)

**2024-05-06-penser**

- `items[5].prompt` i-vous-pensez: prompt "you think (formal or plural)" joined to the instruction (a transform has no cue field)
- `items[6].prompt` i-ils-pensent: prompt "they think (masculine or mixed)" joined to the instruction (a transform has no cue field)
- `items[7].prompt` i-elles-pensent: prompt "they think (all feminine)" joined to the instruction (a transform has no cue field)

**2024-05-01-croire**

- `items[1].prompt` i-tu-crois: prompt "you believe / you think (informal)" joined to the instruction (a transform has no cue field)
- `items[2].prompt` i-il-croit: prompt "he believes / he thinks" joined to the instruction (a transform has no cue field)
- `items[3].prompt` i-elle-croit: prompt "she believes / she thinks" joined to the instruction (a transform has no cue field)
- `items[4].prompt` i-nous-croyons: prompt "we believe / we think" joined to the instruction (a transform has no cue field)
- `items[5].prompt` i-vous-croyez: prompt "you believe / you think (formal or plural)" joined to the instruction (a transform has no cue field)
- `items[6].prompt` i-ils-croient: prompt "they believe / they think (masculine or mixed)" joined to the instruction (a transform has no cue field)
- `items[7].prompt` i-elles-croient: prompt "they believe / they think (all feminine)" joined to the instruction (a transform has no cue field)

**2024-05-07-reading-7**

- `passage` story text: added: "Une étudiante pense à une grande question."
- `passage` story text: "D'abord, on doit demander des questions." → "D'abord, on doit poser des questions."
- `passage` story text: "Si on ne demande pas de questions, on ne pense pas." → "Si on ne pose pas de questions, on ne pense pas."
- `passage` story text: added: "Socrate pose des questions à ses étudiants."
- `passage` story text: added: "Elle révise."
- `passage` story text: added: "Elle voit les choses entre les idées."
- `passage` story text: added: "L'apprentissage est un voyage."

**2024-05-11-unit-7-practice**

- `items[15].blanks` i-sais-connais: 2 blank hints joined into one hint
- `items[23].blanks` i-on-pense-apprendre: 2 blank hints joined into one hint
- 24 × instruction written as the gloss ("Complete:" and quotes dropped): `items[0].instruction`, `items[1].instruction`, `items[2].instruction`, `items[3].instruction`, `items[4].instruction`, `items[5].instruction`, `items[6].instruction`, `items[7].instruction`, `items[8].instruction`, `items[9].instruction`, `items[10].instruction`, `items[11].instruction`, `items[12].instruction`, `items[13].instruction`, `items[14].instruction`, `items[15].instruction`, `items[16].instruction`, `items[17].instruction`, `items[18].instruction`, `items[19].instruction`, `items[20].instruction`, `items[21].instruction`, `items[22].instruction`, `items[23].instruction`

**2024-05-10-unit-7-exam**

- `items[43].prompt` i-you-know: prompt "quoi (at end)": the instruction says it, and the French "quoi" is shown

**2024-05-23-temporal-words**

- `vocabularyReference[7]` "après" ("after / afterwards") is listed twice; one card, notes joined

**2024-05-20-reading-8**

- `passage` story text: added: "Sept heures."
- `passage` story text: added: "Marie pense à sa journée."
- `passage` story text: added: "Marie prend son café."
- `passage` story text: added: "À la Sorbonne, les étudiants s'aident."
- `passage` story text: added: "Marie mange avec ses amis."
- `passage` story text: added: "Ils se parlent en français."
- `passage` story text: added: "Le soir, Marie rentre chez elle."

**2024-05-25-unit-8-practice**

- `items[0].blanks` i-d-abord-ensuite: 2 blank hints joined into one hint
- `items[20].blanks` i-apres-m-habille-me: 3 blank hints joined into one hint
- 21 × instruction written as the gloss ("Complete:" and quotes dropped): `items[0].instruction`, `items[1].instruction`, `items[2].instruction`, `items[3].instruction`, `items[4].instruction`, `items[5].instruction`, `items[6].instruction`, `items[7].instruction`, `items[8].instruction`, `items[9].instruction`, `items[10].instruction`, `items[11].instruction`, `items[12].instruction`, `items[13].instruction`, `items[14].instruction`, `items[15].instruction`, `items[16].instruction`, `items[17].instruction`, `items[18].instruction`, `items[19].instruction`, `items[20].instruction`

**2024-05-26-causal-words**

- 18 × "Complete:" prefix dropped; the sentence is the text: `items[0].prompt`, `items[1].prompt`, `items[2].prompt`, `items[3].prompt`, `items[4].prompt`, `items[5].prompt`, `items[6].prompt`, `items[7].prompt`, `items[8].prompt`, `items[9].prompt`, `items[10].prompt`, `items[11].prompt`, `items[12].prompt`, `items[13].prompt`, `items[14].prompt`, `items[15].prompt`, `items[16].prompt`, `items[17].prompt`

**2024-06-08-spatial-prepositions**

- 18 × "Complete:" prefix dropped; the sentence is the text: `items[0].prompt`, `items[1].prompt`, `items[2].prompt`, `items[3].prompt`, `items[4].prompt`, `items[5].prompt`, `items[6].prompt`, `items[7].prompt`, `items[8].prompt`, `items[9].prompt`, `items[10].prompt`, `items[11].prompt`, `items[12].prompt`, `items[13].prompt`, `items[14].prompt`, `items[15].prompt`, `items[16].prompt`, `items[17].prompt`

**2024-05-28-more-spatial-relations**

- `vocabularyReference[9].example` "C'est proche" is example_fr
- `vocabularyReference[10].usage` "adjective" added to the note
- `vocabularyReference[10].example` "un pays lointain" is example_fr
- `vocabularyReference[11].usage` "adverb" added to the note
- `vocabularyReference[11].example` "près d'ici" is example_fr
- 18 × "Complete:" prefix dropped; the sentence is the text: `items[0].prompt`, `items[1].prompt`, `items[2].prompt`, `items[3].prompt`, `items[4].prompt`, `items[5].prompt`, `items[6].prompt`, `items[7].prompt`, `items[8].prompt`, `items[9].prompt`, `items[10].prompt`, `items[11].prompt`, `items[12].prompt`, `items[13].prompt`, `items[14].prompt`, `items[15].prompt`, `items[16].prompt`, `items[17].prompt`

**2024-05-30-passe-compose-er**

- `vocabularyReference[6].example` "J'ai travaillé hier" is example_fr
- `vocabularyReference[7].usage` "past action" added to the note
- `vocabularyReference[7].example` "J'ai écouté de la musique" is example_fr
- `vocabularyReference[8].usage` "past action" added to the note
- `vocabularyReference[8].example` "J'ai regardé la télé" is example_fr
- `vocabularyReference[9].usage` "past action" added to the note
- `vocabularyReference[9].example` "J'ai demandé une question" is example_fr
- `vocabularyReference[10].usage` "time marker" added to the note
- `vocabularyReference[10].example` "Hier, j'ai mangé" is example_fr
- `vocabularyReference[11].usage` "adverb (between avoir and past participle)" added to the note
- `vocabularyReference[11].example` "J'ai déjà mangé" is example_fr
- 18 × "Complete:" prefix dropped; the sentence is the text: `items[0].prompt`, `items[1].prompt`, `items[2].prompt`, `items[3].prompt`, `items[4].prompt`, `items[5].prompt`, `items[6].prompt`, `items[7].prompt`, `items[8].prompt`, `items[9].prompt`, `items[10].prompt`, `items[11].prompt`, `items[12].prompt`, `items[13].prompt`, `items[14].prompt`, `items[15].prompt`, `items[16].prompt`, `items[17].prompt`

**2024-06-01-passe-compose-irregular-1**

- `vocabularyReference[8].example` "J'ai eu de la chance" is example_fr
- `vocabularyReference[9].usage` "plural noun" added to the note
- `vocabularyReference[9].example` "faire ses devoirs" is example_fr
- 18 × "Complete:" prefix dropped; the sentence is the text: `items[0].prompt`, `items[1].prompt`, `items[2].prompt`, `items[3].prompt`, `items[4].prompt`, `items[5].prompt`, `items[6].prompt`, `items[7].prompt`, `items[8].prompt`, `items[9].prompt`, `items[10].prompt`, `items[11].prompt`, `items[12].prompt`, `items[13].prompt`, `items[14].prompt`, `items[15].prompt`, `items[16].prompt`, `items[17].prompt`

**2024-06-02-passe-compose-irregular-2**

- 18 × "Complete:" prefix dropped; the sentence is the text: `items[0].prompt`, `items[1].prompt`, `items[2].prompt`, `items[3].prompt`, `items[4].prompt`, `items[5].prompt`, `items[6].prompt`, `items[7].prompt`, `items[8].prompt`, `items[9].prompt`, `items[10].prompt`, `items[11].prompt`, `items[12].prompt`, `items[13].prompt`, `items[14].prompt`, `items[15].prompt`, `items[16].prompt`, `items[17].prompt`

**2024-05-31-passe-compose-etre**

- 16 × "Complete:" prefix dropped; the sentence is the text: `items[0].prompt`, `items[1].prompt`, `items[2].prompt`, `items[3].prompt`, `items[5].prompt`, `items[6].prompt`, `items[7].prompt`, `items[8].prompt`, `items[9].prompt`, `items[10].prompt`, `items[11].prompt`, `items[12].prompt`, `items[13].prompt`, `items[14].prompt`, `items[16].prompt`, `items[17].prompt`

**2024-05-29-passe-compose-agreement**

- `vocabularyReference[4].agreement` "masculine or mixed plural (+s)" added to the note
- `vocabularyReference[4].example` "Pierre et moi, nous sommes allés" is example_fr
- `vocabularyReference[6].agreement` "masculine singular (no change)" added to the note
- `vocabularyReference[6].example` "Monsieur, vous êtes allé où?" is example_fr
- `vocabularyReference[7].agreement` "feminine singular (+e)" added to the note
- `vocabularyReference[7].example` "Madame, vous êtes allée où?" is example_fr
- `vocabularyReference[8].agreement` "masculine plural (+s)" added to the note
- `vocabularyReference[8].example` "Les garçons, vous êtes allés où?" is example_fr
- `vocabularyReference[9].agreement` "feminine plural (+es)" added to the note
- `vocabularyReference[9].example` "Les filles, vous êtes allées où?" is example_fr
- 18 × "Complete:" prefix dropped; the sentence is the text: `items[0].prompt`, `items[1].prompt`, `items[2].prompt`, `items[3].prompt`, `items[4].prompt`, `items[5].prompt`, `items[6].prompt`, `items[7].prompt`, `items[8].prompt`, `items[9].prompt`, `items[10].prompt`, `items[11].prompt`, `items[12].prompt`, `items[13].prompt`, `items[14].prompt`, `items[15].prompt`, `items[16].prompt`, `items[17].prompt`

**2024-05-27-imparfait-all-verbs**

- `vocabularyReference[8].example` "chaque jour, chaque samedi" is example_fr
- 18 × "Complete:" prefix dropped; the sentence is the text: `items[0].prompt`, `items[1].prompt`, `items[2].prompt`, `items[3].prompt`, `items[4].prompt`, `items[5].prompt`, `items[6].prompt`, `items[7].prompt`, `items[8].prompt`, `items[9].prompt`, `items[10].prompt`, `items[11].prompt`, `items[12].prompt`, `items[13].prompt`, `items[14].prompt`, `items[15].prompt`, `items[16].prompt`, `items[17].prompt`

**2024-06-04-pc-vs-imparfait**

- 17 × "Complete:" prefix dropped; the sentence is the text: `items[0].prompt`, `items[1].prompt`, `items[2].prompt`, `items[3].prompt`, `items[4].prompt`, `items[5].prompt`, `items[6].prompt`, `items[7].prompt`, `items[8].prompt`, `items[9].prompt`, `items[10].prompt`, `items[11].prompt`, `items[12].prompt`, `items[13].prompt`, `items[14].prompt`, `items[15].prompt`, `items[16].prompt`

**2024-06-03-past-tense-composition**

- 1 × "Complete the story:" prefix dropped; the sentence is the text: `items[0].prompt`
- 14 × "Complete:" prefix dropped; the sentence is the text: `items[1].prompt`, `items[2].prompt`, `items[3].prompt`, `items[4].prompt`, `items[5].prompt`, `items[6].prompt`, `items[7].prompt`, `items[8].prompt`, `items[9].prompt`, `items[10].prompt`, `items[11].prompt`, `items[12].prompt`, `items[13].prompt`, `items[14].prompt`

**2024-06-05-reading-9**

- `passage` story text: added: "Un samedi matin au Jardin du Luxembourg."
- `passage` story text: added: "Pierre est assis sur un banc, sous un grand arbre."
- `passage` story text: added: "Au Café de Flore, Marie vient à notre table."
- `passage` story text: added: "Le soir, au Procope, le plus vieux restaurant de Paris."
- `passage` story text: added: "Vers 10h, je rentre chez moi, fatigué mais heureux."
- `passage` story text: added: "Fin"
- `vocabularyReference[177]` "j'ai eu" ("I had") is listed twice; one card, notes joined

**2024-06-10-unit-9-practice**

- `items[18].blanks` i-comme-sommes-restes: 2 blank hints joined into one hint
- `items[19].blanks` i-sur-ai-vu: 2 blank hints joined into one hint
- 16 × instruction written as the gloss ("Complete:" and quotes dropped): `items[0].instruction`, `items[1].instruction`, `items[2].instruction`, `items[3].instruction`, `items[4].instruction`, `items[5].instruction`, `items[7].instruction`, `items[8].instruction`, `items[9].instruction`, `items[10].instruction`, `items[11].instruction`, `items[12].instruction`, `items[13].instruction`, `items[14].instruction`, `items[18].instruction`, `items[19].instruction`

**2024-02-01-reading-10**

- `passage` story text: added: "Sophie regarde Notre-Dame et pense à ses rêves."
- `passage` story text: added: "Le rêve de Sophie : une petite maison à Montmartre."
- `passage` story text: added: "Le rêve de Marc : ses peintures au Louvre."
- `passage` story text: added: "Sophie et Marc marchent vers la Seine."
- `passage` story text: added: "Un nouveau jour pour Sophie."
- `passage` story text: added: "Fin"
- `vocabularyReference[77]` "réussissions" ("succeed (subjunctive, nous)") is listed twice; one card, notes joined

**2024-02-05-unit-10-practice**

- 19 × instruction written as the gloss ("Complete:" and quotes dropped): `items[0].instruction`, `items[1].instruction`, `items[2].instruction`, `items[3].instruction`, `items[4].instruction`, `items[5].instruction`, `items[6].instruction`, `items[7].instruction`, `items[8].instruction`, `items[9].instruction`, `items[10].instruction`, `items[11].instruction`, `items[12].instruction`, `items[13].instruction`, `items[14].instruction`, `items[15].instruction`, `items[16].instruction`, `items[17].instruction`, `items[18].instruction`

**2024-02-12-reading-11**

- `passage` story text: added: "La Tour Eiffel, l'Arc de Triomphe, le Louvre et Notre-Dame."
- `passage` story text: added: "À six ans, les enfants arrivent à l'école primaire."
- `passage` story text: added: "Un train rapide traverse la campagne vers le sud."
- `passage` story text: added: "L'été à Nice, au bord de la Méditerranée."
- `passage` story text: added: "À vélo et en tram, la France pense à l'avenir."
- `passage` story text: added: "Fin"

**2024-02-16-unit-11-practice**

- `items[16].blanks` i-ou-un: 2 blank hints joined into one hint
- `items[17].blanks` i-attends-arrivent: 2 blank hints joined into one hint
- `items[18].blanks` i-evolue-vivent: 2 blank hints joined into one hint
- `items[19].blanks` i-j-ai-vis-travaille: 3 blank hints joined into one hint
- 19 × instruction written as the gloss ("Complete:" and quotes dropped): `items[0].instruction`, `items[1].instruction`, `items[2].instruction`, `items[3].instruction`, `items[4].instruction`, `items[5].instruction`, `items[6].instruction`, `items[7].instruction`, `items[8].instruction`, `items[9].instruction`, `items[10].instruction`, `items[11].instruction`, `items[12].instruction`, `items[13].instruction`, `items[14].instruction`, `items[15].instruction`, `items[16].instruction`, `items[17].instruction`, `items[18].instruction`

**2024-04-08-spelling-patterns**

- `isPhonicsReference` the page's spelling patterns (src/data/frenchPhonics.js, 30 sounds) are written out as its sections

**2024-12-18-pronunciation-test**

- `screen` a word list to say aloud (exerciseConfig type "none"): screen pronunciation-test

## Notes

Things the conversion keeps or drops on a ruling, listed so nothing changes unseen (ledger ruling 2026-11-25 Task 8).

**2024-03-30-reading-4**

- `readingPassage.text` speaker_colour_dropped: "Paul[9]" is the speaker "Paul"; L has no colour mark
- `readingPassage.text` speaker_colour_dropped: "Marie[8]" is the speaker "Marie"; L has no colour mark
- `readingPassage.text` speaker_colour_dropped: "La femme[3]" is the speaker "La femme"; L has no colour mark

## Outline

Changes the outline step made when it wrote course.json from today’s unit configs.

- `course.json` unit1: name "Essential Grammar" from title "Unit 1: Essential Grammar" (position prefix dropped)
- `course.json` unit2: name "Asking & Describing" from title "Unit 2: Asking & Describing" (position prefix dropped)
- `course.json` unit3: name "Movement & Possession" from title "Unit 3: Movement & Possession" (position prefix dropped)
- `course.json` unit4: name "Everyday Words" from title "Unit 4: Everyday Words" (position prefix dropped)
- `course.json` unit5: name "Time & Taste" from title "Unit 5: Time & Taste" (position prefix dropped)
- `course.json` unit6: name "Basic Fluency" from title "Unit 6: Basic Fluency" (position prefix dropped)
- `course.json` unit7: name "Knowledge & Learning" from title "Unit 7: Knowledge & Learning" (position prefix dropped)
- `course.json` unit8: name "Daily Life & Actions" from title "Unit 8: Daily Life & Actions" (position prefix dropped)
- `course.json` unit9: name "Discourse & Past Tense" from title "Unit 9: Discourse & Past Tense" (position prefix dropped)
- `course.json` unit10: name "Mastery & Nuance" from title "Unit 10: Mastery & Nuance" (position prefix dropped)
- `course.json` unit11: name "Daily Essentials" from title "Unit 11: Daily Essentials" (position prefix dropped)
- `course.json` unit12: name "Curiosity & Questions" from title "Unit 12: Curiosity & Questions" (position prefix dropped)
- `course.json` shelf: guide 2024-10-21-cognates-help taken off the shelf list (taught in unit1; guides are linked on the shelf automatically)
- `course.json` shelf: guide 2024-10-20-liaison-help taken off the shelf list (taught in unit1; guides are linked on the shelf automatically)
- `course.json` shelf: guide 2024-01-28-verb-pattern-help taken off the shelf list (taught in unit3; guides are linked on the shelf automatically)
- `course.json` shelf: the Reference unit's title "Reference", description, icon 📚 and color #6366f1 have no place in the outline and were dropped
