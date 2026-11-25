# Vendored: L bundle checker (la-bundle@1)

Copied from prototype L's build spec in the product vault, so `pnpm content:test` and CI run L's own release-bundle checker without the vault. Do not edit these files here: change them in the build spec and run `pnpm content:vendor-check` to copy them again; `pnpm content:vendor-check --check` fails when this copy and the vault differ.

| | |
|---|---|
| Source | `projects/product/mockups/2026-11-23-dashboard-revisions/prototypes/build-spec/` in the product vault |
| L commit that last changed these files | `be95eaa 2026-11-25T13:05:24-05:00` |
| Vault HEAD when copied | `be95eaa` |

| File | SHA-256 |
|---|---|
| `check/check_bundle.py` | `e0e841126e70bdc901a142c2e41d5df86a4b0c643064fd313b7a8139210457f9` |
| `contracts/curriculum.bundle.schema.json` | `a23ebfbaf26b13b21af310da6f7aebc0acf37257246fce6602e43611fb1a02c3` |
| `contracts/common.openapi.json` | `ebddbba3470ade1e19242f97dc4a35a6acf5b0878690a5057d6483d73f034d4f` |
| `contracts/curriculum.openapi.json` | `09a2833125a2bd998b7fcafda72214face3db3e14ab7bb3f6db27adcadf8e218` |

Run: `python3 scripts/content/vendor/la-bundle/check/check_bundle.py <bundle.json> [--json]` (Python 3.9 or later, no packages; exit 0 ok, 1 errors, 2 usage). The checker reads `../contracts` beside its own folder, so keep the layout.
