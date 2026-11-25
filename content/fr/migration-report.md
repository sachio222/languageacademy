# Converting today’s modules to module files

`pnpm content:migrate` wrote 171 module files (124 lessons, 11 practice sets, 11 unit exams, 5 guides, 11 readings and 9 Reference pages) under `content/fr/modules/` from today’s modules in `src/lessons/modules/`, with 2557 items. Guides and readings also read prototype L’s guides and illustrated stories (`content/fr/legacy/l-sources.json`). 538 word ids are first minted in a reading’s vocabulary table, since a reading teaches its own table. The sections below list every guess the conversion made and every place where the written files differ from today’s source.

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
| unit7 Knowledge & Learning | 74 | 31 |
| unit8 Daily Life & Actions | 51 | 55 |
| unit9 Discourse & Past Tense | 18 | 17 |
| unit10 Mastery & Nuance | 29 | 102 |
| unit11 Daily Essentials | 69 | 70 |
| unit12 Curiosity & Questions | 105 | 65 |

| Section | Lines |
|---|---|
| Guide checks written by hand | 1 |
| Spellings taught more than once | 375 |
| Item types to confirm | 260 |
| Practice blanks that were in the wrong place | 58 |
| Position words | 119 |
| Exercises rewritten as Jake ruled | 2 |
| English prompts written as respond items | 825 |
| Passage words with no pop-up | 10 |
| Estimates to confirm | 1 |
| Hand edits kept | 135 |
| Live ids with no converted item | 315 (0 real misses) |
| Fields with no place in a module file | 1956 |
| Text written differently | 673 |
| Notes | 10 |
| Course map split | 40 |
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
- `vocabulary[11]` "pardon": same meaning as "excuse me / sorry" in 2024-01-01-famous-words: kept pardon-fr

**2024-03-27-negation-2**

- `vocabulary[3]` "je ne veux pas": same meaning as "I don't want" in 2024-03-28-negation: kept je-ne-veux-pas-fr

**2024-03-26-location-adverbs**

- `vocabulary[1]` "là": la-fr already names "la", a different spelling: la-fr.there

**2024-03-24-everyday-nouns**

- `vocabulary[22]` "l'addition": same meaning as "the bill/check" in 2024-03-31-survival-phrases: kept l-addition-fr

**2024-03-30-reading-4**

- `vocabulary[2]` "comment ça va": new meaning "how are you": comment-ca-va-fr.how-are-you; met before as "how's it going?" (comment-ca-va-fr, 2024-01-18-questions)
- `vocabulary[4]` "je ne peux pas": same meaning as "I can't" in 2024-03-27-negation-2: kept je-ne-peux-pas-fr
- `vocabulary[5]` "maintenant": same meaning as "now" in 2024-04-01-time-adverbs: kept maintenant-fr
- `vocabulary[6]` "je dois": same meaning as "I must" in 2024-03-23-devoir: kept je-dois-fr
- `vocabulary[7]` "le travail": same meaning as "work" in 2024-03-24-everyday-nouns: kept le-travail-fr
- `vocabulary[8]` "aujourd'hui": same meaning as "today" in 2024-04-01-time-adverbs: kept aujourd-hui-fr
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
- `vocabulary[44]` "la ville": same meaning as "city" in 2024-03-24-everyday-nouns: kept la-ville-fr
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

**2024-04-13-reading-5**

- `vocabulary[5]` "café": new meaning "café": cafe-fr.caf; met before as "coffee" (cafe-fr, 2024-01-01-famous-words)
- `vocabulary[9]` "nous avons mangé": same meaning as "we ate" in 2024-04-12-manger: kept nous-avons-mange-fr
- `vocabulary[10]` "hier": same meaning as "yesterday" in 2024-04-01-time-adverbs: kept hier-fr
- `vocabulary[11]` "aujourd'hui": same meaning as "today" in 2024-04-01-time-adverbs: kept aujourd-hui-fr
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
- `vocabulary[29]` "la ville": same meaning as "city" in 2024-03-24-everyday-nouns: kept la-ville-fr (fixed by hand)
- `vocabulary[34]` "dans": same meaning as "in / inside" in 2024-01-20-prepositions: kept dans-fr
- `vocabulary[41]` "oui": same meaning as "yes" in 2024-01-01-famous-words: kept oui-fr
- `vocabulary[45]` "trois": same meaning as "three" in 2026-11-24-numbers: kept trois-fr
- `vocabulary[46]` "est-ce que": new meaning "question marker": est-ce-que-fr.question-marker; met before as "question maker" (est-ce-que-fr, 2024-01-18-questions)
- `vocabulary[47]` "quelque chose": same meaning as "something" in 2024-03-24-everyday-nouns: kept quelque-chose-fr
- `vocabulary[51]` "toujours": same meaning as "always" in 2024-04-01-time-adverbs: kept toujours-fr (fixed by hand)
- `vocabulary[53]` "voir": same meaning as "to see" in 2024-01-17-voir: kept voir-fr (fixed by hand)
- `vocabulary[57]` "faire": same meaning as "to do / to make" in 2024-03-25-faire: kept faire-fr (fixed by hand)
- `vocabulary[64]` "déjà": same meaning as "already" in 2024-04-01-time-adverbs: kept deja-fr
- `vocabulary[65]` "tu parles": same meaning as "you speak (informal)" in 2024-03-29-parler: kept tu-parles-fr (fixed by hand)
- `vocabulary[67]` "merci": same meaning as "thank you" in 2024-01-01-famous-words: kept merci-fr (fixed by hand)
- `vocabulary[69]` "maintenant": same meaning as "now" in 2024-04-01-time-adverbs: kept maintenant-fr (fixed by hand)
- `vocabulary[70]` "avoir": same meaning as "to have" in 2024-01-04-avoir: kept avoir-fr (fixed by hand)
- `vocabulary[74]` "pour": same meaning as "for" in 2024-01-20-prepositions: kept pour-fr (fixed by hand)

**2024-05-05-on-and-people**

- `vocabulary[0]` "on": same meaning as "we (informal) / one / people" in 2024-01-01-pronouns: kept on-fr
- `vocabulary[13]` "tout le monde": same meaning as "everybody/everyone" in 2024-03-24-everyday-nouns: kept tout-le-monde-fr
- `vocabulary[17]` "personne": same meaning as "nobody/no one" in 2024-03-24-everyday-nouns: kept personne-fr

**2024-05-04-learning-verbs**

- `vocabulary[0]` "apprendre": same meaning as "to learn" in 2024-04-22-prendre: kept apprendre-fr
- `vocabulary[1]` "j'apprends": same meaning as "I learn" in 2024-04-22-prendre: kept j-apprends-fr
- `vocabulary[14]` "j'apprends le français": same meaning as "I learn French / I'm learning French" in 2024-04-22-prendre: kept j-apprends-le-francais-fr

**2024-04-29-comprendre**

- `vocabulary[0]` "comprendre": same meaning as "to understand" in 2024-04-22-prendre: kept comprendre-fr
- `vocabulary[1]` "je comprends": same meaning as "I understand" in 2024-04-22-prendre: kept je-comprends-fr
- `vocabulary[2]` "tu comprends": new meaning "you understand (informal)": tu-comprends-fr.you-understand; met before as "do you understand?" (tu-comprends-fr, 2024-04-22-prendre) (written: tu-comprends-fr) (fixed by hand)
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
- `vocabulary[40]` "alors": same meaning as "so / then" in 2024-05-02-discourse-markers: kept alors-fr
- `vocabulary[41]` "quoi": same meaning as "like / you know (filler at end)" in 2024-05-02-discourse-markers: kept quoi-fr
- `vocabulary[42]` "tout le monde": same meaning as "everybody/everyone" in 2024-03-24-everyday-nouns: kept tout-le-monde-fr
- `vocabulary[43]` "même": same meaning as "same / even" in 2024-04-08-comparisons: kept meme-fr
- `vocabulary[44]` "mal": same meaning as "badly / bad" in 2024-04-08-comparisons: kept mal-fr
- `vocabulary[49]` "comment": same meaning as "how" in 2024-01-18-questions: kept comment-fr
- `vocabulary[55]` "demander": same meaning as "to ask / to ask for" in 2024-04-19-demander: kept demander-fr (fixed by hand)
- `vocabulary[62]` "meilleures": same meaning as "better (plural)" in 2024-04-13-reading-5: kept meilleures-fr
- `vocabulary[64]` "maintenant": same meaning as "now" in 2024-04-01-time-adverbs: kept maintenant-fr
- `vocabulary[65]` "beaucoup": same meaning as "a lot/much" in 2024-04-24-reading-6: kept beaucoup-fr
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
- `vocabulary[10]` "Fais!": same meaning as "do/make (you)" in 2024-04-24-reading-6: kept fais-fr
- `vocabulary[11]` "Faites!": same meaning as "do/make" in 2024-05-07-reading-7: kept faites-fr

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

- `vocabulary[11]` "ici": same meaning as "here" in 2024-03-26-location-adverbs: kept ici-fr

**2024-05-30-passe-compose-er**

- `vocabulary[1]` "j'ai mangé": same meaning as "I ate / I have eaten" in 2024-04-12-manger: kept j-ai-mange-fr
- `vocabulary[10]` "hier": same meaning as "yesterday" in 2024-04-01-time-adverbs: kept hier-fr
- `vocabulary[11]` "déjà": same meaning as "already" in 2024-04-01-time-adverbs: kept deja-fr

**2024-05-27-imparfait-all-verbs**

- `vocabulary[6]` "nous étions": same meaning as "we were" in 2024-04-10-etre-past: kept nous-etions-fr

**2024-06-04-pc-vs-imparfait**

- `vocabulary[0]` "quand": same meaning as "when" in 2024-01-18-questions: kept quand-fr
- `vocabulary[3]` "tous les jours": same meaning as "every day" in 2024-05-27-imparfait-all-verbs: kept tous-les-jours-fr
- `vocabulary[5]` "toujours": same meaning as "always" in 2024-04-01-time-adverbs: kept toujours-fr
- `vocabulary[6]` "hier": same meaning as "yesterday" in 2024-04-01-time-adverbs: kept hier-fr

**2024-06-03-past-tense-composition**

- `vocabulary[0]` "donc": same meaning as "so / therefore" in 2024-05-02-discourse-markers: kept donc-fr
- `vocabulary[1]` "alors": same meaning as "so / then" in 2024-05-02-discourse-markers: kept alors-fr
- `vocabulary[2]` "c'était": same meaning as "it was" in 2024-04-13-reading-5: kept c-etait-fr
- `vocabulary[3]` "il y avait": same meaning as "there was / there were" in 2024-05-27-imparfait-all-verbs: kept il-y-avait-fr

**2024-06-05-reading-9**

- `vocabulary[1]` "Jardin du Luxembourg": same meaning as "Luxembourg Garden (famous Paris park)" in 2024-03-30-reading-4: kept jardin-du-luxembourg-fr
- `vocabulary[4]` "la Sorbonne": same meaning as "the Sorbonne" in 2024-05-20-reading-8: kept la-sorbonne-fr
- `vocabulary[9]` "hier": same meaning as "yesterday" in 2024-04-01-time-adverbs: kept hier-fr
- `vocabulary[10]` "c'était": same meaning as "it was" in 2024-04-13-reading-5: kept c-etait-fr
- `vocabulary[12]` "il faisait": same meaning as "it was (weather) / he was doing" in 2024-05-27-imparfait-all-verbs: kept il-faisait-fr
- `vocabulary[14]` "parce que": same meaning as "because" in 2024-05-26-causal-words: kept parce-que-fr
- `vocabulary[16]` "le travail": same meaning as "work" in 2024-03-24-everyday-nouns: kept le-travail-fr
- `vocabulary[17]` "d'abord": same meaning as "first" in 2024-05-07-reading-7: kept d-abord-fr
- `vocabulary[18]` "je me suis réveillé": same meaning as "I woke up (masc)" in 2024-06-07-reflexive-past: kept je-me-suis-reveille-fr
- `vocabulary[19]` "d'habitude": same meaning as "usually, normally" in 2024-06-04-pc-vs-imparfait: kept d-habitude-fr
- `vocabulary[23]` "j'ai voulu": same meaning as "I wanted" in 2024-06-02-passe-compose-irregular-2: kept j-ai-voulu-fr
- `vocabulary[25]` "le temps": same meaning as "time/weather" in 2024-03-24-everyday-nouns: kept le-temps-fr
- `vocabulary[30]` "près de": same meaning as "near, close to" in 2024-05-28-more-spatial-relations: kept pres-de-fr
- `vocabulary[32]` "il y avait": same meaning as "there was / there were" in 2024-05-27-imparfait-all-verbs: kept il-y-avait-fr
- `vocabulary[37]` "quand": same meaning as "when" in 2024-01-18-questions: kept quand-fr
- `vocabulary[39]` "j'ai vu": same meaning as "I saw" in 2024-06-01-passe-compose-irregular-1: kept j-ai-vu-fr
- `vocabulary[41]` "Pierre": same meaning as "Pierre (friend's name)" in 2024-06-05-reading-9: kept pierre-fr (written: pierre-fr.pierre)
- `vocabulary[50]` "salut": same meaning as "hi / bye" in 2024-01-01-famous-words: kept salut-fr
- `vocabulary[52]` "ici": same meaning as "here" in 2024-03-26-location-adverbs: kept ici-fr
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
- `vocabulary[118]` "nous sommes allés": same meaning as "we went" in 2024-05-29-passe-compose-agreement: kept nous-sommes-alles-fr
- `vocabulary[137]` "derrière": same meaning as "behind" in 2024-01-20-prepositions: kept derriere-fr
- `vocabulary[138]` "nous avons mangé": same meaning as "we ate" in 2024-04-12-manger: kept nous-avons-mange-fr
- `vocabulary[146]` "la vie": same meaning as "life" in 2024-03-24-everyday-nouns: kept la-vie-fr
- `vocabulary[149]` "à cause de": same meaning as "because of" in 2024-05-26-causal-words: kept a-cause-de-fr
- `vocabulary[160]` "finalement": same meaning as "finally" in 2024-05-07-reading-7: kept finalement-fr
- `vocabulary[162]` "chez moi": same meaning as "to my place / home" in 2024-05-20-reading-8: kept chez-moi-fr
- `vocabulary[170]` "parfois": same meaning as "sometimes" in 2024-04-01-time-adverbs: kept parfois-fr

**2024-01-25-emotion-phrases**

- `vocabulary[0]` "je suis content que tu sois là": new meaning "I'm happy you're here": je-suis-content-que-tu-sois-la-fr.i-m-happy; met before as "I'm glad you're here" (je-suis-content-que-tu-sois-la-fr, 2024-06-05-reading-9) (written: je-suis-content-que-tu-sois-la-fr) (fixed by hand)

**2024-01-22-common-adverbs**

- `vocabulary[0]` "vraiment": same meaning as "really / truly" in 2024-05-07-reading-7: kept vraiment-fr
- `vocabulary[6]` "probablement": same meaning as "probably" in 2024-05-02-discourse-markers: kept probablement-fr

**2024-02-01-reading-10**

- `vocabulary[0]` "Paris": same meaning as "Paris (capital of France)" in 2024-06-05-reading-9: kept paris-fr
- `vocabulary[7]` "la Tour Eiffel": same meaning as "Eiffel Tower" in 2024-04-24-reading-6: kept la-tour-eiffel-fr
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
- `vocabulary[21]` "j'ai trouvé!": same meaning as "I found" in 2024-05-30-passe-compose-er: kept j-ai-trouve-fr

**2024-02-11-perception-verbs**

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
- `vocabulary[23]` "aujourd'hui": same meaning as "today" in 2024-04-01-time-adverbs: kept aujourd-hui-fr
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
- `vocabulary[22]` "beaucoup": same meaning as "a lot/much" in 2024-04-24-reading-6: kept beaucoup-fr
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
- `items[3]` i-courir-rapidement: classifier: translate (English prompt with a French answer); written as respond (framed)
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
- `items[7]` i-hier: the blank for "hier" at position 13 sits after the end of the sentence; placed as the checker reads it: "Tu as vu ça ___."
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

- `items[15]` i-lisais-es-arrive: the blank for "es arrivé" at position 17 sits after the end of the sentence; placed as the checker reads it: "Je ___ quand tu ___."
- `items[16]` i-courait-a-marche: the blank for "a marché" at position 35 sits after the end of the sentence; placed as the checker reads it: "Il ___ tous les jours, mais hier il ___."
- `items[17]` i-cuisinais-ai-entendu: the blank for "cuisinais" at position 15 sits on the mark ",", which the app drops; placed as the checker reads it: "Pendant que je ___, j'___ un bruit."
- `items[17]` i-cuisinais-ai-entendu: the blank for "ai entendu" at position 27 sits inside the word "bruit"; placed as the checker reads it: "Pendant que je ___, j'___ un bruit."
- `items[18]` i-comme-sommes-restes: the blank for "sommes restés" at position 25 sits inside the word "maison"; placed as the checker reads it: "___ il pleuvait, nous ___ à la maison."
- `items[20]` i-s-est-cachee-pour: the blank for "pour que" at position 33 sits inside the word "ne"; placed as the checker reads it: "Elle ___ derrière l'arbre ___ personne ne la voie."

**2024-02-05-unit-10-practice**

- `items[5]` i-parte: the blank for "parte" at position 16 sits on the mark ".", which the app drops; placed as the checker reads it: "J'ai peur qu'il ___."
- `items[7]` i-voyagerais: the blank for "voyagerais" at position 33 sits inside the word "plus"; placed as the checker reads it: "Si j'avais plus de temps, je ___ plus."
- `items[10]` i-vient: the blank for "vient" at position 15 sits on the mark ".", which the app drops; placed as the checker reads it: "Je pense qu'il ___."
- `items[11]` i-vienne: the blank for "vienne" at position 22 sits on the mark ".", which the app drops; placed as the checker reads it: "Je ne pense pas qu'il ___."
- `items[17]` i-couper: the blank for "couper" at position 12 sits inside the word "les"; placed as the checker reads it: "Je me fais ___ les cheveux demain."
- `items[19]` i-voudrais-suives: the blank for "voudrais" at position 16 sits inside the word "je"; placed as the checker reads it: "Si j'étais toi, je ___ que tu ___ tes rêves."
- `items[19]` i-voudrais-suives: the blank for "suives" at position 32 sits inside the word "rêves"; placed as the checker reads it: "Si j'étais toi, je ___ que tu ___ tes rêves."

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
- `items[36].hint` "Marc's wisdom from Reading 10: 'If we don't do anything, we'll never _____'" (fixed by hand)
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

- 2 × framed by its instruction: `items[5]`, `items[19]`

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

- 7 × framed by its instruction: `items[1]`, `items[5]`, `items[8]`, `items[10]`, `items[11]`, `items[14]`, `items[15]`

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

- 4 × framed by its instruction: `items[0]`, `items[4]`, `items[6]`, `items[7]`
- 1 × framed by a context note: `items[1]`

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

- 7 × framed by its instruction: `items[0]`, `items[1]`, `items[2]`, `items[3]`, `items[4]`, `items[5]`, `items[6]`

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
- 1 × framed by its instruction: `items[9]`

**2024-05-15-daily-actions-1**

- 2 × framed by a context note: `items[1]`, `items[5]`
- 1 × framed by its instruction: `items[10]`

**2024-02-13-search-and-find**

- 1 × framed by a context note: `items[1]`
- 3 × framed by its instruction: `items[8]`, `items[9]`, `items[12]`

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

**2024-05-07-reading-7**

- 1 word: étudiante

**2024-02-12-reading-11**

- 4 words: traverse, bord, vélo, tram

## Estimates to confirm

The source sets no value, so the conversion wrote an estimate.

**2026-11-24-negation-guide**

- `minutes` 3 minutes for three parts (L sets Cognates 4, Liaison 4, Questions 5, Verb Patterns 6)

## Hand edits kept

The module file differs from a fresh conversion of an unchanged source here. A rerun keeps the file.

**2024-01-06-basic-nouns**

- `concepts[1].definition` "Combine nouns with verbs you already know from M2-M3" → "Combine nouns with être and avoir, the verbs you already know"
- `items[0].hint` "Combine avoir (M3) + article (M4) + noun - all previous modules!" → "Combine avoir + article + noun - all from earlier lessons!"

**2024-01-07-plurals**

- `concepts[2].definition` "Every exercise combines plurals with verbs from M2-M3" → "Every exercise combines plurals with être and avoir"

**2024-01-10-unit1-practice**

- `title` "Unit 1 Practice - Fill in the Blanks" → "Essential Grammar Practice - Fill in the Blanks"
- `description` "Complete sentences using everything you've learned in Unit 1. Fill in the blanks to create correct French sentences!" → "Complete sentences using everything you've learned in this unit. Fill in the blanks to create correct French sentences!"
- `can_do[2]` "Apply everything from Unit 1 in context" → "Apply everything from this unit in context"

**2026-11-24-negation-guide**

- `checks` "[]" → "["id":"k1","ask":"Which one means “I don't have a cat”?","options":["text":"Je n'ai pas de chat.","fr":true,"right":true,"text":"Je n'ai pas un chat.","fr":true,"text":"Je ne ai pas de chat.","fr":true],"why":"After pas, un becomes de, and ne becomes n' before a vowel: Je n'ai pas de chat.","id":"k2","ask":"Which one means “You aren't a child”?","options":["text":"Tu ne pas es un enfant.","fr":true,"text":"Tu n'es pas un enfant.","fr":true,"right":true,"text":"Tu n'es pas d'enfant.","fr":true],"why":"ne goes before the verb and pas after it. After être, un stays as it is: Tu n'es pas un enfant.","id":"k3","ask":"Which one means “I don't have a car anymore”?","options":["text":"Je n'ai jamais de voiture.","fr":true,"text":"Je n'ai pas de voiture.","fr":true,"text":"Je n'ai plus de voiture.","fr":true,"right":true],"why":"plus takes the place of pas and means anymore."]"

**2024-01-13-ca-survival**

- `items[1].hint` "Combine: it is + that (using être from M3)" → "Combine: it is + that (using être)"

**2024-01-18-questions**

- `vocabulary[11].word_id` "ca-va-fr.question-2" → "ca-va-fr.question"

**2024-01-22-reading2**

- `title` "Reading Comprehension 2 - Rendez-vous en Normandie" → "Reading Comprehension - Rendez-vous en Normandie"
- `description` "An exciting trip through beautiful Normandy! Explore famous places using vocabulary from Units 1 & 2." → "An exciting trip through beautiful Normandy! Explore famous places with the words you know so far."

**2024-01-23-unit2-practice**

- `title` "Unit 2 Practice - Fill in the Blanks" → "Asking & Describing Practice - Fill in the Blanks"
- `description` "Complete sentences using demonstratives, questions, prepositions, and adjectives from Unit 2!" → "Complete sentences using demonstratives, questions, prepositions, and adjectives from this unit!"
- `can_do[2]` "Apply Unit 2 vocabulary in realistic contexts" → "Apply this unit's vocabulary in realistic contexts"

**2024-01-24-unit2-exam**

- `description` "Test everything from Unit 2! Demonstratives, essential verbs (vouloir/pouvoir/voir), questions, stressed pronouns, prepositions, and descriptive sentences." → "Test everything from this unit! Demonstratives, essential verbs (vouloir/pouvoir/voir), questions, stressed pronouns, prepositions, and descriptive sentences."
- `items[32].mistakes` "["answer":"elles sont à Ladurée","feedback":"That's acceptable but 'chez' is more natural for shops/businesses - use 'chez Ladurée'"]" → "(removed)"

**2024-01-27-aller**

- `items[19].accept` "["qu'est-ce que tu as?"]" → "(removed)"

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

**2024-02-05-unit3-exam**

- `description` "Test everything from Unit 3! Motion verbs, object pronouns, possessives, and complex sentence combinations." → "Test everything from this unit! Motion verbs, object pronouns, possessives, and complex sentence combinations."

**2024-03-30-reading-4**

- `title` "Reading Comprehension 4 - La nouvelle époque de Marie" → "Reading Comprehension - La nouvelle époque de Marie"
- `description` "Unit 4 mastery! A natural conversation using all your vocabulary." → "A natural conversation using all your vocabulary."

**2024-04-03-unit-4-practice**

- `title` "Unit 4 Practice - Fill in the Blanks" → "Everyday Words Practice - Fill in the Blanks"
- `description` "Practice survival phrases, negation, time/location adverbs, and essential verbs from Unit 4!" → "Practice survival phrases, negation, time/location adverbs, and essential verbs from this unit!"

**2024-04-02-unit-4-exam**

- `description` "Test everything from Unit 4! Survival phrases, essential verbs, negation, and expressing time and place." → "Test everything from this unit! Survival phrases, essential verbs, negation, and expressing time and place."

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

**2024-04-29-comprendre**

- `vocabulary[2].word_id` "tu-comprends-fr.you-understand" → "tu-comprends-fr"

**2024-05-07-reading-7**

- `title` "Reading 7 - L'Art d'Apprendre" → "Reading - L'Art d'Apprendre"
- `description` "A philosophical article about learning and education. Uses all cognitive verbs from Unit 7!" → "A philosophical article about learning and education. Uses all cognitive verbs from this unit!"
- `vocabulary[0].note` ""Unit 7 verb"" → "(removed)"
- `vocabulary[2].note` ""Unit 7 verb"" → "(removed)"
- `vocabulary[5].note` ""Unit 7 verb"" → "(removed)"
- `vocabulary[9].note` ""Unit 7 verb"" → "(removed)"
- `vocabulary[12].note` ""Unit 7 verb"" → "(removed)"
- `vocabulary[14].note` ""Unit 7 verb"" → "(removed)"
- `vocabulary[18].note` ""Unit 7 verb"" → "(removed)"
- `vocabulary[20].note` ""Unit 7 verb"" → "(removed)"
- `vocabulary[23].note` ""Unit 6 verb"" → "(removed)"
- `vocabulary[25].note` ""Unit 6 verb"" → "(removed)"
- `vocabulary[55].note` ""Unit 6 verb"" → "(removed)"

**2024-05-11-unit-7-practice**

- `title` "Unit 7 Practice - Fill in the Blanks" → "Knowledge & Learning Practice - Fill in the Blanks"
- `description` "Complete sentences using cognitive verbs, on, discourse markers, and essential vocabulary from Unit 7!" → "Complete sentences using cognitive verbs, on, discourse markers, and essential vocabulary from this unit!"

**2024-05-10-unit-7-exam**

- `description` "Test everything from Unit 7! Cognitive verbs (understand, know, think, believe), on pronoun, discourse markers, and modifiers." → "Test everything from this unit! Cognitive verbs (understand, know, think, believe), on pronoun, discourse markers, and modifiers."

**2024-05-22-s-appeler**

- `concepts[1].term` "This should've been in Unit 1!" → "The Most Basic Introduction"

**2024-05-17-getting-ready**

- `vocabulary[1].word_id` "je-me-lave-fr.i-wash-myself" → "je-me-lave-fr"

**2024-05-20-reading-8**

- `title` "Reading 8 - Ma Journée" → "Reading - Ma Journée"
- `description` "A story about a typical day. Uses temporal words, reflexive verbs, and all Unit 8 vocabulary!" → "A story about a typical day. Uses temporal words, reflexive verbs, and all this unit's vocabulary!"

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

**2024-06-03-past-tense-composition**

- `items[9].gloss` "Thanks to being hungry, I ate" → "Because I was hungry, I ate"
- `items[9].hint` ""WRONG! Fix: ___ j'avais faim, j'ai mangé (Because I was hungry, I ate)"" → "(removed)"

**2024-06-05-reading-9**

- `title` "Reading 9 - Une Histoire du Passé" → "Reading - Une Histoire du Passé"
- `description` "A story in the past using passé composé, imparfait, causal words, and spatial prepositions - bringing together all of Unit 9" → "A story in the past using passé composé, imparfait, causal words, and spatial prepositions - bringing together all of this unit"

**2024-06-10-unit-9-practice**

- `title` "Unit 9 Practice - Fill in the Blanks" → "Discourse & Past Tense Practice - Fill in the Blanks"
- `description` "Complete sentences using causal words, spatial prepositions, and past tenses from Unit 9!" → "Complete sentences using causal words, spatial prepositions, and past tenses from this unit!"

**2024-06-09-unit-9-exam**

- `description` "Test everything from Unit 9! Causal words, spatial prepositions, passé composé, imparfait, and the critical PC vs IMP distinction for complete storytelling mastery." → "Test everything from this unit! Causal words, spatial prepositions, passé composé, imparfait, and the critical PC vs IMP distinction for complete storytelling mastery."

**2024-01-25-emotion-phrases**

- `vocabulary[0].word_id` "je-suis-content-que-tu-sois-la-fr.i-m-happy" → "je-suis-content-que-tu-sois-la-fr"

**2024-02-01-reading-10**

- `title` "Reading 10 - Mes Rêves et Mes Espoirs" → "Reading - Mes Rêves et Mes Espoirs"
- `description` "A story about dreams and ambitions using Unit 10's advanced expressions: wishes (je veux que...), emotions (je suis content que...), hypotheticals (si j'étais...), and more" → "A story about dreams and ambitions using this unit's advanced expressions: wishes (je veux que...), emotions (je suis content que...), hypotheticals (si j'étais...), and more"

**2024-02-05-unit-10-practice**

- `title` "Unit 10 Practice - Fill in the Blanks" → "Mastery & Nuance Practice - Fill in the Blanks"
- `description` "Complete sentences using Unit 10's B2 level phrases: necessity, wishes, emotions, hypotheticals, and more!" → "Complete sentences using this unit's B2 level phrases: necessity, wishes, emotions, hypotheticals, and more!"

**2024-02-04-unit-10-exam**

- `description` "Test everything from Unit 10! Master B2 level phrases: necessity (il faut que), wishes (je veux que), emotions (je suis content que), hypotheticals (si j'étais...), regrets (si j'avais su...), and more advanced expressions." → "Test everything from this unit! Master B2 level phrases: necessity (il faut que), wishes (je veux que), emotions (je suis content que), hypotheticals (si j'étais...), regrets (si j'avais su...), and more advanced expressions."
- `items[36].hint` "Marc's wisdom from Reading 10: 'If we don't do anything, we'll never _____'" → "Marc's wisdom from the reading Mes Rêves et Mes Espoirs: 'If we don't do anything, we'll never _____'"
- `items[37].instruction` "From Reading 10: What did Sophie want about her life?" → "From the reading Mes Rêves et Mes Espoirs: What did Sophie want about her life?"
- `items[38].instruction` "From Reading 10: What had Sophie already done before talking to Marc?" → "From the reading Mes Rêves et Mes Espoirs: What had Sophie already done before talking to Marc?"

**2024-02-08-age-personal-info**

- `description` "Essential life skills! Learn to say your age (J'ai 25 ans), ask others' ages (Quel âge avez-vous?), and share personal information. Finally complete what should have been in Unit 1!" → "Essential life skills! Learn to say your age (J'ai 25 ans), ask others' ages (Quel âge avez-vous?), and share personal information."

**2024-02-12-reading-11**

- `title` "Reading 11 - La France Moderne" → "Reading - La France Moderne"

**2024-02-16-unit-11-practice**

- `title` "Unit 11 Practice - Fill in the Blanks" → "Daily Essentials Practice - Fill in the Blanks"
- `description` "Complete sentences using Unit 11's essential vocabulary: age expressions, missing top 100 verbs, and directions!" → "Complete sentences using this unit's essential vocabulary: age expressions, missing top 100 verbs, and directions!"

**2024-02-15-unit-11-exam**

- `description` "Final test for Unit 11! Demonstrate mastery of age expressions, all missing top 100 verbs (give, sleep, work, live, search, find, listen, watch, wait, arrive, stay), directions, and practical communication. Achieve complete French foundation!" → "Final test for this unit! Demonstrate mastery of age expressions, all missing top 100 verbs (give, sleep, work, live, search, find, listen, watch, wait, arrive, stay), directions, and practical communication. Achieve complete French foundation!"
- `items[42].situation` "From Reading 11: France's population" → "From the reading La France Moderne: France's population"
- `items[43].situation` "From Reading 11: What tourists look for" → "From the reading La France Moderne: What tourists look for"
- `items[44].situation` "From Reading 11: Where artists live" → "From the reading La France Moderne: Where artists live"
- `items[45].situation` "From Reading 11: Modern France combines what?" → "From the reading La France Moderne: Modern France combines what?"

**2024-03-15-questce-qui-que**

- `vocabulary[1].word_id` "qu-est-ce-que-fr.object-pronoun" → "qu-est-ce-que-fr"

**2024-03-19-pourquoi-complex**

- `concepts[0].definition` "You already know pourquoi - now compose it with EVERYTHING from Units 1-11!" → "You already know pourquoi - now compose it with EVERYTHING you've learned so far!"

**2024-03-25-multi-clause-questions**

- `concepts[0].term` "Questions + Unit 10 Structures" → "Questions + Mastery & Nuance Structures"
- `concepts[0].definition` "Combine question words with all the sophisticated structures from Unit 10" → "Combine question words with all the sophisticated structures from the Mastery & Nuance unit"

## Live ids with no converted item

The live app stores answers under these exercise ids and concept indexes, and no converted item, concept or section has the same content, so live-ids.json has no entry for them. Real misses come first: each needs a look. The other two groups are expected, since the new files hold nothing for those ids.

### Real misses

None.

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
- 4 × generic instruction dropped (Say '…'): `exercises[1].instruction`, `exercises[2].instruction`, `exercises[3].instruction`, `exercises[5].instruction`

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
- 10 × generic instruction dropped (Say '…'): `exercises[1].instruction`, `exercises[6].instruction`, `exercises[7].instruction`, `exercises[8].instruction`, `exercises[9].instruction`, `exercises[10].instruction`, `exercises[11].instruction`, `exercises[12].instruction`, `exercises[13].instruction`, `exercises[14].instruction`

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
- 56 × generic instruction dropped (Translate to French): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[1].instruction`, `exerciseConfig.items[2].instruction`, `exerciseConfig.items[3].instruction`, `exerciseConfig.items[4].instruction`, `exerciseConfig.items[6].instruction`, `exerciseConfig.items[7].instruction`, `exerciseConfig.items[8].instruction`, `exerciseConfig.items[9].instruction`, `exerciseConfig.items[10].instruction`, `exerciseConfig.items[11].instruction`, `exerciseConfig.items[12].instruction`, `exerciseConfig.items[13].instruction`, `exerciseConfig.items[14].instruction`, `exerciseConfig.items[15].instruction`, `exerciseConfig.items[16].instruction`, `exerciseConfig.items[17].instruction`, `exerciseConfig.items[19].instruction`, `exerciseConfig.items[20].instruction`, `exerciseConfig.items[21].instruction`, `exerciseConfig.items[22].instruction`, `exerciseConfig.items[24].instruction`, `exerciseConfig.items[25].instruction`, `exerciseConfig.items[26].instruction`, `exerciseConfig.items[27].instruction`, `exerciseConfig.items[28].instruction`, `exerciseConfig.items[29].instruction`, `exerciseConfig.items[30].instruction`, `exerciseConfig.items[31].instruction`, `exerciseConfig.items[32].instruction`, `exerciseConfig.items[33].instruction`, `exerciseConfig.items[34].instruction`, `exerciseConfig.items[35].instruction`, `exerciseConfig.items[36].instruction`, `exerciseConfig.items[37].instruction`, `exerciseConfig.items[38].instruction`, `exerciseConfig.items[39].instruction`, `exerciseConfig.items[40].instruction`, `exerciseConfig.items[41].instruction`, `exerciseConfig.items[42].instruction`, `exerciseConfig.items[46].instruction`, `exerciseConfig.items[47].instruction`, `exerciseConfig.items[48].instruction`, `exerciseConfig.items[49].instruction`, `exerciseConfig.items[50].instruction`, `exerciseConfig.items[51].instruction`, `exerciseConfig.items[52].instruction`, `exerciseConfig.items[53].instruction`, `exerciseConfig.items[54].instruction`, `exerciseConfig.items[55].instruction`, `exerciseConfig.items[56].instruction`, `exerciseConfig.items[57].instruction`, `exerciseConfig.items[58].instruction`, `exerciseConfig.items[59].instruction`, `exerciseConfig.items[60].instruction`, `exerciseConfig.items[61].instruction`
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
- `passage` story text: added: "Socrate demande des questions à ses étudiants."
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

- 18 × "Complete:" prefix dropped; the sentence is the text: `items[0].prompt`, `items[1].prompt`, `items[2].prompt`, `items[3].prompt`, `items[4].prompt`, `items[5].prompt`, `items[6].prompt`, `items[7].prompt`, `items[8].prompt`, `items[9].prompt`, `items[10].prompt`, `items[11].prompt`, `items[12].prompt`, `items[13].prompt`, `items[14].prompt`, `items[15].prompt`, `items[16].prompt`, `items[17].prompt`

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

- 18 × "Complete:" prefix dropped; the sentence is the text: `items[0].prompt`, `items[1].prompt`, `items[2].prompt`, `items[3].prompt`, `items[4].prompt`, `items[5].prompt`, `items[6].prompt`, `items[7].prompt`, `items[8].prompt`, `items[9].prompt`, `items[10].prompt`, `items[11].prompt`, `items[12].prompt`, `items[13].prompt`, `items[14].prompt`, `items[15].prompt`, `items[16].prompt`, `items[17].prompt`

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

- `items[15].blanks` i-lisais-es-arrive: 2 blank hints joined into one hint
- `items[16].blanks` i-courait-a-marche: 2 blank hints joined into one hint
- `items[17].blanks` i-cuisinais-ai-entendu: 2 blank hints joined into one hint
- `items[18].blanks` i-comme-sommes-restes: 2 blank hints joined into one hint
- `items[19].blanks` i-sur-ai-vu: 2 blank hints joined into one hint
- `items[20].blanks` i-s-est-cachee-pour: 2 blank hints joined into one hint
- 21 × instruction written as the gloss ("Complete:" and quotes dropped): `items[0].instruction`, `items[1].instruction`, `items[2].instruction`, `items[3].instruction`, `items[4].instruction`, `items[5].instruction`, `items[6].instruction`, `items[7].instruction`, `items[8].instruction`, `items[9].instruction`, `items[10].instruction`, `items[11].instruction`, `items[12].instruction`, `items[13].instruction`, `items[14].instruction`, `items[15].instruction`, `items[16].instruction`, `items[17].instruction`, `items[18].instruction`, `items[19].instruction`, `items[20].instruction`

**2024-02-01-reading-10**

- `passage` story text: added: "Sophie regarde Notre-Dame et pense à ses rêves."
- `passage` story text: added: "Le rêve de Sophie : une petite maison à Montmartre."
- `passage` story text: added: "Le rêve de Marc : ses peintures au Louvre."
- `passage` story text: added: "Sophie et Marc marchent vers la Seine."
- `passage` story text: added: "Un nouveau jour pour Sophie."
- `passage` story text: added: "Fin"
- `vocabularyReference[77]` "réussissions" ("succeed (subjunctive, nous)") is listed twice; one card, notes joined

**2024-02-05-unit-10-practice**

- `items[19].blanks` i-voudrais-suives: 2 blank hints joined into one hint
- 20 × instruction written as the gloss ("Complete:" and quotes dropped): `items[0].instruction`, `items[1].instruction`, `items[2].instruction`, `items[3].instruction`, `items[4].instruction`, `items[5].instruction`, `items[6].instruction`, `items[7].instruction`, `items[8].instruction`, `items[9].instruction`, `items[10].instruction`, `items[11].instruction`, `items[12].instruction`, `items[13].instruction`, `items[14].instruction`, `items[15].instruction`, `items[16].instruction`, `items[17].instruction`, `items[18].instruction`, `items[19].instruction`

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

**2024-02-01-reading-10**

- `vocabularyReference[0].wikipedia.image` image_without_credit: /img/external/La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques__Paris_ao_t_2014__2_-085432.jpg ("Paris"): the picture's file states only author "Yann Caradec" and copyright "Yann Caradec"
- `vocabularyReference[1].wikipedia.image` image_without_credit: /img/wikipedia/Notre-Dame_de_Paris__4_October_2017-b92c2e.jpg ("Notre-Dame de Paris"): the picture's file states no author or licence
- `vocabularyReference[3].wikipedia.image` image_without_credit: /img/wikipedia/CollineDuChateau_NiceFrance2022-b921bd.png ("Nice"): the picture's file states no author or licence
- `vocabularyReference[4].wikipedia.image` image_without_credit: /img/wikipedia/Bordeaux_Place_de_la_Bourse_de_nuit-9d3d63.jpg ("Bordeaux"): the picture's file states no author or licence
- `vocabularyReference[5].wikipedia.image` image_without_credit: /img/external/Louvre_Museum_Wikimedia_Commons-1851e9.jpg ("Louvre Museum"): the picture's file states only copyright "CC-by-SA 4.0 unported"
- `vocabularyReference[6].wikipedia.image` image_without_credit: /img/external/Paris_-_Eiffelturm_und_Marsfeld2-4d8187.jpg ("Seine River"): the picture's file states no author or licence
- `vocabularyReference[7].wikipedia.image` image_without_credit: /img/external/Tour_Eiffel_Wikimedia_Commons__cropped_-302994.jpg ("Eiffel Tower"): the picture's file states no author or licence

## Course map split

What each module teaches and tests now sits in its module file (`teaches`, `tests`). `curriculum-graph/languages/fr/course-map.corrections.json` keeps the checker’s corrections, each under its module key and item id. These lines list every course-map entry that moved to a new key or has no place in either file.

- `teachesWords` teaches_words_derived: 124 modules list extracted words, which are their vocabulary tables, so they are not written

**2024-01-01-famous-words**

- `2024-01-01-famous-words#exerciseConfig.items[5]` rekeyed: overrides now under 2024-01-01-famous-words#i-s-il-vous-plait

**2024-01-02-etre**

- `2024-01-02-etre#concepts[0].example` rekeyed: overrides now under 2024-01-02-etre#concepts/c-etre-to-be/example

**2024-10-21-cognates-help**

- `screen` screen_dropped: src/components/CognatesHelp.jsx; a guide's screen comes from its kind

**2024-10-20-liaison-help**

- `screen` screen_dropped: src/components/LiaisonHelp.jsx; a guide's screen comes from its kind

**2024-01-11-unit1-exam**

- `2024-01-11-unit1-exam#concepts[2].example` text_dropped: a unit_exam holds no concept cards, so concepts[2].example is in no module file; the override {"ignore":["fr:lex:express","possession"]} is kept nowhere

**2026-11-24-negation-guide**

- `2026-11-24-negation-guide#guide.sections[1].heading` rekeyed: overrides now under 2026-11-24-negation-guide#parts/p-not-any-pas-de/heading
- `2026-11-24-negation-guide#guide.sections[1].rule` rekeyed: overrides now under 2026-11-24-negation-guide#parts/p-not-any-pas-de/text/0
- `2026-11-24-negation-guide#guide.sections[2].examples[0].french` rekeyed: overrides now under 2026-11-24-negation-guide#parts/p-no-more-nothing-never/blocks/1/lines/0/0

**2024-01-13-ca-survival**

- `2024-01-13-ca-survival#exerciseConfig.items[4].hint` rekeyed: overrides now under 2024-01-13-ca-survival#i-tu-as-ca/hint
- `2024-01-13-ca-survival#exerciseConfig.items[5].hint` rekeyed: overrides now under 2024-01-13-ca-survival#i-il-a-ca/hint
- `2024-01-13-ca-survival#vocabularyReference[2].note` rekeyed: overrides now under 2024-01-13-ca-survival#vocabulary/ca-va-fr/note

**2024-01-19-questions-help**

- `screen` screen_dropped: src/components/QuestionsHelp.jsx; a guide's screen comes from its kind

**2024-01-19-stressed-pronouns**

- `2024-01-19-stressed-pronouns#concepts[1].example` rekeyed: overrides now under 2024-01-19-stressed-pronouns#concepts/c-when-to-use-stressed/example

**2024-01-28-verb-pattern-help**

- `screen` screen_dropped: src/components/VerbPatternHelp.jsx; a guide's screen comes from its kind

**2024-02-02-combining**

- `2024-02-02-combining#exerciseConfig.items[10].hint` rekeyed: overrides now under 2024-02-02-combining#i-tu-viens-avec-moi/hint
- `2024-02-02-combining#exerciseConfig.items[11].wrongAnswers[0].feedback` rekeyed: overrides now under 2024-02-02-combining#i-il-va-partir/mistakes/0/feedback

**2024-03-31-survival-phrases**

- `2024-03-31-survival-phrases#concepts[0].definition` rekeyed: overrides now under 2024-03-31-survival-phrases#concepts/c-polite-requests/definition
- `2024-03-31-survival-phrases#concepts[0].example` rekeyed: overrides now under 2024-03-31-survival-phrases#concepts/c-polite-requests/example
- `2024-03-31-survival-phrases#exerciseConfig.items[0]` rekeyed: overrides now under 2024-03-31-survival-phrases#i-je-voudrais-un-livre
- `2024-03-31-survival-phrases#exerciseConfig.items[0].hint` rekeyed: overrides now under 2024-03-31-survival-phrases#i-je-voudrais-un-livre/hint
- `2024-03-31-survival-phrases#exerciseConfig.items[0].wrongAnswers[0].feedback` rekeyed: overrides now under 2024-03-31-survival-phrases#i-je-voudrais-un-livre/mistakes/0/feedback
- `2024-03-31-survival-phrases#exerciseConfig.items[1]` rekeyed: overrides now under 2024-03-31-survival-phrases#i-je-voudrais-un-cafe
- `2024-03-31-survival-phrases#exerciseConfig.items[1].hint` rekeyed: overrides now under 2024-03-31-survival-phrases#i-je-voudrais-un-cafe/hint

**2024-04-03-unit-4-practice**

- `2024-04-03-unit-4-practice#sentences[0]` rekeyed: overrides now under 2024-04-03-unit-4-practice#i-je-voudrais

**2024-04-02-unit-4-exam**

- `2024-04-02-unit-4-exam#exerciseConfig.items[0]` rekeyed: overrides now under 2024-04-02-unit-4-exam#i-je-voudrais
- `2024-04-02-unit-4-exam#exerciseConfig.items[39]` rekeyed: overrides now under 2024-04-02-unit-4-exam#i-je-voudrais-un-cafe

**2024-04-24-reading-6**

- `2024-04-24-reading-6#vocabularyReference[32].note` rekeyed: overrides now under 2024-04-24-reading-6#vocabulary/qu-est-ce-que-fr/note

**2024-05-05-on-and-people**

- `2024-05-05-on-and-people#exercises[0]` rekeyed: overrides now under 2024-05-05-on-and-people#on-people-1
- `2024-05-05-on-and-people#exercises[0].hint` rekeyed: overrides now under 2024-05-05-on-and-people#on-people-1/hint
- `2024-05-05-on-and-people#exercises[0].wrongAnswers[0].feedback` rekeyed: overrides now under 2024-05-05-on-and-people#on-people-1/mistakes/0/feedback
- `2024-05-05-on-and-people#vocabularyReference[3].note` rekeyed: overrides now under 2024-05-05-on-and-people#vocabulary/on-va-fr/note

**2024-05-11-unit-7-practice**

- `2024-05-11-unit-7-practice#sentences[1]` rekeyed: overrides now under 2024-05-11-unit-7-practice#i-on-2

**2024-05-10-unit-7-exam**

- `2024-05-10-unit-7-exam#exerciseConfig.items[2]` rekeyed: overrides now under 2024-05-10-unit-7-exam#i-on-y-va
- `2024-05-10-unit-7-exam#exerciseConfig.items[2].hint` rekeyed: overrides now under 2024-05-10-unit-7-exam#i-on-y-va/hint

**2024-05-18-irregular-commands**

- `2024-05-18-irregular-commands#concepts[1].example` rekeyed: overrides now under 2024-05-18-irregular-commands#concepts/c-must-memorize-these/example
- `2024-05-18-irregular-commands#concepts[4].example` rekeyed: overrides now under 2024-05-18-irregular-commands#concepts/c-aller-commands/example
- `2024-05-18-irregular-commands#exercises[3]` rekeyed: overrides now under 2024-05-18-irregular-commands#irreg-cmd-4
- `2024-05-18-irregular-commands#exercises[5]` rekeyed: overrides now under 2024-05-18-irregular-commands#irreg-cmd-6

**2024-05-24-unit-8-exam**

- `2024-05-24-unit-8-exam#exerciseConfig.items[38]` rekeyed: overrides now under 2024-05-24-unit-8-exam#i-vas-y

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
