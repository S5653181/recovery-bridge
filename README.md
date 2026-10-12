# Recovery Bridge

A working staff-facing research prototype centred on Addictions Team (ACTS) referrals and the full recorded treatment journey. Summary and detailed timelines cover referral receipt, assessment, treatment, discharge and follow-up. All scenarios, staff and service directory entries are synthetic. The application supports planning, ownership, referrals, follow-up and an editable handover; it does not make clinical decisions.

[Open the live research prototype](https://s5653181.github.io/recovery-bridge/)

## Run

```bash
python3 -m http.server 8000 --directory dist
```

Open http://localhost:8000. No dependencies or build step are required. Changes persist in this browser's local storage. Use Demo settings to reset the dataset.

## Verify

Use Node.js 22 or later:

```bash
node --test tests/*.test.mjs
```

See `docs/` for the user guide, setup details, requirement mapping, behavioural rationale, staff evaluation guide and verification limits. Tests cover domain logic and interaction handlers through a lightweight document harness; they are not browser or layout tests.

## GitHub Pages

This is a standalone application. The `.github/workflows/pages.yml` workflow tests the code and publishes `dist/` on pushes to `main`. Enable GitHub Actions as the Pages source in repository Settings → Pages. The site has no ChatGPT runtime dependency and uses no external API or deployment secret.

The free route uses a public repository and GitHub’s included `github.io` address. Both the source and demo are public. Episode changes remain in each visitor’s browser; no patient data or shared backend is provided.

## Referral journey version 2

Open an ACTS referral to use Treatment journey, Recovery support, Discharge actions, Onward support and Handover. Clinical events and recorded plan updates have separate labels and dates. Closed journeys remain accessible. Existing version 1 browser plans migrate without inventing earlier treatment history. See `docs/02-user-guide.md` and `docs/03-feature-requirement-mapping.md`.
