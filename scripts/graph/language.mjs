// The language module: everything the shared checker, content loader and word builder need to know about one target
// language, in one object. Each language keeps its own in scripts/graph/<code>/language.mjs, whose default export has
// the members in MEMBERS; the shared code reaches a language only through language(code) or languageOf(graph), so a
// new language adds a folder and changes no shared file.
//
// Text
//   fold(s)                comparison key: lowercase, accents and ligatures written out (mange and mangé meet)
//   norm(s)                the written form: lowercase, apostrophes straightened, accents kept
//   tokenize(text, opts)   [{ surface, norm, fold, clitic, sentence }]; opts.isWord(foldedRun) keeps a hyphenated
//                          run whole when the word list has it
//   lenient(text)          a typed answer as the checker should read it when accents and apostrophes are not
//                          checked (French restores j ai to j'ai)
// Forms (most languages build these with makeForms in forms.mjs)
//   buildFormIndex(graph), lookupKey(token), strictKey(token), lookupToken(index, token),
//   lookupTokenStrict(index, token)
// Target text and the learner's own language
//   isNativeText(s)        true when a whole string is in the learner's language, so it holds no target text
//   targetIn(text, mode, isWord)   the target-language pieces of a mixed string (modes as in fr/text.mjs)
//   targetWordTest(graph, index)   isWord for tokenize: a folded run the word list or a name holds
// Answers and dictionary
//   checkAnswer(typed, expected, exercise)   the pass decision for one typed answer (content:validate's passable check)
//   dictionaryForms()      async: folded spellings the app dictionary has a pop-up for; optional (a language with no
//                          dictionary yet returns an empty set, and reading-word-no-popup flags every untabled word)
//   popupKeys(token)       [key, base]: the spelling a reading pop-up is looked up by, and its base when elided
// Report
//   locale                 sort order for word lists in reports
//   exampleWord            a headword key the report uses to explain IDs (lex:<exampleWord>)
//
// Modules load synchronously (require of an ES module, Node 22 and later) so that functions given only a graph can
// find their language without every caller becoming async.
import { createRequire } from 'node:module';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const SETTINGS = join(HERE, '../../curriculum-graph/core/settings.json');
const require = createRequire(import.meta.url);

export const MEMBERS = [
  'code', 'locale', 'exampleWord',
  'fold', 'norm', 'tokenize', 'lenient',
  'buildFormIndex', 'lookupKey', 'strictKey', 'lookupToken', 'lookupTokenStrict',
  'isNativeText', 'targetIn', 'targetWordTest',
  'checkAnswer', 'dictionaryForms', 'popupKeys',
];

const loaded = new Map();

// The language every command uses when none is named: core/settings.json defaultLanguage.
export function defaultLanguage() {
  const code = JSON.parse(readFileSync(SETTINGS, 'utf8')).defaultLanguage;
  if (typeof code !== 'string' || !code) throw new Error('curriculum-graph/core/settings.json: defaultLanguage must name a language code');
  return code;
}

export const moduleFile = (code) => join(HERE, code, 'language.mjs');

// The language module for a code. file: another module to load under that code (a test fixture's language).
export function language(code, file) {
  file ??= moduleFile(code);
  const key = `${code}|${file}`;
  if (loaded.has(key)) return loaded.get(key);
  if (!/^[a-z]{2,3}$/.test(String(code))) throw new Error(`language code must be two or three lowercase letters, not ${JSON.stringify(code)}`);
  if (!existsSync(file)) throw new Error(`no language module for ${code}: expected ${file}`);
  const mod = require(file).default;
  const missing = MEMBERS.filter((m) => mod?.[m] === undefined);
  if (missing.length) throw new Error(`${file} lacks ${missing.join(', ')}`);
  if (mod.code !== code) throw new Error(`${file} says it is ${mod.code}, not ${code}`);
  // An index remembers the language that built it, so a function given only an index reads text the same way.
  const lang = {
    ...mod,
    buildFormIndex: (graph) => Object.defineProperty(mod.buildFormIndex(graph), 'language', { value: lang }),
  };
  loaded.set(key, lang);
  return lang;
}

// The language a graph was loaded for: the module loadGraph attached, else the one its lang names, else the default.
export function languageOf(graph) {
  return graph?.language ?? language(graph?.lang ?? defaultLanguage());
}

// The language a form index was built by (a language module tags each index it builds), else the default language.
export function languageOfIndex(index) {
  return index?.language ?? language(defaultLanguage());
}
