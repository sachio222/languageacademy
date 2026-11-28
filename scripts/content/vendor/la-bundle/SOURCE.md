# Vendored: L bundle checker (la-bundle@1)

Copied from prototype L's build spec in the product vault, so `pnpm content:test` and CI run L's own release-bundle checker without the vault. Do not edit these files here: change them in the build spec and run `pnpm content:vendor-check` to copy them again; `pnpm content:vendor-check --check` fails when this copy and the vault differ.

| | |
|---|---|
| Source | `projects/product/mockups/2026-11-23-dashboard-revisions/prototypes/build-spec/` in the product vault |
| L commit that last changed these files | `5f7836b 2026-11-26T22:31:04-05:00` |
| Vault HEAD when copied | `a93b672` |

| File | SHA-256 |
|---|---|
| `check/check_bundle.py` | `c8cf1ce0503619cb9dca91b44d72f98d0c3083fbbf6010a801db84159eb615b8` |
| `contracts/curriculum.bundle.schema.json` | `8b8fcc7f5742ad6b39f9936ed8565981223b77e05a6ced9a847786ae24d97218` |
| `contracts/common.openapi.json` | `ebddbba3470ade1e19242f97dc4a35a6acf5b0878690a5057d6483d73f034d4f` |
| `contracts/curriculum.openapi.json` | `5a532cc3c81812da6397fd19880dccb7ce21c09d0a3d5d8e8715d7c0ab2e8359` |

Run: `python3 scripts/content/vendor/la-bundle/check/check_bundle.py <bundle.json> [--json]` (Python 3.9 or later, no packages; exit 0 ok, 1 errors, 2 usage). The checker reads `../contracts` beside its own folder, so keep the layout.
