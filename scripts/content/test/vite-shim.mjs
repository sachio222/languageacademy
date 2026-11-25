// Test helper: lets Node import files under src/ that Vite normally bundles (extensionless relative
// imports and import.meta.env). Import this module first, then import app files dynamically.
// Shared by unit9-guard.test.mjs. testRunner.js itself needs no shim (passable.mjs imports it directly);
// lessonData.js and unitConfigLoader.js do.
import { registerHooks } from 'node:module';

registerHooks({
  resolve(specifier, context, nextResolve) {
    try {
      return nextResolve(specifier, context);
    } catch (error) {
      if (!specifier.startsWith('.')) throw error;
      for (const suffix of ['.js', '.jsx', '/index.js']) {
        try {
          return nextResolve(specifier + suffix, context);
        } catch {
          // try the next suffix
        }
      }
      throw error;
    }
  },
  load(url, context, nextLoad) {
    const result = nextLoad(url, context);
    if (!url.startsWith('file:') || !url.includes('/src/')) return result;
    const source = String(result.source);
    if (!source.includes('import.meta.env')) return result;
    return {
      ...result,
      format: result.format || 'module',
      source: source.replaceAll('import.meta.env', '({ DEV: false, PROD: true, MODE: "test" })'),
    };
  },
});
