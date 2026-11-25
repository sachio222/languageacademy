# Vendored: L bundle checker (la-bundle@1)

Copied from prototype L's build spec in the product vault, so `pnpm content:test` and CI run L's own release-bundle checker without the vault. Do not edit these files here: change them in the build spec and run `pnpm content:vendor-check` to copy them again; `pnpm content:vendor-check --check` fails when this copy and the vault differ.

| | |
|---|---|
| Source | `projects/product/mockups/2026-11-23-dashboard-revisions/prototypes/build-spec/` in the product vault |
| L commit that last changed these files | `ff1bc35 2026-11-25T03:47:27-05:00` |
| Vault HEAD when copied | `ff1bc35` |

| File | SHA-256 |
|---|---|
| `check/check_bundle.py` | `e0e841126e70bdc901a142c2e41d5df86a4b0c643064fd313b7a8139210457f9` |
| `contracts/curriculum.bundle.schema.json` | `321a8285f5723de35c8f843c4d1f5b6d74a774d94bb2d161f47e4210eac807dd` |
| `contracts/common.openapi.json` | `ebddbba3470ade1e19242f97dc4a35a6acf5b0878690a5057d6483d73f034d4f` |
| `contracts/curriculum.openapi.json` | `0cef3d8430ebc1eae52f9866ea3a5c6426c5e9a88b0de927c7e74ba934e40f65` |

Run: `python3 scripts/content/vendor/la-bundle/check/check_bundle.py <bundle.json> [--json]` (Python 3.9 or later, no packages; exit 0 ok, 1 errors, 2 usage). The checker reads `../contracts` beside its own folder, so keep the layout.
