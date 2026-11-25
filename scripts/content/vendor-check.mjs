// `content:vendor-check [--check]`: keeps scripts/content/vendor/la-bundle in step with L's build spec in the vault.
// The vendored copy is L's bundle checker and the three contract files it reads, laid out as in the build spec
// (check/ beside contracts/), so tests and CI run L's own checker without the vault.
//
//   (no flag)  copy the four files from the vault and rewrite SOURCE.md with L's commit and each file's SHA-256
//   --check    exit 1 when a vendored file differs from the vault's; with no vault (CI), say so and exit 0
//
// The vault folder is LA_BUILD_SPEC, or ~/dev/agent_workspaces/language_academy/.../prototypes/build-spec.
import { copyFileSync, existsSync, readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

export const VENDOR = fileURLToPath(new URL('./vendor/la-bundle/', import.meta.url));
export const BUILD_SPEC =
  process.env.LA_BUILD_SPEC ??
  join(homedir(), 'dev/agent_workspaces/language_academy/projects/product/mockups/2026-11-23-dashboard-revisions/prototypes/build-spec');
export const FILES = ['check/check_bundle.py', 'contracts/curriculum.bundle.schema.json', 'contracts/common.openapi.json', 'contracts/curriculum.openapi.json'];

const sha = (file) => createHash('sha256').update(readFileSync(file)).digest('hex');
const git = (...args) => execFileSync('git', args, { cwd: BUILD_SPEC, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();

function sourceMd() {
  let commit = 'unknown';
  let head = 'unknown';
  try {
    commit = git('log', '-1', '--format=%h %cI', '--', ...FILES);
    head = git('rev-parse', '--short', 'HEAD');
  } catch {
    // the vault is not a git checkout
  }
  return [
    '# Vendored: L bundle checker (la-bundle@1)',
    '',
    "Copied from prototype L's build spec in the product vault, so `pnpm content:test` and CI run L's own release-bundle checker without the vault. Do not edit these files here: change them in the build spec and run `pnpm content:vendor-check` to copy them again; `pnpm content:vendor-check --check` fails when this copy and the vault differ.",
    '',
    '| | |',
    '|---|---|',
    '| Source | `projects/product/mockups/2026-11-23-dashboard-revisions/prototypes/build-spec/` in the product vault |',
    `| L commit that last changed these files | \`${commit}\` |`,
    `| Vault HEAD when copied | \`${head}\` |`,
    '',
    '| File | SHA-256 |',
    '|---|---|',
    ...FILES.map((f) => `| \`${f}\` | \`${sha(join(VENDOR, f))}\` |`),
    '',
    'Run: `python3 scripts/content/vendor/la-bundle/check/check_bundle.py <bundle.json> [--json]` (Python 3.9 or later, no packages; exit 0 ok, 1 errors, 2 usage). The checker reads `../contracts` beside its own folder, so keep the layout.',
    '',
  ].join('\n');
}

function main(args) {
  const check = args.includes('--check');
  const unknown = args.filter((a) => a !== '--check');
  if (unknown.length) {
    console.error(`${unknown.join(' ')}: not an option\nusage: node scripts/content/vendor-check.mjs [--check]`);
    return 2;
  }
  if (!existsSync(BUILD_SPEC)) {
    if (check) {
      console.log(`no vault at ${BUILD_SPEC}; the vendored copy (${FILES.length} files) is not compared`);
      return 0;
    }
    console.error(`no vault at ${BUILD_SPEC}; set LA_BUILD_SPEC to L's build-spec folder`);
    return 1;
  }
  const differ = FILES.filter((f) => !existsSync(join(VENDOR, f)) || sha(join(VENDOR, f)) !== sha(join(BUILD_SPEC, f)));
  if (check) {
    for (const f of differ) console.error(`differs from the vault: scripts/content/vendor/la-bundle/${f}`);
    if (differ.length) {
      console.error('run `pnpm content:vendor-check` to copy L’s current files');
      return 1;
    }
    console.log(`vendored la-bundle checker matches the vault (${FILES.length} files)`);
    return 0;
  }
  for (const f of FILES) copyFileSync(join(BUILD_SPEC, f), join(VENDOR, f));
  writeFileSync(join(VENDOR, 'SOURCE.md'), sourceMd());
  console.log(`copied ${FILES.length} files from ${BUILD_SPEC}${differ.length ? ` (${differ.length} changed)` : ' (none changed)'}; wrote SOURCE.md`);
  return 0;
}

process.exit(main(process.argv.slice(2)));
