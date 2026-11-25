// Pipeline CLI: `pnpm pipeline <command> [args]` (design §5, §6.3). One table of commands; each later task adds its
// own entry. A command's run(args) returns the exit code: 0 done, 1 the command found a problem, 2 a usage error.
import { realpathSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

/** @type {Record<string, { args: string, summary: string, run: (args: string[]) => number | Promise<number> }>} */
const COMMANDS = {
  help: { args: '', summary: 'print this list', run: () => (console.log(usage()), 0) },
};

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
