#!/usr/bin/env node

/**
 * Quick Add Word Script
 * Convenience script to run the dictionary utility from project root
 */

import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const utilityPath = path.join(
  __dirname,
  "src/data/dictionary/utils/add-word-to-dictionary.js"
);

// Pass all arguments to the utility
const args = process.argv.slice(2);

console.log("📚 Dictionary Utility - Quick Access");
console.log("Running:", utilityPath);
console.log("Arguments:", args.join(" "));
console.log("");

// Run the utility with all passed arguments
const child = spawn("node", [utilityPath, ...args], {
  stdio: "inherit",
  cwd: __dirname,
});

child.on("close", (code) => {
  process.exit(code);
});

child.on("error", (error) => {
  console.error("❌ Error running utility:", error.message);
  process.exit(1);
});
