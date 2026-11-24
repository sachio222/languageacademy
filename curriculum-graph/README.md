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
- **Function**: something a learner does with the language, such as asking the time or apologising. One list of functions serves every language. An **exponent** is one way to perform a function in one language: the words and patterns that together do it, such as quelle, heure and the inversion question for "Quelle heure est-il ?".
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

The checker reads French the learner types (answers, blanks) and French the learner reads or hears (a French prompt, a reading passage), and checks both with their accents. It also reads the French on concept cards, hints, instructions, vocabulary notes, feedback on a wrong answer, module and passage titles, and help screens. Most of that text mixes English and French. The checker takes quoted French, such as 'bon voyage' in a hint. On concept examples, titles and help screens it also splits the text at parentheses, arrows, equals signs, slashes, colons and dashes, and keeps each part that reads as French. A concept example that lists short words or phrases between commas (eu, été, fait, vu) is read one entry at a time, so a grammar pattern never matches across two entries. A quoted span counts as French when it has no English word, so a French word missing from the course word list shows up in Section 8 of the fix list. A quoted span right after meaning or means, or after a word class and for (noun meaning 'car', stressed pronoun for 'me'), is an English gloss; after a word class and for, a subject pronoun such as 'tu' stays French. Course codes such as (M17) and word parts such as -t- are not words. An unquoted part also needs most of its words in the course word list, because English labels such as "Rising Tone" have no English word the checker can spot. English words are listed in `scripts/graph/french-text.mjs`; if Section 8 shows an English word from a hint or note, add it there. French written inside an English sentence without quotes is missed, so quote it. Where the checker still reads English as French, an `overrides` entry in `course-map.json` names the words or patterns to ignore in that item.

A help screen teaches only what its course-map entry credits. Its French is checked like any other text.

`scripts/graph/fields.mjs` lists every field a module file can hold, marked read or ignored with the reason, such as `explanation`, which no screen shows. `pnpm graph:test` fails when a module has a field the list does not name. If you add a field to a lesson, add it to the list too.

## Files

| File | What it holds | How it changes |
|---|---|---|
| `core/functions.json` | What a learner can do with a language, shared by every language | By hand |
| `core/settings.json` | Reuse windows, the last unit allowed English-to-French translation prompts, the default native language and where cognates are allowed | By hand |
| `pairs/en-fr/cognates.json` | Cognates and false friends for English speakers learning French | By hand |
| `languages/fr/headwords.json` | Course word list | By hand |
| `languages/fr/forms.json` | Irregular forms | By hand |
| `languages/fr/paradigms.json` | Regular patterns that generate forms (present tense of -er verbs, plural in -s) | By hand |
| `languages/fr/exponents.json` | The French words and patterns that perform each function | By hand |
| `languages/fr/constructions.json` | Grammar patterns with their detectors and example sentences | Written by `scripts/graph/fr/build/constructions.mjs` |
| `languages/fr/names.json` | People, places and brands that need no teaching | By hand |
| `languages/fr/course-map.json` | For each module: what it teaches and tests, and corrections to how the checker reads it | `teachesWords` by `pnpm graph:extract`, every other field by hand |
| `reports/fr-fix-list.md`, `reports/fr-summary.json` | Latest fix list and counts | `pnpm graph:report` |

## Commands

Run these from the repository root.

- `pnpm graph:check` prints a count for each rule, then the number of errors and warnings, the native language it checked for (`native`) and how many uses of an untaught cognate it allowed (`cognatesAllowed`). It exits with status 1 while any error remains, so expect a failing exit until the course can lock. Add `--native <code>` to check for another native language, such as `--native ja`; `graph:report` takes the same option.
- `pnpm graph:due <moduleKey|position>` lists the words and patterns the module at that position should use again. A taught word or pattern should come back within 2 modules, then within 5, 12 and 30 modules of each use. The list holds those with no use yet inside their current window, when that window ends at the next module or has already ended. Each line gives the ID, where it was taught, its last use and where its window ends.
- `pnpm graph:report` writes the fix list (`reports/fr-fix-list.md`) and the counts (`reports/fr-summary.json`).
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
{ "id": "fr:lex:pomme", "lemma": "pomme", "pos": "noun", "paradigms": ["fr:cx:noun.plural"], "senses": [], "dictionaryId": "pomme-fr", "cefr": null, "cefrSource": null }
```

- `id` is `fr:lex:` plus the lemma in lowercase without accents, with spaces and apostrophes written as hyphens (`fr:lex:pomme-de-terre`). When another headword already has that ID, add the part of speech: `fr:lex:savoir.verb`.
- `pos` is the part of speech: noun, verb, adjective, adverb, pronoun, preposition, conjunction, article, determiner, interjection, interrogative, or alphabet for a letter.
- `paradigms` lists the patterns in `paradigms.json` that generate the word's regular forms. A regular -er verb takes the same seven patterns as `fr:lex:parler`; a noun takes `fr:cx:noun.plural`; an adjective takes the `fr:cx:adj.*` pattern that fits its endings. An irregular verb lists only the patterns its regular cells follow and gets the rest as irregular forms.
- `dictionaryId` is the word's key in `src/data/dictionary/`, or null.

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

`core/functions.json` lists what a learner can do with a language. Each entry looks like this:

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
- Several entries for one function are alternatives.

A function is available at a position once every node of one of its exponents is available there. Names do not count: an exponent with a name in it is available as soon as its other nodes are. A word that only the Reference unit teaches is never available, because that unit has no position.

To add a function, add it to `core/functions.json`, keeping the list in order of level and then group, and give it at least one exponent. An exponent may name a headword that no lesson teaches yet; the function then stays unavailable until a lesson teaches it. If the word list lacks a word the function needs, add the headword first (see Adding a headword). Then run `pnpm graph:check`. It warns `function-no-exponent` for a function with no French exponent, and reports `function-bad-group` for an unknown group, `exponent-empty` for an exponent with no nodes, and `dangling-ref` for an exponent that names a function or node the graph does not have.

## Build scripts

`scripts/graph/fr/build/` holds the scripts that built the French data. Running `add-words.mjs`, `constructions.mjs` and `course-map.mjs` with `node`, in that order, then `pnpm graph:extract`, reproduces every committed data file byte for byte.

- `constructions.mjs` writes `constructions.json` and stays its source of truth.
- `course-map.mjs` and `course-map-data.mjs` wrote the hand-edited course-map fields, `names.json` and a few headword changes; `course-map-data.mjs` records why each entry exists. The JSON files are now the source of truth, so edit them directly. Running `course-map.mjs` again would overwrite those edits.
- `add-words.mjs` records the words added after the first full check. Running it again changes nothing.

`scripts/graph/fr/seed-headwords.mjs` and `scripts/graph/fr/import-conjugations.mjs` made the first word list and irregular forms from the lesson files. Do not run them against the committed data, which has been checked and corrected by hand since.
