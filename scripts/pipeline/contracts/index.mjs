// The pipeline's contracts: every document that crosses the seam between the core and its engines, or that the core
// keeps (design §4), has a JSON Schema in pipeline/schemas/. validateContract returns the problems; assertContract
// throws them. The validator loads once, on first use, and loading fails if any schema is malformed.
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

/** Every problem with `doc` as the contract `id` (e.g. 'la-draft@1'), as "<json pointer>: <message>". */
export function validateContract(id, doc) {
  return shared().validate(id, doc);
}

/** Throws ContractError { id, errors } unless `doc` is a valid `id`. */
export function assertContract(id, doc) {
  const errors = validateContract(id, doc);
  if (errors.length > 0) throw new ContractError(id, errors);
}
