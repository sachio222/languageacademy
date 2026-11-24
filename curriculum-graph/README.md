# French course graph

This folder holds a map of what the French course teaches: its words, their forms and its grammar patterns, and which module teaches each one. A checker reads all 160 modules in course order and lists every word or pattern a learner meets before a lesson has taught it, along with other course problems, in a fix list for the product owner.

Run the checker after you change a lesson. Once it finds no errors, the course can lock: its content is frozen and all course fixes ship together as one release.

## Words used here

- **Module**: one lesson, help page, practice set, reading or exam in `src/lessons/`. Its **position** is its place in course order, from 1 to 160. The Reference unit (alphabet, numbers, days) has no position.
- **Teaching module**: lessons and help pages teach through their vocabulary table and concept cards. Practice sets, readings and exams never teach; their concept cards count as reminders.
- **Headword**: one entry in the course word list, such as `fr:lex:livre`. Its **forms** are the other ways it is written: livres, or parle and parlons for parler.
- **Construction**: a grammar pattern or fixed phrase, such as `fr:cx:neg.ne-pas` (ne … pas) or `fr:cx:chunk.ca-va` (ça va). Each one has a **detector**, a pattern that finds it in a French sentence.
- **Node ID**: the code that names a headword (`fr:lex:`), an irregular form (`fr:form:`), a construction (`fr:cx:`), a name (`fr:name:`) or a function (`fn:`). An ID never changes once it is committed.
- **Item ref**: the address of one exercise, written `<moduleKey>#<path in the module file>`, for example `2024-01-01-famous-words#exerciseConfig.items[5]`. The path is `exerciseConfig.items[N]`, `exercises[N]`, `sentences[N]`, `fillInBlanksSentences[N]` or `readingPassage`. French a learner reads around the exercises has a ref of the same kind, ending in the path of its field: `concepts[2].example`, `exerciseConfig.items[5].hint`, `vocabularyReference[3].note`, or `screen[4]` for the fifth French string on a help screen (counting from 0).
- **Help screen**: a help module whose page is written into a React component in `src/components/` instead of its lesson file. The course has four: liaison, cognates, questions and verb patterns.
- **Function**: something a learner does with the language, such as asking the time or apologising. One list of functions serves every language. An **exponent** is one way to perform a function in one language: the words and patterns that together do it, such as quelle, heure and the question word order est-il for "Quelle heure est-il ?".
- **CEFR level**: a level of the Common European Framework of Reference for Languages, which grades learners from A1 (beginner) through A2, B1, B2 and C1 to C2.
- **Cognate**: a French word that a speaker of the learner's native language reads correctly without a lesson, such as restaurant for an English speaker. A **false friend** looks like a word of that language but means something else: librairie is a bookshop, not a library.

A word is available at a position once a teaching module at or before it has taught it. A regular form such as parlons is available once both its headword and its pattern (`fr:cx:verb.er.present`) are taught. An irregular form such as vais must be taught itself. Names (Paris, Marie) are always available; a capital letter alone does not make a word a name.

## Cognates and the learner's native language

The cognates lesson (`2024-10-21-cognates-help`, position 6) tells learners that many French words look like English ones. From that lesson on, the checker lets a cognate appear before a lesson teaches it, in French the learner reads or hears: a prompt, a reading passage, a concept card, or the rest of a fill-in-the-blank sentence. French the learner types still needs the word taught. Section 1 of the fix list keeps a typed cognate, says it is a cognate and names the module where the learner first types it: teach the word there, or let the learner read it instead of typing it. The cognates screen shows its words but does not teach them, so no line names it as the place to fix a typed cognate. Before position 6 a cognate is an ordinary untaught word, and a false friend never gets this allowance.

Which words count depends on the learner's native language, so the list lives in a language pair folder, `pairs/<native>-<target>/`, and not in the French word list. `pairs/en-fr/cognates.json` holds the English-French list:

```json
{
  "lesson": "2024-10-21-cognates-help",
  "words": [{ "id": "fr:lex:restaurant", "native": "restaurant", "kind": "exact" }],
  "falseFriends": [{ "id": "fr:lex:librairie", "native": "library", "means": "bookshop" }]
}
```

- `lesson` is the module that introduces cognates, or null for no allowance.
- `words` lists each cognate by its headword ID, with the native word and how the spellings relate in `kind`: `exact` (same spelling), `accent` (only accents differ), `ending` (a regular ending swap: -ie/-y, -ique/-ic, -eur/-or, -iste/-ist, -ité/-ity, -el/-al, -aire/-ary, -eux/-ous, -isme/-ism, or -er/-e on verbs), or `close` (recognizable but irregular, such as musée and museum). For a verb or adjective, list the headword; the allowance covers its regular forms but not its irregular ones.
- `falseFriends` lists look-alikes with the native word they resemble and what the French word means.

Judge a cognate by meaning, not spelling. Pour, ville and raté look like English words (pour, villa, rate) and mean something else. Every ID must be a headword in `headwords.json`; add the headword first if it is missing. Keep both lists sorted by `id`.

A native language with no pair folder has no cognates: `pnpm graph:check --native ja` counts every cognate as an untaught word. `core/settings.json` holds the default native language (`defaultNative`) and where cognates are allowed (`cognates.allowIn`): `"shown"` for French the learner reads or hears, or `"all"` to allow typed French too.

## What the checker reads

The checker reads French the learner types (answers, blanks) and French the learner reads or hears (a French prompt, a reading passage), and checks both with their accents. It also reads the French on concept cards, hints, instructions, vocabulary notes, feedback on a wrong answer, module and passage titles, and help screens. Most of that text mixes English and French. The checker takes quoted French, such as 'bon voyage' in a hint. On concept examples, titles and help screens it also splits the text at parentheses, arrows, equals signs, slashes, colons and dashes, and keeps each part that reads as French. A concept example that lists short words or phrases between commas (eu, été, fait, vu) is read one entry at a time, so a grammar pattern never matches across two entries. A quoted span counts as French when it has no English word, so a French word missing from the course word list shows up in Section 9 of the fix list. A quoted span right after meaning or means, or after a word class and for (noun meaning 'car', stressed pronoun for 'me'), is an English gloss; after a word class and for, a subject pronoun such as 'tu' stays French. Course codes such as (M17) and word parts such as -t- are not words. An unquoted part also needs most of its words in the course word list, because English labels such as "Rising Tone" have no English word the checker can spot. English words are listed in `scripts/graph/french-text.mjs`; if Section 9 shows an English word from a hint or note, add it there. French written inside an English sentence without quotes is missed, so quote it. Where the checker still reads English as French, an `overrides` entry in `course-map.json` names the words or patterns to ignore in that item.

A help screen teaches only what its course-map entry credits. Its French is checked like any other text.

`scripts/graph/fields.mjs` lists every field a module file can hold, marked read or ignored with the reason, such as `explanation`, which no screen shows. `pnpm graph:test` fails when a module has a field the list does not name. If you add a field to a lesson, add it to the list too.

## Files

| File | What it holds | How it changes |
|---|---|---|
| `core/functions.json` | What a learner can do with a language, shared by every language | By hand |
| `core/levels/fr-A1.json`, `fr-A2.json`, `fr-B1.json` | Core words and constructions a learner needs to reach each level (drafts until the team approves them) | By hand |
| `core/settings.json` | Reuse windows, the last unit allowed English-to-French translation prompts, the default native language and where cognates are allowed | By hand |
| `pairs/en-fr/cognates.json` | Cognates and false friends for English speakers learning French | By hand |
| `languages/fr/headwords.json` | Course word list, plus the words the core lists need that no lesson uses yet | By hand |
| `languages/fr/forms.json` | Irregular forms | By hand |
| `languages/fr/paradigms.json` | Regular patterns that generate forms (present tense of -er verbs, plural in -s) | By hand |
| `languages/fr/exponents.json` | The French words and patterns that perform each function | By hand |
| `languages/fr/reading-limits.json` | Verbs whose forms the checker cannot yet tell from a noun or adjective with the same spelling | By hand |
| `languages/fr/constructions.json` | Grammar patterns with their detectors and example sentences | Written by `scripts/graph/fr/build/constructions.mjs` |
| `languages/fr/names.json` | People, places and brands that need no teaching | By hand |
| `languages/fr/course-map.json` | For each module: what it teaches and tests, and corrections to how the checker reads it | `teachesWords` by `pnpm graph:extract`, every other field by hand |
| `reports/fr-fix-list.md`, `reports/fr-summary.json` | Latest fix list and counts | `pnpm graph:report` |
| `reports/fr-levels.json`, `reports/fr-functions.json` | Level coverage and function coverage, as data for charts | `pnpm graph:report` |

## Commands

Run these from the repository root.

- `pnpm graph:check` prints a count for each rule, then the number of errors and warnings, the native language it checked for (`native`) and how many uses of an untaught cognate it allowed (`cognatesAllowed`). It ends with one line per level giving the share of core words and the core constructions taught by the end of the course and where the level is reached, then how many functions of each level become possible. It exits with status 1 while any error remains, so expect a failing exit until the course can lock. Add `--native <code>` to check for another native language, such as `--native ja`; `graph:report` takes the same option.
- `pnpm graph:due <moduleKey|position>` lists the words and patterns the module at that position should use again. A taught word or pattern should come back within 2 modules, then within 5, 12 and 30 modules of each use. The list holds those with no use yet inside their current window, when that window ends at the next module or has already ended. Each line gives the ID, where it was taught, its last use and where its window ends.
- `pnpm graph:report` writes the fix list (`reports/fr-fix-list.md`), the counts (`reports/fr-summary.json`) and the level and function data (`reports/fr-levels.json`, `reports/fr-functions.json`; see Level and function reports). The same input always gives byte-identical files.
- `pnpm graph:extract` rereads the vocabulary table of every teaching module and rewrites `teachesWords` in `course-map.json`. It prints each vocabulary word the course word list does not have.
- `pnpm graph:test` runs the checker's tests, including the example sentences of every construction.

## Adding or editing a lesson

1. Edit the module file in `src/lessons/modules/`: its vocabulary table (`vocabularyReference`), concept cards and exercises.
2. Run `pnpm graph:extract`. If it prints a word, add that word as a headword (see below) and run it again.
3. In `course-map.json`, under the module's key, list in `teachesConstructions` the ID of each grammar pattern its concept cards explain. A pattern the graph does not have yet needs a construction first (see below).
4. Run `pnpm graph:check`, then `pnpm graph:report`, and read the module's lines in the fix list.
5. Before you write the next module, run `pnpm graph:due <its position>` and use what it lists in the new exercises.

## Course-map fields

Each entry in `course-map.json` is keyed by `moduleKey`. Only `teachesWords` is generated. Edit the other fields by hand.

| Field | Meaning |
|---|---|
| `teachesWords` | Headwords and forms the module's vocabulary table teaches. `pnpm graph:extract` writes it; do not edit it. |
| `teachesWordsManual` | Headwords or forms the module teaches that extraction misses or misreads, such as `fr:lex:devant` (in front of) in a table where extraction reads devant as a form of devoir. |
| `excludeWords` | IDs extraction credits that the module does not teach, such as `fr:lex:devoir` in that same table. `pnpm graph:extract` leaves them out of `teachesWords`. |
| `teachesConstructions` | Constructions the module's concept cards explain. |
| `tests` | Constructions an exam or practice module says it tests. Each must be taught by that module's position. |
| `preTeach` | IDs a reading module teaches in a short list before its passage. A reading teaches nothing else. |
| `itemKinds` | `{ "<item ref>": "translate" }` (or `"situation"` or `"other"`) for an exercise the checker sorts wrongly. The checker sorts every exercise itself (`scripts/graph/rules/item-kinds.mjs`), so this field holds exceptions only. English-to-French translation prompts are allowed through Unit 1. |
| `overrides` | `{ "<item ref>": { "ignore": [ ... ] } }`: node IDs or words the checker should not count in that exercise when it misreads the sentence. The first lesson ignores `fr:cx:elision` in "s'il vous plaît", a fixed phrase taught before elision. The hint "Combine avoir + ça" ignores `fr:lex:combiner` and `fr:cx:imperative.tu`, because combine is English there. An ignored word or pattern does not count as used in that item, so no fix line points to it. |
| `contentNotes` | Errors in lesson text that no rule can see, written as plain sentences. They open the fix list. |
| `screen` | For a help module, the component file of its help screen, such as `"src/components/CognatesHelp.jsx"`. The checker reads the French on that screen. |

`pnpm graph:check` warns about an `itemKinds` or `overrides` key that names no exercise of its module, and reports any ID in these fields that is not in the graph. It reports an error `screen-missing` for a help module with no `screen`, and `dangling-ref` for a `screen` file that does not exist.

For a pair file, it reports `dangling-ref` for a cognate or false friend that is not in the graph and for a `lesson` that is not in the course, and `cognate-conflict` for an ID listed both as a cognate and as a false friend. A pair file with a missing field or an unknown `kind` stops the checker with a message that names the file.

## Adding a headword

Add an object to `headwords.json` and keep the file sorted by `id`:

```json
{ "id": "fr:lex:pomme", "lemma": "pomme", "pos": "noun", "paradigms": ["fr:cx:noun.plural"], "senses": [], "dictionaryId": "pomme-fr", "cefr": "A1", "cefrSource": "agent: frequency + Eaquals" }
```

- `id` is `fr:lex:` plus the lemma in lowercase without accents, with spaces and apostrophes written as hyphens (`fr:lex:pomme-de-terre`). When another headword already has that ID, add the part of speech: `fr:lex:savoir.verb`.
- `pos` is the part of speech: noun, verb, adjective, adverb, pronoun, preposition, conjunction, article, determiner, interjection, interrogative, or alphabet for a letter.
- `paradigms` lists the patterns in `paradigms.json` that generate the word's regular forms. A regular -er verb takes the same seven patterns as `fr:lex:parler`; a noun takes `fr:cx:noun.plural`; an adjective takes the `fr:cx:adj.*` pattern that fits its endings. An irregular verb lists only the patterns its regular cells follow and gets the rest as irregular forms.
- `dictionaryId` is the word's key in `src/data/dictionary/`, or null.
- `cefr` and `cefrSource` give the word's level and how it was decided (see Levels and core lists). Every headword needs both.

Then run `pnpm graph:extract` and `pnpm graph:check`.

## Adding an irregular form

Add an object to `forms.json` and keep the file sorted by `id`:

```json
{ "id": "fr:form:aller.prs.1sg", "of": "fr:lex:aller", "cell": "prs.1sg", "surface": "vais" }
```

`cell` names the slot the form fills: `prs`, `impf`, `fut`, `cond` or `sbjv` followed by a person from `1sg` to `3pl`; `ptcp`, `ptcp.f`, `ptcp.pl` and `ptcp.fpl` for past participles; `prsptcp` for the present participle; `f`, `pl` and `fpl` for nouns and adjectives; `elided` for an apostrophe form such as jusqu'. An irregular form replaces the regular form of that cell. A learner has it only once a vocabulary table lists it, or a lesson's `teachesWordsManual` does.

## Adding a construction

`scripts/graph/fr/build/constructions.mjs` writes `constructions.json`, so add the construction to that script, not to the JSON file. This is how `fr:cx:neg.ne-plus` is written there:

```js
node('neg.ne-plus', 'Negation ne … plus (no longer, no more)', ['neg.ne-pas'],
  [NE, S('plus', { skip: 4 })],
  ['Je n\'ai plus faim.', 'Il ne travaille plus ici.'],
  ['J\'ai plus de temps.', 'Je n\'ai pas faim.']),
```

The arguments are the ID without `fr:cx:`, a label in plain words, the constructions it builds on, the detector, sentences it must match and sentences it must not match. Give at least two sentences that match and one that does not. A fixed phrase uses `chunk()` with its words, for example `chunk('ca-va', 'Fixed phrase: ça va …', ['ca', 'va'], [...], [...])`.

Give the new construction a level in the `LEVELS` table in `scripts/graph/fr/build/construction-levels.mjs`; `constructions.mjs` stops with a message that names any construction without one.

Then run `node scripts/graph/fr/build/constructions.mjs` and `pnpm graph:test`. The test fails when a detector misses one of its match sentences or matches one of its noMatch sentences. Finally, add the new ID to `teachesConstructions` of the lesson that explains it.

A detector is a list of steps, one for each word it matches, read left to right over the sentence with accents removed. A list of such lists matches when any one of them does. A step can set these keys:

- `surface`: a regular expression the whole word must match, such as `"ne|n'"`.
- `headword`, `cell`, `pos`, `via`: the word must be a form of that headword, fill that cell (`*` stands for any text, so `prs.*` is any present-tense form), have that part of speech, or be that kind of reading (`lemma`, `irregular` or `generated`). `{ pos: 'verb', via: 'lemma' }` matches an infinitive.
- `name: true`: the word is in `names.json`.
- `clitic: true`: the word is a pronoun joined by a hyphen, such as -tu or -t-il.
- `start: true`: the word is the first word of the sentence.
- `any`: the word matches at least one of the listed steps.
- `skip: n`: up to n other words may sit between the previous step's word and this one.
- `optional: true`: the step may match no word.

## Functions and exponents

`core/functions.json` lists what a learner can do with a language. Each entry looks like this (the file keeps the keys of each entry in alphabetical order):

```json
{ "id": "fn:tell-the-time", "group": "information", "cefr": "A1", "label": "Ask and tell the time", "canDo": "Can ask what time it is and understand or give the answer.", "notions": ["time"] }
```

- `id` is `fn:` plus a short key in lowercase with hyphens. Every language uses the same ID.
- `group` is one of the six groups of the Threshold Level, a Council of Europe specification of what learners do with a language (van Ek and Trim, 1990): `information` (giving and asking for facts), `attitudes` (saying what you like, want, know, think or feel), `suasion` (getting someone to do something), `socialising` (greeting, thanking, inviting), `discourse` (ordering and linking what you say) and `repair` (sorting out a misunderstanding).
- `cefr` is the level where a learner first needs the function: `A1`, `A2` or `B1`.
- `label` names the function in a few words. `canDo` says what a learner at that level can do and starts with "Can".
- `notions` (ideas such as time, place or quantity) and `domains` (settings such as restaurant or travel) are optional and free text for now.

The list follows the A1, A2 and B1 functions of the Eaquals core inventory for French (2015). The labels and can-do lines are our own wording. The inventory is copyright, so never paste its text or examples into these files.

`languages/fr/exponents.json` lists the French exponents:

```json
{ "function": "fn:tell-the-time", "nodes": ["fr:form:quel.f", "fr:lex:heure", "fr:form:etre.prs.3sg", "fr:cx:q.inversion", "fr:lex:huit"], "note": "Quelle heure est-il ? Il est huit heures." }
```

- `nodes` lists the headwords, irregular forms and constructions the learner needs. For a regular form, list its headword and its pattern: `fr:lex:travailler` and `fr:cx:verb.er.present` for je travaille.
- `note` is a short French example that we write ourselves.
- Several entries for one function are alternatives. Give each way of doing the function its own entry, so the function counts as soon as the learner has any one of them. Asking the way ("Où est la gare ?") and giving directions ("Tournez à droite") are two entries, not one.

A function is available at a position once every node of one of its exponents is available there. Names do not count: an exponent with a name in it is available as soon as its other nodes are. A word that only the Reference unit teaches is never available, because that unit has no position.

To add a function, add it to `core/functions.json`, keeping the list in order of level and then group, and give it at least one exponent. An exponent may name a headword that no lesson teaches yet; the function then stays unavailable until a lesson teaches it. If the word list lacks a word the function needs, add the headword first (see Adding a headword). Then run `pnpm graph:check`. It warns `function-no-exponent` for a function with no French exponent, and reports `function-bad-group` for an unknown group, `function-bad-level` for a level that is not A1 to C2, `exponent-empty` for an exponent with no nodes, and `dangling-ref` for an exponent that names a function or node the graph does not have.

## Levels and core lists

Every headword, construction and paradigm has a CEFR level in `cefr`, and `cefrSource` says how that level was decided. The levels are our own grading. Three public sources informed it, and none of their data is in this repository:

- The Eaquals core inventory for French (2015) lists, for each level, the grammar points, functions and vocabulary themes that most French reference books agree on. It is copyright, so we read it and do not copy it.
- Lexique 3.83 (lexique.org) gives how often each word appears in French films and books.
- FLELex (CENTAL, UCLouvain) gives how often each word appears in French textbooks at each level, and a level derived from those counts. Its license allows only non-commercial use, so we used it only to check our levels. For the words the course uses, it agrees with our level for about two words in three.

`cefrSource` takes one of three values:

| Value | Meaning |
|---|---|
| `agent: frequency + Eaquals` | A word placed by an Eaquals vocabulary theme or function of that level (days, food and transport are A1), or else by its frequency rank in Lexique: top 1,000 lemmas A1, top 2,000 A2, top 4,000 B1, top 8,000 B2, rarer C1. |
| `agent: Eaquals grammar` | The level where the Eaquals inventory lists the grammar point as key: passé composé A1, imparfait A2, il faut que with the subjunctive A2, other uses of the subjunctive B1, conditionnel passé B2. A grammar word takes the level of its grammar point, so dont is B1 and donc is A2. |
| `agent: judgment` | Our own call where the sources say nothing direct: fixed phrases, slang, grammar terms such as verbe, and words a frequency rank places too low or too high. |

Agents set the first levels, hence the `agent:` prefix. Anyone may change a level; write a short source of your own when you do.

A form has no stored level. It takes the higher of its headword's level and the level of the construction that builds its tense: subjunctive forms take `fr:cx:subj.il-faut-que`, conditional forms `fr:cx:conditionnel-present`, future forms `fr:cx:futur-simple`, imperfect forms `fr:cx:imparfait` and present participles `fr:cx:gerondif`. Present-tense forms, past participles and agreement forms take the headword's level. Two exceptions keep beginner forms at their level:

- A form spelled like another form of the same word takes the lowest level among them. Donne and voient are present forms as well as subjunctive ones, so they keep the present's level.
- The polite conditionals je voudrais, tu voudrais, vous voudriez, j'aimerais, tu aimerais, pourriez-vous and on pourrait take the level of the phrase `fr:cx:chunk.je-voudrais` (A1).

`nodeLevel` in `scripts/graph/levels-data.mjs` computes a form's level, and `POLITE_CONDITIONALS` there lists the polite cells.

The core lists in `core/levels/` name what a learner must have to reach a level. A level counts as reached once the course has taught 90% of its core words and every core construction (`levelThreshold` in `core/settings.json`). Each list looks like this, with its IDs sorted:

```json
{ "level": "A1", "lang": "fr", "status": "draft", "frozen": null, "words": ["fr:lex:accepter", "..."], "constructions": ["fr:cx:adj.agreement", "..."] }
```

- `status` is `draft` until the team approves the list; `frozen` then holds the approval date.
- `constructions` holds the grammar points the Eaquals inventory lists as key at that level, where the graph has a construction or paradigm for them. Paradigms appear only for the present tense of regular verbs and the plural of nouns; the construction for a tense, such as `fr:cx:imparfait`, stands for the paradigms that build it.
- `words` holds every headword of that level except letters of the alphabet, interjections other than greetings, thanks, oui, non, ah, oh, allô and bravo, and words a learner does not need: slang, vulgar words, grammar terms such as verbe, and named dishes and landmarks the course happens to mention.
- Every node in a list has the list's level, and no node is in two lists.

The word list holds the words the course uses and about 1,400 more that a learner needs at A1, A2 or B1 and that no lesson uses yet, such as écrire, fermer, avion and noir. They came from the 3,000 most frequent lemmas in Lexique and the Eaquals vocabulary themes, each placed by hand, and `scripts/graph/fr/build/core-words.mjs` records them. A core word that no lesson teaches is expected: it is a gap the coverage report shows.

The lists hold 733 words at A1, 681 at A2 and 841 at B1, so 1,414 words through A2 and 2,255 through B1. Milton and Alexiou (2009) measured French learners knowing about 1,160 lemmas at A1, 1,650 at A2 and 2,420 at B1, out of the 5,000 most frequent. The A1 list sits below that A1 figure and the A2 and B1 totals sit just below theirs, because a core list holds what every learner must know at a level, not every word a learner at that level happens to know.

The team approves the lists before coverage is measured against them as a fixed target. After that, change them by hand, only when the team changes the target. If you change the level of a word or construction in a list, move it to the list of its new level or take it out. `pnpm graph:test` fails when a headword, construction or paradigm has no level or source, and when a list names a node of another level. `pnpm graph:check` reports the same mismatch as the error `core-level-mismatch`, and a list entry that is not in the graph as `dangling-ref`.

## Level and function reports

The checker measures the course against the core lists. These are the terms the reports use:

- A **module's level** is the highest level among the words, forms and constructions it teaches. A **unit's level** is the highest level of its modules.
- A level is **reached** at the first position where the course has taught 90% of that level's core words and every one of its core constructions. Each level is measured on its own list, so A2 can be reached before A1.
- **Coverage** is the share of a level's core words, and the number of its core constructions, taught by the end of the course or by a given position.

The reports add three warnings:

- `level-label`: a module title or concept card names a level above the module's level, or a unit title or unit description (B2 Level Phrases) names a level above the unit's level. A reading, practice set or exam teaches nothing, so its label is compared with the highest level the course has reached by its position instead.
- `level-order`: a module teaches a word or pattern two or more levels above the highest level reached before it. Until the course reaches a level, the count starts from A1, so the warning names every B1 or higher node. One line per module lists the nodes. A form is left out when the same line already names its headword or the pattern that builds its tense.
- `function-unreachable`: no exponent of an A1 or A2 function is fully taught by the end of the course. The line names what the closest exponent still needs, and marks words that only the Reference unit shows, such as the numbers in "Il est huit heures".

`languages/fr/reading-limits.json` lists verbs the checker cannot yet tell from a noun or adjective with the same spelling. Their present, past participle and subjunctive forms were left out of the graph because they are spelled like an older entry: il porte reads as the noun porte, and j'ai téléphoné does not read as téléphoner. For intéresser only the present participle is left out, because intéressant is also an adjective. Each entry gives the headword and the cells left out:

```json
{ "cells": ["prs", "ptcp", "sbjv"], "id": "fr:lex:porter" }
```

These verbs stay in the core counts. The fix list and `fr-levels.json` list them on their own instead of with the core words not taught, because a lesson that uses them may not get credit for it. Take a verb out of the file once the checker can read its forms.

`graph:report` writes the data behind Sections 6 and 7 of the fix list as two JSON files, with keys sorted at every depth:

- `fr-levels.json` holds `levels` (per level: `coreWords`, `coreConstructions`, `taughtWords`, `taughtConstructions`, `reachedAt` as a position or null, and the IDs in `untaughtWords` and `untaughtConstructions`), `modules` (per module: `position`, `moduleKey`, `unitId`, `title`, the level its labels name in `label` and its level in `computed`), `units` (the same for each unit, with `firstPosition` and `lastPosition`), `curve` (per position, the core words and constructions of each level taught so far), `headwordsByLevel` and `constructionsByLevel` (how many the graph has at each level), `taughtByLevel` (how many of those the course teaches), `taughtCumulative` (headwords taught by level at the last position of each unit) and `readingLimits`.
- `fr-functions.json` holds `functions`, sorted by level, then group, then ID. Each entry gives `id`, `group`, `cefr`, `label`, `position` (where the function becomes possible, or null), `exponentCount`, `missing` (for a function that never becomes possible, what its closest exponent still needs) and `referenceOnly` (the missing words that only the Reference unit shows).

A share in the curve is its count divided by `coreWords` or `coreConstructions` in `levels`.

## Build scripts

`scripts/graph/fr/build/` holds the scripts that built the French data. Running `add-words.mjs`, `core-words.mjs`, `constructions.mjs` and `course-map.mjs` with `node`, in that order, then `pnpm graph:extract`, reproduces every committed data file byte for byte.

- `constructions.mjs` writes `constructions.json` and stays its source of truth.
- `course-map.mjs` and `course-map-data.mjs` wrote the hand-edited course-map fields, `names.json` and a few headword changes; `course-map-data.mjs` records why each entry exists. The JSON files are now the source of truth, so edit them directly. Running `course-map.mjs` again would overwrite those edits.
- `add-words.mjs` records the words added after the first full check. Running it again changes nothing.
- `core-words.mjs` records the words added for the core lists, with their levels and the irregular forms for their spelling changes (rangeons, jette, mène), and why some frequent words were left out (a spelling the checker already reads as another word, or an English word in course labels). Running it again changes nothing.
- `constructions.mjs` takes construction levels from `construction-levels.mjs`.
- `levels-propose.mjs` proposed the first headword levels from Lexique and FLELex files kept outside the repository, in a table that stays outside it too. It is not part of the build. The levels in `headwords.json` were decided from that table and are now edited by hand.

`scripts/graph/fr/seed-headwords.mjs` and `scripts/graph/fr/import-conjugations.mjs` made the first word list and irregular forms from the lesson files. Do not run them against the committed data, which has been checked and corrected by hand since.
