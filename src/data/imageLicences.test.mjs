import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const srcDir = join(dirname(fileURLToPath(import.meta.url)), "..");
const repoDir = join(srcDir, "..");
const OLD = "Bordeaux_Place_de_la_Bourse_de_nuit-9d3d63.jpg";
const NEW = "public/img/wikipedia/Bordeaux_Place_de_la_Bourse_nuit_683778.jpg";

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

test("no file under src/ references the Bordeaux picture of unclear copyright", () => {
  const hits = walk(srcDir).filter(
    (f) => f !== fileURLToPath(import.meta.url) && readFileSync(f, "utf8").includes(OLD),
  );
  assert.deepEqual(hits, []);
});

test("the licensed replacement image exists", () => {
  assert.ok(existsSync(join(repoDir, NEW)), `${NEW} is missing`);
});
