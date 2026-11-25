// The pipeline's contracts: every document that crosses the seam between the core and its engines, or that the core
// keeps (design §4), has a JSON Schema in pipeline/schemas/. validateContract returns the problems; assertContract
// throws them. The validator loads once, on first use, and loading fails if any schema is malformed.
// A few rules compare one field with another, which JSON Schema cannot state; they sit in CROSS_FIELD and run on a
// document its schema accepts, so each problem is reported once.
import { fileURLToPath } from 'node:url';
import { createValidator } from './json-schema.mjs';

export const SCHEMA_DIR = fileURLToPath(new URL('../../../pipeline/schemas/', import.meta.url));

let validator;
const shared = () => (validator ??= createValidator([SCHEMA_DIR]));

export class ContractError extends Error {
  /** @param {string} id @param {string[]} errors */
  constructor(id, errors) {
    const shown = errors.slice(0, 5).join('; ');
    const more = errors.length > 5 ? `; and ${errors.length - 5} more` : '';
    super(`${id}: ${errors.length} ${errors.length === 1 ? 'problem' : 'problems'}: ${shown}${more}`);
    this.name = 'ContractError';
    this.id = id;
    this.errors = errors;
  }
}

/** @type {Record<string, (doc: any) => string[]>} */
const CROSS_FIELD = {
  // A header task's subject key names its own unit and phase (the schema already ties the phase suffix to the role).
  'la-engine-task@1': (task) => {
    if (task.role !== 'header') return [];
    const expected = `header:${task.unit_key}:${task.header_phase}`;
    return task.module_key === expected ? [] : [`/module_key: ${JSON.stringify(task.module_key)} must be ${JSON.stringify(expected)}, from unit_key and header_phase`];
  },
};

/** Every problem with `doc` as the contract `id` (e.g. 'la-draft@1'), as "<json pointer>: <message>". */
export function validateContract(id, doc) {
  const errors = shared().validate(id, doc);
  if (errors.length > 0 || !Object.hasOwn(CROSS_FIELD, id)) return errors;
  return CROSS_FIELD[id](doc);
}

/** Throws ContractError { id, errors } unless `doc` is a valid `id`. */
export function assertContract(id, doc) {
  const errors = validateContract(id, doc);
  if (errors.length > 0) throw new ContractError(id, errors);
}
