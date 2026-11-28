# Vendored: L bundle checker (la-bundle@1)

Copied from prototype L's build spec in the product vault, so `pnpm content:test` and CI run L's own release-bundle checker without the vault. Do not edit these files here: change them in the build spec and run `pnpm content:vendor-check` to copy them again; `pnpm content:vendor-check --check` fails when this copy and the vault differ.

| | |
|---|---|
| Source | `projects/product/mockups/2026-11-23-dashboard-revisions/prototypes/build-spec/` in the product vault |
| L commit that last changed these files | `e1a4957 2026-11-28T00:10:45-05:00` |
| Vault HEAD when copied | `e1a4957` |

| File | SHA-256 |
|---|---|
| `check/check_bundle.py` | `a5092e6fac9f434785cceaa8901b179d32952a9b1a89ad72bcc6dd2e70f9ad47` |
| `contracts/curriculum.bundle.schema.json` | `8b8fcc7f5742ad6b39f9936ed8565981223b77e05a6ced9a847786ae24d97218` |
| `contracts/common.openapi.json` | `ebddbba3470ade1e19242f97dc4a35a6acf5b0878690a5057d6483d73f034d4f` |
| `contracts/curriculum.openapi.json` | `d7a5a872f45197ad2ef5108c77066ce05b012d151d225dedfbfee37462f9ca24` |

Run: `python3 scripts/content/vendor/la-bundle/check/check_bundle.py <bundle.json> [--json]` (Python 3.9 or later, no packages; exit 0 ok, 1 errors, 2 usage). The checker reads `../contracts` beside its own folder, so keep the layout.
