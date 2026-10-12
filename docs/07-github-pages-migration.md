# GitHub repository and Pages hosting

This copy is prepared for a public repository named `recovery-bridge` and independent GitHub Pages hosting. It contains no hosting identity, credentials or dependency on the previous hosting provider. Links within the application and research pack are relative, so the application works under a project URL such as `https://<your-account>.github.io/recovery-bridge/`.

## Intended configuration

| Setting | Value |
| --- | --- |
| Repository name | recovery-bridge (subject to availability in your account) |
| Visibility | Public, for the GitHub Free Pages route |
| Default branch | main |
| Pages source | GitHub Actions |
| Published files | dist/ only |
| Workflow | Test and deploy GitHub Pages |
| Runner | Standard ubuntu-latest |
| Deployment credentials | Built-in workflow token and Pages identity; no personal token in source |
| Custom domain | None required; use the included github.io address |
| Data storage | Each visitor's browser, independently |

## Publish

The connected account is needed to create the repository and enable Pages. Once the source is pushed, the workflow runs the tests and publishes the application. The deployment job reports the actual public URL; until that deployment succeeds, no live GitHub Pages URL is claimed.

If setting this up manually, create an empty **public** repository, upload this folder with its directory structure intact, then select **GitHub Actions** in Settings → Pages and run the workflow. The `.github/workflows/pages.yml` file must be included. No dependencies need installing to run this prototype locally.

## Costs

GitHub Free supports Pages in public repositories. The included github.io address does not require buying a domain. Standard GitHub-hosted Actions runners are free for public repositories and Pages. This small deployment retains its uploaded Pages artifact for one day. No Codespaces, larger runners, paid add-ons or external database are configured.

GitHub has usage limits. Keeping a private source repository with Pages requires an eligible paid plan under the current standard plan rules; private website access is a separate consideration. The prepared route is a public synthetic-data demo.

## Effect on saved edits

A new GitHub Pages origin starts with the original fictional scenarios. Existing edits from another host stay in that host's browser storage. Dataset export is available, but the prototype does not implement dataset import or shared multi-user storage. Publishing on Pages does not change this model.

## Evidence and current status

The existing 18 automated checks can be run locally with `node --test tests/*.test.mjs`. They verify domain rules, handler behaviour and selected colour pairs. The GitHub workflow itself must be verified after an actual run; real-browser accessibility and print checks remain outstanding.

Primary references checked 12 October 2026:

- [GitHub Pages availability](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)
- [Custom Pages workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [GitHub Actions billing](https://docs.github.com/en/billing/concepts/product-billing/github-actions)
- [GitHub Pages usage limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)
