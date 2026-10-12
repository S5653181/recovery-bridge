# Recovery Bridge: setup and run

Version 1.0 · 12 October 2026 · Research prototype · Synthetic data only

Recovery Bridge supports recovery planning and discharge coordination for inpatient alcohol care staff. It does not make clinical decisions or connect to clinical systems.

## Open the GitHub Pages prototype

Use the supplied GitHub Pages application link. The published demonstration site is public. A normal modern desktop or tablet browser is sufficient. The first visit loads six fictional episodes; no sign-up or patient details are required inside the prototype. No ChatGPT sign-in is required. The demonstration staff selector is a viewpoint control, not authentication.

## Run a local copy

Download **Source & documentation** from Guide & research, then extract the ZIP into a new folder. The archive includes `dist/`, `docs/`, `tests/`, `package.json`, `README.md` and this guide. It excludes hosting identity, credentials and Git internals.

With Python 3 installed, run this from the extracted folder:

```bash
python3 -m http.server 8000 --directory dist
```

Open [http://localhost:8000](http://localhost:8000). Stop the server with Ctrl+C. Serve over HTTP; opening `index.html` directly as a file is not supported because it uses JavaScript modules. Alternatively, with Node.js and npm installed, use `npm start` (this also needs Python 3).

To run the automated checks, use Node.js 22 or later:

```bash
node --test tests/*.test.mjs
```

No dependency installation, API key, database, cloud account or build step is needed for local use. The hosted instance and local copy have separate browser storage because they have different origins.

## Stack and structure

The prototype uses semantic HTML, CSS and browser-native JavaScript modules. Keeping a local-only application buildless reduces setup cost and avoids unnecessary backend dependencies. Domain rules, seed data and UI logic are separated:

| File | Responsibility |
| --- | --- |
| `dist/index.html` | Document, application root, feedback region and native dialog |
| `dist/styles.css` | Responsive interface, focus styles, status labels and print layout |
| `dist/data.mjs` | Six synthetic scenarios, five demonstration staff and fictional directory |
| `dist/core.mjs` | Filters, counts, status rules, validators, storage and handover generation |
| `dist/app.mjs` | Rendering, forms, navigation and interaction handlers |
| `dist/research.html` | Separate human-readable research and implementation pack |
| `tests/` | Domain and event-handler tests; no browser engine |

## Persistence and reset

Saved forms write a versioned JSON object to the browser's local storage, under `recovery-bridge-v1`. Changes survive refreshes on that browser and origin. Unsaved form edits are discarded on Cancel; handover preview edits require Save edited draft. A successful save message follows a completed storage write. A failed write leaves the previous saved state unchanged.

Demo settings can export the current synthetic dataset as JSON. The JSON export is a backup for inspection, not an implemented import workflow. Reset demonstration data restores the original six episodes, checklist, staff viewpoint and fixed reference date. Reset requires an explicit in-app confirmation because it discards local edits.

If saved data is unreadable, the prototype displays a warning and blocks new saves until reset; it does not silently replace the unreadable data.

The reference date is initially **12 October 2026**. Overdue means due before that date, rather than before the computer's current date. Change it in Demo settings if needed. Completion timestamps use the computer's actual clock and display Europe/London time.

## Troubleshooting

| Symptom | Check |
| --- | --- |
| Blank local page | Serve `dist/` over HTTP; ensure all three `.mjs` files and `styles.css` were extracted. |
| Changes do not persist | Enable browser storage; avoid private browsing for retained evaluation sessions. Read the save feedback. |
| No rows after filtering | Clear filters. Episodes without a discharge date cannot match a discharge date range. |
| Cannot confirm a referral or follow-up | Review the form validation. A confirmed arrangement needs its actual contact details. |
| Counts differ from the baseline | Clear all filters, restore the demonstration date, or reset local scenario edits. |

There is no multi-user database, real-time synchronisation or concurrent-edit protection. Use a single browser tab per evaluation participant.

## Publish with GitHub Pages

The repository includes `.github/workflows/pages.yml`. In repository Settings → Pages, select **GitHub Actions** as the source. Push to `main` or run the **Test and deploy GitHub Pages** workflow manually. It tests the application and publishes only `dist/`, with no build step or deployment secret. The published URL is reported by the deployment job. A standard public repository and the included `github.io` address support the free route.

The workflow uses standard Ubuntu runners; no Codespaces, larger runners, custom domain or paid add-on is required. GitHub Pages has usage limits; this small research demo is designed for modest evaluation traffic. Exact pricing and limits should be checked before changing the hosting configuration.

Primary references: [Pages availability](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages), [custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages), and [Actions billing](https://docs.github.com/en/billing/concepts/product-billing/github-actions). Checked 12 October 2026.
