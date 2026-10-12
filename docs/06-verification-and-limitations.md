# Verification, accessibility and limitations

Prototype v2.0 · Checks performed 12 October 2026

## What was verified

The automated checks use Node.js with its built-in test runner. Domain tests exercise the actual rules; interaction tests import the actual application and run its event handlers through a lightweight document harness. The harness is not a browser and does not test visual layout or native browser behaviour.

| Acceptance criterion | Evidence obtained | Verification limit |
| --- | --- | --- |
| Create, edit, save and reopen records | Actual creation and edit handlers; storage round-trip; a new application module reads the saved dataset | Real-browser refresh and storage-policy variations still require checking |
| Actions update correctly | Owner edits, Complete/Reopen handlers, timestamp retention/clearing and count changes | Native pointer/keyboard activation in a browser not exercised |
| Referrals and follow-up update correctly | Consent/date validation, independent acceptance/confirmation and saved details | No real referral submission; deliberately synthetic |
| Dashboard counts match records | Independent hand-counted baseline fixture; site/status/attention filters and rendered counts | Visual layout and filter controls need real-browser review |
| Missing information is not completed | Not recorded remains unresolved; missing dates are not overdue; empty sections appear in summary | Meaning must be tested with staff |
| Handover reflects records | Synthetic goals, owners, statuses, barriers and appointment details checked; stale draft refresh verified | Intentional staff edits can change the narrative; staff review remains essential |
| Print / export preview is functional | Print handler receives exactly the saved preview text; text export uses the same preview | Print dialog, PDF pagination and downloaded file behaviour not tested in a real browser |
| Core keyboard logic works | Arrow, Home and End tab-navigation handlers verified; native controls and visible focus styles provided | End-to-end keyboard traversal, dialog trapping and focus visibility remain unverified in a real browser |
| No essential placeholder interaction | All planning controls have implemented save/update/navigation/print/export/reset handlers | Further browser inspection should confirm complete interaction coverage |
| Persistence failures are visible | Failed writes preserve previous state and keep the form open | Browser-specific quota and disabled-storage cases need real-browser checks |
| Untrusted text is escaped | A fictional HTML-like scenario label renders as text | Not a penetration test or production security assessment |

**28 automated tests passed** at the final verification run: two contrast checks, seventeen domain/migration/timeline tests and nine event-handler tests. JavaScript syntax checks also passed. The test output is reproducible using the supplied source package.

## Accessibility design and checks

The target is WCAG 2.2 AA; this is not a conformance claim. The primary standard is [WCAG 2.2](https://www.w3.org/TR/WCAG22/). The focus and target guidance were checked against the W3C explanations for [Focus Not Obscured](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html) and [Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html).

| Area | Implemented and inspected | Remaining check |
| --- | --- | --- |
| Semantics and accessible names | Native buttons, labelled fields, headings, table headers, tab roles and associated panel; language en-GB | Screen-reader interpretation of all screens and dynamic changes |
| Status meaning | Text labels alongside colour; explicit Not recorded / Pending / Completed / Declined / Not applicable | Staff comprehension and colour-vision simulation |
| Keyboard | No pointer-only widgets; skip link; keyboard section navigation; native modal; focus restoration strategy | Full Tab/Shift+Tab order, Enter/Space, Escape, return focus and no traps in actual browser |
| Focus | 3px focus outline, separate high-contrast sidebar outline, offset from controls | Visibility and obscuring at zoom / small viewports |
| Contrast | Numerical checks of the selected text/status palette and input/focus boundaries | Rendered combinations, browser styling, hover/focus states and all contrast pairs |
| Target size | Buttons generally 34–44px high; close button 36px; labelled checkboxes enlarge target area | Actual hit areas, spacing and browser-rendered dimensions |
| Responsive layout | Breakpoints for desktop, tablet and narrow screens; stacked workspace; scrollable data table | 320px reflow, 200% text zoom, 400% browser zoom and device testing |
| Feedback and validation | Save feedback uses a live status region; custom form errors use an alert and receive focus; native required inputs | Announcement timing, native error clarity and error correction with assistive technology |
| Motion | No essential animation; prefers-reduced-motion rule | Operating-system preference behaviour |
| Printing | Separate plain-text print region and A4 margin rules | Browser print preview, pagination and PDF accessibility |

Selected text-palette contrast ratios against their designed backgrounds are **5.72:1 or higher**, exceeding the normal-text AA threshold of 4.5:1. The input boundary and selected focus-ring pairs exceed 3:1. These are computed colour checks, not an audit of every rendered state. Input borders and the sidebar focus colour were adjusted after the initial check.

The automated document harness does not establish browser accessibility. Live-browser checks for the version 2 workflow are recorded below; comprehensive screen-reader, zoom, device and print-pagination checks remain required before formal staff evaluation.

## Assumptions

- The initial use is dissertation research with fictional scenarios and staff participants.
- Poole and Bournemouth are example site labels; ward, staff and service names are synthetic.
- One browser tab is used per participant; shared multi-user editing is outside this prototype.
- No clinical decision rules, prescribing, withdrawal management or discharge clearance are needed.
- Missing information should remain visible, rather than block all planning work or be guessed.
- Consent recording is a demonstration workflow rule; no legal or clinical consent determination is made by the software.
- Example checklists are configurable prompts, not an endorsed clinical protocol.
- Overdue calculations use a fixed editable demo date for repeatable evaluation.

## Remaining limitations

1. Browser-local storage has no shared database, robust audit trail, conflict resolution, encryption layer, production backup ; version 1 plan migration is implemented. Multiple tabs can overwrite each other's changes; use one tab.
2. Demonstration staff switching provides no authentication, permissions, verified identity or attribution of who performed an edit. Completion timestamps identify time, not authenticated authorship.
3. The directory is fictional. There are no external calls, service eligibility checks, live referrals or real appointment verification.
4. Summary generation is deterministic and uses recorded data. Editable drafts can diverge intentionally; they require staff review. Source changes replace the active preview with current generated content rather than merging previous edits.
5. Blank sections are unknown, not negative findings. Attention counts concern existing entries; they do not quantify every possible planning gap.
6. Confirmed follow-up is a staff-recorded status and does not demonstrate attendance, engagement or an outcome. Accepted referrals do not demonstrate successful recovery support.
7. The schema follows one ACTS referral journey, including clinical events and recorded plan updates. Closed journeys remain available. There is no cross-referral patient index, deletion workflow, attachment store, automatic research telemetry, imported EPR data or immutable historical audit.
8. Browser compatibility, native keyboard/modal behaviour, assistive technology, responsive layout and print pagination require real-browser verification.
9. Questionnaire wording and use conditions need final checking; no participant evaluation, usability findings or clinical effectiveness evidence exists.
10. A production version would require a separate clinical, technical and organisational design process, including approved identity, secure storage, information governance, clinical safety review and workflow integration. These are future implementation needs, not claimed features of this research prototype.

The evaluation should first establish whether staff understand and can use the coordination workflow. Wider adoption or clinical impact cannot be inferred from this build.

## Version 2 journey verification

Additional tests cover chronological order in both directions, filtering, visible undated events, explicit receipt, milestone evidence, date/score/duration validation, closed journey retrieval, version 1 migration with retained backup, plan updates versus treatment contacts, event edit timestamps, persisted event forms, view switching and handover chronology. Journey status is independently recorded; closing does not complete tasks. The six synthetic journeys include 20 treatment events, with planned assessment and ACTS follow-up clearly separate from completed activity.

The full browser accessibility audit remains outstanding. No usability results or clinical effectiveness findings are claimed.

## Live browser checks (12 October 2026)

The GitHub Pages version was exercised in Chrome at a 1348px desktop viewport. A fictional ACTS referral was created, an assessment event saved and its outcome edited, then the page refreshed and the saved event reopened. The same event appeared in summary, detailed view and handover. Future-dated completion was rejected with a visible error. Closed filtering retrieved Casey and reconciled the filtered counts. Tab/Space switched timeline views; End navigated the workspace to Handover. Native event forms restored focus on close. A focus-restoration issue on the timeline view switch was found and corrected with a regression assertion; follow-up browser verification used the updated version.

The live journey layout was visually reviewed. These focused workflow checks do not replace comprehensive keyboard traversal, assistive-technology testing, zoom/reflow, tablet devices or print/PDF pagination. Full WCAG 2.2 AA conformance remains unverified.

## Referral intake refinement checks

The actual New/Edit referral handlers exclude site, ward and planned discharge. A regression workflow creates a referral with those details blank, records them later through the separate Discharge actions context form, edits the original referral without overwriting the context, reopens saved data and checks the handover. No schema migration or dataset reset is needed for this refinement.
