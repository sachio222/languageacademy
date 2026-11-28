# Course plan tools

A course is written from a plan. The plan of a language is one file, `content/<lang>/course-plan.json`: every unit that
is planned and not yet written, every module in it, and what each module teaches. These tools check that file and make
everything else from it. They are the same for every language: each takes a language code and reads only that
language's folders.

## Commands

The `pnpm` scripts run each command for French. For another language, run the CLI with its code:
`node scripts/plan/cli.mjs <command> <lang>`.

| Command | What it does |
|---|---|
| `pnpm plan:check` | Checks the whole plan against the written course and the graph. Prints what the plan holds, where each level is reached and, when this machine has a frequency file, each unit's band. Exits 1 on any problem. `--against <git ref>` also lists words the plan taught at that commit and no longer teaches. |
| `pnpm plan:md` | Writes the plan as a readable document. |
| `pnpm plan:page` | Writes the course page: written and planned units, every module, every word with its meaning, and a search box. |
| `pnpm plan:stubs` | Shows what planned module files and outline the plan gives. `--write` writes them; `--check` exits 1 when a file differs. |
| `pnpm plan:brief <unit_key or module_key>` | Writes one brief for each module: everything its writer needs, in one file. |

`plan:md`, `plan:page` and `plan:brief` write under `.plan-out/<lang>/`, which is not committed. `--out` sends the
output elsewhere.

## To plan and brief a unit

1. Edit the unit in `content/<lang>/course-plan.json`.
2. `pnpm plan:check` until it prints `ok`.
3. `pnpm plan:stubs --write`, so the checker and `pnpm graph:due` see the unit.
4. `pnpm plan:brief <unit_key>`, and hand each brief to a writer.

## What the check holds a plan to

- Every word is taught once: by one module of the plan, and not already by the written course.
- Every word and pattern is in the graph, or the word is listed in `words_to_add` under the module that teaches it.
- A pattern is taught, practised or required by a reading only when what it needs is known by then.
- A practice set and a unit exam teach nothing; a reading teaches the words of its table.
- Sizes: new words in a lesson, words in a reading's table, first-pass minutes of a module, items and minutes of a unit
  exam, guides in a unit.
- Each level the plan names (`levels`) is reached by the end of the unit it names. A level is reached as
  `pnpm graph:check` counts it: 90% of the core words through that level are available and every core pattern is taught.

The plan's modules are counted as if written, in plan order, after the last written module
(`scripts/graph/projection.mjs`). Positions, word counts and levels are computed on every run and stored nowhere.

## Where each thing lives

| What | Where | Same for every language |
|---|---|---|
| Plan format | `scripts/plan/schema/la-course-plan@1.json` | yes |
| Rules and tools | `scripts/plan/*.mjs` | yes |
| Method a writer follows, by module kind | `scripts/plan/templates/*.md` | yes |
| What the method fixes beyond the recipes | `scripts/plan/method.json` | yes |
| Reading types: the human situations a reading can be about, and the types of readings already written | `scripts/plan/reading-types.json` | yes |
| The plan | `content/<lang>/course-plan.json` | no |
| Sizes and rules of each module kind | `content/<lang>/recipes/*.json` | no |
| Notes for writers of this language | `content/<lang>/writing-notes.md` | no |
| Words, forms, patterns, level lists | `curriculum-graph/languages/<lang>/`, `curriculum-graph/core/levels/` | no |
| Meanings of words the graph has no gloss for | `curriculum-graph/pairs/<native>-<lang>/glosses.json` | no |
| How common each word is | `~/.languageacademy/frequency/<lang>.tsv` on this machine, never in the repository | no |

## What a new language supplies

1. Its graph folder and level lists, as French has them.
2. `content/<lang>/` with `course.json`, `recipes/` and `writing-notes.md`.
3. `content/<lang>/course-plan.json`.
4. Optionally a frequency file, `lemma<TAB>value` on each line with a higher value for a more common word, at
   `~/.languageacademy/frequency/<lang>.tsv` (or under `$LA_FREQUENCY_DIR`). Its values are never committed or printed;
   the tools print bands only. Without the file the frequency check is skipped.

No tool changes.

## A reading in parts

A reading is one module with one word table and one position. A long reading has `parts`, each of its own kind (story,
article, exposition, learning-alongside) and each read in one sitting; `minutes` and `running_words` describe one part.

## Reading types

Each part of a reading names a type from `reading-types.json`: the human situation it is about, such as a new place, a mystery or cultures meeting. The list is the same for every language. A type guides the feel of a reading; it is not a rule. Each language writes its own country's instance, and a plan may choose a different type at the same point when its culture fits another better, saying why in `type_note`. `plan:check` asks that every part name a type the list has, and never that it match another language's plan. It prints how many types the plan uses and where.

## The earlier stub tool

`plan:stubs` replaced `scripts/content/plan-stubs.mjs` and its key map, `content/fr/plan-keys.json`, which made planned
module files from an earlier plan kept outside the repository. Both are retired: the plan file holds the keys, and the
planned files in `content/fr/modules/` are `plan:stubs` output.

## The method's rules in plan:check

`plan:check` holds a plan to the teaching method as well as to its sizes. It reads which patterns count as structure, which verbs open a slot and which words announce a pattern from `curriculum-graph/languages/<lang>/method-roles.json` (`frameVerbs`, `markers`, `roleExact`). A word also counts as a marker when it sets off a pattern's detector on its own.

| Problem | What it means |
|---|---|
| `structure_stops` | No lesson of the unit teaches a pattern, and a pattern with every need met waits. `held_patterns` in the plan sets a pattern aside for the next level, with the reason. |
| `no_carrier` | A lesson of six or more new words with no new verb, frame word or pattern. |
| `marker_without_pattern` | A word that announces a pattern is planned before any of its patterns. |
| `carrier_unknown`, `reuses_unknown` | A module's `carrier` or a word in `reuses` is not taught there and not known before. |
| `met_through_unknown`, `met_through_missing` | A word's `met_through` names something the learner does not own at that point, or a word has no entry. |

A lesson's `carrier` is the pattern or verb taught first. `met_through` gives, for each new word, the owned material its first sentence is built on, and the words are listed in teaching order. A unit's `carry` lists the words its practice set and exam must use, because no later lesson of the unit can. Briefs print all of these.

## plan:speed: the course against other orders of the same items

`pnpm plan:speed` (or `node scripts/plan/cli.mjs speed <lang> [--seeds n]`) takes every word and pattern the course
teaches through its last planned unit and puts the same items in other orders: the teaching method's own rule, a
textbook order (level by level), a frequency list (words by frequency, a pattern once its words are known, at the
textbook's pace of patterns per word) and 200 seeded random orders. Every order teaches each item once and a pattern
only after what it needs, and every order pays the same time: a cost per lesson, per new word and per new pattern,
fitted to the course's own written lessons from the recipe time constants, plus the course's reading, practice and
exam time every so many lessons. Words the Reference pages and the cognates open count as known from the start in
every order. It reports patterns known, sentence shapes (every known word in every known pattern whose slot takes it)
and the share of each level list usable, at equal study hours and at equal words, the course against the others at
the end of each of its units, and how the answer moves with the main assumptions (patterns per lesson, words per
lesson, a fixed cost per lesson, reading and exam time). Output: `.plan-out/<lang>/speed/speed.json` (chart series,
random bands) and `speed.txt`. It reads the local frequency file (frequency.mjs) to order words and writes no
frequency value; with no file, every word weighs the same.

## plan:method: the course scored against the teaching method

`pnpm plan:method` (or `node scripts/plan/cli.mjs method <lang>`) measures the whole course, written and planned,
by the method's own rule: each lesson adds the piece that opens the most new sentences from what the learner knows.
It writes `.plan-out/<lang>/method/method-score.txt` and `.json`.

- **Shape, every module.** Patterns known on arrival, the reach each new word arrives with (known patterns whose slot
  takes it), the words a new pattern takes at once, known words a pattern gives a new job, how long a pattern waited
  after its needs were met, and the patterns the course never teaches though their needs are met.
- **Writing, written modules.** New words as a share of the words the exercises use, the sentence each new word is
  first met in, whether it then carries a later new word, and whether the next modules lean on it. The written
  course before the plan's first unit is the baseline.

Each language says how its patterns map to the method's roles and slots in
`curriculum-graph/languages/<lang>/method-roles.json`. The report is a measure and never fails a run; the rules above are what `plan:check` enforces.
