// Pipeline CLI: `pnpm pipeline <command> [args]` (design §5, §6.3). One table of commands; each later task adds its
// own entry. A command's run(args) returns the exit code: 0 done, 1 the command found a problem, 2 a usage error.
import { realpathSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { SCHEMA_DIR } from './contracts/index.mjs';
import { checkModuleSchemas, writeModuleSchemas } from './contracts/module-schema.mjs';

/** @type {Record<string, { args: string, summary: string, run: (args: string[]) => number | Promise<number> }>} */
const COMMANDS = {
  help: { args: '', summary: 'print this list', run: () => (console.log(usage()), 0) },
  'module-schemas': {
    args: '--write|--check [--dir <folder>]',
    summary: 'write pipeline/schemas/la-module@1.<kind>.json from the content validator, or check the committed files',
    run: moduleSchemas,
  },
};

/** `module-schemas --write|--check [--dir <folder>]`: exit 1 on --check when a file is missing or differs. */
function moduleSchemas(args) {
  let mode = null;
  let dir = SCHEMA_DIR;
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if ((a === '--write' || a === '--check') && mode === null) mode = a;
    else if (a === '--dir' && i + 1 < args.length) dir = args[++i];
    else {
      console.error(`module-schemas: ${a === '--write' || a === '--check' ? 'give --write or --check, not both' : `${a}: not an option`}\nusage: pnpm pipeline module-schemas ${COMMANDS['module-schemas'].args}`);
      return 2;
    }
  }
  if (mode === null) {
    console.error(`module-schemas: give --write or --check\nusage: pnpm pipeline module-schemas ${COMMANDS['module-schemas'].args}`);
    return 2;
  }
  // A content table the generator has no rule for (a new item field, say) throws; report it, not a stack trace.
  let stale;
  try {
    if (mode === '--write') {
      for (const file of writeModuleSchemas(dir)) console.log(`wrote ${file}`);
      return 0;
    }
    stale = checkModuleSchemas(dir);
  } catch (e) {
    console.error(`module-schemas: cannot generate the schemas from the content validator's tables: ${e.message}`);
    return 1;
  }
  for (const file of stale) console.error(`${file}: missing or differs from a fresh generation; run pnpm pipeline module-schemas --write`);
  if (stale.length === 0) console.log('module schemas match the content validator');
  return stale.length === 0 ? 0 : 1;
}

function usage() {
  const rows = Object.entries(COMMANDS).map(([name, c]) => [`${name}${c.args ? ` ${c.args}` : ''}`, c.summary]);
  const width = Math.max(...rows.map(([left]) => left.length)) + 2;
  return ['usage: pnpm pipeline <command>', 'commands:', ...rows.map(([left, summary]) => `  ${left.padEnd(width)}${summary}`)].join('\n');
}

export async function main(argv) {
  const [command, ...args] = argv;
  if (command === undefined || command === '--help' || command === '-h') return COMMANDS.help.run([]);
  if (!Object.hasOwn(COMMANDS, command)) {
    console.error(`${command}: not a pipeline command\n${usage()}`);
    return 2;
  }
  return COMMANDS[command].run(args);
}

/** True when this file is the program node was started with, also when started through a symlink to it. */
function isEntryPoint(argv1) {
  if (!argv1) return false;
  try {
    return realpathSync(fileURLToPath(import.meta.url)) === realpathSync(argv1);
  } catch {
    return false;
  }
}

if (isEntryPoint(process.argv[1])) {
  process.exitCode = await main(process.argv.slice(2));
}
