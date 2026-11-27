#!/usr/bin/env python3
"""Check a Language Academy release bundle (la-bundle@1) before it is uploaded.

Run with Python 3.9 or later and no packages:

    python3 build-spec/check/check_bundle.py BUNDLE.json           # human-readable report
    python3 build-spec/check/check_bundle.py BUNDLE.json --json    # machine-readable report

It exits 0 when there are no errors (warnings allowed), 1 when there is at least one error,
and 2 on bad usage or input that cannot be read as JSON.

What it checks, in order (domains/curriculum.md section 3, Release validation):

  bundle_invalid   the bundle against contracts/curriculum.bundle.schema.json, resolving $ref into
                   common.openapi.json and curriculum.openapi.json; then the format rules the schema
                   states in its descriptions but cannot express (unique keys, one content object per
                   module_key, references that resolve, each step body against the one definition
                   its section_id names, reading and guide body rules). Any failure here stops
                   every later check.
  release checks   position_duplicate, unit_empty, story_missing (the story record only),
                   shelf_invalid, item_placement_invalid, section_id_invalid, estimate_invalid,
                   access_rule_broken (steps only), module_key_reused (against this bundle's own
                   retired list), item_shape_invalid (the parts that need no answer checker),
                   gloss_taught, and phrases_missing as a warning.

NOT_CHECKED lists what needs a database, an earlier published version or the shared JavaScript
answer checker. Every report repeats it, so a pass here is never read as a full validation.

Another program can import it: check_bundle(bundle_dict) and check_file(path) return the same
report the --json flag prints.
"""
import json
import os
import re
import sys
from decimal import Decimal, InvalidOperation

HERE = os.path.dirname(os.path.abspath(__file__))
CONTRACTS = os.path.join(os.path.dirname(HERE), "contracts")
BUNDLE_SCHEMA = "curriculum.bundle.schema.json"
CONTRACT_FILES = (BUNDLE_SCHEMA, "common.openapi.json", "curriculum.openapi.json")
FORMAT = "la-bundle@1"
MAX_BYTES = 10_000_000  # curriculum_create_catalog_release body cap, "10 MB"

USAGE = "usage: python3 check_bundle.py <bundle.json> [--json]"

NOT_CHECKED = [
    {"code": "module_key_missing", "needs": "the published version",
     "what": "a key in the published version that this bundle drops without retiring it"},
    {"code": "module_key_reused", "needs": "earlier versions",
     "what": "a key retired in an earlier version that this bundle's retired list leaves out; "
             "keys on this bundle's own retired list are checked"},
    {"code": "alias_missing", "needs": "the database (curriculum.step_aliases)",
     "what": "a stored section_id with no prototype alias"},
    {"code": "word_id_changed", "needs": "the published version",
     "what": "a word_id whose spelling and meaning both changed"},
    {"code": "item_id_reused", "needs": "the published version",
     "what": "an item_id whose question changed meaning"},
    {"code": "content_unreviewed", "needs": "the database and the release diff",
     "what": "lesson content that changed with no entry in the release's diff"},
    {"code": "story_missing", "needs": "the story file",
     "what": "that the story's text exists; only the story record is checked here. Art is not required: "
             "a story with cover null ships text-only"},
    {"code": "item_shape_invalid", "needs": "the shared JavaScript answer checker (C-LAY-5)",
     "what": "an accepted answer the checker rejects or a named mistake it accepts, and legacy-mode "
             "item shapes; blank keys, key shapes, choice ids and ___ markers are checked here"},
    {"code": "access_rule_broken", "needs": "curriculum's access manifest",
     "what": "that a Reference page's text needs Premium; the bundle carries no access tier for "
             "Reference pages, only for steps, and steps are checked here"},
]

# Fixed steps per entry kind, in order (domains/curriculum.md section 2, Catalog entries and steps).
STEPS_BY_KIND = {
    "lesson": ["vocabulary-intro", "pronunciation", "flash-cards", "speed-match", "writing",
               "conversation", "lesson-exam"],
    "guide": ["interactive-help"],
    "reading": ["reading-passage"],
    "practice": ["practice-exercises"],
    "unit_exam": ["exam-questions"],
}
# Steps an entry of a kind may add, each right after the step it names: a lesson that teaches a verb's forms adds
# verb-forms after vocabulary-intro (domains/curriculum.md section 2, the verb step).
OPTIONAL_STEPS = {"lesson": {"verb-forms": "vocabulary-intro"}}
REFERENCE_PART = "reference-content"
FREE_UNIT = "unit1"
FREE_STEP_OUTSIDE_UNIT1 = "vocabulary-intro"

# Answer-key shape (told apart by its one required property) allowed for each item kind.
SHAPE_BY_PROPERTY = {"accept": "TypedAnswerKey", "blanks": "BlanksAnswerKey",
                     "correct_choice_id": "ChoiceAnswerKey", "pairs": "PairAnswerKey"}
SHAPES_BY_ITEM_KIND = {
    "typed": {"TypedAnswerKey", "BlanksAnswerKey"},
    "story_question": {"TypedAnswerKey", "BlanksAnswerKey"},
    "choice": {"ChoiceAnswerKey"},
    "pair": {"PairAnswerKey"},
    "guide_check": {"ChoiceAnswerKey"},
}
BLANK_MARKER = re.compile(r"_{3,}")
# A gloss and a word are the same form when they match after this: lower case, every apostrophe a keyboard types
# as ', and each run of spaces as one space (the prototype's tap-a-word matcher reads text the same way).
APOSTROPHES = re.compile("[\u2019\u2018\u02bc`]")


def same_form(text):
    return re.sub(r"\s+", " ", APOSTROPHES.sub("'", text.lower())).strip()

# The one body definition each of these steps holds (BundleStepContent.body). The schema's anyOf
# also allows any object, so format_rules validates these bodies again against their own definition.
BODY_BY_SECTION = {
    "vocabulary-intro": ("VocabularyIntroBody", "curriculum.openapi.json#/components/schemas/VocabularyIntroBody"),
    "verb-forms": ("VerbFormsBody", "curriculum.openapi.json#/components/schemas/VerbFormsBody"),
    "reference-content": ("ReferenceBody", "curriculum.openapi.json#/components/schemas/ReferenceBody"),
    "interactive-help": ("GuideBody", "#/$defs/GuideBody"),
    "reading-passage": ("ReadingBody", "#/$defs/ReadingBody"),
}


# ====================================================================== JSON pointers and input

def ptr(*parts):
    """JSON pointer (RFC 6901) from path parts."""
    return "".join("/" + str(p).replace("~", "~0").replace("/", "~1") for p in parts)


def join(base, *parts):
    return base + ptr(*parts)


class InputError(Exception):
    """The input cannot be read as JSON. Exit code 2."""


class _Obj(dict):
    """A parsed JSON object that remembers keys it saw twice."""
    dupes = ()


def _pairs(pairs):
    obj = _Obj()
    seen = []
    for k, v in pairs:
        if k in obj:
            seen.append(k)
        obj[k] = v
    if seen:
        obj.dupes = tuple(seen)
    return obj


def _no_constant(name):
    raise ValueError(f"{name} is not valid JSON")


def parse_json(text):
    try:
        return json.loads(text, object_pairs_hook=_pairs, parse_constant=_no_constant)
    except ValueError as ex:
        raise InputError(f"not valid JSON: {ex}") from None


def read_file(path):
    try:
        with open(path, "rb") as fh:
            raw = fh.read()
    except OSError as ex:
        raise InputError(f"cannot read {path}: {ex.strerror or ex}") from None
    try:
        text = raw.decode("utf-8")
    except UnicodeDecodeError as ex:
        raise InputError(f"{path} is not UTF-8: {ex}") from None
    return parse_json(text), len(raw)


def duplicate_keys(node, at=""):
    """Yield (pointer, key) for every key that appears twice in one JSON object."""
    if isinstance(node, dict):
        for k in getattr(node, "dupes", ()):
            yield join(at, k), k
        for k, v in node.items():
            yield from duplicate_keys(v, join(at, k))
    elif isinstance(node, list):
        for i, v in enumerate(node):
            yield from duplicate_keys(v, join(at, i))


# ====================================================================== schema validator

SUPPORTED = {
    "type", "required", "properties", "additionalProperties", "items", "enum", "const", "oneOf",
    "anyOf", "minItems", "maxItems", "maxLength", "minLength", "minimum", "maximum", "multipleOf",
    "pattern", "propertyNames", "$ref",
}
ANNOTATIONS = {"$schema", "$defs", "$comment", "title", "description", "examples", "default"}


class SchemaUnsupported(Exception):
    """The schema uses a keyword this validator does not implement, so it refuses to run."""


class SchemaError:
    __slots__ = ("pointer", "keyword", "message", "schema_at")

    def __init__(self, pointer, keyword, message, schema_at):
        self.pointer, self.keyword, self.message, self.schema_at = pointer, keyword, message, schema_at

    def detail(self):
        where = self.pointer or "(bundle root)"
        return f"{where}: {self.keyword}: {self.message} (schema {self.schema_at})"

    def __repr__(self):
        return f"SchemaError({self.detail()!r})"


def load_contracts(directory=CONTRACTS):
    docs = {}
    for name in CONTRACT_FILES:
        path = os.path.join(directory, name)
        try:
            with open(path, encoding="utf-8") as fh:
                docs[name] = json.load(fh)
        except (OSError, ValueError) as ex:
            raise InputError(f"cannot load contract {path}: {ex}") from None
    return docs


def json_type(value):
    if value is None:
        return "null"
    if isinstance(value, bool):
        return "boolean"
    if isinstance(value, int):
        return "integer"
    if isinstance(value, float):
        return "number"
    if isinstance(value, str):
        return "string"
    if isinstance(value, list):
        return "array"
    return "object"


def is_type(value, name):
    actual = json_type(value)
    if name == "number":
        return actual in ("integer", "number")
    if name == "integer":
        return actual == "integer" or (actual == "number" and value.is_integer())
    return actual == name


def json_equal(a, b):
    """Equality by JSON value, so true is not 1 and 1 equals 1.0."""
    ta, tb = json_type(a), json_type(b)
    numeric = ("integer", "number")
    if ta in numeric and tb in numeric:
        return a == b
    if ta != tb:
        return False
    if ta == "array":
        return len(a) == len(b) and all(json_equal(x, y) for x, y in zip(a, b))
    if ta == "object":
        return a.keys() == b.keys() and all(json_equal(a[k], b[k]) for k in a)
    return a == b


def is_multiple(value, divisor):
    try:
        return (Decimal(repr(value)) % Decimal(repr(divisor))) == 0
    except (InvalidOperation, ZeroDivisionError):
        return False


class Validator:
    """A JSON Schema 2020-12 validator for the keywords in SUPPORTED, with $ref across files."""

    def __init__(self, docs):
        self.docs = docs
        self._patterns = {}

    # ---------------------------------------------------------------- refs
    def resolve(self, doc_name, ref):
        file_part, _, fragment = ref.partition("#")
        target = file_part or doc_name
        if target not in self.docs:
            raise SchemaUnsupported(f"$ref {ref!r} from {doc_name} names a file the checker does not load")
        node = self.docs[target]
        for part in [p for p in fragment.split("/") if p]:
            part = part.replace("~1", "/").replace("~0", "~")
            try:
                node = node[int(part)] if isinstance(node, list) else node[part]
            except (KeyError, IndexError, ValueError, TypeError):
                raise SchemaUnsupported(f"$ref {ref!r} from {doc_name} does not resolve") from None
        return target, node, f"{target}#{fragment}"

    # ---------------------------------------------------------------- keyword scan
    def scan(self, schema, doc_name, at, seen=None):
        """Refuse any keyword the validator would otherwise ignore."""
        seen = set() if seen is None else seen
        if isinstance(schema, bool):
            return
        if not isinstance(schema, dict):
            raise SchemaUnsupported(f"{at}: a schema must be an object or a boolean")
        for key in schema:
            if key in SUPPORTED or key in ANNOTATIONS or key.startswith("x-"):
                continue
            raise SchemaUnsupported(f"{at}: keyword {key!r} is not supported by check_bundle.py")
        subs = []
        for key in ("properties", "$defs"):
            for name, sub in schema.get(key, {}).items():
                subs.append((sub, f"{at}/{key}/{name}"))
        for key in ("items", "propertyNames"):
            if key in schema:
                subs.append((schema[key], f"{at}/{key}"))
        if isinstance(schema.get("additionalProperties"), dict):
            subs.append((schema["additionalProperties"], f"{at}/additionalProperties"))
        for key in ("oneOf", "anyOf"):
            for i, sub in enumerate(schema.get(key, [])):
                subs.append((sub, f"{at}/{key}/{i}"))
        for sub, sub_at in subs:
            self.scan(sub, doc_name, sub_at, seen)
        if "$ref" in schema:
            target, node, label = self.resolve(doc_name, schema["$ref"])
            if label not in seen:
                seen.add(label)
                self.scan(node, target, label, seen)

    # ---------------------------------------------------------------- validation
    def validate(self, instance, schema, doc_name=BUNDLE_SCHEMA, schema_at=None, at=""):
        """Errors for instance against schema; at is the instance's pointer, prefixed to every error."""
        schema_at = schema_at or f"{doc_name}#"
        self.scan(schema, doc_name, schema_at)
        errors = []
        self._check(instance, schema, doc_name, at, schema_at, errors)
        return errors

    def _pattern(self, pattern):
        if pattern not in self._patterns:
            self._patterns[pattern] = re.compile(pattern)
        return self._patterns[pattern]

    def _branches(self, instance, schema, keyword, doc_name, at, schema_at):
        results = []
        for i, sub in enumerate(schema[keyword]):
            errs = []
            self._check(instance, sub, doc_name, at, f"{schema_at}/{keyword}/{i}", errs)
            label = sub.get("$ref", "").rsplit("/", 1)[-1] if isinstance(sub, dict) and "$ref" in sub else None
            if not label and isinstance(sub, dict) and "type" in sub:
                label = "type " + "/".join(sub["type"] if isinstance(sub["type"], list) else [sub["type"]])
            results.append((label or f"option {i}", errs))
        return results

    def _no_branch(self, keyword, results, at, schema_at, errors):
        """No option matched: report the one clearly closest option's errors, or name them all."""
        def rank(item):
            _, errs = item
            wrong_type = any(e.pointer == at and e.keyword == "type" for e in errs)
            return (wrong_type, len(errs))
        ranked = sorted(results, key=rank)
        if len(ranked) == 1 or rank(ranked[0]) < rank(ranked[1]):
            label, errs = ranked[0]
            for e in errs:
                errors.append(SchemaError(e.pointer, e.keyword, f"{e.message} (closest {keyword} option: {label})",
                                          e.schema_at))
        else:
            names = ", ".join(label for label, _ in results)
            errors.append(SchemaError(at, keyword, f"matches none of: {names}", schema_at))

    def _check(self, inst, schema, doc_name, at, schema_at, errors):
        if schema is True:
            return
        if schema is False:
            errors.append(SchemaError(at, "false", "no value is allowed here", schema_at))
            return
        if "$ref" in schema:
            target, node, label = self.resolve(doc_name, schema["$ref"])
            self._check(inst, node, target, at, label, errors)

        if "type" in schema:
            types = schema["type"] if isinstance(schema["type"], list) else [schema["type"]]
            if not any(is_type(inst, t) for t in types):
                errors.append(SchemaError(at, "type", f"expected {' or '.join(types)}, found {json_type(inst)}",
                                          schema_at))
                return
        if "const" in schema and not json_equal(inst, schema["const"]):
            errors.append(SchemaError(at, "const", f"must be {json.dumps(schema['const'])}", schema_at))
        if "enum" in schema and not any(json_equal(inst, e) for e in schema["enum"]):
            allowed = ", ".join(json.dumps(e, ensure_ascii=False) for e in schema["enum"])
            errors.append(SchemaError(at, "enum", f"{json.dumps(inst, ensure_ascii=False)} is not one of {allowed}",
                                      schema_at))

        if isinstance(inst, str):
            if "maxLength" in schema and len(inst) > schema["maxLength"]:
                errors.append(SchemaError(at, "maxLength", f"{len(inst)} characters, more than {schema['maxLength']}",
                                          schema_at))
            if "minLength" in schema and len(inst) < schema["minLength"]:
                errors.append(SchemaError(at, "minLength", f"{len(inst)} characters, fewer than {schema['minLength']}",
                                          schema_at))
            if "pattern" in schema and not self._pattern(schema["pattern"]).search(inst):
                errors.append(SchemaError(at, "pattern", f"{inst!r} does not match {schema['pattern']}", schema_at))

        if json_type(inst) in ("integer", "number"):
            if "minimum" in schema and inst < schema["minimum"]:
                errors.append(SchemaError(at, "minimum", f"{inst} is less than {schema['minimum']}", schema_at))
            if "maximum" in schema and inst > schema["maximum"]:
                errors.append(SchemaError(at, "maximum", f"{inst} is more than {schema['maximum']}", schema_at))
            if "multipleOf" in schema and not is_multiple(inst, schema["multipleOf"]):
                errors.append(SchemaError(at, "multipleOf", f"{inst} is not a multiple of {schema['multipleOf']}",
                                          schema_at))

        if isinstance(inst, list):
            if "minItems" in schema and len(inst) < schema["minItems"]:
                errors.append(SchemaError(at, "minItems", f"{len(inst)} items, fewer than {schema['minItems']}",
                                          schema_at))
            if "maxItems" in schema and len(inst) > schema["maxItems"]:
                errors.append(SchemaError(at, "maxItems", f"{len(inst)} items, more than {schema['maxItems']}",
                                          schema_at))
            if "items" in schema:
                for i, item in enumerate(inst):
                    self._check(item, schema["items"], doc_name, join(at, i), f"{schema_at}/items", errors)

        if isinstance(inst, dict):
            for name in schema.get("required", []):
                if name not in inst:
                    errors.append(SchemaError(at, "required", f"missing property {name!r}", schema_at))
            props = schema.get("properties", {})
            for name, value in inst.items():
                if name in props:
                    self._check(value, props[name], doc_name, join(at, name), f"{schema_at}/properties/{name}", errors)
                elif "additionalProperties" in schema:
                    extra = schema["additionalProperties"]
                    if extra is False:
                        errors.append(SchemaError(join(at, name), "additionalProperties",
                                                  f"property {name!r} is not allowed here", schema_at))
                    else:
                        self._check(value, extra, doc_name, join(at, name), f"{schema_at}/additionalProperties",
                                    errors)
            if "propertyNames" in schema:
                for name in inst:
                    errs = []
                    self._check(name, schema["propertyNames"], doc_name, join(at, name),
                                f"{schema_at}/propertyNames", errs)
                    for e in errs:
                        errors.append(SchemaError(join(at, name), "propertyNames",
                                                  f"key {name!r}: {e.keyword}: {e.message}", e.schema_at))

        if "oneOf" in schema:
            results = self._branches(inst, schema, "oneOf", doc_name, at, schema_at)
            matched = [label for label, errs in results if not errs]
            if not matched:
                self._no_branch("oneOf", results, at, schema_at, errors)
            elif len(matched) > 1:
                errors.append(SchemaError(at, "oneOf", f"matches {len(matched)} options ({', '.join(matched)}); "
                                          "exactly one is allowed", schema_at))
        if "anyOf" in schema:
            results = self._branches(inst, schema, "anyOf", doc_name, at, schema_at)
            if not any(not errs for _, errs in results):
                self._no_branch("anyOf", results, at, schema_at, errors)


def validate(instance, schema, docs=None, doc_name=BUNDLE_SCHEMA):
    """Validate instance against schema, with $ref resolved in the contract files. Returns SchemaErrors."""
    return Validator(docs if docs is not None else load_contracts()).validate(instance, schema, doc_name)


# ====================================================================== report helpers

class Report:
    def __init__(self):
        self.problems = []

    def error(self, code, pointer, detail):
        self.problems.append({"code": code, "severity": "error", "pointer": pointer, "detail": detail})

    def warning(self, code, pointer, detail):
        self.problems.append({"code": code, "severity": "warning", "pointer": pointer, "detail": detail})

    def as_dict(self):
        ok = not any(p["severity"] == "error" for p in self.problems)
        return {"schema": FORMAT, "ok": ok, "problems": self.problems, "not_checked": NOT_CHECKED}


def index_by(rows, key, base):
    """Map key value -> (index, row, pointer) for the first row with each value."""
    out = {}
    for i, row in enumerate(rows):
        out.setdefault(row[key], (i, row, join(base, i)))
    return out


# ====================================================================== format rules (bundle_invalid)

def format_rules(b, report, validator):
    """Rules la-bundle@1 states in its descriptions that JSON Schema cannot express."""
    def bad(pointer, rule):
        report.error("bundle_invalid", pointer, f"{pointer}: format rule: {rule}")

    def unique(rows, key, base, label):
        seen = {}
        for i, row in enumerate(rows):
            value = row[key]
            if value in seen:
                bad(join(base, i, key), f"{key} {value!r} appears twice in {label} (first at {join(base, seen[value], key)})")
            else:
                seen[value] = i

    unique(b["units"], "unit_key", "/units", "units")
    unique(b["entries"], "module_key", "/entries", "entries")
    unique(b["shelf"]["pages"], "module_key", "/shelf/pages", "shelf.pages")
    unique(b["words"], "word_id", "/words", "words")
    unique(b["stories"], "story_id", "/stories", "stories")
    unique(b["content"], "module_key", "/content", "content")
    unique(b["retired"], "module_key", "/retired", "retired")

    units = {u["unit_key"] for u in b["units"]}
    entries = index_by(b["entries"], "module_key", "/entries")
    shelf = index_by(b["shelf"]["pages"], "module_key", "/shelf/pages")
    content = index_by(b["content"], "module_key", "/content")
    words = {w["word_id"] for w in b["words"]}

    for i, e in enumerate(b["entries"]):
        at = join("/entries", i)
        if e["unit_key"] not in units:
            bad(join(at, "unit_key"), f"unit_key {e['unit_key']!r} names no unit in units")
        after = e["guide_after_module_key"]
        if after is not None and after not in entries:
            bad(join(at, "guide_after_module_key"), f"guide_after_module_key {after!r} names no entry in entries")
        if e["module_key"] not in content:
            bad(join(at, "module_key"), f"entry {e['module_key']!r} has no content object; content holds one per "
                                        "entry and Reference page")
        else:
            c = content[e["module_key"]][1]
            if c["kind"] != e["kind"]:
                bad(join(content[e["module_key"]][2], "kind"),
                    f"content kind {c['kind']!r} differs from its entry's kind {e['kind']!r}")

    for i, page in enumerate(b["shelf"]["pages"]):
        if page["module_key"] not in content:
            bad(join("/shelf/pages", i, "module_key"),
                f"shelf page {page['module_key']!r} has no content object; content holds one per entry and Reference page")

    for i, c in enumerate(b["content"]):
        at = join("/content", i)
        if c["module_key"] not in entries and c["module_key"] not in shelf:
            bad(join(at, "module_key"), f"content for {c['module_key']!r}, which is neither an entry nor a shelf page")
        unique(c["items"], "item_id", join(at, "items"), f"the items of {c['module_key']}")
        unique(c["phrases"], "phrase_id", join(at, "phrases"), f"the phrases of {c['module_key']}")
        for j, w in enumerate(c["words"]):
            if w["word_id"] not in words:
                bad(join(at, "words", j, "word_id"), f"word_id {w['word_id']!r} is not in the bundle's words")
        for j, item in enumerate(c["items"]):
            for k, wid in enumerate(item["word_ids"]):
                if wid not in words:
                    bad(join(at, "items", j, "word_ids", k), f"word_id {wid!r} is not in the bundle's words")
        for j, ph in enumerate(c["phrases"]):
            if ph["word_id"] is not None and ph["word_id"] not in words:
                bad(join(at, "phrases", j, "word_id"), f"word_id {ph['word_id']!r} is not in the bundle's words")

    form = b["placement_form"]
    if form is not None:
        ordinal = {u["unit_key"]: u["ordinal"] for u in b["units"]}
        before = None
        for i, level in enumerate(form["levels"]):
            at = join("/placement_form/levels", i)
            if level["level"] != i + 1:
                bad(join(at, "level"), f"placement level {level['level']} is at place {i + 1}; levels count from 1 in order")
            if level["unit_key"] not in units:
                bad(join(at, "unit_key"),
                    f"placement level places into {level['unit_key']!r}, which is not in units")
                continue
            # A learner who fails a level starts at its unit, so each level's unit must come later in the
            # course than the unit of the level before it.
            if before is not None and ordinal[level["unit_key"]] <= ordinal[before]:
                bad(join(at, "unit_key"),
                    f"placement level {level['level']} places into {level['unit_key']!r}, which does not come after "
                    f"{before!r}, the unit of the level before it; levels rise in course order")
            before = level["unit_key"]

    stories = {s["story_id"] for s in b["stories"]}
    for i, c in enumerate(b["content"]):
        entry = entries[c["module_key"]][1] if c["module_key"] in entries else None
        for j, step in enumerate(c["steps"]):
            step_body(step, join("/content", i, "steps", j), entry, stories, validator, report, bad)


def step_body(step, at, entry, stories, validator, report, bad):
    """A body checked against the one definition its section_id names, then the rules inside it."""
    sid = step["section_id"]
    if sid not in BODY_BY_SECTION:
        return
    name, ref = BODY_BY_SECTION[sid]
    bat = join(at, "body")
    errors = validator.validate(step["body"], {"$ref": ref}, BUNDLE_SCHEMA, at=bat)
    for err in errors:
        report.error("bundle_invalid", err.pointer, f"{err.detail()}; the body of step {sid} is a {name}")
    if errors:
        return
    body = step["body"]

    if name == "GuideBody":
        seen = {}
        for n, part in enumerate(body["parts"]):
            if part["id"] in seen:
                bad(join(bat, "parts", n, "id"), f"guide part id {part['id']!r} appears twice in this guide "
                                                 f"(first at {join(bat, 'parts', seen[part['id']], 'id')})")
            else:
                seen[part["id"]] = n

    elif name == "ReadingBody":
        seen = {}
        for n, block in enumerate(body["passage"]):
            pat = join(bat, "passage", n)
            if "fr" in block and "en" not in block:
                bad(pat, f"passage block {block['id']!r} has fr but no en; a block with fr also has en")
            if "fr" not in block and "en" not in block and "img" not in block:
                bad(pat, f"passage block {block['id']!r} has neither fr nor en, so it needs img")
            if block["id"] in seen:
                bad(join(pat, "id"), f"passage block id {block['id']!r} appears twice "
                                     f"(first at {join(bat, 'passage', seen[block['id']], 'id')})")
            else:
                seen[block["id"]] = n
        for n, bid in enumerate(body.get("preview_blocks", [])):
            if bid not in seen:
                bad(join(bat, "preview_blocks", n), f"preview block {bid!r} names no passage block")
        # When the body matches its entry, a story missing from stories is the entry's story_missing.
        story = body["story_id"]
        sat = join(bat, "story_id")
        unknown = "names no story in stories" if story not in stories else ""
        if entry is None:
            if unknown:
                bad(sat, f"story_id {story!r} {unknown}")
        elif story != entry["story_id"]:
            differs = f"differs from its entry's story_id {entry['story_id']!r}"
            bad(sat, f"story_id {story!r} {unknown + ' and ' if unknown else ''}{differs}")


# ====================================================================== release checks

def release_checks(b, report):
    entries = b["entries"]
    by_key = index_by(entries, "module_key", "/entries")
    shelf = index_by(b["shelf"]["pages"], "module_key", "/shelf/pages")
    content = index_by(b["content"], "module_key", "/content")
    stories = {s["story_id"] for s in b["stories"]}

    # ---------------------------------------------------------------- position_duplicate
    def duplicates(rows, key, base, scope):
        seen = {}
        for i, row in enumerate(rows):
            group = (scope(row), row[key])
            if group in seen:
                report.error("position_duplicate", join(base, i, key),
                             f"{key} {row[key]} is used twice{(' in ' + group[0]) if group[0] else ''}: "
                             f"{join(base, seen[group])} and {join(base, i)}")
            else:
                seen[group] = i

    duplicates(b["units"], "ordinal", "/units", lambda _u: "")
    duplicates(entries, "position", "/entries", lambda e: e["unit_key"])
    for i, e in enumerate(entries):
        duplicates(e["steps"], "ordinal", join("/entries", i, "steps"), lambda _s, k=e["module_key"]: k)
    duplicates(b["shelf"]["pages"], "ordinal", "/shelf/pages", lambda _p: "the shelf")

    # ---------------------------------------------------------------- unit_empty
    used = {e["unit_key"] for e in entries}
    for i, u in enumerate(b["units"]):
        if u["unit_key"] not in used:
            report.error("unit_empty", join("/units", i), f"unit {u['unit_key']!r} has no entries")

    # ---------------------------------------------------------------- module_key_reused
    retired = {r["module_key"]: i for i, r in enumerate(b["retired"])}
    for base, rows, label in (("/entries", entries, "an entry"), ("/shelf/pages", b["shelf"]["pages"], "a shelf page")):
        for i, row in enumerate(rows):
            if row["module_key"] in retired:
                report.error("module_key_reused", join(base, i, "module_key"),
                             f"{row['module_key']!r} is {label} but is listed as retired at "
                             f"{join('/retired', retired[row['module_key']])}; a retired key never comes back")

    # ---------------------------------------------------------------- story_missing
    for i, e in enumerate(entries):
        if e["kind"] != "reading":
            continue
        at = join("/entries", i, "story_id")
        if e["story_id"] is None:
            report.error("story_missing", at, f"reading {e['module_key']!r} has no story_id")
        elif e["story_id"] not in stories:
            report.error("story_missing", at, f"reading {e['module_key']!r} names story {e['story_id']!r}, "
                                              "which has no row in stories")

    # ---------------------------------------------------------------- shelf_invalid
    for i, page in enumerate(b["shelf"]["pages"]):
        key = page["module_key"]
        at = join("/shelf/pages", i, "module_key")
        if key in by_key:
            e = by_key[key][1]
            if e["kind"] == "guide":
                report.error("shelf_invalid", at, f"guide {key!r} is listed as a shelf row; guides appear on the "
                                                  "shelf by their own key, in course order, with no row")
            else:
                report.error("shelf_invalid", at, f"{key!r} is a {e['kind']} in {e['unit_key']} and also a shelf "
                                                  "row; a key is a unit entry or a Reference page, never both")
        elif content[key][1]["kind"] != "reference":
            report.error("shelf_invalid", at, f"shelf row {key!r} has content of kind "
                                              f"{content[key][1]['kind']!r}, so it is not a Reference page")
    for i, c in enumerate(b["content"]):
        if c["kind"] == "reference" and c["module_key"] not in shelf:
            report.error("shelf_invalid", join("/content", i, "kind"),
                         f"Reference page content {c['module_key']!r} has no row on the shelf")

    # ---------------------------------------------------------------- section_id_invalid, estimate_invalid,
    #                                                                  access_rule_broken
    for i, e in enumerate(entries):
        at = join("/entries", i)
        ids = [s["section_id"] for s in e["steps"]]
        optional = OPTIONAL_STEPS.get(e["kind"], {})
        fixed = list(STEPS_BY_KIND[e["kind"]])
        # An optional step the entry has sits right after the step it follows; one it lacks is not expected.
        for sid, after in optional.items():
            if sid in ids and after in fixed:
                fixed.insert(fixed.index(after) + 1, sid)
        for j, sid in enumerate(ids):
            if sid not in fixed:
                report.error("section_id_invalid", join(at, "steps", j, "section_id"),
                             f"{sid!r} is not a step of a {e['kind']}; a {e['kind']} has {', '.join(fixed)}")
            elif sid in ids[:j]:
                report.error("section_id_invalid", join(at, "steps", j, "section_id"),
                             f"step {sid!r} appears twice in {e['module_key']}")
        missing = [sid for sid in fixed if sid not in ids and sid not in optional]
        if missing:
            report.error("section_id_invalid", join(at, "steps"),
                         f"{e['module_key']} lacks {', '.join(missing)}; steps are fixed per kind")
        elif ids != fixed and len(ids) == len(fixed):
            report.error("section_id_invalid", join(at, "steps"),
                         f"{e['module_key']} has its steps out of order; a {e['kind']} runs {', '.join(fixed)}")

        for j, s in enumerate(e["steps"]):
            sat = join(at, "steps", j)
            if s["counted"] and s["estimate_minutes"] <= 0:
                report.error("estimate_invalid", join(sat, "estimate_minutes"),
                             f"step {s['section_id']!r} of {e['module_key']} counts toward completion but has no "
                             f"estimate ({s['estimate_minutes']} minutes)")
            if e["unit_key"] == FREE_UNIT:
                want = "free"
                rule = f"every step in {FREE_UNIT} is free"
            elif s["section_id"] == FREE_STEP_OUTSIDE_UNIT1:
                want = "free"
                rule = f"{FREE_STEP_OUTSIDE_UNIT1} is free in every unit"
            else:
                want = "premium"
                rule = f"outside {FREE_UNIT} only {FREE_STEP_OUTSIDE_UNIT1} is free"
            if s["access_tier"] != want:
                report.error("access_rule_broken", join(sat, "access_tier"),
                             f"step {s['section_id']!r} of {e['module_key']} in {e['unit_key']} is "
                             f"{s['access_tier']}; {rule} (LRN-4)")

    # ---------------------------------------------------------------- item_placement_invalid,
    #                                                                  item_shape_invalid, gloss_taught,
    #                                                                  phrases_missing
    for i, c in enumerate(b["content"]):
        at = join("/content", i)
        key = c["module_key"]
        if key in by_key:
            entry = by_key[key][1]
            expected = [s["section_id"] for s in entry["steps"]]
            owner = f"entry {key}"
        else:
            entry = None
            expected = [REFERENCE_PART]
            owner = f"Reference page {key}"
        items = {item["item_id"] for item in c["items"]}
        seen_steps = {}
        for j, step in enumerate(c["steps"]):
            sat = join(at, "steps", j)
            sid = step["section_id"]
            if sid not in expected:
                report.error("item_placement_invalid", join(sat, "section_id"),
                             f"content names step {sid!r}, which {owner} does not have")
            if sid in seen_steps:
                report.error("item_placement_invalid", join(sat, "section_id"),
                             f"step {sid!r} has two content objects ({join(at, 'steps', seen_steps[sid])} and {sat})")
            else:
                seen_steps[sid] = j
            asked = set()
            for k, item_id in enumerate(step["item_ids"]):
                if item_id not in items:
                    report.error("item_placement_invalid", join(sat, "item_ids", k),
                                 f"step {sid!r} places item {item_id!r}, which the items of {key} lack")
                elif item_id in asked:
                    report.error("item_placement_invalid", join(sat, "item_ids", k),
                                 f"step {sid!r} places item {item_id!r} twice")
                asked.add(item_id)
        for sid in expected:
            if sid not in seen_steps:
                report.error("item_placement_invalid", join(at, "steps"),
                             f"step {sid!r} of {owner} has no content object; content holds one per step")

        for j, item in enumerate(c["items"]):
            item_shape(item, join(at, "items", j), key, report)

        # A word new to the learner is taught as a card; a gloss is a form the learner already knows. A form that
        # is both would be taught and glossed in the same module.
        taught = {same_form(w["text"]): n for n, w in enumerate(c["words"])}
        for j, g in enumerate(c.get("glosses", [])):
            if same_form(g["fr"]) in taught:
                report.error("gloss_taught", join(at, "glosses", j, "fr"),
                             f"gloss {g['fr']!r} of {key} is the word {join(at, 'words', taught[same_form(g['fr'])])}; "
                             "a word of the module is taught as a card, so it is never also glossed")

        if entry is not None and entry["kind"] == "lesson" and not c["phrases"]:
            report.warning("phrases_missing", join(at, "phrases"),
                           f"lesson {key} has no pronunciation phrases, so release creation marks its "
                           "Pronunciation step Soon and not counted")


def item_shape(item, at, module_key, report):
    """The parts of item_shape_invalid that need no answer checker."""
    def bad(pointer, detail):
        report.error("item_shape_invalid", pointer, f"item {item['item_id']!r} of {module_key}: {detail}")

    kind = item["kind"]
    key = item["answer_key"]  # the schema requires one and never allows null
    allowed = SHAPES_BY_ITEM_KIND[kind]
    kat = join(at, "answer_key")
    shape = next(SHAPE_BY_PROPERTY[p] for p in SHAPE_BY_PROPERTY if p in key)
    if shape not in allowed:
        bad(kat, f"a {kind} item takes {' or '.join(sorted(allowed))}, not {shape}")
        return

    def blank_answers(accept, base):
        for n, answer in enumerate(accept):
            if not answer.strip():
                bad(join(base, n), "an accepted answer is blank")

    if shape == "TypedAnswerKey":
        blank_answers(key["accept"], join(kat, "accept"))
    elif shape == "BlanksAnswerKey":
        for n, blank in enumerate(key["blanks"]):
            blank_answers(blank["accept"], join(kat, "blanks", n, "accept"))
        markers = len(BLANK_MARKER.findall(item["prompt"]["text"]))
        if markers != len(key["blanks"]):
            bad(join(kat, "blanks"), f"prompt.text has {markers} ___ marker(s) and the key has "
                                     f"{len(key['blanks'])} blank(s); they must match, in order")
    elif shape == "ChoiceAnswerKey":
        choices = item.get("choices") or []
        ids = [ch["choice_id"] for ch in choices]
        if not choices:
            bad(join(at, "choices"), f"a {kind} item needs choices")
        for n, cid in enumerate(ids):
            if cid in ids[:n]:
                bad(join(at, "choices", n, "choice_id"), f"choice_id {cid!r} appears twice")
        if not key["correct_choice_id"].strip():
            bad(join(kat, "correct_choice_id"), "correct_choice_id is blank")
        elif choices and key["correct_choice_id"] not in ids:
            bad(join(kat, "correct_choice_id"), f"correct_choice_id {key['correct_choice_id']!r} is not one of "
                                                f"the item's choices ({', '.join(ids)})")
        for n, m in enumerate(key.get("mistakes", [])):
            if choices and m["choice_id"] not in ids:
                bad(join(kat, "mistakes", n, "choice_id"), f"named mistake {m['choice_id']!r} is not one of the choices")
            elif m["choice_id"] == key["correct_choice_id"]:
                bad(join(kat, "mistakes", n, "choice_id"), "the correct choice is also named as a mistake")
    elif shape == "PairAnswerKey":
        # The cards are the item's choices; every card is in exactly one pair.
        ids = [ch["choice_id"] for ch in item.get("choices") or []]
        used = {}
        for n, pair in enumerate(key["pairs"]):
            for side in ("left_id", "right_id"):
                cid = pair[side]
                if not cid.strip():
                    bad(join(kat, "pairs", n, side), f"{side} is blank")
                elif cid not in ids:
                    bad(join(kat, "pairs", n, side), f"card {cid!r} is not one of the item's choices ({', '.join(ids)})")
                elif cid in used:
                    bad(join(kat, "pairs", n, side), f"card {cid!r} is already in pair {used[cid]}")
                else:
                    used[cid] = n
        for n, cid in enumerate(ids):
            if cid not in used:
                bad(join(at, "choices", n, "choice_id"), f"card {cid!r} is in no pair")


# ====================================================================== entry points

def check_bundle(bundle, size_bytes=None, docs=None):
    """Check a parsed bundle. Returns {schema, ok, problems, not_checked}."""
    report = Report()
    if size_bytes is not None and size_bytes > MAX_BYTES:
        report.error("bundle_invalid", "", f"(bundle root): size: {size_bytes} bytes, over the {MAX_BYTES}-byte "
                                           "body cap of curriculum_create_catalog_release")
        return report.as_dict()
    for pointer, key in duplicate_keys(bundle):
        report.error("bundle_invalid", pointer, f"{pointer}: JSON: key {key!r} appears twice in one object")
    docs = docs if docs is not None else load_contracts()
    validator = Validator(docs)
    for err in validator.validate(bundle, docs[BUNDLE_SCHEMA], BUNDLE_SCHEMA):
        report.error("bundle_invalid", err.pointer, err.detail())
    if report.problems:
        return report.as_dict()
    format_rules(bundle, report, validator)
    if report.problems:
        return report.as_dict()
    release_checks(bundle, report)
    return report.as_dict()


def check_file(path):
    """Read and check a bundle file. Raises InputError when it cannot be read as JSON."""
    bundle, size = read_file(path)
    return check_bundle(bundle, size_bytes=size)


def human(report, path):
    lines = [f"{FORMAT} check of {path}"]
    for p in report["problems"]:
        lines.append(f"  {p['severity'].upper():7} {p['code']:22} {p['pointer'] or '(root)'}")
        lines.append(f"          {p['detail']}")
    errors = sum(p["severity"] == "error" for p in report["problems"])
    warnings = len(report["problems"]) - errors
    lines.append(f"problems: {errors} error(s), {warnings} warning(s)")
    lines.append("not checked here (needs a database, an earlier version or the JavaScript answer checker):")
    for n in report["not_checked"]:
        lines.append(f"  {n['code']:22} {n['what']} [needs {n['needs']}]")
    if report["ok"]:
        lines.append("result: PASS for the checks above" + (" (with warnings)" if warnings else ""))
    else:
        lines.append("result: FAIL")
    return "\n".join(lines)


def main(argv=None):
    args = list(sys.argv[1:] if argv is None else argv)
    as_json = "--json" in args
    args = [a for a in args if a != "--json"]
    if len(args) != 1 or args[0].startswith("--"):
        print(USAGE, file=sys.stderr)
        return 2
    path = args[0]
    try:
        report = check_file(path)
    except InputError as ex:
        print(f"check_bundle: {ex}", file=sys.stderr)
        return 2
    except SchemaUnsupported as ex:
        print(f"check_bundle: cannot validate against the contracts: {ex}", file=sys.stderr)
        return 2
    if as_json:
        print(json.dumps(report, ensure_ascii=False, indent=2))
    else:
        print(human(report, path))
    return 0 if report["ok"] else 1


if __name__ == "__main__":
    sys.exit(main())
