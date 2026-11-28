# Concept card examples: contracts

A concept card (and a Reference section) holds its examples as a list, `examples: [{ fr, en?, note? }]`, with an optional `layout` of `list`, `forms` or `plain` (a list that is not examples of the taught language: `{ text }` lines with no sound). The old one-string `example` is retired: the content check refuses it, the bundle has no such field, and L has no code that reads it. This note covers every part the change crosses: the module files, the content checker, the bundle for L, L's release checker and L itself. Plan: `notes/plans/2026-11-27-concept-cards-structured.md` in the product vault.

## 1. Scope

- **Users.** Course writers (people and drafting agents) write cards; learners read them in L's Vocabulary Intro and on Reference pages.
- **Use cases.** Write a card in the new shape; check it; ship it in a bundle; draw it in L.
- **Scale.** 553 concept cards in Units 1 to 13 and 65 Reference sections, all in the new shape (cut-over 2026-11-28). Units 14 and later are planned stubs with no cards yet; they are written in the new shape from the start (`plan:brief`, the writer templates).
- **Out of scope.** Word cards (`example_fr`, `example_en` stay single), guide part blocks (already lists), the live app on `main`, the converter from the live app (`migrate/module.mjs`, `migrate/reference.mjs`), whose output still carries the live strings until the recorded hand fixes replace them.

## 2. Boundary map

| Hop | From | To | Owner |
|---|---|---|---|
| 1 | Writer or drafting agent | `content/fr/modules/<key>.json` | Course writers |
| 2 | Module file | `pnpm content:validate` (`schema/module.mjs` exampleRules and noteRules, `concept-examples.mjs`, persons from `scripts/graph/fr/language.mjs`) | Content pipeline |
| 3 | Module file | `pnpm graph:check` (taught before used on example French; overrides in `curriculum-graph/languages/fr/course-map.json`) | Language graph |
| 4 | Edited module | `pnpm content:migrate` (`legacy/hand-fixes.json`, `legacy/live-ids.json`) | Content pipeline |
| 5 | Loaded course | `pnpm content:bundle` (`bundle.mjs` examplesOf) to `dist-content/bundle.json` | Content pipeline |
| 6 | Bundle | L's release checker (`build-spec/check/check_bundle.py`, vendored in `scripts/content/vendor/la-bundle`) | L build spec (vault) |
| 7 | Bundle | L: `l/tools/load-bundle.mjs`, `l/j-bundle.js`, `l/j-steps.js` exampleList | Prototype L (vault) |

## 3. Contracts

**API.** No network API. The command-line interfaces:

| Command | Input | Output | Exit |
|---|---|---|---|
| `pnpm content:validate` | `content/fr` | problems by code | 0 ok, 1 problems |
| `pnpm content:cards [--apply <units>] [--report <file>]` | `content/fr` | counts table (every card "already a list" since the cut-over); kept for a course still holding old strings | 0, 2 on an unknown unit |
| `pnpm content:bundle [--check]` | loaded course | `dist-content/bundle.json`, L's checker result | 0 ok, 1 problems |
| `python3 check/check_bundle.py <bundle>` | bundle | report | 0 ok, 1 errors, 2 usage |

**Data.**

| Field | Where | Type | Rule | Owner |
|---|---|---|---|---|
| `examples` | concept card | list of 1 to 6 `{ fr, en?, note? }` or `{ text }` | required (`concept_examples_size`, an error) | writer |
| `examples` | Reference section | the same | optional; a section may hold `rows` (a table) instead | writer |
| `examples[].fr` | list or forms card | string, 1 to 300 characters, plain French | required; no braces (`span_in_plain_field`); no `+`, `=`, `->` or arrow (`concept_example_formula`); never the learner's language (`concept_example_not_target`, language pack `isNativeExample`); taught before used (graph:check) | writer |
| `examples[].en` | same | string, at most 300, plain English | required in a `list` card (`concept_example_meaning`) | writer |
| `examples[].note` | same | string, at most 200, English with French in braces | optional | writer |
| `examples[].text` | plain card | string, at most 300, plain text in the learner's language | drawn in the body font with no sound and no French marking | writer |
| `layout` | card, section | `list` (default), `forms` or `plain` | only with `examples` (`concept_layout_without_examples`); `forms`: even count, singular forms first, then their plurals in the same order (`concept_forms_pair`); `plain`: items are `{ text }` only, and list or forms items never hold `text` (`concept_plain_item`) | writer |
| `example` | card, section | retired | refused: `field_unknown`, with a message naming `examples` | none |
| `term`, `definition` (`heading`, `text`) | card (section) | string | no run of three or more French items joined by commas, semicolons, slashes or "and" (`concept_inline_list`, an error) | writer |
| `vocabulary[].note` | word card | string | the same run fails (`concept_inline_list`, an error) | writer |
| Bundle `ConceptBlock` | `curriculum.openapi.json` | `examples` (array of `ConceptExample`, 1 to 6) and `layout` (`list`, `forms`, `plain`) required; no `example` property (`additionalProperties: false`) | `list` needs every `fr` and `en`; `forms` every `fr` and an even count; `plain` `text` only | L build spec |
| Bundle `ReferenceSectionBlock` | same | `examples` and `layout` optional, together; `rows` optional; no `example` | as above | L build spec |
| course-map override on card French | `course-map.json` | `<key>#concepts/<id>/examples/<n>/fr` | each listed in `CARD_OVERRIDES_AFTER_SPLIT` (`migrate-course-map.test.mjs`); an override on a retired string goes to `CARD_EXAMPLE_OVERRIDES_GONE` | language graph |
| `isNativeExample` | `scripts/graph/<code>/language.mjs` | function | French: any English-only word, or two common English words with no French accent | language pack |
| `persons` | `scripts/graph/<code>/language.mjs` | `[[singular pronouns], [plural pronouns]]` per person | French: je/j' with nous, tu with vous, il/elle/on with ils/elles | language pack |

**Event.** None: every hop is a command run by a person or CI.

**State.**

| From | To | Trigger | Who |
|---|---|---|---|
| card with `example` | card with `examples` | hand edit, or `pnpm content:cards --apply <unit>` then a hand finish | writer (done for every unit, 2026-11-28) |
| course with old cards | cut-over | every unit migrated; `example` removed from the schema, the contract and L | done 2026-11-28 |
| an item whose accepted answers all change | the item takes a new id | `item_id_reused` in `content:bundle --check` | writer |

Source of truth: the module files on `course-main`. A card's `id` never changes (C-ID-4); `legacy/live-ids.json` maps the live app's concept index to it by content, else by the id minted from the live term.

**Failure.**

| Hop | Failure | What happens | Who sees it |
|---|---|---|---|
| 2 | a rule breaks, or a card holds `example` | content:validate exits 1 and names file, path and code; the load stops; CI fails | writer |
| 3 | untaught word or pattern in example French, or a reuse window missed because an example was dropped | graph:check counts it; above the issue budget it fails | writer |
| 4 | edit not recorded | `content:migrate --check` fails until `pnpm content:migrate` runs | writer |
| 5 and 6 | bundle breaks the contract (for example an `example` field) | `content:bundle --check` and L's checker fail; nothing ships | writer |
| 7 | L gets a card with no `examples` | L draws the card with no examples and warns once (`concept.example` when the old string is there) | learner sees the term and definition only |

**Observability.** content:validate, graph:check and L's checker print each problem with its code; the L release check writes one line per bundle to `l/content/release-checks.jsonl`.

## 4. Flow

1. A writer edits a card in the new shape.
2. `pnpm content:validate`, `pnpm graph:check --budget`, then `pnpm content:migrate` for a module converted from the live app.
3. `pnpm content:bundle --check` builds the bundle and runs L's checker.
4. `l/tools/check-release.sh <bundle>` plays the course in a copy of L; `node l/tools/load-bundle.mjs <bundle>` loads it.
5. L draws `examples` with `J.exampleList` (`ds/library.html#examplelist`): one row per example, the whole row one tap target for its sound; two columns for `forms`; the single example strip for one example; the plain variant (`.ex-list.is-plain`, body font, no sound) for `plain`. A word card's note is one line of prose.

## 5. Security

No authentication or secrets: local files and commands. Input validation is the checker itself. Example French is drawn with escaping (`esc`), and only the note's braces become French spans.

## 6. AI in the system

Agents draft card text. Model output never ships on its own: (1) nothing is done until content:validate, graph:check, L's checker and the release check pass on the files; (2) a check not run is reported UNKNOWN; (3) a draft changes no state until it is written to a module file and passes the checks, and every new French sentence waits for a native speaker's check before the unit is approved; (4) applying a card spec to a module is idempotent: the same spec gives the same file.

## 7. Proof

| Claim | Evidence | Checked from |
|---|---|---|
| The checker enforces every rule, the old string included | `node --test scripts/content/test/concept-cards.test.mjs` | course-main |
| No card or section holds the old string | content test "every unit and the Reference shelf are migrated" | course-main |
| The bundle carries examples and layout, never example | `scripts/content/test/bundle.test.mjs` (concept card tests); `pnpm content:bundle --check` | course-main, vendored checker |
| L's checker refuses the old field and a card with no examples | `python3 -m unittest test_check_bundle` in `build-spec/check` | vault |
| L draws only from the list | `l/tests/run.sh "[bundle]"`; the playthrough at 390 px | vault |

### Results at commit 081a42e (2026-11-28)

| Claim | Evidence | Checked from | Status |
|---|---|---|---|
| Checker rules hold, the old string refused | content:test 446 of 446 pass | course-main | PROVEN |
| No card or section holds the old string | content test "every unit and the Reference shelf are migrated"; `pnpm content:cards`: 616 of 616 already a list | course-main | PROVEN |
| Example French is taught before used | graph:check --budget ok; no finding on any card's French in Units 1 to 13 or the shelf; budget lowered: reuse-missed 639 to 631, unknown-word 73 to 68, untaught-construction 67 to 55 | course-main | PROVEN |
| Each unit passed the gates before the next | one commit per unit (Units 4 to 13, the shelf), each after content:test, graph:test, plan:test, plan:check, content:validate, content:migrate --check, content:bundle --check, graph:check --budget, vendor-check, build and pipeline:test all passed | course-main | PROVEN |
| Records match the edits | content:migrate --check ok | course-main | PROVEN |
| Bundle and L's checker | content:bundle --check ok; check_bundle.py PASS on the bundle of 081a42e (no `example` field in it); build-spec test_check_bundle 52 of 52; check_contracts 0 problems; vendor-check matches | course-main, vault | PROVEN |
| Pipeline agreement suite | pipeline:test 88 of 88 | course-main | PROVEN |
| L draws only from the list | l/tests/run.sh 285 of 286 (the one failure is the paused-plan test, unrelated); `J.listLines` and its helpers are gone from `l/j-steps.js` | vault | PROVEN |
| L takes the bundle | check-release.sh PASSED, SHA-256 fce0e435…; course.html 16 of 16, play.html 16 of 16; loaded with load-bundle.mjs | vault | PROVEN |
| Units 4 to 13 cards render as the Example list at 390 px | one lesson per unit played in headless Chrome as a Premium learner: 55 cards, all drawn as the Example list (6 as two columns), sound only on rows marked French, the whole row one tap target, every step of each lesson opens with content | L in headless Chrome | PROVEN |
| Vertical rhythm | `node prototypes/tests/rhythm.test.mjs`: 31 pass, 0 fail | vault | PROVEN |
| French is what a native speaker says | not checked by a native speaker | none | UNKNOWN |
| Jake approves Units 4 to 13 and the shelf | review page written, not yet reviewed | none | UNKNOWN |

## 8. Open items

- A native speaker checks every French line written or changed: Units 1 to 3 (218 lines, `reviews/2026-11-27-concept-cards-units-1-3.native-check.json`) and Units 4 to 13 with the shelf (786 lines, `reviews/2026-11-28-concept-cards-units-4-13.native-check.json`).
- Jake approves Units 4 to 13 and the Reference pages from `reviews/2026-11-28-concept-cards-units-4-13.html`.
- L's Reference page draws a section's examples as the page's table of French and English, not as the Example list. Whether Reference pages take the Example list is a design call.
- `concept_example_not_target` reads a single capital letter ("A") and any line with "week-end" as English. The alphabet's letter names are a plain list for that reason, and "le week-end" left the days card. A fix to `isNativeExample` in the language pack would let both back.
- Facts on the Reference pages (populations, forecasts for 2050, where French is official) are unchecked.
- Four items changed answers: the plurals item and the two pouvoir items took new ids (`item_id_reused`), and the questions item kept its id but lost its live-ids mapping, since the live answer was "est-ce que elle". Learners' live progress on those four does not carry over.
