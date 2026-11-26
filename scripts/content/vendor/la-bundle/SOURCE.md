# Vendored: L bundle checker (la-bundle@1)

Copied from prototype L's build spec in the product vault, so `pnpm content:test` and CI run L's own release-bundle checker without the vault. Do not edit these files here: change them in the build spec and run `pnpm content:vendor-check` to copy them again; `pnpm content:vendor-check --check` fails when this copy and the vault differ.

| | |
|---|---|
| Source | `projects/product/mockups/2026-11-23-dashboard-revisions/prototypes/build-spec/` in the product vault |
| L commit that last changed these files | `c3da2c0 2026-11-25T18:30:08-05:00` |
| Vault HEAD when copied | `c3da2c0` |

| File | SHA-256 |
|---|---|
| `check/check_bundle.py` | `474128f4fd12a7aa197df41060d19683e7a746713278a2762e6aa03145bbc291` |
| `contracts/curriculum.bundle.schema.json` | `f9fc7523c57d3da02f81e8717795f39baee5a6af9b7967be6f5aa436e97f361d` |
| `contracts/common.openapi.json` | `ebddbba3470ade1e19242f97dc4a35a6acf5b0878690a5057d6483d73f034d4f` |
| `contracts/curriculum.openapi.json` | `32baf1a94dc6bb09e6c77692c0d2c1d9627f74610a6e3a247aa3a2a8809c351c` |

Run: `python3 scripts/content/vendor/la-bundle/check/check_bundle.py <bundle.json> [--json]` (Python 3.9 or later, no packages; exit 0 ok, 1 errors, 2 usage). The checker reads `../contracts` beside its own folder, so keep the layout.
