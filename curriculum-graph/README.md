# French course graph

This folder holds a map of what the French course teaches: its words, their forms and its grammar patterns, and which module teaches each one. A checker reads all 162 modules in course order, from the course content in `content/fr/` (see `scripts/content/`), and lists every word or pattern a learner meets before a lesson has taught it, along with other course problems, in a fix list for the product owner.

Run the checker after you change a lesson. Once it finds no errors, the course can lock: its content is frozen and all course fixes ship together as one release.

## Words used here

- **Module**: one lesson, guide, practice set, reading or unit exam, written as one file in `content/fr/modules/`. Its **position** is its place in course order, from 1 to 162, set by the outline `content/fr/course.json`. The pages on the Reference shelf (alphabet, numbers, days) have no position; see The Reference unit below.
- **Teaching module**: a lesson teaches the words of its vocabulary table and the constructions its file lists in `teaches.constructions`. A guide teaches what its file lists in `teaches`. A reading teaches the words of its own vocabulary table, at its own position. Practice sets and exams never teach; they list what they check in `tests.constructions`.
- **Headword**: one entry in the course word list, such as `fr:lex:livre`. Its **forms** are the other ways it is written: livres, or parle and parlons for parler.
- **Construction**: a grammar pattern or fixed phrase, such as `fr:cx:neg.ne-pas` (ne … pas) or `fr:cx:chunk.ca-va` (ça va). Each one has a **detector**, a pattern that finds it in a French sentence.
- **Node ID**: the code that names a headword (`fr:lex:`), an irregular form (`fr:form:`), a construction (`fr:cx:`), a name (`fr:name:`) or a function (`fn:`). An ID never changes once it is committed.
- **Item ref**: the address of one exercise or one piece of text, written `<moduleKey>#<path>`. An exercise is named by its id: `2024-01-01-famous-words#i-s-il-vous-plait`. Its hint, instruction and the feedback on its second known mistake add a field: `#i-paul/hint`, `#i-plural/instruction`, `#i-je-suis/mistakes/1/feedback`. Other text is named by the ids in its path, with list positions only where entries have no id: `#concepts/c-etre-forms/example`, `#vocabulary/ca-va-fr/note`, `#tables/t-etre-present/rows/2/fr`, `#parts/p-not-any-pas-de/text/0`, `#parts/p-no-more-nothing-never/blocks/1/lines/0/0`, `#checks/k1/ask`, `#passage/b3/fr`, `#title`. Because a ref names ids, it stays the same when an exercise moves within its module.
- **Guide**: a module of kind `guide` that gathers pieces the learner already has into one rule, such as the negation guide (`2026-11-24-negation-guide`). Its file holds parts, each with text and example blocks (`pairs`, `lines`, `cmp` and others, in the shapes `scripts/content/schema/module.mjs` lists), and three checks.
- **Function**: something a learner does with the language, such as asking the time or apologising. One list of functions serves every language. An **exponent** is one way to perform a function in one language: the words and patterns that together do it, such as quelle, heure and the question word order est-il for "Quelle heure est-il ?".
- **CEFR level**: a level of the Common European Framework of Reference for Languages, which grades learners from A1 (beginner) through A2, B1, B2 and C1 to C2.
- **Cognate**: a French word that a speaker of the learner's native language reads correctly without a lesson, such as restaurant for an English speaker. A **false friend** looks like a word of that language but means something else: librairie is a bookshop, not a library.

A word is available at a position once a teaching module at or before it has taught it. A regular form such as parlons is available once both its headword and its pattern (`fr:cx:verb.er.present`) are taught. An irregular form such as vais must be taught itself. A word or form that the Reference unit lists is available from the position that `reference.openFrom` sets. Names (Paris, Marie) are always available; a capital letter alone does not make a word a name.

## Cognates and the learner's native language

The cognates lesson (`2024-10-21-cognates-help`, position 6) tells learners that many French words look like English ones. From that lesson on, every cognate counts as known, in French the learner types as well as French the learner reads or hears, so Section 1 of the fix list does not list it. Before position 6 a cognate is an ordinary untaught word, and a false friend never counts as known this way. The cognates guide shows its words but does not teach them. The level and function reports count a cognate as available from the cognates lesson on, in its own count (`cognateWords`) beside the words lessons teach and the Reference words, and a function that needs one is possible from there.

Which words count depends on the learner's native language, so the list belongs to the language pair and lives in a pair folder, `pairs/<native>-<target>/`, not in the French word list. Each pair has its own list: Spanish or Italian speakers learning French would have their own lists, larger than the English one, because their languages share far more words with French. `pairs/en-fr/cognates.json` holds the English-French list:

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

A native language with no pair folder has no cognates: `pnpm graph:check --native ja` counts every cognate as an untaught word. `core/settings.json` holds the default native language (`defaultNative`) and where cognates count as known (`cognates.allowIn`). The course uses `"all"`: typed and shown French alike. With `"shown"`, cognates count as known only in French the learner reads or hears, and Section 1 lists a typed cognate with the module where the learner first types it.

## The Reference unit

The Reference unit holds the alphabet, numbers, days and months, holidays, colors, French-speaking countries, language facts, spelling patterns and a pronunciation test. It has no place in course order, and learners can open it at any time: a learner who needs a number in a sentence looks it up there. So the checker counts the words on its lookup pages as available from one course position on. `reference` in `core/settings.json` sets the position and the pages:

```json
"reference": { "openFrom": 1, "modules": ["2024-04-01-alphabet", "2024-04-02-numbers", "2024-04-03-days-months", "2024-04-04-holidays", "2024-04-05-colors", "2024-04-06-french-countries"] }
```

- `openFrom` is the course position from which those words count as available. Set it to null to keep the unit closed: a word that no lesson teaches is then untaught even when the Reference unit lists it.
- `modules` lists the Reference pages whose vocabulary tables open, by module key. Language facts, spelling patterns and the pronunciation test are left out: they teach about French rather than words to look up. The checker opens the pages the outline lists in `shelf.opens_words` (`content/fr/course.json`); keep `modules` the same list, which `pnpm graph:check` checks against the shelf.

On those pages only nouns, adjectives, numbers and letters open, with their forms, such as noire, vive and vingts. Verbs never open, infinitives included, so épeler and être stay closed; adverbs such as demain and grammar words such as je, cette and de stay closed too. A word is read as the kind of word that may open, so l'été opens the season été, not the past participle of être.

In lesson text, a word that only the Reference unit has opened counts only when its spelling reads as no other word. The letter y opens, but a lesson that uses the pronoun y still needs a lesson to teach it first; the same goes for la (the musical note and the article), est (east and the verb) and été (summer and the past participle of être). Once a lesson teaches the other word, the spelling counts as available.

With `openFrom` at 1, a lesson may use huit or lundi before any lesson teaches it, in French the learner types or reads, and Section 1 of the fix list does not list it. A lesson that teaches the same word earlier still counts as the place it is taught. `pnpm graph:check` reports a module key that is not a Reference page as `dangling-ref`, and an `openFrom` past the last course position as `reference-open-from`. A value of the wrong kind is an error when the graph loads.

The level and function reports count Reference words apart from the words lessons teach; see Level and function reports.

## What the checker reads

The checker loads the course with `loadCourse()` from `scripts/content/load.mjs`, the same loader the bundle builder uses, and reads it with `scripts/graph/content-course.mjs`. Every string in a module file has a role in the content schema: French the learner reads, hears or types, native text, or native text with French in braces (`Use {être} for how you feel.`). The checker reads French by that role, never by guessing from the wording.

An exercise's type says which of its fields is French:

- In `translate`, `respond`, `transform`, `gapfill` and `comprehension` exercises, the answer is French the learner types, and each `accept` is another answer the checker reads without accents.
- `shown` (in `transform` and `meaning`), a gap-fill sentence, and an option marked `fr` are French the learner reads. A gap-fill sentence is read with its blanks filled, and only the blank answers count as typed.
- French in braces in a `prompt`, `situation`, `cue` or `question` is French the learner reads with the exercise, so it is checked like the rest of the exercise.
- The answer to a `meaning` exercise is English, and a mistake's answer is wrong on purpose, so the checker reads neither.

Around the exercises it reads the French of vocabulary examples and notes, table rows, pronunciation phrases, concept cards, descriptions, can-do lines, reading passages and guides. In a guide block it reads the French cells: the first cell of a `pairs` or `lines` row, every `fr` cell, the `say` values a `cmp` row speaks, a `verbs` entry's verb and forms, and a `table` row's verb and French forms. The third `pairs` cell, which respells a sound for English readers, is neither French nor English, and neither is a check's `sound`. A unit's description and can-do lines in the outline are read for their French spans at the unit's last module, and so is its French can-do example (`can_do_example_fr`), with `{name}`, the learner's name, read as a name.

Hints, mistake feedback, instructions and titles stay outside the taught-before rule: a word in them may come before its lesson. Their French still counts as a use for the reuse windows. Where the checker misreads a sentence, an `overrides` entry in `course-map.json` names the words or patterns to ignore in that item.

Words and patterns a guide teaches count as taught at the guide's position, but a guide is never a prerequisite, because a learner may skip it. When another module uses something only a guide has taught by then, the checker reports `guide_only_teaching`, and a lesson should teach it first.

`pnpm graph:test` fails when any learner-facing string of the course gets no ref, so French cannot sit in a field the checker skips. The content schema rejects a field it does not know (`field_unknown`), so a new field needs a role there first.

## Files

| File | What it holds | How it changes |
|---|---|---|
| `core/functions.json` | What a learner can do with a language, shared by every language | By hand |
| `core/levels/fr-A1.json`, `fr-A2.json`, `fr-B1.json` | Core words and constructions a learner needs to reach each level (drafts until the team approves them) | By hand |
| `core/settings.json` | Reuse windows, the last unit allowed English-to-French translation prompts, the default native language, where cognates are allowed and the position from which the Reference unit is open | By hand |
| `pairs/en-fr/cognates.json` | Cognates and false friends for English speakers learning French | By hand |
| `languages/fr/headwords.json` | Course word list, plus the words the core lists need that no lesson uses yet | By hand |
| `languages/fr/forms.json` | Irregular forms | By hand |
| `languages/fr/paradigms.json` | Regular patterns that generate forms (present tense of -er verbs, plural in -s) | By hand |
| `languages/fr/exponents.json` | The French words and patterns that perform each function | By hand |
| `languages/fr/reading-limits.json` | Verbs whose forms the checker cannot yet tell from a noun or adjective with the same spelling | By hand |
| `languages/fr/constructions.json` | Grammar patterns with their detectors and example sentences | Written by `scripts/graph/fr/build/constructions.mjs` |
| `languages/fr/names.json` | People, places and brands that need no teaching | By hand |
| `languages/fr/course-map.json` | Corrections to how the checker reads each module (see Course-map fields). What a module teaches and tests is in its own file under `content/fr/modules/` | By hand |
| `reports/fr-fix-list.md`, `reports/fr-summary.json` | Latest fix list and counts | `pnpm graph:report` |
| `reports/fr-levels.json`, `reports/fr-functions.json` | Level coverage and function coverage, as data for charts | `pnpm graph:report` |
| `reports/issue-budget.json` | The most issues of each rule the course may have | `pnpm graph:check --lower-budget`, which only lowers counts |

## Commands

Run these from the repository root.

- `pnpm graph:check` prints a count for each rule it found, plus `dangling-ref`, `level-data-missing` and `unread-items` even at 0, then the number of errors and warnings, the native language it checked for (`native`) and how many uses of an untaught cognate it allowed (`cognatesAllowed`). It ends with one line per level giving the share of that level's core words and the core constructions taught by the end of the course and where the level is reached, followed from A2 on by the same counts through that level (the level and the levels below it), then how many functions of each level become possible. It exits with status 1 while any error remains, so expect a failing exit until the course can lock. Add `--budget` to compare each count with `reports/issue-budget.json` instead: it exits with status 1 only when a rule has more issues than its budget (a rule the budget does not list has a budget of 0), and lists each rule over or under. CI runs `pnpm graph:check --budget` on every push, so a change that adds issues fails. After you fix issues, run `pnpm graph:check --lower-budget` to write the lower counts into the budget; it never raises one. Add `--native <code>` to check for another native language, such as `--native ja`; `graph:report` takes the same option.
- `pnpm graph:due <moduleKey|position>` lists the words and patterns the module at that position should use again. A taught word or pattern should come back within 2 modules, then within 5, 12 and 30 modules of each use. The list holds those with no use yet inside their current window, when that window ends at the next module or has already ended. Each line gives the ID, where it was taught, its last use and where its window ends.
- `pnpm graph:report` writes the fix list (`reports/fr-fix-list.md`), the counts (`reports/fr-summary.json`) and the level and function data (`reports/fr-levels.json`, `reports/fr-functions.json`; see Level and function reports). The same input always gives byte-identical files.
- `pnpm graph:extract` prints the words each lesson and reading teaches, as the checker reads them from its vocabulary table, and each vocabulary word the course word list does not have. It writes nothing; the checker derives these words on every run.
- `pnpm graph:test` runs the checker's tests, including the example sentences of every construction.

## Adding or editing a lesson

1. Edit the module file in `content/fr/modules/`: its vocabulary table (`vocabulary`), concept cards and exercises (`items`). Run `pnpm content:validate`.
2. Run `pnpm graph:extract`. If it prints an unknown word, add that word as a headword (see below) and run it again.
3. In the module file, list in `teaches.constructions` the ID of each grammar pattern its concept cards explain. A pattern the graph does not have yet needs a construction first (see below).
4. Run `pnpm graph:check`, then `pnpm graph:report`, and read the module's lines in the fix list.
5. Before you write the next module, run `pnpm graph:due <its position>` and use what it lists in the new exercises.

`pnpm graph:test` fails when a vocabulary table lists a form whose tense puts the module above the level of everything else it teaches, such as sois (a subjunctive form of être) in a lesson that credits no subjunctive. List the construction that builds that tense in the module's `teaches.constructions`, here `fr:cx:subj.il-faut-que`, or take the form out of the table.

Every verb has all six present forms except the verbs in `reading-limits.json` (see Level and function reports), falloir and pleuvoir, which have only il, and suivre, whose suis is left to être. A new irregular verb follows a verb of the same family (see Adding an irregular form): tenir and its compounds like venir, sentir like partir, employer and essuyer like nettoyer. A verb that never agrees, such as rire, mentir or réagir, has one past participle (ri, menti, réagi) and no ptcp.f, ptcp.pl or ptcp.fpl.

Some new verb forms are spelled like an older word: offre (offrir and the noun offre), produit, tiens and tienne (tenir and the pronoun le tien), reconnu, reconnaissant, crainte, tenue, sens (sentir and the noun sens) and mort (mourir and the noun mort). In running text the checker counts such a word as known when either reading is taught. A vocabulary table credits the verb form, because extraction ranks irregular forms first, so a lesson that lists the noun or pronoun needs the verb's IDs in its `excludeWords` correction and the noun in its file's `teaches.words` if extraction drops it. The possessive pronouns lesson already excludes tenir for la tienne.

## Course-map fields

`course-map.json` holds the checker's corrections, under each module's key. What a module teaches and tests is written in its own file: `teaches.constructions` and `teaches.words` on a lesson or guide, `tests.constructions` on a practice set or exam. A lesson or reading also teaches the words of its vocabulary table, which the checker reads on every run.

| Field | Meaning |
|---|---|
| `excludeWords` | IDs the vocabulary table seems to teach that the module does not, such as `fr:lex:devoir` in a table where devant (in front of) reads as a form of devoir. An excluded headword's readings are dropped before extraction picks a reading, so the word spelled the same way is credited instead: Reading 9 excludes `fr:lex:cuisiner`, so "la cuisine" teaches the noun cuisine. |
| `overrides` | `{ "<item ref>": { "ignore": [ ... ] } }`: node IDs or words the checker should not count in that item when it misreads the sentence. The first lesson ignores `fr:cx:elision` in "s'il vous plaît", a fixed phrase taught before elision. An ignored word or pattern does not count as used in that item, so no fix line points to it. |
| `itemKinds` | `{ "<item ref>": "translate" }` (or `"other"`) for an exercise whose type the translation rule should not follow. The type in the module file decides by default: only a `translate` exercise is a bare English sentence to translate, and those are allowed through Unit 1. |
| `contentNotes` | Errors in lesson text that no rule can see, written as plain sentences. They open the fix list. |

`pnpm graph:check` warns `course-map-unknown-item` for an `overrides` or `itemKinds` key that names no item of its module, and `course-map-unknown-module` for a key that names no module. It reports `course-map-field` for any other field in the file, or a ref filed under another module, and `dangling-ref` for an ID that is not in the graph.

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
- `senses` lists the word's meanings as `{ "gloss": "plumber" }`, in English. Most headwords still have an empty list; give a new headword at least one gloss.
- `gender` is `"m"` or `"f"` for a noun, or `"m/f"` for a noun with one form for both genders (un or une propriétaire). Leave it out for other parts of speech. No rule reads `gender` or `senses` yet; they are there for lesson writers and the app.
- `cefr` and `cefrSource` give the word's level and how it was decided (see Levels and core lists). Every headword needs both. When you choose the level yourself, write `cefrSource` as `team: ` followed by a few words, such as `team: teacher review, 2026-12`. A level an agent set under Jake's delegation is written `team: set by agent, Jake delegated 2026-11-25`.

A new headword does not go into a core list, even at A1, A2 or B1. The core lists change only when the team changes a level's target (see Levels and core lists).

Then run `pnpm graph:extract` and `pnpm graph:check`.

## Adding an irregular form

Add an object to `forms.json` and keep the file sorted by `id`:

```json
{ "id": "fr:form:aller.prs.1sg", "of": "fr:lex:aller", "cell": "prs.1sg", "surface": "vais" }
```

`cell` names the slot the form fills: `prs`, `impf`, `fut`, `cond` or `sbjv` followed by a person from `1sg` to `3pl`; `ptcp`, `ptcp.f`, `ptcp.pl` and `ptcp.fpl` for past participles; `prsptcp` for the present participle; `f`, `pl` and `fpl` for nouns and adjectives; `elided` for an apostrophe form such as jusqu'. An irregular form replaces the regular form of that cell. A learner has it only once a vocabulary table lists it, or a module file's `teaches.words` does.

## Adding a construction

`scripts/graph/fr/build/constructions.mjs` writes `constructions.json`, so add the construction to that script, not to the JSON file. This is how `fr:cx:neg.ne-plus` is written there:

```js
node('neg.ne-plus', 'Negation ne … plus (no longer, no more)', ['neg.ne-pas'],
  [NE, S('plus', { skip: 4 })],
  ['Je n\'ai plus faim.', 'Il ne travaille plus ici.'],
  ['J\'ai plus de temps.', 'Je n\'ai pas faim.']),
```

The arguments are the ID without `fr:cx:`, a label in plain words, the constructions it builds on, the detector, sentences it must match and sentences it must not match. Give at least two sentences that match and one that does not. A fixed phrase uses `chunk()` with its words, for example `chunk('ca-va', 'Fixed phrase: ça va …', ['ca', 'va'], [...], [...])`.

A seventh argument, `{ licenses: [headword IDs] }`, names the words the construction teaches inside its own match. `fr:cx:neg.de` licenses `fr:lex:de`: once a module teaches neg.de, the de of "je n'ai pas de chat" counts as taught from there, but the de of "combien de livres" or "d'où viens-tu" still waits for the lesson that teaches the preposition.

The same argument can hold `use: 'recognize'` for a pattern the learner reads and hears but never writes, such as the passé simple (`fr:cx:passe-simple`): il fut, elle entra, ils firent. The field is written into `constructions.json` as `"use": "recognize"`. It is optional, and `pnpm graph:check` reports any other value as `construction-use-bad`. The checker treats such a pattern as reading knowledge:

- What counts is the literary form itself: the words its detector marks with `form: true`, such as the verb of il fut, or the whole match when no step is marked.
- Section 1 of the fix list reports it only where the learner reads or hears that form before a module teaches it, such as a reading passage in the passé simple before the guide that explains the tense. It is never reported where the learner types the form: in an answer, or in a gap-fill whose blank is the form. A gap-fill whose blank is another word of the match (the il of il fut) still leaves the form read.
- Where the learner must type the form, `pnpm graph:check` warns `recognize-typed`: a learner should read such a pattern, not write it.
- A guide may teach it alone, so `guide_only_teaching` leaves it out.

The B2 patterns of this kind are `fr:cx:passe-simple` and `fr:cx:inversion.literary` (peut-être viendra-t-il, « Bonjour », dit-il), both B2, and `fr:cx:subj.imparfait` (qu'il fût), `fr:cx:subj.plus-que-parfait` (qu'il eût fini) and `fr:cx:neg.ne-alone` (je ne sais, je ne peux le croire), all C1.

Give the new construction a level in the `LEVELS` table in `scripts/graph/fr/build/construction-levels.mjs`; `constructions.mjs` stops with a message that names any construction without one.

Then run `node scripts/graph/fr/build/constructions.mjs` and `pnpm graph:test`. The test fails when a detector misses one of its match sentences or matches one of its noMatch sentences. Finally, add the new ID to `teaches.constructions` in the file of the lesson that explains it.

A detector is a list of steps, one for each word it matches, read left to right over the sentence with accents removed. A list of such lists matches when any one of them does. A step can set these keys:

- `surface`: a regular expression the whole word must match, such as `"ne|n'"`.
- `headword`, `cell`, `pos`, `via`: the word must be a form of that headword, fill that cell (`*` stands for any text, so `prs.*` is any present-tense form), have that part of speech, or be that kind of reading (`lemma`, `irregular` or `generated`). `{ pos: 'verb', via: 'lemma' }` matches an infinitive.
- `name: true`: the word is in `names.json`.
- `clitic: true`: the word is a pronoun joined by a hyphen, such as -tu or -t-il.
- `start: true`: the word is the first word of its sentence. `start: 'text'` asks for the first word of the whole text: the imperative detectors use it, because an answer that leaves out its subject starts the same way.
- `end: true`: the word is the last word of its sentence.
- `accented`: a regular expression the word must match with its accents kept (in lowercase), for forms that only an accent tells apart, such as the subjonctif imparfait fût and the passé simple fut. Text typed without accents never matches it.
- `any`: the word matches at least one of the listed steps.
- `skip: n`: up to n other words may sit between the previous step's word and this one.
- `optional: true`: the step may match no word.
- `form: true`: the word carries a recognition-only form (see `use: 'recognize'` above). It does not change what the step matches.

The tokenizer drops punctuation but numbers the sentences of a text: a full stop, question mark, exclamation mark or line break ends one, and an ellipsis does not, since exercise prompts use it for a gap (je ... lave). Every word of a match lies in one sentence, so `skip` never reaches into the next sentence of a reading passage.

## Functions and exponents

`core/functions.json` lists what a learner can do with a language. Each entry looks like this (the file keeps the keys of each entry in alphabetical order):

```json
{ "canDo": "Can ask what time it is and understand or give the answer.", "cefr": "A1", "group": "information", "id": "fn:tell-the-time", "label": "Ask and tell the time", "notions": ["time"] }
```

- `id` is `fn:` plus a short key in lowercase with hyphens. Every language uses the same ID.
- `group` is one of the six groups of the Threshold Level, a Council of Europe specification of what learners do with a language (van Ek and Trim, 1990): `information` (giving and asking for facts), `attitudes` (saying what you like, want, know, think or feel), `suasion` (getting someone to do something), `socialising` (greeting, thanking, inviting), `discourse` (ordering and linking what you say) and `repair` (sorting out a misunderstanding).
- `cefr` is the level where a learner first needs the function: `A1`, `A2` or `B1`.
- `label` names the function in a few words. `canDo` says what a learner at that level can do and starts with "Can".
- `notions` (ideas such as time, place or quantity) and `domains` (settings such as restaurant or travel) are optional and free text for now.

The list follows the A1, A2 and B1 functions of the Eaquals core inventory for French (2015). The labels and can-do lines are our own wording. The inventory is copyright, so never paste its text or examples into these files.

`languages/fr/exponents.json` lists the French exponents. A language without this file has no exponents yet, so `pnpm graph:check` warns `function-no-exponent` for every function.

```json
{ "function": "fn:tell-the-time", "nodes": ["fr:form:quel.f", "fr:lex:heure", "fr:form:etre.prs.3sg", "fr:cx:q.inversion", "fr:lex:huit"], "note": "Quelle heure est-il ? Il est huit heures." }
```

- `nodes` lists the headwords, irregular forms and constructions the learner needs. For a regular form, list its headword and its pattern: `fr:lex:travailler` and `fr:cx:verb.er.present` for je travaille.
- `note` is a short French example that we write ourselves.
- Several entries for one function are alternatives. Give each way of doing the function its own entry, so the function counts as soon as the learner has any one of them. Asking the way ("Où est la gare ?") and giving directions ("Tournez à droite") are two entries, not one.

A function is available at a position once every node of one of its exponents is available there. Names do not count: an exponent with a name in it is available as soon as its other nodes are. A word that the Reference unit lists is available from `reference.openFrom` on, so telling the time (Il est huit heures) is possible once lessons have taught the rest of the sentence, although no lesson teaches huit.

To add a function, add it to `core/functions.json`, keeping the list in order of level and then group, and give it at least one exponent. An exponent may name a headword that no lesson teaches yet; the function then stays unavailable until a lesson teaches it. If the word list lacks a word the function needs, add the headword first (see Adding a headword). Then run `pnpm graph:check`. It warns `function-no-exponent` for a function with no French exponent, and reports `function-bad-group` for an unknown group, `function-bad-level` for a level that is not A1 to C2, `exponent-empty` for an exponent with no nodes, and `dangling-ref` for an exponent that names a function or node the graph does not have.

## Levels and core lists

Every headword, construction and paradigm has a CEFR level in `cefr`, and `cefrSource` says how that level was decided. The levels are our own grading. Three public sources informed it, and none of their data is in this repository:

- The Eaquals core inventory for French (2015) lists, for each level, the grammar points, functions and vocabulary themes that most French reference books agree on. It is copyright, so we read it and do not copy it.
- Lexique 3.83 (lexique.org) gives how often each word appears in French films and books.
- FLELex (CENTAL, UCLouvain) gives how often each word appears in French textbooks at each level, and a level derived from those counts. Its license allows only non-commercial use, so we used it only to check our levels. For the words the course uses, it agrees with our level for about two words in three.

`cefrSource` starts with `agent: ` when an agent set the level or `team: ` when a person on the team did, followed by a short note on how it was decided. Agents set every level so far, with one of three values:

| Value | Meaning |
|---|---|
| `agent: frequency + Eaquals` | A word placed by an Eaquals vocabulary theme or function of that level (days, food and transport are A1), or else by its frequency rank in Lexique: top 1,000 lemmas A1, top 2,000 A2, top 4,000 B1, top 8,000 B2, rarer C1. |
| `agent: Eaquals grammar` | The level where the Eaquals inventory lists the grammar point as key: passé composé A1, imparfait A2, il faut que with the subjunctive A2, other uses of the subjunctive B1, conditionnel passé B2. A grammar word takes the level of its grammar point, so dont is B1 and donc is A2. |
| `agent: judgment` | Our own call where the sources say nothing direct: fixed phrases, slang, grammar terms such as verbe, and words a frequency rank places too low or too high. |

Anyone on the team may change a level. Write `cefrSource` as `team: ` and a few words on why, such as `team: teacher review, 2026-12`. On 2026-11-25 Jake delegated levels to agents, judged by accuracy; those levels read `team: set by agent, Jake delegated 2026-11-25`. A source in any other form, or a level with no source, is the error `cefr-source-bad` in `pnpm graph:check` and fails `pnpm graph:test`.

A form has no stored level. It takes the higher of its headword's level and the level of the construction that builds its tense: subjunctive forms take `fr:cx:subj.il-faut-que`, conditional forms `fr:cx:conditionnel-present`, future forms `fr:cx:futur-simple`, imperfect forms `fr:cx:imparfait` and present participles `fr:cx:gerondif`. Present-tense forms, past participles and agreement forms take the headword's level. Two exceptions keep beginner forms at their level:

- A form spelled like another form of the same word takes the lowest level among them. Donne and voient are present forms as well as subjunctive ones, so they keep the present's level.
- The polite conditionals je voudrais, tu voudrais, vous voudriez, j'aimerais, tu aimerais, pourriez-vous and on pourrait take the level of the phrase `fr:cx:chunk.je-voudrais` (A1).

`nodeLevel` in `scripts/graph/levels-data.mjs` computes a form's level, and `POLITE_CONDITIONALS` there lists the polite cells.

The core lists in `core/levels/` name what a learner must have to reach a level. A level counts as reached once 90% of its core words are available, taught by a lesson, open in the Reference unit or cognates, and the course has taught every core construction (`levelThreshold` in `core/settings.json`). Each list looks like this, with its IDs sorted:

```json
{ "level": "A1", "lang": "fr", "status": "draft", "frozen": null, "words": ["fr:lex:accepter", "..."], "constructions": ["fr:cx:adj.agreement", "..."] }
```

- `status` and `frozen` record approval. A list is `"status": "draft"` with `"frozen": null` until the team approves it, and `"status": "approved"` with the approval date in `frozen`, such as `"frozen": "2026-12-01"`, once it does. To approve a list, change those two fields and nothing else. `pnpm graph:check` reports any other pair as the error `core-list-status`.
- `constructions` holds the grammar points the Eaquals inventory lists as key at that level, where the graph has a construction or paradigm for them. Paradigms appear only for the present tense of regular verbs and the plural of nouns; the construction for a tense, such as `fr:cx:imparfait`, stands for the paradigms that build it.
- `words` was drafted from every headword of that level in the word list at the time, leaving out letters of the alphabet, interjections other than greetings, thanks, oui, non, ah, oh, allô and bravo, and words a learner does not need: slang, vulgar words, grammar terms such as verbe, and named dishes and landmarks the course happens to mention. It does not grow when the word list does.
- Every node in a list has the list's level, and no node is in two lists.

The word list holds the words the course uses and about 1,400 more that a learner needs at A1, A2 or B1 and that no lesson uses yet, such as écrire, fermer, avion and noir. They came from the 3,000 most frequent lemmas in Lexique and the Eaquals vocabulary themes, each placed by hand, and `scripts/graph/fr/build/core-words.mjs` records them. A core word that no lesson teaches is expected: it is a gap the coverage report shows.

The lists hold 733 words at A1, 681 at A2 and 841 at B1, so 1,414 words through A2 and 2,255 through B1. Milton and Alexiou (2009) measured French learners knowing about 1,160 lemmas at A1, 1,650 at A2 and 2,420 at B1, out of the 5,000 most frequent. The A1 list sits below that A1 figure and the A2 and B1 totals sit just below theirs, because a core list holds what every learner must know at a level, not every word a learner at that level happens to know.

The team approves the lists before coverage is measured against them as a fixed target. A list changes only when the team changes a level's target, so adding a headword at A1 leaves the A1 list as it is. Any change to a list needs the team's approval: set the list back to `draft` with `frozen: null` when you edit it, and to `approved` with the new date once the team agrees. If you change the level of a word or construction in a list, move it to the list of its new level or take it out. `pnpm graph:test` fails when a headword, construction or paradigm has no level or a badly formed source, and when a list names a node of another level. `pnpm graph:check` reports the same mismatch as the error `core-level-mismatch`, and a list entry that is not in the graph as `dangling-ref`.

## Level and function reports

The checker measures the course against the core lists. These are the terms the reports use:

- A **module's level** is the highest level among the words, forms and constructions it teaches. A **unit's level** is the highest level of its modules, so a single word can set it. The Units table in the fix list gives, beside each unit's level, how many words, forms and constructions the unit teaches at that level.
- A level is **reached** at the first position where 90% of that level's core words are available and the course has taught every one of its core constructions. Each level is measured on its own list, so A2 can be reached before A1.
- **Available words** are the core words lessons teach, plus the core words no lesson teaches that the Reference unit lists or that are cognates from the cognates lesson on. A learner can use all of them, so where a level is reached counts available words. The fix list and the JSON keep the words lessons teach as their own count beside them.
- **Coverage** is the share of a level's core words, and the number of its core constructions, taught by the end of the course or by a given position. Each core list holds only the nodes new at its level, so A2 coverage counts the A2 list alone.
- **Cumulative coverage** counts a level together with the levels below it: through A2 means the A1 and A2 lists together, and it has its own reached position under the same 90% rule.
- Percentages are rounded to the nearest whole number, except that 100% shows only when the whole list is taught.
- A function is **possible** at the first position where every node of one of its exponents is available: taught by a lesson, open in the Reference unit or a cognate. Section 7 of the fix list marks a function that relies on the Reference unit or on cognates, one that would be possible later or never without them. Possible is a floor: the course has taught at least one short way to do the function, often a single phrase such as c'est-à-dire. That is not proof that a learner can do the function at that level. The fix list prints each level's count of possible functions beside the share of that level's core words taught, so read the two together.

The reports add three warnings. Where they use the highest level the course has reached, a level counts only once the course has reached it together with the levels below it, so a course that covers the B1 list before the A1 list has not reached B1:

- `level-label`: a module title or concept card names a level above the module's level, or a unit title or unit description (B2 Level Phrases) names a level above the unit's level. A reading, practice set or exam teaches nothing, so its label is compared with the highest level the course has reached by its position instead.
- `level-order`: a module teaches a word or pattern two or more levels above the highest level reached before it. Until the course reaches a level, the count starts from A1, so the warning names every B1 or higher node. One line per module lists the nodes. A form is left out when the same line already names its headword or the pattern that builds its tense.
- `function-unreachable`: no exponent of an A1 or A2 function is fully taught by the end of the course. The line names what the closest exponent still needs. While the Reference unit is open its words are available, so they never appear there. With `reference.openFrom` set to null, the line marks words that no lesson teaches and only the Reference unit lists, such as huit in "Il est huit heures".

`languages/fr/reading-limits.json` lists verbs the checker cannot yet tell from a noun or adjective with the same spelling. Their present, past participle and subjunctive forms were left out of the graph because they are spelled like an older entry: il porte reads as the noun porte, and j'ai téléphoné does not read as téléphoner. For intéresser only the present participle is left out, because intéressant is also an adjective. For taire only the past participle is left out: tu is the subject pronoun and tue a form of tuer, and a participle reading on tu would make the checker read a passé composé into as-tu. Each entry gives the headword and the cells left out:

```json
{ "cells": ["prs", "ptcp", "sbjv"], "id": "fr:lex:porter" }
```

These verbs stay in the core counts. The fix list and `fr-levels.json` list them on their own instead of with the core words not taught, because a lesson that uses them may not get credit for it. Take a verb out of the file once the checker can read its forms. `pnpm graph:check` reports `dangling-ref` for an entry that is not in the graph and `reading-limit-not-headword` for one that is not a headword.

`graph:report` writes the data behind Sections 6 and 7 of the fix list as two JSON files, with keys sorted at every depth:

- `fr-levels.json` holds `levels` (per level: `coreWords`, `coreConstructions`, `taughtWords` and `taughtConstructions` as lessons teach them, `referenceWords` for core words no lesson teaches but the Reference unit lists, `cognateWords` for core words neither taught nor in the Reference that are cognates of the language pair, `availableWords` for the three together, `reachedAt` as a position or null, read from available words, the IDs in `untaughtWords` (no lesson teaches them, Reference words included) and `untaughtConstructions`, `untaughtReferenceWords` for the untaught words the Reference unit lists, and a `cumulative` block with the same eight counts for the level together with the levels below it), `modules` (per module: `position`, `moduleKey`, `unitId`, `title`, the level its labels name in `label` and its level in `computed`), `units` (the same for each unit, with `firstPosition`, `lastPosition` and `computedCount`, how many words, forms and constructions the unit teaches at its level), `curve` (per position and level, the core `words` and `constructions` taught so far, with `referenceWords`, `cognateWords` and `availableWords` as in `levels`), `headwordsByLevel` and `constructionsByLevel` (how many the graph has at each level), `taughtByLevel` (how many of those the course teaches), `taughtCumulative` (headwords taught by level at the last position of each unit) and `readingLimits`.
- `fr-functions.json` holds `functions`, sorted by level, then group, then ID. Each entry gives `id`, `group`, `cefr`, `label`, `position` (where the function becomes possible, or null), `exponentCount`, `missing` (for a function that never becomes possible, what its closest exponent still needs), `referenceOnly` (the missing words that only the Reference unit lists, empty while the unit is open), `viaReference` (true when the function is possible at its position only thanks to the Reference unit) `viaReferenceNodes` (for such a function, the Reference words its exponent uses that no lesson has taught by then), and `viaCognates` and `viaCognateNodes`, the same for cognates.

A share in the curve is its count divided by `coreWords` or `coreConstructions` in `levels`.

## Build scripts

`scripts/graph/fr/build/` holds the scripts that built the French data. Running `add-words.mjs`, `core-words.mjs` and `constructions.mjs` with `node`, in that order, reproduces the data files they wrote byte for byte.

- `constructions.mjs` writes `constructions.json` and stays its source of truth.
- `course-map.mjs` and `course-map-data.mjs` wrote the first course map, `names.json` and a few headword changes; `course-map-data.mjs` records why each entry exists. The course map has since been split between the module files and the corrections, keyed by item id, so `course-map.mjs` now stops before writing. Edit the JSON files and module files directly.
- `add-words.mjs` records the words added after the first full check. Running it again changes nothing.
- `core-words.mjs` records the words added for the core lists, with their levels and the irregular forms for their spelling changes (rangeons, jette, mène), and why some frequent words were left out (a spelling the checker already reads as another word, or an English word in course labels). Running it again changes nothing.
- `constructions.mjs` takes construction levels from `construction-levels.mjs`.
- `constructions.mjs` builds the passé simple and subjonctif imparfait forms that `fr:cx:passe-simple` and `fr:cx:subj.imparfait` look for from the graph's verbs, leaving out a form spelled like a word the graph already reads (il finit is also the present). After you add verbs to `headwords.json`, run it again so their forms are read too.
- `levels-propose.mjs` proposed the first headword levels from Lexique and FLELex files kept outside the repository, in a table that stays outside it too. It is not part of the build. The levels in `headwords.json` were decided from that table and are now edited by hand.

`scripts/graph/fr/seed-headwords.mjs` and `scripts/graph/fr/import-conjugations.mjs` made the first word list and irregular forms from the lesson files. Do not run them against the committed data, which has been checked and corrected by hand since.
